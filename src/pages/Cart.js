// import { useCart } from "components/context/CartContext"
// import React from "react"

// import { Link } from "react-router-dom"

// export default function Cart() {
//   const { cart, removeFromCart } = useCart()

//   return (
//     <div className="cartContainer">
//       <h1 className="cartTitle">Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="cartItems">
//           <table className="cartTable">
//             <thead>
//               <tr>
//                 <th>Type</th>
//                 <th>Price</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map(product => (
//                 <tr key={product.id}>
//                   <td>{product.type}</td>
//                   <td>${product.price}</td>
//                   <td>
//                     <button onClick={() => removeFromCart(product.id)}>
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <Link to="/checkout">
//             <button>Checkout</button>
//           </Link>
//         </div>
//       )}
//     </div>
//   )
// }

import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "components/context/CartContext"

export default function Cart() {
  const { cart, removeFromCart } = useCart()

  return (
    <>
      <div className="cartContainer">
        <h1 className="cartTitle">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cartItems">
            <table className="cartTable">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Bin</th>
                  <th>Exp Date</th>
                  <th>CVV</th>
                  <th>Country</th>
                  <th>Bank</th>
                  <th>Address</th>
                  <th>Security PIN</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(product => (
                  <tr key={product.id}>
                    <td>{product.type}</td>
                    <td>{product.bin}</td>
                    <td>{product.expDate}</td>
                    <td>{product.cvv}</td>
                    <td>{product.country}</td>
                    <td>{product.bank}</td>
                    <td>{product.address}</td>
                    <td>{product.securityPin}</td>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className="removeButton"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <style jsx>{`
          .cartContainer {
            background-color: #1f2431;
            padding: 20px;
            color: #fff;
            border-radius: 8px;
            max-width: 1200px;
            margin: auto;
          }
          .cartTitle {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            color: #fff;
          }
          .cartItems {
            margin-top: 20px;
            overflow-x: auto;
          }
          .cartTable {
            width: 100%;
            border-collapse: collapse;
            background-color: #2a3142;
            color: #fff;
          }
          .cartTable th,
          .cartTable td {
            padding: 10px;
            text-align: left;
            border: 1px solid #444;
          }
          .cartTable th {
            background-color: #2a3142;
          }
          .cartTable td {
            background-color: #2a3142;
          }
          .removeButton {
            background-color: #ff4d4f;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
          }
          .removeButton:hover {
            background-color: #ff3333;
          }
          .cartActions {
            text-align: center;
            margin-top: 20px;
          }
          .checkoutButton {
            background-color: #7a6fbe;
            color: white;
            border: none;
            padding: 15px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
          .checkoutButton:hover {
            background-color: #685fa0;
          }

          @media (max-width: 768px) {
            .cartContainer {
              padding: 10px;
            }
            .cartTitle {
              font-size: 20px;
            }
            .cartTable th,
            .cartTable td {
              padding: 5px;
            }
          }
        `}</style>
      </div>
      <div className="cartActions">
        <Link to="/checkout">
          <button className="checkoutButton">Checkout</button>
        </Link>
      </div>
    </>
  )
}
