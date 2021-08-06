import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11
  });

  const coords = searchResults.map(result => {
    return {
      longitude: result.long,
      latitude: result.lat
    }
  });
  
  const center = getCenter()

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/luciousmc/cks0ijw2654xv17t6yxxbp5eu'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></ReactMapGL>
  )
}

export default Map;
