import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

/* Provider:
Provider will wrap around our app
As it is parent of everthing, it will let us to reach Store*/

/*
import PersistGate
wrap the App with PersistGate, so the app could access the persisted store

it will receive the store and fire off actions that rehydrate the state
*/
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
