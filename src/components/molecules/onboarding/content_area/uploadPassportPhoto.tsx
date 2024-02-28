"use client";

import GreenTextWithAtick from "@/src/components/atoms/typography/green_text_with_atick";
import Image from "next/image";
import { useTokens } from "@/src/app/(context)/ColorContext";

const UploadPassportPhoto = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
  handleSubmitFormData,
}: any) => {
  const token = useTokens();
  return (
    <div>
      <div
        style={{
          color: "#120E49",
          fontFamily: "Roboto",
          fontSize: "20px",
          textAlign: "center",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "32px",
        }}
        className="mt-2 text-md text-blue-900"
      >
        Upload passport photo
        <h1
          style={{
            color: "#28273B",
            fontSize: "16px",
            fontStyle: "normal",
            textAlign: "center",
            marginTop: "32px",
            marginBottom: "25px",
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          OR Take a selfie photo
        </h1>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "1px",
            flexDirection: "column",
            width: "100%",
            marginTop: "4px",
          }}
        >
          <div className="w-full flex justify-center mb-8 text-cente">
            <Image
              className="text-center"
              alt="img"
              width={100}
              height={200}
              src="/passport189.svg"
            />
          </div>
          <GreenTextWithAtick
            isSuccess="true"
            text="Upload a passport photo of your self with a neutral expression"
          />
          <GreenTextWithAtick
            isSuccess="true"
            text="Make sure your whole face is visible, centred and your eyes are open"
          />
          <GreenTextWithAtick
            isSuccess="true"
            text="Use enough lighting if taking selfie"
          />
          <GreenTextWithAtick text="Do not crop your ID or use screenshots of your ID" />
          <GreenTextWithAtick text="Do not hide or alter parts of your face (No hats, Beauty images, Filters, Headgear) " />
          <GreenTextWithAtick text="Avoid wearing hats,  avoid using filter, avoid wearing glasses" />
        </div>

        <p className="p-4  text-primary">
          File size must be between 10KB and 5120 KB in jpg/ png format.
        </p>

        <div className="w-full text-center">
          <label htmlFor="fileInput" className="file-input-label">
            <div
              style={{ background: token.background.secondary }}
              className="file-input-card mt-6"
            >
              <input
                accept="image/*"
                name="frontPhoto"
                onChange={handleChangeInput}
                type="file"
                id="fileInput"
                style={{ display: "none" }}
              />

              <div className="text-center">
                <div className="icon-center  mt-3">
                  <Image src="/Camera.svg" alt="img" width={20} height={20} />
                </div>
                <label htmlFor="fileInput" className="custom-file-input">
                  Take a selfie
                </label>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="my-2 flex gap-1 items-center">
        <button
          className="bg-transparent mt-2 text-black px-2 py-1 rounded"
          onClick={handlePrevStep}
        >
          Prev
        </button>
        <button
          style={{ backgroundColor: "var(--brand-brand-primary)" }}
          className="bg-primary w-full mt-5 h-6 text-white ml-2 px-2 py-1 rounded"
          onClick={handleSubmitFormData}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default UploadPassportPhoto;
