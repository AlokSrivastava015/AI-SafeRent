import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { MapPin, User, Menu } from 'lucide-react'
import { Button } from '../components/common/Button'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <MapPin className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-navy-900">AI SafeRent</span>
          </Link>
          
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/search" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Find Rentals
            </Link>
            <Link to="/ai" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              AI Recommendations
            </Link>
            <Link to="/dna" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Neighborhood DNA
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
            <Button>Sign up</Button>
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <MapPin className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-bold">AI SafeRent</span>
            </div>
            <p className="text-navy-100 text-sm">
              Your AI-powered rental intelligence platform. Discover safe, affordable, and perfect neighborhoods.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Platform</h4>
            <ul className="space-y-2 text-sm text-navy-100">
              <li><Link to="/search" className="hover:text-white transition">Search Properties</Link></li>
              <li><Link to="/dna" className="hover:text-white transition">Neighborhood DNA</Link></li>
              <li><Link to="/ai" className="hover:text-white transition">AI Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Company</h4>
            <ul className="space-y-2 text-sm text-navy-100">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Newsletter</h4>
            <p className="text-sm text-navy-100 mb-2">Get the latest rental insights.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="px-3 py-2 rounded-md bg-navy-800 text-sm border-none focus:ring-1 focus:ring-emerald-500 outline-none w-full" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-navy-800 text-center text-sm text-navy-100">
          © {new Date().getFullYear()} AI SafeRent. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
