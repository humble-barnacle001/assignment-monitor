import {
    enableMultiTabIndexedDbPersistence,
    getFirestore,
} from "firebase/firestore";
import Head from "next/head";
import { useEffect } from "react";
import { halfmoonAlert } from "../actions/util";
import AddAssignment from "../components/addAssignment";
import AddSubject from "../components/addSubject";
import FirebaseAuthState from "../components/FirebaseAuthState";
import Nav from "../components/nav";
import { Provider } from "../context";
import firebase from "../firebase";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const el = document.getElementById("themeToggler");
        function setThemeIcon() {
            if (window.halfmoon) {
                if (halfmoon.readCookie("halfmoon_preferredMode"))
                    if (
                        halfmoon.readCookie("halfmoon_preferredMode") ===
                        "light-mode"
                    ) {
                        document.body.classList.remove("dark-mode");
                        el.innerHTML = "<i class='bi bi-moon-fill'></i>";
                    } else if (
                        halfmoon.readCookie("halfmoon_preferredMode") ===
                        "dark-mode"
                    ) {
                        document.body.classList.add("dark-mode");
                        el.innerHTML = "<i class='bi bi-sun-fill'></i>";
                    }
            } else setTimeout(() => setThemeIcon(), 1000);
        }
        el.addEventListener("click", () => {
            halfmoon.toggleDarkMode();
            setThemeIcon();
        });

        // Works only for reload or initial load
        setThemeIcon();

        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("serviceWorker.js");
            });
        }
    }, []);

    useEffect(() => {
        const db = getFirestore(firebase);
        (async () => {
            try {
                await enableMultiTabIndexedDbPersistence(db);
            } catch (e) {
                console.error("Could not enable persistence", e);
                setTimeout(() => {
                    halfmoonAlert({
                        content: "Could not enable persistence",
                        title: "Persistence Disabled",
                        alertType: "alert-danger",
                    });
                }, 500);
            }
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Assignment Tracker</title>
            </Head>
            <Provider>
                <FirebaseAuthState>
                    <AddAssignment />
                    <AddSubject />
                    <div
                        className='page-wrapper with-navbar with-transitions'
                        data-sidebar-hidden='hidden'
                    >
                        <Nav />
                        <div className='sticky-alerts'></div>
                        <div className='content-wrapper'>
                            <Component {...pageProps} />
                        </div>
                    </div>
                </FirebaseAuthState>
            </Provider>
        </>
    );
}
