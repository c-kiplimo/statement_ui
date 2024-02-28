"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useTokens } from "@/src/app/(context)/ColorContext";

const CustomerDetailsTab = ({ title, fields, cardWidth }: any) => {
  const token = useTokens();
  type FormData = { [key: string]: string };

  const [formData, setFormData] = useState<FormData>({});

  const handleInputChange = (label: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [label]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("Form Data:", formData);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "16px 0px",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        className="customer-details-card"
        style={{
          display: "flex",
          height: "300px",
          width: cardWidth,

          padding: "24px 32px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "32px",
          borderRadius: "8px",
          border:
            title === `Two-factor Authentication`
              ? `none`
              : `1px solid ${token.border.primary}`,
          background: token.default.white,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "25px",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <p
              style={{
                color: token.text.secondary,

                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "32px",
              }}
            >
              {title}
            </p>
            <Button
              icon={<EditOutlined />}
              htmlType="submit"
              onClick={handleSubmit}
            />
          </div>
          {fields && fields.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: cardWidth,
                justifyContent: "start",
                alignItems: "start",
                gap: title === "Documents" ? "" : "16px",
              }}
            >
              {fields
                .reduce((pairs: any, field: any, index: number) => {
                  if (index % 2 === 0) {
                    pairs.push([field]);
                  } else {
                    pairs[pairs.length - 1].push(field);
                  }
                  return pairs;
                }, [])
                .map((pair: any, pairIndex: number) => (
                  <div
                    key={pairIndex}
                    style={{
                      display: title === "Documents" ? "" : "flex",
                      gap:
                        title === "Physical Address" ||
                        title === "Communication Channel"
                          ? "200px"
                          : "16px",
                    }}
                  >
                    {pair.map((field: any, index: any) => (
                      <div key={field.label}>
                        <label
                          style={{
                            color: token.text.description_01,
                            fontSize: "12.85px",
                            display: "flex",
                            justifyContent:
                              title === "Documents"
                                ? "flex-start"
                                : index === pair.length - 1 && pair.length !== 1
                                ? "flex-end"
                                : "flex-start",
                            fontStyle: "normal",

                            fontWeight: "400",
                            lineHeight: "16px",
                          }}
                        >
                          {field.label}
                        </label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            background:
                              title === "Documents" ? "#F9FAF7" : "transparent",
                          }}
                        >
                          {title === "Documents" && field.icon && (
                            <div style={{ margin: "10px" }}>{field.icon}</div>
                          )}
                          <input
                            type="text"
                            name={field.label}
                            placeholder={field.placeholder}
                            value={formData[field.label] || ""}
                            onChange={(e) =>
                              handleInputChange(field.label, e.target.value)
                            }
                            className={`outline-none ${
                              title === "Documents"
                                ? "text-left"
                                : index === pair.length - 1 && pair.length !== 1
                                ? "text-right"
                                : "text-left"
                            } placeholder-[#151E00]`}
                            style={{
                              color: token.text.secondary,
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: "400",
                              padding: title === "Documents" ? "8px" : "",
                              lineHeight: "25.5px",
                              width: title === "Documents" ? "800px" : "",
                              background:
                                title === "Documents"
                                  ? "#F9FAF7"
                                  : "transparent",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CustomerDetailsTab;
