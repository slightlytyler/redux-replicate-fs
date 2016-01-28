import fs from 'fs';
import { stringify, parse } from 'deserializable';

export default {
  init(storeKey, store, setReady) {
    if (!store._fsInitialized) {
      store._fsInitialized = {};
    }

    try {
      const serializedState = fs.readFileSync(storeKey, 'utf8');
      const state = serializedState && parse(serializedState) || {};

      setReady(true);

      if (store._fsInitialized[storeKey]) {
        store.setState(state);
      } else {
        store._fsInitialized[storeKey] = true;
        store.setState({ ...state, ...store.getState() });
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error reading '+storeKey+':', error.stack);
      }
    }
  },

  postReduction(storeKey, state, action) {
    try {
      const serializedState = stringify(state, 2);

      fs.writeFileSync(storeKey, serializedState, 'utf8');
    } catch (error) {
      console.error('Error writing '+storeKey+':', error.stack);
    }
  }
};
