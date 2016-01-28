# redux-replicate-fs

[![npm version](https://img.shields.io/npm/v/redux-replicate-fs.svg?style=flat-square)](https://www.npmjs.com/package/redux-replicate-fs)
[![npm downloads](https://img.shields.io/npm/dm/redux-replicate-fs.svg?style=flat-square)](https://www.npmjs.com/package/redux-replicate-fs)

Replicator for [`redux-replicate`](https://github.com/loggur/redux-replicate)  designed to persist the state of [`redux`](https://github.com/rackt/redux) stores using Node's [`fs`](https://nodejs.org/api/fs.html).


## Installation

```
npm install redux-replicate redux-replicate-fs --save
```


## Usage

Use with [`redux-replicate`](https://github.com/loggur/redux-replicate).


## Example using [`react-redux-provide`](https://github.com/loggur/react-redux-provide)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { unshiftEnhancer } from 'react-redux-provide';
import replicate from 'redux-replicate';
import fsReplicator from 'redux-replicate-fs';
import { coolMap } from './providers/index';
import { App } from './components/index';

unshiftEnhancer({ coolMap }, replicate('coolMap', fsReplicator));

ReactDOM.render(<App/>, document.getElementById('root'));
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
const replication = replicate(storeKey, fsReplicator);
const create = compose(replication)(createStore);
const store = create(combineReducers(reducers), initialState);
```
