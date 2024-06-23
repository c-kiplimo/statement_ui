"use client";
import React, {Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Dev = () => {
  
  return (
  
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
      <div style={{width:'100%'}}>
      </div>
      </QueryClientProvider>
      <QueryClientProvider client={queryClient}>
      <div style={{width:'100%'}}>
      </div>
      </QueryClientProvider>
    </Fragment>
  );
};

export default withContainer(Dev);
