import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayOut from "./Layout/RootLayOut.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import FindPartners from "./Pages/FindPartners.jsx";
import PartnerDetails from "./components/PartnerDetails/PartnerDetails.jsx";
import CreateAProfile from "./components/CreateAProfile/CreateAProfile.jsx";
import Profile from "./Pages/Profile.jsx";
import Connections from "./Pages/Connections.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      {
        path: "/findpartners",
        element: (
          <PrivateRoute>
            <FindPartners></FindPartners>
          </PrivateRoute>
        ),
      },
      {
        path: `/partner/:id`,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/users/${params.id}`),
        element: <PartnerDetails></PartnerDetails>,
      },
      {
        path: "/createaprofile",
             element: (
          <PrivateRoute>
            <CreateAProfile></CreateAProfile>
          </PrivateRoute>
        ),
      },
      {
        path:'/profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path:'/connections',
        
        element:<PrivateRoute><Connections></Connections></PrivateRoute>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
