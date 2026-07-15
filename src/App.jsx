import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './components/HOme'
import AddUser from './components/AddUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AddUser/>
    </>
  )
}

export default App
