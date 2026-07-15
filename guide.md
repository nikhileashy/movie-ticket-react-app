# React Frontend Integration Guide

This guide describes how to connect your React frontend to the newly added **Delete**, **Update**, and **Search** routes in the movie ticket backend application.

## Table of Contents
1. [Backend Base URL](#backend-base-url)
2. [User API Integration](#1-user-api-integration)
   - [Delete User](#delete-user)
   - [Update User](#update-user)
   - [Search Users](#search-users)
3. [Movie API Integration](#2-movie-api-integration)
   - [Delete Movie](#delete-movie)
   - [Update Movie](#update-movie)
   - [Search Movies](#search-movies)
4. [Booking API Integration](#3-booking-api-integration)
   - [Delete Booking](#delete-booking)
   - [Update Booking](#update-booking)
   - [Search Bookings](#search-bookings)
5. [React Component Implementation Example](#react-component-implementation-example)

---

## Backend Base URL
Ensure your backend requests point to:
`http://localhost:3000` (or your production backend URL)

---

## 1. User API Integration

### Delete User
*   **Endpoint**: `/delete-user`
*   **Method**: `POST`
*   **Headers**: `Content-Type: application/json`

#### Frontend Call Example (`fetch`):
```javascript
const deleteUser = async (userId) => {
  try {
    const response = await fetch('http://localhost:3000/delete-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }),
    });
    
    const result = await response.json();
    if (result.status === 'Success') {
      console.log('User deleted successfully');
      // Refresh user list in UI here
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};
```

---

### Update User
*   **Endpoint**: `/update-user`
*   **Method**: `POST`
*   **Headers**: `Content-Type: application/json`

#### Frontend Call Example (`fetch`):
```javascript
const updateUser = async (userId, updatedData) => {
  try {
    const response = await fetch('http://localhost:3000/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        ...updatedData // e.g. { fullName: 'New Name', city: 'London' }
      }),
    });

    const result = await response.json();
    if (result.status === 'Success') {
      console.log('User updated:', result.data);
      return result.data;
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error('Failed to update user:', error);
  }
};
```

---

### Search Users
Supports keyword searches across `fullName`, `email`, `phone`, `username`, `city`, and `membershipType`, as well as precise field filters.

*   **Endpoint**: `/search-user`
*   **Method**: `POST`
*   **Headers**: `Content-Type: application/json`

#### Frontend Call Examples (`fetch`):

**Keyword Search (Search Bar):**
```javascript
const searchUsers = async (queryText) => {
  try {
    const response = await fetch('http://localhost:3000/search-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: queryText }), // Search bar text
    });
    const data = await response.json();
    return data; // Array of matched users
  } catch (error) {
    console.error('Search error:', error);
  }
};
```

**Filter Search (e.g. VIP Users in New York):**
```javascript
const filterUsers = async (city, membershipType) => {
  try {
    const response = await fetch('http://localhost:3000/search-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city, membershipType }), // Filter criteria
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Filter error:', error);
  }
};
```

---

## 2. Movie API Integration

### Delete Movie
*   **Endpoint**: `/delete-movie`
*   **Method**: `POST`

```javascript
const deleteMovie = async (movieId) => {
  const response = await fetch('http://localhost:3000/delete-movie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: movieId }),
  });
  return response.json();
};
```

### Update Movie
*   **Endpoint**: `/update-movie`
*   **Method**: `POST`

```javascript
const updateMovie = async (movieId, updateFields) => {
  const response = await fetch('http://localhost:3000/update-movie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: movieId, ...updateFields }),
  });
  return response.json();
};
```

### Search Movies
*   **Endpoint**: `/search-movie`
*   **Method**: `POST`
*   Matches: `movieName`, `language`, `genre`, `director`, and `showTime`.

```javascript
const searchMovies = async (queryText, genreFilter) => {
  const response = await fetch('http://localhost:3000/search-movie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryText, genre: genreFilter }),
  });
  return response.json(); // Array of matched movies
};
```

---

## 3. Booking API Integration

### Delete Booking
*   **Endpoint**: `/delete-booking`
*   **Method**: `POST`

```javascript
const deleteBooking = async (bookingId) => {
  const response = await fetch('http://localhost:3000/delete-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: bookingId }),
  });
  return response.json();
};
```

### Update Booking
*   **Endpoint**: `/update-booking`
*   **Method**: `POST`

```javascript
const updateBooking = async (bookingId, updateFields) => {
  const response = await fetch('http://localhost:3000/update-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: bookingId, ...updateFields }),
  });
  return response.json();
};
```

### Search Bookings
*   **Endpoint**: `/search-booking`
*   **Method**: `POST`
*   Matches: `userId`, `movieId`, `customerName`, `showTime`, `seatNumber`, and `paymentMethod`.

```javascript
const searchBookings = async (queryText, paymentMethod) => {
  const response = await fetch('http://localhost:3000/search-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryText, paymentMethod }),
  });
  return response.json(); // Array of matched bookings
};
```

---

## React Component Implementation Example
Here is a sample React functional component demonstrating how to search, update, and delete users from a single view.

```jsx
import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3000';

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Fetch all users initially
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/view-users`, { method: 'POST' });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Handle Search
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    try {
      const response = await fetch(`${API_BASE}/search-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: value }),
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error searching users:', err);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/delete-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.status === 'Success') {
        setUsers(users.filter(u => u._id !== id));
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Handle Update Form Submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/update-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingUser._id,
          fullName: editingUser.fullName,
          city: editingUser.city,
          membershipType: editingUser.membershipType,
        }),
      });
      const result = await response.json();
      if (result.status === 'Success') {
        setUsers(users.map(u => u._id === editingUser._id ? result.data : u));
        setEditingUser(null);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>User Management Dashboard</h2>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />

      {/* Edit Form Modal/Section */}
      {editingUser && (
        <form onSubmit={handleUpdateSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', background: '#f9f9f9' }}>
          <h3>Edit User</h3>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={editingUser.fullName}
              onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
              required
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>City: </label>
            <input
              type="text"
              value={editingUser.city}
              onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })}
              required
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Membership: </label>
            <select
              value={editingUser.membershipType}
              onChange={(e) => setEditingUser({ ...editingUser, membershipType: e.target.value })}
            >
              {['Regular', 'Silver', 'Gold', 'Platinum', 'Premium', 'VIP'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ marginTop: '10px', marginRight: '10px' }}>Save Changes</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}

      {/* User Table */}
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Membership</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>{user.membershipType}</td>
              <td>
                <button onClick={() => setEditingUser(user)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
```
