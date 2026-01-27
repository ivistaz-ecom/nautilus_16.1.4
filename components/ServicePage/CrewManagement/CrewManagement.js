import Header from "@/components/Header/Header"
import Heading from "../components/Heading"
import ManagementServices from "../components/ManagementServices/ManagementServices"
import KeyFeatures from "../components/KeyFeatures/KeyFeatures"
import Latest from "../components/Latest/Latest"
import FAQs from "@/components/FAQs/FAQs"

// export async function generateMetadata() {
//   return getMetadata("/service/crew-management")
// }

const CrewManagement = () => {
  // const metadata = getMetadata("/resources/crew-management")
  const headingData = {
    title:
      "Skilled Professionals for Safe <span class='hide-br'><br></span> and Reliable <span class='hide-br'><br></span> Operations",
    imageUrl: "/service/img02.png",
    desc1:
      "Behind every successful voyage is a capable crew. At Nautilus Shipping, we specialise in Marine Crew Management Services that ensure your vessels are staffed with certified, experienced, and motivated professionals. Recognised for our comprehensive crew management services, we support shipping companies in building high-performing teams through streamlined recruitment, rigorous training, and reliable support.",
    desc2:
      "Our integrated crew management system enables seamless coordination—from onboarding to payroll—enhancing efficiency across your operations. As a trusted provider of Commercial Crewing Services, we put seafarer welfare at the forefront, improving retention rates and operational reliability. With Nautilus Maritime Services, your crew isn’t just a resource—they’re your strongest asset.",
  }

  const msData = {
    title: "Our Specific Services Include:",
    services: [
      {
        ques: "Recruitment And Selection:",
        ans: "Finding the right talent for your fleet, tailored to your vessel’s needs.",
      },
      {
        ques: "Training And Development:",
        ans: "Equipping crew with technical and safety knowledge to excel onboard.",
      },
      {
        ques: "Welfare Management:",
        ans: "Supporting seafarers’ well-being through comprehensive welfare policies.",
      },
      {
        ques: "Payroll Services:",
        ans: "Ensuring timely and accurate compensation for your crew.",
      },
    ],
  }

  const keyFeaturesData = {
    keyFeatures: [
      {
        imageUrl: "/service/key-features/icon04.svg",
        desc: "Recruitment of certified seafarers tailored to fleet requirements",
      },
      {
        imageUrl: "/service/key-features/icon05.svg",
        desc: "Comprehensive training programs focused on safety, technical skills, and compliance",
      },
      {
        imageUrl: "/service/key-features/icon06.svg",
        desc: "Crew welfare policies that prioritize well-being and <br />long-term retention",
      },
    ],
    buttonText: "Discover",
    desc: "See how our crew management services prioritise your team’s growth and safety.",
  }

  const faqs = [
    {
      ques: "What crew management services does Nautilus Shipping provide?",
      ans: "Our services include recruitment, training and development, welfare management, and payroll services, ensuring seafarers are well-prepared, motivated, and supported throughout their careers.",
    },
    {
      ques: "How does Nautilus Shipping ensure seafarer welfare?",
      ans: "We prioritize mental and physical well-being through structured welfare policies, offering career growth opportunities, timely compensation, and continuous support while at sea.",
    },
    {
      ques: "What sets Nautilus Shipping apart in crew management?",
      ans: "With a high retention rate, global talent pool, and a focus on training and welfare, we provide stable, efficient, and highly capable crews to ensure uninterrupted vessel operations.",
    },
  ]

  return (
    <>
      <Header
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />
      <Heading data={headingData} />
      <ManagementServices data={msData} />
      <KeyFeatures data={keyFeaturesData} />
      <Latest />
      <FAQs data={faqs} />
    </>
  )
}

export default CrewManagement
