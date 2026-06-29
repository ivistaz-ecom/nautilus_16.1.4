"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { incidents } from "../incidents";

const INITIAL_COUNT = 2;
const LOAD_MORE_COUNT = 2;

export default function TechnicalIncidents() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleIncidents = incidents.slice(0, visibleCount);
  const hasMore = visibleCount < incidents.length;

  const handleLoadMore = () => {
    setVisibleCount((count) =>
      Math.min(count + LOAD_MORE_COUNT, incidents.length)
    );
  };

  return (
    <section className="overflow-x-hidden bg-[#ffffff] py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(220px,320px)_1fr] lg:gap-14">
          <h2 className="text-4xl font-normal leading-[0.95] tracking-wide text-black md:text-5xl lg:text-[66px]">
            Technical
            <br />
            Incident
          </h2>

          <div className="space-y-5 text-[16px] font-normal leading-relaxed tracking-wide text-[#1f292d]">
            <p>
              Every incident at sea carries a lesson. From operational challenges
              and equipment failures to safety observations and onboard responses,
              these experiences contribute to stronger practices across the industry.
            </p>

            <p>
              This section documents technical incidents, operational case studies,
              and key learnings from the field- helping build awareness,
              preparedness, and a stronger culture of safety at sea.
            </p>
          </div>
        </div>

        <div className="overflow-visible">
          <div className="mt-14 grid items-stretch gap-10 overflow-visible md:mt-16 md:grid-cols-2 md:gap-14">
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
                  <h3 className="line-clamp-2 text-[16px] font-normal tracking-wide text-black">
                    {incident.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-[14px] font-light italic tracking-wide text-[#1f292d]">
                    {incident.subtitle}
                  </p>

                  <Link
                    href={`/landing-page/${incident.slug}`}
                    className="mt-5 inline-flex w-fit items-center gap-3 rounded-md bg-[#00222F] px-4 py-2 text-sm text-white transition-all duration-300 hover:scale-95 hover:bg-secondary hover:text-white"
                  >
                    Read More
                    <Image src="/dark-arrow.svg" width={20} height={20} alt="" />
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
                className="inline-flex items-center gap-3 rounded-md bg-[#00222F] px-4 py-2 text-sm text-white transition-all duration-300 hover:scale-95 hover:bg-secondary hover:text-white"
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
