import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';

import form from  './form';

export default combineReducers({
  form,
  simpleForm: formReducer,
});
