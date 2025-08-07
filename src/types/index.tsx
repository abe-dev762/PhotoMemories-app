import type {  OutputFileEntry } from "@uploadcare/react-uploader";


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
  userLikes: [];
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