import React, { ReactNode, useState, useEffect } from "react";
import styles from "./accounts.configuration.module.css";
import { Radio, DatePicker, TimePicker, Select, notification } from "antd";
import StatementAccounts from "../config-acct-fetch/account";
import { StatementConfig } from "@/src/services/account/account.statement.config.service";
import moment from "moment";
import dayjs from "dayjs";
import { AccountsStmtConfig } from "@/src/lib/actions/account.ById.action";
import { useAccountProfileContext } from "@/src/app/statement/(protected)/accountsetup/context/account.contex";



export type acctData = {
  currency: string;
  name: string;
  account: number;
  lastSubmissionTime: string;
  workingBal: string;
  availableAmount: string;
  termDuration: string;
};

const { Option } = Select;

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
  // const {accountId,updateAccount}=useAccountProfileContext();

  

  useEffect(() => {
    setSelectedAccountId(selectedAccountId);

    const fetchData = async () => {
      try {
        let accountData = await AccountsStmtConfig(1026272613
);
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
          message:"Failed!",
          description:"Account Configured."
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
        message:"Success!",
        description:"Your account was setup successfully."
      })
      window.history.back();
    } catch (error) {
      console.error("Error:", error);
      notification.warning({
        message:"Failed!",
        description:"Please check all Options!!!."
      })
    }
  };

  return (
    <div className={styles.container} onClick={props.onClick}>
      <StatementAccounts
        headIcon={<img src="/dice.svg" alt="dice" />}
        name={accountDetailsdata?.name!}
        account={accountDetailsdata?.account!}
        lastSubmissionTime={accountDetailsdata?.lastSubmissionTime!}
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
              <Radio.Group
                onChange={handleMTStatementsChange}
                value={mtStatementsOption}
              >
                <Radio className={styles.radio} value={true}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    YES
                  </div>
                </Radio>
                <Radio className={styles.radio} value={false}>
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
              <Radio.Group
                onChange={handleOnlineStatementChange}
                value={onlineStatementOption}
              >
                <Radio className={styles.radio} value={true}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    YES
                  </div>
                </Radio>
                <Radio className={styles.radio} value={false}>
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
              <Radio.Group
                onChange={handleScheduledStatementsChange}
                value={scheduledStatementsOption}
              >
                <Radio className={styles.radio} value={true}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    YES
                  </div>
                </Radio>
                <Radio className={styles.radio} value={false}>
                  <div className={`${styles.radiotext} ${styles.radioLabel}`}>
                    NO
                  </div>
                </Radio>
              </Radio.Group>
            </div>
          </div>

          {scheduledStatementsOption === true && (
            <>
              <div className={`${styles.desHeader} bodyr`}>
                {props.fileformartHeader}
              </div>
              <div className={styles.interval}>
                <Radio.Group
                  onChange={handlefrequencyOptionChange}
                  value={frequencyOption}
                >
                  <Radio className={styles.freqradio} value="Monthly">
                    {props.optiona}
                  </Radio>
                  <Radio className={styles.freqradio} value="Bi Weekly">
                    {props.optionb}
                  </Radio>
                  <Radio className={styles.freqradio} value="Weekly">
                    {props.optionc}
                  </Radio>
                  <Radio className={styles.freqradio} value="Daily">
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
            </>
          )}

          <div className={styles.files} onClick={props.onClick}>
            <div className={styles.fileFormart}>
              <div className={styles.dollaramount}>File Format</div>
              <Select
                value={fileFormatOption}
                className={`${styles.PDF} bodyr`}
                onChange={handleFileFormatChange}
              >
                <Option className={styles.optn} value="PDF">
                  PDF
                </Option>
                <Option className={styles.optn} value="Swift">
                  Swift
                </Option>
              </Select>
            </div>

            <div className={styles.fileFormart}>
              <div className={styles.dollaramount}>Template</div>
              <Select
                value={templateTypeOption}
                className={`${styles.templateOptions} bodyr`}
                onChange={handleTemplateTypeChange}
              >
                <Option className={styles.optn} value="CORPORATE">
                  CORPORATE
                </Option>
                <Option className={styles.optn} value="Individual">
                  Individual
                </Option>
              </Select>
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
