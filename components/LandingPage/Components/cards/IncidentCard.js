import Image from "next/image";
import Link from "next/link";

export default function IncidentCard({
  image,
  title,
  subtitle,
  slug,
}) {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-3xl">
        {image.startsWith("http") ? (
          <img
            src={image}
            alt={title}
            className="
            w-full
            h-[400px]
            object-cover
            transition-all
            duration-700
            group-hover:scale-105
            "
          />
        ) : (
          <Image
            src={image}
            alt={title}
            width={800}
            height={500}
            className="
            w-full
            h-[400px]
            object-cover
            transition-all
            duration-700
            group-hover:scale-105
            "
          />
        )}
      </div>

      <h3 className="mt-6 text-[16px] font-normal tracking-wide">
        {title}
      </h3>

      <p className="mt-3 text-[14px] font-light italic tracking-wide text-gray-600">
        {subtitle}
      </p>

      <Link
        href={`/landing-page/${slug}`}
        className="
        inline-flex
        mt-6
        px-8
        py-3
        rounded-full
        bg-[#002B3C]
        text-white
        hover:bg-[#004f6d]
        transition
      "
      >
        Read More
      </Link>
    </div>
  );
}