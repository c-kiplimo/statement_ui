import React from "react";
import styles from './having-trouble.module.css'
import TexterLink from "../../atoms/text/texterLink";

const HavingTrouble = () => {
  return (
    <div className={styles.havingTrouble}>
      <TexterLink
        text="Having trouble? "
        className="bodyr"
        linkText="Get help"
        linkClassName="get-help-link"
        href="#"
      />
    </div>
  );
};

export default HavingTrouble;
