import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Posts from './Posts';
import { fetchAdminPosts } from '../../actions/posts';

const MyPosts = (props) => {
  const dispatch = useDispatch();

  const { loading, posts, errors } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchAdminPosts());
  }, []);

  return(
    <div>
      {
        loading ?
        <div className='spinner-border'></div> :
        posts.length > 0 ? <Posts posts={posts}/> : <p>Empty...</p>
      }
    </div>
  );
}

export default MyPosts;
