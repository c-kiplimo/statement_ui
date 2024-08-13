import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "@/src/components/atoms/buttons/button";
import { CSSProperties } from "react";

type AddRestrictionButtonProps = {
  onClick: (e: any) => void;
  buttonStyles?: CSSProperties;
};

const AddRestrictionButton = ({ onClick, buttonStyles }: AddRestrictionButtonProps) => {
  return (
    <Button onClick={onClick} buttonStyle={buttonStyles!}>
      <Button.Icon>
        <PlusOutlined size={12}/>
      </Button.Icon>
      <Button.Text title="Add Restriction" />
    </Button>
  );
};
export default AddRestrictionButton;
