import React from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import store from '@store/store';
import Auth from '@pages/Auth/Auth';

const App = () => {
  return (
    <Provider store={store}>
      <Auth>
        <Router />
      </Auth>
    </Provider>
  )
}

export default App;