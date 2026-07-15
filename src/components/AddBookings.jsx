import axios from 'axios'
import React, { useState } from 'react'
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

    const inputHandler = (event) => {
        const { name, value } = event.target
        changeInput((previousState) => ({
            ...previousState,
            [name]: value
        }))
    }

    const readValues = () => {
        axios.post("http://localhost:3000/add-booking", input)
            .then((response) => {
                if (response.data.status === "Success") {
                    alert("Booking Added Successfully")
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
                    alert("Something went wrong")
                }
            })
            .catch((error) => {
                console.log("Error adding booking: ", error)
            })
    }

    return (
        <div>
            <NavBar/>
        <div className="container">
            <div className="row g-3">
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">User ID</label>
                    <input type="text" className="form-control" name="userId" value={input.userId} onChange={inputHandler} />
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">Movie ID</label>
                    <input type="text" className="form-control" name="movieId" value={input.movieId} onChange={inputHandler} />
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">Customer Name</label>
                    <input type="text" className="form-control" name="customerName" value={input.customerName} onChange={inputHandler} />
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">Show Date</label>
                    <input type="date" className="form-control" name="showDate" value={input.showDate} onChange={inputHandler} />
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">Show Time</label>
                    <input type="text" className="form-control" name="showTime" value={input.showTime} onChange={inputHandler} />
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">Number of Tickets</label>
                    <input type="number" className="form-control" name="numberOfTickets" value={input.numberOfTickets} onChange={inputHandler} />
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">Seat Number</label>
                    <input type="text" className="form-control" name="seatNumber" value={input.seatNumber} onChange={inputHandler} />
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">Booking Amount</label>
                    <input type="number" className="form-control" name="bookingAmount" value={input.bookingAmount} onChange={inputHandler} />
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select" name="paymentMethod" value={input.paymentMethod} onChange={inputHandler}>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Wallet">Wallet</option>
                    </select>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <button className="btn btn-success" onClick={readValues}>Submit</button>
                </div>
            </div>
        </div></div>
    )
}

export default AddBooking