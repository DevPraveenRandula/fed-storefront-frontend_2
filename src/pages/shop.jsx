import React, { useState } from 'react';
import { useGetCategoriesQuery, useGetProductsQuery } from '@/lib/api';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCards from '../ProductCards';
import Tab from '../Tab';

const Shop = () => {
  const { data: products = [], isLoading: isProductsLoading } = useGetProductsQuery();
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('ASC');

  const handleTabClick = (_id) => setSelectedCategoryId(_id);
  const handleSortChange = (order) => setSortOrder(order);

  const filteredProducts = selectedCategoryId === 'ALL' 
    ? products 
    : products.filter((product) => product.categoryId === selectedCategoryId);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === 'ASC' ? a.price - b.price : b.price - a.price;
  });

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
      {/* Skeleton Tabs */}
      <div className="mt-4 flex items-center gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Skeleton Filter and Sort */}
      <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-10 w-40" />
        </div>

      {/* Skeleton Products */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    </section>
    );
  }

  return (
    <section className='px-8 py-8'>
      <h2 className='text-4xl font-bold uppercase'>Product categories</h2>
      <Separator className='mt-2' />
      
      {/* Category Tabs */}
      <div className='mt-4 flex items-center gap-4'>
        {[{ _id: 'ALL', name: 'All' }, ...categories].map((category) => (
          <Tab
            key={category._id}
            _id={category._id}
            selectedCategoryId={selectedCategoryId}
            name={category.name}
            onTabClick={handleTabClick}
          />
        ))}
      </div>
      
      {/* Sorting Dropdown */}
      <div className='mt-4'>
        <label className='mr-2'>Sort by Price:</label>
        <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)}>
          <option value='ASC'>Ascending</option>
          <option value='DESC'>Descending</option>
        </select>
      </div>
      
      {/* Product List */}
      <ProductCards products={sortedProducts} />
    </section>
  );
};

export default Shop;
