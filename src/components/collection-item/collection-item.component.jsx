import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  //How It Works
  //create addItem, 
  //whenever addItem is called, it will receive the item as prop
  //then passes it to addItem action that gives us back an object that its type =ADD_ITEM and payload= item
  //and then the action will be dispatched to the Redux Store
  addItem: item => dispatch(addItem(item))
});

//as we are not taking any mapState props, first param is null
export default connect(null, mapDispatchToProps)(CollectionItem);