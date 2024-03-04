import React from 'react'
import styles from './currency.summary.card.module.css'
import Icon from '@ant-design/icons/lib/components/Icon'
import SpecialIcon from '../../atoms/icon/SpecialIcon'
import InfoTitle from '../../atoms/text/entry-info-title'
import VerticalInfoDescription from '../../atoms/text/vertical-info-description'
import SpecialIconContent from '../../atoms/icon/special.icon.content'

const iconItem = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_7679_13000)">
            <path d="M0 0H32V32H0V0Z" fill="white" />
            <path d="M0 0H32V9.6H0V0Z" fill="black" />
            <path d="M0 22.4H32V32H0V22.4Z" fill="#006600" />
            <path d="M11.71 25.5L11.98 25.7L18.985 9.49999C19.39 9.37999 19.615 8.85999 19.84 8.33999C19.99 7.97999 20.59 6.59999 20.845 4.79999C20.1333 5.64317 19.5303 6.63637 19.06 7.73999C18.835 8.25999 18.61 8.77999 18.715 9.31999L11.71 25.5Z" fill="black" stroke="black" stroke-width="0.375" stroke-miterlimit="10" />
            <path d="M11.71 25.5L11.98 25.7L18.985 9.49999C19.39 9.37999 19.615 8.85999 19.84 8.33999C19.99 7.97999 20.59 6.59999 20.845 4.79999C20.1333 5.64317 19.5303 6.63637 19.06 7.73999C18.835 8.25999 18.61 8.77999 18.715 9.31999L11.71 25.5Z" fill="white" />
            <path d="M20.29 25.5L20.02 25.7L13.015 9.49999C12.61 9.37999 12.385 8.85999 12.16 8.33999C12.01 7.97999 11.41 6.59999 11.155 4.79999C11.8667 5.64317 12.4697 6.63637 12.94 7.73999C13.165 8.25999 13.39 8.77999 13.285 9.31999L20.29 25.5Z" fill="black" stroke="black" stroke-width="0.375" stroke-miterlimit="10" />
            <path d="M20.29 25.5L20.02 25.7L13.015 9.49999C12.61 9.37999 12.385 8.85999 12.16 8.33999C12.01 7.97999 11.41 6.59999 11.155 4.79999C11.8667 5.64317 12.4697 6.63637 12.94 7.73999C13.165 8.25999 13.39 8.77999 13.285 9.31999L20.29 25.5Z" fill="white" />
            <path d="M32.025 11.2H18.85C18.4 9.60002 16.9 6.40002 16 6.40002C15.1 6.40002 13.6 9.60002 13.15 11.2H-0.0100098V20.8H13.15C13.6 22.4 15.1 25.6 16 25.6C16.9 25.6 18.4 22.4 18.85 20.8H32.025V11.2Z" fill="#BB0000" />
            <path d="M18.8501 20.8C19.3001 19.2 19.6001 17.6 19.6001 16C19.6001 14.4 19.3001 12.8 18.8501 11.2C18.4001 12.8 18.1001 14.4 18.1001 16C18.1001 17.6 18.4001 19.2 18.8501 20.8Z" fill="black" />
            <path d="M13.1499 20.8C12.6999 19.2 12.3999 17.6 12.3999 16C12.3999 14.4 12.6999 12.8 13.1499 11.2C13.5999 12.8 13.8999 14.4 13.8999 16C13.8999 17.6 13.5999 19.2 13.1499 20.8Z" fill="black" />
            <path d="M15.9999 17.2C16.3313 17.2 16.5999 16.6627 16.5999 16C16.5999 15.3372 16.3313 14.8 15.9999 14.8C15.6685 14.8 15.3999 15.3372 15.3999 16C15.3999 16.6627 15.6685 17.2 15.9999 17.2Z" fill="white" />
            <path d="M16.1499 17.16C16.1499 17.16 16.7499 18.76 16.7499 21.36C16.7499 23.96 16.1499 25.56 16.1499 25.56V17.16Z" fill="white" />
            <path d="M15.8501 14.84C15.8501 14.84 15.2501 13.24 15.2501 10.64C15.2501 8.04003 15.8501 6.44003 15.8501 6.44003V14.84Z" fill="white" />
            <path d="M15.8501 17.16C15.8501 17.16 15.2501 18.76 15.2501 21.36C15.2501 23.96 15.8501 25.56 15.8501 25.56V17.16Z" fill="white" />
            <path d="M16.1499 14.84C16.1499 14.84 16.7499 13.24 16.7499 10.64C16.7499 8.04003 16.1499 6.44003 16.1499 6.44003V14.84Z" fill="white" />
        </g>
        <defs>
            <clipPath id="clip0_7679_13000">
                <rect width="32" height="32" rx="16" fill="white" />
            </clipPath>
        </defs>
    </svg>
)

const iconClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    alert("println ")
}
const eyeIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
    <path d="M11.9205 4.64387C10.6159 1.88727 8.64373 0.5 6 0.5C3.35489 0.5 1.38413 1.88727 0.0794706 4.64525C0.0271401 4.75639 0 4.87778 0 5.00069C0 5.1236 0.0271401 5.24499 0.0794706 5.35613C1.38413 8.11273 3.35627 9.5 6 9.5C8.6451 9.5 10.6159 8.11273 11.9205 5.35475C12.0265 5.13114 12.0265 4.87163 11.9205 4.64387ZM6 8.50613C3.78014 8.50613 2.15482 7.37699 1.00842 5C2.15482 2.62301 3.78014 1.49387 6 1.49387C8.21985 1.49387 9.84517 2.62301 10.9916 5C9.84655 7.37699 8.22123 8.50613 6 8.50613ZM5.94495 2.57055C4.60726 2.57055 3.52279 3.65828 3.52279 5C3.52279 6.34172 4.60726 7.42945 5.94495 7.42945C7.28264 7.42945 8.36711 6.34172 8.36711 5C8.36711 3.65828 7.28264 2.57055 5.94495 2.57055ZM5.94495 6.54601C5.09306 6.54601 4.40357 5.85445 4.40357 5C4.40357 4.14555 5.09306 3.45399 5.94495 3.45399C6.79683 3.45399 7.48632 4.14555 7.48632 5C7.48632 5.85445 6.79683 6.54601 5.94495 6.54601Z" fill="#34383C" />
</svg>)
const CurrencySummaryCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.summarytitle}>
                <div className={styles.icon}>
                    <SpecialIcon iconItem={iconItem} content={<p>paragraph </p>}></SpecialIcon>
                </div>
                <div className={styles.textdescription}>
                    <VerticalInfoDescription title='Kenya Shillings' description='Available Balance' />
                </div>
            </div>

            <div className={styles.bodyContainer}>
                <div className={styles.textdescription}>
                    <VerticalInfoDescription
                        title='Kenya Shillings'
                        description='KES'
                        titleStyle={{
                            fontWeight: '700'
                        }}
                        descriptionStyle={{
                            fontWeight: '400',
                            fontSize: '16px'
                        }}

                    />
                </div>
                <div className={styles.viewMoreIcon}>
                    <SpecialIcon iconItem={eyeIcon} content={<SpecialIconContent text={'Provided Text !'} />} onClick={iconClicked} />
                </div>

            </div>

        </div>
    )
}

export default CurrencySummaryCard
