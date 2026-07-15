import './App.css'
import AddMovies from './components/AddMovies'
import AddBookings from './components/AddBookings'
import AddUser from './components/AddUser'
import UpdateMovie from './components/UpdateMovie'
import UpdateBooking from './components/UpdateBooking'
import UpdateUser from './components/UpdateUser'
import ViewMovies from './components/ViewMovies'
import Home from './components/Home'
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
          <Route path="update-movie/:id" element={<UpdateMovie />} />
          <Route path="add-booking" element={<AddBookings />} />
          <Route path="view-bookings" element={<ViewBookings />} />
          <Route path="update-booking/:id" element={<UpdateBooking />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="view-user" element={<ViewUser />} />
          <Route path="update-user/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
