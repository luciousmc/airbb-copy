import Image from 'next/image';
import { SearchIcon } from '@heroicons/react/solid';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { MenuIcon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/solid';
import Logo from './Logo';
import { useEffect, useRef, useState } from 'react';

function Header() {
  const headerRef = useRef();
  const [fillHeader, setFillHeader] = useState(false);

  const handleScroll = () => {
    const { clientHeight } = headerRef.current;

    if (window.pageYOffset > clientHeight) {
      setFillHeader(true);
    } else {
      setFillHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[]);

  return (
    <header ref={headerRef} className={`fixed w-full top-0 z-50 grid grid-cols-3 bg-trasparent p-5 md:px-10 ${fillHeader ? 'bg-white transition duration-200 shadow-md ease-in-out' : ''}`}>
      <div className='relative flex items-center h-10 cursor-pointer text-pink'>
        {/* <Image
          src='https://links.papareact.com/qd3'
          alt='Logo'
          layout='fill'
          objectFit='contain'
          objectPosition='left'
        /> */}
        <Logo color={fillHeader ? 'text-pink-500' : 'text-white'} />
      </div>
      {/* Mid Section */}
      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>

        <input
          className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400'
          type="text"
          placeholder='Start your search'
        />
        <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2' />
      </div>

      {/* Right Section */}
      <div className='flex space-x-4 items-center justify-end'>
        <p className='hidden md:inline text-gray-300'>Become a host</p>
        <GlobeAltIcon className='h-6 text-gray-300' />

        <div className='flex items-center space-x-2 border-2 p-2 rounded-full bg-gray-200'>
          <MenuIcon className='h-5 text-gray-600' />
          <UserCircleIcon className='h-6 text-gray-600' />
        </div>
      </div>
    </header>
  )
}

export default Header;
