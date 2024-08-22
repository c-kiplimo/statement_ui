import React, { useEffect, useState } from "react";
import styles from "./create-user.module.css";
import { Form, Input, Modal, notification, Select } from "antd";
import CustomButton from "@/src/components/atoms/button/customButton";
import Texter from "@/src/components/atoms/text/texter";
import { TeamOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { AUTH_URL_REGISTER } from "@/src/constants/environment";
import ConfirmRegistrationModal from "./(confirmUser)/confirmUser";
import { createUserHandler } from "@/src/services/usermanagement/create.user.service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useProfileId from "@/src/hooks/profileId";
import FailureModal from "@/src/components/widgets/failure-widget/failure";

const countryOptions = [
  { value: "+254", label: "+254" },
  { value: "+256", label: "+256" },
  { value: "+255", label: "+255" },
  { value: "+250", label: "+250" },
];

type CreateUserProps = {
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  groupId: string;
  customerId:string;
};

const CreateUser = () => {
  const profId = useProfileId();
  const [form] = Form.useForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { createUserService, fetchPlatformGroupService } = createUserHandler();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<CreateUserProps | null>(null);
  const [countryCode, setCountryCode] = useState(countryOptions[0].value);
  const [userGroups, setUserGroups] = useState<User_Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<User_Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(false);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const platformGroups = await fetchPlatformGroupService(1);
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

  const handleGroupChange = (value: string) => {
    const group = userGroups.find((group) => group.id === value) || null;
    setSelectedGroup(group);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = (values: CreateUserProps) => {
    let customerId = "";

  if (profId !== null && profId !== undefined) {
    customerId = profId.toString();
  }
    console.log(customerId)
    const fullMobileNumber = `${countryCode}${values.mobileNumber}`;
    const updatedFormData = {
      ...values,
      mobileNumber: fullMobileNumber,
      groupId: selectedGroup?.id || "",
      customerId,
    };
    setFormData(updatedFormData);
    console.log("Registered user data>>", updatedFormData);
    setOpen(true);
  };

  const handleOk = async () => {
    setOpen(false);
    if (formData) {
      console.log(formData);
      try {
        const response = await createUserService(AUTH_URL_REGISTER, {
          register: formData,
        });
        console.log("User registered successfully", response);
        notification.success({
          message: `User has been created successfully`,
          description: '',
          icon: <CheckCircleOutlined style={{ color: "white" }} />,
          className: 'bodyr success-notification',
          style:{color: "white"},
          placement: 'topRight',
          duration: 1,
        });
        form.resetFields();
        router.push("/statement/user-management");
      } catch (error) {
        console.error("Registration failed:", error);
        setOpenModal(true);
      }
    }
  };  

  const handleCancel = () => {
    setOpen(false);
  };

  const handleTryAgain = () => {
    console.log("Button clicked")
    setOpenModal(false);
      if (formData) {
        handleOk();
      }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <Form
        form={form}
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className={styles.form}>
          <div className={styles.header}>
            <Texter text="Register User" className="h5b" />
          </div>
          <div className={styles.formContent}>
            <div className={styles.horizontal}>
              <div className={styles.flexOne}>
                <label htmlFor="firstName" className="bodyr">
                  First Name
                </label>
                <Form.Item
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your First Name" },
                  ]}
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
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your Last Name" },
                  ]}
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
                    className={`${styles.selectionStandard} captionr`}
                    style={{ width: 100, height: 40 ,border: '0.5px solid #979992',borderRadius: '4px'}}
                    value={countryCode}
                    onChange={(value) => setCountryCode(value)}
                  >
                    {countryOptions.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option >
                    ))}
                  </Select>
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
              <label htmlFor="password" className="bodyr">
                Password
              </label>
              <Form.Item name="password">
                <Input
                  className={`${styles.input} bodyr`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  suffix={
                    <span
                      onClick={togglePasswordVisibility}
                      className={styles.passwordToggleIcon}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible
                          style={{ color: "#c9c9cc" }}
                          size={16}
                        />
                      ) : (
                        <AiOutlineEye style={{ color: "#c9c9cc" }} size={16} />
                      )}
                    </span>
                  }
                />
              </Form.Item>
            </div>
            <div className={styles.vertical}>
              <Form.Item
                name="groupId"
                label="Which group does the user belong to?"
              >
                <Select
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
            text="Create User"
          />
        </Form.Item>
      </Form>
      <Modal
        open={open}
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
            userGroups={selectedGroup ? [selectedGroup] : []}
            handleOk={handleOk}
          />
        )}
      </Modal>
      <Modal
        open={openModal}
        width={"max-content"}
        className={styles.modal}
        onCancel={handleModalClose}
        footer={null}
      >
        <FailureModal
          onCancelClick={handleModalClose}
          onTryAgainClick={handleTryAgain}
        >
          <FailureModal.Icon>
            <img src={"/warning.svg"} width={56} height={56} alt="warning" />
          </FailureModal.Icon>
          <FailureModal.title title="Error Creating New User" />
          <FailureModal.description description={`Unable to create user ${formData?.firstName} ${formData?.lastName}. The username already exists! Please try again.`} />
        </FailureModal>
      </Modal>
    </div>
  );
};

export default CreateUser;
