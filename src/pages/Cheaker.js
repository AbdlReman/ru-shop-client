import React, { useEffect, useState } from "react"
import { createClient } from "contentful"

const client = createClient({
  space: "36tnuwy9075k",
  accessToken: "w6FOfxZGLmHXenbMizDWOVvQaBagutljExDB9Ech09s",
})

export default function Cheaker() {
  const [bins, setBins] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("")

  // Fetching data from Contentful
  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await client.getEntries({
          content_type: "bin", // Ensure this matches your Content Model ID
        })

        const binValues = response.items.map(item => item.fields.value) // Adjust 'value' to match your field name in Contentful
        setBins(binValues)
      } catch (error) {
        console.error("Error fetching bins from Contentful:", error)
      }
    }

    fetchBins()
  }, [])

  // Handle input change
  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  // Handle button click
  const handleCheck = () => {
    if (bins.includes(inputValue)) {
      setMessage("Card is activated")
    } else {
      setMessage("Card is not valid")
    }

    // Clear message after 4 seconds
    setTimeout(() => {
      setMessage("")
    }, 4000) // 4000 milliseconds = 4 seconds
  }

  return (
    <div className="productsContainer">
      <h1 className="productsTitle">Bin Cheaker</h1>
      <hr style={{ color: "#0998a8" }} />
      <input
        type="text"
        placeholder="Search across all fields..."
        className="productsSearchInput"
        value={inputValue}
        onChange={handleInputChange}
      />

      <br />
      <button className="productsCartButton" onClick={handleCheck}>
        Go
      </button>
      <hr style={{ color: "#0998a8" }} />
      {message && <p className="message">{message}</p>}

      <style jsx>{`
        .productsContainer {
          background-color: #0b1c2c;
          margin: 10px 0;
          padding: 20px;
          color: #fff;
          border-radius: 8px;
        }

        .productsSearchInput {
          width: 95%;
          background-color: #192938;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
        }

        .productsCartButton {
          padding: 4px 8px;
          border: none;
          background-color: #0998a8;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
        }

        .message {
          margin-top: 10px;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}
