import { useTransactionModalState } from '@/app/stores/transactionModalState';
import TransactionCardList from './TransactionCardList';
import { useEffect } from 'react';
import TransactionModal from './TransactionModal';
import { Transaction } from '@/types/transaction.types';
import {
  postTransactionFromDB,
  updateTransactionFromDB,
} from '@/app/services/transaction';

export default function TransactionBody() {
  const openModalState = useTransactionModalState(
    (state) => state.openModalState,
  );
  const closeModalState = useTransactionModalState(
    (state) => state.closeModalState,
  );

  const defaultTransaction = useTransactionModalState(
    (state) => state.transaction,
  );
  const isDisable = useTransactionModalState((state) => state.isDisable);

  const submitTransactionMethod = useTransactionModalState(
    (state) => state.method,
  );

  const modalisOpen = useTransactionModalState((state) => state.modalIsOpen);
  useEffect(() => {
    if (modalisOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalisOpen]);

  const addTransactionButtonHandler = () => {
    openModalState('create', false, null);
  };

  const onSubmitHandler = async (value: Partial<Transaction>) => {
    if (submitTransactionMethod === 'create') {
      console.log(submitTransactionMethod, value);
      const response = await postTransactionFromDB(value);
      if (response) {
        alert(response.error);
      } else {
        alert('create new Product is Success');
        closeModalState();
      }
    } else {
      const response = await updateTransactionFromDB(value.id ?? 1, value);
      if (response) {
        alert(response.error);
      } else {
        alert('Save to Database success');
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2>List Of Product</h2>
        <button
          onClick={addTransactionButtonHandler}
          className="bg-green-600 text-white px-3 py-2 rounded-sm font-bold"
        >
          Add Transaction
        </button>
      </div>
      <TransactionCardList />
      {modalisOpen && (
        <TransactionModal
          transactionId={defaultTransaction?.id ?? null}
          isDisable={isDisable}
          onSubmit={onSubmitHandler}
        />
      )}
    </div>
  );
}
