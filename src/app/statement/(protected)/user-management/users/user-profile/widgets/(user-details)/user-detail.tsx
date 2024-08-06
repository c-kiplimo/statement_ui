import React, { useEffect, useState } from "react";
import styles from "./user-details.module.css";
import CorporateInfo from "@/src/components/widgets/corporate-info/corporate-info";
import { InfoCircleFilled } from "@ant-design/icons";
import UserInfo from "@/src/components/widgets/user-info/user-info";
import Image from "next/image";
import { Spin, Alert } from "antd";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import { profileDetails } from "@/src/types/user.type";

type UserDetailsProps = {
  userId: string;
};

const UserDetails = ({ userId }: UserDetailsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchUserByUserId } = UserHandler();
  const [userDetails, setUserDetails] = useState<profileDetails | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          setLoading(true)
          const response = await fetchUserByUserId(userId);
          setUserDetails(response);
          setLoading(false)
          console.log(response);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12 text-2xl font-extrabold">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {userDetails && (
        <CorporateInfo>
          <CorporateInfo.Header>
            <CorporateInfo.UserIcon>
              <Image
                src="/UsersGroup.svg"
                alt="user-icon"
                width={16}
                height={16}
              />
            </CorporateInfo.UserIcon>
            <CorporateInfo.UserDetails
              userName={`${userDetails?.firstName} ${userDetails?.lastName}`}
              userId={userDetails?.username!}
              userType={"(Date Created)"}
            />
            {/* <CorporateInfo.Status customerStatus={profile.status} /> */}
          </CorporateInfo.Header>
          <CorporateInfo.Description>
            <div className={styles.separator}>
              <UserInfo>
                <UserInfo.Title title="Country">
                  <InfoCircleFilled />
                </UserInfo.Title>
                <UserInfo.Description
                  title={userDetails.language!}
                  // description={profile.branch}
                />
              </UserInfo>
            </div>
            <div className={styles.separator}>
              <UserInfo>
                <UserInfo.Title title="Email">
                  <InfoCircleFilled />
                </UserInfo.Title>
                <UserInfo.Description title={userDetails.email} />
              </UserInfo>
            </div>
            <UserInfo>
              <UserInfo.Title title="Mobile Number">
                <InfoCircleFilled />
              </UserInfo.Title>
              <UserInfo.Description title={userDetails.mobileNumber} />
            </UserInfo>
          </CorporateInfo.Description>
        </CorporateInfo>
      )}
    </div>
  );
};

export default UserDetails;
