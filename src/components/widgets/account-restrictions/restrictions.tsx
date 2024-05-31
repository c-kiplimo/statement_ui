import React, { ReactNode, useEffect, useState } from 'react';
import styles from './restrictions.module.css';
import RestrictionEntries from './restriction-entries/restriction.entries';
import { AllAccountRestrictionsAction } from '@/src/lib/actions/all.restrictions.action';
import SelectionCard from '../card-info/card-info-radio';


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
};

const AccountsRictions: React.FC<RestrictionsProps> = ({ titleName, addIcon, filterIcon, restrictionArray }) => {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);



  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.titlediv}>
        <div className={styles.title}>{titleName}</div>
        <div className={styles.iconsdiv}>
          <div className={styles.filterIcon}>{filterIcon}</div>
          <div className={styles.addIcon}>{addIcon}</div>
        </div>
      </div>

    
      <div className={styles.restrictionsDiv}>
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
  );
};

export default AccountsRictions;
