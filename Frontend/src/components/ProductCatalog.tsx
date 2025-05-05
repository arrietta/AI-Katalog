import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  product_id: string;
  name: string;
  price: string;
  image_url: string;
  product_url: string;
  market_place: string;
};

const ProductCatalog: React.FC<{ ids: string[] }> = ({ ids }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const results = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`http://127.0.0.1:8000/catalog/products/${id}/`);
          return res.json();
        })
      );
      setProducts(results);
    };

    if (ids.length > 0) loadProducts();
  }, [ids]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductCatalog;
