import React from "react";
import styles from "./restriction.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import CustomSearchInput from "@/src/components/atoms/input/custom-search-input";
import AddItem from "@/src/components/atoms/add-item/add.item";
import { PlusOutlined } from "@ant-design/icons";

const RestrictionPage = () => {
  return (
    <div className={styles.container}>
      <LastLogin
        userName={"Meraki System Tech"}
        // mail={"Banking Industry"}
        town={"Kampala Uganda"}
        timezone={"( GMT -11:46) Greenwich mean Time zone"}
        icon={<img src="/teamusericon.png" alt="teamusericon" />}
        lastSeenTime={"Last login on 45 minutes ago"} industry={"Banking Industry"} customerType={""}        // button1={"Accounts"}
        // button2={"Users"}
        // button3={"Activity"}
        // button4={"Restrictions"} 
        // titleDescription={""}      
        />

      <div className={styles.addRestrictiondiv}>
        <div className={styles.searchDiv}>
          <CustomSearchInput
            placeholder="Search"
            inputStle={{ outline: "none", color: "gray", width: "359px" }}
            iconStyles={{ color: "gray" }}
          />
          <AddItem
            title={"Add Restrictions"}
            icon={<PlusOutlined />}
            iconStyle={{ color: "blue" }}
            titleStyle={{ color: "blue" }}
          />
        </div>
        <div className={styles.missingRecords}>
          NO RESTRICTION CONFIGURED FOR THIS CUSTOMER
        </div>
      </div>
    </div>
  );
};

export default RestrictionPage;
