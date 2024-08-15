import React, { ReactNode, useState } from "react";
import styles from "./select.restriction.module.css";
import SelectionCard from "@/src/components/widgets/card-info/card-info-radio";
import Link from "next/link";

export type RestrictionType = {
  id: number;
  icon?: ReactNode;
  restrictionname: string;
  restrictionDescription: string;
};

type RestrictionsProps = {
  restrictions: RestrictionType[];
  onCancel: () => void;
  onCreate: () => void;
};

const SelectRestriction = ({
  restrictions,
  onCancel,
  onCreate,
}: RestrictionsProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={`h6b`}>Restrictions</span>
      </div>

      <div className={styles.body}>
        {restrictions.map((restriction) => (
          <Link href={""}>
            <div className="mt-3" key={restriction.id}>
              <SelectionCard
                id={restriction.id.toString()}
                icon={<img src={`/sort.svg`} />}
                label={restriction.restrictionname}
                description={restriction.restrictionDescription}
                name="card-info"
                borderColor="#4272DD"
                activeCardId={selectedOption}
                onSelection={() => handleOptionChange(restriction.id)}
              />
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.buttons}>
        <button className={`${styles.cancelbtn} bodyr`} onClick={onCancel}>
          CANCEL
        </button>
        <button className={`${styles.createbtn} bodyr`} onClick={onCreate}>
          CREATE
        </button>
      </div>
    </div>
  );
};

export default SelectRestriction;
