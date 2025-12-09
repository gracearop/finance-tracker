// src/pages/Register.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: ""
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Convert image → Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, profilePic: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // FIXED: Pass individual fields
    const res = register(
      form.name,
      form.email,
      form.password,
      form.profilePic
    );

    setMessage(res.message);

    if (res.success) {
      setTimeout(() => navigate("/login"), 400);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded-md"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-md"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-md"
            required
          />

          {/* Image upload */}
          <label className="block text-sm font-semibold text-gray-700">
            Upload Profile Picture (optional)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mx-auto mt-2 shadow"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 font-bold text-white py-2 rounded-md hover:bg-green-700"
          >
            Register
          </button>
        </form>

        {message && <p className="text-center mt-3 text-sm">{message}</p>}

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

