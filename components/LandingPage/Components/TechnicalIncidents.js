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
    <section className="overflow-x-hidden bg-[#f7f7f4] py-14 md:py-20">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-3xl font-normal leading-tight tracking-wide text-black sm:text-5xl">
            Technical
           
            Incident
          </h2>

          <p className="mx-auto mt-7 max-w-[800px] text-[16px] font-normal leading-relaxed tracking-wide text-[#1f292d]">
          Every incident at sea carries a lesson. From operational challenges and equipment failures to safety observations and onboard responses, these experiences contribute to stronger practices across the industry.

          </p>

          <p className="mx-auto mt-7 max-w-[800px] text-[16px] font-normal leading-relaxed tracking-wide text-[#1f292d]">
          This section documents technical incidents, operational case studies, and key learnings from the field- helping build awareness, preparedness, and a stronger culture of safety at sea.

          </p>
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
                    className="mt-5 inline-flex w-fit rounded-full bg-[#002b3c] px-7 py-2.5 text-[12px] text-white transition-colors duration-300 hover:bg-[#00455f]"
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
        </div>
      </div>
    </section>
  );
}
