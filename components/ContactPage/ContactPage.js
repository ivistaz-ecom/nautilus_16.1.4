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

        {/* Trustpilot Review Section */}
        <div className="max-w-screen-md mx-auto px-4 my-10 mt-10">
          <div className="border border-gray-300 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-xl shadow-secondary">
            {/* Trustpilot Badge */}
            <div className="flex justify-center">
              <a
                href="https://www.trustpilot.com/review/nautilusshipping.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Review Nautilus Shipping on Trustpilot"
                className="inline-flex items-center gap-3 border border-gray-300 rounded-lg px-5 py-3 hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-lg sm:text-xl text-gray-700">Review us on</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="20.5 248.5 600 147.3" 
                  className="h-6 sm:h-8 w-auto"
                >
                  <path d="m178.2 300.7h60.7v11.3h-23.9v63.7h-13.1v-63.7h-23.8zm58.1 20.7h11.2v10.5h.2c.4-1.5 1.1-2.9 2.1-4.3s2.2-2.7 3.7-3.8c1.4-1.2 3-2.1 4.8-2.8 1.7-.7 3.5-1.1 5.3-1.1 1.4 0 2.4.1 2.9.1.5.1 1.1.2 1.6.2v11.5c-.8-.2-1.7-.3-2.6-.4s-1.7-.2-2.6-.2c-2 0-3.9.4-5.7 1.2s-3.3 2-4.7 3.5c-1.3 1.6-2.4 3.5-3.2 5.8s-1.2 5-1.2 8v25.8h-12zm86.8 54.3h-11.8v-7.6h-.2c-1.5 2.8-3.7 4.9-6.6 6.6s-5.9 2.5-8.9 2.5c-7.1 0-12.3-1.7-15.5-5.3-3.2-3.5-4.8-8.9-4.8-16v-34.5h12v33.3c0 4.8.9 8.2 2.8 10.1 1.8 2 4.4 3 7.7 3 2.5 0 4.6-.4 6.3-1.2s3.1-1.8 4.1-3.1c1.1-1.3 1.8-2.9 2.3-4.7s.7-3.8.7-5.9v-31.5h12v54.3zm20.4-17.4c.4 3.5 1.7 5.9 4 7.4 2.3 1.4 5.1 2.1 8.3 2.1 1.1 0 2.4-.1 3.8-.3s2.8-.5 4-1c1.3-.5 2.3-1.2 3.1-2.2s1.2-2.2 1.1-3.7-.6-2.8-1.7-3.8-2.4-1.7-4-2.4c-1.6-.6-3.5-1.1-5.6-1.5s-4.2-.9-6.4-1.4-4.4-1.1-6.5-1.8-3.9-1.6-5.6-2.9c-1.6-1.2-3-2.7-3.9-4.6-1-1.9-1.5-4.1-1.5-6.9 0-3 .7-5.4 2.2-7.4 1.4-2 3.3-3.6 5.5-4.8s4.7-2.1 7.4-2.6 5.3-.7 7.7-.7c2.8 0 5.5.3 8 .9s4.9 1.5 6.9 2.9c2.1 1.3 3.8 3.1 5.1 5.2 1.4 2.1 2.2 4.7 2.6 7.7h-12.5c-.6-2.9-1.9-4.8-3.9-5.8-2.1-1-4.4-1.5-7.1-1.5-.8 0-1.9.1-3 .2-1.2.2-2.2.4-3.3.8-1 .4-1.9 1-2.6 1.7s-1.1 1.7-1.1 2.9c0 1.5.5 2.6 1.5 3.5s2.3 1.6 4 2.3c1.6.6 3.5 1.1 5.6 1.5s4.3.9 6.5 1.4 4.3 1.1 6.4 1.8 4 1.6 5.6 2.9c1.6 1.2 3 2.7 4 4.5s1.5 4.1 1.5 6.7c0 3.2-.7 5.9-2.2 8.2-1.5 2.2-3.4 4.1-5.7 5.5s-5 2.4-7.8 3.1c-2.9.6-5.7 1-8.5 1-3.4 0-6.6-.4-9.5-1.2s-5.5-2-7.6-3.5c-2.1-1.6-3.8-3.5-5-5.9-1.2-2.3-1.9-5.1-2-8.4h12.1v.1zm39.5-36.9h9.1v-16.4h12v16.3h10.8v8.9h-10.8v29c0 1.3.1 2.3.2 3.3.1.9.4 1.7.7 2.3.4.6 1 1.1 1.7 1.4.8.3 1.8.5 3.2.5.8 0 1.7 0 2.5-.1s1.7-.2 2.5-.4v9.3c-1.3.2-2.6.3-3.9.4-1.3.2-2.5.2-3.9.2-3.2 0-5.7-.3-7.6-.9s-3.4-1.5-4.5-2.6c-1.1-1.2-1.8-2.6-2.2-4.3s-.6-3.8-.7-6v-32h-9.1v-9.1zm40.3 0h11.3v7.4h.2c1.7-3.2 4-5.4 7-6.8s6.2-2.1 9.8-2.1c4.3 0 8 .7 11.2 2.3 3.2 1.5 5.8 3.5 7.9 6.2 2.1 2.6 3.7 5.7 4.7 9.2s1.6 7.3 1.6 11.2c0 3.7-.5 7.2-1.4 10.6-1 3.4-2.4 6.5-4.3 9.1s-4.3 4.7-7.3 6.3-6.4 2.4-10.4 2.4c-1.7 0-3.5-.2-5.2-.5s-3.4-.8-5-1.5-3.1-1.6-4.4-2.7c-1.4-1.1-2.5-2.4-3.4-3.8h-.2v27.1h-12v-74.4zm41.9 27.2c0-2.4-.3-4.8-1-7.1-.6-2.3-1.6-4.3-2.9-6.1s-2.9-3.2-4.7-4.3c-1.9-1.1-4.1-1.6-6.5-1.6-5 0-8.8 1.7-11.4 5.2-2.5 3.5-3.8 8.2-3.8 14 0 2.8.3 5.3 1 7.6s1.6 4.3 3 6c1.3 1.7 2.9 3 4.8 4s4 1.5 6.5 1.5c2.8 0 5-.6 6.9-1.7s3.4-2.6 4.7-4.3c1.2-1.8 2.1-3.8 2.6-6.1.5-2.4.8-4.7.8-7.1zm21.1-47.9h12v11.3h-12zm0 20.7h12v54.3h-12zm22.7-20.7h12v75h-12zm48.6 76.5c-4.3 0-8.2-.7-11.6-2.2s-6.2-3.4-8.6-5.9c-2.3-2.5-4.1-5.6-5.3-9.1s-1.9-7.4-1.9-11.5.6-7.9 1.9-11.4c1.2-3.5 3-6.5 5.3-9.1 2.3-2.5 5.2-4.5 8.6-5.9s7.3-2.2 11.6-2.2 8.2.7 11.6 2.2c3.4 1.4 6.2 3.4 8.6 5.9 2.3 2.5 4.1 5.6 5.3 9.1s1.9 7.3 1.9 11.4c0 4.2-.6 8-1.9 11.5s-3 6.5-5.3 9.1c-2.3 2.5-5.2 4.5-8.6 5.9s-7.2 2.2-11.6 2.2zm0-9.5c2.6 0 5-.6 6.9-1.7 2-1.1 3.5-2.6 4.8-4.4s2.2-3.9 2.8-6.1c.6-2.3.9-4.6.9-7 0-2.3-.3-4.6-.9-6.9s-1.5-4.3-2.8-6.1-2.9-3.2-4.8-4.3c-2-1.1-4.3-1.7-6.9-1.7s-5 .6-6.9 1.7c-2 1.1-3.5 2.6-4.8 4.3-1.3 1.8-2.2 3.8-2.8 6.1s-.9 4.6-.9 6.9c0 2.4.3 4.7.9 7s1.5 4.3 2.8 6.1 2.9 3.3 4.8 4.4c2 1.2 4.3 1.7 6.9 1.7zm31-46.3h9.1v-16.4h12v16.3h10.8v8.9h-10.8v29c0 1.3.1 2.3.2 3.3.1.9.4 1.7.7 2.3.4.6 1 1.1 1.7 1.4.8.3 1.8.5 3.2.5.8 0 1.7 0 2.5-.1s1.7-.2 2.5-.4v9.3c-1.3.2-2.6.3-3.9.4-1.3.2-2.5.2-3.9.2-3.2 0-5.7-.3-7.6-.9s-3.4-1.5-4.5-2.6c-1.1-1.2-1.8-2.6-2.2-4.3s-.6-3.8-.7-6v-32h-9.1v-9.1z"/>
                  <path d="m164.2 300.7h-54.9l-16.9-52.2-17 52.2-54.9-.1 44.4 32.3-17 52.2 44.4-32.3 44.4 32.3-16.9-52.2z" fill="#00b67a"/>
                  <path d="m123.6 344.7-3.8-11.8-27.4 19.9z" fill="#005128"/>
                </svg>
              </a>
            </div>

            {/* Main Heading */}
<h2 className="text-xl sm:text-2xl font-light text-gray-900">
              Your feedback helps us improve and serve better.
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-gray-600">
              If you've engaged with Nautilus, consider leaving a review.
            </p>
          </div>
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
