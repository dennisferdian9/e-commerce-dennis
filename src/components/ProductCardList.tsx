'use client';

import { useCallback, useEffect, useState } from 'react';
import { ProductListModel, ProductModel } from '@/types/product.types';
import ProductCard from './ProductCard';
import { getAllProductFromDB } from '@/app/services/product';

export default function ProductCardList() {
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8; // Number of products to fetch per load

  const fetchProducts = useCallback(async (skip: number) => {
    setLoading(true);
    try {
      const newProducts = await getAllProductFromDB(skip, limit);
      const newProductDataList = newProducts.data as ProductListModel;
      setProductList((prevProducts) => [
        ...prevProducts,
        ...newProductDataList.products,
      ]);
      if (newProductDataList.products.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(0);
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        fetchProducts(productList.length);
      }
    };

    const debounceHandleScroll = debounce(handleScroll, 200);

    window.addEventListener('scroll', debounceHandleScroll);
    return () => window.removeEventListener('scroll', debounceHandleScroll);
  }, [loading, hasMore, productList.length, fetchProducts]);

  return (
    <div className="w-[800px] gap-x-8 gap-y-4 mx-auto ">
      {productList.map((product) => (
        <ProductCard
          key={`${product.id}-${product.sku}`}
          sku={product.sku ?? ''}
          title={product.title ?? ''}
          image={product.image ?? ''}
          price={product.price ?? 0}
          description={product.description ?? ''}
          id={product.id}
        />
      ))}
      {loading && <div className="w-screen">Loading products...</div>}
      {!hasMore && <div className="w-screen">No more products to display.</div>}
    </div>
  );
}

function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, wait);
  };
}
