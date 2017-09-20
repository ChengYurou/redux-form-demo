import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducer';
import AppRouter from './route';
import { Reducer as createReducer } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const reducerCreate = (params) => {
  const defaultReducer = createReducer(params);
  return (state, action) => {
    store.dispatch(action);
    return defaultReducer(state, action);
  };
};

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
        <AppRouter createReducer={reducerCreate} />
      </View>
    </Provider>
  );
}