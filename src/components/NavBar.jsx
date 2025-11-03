import React, { useEffect, useState } from "react";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth"; // adjust if needed

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar
      fluid
      rounded
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900"
    >
      {/* LOGO */}
      <Navbar.Brand as={Link} to="/" className="flex items-center space-x-2">
        <img
          src={process.env.PUBLIC_URL + "/assets/fin logo.JPG"}
          className="h-8"
          alt="Finance Tracker Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Finance Tracker
        </span>
      </Navbar.Brand>

      {/* RIGHT SIDE (USER DROPDOWN + CTA) */}
      <div className="flex md:order-2 items-center gap-3">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              // img={process.env.PUBLIC_URL + "/assets/profile.jpg"}
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

              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Item as={Link} to="/login">
                Login
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/register">
                Register
              </Dropdown.Item>
            </>
          )}
        </Dropdown>

        {user && (
          <Button
            as={Link}
            to="/dashboard"
            gradientDuoTone="purpleToBlue"
            size="sm"
          >
            + Add Expense
          </Button>
        )}

        <Navbar.Toggle />
      </div>

      {/* NAV LINKS */}
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/dashboard">
          Dashboard
        </Navbar.Link>

        {!user && (
          <>
            <Navbar.Link as={Link} to="/login">
              Login
            </Navbar.Link>
            <Navbar.Link as={Link} to="/register">
              Register
            </Navbar.Link>
          </>
        )}

        <Navbar.Link as={Link} to="/login">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;


// import React from "react";
// import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
// import { Link } from "react-router-dom";
// import { logoutUser } from "../utils/auth"; // adjust path if needed

// //  cd "$HOME\Desktop\finance-tracker"
// const AppNavbar = () => {
//   return (
//     <Navbar
//       fluid
//       rounded
//       className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900"
//     >
//       {/* LOGO */}
//       <Navbar.Brand as={Link} to="/" className="flex items-center space-x-2">
//         <img
//           src={process.env.PUBLIC_URL + "/assets/fin logo.JPG"}
//           className="h-8"
//           alt="Finance Tracker Logo"
//         />
//         <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//           Finance Tracker
//         </span>
//       </Navbar.Brand>

//       {/* RIGHT SIDE (USER DROPDOWN + CTA) */}
//       <div className="flex md:order-2 items-center gap-3">
//         <Dropdown
//           arrowIcon={false}
//           inline
//           label={
//             <Avatar
//               alt="User settings"
//               img={process.env.PUBLIC_URL + "/assets/profile.jpg"}
//               rounded
//             />
//           }
//         >
//           <Dropdown.Header>
//             <span className="block text-sm">Grace Arop</span>
//             <span className="block truncate text-sm font-medium">
//               grace@example.com
//             </span>
//           </Dropdown.Header>
//           <Dropdown.Item as={Link} to="/dashboard">
//             Dashboard
//           </Dropdown.Item>
//           <Dropdown.Item as={Link} to="/login">
//             Login
//           </Dropdown.Item>
//           <Dropdown.Item as={Link} to="/register">
//             Register
//           </Dropdown.Item>
//           <Dropdown.Divider />
//           <Dropdown.Item onClick={logoutUser}>Sign out</Dropdown.Item>
//           {/* <Dropdown.Item>Sign out</Dropdown.Item> */}
//         </Dropdown>

//         <Button
//           as={Link}
//           to="/dashboard"
//           gradientDuoTone="purpleToBlue"
//           size="sm"
//         >
//           + Add Expense
//         </Button>

//         <Navbar.Toggle />
//       </div>

//       {/* NAV LINKS */}
//       <Navbar.Collapse>
//         <Navbar.Link as={Link} to="/" active>
//           Home
//         </Navbar.Link>
//         <Navbar.Link as={Link} to="/dashboard">
//           Dashboard
//         </Navbar.Link>
//         <Navbar.Link as={Link} to="/login">
//           Login
//         </Navbar.Link>
//         <Navbar.Link as={Link} to="/register">
//           Register
//         </Navbar.Link>
//         <Navbar.Link as={Link} to="/contact">
//           Contact
//         </Navbar.Link>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default AppNavbar;
