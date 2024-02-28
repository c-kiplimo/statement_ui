import styles from "@/src/components/atoms/cards/card.header.m1.module.css";

interface CardProps {
  title: string;
  description: string;
  content?: string;
  additonalContent?: string;
  icon?: React.ReactElement;
  style?: React.CSSProperties;
}
const CardDescItem = ({ icon, title, description, style }: CardProps) => {
  return (
    <div className={styles.container} style={{ ...styles }}>
      <div className={styles.iconBody}>{icon}</div>
      <div>
        <p className={styles.titleText}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default CardDescItem;
