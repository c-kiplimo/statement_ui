import React, { useState } from 'react';

const getProfileId = () => {
  const [profileId, setProfileId] = useState<number>(4); 

  const setDefaultProfileId = () => {
    setProfileId(4);
  };

  return profileId;
    
};
export default getProfileId;
