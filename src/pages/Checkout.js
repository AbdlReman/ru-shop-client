import { useState } from "react"
import emailjs from "emailjs-com" // Import EmailJS
import { useCart } from "components/context/CartContext"

export default function Checkout() {
  const { cart, clearCart } = useCart() // Use the cart context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
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

  const total = cart.reduce((sum, product) => sum + product.price, 0)

  const handleCheckout = e => {
    e.preventDefault()

    // Prepare email data
    const emailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      total,
      products: cart
        .map(
          item =>
            `Type: ${item.type}, Bin: ${item.bin}, Exp Date: ${item.expDate}, Country: ${item.country}, Bank: ${item.bank}, Address: ${item.address}, Security PIN: ${item.securityPin}, Price: $${item.price}`
        )
        .join("\n"),
    }

    // Send email using EmailJS
    emailjs
      .send(
        "service_23gcvkn", // replace with your EmailJS service ID
        "template_udpu1go", // replace with your EmailJS template ID
        emailData,
        "aU2q_LGAXyRNadJu8" // replace with your EmailJS user ID
      )
      .then(response => {
        alert("Checkout successful!")
        clearCart() // Clear the cart after successful checkout
      })
      .catch(error => {
        console.log("Failed to send email:", error)
      })
  }

  return (
    <>
      <div className="checkout-container">
        <h1>Checkout</h1>
        {cart.length === 0 ? (
          <p>
            Your cart is empty. <a href="/">Go back to Products</a>
          </p>
        ) : (
          <form onSubmit={handleCheckout} className="checkout-form">
            <h2>Total: ${total}</h2>

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

            {/* Payment  */}
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
            {formData.paymentMethod &&
              paymentDetails[formData.paymentMethod] && (
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
        )}
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
