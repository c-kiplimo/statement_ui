import React, { ReactNode, useState } from "react";
import styles from "./restrictions.module.css";
import SelectionCard from "@/src/components/widgets/card-info/card-info-radio";
import { createRestriction } from "@/src/services/account/create.account.restriction.service";
import { notification } from "antd";

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
  onSubmit: () => void; // Add this prop
};

const CreateRestrictionModal: React.FC<RestrictionsProps> = ({
  titleName,
  addIcon,
  filterIcon,
  visible,
  restrictionArray,
  resId,
  onSubmit, // Destructure the onSubmit prop
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = async (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === String(newValue) ? null : String(newValue)
    );
    const selectedData = restrictionArray.find((item) => item.id === newValue);
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
    </div>
  );
};

export default CreateRestrictionModal;
