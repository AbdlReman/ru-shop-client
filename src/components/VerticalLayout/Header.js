import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

import { connect } from "react-redux"
import { Link } from "react-router-dom"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import logo from "../../assets/images/logo-sm.png"
import logoLightPng from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/logo-dark.png"

// i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions"

const Header = props => {
  const [search, setSearch] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false) // To track sidebar state

  // Toggle fullscreen
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  // Toggle Sidebar
  function tToggle() {
    const body = document.body
    body.classList.toggle("vertical-collpsed")
    body.classList.toggle("sidebar-enable")

    setIsMenuOpen(!isMenuOpen) // Update state for the toggle button icon
  }

  // Close the sidebar when clicking outside on mobile
  useEffect(() => {
    function handleOutsideClick(event) {
      if (isMenuOpen && window.innerWidth <= 768) {
        const sidebar = document.querySelector(".vertical-menu-btn")
        if (sidebar && !sidebar.contains(event.target)) {
          tToggle() // Close sidebar if clicking outside
        }
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick)
    } else {
      document.removeEventListener("click", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [isMenuOpen])

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header" style={{ background: "#0b1c2c" }}>
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="62" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="67" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logo} alt="" height="62" />
                </span>
                <span className="logo-lg">
                  <img src={logoLightPng} alt="" height="69" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn"
              id="vertical-menu-btn"
            >
              {/* Conditional rendering for the toggle icon */}
              <i className={`mdi ${isMenuOpen ? "mdi-close" : "mdi-menu"}`}></i>
            </button>
          </div>

          <div className="d-flex">
            {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={props.t("Search") + "..."}
                />
                <span className="fa fa-search"></span>
              </div>


            </form> */}

            {/* <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setSearch(!search)
                }}
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}
            <div className=" d-flex align-items-center ">
              <div>
                {/* <i className="mdi mdi-wallet font-size-17 text-muted align-middle me-1" /> */}
                <span className="Baalance">{props.t("Balance ")}</span>
                <span className="badge bg-success ms-auto align-middle me-1 ">
                  {" "}
                  $ 0
                </span>
              </div>
            </div>

            <LanguageDropdown />
            <div className="dropdown d-none d-lg-inline-block">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen()
                }}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="mdi mdi-fullscreen font-size-24"></i>
              </button>
            </div>
            <NotificationDropdown />
            <ProfileMenu />
          </div>
        </div>
      </header>
      {/* Add some CSS styling */}
      <style jsx>{`
        /* Default layout (for larger screens) */
        .navbar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Mobile layout (screen width less than or equal to 768px) */
        @media (max-width: 768px) {
          .navbar-header {
            display: flex;
            align-items: center;
            // justify-content: center; /* Center the logo and toggle button */
            position: relative;
            padding: 0px;
            padding-left: 39%;
          }

          /* Toggle button on the left corner */
          .vertical-menu-btn {
            position: absolute;
            left: 10px; /* Adjust as needed */
            top: 50%;
            transform: translateY(-50%); /* Center vertically */
          }

          /* Logo in the center */
          .logo {
            position: relative;
            display: flex;
            justify-content: center;
          }

          /* Hide large logo on mobile */
          .logo-lg {
            display: none;
          }
          .Baalance {
            display: none;
          }

          /* Show small logo on mobile */
          .logo-sm {
            display: block;
            // margin-left: 150px;
          }
        }
      `}</style>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))
