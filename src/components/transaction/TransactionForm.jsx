import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faCalendarDays,
  faNoteSticky,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { getTodayISO, incomeCategories, expenseCategories } from '../../utils/formatters';

export default function TransactionForm({ onSubmit }) {
  const navigate = useNavigate();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(getTodayISO());
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    setIsSubmitting(true);

    try {
      await onSubmit({
        type,
        amount: parseFloat(amount),
        category,
        date,
        note: note.trim(),
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 700);
    } catch (err) {
      console.error('Error adding transaction:', err);
      setIsSubmitting(false);
    }
  };

  // Format input amount with thousand separator
  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw);
  };

  const formattedAmount = amount
    ? new Intl.NumberFormat('id-ID').format(parseInt(amount))
    : '';

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-scale-in">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10">
          <FontAwesomeIcon icon={faCheck} className="text-3xl text-emerald-400" />
        </div>
        <p className="text-lg font-bold text-surface-50">Berhasil Disimpan!</p>
        <p className="text-sm text-surface-400 mt-1">Transaksi telah berhasil dicatat</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      {/* Type Toggle */}
      <div className="glass-card p-1.5 flex gap-2 border border-surface-700/50 bg-surface-900/60">
        <button
          type="button"
          onClick={() => { setType('expense'); setCategory(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300
            ${type === 'expense'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-lg shadow-rose-500/10'
              : 'text-surface-400 hover:text-surface-200 border border-transparent'
            }`}
        >
          <FontAwesomeIcon icon={faArrowTrendDown} className="text-sm" />
          Pengeluaran
        </button>
        <button
          type="button"
          onClick={() => { setType('income'); setCategory(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300
            ${type === 'income'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
              : 'text-surface-400 hover:text-surface-200 border border-transparent'
            }`}
        >
          <FontAwesomeIcon icon={faArrowTrendUp} className="text-sm" />
          Pemasukan
        </button>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-[11px] font-semibold text-surface-400 mb-2 uppercase tracking-wider">
          Jumlah Nominal
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 font-bold text-lg">
            Rp
          </span>
          <input
            id="input-amount"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={formattedAmount}
            onChange={handleAmountChange}
            className="input-field pl-14 text-2xl font-bold tracking-tight"
            required
          />
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-semibold text-surface-400 uppercase tracking-wider">
            Pilih Kategori
          </label>
          <span className="text-[10px] text-surface-500">Wajib dipilih</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`flex flex-col items-center justify-center gap-2 py-3.5 px-2 rounded-2xl text-xs font-semibold transition-all duration-200 border
                ${category === cat.id
                  ? type === 'income'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10 scale-[1.02]'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-md shadow-rose-500/10 scale-[1.02]'
                  : 'bg-surface-900/60 text-surface-400 border-surface-800/80 hover:bg-surface-800/70 hover:text-surface-200'
                }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm
                ${category === cat.id 
                  ? (type === 'income' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-rose-500/30 text-rose-300') 
                  : 'bg-surface-800/80 text-surface-400'}`}>
                <FontAwesomeIcon icon={cat.icon} />
              </div>
              <span className="truncate w-full text-center text-[11px]">{cat.label}</span>
            </button>
          ))}
        </div>
        {!category && (
          <input
            tabIndex={-1}
            className="opacity-0 absolute pointer-events-none"
            required
            value={category}
            onChange={() => {}}
          />
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block text-[11px] font-semibold text-surface-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
          <FontAwesomeIcon icon={faCalendarDays} className="text-surface-500" />
          Tanggal
        </label>
        <input
          id="input-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-field"
          required
        />
      </div>

      {/* Note */}
      <div>
        <label className="block text-[11px] font-semibold text-surface-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
          <FontAwesomeIcon icon={faNoteSticky} className="text-surface-500" />
          Catatan (Opsional)
        </label>
        <input
          id="input-note"
          type="text"
          placeholder="Contoh: Makan siang bersama teman"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="input-field"
          maxLength={100}
        />
      </div>

      {/* Submit Button */}
      <button
        id="btn-submit"
        type="submit"
        disabled={isSubmitting || !amount || !category}
        className={`w-full py-4 rounded-2xl font-bold text-white text-sm transition-all duration-300 mt-2
          ${isSubmitting || !amount || !category
            ? 'bg-surface-800 text-surface-500 border border-surface-700/40 cursor-not-allowed opacity-60'
            : type === 'income'
              ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:brightness-110 active:scale-[0.98] shadow-lg shadow-emerald-500/25 border border-emerald-400/30'
              : 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:brightness-110 active:scale-[0.98] shadow-lg shadow-rose-500/25 border border-rose-400/30'
          }`}
      >
        {isSubmitting ? 'Menyimpan Transaksi...' : 'Simpan Transaksi'}
      </button>
    </form>
  );
}
