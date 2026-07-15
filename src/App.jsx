import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddMovies from './components/AddMovies'
import Home from './components/HOme'
import ViewBookings from './components/ViewBookings'
import AddBooking from './components/AddBookings'
import AddUser from './components/AddUser'
import ViewMovies from './components/ViewMovies'
import ViewUser from './components/ViewUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ViewUser/>
    <AddUser/>
     <AddMovies/>
     <ViewBookings/>
     <AddBooking/>
     <ViewMovies/>
    </>
  )
}

export default App
