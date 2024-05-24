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



const passedAccid = sessionStorage.getItem("passedaccountId")
console.log(passedAccid);

const UserAccountprofile = (props: accoutprofileType) => {

  const [profile, setProfile] = useState<profilesTypeprops | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  

  useEffect(() => {
    setSelectedAccount(selectedAccount);
    const fetchData =  async () => {
      try {
        let accountprof = await AccountsProfile(parseInt(passedAccid!));


        setProfile(accountprof);
      } catch (error) {
        console.error('Failed to fetch profile details', error);
      }
      
    };

    fetchData();
  }, []);

  console.log(profile);
  


  return (
    <div className={styles.container}>
    
      <AccountProfilePage
        icon={<img src="/teamusericon.png" alt="teamusericon" />}
        lastSeenTime={"Last login on 45 minutes ago"}
        accountId={profile?.accountId!}
        accountName={profile?.accountTitle!}
        numberOfusers={"(12users)"}
        currency={profile?.currency!}
      />
    </div>
  );
};

export default UserAccountprofile;
