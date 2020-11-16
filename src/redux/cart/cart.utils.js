export const addItemToCart = (cartItems, cartItemToAdd) => {

    //Find out If the cart item exists in the list
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    //If item exists in the list
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            //find the item and increase the quantity
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                //if item can not be found, return the current state
                : cartItem
        );
    }

    //If the item is not exist in the list, add the item into the list and set the quantity 1
    ////this statement: gets all the cartItems array and adds the cartItemToAdd end of the array
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        //remove the item if there is only 1
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem =>
        //decrease the quantity if there is more than 1
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};