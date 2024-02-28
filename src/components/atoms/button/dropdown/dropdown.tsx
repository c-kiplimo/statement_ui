import { MenuProps, Button, Space, Dropdown } from "antd";
import React, { CSSProperties, ReactNode } from "react";

type DropdownButtonProps = {
  onClick: MenuProps["onClick"];
  styles?: {
    buttonStyles: CSSProperties;
  };
  items: MenuProps["items"];
  icon: ReactNode;
  text: string;
};

const DropdownButton = (props: DropdownButtonProps) => {
  return (
    <Dropdown menu={{ items: props.items, onClick: props.onClick }}>
      <Button style={props.styles?.buttonStyles}>
        <Space>
          {props.text}
          {props.icon}
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropdownButton;
