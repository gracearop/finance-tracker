import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Helpers
  // -----------------------------
  const _getRegisteredUsers = () => {
    return JSON.parse(localStorage.getItem("registeredUsers")) || [];
  };

  const _setRegisteredUsers = (users) => {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  };

  // -----------------------------
  // Registration
  // -----------------------------
  const register = (name, email, password, profilePic = null) => {
    const users = _getRegisteredUsers();

    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Email is already registered." };
    }

    const newUser = {
      name,
      email,
      password,
      profilePic,
      data: {
        income: [],
        expense: [],
      },
    };

    users.push(newUser);
    _setRegisteredUsers(users);

    return { success: true, message: "Registration successful!" };
  };

  // -----------------------------
  // Login
  // -----------------------------
  const login = (email, password) => {
    const users = _getRegisteredUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: "Invalid email or password." };
    }

    setUser(found);
    localStorage.setItem("user", JSON.stringify(found));
    return { success: true, message: "Login successful!" };
  };

  // -----------------------------
  // Logout
  // -----------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // -----------------------------
  // Update Profile
  // -----------------------------
  const updateProfile = (updatedFields) => {
    const users = _getRegisteredUsers();
    const index = users.findIndex((u) => u.email === user.email);

    if (index !== -1) {
      users[index] = { ...users[index], ...updatedFields };
      _setRegisteredUsers(users);

      setUser(users[index]);
      localStorage.setItem("user", JSON.stringify(users[index]));
    }
  };

  // -----------------------------
  // Password reset (simulation)
  // -----------------------------
  const sendPasswordReset = (email) => {
    const users = _getRegisteredUsers();
    const exists = users.some((u) => u.email === email);

    if (!exists) {
      return { success: false, message: "Email not found." };
    }

    localStorage.setItem("resetEmail", email);
    return { success: true, message: "Password reset link sent." };
  };

  const resetPassword = (newPassword) => {
    const email = localStorage.getItem("resetEmail");
    if (!email) return { success: false };

    const users = _getRegisteredUsers();
    const index = users.findIndex((u) => u.email === email);

    if (index !== -1) {
      users[index].password = newPassword;
      _setRegisteredUsers(users);
      localStorage.removeItem("resetEmail");
      return { success: true };
    }

    return { success: false };
  };

  // -----------------------------
  // Add Income / Expense
  // -----------------------------
  const updateUserData = (dataType, newRecord) => {
    if (!user) return;

    const users = _getRegisteredUsers();
    const index = users.findIndex((u) => u.email === user.email);
    if (index === -1) return;

    users[index].data[dataType].push(newRecord);
    _setRegisteredUsers(users);

    const updatedUser = { ...user, data: users[index].data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // -----------------------------
  // Persistent Login
  // -----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        sendPasswordReset,
        resetPassword,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
