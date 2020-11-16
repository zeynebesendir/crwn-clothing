import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
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

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  /*DEVELOPMENT

  render() {
    return (
      <div>
        <Header />
        <Switch basename='/'>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() =>
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
                <SignInAndSignUpPage />
              )
          }
          />
        </Switch>
      </div>
    );
  }
}*/

  /* GITHUB.IO*/
  render() {
    return (
      <div>
        <Header />
        <HashRouter basename='/'>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() =>
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
                <SignInAndSignUpPage />
              )
          }
          />
        </HashRouter>
      </div >
    );
  }
}
/*
"react-scripts": "3.4.3",
npm run deploy : err ELIFECYCLE => npm install
 
npm install gh-pages — save-dev
yarn add redux redux-logger react-redux
yarn add reselect
 
*/

/* use selector (see below)
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});*/

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

//mapDispatchToProps: means whatever is passed in
// going to be an action object that its going to be passed to reducer
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


