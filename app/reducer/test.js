import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux'

const test = handleActions({}, []);

export default combineReducers({
  test,
});

