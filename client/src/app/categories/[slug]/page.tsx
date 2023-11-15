'use client';

import React from 'react';
import Products from '../../../components/Products';
import { useGetCategory } from '@/src/api/categories';

interface ProductsPageProps {
  params: { slug: string };
}

const ProductsPage = ({ params }: ProductsPageProps) => {
  const { slug } = params;
  const {
    data: category,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategory(slug);

  if (isCategoryError) throw new Error(categoryError.message);

  return (
    <div>
      <Products
        name={`${category?.name} Products`}
        products={category?.products}
      />
    </div>
  );
};

export default ProductsPage;
