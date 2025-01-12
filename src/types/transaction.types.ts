export type Transaction = {
  id: number;
  sku: string;
  created_at: string;
  quantity: number;
};

export type TransactionListResponse = {
  data: Transaction[];
};

export type TransactionResponse = {
  data: Transaction;
};
