import { db } from "@/firebaseConfig";
import { 
  addDoc, 
  collection, 
  doc,  
  getDocs,  
  query, 
  updateDoc, 
  where } from "firebase/firestore";
import type { ProfileResponse, UserProfile } from "@/types";



const COLLECTION_NAME = "users";

export const createUserProfile = async (user: UserProfile) => {
    try {
        return addDoc(collection(db, COLLECTION_NAME), user);
    } catch (error) {
        console.log(error);
    }
};

export const getuserProfile = async(userId: string) => {
    try {
        const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  let tempUserData: ProfileResponse = {};
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
        const Userdata = doc.data() as UserProfile;
        tempUserData = {
            id: doc.id,
            ...Userdata,
        };
    });
    return tempUserData;
  } else {
    console.log("Document not found");
    return tempUserData;
  };
    } catch (error) {
        console.log(error);
    }
};

export const updateUserProfile = async (
    id: string,
    user: Partial<UserProfile>
 ) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        ...user
    })
};