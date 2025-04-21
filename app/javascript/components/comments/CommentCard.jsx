import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import { formatDate } from '../../api/format';
import { deleteComment } from '../../actions/comments';
import { useDispatch } from 'react-redux';

const CommentCard = ({ comment, postId, comments, onCommentDeleted }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { id, body, created_at, commentor, commentor_id } = comment;
  const childComments = comments.filter(child => child.parent_id == id);
  const { user } = useSelector(state => state.sessions);
  const { attributes } = useSelector(state => state.post);

  const dispatch = useDispatch();

  const handleToggleReply = () => setShowReplyForm(!showReplyForm);

  const handleDelete = () => {
    dispatch(deleteComment(postId, id));
  };

  return (
    <div className="card mb-2 p-2">
      <h6 className="card-subtitle mb-1 text-muted">
        <strong>{commentor || 'Anonymous'}</strong> 
        <small className="ms-2">{formatDate(created_at)}</small>
      </h6>
      <p className="mb-1">{body}</p>

      <div className="bg-light p-2 mt-2">
        {childComments.length > 0 && childComments.map(childComment =>
          <CommentCard
            key={childComment.id}
            postId={postId}
            comment={childComment}
            comments={comments}
            onCommentDeleted={onCommentDeleted}
          />
        )}
      </div>

      {showReplyForm && (
        <div className="mt-2 ms-3">
          <CommentForm postId={postId} parentId={id} onAfterSubmit={() => setShowReplyForm(false)} />
        </div>
      )}

      {
        <div className='d-flex justify-content-start gap-2'>
        <button className="btn btn-link btn-sm" onClick={handleToggleReply}>
          {showReplyForm ? 'Cancel' : 'Reply'}
        </button>
        {
          (user.id == commentor_id || attributes.creator_id == user.id) &&
          <button className="btn btn-link btn-sm text-danger" onClick={handleDelete}>
            Delete
          </button>
        }
      </div>
      }
    </div>
  );
};

export default CommentCard;
