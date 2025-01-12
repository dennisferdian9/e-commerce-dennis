import { TransactionListResponse } from '@/types/transaction.types';

export const getAllTransactionFromDB = async (
  limit: number,
  lastID: number = 1,
) => {
  const data = await fetch(
    `http://localhost:8080/transactions?limit=${limit}&lastid=${lastID}`,
  );
  const transactions = (await data.json()) as TransactionListResponse;
  console.log(transactions);
  return transactions;
};
