import React, { useState } from 'react';

const getProfileId = () => {
  const [profileId, setProfileId] = useState<number>(1); 

  const setDefaultProfileId = () => {
    setProfileId(1);
  };

  return profileId;
    
};
export default getProfileId;
