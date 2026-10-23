import { advisoryCommitteeList, executiveCommitteeList } from "@/utils/member"
import Committee from "./Committee"

const Heading = () => {
  const executiveCommitteeDetails = {
    heading: "The Executive Committee",
    members: executiveCommitteeList,
  }

  const advisoryCommitteeDetails = {
    heading: "The Advisory Committee",
    members: advisoryCommitteeList,
  }

  return (
    <>
      <div className="pt-28 pb-14 px-3 md:px-4">
        <div className="max-w-screen-lg mx-auto w-full flex flex-col items-center gap-5 sm:gap-10">
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-light text-center">
            Leadership
          </h1>
          <p className="text-center text-sm sm:text-lg font-[100]">
            At Nautilus, our leadership team combines decades of maritime
            expertise with an extensive network spanning the industry, enabling
            us to anticipate and respond to client needs with precision and
            agility. Committed to excellence, we foster an environment where our
            people can thrive, innovate, and contribute meaningfully—not only to
            our business and clients but to the maritime industry as a whole.
          </p>
          <div className="w-full" data-aos="flip-up">
            <Committee data={executiveCommitteeDetails} expandOnHover />
          </div>
          <div className="mt-5 md:mt-10 w-full" data-aos="flip-up">
            <Committee data={advisoryCommitteeDetails} />
          </div>
        </div>
      </div>
      {/* <hr className="border-gray-400 w-full" /> */}
    </>
  )
}

export default Heading
