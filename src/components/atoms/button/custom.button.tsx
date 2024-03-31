import React, { CSSProperties, ReactNode } from 'react'

type buttonProps={
    buttonName:ReactNode,
    buttonStyle?:CSSProperties,
    onClick?:(e:any)=>void
}
const Button = (props:buttonProps) => {
  return (
    <div>
      <button className={`bodyr`} type='button' style={props.buttonStyle} onClick={props.onClick}>{props.buttonName}</button>
    </div>
  )
}

export default Button
