import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Posts from './Posts';
import { fetchPosts } from '../../actions/posts';

const PublicPosts = (props) => {
  const dispatch = useDispatch();

  const { loading, posts, errors } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return(
    <div>
      {
        loading ?
        <div className='spinner-border'></div> :
        posts.length > 0 && <Posts posts={posts}/>
      }
    </div>
  );
}

export default PublicPosts;
