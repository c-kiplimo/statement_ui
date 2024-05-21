import React, { useState } from 'react';

const useUserId = () => {
  const [userId, setUserId] = useState<number>(1); 

  const setDefaultProfileId = () => {
    setUserId(1);
  };

  return userId;
    
};
export default useUserId;
