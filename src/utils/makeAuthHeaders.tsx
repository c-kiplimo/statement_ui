import { useEffect, useState } from "react";
import { plainHeaders } from "../constants/auth-headers";
import { AuthHeaderType } from "../types/auth.types";


export const makeAuthHeaders=()=>{
        return {
            ...plainHeaders,
            "Authorization":"",
        }
}