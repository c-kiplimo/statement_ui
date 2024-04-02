"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Accountsetup from "@/src/components/widgets/accountsetup/accountsetup";
import { SearchOutlined } from "@ant-design/icons";

const Dev = () => {
  return (
    <Fragment>
      <main>
        {
          <Accountsetup
            title={"Provide Account Details"}
            instruction={
              "Setup te customer by using account number or customer number"
            }
            option={"Do you want to search by ?"}
            icon={<SearchOutlined/>}
            account={"Account Number"}
            customer={"Customer Number"}
          />
        }
      </main>
    </Fragment>
  );
};

export default withContainer(Dev);
