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
        <CardMedia />

        {loading ? (
          <div>Loading...</div>
        ) : (
          
          <StoryList
            stories={stories}
            title="Browse the latest stories..."
          />
        )}
        <div style={{ marginBottom: "300px" }}>
          <h3>Share your tree story here</h3>
          <StoryForm />
        </div>

        {/* <MediaApp /> */}
        {/* <renderMap /> */}
      </div>
    </main>
  );
};

export default Home;
