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
              <h3 className="text-[16px] font-normal tracking-wide text-black">
                {item.title}
              </h3>

              {item.author ? (
                <p className="mt-1 text-[14px] font-light italic tracking-wide text-[#1f292d]">
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
    </section>
  );
}
