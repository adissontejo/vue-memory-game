import { useStore as useStoreWithKey } from 'vuex';

import { key } from '@/store';

export const useStore = () => {
  return useStoreWithKey(key);
};
