import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    //initially, there will be no user
    currentUser: null
};

// A reducer is a function that takes state and action as params
//and based on the action, it determines weather or not it needs to rerender 
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            //return a new object otherwise component wont be updated as react expects new object to rerender
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            //if the action type doesnt match, returns the same state object so nothing will be updated 
            return state;
    }
};

export default userReducer;

/*
User

1.reducer
2.actions

//action type = reducer.action.type
//action type never changes. Use capital letters and Snake case
*/