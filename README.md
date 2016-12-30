# redux-seamless-reducers

> Integrate seamless-immutable with Redux

[![npm version](https://img.shields.io/npm/v/redux-seamless-reducers.svg?style=flat-square)](https://www.npmjs.com/package/redux-seamless-reducers)

Wraps the default state and the results of calling `handleActions` from [redux-actions](https://github.com/acdlite/redux-actions) in an `Immutable`.

## Install

Using npm.

```
npm install --save redux-seamless-reducers
```

Using yarn.

```
yarn add redux-seamless-reducers
```

## Usage

```js
import { handleActions } from 'redux-seamless-reducers';

const DefaultState = {};

const actions = {
    'ACTION': (state, action) => {
        return { ...state };
    }
};

export default handleActions(actions, DefaultState);
```

## Pitfalls

### Using with React

Beware that when you using `map` on an immutable array, the array that is being returned is also an immutable object. This doesn't play nice with React. See [this issue](https://github.com/rtfeldman/seamless-immutable/issues/42).

The following code will fail - where `this.renderItemInArray` returns a React element.

```js
this.props.myImmutableArray.map(this.renderItemInArray)
```

instead you need to use the following approach.

```js
// using native JavaScript
[].map.call(this.props.myImmutableArray, this.renderItemInArray)

// using underscore/lodash
_.map(this.props.myImmutableArray, this.renderItemInArray)
```

## API

### handleActions(handlers [, defaultState])

#### handlers

Type: `object`

An action-type-to-reducer map.

#### defaultState

Type: `object`

The default state of the reducer.

## License

MIT
