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
    <header ref={headerRef} className={`fixed w-full top-0 z-50 grid grid-cols-6 bg-trasparent p-5 md:px-10 ${fillHeader ? 'bg-white transition duration-200 shadow-md ease-in-out' : ''}`}>
      <div className='relative flex items-center h-10 cursor-pointer text-gray-800 col-start-1 col-end-2'>
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
      <div className='absolute top-24 left-[50%] transform -translate-x-1/2 w-[90%] md:w-3/4 lg:w-2/3 max-w-4xl'>
        <div className='flex items-center justify-center gap-x-8 text-gray-200 mb-8 font-semibold'>
          <h2 className='header__link active'>Places to stay</h2>
          <h2 className='header__link'>Experiences</h2>
          <h2 className='header__link'>Online Experiences</h2>
        </div>
        
        {/* <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
          <input
            className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400'
            type="text"
            placeholder='Start your search'
          />
          <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2' />
        </div> */}

        <div className='grid grid-cols-4 divide-x-2 items-center bg-white rounded-full'>
          <div className='pl-6 py-3 hover:bg-gray-300 rounded-full cursor-pointer'>
            <h3 className='text-xs font-bold'>Location</h3>
            <input
              className='outline-none text-sm text-gray-100 focus:text-gray-800 placeholder-gray-400 bg-transparent w-3/4 trunc'
              type="text"
              placeholder='Where are you going?'
            />
          </div>

          <div className='flex flex-col pl-6 justify-center hover:bg-gray-100 rounded-full cursor-pointer h-full'>
            <h3 className='text-xs font-bold'>Check in</h3>
            <p className='text-sm text-gray-600'>Add dates</p>
          </div>
          
          <div className='flex flex-col pl-6 justify-center hover:bg-gray-100 rounded-full cursor-pointer h-full'>
            <h3 className='text-xs font-bold'>Check out</h3>
            <p className='text-sm text-gray-600'>Add dates</p>
          </div>
          
          <div className='flex items-center pl-6 hover:bg-gray-100 rounded-full cursor-pointer h-full'>
            <div className='flex flex-col flex-grow'>
              <h3 className='text-xs font-bold'>Guests</h3>
              <p className='text-sm text-gray-600'>Add guests</p>
            </div>
            <SearchIcon className='hidden md:inline-flex h-12 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2' />
          </div>
        </div>

      </div>

      {/* Right Section */}
      <div className='flex space-x-4 items-center justify-end col-start-6 col-end-7'>
        <p className={`hidden md:inline whitespace-nowrap ${fillHeader ? 'text-gray-500' : 'text-gray-300'}`}>Become a host</p>
        <GlobeAltIcon className={`h-6 ${fillHeader ? 'text-gray-500' : 'text-gray-300'}`} />

        <div className={`flex items-center space-x-2 border p-2 rounded-full bg-gray-100 ${fillHeader ? 'border-gray-300' : 'border-transparent'}`}>
          <MenuIcon className='h-5 text-gray-500' />
          <UserCircleIcon className='h-6 text-gray-500' />
        </div>
      </div>
    </header>
  )
}

export default Header;
