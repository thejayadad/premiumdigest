'use client'

import React from 'react'
import NavItem from './nav-item'

const routes = [
    {
        href: '/',
        label: 'Home',

    },
    {
        href: '/dashboard',
        label: 'Dashboard'
    },
    {
        href: '/create',
        label: 'Create'
    },
]

const NavLinks = () => {
  return (
    <div className='flex gap-2 items-center'>
        {routes.map(route => (
            <NavItem
            href={route.href}
            label={route.label}
            key={route.label}
            />
        ))}
    </div>
  )
}

export default NavLinks