import firebase from "../firebase";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    deleteField,
    serverTimestamp,
} from "firebase/firestore";
import { halfmoonAlert } from "./util";

const auth = getAuth(firebase);
const db = getFirestore(firebase);

export const addSubject = (data) => {
    const user = auth.currentUser;
    const ref = collection(db, `data/${user ? user.uid : "none"}/assignments`);
    addDoc(ref, data)
        .then(() =>
            halfmoonAlert({
                content: "Subject added successfully",
                title: "Success!!",
                alertType: "alert-success",
                fillType: "filled",
            })
        )
        .catch((e) => {
            console.log("ERROR IN ADDING:", e);
            halfmoonAlert({
                content: "Error adding new subject",
                title: "Error!!",
                alertType: "alert-danger",
                fillType: "filled",
            });
        });
};

export const delSubject = (id) => {
    const user = auth.currentUser;
    if (id && user) {
        deleteDoc(doc(db, `data/${user.uid}/assignments/${id}`))
            .then(() =>
                halfmoonAlert({
                    content: "Subject deleted successfully",
                    title: "Success!!",
                    alertType: "alert-success",
                    fillType: "filled",
                })
            )
            .catch((e) => {
                console.log("ERROR IN DELETING:", e);
                halfmoonAlert({
                    content: "Error deleting the subject",
                    title: "Error!!",
                    alertType: "alert-danger",
                    fillType: "filled",
                });
            });
    }
};

export const addEditAssignment = (
    subID,
    data,
    edit = false,
    assignID = "",
    comments = "add",
    isDelete = false
) => {
    const user = auth.currentUser;
    const ref = doc(db, `data/${user ? user.uid : "none"}/assignments/`, subID);
    if (!edit) assignID = `${user.uid}${Date.now()}`;
    updateDoc(ref, {
        [assignID]: isDelete ? data : { ...data, _v: serverTimestamp() },
    })
        .then(() =>
            halfmoonAlert({
                content: `Assignment ${comments}ed successfully`,
                title: "Success!!",
                alertType: "alert-success",
                fillType: "filled",
            })
        )
        .catch((e) => {
            console.log("ERROR IN ADDING:", e);
            halfmoonAlert({
                content: `Error ${comments}ing assignment details`,
                title: "Error!!",
                alertType: "alert-danger",
                fillType: "filled",
            });
        });
};

export const delAssignment = (subID, assignID) => {
    addEditAssignment(subID, deleteField(), true, assignID, "delet", true);
};

export const markAssignmentDone = (subID, assignID, assignData) => {
    addEditAssignment(
        subID,
        { ...assignData, done: true },
        true,
        assignID,
        "updat"
    );
};
