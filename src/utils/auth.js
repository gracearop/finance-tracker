// src/utils/auth.js

// Register a new user
export const registerUser = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return { success: false, message: "User already exists!" };
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    data: { income: {}, expense: {} },
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  return { success: true, message: "Registration successful!" };
};

// Login user
export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return { success: false, message: "Invalid credentials!" };

  localStorage.setItem("currentUser", JSON.stringify(user));
  return { success: true, message: "Login successful!" };
};

// Get currently logged-in user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

// Logout user
// export const logoutUser = () => {
//   localStorage.removeItem("currentUser");
// };

// Update user data (e.g., income/expense)
export const updateUserData = (updatedUser) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.map((u) =>
    u.email === updatedUser.email ? updatedUser : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));
};

export function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.reload(); // Refresh to reset app state
}

