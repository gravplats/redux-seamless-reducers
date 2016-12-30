import test from 'tape';

import { combineReducers, createStore } from 'redux';
import Immutable from 'seamless-immutable';

import handle from './index';


test('default state should be immutable', (t) => {
    const DefaultState = { value: 0 };

    const type = 'action type';
    const test = handle({ [type]: (state) => state }, DefaultState);

    const root = combineReducers({ test });

    const store = createStore(root);
    store.dispatch({ type });

    t.true(Immutable.isImmutable(store.getState().test));
    t.end();
});

test('modified state should be immutable', (t) => {
    const DefaultState = { value: 0 };

    const type = 'action type';
    const test = handle({ [type]: (state) => ({ ...state }) }, DefaultState);

    const root = combineReducers({ test });

    const store = createStore(root);
    store.dispatch({ type });

    t.true(Immutable.isImmutable(store.getState().test));
    t.end();
});
