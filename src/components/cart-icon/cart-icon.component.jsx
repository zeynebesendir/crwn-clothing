import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});


/*
-Every time state changes, this mapStateToProps re-render to update components
-even if the user state changes(which is irrelecent for this component), this mapStateToProps still will be triggered
-even though the value in the state is same/identical, as the state will be new state with each update, components will re-render
-not good for the performance.

Solution:
    Use reselect that will allow us to memoize and not re-render a component if the state value does not change.
    *yarn add reselect

For this instance: Due to itemCount being a primitive (integer),
redux will do a shallow equality check under the hood between state changes in mapStateToProps    
edux's mapStateToProps has a shallow equality check for every value in the object; 
it won't replace values if they pass a shallow equality check which means it won't needlessly re-render,
but if we have transformation logic it's still valuable to memoize it with a selector to save us running duplicate logic to get the same output.


const mapStateToProps = ({ cart: { cartItems } }) => ({

    itemCount: cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
});*/

/*
used memoized selector for itemsCount. So that, it wont re-render for every state update

// use selector (see below)
const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
});*/

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);