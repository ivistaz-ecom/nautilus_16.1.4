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

          <h1 className="mx-auto max-w-[800px] text-2xl font-normal uppercase leading-tight tracking-wide text-[#001f2b] sm:text-3xl">
            {incident.title}
          </h1>
          <p className="mx-auto mt-3 max-w-[800px] text-[14px] font-light italic leading-relaxed tracking-wide text-[#001f2b]">
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

        <article className="mx-auto max-w-[960px] px-6 py-7 text-[15px] font-normal leading-relaxed tracking-wide text-black">
          <h2 className="mb-4 text-[24px] font-normal tracking-wide">
            Location: {incident.location}
          </h2>

          <div className="space-y-3">
            {incident.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="text-[24px] font-normal tracking-wide">
                  {section.heading}
                </h3>
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="my-2">
                    {paragraph}
                  </p>
                ))}
                {section.points ? (
                  <ul className="my-2 list-disc pl-5">
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
            <h2 className="mb-8 text-center text-[24px] font-normal tracking-wide text-black md:mb-10">
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
                    <h3 className="line-clamp-2 text-[16px] font-normal tracking-wide text-black">
                      {item.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-[14px] font-light italic tracking-wide text-[#1f292d]">
                      {item.subtitle}
                    </p>

                    <Link
                      href={`/landing-page/${item.slug}`}
                      className="mt-4 inline-flex w-fit shrink-0 items-center gap-3 rounded-md bg-[#00222F] px-4 py-2 text-sm text-white transition-all duration-300 hover:scale-95 hover:bg-secondary hover:text-white"
                    >
                      Read More
                      <Image src="/dark-arrow.svg" width={20} height={20} alt="" />
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
