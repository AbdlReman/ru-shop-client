// import { useEffect, useState } from "react"
// import { createClient } from "contentful"
// import { useCart } from "components/context/CartContext"

// // Initialize the Contentful client
// const client = createClient({
//   space: "36tnuwy9075k", // Store your Contentful space ID in .env.local
//   accessToken: "w6FOfxZGLmHXenbMizDWOVvQaBagutljExDB9Ech09s", // Store your access token in .env.local
//   environment: "master", // You can specify the environment if different
// })

// export default function Products() {
//   const { addToCart, cart } = useCart() // Use cart context
//   const [products, setProducts] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [countryFilter, setCountryFilter] = useState("")
//   const [visaTypeFilter, setVisaTypeFilter] = useState("")

//   // Fetch data from Contentful when component mounts
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await client.getEntries({
//           content_type: "product", // Assuming 'product' is your content type ID in Contentful
//         })

//         const fetchedProducts = response.items.map(item => ({
//           id: item.sys.id,
//           type: item.fields.type,
//           typeImage: item.fields.typeImage?.fields?.file?.url,
//           bin: item.fields.bin,
//           expDate: item.fields.expDate,
//           cvv: item.fields.cvv,
//           country: item.fields.country,
//           bank: item.fields.bank,
//           address: item.fields.address,
//           securityPin: item.fields.securityPin,
//           nonVbv: item.fields.nonVbv,
//           refund: item.fields.refund,
//           price: item.fields.price,
//         }))

//         setProducts(fetchedProducts)
//       } catch (error) {
//         console.error("Error fetching products from Contentful:", error)
//       }
//     }

//     fetchProducts()
//   }, [])

//   const filteredProducts = products.filter(product => {
//     const term = searchTerm.toLowerCase()
//     const matchesSearchTerm =
//       product.type.toLowerCase().includes(term) ||
//       product.bin.toLowerCase().includes(term) ||
//       product.expDate.toLowerCase().includes(term) ||
//       product.cvv.toLowerCase().includes(term) ||
//       product.country.toLowerCase().includes(term) ||
//       product.bank.toLowerCase().includes(term) ||
//       product.address.toLowerCase().includes(term) ||
//       product.securityPin.toLowerCase().includes(term) ||
//       (product.nonVbv ? "yes" : "no").toLowerCase().includes(term) ||
//       (product.refund ? "yes" : "no").toLowerCase().includes(term) ||
//       product.price.toString().toLowerCase().includes(term)
//     const matchesCountryFilter =
//       countryFilter === "" || product.country === countryFilter
//     const matchesVisaTypeFilter =
//       visaTypeFilter === "" || product.type === visaTypeFilter

//     return matchesSearchTerm && matchesCountryFilter && matchesVisaTypeFilter
//   })

//   return (
//     <div className="products-container">
//       <h1 className="products-title">Product List</h1>

//       {/* Filters */}
//       <div className="products-filters">
//         <select
//           value={countryFilter}
//           onChange={e => setCountryFilter(e.target.value)}
//           className="products-select"
//         >
//           <option value="">Select Country</option>
//           {Array.from(new Set(products.map(product => product.country))).map(
//             country => (
//               <option key={country} value={country}>
//                 {country}
//               </option>
//             ),
//           )}
//         </select>
//         <select
//           value={visaTypeFilter}
//           onChange={e => setVisaTypeFilter(e.target.value)}
//           className="products-select"
//         >
//           <option value="">Select Visa Type</option>
//           {Array.from(new Set(products.map(product => product.type))).map(
//             type => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ),
//           )}
//         </select>
//         <br />
//         <input
//           type="text"
//           placeholder="Search across all fields..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="products-search-input"
//         />
//       </div>

//       {filteredProducts.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="products-table-container">
//           <table className="products-table">
//             <thead>
//               <tr className="products-table-header">
//                 <th className="products-table-header-cell">Image</th>
//                 <th className="products-table-header-cell">Type</th>
//                 <th className="products-table-header-cell">Bin</th>
//                 <th className="products-table-header-cell">Exp Date</th>
//                 <th className="products-table-header-cell">CVV</th>
//                 <th className="products-table-header-cell">Country</th>
//                 <th className="products-table-header-cell">Bank</th>
//                 <th className="products-table-header-cell">Address</th>
//                 <th className="products-table-header-cell">Security PIN</th>
//                 <th className="products-table-header-cell">Non VBV</th>
//                 <th className="products-table-header-cell">Refund</th>
//                 <th className="products-table-header-cell">Price</th>
//                 <th className="products-table-header-cell">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map(product => (
//                 <tr key={product.id} className="products-table-row">
//                   <td className="products-table-cell">
//                     {product.typeImage ? (
//                       <img
//                         src={product.typeImage}
//                         alt={product.type}
//                         className="products-image"
//                       />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>
//                   <td className="products-table-cell">{product.type}</td>
//                   <td className="products-table-cell">{product.bin}</td>
//                   <td className="products-table-cell">{product.expDate}</td>
//                   <td className="products-table-cell">{product.cvv}</td>
//                   <td className="products-table-cell">{product.country}</td>
//                   <td className="products-table-cell">{product.bank}</td>
//                   <td className="products-table-cell">{product.address}</td>
//                   <td className="products-table-cell">{product.securityPin}</td>
//                   <td className="products-table-cell">
//                     {product.nonVbv ? "Yes" : "No"}
//                   </td>
//                   <td className="products-table-cell">
//                     {product.refund ? "Yes" : "No"}
//                   </td>
//                   <td className="products-table-cell">${product.price}</td>
//                   <td className="products-table-cell">
//                     <button
//                       className="products-add-to-cart-button"
//                       onClick={() => addToCart(product)}
//                     >
//                       buy
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <a href="/cart">
//         <button className="products-cart-button">
//           View Cart ({cart.length})
//         </button>
//       </a>

//       <style jsx>{`
//         .products-container {
//           background-color: #050a1e;
//           padding: 20px;
//           color: #fff;
//           border-radius: 8px;
//         }
//         .products-title {
//           color: #fff;
//           text-align: center;
//           margin-bottom: 20px;
//           font-size: 24px;
//         }
//         .products-filters {
//           margin-bottom: 20px;
//         }
//         .products-select {
//           padding: 10px;
//           margin-bottom: 10px;
//           border-radius: 5px;
//           border: 1px solid #ddd;
//           background-color:#2a3142;
//           color: #fff;
//         }
//         .products-search-input {
//           flex-grow: 1;
//           padding: 10px;
//           border-radius: 5px;
//           border: 1px solid #ddd;
//           margin-top: 10px;
//           background-color: #1f2947;
//           color: #fff;
//         }
//         .products-table-container {
//           overflow-x: auto;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//         }
//         .products-table {
//           width: 100%;
//           background-color: #10102e;
//           border-collapse: collapse;
//         }
//         .products-table-header {
//           background-color: #1f2947;
//           color: #fff;
//         }
//         .products-table-header-cell,
//         .products-table-cell {
//           border: 1px solid #444;
//           padding: 10px;
//           color: #fff;
//         }
//         .products-table-row:hover {
//           background-color: #202a47;
//         }
//         .products-image {
//           width: 50px;
//           border-radius: 5px;
//         }
//         .products-add-to-cart-button {
//           background-color: #ff3c00;
//           color: #fff;
//           border: none;
//           padding: 10px 15px;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         .products-cart-button {
//           background-color: #007bff;
//           color: #fff;
//           border: none;
//           padding: 10px 15px;
//           border-radius: 5px;
//           cursor: pointer;
//           margin-top: 20px;
//         }
//       `}</style>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { createClient } from "contentful"
import { useCart } from "components/context/CartContext"

const client = createClient({
  space: "36tnuwy9075k",
  accessToken: "w6FOfxZGLmHXenbMizDWOVvQaBagutljExDB9Ech09s",
})

export default function Cards() {
  const { addToCart, cart } = useCart()
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [countryFilter, setCountryFilter] = useState("")
  const [visaTypeFilter, setVisaTypeFilter] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.getEntries({ content_type: "product" })
        const fetchedProducts = response.items.map(item => ({
          id: item.sys.id,
          type: item.fields.type,
          typeImage: item.fields.typeImage?.fields?.file?.url,
          bin: item.fields.bin,
          expDate: item.fields.expDate,
          cvv: item.fields.cvv,
          country: item.fields.country,
          bank: item.fields.bank,
          address: item.fields.address,
          securityPin: item.fields.securityPin,
          nonVbv: item.fields.nonVbv,
          refund: item.fields.refund,
          price: item.fields.price,
        }))
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products from Contentful:", error)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const term = searchTerm.toLowerCase()
    const matchesSearchTerm =
      product.type.toLowerCase().includes(term) ||
      product.bin.toLowerCase().includes(term) ||
      product.expDate.toLowerCase().includes(term) ||
      product.cvv.toLowerCase().includes(term) ||
      product.country.toLowerCase().includes(term) ||
      product.bank.toLowerCase().includes(term) ||
      product.address.toLowerCase().includes(term) ||
      product.securityPin.toLowerCase().includes(term) ||
      (product.nonVbv ? "yes" : "no").toLowerCase().includes(term) ||
      (product.refund ? "yes" : "no").toLowerCase().includes(term) ||
      product.price.toString().toLowerCase().includes(term)
    const matchesCountryFilter =
      countryFilter === "" || product.country === countryFilter
    const matchesVisaTypeFilter =
      visaTypeFilter === "" || product.type === visaTypeFilter

    return matchesSearchTerm && matchesCountryFilter && matchesVisaTypeFilter
  })

  return (
    <div className="productsContainer">
      <h1 className="productsTitle">Product List</h1>

      <div className="productsFilters">
        <select
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
          className="productsSelect"
        >
          <option value="">Select Country</option>
          {Array.from(new Set(products.map(product => product.country))).map(
            country => (
              <option key={country} value={country}>
                {country}
              </option>
            )
          )}
        </select>

        <select
          value={visaTypeFilter}
          onChange={e => setVisaTypeFilter(e.target.value)}
          className="productsSelect"
        >
          <option value="">Select Visa Type</option>
          {Array.from(new Set(products.map(product => product.type))).map(
            type => (
              <option key={type} value={type}>
                {type}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          placeholder="Search across all fields..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="productsSearchInput"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="productsTableContainer">
          <table className="productsTable">
            <thead>
              <tr className="productsTableHeader">
                <th>Image</th>
                <th>Type</th>
                <th>Bin</th>
                <th>Exp Date</th>
                <th>CVV</th>
                <th>Country</th>
                <th>Bank</th>
                <th>Address</th>
                <th>Security PIN</th>
                <th>Non VBV</th>
                <th>Refund</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="productsTableRow">
                  <td>
                    {product.typeImage ? (
                      <img
                        src={product.typeImage}
                        alt={product.type}
                        className="productsImage"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{product.type}</td>
                  <td>{product.bin}</td>
                  <td>{product.expDate}</td>
                  <td>{product.cvv}</td>
                  <td>{product.country}</td>
                  <td>{product.bank}</td>
                  <td>{product.address}</td>
                  <td>{product.securityPin}</td>
                  <td>{product.nonVbv ? "Yes" : "No"}</td>
                  <td>{product.refund ? "Yes" : "No"}</td>
                  <td>${product.price}</td>
                  <td>
                    <button
                      className="productsAddToCartButton"
                      onClick={e => {
                        e.preventDefault()
                        addToCart(product)
                      }}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/cart">
        <button className="productsCartButton">
          Go to Cart ({cart.length})
        </button>
      </Link>
      <style jsx>{`
        .productsContainer {
          background-color: #1f2431;
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
        .productsFilters {
          margin-bottom: 20px;
        }
        .productsSelect {
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          background-color: #2a3142;
          color: #fff;
        }
        .productsSearchInput {
          flex-grow: 1;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          margin-top: 10px;
          background-color: #2a3142;
          color: #fff;
        }
        .productsTableContainer {
          overflow-x: auto;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .productsTable {
          width: 100%;
          background-color: #2a3142;
          border-collapse: collapse;
        }
        .productsTableHeader {
          background-color: #2a3142;
          color: #fff;
        }
        .productsTableRow td,
        .productsTableHeader th {
          border: 1px solid #444;
          padding: 10px;
          color: #fff;
        }
        .productsTableRow:hover {
          background-color: #202a47;
        }
        .productsImage {
          width: 50px;
          border-radius: 5px;
        }
        .productsAddToCartButton {
          background-color: #7a6fbe;
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        .productsCartButton {
          background-color: #7a6fbe;
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }
      `}</style>
    </div>
  )
}
