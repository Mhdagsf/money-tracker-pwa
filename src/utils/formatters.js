import {
  faBriefcase,
  faLaptopCode,
  faChartLine,
  faGift,
  faCoins,
  faArrowDown,
  faUtensils,
  faCar,
  faBagShopping,
  faFileInvoiceDollar,
  faGamepad,
  faHeartPulse,
  faGraduationCap,
  faArrowUp,
  faTag,
} from '@fortawesome/free-solid-svg-icons';

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
  { id: 'gaji', label: 'Gaji', icon: faBriefcase },
  { id: 'freelance', label: 'Freelance', icon: faLaptopCode },
  { id: 'investasi', label: 'Investasi', icon: faChartLine },
  { id: 'hadiah', label: 'Hadiah', icon: faGift },
  { id: 'bonus', label: 'Bonus', icon: faCoins },
  { id: 'lainnya_masuk', label: 'Lainnya', icon: faArrowDown },
];

/**
 * Daftar kategori pengeluaran
 */
export const expenseCategories = [
  { id: 'makanan', label: 'Makanan', icon: faUtensils },
  { id: 'transport', label: 'Transport', icon: faCar },
  { id: 'belanja', label: 'Belanja', icon: faBagShopping },
  { id: 'tagihan', label: 'Tagihan', icon: faFileInvoiceDollar },
  { id: 'hiburan', label: 'Hiburan', icon: faGamepad },
  { id: 'kesehatan', label: 'Kesehatan', icon: faHeartPulse },
  { id: 'pendidikan', label: 'Pendidikan', icon: faGraduationCap },
  { id: 'lainnya_keluar', label: 'Lainnya', icon: faArrowUp },
];

/**
 * Mendapatkan info kategori berdasarkan id
 * @param {string} categoryId
 * @returns {{ id: string, label: string, icon: any }}
 */
export function getCategoryInfo(categoryId) {
  const all = [...incomeCategories, ...expenseCategories];
  return all.find((c) => c.id === categoryId) || { id: categoryId, label: categoryId, icon: faTag };
}
