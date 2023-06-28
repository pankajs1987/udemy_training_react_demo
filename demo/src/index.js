import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SignIn from "./components/authentication/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import AddAssets from "./components/assets/AddAssets";
import RootLayout from "./components/routes/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/signin", element: <SignIn /> },

      { path: "/AssetSummary", element: <AddAssets /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
