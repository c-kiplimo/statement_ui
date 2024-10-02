"use client";
import styles from "./logout.module.css";
import React from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/src/services/account/logout.service";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import { notification } from "antd";
import { useSession } from "next-auth/react";

const Setting = () => {
  const router = useRouter();
  const profile = useProfileCreated();
  const userId = profile?.userId;
  const {data} = useSession();
  
 
  const handleCancelLogout = () => {
    router.push("/statement/dashboard");
  };

  const handleConfirmLogout = async () => {
    try {
      await logout(userId!);
      if (typeof window !== "undefined") {
        sessionStorage.clear();
        localStorage.clear();
      }
      notification.info({
        message: "Logged Out Successfully.",
        placement: "top",
      });
      router.push("/");
    } catch (error) {
      notification.error({
        message: "Failed to Logout. Try Again.",
      });
    }
  };

  return (
    <div className={`${styles.container}`}>
      <div className={styles.bodyContent}>
        <div className={styles.closeIcon}>
          <Image
            src={"/closeIcon.svg"}
            width={16}
            height={16}
            alt="cancel Icon"
            onClick={handleCancelLogout}
          />
        </div>
        <div className={styles.headercontent}>
          <div className={styles.bodydata}>
            <div className={styles.logout}>
              <Image
                src={"/logout.svg"}
                width={16}
                height={16}
                alt="logout Icon"
              />
              <VerticalInfoDescription
                title={"Log out"}
                titleStyle={{
                  fontWeight: "500",
                  fontSize: "20px",
                  color: "#003A49",
                }}
              />
            </div>

            <div className={styles.bodytext}>
              <VerticalInfoDescription
                title={"Are you Sure you want to logout From KCB simba Portal?"}
                titleStyle={{ color: "#6F7269" }}
              />
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.cancelButton}
              onClick={handleCancelLogout}
            >
              No
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmLogout}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
