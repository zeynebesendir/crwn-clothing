import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>{/**
       *  <Link className='option' to='/shop'>
        CONTACT
      </Link>
       *  */
      }

      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}

      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);


//use mapStateToProps to get properties from Reducers
/*
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden
});*/

//get states using selector
//returns and object
//createStructuredSelector:less code re-write 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

//Higher Order Companent - functions that take components as arguments and returns a new component

//Connect is a Higher Order Component 
//It lets us modify the component, have access to the things related the redux
//Pass 2 functions (second one is optional) with connect and it will return a new higher order companent
//Pass Header to the new higher order component
export default connect(mapStateToProps)(Header);