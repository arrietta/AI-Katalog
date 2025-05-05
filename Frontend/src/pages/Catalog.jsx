import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [categories, setCategories] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  const fetchProducts = (url = null, append = false) => {
    const params = {};

    if (search) params.search = search;
    if (category) params.sub_category = category;
    if (sort === 'price_asc') params.ordering = 'marketplaces__price';
    if (sort === 'price_desc') params.ordering = '-marketplaces__price';
    if (sort === 'name') params.ordering = 'name';

    const fetchFunction = url
      ? () => fetch(url).then((res) => res.json())
      : () => getProducts(params);

    fetchFunction()
      .then((data) => {
        setProducts((prev) => (append ? [...prev, ...data.results] : data.results));
        setNextPageUrl(data.next);

        if (!append) {
          const uniqueCategories = [
            ...new Set(data.results.map((p) => p.sub_category)),
          ].filter(Boolean);
          setCategories(uniqueCategories);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  return (
    <div className="flex min-h-screen w-11/12 mx-auto gap-6 p-6">
      {/* Sidebar filters */}
      <aside className="w-64 rounded-xl hidden md:block shadow-md p-4 space-y-4 h-fit border-[#B3B3B3] border-2 none">
        <div>
          <label className="block mb-1 font-medium">Поиск</label>
          <input
            type="text"
            placeholder="Поиск по названию"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded bg-[#2B2B2B]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Категория</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded bg-[#2B2B2B]"
          >
            <option value="">Все</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Сортировка</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border rounded bg-[#2B2B2B]"
          >
            <option value="">Без сортировки</option>
            <option value="price_asc">По возрастанию цены</option>
            <option value="price_desc">По убыванию цены</option>
            <option value="name">По имени</option>
          </select>
        </div>

        <button
          onClick={() => {
            setCategory('');
            setSort('');
            setSearch('');
          }}
          className="w-full mt-4 bg-[#3b3b3b] hover:bg-[#5d5c5c] rounded p-2 text-sm"
        >
          Сбросить фильтры
        </button>
      </aside>

      {/* Product grid */}
      <main className="flex-1 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {nextPageUrl && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => fetchProducts(nextPageUrl, true)}
              className="bg-[#3b3b3b] hover:bg-[#5d5c5c] text-white px-4 py-2 rounded"
            >
              Показать ещё
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Catalog;
