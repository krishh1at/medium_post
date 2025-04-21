import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost } from '../../actions/posts';
import { formatDate } from '../../api/format';
import './Post.css';
import Comments from '../comments/Comments';
import CommentForm from '../comments/CommentForm';
import { fetchCategories } from '../../actions/categories';
import { updatePost, updateAdminPostStatus, deletePost } from '../../actions/posts';
import PostForm from './PostForm'; 
import { Button } from 'react-bootstrap';

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const post = useSelector(state => state.post);
  const { user } = useSelector(state => state.sessions);
  const { categories } = useSelector(state => state.categories);
  const { loading, attributes } = post;

  useEffect(() => {
    if (id) {
      dispatch(fetchPost(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (attributes?.category_ids?.length) {
      dispatch(fetchCategories(attributes.category_ids));
    }
  }, [attributes?.category_ids, dispatch]);

  const handleEditToggle = () => setIsEditing(prev => !prev);

  const onSubmitHandler = (formData) => {
    dispatch(updatePost(id, formData));
    setIsEditing(false);
  };

  const handlePublish = () => {
    dispatch(updateAdminPostStatus(id, 'published'));
  };

  const handleDelete = () => {
    dispatch(deletePost(id));
    navigate(-1);
  };

  if (loading || !attributes) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const { title, body, published_at, creator_id, creator, avatar_url } = attributes;

  return (
    <div className='row'>
      <div className='col-md-6'>
        <div style={{ display: isEditing ? 'block' : 'none' }}>
          <PostForm
            onSubmitHandler={onSubmitHandler}
            handleEditToggle={handleEditToggle}
            attributes={attributes}
          />
        </div>

        <div style={{ display: isEditing ? 'none' : 'block' }}>
          <div className="card shadow-sm m-3">
            {avatar_url && (
              <img
                className="card-img-top img-thumbnail w-100 h-50"
                src={avatar_url}
                alt={title}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text text-muted">{body}</p>

              {categories && categories.length > 0 && (
                <p className="mt-2 mb-2">
                  <strong>Categories: </strong>
                  {categories.map((category) => (
                    <span key={category.id} className="badge bg-secondary me-1">
                      {category.name}
                    </span>
                  ))}
                </p>
              )}

              <div className="d-flex justify-content-between">
                {creator && (
                  <p className="mb-2">
                    <strong>Author:</strong> {creator}
                  </p>
                )}
                {published_at && (
                  <p className="card-subtitle mb-2 text-muted">
                    <small>Published on {formatDate(published_at)}</small>
                  </p>
                )}
              </div>

              {
                user?.id == creator_id && (
                  <div className="d-flex gap-2 mt-3">
                    <Button variant="outline-primary" onClick={handleEditToggle}>
                      Edit
                    </Button>
                    {!published_at && <Button variant="outline-success" onClick={handlePublish}>
                      Publish
                    </Button>}
                    <Button variant="outline-danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className='col-md-6'>
        <h4>Comments:</h4>
        <Comments postId={id} />
        <CommentForm postId={id} />
      </div>
    </div>
  );
};

export default Post;
