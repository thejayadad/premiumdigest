'use client'
import React from 'react';
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from 'next/link';

const NavItem = ({ label, href }) => {
    const pathname = usePathname();
    const isActive = 
    (pathname === href) 


  return (
    <Link href={href}
       className={`text-blue-500 ${isActive ? 'font-bold' : 'text-gray-500'}`}>{label}
    </Link>
  );
};

export default NavItem;
