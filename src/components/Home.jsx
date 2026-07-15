import React from 'react'
import NavBar from './NavBar'

const Home = () => {
  return (
    <div className="container mt-5">
      <NavBar/>
      <h1 className="text-center">Welcome to Movie Ticket Booking App</h1>

      <p className="text-center mt-3">
        Book your favorite movie tickets quickly and easily.
      </p>

      <p className="text-center text-muted">
        Browse available movies, select your seats, and confirm your booking in just a few steps.
      </p>
    </div>
  )
}

export default Home