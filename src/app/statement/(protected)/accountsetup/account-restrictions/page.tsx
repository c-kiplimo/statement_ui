"use client";
import React, { Fragment, useEffect, useState } from "react";
import AccountsRictions, { EntriesProps } from "@/src/components/widgets/account-restrictions/restrictions";
import { AllAccountRestrictionsAction } from "@/src/lib/actions/all.restrictions.action";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";


const Dev = () => {
  const [datain, setdatain] = useState<EntriesProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AllAccountRestrictionsAction();
        
        setdatain(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <Fragment>
      <AccountsRictions
        titleName={"Restrictions"}
        addIcon={<img src="/addIcon.svg" alt="addIcon" />}
        filterIcon={<img src="/filterIcon.svg" alt="filterIcon" />}
         restrictionArray={datain}      />
    </Fragment>
  );
};

export default withContainer(Dev);