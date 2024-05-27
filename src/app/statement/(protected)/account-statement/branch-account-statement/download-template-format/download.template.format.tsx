import React, { ReactNode } from "react";
import styles from "./download.template.format.module.css";
import ImageIcon from "@/src/components/atoms/imageIcon/imageIcon";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import HorizontalInfoDescription from "@/src/components/atoms/text/horizontal-info-description";
import BranchTransactionsHistory from "../transactions-history-table/transaction.history.table";

const data = [
  {
    key: 1,
    valuedate: " 02/02/2023",
    transferRef: "FT102QF66788",
    paymentDetails: "Monthly sales",
    moneyIn: "2,500,000",
    moneyOut: "",
    balance: "16,000,000",
  },
  {
    key: 2,
    valuedate: " 02/02/2023",
    transferRef: "FT102T667ZRX",
    paymentDetails: "Electricity",
    moneyIn: "",
    moneyOut: "1,000,000",
    balance: "15,000,000",
  },
  {
    key: 3,
    valuedate: " 02/02/2023",
    transferRef: "FT102245LOP89",
    paymentDetails: "Mobi AT-DPC",
    moneyIn: "4,500,450",
    moneyOut: "",
    balance: "16,500,400",
  },
];
const DownloadTemplate = () => {
  return (
    <div className={styles.container}>
      <div>
        <DownloadTemplate.Header
          logo={<img src="/kcblogo.svg" />}
          name="KCB BANK KENYA LTD"
          branch="KCB MOI AVENUE BRANCH -4001"
          address="P.O BOX 24536, NAIROBI"
        />
      </div>
      <div>
        <DownloadTemplate.AccountDescription
          owner="MERAKI SYSTEMS"
          owneraddress="P O BOX 1235"
          addresslocation="NAIROBI, KENYA"
          contractname="Contract Name:"
          contractnamevalue="MERAKI Morgage ACCOUNT"
          contracttype="Contract Type:"
          contracttypevalue="Commercial Loan"
          contractnumber="Contract Number:"
          contractnumbervalue=" 121414246"
          statementperiod="Statement Period :"
          statementperiodvalue="2016-08-01 - 2023-01-10"
        />
      </div>
      <div>
        <VerticalInfoDescription title={"2023-05-08 08:30:00"} />
      </div>
      <div>
        <BranchTransactionsHistory data={data} />
      </div>
      <div className={styles.footer}>
        <img src="/footer.svg" />
      </div>
    </div>
  );
};

export default DownloadTemplate;

type HeaderProps = {
  logo: ReactNode;
  name: string;
  branch: string;
  address: string;
};

DownloadTemplate.Header = (props: HeaderProps) => (
  <div className={styles.headeritem}>
    <div className={styles.headimage}>
      <ImageIcon icon={props.logo} />
    </div>
    <div className={styles.headtext}>
      <VerticalInfoDescription title={props.name} />
      <VerticalInfoDescription title={props.branch} />
      <VerticalInfoDescription title={props.address} />
    </div>
  </div>
);

type AccountDescriptionProps = {
  owner: string;
  owneraddress: string;
  addresslocation: string;
  contractnumber: string;
  contractname: string;
  contracttype: string;
  statementperiod: string;
  contractnumbervalue: string;
  contractnamevalue: string;
  contracttypevalue: string;
  statementperiodvalue: string;
};

DownloadTemplate.AccountDescription = (props: AccountDescriptionProps) => (
  <div className={styles.accountsdata}>
    <div className={styles.accountowner}>
      <VerticalInfoDescription title={props.owner} />
      <VerticalInfoDescription title={props.owneraddress} />
      <VerticalInfoDescription title={props.addresslocation} />
    </div>
    <div className={styles.accountdescription}>
      <HorizontalInfoDescription
        title={props.contractnumber}
        description={props.contractnumbervalue}
      />
      <HorizontalInfoDescription
        title={props.contractname}
        description={props.contractnamevalue}
      />
      <HorizontalInfoDescription
        title={props.contracttype}
        description={props.contracttypevalue}
      />
      <HorizontalInfoDescription
        title={props.statementperiod}
        description={props.statementperiodvalue}
      />
    </div>
  </div>
);
