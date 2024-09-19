"use client";
import Link from "next/link";
import { DropDownIcon } from "./custom.icon";
import styles from "@/src/components/widgets/sidebar/sidebar.module.css";
import { useState } from "react";
import classNames from "classnames/bind";
import simbaPic from "@/src/components/widgets/sidebar/simbaportallogo.svg";
import { SideNavItem, SideNavMenu } from "@/src/types/sidebar.types";
import { SiderBarTitle } from "./sidebar.title";
import { usePathname } from "next/navigation";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";

type SideBarProp = {
  items: SideNavMenu[];
  onItemClick?: () => void;
};
export const MulaPaySideBar = (props: SideBarProp) => {
  const [opened, setOpened] = useState(true);

  const cx = classNames.bind(styles);

  const className = cx("sidebar", ["bodyb"], {
    opened: opened,
    closed: !opened,
  });

  const onOpened = (e: React.MouseEvent) => {
    setOpened(!opened);
  };

  const { getLoggedInUser } = AuthServiceProvider();
  const data = getLoggedInUser();
  const profileStatus = data.profileComplete!;

  return (
    <>
      <div className={className}>
        <SiderBarTitle
          opened={opened}
          title="Simba"
          description="Portal"
          icon={simbaPic}
          onClick={onOpened}
        />
        <div className={styles.menucontainer}>
          {props.items.map((sect) => {
            return (
              <div key={sect.section}>
                {opened && <p className={styles.section}>{sect.section}</p>}
                {sect.menu?.map((menus) => {
                  const isDisabled =
                  menus.title !== "Settings" && menus.title !== "Log out" && !profileStatus;

                  return (
                      <MulaPaySideBar.Item
                        key={menus.path}
                        {...menus}
                        onItemClick={props.onItemClick!}
                        isDisabled={isDisabled}
                      />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

MulaPaySideBar.Item = (item: SideNavItem & { onItemClick: () => void;isDisabled: boolean }) => {
  const [opened, setOpened] = useState(false);
  const cx = classNames.bind(styles);
  const currentPath = usePathname();
  const isActive = currentPath === item.path;
  const className = cx("sublink", { sublinkOpen: opened, closed: !opened });
  function clicked(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!item.isDisabled) {
      setOpened(!opened);
      item.onItemClick();
    }
  }

  return (
    <>
      <div className={`${isActive ? styles.menuActive : styles.menuLink}`}>
        <div className={`${isActive ? styles.activeicon : styles.menuIcon}`}>
          {item.icon}
        </div>
        <div
        className={`${styles.menuText} ${styles.withSublink} bodyr ${
          item.isDisabled ? styles.disabled : ""
        }`}
        onClick={clicked}
      >
          <div className={styles.mainMenuText}>
          {item.hasSubMenu ? (
            <p>{item.title}</p>
          ) : item.isDisabled ? (
            <span className={styles.disabledText}>{item.title}</span>
          ) : (
            <Link className={`${isActive ? styles.linkActive : styles.tag}`} href={item.path}>
              {item.title}
            </Link>
          )}

            {item.hasSubMenu && <DropDownIcon width={16} height={8} />}
          </div>
          {item.hasSubMenu && opened! && (
            <div className={className}>
              {item.submenuItems?.map((links) => {
                return (
                  <Link key={links.title} href={links.path}>
                    {links.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
