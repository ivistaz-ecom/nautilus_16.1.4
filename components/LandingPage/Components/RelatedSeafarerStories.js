"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const INITIAL_COUNT = 3;
const LOAD_MORE_COUNT = 3;

export default function RelatedSeafarerStories({ stories }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  if (!stories.length) return null;

  const visibleStories = stories.slice(0, visibleCount);
  const hasMore = visibleCount < stories.length;

  const handleLoadMore = () => {
    setVisibleCount((count) =>
      Math.min(count + LOAD_MORE_COUNT, stories.length)
    );
  };

  return (
    <section className="mx-auto max-w-[1160px] px-6 pb-14 pt-8">
      <h2 className="mb-8 text-center text-[28px] font-light leading-tight text-black md:mb-10 md:text-[34px]">
        Related Seafarer Stories
      </h2>

      <div className="grid items-stretch gap-8 md:grid-cols-3 md:gap-10">
        {visibleStories.map((item) => (
          <article key={item.slug} className="group flex h-full flex-col">
            <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-[8px] bg-[#032531] md:h-[160px]">
              <Image
                src={item.image}
                alt={item.title}
                width={330}
                height={360}
                className="h-full w-full object-contain object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="mt-3 flex flex-1 flex-col">
              <h3 className="font-serif text-[18px] leading-tight text-black md:text-[22px]">
                {item.title}
              </h3>

              {item.author ? (
                <p className="mt-1 text-[14px] text-[#1f292d]">
                  {item.author}
                </p>
              ) : null}

              <Link
                href={`/landing-page/seafarer-stories/${item.slug}`}
                className="mt-4 inline-flex w-fit rounded-full bg-[#002b3c] px-6 py-2 text-[11px] text-white transition-colors duration-300 hover:bg-[#00455f]"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="rounded-full border border-[#002b3c] px-8 py-3 text-[15px] text-[#002b3c] transition-all duration-300 hover:scale-105 hover:bg-[#002b3c] hover:text-white"
          >
            Load More
          </button>
        </div>
      ) : null}
    </section>
  );
}
