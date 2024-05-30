import type { CSSProperties } from "react";
import React, { useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import styles from "./help.center.module.css";
const text = `
Find information on which transfer services you can use and where you can send money using KCB simba Portal
`;

const getItems = (
  panelStyle: (isActive: boolean) => CSSProperties,
  activeKeys: string[]
): CollapseProps["items"] => [
  {
    key: "1",
    label: (
      <span className={`bodyl`}>Ready to take the plunge into Transfer?</span>
    ),
    children: <p className={`captionr`}>{text}</p>,
    style: panelStyle(activeKeys.includes("1")),
  },
  {
    key: "2",
    label: (
      <span className={`bodyl`}>
        How to stay safe online - our security guide?
      </span>
    ),
    children: <p className={`captionr`}>{text}</p>,
    style: panelStyle(activeKeys.includes("2")),
  },
  {
    key: "3",
    label: (
      <span className={`bodyl`}>Ready to take the plunge into Transfer?</span>
    ),
    children: <p className={`captionr`}>{text}</p>,
    style: panelStyle(activeKeys.includes("3")),
  },
];

const HelpCenter = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>(["1"]);

  const panelStyle = (isActive: boolean): React.CSSProperties => ({
    marginBottom: 8,
    background: isActive ? "#F5F5F5" : "none",
    borderBottom: "1px solid #E6E6E6",
    borderTop: isActive ? "1px solid #E6E6E6" : "none",
    borderRadius: "none",
  });

  const handleChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };

  return (
    <div style={{ width: "100%" }}>
      <Collapse
        bordered={false}
        activeKey={activeKeys}
        onChange={handleChange}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: "none" }}
        items={getItems(panelStyle, activeKeys)}
        expandIconPosition="end"
        size="large"
      />
    </div>
  );
};

export default HelpCenter;
