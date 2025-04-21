import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../api/format';
import './Post.css'

const PostCard = ({ post }) => {
  const { id, title, body, published_at, creator, avatar_url, categories } = post;
  console.log(post);

  return (
    <Link to={`/post/${id}`} className='card-link card hover-card shadow-sm hover-shadow-lg hover-opacity-75 col-md-6 m-2 pt-2' style={{ width: '18rem' }}>
      {avatar_url && <img className='card-img-top' src={avatar_url} alt={title} />}
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>
          {body.length > 100 ? `${body.slice(0, 100)}...` : body}
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
