import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HeroHeader from "@/components/HomePage/components/HeroBanner/HeroHeader";
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

  return (
    <>
      <HeroHeader
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />

      <main className="bg-[#f7f7f4] pb-16 pt-20 text-[#111]">
        <section className="relative bg-[#0796a7] text-white">
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
              <h1 className="font-serif text-[40px] font-light leading-tight md:text-[58px]">
                {story.heroTitle || story.title}
              </h1>
              {story.heroSubtitle ? (
                <p className="mt-4 max-w-[650px] font-serif text-[28px] font-light leading-tight md:text-[38px]">
                  {story.heroSubtitle}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-[960px] px-6 py-14 font-serif text-[12px] leading-tight text-black md:text-[16px]">
          <div className="space-y-3">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
