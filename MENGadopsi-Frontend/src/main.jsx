import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpGroup from './App.jsx';
import SignIn from './pages/SignIn.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Adoption from './pages/Adoption.jsx';
import CatList from './pages/CatList.jsx';
import AddCatt from './pages/AddCatt.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpGroup />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/profilePage/:identifier",
    element: <ProfilePage />,
  },
  {
    path: "/adoption/:identifier/:catId",
    element: <Adoption />,
  },
  {
    path: "/cats/:identifier",
    element: <CatList />,
  },
  {
    path: "/cats/addcat/:identifier",
    element: <AddCatt />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

