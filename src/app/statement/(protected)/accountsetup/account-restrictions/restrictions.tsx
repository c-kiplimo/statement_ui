import React, { ReactNode, useState } from "react";
import styles from "./restrictions.module.css";
import SelectionCard from "@/src/components/widgets/card-info/card-info-radio";
import { createRestriction } from "@/src/services/account/create.account.restriction.service";
import { Modal, notification } from "antd";
import Confirmrestrictions from "./comfirm-add-restriction/confirm.restrictions";

export type EntriesProps = {
  id?: number;
  restrictionName?: string;
  icon?: ReactNode;
  description?: string;
  amount?: string;
  currency?: string;
  createdAt?: string;
  status?: string;
};

type RestrictionsProps = {
  restrictionArray: EntriesProps[];
  titleName: string;
  addIcon: ReactNode;
  filterIcon: ReactNode;
  visible: boolean;
  resId: number;
  onSubmit: () => void;
};

const CreateRestrictionModal: React.FC<RestrictionsProps> = ({
  titleName,
  addIcon,
  filterIcon,
  visible,
  restrictionArray,
  resId,
  onSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === String(newValue) ? null : String(newValue)
    );
    setIsModalVisible(true); // Show modal when an option is selected
  };

  const handleConfirm = async () => {
    const selectedData = restrictionArray.find((item) => item.id === Number(selectedOption));
    const accountRestrictions = [selectedData?.id!];
    if (selectedData) {
      setIsLoading(true);
      try {
        await createRestriction(resId, accountRestrictions);
        notification.success({
          message: "Success",
          description: "Restriction was created successfully",
        });
        onSubmit();
        setIsModalVisible(false); // Close the modal on success
      } catch (error) {
        console.error("Error creating restriction:", error);
        notification.error({
          message: "Error",
          description: "Failed to create restriction",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal on cancel
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.titlediv}>
          <div className={styles.title}>{titleName}</div>
          <div className={styles.iconsdiv}>
            <div className={styles.filterIcon}>{filterIcon}</div>
            <div className={styles.addIcon}>{addIcon}</div>
          </div>
        </div>

        <div className={`${styles.restrictionsDiv} ${styles.scrollcontainer}`}>
          {restrictionArray.map((restData) => (
            <SelectionCard
              key={restData.id}
              id={restData.id?.toString() || ""}
              icon={<img src="/visaIcon.svg" alt="visaIcon" />}
              label={restData.restrictionName || "No Name"}
              description={restData.description || "No Description"}
              activeCardId={selectedOption}
              name={""}
              onSelection={() => handleOptionChange(restData.id!)}
              borderColor={"#4272DD"}
            />
          ))}
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Confirmrestrictions onCancel={handleCancel} onConfirm={handleConfirm} />
      </Modal>
    </div>
  );
};

export default CreateRestrictionModal;
