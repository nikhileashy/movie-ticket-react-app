import './App.css'
import AddMovies from './components/AddMovies'
import Home from './components/HOme'
import ViewBookings from './components/ViewBookings'
import AddBooking from './components/AddBookings'
import AddUser from './components/AddUser'
import ViewMovies from './components/ViewMovies'
import ViewUser from './components/ViewUser'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewBookings from './components/ViewBookings'

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="add-movie" element={<AddMovies />} />
          <Route path="view-movie" element={<ViewMovies />} />
          <Route path="add-booking" element={<AddBooking />} />
          <Route path="view-booking" element={<ViewBookings />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="view-user" element={<ViewUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
