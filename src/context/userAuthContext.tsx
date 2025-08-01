import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from "firebase/auth";
import React, { createContext, useContext } from "react";
import { auth } from "@/firebaseConfig";
import { useState, useEffect } from 'react'

interface IUserAuthProvider {
    children: React.ReactNode
}


type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;
};

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
    signOut(auth);
};

const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
};

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn,
});

export const userAuthProvider: React.FunctionComponent<IUserAuthProvider> = ({ children }) => {
    
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            return () => {
                unsubscribe();
            };
        });
    })

    const value: AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
      }
    
    return(
        <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
    )
};

export const useUserAuth = () => {
    return useContext(userAuthContext)
};