import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import {v4 as uuidv4} from 'uuid'

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = () => {
  signInWithRedirect(auth, googleProvider)
    .then((userCred) => {
      const user = userCred.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const signOutAction = () => {
  signOut(auth)
    .then(() => {
      window.location.reload();
      console.log('Signed Out Successfully !');
    })
    .catch((error) => {
      console.log(error);
    });
};


export const Menus = [
  { id: uuidv4(), name: "Projects", uri: "/home/projects" },
  { id: uuidv4(), name: "Collections", uri: "/home/collection" },
  { id: uuidv4(), name: "Profile", uri: "/home/profile" },
];