export const assetUrl = (p) => {
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;               // sudah absolut
  if (p.startsWith('/')) return `http://127.0.0.1:8000${p}`; // "/storage/..."
  return `http://127.0.0.1:8000/storage/${p}`;         // "projects/xxx.jpg"
};
