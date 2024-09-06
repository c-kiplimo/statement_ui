import React, { useState } from "react";
import styles from "./select.report.format.module.css";
import { GlobalOutlined } from "@ant-design/icons";
import CustomSearchInput from "@/src/components/atoms/input/custom-search-input";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { DownloadBranchStatement } from "@/src/services/account/account";
import { notification } from "antd";
import { AxiosError } from "axios";
import Image from "next/image";

interface SelectReportFormatProps {
  itemId?: number;
  accountName:string;
  onCancel:()=>void
}

const SelectReportFormat = ({ itemId,accountName, onCancel }: SelectReportFormatProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const data = [
    {
      id: 1,
      image: <Image src="/excel.svg" alt="excell format" height={24} width={32}/>,
      name: "EXCEL",
      description: "EXCEL Format",

      onClick: () => {
        async function Downloaddata() {
          try {
            if (itemId != null) {
              const downloadData = await DownloadBranchStatement(itemId,"EXCEL"); 
              const blob = new Blob([downloadData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${accountName}.xlsx`; 
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
              onCancel();
            } else {
              throw new Error("itemId is not defined");
            }
          } catch (error) {
            if (error instanceof AxiosError) {
              if (error.response && error.response.status === 500) {
                notification.error({
                  message: 'Internal Server Error!',
                  description: 'Please Consult the Support Team',
                });
              } else if (error.message === 'Network Error') {
                notification.error({
                  message: 'Network Error!',
                  description: 'Please Check Your Internet Connection',
                });
              } else {
                notification.error({
                  message: 'Error',
                  description: `An error occurred: ${error.message}`,
                });
              }
            } else {
              notification.error({
                message: 'Unknown Error',
                description: 'An unknown error occurred',
              });
            }
          }
        }
        Downloaddata();
      },
      
    },

    {
      id: 2,
      image: <Image src="/pdf.svg" alt="excell format" height={24} width={32}/>,
      name: "PDF",
      description: "PDF Format",
      onClick: () => {
        async function Downloaddata() {
          try {
            if (itemId != null) {
              const downloadData = await DownloadBranchStatement(itemId,"PDF"); 
              const blob = new Blob([downloadData], {
                type: "application/pdf",
              });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${accountName}.pdf`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
              onCancel();
            } else {
              throw new Error("itemId is not defined");
            }
          } catch (error) {
            if (error instanceof AxiosError) {
              if (error.response && error.response.status === 500) {
                notification.error({
                  message: 'Internal Server Error!',
                  description: 'Please Consult the Support Team',
                });
              } else if (error.message === 'Network Error') {
                notification.error({
                  message: 'Network Error!',
                  description: 'Please Check Your Internet Connection',
                });
              } else {
                notification.error({
                  message: 'Error',
                  description: `An error occurred: ${error.message}`,
                });
              }
            } else {
              notification.error({
                message: 'Unknown Error',
                description: 'An unknown error occurred',
              });
            }
            
            }
        }
        Downloaddata();
      },
    },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (onClick: () => void) => {
    onClick();
  };
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredData.map((items) => (
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
