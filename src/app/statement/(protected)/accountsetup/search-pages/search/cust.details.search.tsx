import React, { useState } from "react";
import styles from "./cust.details.search.module.css";
import { SearchOutlined } from "@ant-design/icons";
import Accountsetup from "@/src/components/widgets/accountsetup-widget/cust.details.search";
import CustdetailsnotFound from "../search-not-found/cust.details.notFound";
import Createdrecord, { DataSearch } from "@/src/components/widgets/account-created-recors-widget/created.record";
import { customerCardDetailsAction } from "@/src/lib/actions/searchAccount.action";


const AccountsetupPage =  () => {
  
  const [data, setData] =useState<DataSearch[]>([])

  async function handleClick() {
    const search: DataSearch[] = await customerCardDetailsAction('CUSTOMER_NUMBER','1');

    setData(search)
  }


  
  return (
    <div className={styles.container}>
      <Accountsetup
        title={"Customer Details Search"}
        instruction={
          "Setup the customer by using account number or customer number"
        }
        option={"Do you want to search by ?"}
        icon={<SearchOutlined />}
        account={"Account Number"} 
        customer={"Customer Number"} 
        onClick={handleClick}
      />

       
       <div>

        {
          data.length > 0 && <Createdrecord data={data} hideicon={<img src="/hide.svg" alt="hide"/>}/>
        }
        
       </div>
    </div>
  );
};

export default AccountsetupPage;
