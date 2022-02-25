import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';


import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

/*
false values in JS:
0
false
undefined
null
NaN
""

So, cartItems.length (0) can be false
*/
const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
            ) : (
                <span className='empty-message'>Your cart is empty</span>
            )}
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');

            //dispatch called here without writing it below
            //connect already passes dispatch if we dont supply dispatchToProps 
            //just get the dispatch as prop and use
            dispatch(toggleCartHidden());
        }}
        >
            GO TO CHECKOUT
        </CustomButton>
    </div>
);

/* 
use selector instead (see below)
so that cart dropdown wont be re-render with the unrelated state changes
const mapStateToProps = ({ cart: { cartItems } }) => ({
    cartItems
});*/

/* use selector (see below)
const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
});*/


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

//Wrap the Connected component inside the withRouter
//as the higher order components take components as arguments, 
//withRouter will take connect(mapStateToProps)(CartDropdown) as argument

//with withRouter,the component will have access to History

export default withRouter(connect(mapStateToProps)(CartDropdown));

//IF we need to make one-off action dispatchers, no need to write mapDispatchToProps
//Because:
//Connect actually passes the dispatcher into the component as a prop,
//If we dont supply dispatcher as a second param

