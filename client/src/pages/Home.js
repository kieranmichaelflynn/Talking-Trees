import React from 'react';
import { useQuery } from '@apollo/client';

import StoryList from '../components/StoryList';
import StoryForm from '../components/StoryForm';

// import renderMap from '../components/Map';
// import MediaApp from '../components/Media'


import { QUERY_STORIES } from '../utils/queries';

import { CardMedia } from '@material-ui/core/';


const Home = () => {
  const { loading, data } = useQuery(QUERY_STORIES);
  const stories = data?.stories || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <CardMedia image={'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <StoryList
            stories={stories}
            title="Browse the latest stories..."
          />
        )}
        <div style={{marginBottom:"300px"}}>
          <StoryForm />
        </div>

          {/* <MediaApp /> */}
        {/* <renderMap /> */}
      </div>
    </main>
  );
};

export default Home;
