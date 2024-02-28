import React, { ReactNode } from 'react'
import style from "./specialIcon.module.css"

type IconType = {
    iconItem: ReactNode
}

const SpecialIcon = (props: IconType) => {
    return (
        <div>
            {props.iconItem}
        </div>
    )
}

export default SpecialIcon
