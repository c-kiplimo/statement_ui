import React, { CSSProperties, ReactNode } from 'react'

type buttonProps={
    buttonName:ReactNode,
    icon?: ReactNode;
    buttonStyle?:CSSProperties,
    onClick?:(e:any)=>void
}
const CustomButton = (props:buttonProps) => {
  return (
    <div>
      <button className={`bodyr`} type='button' style={props.buttonStyle} onClick={props.onClick}>{props.buttonName} {props.icon}</button>
    </div>
  )
}

export default CustomButton
