export const extractProductIds = (text) => {
  const matches = text.match(/\d{6,}/g); // Ищет все группы из 6+ цифр
  return matches ? matches.map((id) => parseInt(id)) : [];
};
