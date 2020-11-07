import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component.jsx';
import { auth } from './firebase/firebase.utils';


/*
To store Login information:
function App()  is converted to class component so that we can have access to State. 
 */
class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route basename={process.env.PUBLIC_URL} exact path='/' component={HomePage} />
          <Route basename={process.env.PUBLIC_URL} path='/shop' component={ShopPage} />
          <Route basename={process.env.PUBLIC_URL} path='/signin' component={SignInAndSignUpPage} />
        </Switch>

      </div >
    );
  }

}
/*
npm install gh-pages — save-dev

*/
export default App;


