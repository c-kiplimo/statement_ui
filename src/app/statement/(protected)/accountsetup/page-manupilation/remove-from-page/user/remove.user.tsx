import React from "react";
import Removeruser from "../../../widgets/add-remove/remover.form";
import { CloseOutlined } from "@ant-design/icons";
const RemoveUser = () => {

  interface RemoveProps {
    header: string;
    description: string;
    optn1: string;
    optn2: string;
    closeIcon: React.ReactNode;
    onCancel: () => void; 
  }
  
  return (
    <div className="container">
      <Removeruser
        header={"Remove User"}
        description={"Are you Sure you want to delete this User?"}
        optn1={"No"}
        optn2={"Yes"}
        closeIcon={<CloseOutlined />} onClose={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
};

export default RemoveUser;
