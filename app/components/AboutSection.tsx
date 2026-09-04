"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackWrapperRef = useRef<HTMLDivElement>(null);
  const stackListRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const list = stackListRef.current;
      const wrapper = stackWrapperRef.current;
      if (!list || !wrapper) return;

      const getScrollDistance = () =>
        Math.max(list.scrollWidth - wrapper.clientWidth, 0);

      const tween = gsap.to(list, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const settleAndRefresh = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        });
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(settleAndRefresh);
      }
      window.addEventListener("load", settleAndRefresh);

      let resizeTimeout: ReturnType<typeof setTimeout>;
      const onWindowResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      window.addEventListener("resize", onWindowResize);

      return () => {
        window.removeEventListener("load", settleAndRefresh);
        window.removeEventListener("resize", onWindowResize);
        clearTimeout(resizeTimeout);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="min-h-screen bg-white text-black">
      <div className="max-w-3xl p-5 md:p-8">
        <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 mt-30">
          Hello World!
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed text-black/80 mb-6">
          I'm Oluwatofunmi, but people call me tofunmithehuman, I build
          efficient, and scalable solutions with code and I am very passionate
          about beautiful UI, powerful backends, and a seamless digital
          experience.
        </p>
        <a
          href=""
          target="_blank"
          className="font-semibold bg-black text-white text-lg rounded-sm py-3 px-8 flex items-center justify-center gap-2 md:w-fit md:justify-start"
        >
          View Resume <ArrowUpRight />
        </a>
      </div>

      <div
        ref={stackWrapperRef}
        className="relative z-20 mt-30 bg-black text-white py-8 overflow-hidden"
      >
        <h2 className="text-4xl md:text-3xl font-bold uppercase mb-6 px-5 md:px-8 text-right">
          My Stack
        </h2>
        <ul
          ref={stackListRef}
          className="flex gap-6 sm:gap-8 text-3xl sm:text-4xl md:text-6xl w-max flex-nowrap whitespace-nowrap px-8"
        >
          <li>HTML5</li>
          <li>CSS3</li>
          <li>JAVASCRIPT</li>
          <li>TYPESCRIPT</li>
          <li>NODEJS</li>
          <li>TAILWINDCSS</li>
          <li>REACT</li>
          <li>NEXTJS</li>
          <li>MOTION.DEV</li>
          <li>GSAP</li>
          <li>EXPRESSJS</li>
          <li>MONGODB</li>
          <li>GIT</li>
          <li>GITHUB</li>
        </ul>
      </div>
    </section>
  );
}