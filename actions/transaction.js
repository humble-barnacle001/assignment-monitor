import firebase from "../firebase";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    deleteDoc,
    doc,
} from "firebase/firestore";

const auth = getAuth(firebase);

export const addTransaction = async (data) => {
    const user = auth.currentUser;
    const ref = collection(
        getFirestore(firebase),
        `data/${user ? user.uid : "none"}/transactions`
    );
    addDoc(ref, {
        ...data,
        _v: serverTimestamp(),
    })
        .then(() =>
            window.halfmoon.initStickyAlert({
                content: "Added successfully",
                title: "Success!!",
                alertType: "alert-success",
                fillType: "filled",
            })
        )
        .catch((e) => {
            console.log("ERROR IN ADDING:", e);
            window.halfmoon.initStickyAlert({
                content: "Error adding new transaction",
                title: "Error!!",
                alertType: "alert-danger",
                fillType: "filled",
            });
        });
};

export const delTransaction = async (id) => {
    const user = auth.currentUser;
    if (id && user) {
        deleteDoc(
            doc(getFirestore(firebase), `data/${user.uid}/transactions/${id}`)
        )
            .then(() =>
                window.halfmoon.initStickyAlert({
                    content: "Deleted successfully",
                    title: "Success!!",
                    alertType: "alert-success",
                    fillType: "filled",
                })
            )
            .catch((e) => {
                console.log("ERROR IN DELETING:", e);
                window.halfmoon.initStickyAlert({
                    content: "Error deleting the transaction",
                    title: "Error!!",
                    alertType: "alert-danger",
                    fillType: "filled",
                });
            });
    }
};
