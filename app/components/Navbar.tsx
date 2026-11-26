"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { EMAIL } from "@/app/components/Links";
import { getLenis } from "./Lenisinstance";
import { v } from "./Illustrations";

const links = [
  { label: "About", href: "#about", desktop: true },
  { label: "Stack", href: "#stack", desktop: true },
  { label: "Services", href: "#services", desktop: true },
  { label: "Work", href: "#work", desktop: true },
  { label: "Experience", href: "#experience", desktop: true },
  { label: "Contact", href: "#contact", desktop: false }, // desktop uses the email pill
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const headerRef = useRef<HTMLElement>(null);
  const hiddenRef = useRef(false);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Slide in on load
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { yPercent: -160, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 },
    );
  }, []);

  // Hide while scrolling down, come back when scrolling up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      if (Math.abs(dy) < 6) return;
      last = y;
      const hide = dy > 0 && y > 120 && !openRef.current;
      if (hide === hiddenRef.current) return;
      hiddenRef.current = hide;
      gsap.to(headerRef.current, {
        yPercent: hide ? -160 : 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section in view (re-runs on route change)
  useEffect(() => {
    // On the projects page, keep "Work" lit instead of observing sections
    if (pathname === "/projects") {
      setActive("#work");
      return;
    }
    setActive("");

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActive(`#${e.target.id}`),
        ),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  // After arriving on the home page from another route, scroll to the hash
  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;
    const t = setTimeout(() => {
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (!target) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else target.scrollIntoView();
    }, 400);
    return () => clearTimeout(t);
  }, [pathname]);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    openRef.current = open;
    if (open) {
      getLenis()?.stop();
      gsap.to(headerRef.current, {
        yPercent: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    } else {
      getLenis()?.start();
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    const lenis = getLenis();
    lenis?.start();

    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      if (lenis) lenis.scrollTo(target, { duration: 1.6 });
      else target.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Not on the home page: go there, the hash effect above does the scroll
    router.push(`/${href}`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-3 top-3 z-60 opacity-0 md:inset-x-6 md:top-5"
      >
        <div className="flex w-full items-center justify-between gap-1 rounded-full bg-[#1c1c1c] p-1.5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          {/* Logo: round mark + wordmark */}
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            aria-label="Tofunmithehuman, back to top"
            className="group flex items-center gap-3 pr-3 lg:pr-5"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-90">
              <svg
                viewBox="0 0 24 24"
                className="a-spin size-5"
                style={v("10s")}
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </span>
            <span className="font-logo hidden text-lg font-extrabold lowercase leading-none tracking-tight md:block">
              tofunmithehuman
            </span>
          </a>

          {/* Desktop links */}
          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center">
              {links
                .filter((l) => l.desktop)
                .map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      className={`block rounded-full px-3.5 py-2 mx-0.5 text-sm transition-colors duration-300 hover:bg-white/10 ${
                        active === l.href
                          ? "bg-white/10 text-white"
                          : "text-white/75"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Contact pill (desktop) */}
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="hidden rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.04] lg:block"
          >
            Contact
          </a>

          {/* Menu button (mobile / tablet) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full bg-white text-black lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu: a circle that grows out of the button */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        data-lenis-prevent
        className={`fixed inset-0 z-50 flex flex-col justify-between bg-cream px-6 pb-8 pt-28 text-black transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] lg:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 2.25rem) 2.25rem)"
            : "circle(0% at calc(100% - 2.25rem) 2.25rem)",
        }}
      >
        <ul className="space-y-1">
          {links.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                tabIndex={open ? 0 : -1}
                className="block text-5xl font-bold tracking-tight transition-transform duration-700 ease-out"
                style={{
                  transform: open ? "translateY(0)" : "translateY(110%)",
                  transitionDelay: open ? `${250 + i * 70}ms` : "0ms",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${EMAIL}`}
          className="text-sm underline underline-offset-4"
        >
          {EMAIL}
        </a>
      </div>
    </>
  );
}
