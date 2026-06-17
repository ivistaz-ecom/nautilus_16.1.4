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
          <p className="mx-auto mt-3 max-w-[560px] font-serif text-[26px] font-light leading-tight text-[#001f2b] md:text-[31px]">
            {incident.subtitle}
          </p>
        </section>

        <div className="relative h-[260px] w-full md:h-[360px]">
          {incident.image.startsWith("http") ? (
            <img
              src={incident.image}
              alt={incident.title}
              className="h-full w-full object-cover"
              style={{ objectPosition: incident.objectPosition }}
            />
          ) : (
            <Image
              src={incident.image}
              alt={incident.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: incident.objectPosition }}
            />
          )}
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
      </main>
    </>
  );
}
