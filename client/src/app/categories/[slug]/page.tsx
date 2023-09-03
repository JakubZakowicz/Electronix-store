'use client';

import React from 'react';
import Products from '../../../components/Products';
import { useGetCategory } from '@/src/api/categories';

interface ProductsPageProps {
  params: { slug: string };
}

const ProductsPage = ({ params }: ProductsPageProps) => {
  const { slug } = params;
  const { data: category } = useGetCategory(slug);

  return (
    <div>
      <Products name="Virtual Reality Products" products={category?.products} />
    </div>
  );
};

export default ProductsPage;
