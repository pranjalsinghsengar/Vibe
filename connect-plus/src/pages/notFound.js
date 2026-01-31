import React from 'react'
import Layout from '../components/layout'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-primary mb-8">Oops! The page you're looking for doesn't exist.</p>
      
      <Link
        to="/"
        className="inline-block bg-primary text-secondary border hover:border-primary py-2 px-6 rounded-sm font-semibold hover:bg-secondary hover:text-primary transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
            
  </>
  )
}

export default NotFound