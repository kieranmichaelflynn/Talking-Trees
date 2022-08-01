// import React from 'react';

// // Import the `useParams()` hook
// // import { useParams } from 'react-router-dom';
// // import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

// import { useQuery } from '@apollo/client';

// import { QUERY_STORIES } from '../utils/queries';

// // import { QUERY_SINGLE_STORY } from '../utils/queries';
// // import { QUERY_USER, QUERY_ME } from '../utils/queries';

// // import Auth from '../utils/auth';


// import styled from "styled-components";



// const imageURL = () => {
//   // Use `useParams()` to retrieve value of the route parameter `:profileId`
//   const { storyId } = useParams();

//   const {  data } = useQuery(QUERY_STORIES, {
//     // pass URL parameter
//     variables: { storyId: storyId },
//   });

//   const story = data?.story || {};
  
 




//   const containerImg = styled.div`
//   background: url(../src/uploads${story.storyImage}) `;

//   return containerImg
// };

// export default imageURL;
