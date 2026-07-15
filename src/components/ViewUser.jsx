import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ViewUser = () => {

    const [users, setUsers] = useState([])

    const fetchUsers = () => {
        axios.post("http://localhost:3000/view-users")
            .then((response) => {
                console.log(response.data)
                setUsers(response.data)
            })
            .catch((error) => {
                console.log(error)
                alert("Error loading users")
            })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <h2 className="text-center p-5">View Users</h2>

            <div className="container">
                <div className="table-responsive">

                    <table className="table table-bordered table-striped table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>User ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>City</th>
                                <th>Username</th>
                                <th>Membership</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value.userId}</td>
                                        <td>{value.fullName}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.gender}</td>
                                        <td>{value.age}</td>
                                        <td>{value.city}</td>
                                        <td>{value.username}</td>
                                        <td>{value.membershipType}</td>
                                        <td>{new Date(value.registrationDate).toLocaleDateString()}</td>
                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    )
}

export default ViewUser