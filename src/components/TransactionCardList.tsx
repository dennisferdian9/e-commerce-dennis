'use client';

import { useCallback, useEffect, useState } from 'react';
import { getAllTransactionFromDB } from '@/app/services/transaction';
import { Transaction } from '@/types/transaction.types';
import TransactionCard from './TransactionCard';

export default function TransactionCardList() {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10; // Number of products to fetch per load

  const fetchTransaction = useCallback(
    async (lastID: number) => {
      setLoading(true);
      try {
        const newTransactionResponse = await getAllTransactionFromDB(
          limit,
          lastID,
        );
        console.log('getData', newTransactionResponse);
        const newTransactionList = newTransactionResponse.data;
        setTransactionList((prevTransactions) => [
          ...prevTransactions,
          ...newTransactionList,
        ]);
        if (newTransactionList.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    },
    [transactionList],
  );

  useEffect(() => {
    fetchTransaction(0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        console.log('test', transactionList[transactionList.length - 1].id);
        fetchTransaction(transactionList[transactionList.length - 1].id);
      }
    };

    const debounceHandleScroll = debounce(handleScroll, 500);

    window.addEventListener('scroll', debounceHandleScroll);
    return () => window.removeEventListener('scroll', debounceHandleScroll);
  }, [loading, hasMore, transactionList.length, fetchTransaction]);

  return (
    <div className="w-[800px] gap-x-8 gap-y-4 mx-auto ">
      {transactionList.map((transaction) => (
        <TransactionCard
          key={`${transaction.id}-${transaction.created_at}`}
          quantity={transaction.quantity ?? 0}
          sku={transaction.sku ?? ''}
          id={transaction.id}
        />
      ))}
      {loading && <div className="w-screen">Loading products...</div>}
      {!hasMore && (
        <div className="w-screen">No more Transactions to display.</div>
      )}
    </div>
  );
}

function debounce(func: () => void, wait: number) {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func();
    }, wait);
  };
}
