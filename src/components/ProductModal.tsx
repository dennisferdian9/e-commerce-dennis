import {
  deleteProductFromDB,
  getProductFromDB,
  saveToLocalDB,
} from '@/app/services/product';
import { useModalState } from '@/app/stores/modalState';
import { ProductModel } from '@/types/product.types';
import React, { useState, useEffect } from 'react';

type PropsModel = {
  productId: number | null;
  isDisable?: boolean;
  onSubmit: (product: ProductModel) => void;
};

export default function ProductModal({
  isDisable = false,
  productId,
  onSubmit,
}: Readonly<PropsModel>) {
  const [product, setProduct] = useState<ProductModel | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const closeModalState = useModalState((state) => state.closeModalState);
  const [inputisDisable, setInputisDisabled] = useState<boolean>(isDisable);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setProduct({
          id: 0,
          title: '',
          sku: '',
          price: 0,
          image: '',
          description: '',
        });
        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        console.log(productId);
        const data = (await getProductFromDB(productId)) as ProductModel;
        if (!data) throw new Error('Failed to fetch product data');

        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleClickOutside = () => {
    closeModalState();
  };

  const inputProductValueHandler = (
    attr: keyof ProductModel,
    val: string | number,
  ) => {
    if (!product) return;
    const updatedProduct: ProductModel = {
      ...product,
      [attr]: val,
    };
    setProduct(updatedProduct);
  };

  const toggleEditButtonHandler = () => {
    setInputisDisabled(!inputisDisable);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSubmit(product);
      setInputisDisabled(isDisable);
    }
  };

  const saveToDatabaseHandler = async () => {
    if (!product) return;
    const response: { error: unknown } | null = await saveToLocalDB(product);
    if (response) {
      alert(response.error);
    } else {
      alert('Save to Database success');
    }
  };

  const deleteToDatabaseHandler = async () => {
    if (!product) return;
    const response: { error: unknown } | null = await deleteProductFromDB(
      product.id,
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

  if (!product && !!productId) {
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
              <div>
                <button
                  onClick={deleteToDatabaseHandler}
                  className="text-xs hover:underline text-red-600 mr-2"
                >
                  Delete Product
                </button>
                <button
                  onClick={saveToDatabaseHandler}
                  className="text-xs hover:underline"
                >
                  Save To Database
                </button>
              </div>
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
              value={product?.sku ?? ''}
              disabled={inputisDisable}
            />
          </div>
          <div>
            <label className="text-sm font-bold block" htmlFor="title">
              Title :
            </label>
            <input
              className="w-full px-2 py-1 text-sm outline-none border"
              placeholder="Input Title"
              type="text"
              name="title"
              id="title"
              onChange={(event) =>
                inputProductValueHandler('title', event.target.value)
              }
              value={product?.title ?? ''}
              disabled={inputisDisable}
            />
          </div>

          <div>
            <label className="text-sm font-bold block" htmlFor="image">
              Image :
            </label>
            <input
              className="w-full px-2 py-1 text-sm outline-none border"
              type="text"
              name="image"
              placeholder="Input image link"
              id="image"
              onChange={(event) =>
                inputProductValueHandler('image', event.target.value)
              }
              value={product?.image ?? ''}
              disabled={inputisDisable}
            />
          </div>
          <div className="grid grid-cols-12 items-center">
            <label className="text-sm font-bold col-span-1" htmlFor="price">
              Price :
            </label>
            <input
              className="w-20 px-2 py-1 text-sm outline-none border"
              step={0.01}
              min={0}
              type="number"
              name="price"
              id="price"
              onChange={(event) =>
                inputProductValueHandler(
                  'price',
                  parseFloat(event.target.value),
                )
              }
              value={product?.price ?? ''}
              disabled={inputisDisable}
            />
          </div>
          <div className="grid grid-cols-12 items-center">
            <label className="text-sm font-bold col-span-1" htmlFor="stock">
              Stock :
            </label>
            <input
              className="w-20 px-2 py-1 text-sm outline-none border"
              min={0}
              type="number"
              name="stock"
              id="stock"
              onChange={(event) =>
                inputProductValueHandler('stock', parseInt(event.target.value))
              }
              value={product?.stock ?? ''}
              disabled={inputisDisable}
            />
          </div>
          <div>
            <label className="text-sm font-bold block" htmlFor="description">
              Description :
            </label>
            <textarea
              className="w-full px-2 py-1 outline-none border h-20 text-sm overflow-y-auto"
              name="description"
              placeholder="Input description"
              id="description"
              onChange={(event) =>
                inputProductValueHandler('description', event.target.value)
              }
              value={product?.description ?? ''}
              disabled={inputisDisable}
            ></textarea>
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
