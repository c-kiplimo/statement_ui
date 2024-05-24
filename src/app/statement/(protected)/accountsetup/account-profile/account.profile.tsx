"use client";
import React, { useEffect, useState } from "react";
import styles from "./account.profile.module.css";
import AccountProfilePage from "@/src/components/widgets/userStatus/account.profile/account.profile";
import { AccountsProfile } from "@/src/lib/actions/accountprofile.action";

export type profilesTypeprops = {
  accountTitle: string;
  currency: string;
  accountId: number;
};

type accoutprofileType = {
  accountId?: number;
};

const UserAccountprofile = (props: accoutprofileType) => {

  const [accountprofdata, setaccountprofdata] = useState<profilesTypeprops>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountprofdata = await AccountsProfile(props.accountId!);
        setaccountprofdata(accountprofdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(accountprofdata);

  return (
    <div className={styles.container}>
      <AccountProfilePage
        icon={<img src="/teamusericon.png" alt="teamusericon" />}
        lastSeenTime={"Last login on 45 minutes ago"}
        accountId={0}
        accountName={""}
        numberOfusers={""}
        currency={""}
      />
    </div>
  );
};

export default UserAccountprofile;
