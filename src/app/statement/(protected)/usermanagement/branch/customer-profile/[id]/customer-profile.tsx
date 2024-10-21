import React, { Fragment, useEffect, useState } from "react";
import styles from "./customer-profile.module.css";
import GroupDetails from "@/src/components/widgets/user-management/tabs/user-group/group-details/group-details";
import { profileDetails } from "@/src/lib/actions/customer.profile.action";
import UserGroupBranch from "../../widgets/tabs/user-group/user-group-branch";
import CreateRole from "../../../page-components/create-roles/create-stepper/create-stepper";
import BranchUsersTable from "../../widgets/users-table/users.table";
import TabNavigations from "../../widgets/shared/tab-navigations/tab-navigations";

type UserProfileProps = {
  customerId?: number;
};

type TabItem = {
  buttonName: string;
  bodyContent: React.ReactNode;
};

export type Profile = {
  userName: string;
  userId: number;
  userType: string;
  country: string;
  branch: string;
  email: string;
  phoneNumber: string;
  status: string;
};

const CustomerProfile = ({ customerId }: UserProfileProps) => {
  const [profile, setProfile] = useState<CompanyProfile| null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUserGroup, setActiveUserGroup] = useState(false);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      console.log(customerId);
      if (!customerId) {
        setError("User ID is not provided");
        setLoading(false);
        return;
      }

      try {
        const profileData = await profileDetails(customerId.toString());
        setProfile(null);
      } catch (err) {
        setError("Failed to fetch profile details");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, [customerId]);

  const tabItems: TabItem[] = [
    {
      buttonName: "Users",
      bodyContent: <BranchUsersTable customerId={customerId!} key="users" />,
    },
    {
      buttonName: "User Groups",
      bodyContent: (
        <Fragment>
          {activeUserGroup ? (
            <CreateRole />
          ) : (
            <UserGroupBranch
              customerId={customerId!.toString()}
              setActive={setActiveUserGroup}
              key="userGroups"
            />
          )}
        </Fragment>
      ),
    },
    {
      buttonName: "Permissions",
      bodyContent: <></>,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.groupDetails}>
          <GroupDetails
            userName={profile?.userName!}
            userId={profile?.userId!.toString()!}
            userType={profile?.userType!}
            country={profile?.country!}
            town={profile?.branch!}
            email={profile?.email!}
            mobileNumber={profile?.phoneNumber!} customerStatus={""}          />
        </div>
      </div>
      <div className={styles.tabs}>
      <TabNavigations tabItems={tabItems} />
      </div>
    </div>
  );
};
export default CustomerProfile;
