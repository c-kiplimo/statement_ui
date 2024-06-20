import { ReactNode } from "react";

export declare type SideNavItem = {
  rootPath?: string;
  title: string;
  path: string;
  icon?: ReactNode;
  opened: boolean;
  disabled?:boolean,
  hasSubMenu?: boolean;
  submenuItems?: SideNavItem[];
};

export declare type SideNavMenu = {
  section: string;
  menu?: SideNavItem[];
};

export type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};
