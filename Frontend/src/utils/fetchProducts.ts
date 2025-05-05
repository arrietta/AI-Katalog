export const fetchProductsByIds = async (ids) => {
  const query = ids.join(',');
  const response = await fetch(`http://localhost:8000/catalog/products/?id__in=${query}`);
  const data = await response.json();
  return data.results;
};
