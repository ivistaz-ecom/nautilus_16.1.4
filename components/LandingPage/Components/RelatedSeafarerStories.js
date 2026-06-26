import Image from "next/image";
import Link from "next/link";

export default function RelatedSeafarerStories({ stories }) {
  if (!stories.length) return null;

  return (
    <section className="mx-auto max-w-[1160px] px-6 pb-14 pt-8">
      <h2 className="mb-8 text-center text-2xl font-normal tracking-wide text-black sm:text-3xl md:mb-10">
        Related Seafarer Stories
      </h2>

      <div className="grid items-stretch gap-8 md:grid-cols-3 md:gap-10">
        {stories.map((item) => (
          <article key={item.slug} className="group flex h-full w-full flex-col">
            <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-[8px] bg-gradient-to-b from-[#002a36] to-[#0796a7] md:h-[160px]">
              <Image
                src={item.image}
                alt={item.title}
                width={330}
                height={360}
                className="h-full w-full object-contain object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="mt-3 flex flex-1 flex-col">
              <div className="flex-1">
                <h3 className="line-clamp-3 text-[16px] font-normal leading-snug tracking-wide text-black">
                  {item.title}
                </h3>

                <p className="mt-1 min-h-[21px] text-[14px] font-light italic tracking-wide text-[#1f292d]">
                  {item.author || "\u00A0"}
                </p>
              </div>

              <Link
                href={`/landing-page/seafarer-stories/${item.slug}`}
                className="mt-4 inline-flex w-fit shrink-0 items-center gap-3 rounded-md bg-secondary px-4 py-2 text-sm text-white transition-all duration-300 hover:scale-95 hover:bg-secondary hover:text-white"
              >
                Read More
                <Image src="/dark-arrow.svg" width={20} height={20} alt="" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
