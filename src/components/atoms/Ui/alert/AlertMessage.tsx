/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";

import Image from "next/image";

const AlertMessage = ({ type, message, onClose }: any) => {
  const [visible, setVisible] = useState(true);

  const closeAlert = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const alertClass = `alert ${type || "info"} ${visible ? "show" : ""}`;

  return (
    <div style={{ background: "#FFF" }} className={alertClass}>
      {onClose && (
        <span className="close" onClick={closeAlert}>
          &times;
        </span>
      )}
      {type === "success" && <strong>Success:</strong>}
      {type === "warning" && <strong>Warning:</strong>}
      {type === "error" && <strong>Error:</strong>}
      {type === "info" && <strong>Info:</strong>} {message}
      {type === "login" && (
        <div style={{ background: "#FFF" }}>
          <p>Dear Valued Customer</p>
          <p>Tap the link below to login to KCB Bank Statement Portal.</p>
          <button
            style={{
              background: "blue",
              color: "white",
              margin: "1rem",
              padding: "4px",
            }}
          >
            Login
          </button>
          <p>
            If you have questions or concerns, kindly email us at{" "}
            <a href="mailto:customercare@kcb.co.ke">customercare@kcb.co.ke</a>.
            We're here to help.
          </p>
          <p>Best regards,</p>
          <p>Simba Portal Team</p>
          <Image
            width={20}
            height={20}
            src="/logo.png"
            alt="Simba Portal Logo"
          />
        </div>
      )}
    </div>
  );
};

export default AlertMessage;
