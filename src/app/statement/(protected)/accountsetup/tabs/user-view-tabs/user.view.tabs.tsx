"use client"
import React, { useState } from 'react';
import styles from "./user.view.tabs.module.css";



interface TabItem {
  buttonName: string;
  bodyContent: React.ReactNode;
}

interface TabsNavProps {
  userId?: number;
}

const UserViewTabsNavigation: React.FC<TabsNavProps> = ({ userId }) => {

 

  return (
    <div className={styles.container}>
      
    </div>
  );
};

export default UserViewTabsNavigation;
