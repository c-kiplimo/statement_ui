import React, { Fragment, useEffect, useMemo, useState } from "react";
import styles from "./user-profile.module.css";
import SearchBar from "@/src/components/widgets/user-management/shared-features/search-bar/table-search-bar";
import { Modal, Table } from "antd";
import classNames from "classnames";
import { useTokens } from "@/src/app/(context)/ColorContext";
import { GroupHandler } from "@/src/services/usermanagement/user.goups.service";
import useProfileId from "@/src/hooks/profileId";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { deleteIcon, editIcon } from "@/src/components/atoms/svg/document_svg";
import { useRouter, useSearchParams } from "next/navigation";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import { profileDetails } from "@/src/types/user.type";
import ProfileDetails from "@/src/components/widgets/user-management/shared-features/user-details/user-details";
import { loggedInProfileDetails } from "@/src/lib/get.profileinfo.action";

const UserProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { fetchUserByUserId } = UserHandler();
  const [userDetails, setUserDetails] = useState<profileDetails | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetchUserByUserId(userId as string);
          setUserDetails(response);
          const profileResponse = await loggedInProfileDetails(parseInt(userId));
          setCustomerId(profileResponse.customerId!);
          console.log(response);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [userId]);

  const getLastLoginTime = useMemo(() => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <ProfileDetails
            userName={`${userDetails.firstName} ${userDetails.lastName}`}
            email={userDetails.email}
            town={"Kampala Uganda"}
            timezone={`GMT ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
            icon={undefined}
            lastSeenTime={`Last login on ${getLastLoginTime}`}
            status={"Active"}
          />
        </div>
      </div>
      <SearchBar />
       {customerId && <UserProfile.DisplayTable customerId={customerId} />}
    </div>
  );
};

export default UserProfile;

type tableProps ={
  customerId:number;
}
UserProfile.DisplayTable = ({customerId}:tableProps) => {
  const token = useTokens();
  const [data, setData] = useState<UserGroup[]>([]);
  const { fetchUserGroups } = GroupHandler();
  const profId = useProfileId();

  useEffect(() => {
    const fetchGroupData = async () => {
      if (customerId !== null && customerId !== undefined) {
        try {
          const response = await fetchUserGroups(customerId); 
          setData(response);
          console.log("Table Data", response);
        } catch (error) {
          console.error("Failed to fetch user groups:", error);
        }
      }
    };

    fetchGroupData();
  }, [customerId]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<UserGroup | null>(null);
  const [hoveredButton, setHoveredButton] = useState<
    "confirm" | "cancel" | null
  >(null);

  const handleMouseEnter = (buttonType: "confirm" | "cancel") => {
    setHoveredButton(buttonType);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleDelete = (record: UserGroup) => {
    setCurrentRecord(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteOk = () => {
    setDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteModalVisible(false);
  };

  const columns: ColumnsType<UserGroup> = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        moment(createdAt).format("DD-MM-YYYY HH:MM"),
    },
    {
      title: "Joined On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "",
      key: "actions",
      render: (record: UserGroup) => (
        <div className={styles.actionBtn}>
          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            icon={editIcon}
            customStyles={{
              background: token.default.white,
              color: token.default.grey,
            }}
            onClick={() => {}}
          />
          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            icon={deleteIcon}
            customStyles={{
              background: token.default.white,
            }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <div className={styles.table}>
        <Table
          pagination={{
            pageSize: 10,
            itemRender: (current, type, originalElement) => {
              if (type === "page") {
                return <span style={{ margin: "0 8px" }}>{current}</span>;
              }
              return originalElement;
            },
            style: {
              display: "flex",
              textAlign: "center",
            },
          }}
          style={{ marginTop: "15px", width: "100%" }}
          columns={columns}
          dataSource={data}
        />
      </div>

      <Modal
        className={styles.modal}
        footer={null}
        visible={deleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleCancel}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalDesc}>
            <div className={styles.textField}>
              <span className={`${styles.title} h6m`}>Remove Group</span>
              <span className={`${styles.titleDesc} bodyr`}>
                Are you sure you want to delete this group?
              </span>
            </div>
          </div>
          <div className={styles.button}>
            <button
              className={classNames(styles.btn, {
                [styles.activeBtn]: hoveredButton === "cancel",
              })}
              onMouseEnter={() => handleMouseEnter("cancel")}
              onMouseLeave={handleMouseLeave}
              onClick={handleCancel}
            >
              No
            </button>
            <button
              className={classNames(styles.btn, {
                [styles.activeBtn]: hoveredButton === "confirm",
              })}
              onMouseEnter={() => handleMouseEnter("confirm")}
              onMouseLeave={handleMouseLeave}
              onClick={handleDeleteOk}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
