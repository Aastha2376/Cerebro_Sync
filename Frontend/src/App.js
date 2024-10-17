import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

//import all the components
import Username from './components/username';
import Password from './components/Password';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import Reset from './components/Reset';

//root routes
const router = createBrowserRouter([
    {
      path : '/',
      element : <Username></Username>
    },
    {
      path : '/register',
      element : <Register></Register>
    },
    {
      path:'/password',
      element:<Password></Password>
    },
    {
      path:'/recovery',
      element:<Recovery></Recovery>
    },
    {
      path:'/profile',
      element:<Profile></Profile>
    },
    {
      path:'*',
      element:<PageNotFound></PageNotFound>
    },
    {
      path:'/reset',
      element:<Reset></Reset>
    },


])

export default function App() {
  return (
    <main>
        <RouterProvider router = {router}></RouterProvider>
    </main>
  )
}


// formik library lets us display error and success messages 