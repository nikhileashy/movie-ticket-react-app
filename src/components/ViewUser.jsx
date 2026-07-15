import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'

const ViewUser = () => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUsers = () => {
        setLoading(true)
        axios.post("http://localhost:3000/view-users")
            .then((response) => {
                setUsers(response.data)
                setError(null)
            })
            .catch((err) => {
                console.error("Error loading users: ", err)
                setError("Unable to connect to registry server. Please verify backend status.")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleUserSearch = (value) => {
        setSearchTerm(value)

        if (!value.trim()) {
            fetchUsers()
            return
        }

        axios.post("http://localhost:3000/search-user", { query: value })
            .then((response) => {
                setUsers(response.data)
                setError(null)
            })
            .catch((err) => {
                console.error("Error searching users: ", err)
                setError("Unable to search users right now. Please retry.")
            })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const getMembershipBadge = (type) => {
        switch(type) {
            case "VIP": return "bg-warning text-dark";
            case "Premium": return "bg-purple text-white";
            case "Platinum": return "bg-info text-dark";
            case "Gold": return "bg-warning text-dark";
            case "Silver": return "bg-secondary text-white";
            default: return "bg-primary text-white";
        }
    }

    return (
        <div>
            <NavBar/>
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                    <div className="d-flex align-items-baseline gap-2">
                        <h2 className="fw-bold mb-0">Membership Directory</h2>
                        {!loading && !error && (
                            <span className="badge bg-secondary rounded-pill">{users.length} Users</span>
                        )}
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/" className="btn btn-outline-secondary btn-sm">
                            &larr; Dashboard
                        </Link>
                        <Link to="/add-user" className="btn btn-success btn-sm">
                            + Add User
                        </Link>
                    </div>
                </div>

                {!loading && !error && users.length > 0 && (
                    <div className="mb-4">
                        <div className="input-group">
                            <span className="input-group-text bg-white" id="search-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-muted" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search by customer name, email address, city, or ID..." 
                                aria-label="Search" 
                                aria-describedby="search-addon"
                                value={searchTerm}
                                onChange={(e) => handleUserSearch(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Retrieving user roster...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="alert alert-danger p-4 text-center" role="alert">
                        <h4 className="alert-heading">Database Error</h4>
                        <p className="mb-3">{error}</p>
                        <button onClick={fetchUsers} className="btn btn-outline-danger btn-sm">Retry Connection</button>
                    </div>
                )}

                {!loading && !error && users.length === 0 && (
                    <div className="card text-center p-5 shadow-sm border-light">
                        <div className="card-body">
                            <h3 className="card-title text-muted mb-3">No Registered Users</h3>
                            <p className="card-text text-secondary mb-4">No membership profiles are currently saved in the database.</p>
                            <Link to="/add-user" className="btn btn-primary">
                                Create First Profile
                            </Link>
                        </div>
                    </div>
                )}

                {!loading && !error && users.length > 0 && (
                    <div className="card shadow-sm border-light">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col" className="px-3" style={{ width: "120px" }}>User ID</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col" className="text-center">Gender</th>
                                        <th scope="col" className="text-center">Age</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Username</th>
                                        <th scope="col" className="text-center">Membership</th>
                                        <th scope="col" className="text-center">Actions</th>
                                        <th scope="col" className="px-3">Member Since</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((value, index) => (
                                        <tr key={value._id || index}>
                                            <th scope="row" className="px-3 text-primary" style={{ fontFamily: "monospace" }}>{value.userId}</th>
                                            <td className="fw-semibold text-dark">{value.fullName}</td>
                                            <td>{value.email}</td>
                                            <td>{value.phone || "N/A"}</td>
                                            <td className="text-center">{value.gender || "N/A"}</td>
                                            <td className="text-center">{value.age || "N/A"}</td>
                                            <td>{value.city || "Global"}</td>
                                            <td style={{ fontFamily: "monospace" }}>@{value.username || "guest"}</td>
                                            <td className="text-center">
                                                <span className={`badge ${getMembershipBadge(value.membershipType)}`}>
                                                    {value.membershipType || "Regular"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <Link
                                                    to={`/update-user/${value._id}`}
                                                    state={{ item: value }}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                            <td className="px-3">
                                                {value.registrationDate ? new Date(value.registrationDate).toLocaleDateString() : "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan="10" className="text-center py-4 text-muted">
                                                No registered customers match your search filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                .bg-purple {
                    background-color: #8f44fd !important;
                }
            `}</style>
        </div>
    )
}

export default ViewUser