import { useEffect, useState } from 'react';
import useProfileCreated from './useProfileCreated';
import { loggedInProfileDetails } from '../lib/get.profileinfo.action';

const useProfileId = () => {
  const profile = useProfileCreated();
  const userId = profile?.userId;
  
  const [profileDetails, setProfileDetails] = useState<CustomerProfile>();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) { 
        try {
          const response = await loggedInProfileDetails(userId);          
          setProfileDetails(response);
        } catch (error) {
          console.error('Failed to fetch profile details:', error);
        }
      }
    };
    
    fetchData();
  }, [userId]);

  const customerId = profileDetails?.customerId;
  return customerId;
};

export default useProfileId;
