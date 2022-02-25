import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';



//Middleware: Add middleware to the store, 
//            so that whenever actions are fired/dispatched, it will be catched and displayed

//  Action ---> Middleware ---> Reducer
//Middleware : catches the action, console.log it and then it moves along by passing them to root reducer..
//Handy for debugging 

const middlewares = [logger];

//we will add more middleware more than logger, to pass it all use "...middlewares"
export const store = createStore(rootReducer, applyMiddleware(...middlewares));



//create persisted version of the store
export const persistor = persistStore(store);


/*
Redux set up:

1. Wrap the Application wit Provider(index.js)
2. Create Reducer(root - reducer.js)
3. Create Reducers for the states(user.reducer etc.)
4. Create Store file with middleware
5. Create Action(user.action etc) "Action Type" and  "Action Type" in the reducer must be same

Actions will be update Reducers with the appropriate values
Reducer will create a new state object with action.payload
Store will take the Reducer and Middleware and stores them
 */