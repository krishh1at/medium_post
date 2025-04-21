import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import { fetchComments } from '../../actions/comments';

const Comments = ({ postId, parentId = null }) => {
  const dispatch = useDispatch();

  const { loading, comments, errors } = useSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, []);

  console.log('comments: ', comments, parentId)

  const parentComments = comments.filter(comment => comment.parent_id == parentId);

  return(
    <div>
      {
        loading ?
        <div className='spinner-border'></div> :
        parentComments.length > 0 ? parentComments.map(comment => (
          <CommentCard
            key={comment.id}
            postId={postId}
            comment={comment}
            comments={comments}
          />
        )) : <p>Empty comments...</p>
      }

    </div>
  );
}

export default Comments;
