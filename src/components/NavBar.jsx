import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/add-movie", label: "Add Movie" },
    { to: "/view-movie", label: "View Movies" },
    { to: "/add-booking", label: "Add Booking" },
    { to: "/view-bookings", label: "View Bookings" },
    { to: "/add-user", label: "Add User" },
    { to: "/view-user", label: "View Users" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="badge bg-primary me-2">CineManage</span>
          <span>Portal</span>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? "active fw-semibold" : ""}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;