import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const options: FirebaseOptions = {
  databaseURL: 'https://memory-game-b4257-default-rtdb.firebaseio.com/',
};

export const app = initializeApp(options);

export const db = getDatabase(app);
