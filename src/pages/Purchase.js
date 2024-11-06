import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Purchase = () => {
  const location = useLocation()
  const [cartDetails, setCartDetails] = useState([])

  useEffect(() => {
    if (location.state?.cartDetails) {
      // Save cartDetails to localStorage
      setCartDetails(location.state.cartDetails)
      localStorage.setItem(
        "cartDetails",
        JSON.stringify(location.state.cartDetails)
      )
    } else {
      // Retrieve cartDetails from localStorage if available
      const savedCartDetails = localStorage.getItem("cartDetails")
      if (savedCartDetails) {
        setCartDetails(JSON.parse(savedCartDetails))
      }
    }
  }, [location.state])

  if (!cartDetails || cartDetails.length === 0) {
    return <div>No purchase details available.</div>
  }

  return (
    <div>
      <h1>Purchase </h1>
      <h2>Your Cards Details:</h2>
      <div className="productsTableContainer">
        <table className="productsTable">
          <thead>
            <tr className="productsTableHeader">
              <th>Type</th>
              <th>fullbin</th>
              <th>Exp Date</th>
              <th>CVV</th>
              <th>Country</th>
              <th>Bank</th>
              <th>Address</th>
              <th>Security PIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails.map((item, index) => (
              <tr className="productsTableRow" key={index}>
                <td>{item.type}</td>
                <td>{item.fullbin}</td>
                <td>{item.expDate}</td>
                <td>{item.cvv}</td>
                <td>{item.country}</td>
                <td>{item.bank}</td>
                <td>{item.address}</td>
                <td>{item.securityPin}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .productsContainer {
          background-color: #0b1c2c;
          margin: 10px 0;
          padding: 20px;
          color: #fff;
          border-radius: 8px;
        }
        .productsTitle {
          color: #fff;
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .productsFiltersRow1,
        .productsFiltersRow2 {
          display: flex;
          gap: 15px;
          margin-bottom: 10px;
        }
        .productsSearchInput {
          background-color: #192938;
          flex-grow: 2;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .productsSelect {
          background-color: #192938;
          flex-grow: 1;
          padding: 10px;
          border-radius: 5px;
        }
        .pagination {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .pagination button {
          padding: 8px 12px;
          border: none;
          background-color: #192938;
          cursor: pointer;
          border-radius: 5px;
        }
        .pagination .active {
          background-color: #0998a8;
          color: #fff;
        }
        .productsTableContainer {
          margin-top: 30px;
          overflow-x: auto; /* Enable horizontal scroll for the table */
        }
        .productsTable {
          width: 100%;
          border-collapse: collapse;
          background-color: #1b2738;
          min-width: 900px; /* Set a minimum width to enable scrolling on small screens */
        }
        .productsTableHeader th {
          color: #fff;
          padding: 10px;
          border: 1px solid #ccc;
        }
        .productsTableRow td {
          color: #fff;
          padding: 5px 10px;
          border: 1px solid #ccc;
        }
        .productsImage {
          max-width: 80px;
          max-height: 60px;
          object-fit: contain;
        }
        .productsAddToCartButton {
          padding: 4px 8px;
          border: none;
          background-color: #0998a8;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
        }
        .productsCartButton {
          display: block;
          margin: 20px auto;
          background-color: #0998a8;
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .productsFiltersRow1,
          .productsFiltersRow2 {
            flex-direction: column;
          }

          .productsTableContainer {
            overflow-x: auto; /* Scroll horizontally for the table */
          }

          .productsTable {
            width: 100%;
            min-width: 600px; /* Ensure the table doesn't shrink too much */
          }
        }
      `}</style>
    </div>
  )
}

export default Purchase
