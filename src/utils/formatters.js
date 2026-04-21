/**
 * Format angka ke format Rupiah Indonesia
 * @param {number} amount - Jumlah uang
 * @returns {string} Format Rupiah (contoh: Rp 1.500.000)
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format tanggal ke format Indonesia
 * @param {string} dateStr - ISO date string
 * @returns {string} Format tanggal (contoh: 21 Apr 2026)
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Format tanggal pendek untuk chart
 * @param {string} dateStr - ISO date string
 * @returns {string} Format pendek (contoh: 21/04)
 */
export function formatDateShort(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
  }).format(date);
}

/**
 * Format tanggal untuk grouping header
 * @param {string} dateStr - ISO date string
 * @returns {string} Format header (contoh: Senin, 21 April 2026)
 */
export function formatDateFull(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Mendapatkan tanggal hari ini dalam format ISO (YYYY-MM-DD)
 * @returns {string}
 */
export function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format angka dengan pemisah ribuan
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Daftar kategori pemasukan
 */
export const incomeCategories = [
  { id: 'gaji', label: 'Gaji', icon: '💼' },
  { id: 'freelance', label: 'Freelance', icon: '💻' },
  { id: 'investasi', label: 'Investasi', icon: '📈' },
  { id: 'hadiah', label: 'Hadiah', icon: '🎁' },
  { id: 'bonus', label: 'Bonus', icon: '🎉' },
  { id: 'lainnya_masuk', label: 'Lainnya', icon: '📥' },
];

/**
 * Daftar kategori pengeluaran
 */
export const expenseCategories = [
  { id: 'makanan', label: 'Makanan', icon: '🍔' },
  { id: 'transport', label: 'Transport', icon: '🚗' },
  { id: 'belanja', label: 'Belanja', icon: '🛒' },
  { id: 'tagihan', label: 'Tagihan', icon: '📄' },
  { id: 'hiburan', label: 'Hiburan', icon: '🎮' },
  { id: 'kesehatan', label: 'Kesehatan', icon: '💊' },
  { id: 'pendidikan', label: 'Pendidikan', icon: '📚' },
  { id: 'lainnya_keluar', label: 'Lainnya', icon: '📤' },
];

/**
 * Mendapatkan info kategori berdasarkan id
 * @param {string} categoryId
 * @returns {{ id: string, label: string, icon: string }}
 */
export function getCategoryInfo(categoryId) {
  const all = [...incomeCategories, ...expenseCategories];
  return all.find((c) => c.id === categoryId) || { id: categoryId, label: categoryId, icon: '📌' };
}
