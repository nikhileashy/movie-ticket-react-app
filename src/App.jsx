import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddMovies from './components/AddMovies'
import Home from './components/HOme'
import AddBooking from './components/AddBookings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AddMovies/>
     <AddBooking/>
    </>
  )
}

export default App
