import { useEffect, useState } from 'react';
import useProfileCreated from './useProfileCreated';
import { loggedInProfileDetails } from '../lib/get.profileinfo.action';

const useProfileId  =  () =>{
  const profile = useProfileCreated()
  let userId = profile?.userId;
  console.log();
  
  const [profileDetails, setProfileDetails] = useState<CustomerProfile>()

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await loggedInProfileDetails(parseInt(userId!));
        setProfileDetails(response)
        console.log(response);
        return response;
      } catch (error) {
        console.error('Failed to fetch profile ID:', error);
      }
    }
    
    fetchData();
  }, [userId])

const profId = profileDetails?.profileId;
console.log(profId);

return profId;
};
export default useProfileId;
