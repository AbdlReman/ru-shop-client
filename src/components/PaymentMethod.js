import { useState, useEffect } from "react"
import { createClient } from "contentful"

// Create a Contentful client
const client = createClient({
  space: "36tnuwy9075k",
  accessToken: "w6FOfxZGLmHXenbMizDWOVvQaBagutljExDB9Ech09s",
})

// PaymentMethod.js
export default function PaymentMethod() {
  const [formData, setFormData] = useState({
    paymentMethod: "",
  })

  const [paymentDetails, setPaymentDetails] = useState({})

  // Fetch payment methods from Contentful
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await client.getEntries({
          content_type: "paymentMethod", // Your content model ID
        })

        const methods = response.items.reduce((acc, item) => {
          const methodName = item.fields.name.toLowerCase() // Assuming the name field is set to 'Bitcoin', 'LTC', etc.
          acc[methodName] = {
            address: item.fields.address,
            qrCodeImgUrl: item.fields.image.fields.file.url, // Adjust based on your image field
          }
          return acc
        }, {})

        setPaymentDetails(methods)
      } catch (error) {
        console.error("Error fetching payment methods:", error)
      }
    }

    fetchPaymentMethods()
  }, [])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {/* Payment Method Selection */}
      <div className="form-group">
        <label htmlFor="paymentMethod">Select Payment Method:</label>
        <select
          name="paymentMethod"
          id="paymentMethod"
          value={formData.paymentMethod} // Changed to use formData
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">-- Select Payment Method --</option>
          {Object.keys(paymentDetails).map(method => (
            <option key={method} value={method}>
              {method.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Conditionally display payment details based on selection */}
      {formData.paymentMethod && paymentDetails[formData.paymentMethod] && (
        <div className="payment-instructions">
          <h3 className="paymenth3">
            Deposit Money via {formData.paymentMethod.toUpperCase()}
          </h3>
          <p>Deposits are added automatically within ~5 mins</p>
          <p>
            {formData.paymentMethod.toUpperCase()} Address:{" "}
            <strong>{paymentDetails[formData.paymentMethod].address}</strong>
          </p>
          <p>Alternatively, you can scan the QR code:</p>
          <img
            src={paymentDetails[formData.paymentMethod].qrCodeImgUrl}
            alt={`${formData.paymentMethod} QR Code`}
            className="qr-code"
          />
        </div>
      )}
    </div>
  )
}
