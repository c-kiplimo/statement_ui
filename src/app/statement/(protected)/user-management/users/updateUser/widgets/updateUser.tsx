import React, { useEffect, useState } from "react";
import styles from "./updateUser.module.css";
import UserDetails from "@/src/components/widgets/users.details/user.details";
import Image from "next/image";
import { Form, Input, Modal, notification, Select } from "antd";
import CustomButton from "@/src/components/atoms/button/customButton";
import Texter from "@/src/components/atoms/text/texter";
import { usePlatformId } from "@/src/hooks/platformId";
import { CheckCircleOutlined, TeamOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ConfirmRegistrationModal from "../../create-user/widgets/(confirmUser)/confirmUser";
import ConfirmFail from "../../../permissions/(confirmfailure)/confirm.failure";
import { updateUserAction } from "@/src/lib/actions/update.User.action";
import { createUserHandler } from "@/src/services/usermanagement/create.user.service";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import { profileDetails } from "@/src/types/user.type";
import { userDetailsAction } from "@/src/lib/actions/user.profile.details.actions";
import CreationSuccess from "../../../permissions/(confirmsuccess)/creation.success";

const countryOptions = [
  { value: "+254", label: "+254" },
  { value: "+256", label: "+256" },
  { value: "+255", label: "+255" },
  { value: "+250", label: "+250" },
];

type UpdateUserProps = {
  userId: string;
};

const UpdateUser = ({ userId }: UpdateUserProps) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const platformId = usePlatformId();
  const [userDetails, setUserDetails] = useState<profileDetails | null>(null);
  const [formData, setFormData] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [retryUpdate, setRetryUpdate] = useState(false);
  const [countryCode, setCountryCode] = useState(countryOptions[0].value);
  const { fetchPlatformGroupService } = createUserHandler();
  const { fetchUserByUserId } = UserHandler();
  const [userGroups, setUserGroups] = useState<any[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedGroupDetails, setSelectedGroupDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const platformGroups = await fetchPlatformGroupService(platformId);
      const user_groups = platformGroups.map((platformGroup) => ({
        id: platformGroup.groupId.toString(),
        name: platformGroup.groupName,
        icon: <TeamOutlined />,
        description: platformGroup.description,
      }));
      console.log("User group list>>", user_groups);
      setUserGroups(user_groups);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch user groups");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          setLoading(true)
          const response = await userDetailsAction(userId);
          setUserDetails(response);
          setLoading(false)
          console.log(response);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [userId, form]);

  const handleGroupChange = (values: string[]) => {
    setSelectedGroups(values);
    const selectedGroupDetails = userGroups.filter(group => values.includes(group.id));
    setSelectedGroupDetails(selectedGroupDetails);
  };

  const onFinish = (values: any) => {
    const fullMobileNumber = `${countryCode}${values.mobileNumber}`;
    const updatedFormData = {
      ...values,
      mobileNumber: fullMobileNumber,
      groupId: selectedGroups.join(","),
      userId,
    };
    setFormData(updatedFormData);
    console.log("Updated user details>>", updatedFormData);
    setOpenModal(true);
  };

  const handleOk = async () => {
    setOpenModal(false);
    if (formData) {
      try {
        await updateUserAction(formData);
        setSuccessModalVisible(true);
        form.resetFields();
        router.push("/statement/user-management");
      } catch (error) {
        console.error("Update failed:", error);
        setFailureModalVisible(true);
      }
    }
  };

  useEffect(() => {
    if (retryUpdate && formData) {
      handleOk();
    }
  }, [retryUpdate]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <UserDetails>
        <UserDetails.Header>
          <UserDetails.ProfileImage>
            <Image
              src="/ProfileImage.svg"
              alt="user-icon"
              width={64}
              height={64}
            />
          </UserDetails.ProfileImage>

          <UserDetails.Content>
            <UserDetails.Profile
              userTitle={`${userDetails?.firstName} ${userDetails?.lastName}`}
              moreInfo={`(${userDetails?.userType})`}
            />
            <UserDetails.ActionBtn>
              <UserDetails.Actions
                onClick={() => {}}
                text="Edit Profile Picture"
                className={`${styles.action} bodyr`}
              />
            </UserDetails.ActionBtn>
          </UserDetails.Content>
          <UserDetails.Status status={userDetails?.status!} />
        </UserDetails.Header>
      </UserDetails>
      <Form style={{ width: "100%" }} layout="vertical" onFinish={onFinish}>
        <div className={styles.form}>
          <div className={styles.header}>
            <Texter text="Update User" className="h5b" />
          </div>
          <div className={styles.formContent}>
            <div className={styles.horizontal}>
              <div className={styles.flexOne}>
                <label htmlFor="firstName" className="bodyr">
                  First Name
                </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter your First Name",
                    },
                  ]}
                  name="firstName"
                >
                  <Input
                    type="text"
                    className={`${styles.horizontalInput} bodyr`}
                    placeholder="First Name"
                  />
                </Form.Item>
              </div>
              <div className={styles.flexOne}>
                <label htmlFor="lastName" className="bodyr">
                  Last Name
                </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Last Name",
                    },
                  ]}
                  name="lastName"
                >
                  <Input
                    type="text"
                    className={`${styles.horizontalInput} bodyr`}
                    placeholder="Last Name"
                  />
                </Form.Item>
              </div>
            </div>
            <div className={styles.vertical}>
              <label htmlFor="email" className="bodyr">
                Email Address
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter your Email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid Email address",
                  },
                ]}
                name="email"
              >
                <Input
                  type="email"
                  className={`${styles.emailInput} bodyr`}
                  placeholder="janedoe@gmail.com"
                />
              </Form.Item>
            </div>

            <div className={styles.vertical}>
              <Form.Item
                name="mobileNumber"
                label="Phone Number"
                className="bodyr"
              >
                <div className={`${styles.selectorRow} bodyr`}>
                  <Select
                    value={countryCode}
                    onChange={setCountryCode}
                    style={{ width: 90, height: 40 }}
                  >
                    {countryOptions.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                  <span className={`${styles.divider} h4r`}>/</span>
                  <Input
                    name="mobileNumber"
                    className={`${styles.selectorInput} bodyr`}
                    type="text"
                    placeholder="780000000"
                  />
                </div>
              </Form.Item>
            </div>

            <div className={styles.vertical}>
              <Form.Item
                name="groupId"
                label="Which group does the user belong to?"
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  className={styles.dropDown}
                  placeholder="Select User Group"
                  onChange={handleGroupChange}
                  options={userGroups.map((group) => ({
                    value: group.id,
                    label: group.name,
                  }))}
                />
                {error && <p className="captionr">{error}</p>}
              </Form.Item>
            </div>
          </div>
        </div>
        <Form.Item>
          <CustomButton
            bgColor="var(--brand-brand-primary)"
            type="submit"
            className={styles.button}
            text="Update User"
          />
        </Form.Item>
      </Form>
      <Modal
        open={openModal}
        onCancel={handleCancel}
        footer={false}
        className={styles.modal}
        width={690}
      >
        {formData && (
          <ConfirmRegistrationModal
            onCancel={handleCancel}
            firstName={formData.firstName}
            lastName={formData.lastName}
            email={formData.email}
            mobileNumber={formData.mobileNumber}
            userGroups={selectedGroupDetails}
            handleOk={handleOk}
          />
        )}
      </Modal>
      <Modal
        open={successModalVisible}
        onCancel={() => setSuccessModalVisible(false)}
        footer={null}
        className={styles.modal}
        width={350}
      >
        <CreationSuccess
          title="User Deactivation Successful"
          description="The user has been successfully deactivated. Their account will be permanently deleted after 30 days. During this period, the account can be reactivated if needed."
          onClick={() => setSuccessModalVisible(false)}
        />
        </Modal>
      <Modal
        open={failureModalVisible}
        onCancel={() => setFailureModalVisible(false)}
        footer={null}
        className={styles.modal}
        width={350}
      >
        <ConfirmFail
          title="User Update Failed"
          description={`There was an error while trying to update the user's information. Please try again`}
          onClick={() => setRetryUpdate(true)}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default UpdateUser;
