import Header from "@/components/Header";
import Hero from "@/components/Hero";

const services = [
  {
    title: "Litigation & Dispute Resolution",
    body: "Strategic representation for civil and commercial disputes, from early negotiation through trial.",
  },
  {
    title: "Corporate Advisory",
    body: "Practical legal counsel for founders and established businesses on risk, governance, and growth.",
  },
  {
    title: "Contract Drafting & Review",
    body: "Clear, enforceable contracts tailored to your business interests and long-term protection.",
  },
];

const testimonials = [
  {
    quote:
      "Anthony's team gave us clear options and kept us protected at every stage. We moved forward with confidence.",
    person: "Maya R.",
  },
  {
    quote:
      "Highly responsive, precise, and truly invested in outcomes. Their litigation strategy changed the trajectory of our case.",
    person: "Daniel K.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="about" className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/85">About</p>
            <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-white [font-family:Georgia,'Times_New_Roman',serif] sm:text-4xl">
              Legal counsel built on clarity, preparation, and trust.
            </h2>
            <p className="mt-4 max-w-3xl text-white/75 sm:text-lg">
              We combine meticulous legal analysis with practical business judgment so clients can make decisions quickly and confidently.
            </p>
          </div>
        </section>

        <section id="services" className="px-4 py-6 sm:px-6 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/85">Services</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="rounded-2xl border border-white/10 bg-black/15 p-6 transition hover:-translate-y-1 hover:border-emerald-100/40 hover:bg-black/25"
                >
                  <h3 className="text-xl text-white [font-family:Georgia,'Times_New_Roman',serif]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{service.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote
                key={item.person}
                className="rounded-2xl border border-emerald-100/20 bg-emerald-200/10 p-6"
              >
                <p className="text-white/90">“{item.quote}”</p>
                <footer className="mt-4 text-sm font-semibold text-emerald-100">{item.person}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="contact" className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-gradient-to-r from-emerald-200/20 to-white/5 p-8 sm:p-10">
            <h2 className="text-3xl text-white [font-family:Georgia,'Times_New_Roman',serif] sm:text-4xl">
              Start with a free consultation.
            </h2>
            <p className="mt-3 max-w-2xl text-white/80">
              Tell us your situation and we will outline your options, timeline, and next legal steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:contact@anthonylaw.com"
                className="rounded-full bg-emerald-200 px-6 py-3 font-semibold text-emerald-950"
              >
                contact@anthonylaw.com
              </a>
              <a
                href="tel:+11234567890"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white"
              >
                +1 (123) 456-7890
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
