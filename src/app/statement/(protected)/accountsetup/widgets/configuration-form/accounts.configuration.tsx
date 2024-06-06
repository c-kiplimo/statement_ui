import React, { ReactNode, useState, useEffect, useMemo } from "react";
import styles from "./accounts.configuration.module.css";
import { Radio, DatePicker, TimePicker, Dropdown, Menu, notification } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { StatementConfig } from "@/src/services/account/account.statement.config.service";
import moment from "moment";
import dayjs from "dayjs";
import { AccountsStmtConfig } from "@/src/lib/actions/account.ById.action";
import StatementAccounts from "@/src/components/widgets/acconts-configuration/config-acct-fetch/account";

export type acctData = {
  currency: string;
  name: string;
  account: number;
  lastSubmissionTime: string;
  workingBal: string;
  availableAmount: string;
  termDuration: string;
};

type contentProps = {
  fileformartHeader: string;
  optiona: string;
  optionb: string;
  optionc: string;
  optiond: string;
  date: string;
  time: string;
  dateIcon: ReactNode;
  timeIcon: ReactNode;
  onClick?: () => void;
};

const Accountstype = (props: contentProps) => {
  const [mtStatementsOption, setMTStatementsOption] = useState<boolean | undefined>(undefined);
  const [onlineStatementOption, setOnlineStatementOption] = useState<boolean | undefined>(undefined);
  const [scheduledStatementsOption, setScheduledStatementsOption] = useState<boolean | undefined>(undefined);
  const [frequencyOption, setFrequencyOption] = useState<string | undefined>(undefined);
  const [fileFormatOption, setFileFormatOption] = useState<string>("PDF");
  const [templateTypeOption, setTemplateTypeOption] = useState<string>("CORPORATE");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [accountDetailsdata, setAccountDetailsData] = useState<acctData>();
  

  const accountPaased = sessionStorage.getItem("passedaccountId")

  useEffect(() => {
    setSelectedAccountId(selectedAccountId);

    const fetchData = async () => {
      try {
        let accountData = await AccountsStmtConfig(parseInt(accountPaased!))

        setAccountDetailsData(accountData);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMTStatementsChange = (e: any) => {
    setMTStatementsOption(e.target.value);
  };

  const handlefrequencyOptionChange = (e: any) => {
    setFrequencyOption(e.target.value);
  };

  const handleOnlineStatementChange = (e: any) => {
    setOnlineStatementOption(e.target.value);
  };

  const handleScheduledStatementsChange = (e: any) => {
    setScheduledStatementsOption(e.target.value);
  };

  const handleFileFormatChange = (value: string) => {
    setFileFormatOption(value);
  };

  const handleTemplateTypeChange = (value: string) => {
    setTemplateTypeOption(value);
  };

  const handleDateChange = (date: moment.Moment | null) => {
    if (date) {
      setSelectedDate(date.format("YYYY-MM-DD"));
    } else {
      setSelectedDate(null);
    }
  };

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    if (time) {
      setSelectedTime(time.format("HH:mm:ss"));
    } else {
      setSelectedTime(null);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!selectedAccountId) {
        console.error("AccountId is not available.");

        notification.warning({
          message: "Failed!",
          description: "Account Configured."
        })
        return;
      }

      console.log("Submitting statement configuration data...");

      const statementData: any = {
        accountId: selectedAccountId.toString(),
        fileFormat: fileFormatOption,
        statementFrequency: frequencyOption || "",
        templateType: templateTypeOption,
      };

      if (selectedDate && selectedTime) {
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        statementData.startDateTime = `${formattedDate}T${selectedTime}`;
      }

      console.log("Statement Data before update:", statementData);

      const response = await StatementConfig(selectedAccountId, statementData);

      console.log("Response from backend:", response);

      console.log("Updated statement data:", response);
      notification.success({
        message: "Success!",
        description: "Your account was setup successfully."
      })
      window.history.back();
    } catch (error) {
      console.error("Error:", error);
      notification.warning({
        message: "Failed!",
        description: "Please check all Options!!!."
      })
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


  const lastLoginTime = useMemo(() => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
    return now.toLocaleDateString('en-US', options);
  }, []);

  return (
    <div className={styles.container} onClick={props.onClick}>
      <StatementAccounts
        headIcon={<img src="/dice.svg" alt="dice" />}
        name={accountDetailsdata?.name!}
        account={accountDetailsdata?.account!}
        lastSubmissionTime={lastLoginTime}
        availableAmount={accountDetailsdata?.availableAmount!}
        inforIcon={<img src="/info.svg" alt="info" />}
        amountInKES={"KES 35,071.28"}
        amountIn$={"$6,786.33"}
        workingBaltitle={"Working Balance"}
        workingBal={accountDetailsdata?.workingBal!}
        termTitle={"Term"}
        termDuration={accountDetailsdata?.termDuration!}
        currency={accountDetailsdata?.currency!}
        availableTitle={"Available Balance"}
      />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.settings}>
          <div className={styles.restrictions}>
            <div className={styles.MT940MT950}>
              <div className={styles.desHeader}>
                Allow MT 940 / MT 950 Statements
              </div>
              <Radio.Group className={styles.radioG}
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
          </div>

          <div className={styles.restrictions}>
            <div className={styles.MT940MT950}>
              <div className={`${styles.desHeader} bodyr`}>
                Allow for Online Statement
              </div>
              <Radio.Group className={styles.radioG}
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
          </div>

          <div className={styles.restrictions}>
            <div className={styles.MT940MT950}>
              <div className={`${styles.desHeader} bodyr`}>
                Scheduled Statements
              </div>
              <Radio.Group className={styles.radioG}
                onChange={handleScheduledStatementsChange}
                value={scheduledStatementsOption}
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
          </div>

          {scheduledStatementsOption === true && (
            <div className={styles.fretimedate}>
              <div className={`${styles.desHeader} bodyr`}>
              <div>{props.fileformartHeader}</div>
                
             
                  <Radio.Group className={styles.interval}
                    onChange={handlefrequencyOptionChange}
                    value={frequencyOption}
                  >
                    <Radio value="Monthly">
                      {props.optiona}
                    </Radio>
                    <Radio value="Bi Weekly">
                      {props.optionb}
                    </Radio>
                    <Radio value="Weekly">
                      {props.optionc}
                    </Radio>
                    <Radio value="Daily">
                      {props.optiond}
                    </Radio>
                  </Radio.Group>
               
              </div>

              <div className={styles.dateTime}>
                <DatePicker
                  className={styles.input}
                  suffixIcon={props.dateIcon}
                  onChange={handleDateChange}
                />
                <TimePicker
                  className={styles.input}
                  suffixIcon={props.timeIcon}
                  onChange={handleTimeChange}
                />
              </div>
            </div>
          )}

          <div className={styles.files} onClick={props.onClick}>
            <div className={styles.fileFormart}>
              <div className= {styles.dollaramount}>File Format</div>
              <Dropdown className={`${styles.PDF} bodyr`} overlay={fileFormatMenu} trigger={['click']}>
                <div className={styles.dropdown}>
                  {fileFormatOption} <DownOutlined />
                </div>
              </Dropdown>
            </div>

            <div className={styles.fileFormart}>
              <div className={styles.dollaramount}>Template</div>

              <Dropdown className= {`${styles.templateOptions} bodyr`} overlay={templateTypeMenu} trigger={['click']}>
                <div className={styles.dropdown}>
                  {templateTypeOption} <DownOutlined />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className={styles.buttondiv}>
          <button type="submit" className={`${styles.button} bodyr`}>
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default Accountstype;
