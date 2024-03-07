"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import RecentTransactionItem from "@/src/components/widgets/recent-Transaction-Item/recent.transaction.item";
import { SpotifyOutlined } from "@ant-design/icons";

const Dev = () => {
 
  return (
    <Fragment>
     <div>
        <RecentTransactionItem
          title="Spotify"
          date="21 Dec, 2023"
          amount="-49.00"
          icon={<SpotifyOutlined/>}
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);
