"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import DeactivateUser from "../(protected)/user-management/users/(selectedOption)/(deactivateUser)/deactivate.user";
import { Modal } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const Dev = () => {
  const [openModal, setOpenModal] = useState(true);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Modal
        open={openModal}
        onCancel={handleModalClose}
        footer={false}
        width={600}
      >
        <DeactivateUser
          onCancel={() => {}}
          firstName={"Abia"}
          lastName={"Mbambazi"}
          email={"abiambambazi@gmail.com"}
          mobileNumber={"0701020304"}
          userGroups={[
            {
              id: "1",
              name: "Account manager",
              icon: <TeamOutlined />,
              description: "Realated to accounts",
            },
          ]}
          handleOk={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Modal>
    </Fragment>
  );
};

export default withContainer(Dev);
