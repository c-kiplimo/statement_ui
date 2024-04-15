import Modal from "@/src/components/widgets/modals/modal";
import CompoundIndividualBusinessBtn from "@/src/components/atoms/navigation/compound-individual-business-btn";
import IconButton from "@/src/components/atoms/navigation/CustomerOnboardingButton";
import { useActiveStep } from "@/src/app/(context)/ActiveStepContext";
import { useTokens } from "@/src/app/(context)/ColorContext";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { SEARCH_CUSTOMER_URL } from "../../../../../constants/environment";
import { onBoardingHandler } from "@/src/services/auth/onboarding.service";

const CustomerUserDetails = ({ onModalClose, onModalData, props }: any) => {
  const token = useTokens();
  const { searchCustomerService } = onBoardingHandler();
  const [showModal, setShowModal] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("kenya");
  const [searchType, setSearchType] = useState("ACCOUNT_NUMBER");

  const openModalHanlder = () => {
    setShowModal(true);
  };

  const closeModalHanlder = () => {
    setShowModal(false);
    onModalClose(accountNumber);
  };

  const formSubmitHandler = async () => {
    if (accountNumber === "") {
      alert("Please fill all inputs");
    } else {
      try {
        const URL = `${SEARCH_CUSTOMER_URL}${searchType}/${accountNumber}/${selectedCountry}`;
        const result = await searchCustomerService(URL);
        console.log("result", result);
        alert("Successful form submit");
        setShowModal(false);
        setAccountNumber("");
        onModalData(accountNumber);
        // Process the result if needed
      } catch (error) {
        // Handle the error
        console.error("API call failed:", error);
        // Show an appropriate error message to the user
      }
    }
  };

  return (
    <>
      <CompoundIndividualBusinessBtn text="What Type of user are you?">
        <Fragment>
          <IconButton
            width="360px"
            onClick={openModalHanlder}
            href="/authentication/customer"
            ButtonStyles={ButtonStyles}
            primaryColor={token?.brand?.primary}
            secondaryColor={token?.text?.description_01}
            descriptionColor={token?.text?.description_02}
            borderSecondaryColor={token?.border?.primary}
            defaultWhitColor={token?.default?.white}
            iconColor={token?.brand.primary}
            textColor={token?.text?.secondary}
            leftIcon={
              <Image
                src="/user_icon.svg"
                alt="Individual Icon"
                width="40"
                height="40"
              />
            }
            buttonText="Customer Number"
            buttonDescription="View statements"
          />
          <IconButton
            width="360px"
            onClick={openModalHanlder}
            href="/authentication/customer"
            ButtonStyles={ButtonStyles}
            primaryColor={token.brand.primary}
            secondaryColor={token.text.description_01}
            descriptionColor={token.text.description_02}
            borderSecondaryColor={token?.brand?.primary}
            defaultWhitColor={token?.background?.primary}
            iconColor={token.brand.primary}
            textColor={token.text.secondary}
            leftIcon={
              <Image
                src="/user_icon.png"
                alt="Business Icon"
                width="40"
                height="40"
              />
            }
            rightIcon={
              <Image
                src="/Vector.svg"
                alt="individual Icon"
                width={14}
                height={14}
              />
            }
            buttonText="Account Number"
            buttonDescription="Manage coporate users"
          />
        </Fragment>
      </CompoundIndividualBusinessBtn>

      <Modal
        isOpen={showModal}
        onDismiss={closeModalHanlder}
        title="PROVIDE DETAILS"
      >
        <div className="my-4 w-[695px] max-w-full">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-6"
          >
            <p style={{ color: token.text.secondary }}>
              On board to any country of your choice{" "}
            </p>
            <div className="flex flex-col justify-center items-start gap-3">
              <label style={{ color: token.text.secondary }}>
                Which country
              </label>
              <select
                className="w-full outline-none border-2 border-gray-200 focus:border-grey-600 px-4 py-2 rounded-md"
                value={selectedCountry}
                onChange={(event) => setSelectedCountry(event.target.value)}
                name="country"
              >
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Rwanda">Rwanda</option>
              </select>
            </div>
            <p style={{ color: token.text.secondary }}>
              Provide Account Number to get started{" "}
            </p>
            <div className="flex flex-col justify-center items-start gap-3">
              <label style={{ color: token.text.secondary }}>
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter your Account Number   "
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
                className="w-full outline-none border-2 border-gray-200 focus:border-grey-600 px-4 py-2 rounded-md"
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                style={{ backgroundColor: "var(--brand-brand-primary)" }}
                className="px-9 py-2 bg-green-900 text-white rounded-sm"
                type="submit"
                onClick={() => formSubmitHandler()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
const ButtonStyles = {};

export default CustomerUserDetails;
