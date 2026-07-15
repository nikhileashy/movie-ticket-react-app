import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container my-5 text-center">
      <h1 className="mb-5 fw-bold">Movie Dashboard</h1>

      <div className="row g-3 justify-content-center">
        <div className="col-6 col-md-4">
          <Link to="/add-movie" className="btn btn-primary w-100 py-3">
            Add Movie
          </Link>
        </div>
        <div className="col-6 col-md-4">
          <Link to="/view-movie" className="btn btn-outline-primary w-100 py-3">
            View Movies
          </Link>
        </div>
        <div className="col-6 col-md-4">
          <Link to="/add-booking" className="btn btn-success w-100 py-3">
            Add Booking
          </Link>
        </div>
        <div className="col-6 col-md-4">
          <Link to="/view-bookings" className="btn btn-outline-success w-100 py-3">
            View Bookings
          </Link>
        </div>
        <div className="col-6 col-md-4">
          <Link to="/add-user" className="btn btn-dark w-100 py-3">
            Add User
          </Link>
        </div>
        <div className="col-6 col-md-4">
          <Link to="/view-user" className="btn btn-outline-dark w-100 py-3">
            View Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;