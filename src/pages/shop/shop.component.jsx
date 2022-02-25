import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

/*
 Main App Router in App Js,  passes match, location and history
 console.log(match) to see what it contains
 */

/*
<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
*/
const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;