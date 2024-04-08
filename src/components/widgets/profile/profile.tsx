import React, { CSSProperties, ReactNode, useState } from "react";
import styles from "./profile.module.css";
import Stepper from "../../atoms/navigation/stepper/stepper";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import SelectionItem from "../selectionItem/selectionItem";

type ProfileProps = {
  profileSteps: { title: string }[];
  header: string;
  headerDesc?: string;
  cardData: {
    id: number;
    icon: ReactNode;
    CardTitle: string;
    CardDescription: string;
  }[];
};

const Profile = ({
  profileSteps,
  header,
  headerDesc,
  cardData,
}: ProfileProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Profile.Stepper
          currentStep={currentStep}
          steps={profileSteps}
          onStepChange={handleStepChange}
        />
        <div className={styles.body}>
          <div className={styles.header}>
            <Profile.Header
              title={header}
              description={headerDesc}
              titleStyle={{ fontWeight: "700", fontSize: "20px" }}
            />
          </div>

          {cardData.map((data, index) => (
            <div key={index} className={styles.logCard}>
              <SelectionItem
                id={data.id.toString()}
                icon={data.icon}
                text={data.CardTitle}
                textDesc={data.CardDescription}
                activeCardId={selectedOption}
                onClick={() => handleOptionChange(data.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

type StepProps = {
  currentStep: number;
  steps: { title: string }[];
  onStepChange: (step: number) => void;
};
Profile.Stepper = ({ currentStep, steps, onStepChange }: StepProps) => {
  return (
    <Stepper steps={steps} current={currentStep} onChange={onStepChange} />
  );
};

type HeaderProps = {
  title: string;
  titleStyle?: CSSProperties;
  description?: string;
  descStyle?: CSSProperties;
};
Profile.Header = ({
  title,
  titleStyle,
  description,
  descStyle,
}: HeaderProps) => {
  return (
    <VerticalInfoDescription
      title={title}
      titleStyle={titleStyle}
      description={description}
      descriptionStyle={descStyle}
    />
  );
};
