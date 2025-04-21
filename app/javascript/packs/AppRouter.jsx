import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Register from '../components/sessions/Register';
import PublicPosts from '../components/posts/PublicPosts';
import Post from '../components/posts/Post';
import Auth from '../components/sessions/Auth';
import Dashboard from '../components/users/Dashboard';
import EditPost from '../components/posts/CreatePost';
import MyPosts from '../components/posts/MyPosts';
import CreatePost from '../components/posts/CreatePost';

const AppRouter = () => {
  return (
    <Container className="pt-4">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth><PublicPosts /></Auth>} />
        <Route path="/post/:id" element={<Auth><Post /></Auth>} />
        <Route path="/post/:id/edit" element={<Auth><EditPost /></Auth>} />
        <Route path="/my/posts" element={<Auth><MyPosts /></Auth>} />
        <Route path="/create/post" element={<Auth><CreatePost /></Auth>} />
        <Route path="/dashboard" element={<Auth><Dashboard /></Auth>} />
      </Routes>
    </Container>
  );
};

export default AppRouter;
