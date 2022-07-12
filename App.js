import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Reducer/store';
import NavigationRoot from './src/Navigation'

export default function App() {

  return (
    <Provider store={store}>
      <NavigationRoot />
    </Provider>
  );
}