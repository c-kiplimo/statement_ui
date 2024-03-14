import React, { CSSProperties, ReactNode } from 'react'

type imageIcon={
    icon:ReactNode,
    iconStyle?: CSSProperties,
    onClick?:(e:any)=>void
}

export const svgIcon = (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 1V4.26797M2.33333 4.26797L4.78667 6.47712M1 11.4575L4.22667 10.281M5.52 17L7 14.0719M15.6667 4.26797L13.2133 6.47712M17 11.4575L13.7733 10.281M12.48 17L11 14.0719" stroke="#FFBD66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);


function ImageIcon( prop: imageIcon) {
  return (
    <div onClick={prop.onClick} style={prop.iconStyle}>
      {prop.icon}
    </div>
  )
}

export default ImageIcon
