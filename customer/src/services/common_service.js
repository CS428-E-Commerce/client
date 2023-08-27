export const exportCSV = (data, filename) => {
  const csvContent = "data:text/csv;charset=utf-8," + data;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatRate = rate => {
  if (rate === undefined || rate === null) return "N/A";
  return (Math.floor(rate * 10) / 10)?.toFixed(1);
};

export const formatNumber = number => {
  return number ? Number(number)?.toLocaleString("en-US") : "N/A";
};

export const formatCent = number => {
  return (number / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatPixelValue = numberOrPixel => {
  const eov = /(px|%|vw|vh)$/;
  if (eov.test(numberOrPixel)) return numberOrPixel;
  return `${numberOrPixel}px`;
};
