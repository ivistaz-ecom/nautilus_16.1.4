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
      className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-white/45 bg-[#032531] text-white transition-all duration-300 hover:border-white/70 hover:shadow-2xl"
    >
      {image ? (
        <div className="relative h-[160px] w-full shrink-0 overflow-hidden bg-white md:h-[180px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <h3 className="text-[18px] leading-tight md:text-[20px]">{title}</h3>

          {author ? (
            <p className="mt-3 text-[14px] leading-snug text-white/85 md:text-[15px]">
              {author}
            </p>
          ) : null}
        </div>

        <span className="mt-4 flex h-10 w-10 items-center justify-center self-center rounded-full border-2 border-white/90">
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
