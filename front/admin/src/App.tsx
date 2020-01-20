import React from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import store from '@store/store';
import Auth from '@pages/Auth/Auth';
import Confirmation from '@components/Confirmation/Confirmation';

const App = () => {
  return (
    <Provider store={store}>
      <Auth>
        <Router />
      </Auth>
      <Confirmation />
    </Provider>
  );
};

export default App;
