// src/components/NavBar.js
import React, { useContext } from "react";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AppNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      fluid
      rounded
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900"
    >
      {/* LOGO */}
      <Navbar.Brand as={Link} to="/" className="flex items-center gap-2">
        <img
          src={process.env.PUBLIC_URL + "/assets/fin logo.JPG"}
          className="h-8"
          alt="Finance Tracker Logo"
        />
        <span className="text-xl font-semibold dark:text-white">
          Finance Tracker
        </span>
      </Navbar.Brand>

      {/* RIGHT SIDE (User & CTA) */}
      <div className="flex md:order-2 items-center gap-3">
        {/* Avatar Dropdown */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt={user?.name || "Guest"}
              img={user?.profilePic || undefined}
              rounded
            />
          }
        >
          {user ? (
            <>
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>

              <Dropdown.Item as={Link} to="/dashboard">
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
              <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
            </>
          )}
        </Dropdown>

        {/* Call-to-Action Button */}
        {user ? (
          <Button as={Link} to="/dashboard" gradientDuoTone="purpleToBlue" size="sm">
            + Add Expense
          </Button>
        ) : (
          <Button as={Link} to="/login" size="sm">
            Get Started
          </Button>
        )}

        {/* Hamburger Toggle */}
        <Navbar.Toggle />
      </div>

      {/* COLLAPSE NAV LINKS */}
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>Home</Navbar.Link>
        {user && <Navbar.Link as={Link} to="/dashboard">Dashboard</Navbar.Link>}

        {!user && (
          <>
            <Navbar.Link as={Link} to="/login">Login</Navbar.Link>
            <Navbar.Link as={Link} to="/register">Register</Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
