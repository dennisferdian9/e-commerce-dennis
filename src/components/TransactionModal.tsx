import { deleteProductFromDB } from '@/app/services/product';
import { getTransactionFromDB } from '@/app/services/transaction';
import { useModalState } from '@/app/stores/modalState';
import { Transaction } from '@/types/transaction.types';
import React, { useState, useEffect } from 'react';

type PropsModel = {
  transactionId: number | null;
  isDisable?: boolean;
  onSubmit: (transaction: Partial<Transaction>) => void;
};

export default function ProductModal({
  isDisable = false,
  transactionId,
  onSubmit,
}: Readonly<PropsModel>) {
  const [transaction, setTransaction] = useState<Partial<Transaction> | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const closeModalState = useModalState((state) => state.closeModalState);
  const [inputisDisable, setInputisDisabled] = useState<boolean>(isDisable);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!transactionId) {
        setTransaction({
          id: 0,
          sku: '',
          quantity: 0,
        });
        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        const data = (await getTransactionFromDB(transactionId)) as Transaction;
        if (!data) throw new Error('Failed to fetch product data');

        setTransaction(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [transactionId]);

  const handleClickOutside = () => {
    closeModalState();
  };

  const inputProductValueHandler = (
    attr: keyof Transaction,
    val: string | number,
  ) => {
    if (!transaction) return;
    const updatedTransaction = {
      ...transaction,
      [attr]: val,
    };
    setTransaction(updatedTransaction);
  };

  const toggleEditButtonHandler = () => {
    setInputisDisabled(!inputisDisable);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (transaction) {
      onSubmit(transaction);
      setInputisDisabled(isDisable);
    }
  };

  const deleteToDatabaseHandler = async () => {
    if (!transaction) return;
    const response: { error: unknown } | null = await deleteProductFromDB(
      transaction.id ?? 0,
    );
    if (!response) {
      alert('Error while save to delte product');
    } else {
      alert('Delete Product Success');
    }
  };

  if (loading) {
    return (
      <div className="fixed bg-opacity-80 bg-black inset-0 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!transaction && !!transactionId) {
    return (
      <div className="fixed bg-opacity-80 bg-black inset-0 flex items-center justify-center">
        <div className="text-white text-xl">No product found</div>
      </div>
    );
  }

  return (
    <div className="fixed bg-opacity-80 bg-black inset-0 flex items-center justify-center">
      <div className="w-full max-w-screen-md bg-white px-4 py-8">
        <h2 className="font-bold text-2xl">Product</h2>
        {isDisable && (
          <div className="flex gap-x-2  items-center">
            {inputisDisable && (
              <button
                onClick={deleteToDatabaseHandler}
                className="text-xs hover:underline text-red-600 mr-2"
              >
                Delete Product
              </button>
            )}

            <button
              className="text-xs hover:underline"
              onClick={toggleEditButtonHandler}
            >
              {inputisDisable ? 'Edit Product' : 'Cancel Edit'}
            </button>
          </div>
        )}

        <form onSubmit={submitHandler} className="flex flex-col gap-y-4 mt-2">
          <div className="grid grid-cols-12 items-center">
            <label className="text-sm font-bold " htmlFor="sku">
              SKU :
            </label>
            <input
              className="px-2 py-1 w-32 text-sm outline-none border"
              type="text"
              name="sku"
              placeholder="Input sku"
              id="sku"
              onChange={(event) =>
                inputProductValueHandler('sku', event.target.value)
              }
              value={transaction?.sku ?? ''}
              disabled={inputisDisable}
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className="text-sm font-bold col-span-1" htmlFor="stock">
              Quantity :
            </label>
            <input
              className="w-20 px-2 py-1 text-sm outline-none border"
              min={0}
              type="number"
              name="stock"
              id="stock"
              onChange={(event) =>
                inputProductValueHandler(
                  'quantity',
                  parseInt(event.target.value),
                )
              }
              value={transaction?.quantity ?? ''}
              disabled={inputisDisable}
            />
          </div>

          <div className="flex gap-x-2 justify-end items-center ">
            <button onClick={handleClickOutside} className="text-sm py-2">
              Close
            </button>
            {!inputisDisable && (
              <button
                className="bg-blue-700 text-white font-bold px-3 py-2 rounded"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
