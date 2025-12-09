// src/pages/ResetPassword.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { resetPassword } = useContext(AuthContext);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const res = resetPassword(token, password);
    setResult(res);
    if (res.success) {
      setTimeout(() => navigate("/login"), 900);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-3">Set New Password</h2>
        <form onSubmit={handleReset} className="space-y-3">
          <input placeholder="Reset token" value={token} onChange={(e)=>setToken(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="New password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Reset Password</button>
        </form>

        {result && <div className={"mt-3 p-2 rounded " + (result.success ? "bg-green-50" : "bg-red-50")}>{result.message}</div>}
      </div>
    </div>
  );
}
