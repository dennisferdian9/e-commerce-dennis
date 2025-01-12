import { ProductModel } from '@/types/product.types';
import { create } from 'zustand';

interface ModalState {
  modalIsOpen: boolean;
  method: string;
  product: ProductModel | null;
  isDisable: boolean;
  openModalState: (
    behavior: ModalState['method'],
    isDisable: boolean,
    product?: ModalState['product'],
  ) => void;
  closeModalState: () => void;
}

export const useModalState = create<ModalState>((set) => ({
  modalIsOpen: false,
  method: '',
  product: null,
  isDisable: false,
  openModalState: (
    behavior: ModalState['method'],
    isDisable: boolean,
    product?: ModalState['product'],
  ) =>
    set(() => ({
      modalIsOpen: true,
      method: behavior,
      isDisable: isDisable,
      product: product ?? null,
    })),
  closeModalState: () =>
    set(() => ({ modalIsOpen: false, method: '', product: null })),
}));
