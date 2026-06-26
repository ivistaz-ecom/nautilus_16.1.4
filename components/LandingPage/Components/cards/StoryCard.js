import Image from "next/image";
import Link from "next/link";

export default function StoryCard({
  title,
  author,
  image,
  slug,
}) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden">
      {image ? (
        <div className="group relative h-[300px] w-full shrink-0 overflow-hidden rounded-[8px] bg-gradient-to-b from-[#002a36] to-[#0796a7] md:h-[370px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="origin-bottom object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col pt-5 pb-6 text-left">
        <div className="flex-1">
          <h3 className="line-clamp-3 text-[16px] font-normal leading-snug tracking-wide text-black">
            {title}
          </h3>

          <p className="mt-3 min-h-[21px] text-[14px] font-light italic tracking-wide text-[#1f292d]">
            {author || "\u00A0"}
          </p>
        </div>

        <Link
          href={`/landing-page/seafarer-stories/${slug}`}
          className="mt-5 inline-flex w-fit shrink-0 items-center gap-3 rounded-md bg-secondary px-4 py-2 text-sm text-white transition-all duration-300 hover:scale-95 hover:bg-secondary hover:text-white"
        >
          Read More
          <Image src="/dark-arrow.svg" width={20} height={20} alt="" />
        </Link>
      </div>
    </article>
  );
}
