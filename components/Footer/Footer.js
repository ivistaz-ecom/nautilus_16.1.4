import GallaboxBotComponent from "../Chatbot/Chatbot"
import Copyright from "./components/Copyright"
import MenuSection from "./components/MenuSection"
// import WhereWeServe from "./components/WhereWeServe"

const Footer = () => {
  return (
    <>
      <div className="bg-white border border-b-0 border-gray-400 rounded-t-3xl">
        <div className="max-w-screen-xl mx-auto p-3 md:p-4 border-gray-300">
          <MenuSection />
          {/* <WhereWeServe /> */}
        </div>
        <GallaboxBotComponent />
      </div>
      <Copyright />
    </>
  )
}

export default Footer
