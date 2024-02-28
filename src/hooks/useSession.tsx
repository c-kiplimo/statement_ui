import { useEffect, useState } from "react"

const useSession=()=>{

   //get session details from local storage

   // if session is missing redirect to login page

   

    const [session,setSession] = useState(null);

    useEffect(()=>{
        let url =""
        fetch(url)
        .then((res)=>res.json())
        .then((data)=> setSession(data))
    },[])
}


const useLocalSession = (url:string) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export  {useLocalSession,useSession} ;