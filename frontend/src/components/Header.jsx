"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Scale, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 rounded-2xl border border-white/15  px-4 py-3 backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="rounded-full bg-emerald-300/20 p-2 text-emerald-200">
            <Scale size={16} />
          </span>
          <span className="text-2xl tracking-wide [font-family:Georgia,'Times_New_Roman',serif]">
            Anthony Law
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="ml-2 hidden rounded-full border border-emerald-200/50 bg-emerald-200/90 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-100 md:inline-flex"
        >
          Book Consultation
        </a>

        <button
          className="ml-auto rounded-full border border-white/20 bg-white/5 p-2 text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex bg-[#0c1512]/95 px-6 pt-28 md:hidden">
          <nav className="mx-auto flex w-full max-w-sm flex-col gap-3 text-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-lg font-medium tracking-wide text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-emerald-200 px-6 py-4 text-lg font-semibold text-emerald-950"
            >
              Free Consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
