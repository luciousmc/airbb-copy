import { HeartIcon, UserCircleIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';


function Footer() {
  return (
    <>
      <footer className='grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14
      bg-gray-100 text-gray-600'>
        <div className='space-y-4 text-xs text-gray-800'>
          <h5 className='font-bold'>ABOUT</h5>
          <p>How Airbnb works</p>
          <p>Newsroom</p>
          <p>Investors</p>
          <p>Airbnb Plus</p>
          <p>Airbnb Luxe</p>
        </div>

        <div className='space-y-4 text-xs text-gray-800'>
          <h5 className='font-bold'>Community</h5>
          <p>Accessibility</p>
          <p>This is not a real site</p>
          <p>Its a pretty awesome clone</p>
          <p>Referrals accepted</p>
          <p>Papafam</p>
        </div>

        <div className='space-y-4 text-xs text-gray-800'>
          <h5 className='font-bold'>HOST</h5>
          <p>Papa React</p>
          <p>Pesents</p>
          <p>Zero to Full Stack Hero</p>
          <p>Hundreds of Students</p>
          <p>Join Now!</p>
        </div>

        <div className='space-y-4 text-xs text-gray-800'>
          <h5 className='font-bold'>SUPPORT</h5>
          <p>Help Center</p>
          <p>Trust &amp; Safety</p>
          <p>Say Hi B</p>
          <p>Easter Eggs</p>
          <p>For the Win</p>
        </div>
      </footer>

      {/* Mobile bottom menu */}
      <div className='sticky bottom-0 w-full md:hidden bg-white p-3 border-t border-gray-300'>
        <div className='flex items-center justify-center space-x-20 text-gray-500'>
          <div className='text-center'>
            <SearchIcon className='h-7 text-red-500 cursor-pointer' />
            <p className='text-xs text-gray-800 font-semibold'>Explore</p>
          </div>
          
          <div className='group'>
            <HeartIcon className='h-7 group-hover:text-red-500 cursor-pointer' />
            <p className='text-xs group-hover:text-gray-800'>Wishlists</p>
          </div>

          <div className='group'>
            <UserCircleIcon className='h-7 group-hover:text-red-500 cursor-pointer' />
            <p className='text-xs group-hover:text-gray-800'>Log in</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
