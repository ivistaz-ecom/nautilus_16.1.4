import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HeroHeader from "@/components/HomePage/components/HeroBanner/HeroHeader";
import RelatedSeafarerStories from "@/components/LandingPage/Components/RelatedSeafarerStories";
import { getStoryBySlug, stories } from "@/components/LandingPage/stories";

export function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function SeafarerStoryDetailPage({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return (
      <main className="min-h-screen bg-[#f7f7f4] px-6 py-24 text-center">
        <h1 className="text-4xl text-[#002b3c]">Story not found</h1>
        <Link
          href="/landing-page"
          className="mt-6 inline-flex rounded-full bg-[#002b3c] px-6 py-3 text-white"
        >
          Back to Stories
        </Link>
      </main>
    );
  }

  const otherStories = stories.filter((item) => item.slug !== slug);

  return (
    <>
      <HeroHeader
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />

      <main className="bg-[#f7f7f4] pb-16 pt-20 text-[#111]">
        <section className="relative bg-gradient-to-b from-[#002a36] to-[#0796a7] text-white mt-2">
          <div className="mx-auto grid min-h-[360px] max-w-[1160px] items-end gap-8 px-6 pt-10 md:grid-cols-[0.82fr_1.18fr] md:pt-0">
            <Link
              href="/landing-page"
              aria-label="Back to landing page"
              className="absolute left-6 top-7 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white hover:text-[#0796a7] md:left-12 lg:left-[calc((100vw-1160px)/2+24px)]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div className="relative mx-auto h-[270px] w-full max-w-[330px] md:h-[360px] md:max-w-[360px]">
              <Image
                src={story.image}
                alt={story.title}
                fill
                priority
                sizes="(max-width: 768px) 330px, 360px"
                className="object-contain object-bottom"
              />
            </div>

            <div className="pb-12 text-center md:pb-24 md:text-left">
              <h1 className="text-3xl font-normal leading-tight tracking-wide sm:text-5xl">
                {story.heroTitle || story.title}
              </h1>
              {story.heroSubtitle ? (
                <p className="mt-4 max-w-[650px] text-[14px] font-light italic leading-relaxed tracking-wide">
                  {story.heroSubtitle}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-[960px] px-6 py-14 text-[16px] font-normal leading-relaxed tracking-wide text-black">
          <div className="space-y-8">
            {story.sections?.length
              ? story.sections.map((section, index) => (
                  <section
                    key={section.heading || `section-${index}`}
                    className="space-y-3"
                  >
                    {section.heading ? (
                      <h2 className="text-[16px] font-normal tracking-wide">
                        {section.heading}
                      </h2>
                    ) : null}
                    {section.body?.[0] ? (
                      <p key={`${section.heading || index}-body-0`}>
                        {section.body[0]}
                      </p>
                    ) : null}
                    {section.points?.length ? (
                      <ul className="my-2 list-disc pl-5">
                        {section.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.body?.slice(1).map((paragraph, paragraphIndex) => (
                      <p key={`${section.heading || index}-body-${paragraphIndex + 1}`}>
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))
              : story.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
          </div>
        </article>

        <RelatedSeafarerStories stories={otherStories} />
      </main>
    </>
  );
}
