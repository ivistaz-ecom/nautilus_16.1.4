import Image from "next/image"

const KeyFeaturesItems = ({ keyFeaturesList }) => {
  return (
    <div className="max-w-screen-lg mx-auto w-full">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
        {keyFeaturesList.map((item, index) => (
          <li
            key={index}
            className="bg-primary text-white text-lg text-center font-light flex flex-col items-center px-5 py-10 gap-6 sm:gap-10 rounded-lg group cursor-pointer shadow-xl shadow-secondary"
            data-aos="flip-left"
            data-aos-delay={index * 200}
          >
            <Image
              src={item.imageUrl}
              width={77}
              height={77}
              alt={`icon-${index + 1}`}
            />
            <p 
              className="transition-transform duration-300 ease-in-out group-hover:-translate-y-3 will-change-transform"
              dangerouslySetInnerHTML={{ __html: item.desc }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KeyFeaturesItems
