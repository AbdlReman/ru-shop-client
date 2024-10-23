import { useState } from "react"
import emailjs from "emailjs-com" // Import EmailJS

export default function Payment() {
  const [formData, setFormData] = useState({
    email: "",
    trxId: "",
    paymentMethod: "", // Added paymentMethod to state
  })

  const paymentDetails = {
    bitcoin: {
      address: "17oXMnVMTCZyj9rThoZ3fBLvtUvuwu9VS1",
      qrCodeImgUrl:
        "https://res.cloudinary.com/dzeldg2vi/image/upload/fl_preserve_transparency/v1729576383/bitcoin_mu7mjz.jpg?_s=public-apps",
    },
    ltc: {
      address: "LcGYdH9wBr6nNJcjZoREXQJEijS9M3drx7",
      qrCodeImgUrl:
        "https://res.cloudinary.com/dzeldg2vi/image/upload/fl_preserve_transparency/v1729576383/ltc_qucokf.jpg?_s=public-apps",
    },
    eth: {
      address: "0x7e84309ea3ac919d2d4d910fb4134fe627e289e2",
      qrCodeImgUrl:
        "https://res.cloudinary.com/dzeldg2vi/image/upload/fl_preserve_transparency/v1729576383/eth_pjqgwm.jpg?_s=public-apps",
    },
    tron: {
      address: "TEe6v4eDLZooWZpQ3Qg7XYqerbZpA1gUDj",
      qrCodeImgUrl:
        "https://res.cloudinary.com/dzeldg2vi/image/upload/fl_preserve_transparency/v1729576383/tron_x2fd7o.jpg?_s=public-apps",
    },
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckout = e => {
    e.preventDefault()

    // Prepare email data without payment method
    const emailData = {
      email: formData.email,
      trxId: formData.trxId,
      // paymentMethod: formData.paymentMethod, // Removed payment method from email data
    }

    // Send email using EmailJS
    emailjs
      .send(
        "service_h9lt7k7", // Replace with your EmailJS service ID
        "template_3npgpfc", // Replace with your EmailJS template ID
        emailData,
        "P_QoKORWe3OT42t16" // Replace with your EmailJS user ID
      )
      .then(response => {
        console.log("Email sent successfully!", response) // Log success
        alert("Payment successful!.")
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
              <option value="bitcoin">Bitcoin</option>
              <option value="ltc">LTC</option>
              <option value="eth">Ethereum</option>
              <option value="tron">Tron</option>
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
                <strong>
                  {paymentDetails[formData.paymentMethod].address}
                </strong>
              </p>
              <p>Alternatively, you can scan the QR code:</p>
              <img
                src={paymentDetails[formData.paymentMethod].qrCodeImgUrl}
                alt={`${formData.paymentMethod} QR Code`}
                className="qr-code"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="trxId">Transaction ID (TXID)</label>
            <input
              type="text"
              name="trxId"
              id="trxId"
              value={formData.trxId}
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
        h3 {
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
