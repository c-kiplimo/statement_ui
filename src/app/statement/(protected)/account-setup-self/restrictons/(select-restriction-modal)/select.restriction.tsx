import React, { ReactNode, useEffect, useState } from "react";
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
  onCreate: (selectedIds: number[]) => void;
};

const SelectRestriction = ({
  restrictions,
  onCancel,
  onCreate,
  
}: RestrictionsProps) => {
  const [selectedOption, setSelectedOption] = useState<number[]>([]);  


  useEffect(() => {
    setSelectedOption([]);
  }, [restrictions]);
  
  const handleOptionChange = (newValue: number) => {
    setSelectedOption((prevValue) =>
      prevValue.includes(newValue) 
        ? prevValue.filter(id => id !== newValue)  
        : [...prevValue, newValue]  
    );
  };

  const handleCreate = () => {
    onCreate(selectedOption);  
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={`h6b`}>Restrictions</span>
      </div>

      <div className={styles.body}>
        {restrictions.map((restriction) => (
          <Link href={""} key={restriction.id}>
            <div className="mt-3">
              <SelectionCard
                id={restriction.id.toString()}
                icon={<img src={`/sort.svg`} />}
                label={restriction.restrictionname}
                description={restriction.restrictionDescription}
                name="card-info"
                borderColor="#4272DD"
                activeCardId={selectedOption.includes(restriction.id) ? restriction.id.toString() : null}
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
        <button className={`${styles.createbtn} bodyr`} onClick={handleCreate}>
          CREATE
        </button>
      </div>
    </div>
  );
};

export default SelectRestriction;
