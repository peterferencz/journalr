// Import the functions you need from the SDKs you need
import { browser } from "$app/environment";
import { initializeApp, type FirebaseApp, getApps, getApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, deleteField, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { userStore } from "./stores/userStore";
import { getDateStringFromDateObject } from "./misc";
import type { DateObject } from "./stores/stateStore";

const initFirebase = () => {
  console.log("Initializing app")
  if(getApps().length){
    return getApp()
  }

  const config = {
    apiKey: "AIzaSyD4XAhoQby4BJNvsO9xfpjlcnD0I_ae8dQ",
    authDomain: "journalr-8c29c.firebaseapp.com",
    projectId: "journalr-8c29c",
    storageBucket: "journalr-8c29c.appspot.com",
    messagingSenderId: "329020085315",
    appId: "1:329020085315:web:c5f8d58f77159f0a5130f6"
  }

  return initializeApp(config)
}

const initAuth = (app:FirebaseApp) => {
  const auth = getAuth(app)

  onAuthStateChanged(auth, (user) => { userStore.set(user) })

  return auth
}

const app = initFirebase()
export const auth = initAuth(app)
export const db = getFirestore(app)


//#region auth
export const loginWithCredentials = (email:string, password:string) => {
  return signInWithEmailAndPassword(auth, email, password)
}
export const registerWithCredentials = (email:string, password:string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}
export const logOut = () => {
  return signOut(auth)
}
//#endregion

//#region store

export type Entry = {id:string, summary:string, story:string, order:number}

export const getDay = async (date:DateObject) => {
  if(auth.currentUser == null){ throw Error("firebase function called when user is not logged in") }
  
  const dateString = getDateStringFromDateObject(date)

  const data = await getDocs(query(collection(db, auth.currentUser.uid, "days", dateString)))
  const arr:Entry[] = []
  data.forEach((val) => arr.push({
    summary: val.get("summary"),
    story: val.get("story"),
    id: val.id,
    order: val.get("order")
  }))
  arr.sort((a, b) => a.order - b.order)
  return arr
}

export const addNewEntry = async (date:DateObject, entry:Entry) => {
  if(auth.currentUser == null){ throw Error("firebase function called when user is not logged in") }
  
  const dateString = getDateStringFromDateObject(date)

  const ref = await addDoc(collection(db, auth.currentUser.uid, "days", dateString), {
    summary: entry.summary,
    story: entry.story,
    order: entry.order
  })

  entry.id = ref.id
  return entry
}

export const setEntry = async (date:DateObject, entry:Entry) => {
  if(auth.currentUser == null){ throw Error("firebase function called when user is not logged in") }
  
  const dateString = getDateStringFromDateObject(date)

  const ref = await setDoc(doc(db, auth.currentUser.uid, "days", dateString, entry.id), {
    summary: entry.summary,
    story: entry.story,
    order: entry.order
  })

  return entry
}

export const updateOrders = (date:DateObject, entries:Entry[]) => {
  if(auth.currentUser == null){ throw Error("firebase function called when user is not logged in") }
  
  const dateString = getDateStringFromDateObject(date)

  return Promise.all(entries.map(entry => {
    return updateDoc(doc(db, auth.currentUser!.uid, "days", dateString, entry.id), {
      order: entry.order
    })
  }))
  
}
//#endregion