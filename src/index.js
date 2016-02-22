import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import { stringify, parse } from 'deserializable';

const fsReplicator = keys => () => ({
  keys,

  init(storeKey, store, setReady) {
    try {
      const serializedState = fs.readFileSync(storeKey, 'utf8');
      const state = serializedState && parse(serializedState) || {};

      setReady(true);
      store.setState(state);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error reading '+storeKey+':', error.stack);
      }

      setReady(true);
    }
  },

  postReduction(storeKey, state, action) {
    try {
      const serializedState = stringify(state, 2);

      mkdirp(path.dirname(storeKey), function (err) {
        if (err) {
          throw 'Could not create directory'
        }
        else {
          fs.writeFileSync(storeKey, serializedState, 'utf8');
        }
      });
    } catch (error) {
      console.error('Error writing '+storeKey+':', error.stack || error);
    }
  }
});

export default fsReplicator;
