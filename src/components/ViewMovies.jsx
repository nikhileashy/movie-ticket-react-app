import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const ViewMovies = () => {
    const [data, changeData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = () => {
        setLoading(true)
        axios.post("http://localhost:3000/view-movies")
            .then((response) => {
                changeData(response.data)
                setError(null)
            })
            .catch((err) => {
                console.error("Error fetching movies: ", err)
                setError("Unable to connect to movie server registry. Please check backend connection.")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <NavBar/>
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                    <div className="d-flex align-items-baseline gap-2">
                        <h2 className="fw-bold mb-0">Movie Catalog</h2>
                        {!loading && !error && (
                            <span className="badge bg-secondary rounded-pill">{data.length} Listings</span>
                        )}
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/" className="btn btn-outline-secondary btn-sm">
                            &larr; Dashboard
                        </Link>
                        <Link to="/add-movie" className="btn btn-success btn-sm">
                            + Add Movie
                        </Link>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Retrieving catalog listings...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="alert alert-danger p-4 text-center" role="alert">
                        <h4 className="alert-heading">Database Error</h4>
                        <p className="mb-3">{error}</p>
                        <button onClick={fetchData} className="btn btn-outline-danger btn-sm">Retry Connection</button>
                    </div>
                )}

                {!loading && !error && data.length === 0 && (
                    <div className="card text-center p-5 shadow-sm border-light">
                        <div className="card-body">
                            <h3 className="card-title text-muted mb-3">No Movies Found</h3>
                            <p className="card-text text-secondary mb-4">The catalog database is currently empty. Get started by adding a movie.</p>
                            <Link to="/add-movie" className="btn btn-primary">
                                Add First Movie
                            </Link>
                        </div>
                    </div>
                )}

                {!loading && !error && data.length > 0 && (
                    <div className="card shadow-sm border-light">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col" className="px-3" style={{ width: "80px" }}>Index</th>
                                        <th scope="col">Movie Name</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Language</th>
                                        <th scope="col">Director</th>
                                        <th scope="col">Release Date</th>
                                        <th scope="col" className="text-center">Duration</th>
                                        <th scope="col" className="text-center">Rating</th>
                                        <th scope="col" className="text-center">Show Time</th>
                                        <th scope="col" className="text-center">Actions</th>
                                        <th scope="col" className="text-end px-3">Ticket Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((value, index) => (
                                        <tr key={value._id || index}>
                                            <th scope="row" className="px-3 text-muted">{index + 1}</th>
                                            <td className="fw-semibold text-dark">{value.movieName}</td>
                                            <td>
                                                <span className="badge bg-light text-dark border">{value.genre}</span>
                                            </td>
                                            <td>{value.language || "N/A"}</td>
                                            <td>{value.director || "Unknown"}</td>
                                            <td>{value.releaseDate ? new Date(value.releaseDate).toLocaleDateString() : "N/A"}</td>
                                            <td className="text-center">{value.duration || "N/A"}</td>
                                            <td className="text-center fw-bold text-warning">
                                                ★ {value.rating ? parseFloat(value.rating).toFixed(1) : "N/A"}
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-secondary">{value.showTime || "N/A"}</span>
                                            </td>
                                            <td className="text-center">
                                                <Link
                                                    to={`/update-movie/${value._id}`}
                                                    state={{ item: value }}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                            <td className="text-end px-3 fw-bold">${value.ticketPrice ? parseFloat(value.ticketPrice).toFixed(2) : "0.00"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewMovies