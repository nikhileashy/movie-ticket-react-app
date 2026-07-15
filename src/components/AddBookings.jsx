import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const AddBooking = () => {
    const [input, changeInput] = useState({
        userId: '',
        movieId: '',
        customerName: '',
        showDate: '',
        showTime: '',
        numberOfTickets: '',
        seatNumber: '',
        bookingAmount: '',
        paymentMethod: 'Cash'
    })
    const [status, setStatus] = useState({ type: "", message: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const inputHandler = (event) => {
        const { name, value } = event.target
        changeInput((previousState) => ({
            ...previousState,
            [name]: value
        }))
        if (status.message) setStatus({ type: "", message: "" })
    }

    const readValues = (e) => {
        e.preventDefault()

        if (!input.userId || !input.movieId || !input.customerName || !input.numberOfTickets || !input.seatNumber || !input.bookingAmount) {
            setStatus({ type: "danger", message: "Please fill in all mandatory fields to place ticket bookings." })
            return
        }

        setIsSubmitting(true)
        setStatus({ type: "", message: "" })

        axios.post("http://localhost:3000/add-booking", input)
            .then((response) => {
                if (response.data.status === "Success") {
                    setStatus({ type: "success", message: `Booking successfully processed for ${input.customerName}!` })
                    changeInput({
                        userId: '',
                        movieId: '',
                        customerName: '',
                        showDate: '',
                        showTime: '',
                        numberOfTickets: '',
                        seatNumber: '',
                        bookingAmount: '',
                        paymentMethod: 'Cash'
                    })
                } else {
                    setStatus({ type: "danger", message: response.data.message || "Failed to add booking." })
                }
            })
            .catch((error) => {
                console.error("Error adding booking: ", error)
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
                    <h2 className="fw-bold mb-0">Book Movie Ticket</h2>
                    <div className="d-flex gap-2">
                        <Link to="/" className="btn btn-outline-secondary btn-sm">
                            &larr; Dashboard
                        </Link>
                        <Link to="/view-bookings" className="btn btn-primary btn-sm">
                            View Reservations &rarr;
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
                        <form onSubmit={readValues}>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">User ID *</label>
                                    <input type="text" className="form-control" name="userId" placeholder="Enter User ID" value={input.userId} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Movie ID *</label>
                                    <input type="text" className="form-control" name="movieId" placeholder="Enter Movie ID" value={input.movieId} onChange={inputHandler} required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Customer Name *</label>
                                    <input type="text" className="form-control" name="customerName" placeholder="Enter Customer Full Name" value={input.customerName} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Show Date</label>
                                    <input type="date" className="form-control" name="showDate" value={input.showDate} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Show Time</label>
                                    <input type="text" className="form-control" name="showTime" placeholder="e.g. 7:00 PM" value={input.showTime} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-semibold">Number of Tickets *</label>
                                    <input type="number" className="form-control" name="numberOfTickets" min="1" placeholder="e.g. 2" value={input.numberOfTickets} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-semibold">Seat Number(s) *</label>
                                    <input type="text" className="form-control" name="seatNumber" placeholder="e.g. A-12, A-13" value={input.seatNumber} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-semibold">Booking Amount ($) *</label>
                                    <input type="number" className="form-control" name="bookingAmount" min="0" step="0.01" placeholder="e.g. 24.50" value={input.bookingAmount} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Payment Method</label>
                                    <select className="form-select" name="paymentMethod" value={input.paymentMethod} onChange={inputHandler}>
                                        <option value="Cash">Cash</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Debit Card">Debit Card</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Net Banking">Net Banking</option>
                                        <option value="Wallet">Wallet</option>
                                    </select>
                                </div>
                                
                                <div className="col-12 mt-4 pt-2 border-top">
                                    <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
                                        {isSubmitting ? "Processing..." : "Submit Booking"}
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

export default AddBooking