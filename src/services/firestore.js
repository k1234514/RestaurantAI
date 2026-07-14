import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export async function saveHistory(userEmail, tool, input, output) {
  try {
    await addDoc(collection(db, "history"), {
      userEmail,
      tool,
      input,
      output,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getHistory(userEmail) {
  const q = query(
    collection(db, "history"),
    where("userEmail", "==", userEmail),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteHistory(id) {
  await deleteDoc(doc(db, "history", id));
}

export async function clearAllHistory(userEmail) {
  const q = query(
    collection(db, "history"),
    where("userEmail", "==", userEmail)
  );

  const snapshot = await getDocs(q);

  for (const item of snapshot.docs) {
    await deleteDoc(item.ref);
  }
}