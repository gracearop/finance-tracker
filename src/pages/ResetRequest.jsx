// src/pages/ResetRequest.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ResetRequest() {
  const { sendPasswordReset } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    const res = sendPasswordReset(email);
    setResult(res);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-3">Reset Password</h2>
        <form onSubmit={handleSend} className="space-y-3">
          <input type="email" placeholder="Your registered email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Send reset token</button>
        </form>

        {result && (
          <div className="mt-3 p-3 bg-gray-100 rounded">
            {result.success ? (
              <>
                <div className="text-sm">Token (demo): <strong>{result.token}</strong></div>
                <div className="text-xs mt-2">Use this token on the reset page to update your password.</div>
                <a href="/reset" className="text-blue-600 underline text-sm">Go to Reset Page</a>
              </>
            ) : (
              <div className="text-sm text-red-600">{result.message}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
