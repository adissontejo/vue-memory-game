import { ref } from '@firebase/database';

import { db } from '@/services/firebase';

export const games = ref(db, '/games');
