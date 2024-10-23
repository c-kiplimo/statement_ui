import React, { useState } from "react";
import styles from "./create-user.module.css";
import { Form, Input, Modal, notification, Select } from "antd";
import CustomButton from "@/src/components/atoms/button/customButton";
import Texter from "@/src/components/atoms/text/texter";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { AUTH_URL_REGISTER } from "@/src/constants/environment";
import ConfirmRegistrationModal from "./(confirmUser)/confirmUser";
import { createUserHandler } from "@/src/services/usermanagement/create.user.service";
import FailureModal from "@/src/components/widgets/failure-widget/failure";
import { customerCardDetailsAction } from "@/src/lib/actions/Account.createdRecords.action";

const { Search } = Input;

const countryOptions = [
  { value: "+254", label: "+254" },
  { value: "+234", label: "+234" },
  { value: "+256", label: "+256" },
  { value: "+255", label: "+255" },
  { value: "+250", label: "+250" },
];

const roleOptions = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "CORPORATE", label: "Corporate" },
  { value: "ADMIN", label: "Admin" },
];

const country = [
  { value: "Kenya", label: "Kenya" },
  { value: "Burundi", label: "Burundi" },
  { value: "Uganda", label: "Uganda" },
  { value: "Tanzania", label: "Tanzania" },
  { value: "Rwanda", label: "Rwanda" },
];

type CreateUserProps = {
  firstName: string;
  lastName: string;
  role: string;
  country: string;
  customerId: number;
  mobileNumber: string;
  email: string;
};

const CreateUser = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [onboardingType, setOnboardingType] = useState("ACCOUNT_NUMBER");
  const [searchValue, setSearchValue] = useState("");
  const [customerId, setCustomerid] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUserService } = createUserHandler();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<CreateUserProps | null>(null);
  const [countryCode, setCountryCode] = useState(countryOptions[0].value);
  const [error, setError] = useState<string | null>(null);

  const handleSearchCustomer = async () => {
    try {
      setLoading(true);
      setError(null);

      const customerData = await customerCardDetailsAction(
        onboardingType,
        searchValue
      );
      if (customerData.length > 0) {
        const foundCustomer = customerData[0];
        setCustomerid(foundCustomer.id?.toString()!);
        notification.success({
          message: `Account details found.`,
          description: `Account under ${foundCustomer.customerName} of ${foundCustomer.id}`,
          icon: <CheckCircleOutlined style={{ color: "white" }} />,
          className: "bodyr success-notification",
          style: { color: "white" },
          placement: "topRight",
          duration: 1,
        });
      } else {
        setError("No customer found with the provided details.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: `Account details not found.`,
        icon: <CloseCircleOutlined style={{ color: "white" }} />,
        className: "bodyr failure-notification",
        style: { color: "white" },
        placement: "topRight",
        duration: 1,
      });
      setError(
        "Error occurred while searching for the customer. Please try again."
      );
    }
  };

  const onFinish = (values: CreateUserProps) => {
    const fullMobileNumber = `${countryCode}${values.mobileNumber}`;
    if (!customerId) {
      notification.error({
        message: "Please search and select a customer first.",
      });
      return;
    }

    const updatedFormData = {
      ...values,
      mobileNumber: fullMobileNumber,
      customerId: Number(customerId),
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
          description: "",
          icon: <CheckCircleOutlined style={{ color: "white" }} />,
          className: "bodyr success-notification",
          style: { color: "white" },
          placement: "topRight",
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
    console.log("Button clicked");
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
              <label htmlFor="search" className="bodyr">
                Search account details by
              </label>
              <Form.Item name="search">
                <Select
                  value={onboardingType}
                  onChange={(value) => setOnboardingType(value)}
                  style={{ width: "100%", height: 40 }}
                  defaultValue={"ACCOUNT_NUMBER"}
                >
                  <Select.Option value="ACCOUNT_NUMBER">
                    Account Number
                  </Select.Option>
                  <Select.Option value="CUSTOMER_NUMBER">
                    Customer ID
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={`Enter ${onboardingType === "ACCOUNT_NUMBER" ? "Account Number" : "Customer ID"}`}
                className="bodyr"
              >
                <Search
                  value={searchValue}
                  onSearch={handleSearchCustomer}
                  style={{height:40}}
                  placeholder={`Enter ${onboardingType === "ACCOUNT_NUMBER" ? "Account Number" : "Customer ID"}`}
                  loading={loading}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className={styles.vertical}>
              <label htmlFor="country" className="bodyr">
                Country
              </label>
              <Form.Item name="country">
                <Select
                  placeholder="Select country"
                  style={{ width: "100%", height: 40 }}
                  className={`${styles.dropDown} bodyr`}
                  options={country}
                />
              </Form.Item>
            </div>

            <div className={styles.vertical}>
              <label htmlFor="role" className="bodyr">
                User Role
              </label>
              <Form.Item name="role">
                <Select
                  placeholder="Select role"
                  style={{ width: "100%", height: 40 }}
                  className={`${styles.dropDown} bodyr`}
                  options={roleOptions}
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
                    className={`${styles.selectionStandard} ${countryCode ? styles.selectActive : styles.selectPlaceholder} bodyr`}
                    style={{
                      width: 100,
                      height: 40,
                    }}
                    value={countryCode}
                    onChange={(value) => setCountryCode(value)}
                  >
                    {countryOptions.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
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
            customerId={formData.customerId}
            role={formData.role}
            country={formData.country}
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
          <FailureModal.description
            description={`Unable to create user ${formData?.firstName} ${formData?.lastName}. The username already exists! Please try again.`}
          />
        </FailureModal>
      </Modal>
    </div>
  );
};

export default CreateUser;
