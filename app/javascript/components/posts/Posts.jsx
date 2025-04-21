import React from 'react';
import PostCard from './PostCard';

const Posts = (props) => {
  return(
   <div className='row'>
    {
      props.posts.map(post => <PostCard key={post.id} post={post} />)
    }
   </div>
  );
}

export default Posts;
