import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


/*
To store Login information:
function App()  is converted to class component so that we can have access to State. 
 */
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      //set userReducer with the new object
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Redirect to='/' />
        </Switch>
      </div >
    );
  }
}

/*
use selector (see below)
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});*/

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

//mapDispatchToProps: 
//means whatever is passed in, is going to be an action object that its going to be passed to reducer
const mapDispatchToProps = dispatch => ({
  // trigger/invoke the action with new user value
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


/* DEPENDENCIES*/
/*
"react-scripts": "3.4.3",
npm run deploy : err ELIFECYCLE => npm install
 
npm install gh-pages — save-dev
yarn add redux redux-logger react-redux
yarn add reselect
yarn add redux-persist //to use local or session storage -start setting up from store, root reducer

//??
npm install node-sass 

npm i react-stripe-checkout
*/


/* REDUX SET_UP*/
/*
1. Wrap the Application with Provider (index.js)
2. Create Redux folder
3. Create Reducer (root-reducer.js)
4. Create Reducers for the states (user.reducer etc.)
            - Create User folder
            - Create user.reducer.js // it will get state and action
            - etc.
5. Create Store file with middleware
6. Pass the store into Provider. So that: We can dispacth actions to the store or pull values off of the store

After setting up Redux, continue with action types etc:
7. Create Action (user.action etc) "Action Type" and  "Action Type" in the reducer must be same

How to reach these from the componet:

8. Use connect (higher order component) Pass 2 params mapStateToProps and mapDispatchToProps.
First one is the reducer will allow us to acces state

9. mapStateToProps : get the state (from the reducer) as a prop
.
.
.

Actions will be update Reducers with the appropriate values
Reducer will create a new state object with action.payload
Store will take the Reducer and Middleware and stores them
*/