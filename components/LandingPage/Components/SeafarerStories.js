"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StoryCard from "./cards/StoryCard";
import { stories } from "../stories";

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

export default function SeafarerStories() {
  const visibleCount = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const visibleStories = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, index) => {
      return stories[(startIndex + index) % stories.length];
    });
  }, [startIndex]);

  const showPreviousStories = () => {
    setDirection(-1);
    setStartIndex((currentIndex) =>
      (currentIndex - visibleCount + stories.length) % stories.length
    );
  };

  const showNextStories = () => {
    setDirection(1);
    setStartIndex((currentIndex) => (currentIndex + visibleCount) % stories.length);
  };

  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-[#0796a7] to-[#002a36] py-10 md:pb-12 md:pt-11">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[320px_1fr]">
          <div className="text-white">
            <h2 className="text-[44px] font-light leading-[0.95] md:text-[57px]">
              Seafarer
              <br />
              Stories
            </h2>

            <p className="mt-7 max-w-[270px] text-[16px] leading-relaxed text-white/85">
              Life at sea is filled with moments that rarely make it ashore -
              long voyages, unexpected challenges, small celebrations onboard,
              lessons learned, and experiences that stay with seafarers for
              life.
            </p>

            <p className="mt-7 max-w-[270px] text-[16px] leading-relaxed text-white/85">
              This section brings together stories and reflections from crew
              members across ranks and vessels, offering a firsthand perspective
              into the people who keep global trade moving.
            </p>
          </div>

          <div className="overflow-visible px-4 md:px-8">
            <div className="relative min-h-[380px] overflow-visible pt-10">
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
                  className="grid items-stretch overflow-visible gap-8 md:grid-cols-3"
                >
                  {visibleStories.map((story) => (
                    <StoryCard key={story.title} {...story} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-[68px] flex items-center gap-3 text-white/85">
              <button
                type="button"
                aria-label="Previous seafarer stories"
                onClick={showPreviousStories}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-xl leading-none transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#002a36]"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next seafarer stories"
                onClick={showNextStories}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-xl leading-none transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#002a36]"
              >
                →
              </button>
              <span className="h-px flex-1 bg-white/35" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}