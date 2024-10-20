/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import { Provider,  } from 'react-redux';
import store from './src/redux/store';
import StackWrapper from './StackWrapper';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './src/utils/firebaseConfig';




function App(): React.JSX.Element {

useEffect(() => {

  const app = initializeApp(firebaseConfig);
}, [])

  return (
    <Provider store={store}>
    <StackWrapper/>
  </Provider>
  );
}


export default App;
