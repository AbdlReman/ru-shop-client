import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { auth } from "../../../firebase"
import { onAuthStateChanged } from "firebase/auth"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// users
import user1 from "../../../assets/images/users/user-1.jpg"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [userEmail, setUserEmail] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserEmail(user.email) // Set the user email if authenticated
      } else {
        setUserEmail(null) // Clear the email if no user is authenticated
      }
    })

    return () => unsubscribe() // Cleanup subscription on unmount
  }, [])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src="data:image/jpeg;base64,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"
            alt="Header Avatar"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/">
            {" "}
            <i className="mdi mdi-account-circle font-size-17 text-muted align-middle me-1" />
            {/* {props.t("Profile")}{" "} */}
            {userEmail}
          </DropdownItem>
          <DropdownItem className="d-flex align-items-center" to="#">
            <i className="mdi mdi-wallet font-size-17 text-muted align-middle me-1" />
            {props.t("Balance")}
            <span className="badge bg-success ms-auto">$ 0</span>
          </DropdownItem>
          {/* <DropdownItem tag="a" href="#">
            <i className="mdi mdi-wallet font-size-17 text-muted align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem className="d-flex align-items-center" to="#">
            <i className="mdi mdi-cog font-size-17 text-muted align-middle me-1"></i>
            {props.t("Settings")}
            <span className="badge bg-success ms-auto">11</span>
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="mdi mdi-lock-open-outline font-size-17 text-muted align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}

          {/* <div className="dropdown-divider"/>
          <Link to="/logout" className="dropdown-item text-danger">
            <i className="mdi mdi-power font-size-17 text-muted align-middle me-1 text-danger"/>
            <span>{props.t("Logout")}</span>
          </Link> */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
