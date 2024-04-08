import React, { ReactNode } from "react";
import styles from "./accounts.type.module.css";
import { Radio, DatePicker, TimePicker, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

type contentProps = {
  headIcon: ReactNode;
  header: string;
  totalAmount: string;
  accStatus: string;
  amountHeader: string;
  inforIcon1: ReactNode;
  inforIcon2: ReactNode;
  inforIcon3: ReactNode;
  amountInKES: string;
  amountIn$: string;
  workingBalHead: string;
  workingBal: string;
  termHeader: string;
  termDuration: string;
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
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.topdiv}>
        <div className={styles.title}>
          <div className={styles.titleicon}>
            <div className={styles.icon}>{props.headIcon}</div>
            <div className={styles.titledescription}>
              <div className={styles.header}>
                <div className={styles.headertext}>{props.header}</div>
              </div>
              <div className={styles.description}>
                <div className={styles.descriptiontext}>
                  {props.totalAmount}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.status}>
            <div className={styles.statustext}>{props.accStatus}</div>
          </div>
        </div>
        <div className={styles.transactionsDiv}>
          <div className={styles.avilableBal}>
            <div className={styles.avBaltitle}>
              <div className={styles.text}>{props.amountHeader}</div>
              <div className={styles.infoIcon}>{props.inforIcon1}</div>
            </div>
            <div className={styles.bal}>
              <span className={styles.dollaramount}>{props.amountIn$} </span>
              <span className={styles.kesamount}>{props.amountInKES}</span>
            </div>
          </div>
          <div className={styles.workingBal}>
            <div className={styles.workbaltitle}>
              <div className={styles.text}>{props.workingBalHead}</div>
              <div className={styles.infoIcon}>{props.inforIcon2}</div>
            </div>
            <div className={styles.workbalamount}>
              <div className={styles.dollaramount}>{props.workingBal}</div>
            </div>
          </div>
          <div className={styles.termDiv}>
            <div className={styles.termTitle}>
              <div className={styles.text}>{props.termHeader}</div>
              <div className={styles.infoIcon}>{props.inforIcon3}</div>
            </div>
            <div className={styles.termname}>
              <div className={styles.dollaramount}>{props.termDuration}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomdiv}>
        <form>
          <div className={styles.bottomdivTitle}>{props.fileformartHeader}</div>

          <div className={styles.interval}>
            <Radio className={styles.radio} value="1">
              {props.optiona}
            </Radio>
            <Radio className={styles.radio} value="2">
              {props.optionb}
            </Radio>
            <Radio className={styles.radio} value="3">
              {props.optionc}
            </Radio>
            <Radio className={styles.radio} value="4">
              {props.optiond}
            </Radio>
          </div>

          <div className={styles.dateTime}>
            <DatePicker className={styles.input} suffixIcon={props.dateIcon} />
            <TimePicker className={styles.input} suffixIcon={props.timeIcon} />
          </div>
          <div className={styles.files} onClick={props.onClick}>
            <div className={styles.formart}>
              <div className={styles.dollaramount}>File Format</div>
              <div className={styles.frmrtOptions}>
                <div className={styles.text}>PDF</div>
                <div className={styles.frmrtIcon}>
                  <DownOutlined />
                </div>
              </div>
            </div>
            <div className={styles.template}>
              <div className={styles.dollaramount}>Template</div>
              <div className={styles.frmrtOptions}>
                <div className={styles.text}>CORPORATE</div>
                <div className={styles.frmrtIcon}>
                  <DownOutlined />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.buttondiv}>
        <button className={styles.button}>SUBMIT</button>
      </div>
    </div>
  );
};

export default Accountstype;
