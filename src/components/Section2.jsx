import React from "react";
import AreaChartCard from "../components/AreaChartCard";

const Section2 = () => {
  return (
    <section
      className="mb-10 relative flex flex-col md:flex-row items-center justify-between bg-cover bg-center text-white py-16 px-8 md:px-16"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/section2.jpeg)` }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-100"></div>

      {/* Left: Area Chart */}
      <div className="relative z-10 w-full md:w-1/2 flex justify-center">
        <AreaChartCard />
      </div>

      {/* Right: Text */}
      <div className="relative z-10 w-full md:w-1/2 text-right md:text-left mt-10 md:mt-0 md:pl-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Your financial clarity partner
        </h2>
        <p className="text-lg text-gray-200 max-w-md">
          Visualize your progress and stay in control of your finances.
        </p>
      </div>
    </section>
  );
};

export default Section2;
