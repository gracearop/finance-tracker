import React, { useEffect, useState, useContext } from "react";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import ChartDisplay from "../components/ChartDisplay";
import SummaryReport from "../components/SummaryReport";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, updateUserData } = useContext(AuthContext);

  const [userData, setUserData] = useState({ income: {}, expense: {} });
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    if (user) {
      setUserData(user.data || { income: {}, expense: {} });
    }

    // Load last selected year
    const savedYear = localStorage.getItem("selectedYear");
    if (savedYear) {
      setSelectedYear(savedYear);
    }
  }, [user]);

  // Year dropdown handler
  const handleYearChange = (year) => {
    setSelectedYear(year);
    localStorage.setItem("selectedYear", year);
  };

  // Handle adding income or expense
  const handleDataUpdate = (type, entry) => {
    if (!user) return;

    // Create a key for this entry
    const timestamp = Date.now();

    const updatedData = {
      ...userData,
      [type]: {
        ...userData[type],
        [timestamp]: entry,
      },
    };

    setUserData(updatedData);

    // Save to AuthContext → saves inside this user only
    updateUserData(type, entry);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
        Welcome to Your Dashboard
      </h1>

      {/* Display logged-in user */}
      {user ? (
        <p className="text-center mb-8 text-gray-600">
          Logged in as:{" "}
          <span className="font-semibold">{user.email}</span>
        </p>
      ) : (
        <p className="text-center text-red-500 mb-6">
          No user logged in. Please register or login first.
        </p>
      )}

      {/* Forms Section */}
      {user && (
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
          <IncomeForm
            user={user}
            onDataUpdate={(entry) => handleDataUpdate("income", entry)}
          />
          <ExpenseForm
            user={user}
            onDataUpdate={(entry) => handleDataUpdate("expense", entry)}
          />
        </div>
      )}

      {/* Chart & Summary Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Financial Overview {user ? `for ${user.name}` : ""}
        </h2>

        {userData &&
        (Object.keys(userData.income).length > 0 ||
          Object.keys(userData.expense).length > 0) ? (
          <>
            <ChartDisplay userData={userData} selectedYear={selectedYear} />
            <SummaryReport
              userData={userData}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
            />
          </>
        ) : (
          <p className="text-gray-500">No data yet. Add some records above.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
