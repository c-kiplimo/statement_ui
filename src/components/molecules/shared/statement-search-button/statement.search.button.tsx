import React, { CSSProperties } from "react";
import Button from "@/src/components/atoms/button/button";
import { useTokens } from "@/src/app/(context)/ColorContext";

 const SubmitButton =(props:{onSubmit?:()=>void,style?:CSSProperties})=>{
    const token =useTokens();
    return (
      <Button className ='account_submit_btn'
       label="Submit Request" 
       style={props.style!}
       bgColor={token.accent.success} color ={token.default.white}
       onClick={props.onSubmit!} />
    )
  }

  export default SubmitButton