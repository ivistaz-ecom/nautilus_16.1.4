"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { useEffect } from "react";
import FAQs from "../FAQs/FAQs";
import Header from "../Header/Header";
import OurLocations from "./components/OurLocations";
import Form from "./components/Form/Form";
import OurLocationsNew from "./components/OurLocationsNew";

const ContactPage = () => {
  // Apollo Inbound script initialization
  useEffect(() => {
    const initApolloInbound = () => {
      // Check if script is already loaded
      if (document.querySelector('script[src*="apollo-inbound.js"]')) {
        return;
      }

      const nocache = Math.random().toString(36).substring(7);
      const script = document.createElement('script');
      script.src = 'https://assets.apollo.io/js/apollo-inbound.js?nocache=' + nocache;
      script.defer = true;
      script.onload = function() {
        if (window.ApolloInbound && window.ApolloInbound.formEnrichment) {
          window.ApolloInbound.formEnrichment.init({
            appId: '691bf6459c2dd60020818e63'
          });
        }
      };
      document.head.appendChild(script);
    };

    initApolloInbound();
  }, []);
  const faqs = [
    {
      ques: "How can I get in touch with your team?",
      ans: "You can reach us via phone, email, or the contact form on this page.",
    },
    {
      ques: "How long does it take to get a response?",
      ans: "We aim to respond to all inquiries within 24 - 48 hours.",
    },
    {
      ques: "Do you have a 24/7 support line?",
      ans: "Yes, we provide round-the-clock support for urgent maritime matters.",
    },
  ];

  return (
    <>
      <ParallaxProvider>
        <Header
          logo="/logo.png"
          hamburger="/hamburger-dark.svg"
          search="/search-dark.svg"
        />
        {/* <div className="pt-[75px] sm:pt-[87px]">
        Banner
        <div className="h-[40vh] sm:h-[60vh] bg-[url('/contact-us/new-banner.png')] bg-cover bg-center"></div>
        <ParallaxBanner
          layers={[
            {
              image: "/contact-us/banner01.jpeg",
              speed: -15,
              expanded: false,
            },
          ]}
          className="w-full mt-5 h-[600px]"
        />
      </div> */}

        {/* Heading */}
        <div className="pt-24 md:pt-28 max-w-screen-lg w-full mx-auto pb-7 sm:pb-14 px-3 md:px-4 space-y-6 sm:space-y-8 text-center">
          <h1 className="text-3xl sm:text-8xl font-light">Contact Us</h1>
          {/* <p className="text-base sm:text-lg w-full font-light">
            At <span class="">Nautilus Shipping</span>, we provide a wide range
            of services designed to optimise your fleet operations and ensure
            long-term success. As one of the trusted{" "}
            <span class="">ship management companies in India</span>, our
            expertise spans safety, compliance, technical management, and crew
            welfare—delivering tailored solutions to meet your unique{" "}
            <br className="hidden md:block" /> maritime needs.
          </p> */}
          <p className="text-base sm:text-lg w-full font-light">
            Whether you're looking for a reliable partner in{" "}
            <span>technical ship management companies</span> or want to learn{" "}
            <br className="hidden md:block" /> more about{" "}
            <span>Nautilus ship management</span> and our global capabilities,
            we’re here to help. <br className="hidden md:block" />
            Write to us at <a href="mailto:hello@nautilusshipping.com" className="text-secondary font-semibold">hello@nautilusshipping.com</a> and our team will respond
            promptly.
          </p>

        </div>

        <div className="max-w-screen-lg w-full mx-auto pb-7 sm:pb-14 px-3 md:px-4 space-y-6 sm:space-y-8 text-center">
          <h1 className="text-2xl sm:text-5xl font-light">
            How can we assist you?
          </h1>

          <p className="text-base sm:text-lg w-full font-light md:w-11/12">
            Fill out the form with your details and requirements, and a member
            of the <span>Nautilus Maritime Services</span>{" "}
            <br className="hidden md:block" /> team will be in touch shortly.
          </p>
        </div>

        <div className="bg-primary max-w-screen-lg mx-auto rounded-xl w-full sm:w-3/5">
          <Form />
        </div>

        {/* <FillOutForm /> */}
        <OurLocations />
        <OurLocationsNew />
        {/* <WhyWeDo /> */}
        <FAQs data={faqs} />
      </ParallaxProvider>
    </>
  );
};

export default ContactPage;
