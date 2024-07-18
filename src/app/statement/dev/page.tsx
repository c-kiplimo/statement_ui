"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import SuccessModal from "@/src/components/widgets/success-widget/success";
import { CheckOutlined, WarningOutlined } from "@ant-design/icons";
import FailureModal from "@/src/components/widgets/failure-widget/failure";

const Dev = () => {
  return (
    <Fragment>
      {/* <SuccessModal>
        <SuccessModal.Icon><CheckOutlined /></SuccessModal.Icon>
        <SuccessModal.title title="Group Created Successfully"/>
        <SuccessModal.description description="The group Financial Managers has been successfully created"/>
        
      </SuccessModal> */}

<FailureModal>
          <FailureModal.Icon>
            <img src={'/warning.svg'} width={56} height={56} alt='warning'/>
          </FailureModal.Icon>
          <FailureModal.title title="Group Creation Failed"/>
          <FailureModal.description description="An error occurred while creating the group. Please try again later"/>
        </FailureModal>
    </Fragment>
  );
};

export default withContainer(Dev);