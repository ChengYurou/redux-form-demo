import { createAction } from 'redux-actions';

export const updateTotalPrice = createAction({
  UPDATE_TOTAL_PRICE: totalPrice => ({totalPrice})
});

export default null;