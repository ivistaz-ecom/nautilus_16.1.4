import Header from "@/components/Header/Header"
import Heading from "./components/Heading"
import FindInside from "./components/FindInside/FindInside"
import LatestEdition from "./components/LatestEdition/LatestEdition"
import OtherEdition from "./components/OtherEdition/OtherEdition"
import Subscribe from "@/components/Subscribe/Subscribe"

// export async function generateMetadata() {
//   return getMetadata("/resources/newsletter")
// }

const Newsletter = () => {
  // const metadata = getMetadata("/resources/newsletter")

  return (
    <>
      <Header
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />
      <Heading />
      <FindInside />
      <LatestEdition />
      <OtherEdition />
      {/* <Subscribe /> */}
    </>
  )
}

export default Newsletter
