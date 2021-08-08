import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from '../components/Map';
import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import { useState } from "react";


function Search({ searchResults }) {
  const router = useRouter();
  const [viewLocation, setViewLocation] = useState({});
  
  const { startDate, endDate, location, numOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'MMMM dd, yyyy');
  const formattedEndDate = format(new Date(endDate), 'MMMM dd, yyyy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const starRating = (rating) => {
    let star = parseInt(rating);
    const output = [];
    
    for (let i = 0; i < 5; i++) {
      const uid = Math.floor(Math.random() * 100000);
      if (star <= 0) {
        star -= 1;
        output.push(<StarIconOutline key={uid} className='h-4 text-gray-600' />);
      } else {
        star -= 1;
        output.push(<StarIcon key={uid} className='h-5 text-red-400' />);
      }
    }
    return output;
  }

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numOfGuests}`} collapsed />
      
      <main className='flex md:max-w-5xl xl:max-w-full mx-auto'>
        <section className='pt-14 px-6'>
          <p className='text-sm'>300+ Stays: <span className='bg-gray-100'>{range}</span> for {numOfGuests} guests</p>

          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>

          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More..</p>
          </div>

          <div className=" flex-col">
            {searchResults && searchResults.map(({ img, location, title, lat, long, description, star, price, total }) => (
              <InfoCard
                key={img}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
                lat={lat}
                long={long}
                rating={starRating}
                setViewLocation={setViewLocation}
              />
            ))}
          </div>
        </section>

        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <Map rating={starRating} searchResults={searchResults} viewLocation={viewLocation} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Search;

export const getServerSideProps = async (context) => {
  const res = await fetch('https://links.papareact.com/isz');
  const searchResults = await res.json();

  return {
    props: {
      searchResults
    }
  }
};