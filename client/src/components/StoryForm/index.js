import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_STORY } from '../../utils/mutations';
import { QUERY_STORIES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const StoryForm = () => {
  const [storyText, setStoryText] = useState('');
  const [storyImage, setStoryImage] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addStory, { error }] = useMutation(ADD_STORY, {
    update(cache, { data: { addStory } }) {
      try {
        const { stories } = cache.readQuery({ query: QUERY_STORIES });

        cache.writeQuery({
          query: QUERY_STORIES,
          data: { stories: [addStory, ...stories] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, stories: [...me.stories, addStory] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addStory({
        variables: {
          storyText,
          storyAuthor: Auth.getProfile().data.username,
          storyImage,
        },
      });

      setStoryText('');
      setStoryImage('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'storyText' && value.length <= 280) {
      setStoryText(value);
      setCharacterCount(value.length);
    }
  };

  const handleImage = (event) => {
    setStoryImage({ storyImage: event.target.files[0]})
    console.log(storyImage)
  }



  return (
    <div>
      <h3>Share your tree story here</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="storyText"
                placeholder="Your own story"
                value={storyText}
                className="form w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <input
            type="file"
            accept='.png, .jpg, .jpeg'
            name='storyImage'
            onChange={handleImage}
            >
            
            </input>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Story
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your tree story. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default StoryForm;
