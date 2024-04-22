import React from "react";
import styles from "./select.report.format.module.css";
import { GlobalOutlined } from "@ant-design/icons";
import CustomSearchInput from "@/src/components/atoms/input/custom-search-input";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";

const data = [
  {
    id: 1,
    image: <img src="/corporate.svg" />,
    name: "Corporate",
    description: "Description Text",
  },
  {
    id: 2,
    image: <img src="/retail.svg" />,
    name: "Retail",
    description: "Description Text",
  },
  {
    id: 3,
    image: <img src="/safaricom.svg" />,
    name: "Safaricom",
    description: "Description Text",
  },
  {
    id: 4,
    image: <img src="/default.svg" />,
    name: "Default",
    description: "Description Text",
  },
];

const SelectReportFormat = () => {
  return (
    <div className={styles.container}>
      <div>
        <SelectReportFormat.SelectBox />
      </div>
      <div>
        <CustomSearchInput
          inputStle={{ outline: "none", width: "100%" }}
          iconStyles={{ alignSelf: "flex-end" }}
          placeholder="Search"
        />
      </div>
      {data.map((items) => (
        <div className={styles.optionvaluesData}>
          <div>{items.image}</div>
          <div>
            <VerticalInfoDescription
              title={items.name}
              description={items.description}
              descriptionStyle={{ fontWeight: "300", color: "#6F7269" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectReportFormat;

SelectReportFormat.SelectBox = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <div className={styles.selecthead}>
        <span>
          <GlobalOutlined style={{ fontSize: "20px" }} />
        </span>
        <span className={`${styles.selecttext} bodyr`}>Please Select</span>
      </div>
    </div>
  );
};
