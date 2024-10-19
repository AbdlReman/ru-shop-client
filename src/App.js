import React, { useEffect } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Layouts
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"

import { CartProvider } from "components/context/CartContext"

// Fake backend (if needed for testing)
import fakeBackend from "./helpers/AuthType/fakeBackend"
fakeBackend()

const App = props => {
  const navigate = useNavigate()

  // Check if the user is visiting for the first time
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit")

    if (!isFirstVisit) {
      // Set a flag in localStorage for future visits
      localStorage.setItem("firstVisit", "false")
      // Redirect to the login or register page
      navigate("/login")
    }
  }, [navigate])

  // Determine layout type
  const getLayout = () => {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()

  return (
    <React.Fragment>
      <CartProvider>
        <Routes>
          {/* Non-authenticated routes */}
          {authRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.component} />
          ))}

          {/* Authenticated and other routes (accessible after first visit) */}
          {userRoutes.map((route, idx) => {
            // Check activation status
            const isActivated = localStorage.getItem("isActivated") === "true"
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  isActivated ? (
                    <Layout>{route.component}</Layout>
                  ) : (
                    <Navigate to="/activation" />
                  )
                }
              />
            )
          })}

          {/* Default route */}
          <Route path="/" element={<Navigate to="/mainhome" />} />
        </Routes>
      </CartProvider>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
