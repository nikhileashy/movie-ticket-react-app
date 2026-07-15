import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
  const dashboardItems = [
    {
      title: "Movies",
      description: "Add new movies, configure durations, ticket prices, schedules, languages, and view listings.",
      addPath: "/add-movie",
      viewPath: "/view-movie",
    },
    {
      title: "Bookings",
      description: "Manage client ticket reservations, seats, payment methods, booking amounts, and details.",
      addPath: "/add-booking",
      viewPath: "/view-bookings",
    },
    {
      title: "Users",
      description: "Register cinema members, view registered usernames, tier memberships, and profile statistics.",
      addPath: "/add-user",
      viewPath: "/view-user",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="container py-5">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-2">Movie Management System</h1>
          <p className="lead text-muted">Admin Dashboard and Control Center</p>
          <hr className="my-4 mx-auto" style={{ maxWidth: "100px", borderTop: "3px solid #0d6efd" }} />
        </header>

        <div className="row g-4 justify-content-center">
          {dashboardItems.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-light shadow-sm card-hover">
                <div className="card-header bg-white border-0 pt-4 pb-2">
                  <h3 className="h5 fw-bold text-dark mb-0">{item.title}</h3>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted small mb-4">{item.description}</p>
                </div>
                <div className="card-footer bg-white border-0 pb-4 d-grid gap-2">
                  <Link to={item.viewPath} className="btn btn-dark btn-sm py-2">
                    View Listings
                  </Link>
                  <Link to={item.addPath} className="btn btn-outline-secondary btn-sm py-2">
                    + Add New
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;