import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'

const UpdateUser = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    userId: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    city: '',
    username: '',
    membershipType: '',
    registrationDate: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = location.state?.item
    if (user) {
      setUserData({
        userId: user.userId || '',
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || '',
        age: user.age || '',
        city: user.city || '',
        username: user.username || '',
        membershipType: user.membershipType || '',
        registrationDate: user.registrationDate ? user.registrationDate.split('T')[0] : ''
      })
      setStatus({ type: '', message: '' })
    } else {
      setStatus({
        type: 'warning',
        message: 'Unable to load user details. Open edit from the user list to prefill data.'
      })
    }
    setLoading(false)
  }, [location.state])

  const inputHandler = (event) => {
    const { name, value } = event.target
    setUserData((prev) => ({ ...prev, [name]: value }))
    if (status.message) setStatus({ type: '', message: '' })
  }

  const updateUser = async (event) => {
    event.preventDefault()
    if (!userData.userId || !userData.fullName || !userData.email || !userData.membershipType) {
      setStatus({ type: 'danger', message: 'User ID, Full Name, Email, and Membership Type are required.' })
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/update-user', {
        id,
        ...userData
      })
      if (response.data?.status === 'Success') {
        setStatus({ type: 'success', message: 'User updated successfully.' })
        setTimeout(() => navigate('/view-user'), 1200)
      } else {
        setStatus({ type: 'danger', message: response.data?.message || 'Update failed.' })
      }
    } catch (error) {
      console.error('Error updating user:', error)
      setStatus({ type: 'danger', message: 'Unable to update user. Verify backend server.' })
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h2 className="fw-bold mb-0">Update User</h2>
          <div className="d-flex gap-2">
            <Link to="/view-user" className="btn btn-outline-secondary btn-sm">
              &larr; Back to Users
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
            User data is missing. Please open the edit action from the user list.
          </div>
        )}

        {!loading && location.state?.item && (
          <div className="card shadow-sm border-light">
            <div className="card-body p-4">
              <form onSubmit={updateUser}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">User ID *</label>
                    <input type="text" className="form-control" name="userId" value={userData.userId} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Full Name *</label>
                    <input type="text" className="form-control" name="fullName" value={userData.fullName} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Email *</label>
                    <input type="email" className="form-control" name="email" value={userData.email} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Phone</label>
                    <input type="text" className="form-control" name="phone" value={userData.phone} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Gender</label>
                    <select className="form-select" name="gender" value={userData.gender} onChange={inputHandler}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Age</label>
                    <input type="number" className="form-control" name="age" min="1" max="120" value={userData.age} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">City</label>
                    <input type="text" className="form-control" name="city" value={userData.city} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Username</label>
                    <input type="text" className="form-control" name="username" value={userData.username} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Membership Type *</label>
                    <select className="form-select" name="membershipType" value={userData.membershipType} onChange={inputHandler} required>
                      <option value="">Select Tier</option>
                      <option value="Regular">Regular</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Registration Date</label>
                    <input type="date" className="form-control" name="registrationDate" value={userData.registrationDate} onChange={inputHandler} />
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

export default UpdateUser
