import React, { useState } from 'react'
import axios from 'axios'

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

    const inputHandler = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const readValue = () => {
        console.log(userData)

        axios.post("http://localhost:3000/add-user", userData)
            .then((response) => {
                console.log(response.data)
                alert("User Added Successfully")

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
                console.log(error)
                alert("Error Adding User")
            })
    }

    return (
        <div>
            <h2 className="text-center p-5">User Management</h2>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row g-4">

                            <div className="col-md-6">
                                <label className="form-label">User ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="userId"
                                    value={userData.userId}
                                    onChange={inputHandler}
                                    placeholder="Enter User ID"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={userData.fullName}
                                    onChange={inputHandler}
                                    placeholder="Enter Full Name"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={userData.email}
                                    onChange={inputHandler}
                                    placeholder="Enter Email"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={inputHandler}
                                    placeholder="Enter Phone Number"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    name="gender"
                                    value={userData.gender}
                                    onChange={inputHandler}
                                >
                                    <option value="">Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    value={userData.age}
                                    onChange={inputHandler}
                                    placeholder="Enter Age"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={userData.city}
                                    onChange={inputHandler}
                                    placeholder="Enter City"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={userData.username}
                                    onChange={inputHandler}
                                    placeholder="Enter Username"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Membership Type</label>
                                <select
                                    className="form-select"
                                    name="membershipType"
                                    value={userData.membershipType}
                                    onChange={inputHandler}
                                >
                                    <option value="">Select Membership</option>
                                    <option>Regular</option>
                                    <option>Silver</option>
                                    <option>Gold</option>
                                    <option>Platinum</option>
                                    <option>Premium</option>
                                    <option>VIP</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Registration Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="registrationDate"
                                    value={userData.registrationDate}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-12 text-center">
                                <button
                                    className="btn btn-success"
                                    onClick={readValue}
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser