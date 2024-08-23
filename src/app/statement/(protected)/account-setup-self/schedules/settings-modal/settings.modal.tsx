import React, { ReactNode, useState, useContext, useEffect } from "react";
import styles from "./settings.modal.module.css";
import {
  Radio,
  DatePicker,
  TimePicker,
  Dropdown,
  Menu,
  notification,
  Modal,
  message,
} from "antd";
import { CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
import Successful from "@/src/components/widgets/success-widget/successfull/successful";
import FailureModal from "@/src/components/widgets/failure-widget/failure";
import AccountInfo from "../account-info/account.info";
import { AccountInfoContext } from "../schedules-context/accountInforContext";
import { AcctScheduleHandler } from "@/src/services/account/post.account.schedule";

export type acctData = {
  currency: string;
  name: string;
  account: number;
};

type contentProps = {
  accountId: number;
  date: string;
  time: string;
  dateIcon: ReactNode;
  timeIcon: ReactNode;
  onSuccess?: () => void;
  onClick?: () => void;
  resetOptionsOnOpen?: boolean;
};

const SettingsModal = (props: contentProps) => {
  const [mtStatementsOption, setMTStatementsOption] = useState<
    boolean | undefined
  >(undefined);
  const [onlineStatementOption, setOnlineStatementOption] = useState<
    boolean | undefined
  >(undefined);
  const [scheduledStatementsOption, setScheduledStatementsOption] = useState<
    boolean | undefined
  >(undefined);
  const [frequencyOption, setFrequencyOption] = useState<string | undefined>(
    undefined
  );
  const [fileFormatOption, setFileFormatOption] = useState<string>("PDF");
  const [templateTypeOption, setTemplateTypeOption] =
    useState<string>("CORPORATE");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notificationOption, setNotificationOption] = useState<
    boolean | undefined
  >(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const context = useContext(AccountInfoContext);
  if (!context) {
    return null;
  }

  const { accountInfo } = context;
  const { accountId } = props;

  const { postAccountSchedules } = AcctScheduleHandler();
  useEffect(() => {
    if (props.resetOptionsOnOpen) {
      setMTStatementsOption(undefined);
      setOnlineStatementOption(undefined);
      setScheduledStatementsOption(undefined);
      setFrequencyOption(undefined);
      setFileFormatOption("PDF");
      setTemplateTypeOption("CORPORATE");
      setSelectedDate(null);
      setSelectedTime(null);
      setNotificationOption(undefined);
    }
  }, [props.resetOptionsOnOpen]);


  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
  
    if (!accountId) {
      showNotification("Error", "Account ID is required.");
      return;
    }
    if (!selectedDate || !selectedTime) {
      notification.info({
        message: "Incomplete Selection",
        description: "Please input both date and time.",
        className: styles.customNotification,
        icon: null,
       
        closeIcon: null,
      });
      return;
    }

    const statementData = {
      accountId: accountId.toString(),
      allowSwiftStatement: mtStatementsOption || false,
      allowOnlineStatement: onlineStatementOption || false,
      scheduleStatement: scheduledStatementsOption || false,
      statementFrequency: frequencyOption || "",
      notificationType: notificationOption ? "SMS" : "Email",
      fileFormat: fileFormatOption,
      templateType: templateTypeOption,
      startDateTime: `${moment(selectedDate).format("YYYY-MM-DD")}T${selectedTime}`,
    };

    try {
      const response = await postAccountSchedules(statementData);

      showNotification(
        "",
        <Successful>
          <Successful.Icon style={{ color: "#17D05B" }}>
            <CheckOutlined />
          </Successful.Icon>
          <Successful.Text text="Your account has been successfully set up" />
          <Successful.Icon
            style={{
              color: "white",
              background: "none",
              justifyContent: "flex-end",
            }}
          >
            <CloseOutlined />
          </Successful.Icon>
        </Successful>
      );
      setMTStatementsOption(undefined);
      setOnlineStatementOption(undefined);
      setScheduledStatementsOption(undefined);
      setFrequencyOption(undefined);
      setFileFormatOption("PDF");
      setTemplateTypeOption("CORPORATE");
      setSelectedDate(null);
      setSelectedTime(null);
      setNotificationOption(undefined);
  
      if (props.onSuccess) {
        props.onSuccess();
      }
    } catch (error) {
      console.error("Error submitting account schedule:", error);
      setIsModalVisible(true);
    }
  };

  const handleMTStatementsChange = (e: any) =>
    setMTStatementsOption(e.target.value);
  const handlefrequencyOptionChange = (e: any) =>
    setFrequencyOption(e.target.value);
  const handleOnlineStatementChange = (e: any) =>
    setOnlineStatementOption(e.target.value);
  const handleFileFormatChange = (value: string) => setFileFormatOption(value);
  const handleTemplateTypeChange = (value: string) =>
    setTemplateTypeOption(value);
  const handleDateChange = (date: moment.Moment | null) =>
    setSelectedDate(date ? date.format("YYYY-MM-DD") : null);
  const handleTimeChange = (time: dayjs.Dayjs | null) =>
    setSelectedTime(time ? time.format("HH:mm:ss") : null);
  const handleNotificationChange = (e: any) =>
    setNotificationOption(e.target.value);

  const showNotification = (message: string, description: ReactNode) => {
    notification.open({
      message,
      description,
      className: styles.customNotification,
      icon: null,
      style: {
        width: "max-content",
        height: "80px",
        background: "#17D05B",
        color: "white",
      },
      closeIcon: null,
    });
  };

  const handleCancel = () => {
  setIsModalVisible(false);}
  const handleTryAgain = () => {
    setIsModalVisible(false);
    handleSubmit();
  };

  const fileFormatMenu = (
    <Menu onClick={({ key }) => handleFileFormatChange(key)}>
      <Menu.Item key="PDF">PDF</Menu.Item>
      <Menu.Item key="SWIFT">SWIFT</Menu.Item>
    </Menu>
  );

  const templateTypeMenu = (
    <Menu onClick={({ key }) => handleTemplateTypeChange(key)}>
      <Menu.Item key="CORPORATE">CORPORATE</Menu.Item>
      <Menu.Item key="INDIVIDUAL">INDIVIDUAL</Menu.Item>
    </Menu>
  );

  const accountAbbreviation = accountInfo.accountName.charAt(0);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.bodydiv}>
          <div className={styles.infordiv}>
            <AccountInfo
              accNumber={accountInfo.accountNumber}
              accName={accountInfo.accountName}
              currency={accountInfo.currency}
              abbreviation={accountAbbreviation}
            />
          </div>

          <div className={styles.settings}>
            <div className={styles.restrictions}>
              <div className={styles.desHeader}>
                Allow MT 940 / MT 950 Statements
              </div>
              <Radio.Group
                className={styles.radioG}
                onChange={handleMTStatementsChange}
                value={mtStatementsOption}
              >
                <Radio className={`${styles.radio} bodyr`} value={true}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    YES
                  </div>
                </Radio>
                <Radio className={`${styles.radio} bodyr`} value={false}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    NO
                  </div>
                </Radio>
              </Radio.Group>
            </div>

            <div className={styles.restrictions}>
              <div className={`${styles.desHeader} bodyr`}>
                Allow for Online Statement
              </div>
              <Radio.Group
                className={styles.radioG}
                onChange={handleOnlineStatementChange}
                value={onlineStatementOption}
              >
                <Radio className={`${styles.radio} bodyr`} value={true}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    YES
                  </div>
                </Radio>
                <Radio className={`${styles.radio} bodyr`} value={false}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    NO
                  </div>
                </Radio>
              </Radio.Group>
            </div>

            <div className={styles.restrictions}>
              <div className={`${styles.desHeader} bodyr`}>Notification</div>
              <Radio.Group
                className={styles.radioG}
                onChange={handleNotificationChange}
                value={notificationOption}
              >
                <Radio className={`${styles.radio} bodyr`} value={true}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    SMS
                  </div>
                </Radio>
                <Radio className={`${styles.radio} bodyr`} value={false}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    Email
                  </div>
                </Radio>
              </Radio.Group>
            </div>

            <div className={styles.fretimedate}>
              <div className={`${styles.desHeader} bodyr`}>
                <div>Statement Period</div>
                <Radio.Group
                  className={styles.interval}
                  onChange={handlefrequencyOptionChange}
                  value={frequencyOption}
                >
                  <Radio value="Monthly">Monthly</Radio>
                  <Radio value="Bi Weekly">Bi Weekly</Radio>
                  <Radio value="Weekly">Weekly</Radio>
                  <Radio value="Daily">Daily</Radio>
                </Radio.Group>
              </div>

              <div className={styles.dateTime}>
                <DatePicker
                  className={styles.date}
                  suffixIcon={props.dateIcon}
                  onChange={handleDateChange}
                />
                <TimePicker
                  className={styles.time}
                  suffixIcon={props.timeIcon}
                  onChange={handleTimeChange}
                />
              </div>
            </div>

            <div className={styles.files}>
              <div className={styles.fileFormart}>
                <div className={styles.dollaramount}>File Format</div>
                <Dropdown
                  className={`${styles.PDF} bodyr`}
                  overlay={fileFormatMenu}
                  trigger={["click"]}
                >
                  <div className={styles.dropdown}>
                    {fileFormatOption} <DownOutlined />
                  </div>
                </Dropdown>
              </div>

              <div className={styles.fileFormart}>
                <div className={styles.dollaramount}>Template</div>
                <Dropdown
                  className={`${styles.templateOptions} bodyr`}
                  overlay={templateTypeMenu}
                  trigger={["click"]}
                >
                  <div className={styles.dropdown}>
                    {templateTypeOption} <DownOutlined />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttondiv}>
          <button
            type="button"
            className={`${styles.cancelbutton} bodyr`}
            onClick={props.onClick}
          >
            Cancel
          </button>
          <button type="submit" className={`${styles.submitbutton} bodyr`}>
            Submit
          </button>
        </div>
      </form>

      <Modal
        visible={isModalVisible}
        width={"fit-content"}
        onCancel={handleCancel}
        footer={null}
      >
        <FailureModal
          onCancelClick={handleCancel}
          onTryAgainClick={handleTryAgain}
        >
          <FailureModal.Icon>
            <img src={"/warning.svg"} width={56} height={56} alt="warning" />
          </FailureModal.Icon>
          <FailureModal.title title="Account Setup Failed" />
          <FailureModal.description description="We encountered an error while setting up your account. Please try again later" />
        </FailureModal>
      </Modal>
    </div>
  );
};

export default SettingsModal;
