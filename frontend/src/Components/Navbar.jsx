import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='p-4 border-b-2'>
      <ul className='flex space-x-4'>
        <li>
          <Link to="/" className='text-xl'>Logo</Link>
        </li>
        <li>
          <Link to="/dashboard" className='text-xl'>Dashboard</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
