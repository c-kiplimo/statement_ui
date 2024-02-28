import React, { ReactNode } from 'react'

type siderTypes ={
    siderBar: ReactNode
    content: ReactNode
}
const OnboardingLayout = (props:siderTypes) => {
  return (
    <div style={{display:"flex", height:"100vh"}}>
        {props.siderBar}
      
       {props.content}
    </div>
  )
}

export default OnboardingLayout
