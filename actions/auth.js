import firebase from "../firebase";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";

const auth = getAuth(firebase);

export const googleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
        .then(() =>
            window.halfmoon.initStickyAlert({
                content: "Login successful",
                title: "Success!!",
                alertType: "alert-success",
                fillType: "filled",
            })
        )
        .catch((e) => {
            console.log(e);
            window.halfmoon.initStickyAlert({
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
        window.halfmoon.initStickyAlert({
            content: "Unable to sign out!!",
            title: "Error!!",
            alertType: "alert-danger",
            fillType: "filled",
        });
    });
};
