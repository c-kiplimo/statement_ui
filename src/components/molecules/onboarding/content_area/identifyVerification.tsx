"use client";
import Card from "@/src/components/atoms/navigation/card/card_with_icon_image_text";
import GreenTextWithAtick from "@/src/components/atoms/typography/green_text_with_atick";
import Image from "next/image";
import { useTokens } from "@/src/app/(context)/ColorContext";

const IdentifyVerification = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}: any) => {
  const token = useTokens();
  return (
    <div>
      <h1
        style={{
          color: "#120E49",
          fontFamily: "Roboto",
          fontSize: "20px",
          marginBottom: "24px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "32px",
        }}
        className="mt-2 text-md text-blue-900"
      >
        Identity Verfication
      </h1>

      <div>
        <label
          style={{
            color: "#28273B",
            fontSize: "16px",
            fontStyle: "normal",
            marginTop: "32px",
            marginBottom: "32px",
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          Upload image of your ID card
        </label>

        <Card
          imageA="/identity1.png"
          imageB="/identity2.png"
          imageC="/identity3.png"
          imageD="/identity4.png"
          iconXforA={
            <Image src="/check-circle.svg" alt="img" width={20} height={20} />
          }
          iconXforB={
            <Image
              src="/steps-item-icon.svg"
              alt="img"
              width={20}
              height={20}
            />
          }
          iconXforC={
            <Image
              src="/steps-item-icon.svg"
              alt="img"
              width={20}
              height={20}
            />
          }
          iconXforD={
            <Image
              src="/steps-item-icon.svg"
              alt="img"
              width={20}
              height={20}
            />
          }
          textA="Good"
          textB="Not Cut"
          textC="Not Blurry"
          textD="Not Reflective"
          iconXPosition="right"
        />

        <div
          style={{
            display: "flex",
            gap: "1px",
            flexDirection: "column",
            width: "100%",
            marginTop: "4px",
          }}
        >
          <GreenTextWithAtick isSuccess="true" text="Government-Issued" />
          <GreenTextWithAtick
            isSuccess="true"
            text="Original full-size, unedited documents"
          />
          <GreenTextWithAtick
            isSuccess="true"
            text="Place documents against a single coloured background"
          />

          <GreenTextWithAtick
            isSuccess="true"
            text="Readable, well-lit, coloured images"
          />

          <GreenTextWithAtick text="No black and white images" />
          <GreenTextWithAtick text="No edited or expired images" />
        </div>

        <div className="id-photo-upload flex mb-6 gap-10">
          <div className="w-full text-center">
            <label htmlFor="fileInput" className="file-input-label">
              <div
                style={{ background: token.background.secondary }}
                className="file-input-card mt-6"
              >
                <input
                  name="frontPhoto"
                  accept="image/*"
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
                    Upload Front page
                  </label>
                </div>
              </div>
            </label>
          </div>
          <div className="w-full text-center">
            <label htmlFor="fileInput" className="file-input-label">
              <div
                style={{ background: token.background.secondary }}
                className="file-input-card mt-6"
              >
                <input
                  name="backPhoto"
                  accept="image/*"
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
                    Upload Back page
                  </label>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="my-2 flex  gap-1 items-center">
        <button
          className="bg-transparent  mt-2 text-black px-2 py-1 rounded"
          onClick={handlePrevStep}
        >
          Prev
        </button>
        <button
          style={{ backgroundColor: "var( --brand-brand-primary)" }}
          className="bg-primary w-full mt-2 h-6 text-white ml-2 px-2 py-1 rounded"
          onClick={handleNextStep}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default IdentifyVerification;
