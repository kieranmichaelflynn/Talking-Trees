import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import StoryForm from '../components/StoryForm';
import StoryList from '../components/StoryList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2>
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2>
      <StoryList
        stories={user.stories}
        title={`${user.username}'s stories...`}
        showTitle={false}
        showUsername={false}
      />
      {!userParam && (
        <div
          className="form">
          {user.stories.length >= 1 ? <h3>Share another story here</h3> : <h3>Share your tree story here</h3>
          }
          <StoryForm />
        </div>
      )}
    </div>
  );
};

export default Profile;
