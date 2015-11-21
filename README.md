# redux-seamless-reducers

> Integrate seamless-immutable with Redux

[![npm version](https://img.shields.io/npm/v/redux-seamless-reducers.svg?style=flat-square)](https://www.npmjs.com/package/redux-seamless-reducers)

Borrows heavily from [redux-actions](https://github.com/acdlite/redux-actions).

## Install

```
npm install --save redux-seamless-reducers
```

## Usage

```js
import handle from 'redux-seamless-reducers';

const DefaultState = {};

export default handle({

    'ACTION': (state, action) => {
        return { ...state };
    }

}, DefaultState);
```

## API

### handle(reducerMap [, defaultState])

#### reducerMap

Type: `object`

An action-type-to-reducer map.

#### defaultState

Type: `object`

The default state of the reducer.

## License

MIT
