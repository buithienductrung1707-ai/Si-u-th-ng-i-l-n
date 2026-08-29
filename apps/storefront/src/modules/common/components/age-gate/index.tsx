"use client"

import { useEffect, useState } from "react"

const AGE_GATE_KEY = "lang-age-confirmed"

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    setIsOpen(window.localStorage.getItem(AGE_GATE_KEY) !== "true")
  }, [])

  const confirmAge = () => {
    window.localStorage.setItem(AGE_GATE_KEY, "true")
    setIsOpen(false)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 px-5 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-description"
    >
      <section className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-700">
          Lặng Store
        </p>
        <h1
          id="age-gate-title"
          className="mt-4 text-3xl font-semibold text-slate-950"
        >
          Không gian dành cho người trưởng thành
        </h1>
        <p
          id="age-gate-description"
          className="mt-4 text-sm leading-6 text-slate-600"
        >
          Bằng việc tiếp tục, bạn tự xác nhận đã đủ 18 tuổi. Lặng không yêu cầu
          ngày sinh hay giấy tờ nhận dạng cho bước này.
        </p>
        <button
          type="button"
          onClick={confirmAge}
          className="mt-7 w-full rounded-full bg-rose-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-200"
        >
          Tôi đã đủ 18 tuổi, tiếp tục
        </button>
        <a
          href="https://www.google.com"
          className="mt-4 inline-flex text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          Rời khỏi trang
        </a>
      </section>
    </div>
  )
}
