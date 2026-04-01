import Image from "next/image";
import { ArrowRight, CheckCircle2, Phone, Star } from "lucide-react";

const stats = [
  { value: "1,200+", label: "Cases Handled" },
  { value: "18+", label: "Years of Practice" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:pb-24" id="home">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/hero_bg.png"
          alt="Courthouse exterior background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,206,167,0.35),rgba(11,18,15,0.9)_42%,rgba(8,14,11,0.97)_100%)]" />
      </div>

      <div className="pointer-events-none absolute -left-20 top-20 -z-10 h-60 w-60 rounded-full bg-emerald-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 -z-10 h-72 w-72 rounded-full bg-amber-200/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-emerald-100 backdrop-blur">
            <Star size={14} className="fill-emerald-200 text-emerald-200" />
            Trusted Advocacy Across Civil and Corporate Law
          </div>

          <h1 className="max-w-2xl text-4xl leading-tight tracking-tight [font-family:Georgia,'Times_New_Roman',serif] sm:text-5xl lg:text-7xl">
            Practical legal strategy with courtroom confidence.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            We help individuals and businesses navigate disputes, contracts, and compliance with clear guidance and decisive action at every stage.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-200 px-6 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-100"
            >
              Schedule Consultation
              <ArrowRight size={18} />
            </a>

            <a
              href="tel:+11234567890"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Call Now
              <Phone size={18} />
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-200" />
              Same-day case review
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-200" />
              Transparent fee structures
            </span>
          </div>

          <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-semibold text-emerald-100">{item.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/65">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="absolute -inset-3 rounded-[2rem] border border-white/20 bg-white/10 blur-sm" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-4 shadow-2xl">
            <Image
              src="/image.png"
              alt="Attorney portrait"
              width={700}
              height={820}
              className="h-auto w-full rounded-[1.5rem] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
