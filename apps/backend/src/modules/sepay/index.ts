import { ModuleProvider, Modules } from "@medusajs/framework/utils";

import SepayPaymentProviderService from "./service";

export default ModuleProvider(Modules.PAYMENT, {
  services: [SepayPaymentProviderService],
});
