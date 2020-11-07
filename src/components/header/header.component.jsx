import React from 'react';
import { Link, HashRouter } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = () => (
  <HashRouter basename='/'>
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
      </Link>
        <Link className='option' to='/shop'>
          CONTACT
      </Link>
      </div>
    </div>
  </HashRouter>
);

export default Header;