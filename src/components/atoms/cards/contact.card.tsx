import React from 'react';
import { useTokens, useFont } from '@/src/app/(context)/ColorContext';
import styles from '@/src/components/atoms/cards/contact.card.module.css';

interface CardProps {
  title: string;
  content?: string;
  additonalContent?: string;
  icon?: React.ReactElement;
  style?: React.CSSProperties;
}

const ContactCard: React.FC<CardProps> = ({
  title,
  content,
  style,
  icon,
  additonalContent,
}) => {
  const token = useTokens();
  const font = useFont();
  const styles1 = {
    card: {
      padding: '16px',
      display: 'flex',
      width: '329px',
      alignItems: 'flex-start',
      gap: '8px',
      flexDirection: 'column' as 'column',
      borderRight: `1px solid  ${token.background.secondary}`,
      color: token.text.description_01,
    },
    header: {
      gap: '10px',
      display: 'flex',
      alignItems: 'center',
      color: token.text.description_01,
    },
    title: {
      fontFamily: font.font.family,
      fontWeight: font.typography.body.medium.fontWeight,
      lineHeight: font.typography.body.medium.lineHeight,
      fontStyle: font.typography.body.medium.fontStyle,
      fontSize: font.typography.body.medium.fontSize,
      color: token.text.description_01,
    },
    icon: {
      width: '16px',
      height: '16px',
      color: token.text.description_02,
    },
    content: {
      fontFamily: font.font.family,
      fontWeight: font.typography.h6.medium.fontWeight,
      lineHeight: font.typography.h6.medium.lineHeight,
      fontStyle: font.typography.h6.medium.fontStyle,
      fontSize: font.typography.h6.medium.fontSize,
      color: token.text.secondary,
    },
    additionalContent: {
      fontFamily: font.font.family,
      fontWeight: font.typography.h6.regular.fontWeight,
      lineHeight: font.typography.h6.medium.lineHeight,
      fontStyle: font.typography.h6.medium.fontStyle,
      fontSize: font.typography.h6.medium.fontSize,
      color: token.text.description_01,
    },
  };

  return (
    <div className={styles.container} style={{ ...style }}>
      <div className={styles.headerContainer}>
        <p className={styles.titleText}>{title}</p>
        {icon && <span className={styles.titleText}>{icon}</span>}
      </div>
      <div>
        <span className={styles.spanPrefix}>{content}</span>
        <span className={styles.spanPostfix}>{additonalContent}</span>
      </div>
    </div>
  );
};

export default ContactCard;
