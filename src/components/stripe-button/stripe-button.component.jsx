import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import config from '../../config.js';

const StripeCheckoutButton = ({ price }) => {
    //stripe expecting payments to be in cents
    //50$ =5000cents  - priceForStripe= price*100;

    const priceForStripe = price * 100;
    //Z const publishableKey = config.STRIPE_KEY;

    const onToken = token => {
        console.log(token);
        //this is where you call the API for the payment
        alert('Payment Succesful!');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            //Z billingAddress
            //Z shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={config.STRIPE_KEY}
        />
    );
};

export default StripeCheckoutButton;
