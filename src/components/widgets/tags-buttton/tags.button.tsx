import { FilterOutlined } from "@ant-design/icons";
import Button from "@/src/components/atoms/buttons/button";
import { CSSProperties } from "react";

type TagsButtonProps = {
  onClick?: (e: any) => void;
  buttonStyles?: CSSProperties;
};

const TagsButton = ({ onClick, buttonStyles }: TagsButtonProps) => {
  return (
    <Button onClick={onClick!} buttonStyle={buttonStyles!}>
      <Button.Icon>
        <FilterOutlined/>
      </Button.Icon>
      <Button.Text title="Tags" />
    </Button>
  );
};
export default TagsButton;
