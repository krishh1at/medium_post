import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../actions/posts';
import './Post.css';
import PostForm from './PostForm'; // Adjust the path if needed
import { fetchCategories } from '../../actions/categories';


const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const handleEditToggle = () => setIsEditing(prev => !prev);


  const onSubmitHandler = (formData) => {
    dispatch(createPost(formData));
    navigate('/my/posts');
  }

  return (
    <>
      <h3 className='mb-3'>Create Post</h3>
      <PostForm onSubmitHandler={onSubmitHandler} handleEditToggle={handleEditToggle} attributes={{}} />
    </>
  );
}

export default CreatePost;
