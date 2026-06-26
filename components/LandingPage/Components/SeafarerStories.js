"use client";

import { useState } from "react";
import StoryCard from "./cards/StoryCard";
import { stories } from "../stories";

const INITIAL_COUNT = 3;
const LOAD_MORE_COUNT = 3;

export default function SeafarerStories() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleStories = stories.slice(0, visibleCount);
  const hasMore = visibleCount < stories.length;

  const handleLoadMore = () => {
    setVisibleCount((count) =>
      Math.min(count + LOAD_MORE_COUNT, stories.length)
    );
  };

  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-[#0796a7] to-[#002a36] py-10 md:pb-12 md:pt-11">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mx-auto max-w-[800px] text-center text-white">
          <h2 className="text-3xl font-normal leading-tight tracking-wide sm:text-5xl">
            Seafarer
            Stories
          </h2>

          <p className="mx-auto mt-7 max-w-[800px] text-[16px] font-normal leading-relaxed tracking-wide text-white/85">
          Life at sea is filled with moments that rarely make it ashore - long voyages, unexpected challenges, small celebrations onboard, lessons learned, and experiences that stay with seafarers for life.
          </p>

          <p className="mx-auto mt-7 max-w-[800px] text-[16px] font-normal leading-relaxed tracking-wide text-white/85">
          This section brings together stories and reflections from crew members across ranks and vessels, offering a firsthand perspective into the people who keep global trade moving.

          </p>
        </div>

        <div className="overflow-visible px-4 md:px-8">
          <div className="mt-14 grid items-stretch gap-8 overflow-visible md:mt-16 md:grid-cols-3">
            {visibleStories.map((story) => (
              <StoryCard key={story.slug} {...story} />
            ))}
          </div>

          {hasMore ? (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="rounded-full border border-white/70 px-8 py-3 text-[15px] text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#002a36]"
              >
                Load More
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
