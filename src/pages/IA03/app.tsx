import './app.css';
import { Outlet, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import FormLayout from './components/FormLayout';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

export default function User() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/login" element={
          <FormLayout>
            <Login />
          </FormLayout>
        } />
        <Route path="/register" element={
          <FormLayout>
            <Register />
          </FormLayout>
        } />
      </Routes>
      <Outlet />
    </>
  );
}