import { useContext, useEffect, useState } from "react";
import styles from "./account.ministatement.module.css";
import { SelectedAcountContext } from "../context/accoint.overview.context";
import { MinistatementAccountStatusAction } from "@/src/lib/account.status.action";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { InfoCircleFilled } from "@ant-design/icons";

export type ministatementAccountDetails = {
  title: string;
  currency: string;
  accountNumber: string;
  lastActivityDate: string;
  availableBalance: string;
  workingBalance: string;
  term: string;
};

export const AccountHeader = () => {
  const { selectedAccount } = useContext(SelectedAcountContext);

  const [statusData, setData] = useState<ministatementAccountDetails>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const result = await MinistatementAccountStatusAction(selectedAccount);
        setData(result);
        setError(null);
      } catch (error) {
        setData(null!);
      }
    };

    if (selectedAccount) {
      fetchStatusData();
    }
  }, [selectedAccount]);

  return (
    <div>
      {error && (
        <div
          style={{
            color: "red",
            padding: "8px",
            border: "1px solid red",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      {statusData ? (
        <div className={styles.headerContent}>
          <div className={styles.header}>
            <div className={styles.accountdetails}>
              <div>
                <img src={"/accountImg.svg"} />
              </div>
              <div>
                <VerticalInfoDescription
                  title={statusData?.title!}
                  titleStyle={{
                    fontWeight: "500",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                  description={`${statusData?.currency}  |  ${statusData?.accountNumber}`}
                  descriptionStyle={{ fontSize: "13px", color: "#6F7269" }}
                />
              </div>
            </div>
            <div className={styles.lastlogin}>
              <p className={`bodyr`}>
                Last activity {statusData?.lastActivityDate}
              </p>
            </div>
          </div>

          <div className={styles.balancesSection}>
            <div className={styles.availableBalance}>
              <p className={`${styles.imagetexxt} bodyr`}>
                {" "}
                <span>Available Balance</span>{" "}
                <span className={styles.icon}>
                  <InfoCircleFilled />
                </span>{" "}
              </p>
              <p className={`h6m`}>
                <span>${parseInt(statusData?.availableBalance!) / 100}</span>{" "}
                <span
                  className={``}
                  style={{ color: "#6F7269", fontWeight: "400" }}
                >
                  / {statusData?.currency} {statusData?.availableBalance}
                </span>
              </p>
            </div>
            <div className={styles.availableBalance}>
              <p className={`${styles.imagetexxt} bodyr`}>
                <span>Working Balance</span>{" "}
                <span className={styles.icon}>
                  <InfoCircleFilled />
                </span>
              </p>
              <span className={`h6m`}>$ {statusData?.workingBalance}</span>
            </div>
            <div className={styles.period}>
              <p className={`${styles.imagetexxt} bodyr`}>
                <span>Term </span>{" "}
                <span className={styles.icon}>
                  <InfoCircleFilled />
                </span>
              </p>
              <span className={`h6m`}>{statusData?.term}</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
