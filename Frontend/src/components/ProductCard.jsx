import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, image_url, marketplaces } = product;
  const price = marketplaces?.[0]?.price ?? '—';

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="bg-[#3B3B3B] rounded-xl h-80 mx-2 shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
        <img
          src={image_url}
          alt={name}
          className="w-full h-48 object-contain bg-white"
        />
        <div className="p-4">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-sm text-white">{price} ₸</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
