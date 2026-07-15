import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const dashboardItems = [
    { title: "Movies", addPath: "/add-movie", viewPath: "/view-movie" },
    { title: "Bookings", addPath: "/add-booking", viewPath: "/view-bookings" },
    { title: "Users", addPath: "/add-user", viewPath: "/view-user" },
  ];

  return (
    <div className="container py-5">
      <header className="mb-5 text-center">
        <h1 className="fw-semibold text-secondary text-uppercase tracking-wide small">Dashboard</h1>
        <h2 className="fw-bold text-dark">Movie Management System</h2>
      </header>

      <div className="row g-4 justify-content-center">
        {dashboardItems.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4 text-center bg-light">
              <h3 className="h5 fw-bold text-dark mb-4">{item.title}</h3>
              <div className="d-grid gap-2">
                <Link to={item.viewPath} className="btn btn-dark btn-sm py-2">
                  View All
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
  );
};

export default Home;