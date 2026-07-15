import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ViewBookings = () => {
    const [data, changeData] = useState([])

    const fetchData = () => {
        axios.post("http://localhost:3000/view-bookings")
            .then((response) => {
                changeData(response.data)
            })
            .catch((error) => {
                console.log("Error fetching bookings: ", error)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Movie ID</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Show Date</th>
                        <th scope="col">Show Time</th>
                        <th scope="col">Number of Tickets</th>
                        <th scope="col">Seat Number</th>
                        <th scope="col">Booking Amount</th>
                        <th scope="col">Payment Method</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, index) => {
                        return (
                            <tr key={value._id || index}>
                                <th scope="row">{value._id || index + 1}</th>
                                <td>{value.userId}</td>
                                <td>{value.movieId}</td>
                                <td>{value.customerName}</td>
                                <td>{value.showDate ? new Date(value.showDate).toLocaleDateString() : ""}</td>
                                <td>{value.showTime}</td>
                                <td>{value.numberOfTickets}</td>
                                <td>{value.seatNumber}</td>
                                <td>${value.bookingAmount}</td>
                                <td>{value.paymentMethod}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ViewBookings