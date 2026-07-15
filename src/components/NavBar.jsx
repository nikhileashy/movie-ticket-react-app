import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div>
        <div>
          <nav className="navbar bg-dark navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <span className="badge text-bg-light">MovieTime</span>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/add-movie">
                    Add Movie
                  </Link>
                  <Link className="nav-link" to="/view-movie">
                    View Movies
                  </Link>
                  <Link className="nav-link" to="/add-booking">
                    Add Booking
                  </Link>
                  <Link className="nav-link" to="/view-booking">
                    View Bookings
                  </Link>
                  <Link className="nav-link" to="/add-user">
                    Add User
                  </Link>
                  <Link className="nav-link" to="/view-user">
                    View Users
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;