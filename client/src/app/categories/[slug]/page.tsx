'use client';

import React from 'react';
import Products from '../../../components/Products';
import { useGetCategory } from '@/src/api/categories';
import { useGetProducts } from '@/src/api/products';
import { useSearchParams } from 'next/navigation';

interface ProductsPageProps {
  params: { slug: string };
}

const ProductsPage = ({ params }: ProductsPageProps) => {
  const { slug } = params;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || undefined;

  const {
    data: category,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategory(slug);

  const { data: productsData } = useGetProducts(category?.id, page, sort);

  if (isCategoryError) throw new Error(categoryError.message);

  return (
    <div>
      <Products
        name={`${category?.name} Products`}
        productsData={productsData}
      />
    </div>
  );
};

export default ProductsPage;
