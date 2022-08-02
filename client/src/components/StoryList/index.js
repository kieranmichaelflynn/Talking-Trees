import React from 'react';
import { Link } from 'react-router-dom';

const StoryList = ({
  stories,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  // const imageURL = `uploads/${stories && stories.map((story) => story.storyImage)}`

  if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }

  return (
    <div className='fullWidth'>
      {showTitle && <h3>{title}</h3>}
      {stories &&
        stories.map((story) => (

          <div key={story._id} className="container" 
          style={{ backgroundImage: story.storyImage ? `url(./uploads/${story.storyImage})` : `url(./uploads/defaultTree.png)`}}>
        
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <div className='container__info cont_top'>

                  <Link
                    className="text-light"
                    to={`/profiles/${story.storyAuthor}`}
                  >
                    <div className='container__info'>
                      {story.storyAuthor}
                      <span style={{ fontSize: '1rem' }}>
                        shared on {story.createdAt}
                      </span>

                      {/* <img src={`/uploads/${story.storyImage}`}></img> */}
                    </div>

                  </Link>
                </div>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    Shared on {story.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="container__profile__text container__profile">
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/profiles/${story.storyAuthor}`}
              >
                <p>{story.storyText}</p>
              </Link>

              <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/stories/${story._id}`}
              >
                Talk more about this tree.
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default StoryList;

