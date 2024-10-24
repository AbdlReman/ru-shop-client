import React, { useState, useEffect } from "react"
import emailjs from "emailjs-com" // Import EmailJS
import { Link } from "react-router-dom"
import { createClient } from "contentful" // Import Contentful client
import { useNavigate } from "react-router-dom" // Import useNavigate for navigation

// Import logos

import Header from "components/VerticalLayout/Header"
import PaymentMethod from "components/PaymentMethod"

const Activation = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    trxId: "",
  })
  const [activationKey, setActivationKey] = useState("")
  const [correctActivationKey, setCorrectActivationKey] = useState("") // State for correct activation key
  const [isActivated, setIsActivated] = useState(false) // State to track activation status
  const navigate = useNavigate() // Initialize useNavigate

  // Initialize Contentful client
  const client = createClient({
    space: "36tnuwy9075k", // Your space ID
    accessToken: "w6FOfxZGLmHXenbMizDWOVvQaBagutljExDB9Ech09s", // Your access token
  })

  // Fetch activation key from Contentful
  useEffect(() => {
    const fetchActivationKey = async () => {
      try {
        const response = await client.getEntries({
          content_type: "key", // Your content type ID
        })

        // Assuming the activation key is in the first entry
        if (response.items.length > 0) {
          const keyEntry = response.items[0].fields.activationkey // Accessing the Activationkey field
          setCorrectActivationKey(keyEntry) // Set the activation key from Contentful
        }
      } catch (error) {
        console.error("Error fetching activation key:", error)
      }
    }

    fetchActivationKey()

    // Check if the user is already activated
    const activationStatus = localStorage.getItem("isActivated")
    if (activationStatus === "true") {
      setIsActivated(true)
      navigate("/home") // Navigate to home if already activated
    }
  }, [navigate]) // Add navigate to dependency array

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePayment = e => {
    e.preventDefault()

    console.log("Payment initiated with data:", formData) // Log form data

    // Prepare email data
    const emailData = {
      email: formData.email,
      trxId: formData.trxId,
      message: "Payment of $50 for account activation received.",
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
        alert("Payment successful! Please enter your activation key.")
        setCurrentStep(3) // Move to the activation key form
      })
      .catch(error => {
        console.log("Failed to send email:", error) // Log error
        alert("There was an error processing your payment. Please try again.")
      })
  }

  const handleActivationKeySubmit = e => {
    e.preventDefault()

    console.log("Entered Activation Key:", activationKey) // Log the entered key
    console.log("Correct Activation Key:", correctActivationKey) // Log the correct key

    if (activationKey === correctActivationKey) {
      alert("Activation successful! You can now access all pages.")
      localStorage.setItem("isActivated", "true") // Store activation state
      setIsActivated(true)
      navigate("/home") // Navigate to home on successful activation
    } else {
      alert("Please enter a valid activation key.")
    }
  }

  return (
    <>
      <Header />
      <div className="activation-modal">
        {/* Step 1: Activation Prompt */}
        {currentStep === 1 && (
          <>
            <h2>Your account isn't activated !</h2>
            <h5>
              To activate your account, please add at least 50 USD .<br /> You
              can use this after activation.
            </h5>
            <p>Pay $50 for activation</p>
            <button
              className="activate-button"
              onClick={() => setCurrentStep(2)}
            >
              Activate Account
            </button>
          </>
        )}

        {/* Step 2: Payment Form */}
        {currentStep === 2 && (
          <form onSubmit={handlePayment} className="payment-form">
            <h3>Payment Details</h3>
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
            <PaymentMethod />
            <div className="form-group">
              <label htmlFor="trxId">Transaction ID (TXID):</label>
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
            <button type="submit" className="confirm-order-button">
              Confirm Purchase
            </button>
          </form>
        )}

        {/* Step 3: Activation Key Form */}
        {currentStep === 3 && (
          <form
            onSubmit={handleActivationKeySubmit}
            className="activation-key-form"
          >
            <h4>
              Please enter the Activation key here.
              <br />
              We have sent it to your email. Your Account will be update after
              transaction got minimum confirmation, <br />
              It may take up to 20 minutes to arrive,sometime it takes upto 1
              hour so please check your email.
            </h4>
            <div className="form-group">
              <label htmlFor="activationKey">Enter Activation Key:</label>
              <input
                type="text"
                id="activationKey"
                value={activationKey}
                onChange={e => setActivationKey(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="confirm-order-button">
              Activate Key
            </button>
          </form>
        )}

        <style jsx>{`
          .activation-modal {
            max-width: 60%;
            margin: 0 auto;
            margin-top: 9%;
            padding: 20px;
            background-color: #0b1c2c;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            color: white;
          }

          h2,
          h3,
          h4,
          h5 {
            text-align: center;
          }

          .form-group {
            margin-bottom: 15px;
          }

          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }

          .form-input {
            background-color: #1f2431;
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            color: white;
          }

          .form-input:focus {
            border-color: #992123;
            outline: none;
          }

          .activate-button,
          .confirm-order-button {
            width: 100%;
            padding: 10px;
            background-color: #192938;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
          }

          .activate-button:hover,
          .confirm-order-button:hover {
            background-color: #192939;
          }

          .qr-code {
            margin: 20px auto;
            display: block;
          }
          @media (max-width: 768px) {
            .activation-modal {
              width: 95%%; /* Full width for small screens */
              max-width: 100%;
              margin-top: 30%;
            }
            .Baalance {
              display: none;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default Activation
