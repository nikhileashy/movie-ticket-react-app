import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'

const AddUser = () => {
    const [userData, setUserData] = useState({
        userId: "",
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        age: "",
        city: "",
        username: "",
        membershipType: "",
        registrationDate: ""
    })
    const [status, setStatus] = useState({ type: "", message: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const inputHandler = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
        if (status.message) setStatus({ type: "", message: "" })
    }

    const readValue = (e) => {
        e.preventDefault()

        if (!userData.userId || !userData.fullName || !userData.email || !userData.membershipType) {
            setStatus({ type: "danger", message: "Please fill in all mandatory fields (User ID, Full Name, Email, and Membership)." })
            return
        }

        setIsSubmitting(true)
        setStatus({ type: "", message: "" })

        axios.post("http://localhost:3000/add-user", userData)
            .then((response) => {
                setStatus({ type: "success", message: `Member ${userData.fullName} registered successfully!` })
                setUserData({
                    userId: "",
                    fullName: "",
                    email: "",
                    phone: "",
                    gender: "",
                    age: "",
                    city: "",
                    username: "",
                    membershipType: "",
                    registrationDate: ""
                })
            })
            .catch((error) => {
                console.error("Error adding user: ", error)
                setStatus({ type: "danger", message: "Failed to save user. Verify backend server registry." })
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
                    <h2 className="fw-bold mb-0">Add New Customer</h2>
                    <div className="d-flex gap-2">
                        <Link to="/" className="btn btn-outline-secondary btn-sm">
                            &larr; Dashboard
                        </Link>
                        <Link to="/view-user" className="btn btn-primary btn-sm">
                            View Members &rarr;
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
                                    <label className="form-label fw-semibold">User ID *</label>
                                    <input type="text" className="form-control" name="userId" placeholder="Enter User ID (e.g. USR500)" value={userData.userId} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Full Name *</label>
                                    <input type="text" className="form-control" name="fullName" placeholder="Enter Customer Full Name" value={userData.fullName} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Email Address *</label>
                                    <input type="email" className="form-control" name="email" placeholder="Enter Email Address" value={userData.email} onChange={inputHandler} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Phone Number</label>
                                    <input type="text" className="form-control" name="phone" placeholder="Enter Phone Number" value={userData.phone} onChange={inputHandler} />
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
                                    <input type="number" className="form-control" name="age" min="1" max="120" placeholder="Enter Age" value={userData.age} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">City</label>
                                    <input type="text" className="form-control" name="city" placeholder="Enter Resident City" value={userData.city} onChange={inputHandler} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label fw-semibold">Username</label>
                                    <input type="text" className="form-control" name="username" placeholder="Enter Account Username" value={userData.username} onChange={inputHandler} />
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
                                    <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
                                        {isSubmitting ? "Registering..." : "Submit Registration"}
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

export default AddUser