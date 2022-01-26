import { useEffect, useContext } from "react";
import firebase from "../firebase";
import { Context } from "../context";
import { halfmoonAlert } from "../actions/util";
import { useRouter } from "next/router";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { terminate, getFirestore } from "firebase/firestore";

export default function FirebaseAuthState({ children }) {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    const router = useRouter();
    const auth = getAuth(firebase);

    useEffect(() => {
        // Redirects to home page after each successful login only
        if (user && router.pathname === "/auth") router.push("/");
    }, [router, user]);

    useEffect(() => {
        return onAuthStateChanged(
            auth,
            async (user) => {
                if (!user) {
                    await terminate(getFirestore(firebase));
                    dispatch({
                        type: "LOGOUT",
                    });
                } else {
                    dispatch({
                        type: "LOGIN",
                        payload: { uid: user.uid },
                    });
                }
            },
            (e) => {
                console.log("Error in firebase state component", e);
                dispatch({
                    type: "LOGOUT",
                });
                halfmoonAlert({
                    content: "Verification failed!!",
                    title: "Error!!",
                    alertType: "alert-danger",
                    fillType: "filled",
                });
            }
        );
    }, [auth, dispatch]);

    return <>{children}</>;
}
