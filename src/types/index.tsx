import type {  OutputFileEntry } from "@uploadcare/react-uploader";
import type { User } from "firebase/auth";


export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignUp {
    email: string;
    password: string;
    confirmedPassword: string;
}

export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userLikes: string[];
  userId: string | null;
  date: Date;
}

export interface PhotoMeta {
  cdnUrl: string;
  uuid: string;
}

export interface FileEntry {
  files: OutputFileEntry[];
}

export interface DocumentResponse {
  id: string;
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userLikes: string[];
  userId: string | null;
  date: Date;
}

export interface ProfileInfo {
  user?: User;
  displayName?: string;
  photoURL?: string;
}

export interface UserProfile {
  userId?: string;
  displayName?: string;
  photoURL?: string;
  userBio?: string;
} 

export interface ProfileResponse {
  id?: string;
  userId?: string;
  displayName?: string;
  photoURL?: string;
  userBio?: string;
}