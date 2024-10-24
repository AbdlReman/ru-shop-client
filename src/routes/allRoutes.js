import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Extra Pages
import PagesTimeline from "../pages/Extra Pages/pages-timeline"
import PagesInvoice from "../pages/Extra Pages/pages-invoice"
import PagesDirectory from "../pages/Extra Pages/pages-directory"
import PagesBlank from "../pages/Extra Pages/pages-blank"
import Pages404 from "../pages/Extra Pages/pages-404"
import Pages500 from "../pages/Extra Pages/pages-500"

import Chat from "pages/Chat/Chat"
import Products from "pages/Products"
import Cart from "pages/Cart"
import Checkout from "pages/Checkout"
import MainHome from "pages/MainHome"
import Activation from "pages/Activation"
import Payment from "pages/Payment"
import Premium from "pages/Premium"
import Rules from "pages/Rules"
import Cheaker from "pages/Cheaker"

const userRoutes = [
  { path: "/dashboard", component: <MainHome /> },
  { path: "/home", component: <MainHome /> },
  { path: "/cards", component: <Products /> },
  { path: "/Premiumcards", component: <Premium /> },
  { path: "/mainhome", component: <MainHome /> },
  { path: "/cart", component: <Cart /> },
  { path: "/rules", component: <Rules /> },
  { path: "/cheaker", component: <Cheaker /> },

  { path: "/checkout", component: <Checkout /> },
  { path: "/payment", component: <Payment /> },

  // //calendar

  { path: "/chat", component: <Chat /> },

  // // //profile
  { path: "/profile", component: <UserProfile /> },

  // //Extra Pages
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-invoice", component: <PagesInvoice /> },
  { path: "/pages-directory", component: <PagesDirectory /> },
  { path: "/pages-blank", component: <PagesBlank /> },

  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: <Navigate to="/mainhome" />,
  },
]

const authRoutes = [
  { path: "/activation", component: <Activation /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
]

export { userRoutes, authRoutes }
