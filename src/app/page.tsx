'use client';

import ComponentList from '@/components/ComponentList';
import { useState } from 'react';

export default function Home() {
  const [body, setBody] = useState('transaction');

  return (
    <div className="px-4 xl:px-0 mx-auto w-max max-w-screen-xl">
      <h1 className="text-4xl font-bold mb-20">E Commerce</h1>
      <div className="flex gap-x-4 font-bold">
        <button onClick={() => setBody('product')}>Product</button>
        <button onClick={() => setBody('transaction')}>Transaction</button>
      </div>
      <div className="flex items-center justify-between">
        <ComponentList body={body} />
      </div>
    </div>
  );
}
