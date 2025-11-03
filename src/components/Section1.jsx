import React from "react";
import { Button } from "flowbite-react";

const Section1 = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[60vh] flex items-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/section4.jpeg"})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" /> {/* dark overlay */}

      <div className="relative z-10 max-w-2xl pl-12">
        <h1 className="text-white text-5xl md:text-5xl font-bold leading-snug mb-4">
          Track, Analyze, Succeed!
        </h1>
        <Button
          gradientDuoTone="purpleToBlue"
          size="lg"
          pill
        >
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default Section1;
