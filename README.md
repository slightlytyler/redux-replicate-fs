# redux-replicate-fs

[![npm version](https://img.shields.io/npm/v/redux-replicate-fs.svg?style=flat-square)](https://www.npmjs.com/package/redux-replicate-fs)
[![npm downloads](https://img.shields.io/npm/dm/redux-replicate-fs.svg?style=flat-square)](https://www.npmjs.com/package/redux-replicate-fs)

Replicator for [`redux-replicate`](https://github.com/loggur/redux-replicate) designed to locally persist the state of [`redux`](https://github.com/rackt/redux) stores using [`fs`](https://github.com/mozilla/fs).


## Installation

```
npm install redux-replicate redux-replicate-fs --save
```


## Usage

> *Note:* This is currently intended only for demonstration purposes!  Don't use this in production.  At some point we may turn this into a proper flatfile storage system though!  :)

Use with [`redux-replicate`](https://github.com/loggur/redux-replicate).

```js
fsReplicator (Optional Object keys)
```

The `keys` argument becomes the `keys` key in your replicator.

So to replicate all keys:
```js
import replicate from 'redux-replicate';
import fsReplicator from 'redux-replicate-fs';

replicate('someStore', fsReplicator())
```

Only `someKey`:
```js
replicate('someStore', fsReplicator({ someKey: true }))
```

All keys except for `someKey`:
```js
replicate('someStore', fsReplicator({ someKey: false }))
```


## Example using [`react-redux-provide`](https://github.com/loggur/react-redux-provide)

```js
import React from 'react';
import { renderToString } from 'react-dom/server';
import { unshiftEnhancer } from 'react-redux-provide';
import replicate from 'redux-replicate';
import fsReplicator from 'redux-replicate-fs';
import { coolMap } from './providers/index';
import { App } from './components/index';

unshiftEnhancer({ coolMap }, replicate('coolMap', fsReplicator()));

export default function renderAppToString(props) {
  return renderToString(<App { ...props } />, document.getElementById('root'));
}
```


## Example using `compose`

```js
import { createStore, combineReducers, compose } from 'redux';
import replicate from 'redux-replicate';
import fsReplicator from 'redux-replicate-fs';
import reducers from './reducers';

const initialState = {
  wow: 'such storage',
  very: 'cool'
};

const storeKey = 'superCoolStorageUnit';
const replication = replicate(storeKey, fsReplicator());
const create = compose(replication)(createStore);
const store = create(combineReducers(reducers), initialState);
```
