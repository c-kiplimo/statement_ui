import React, { Fragment, useEffect, useState } from "react";
import styles from "./customer-profile.module.css";
import GroupDetails from "@/src/components/widgets/user-management/tabs/user-group/group-details/group-details";
import { profileDetails } from "@/src/lib/actions/customer.profile.action";
import RestrictionsOverview from "../../../../accountsetup/customers/accountRestrictions/restrictions.overview";
import ActivitiesStatus from "../../../../accountsetup/activities/activities.status";
import AccountsPage from "../../../../accountsetup/accounts/accounts";
import CustomerUsers from "../../../../accountsetup/users/customer-users/users.status";
import TabNavigations from "@/src/app/statement/(protected)/accountsetup/widgets/acctSetup-navigations-items/tab.navigations";
import UsersBranch from "../../widgets/tabs/users/users";
import UserGroups from "@/src/app/statement/(protected)/accountsetup//users/user-group/user.groups";
import UserGroupBranch from "../../widgets/tabs/user-group/user-group-branch";
import CreateRole from "../../../page-components/create-roles/create-stepper/create-stepper";

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
  const [profile, setProfile] = useState<Profile | null>(null);
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
        setProfile(profileData);
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
      bodyContent: <UsersBranch userId={customerId} key="users" />,
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
            />
          )}
        </Fragment>
      ),
    },
    {
      buttonName: "Permissions",
      bodyContent: <ActivitiesStatus userId={customerId} key="activities" />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.groupDetails}>
        <GroupDetails
          userName={profile?.userName!}
          userId={profile?.userId!.toString()!}
          userType={profile?.userType!}
          country={profile?.country!}
          town={profile?.branch!}
          email={profile?.email!}
          mobileNumber={profile?.phoneNumber!}
          customerStatus={profile?.status!}
        />
      </div>
      <TabNavigations tabItems={tabItems} />
    </div>
  );
};

export default CustomerProfile;
