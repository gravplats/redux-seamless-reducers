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

test('returns state for unknown action', (t) => {
    const DefaultState = { value: 0 };

    const type = 'action type';
    const test = handle({ [type]: (state) => ({ ...state }) }, DefaultState);

    const root = combineReducers({ test });

    const store = createStore(root);
    store.dispatch({ type: 'unknown action type' });

    t.same(store.getState().test, DefaultState);
    t.end();
});

test('uses next() if action is not an error', (t) => {
    let wasCalled = false;

    const type = 'action type';
    const test = handle({
        [type]: {
            'next': (state) => {
                wasCalled = true;
                return { ...state };
            }
        }
    }, { value: 0 });

    const store = createStore(combineReducers({ test }));
    store.dispatch({ type });

    t.true(wasCalled);
    t.end();
});

test('uses throw() if action is an error', (t) => {
    let wasCalled = false;

    const type = 'action type';
    const test = handle({
        [type]: {
            'throw': (state) => {
                wasCalled = true;
                return { ...state };
            }
        }
    }, { value: 0 });

    const store = createStore(combineReducers({ test }));
    store.dispatch({ type, error: true });

    t.true(wasCalled);
    t.end();
});
