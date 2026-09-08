import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types";
import {
  AbstractPaymentProvider,
  BigNumber,
  MedusaError,
  PaymentActions,
} from "@medusajs/framework/utils";

type SepayOptions = {
  webhook_secret?: string;
  bank_account?: string;
  bank_name?: string;
  account_name?: string;
  qr_url_template?: string;
};

type InjectedDependencies = {
  logger: { warn: (message: string) => void };
};

type SepayPayload = {
  id?: number;
  code?: string | null;
  content?: string;
  transferType?: string;
  transferAmount?: number;
  accountNumber?: string;
};

class SepayPaymentProviderService extends AbstractPaymentProvider<SepayOptions> {
  static identifier = "sepay";

  protected options_: SepayOptions;
  protected logger_: InjectedDependencies["logger"];

  constructor(container: InjectedDependencies, options: SepayOptions) {
    super(container, options);
    this.options_ = options;
    this.logger_ = container.logger;
  }

  static validateOptions(options: SepayOptions): void {
    if (!options.webhook_secret) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "SEPAY_WEBHOOK_SECRET is required when SePay is enabled",
      );
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput,
  ): Promise<InitiatePaymentOutput> {
    const sessionId = input.data?.session_id as string | undefined;
    const paymentReference = sessionId || `LST-${randomUUID()}`;
    const qrUrl = this.options_.qr_url_template
      ?.replace("{amount}", String(input.amount))
      .replace("{reference}", encodeURIComponent(paymentReference));

    return {
      id: paymentReference,
      data: {
        ...input.data,
        payment_reference: paymentReference,
        bank_account: this.options_.bank_account,
        bank_name: this.options_.bank_name,
        account_name: this.options_.account_name,
        qr_url: qrUrl,
        amount: input.amount,
        currency_code: input.currency_code,
        status: "pending_authorization",
      },
    };
  }

  async authorizePayment(
    input: AuthorizePaymentInput,
  ): Promise<AuthorizePaymentOutput> {
    return {
      data: input.data,
      status: "pending_authorization",
    };
  }

  async capturePayment(
    input: CapturePaymentInput,
  ): Promise<CapturePaymentOutput> {
    return { data: input.data };
  }

  async refundPayment(
    _input: RefundPaymentInput,
  ): Promise<RefundPaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "SePay bank transfers must be refunded manually by the merchant",
    );
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return {
      data: {
        ...input.data,
        amount: input.amount,
        currency_code: input.currency_code,
      },
    };
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data };
  }

  async retrievePayment(
    input: RetrievePaymentInput,
  ): Promise<RetrievePaymentOutput> {
    return { data: input.data };
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: input.data };
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput,
  ): Promise<GetPaymentStatusOutput> {
    return {
      status: "pending_authorization",
      data: input.data,
    };
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"],
  ): Promise<WebhookActionResult> {
    const rawBody = String(payload.rawData || "");
    const headers = payload.headers || {};
    const signature = headers["x-sepay-signature"] as string | undefined;
    const timestamp = headers["x-sepay-timestamp"] as string | undefined;

    if (!this.verifySignature(rawBody, signature, timestamp)) {
      throw new MedusaError(
        MedusaError.Types.UNAUTHORIZED,
        "Invalid SePay webhook signature",
      );
    }

    const data = payload.data as SepayPayload;
    if (
      data.transferType !== "in" ||
      typeof data.code !== "string" ||
      typeof data.transferAmount !== "number"
    ) {
      return {
        action: PaymentActions.NOT_SUPPORTED,
        data: { session_id: "", amount: new BigNumber(0) },
      };
    }

    return {
      action: PaymentActions.AUTHORIZED,
      data: {
        session_id: data.code,
        amount: new BigNumber(data.transferAmount),
      },
    };
  }

  private verifySignature(
    rawBody: string,
    signature: string | undefined,
    timestamp: string | undefined,
  ) {
    if (!signature || !timestamp || !this.options_.webhook_secret) {
      return false;
    }

    const timestampNumber = Number(timestamp);
    if (
      !Number.isFinite(timestampNumber) ||
      Math.abs(Date.now() / 1000 - timestampNumber) > 300
    ) {
      return false;
    }

    const expected = `sha256=${createHmac(
      "sha256",
      this.options_.webhook_secret,
    )
      .update(`${timestamp}.${rawBody}`)
      .digest("hex")}`;
    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    return (
      actualBuffer.length === expectedBuffer.length &&
      timingSafeEqual(actualBuffer, expectedBuffer)
    );
  }
}

export default SepayPaymentProviderService;
