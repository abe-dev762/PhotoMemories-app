import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "@/context/UserAuthContext";
import { db } from "@/firebaseConfig";
import type { ProfileResponse } from "@/types";
import { collection, query, where, onSnapshot } from "firebase/firestore";

interface UserProfileContextProps {
  userInfo: ProfileResponse | null;
  loadingProfile: boolean;
}

const UserProfileContext = createContext<UserProfileContextProps>({
  userInfo: null,
  loadingProfile: true,
});

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUserAuth();
  const [userInfo, setUserInfo] = useState<ProfileResponse | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setUserInfo(null);
      setLoadingProfile(false);
      return;
    }

    setLoadingProfile(true);

    const q = query(
      collection(db, "users"),
      where("userId", "==", user.uid)
    );

    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data() as ProfileResponse;
        setUserInfo({ id: doc.id, ...data });
      } else {
        setUserInfo(null);
      }
      setLoadingProfile(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <UserProfileContext.Provider value={{ userInfo, loadingProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);