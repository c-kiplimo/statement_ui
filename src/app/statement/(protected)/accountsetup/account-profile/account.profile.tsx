import React, { useEffect, useState } from "react";
import styles from "./account.profile.module.css";
import AccountProfilePage from "@/src/components/widgets/userStatus/account.profile/account.profile";
import { AccountsProfile } from "@/src/lib/actions/accountprofile.action";
import { Spin } from "antd";

export type profilesTypeprops = {
  accountTitle: string;
  currency: string;
  accountId: number;
};

type AccountProfileType = {
  accountId?: number;
};

const UserAccountprofile: React.FC<AccountProfileType> = () => {
  const [profile, setProfile] = useState<profilesTypeprops | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const passedAccid = sessionStorage.getItem("passedaccountId");
    if (!passedAccid) return;

    const fetchData = async () => {
      try {
        const accountProf = await AccountsProfile(parseInt(passedAccid));
        setProfile(accountProf);
      } catch (error) {
        console.error("Failed to fetch profile details", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className={styles.container}>
      {profile && (
        <AccountProfilePage
          icon={<img src="/teamusericon.png" alt="teamusericon" />}
          lastSeenTime={"Last login on 45 minutes ago"}
          accountId={profile.accountId}
          accountName={profile.accountTitle}
          numberOfusers={"(12 users)"}
          currency={profile.currency}
        />
      )}
    </div>
  );
};

export default UserAccountprofile;
