import React, { useEffect, useState } from "react"
import { createClient } from "contentful"

const client = createClient({
  space: "36tnuwy9075k",
  accessToken: "w6FOfxZGLmHXenbMizDWOVvQaBagutljExDB9Ech09s",
})

const MainHome = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.getEntries({
          content_type: "product", // Assuming 'products' is the correct content type
          order: "-sys.createdAt", // Get the latest entries first
        })
        const fetchedProducts = response.items.map(item => ({
          date: item.sys.createdAt, // Fetching the created date
        }))
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products from Contentful:", error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="mainHomeContainer">
      <h1>Latest Updates</h1>
      <ul className="newsList">
        {products.length === 0 ? (
          <p>No updates available.</p>
        ) : (
          products.map((item, index) => (
            <>
              {" "}
              <li key={index} className="newsItem">
                {" "}
                {new Date(item.date).toLocaleString()} <br /> Last Update!
                <br /> New CC added successfully done!
              </li>
              <hr />
            </>
          ))
        )}
      </ul>

      <style jsx>{`
        .mainHomeContainer {
          padding: 20px;
          background-color: #1f2431;
          color: #fff;
          border-radius: 8px;
        }
        .newsList {
          list-style-type: none;
          padding: 0;
        }
        .newsItem {
          margin: 10px 0;
          background-color: #2a3142;
          padding: 10px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}

export default MainHome
