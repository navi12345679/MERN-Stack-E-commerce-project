import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
 
  return (
    <Router>
    <div>
      <Navbar/>
      <Admin/>
    </div>
    </Router>
  )
}

export default App
