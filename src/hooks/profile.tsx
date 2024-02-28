import { useEffect, useState } from "react";


const useProfile=()=>{
    const [session,setSession] = useState<CustomerProfile | undefined>();

    useEffect(()=>{
        let url =""
        fetch(url)
        .then((res)=>res.json())
        .then((data)=> setSession(data))
    },[])
}

