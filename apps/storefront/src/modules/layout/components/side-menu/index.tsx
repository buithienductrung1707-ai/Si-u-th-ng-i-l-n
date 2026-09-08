"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"

import { Locale } from "@lib/data/locales"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"

const primaryMenuItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/store" },
  { name: "Tài khoản", href: "/account" },
  { name: "Giỏ hàng", href: "/cart" },
]

const supportMenuItems = [
  { name: "Giao hàng kín đáo", href: "/shipping" },
  { name: "Đổi trả & an toàn", href: "/returns" },
  { name: "Chính sách riêng tư", href: "/privacy" },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <Popover className="flex h-full">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative flex h-full items-center text-sm font-semibold transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f4d58d] focus:ring-inset"
                >
                  Danh mục
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 z-[50] bg-[#0b0409]/70 backdrop-blur-sm"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              </Transition>

              <Transition
                show={open}
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="-translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition duration-150 ease-in"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-full opacity-0"
              >
                <PopoverPanel className="fixed inset-y-0 left-0 z-[51] flex w-[min(22rem,calc(100vw-1rem))] flex-col overflow-hidden border-r border-white/10 bg-[#180811] text-[#f5e6e9] shadow-[24px_0_60px_rgba(12,3,8,0.45)]">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                      <p className="font-serif text-lg font-semibold tracking-[0.14em] text-[#f4d58d]">
                        TC STORE
                      </p>
                      <button
                        type="button"
                        data-testid="close-menu-button"
                        onClick={close}
                        aria-label="Đóng danh mục"
                        className="rounded-full p-2 text-[#f5e6e9] transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#f4d58d]"
                      >
                        <XMark />
                      </button>
                    </div>

                    <nav
                      aria-label="Điều hướng chính"
                      className="min-h-0 flex-1 overflow-y-auto px-4 py-5"
                    >
                      <ul className="grid gap-1">
                        {primaryMenuItems.map(({ name, href }) => (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="flex items-center rounded-xl px-4 py-3 text-lg font-semibold tracking-tight transition hover:bg-[#3a1525] hover:text-[#f4d58d] focus:outline-none focus:ring-2 focus:ring-[#f4d58d]"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>

                      <div className="my-5 border-t border-white/10" />
                      <p className="px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8abb7]/60">
                        Thông tin mua sắm
                      </p>
                      <ul className="mt-2 grid gap-1">
                        {supportMenuItems.map(({ name, href }) => (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="flex rounded-xl px-4 py-2.5 text-sm leading-5 text-[#f5e6e9]/75 transition hover:bg-[#3a1525] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f4d58d]"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div className="shrink-0 border-t border-white/10 px-6 py-5">
                      <div className="grid gap-4 text-sm">
                        {!!locales?.length && (
                          <div
                            className="flex items-center justify-between"
                            onMouseEnter={languageToggleState.open}
                            onMouseLeave={languageToggleState.close}
                          >
                            <LanguageSelect
                              toggleState={languageToggleState}
                              locales={locales}
                              currentLocale={currentLocale}
                            />
                            <ArrowRightMini
                              className={clx(
                                "transition-transform duration-150",
                                languageToggleState.state ? "-rotate-90" : "",
                              )}
                            />
                          </div>
                        )}
                        {regions && (
                          <div
                            className="flex items-center justify-between"
                            onMouseEnter={countryToggleState.open}
                            onMouseLeave={countryToggleState.close}
                          >
                            <CountrySelect
                              toggleState={countryToggleState}
                              regions={regions}
                            />
                            <ArrowRightMini
                              className={clx(
                                "transition-transform duration-150",
                                countryToggleState.state ? "-rotate-90" : "",
                              )}
                            />
                          </div>
                        )}
                      </div>
                      <Text className="mt-5 text-xs text-[#f5e6e9]/50">
                        © {new Date().getFullYear()} TC Store. Mua sắm riêng tư.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
