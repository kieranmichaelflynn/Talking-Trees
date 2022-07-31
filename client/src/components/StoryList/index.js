import React from 'react';
import { Link } from 'react-router-dom';

const StoryList = ({
  stories,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {stories &&
        stories.map((story) => (
          <div key={story._id} className="container">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <div className='container__info'>

                <Link
                  className="text-light"
                  to={`/profiles/${story.storyAuthor}`}
                  >
                    <div className='container__info'>
                  {story.storyAuthor} 
                  <span style={{ fontSize: '1rem' }}>
                    posted about this tree on {story.createdAt}
                  </span>
                    </div>
                      
                </Link>
                  </div>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You posted about this tree on {story.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="container__profile__text container__profile">
              <p>{story.storyText}</p>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/stories/${story._id}`}
              >
              Join the discussion on this tree.
            </Link>
              </div>
          </div>
        ))}
    </div>
  );
};

export default StoryList;
