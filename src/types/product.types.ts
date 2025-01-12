export type ProductResponse = {
  data: ProductListModel | ProductModel;
};

export type ProductListModel = {
  products: ProductModel[];
};

export type ProductModel = {
  id: number;
  sku?: string;
  title?: string;
  image?: string;
  price?: number;
  description?: string;
  stock?: number;
};
