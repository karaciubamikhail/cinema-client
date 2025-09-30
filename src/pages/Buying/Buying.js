import React from 'react';
import BuyingWrapper from './BuyingWrapper';
import Payment from './Payment';

/**
 * Компонент оплаты билета
 */
export default function Buying({ name, ...props }) {
  if (name?.toLowerCase() === 'payment')
    return (
      <BuyingWrapper>
        <Payment />
      </BuyingWrapper>
    );
  return null;
}
