import Header from "@/components/Header/Header"
import Heading from "../components/Heading"
import ManagementServices from "../components/ManagementServices/ManagementServices"
import KeyFeatures from "../components/KeyFeatures/KeyFeatures"
import Latest from "../components/Latest/Latest"
import FAQs from "@/components/FAQs/FAQs"

const NavalServices = () => {
  const data = {
    title:
      "End-to-End Naval Solutions, <span class='hide-br'><br></span> Engineered <span class='hide-br'><br></span> for Mission <span class='hide-br'><br></span> Readiness",
    imageUrl: "/service/image05.webp",
    desc1:
      "Executing naval and defence projects requires a precise balance of engineering expertise, strict regulatory compliance, and rapid on-ground execution. At Nautilus Shipping, we bring decades of maritime excellence to the defence sector, supporting naval fleets, coast guards, and defence shipyards with a lean, execution-focused operational model.",
    desc2:
      "From our active operating base in Port Blair, backed by dedicated procurement and administrative hubs in Chennai and Mumbai, our veteran-led technical teams deliver everything from afloat repairs and critical spares logistics to full-scale warship refits and dry-dock support. We pride ourselves on proactive project management that minimizes vessel downtime, enhances operational longevity, and adheres to the highest military and international safety standards.",
  }

  const msData = {
    title: "Our Naval Project Services Include:",
    services: [
      {
        ques: "Afloat Repairs, Refits & Emergency Response:",
        ans: "Rapid-response technical teams executing afloat repairs, scheduled warship refits, and emergency interventions to keep vessels mission-ready.",
      },
      {
        ques: "AMCs & Planned Maintenance Packages:",
        ans: "Tailored Annual Maintenance Contracts (AMCs) and proactive maintenance schedules designed to maximize fleet uptime and operational lifespan.",
      },
      {
        ques: "Critical Spares Hub & Procurement Logistics:",
        ans: "Strategic supply chain management and dedicated spares warehousing, backed by authorized OEM service support and specialized defence hardware.",
      },
      {
        ques: "Dry-Dock Support & Vessel Construction:",
        ans: "Comprehensive technical supervision for dry-docking activities, structural hull work, and end-to-end naval vessel construction.",
      },
      {
        ques: "Combat, Control & Systems Integration:",
        ans: "Precision installation and lifecycle maintenance of onboard mechanical, electrical, propulsion, and Integrated Platform Management Systems (IPMS).",
      },
      {
        ques: "Marine Infrastructure & Maritime Consultancy:",
        ans: "Specialized support for port equipment, terminal operations, green retrofits, shore power solutions, and expert maritime consultancy.",
      },
    ],
  }

  const keyFeaturesData = {
    keyFeatures: [
      {
        imageUrl: "/service/key-features/icon01.svg",
        desc: "Built for Rapid Execution: On-the-ground presence in strategic naval hubs allows immediate deployment for emergency repairs and scheduled refits",
      },
      {
        imageUrl: "/service/key-features/icon02.svg",
        desc: "End-to-End Maritime Ecosystem: Scalable capabilities spanning daily afloat maintenance, critical spares logistics, warship refits, and long-term port infrastructure support",
      },
      {
        imageUrl: "/service/key-features/icon03.svg",
        desc: "Proactive Compliance & Quality Assurance: Strict adherence to naval classification rules, defence procurement standards, and ISO 9001:2015 protocols",
      },
    ],
    buttonText: "Connect With Us",
    desc: "Naval projects and defence services engineered for mission readiness",
  }

  const faqs = [
    {
      ques: "What types of naval projects does Nautilus Shipping handle?",
      ans: "We provide a complete maritime support ecosystem, including afloat repairs, emergency response, planned maintenance (AMCs), critical spares logistics, dry-dock support, warship refits, and specialized marine consultancy.",
    },
    {
      ques: "How does Nautilus ensure high quality and fast turnaround on naval projects?",
      ans: "We operate with a dedicated, 25-member on-ground technical force in Port Blair—covering hull, mechanical, electrical, and hot-work disciplines—directly supervised by senior Indian Navy veterans and supported by our Chennai and Mumbai procurement hubs.",
    },
    {
      ques: "How does Nautilus Shipping ensure compliance with defence and maritime regulations?",
      ans: "Every project is executed under strict multi-level technical supervision, aligning with naval engineering specifications, classification society rules, and our ISO 9001:2015 certified quality management systems.",
    },
  ]

  return (
    <>
      <Header
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />
      <Heading data={data} />
      <ManagementServices data={msData} />

      {/* Dedicated Leadership & On-Ground Execution */}
      <div className="py-7 md:py-10 px-3 md:px-0">
        <div className="max-w-screen-lg w-full mx-auto space-y-5 sm:space-y-8">
          <h2 className="text-2xl sm:text-6xl font-light leading-tight md:leading-tight">
            Dedicated Leadership &amp; On-Ground Execution
          </h2>
          <p className="text-base md:text-lg font-light text-justify sm:px-10">
            What sets Nautilus apart is a lean, high-accountability structure
            built to execute on the ground. Every detail is overseen by seasoned
            naval veterans and specialized technical supervisors who ensure
            strict quality delivery from start to finish.
          </p>
          <ul className="sm:px-10 space-y-4 text-base md:text-lg font-light">
            <li>
              <span className="font-normal text-primary">
                Veteran Naval Leadership:{" "}
              </span>
              Led on the front lines by Captain Rajinder Kumar (Director &amp;
              Team Leader) and Commander Omprakash Sheoran (Asst. Vice
              President), bringing decades of direct naval command and technical
              engineering expertise.
            </li>
            <li>
              <span className="font-normal text-primary">
                25-Member On-Ground Technical Force:{" "}
              </span>
              A dedicated, self-sufficient team stationed directly at our Port
              Blair operating base, including 3 specialized Technical Supervisors
              (Hull, Mechanical &amp; Electrical) and 18 skilled technicians
              (Hot-work, Mechanical &amp; Electrical teams).
            </li>
            <li>
              <span className="font-normal text-primary">
                Nationwide Back-Office &amp; Logistics Backbone:{" "}
              </span>
              Seamless accounting, strategic procurement, and supply-chain
              coordination powered by our established offices in Chennai and
              Mumbai.
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-400 w-full" />

      <KeyFeatures data={keyFeaturesData} hideGame />
      <Latest />
      <FAQs data={faqs} />
    </>
  )
}

export default NavalServices
