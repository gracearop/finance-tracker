// import React, { useState } from "react";

// const IncomeForm = ({ user, onDataUpdate }) => {
//   const [amount, setAmount] = useState("");
//   const [source, setSource] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!user) {
//       alert("Please log in first.");
//       return;
//     }

//     if (!amount || !source || !month || !year) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const entry = {
//       id: Date.now(),
//       amount: parseFloat(amount),
//       source,
//       month,
//       year,
//       date: new Date().toLocaleDateString(),
//     };

//     onDataUpdate(entry);
//     setAmount("");
//     setSource("");
//     setMonth("");
//     setYear("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-2xl shadow-md w-full md:w-1/2"
//     >
//       <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Income</h3>

//       <input
//         type="text"
//         placeholder="Income Source"
//         value={source}
//         onChange={(e) => setSource(e.target.value)}
//         className="w-full mb-3 border p-2 rounded-lg"
//       />

//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="w-full mb-3 border p-2 rounded-lg"
//       />

//       <div className="flex gap-3 mb-3">
//         <select
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           className="w-1/2 border p-2 rounded-lg"
//         >
//           <option value="">Select Month</option>
//           {[
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ].map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           placeholder="Year (e.g. 2025)"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           className="w-1/2 border p-2 rounded-lg"
//           min="2000"
//           max="2100"
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//       >
//         Add Income
//       </button>
//     </form>
//   );
// };

// export default IncomeForm;

import React, { useState } from "react";

const IncomeForm = ({ user, onDataUpdate }) => {
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    month: "",
    year: new Date().getFullYear(),
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.source || !formData.amount || !formData.month || !formData.year) {
      alert("Please fill all fields");
      return;
    }

    const newIncome = {
      source: formData.source,
      amount: parseFloat(formData.amount),
      month: formData.month,
      year: parseInt(formData.year),
      date: new Date().toISOString(),
    };

    onDataUpdate(newIncome);
    setFormData({ source: "", amount: "", month: "", year: new Date().getFullYear() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-full md:w-1/2"
    >
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Add Income</h2>

      <input
        type="text"
        name="source"
        value={formData.source}
        onChange={handleChange}
        placeholder="Source (e.g., Salary)"
        className="w-full mb-3 p-2 border rounded-md"
      />

      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full mb-3 p-2 border rounded-md"
      />

      <select
        name="month"
        value={formData.month}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded-md"
      >
        <option value="">Select Month</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
        className="w-full mb-3 p-2 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Income
      </button>
    </form>
  );
};

export default IncomeForm;
