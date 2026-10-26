"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Tofunmithehuman from "@/public/images/Tofunmithehuman2.jpeg";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, { y: 40, opacity: 0, duration: 0.9 })
        .from(subTextRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          imageRef.current,
          { y: 40, opacity: 0, scale: 1.05, duration: 1 },
          "-=0.6",
        )
        .from(nameRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(arrowRefs.current, { y: -10, opacity: 0, duration: 0.5 }, "-=0.4")
        .add(() => {
          gsap.to(arrowRefs.current, {
            y: 10,
            duration: 0.8,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
    },
    { scope: containerRef },
  );

  return (
    // pt-24/28 leaves room for the floating navbar
    <div
      ref={containerRef}
      className="flex h-screen flex-col p-5 pt-24 text-white md:p-8 md:pt-28"
    >
      <section className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-between gap-4 md:flex-row">
          {/* Column 1 */}
          <div className="flex flex-col md:h-full md:justify-between">
            <div className="uppercase">
              <h1
                ref={headingRef}
                className="mb-4 text-[clamp(3rem,4vw+2rem,6rem)] font-bold uppercase leading-[1.1]"
              >
                FullStack <br /> Developer
              </h1>
              <p ref={subTextRef} className="text-lg md:text-xl">
                Tofunmithehuman
              </p>
            </div>
            <div
              ref={(el) => {
                arrowRefs.current[0] = el;
              }}
              className="hidden md:block"
            >
              <ArrowDown size={40} />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex h-full flex-col justify-between">
            <div ref={imageRef}>
              <Image
                src={Tofunmithehuman}
                alt="Tofunmithehuman"
                loading="eager"
                className="aspect-3.5/3 w-full object-cover md:aspect-auto md:w-70"
              />
            </div>

            <div className="flex items-end justify-between md:block">
              <div
                ref={(el) => {
                  arrowRefs.current[1] = el;
                }}
                className="block md:hidden"
              >
                <ArrowDown size={40} />
              </div>
              <h1
                ref={nameRef}
                className="mt-4 text-right text-2xl font-bold uppercase md:text-3xl"
              >
                Bolaji <br /> Oluwatofunmi
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
