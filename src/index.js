import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import './index.css';
import App from './App';

/* Provider:
Provider will wrap around our app
As it is parent of everthing, it will let us to reach Store*/

ReactDOM.render(
  <Provider store={store}>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

/*

Redux set up:

1. Wrap the Application wit Provider (index.js)
2. Create Reducer (root-reducer.js)
3. Create Reducers for the states (user.reducer etc.)
4. Create Store file with middleware
5. Create Action (user.action etc) "Action Type" and  "Action Type" in the reducer must be same

Actions will be update Reducers with the appropriate values
Reducer will create a new state object with action.payload
Store will take the Reducer and Middleware and stores them
*/