import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  let regions: StoreRegion[] | null = null
  let locales: Awaited<ReturnType<typeof listLocales>> = null
  let currentLocale: Awaited<ReturnType<typeof getLocale>> = null

  try {
    ;[regions, locales, currentLocale] = await Promise.all([
      listRegions().then((availableRegions: StoreRegion[]) => availableRegions),
      listLocales(),
      getLocale(),
    ])
  } catch {
    // Navigation can still serve content pages before Medusa is configured.
  }

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-[72px] mx-auto border-b border-white/10 bg-[#16070d] text-[#f3dce3] shadow-[0_5px_20px_rgba(22,7,13,0.2)] duration-200">
        <nav className="content-container txt-xsmall-plus flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-serif text-xl font-semibold tracking-[0.16em] text-[#f4d58d] uppercase transition hover:text-white"
              data-testid="nav-store-link"
            >
              TC Store
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="transition hover:text-white"
                href="/account"
                data-testid="nav-account-link"
              >
                Tài khoản
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2 transition hover:text-white"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Giỏ hàng (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
