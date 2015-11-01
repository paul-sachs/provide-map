> *Feel free to submit any pull requests or create issues for anything you think might be useful!*

# react-redux-provide-map

[![build status](https://img.shields.io/travis/loggur/react-redux-provide-map/master.svg?style=flat-square)](https://travis-ci.org/loggur/react-redux-provide-map) [![npm version](https://img.shields.io/npm/v/react-redux-provide-map.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-provide-map)
[![npm downloads](https://img.shields.io/npm/dm/react-redux-provide-map.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-provide-map)

Provides ES6 `Map` instances to React components.


## Installation

```
npm install react-redux-provide react-redux-provide-map --save
```


## Usage

Use `react-redux-provide-map` to create providers with predictably named `actions` and `reducers` specific to manipulating ES6 `Map` instances.  Create as many providers/instances as you want and share them across multiple components.

The main export `provideMap` takes 3 arguments:

1. `mapName` - defaults to `'map'`
2. `itemName` - defaults to `'item'`
3. `indexName` - defaults to `'index'`


## Example with default `actions` and `reducers`

```js
import { assignProviders } from 'react-redux-provide';
import provideMap from 'react-redux-provide-map';
import GoodStuff from './components/GoodStuff';

const map = provideMap();

const initialState = {
  map: new Map([
    ['a', { fruit: 'apple' }],
    ['b', { fruit: 'banana' }],
    ['c', { vegetable: 'carrot' }]
  ])
};

assignProviders(initialState, { map }, {
  GoodStuff
});
```

An instance of `GoodStuff` will then be able to access the following `actions`:

- `setMap (Object map)` - sets the map
- `updateMap (Function update)` - updates each key-value pair
- `filterMap (Function filter)` - filters each key-value pair
- `clearMap ()` - clears the map
- `setItem (Mixed index, Mixed item)` - sets the item at some `index` (note: we're referring to the `key` as `index` because `this.props.key` is reserved for React internally)
- `updateItem (Mixed index, Mixed item)` - updates or sets the item at some `index`; if the existing item the update are both objects, it will merge the two as a new object
- `deleteItem (Mixed index)` - deletes the item at some `index`

And `reducers`:

- `map` - the map instance, of course
- `mapSize` - the size of the map instance
- `item` - if the component instance contains a prop key matching the `indexName` (e.g., `index`), the `item` at that key within the map will be provided
- `hasItem` - if the component instance contains a prop key matching the `indexName` (e.g., `index`), the existence of the `item` at that key within the map will be provided as a boolean value


## Example with predictable, custom `actions` and `reducers`

```js
import { assignProviders } from 'react-redux-provide';
import provideMap from 'react-redux-provide-map';
import GoodStuff from './components/GoodStuff';

const goodMap = provideMap('goodMap', 'goodItem', 'goodIndex');

const initialState = {
  goodMap: new Map([
    ['a', { fruit: 'apple' }],
    ['b', { fruit: 'banana' }],
    ['c', { vegetable: 'carrot' }]
  ])
};

assignProviders(initialState, { goodMap }, {
  GoodStuff
});
```

An instance of `GoodStuff` will then be able to access the same `actions` as above, but with slightly different keys:

- `setMap` -> `setGoodMap`
- `updateMap` -> `updateGoodMap`
- `filterMap` -> `filterGoodMap`
- `clearMap` -> `clearGoodMap`
- `setItem` -> `setGoodItem`
- `updateItem` -> `updateGoodItem`
- `deleteItem` -> `deleteGoodItem`

And `reducers`:

- `map` -> `goodMap`
- `mapSize` -> `goodMapSize`
- `item` -> `goodItem`
- `hasItem` -> `hasGoodItem`
