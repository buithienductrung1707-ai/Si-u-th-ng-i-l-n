import { ReactNode } from "react"

type InformationPageSection = {
  title: string
  body: ReactNode
}

type InformationPageProps = {
  eyebrow: string
  title: string
  intro: string
  sections: InformationPageSection[]
}

export default function InformationPage({
  eyebrow,
  title,
  intro,
  sections,
}: InformationPageProps) {
  return (
    <main className="bg-[#f8f3ef] pb-20">
      <section className="relative overflow-hidden bg-[#210a14]">
        <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-[#9b405a]/30 blur-3xl" />
        <div className="content-container relative py-14 small:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f1ce86]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl tracking-[-0.04em] text-white small:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#f4dfe5]/75">
            {intro}
          </p>
        </div>
      </section>

      <div className="content-container mt-8 small:mt-12">
        <div className="grid gap-4">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="grid gap-5 rounded-[1.35rem] border border-[#eadeda] bg-white p-6 shadow-[0_10px_28px_rgba(58,21,34,0.05)] small:grid-cols-[4rem_1fr] small:p-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e3df] font-serif text-lg text-[#7d2342]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[#2a1119]">
                  {section.title}
                </h2>
                <div className="mt-3 text-base leading-7 text-[#735a62]">
                  {section.body}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
