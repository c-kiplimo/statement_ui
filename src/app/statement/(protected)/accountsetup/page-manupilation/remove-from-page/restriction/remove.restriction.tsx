import React, { FC, useState } from "react";
import Removeruser from "../../../widgets/add-remove/remover.form";
import styles from "./remove.restriction.module.css";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios"; 
import { DELET_URL } from "@/src/constants/environment";

interface RemoveRestrictionProps {
  visible: boolean;
  onCancel: () => void;
}

const RemoveRestriction: FC<RemoveRestrictionProps> = ({
  visible,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveRestriction = () => {
    setLoading(true);
    
    axios.delete(DELET_URL)
      .then(response => {
        
        console.log("Restriction removed successfully");
        onCancel(); 
      })
      .catch(error => {
        console.error("Error removing restriction:", error);
        setLoading(false);
      });
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className="container">
          <Removeruser
            header={"Remove Restriction"}
            description={"Are you sure you want to delete this restriction?"}
            optn1={"No"}
            optn2={"Yes"}
            closeIcon={<CloseOutlined onClick={onCancel} />}
            onClose={onCancel}
            onSubmit={handleRemoveRestriction}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default RemoveRestriction;
