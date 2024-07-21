import Button from "@/src/components/atoms/buttons/button";
import { PlusOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

type UserBtnProps = {
  onClick: (e: any) => void;
  buttonStyles?: CSSProperties;
};

const AddUserButton = ({ onClick, buttonStyles }: UserBtnProps) => {
  return (
    <Button onClick={onClick} buttonStyle={buttonStyles!}>
      <Button.Icon>
        <PlusOutlined/>
      </Button.Icon>
      <Button.Text title="Add User" />
    </Button>
  );
};
export default AddUserButton;