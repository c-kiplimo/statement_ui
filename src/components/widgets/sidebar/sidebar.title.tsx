import { ReactNode } from 'react'
import styles from './sidebar.title.module.css'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
type SiderBarTitleProp = {
    icon: StaticImport
    title: string
    description: string
    opened?: boolean
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const SiderBarTitle = ({ icon, title, description, opened = false, onClick }: SiderBarTitleProp) => {
    let alt = `${title} ${description}`;
    return (
        <div className={styles.siderTitle} onClick={onClick}>
            <Image alt={alt} width={40} height={40} src={icon} />
            {opened &&
                <div className={styles.siderTitleText}><span className='h6l mr-2'>{title}</span> <span className='h5b'>{description}</span></div>
            }
        </div>
    )
}