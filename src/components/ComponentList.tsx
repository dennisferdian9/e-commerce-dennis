import React from 'react';
import ProductBody from '@/components/ProductBody';
import TransactionBody from '@/components/TransactionBody';

const ComponentList = ({ body }: { body: string }) => {
  if (body === 'product') {
    return <ProductBody />;
  } else {
    return <TransactionBody />;
  }
};

export default ComponentList;
