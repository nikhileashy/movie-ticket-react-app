import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'

const UpdateBooking = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [booking, setBooking] = useState({
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
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = location.state?.item
    if (data) {
      setBooking({
        userId: data.userId || '',
        movieId: data.movieId || '',
        customerName: data.customerName || '',
        showDate: data.showDate ? data.showDate.split('T')[0] : '',
        showTime: data.showTime || '',
        numberOfTickets: data.numberOfTickets || '',
        seatNumber: data.seatNumber || '',
        bookingAmount: data.bookingAmount || '',
        paymentMethod: data.paymentMethod || 'Cash'
      })
      setStatus({ type: '', message: '' })
    } else {
      setStatus({
        type: 'warning',
        message: 'Unable to load booking details. Open edit from the bookings list to prefill data.'
      })
    }
    setLoading(false)
  }, [location.state])

  const inputHandler = (event) => {
    const { name, value } = event.target
    setBooking((prev) => ({ ...prev, [name]: value }))
    if (status.message) setStatus({ type: '', message: '' })
  }

  const updateBooking = async (event) => {
    event.preventDefault()

    if (!booking.userId || !booking.movieId || !booking.customerName || !booking.showDate) {
      setStatus({ type: 'danger', message: 'User ID, Movie ID, Customer Name, and Show Date are required.' })
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/update-booking', {
        id,
        ...booking
      })

      if (response.data?.status === 'Success') {
        setStatus({ type: 'success', message: 'Booking updated successfully.' })
        setTimeout(() => navigate('/view-bookings'), 1200)
      } else {
        setStatus({ type: 'danger', message: response.data?.message || 'Update failed.' })
      }
    } catch (error) {
      console.error('Error updating booking:', error)
      setStatus({ type: 'danger', message: 'Unable to update booking. Verify backend server.' })
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h2 className="fw-bold mb-0">Update Booking</h2>
          <div className="d-flex gap-2">
            <Link to="/view-bookings" className="btn btn-outline-secondary btn-sm">
              &larr; Back to Bookings
            </Link>
            <Link to="/" className="btn btn-outline-secondary btn-sm">
              Dashboard
            </Link>
          </div>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && status.message && (
          <div className={`alert alert-${status.type || 'info'} alert-dismissible fade show`} role="alert">
            {status.message}
            <button type="button" className="btn-close" onClick={() => setStatus({ type: '', message: '' })} aria-label="Close"></button>
          </div>
        )}

        {!loading && !location.state?.item && (
          <div className="alert alert-warning">
            Booking data is missing. Please open the edit action from the bookings list.
          </div>
        )}

        {!loading && location.state?.item && (
          <div className="card shadow-sm border-light">
            <div className="card-body p-4">
              <form onSubmit={updateBooking}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">User ID *</label>
                    <input type="text" className="form-control" name="userId" value={booking.userId} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Movie ID *</label>
                    <input type="text" className="form-control" name="movieId" value={booking.movieId} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Customer Name *</label>
                    <input type="text" className="form-control" name="customerName" value={booking.customerName} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Show Date *</label>
                    <input type="date" className="form-control" name="showDate" value={booking.showDate} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Show Time</label>
                    <input type="text" className="form-control" name="showTime" value={booking.showTime} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Number of Tickets</label>
                    <input type="number" className="form-control" name="numberOfTickets" value={booking.numberOfTickets} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Seat Number</label>
                    <input type="text" className="form-control" name="seatNumber" value={booking.seatNumber} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Booking Amount</label>
                    <input type="number" className="form-control" name="bookingAmount" step="0.01" value={booking.bookingAmount} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Payment Method</label>
                    <select className="form-select" name="paymentMethod" value={booking.paymentMethod} onChange={inputHandler}>
                      <option value="Cash">Cash</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="UPI">UPI</option>
                      <option value="Net Banking">Net Banking</option>
                      <option value="Wallet">Wallet</option>
                    </select>
                  </div>
                  <div className="col-12 mt-4 pt-2 border-top">
                    <button type="submit" className="btn btn-primary px-4">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpdateBooking
