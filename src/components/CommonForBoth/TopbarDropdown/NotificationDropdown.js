// import React, { useState } from "react"
// import PropTypes from 'prop-types'
// import { Link } from "react-router-dom"
// import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
// import SimpleBar from "simplebar-react"

// //i18n
// import { withTranslation } from "react-i18next"

// const NotificationDropdown = props => {
//   // Declare a new state variable, which we'll call "menu"
//   const [menu, setMenu] = useState(false)

//   return (
//     <React.Fragment>
//       <Dropdown
//         isOpen={menu}
//         toggle={() => setMenu(!menu)}
//         className="dropdown d-inline-block ms-1"
//         tag="li"
//       >
//         <DropdownToggle
//           className="btn header-item noti-icon waves-effect"
//           tag="button"
//           id="page-header-notifications-dropdown"
//         >
//           <i className="ti-bell"></i>
//           <span className="badge text-bg-danger rounded-pill">3</span>
//         </DropdownToggle>

//         <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
//           <div className="p-3">
//             <Row className="align-items-center">
//               <Col>
//                 <h5 className="m-0"> {props.t("Notifications")} (258) </h5>
//               </Col>
//             </Row>
//           </div>

//           <SimpleBar style={{ height: "230px" }}>
//             <Link to="#" className="text-reset notification-item">
//               <div className="d-flex">
//                 <div className="flex-shrink-0 me-3">
//                   <div className="avatar-xs me-3">
//                     <span className="avatar-title border-success rounded-circle ">
//                       <i className="mdi mdi-cart-outline"></i>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1">
//                   <h6 className="mt-0 mb-1">Your order is placed</h6>
//                   <div className="text-muted">
//                     <p className="mb-1">If several languages coalesce the grammar</p>
//                   </div>
//                 </div>
//               </div>
//             </Link>

//             <Link to="#" className="text-reset notification-item">
//               <div className="d-flex">
//                 <div className="flex-shrink-0 me-3">
//                   <div className="avatar-xs me-3">
//                     <span className="avatar-title border-warning rounded-circle ">
//                       <i className="mdi mdi-message"></i>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1">
//                   <h6 className="mt-0 mb-1">New Message received</h6>
//                   <div className="text-muted">
//                     <p className="mb-1">You have 87 unread messages</p>
//                   </div>
//                 </div>
//               </div>
//             </Link>

//             <Link to="#" className="text-reset notification-item">
//               <div className="d-flex">
//                 <div className="flex-shrink-0 me-3">
//                   <div className="avatar-xs me-3">
//                     <span className="avatar-title border-info rounded-circle ">
//                       <i className="mdi mdi-glass-cocktail"></i>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1">
//                   <h6 className="mt-0 mb-1">Your item is shipped</h6>
//                   <div className="text-muted">
//                     <p className="mb-1">It is a long established fact that a reader will</p>
//                   </div>
//                 </div>
//               </div>
//             </Link>

//             <Link to="#" className="text-reset notification-item">
//               <div className="d-flex">
//                 <div className="flex-shrink-0 me-3">
//                   <div className="avatar-xs me-3">
//                     <span className="avatar-title border-primary rounded-circle ">
//                       <i className="mdi mdi-cart-outline"></i>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1">
//                   <h6 className="mt-0 mb-1">Your order is placed</h6>
//                   <div className="text-muted">
//                     <p className="mb-1">Dummy text of the printing and typesetting industry.</p>
//                   </div>
//                 </div>
//               </div>
//             </Link>

//             <Link to="#" className="text-reset notification-item">
//               <div className="d-flex">
//                 <div className="flex-shrink-0 me-3">
//                   <div className="avatar-xs me-3">
//                     <span className="avatar-title border-warning rounded-circle ">
//                       <i className="mdi mdi-message"></i>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1">
//                   <h6 className="mb-1">New Message received</h6>
//                   <div className="text-muted">
//                     <p className="mb-1">You have 87 unread messages</p>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </SimpleBar>
//           <div className="p-2 border-top d-grid">
//             <Link
//               className="btn btn-sm btn-link font-size-14 btn-block text-center"
//               to="#"
//             >
//               <i className="mdi mdi-arrow-right-circle me-1"></i>
//               {" "}
//               {props.t("View all")}{" "}
//             </Link>
//           </div>
//         </DropdownMenu>
//       </Dropdown>
//     </React.Fragment>
//   )
// }

// export default withTranslation()(NotificationDropdown)

// NotificationDropdown.propTypes = {
//   t: PropTypes.any
// }
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import { createClient } from "contentful"

// i18n
import { withTranslation } from "react-i18next"

// Contentful client setup
const client = createClient({
  space: "36tnuwy9075k",
  accessToken: "w6FOfxZGLmHXenbMizDWOVvQaBagutljExDB9Ech09s",
})

const NotificationDropdown = props => {
  const [menu, setMenu] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Fetch products from Contentful
    const fetchNotifications = async () => {
      try {
        const response = await client.getEntries({
          content_type: "product", // Use 'product' as the content type
          order: "-sys.createdAt", // Get the latest entries first
          limit: 3, // Fetch only the latest 3 products
        })

        // Map the fetched products to the desired format
        const fetchedNotifications = response.items.map(item => ({
          id: item.sys.id,
          message: "Last Update! New CC added successfully.", // Static message
          date: new Date(item.sys.createdAt).toLocaleDateString(), // Get the creation date
        }))

        setNotifications(fetchedNotifications)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block ms-1"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="ti-bell"></i>
          <span className="badge text-bg-danger rounded-pill">
            {notifications.length}
          </span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h5 className="m-0">
                  {props.t("Notifications")} ({notifications.length})
                </h5>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {notifications.map(notification => (
              <Link
                to="#"
                className="text-reset notification-item"
                key={notification.id}
              >
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title border-success rounded-circle ">
                        <i className="ti-bell"></i>
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted">
                      <p className="mb-1">{notification.date}</p>
                    </div>
                    <h6 className="mt-0 mb-1">{notification.message}</h6>
                  </div>
                </div>
              </Link>
            ))}
          </SimpleBar>

          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="/"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
