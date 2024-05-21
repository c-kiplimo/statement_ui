// pages/index.tsx
"use client"

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Steps } from 'antd';

const { Step } = Steps;

// Interface for form state
interface FormState {
  country: string;
  accountNumber: string;
  user: any; // Update 'any' with your user type
}

// Context to manage form state
const FormContext = React.createContext<[FormState, React.Dispatch<React.SetStateAction<FormState>>]>([{
  country: '',
  accountNumber: '',
  user: null,
}, () => {}]);

// Step 1 Component
const Step1: React.FC<{ setStep: (step: number) => void }> = ({ setStep }) => {
  const [formData, setFormData] = useContext(FormContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSearchError(false);
  };

  const searchUser = async () => {
    try {
      const response = await axios.get('/api/user', {
        params: {
          country: formData.country,
          accountNumber: formData.accountNumber,
        },
      });
      // Assuming response.data contains user info
      if (response.data) {
        setFormData({ ...formData, user: response.data });
        setSearchError(false);
        closeModal();
        // Move to Step 2 when user is found
        formData.user && setStep(1);
      } else {
        setSearchError(true);
      }
    } catch (error) {
      console.error('Error searching user:', error);
      setSearchError(true);
    }
  };

  return (
    <div>
      <h2>Step 1: Select Option and Search</h2>
      <button onClick={openModal}>Open Modal</button>
      {modalOpen && (
        <div>
          <div>Modal Content</div>
          <button onClick={searchUser}>Search</button>
          {searchError && <p>Error: User not found. Please try again.</p>}
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

// Step 2 Component
const Step2: React.FC = () => {
  const [formData] = useContext(FormContext);

  return (
    <div>
      <h2>Step 2: Verify Identity</h2>
      {formData.user ? (
        <p>Account found for {formData.user.name}. Please verify your identity.</p>
      ) : (
        <p>No user found. Please go back to Step 1 and search again.</p>
      )}
    </div>
  );
};

// MultiStepForm Component
const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    country: '',
    accountNumber: '',
    user: null,
  });

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <FormContext.Provider value={[formState, setFormState]}>
      <div>
        <Steps current={currentStep}>
          <Step title="Step 1" />
          <Step title="Step 2" />
        </Steps>
        {currentStep === 0 && <Step1 setStep={setStep} />}
        {currentStep === 1 && <Step2 />}
      </div>
    </FormContext.Provider>
  );
};

export default MultiStepForm;
