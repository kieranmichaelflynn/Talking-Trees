import React from 'react';
import { useQuery } from '@apollo/client';

import StoryList from '../components/StoryList';
import StoryForm from '../components/StoryForm';

// import renderMap from '../components/Map';
// import MediaApp from '../components/Media'


import { QUERY_STORIES } from '../utils/queries';

import {CardMedia} from '@material-ui/core/';


const Home = () => {
  const { loading, data } = useQuery(QUERY_STORIES);
  const stories = data?.stories || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
        <CardMedia image={ 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' }  />

          {loading ? (
            <div>Loading...</div>
          ) : (
            <StoryList
              stories={stories}
              title="Browse the latest stories..."
            />
          )}
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <StoryForm />
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          {/* <MediaApp /> */}
        </div>
        {/* <renderMap /> */}
      </div>
    </main>
  );
};

export default Home;
