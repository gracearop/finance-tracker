import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SummaryReport = ({ userData }) => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [yearlyBreakdown, setYearlyBreakdown] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [health, setHealth] = useState({ score: 0, label: "No data" });

  useEffect(() => {
    if (userData) calculateSummary();
  }, [userData]);

  const calculateSummary = () => {
    const incomeData = Object.values(userData.income || {});
    const expenseData = Object.values(userData.expense || {});
    const yearlyData = {};

    let totalIncome = 0;
    let totalExpense = 0;

    const currentYear = new Date().getFullYear();

    incomeData.forEach((record) => {
      const year = record.year || currentYear;
      const amount = Number(record.amount) || 0;
      totalIncome += amount;
      if (!yearlyData[year]) yearlyData[year] = { income: 0, expense: 0 };
      yearlyData[year].income += amount;
    });

    expenseData.forEach((record) => {
      const year = record.year || currentYear;
      const amount = Number(record.amount) || 0;
      totalExpense += amount;
      if (!yearlyData[year]) yearlyData[year] = { income: 0, expense: 0 };
      yearlyData[year].expense += amount;
    });

    const balance = totalIncome - totalExpense;
    setSummary({ totalIncome, totalExpense, balance });

    const breakdownArray = Object.entries(yearlyData).map(([year, data]) => ({
      year,
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense,
    }));
    breakdownArray.sort((a, b) => b.year - a.year);
    setYearlyBreakdown(breakdownArray);

    calculateHealth(totalIncome, totalExpense);
  };

  const calculateHealth = (income, expense) => {
    if (income === 0 && expense === 0) {
      setHealth({ score: 0, label: "No data" });
      return;
    }

    const ratio = expense / income;
    const score = Math.max(0, Math.min(100, 100 - ratio * 100));
    let label = "";
    if (score >= 80) label = "Excellent 💪";
    else if (score >= 60) label = "Good 😊";
    else if (score >= 40) label = "Fair 😐";
    else label = "Poor 😟";

    setHealth({ score, label });
  };

  const filteredBreakdown =
    selectedYear === "all"
      ? yearlyBreakdown
      : yearlyBreakdown.filter((y) => y.year === selectedYear);

  return (
    <motion.div
      className="bg-white mt-10 p-8 rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-between">
        📊 Summary Report
        {yearlyBreakdown.length > 0 && (
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-gray-700 hover:shadow-sm transition-all"
          >
            <option value="all">All Years</option>
            {yearlyBreakdown.map((y) => (
              <option key={y.year} value={y.year}>
                {y.year}
              </option>
            ))}
          </select>
        )}
      </h2>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Income", color: "blue", value: summary.totalIncome },
          { label: "Total Expense", color: "red", value: summary.totalExpense },
          {
            label: "Net Balance",
            color: summary.balance >= 0 ? "green" : "yellow",
            value: summary.balance,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`bg-${item.color}-50 p-5 rounded-xl text-center shadow-sm`}
          >
            <h3 className={`text-lg font-semibold text-${item.color}-700`}>
              {item.label}
            </h3>
            <motion.p
              key={item.value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`text-2xl font-bold text-${item.color}-800 mt-2`}
            >
              ₦{item.value.toLocaleString()}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Yearly Breakdown */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          📅 Yearly Breakdown
        </h3>
        <AnimatePresence mode="wait">
          {filteredBreakdown.length > 0 ? (
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="overflow-x-auto"
            >
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left text-gray-700 font-medium">
                      Year
                    </th>
                    <th className="p-3 text-right text-gray-700 font-medium">
                      Income (₦)
                    </th>
                    <th className="p-3 text-right text-gray-700 font-medium">
                      Expense (₦)
                    </th>
                    <th className="p-3 text-right text-gray-700 font-medium">
                      Balance (₦)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBreakdown.map((item) => (
                    <tr
                      key={item.year}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {item.year}
                      </td>
                      <td className="p-3 text-right text-blue-700">
                        {item.income.toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-red-700">
                        {item.expense.toLocaleString()}
                      </td>
                      <td
                        className={`p-3 text-right font-semibold ${
                          item.balance >= 0
                            ? "text-green-700"
                            : "text-yellow-700"
                        }`}
                      >
                        {item.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No financial records yet. Add some income or expenses to see your
              summary.
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* Financial Health Indicator */}
      <div className="mt-10 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          💡 Financial Health Indicator
        </h3>
        {health.label !== "No data" ? (
          <>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${health.score}%` }}
                transition={{ duration: 0.8 }}
                className={`h-4 rounded-full ${
                  health.score >= 80
                    ? "bg-green-500"
                    : health.score >= 60
                    ? "bg-blue-500"
                    : health.score >= 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></motion.div>
            </div>
            <p className="text-gray-700 font-medium text-center">
              {health.label} —{" "}
              <span className="text-lg">{health.score.toFixed(0)}%</span> healthy
            </p>
          </>
        ) : (
          <p className="text-gray-500 text-center">
            No data yet to assess your financial health.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default SummaryReport;
