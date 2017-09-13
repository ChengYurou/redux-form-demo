import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import test from './test';

export default combineReducers({
  test,
  form: formReducer,
});
