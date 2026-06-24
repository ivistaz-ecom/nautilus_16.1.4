import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getIncidentBySlug, incidents } from "@/components/LandingPage/incidents";
import HeroHeader from "@/components/HomePage/components/HeroBanner/HeroHeader";

export function generateStaticParams() {
  return incidents.map((incident) => ({
    slug: incident.slug,
  }));
}

export default async function IncidentDetailPage({ params }) {
  const { slug } = await params;
  const incident = getIncidentBySlug(slug);

  if (!incident) {
    return (
      <main className="min-h-screen bg-[#f7f7f4] px-6 py-24 text-center">
        <h1 className="text-4xl text-[#002b3c]">Incident not found</h1>
        <Link
          href="/landing-page"
          className="mt-6 inline-flex rounded-full bg-[#002b3c] px-6 py-3 text-white"
        >
          Back to Stories
        </Link>
      </main>
    );
  }

  const detailImage = incident.detailImage || incident.image;
  const detailObjectPosition =
    incident.detailObjectPosition || incident.objectPosition;
  const otherIncidents = incidents.filter((item) => item.slug !== slug);

  return (
    <>
      <HeroHeader
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />

      <main className="bg-[#f7f7f4] pb-14 pt-20 text-[#111]">
        <section className="relative mx-auto max-w-[1160px] px-6 pb-5 pt-7 text-center">
          <Link
            href="/landing-page"
            aria-label="Back to landing page"
            className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#002b3c] text-[#002b3c] transition-colors hover:bg-[#002b3c] hover:text-white md:absolute md:left-6 md:top-6 md:mb-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <h1 className="mx-auto max-w-[800px] font-serif text-[38px] font-light uppercase leading-tight tracking-[-0.03em] text-[#001f2b] md:text-[44px] lg:text-[50px]">
            {incident.title}
          </h1>
          <p className="mx-auto mt-3 max-w-[800px] font-serif text-[26px] font-light leading-tight text-[#001f2b] md:text-[31px]">
            {incident.subtitle}
          </p>
        </section>

        <div className="h-[260px] w-full overflow-hidden md:h-[560px]">
          <img
            src={detailImage}
            alt={incident.title}
            className="h-full w-full rounded-none object-cover"
            style={{ objectPosition: detailObjectPosition }}
          />
        </div>

        <article className="mx-auto max-w-[960px] px-6 py-7 font-serif text-[12px] leading-tight text-black md:text-[16px]">
          <h2 className="mb-4 text-[18px] font-bold md:text-[24px]">
            Location: {incident.location}
          </h2>

          <div className="space-y-3">
            {incident.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="text-[18px] font-bold md:text-[24px]">
                  {section.heading}
                </h3>
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="my-2 text-[12px] md:text-[16px]">
                    {paragraph}
                  </p>
                ))}
                {section.points ? (
                  <ul className="my-2 list-disc pl-5 text-[12px] md:text-[16px]">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>

        {otherIncidents.length > 0 ? (
          <section className="mx-auto max-w-[1160px] px-6 pb-14 pt-8">
            <h2 className="mb-8 text-center text-[28px] font-light leading-tight text-black md:mb-10 md:text-[34px]">
              Related Technical Incidents
            </h2>

            <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-10">
              {otherIncidents.map((item) => (
                <article key={item.id} className="group flex h-full flex-col">
                  <div className="overflow-hidden rounded-[8px]">
                    {item.image.startsWith("http") ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-[200px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[220px]"
                        style={{ objectPosition: item.objectPosition }}
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={620}
                        height={360}
                        className="h-[200px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[220px]"
                        style={{ objectPosition: item.objectPosition }}
                      />
                    )}
                  </div>

                  <div className="mt-3 flex flex-1 flex-col">
                    <h3 className="line-clamp-2 text-[20px] leading-tight tracking-[-0.03em] text-black md:text-[24px]">
                      {item.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-[14px] text-[#1f292d]">
                      {item.subtitle}
                    </p>

                    <Link
                      href={`/landing-page/${item.slug}`}
                      className="mt-4 inline-flex w-fit rounded-full bg-[#002b3c] px-6 py-2 text-[11px] text-white transition-colors duration-300 hover:bg-[#00455f]"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
