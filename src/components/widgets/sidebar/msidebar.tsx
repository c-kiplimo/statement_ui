'use client'
import Link from 'next/link'
import { DropDownIcon } from './custom.icon'
import styles from '@/src/components/widgets/sidebar/sidebar.module.css'
import {useState } from 'react'
import classNames from 'classnames/bind'
import simbaPic from '@/src/components/widgets/sidebar/simbaportallogo.svg'
import { SideNavItem, SideNavMenu } from '@/src/types/sidebar.types'
import { SiderBarTitle } from './sidebar.title'
import { usePathname } from 'next/navigation' 


type SideBarProp = {
    items: SideNavMenu[]
}
export const MulaPaySideBar = (props: SideBarProp) => {
    const [opened, setOpened] = useState(true)
    

    const cx = classNames.bind(styles);

    const className = cx('sidebar', ['bodyb'], { 'opened': opened, 'closed': !opened });

    const onOpened = (e: React.MouseEvent) => {
        setOpened(!opened)
    }

    return (
        <>
            <div className={className}>

                <SiderBarTitle opened={opened} title='Simba' description='Portal' icon={simbaPic} onClick={onOpened} />
                <div className={styles.menucontainer}>
                    {
                        props.items.map(sect => {
                            return <div key={sect.section}>
                                {opened &&
                                    <p className={styles.section}>{sect.section}</p>
                                }
                                {
                                    sect.menu?.map(menus => {
                                        return <MulaPaySideBar.Item key={menus.path} {...menus} />
                                    })
                                }
                            </div>

                        })
                    }
                </div>

            </div >
        </>
    )
}





MulaPaySideBar.Item = (item: SideNavItem) => {
    const [opened, setOpened] = useState(false)
    const cx = classNames.bind(styles);
    const currentPath = usePathname()
    const isActive = currentPath === item.path 
    const className = cx('sublink', { 'sublinkOpen': opened, 'closed': !opened });
    function clicked(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setOpened(!opened)
    }
    return (
        <>
            <div className={`${isActive ? styles.menuActive : styles.menuLink}`}>
                <div className={`${isActive ? styles.activeicon: styles.menuIcon}`}>
                    {item.icon}
                </div>
                <div className={`${styles.menuText} ${styles.withSublink}  bodyr`} onClick={clicked}>
                    <div className={styles.mainMenuText}>
                        {item.hasSubMenu ? <p> {item.title}</p> : <Link className={`${isActive ? styles.linkActive : styles.tag}`} href={item.path}>{item.title}</Link>}

                        {
                            item.hasSubMenu && (
                                <DropDownIcon width={16} height={8} />
                            )
                        }

                    </div >
                    {
                        item.hasSubMenu && opened! && (
                            <div className={className}>
                                {item.submenuItems?.map(links => {
                                    return <Link key={links.title} href={links.path}>{links.title}</Link>
                                })}
                            </div>
                        )
                    }
                </div >
            </div >
        </>

    )
}



