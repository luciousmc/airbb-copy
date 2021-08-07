import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import Image from 'next/image';
import { LocationMarkerIcon, StarIcon } from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';

function Map({ searchResults }) {
  const coords = searchResults.map(result => {
    return {
      longitude: result.long,
      latitude: result.lat
    }
  });
  
  const center = getCenter(coords);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
  });
  const [selectedLocation, setSelectedLocation] = useState({});

  const stars = (rating) => {
    let star = parseInt(rating);
    const output = [];

    for (let i = 0; i < 5; i++) {
      if (star <= 0) {
        star -= 1;
        output.push(<StarIconOutline className='h-5 text-gray-600' />);
      } else {
        star -= 1;
        output.push(<StarIcon className='h-5 text-red-400' />);
      }
    }
    return output;
  }

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/luciousmc/cks0ijw2654xv17t6yxxbp5eu'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
            >
              {/* <LocationMarkerIcon classsName='h-8 text-red-400' /> */}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
</svg>
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnclick={true}
              latitude={result.lat}
              longitude={result.long}
              className='z-40'
            >
                <div>
                  <div className="relative w-64 h-44">
                    <Image
                      src={result.img}
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <h2 className='font-semibold pt-2'>{result.title}</h2>
                  <p className='text-sm font-light'>{result.location}</p>

                  <div className="flex items-center pt-4">
                    <p className='w-3'>{Math.floor(result.star)}</p>
                    {stars(Math.floor(result.star))}
                  </div>
                </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map;
