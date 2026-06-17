"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { incidents } from "../incidents";

const carouselVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 24 : -24,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    x: direction > 0 ? -24 : 24,
    opacity: 0,
    filter: "blur(4px)",
  }),
};

export default function TechnicalIncidents() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateVisibleCount = () => {
      setVisibleCount(mediaQuery.matches ? 2 : 1);
    };

    updateVisibleCount();
    mediaQuery.addEventListener("change", updateVisibleCount);

    return () => {
      mediaQuery.removeEventListener("change", updateVisibleCount);
    };
  }, []);

  const visibleIncidents = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, index) => {
      return incidents[(startIndex + index) % incidents.length];
    });
  }, [startIndex, visibleCount]);

  const showPreviousIncidents = () => {
    setDirection(-1);
    setStartIndex((currentIndex) =>
      (currentIndex - visibleCount + incidents.length) % incidents.length
    );
  };

  const showNextIncidents = () => {
    setDirection(1);
    setStartIndex(
      (currentIndex) => (currentIndex + visibleCount) % incidents.length
    );
  };

  return (
    <section className="overflow-x-hidden bg-[#f7f7f4] py-14 md:py-20">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="mb-12 grid gap-10 md:mb-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-[50px] font-light leading-[0.95] text-black md:text-[66px]">
              Technical
              <br />
              Incident
            </h2>
          </div>

          <div className="max-w-[520px] space-y-5 text-[16px] leading-relaxed text-[#1f292d]">
            <p>
              Every incident at sea carries a lesson. From operational
              challenges and equipment failures to safety observations and
              onboard responses, these experiences contribute to stronger
              practices across the industry.
            </p>

            <p>
              This section documents technical incidents, operational case
              studies, and key learnings from the field - helping build
              awareness, preparedness, and a stronger culture of safety at sea.
            </p>
          </div>
        </div>

        <div className="overflow-visible">
          <div className="relative min-h-[430px] overflow-visible">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={startIndex}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid items-stretch gap-10 md:grid-cols-2 md:gap-14"
              >
                {visibleIncidents.map((incident) => (
                  <article
                    key={incident.id}
                    className="group flex h-full flex-col"
                  >
                    <div className="overflow-hidden rounded-[8px]">
                      {incident.image.startsWith("http") ? (
                        <img
                          src={incident.image}
                          alt={incident.title}
                          className="h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[285px]"
                          style={{ objectPosition: incident.objectPosition }}
                        />
                      ) : (
                        <Image
                          src={incident.image}
                          alt={incident.title}
                          width={620}
                          height={360}
                          className="h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[285px]"
                          style={{ objectPosition: incident.objectPosition }}
                        />
                      )}
                    </div>

                    <div className="mt-4 flex flex-1 flex-col">
                      <h3 className="line-clamp-2 text-[30px] leading-tight tracking-[-0.04em] text-black md:text-[34px]">
                        {incident.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-[16px] text-[#1f292d]">
                        {incident.subtitle}
                      </p>

                      <Link
                        href={`/landing-page/${incident.slug}`}
                        className="mt-5 inline-flex w-fit rounded-full bg-[#002b3c] px-7 py-2.5 text-[12px] text-white transition-colors duration-300 hover:bg-[#00455f]"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center gap-3 text-[#002b3c]">
            <button
              type="button"
              aria-label="Previous technical incidents"
              onClick={showPreviousIncidents}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#002b3c] text-xl leading-none transition-all duration-300 hover:scale-105 hover:bg-[#002b3c] hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next technical incidents"
              onClick={showNextIncidents}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#002b3c] text-xl leading-none transition-all duration-300 hover:scale-105 hover:bg-[#002b3c] hover:text-white"
            >
              →
            </button>
            <span className="h-px flex-1 bg-[#002b3c]/25" />
          </div>
        </div>
      </div>
    </section>
  );
}