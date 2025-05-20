import { db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

const savePalette = async (palette, songName) => {
  await addDoc(collection(db, 'palettes'), {
    palette,
    songName,
    createdAt: new Date()
  });
};
