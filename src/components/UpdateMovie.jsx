import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'

const UpdateMovie = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    movieName: '',
    language: '',
    genre: '',
    duration: '',
    releaseDate: '',
    director: '',
    rating: '',
    showTime: '',
    ticketPrice: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const movie = location.state?.item
    if (movie) {
      setInput({
        movieName: movie.movieName || '',
        language: movie.language || '',
        genre: movie.genre || '',
        duration: movie.duration || '',
        releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
        director: movie.director || '',
        rating: movie.rating || '',
        showTime: movie.showTime || '',
        ticketPrice: movie.ticketPrice || ''
      })
      setStatus({ type: '', message: '' })
    } else {
      setStatus({
        type: 'warning',
        message: 'Unable to load movie details. Open edit from the movie list to prefill data.'
      })
    }
    setLoading(false)
  }, [location.state])

  const inputHandler = (event) => {
    const { name, value } = event.target
    setInput((prev) => ({ ...prev, [name]: value }))
    if (status.message) setStatus({ type: '', message: '' })
  }

  const updateMovie = async (event) => {
    event.preventDefault()

    if (!input.movieName || !input.genre || !input.ticketPrice) {
      setStatus({ type: 'danger', message: 'Movie Name, Genre and Ticket Price are required.' })
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/update-movie', {
        id,
        ...input
      })

      if (response.data?.status === 'Success') {
        setStatus({ type: 'success', message: 'Movie updated successfully.' })
        setTimeout(() => navigate('/view-movie'), 1200)
      } else {
        setStatus({ type: 'danger', message: response.data?.message || 'Update failed.' })
      }
    } catch (error) {
      console.error('Error updating movie:', error)
      setStatus({ type: 'danger', message: 'Unable to update movie. Verify backend server.' })
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h2 className="fw-bold mb-0">Update Movie</h2>
          <div className="d-flex gap-2">
            <Link to="/view-movie" className="btn btn-outline-secondary btn-sm">
              &larr; Back to Movies
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
            Movie data is missing. Please open the edit action from the movie list.
          </div>
        )}

        {!loading && location.state?.item && (
          <div className="card shadow-sm border-light">
            <div className="card-body p-4">
              <form onSubmit={updateMovie}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Movie Name *</label>
                    <input type="text" className="form-control" name="movieName" placeholder="Enter movie title" value={input.movieName} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Language</label>
                    <input type="text" className="form-control" name="language" placeholder="Enter movie language" value={input.language} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Genre *</label>
                    <input type="text" className="form-control" name="genre" placeholder="Enter genre" value={input.genre} onChange={inputHandler} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Duration</label>
                    <input type="text" className="form-control" name="duration" placeholder="e.g. 130 min" value={input.duration} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Release Date</label>
                    <input type="date" className="form-control" name="releaseDate" value={input.releaseDate} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Director</label>
                    <input type="text" className="form-control" name="director" placeholder="Enter director name" value={input.director} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Rating</label>
                    <input type="number" className="form-control" name="rating" min="0" max="10" step="0.1" placeholder="e.g. 8.5" value={input.rating} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Show Time</label>
                    <input type="text" className="form-control" name="showTime" placeholder="e.g. 7:00 PM" value={input.showTime} onChange={inputHandler} />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Ticket Price *</label>
                    <input type="number" className="form-control" name="ticketPrice" min="0" step="0.01" placeholder="e.g. 12.99" value={input.ticketPrice} onChange={inputHandler} required />
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

export default UpdateMovie
