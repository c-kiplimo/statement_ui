import React from "react";
import styles from "./select.report.format.module.css";
import { GlobalOutlined } from "@ant-design/icons";
import CustomSearchInput from "@/src/components/atoms/input/custom-search-input";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { DownloadDefaultTemplate } from "@/src/services/account/account";
import { notification } from "antd";

interface SelectReportFormatProps {
  itemId?: number;
  onCancel?:()=>void
}

const SelectReportFormat = ({ itemId, onCancel }: SelectReportFormatProps) => {
  const data = [
    {
      id: 1,
      image: <img src="/corporate.svg" />,
      name: "Corporate",
      description: "Description Text",
      onClick: () => {
        console.log("corporate option clicked");
      },
    },
    {
      id: 2,
      image: <img src="/retail.svg" />,
      name: "Retail",
      description: "Description Text",
      onClick: () => {
        console.log("Retail option clicked");
      },
    },
    {
      id: 3,
      image: <img src="/safaricom.svg" />,
      name: "Safaricom",
      description: "Description Text",
      onClick: () => {
        console.log("safaricom option clicked");
      },
    },

    {
      id: 4,
      image: <img src="/default.svg" />,
      name: "Default",
      description: "Description Text",
      onClick: () => {
        async function Downloaddata() {
          try {
            if (itemId != null) {
              const downloadData = await DownloadDefaultTemplate(itemId);
              const blob = new Blob([downloadData], {
                type: "application/pdf",
              });
              const url = window.URL.createObjectURL(blob);
              window.open(url);
              onCancel!();
            } else {
              throw new Error("itemId is not defined");
            }
          } catch (error) {

              notification.error({
                message: 'Error',
                description: `An error occurred: ${error}`,
              });
            
            // throw error;
          }
        }
        Downloaddata();
      },
    },
  ];

  const handleItemClick = (onClick: () => void) => {
    onClick();
  };
  return (
    <div className={styles.container}>
      {/* {itemId} */}
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
        <div
          className={styles.optionvaluesData}
          key={items.id}
          onClick={() => handleItemClick(items.onClick!)}
        >
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
