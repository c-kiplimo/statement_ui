import result from "antd/es/result";



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handler= async(req:NextRequest, res:NextResponse) =>{
    if (req.method === 'POST') {

    }else{
        return NextResponse.json({
            status: 200,
            body:{
                "data":"data"
            }
          })
    }

 
    // ...
  }
  export  {handler as GET, handler as POST}