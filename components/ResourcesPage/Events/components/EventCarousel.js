"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const EventCarousel = ({ title, description, slides, video }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const hasSlides = Boolean(slides?.length);

  useEffect(() => {
    if (!hasSlides || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [hasSlides, isPaused, slides]);

  useEffect(() => {
    if (!video?.src) return;

    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;
    if (!sectionEl || !videoEl) return;

    videoEl.pause();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, [video]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const currentData = slides?.[currentSlide];

  return (
    <div
      ref={sectionRef}
      className="lg:px-0 lg:pb-20 pb-5 max-w-screen-lg w-full mx-auto pt-5"
      onMouseEnter={hasSlides ? () => setIsPaused(true) : undefined}
      onMouseLeave={hasSlides ? () => setIsPaused(false) : undefined}
    >
      <div className="max-w-screen-lg w-full mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 px-3 md:px-0 ">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-[55%] w-full relative rounded-lg">
            {video?.src ? (
              <div className="w-full max-w-[485px] relative">
                <div className="absolute inset-0 -z-10 bg-primary blur opacity-50 rounded-lg"></div>
                <div className="absolute inset-0 -z-20 bg-secondary blur-2xl opacity-50 rounded-lg"></div>
                <video
                  ref={videoRef}
                  className="w-full max-w-[485px] lg:w-auto aspect-[475/400] object-cover rounded-lg relative mt-5"
                  width={480}
                  height={600}
                  loop
                  playsInline
                  controls
                  muted
                  preload="none"
                  aria-label={video.ariaLabel}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentData.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <Image
                      src={currentData.image}
                      alt={currentData.alt}
                      width={475}
                      height={400}
                      className="w-full h-auto max-w-[475px] lg:w-auto"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-center gap-4 mt-6 lg:hidden">
                  <button
                    onClick={prevSlide}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {slides.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlide === idx ? "bg-secondary" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextSlide}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col flex-1 gap-5 items-end justify-between lg:w-[45%] w-full">
            <div className="space-y-4 lg:space-y-10 text-left">
              <h2 className="text-xl md:text-3xl font-light tracking-wider">
                {title}
              </h2>
              <p className="text-sm md:text-lg font-light">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-gray-400 mt-14" />
    </div>
  );
};

export default EventCarousel;
