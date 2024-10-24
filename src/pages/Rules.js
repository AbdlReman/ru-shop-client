import React, { useEffect, useState } from "react"
import { createClient } from "contentful"

const Rules = () => {
  return (
    <div className="mainHomeContainer">
      <h1>Rules</h1>
      <ul className="newsList">
        <li className="newsItem">
          <spam style={{ color: "#0998a8" }}>
            {" "}
            Please read before use our service
          </spam>
          <br /> <br />
          Price for CVV starts from 5$ Fast automatic payment methods
          <br />
          Instant stuff delivery
          <br />
          Ticket support
          <br />
          supporting (support@russianshop.cc)
          <br />
          NO money back
          <br />
          We accept only Bitcoin ,LTC,ETH and Tron
          <br />
          It's not a refunded way, we replace only DEAD cards. But if you know
          that card not valid - ask support please.
        </li>
        <hr style={{ color: "#0998a8" }} />
      </ul>

      <style jsx>{`
        .mainHomeContainer {
          padding: 20px;
          background-color: #0b1c2c;
          color: #fff;
          border-radius: 8px;
          margin: 10px 10px;
        }
        .newsList {
          list-style-type: none;
          padding: 0;
        }
        .newsItem {
          margin: 10px 0;
          font-size: 20px;

          background-color: #192938;
          padding: 20px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}

export default Rules
