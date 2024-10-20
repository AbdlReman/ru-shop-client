import { useState } from "react"
import emailjs from "emailjs-com" // Import EmailJS

export default function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckout = e => {
    e.preventDefault()

    // Prepare email data
    const emailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }

    // Send email using EmailJS
    emailjs
      .send(
        "service_kia4i7t", // Replace with your EmailJS service ID
        "template_p80mc4x", // Replace with your EmailJS template ID
        emailData,
        "sFuFuTe0U4XxPad3Q" // Replace with your EmailJS user ID
      )
      .then(response => {
        console.log("Email sent successfully!", response) // Log success
        alert("Payment successful! Please enter your activation key.")
      })
      .catch(error => {
        console.log("Failed to send email:", error) // Log error
        alert("There was an error processing your payment. Please try again.")
      })
  }

  return (
    <>
      <div className="checkout-container">
        <h1>Payment</h1>

        <form onSubmit={handleCheckout} className="checkout-form">
          {/* Customer details form */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Payment instructions */}
          <h3 className="paymenth3">Deposit Money</h3>
          <div className="payment-instructions">
            {/* <p>Deposit Money</p> */}
            <p>Deposits are added automatically within ~5 mins</p>
            <p>
              BTC Address: <strong>NySNDb3P3aX3JvjYvJLz1tBfHLejFW</strong>
            </p>
            <p>Alternatively, you can scan the QR code:</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:1NySNDb3P3aX3JvjYvJLz1tBfHLejFWic2"
              alt="Bitcoin QR Code"
              className="qr-code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">transaction ID (TXID)</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="confirm-order-button">
            Confirm Purchase
          </button>
        </form>
      </div>

      {/* Add some CSS styling */}
      <style jsx>{`
        .checkout-container {
          max-width: 600px;
          margin: 0 auto;
          margin-bottom: 15px;
          padding: 20px;
          background-color: #0b1c2c;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          color: #fff;
        }
        h2 {
          text-align: center;
          color: #fff;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #fff;
        }
        .form-input {
          background-color: #192938;
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }
        .form-input:focus {
          border-color: #992123;
          outline: none;
        }
        .payment-instructions {
          margin-top: 30px;
          margin-bottom: 30px;
          padding: 15px;
          background-color: #192938;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .paymenth3 {
          margin-top: 20px;
        }

        .payment-instructions p {
          color: #fff;
        }
        .qr-code {
          margin-top: 10px;
          margin-bottom: 20px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .confirm-order-button {
          width: 100%;
          padding: 10px;
          background-color: #0998a8;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
        }
        .confirm-order-button:hover {
          background-color: #192938;
        }
        p {
          text-align: center;
          color: #333;
        }
      `}</style>
    </>
  )
}
