import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

//Object.keys: get all the keys of the object and retuns keys as an array
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);

/*Z
export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    );*/

//selectCollection is wrapped by memoize to prevent unnecessary calls when state changes
//Memoize does the same idea of memoization as reselect does for our selectors, 
//except this time we're memoizing the return of our function which returns our selector:

//By wrapping this function is memoize, 
//we're saying that whenever this function gets called and receives collectionUrlParam, 
//I want to memoize the return of this function (in this case we return a selector). 
//If this function gets called again with the same collectionUrlParam, 
//don't rerun this function because we'll return the same value as last time, 
//which we've memoized so just return the selector that's been stored.
export const selectCollection = memoize(collectionUrlParam =>
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam])
);

/* 
    Full desc:

    Memoizing selectCollection and collectionUrlParam

    selectCollection function we just wrote is not memoized 
    due to collectionUrlParam being passed in 
    from our collection component's mapStateToProps running 
    whenever our state changes and and calling a new instance of our selectCollection function. 
    In this case collectionUrlParam is a dynamic argument meaning it can change, 
    so to memoize selectCollection we actually have to memoize the whole function 
    using a memoize helper function. We can leverage the lodash library
    [https://lodash.com/docs/4.17.15#memoize], 
    specifically their memoize helper function by adding it our packages like so:
    
    If using yarn:
    
    yarn add lodash.memoize
    
    
    If using npm:
    
    npm install lodash.memoize
    
    
    And to use it, 
    we import our newly installed memoize helper function at the top of shop.
    selectors.jsx like so:

import memoize from 'lodash.memoize';
    And just wrap our selectCollection function with memoize like so:

export const selectCollection = memoize((collectionUrlParam) =>
    createSelector(
        [selectCollections],
        (collections) => collections[collectionUrlParam]
    )
);
    Memoize does the same idea of memoization as reselect does for our selectors, 
    except this time we're memoizing the return of our function which returns our selector:

    (collectionUrlParam) =>
createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
)
    By wrapping this function is memoize, 
    we're saying that whenever this function gets called and receives collectionUrlParam, 
    I want to memoize the return of this function (in this case we return a selector). 
    If this function gets called again with the same collectionUrlParam, 
    don't rerun this function because we'll return the same value as last time, 
    which we've memoized so just return the selector that's been stored.
*/
