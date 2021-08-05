import Image from 'next/image';
import heroImage from '../images/hero-image.png';

function Banner() {
  return (
    <div className='relative h-[550px] sm:h-[650px] md:h-[680px]'>
      <Image
        src={heroImage}
        layout='fill'
        objectFit='cover'
      />

      <div className='absolute top-24 left-1/2 md:left-20 md:top-60 transform -translate-x-1/2 w-3/4 text-center md:text-left md:transform-none md:w-1/4 font-bold'>
        <h2 className='text-3xl text-white md:text-6xl'>
          Olympian &amp; Paralympian Online Experiences
        </h2>
        <button className='py-2 px-3 bg-white mt-5 rounded-lg shadow-sm text-sm font-semibold'>
          Explore Now
        </button>
      </div>

      {/* <div className='absolute top-1/2 w-full text-center'>
        <p className='text-sm sm:text-lg'>Not sure where to go? Perfect.</p>

        <button className='text-purple-500 bg-white px-10 py-4 shadow-md rounded-full
        font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150'>
          I'm Flexible
        </button>
      </div> */}


    </div>
  )
}

export default Banner;
