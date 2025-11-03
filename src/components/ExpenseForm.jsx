// import React, { useState } from "react";

// const ExpenseForm = ({ user, onDataUpdate }) => {
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!user) {
//       alert("Please log in first.");
//       return;
//     }

//     if (!amount || !category || !month || !year) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const entry = {
//       id: Date.now(),
//       amount: parseFloat(amount),
//       category,
//       month,
//       year,
//       date: new Date().toLocaleDateString(),
//     };

//     onDataUpdate(entry);
//     setAmount("");
//     setCategory("");
//     setMonth("");
//     setYear("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-2xl shadow-md w-full md:w-1/2"
//     >
//       <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Expense</h3>

//       <input
//         type="text"
//         placeholder="Expense Category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
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
//         className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
//       >
//         Add Expense
//       </button>
//     </form>
//   );
// };

// export default ExpenseForm;


import React, { useState } from "react";

const ExpenseForm = ({ user, onDataUpdate }) => {
  const [formData, setFormData] = useState({
    category: "",
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
    if (!formData.category || !formData.amount || !formData.month || !formData.year) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      category: formData.category,
      amount: parseFloat(formData.amount),
      month: formData.month,
      year: parseInt(formData.year),
      date: new Date().toISOString(),
    };

    onDataUpdate(newExpense);
    setFormData({ category: "", amount: "", month: "", year: new Date().getFullYear() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-full md:w-1/2"
    >
      <h2 className="text-2xl font-semibold mb-4 text-red-700">Add Expense</h2>

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category (e.g., Food, Rent)"
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
        className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
