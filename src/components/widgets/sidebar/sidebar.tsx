"use client"
import { SideNavItemsData } from "@/src/constants/siderbar.docs"
import styles from "./sidebar.module.css"
import { SideNavItem } from "@/src/types/sidebar.types"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

import classNames from 'classnames/bind';

import { DropDownIcon } from "./custom.icon"

const cx = classNames.bind(styles)

export const SiderBar = () => {
    return (
        <div className={styles.container}>
            <SiderBar.MenuItems />
        </div>
    )
}


SiderBar.MenuItems = () => {

    return (
        <div className={styles.menuitems}>
            {
                SideNavItemsData.map((item, idx) => {
                    // add command 
                    return <div className={styles.menuitems}>
                        <p className={`${styles.header} bb1`}>{item.section}</p>
                        {
                            item.menu?.map((menuItem, idx) => {
                                return <SiderBar.MenuItem key={idx} item={menuItem} />
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}

SiderBar.MenuItem = ({ item }: { item: SideNavItem }) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false)
    const [active, setActive] = useState(false)

    const clasName = classNames.bind(styles);

    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen)
    }

    const activateLink = () => {
        setSubMenuOpen(!subMenuOpen)
    }
    return (
        <div className={styles.menuItem}>

            <SiderBar.LinkItem item={item} pathName={pathname} onClick={toggleSubMenu} sideMenuOpen={subMenuOpen} />
            {subMenuOpen && (
                <div className={styles.submenuItems}>
                    {item.submenuItems?.map((subItem, idx) => {
                        return (
                            <Link key={idx}
                                href={subItem.path}
                                className={clasName('link', {
                                    'active': item.path == pathname,
                                    'bodyl': item.hasSubMenu,
                                    "sublink": item.hasSubMenu
                                })}>
                                <span className={`${styles.linkText} bodyl`}>{subItem.title}</span>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div >

    )
}


SiderBar.LinkItem = ({ item, pathName, sideMenuOpen, onClick }: { item: SideNavItem, pathName: string, sideMenuOpen: boolean, onClick?: (e: any) => void }) => {
    const cx = classNames.bind(styles);
    return (
        <>
            {
                item.hasSubMenu ? (
                    <div
                        className={
                            cx('link', {
                                'active': item.path == pathName,
                                'br1': true
                            })
                        } onClick={onClick} >

                        <div className={styles.link}>
                            {item.icon}
                            <span className={styles.linkText}>{item.title}</span>
                        </div>
                        <div className={
                            cx({
                                "subMenuOpen": sideMenuOpen,
                                "menuDropDown": "menuDropDown"
                            })
                        }>
                            <DropDownIcon width={16} height={8} />
                        </div>

                    </div >
                ) : <Link
                    href={item.path}
                    className={
                        cx('link', {
                            'active': item.path == pathName,
                            'bodyr': true
                        })
                    }>

                    <div className={styles.linkText}>
                        {item.icon}
                        <span className={styles.linkText}>{item.title}</span>
                    </div>
                </Link >
            }
        </>
    )
}


type LinkItemsProp = {
    item: SideNavItem,
    pathName: string,
    sideMenuOpen: boolean,
    onClick?: (e: any) => void
}


SiderBar.LinkItems = (props: LinkItemsProp) => {
    const cx = classNames.bind(styles);
    const { item, pathName, sideMenuOpen, onClick } = props;
    return (
        <>
            {
                item.hasSubMenu ? (
                    <div
                        className={
                            cx('link', {
                                'active': item.path == pathName,
                                'br1': true
                            })
                        } onClick={onClick} >

                        <div className={styles.link}>
                            {item.icon}
                            <span className={styles.linkText}>{item.title}</span>
                        </div>
                        <div className={
                            cx({
                                "subMenuOpen": sideMenuOpen,
                                "menuDropDown": "menuDropDown"
                            })
                        }>
                            <DropDownIcon width={16} height={8} />
                        </div>

                    </div >
                ) : <Link
                    href={item.path}
                    className={
                        cx('link', {
                            'active': item.path == pathName,
                            'bodyr': true
                        })
                    }>

                    <div className={styles.linkText}>
                        <div>
                            {item.icon}
                        </div>
                        <div>
                            <span className={styles.linkText}>{item.title}</span>
                        </div>
                    </div>
                </Link >
            }
        </>
    )
}







