import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//local storage object of the window browser 
import storage from 'redux-persist/lib/storage';


import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

//user is stored by Firebase Auth, so we dont need to keep it in the storage
//Cart will be kept in the storage (inside the whitelist array)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

//Main reducer
//use combine reducer to create actual rootreducer object
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

//wrap the reducer with Persist Reducer, 
//it will return rootReducer along with persistConfig capabilities
export default persistReducer(persistConfig, rootReducer);
