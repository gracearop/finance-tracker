import React from "react";
import Chart from "react-apexcharts";

const LineChartCard = () => {
  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: "#fff" } },
    },
    grid: { borderColor: "rgba(255, 255, 255, 0.2)" },
    colors: ["#ffffff"],
  };

  const series = [
    {
      name: "Expenses",
      data: [40, 55, 45, 70, 60, 80, 75],
    },
  ];

  return (
    <div className="bg-transparent rounded-lg shadow-md p-6 w-full max-w-lg">
      <h2 className="text-white text-xl font-semibold mb-3">
        Weekly Spending
      </h2>
      <Chart options={options} series={series} type="line" height={280} />
    </div>
  );
};

export default LineChartCard;
