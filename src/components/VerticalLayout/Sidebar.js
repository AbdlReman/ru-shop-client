import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu" style={{ background: "#0b1c2c" }}>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
// import React, { useState } from "react"
// import { Link } from "react-router-dom"
// import "./Sidebar.css" // Make sure to create this CSS file

// const Sidebar = props => {
//   const [isOpen, setIsOpen] = useState(false)

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen)
//   }

//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <button className="toggle-button" onClick={toggleSidebar}>
//         {isOpen ? "Close" : "Open"}
//       </button>
//       <ul className="metismenu list-unstyled" id="side-menu">
//         <li>
//           <Link to="/" className="waves-effect">
//             <i className="mdi mdi-home-outline"></i>
//             <span className="badge rounded-pill bg-primary float-end"></span>
//             <span>{props.t("main")}</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/cards" className="waves-effect">
//             <i className="mdi mdi-credit-card-outline"></i>
//             <span className="badge rounded-pill bg-primary float-end"></span>
//             <span>{props.t("Cards")}</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/Premiumcards" className="waves-effect">
//             <i className="mdi mdi-credit-card-outline"></i>
//             <span className="badge rounded-pill bg-primary float-end"></span>
//             <span>{props.t("Premium Cards")}</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/payment" className="waves-effect">
//             <i className="mdi mdi-cash-plus"></i>
//             <span className="badge rounded-pill bg-primary float-end"></span>
//             <span>{props.t("Add Fund")}</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/chat" className="waves-effect">
//             <i className="mdi mdi-chat-processing-outline"></i>
//             <span>{props.t("Message")}</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/login" className="waves-effect">
//             <i className="mdi mdi-logout"></i>
//             <span>{props.t("Log out")}</span>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   )
// }

// export default Sidebar
