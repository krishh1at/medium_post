import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../actions/comments';

const CommentForm = ({ postId, parentId }) => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.trim()) return;

    dispatch(postComment(postId, { body, parent_id: parentId }))

    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className='mb-3'>
      <div className='mb-2'>
        <textarea
          className='form-control'
          placeholder='Write a comment...'
          rows='3'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-primary btn-sm'>
        { parentId ? 'Reply' : 'Comment' }
      </button>
    </form>
  );
};

export default CommentForm;
