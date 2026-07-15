import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ViewMovies = () => {
    const [data, changeData] = useState([])

    const fetchData = () => {
        axios.post("http://localhost:3000/view-movies")
            .then((response) => {
                changeData(response.data)
            })
            .catch((error) => {
                console.log("Error fetching movies: ", error)
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
                        <th scope="col">Movie ID</th>
                        <th scope="col">Movie Name</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Director</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Language</th>
                        <th scope="col">Show Time</th>
                        <th scope="col">Ticket Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, index) => {
                        return (
                            <tr key={value._id || index}>
                                <th scope="row">{value._id || index + 1}</th>
                                <td>{value.movieName}</td>
                                <td>{value.genre}</td>
                                <td>{value.director}</td>
                                <td>{value.releaseDate ? new Date(value.releaseDate).toLocaleDateString() : ""}</td>
                                <td>{value.duration}</td>
                                <td>{value.rating}</td>
                                <td>{value.language}</td>
                                <td>{value.showTime}</td>
                                <td>${value.ticketPrice}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ViewMovies