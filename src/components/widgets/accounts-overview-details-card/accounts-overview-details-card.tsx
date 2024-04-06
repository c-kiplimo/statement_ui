import React, { CSSProperties, ReactNode, useState } from "react";
import styles from "./accounts-overview-details-card.module.css";
import ImageIcon from "../../atoms/imageIcon/imageIcon";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import AcctTable from "../../atoms/table/acctsummarytable";

interface AccountDetail {
  key: number;
  accountName: string;
  accountNumber: string;
  currentBalance: string;
}

interface AccountsDetailsProps {
  svgIcon: ReactNode;
  accountTitle: string;
  amount: string;
  onclick?: (event: any) => void;
  svgIconStyle?: CSSProperties;
  data: AccountDetail[];
}

function AccountsOverviewDetailsCard(props: AccountsDetailsProps) {
  const [isVisible, setVisible] = useState(false);

  function handleclick() {
    setVisible(!isVisible);
  }

  return (
    <div className={styles.container} onClick={props.onclick}>
      <div className={styles.accountTitle}>
        <div className={styles.accountsContainer}>
          <div className={styles.icon}>
            <ImageIcon icon={props.svgIcon} iconStyle={{}} />
          </div>
          <div className={styles.verticaltext}>
            <VerticalInfoDescription
              titleStyle={{ color: "#6F7269", margin: "2px" }}
              descriptionStyle={{
                fontWeight: "700",
                color: "#151E00",
                fontSize: "16px",
              }}
              title={props.accountTitle}
              description={props.amount}
            />
          </div>
        </div>
        <div>
          {isVisible ? (
            <CaretUpOutlined
              onClick={handleclick}
              style={{ color: "#6F7269" }}
            />
          ) : (
            <CaretDownOutlined
              onClick={handleclick}
              style={{ color: "#6F7269" }}
            />
          )}
        </div>
      </div>

      <div
        className={`${isVisible ? styles.show : styles.hidden} ${styles.table} ${styles.table}`}
      >
        <AcctTable data={props.data} />
      </div>
    </div>
  );
}

export default AccountsOverviewDetailsCard;
