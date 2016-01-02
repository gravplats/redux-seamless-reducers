import test from 'ava';
import { combineReducers, createStore } from 'redux';
import Immutable from 'seamless-immutable';

import handle from '../lib/index';


test('default state should be immutable', (t) => {
    const DefaultState = { value: 0 };

    let type = 'action type';
    let test = handle({ [type]: (state) => state }, DefaultState);

    let root = combineReducers({ test });

    let store = createStore(root);
    store.dispatch({ type });

    t.true(Immutable.isImmutable(store.getState().test));
});

test('modified state should be immutable', (t) => {
    const DefaultState = { value: 0 };

    let type = 'action type';
    let test = handle({ [type]: (state) => ({ ...state }) }, DefaultState);

    let root = combineReducers({ test });

    let store = createStore(root);
    store.dispatch({ type });

    t.true(Immutable.isImmutable(store.getState().test));
});

test('returns state for unknown action', (t) => {
    const DefaultState = { value: 0 };

    let type = 'action type';
    let test = handle({ [type]: (state) => ({ ...state }) }, DefaultState);

    let root = combineReducers({ test });

    let store = createStore(root);
    store.dispatch({ type: 'unknown action type' });

    t.same(store.getState().test, DefaultState);
});

test('uses next() if action is not an error', (t) => {
    let wasCalled = false;

    let type = 'action type';
    let test = handle({
        [type]: {
            'next': (state) => {
                wasCalled = true;
                return { ...state };
            }
        }
    }, { value: 0 });

    let store = createStore(combineReducers({ test }));
    store.dispatch({ type });

    t.true(wasCalled);
});

test('uses throw() if action is an error', (t) => {
    let wasCalled = false;

    let type = 'action type';
    let test = handle({
        [type]: {
            'throw': (state) => {
                wasCalled = true;
                return { ...state };
            }
        }
    }, { value: 0 });

    let store = createStore(combineReducers({ test }));
    store.dispatch({ type, error: true });

    t.true(wasCalled);
});
