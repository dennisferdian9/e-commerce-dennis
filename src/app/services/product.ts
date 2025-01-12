import { ProductModel, ProductResponse } from '@/types/product.types';

export const getAllProductFromDB = async (skip: number, limit: number) => {
  const data = await fetch(
    `http://localhost:8080/products?limit=${limit}&skip=${skip}`,
  );
  const products = (await data.json()) as ProductResponse;
  return products;
};

export const getProductFromDB = async (id: number) => {
  try {
    const data = await fetch('http://localhost:8080/product/' + id);
    const products = (await data.json()) as ProductResponse;

    return products.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const postProductFromDB = async (product: ProductModel) => {
  try {
    const data = await fetch('http://localhost:8080/product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: product.title,
        sku: product.sku,
        image: product.image,
        price: product.price,
        description: product.description,
        stock: product.stock,
      }),
    });
    const products = (await data.json()) as ProductResponse;
    return await saveToLocalDB({ ...products.data, ...product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const updateProductFromDB = async (
  id: number,
  product: ProductModel,
) => {
  try {
    const data = await fetch('http://localhost:8080/product/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: product.title,
        sku: product.sku,
        image: product.image,
        price: product.price,
        description: product.description,
        stock: product.stock,
      }),
    });
    const products = (await data.json()) as ProductResponse;
    console.log(products);
    return await saveToLocalDB(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const deleteProductFromDB = async (id: number) => {
  try {
    const data = await fetch('http://localhost:8080/product/' + id, {
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

export const saveToLocalDB = async (product: ProductModel) => {
  try {
    console.log('save to locl', product);
    const response = await fetch(`http://localhost:8080/product/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: product.title,
        sku: product.sku,
        image: product.image,
        price: product.price,
        stock: product.stock,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({
        message: 'Unable to parse error response',
      }));
      throw {
        status: response.status,
        statusText: response.statusText,
        errorDetails,
      };
    }

    const products = (await response.json()) as ProductResponse;

    console.log(products);
    return null;
  } catch (error) {
    console.error('Error saving product:', error);

    // Return the full error object to the caller
    return {
      success: false,
      error: error instanceof Error ? { message: error.message } : error,
    };
  }
};
