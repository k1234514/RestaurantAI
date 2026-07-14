import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export async function saveFavorite(userEmail, tool, input, output) {
  const q = query(
    collection(db, "favorites"),
    where("userEmail", "==", userEmail),
    where("tool", "==", tool),
    where("output", "==", output)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    alert("Already added to favorites.");
    return;
  }

  await addDoc(collection(db, "favorites"), {
    userEmail,
    tool,
    input,
    output,
  });

  alert("Added to Favorites ⭐");
}

export async function getFavorites(userEmail) {
  const q = query(
    collection(db, "favorites"),
    where("userEmail", "==", userEmail)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteFavorite(id) {
  await deleteDoc(doc(db, "favorites", id));
}