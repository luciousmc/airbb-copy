import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";


function Search({ searchResults }) {
  const router = useRouter();
  
  const { startDate, endDate, location, numOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  console.log(searchResults)

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numOfGuests}`} collapsed />
      
      <main className='flex max-w-screen-xl mx-auto'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>300+ Stays {range} for {numOfGuests} guests</p>

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
            {searchResults && searchResults.map(({ img, location, title, description, star, price, total }) => (
              <InfoCard
                key={img}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
              />
            ))}
          </div>
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