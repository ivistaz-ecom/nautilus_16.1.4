import Header from "@/components/Header/Header";
import Heading from "./components/Heading";
import EventsItem from "./components/EventsItem";
import EventCarousel from "./components/EventCarousel";
import { eventCarousels } from "@/utils/events";

const Events = () => {
  return (
    <>
      <Header
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />
      <Heading />
      {eventCarousels.map((carousel) => (
        <EventCarousel
          key={carousel.title}
          title={carousel.title}
          description={carousel.description}
          slides={carousel.slides}
          video={carousel.video}
        />
      ))}
      <EventsItem />
    </>
  );
};

export default Events;
