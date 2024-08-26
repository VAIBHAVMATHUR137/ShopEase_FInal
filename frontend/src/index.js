import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CartContextProvider from "./context/CartContextProvider";
import Error from "./Pages/Error";
import Cart from "./Pages/Cart";
import Authenticate from "./Pages/Authenticate";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import FinalCheckout from "./Pages/FinalCheckout"
import ProductListing from "./Pages/ProductListing";

import Product from "./Pages/Product";
import { Provider } from "react-redux";
import store from "../src/Slice/store";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },

  {
    path: "/Cart",
    element: <Cart />,
  },
  {
    path: "/Authenticate",
    element: <Authenticate />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/ProductListing",
    element: <ProductListing />,
  },
  {
    path: "/Checkout",
    element: <FinalCheckout />,
  },

  {
    path: "/ProductListing/Product/:id",
    element: <Product />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </Provider>
);
