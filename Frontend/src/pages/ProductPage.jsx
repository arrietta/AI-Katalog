import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/api';
import { Star, Heart } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(setProduct).catch(console.error);
  }, [id]);

  if (!product) return <div className="text-white p-6">Загрузка...</div>;

  const avgRating =
    product.reviews.length > 0
      ? (
          product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
          product.reviews.length
        ).toFixed(1)
      : '—';

  const lowestPrice = product.marketplaces?.[0]?.price || '—';

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full md:w-80 h-80 object-contain rounded-xl bg-white/10 p-4"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-300">Бренд: {product.brand_name}</p>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-semibold">{lowestPrice} ₸</p>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span>{avgRating}</span>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 transition text-white px-4 py-2 rounded-xl">
            <Heart className="w-5 h-5" /> В избранное
          </button>

          <div>
            <h2 className="font-semibold text-lg mt-6 mb-2">Маркетплейсы:</h2>
            <ul className="space-y-2">
              {product.marketplaces.map((mp) => (
                <li
                  key={mp.id}
                  className="flex justify-between items-center bg-white/5 px-4 py-3 rounded"
                >
                  <span>{mp.name}</span>
                  <div className="flex items-center gap-4">
                    <span>{mp.price} ₸</span>
                    <a
                      href={mp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      Перейти
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
