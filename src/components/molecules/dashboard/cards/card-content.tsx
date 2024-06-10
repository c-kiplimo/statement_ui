import React, { useEffect, useState } from 'react';
import { useTokens, useColors } from '@/src/app/(context)/ColorContext';
import CardsSelectionCard from './card-selection-card';
import { ProfileHandler } from '@/src/services/userprofile/profile.service';
import { userDetails } from '@/src/services/auth-user-details';
const CardContent = () => {
  const masterCard = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="16"
      viewBox="0 0 25 16"
      fill="none"
    >
      <path
        d="M9.18512 2.10425H15.6743V13.8959H9.18512V2.10425Z"
        fill="#FF5F00"
      />
      <path
        d="M9.59746 8C9.59746 5.6042 10.7099 3.47916 12.4197 2.10413C11.1631 1.10415 9.57691 0.5 7.84645 0.5C3.74674 0.5 0.430054 3.85412 0.430054 8C0.430054 12.1458 3.74674 15.5 7.84635 15.5C9.57682 15.5 11.163 14.8959 12.4197 13.8958C10.7099 12.5416 9.59746 10.3958 9.59746 8Z"
        fill="#F30039"
      />
      <path
        d="M24.4302 8C24.4302 12.1458 21.1136 15.5 17.0139 15.5C15.2835 15.5 13.6973 14.8959 12.4406 13.8958C14.1711 12.5208 15.2629 10.3958 15.2629 8C15.2629 5.6042 14.1504 3.47916 12.4406 2.10413C13.6972 1.10415 15.2835 0.5 17.0139 0.5C21.1136 0.5 24.4302 3.875 24.4302 8Z"
        fill="#FFBD66"
      />
    </svg>
  );

  const visaCard = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="10"
      viewBox="0 0 29 10"
      fill="none"
    >
      <path
        d="M20.7844 0.868652C20.1337 0.61996 19.4459 0.495165 18.7533 0.500143C16.5136 0.500143 14.9319 1.68348 14.9207 3.38215C14.9067 4.63009 16.0447 5.33334 16.9056 5.7503C17.7888 6.17901 18.0842 6.44915 18.0814 6.83234C18.0758 7.41521 17.3759 7.67947 16.725 7.67947C15.8305 7.67947 15.342 7.54881 14.5903 7.22141L14.3118 7.08487L13.994 9.04046C14.5385 9.27831 15.5198 9.48238 16.5332 9.5C18.9143 9.5 20.4708 8.324 20.489 6.51669C20.5086 5.5198 19.8927 4.76663 18.5965 4.14413C17.8084 3.74038 17.3199 3.47024 17.3199 3.06062C17.3199 2.69799 17.7385 2.31039 18.6133 2.31039C19.1956 2.29562 19.7742 2.41019 20.3113 2.6466L20.5212 2.74497L20.839 0.855439L20.7844 0.868652ZM26.5963 0.658705H24.8466C24.3021 0.658705 23.8919 0.815799 23.654 1.38251L20.2889 9.37814H22.6699L23.1458 8.06707L26.0518 8.07001C26.1204 8.37685 26.3304 9.37814 26.3304 9.37814H28.4301L26.5963 0.658705ZM11.6998 0.585296H13.9688L12.5494 9.30914H10.2832L11.6998 0.58236V0.585296ZM5.93963 5.39354L6.17479 6.60478L8.39206 0.658705H10.7955L7.22463 9.3664H4.82679L2.86709 1.99327C2.83535 1.87169 2.76081 1.76728 2.65852 1.7011C1.95219 1.31841 1.20378 1.02799 0.430054 0.836352L0.460849 0.652831H4.1129C4.60843 0.673386 5.00737 0.836352 5.14035 1.39132L5.93823 5.39794L5.93963 5.39354ZM23.7968 6.28325L24.701 3.84316C24.6898 3.86958 24.8872 3.33958 25.002 3.01217L25.1573 3.76534L25.6823 6.28178H23.7954L23.7968 6.28325Z"
        fill="#4272DD"
      />
    </svg>
  );

  const token = useTokens();
  const color = useColors();
  const [profileData, setProfileData] = useState<any>(null);
  const user_details = userDetails();
  const firstName = user_details?.firstName;
  const userId = firstName;
  useEffect(() => {
    const fetchData = async () => {
      const { profileService, profileDataService } = await dashboardHandler();

      const response = await profileService(userId);

      const profileId = response.payload[0]?.profileId;

      //const profileData = await profileDataService(profileId);
      //setProfileData(profileData);
    };

    fetchData();
  }, []);

  return (
    <div
      className="card-content"
      style={{
        display: 'flex',
        width: '100%',
        minWidth: '491px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {profileData?.cards?.map((card: any) => (
        <CardsSelectionCard
          key={card?.cardId || 'defaultKey'}
          cardIcon={card?.cardType === 'MasterCard' ? masterCard : visaCard}
          title={`${card?.cardType} ****${card?.cardNumber?.slice(-4)}`}
          description={`Expires ${card?.cardExpiryDate}`}
        />
      ))}
    </div>
  );
};

export default CardContent;

function dashboardHandler(): { profileService: any; profileDataService: any; } | PromiseLike<{ profileService: any; profileDataService: any; }> {
  throw new Error('Function not implemented.');
}
