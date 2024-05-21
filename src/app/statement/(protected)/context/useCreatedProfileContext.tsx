import { createContext, useContext, useState } from 'react';
import useProfileCreated from '@/src/hooks/useProfileCreated';

type ProfileInfoType = {
  profileInfo: CustomerProfile | null;
  updateProfileInfo: (profile: CustomerProfile) => void;
};

const ProfileContext = createContext<ProfileInfoType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const createdProfile = useProfileCreated();
  const [profile, setProfile] = useState<CustomerProfile | null>(createdProfile);

  const updateProfileInfo = (newProfile: CustomerProfile) => {
    setProfile(newProfile);
  };
  return (
    <ProfileContext.Provider value={{ profileInfo: profile, updateProfileInfo }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileInfoType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};