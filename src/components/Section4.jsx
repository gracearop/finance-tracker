import React from "react";

const Section4 = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-white text-gray-900">
      {/* LEFT SIDE — TEXT */}
      <div className="flex-1 text-center md:text-left mb-10 md:mb-0 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-snug">
          Empowering smart financial choices
        </h2>
        <p className="text-lg text-gray-600">
          Discover insights that help you plan better, save more, and take
          control of your financial journey.
        </p>
      </div>

      {/* RIGHT SIDE — 2x2 IMAGE GRID */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        <img
          src={process.env.PUBLIC_URL + "/assets/section5.jpeg"}
          alt="Finance visual 1"
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
        <img
          src={process.env.PUBLIC_URL + "/assets/section6.jpeg"}
          alt="Finance visual 2"
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
        <img
          src={process.env.PUBLIC_URL + "/assets/section7.jpeg"}
          alt="Finance visual 3"
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
        <img
          src={process.env.PUBLIC_URL + "/assets/section8.jpeg"}
          alt="Finance visual 4"
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default Section4;
