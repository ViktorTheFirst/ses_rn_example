import React from 'react';
import Navigator from './Navigator';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

//const rootReducer = combineReducers({ red: reducer });
const store = createStore(reducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
