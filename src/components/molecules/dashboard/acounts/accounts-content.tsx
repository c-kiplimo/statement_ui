import React, { useEffect, useState } from 'react';
import SelectionCard from './selection-card';
import { useTokens, useColors } from '@/src/app/(context)/ColorContext';
import { ProfileHandler } from '@/src/services/userprofile/profile.service';
import { userDetails } from '@/src/services/auth-user-details';

const AccountContent = () => {
  const color = useColors();
  const token = useTokens();
  const [profileData, setProfileData] = useState<any>(null);
  const user_details = userDetails();
  const firstName = user_details?.firstName;
  const userId = firstName;

  useEffect(() => {
    const fetchData = async () => {
      const { profileService, profileDataService } = await ProfileHandler();

      const response = await profileService(userId);

      const profileId = response.payload[0]?.profileId;
      if(profileId){
        const profileData = await profileDataService(profileId);
         setProfileData(profileData);
      }

      
    };

    fetchData();
  }, []);
  return (
    <div
      className="account-content"
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {profileData?.accounts?.map((account: any) => (
        <SelectionCard
          key={account?.accountId || 'defaultKey'}
          avatarBgColor={color.functionalLightColorsWarning}
          avatarTextColor={color.functionalColorWarning}
          title={account?.accountTitle || 'Default Title'}
          description={`View your ${
            account?.accountTitle || 'Default Account'
          } account`}
        />
      ))}
    </div>
  );
};

export default AccountContent;
