type MedusaError = {
  response?: {
    data: { message?: string } | string
    status: number
    headers: unknown
  }
  request?: unknown
  message?: string
  config?: { url: string; baseURL: string }
}

const shouldLogMedusaErrors =
  process.env.NEXT_PUBLIC_MEDUSA_DEBUG === "true"

export default function medusaError(error: unknown): never {
  const err = error as MedusaError
  if (err.response) {
    if (shouldLogMedusaErrors) {
      const resource = new URL(
        err.config?.url ?? "/",
        err.config?.baseURL ?? "http://localhost"
      ).pathname
      console.error("Medusa request failed:", {
        resource,
        status: err.response.status,
      })
    }

    const data = err.response.data
    const message =
      typeof data === "object" && data !== null
        ? data.message || String(data)
        : data

    throw new Error(message.charAt(0).toUpperCase() + message.slice(1) + ".")
  } else if (err.request) {
    throw new Error("No response received: " + String(err.request))
  } else {
    throw new Error("Error setting up the request: " + err.message)
  }
}
