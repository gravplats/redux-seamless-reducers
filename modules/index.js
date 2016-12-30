import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';


export default (handlers, defaultState = {}) => {
    const reducer = handleActions(handlers, Immutable(defaultState));
    return (state, action) => Immutable(reducer(state, action));
};
