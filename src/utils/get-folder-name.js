/**
 * Dinamik klasör adı döndüren bir fonksiyon
 * @param {string} type - Dosya türü (örneğin, 'products', 'orders')
 * @returns {string} - Klasör adı
 */
export const getFolderName = (type) => {
  const folderNames = {
    products: "products",
    orders: "orders",
    // Diğer türler buraya eklenebilir
  };
  return folderNames[type] || "default";
};
