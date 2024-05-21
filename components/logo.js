import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Logo = ({ width, height }) => {
  return (
    <Link href='/'
       className="transition-transform duration-300 hover:scale-110 cursor-pointer">
        <Image
          src="/logo.png"
          alt="Thought Share"
          width={width || 60}
          height={height || 60}
          className="object-contain"
        />
 
    </Link>
  );
};

export default Logo;