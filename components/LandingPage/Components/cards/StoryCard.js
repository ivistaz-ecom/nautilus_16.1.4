import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StoryCard({
  title,
  author,
  image,
  slug,
}) {
  return (
    <Link
      href={`/landing-page/seafarer-stories/${slug}`}
      className="group relative block h-[320px] overflow-visible text-white hover:z-30"
    >
      {image ? (
        <div className="pointer-events-none absolute left-1/2 top-0 h-[330px] w-[275px] origin-center -translate-x-1/2 -rotate-3 overflow-hidden rounded-xl bg-white opacity-0 shadow-2xl transition-all duration-700 ease-out group-hover:-translate-y-9 group-hover:opacity-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="275px"
            className="object-cover object-top"
          />
        </div>
      ) : null}

      <div className="relative z-10 flex h-full flex-col justify-between rounded-[8px] border border-white/45 bg-[#032531] p-8 transition-all duration-700 ease-out group-hover:translate-x-3 group-hover:translate-y-28 group-hover:rotate-[30deg] group-hover:scale-[0.58] group-hover:border-white/20 group-hover:bg-gradient-to-br group-hover:from-[#044351] group-hover:to-[#0796a7] group-hover:shadow-2xl">
        <div>
          <h3 className="line-clamp-4 text-[22px] leading-tight">{title}</h3>

          {author ? (
            <p className="mt-5 line-clamp-2 text-[16px] leading-snug text-white/85">
              {author}
            </p>
          ) : null}
        </div>

        <span className="flex h-12 w-12 items-center justify-center self-center rounded-full border-2 border-white/90">
          <ArrowRight className="h-6 w-6" />
        </span>
      </div>
    </Link>
  );
}