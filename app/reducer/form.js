import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux'

const form = handleActions({}, []);

export default combineReducers({
  form,
});

