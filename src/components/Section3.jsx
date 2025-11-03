import React from "react";
import LineChartCard from "./LineChartCard";

const Section3 = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-blue-700 text-blue-200">
            {/* RIGHT: Text */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-snug text-blue-200">
          Tracking your spending in a quick and easy way
        </h2>
        <p className="text-lg text-blue-200">
          Visualize your expenses effortlessly with clear insights and
          real-time analytics.
        </p>
      </div>
      {/* LEFT: Line Chart */}
      <div className="flex-1 mb-8 md:mb-0 flex justify-center">
        <LineChartCard />
      </div>


    </section>
  );
};

export default Section3;
