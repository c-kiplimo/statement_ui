"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import RegisterUserForm from "@/src/components/widgets/user-management/form-content/registerUserForm";
import ReusableModal from "@/src/components/widgets/user-management/modal/modal";
import { Button } from "antd";

const Dev = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("Clicked OK");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Clicked Cancel");
    setIsModalVisible(false);
  };
  return (
    <Fragment>
      <div>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <ReusableModal
          visible={isModalVisible}
          title="Remove User"
          titleDesc="Are you sure you want to delete this user?"
          onConfirm={handleOk}
          confirmButtonStyles={{
            border: "2px solid var(--functional-colors-danger)",
            background: "var(--functional-colors-danger)",
          }}
          cancelButtonStyles={{
            border: "2px solid var(--functional-colors-danger)",
            background: "var(--functional-colors-danger)",
          }}
          onCancel={handleCancel}
          confirmText={"Yes"}
          cancelText={"No"}
          confirmLoading={true}
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);
