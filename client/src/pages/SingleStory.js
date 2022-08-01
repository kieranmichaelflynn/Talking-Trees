import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_STORY } from '../utils/queries';

const SingleStory = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { storyId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_STORY, {
    // pass URL parameter
    variables: { storyId: storyId },
  });

  const story = data?.story || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="container">
        <h3 className="card-header bg-dark text-light p-2 m-0">
          {story.storyAuthor} <br />
          <div className='container__info cont_top'>

            <span style={{ fontSize: '1rem' }}>
              posted about this tree on {story.createdAt}
            </span>
          </div>

        </h3>
        <div className="container__profile__text container__profile">
          <blockquote
          >
            {story.storyText}
          </blockquote>
        </div>

      </div >
      <div className="my-5">
        <CommentList comments={story.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm storyId={story._id} />
      </div>
    </div>
  );
};

export default SingleStory;
