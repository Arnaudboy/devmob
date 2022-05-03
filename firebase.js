import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDocFromCache,
  setDoc,
  addDoc,
  updateDoc,
  getDoc
} from "firebase/firestore";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_API_AUTHDOMAIN,
  projectId: "b2devmob",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.FIREBASE_APP_ID
};

export const app = initializeApp(config);

export const db = getFirestore(app);

function parseDocument(document) {
  return { id: document.id, ...document.data() };
}

export async function getAll(name) {
  const snapshot = await getDocs(query(collection(db, name)));
  return snapshot.docs.map(parseDocument);
}

export async function getOne(name, id) {
  const snapshot = await getDocFromCache(doc(db, name, id));
  return parseDocument(snapshot);
}

export async function addCity(city) {
  const prom = await addDoc(collection(db, "cities"), { city: city.name, country: city.country, lat: city.lat, lng: city.lng });
  return prom;
}
