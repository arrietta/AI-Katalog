export const splitTextWithProducts = (text: string, ids: string[]) => {
    let result: (string | { id: string })[] = [];
    let lastIndex = 0;
  
    const regex = /"(\d+)"/g;
    let match;
  
    while ((match = regex.exec(text)) !== null) {
      const id = match[1];
      if (!ids.includes(id)) continue;
  
      // Добавить текст до ID
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }
  
      // Добавить маркер товара
      result.push({ id });
  
      lastIndex = regex.lastIndex;
    }
  
    // Добавить остаток текста
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }
  
    return result;
  };
  