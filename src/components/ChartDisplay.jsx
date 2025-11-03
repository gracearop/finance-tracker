import React, { useEffect, useState } from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  ResponsiveContainer, RadialBarChart, RadialBar,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#00C49F", "#FF8042", "#0088FE", "#FFBB28", "#845EC2", "#D65DB1"];

const ChartDisplay = ({ userData }) => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("area");

  // Transform userData to monthly totals
  useEffect(() => {
    if (userData) prepareData();
  }, [userData]);

  const prepareData = () => {
    const incomeEntries = Object.values(userData.income || {});
    const expenseEntries = Object.values(userData.expense || {});
    const grouped = {};

    // Helper to add values grouped by month & year
    const addRecord = (entry, type) => {
      const month = entry.month || "Unknown";
      const year = entry.year || new Date().getFullYear();
      const key = `${month}-${year}`;

      if (!grouped[key]) grouped[key] = { month, year, income: 0, expense: 0 };
      grouped[key][type] += Number(entry.amount) || 0;
    };

    incomeEntries.forEach((e) => addRecord(e, "income"));
    expenseEntries.forEach((e) => addRecord(e, "expense"));

    const sorted = Object.values(grouped).sort((a, b) => {
      const da = new Date(`${a.month} 1, ${a.year}`);
      const db = new Date(`${b.month} 1, ${b.year}`);
      return da - db;
    });

    setChartData(sorted);
  };

  const totalIncome = chartData.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = chartData.reduce((sum, d) => sum + d.expense, 0);

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const chartVariant = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
  };

  if (!chartData.length) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No financial data yet — add some income or expenses.
      </div>
    );
  }

  return (
    <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-700">
          📈 Financial Charts
        </h3>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 hover:shadow-sm transition-all"
        >
          <option value="area">Area Chart</option>
          <option value="line">Line Chart</option>
          <option value="column">Column Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="donut">Donut Chart</option>
          <option value="radial">Radial Chart</option>
        </select>
      </div>

      <div className="h-[420px] w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={chartType}
            variants={chartVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute w-full h-full"
          >
            <ResponsiveContainer>
              {/* === AREA CHART === */}
              {chartType === "area" && (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="income" stroke="#00C49F" fill="#00C49F" />
                  <Area type="monotone" dataKey="expense" stroke="#FF8042" fill="#FF8042" />
                </AreaChart>
              )}

              {/* === LINE CHART === */}
              {chartType === "line" && (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="income" stroke="#00C49F" strokeWidth={3} />
                  <Line dataKey="expense" stroke="#FF8042" strokeWidth={3} />
                </LineChart>
              )}

              {/* === COLUMN (VERTICAL BAR) CHART === */}
              {chartType === "column" && (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#00C49F" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expense" fill="#FF8042" radius={[6, 6, 0, 0]} />
                </BarChart>
              )}

              {/* === BAR (HORIZONTAL) CHART === */}
              {chartType === "bar" && (
                <BarChart layout="vertical" data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="month" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#00C49F" />
                  <Bar dataKey="expense" fill="#FF8042" />
                </BarChart>
              )}

              {/* === PIE CHART === */}
              {chartType === "pie" && (
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}

              {/* === DONUT CHART === */}
              {chartType === "donut" && (
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={5}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}

              {/* === RADIAL CHART === */}
              {chartType === "radial" && (
                <RadialBarChart
                  innerRadius="20%"
                  outerRadius="100%"
                  data={pieData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    label={{ fill: "#333", position: "insideStart" }}
                    background
                    dataKey="value"
                  />
                  <Legend />
                  <Tooltip />
                </RadialBarChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChartDisplay;
