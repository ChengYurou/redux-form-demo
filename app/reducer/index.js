import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as orderActions from '../actions/order';
import * as _ from 'lodash';

export default combineReducers({
  form: formReducer.plugin({
    order: handleActions({
      [orderActions.updateTotalPrice]: (state, action) => {
        const totalPrice = action.payload.totalPrice;
        return _.assign(state, _.assign(state.values, { totalPrice }))
      },
    }, {}),
  }),
});
