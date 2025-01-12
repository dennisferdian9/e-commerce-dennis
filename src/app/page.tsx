import ProductBody from '@/components/ProductBody';
import TransactionBody from '@/components/TransactionBody';
import { useState } from 'react';

export default function Home() {
  const [body, setBody] = useState('product');

  return (
    <div className="px-4 xl:px-0 mx-auto w-max">
      <h1 className="text-4xl font-bold mb-20">E Commerce</h1>
      <div className="flex gap-x-4 font-bold">
        <button onClick={() => setBody('product')}>Product</button>
        <button onClick={() => setBody('transaction')}>Transaction</button>
      </div>
      <div className="flex items-center justify-between">
        {body === 'product' && <ProductBody />}
        {body === 'transaction' && <TransactionBody />}
      </div>
    </div>
  );
}
