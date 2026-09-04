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
    <div
      ref={containerRef}
      className="text-white p-5 md:p-8 h-screen flex flex-col"
    >
      <section className="flex-1 flex flex-col">
        <div className="flex gap-4 flex-col md:flex-row justify-between flex-1">
          {/* Column 1 */}
          <div className="flex flex-col md:justify-between md:h-full">
            <div className="uppercase">
              <h1
                ref={headingRef}
                className="text-[clamp(3rem,4vw+2rem,6rem)] font-bold mb-4 uppercase leading-[1.1]"
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
          <div className="flex flex-col justify-between h-full">
            <div ref={imageRef}>
              <Image
                src={Tofunmithehuman}
                alt="Tofunmithehuman"
                loading="eager"
                className="w-full aspect-3.5/3 object-cover md:w-70 md:aspect-auto"
              />
            </div>

            <div className="flex justify-between items-end md:block">
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
                className="text-2xl md:text-3xl font-bold text-right mt-4 uppercase"
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
