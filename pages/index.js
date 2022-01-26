import { useContext, useEffect } from "react";
import Loader from "../components/Loader";
import Subject from "../components/Subject";
import withAuth from "../components/PrivateRoute";
import { Context } from "../context";
import firebase from "../firebase";
import { getAuth } from "firebase/auth";
import {
    collection,
    getFirestore,
    onSnapshot,
    waitForPendingWrites,
} from "firebase/firestore";

const Home = () => {
    const {
        state: { transaction, tload, error },
        dispatch,
    } = useContext(Context);

    useEffect(() => {
        const db = getFirestore(firebase);
        const user = getAuth(firebase).currentUser;
        const ref = collection(db, `data/${user.uid}/assignments`);
        dispatch({ type: "LOAD_TRANSACTION" });
        waitForPendingWrites(db)
            .then(() =>
                onSnapshot(
                    ref,
                    (doc) => {
                        const assignments = {};
                        if (!doc.empty)
                            doc.docs.forEach((d) => {
                                assignments[d.id] = d.data();
                            });
                        dispatch({
                            type: "TRANSACTION_FETCHED",
                            payload: assignments,
                        });
                    },
                    (err) => {
                        if (user) {
                            console.log(err);
                            dispatch({
                                type: "TRANSACTION_FETCH_ERROR",
                                payload:
                                    "Could not connect/access the database",
                            });
                        }
                    }
                )
            )
            .catch((e) =>
                console.log("Error while waiting for backend update", e)
            );
    }, [dispatch]);

    return (
        <div className='container'>
            {!tload ? (
                transaction ? (
                    Object.keys(transaction).map((id) => (
                        <Subject
                            key={id}
                            subject_id={id}
                            data={transaction[id]}
                        />
                    ))
                ) : (
                    <p
                        className={`text-center text-${
                            error ? "danger" : "secondary"
                        }`}
                    >
                        <b>
                            {error
                                ? error
                                : "Nothing added!! Add some data to start."}
                        </b>
                    </p>
                )
            ) : (
                <Loader />
            )}
            <div className='row my-20'>
                <div className='m-auto'>
                    <button
                        className='btn btn-primary btn-rounded btn-block'
                        onClick={() =>
                            window.halfmoon.toggleModal("addTransaction")
                        }
                        disabled={error}
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Home);
