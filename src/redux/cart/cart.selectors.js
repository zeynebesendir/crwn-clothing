import { createSelector } from 'reselect';

//There are 2 types of selectors:
//input selector: 
//it does not use createSelector
//is a function and takes the whole state and returns a slice of it

const selectCart = state => state.cart;


//output selector: does use inputSelectors and createSelector to build themselves

//because createSelector, this is memoized
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
                accumalatedQuantity + cartItem.quantity,
            0
        )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
                accumalatedQuantity + cartItem.quantity * cartItem.price,
            0
        )
);