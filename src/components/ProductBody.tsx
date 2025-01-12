'use client';

import ProductModal from '@/components/ProductModal';
import ProductCardList from '@/components/ProductCardList';
import { useEffect } from 'react';
import { ProductModel } from '@/types/product.types';
import { useModalState } from '@/app/stores/modalState';
import { postProductFromDB, updateProductFromDB } from '@/app/services/product';

export default function BodyContent() {
  const openModalState = useModalState((state) => state.openModalState);
  const closeModalState = useModalState((state) => state.closeModalState);

  const defaultProduct = useModalState((state) => state.product);
  const isDisable = useModalState((state) => state.isDisable);

  const submitProductMethod = useModalState((state) => state.method);

  const modalisOpen = useModalState((state) => state.modalIsOpen);
  useEffect(() => {
    if (modalisOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalisOpen]);

  const addProductButtonHandler = () => {
    openModalState('create', false, null);
  };

  const onSubmitHandler = async (value: ProductModel) => {
    if (submitProductMethod === 'create') {
      console.log(submitProductMethod, value);
      const response = await postProductFromDB(value);
      if (response) {
        alert(response.error);
      } else {
        alert('create new Product is Success');
        closeModalState();
      }
    } else {
      const response = await updateProductFromDB(value.id, value);
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
          onClick={addProductButtonHandler}
          className="bg-green-600 text-white px-3 py-2 rounded-sm font-bold"
        >
          Add Product
        </button>
      </div>
      <ProductCardList />
      {modalisOpen && (
        <ProductModal
          productId={defaultProduct?.id ?? null}
          isDisable={isDisable}
          onSubmit={onSubmitHandler}
        />
      )}
    </div>
  );
}
