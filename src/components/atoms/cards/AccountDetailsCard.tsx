import React from 'react';
import { useTokens } from '@/src/app/(context)/ColorContext';
import { HiOutlineUsers } from 'react-icons/hi';

interface CardProps {
  title: string;
  content: string;
  additonalContent?: string;
  icon?: React.ReactElement;
  style?: React.CSSProperties;
}

const AccountDetailsCard: React.FC<CardProps> = ({
  title,
  content,
  style,
  icon,
  additonalContent,
}) => {
  const token = useTokens();
  return (
    <div style={{ ...styles.card, ...style }}>
      <div style={styles.all}>
        <div style={styles.iconContainer}>
          <div style={styles.icon}>{icon || <HiOutlineUsers />}</div>
        </div>
        <div>
          <div style={styles.header}>
            <h3>{title}</h3>
          </div>
          <p style={styles.content}>{content}</p>
          {additonalContent && (
            <p style={styles.additionalContent}>{additonalContent}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  iconContainer: {
    flexShrink: 0,
  },
  icon: {
    margin: '1px',
    padding: '8px',
    fontSize: '24px',
    color: 'white',
    background: 'black',
    borderRadius: '50%',
  },
  additionalContent: {
    fontSize: '14px',
    fontWeight: 'normal',
    margin: '0px',
  },
  content: {
    fontWeight: 'normal',
    color: 'grey',
  },
  all: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
};

export default AccountDetailsCard;
