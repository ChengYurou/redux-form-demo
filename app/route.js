import React from 'react';
import {
  Router,
  Scene,
  Modal,
} from 'react-native-router-flux';

import Order from './container/order';
import CustomerInfo from './container/customerInfo';

function AppRouter(props) {
  return (
    <Router createReducer={props.createReducer}>
      <Modal hideNavBar key="root">
        <Scene
          key="order"
          component={Order}
        />
        <Scene
          key="customerInfo"
          component={CustomerInfo}
        />
      </Modal>
    </Router>
  );
}

AppRouter.propTypes = {
  createReducer: React.PropTypes.func.isRequired,
};

export default AppRouter;
