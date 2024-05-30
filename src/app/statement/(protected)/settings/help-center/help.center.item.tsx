import React, { useState } from "react";
import styles from "./help.center.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import CustomSearchInput from "@/src/components/atoms/input/custom-search-input";
import HelpCenter from "./help.center";
import GetIntouchModal from "./getIntouch-modal/get.intouch.modal";

const HelpCenterItem = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
        <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title={"Help Center"}
          titleStyle={{
            fontWeight: "500",
            fontSize: "25px",
            color: "#151E00",
            marginBottom: "16px",
          }}
          description={
            "Find answers to commonly asked questions about our services"
          }
          descriptionStyle={{ fontSize: "16px", color: "#6F7269" }}
        />
        <div className={styles.searchinput}>
          <CustomSearchInput
            inputStle={{ outline: "none", width: "100%" }}
            iconStyles={{}}
            placeholder="Search"
          />
        </div>
      </div>

      <div className={styles.bodyContent}>
        <HelpCenter />
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.intouchButton} onClick={handleOpenModal}>
          Get In Touch
        </button>
      </div>

      <section>
        <GetIntouchModal
          isModalOpen={isModalVisible}
          onClose={handleCloseModal}
        />
      </section>
    </div>
  );
};

export default HelpCenterItem;
