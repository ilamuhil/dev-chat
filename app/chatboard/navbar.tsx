import React from 'react'
import NavbarItems from './components/navbar-items'

export default async function Navbar() {
  return (
    <nav className='bg-gray-700 py-4 px-8 shadow-xl bg-opacity-75'>
      <div className='je px-2 md:px-4 gap-2 sm:gap-4 md:gap-8'>
        <h1 className='mr-auto text-xl mt-1 font-serif'>Developers Chat</h1>
        <NavbarItems />
        <p className='mt-2'>Ilamuhil</p>
      </div>
    </nav>
  )
}
