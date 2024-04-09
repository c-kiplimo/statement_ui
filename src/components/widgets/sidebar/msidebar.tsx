'use client'
import Link from 'next/link'
import { DropDownIcon, LoanStatementIcon, SwiftStatementIcon } from './custom.icon'
import styles from '@/src/components/widgets/sidebar/sidebar.module.css'
import { ReactNode, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames/bind'
import simbaPic from '@/src/components/widgets/sidebar/simbaportallogo.svg'
import { SideNavItem, SideNavMenu } from '@/src/types/sidebar.types'


export const MulaPaySideBar = (props: SideNavMenu) => {
    const [opened, setOpened] = useState(true)

    const cx = classNames.bind(styles);

    const className = cx('sidebar', ['bodyb'], { 'opened': opened, 'closed': !opened });

    const onOpened = (e: any) => {
        setOpened(!opened)
    }

    return (
        <>
            <div className={className}>
                <div className={styles.siderTitle} onClick={onOpened}>
                    <Image alt="Simba Portal" width={40} height={40} src={simbaPic} />
                    {opened &&
                        <div className={styles.siderTitleText}><span className='captionr mr-2'>SIMBA</span> <span>PORTAL</span></div>
                    }
                </div>
                {
                    props.menu?.map(menus => {
                        return <MulaPaySideBar.Item key={menus.path} {...menus} />
                    })
                }
            </div >
        </>
    )
}





MulaPaySideBar.Item = (item: SideNavItem) => {
    const [opened, setOpened] = useState(false)
    const cx = classNames.bind(styles);
    const className = cx('sublink', { 'sublinkOpen': opened, 'closed': !opened });
    //const { opened = true } = item
    function clicked(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setOpened(!opened)
    }
    return (
        <>
            <div className={styles.menuLink}>
                <div className={styles.menuIcon}>
                    {item.icon}
                </div>
                <div className={`${styles.menuText} ${styles.withSublink}  bodyr`} onClick={clicked}>
                    <div className={styles.mainMenuText}>
                        {item.hasSubMenu ? <a> {item.title}</a> : <Link href={item.path}>{item.title}</Link>}

                        {
                            item.hasSubMenu && (
                                <DropDownIcon width={16} height={8} />
                            )
                        }

                    </div>
                    {
                        item.hasSubMenu && opened! && (
                            <div className={className}>
                                {item.submenuItems?.map(links => {
                                    return <Link key={links.title} href={links.path}>{links.title}</Link>
                                })}
                            </div>
                        )
                    }
                </div>
            </div >
        </>

    )
}