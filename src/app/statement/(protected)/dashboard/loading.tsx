import { Spin } from 'antd'
import React from 'react'

function loading() {
  return (
    
    <div>
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    </div>
  )
}

export default loading


