import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Landing from './pages/Landing/Landing'
import Search from './pages/Search/Search'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
        </Route>
        
        {/* Dashboard routes will likely have a different layout */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
