import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const AddMovies = () => {
    const [input, changeInput] = useState({
        movieName: "",
        language: "",
        genre: "",
        duration: "",
        releaseDate: "",
        director: "",
        rating: "",
        showTime: "",
        ticketPrice: ""
    })
    const [status, setStatus] = useState({ type: "", message: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const inputHandler = (event) => {
        changeInput({ ...input, [event.target.name]: event.target.value })
        if (status.message) setStatus({ type: "", message: "" })
    }

    const readValue = (event) => {
        event.preventDefault()
        
        if (!input.movieName || !input.genre || !input.ticketPrice) {
            setStatus({ type: "danger", message: "Please fill in all mandatory fields (Movie Name, Genre, and Ticket Price)" })
            return
        }

        setIsSubmitting(true)
        setStatus({ type: "", message: "" })

        axios.post("http://localhost:3000/add-movie", input)
            .then((response) => {
                setStatus({ type: "success", message: `Movie "${input.movieName}" added successfully!` })
                changeInput({
                    movieName: "",
                    language: "",
                    genre: "",
                    duration: "",
                    releaseDate: "",
                    director: "",
                    rating: "",
                    showTime: "",
                    ticketPrice: ""
                })
            })
            .catch((error) => {
                console.error("Error adding movies", error)
                setStatus({ type: "danger", message: "Failed to connect to backend server. Make sure port 3000 is active." })
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return (
        <div>
            <NavBar/>
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                    <h2 className="fw-bold mb-0">Add New Movie</h2>
                    <div className="d-flex gap-2">
                        <Link to="/" className="btn btn-outline-secondary btn-sm">
                            &larr; Dashboard
                        </Link>
                        <Link to="/view-movie" className="btn btn-primary btn-sm">
                            View Catalog &rarr;
                        </Link>
                    </div>
                </div>

                {status.message && (
                    <div className={`alert alert-${status.type} alert-dismissible fade show`} role="alert">
                        {status.message}
                        <button type="button" className="btn-close" onClick={() => setStatus({ type: "", message: "" })} aria-label="Close"></button>
                    </div>
                )}

                <div className="card shadow-sm border-light">
                    <div className="card-body p-4">
                        <form onSubmit={readValue}>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Movie Name *</label>
                                    <input type="text" className="form-control" name="movieName" placeholder="e.g. Inception" value={input.movieName} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Language</label>
                                    <input type="text" className="form-control" name="language" placeholder="e.g. English" value={input.language} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Genre *</label>
                                    <input type="text" className="form-control" name="genre" placeholder="e.g. Sci-Fi, Thriller" value={input.genre} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Duration</label>
                                    <input type="text" className="form-control" name="duration" placeholder="e.g. 148 min" value={input.duration} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Release Date</label>
                                    <input type="date" className="form-control" name="releaseDate" value={input.releaseDate} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Director</label>
                                    <input type="text" className="form-control" name="director" placeholder="e.g. Christopher Nolan" value={input.director} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-semibold">Rating (0 - 10)</label>
                                    <input type="number" className="form-control" name="rating" min="0" max="10" step="0.1" placeholder="e.g. 8.8" value={input.rating} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-semibold">Show Time</label>
                                    <input type="text" className="form-control" name="showTime" placeholder="e.g. 6:30 PM, 9:45 PM" value={input.showTime} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-semibold">Ticket Price ($) *</label>
                                    <input type="number" className="form-control" name="ticketPrice" min="0" step="0.01" placeholder="e.g. 14.99" value={input.ticketPrice} onChange={inputHandler} required />
                                </div>
                                
                                <div className="col-12 mt-4 pt-2 border-top">
                                    <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
                                        {isSubmitting ? "Adding..." : "Add Movie"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMovies