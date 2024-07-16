import React from 'react';
import styles from "./create.user.groups.module.css";
import { Steps } from 'antd';
import CreateGroupFor from './form/createGroupFor';


const CreateUserroups = () => {

    const floe = [
        { label: 'Step 1: Basic Info' },
        { label: 'Step 2: Group Details' }
      ];
  return (
    <div className={styles.container}>
      <div className={styles.formDiv}>
        <div className={styles.stepper}> <Steps
    direction="vertical"
    current={0}
    items={[
      {
        title: 'Define Group',
        description:"Group details",
        className:styles.step1
      },
      {
        title: 'Set Permissions',
        description:"Assign permissions",
      }
    ]}
  /> </div>
        <CreateGroupFor />
      </div>
    </div>
  );
};

export default CreateUserroups;
