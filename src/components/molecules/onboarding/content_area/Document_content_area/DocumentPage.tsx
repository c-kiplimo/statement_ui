"use client";
import React, { useEffect, useState } from "react";

import IndividualDocuments from "../individualDocuments";

import IdentifyVerification from "../identifyVerification";

import UploadPassportPhoto from "../uploadPassportPhoto";

import DocumentFinalSubmission from "../documentFinalSubmission";
import StepD from "../steplast";

const initialFormData = {};

const stepsArray = ["A", "B", "C", "D"];

const DocumentPage = (props: any, { showStepNumber }: any) => {
  const [step, setStep] = useState("A");
  const [formData, setFormData]: any = useState(initialFormData);

  const handleNextStep = () => {
    if (step === "A") setStep("B");
    else if (step === "B") setStep("C");
    else if (step === "C") setStep("D");
  };

  const handlePrevStep = () => {
    if (step === "D") setStep("C");
    else if (step === "C") setStep("B");
    else if (step === "B") setStep("A");
  };

  const handleChangeInput = (event: any) => {
    const fieldName = event.target.name;
    let fieldValue;

    if (fieldName === "agreeToTerms") {
      fieldValue = event.target.checked;
    } else if (event.target.type === "file") {
      fieldValue = event.target.files[0];
    } else {
      fieldValue = event.target.value;
    }

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  const handleSubmitFormData = () => {
    setStep("Final");
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const renderTopStepNumbers = () => {
    if (!showStepNumber || step === "Final") {
      return null;
    }
    return (
      <section className="mt-2 mb-4 flex justify-between">
        {stepsArray.map((item) => (
          <div
            key={item}
            className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer ${
              item === step ? "bg-blue-500" : ""
            }`}
            onClick={() => setStep(item)}
          >
            {item}
          </div>
        ))}
      </section>
    );
  };

  return (
    <div style={{ fontSize: "12px" }} className="w-[400px]">
      {renderTopStepNumbers()}

      {step === "A" ? (
        <IndividualDocuments
          formData={formData}
          handleChangeInput={handleChangeInput}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "B" ? (
        <IdentifyVerification
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "C" ? (
        <UploadPassportPhoto
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
      {step === "Final" ? <DocumentFinalSubmission /> : null}
    </div>
  );
};

export default DocumentPage;
