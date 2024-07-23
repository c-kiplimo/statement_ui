import React, { useEffect, useState } from "react";
import styles from "./company-info.module.css";
import CorporateInfo from "@/src/components/widgets/corporate-info/corporate-info";
import { profileDetails } from "@/src/lib/actions/customer.profile.action";
import { InfoCircleFilled } from "@ant-design/icons";
import UserInfo from "@/src/components/widgets/user-info/user-info";
import Image from "next/image";
import { Spin, Alert } from "antd";

type CompanyInfoProps = {
  customerId: number;
};

const CompanyInfo = ({ customerId }: CompanyInfoProps) => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      console.log(customerId);
      if (!customerId) {
        setError("Customer Id is not provided");
        setLoading(false);
        return;
      }

      try {
        const profileData = await profileDetails(customerId.toString());
        setProfile(profileData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch profile details");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, [customerId]);

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
      {profile && (
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
              userName={profile.userName}
              userId={profile.userId.toString()}
              userType={profile.userType}
            />
            <CorporateInfo.Status customerStatus={profile.status} />
          </CorporateInfo.Header>
          <CorporateInfo.Description>
            <div className={styles.separator}>
              <UserInfo>
                <UserInfo.Title title="Country">
                  <InfoCircleFilled />
                </UserInfo.Title>
                <UserInfo.Description
                  title={profile.country}
                  description={profile.branch}
                />
              </UserInfo>
            </div>
            <div className={styles.separator}>
              <UserInfo>
                <UserInfo.Title title="Email">
                  <InfoCircleFilled />
                </UserInfo.Title>
                <UserInfo.Description title={profile.email} />
              </UserInfo>
            </div>
            <UserInfo>
              <UserInfo.Title title="Mobile Number">
                <InfoCircleFilled />
              </UserInfo.Title>
              <UserInfo.Description title={profile.phoneNumber} />
            </UserInfo>
          </CorporateInfo.Description>
        </CorporateInfo>
      )}
    </div>
  );
};

export default CompanyInfo;
