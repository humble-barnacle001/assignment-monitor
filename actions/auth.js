import firebase from "../firebase";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import { halfmoonAlert } from "./util";

const auth = getAuth(firebase);

export const googleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
        .then(() =>
            halfmoonAlert({
                content: "Login successful",
                title: "Success!!",
                alertType: "alert-success",
                fillType: "filled",
            })
        )
        .catch((e) => {
            console.log(e);
            halfmoonAlert({
                content: "Error while trying to log in",
                title: "Error!!",
                alertType: "alert-danger",
                fillType: "filled",
            });
            throw new Error("Google login failed");
        });
};

export const logOut = async () => {
    await signOut(auth).catch((e) => {
        console.log(e);
        halfmoonAlert({
            content: "Unable to sign out!!",
            title: "Error!!",
            alertType: "alert-danger",
            fillType: "filled",
        });
    });
};
