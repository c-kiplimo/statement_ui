import React, { ReactNode, useEffect, useState } from 'react';
import styles from './restrictions.module.css';
import SelectionCard from '@/src/components/widgets/card-info/card-info-radio';



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
  restrictionArray:EntriesProps[];
  titleName: string;
  addIcon: ReactNode;
  filterIcon: ReactNode;
  visible:boolean;
};

const CreateRestrictionModal: React.FC<RestrictionsProps> = ({ titleName, addIcon, filterIcon,visible, restrictionArray }) => {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);



  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
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
{restrictionArray.map(
  (restData)=>(

<SelectionCard
id={restData.id!.toString()} 
icon={<img src='/visaIcon.svg' alt='visaIcon' />} 
label={restData.restrictionName!} 
description={restData.description!} 
activeCardId={selectedOption}
name={''} 
onSelection={() => handleOptionChange(restData.id!) }

  borderColor={'#4272DD'}/>
)
)}
      </div>
    </div>
    </div>
  );
};

export default CreateRestrictionModal;
