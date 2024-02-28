import React, { useEffect, useState } from "react";
import { Table, Tag, Typography } from "antd";
import moment from "moment";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { userDetails } from "@/src/services/auth-user-details";
import { AccountBookOutlined } from "@ant-design/icons";
import CustomerSetupActivitySearchBar from "../../account-setup-activity/customer-setup-activity-search-bar";
import { ProfileHandler } from "@/src/services/userprofile/profile.service";

const { Text } = Typography;

const Activities = () => {
  const token = useTokens();
  const font = useFont();

  const [profileData, setProfileData] = useState<any>(null);
  const user_details = userDetails();
  const firstName = user_details?.firstName;
  const userId = firstName;

  useEffect(() => {
    const fetchData = async () => {
      const { profileService, profileDataService } = await ProfileHandler();
      const response = await profileService(userId);
      const profileId = response.payload[0]?.profileId;
      //const profileData = await profileDataService(profileId);
      //console.log(profileData);
      //setProfileData(profileData);
    };

    fetchData();
  }, []);

  interface DataType {
    key: React.Key;
    name: string;
    date: number;
    account: string;
    description: string;
    status: string;
  }

  const columns = [
    {
      title: <>Type</>,
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Text>
          {" "}
          <AccountBookOutlined /> {text}
        </Text>
      ),
      sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
    },
    {
      title: <>Date</>,
      dataIndex: "date",
      key: "date",
      render: (text: number) => (
        <Text>{moment(text).format("MMMM DD, YYYY h:mm a")}</Text>
      ),
      sorter: (a: DataType, b: DataType) => a.date - b.date,
    },
    {
      title: <>Account</>,
      dataIndex: "account",
      key: "account",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: <>Description</>,
      dataIndex: "description",
      key: "description",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: <>Status</>,
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <Tag color={text === "Active" ? "green" : "red"}>{text}</Tag>
      ),
      sorter: (a: DataType, b: DataType) => a.status.localeCompare(b.status),
    },
  ];

  const data: DataType[] =
    profileData?.activities.map((activity: any) => ({
      key: activity.activityId,
      name: activity.name,
      date: activity.date,
      account: activity.customerId,
      description: activity.description,
      status: activity.status,
    })) || [];

  return (
    <div style={{ width: "100%" }}>
      {/* <CustomerSetupActivitySearchBar /> */}
      <Table
        style={{ width: "100%" }}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
};

export default Activities;
