import { Transaction } from '@/types/transaction.types';
import { create } from 'zustand';

interface TransactionModalState {
  modalIsOpen: boolean;
  method: string;
  transaction: Transaction | null;
  isDisable: boolean;
  openModalState: (
    behavior: TransactionModalState['method'],
    isDisable: boolean,
    product?: TransactionModalState['transaction'],
  ) => void;
  closeModalState: () => void;
}

export const useTransactionModalState = create<TransactionModalState>(
  (set) => ({
    modalIsOpen: false,
    method: '',
    transaction: null,
    isDisable: false,
    openModalState: (
      behavior: TransactionModalState['method'],
      isDisable: boolean,
      product?: TransactionModalState['transaction'],
    ) =>
      set(() => ({
        modalIsOpen: true,
        method: behavior,
        isDisable: isDisable,
        product: product ?? null,
      })),
    closeModalState: () =>
      set(() => ({ modalIsOpen: false, method: '', product: null })),
  }),
);
