import Button from "@/src/components/atoms/buttons/button";
import { PlusOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

type PermissionButtonProps = {
  onClick: (e: any) => void;
  buttonStyles?: CSSProperties;
};

const PermissionButton = ({ onClick, buttonStyles }: PermissionButtonProps) => {
  return (
    <Button onClick={onClick} buttonStyle={buttonStyles!}>
      <Button.Icon>
        <PlusOutlined/>
      </Button.Icon>
      <Button.Text title="Add Permission" />
    </Button>
  );
};
export default PermissionButton;
