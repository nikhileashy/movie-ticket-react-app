import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const ViewBookings = () => {
    const [data, changeData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = () => {
        setLoading(true)
        axios.post("http://localhost:3000/view-bookings")
            .then((response) => {
                changeData(response.data)
                setError(null)
            })
            .catch((err) => {
                console.error("Error fetching bookings: ", err)
                setError("Unable to connect to reservation registry. Verify database status.")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleSearch = (value) => {
        setSearchTerm(value)

        if (!value.trim()) {
            fetchData()
            return
        }

        axios.post("http://localhost:3000/search-booking", { query: value })
            .then((response) => {
                changeData(response.data)
                setError(null)
            })
            .catch((err) => {
                console.error("Error searching bookings: ", err)
                setError("Unable to search bookings right now. Please try again.")
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
                        <h2 className="fw-bold mb-0">Booking Reservations</h2>
                        {!loading && !error && (
                            <span className="badge bg-secondary rounded-pill">{data.length} Logs</span>
                        )}
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/" className="btn btn-outline-secondary btn-sm">
                            &larr; Dashboard
                        </Link>
                        <Link to="/add-booking" className="btn btn-success btn-sm">
                            + New Booking
                        </Link>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Retrieving booking list...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="alert alert-danger p-4 text-center" role="alert">
                        <h4 className="alert-heading">Connection Interrupted</h4>
                        <p className="mb-3">{error}</p>
                        <button onClick={fetchData} className="btn btn-outline-danger btn-sm">Retry Connection</button>
                    </div>
                )}

                {!loading && !error && data.length === 0 && (
                    <div className="card text-center p-5 shadow-sm border-light">
                        <div className="card-body">
                            <h3 className="card-title text-muted mb-3">No Reservations Recorded</h3>
                            <p className="card-text text-secondary mb-4">No tickets have been booked in the system yet.</p>
                            <Link to="/add-booking" className="btn btn-primary">
                                Make First Reservation
                            </Link>
                        </div>
                    </div>
                )}

                {!loading && !error && data.length > 0 && (
                    <div className="mb-4">
                        <div className="input-group">
                            <span className="input-group-text bg-white" id="booking-search-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-muted" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search bookings by customer name, user ID, movie ID, show time, seat, or payment method..."
                                aria-label="Search bookings"
                                aria-describedby="booking-search-addon"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {!loading && !error && data.length > 0 && (
                    <div className="card shadow-sm border-light">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col" className="px-3" style={{ width: "100px" }}>Index</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Movie ID</th>
                                        <th scope="col">Show Date</th>
                                        <th scope="col" className="text-center">Show Time</th>
                                        <th scope="col" className="text-center">Tickets</th>
                                        <th scope="col" className="text-center">Seats</th>
                                        <th scope="col" className="text-center">Payment</th>
                                        <th scope="col" className="text-center">Actions</th>
                                        <th scope="col" className="text-end px-3">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((value, index) => (
                                        <tr key={value._id || index}>
                                            <th scope="row" className="px-3 text-muted" style={{ fontSize: "0.85rem" }}>
                                                {value._id ? value._id.substring(0, 10) + "..." : index + 1}
                                            </th>
                                            <td className="fw-semibold text-dark">{value.customerName}</td>
                                            <td className="text-muted" style={{ fontFamily: "monospace" }}>{value.userId}</td>
                                            <td className="text-muted" style={{ fontFamily: "monospace" }}>{value.movieId}</td>
                                            <td>{value.showDate ? new Date(value.showDate).toLocaleDateString() : "N/A"}</td>
                                            <td className="text-center">
                                                <span className="badge bg-light text-dark border">{value.showTime}</span>
                                            </td>
                                            <td className="text-center fw-semibold">{value.numberOfTickets}</td>
                                            <td className="text-center text-primary fw-semibold">{value.seatNumber}</td>
                                            <td className="text-center">
                                                <span className="badge bg-secondary">{value.paymentMethod}</span>
                                            </td>
                                            <td className="text-center">
                                                <Link
                                                    to={`/update-booking/${value._id}`}
                                                    state={{ item: value }}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                            <td className="text-end px-3 fw-bold text-success">
                                                ${parseFloat(value.bookingAmount || 0).toFixed(2)}
                                            </td>
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

export default ViewBookings