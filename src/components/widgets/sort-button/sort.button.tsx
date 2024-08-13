import { FilterOutlined } from "@ant-design/icons";
import Button from "@/src/components/atoms/buttons/button";
import { CSSProperties } from "react";

type SortButtonProps = {
  onClick: (e: any) => void;
  buttonStyles?: CSSProperties;
};

const SortButton = ({ onClick, buttonStyles }: SortButtonProps) => {
  return (
    <Button onClick={onClick} buttonStyle={buttonStyles!}>
      <Button.Icon>
        <img src="/sort.svg" width={12} height={12}/>
      </Button.Icon>
      <Button.Text title="Sort" />
    </Button>
  );
};
export default SortButton;
