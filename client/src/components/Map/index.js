import React from 'react';

import Map from '../../pages/Map';

const renderMap = () => {
  return (
      <div className="container flex-row justify-space-between-lg justify-center align-center">
      <h3>My Google Maps Demo</h3>
    <div id="map"></div>

    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBumtrLaUO0LiETCSOTxc_feQSFeRvMurg&callback=initMap&v=weekly"
      defer
      ></script>
      {Map}

      </div>
  );
};

export default renderMap;
