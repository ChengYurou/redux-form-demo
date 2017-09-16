import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducer';
// import SimpleForm from './container/form';
import Order from './container/order';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const logger = createLogger({ collapsed: true });
const middlewares = [logger];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function FromApp() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Order />
      </View>
    </Provider>
  );
}