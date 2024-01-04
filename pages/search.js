import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/dist/client/router';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
import { ChevronDownIcon, RefreshIcon, StarIcon } from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import { useState } from 'react';

function Search({ searchResults }) {
  // Filter values
  const FILTER_DEFAULT = 'Select Filter';
  const FILTER_LOW_TO_HIGH = 'Price: Lowest to Highest';
  const FILTER_NUM_OF_GUESTS = 'Number of Guests';
  const FILTER_WIFI = 'Wifi Availability';
  const FILTER_FREE_PARKING = 'Free Parking';

  // Get information from query string
  const router = useRouter();
  const { startDate, endDate, location, numOfGuests } = router.query;

  // State for mapbox view location
  const [viewLocation, setViewLocation] = useState({});

  //  Datepicker info
  const formattedStartDate = format(new Date(startDate), 'MMMM dd, yyyy');
  const formattedEndDate = format(new Date(endDate), 'MMMM dd, yyyy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  // State for filter menu search results
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterValue, setFilterValue] = useState(FILTER_DEFAULT);

  // Convert integer 1 to 5 to 5 star rating, rounded down.
  const starRating = (rating) => {
    let star = Math.floor(rating);
    const output = [];

    for (let i = 0; i < 5; i++) {
      const uid = Math.floor(Math.random() * 100000);
      if (star <= 0) {
        star -= 1;
        output.push(
          <StarIconOutline key={uid} className='h-4 text-gray-600' />
        );
      } else {
        star -= 1;
        output.push(<StarIcon key={uid} className='h-5 text-red-400' />);
      }
    }
    return output;
  };

  // Filter search results by category
  const showFilteredResults = (filter) => {
    const output = [];
    switch (filter) {
      case FILTER_DEFAULT:
        return searchResults;
      case FILTER_LOW_TO_HIGH:
        const priceFilter = searchResults.sort((first, second) => {
          return first.price.substr(1, 2) - second.price.substr(1, 2);
        });

        output.push(...priceFilter);
        break;
      case FILTER_NUM_OF_GUESTS:
        const guestFilter = searchResults.filter((result) => {
          return result.description.substr(0, 1) >= numOfGuests;
        });

        output.push(...guestFilter);
        break;
      case FILTER_WIFI:
        const wifiFilter = searchResults.filter((result) => {
          return result.description.includes('Wifi');
        });

        output.push(...wifiFilter);
        break;
      case FILTER_FREE_PARKING:
        const parkingFilter = searchResults.filter((result) => {
          return result.description.includes('parking');
        });

        output.push(...parkingFilter);
        break;
      default:
        return "OOps you didn't send a proper stirng. The Coder is at fault.";
    }

    return output.map(
      ({
        img,
        location,
        title,
        lat,
        long,
        description,
        star,
        price,
        total,
      }) => (
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
      )
    );
  };

  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${numOfGuests}`}
        collapsed
      />

      <main className='flex justify-center md:max-w-5xl xl:max-w-full'>
        <section className='pt-14 px-6'>
          <p className='text-sm'>
            300+ Stays: <span className='bg-gray-100'>{range}</span> for{' '}
            {numOfGuests} guests
          </p>

          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>

          <div className='relative flex items-center mb-4'>
            <p className='mr-4'>Filter Results:</p>

            <div
              className='relative shadow-md rounded-lg'
              onClick={() => setShowFilterMenu((state) => !state)}
            >
              <p className='bg-gray-100 p-2 rounded-lg text-sm cursor-pointer w-56'>
                {filterValue}
              </p>

              <ChevronDownIcon className='absolute right-2 h-7 bg-gray-100 top-1 cursor-pointer' />

              <ul
                onClick={(e) => setFilterValue(e.target.innerText)}
                className={`${
                  showFilterMenu
                    ? 'h-36 transition-all duration-200'
                    : 'h-0 duration-200'
                } absolute overflow-hidden
                top-8 z-50 bg-gray-100 rounded-b-lg shadow-md text-sm w-full`}
              >
                <li className='filterItem pt-5'>{FILTER_LOW_TO_HIGH}</li>
                <li className='filterItem'>{FILTER_NUM_OF_GUESTS}</li>
                <li className='filterItem'>{FILTER_WIFI}</li>
                <li className='filterItem'>{FILTER_FREE_PARKING}</li>
              </ul>
            </div>

            <RefreshIcon
              onClick={() => setFilterValue(FILTER_DEFAULT)}
              className='h-7 cursor-pointer ml-4 text-gray-700 hover:text-gray-400'
            />
          </div>

          <div className='overflow-y-scroll h-[680px] scrollbar-hide shadow-md'>
            {filterValue === FILTER_DEFAULT ? (
              <div className=' flex-col'>
                {searchResults &&
                  searchResults.map(
                    ({
                      img,
                      location,
                      title,
                      lat,
                      long,
                      description,
                      star,
                      price,
                      total,
                    }) => (
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
                    )
                  )}
              </div>
            ) : (
              <div className='flex-col'>{showFilteredResults(filterValue)}</div>
            )}
          </div>
        </section>

        <section className='hidden h-screen xl:inline-flex xl:min-w-[600px]'>
          <Map
            rating={starRating}
            searchResults={searchResults}
            viewLocation={viewLocation}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export const getServerSideProps = async () => {
  // let searchResults = await fetch('https://links.papareact.com/isz');
  let searchResults = await fetch('https://www.jsonkeeper.com/b/5NPS');
  searchResults = await searchResults.json();

  return {
    props: {
      searchResults,
    },
  };
};
