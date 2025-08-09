import { db } from "@/firebaseConfig";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import type { ProfileResponse, UserProfile } from "@/types";

const COLLECTION_NAME = "users";

/**
 * Create a user profile document with uid as the doc ID.
 * Uses merge: true so it won't overwrite existing fields.
 */
export const createUserProfile = async (user: UserProfile) => {
  if (!user.userId) throw new Error("userId is required");
  const docRef = doc(db, COLLECTION_NAME, user.userId);
  await setDoc(docRef, user, { merge: true });
};

/**
 * Get a user profile by uid (doc ID = uid)
 */
export const getuserProfile = async (uid: string): Promise<ProfileResponse | null> => {
  if (!uid) return null;
  const docRef = doc(db, COLLECTION_NAME, uid);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as Omit<ProfileResponse, "id">),
  };
};

/**
 * Update a user profile by uid
 */
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
) => {
  if (!uid) throw new Error("userId is required");
  const docRef = doc(db, COLLECTION_NAME, uid);
  await updateDoc(docRef, data);
};
