// import React, { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { createClient } from "contentful"
// import { useCart } from "components/context/CartContext"

// const client = createClient({
//   space: "36tnuwy9075k",
//   accessToken: "w6FOfxZGLmHXenbMizDWOVvQaBagutljExDB9Ech09s",
// })

// export default function Cards() {
//   const { addToCart, cart } = useCart()
//   const [products, setProducts] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [countryFilter, setCountryFilter] = useState("")
//   const [visaTypeFilter, setVisaTypeFilter] = useState("")

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await client.getEntries({ content_type: "product" })
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
//     <div className="productsContainer">
//       <h1 className="productsTitle">Product List</h1>

//       <div className="productsFilters">
//         <select
//           value={countryFilter}
//           onChange={e => setCountryFilter(e.target.value)}
//           className="productsSelect"
//         >
//           <option value="">Select Country</option>
//           {Array.from(new Set(products.map(product => product.country))).map(
//             country => (
//               <option key={country} value={country}>
//                 {country}
//               </option>
//             )
//           )}
//         </select>

//         <select
//           value={visaTypeFilter}
//           onChange={e => setVisaTypeFilter(e.target.value)}
//           className="productsSelect"
//         >
//           <option value="">Select Visa Type</option>
//           {Array.from(new Set(products.map(product => product.type))).map(
//             type => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             )
//           )}
//         </select>

//         <input
//           type="text"
//           placeholder="Search across all fields..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="productsSearchInput"
//         />
//       </div>

//       {filteredProducts.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="productsTableContainer">
//           <table className="productsTable">
//             <thead>
//               <tr className="productsTableHeader">
//                 <th>Image</th>
//                 <th>Type</th>
//                 <th>Bin</th>
//                 <th>Exp Date</th>
//                 <th>CVV</th>
//                 <th>Country</th>
//                 <th>Bank</th>
//                 <th>Address</th>
//                 <th>Security PIN</th>
//                 <th>Non VBV</th>
//                 <th>Refund</th>
//                 <th>Price</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map(product => (
//                 <tr key={product.id} className="productsTableRow">
//                   <td>
//                     {product.typeImage ? (
//                       <img
//                         src={product.typeImage}
//                         alt={product.type}
//                         className="productsImage"
//                       />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>
//                   <td>{product.type}</td>
//                   <td>{product.bin}</td>
//                   <td>{product.expDate}</td>
//                   <td>{product.cvv}</td>
//                   <td>{product.country}</td>
//                   <td>{product.bank}</td>
//                   <td>{product.address}</td>
//                   <td>{product.securityPin}</td>
//                   <td>{product.nonVbv ? "Yes" : "No"}</td>
//                   <td>{product.refund ? "Yes" : "No"}</td>
//                   <td>${product.price}</td>
//                   <td>
//                     <button
//                       className="productsAddToCartButton"
//                       onClick={e => {
//                         e.preventDefault()
//                         addToCart(product)
//                       }}
//                     >
//                       Buy
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Link to="/cart">
//         <button className="productsCartButton">
//           Go to Cart ({cart.length})
//         </button>
//       </Link>
//       <style jsx>{`
//         .productsContainer {
//           background-color: #1f2431;
//           padding: 20px;
//           color: #fff;
//           border-radius: 8px;
//         }
//         .productsTitle {
//           color: #fff;
//           text-align: center;
//           margin-bottom: 20px;
//           font-size: 24px;
//         }
//         .productsFilters {
//           margin-bottom: 20px;
//         }
//         .productsSelect {
//           padding: 10px;
//           margin-bottom: 10px;
//           border-radius: 5px;
//           border: 1px solid #ddd;
//           background-color: #2a3142;
//           color: #fff;
//         }
//         .productsSearchInput {
//           flex-grow: 1;
//           padding: 10px;
//           border-radius: 5px;
//           border: 1px solid #ddd;
//           margin-top: 10px;
//           background-color: #2a3142;
//           color: #fff;
//         }
//         .productsTableContainer {
//           overflow-x: auto;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//         }
//         .productsTable {
//           width: 100%;
//           background-color: #2a3142;
//           border-collapse: collapse;
//         }
//         .productsTableHeader {
//           background-color: #2a3142;
//           color: #fff;
//         }
//         .productsTableRow td,
//         .productsTableHeader th {
//           border: 1px solid #444;
//           padding: 10px;
//           color: #fff;
//         }
//         .productsTableRow:hover {
//           background-color: #202a47;
//         }
//         .productsImage {
//           width: 50px;
//           border-radius: 5px;
//         }
//         .productsAddToCartButton {
//           background-color: #7a6fbe;
//           color: #fff;
//           border: none;
//           padding: 10px 15px;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         .productsCartButton {
//           background-color: #7a6fbe;
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
  const [bankFilter, setBankFilter] = useState("")
  const [priceSort, setPriceSort] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

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
          validation: item.fields.validation,
          price: item.fields.price,
        }))
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products from Contentful:", error)
      }
    }
    fetchProducts()
  }, [])

  // Sorting products by price
  const sortProductsByPrice = (products, sortOption) => {
    if (sortOption === "lowToHigh") {
      return [...products].sort((a, b) => a.price - b.price)
    } else if (sortOption === "highToLow") {
      return [...products].sort((a, b) => b.price - a.price)
    }
    return products
  }

  // Filter products based on selected filters and search term
  const filteredProducts = products
    .filter(product => {
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
      const matchesBankFilter = bankFilter === "" || product.bank === bankFilter

      return (
        matchesSearchTerm &&
        matchesCountryFilter &&
        matchesVisaTypeFilter &&
        matchesBankFilter
      )
    })
    .sort((a, b) =>
      priceSort === "lowToHigh" ? a.price - b.price : b.price - a.price
    )

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="productsContainer">
      <h1 className="productsTitle">Product List</h1>

      <div className="productsFiltersRow1">
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

        <select
          value={bankFilter}
          onChange={e => setBankFilter(e.target.value)}
          className="productsSelect"
        >
          <option value="">Select Bank</option>
          {Array.from(new Set(products.map(product => product.bank))).map(
            bank => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            )
          )}
        </select>
      </div>

      <div className="productsFiltersRow2">
        <select
          value={priceSort}
          onChange={e => setPriceSort(e.target.value)}
          className="productsSelect"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
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
                <th>Validation</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
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
                  <td>{product.validation}%</td>
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

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Link to="/cart">
        <button className="productsCartButton">
          Go to Cart ({cart.length})
        </button>
      </Link>

      <style jsx>
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
      </style>
    </div>
  )
}
