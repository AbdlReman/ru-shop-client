import React, { useState } from "react"
import emailjs from "emailjs-com"

const Chat = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    emailjs
      .send(
        "service_5v6eeoi",
        "template_yinbo7h",
        formData,
        "aU2q_LGAXyRNadJu8"
      )
      .then(
        response => {
          alert("Message sent successfully!", response.status, response.text)
          setFormData({ email: "", message: "" }) // Clear form after successful submission
        },
        error => {
          alert("Failed to send message. Please try again later.", error)
        }
      )
  }

  // Inline CSS styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#1f2431", // Dark background
      padding: "20px",
    },
    formWrapper: {
      backgroundColor: "#2a3142",
      padding: "30px",
      borderRadius: "8px",
      width: "100%",
      maxWidth: "600px", // Limit width on larger screens
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      color: "#f0f0f0",
    },
    inputField: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #555",
      backgroundColor: "#1f2431",
      color: "#fff",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#1f2431", // Button color
      border: "none",
      borderRadius: "4px",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#7a6fbe",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
      textAlign: "center",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Get in Touch</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.inputField}
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <br />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              style={styles.inputField}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={e =>
              (e.currentTarget.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={e =>
              (e.currentTarget.style.backgroundColor =
                styles.button.backgroundColor)
            }
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
