import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";


const Section1 = () => {
    const navigate = useNavigate();
      const handleGetStarted = () => {
    // Optional: scroll smoothly to top before navigating
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate("/dashboard");
    }, 400); // small delay for smoother feel
  };
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
       onClick={handleGetStarted}
        className="
          transform transition-all duration-300
          hover:scale-105 hover:-translate-y-1 hover:shadow-lg
          active:scale-95 focus:ring-4 focus:ring-blue-300
          animate-[pulse_3s_ease-in-out_infinite]
        "
        >
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default Section1;
