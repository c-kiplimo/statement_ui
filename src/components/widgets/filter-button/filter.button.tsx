import { FilterOutlined } from "@ant-design/icons";
import Button from "@/src/components/atoms/buttons/button";
import { CSSProperties } from "react";

type FilterButtonProps = {
  onClick: (e: any) => void;
  buttonStyles?: CSSProperties;
};

const FilterButton = ({ onClick, buttonStyles }: FilterButtonProps) => {
  return (
    <Button onClick={onClick} buttonStyle={buttonStyles!}>
      <Button.Icon>
        <FilterOutlined />
      </Button.Icon>
      <Button.Text title="Filter" />
    </Button>
  );
};
export default FilterButton;
