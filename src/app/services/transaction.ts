import {
  Transaction,
  TransactionListResponse,
} from '@/types/transaction.types';

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

export const getTransactionFromDB = async (id: number) => {
  try {
    const data = await fetch('http://localhost:8080/transactions/' + id);
    const transactions = await data.json();

    return transactions.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const postTransactionFromDB = async (
  transaction: Partial<Transaction>,
) => {
  try {
    const data = await fetch('http://localhost:8080/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sku: transaction.sku,
        quantity: transaction.quantity,
        created_at: transaction.created_at,
      }),
    });
    const dataResponse = await data.json();
    console.log(dataResponse);
    return dataResponse.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const updateTransactionFromDB = async (
  id: number,
  transaction: Partial<Transaction>,
) => {
  try {
    const data = await fetch('http://localhost:8080/transaction/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sku: transaction.sku,
        quantity: transaction.quantity,
        created_at: transaction.created_at,
      }),
    });
    const transactionResponse = await data.json();
    return transactionResponse.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const deleteTransactionFromDB = async (id: number) => {
  try {
    const data = await fetch('http://localhost:8080/transaction/' + id, {
      method: 'DELETE',
    });
    const response = await data.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
