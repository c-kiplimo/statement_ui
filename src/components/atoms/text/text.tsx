import { CSSProperties } from "react"

type TextProp = {
    style?: CSSProperties,
    children: string
}
export const Text = (props:TextProp)=>{
 return <p style={props.style}>{props.children}</p>
}