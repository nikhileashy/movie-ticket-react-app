import axios from 'axios'
import React, { useState } from 'react'

const AddMovies = () => {
    const [input, changeInput] = useState({
        movieName: "",
        language: "",
        genre: "",
        duration: "",
        releaseDate: "",
        director: "",
        rating: "",
        showTime: "",
        ticketPrice: ""
    })
    const inputHandler = (event) => {
        changeInput({ ...input, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        console.log(input)

        axios.post("http://localhost:3000/add-movie", input)
            .then((response) => {
                alert("Movie added successfully")
            })
            .catch((error) => {
                console.error("Error adding movies", error)
                alert("Failed to add movie")
            })
    }

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-4">
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Movie Name</label>
                                <input type="text" className="form-control" name="movieName" value={input.movieName} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Language</label>
                                <input type="text" className="form-control" name="language" value={input.language} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Genre</label>
                                <input type="text" className="form-control" name="genre" value={input.genre} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Duration</label>
                                <input type="text" className="form-control" name="duration" value={input.duration} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Release Date</label>
                                <input type="date" className="form-control" name="releaseDate" value={input.releaseDate} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Director</label>
                                <input type="text" className="form-control" name="director" value={input.director} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Rating</label>
                                <input type="number" className="form-control" name="rating" min="0" max="10" value={input.rating} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Show Time</label>
                                <input type="text" className="form-control" name="showTime" value={input.showTime} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Ticket Price</label>
                                <input type="number" className="form-control" name="ticketPrice" min="0" value={input.ticketPrice} onChange={inputHandler} />
                            </div>
                            <div className="col col-12">
                                <button className="btn btn-success" onClick={readValue}>ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMovies