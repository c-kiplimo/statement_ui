import React, { ReactNode, useState, useEffect, useMemo } from "react";
import styles from "./settings.modal.module.css";
import {
  Radio,
  DatePicker,
  TimePicker,
  Dropdown,
  Menu,
  notification,
  Modal,
} from "antd";
import { CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
import { AccountsStmtConfig } from "@/src/lib/actions/account.ById.action";
import CompanyInfo from "../../../user-management/(company-info)/company-info";
import Successful from "@/src/components/widgets/success-widget/successfull/successful";
import AccountInfo from "../account-info/account.info";
import FailureModal from "@/src/components/widgets/failure-widget/failure";

export type acctData = {
  currency: string;
  name: string;
  account: number;
};

type contentProps = {
  accountId: number;
  optiona: string;
  optionb: string;
  optionc: string;
  optiond: string;
  date: string;
  time: string;
  dateIcon: ReactNode;
  timeIcon: ReactNode;
  onSuccess?: () => void;
  onClick?: () => void;
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
  const [accountDetailsdata, setAccountDetailsData] = useState<acctData>();
  const [notificationOption, setNotificationOption] = useState<boolean | undefined>(undefined);
  const { accountId } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

const handleCancel = () => {
  setIsModalVisible(false);
};

const handleTryAgain = () => {
  setIsModalVisible(false);
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountData = await AccountsStmtConfig(accountId);
        setAccountDetailsData(accountData);
      } catch (error) {
        console.error("Error fetching account data:", error);
        notification.error({
          message: "Data Fetch Error",
          description:
            "Failed to fetch account details. Please try again later.",
        });
      }
    };

    fetchData();
  }, [accountId]);

  const handleMTStatementsChange = (e: any) =>
    setMTStatementsOption(e.target.value);
  const handlefrequencyOptionChange = (e: any) =>
    setFrequencyOption(e.target.value);
  const handleOnlineStatementChange = (e: any) =>
    setOnlineStatementOption(e.target.value);
  const handleScheduledStatementsChange = (e: any) =>
    setScheduledStatementsOption(e.target.value);
  const handleFileFormatChange = (value: string) => setFileFormatOption(value);
  const handleTemplateTypeChange = (value: string) =>
    setTemplateTypeOption(value);
  const handleDateChange = (date: moment.Moment | null) =>
    setSelectedDate(date ? date.format("YYYY-MM-DD") : null);
  const handleTimeChange = (time: dayjs.Dayjs | null) =>
    setSelectedTime(time ? time.format("HH:mm:ss") : null);
  const handleNotificationChange = (e: any) => setNotificationOption(e.target.value);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!accountId) {
        console.error("AccountId is not available.");
        showNotification(
          "Success",
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
        return;
      }

      if (scheduledStatementsOption && !frequencyOption) {
        notification.warning({
          message: "Validation Error",
          description: "Please select statement frequency.",
        });
        return;
      }

      if (scheduledStatementsOption && (!selectedDate || !selectedTime)) {
        notification.warning({
          message: "Validation Error",
          description: "Please select both date and time.",
        });
        return;
      }

      const statementData: any = {
        accountId: accountId.toString(),
        fileFormat: fileFormatOption,
        statementFrequency: frequencyOption || "",
        templateType: templateTypeOption,
      };

      if (selectedDate && selectedTime) {
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        statementData.startDateTime = `${formattedDate}T${selectedTime}`;
      }

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

      if (props.onSuccess) {
        props.onSuccess();
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Submission Failed",
        description: "Please check all options and try again.",
      });
    }
  };

  const fileFormatMenu = (
    <Menu onClick={({ key }) => handleFileFormatChange(key)}>
      <Menu.Item key="PDF">PDF</Menu.Item>
      <Menu.Item key="Swift">Swift</Menu.Item>
    </Menu>
  );

  const templateTypeMenu = (
    <Menu onClick={({ key }) => handleTemplateTypeChange(key)}>
      <Menu.Item key="CORPORATE">CORPORATE</Menu.Item>
      <Menu.Item key="Individual">Individual</Menu.Item>
    </Menu>
  );


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.bodydiv}>
        <div className={styles.infordiv}>
      <AccountInfo accNumber={0} accName={"Meraki Systems Tech A/C"} currency={"Kenyan Shillings (KES)"} />
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
            <div className={`${styles.desHeader} bodyr`}>
             Notification
            </div>
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
                <Radio value="Monthly">{props.optiona}</Radio>
                <Radio value="Bi Weekly">{props.optionb}</Radio>
                <Radio value="Weekly">{props.optionc}</Radio>
                <Radio value="Daily">{props.optiond}</Radio>
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
          <button type="submit"  className={`${styles.submitbutton} bodyr`}>
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
          <FailureModal.title title="Error Inviting User" />
          <FailureModal.description description="There was an error inviting the user to the group. Please try again later." />
        </FailureModal>
      </Modal> 
    </div>
  );
};

export default SettingsModal;
