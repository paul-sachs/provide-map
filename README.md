> *Feel free to submit any pull requests or create issues for anything you think might be useful!*

# react-redux-provide-map

[![build status](https://img.shields.io/travis/loggur/react-redux-provide-map/master.svg?style=flat-square)](https://travis-ci.org/loggur/react-redux-provide-map) [![npm version](https://img.shields.io/npm/v/react-redux-provide-map.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-provide-map)
[![npm downloads](https://img.shields.io/npm/dm/react-redux-provide-map.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-provide-map)

Provides a handful of common actions and props specific to maps and items.


## Installation

```
npm install react-redux-provide react-redux-provide-map --save
```


## Usage

Your components can be optionally provided a `map` and/or an `item`.  Simply specify their `propTypes` within your `@provide` decorator.  For an `item` to be provided, the component must have an `index` prop.  (We can't use `key` because it's reserved by `React` internally.)  For a list of available actions, just take a look at [the source](https://github.com/loggur/react-redux-provide-map/blob/master/src/index.js).


## Example

- For assigning the provider to components and initializing state, see [`todomvc/index.js`](https://github.com/loggur/react-redux-provide/blob/master/examples/todomvc/index.js#L7).

- For displaying the map and updating it, see [`todomvc/components/Footer.js`](https://github.com/loggur/react-redux-provide/blob/master/examples/todomvc/components/Footer.js).

- For everything else, just check the source.  :)
