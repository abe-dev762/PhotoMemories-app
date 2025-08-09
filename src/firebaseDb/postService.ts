import { db } from "@/firebaseConfig";
import type { DocumentResponse, Post } from "@/types";
import { 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  orderBy, 
  query, 
  QuerySnapshot, 
  updateDoc, 
  where,
  CollectionReference
  } from "firebase/firestore";


const COLLECTION_NAME = "post";

export const createPost = (post: Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => { 
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const tempArray: DocumentResponse[] = [];

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Post;
        const responseObj: DocumentResponse = {
          id: doc.id,
          ...data,
        };
        tempArray.push(responseObj);
      });
      return tempArray;
    } else {
      console.log("Document not found");
    }

  } catch (error) {
    console.log(error);
  }
    
};


export const getPostByUserId = async (
  userId: string
 ): Promise<QuerySnapshot<DocumentResponse>> => {
  const postsRef = collection(db, "posts") as CollectionReference<DocumentResponse>;
  const q = query(postsRef, where("userId", "==", userId));

  return await getDocs(q);
};

export const getPost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return getDoc(docRef);
};

export const deletePost = (id: string) => {
    return deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const updateLikesOnPost = (
  id: string, 
  userLikes: string[],
  likes: number
) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(docRef, {
    likes: likes,
    userLikes: userLikes,
  });
};

