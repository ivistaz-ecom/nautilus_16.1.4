"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StoryCard from "./cards/StoryCard";
import { stories } from "../stories";

const VISIBLE_COUNT = 3;
const AUTO_SCROLL_INTERVAL = 5000;

const carouselVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

export default function SeafarerStories() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const visibleStories = useMemo(() => {
    return Array.from({ length: VISIBLE_COUNT }, (_, index) => {
      return stories[(startIndex + index) % stories.length];
    });
  }, [startIndex]);

  const showPreviousStories = () => {
    setDirection(-1);
    setStartIndex(
      (currentIndex) => (currentIndex - 1 + stories.length) % stories.length
    );
  };

  const showNextStories = useCallback(() => {
    setDirection(1);
    setStartIndex((currentIndex) => (currentIndex + 1) % stories.length);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(showNextStories, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, showNextStories]);

  return (
    <section className="overflow-x-hidden bg-[#EEFDFF] py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(220px,320px)_1fr] lg:gap-14">
          <h2 className="text-4xl font-normal leading-[0.95] tracking-wide text-black md:text-5xl lg:text-[66px]">
            Seafarer
            <br />
            Stories
          </h2>

          <div className="space-y-5 text-[16px] font-normal leading-relaxed tracking-wide text-[#1f292d]">
            <p>
              Life at sea is filled with moments that rarely make it ashore -
              long voyages, unexpected challenges, small celebrations onboard,
              lessons learned, and experiences that stay with seafarers for
              life.
            </p>
            <p>
              This section brings together stories and reflections from crew
              members across ranks and vessels, offering a firsthand perspective
              into the people who keep global trade moving.
            </p>
          </div>
        </div>

        <div
          className="mt-12 md:mt-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="overflow-x-hidden">
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
                className="grid items-stretch gap-8 md:grid-cols-3 md:gap-10"
              >
                {visibleStories.map((story) => (
                  <div key={story.slug} className="flex h-full">
                    <StoryCard {...story} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-3 text-[#002b3c]">
            <button
              type="button"
              aria-label="Previous seafarer stories"
              onClick={showPreviousStories}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#002b3c] text-xl leading-none transition-all duration-300 hover:scale-105 hover:bg-[#002b3c] hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next seafarer stories"
              onClick={showNextStories}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#002b3c] text-xl leading-none transition-all duration-300 hover:scale-105 hover:bg-[#002b3c] hover:text-white"
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
