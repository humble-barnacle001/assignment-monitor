import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = require("./firebase-config.json");

export default getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();
