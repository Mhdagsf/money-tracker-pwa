import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faCalendarDays,
  faNoteSticky,
  faCheck,
  faArrowRight,
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
        <div className="w-20 h-20 rounded-2xl bg-emerald-400 border-2 border-black shadow-brutal flex items-center justify-center mb-4">
          <FontAwesomeIcon icon={faCheck} className="text-3xl text-black" />
        </div>
        <p className="text-lg font-black uppercase text-slate-900 dark:text-white">Berhasil Disimpan!</p>
        <p className="text-xs font-bold text-slate-500 dark:text-surface-400 mt-1">Transaksi telah berhasil dicatat</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      {/* Type Toggle - Neo-Brutalist */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => { setType('expense'); setCategory(''); }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black transition-all duration-150
            ${type === 'expense'
              ? 'bg-rose-400 text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]'
              : 'bg-white dark:bg-surface-800 text-slate-500 dark:text-surface-400 shadow-brutal-sm hover:text-black dark:hover:text-white'
            }`}
        >
          <FontAwesomeIcon icon={faArrowTrendDown} />
          <span>Pengeluaran</span>
        </button>
        <button
          type="button"
          onClick={() => { setType('income'); setCategory(''); }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black transition-all duration-150
            ${type === 'income'
              ? 'bg-emerald-400 text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]'
              : 'bg-white dark:bg-surface-800 text-slate-500 dark:text-surface-400 shadow-brutal-sm hover:text-black dark:hover:text-white'
            }`}
        >
          <FontAwesomeIcon icon={faArrowTrendUp} />
          <span>Pemasukan</span>
        </button>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-[11px] font-black text-slate-900 dark:text-white mb-1.5 uppercase tracking-wider">
          Jumlah Nominal (Rp)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 dark:text-white font-black text-base">
            Rp
          </span>
          <input
            id="input-amount"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={formattedAmount}
            onChange={handleAmountChange}
            className="input-field pl-12 text-xl font-black"
            required
          />
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Pilih Kategori
          </label>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase">*Wajib</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 px-1.5 rounded-xl text-xs font-black uppercase transition-all duration-150 border-2 border-black
                ${category === cat.id
                  ? type === 'income'
                    ? 'bg-emerald-400 text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-rose-400 text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-surface-300 shadow-brutal-sm hover:bg-slate-100 dark:hover:bg-surface-700 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs border border-black
                ${category === cat.id ? 'bg-black text-white' : 'bg-slate-100 dark:bg-surface-800 text-black dark:text-white'}`}>
                <FontAwesomeIcon icon={cat.icon} />
              </div>
              <span className="truncate w-full text-center text-[10px] tracking-tight">{cat.label}</span>
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
        <label className="block text-[11px] font-black text-slate-900 dark:text-white mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
          <FontAwesomeIcon icon={faCalendarDays} />
          Tanggal Transaksi
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
        <label className="block text-[11px] font-black text-slate-900 dark:text-white mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
          <FontAwesomeIcon icon={faNoteSticky} />
          Catatan / Keterangan
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

      {/* Signature Neo-Brutalist Submit Button with Arrow Block */}
      <button
        id="btn-submit"
        type="submit"
        disabled={isSubmitting || !amount || !category}
        className={`w-full flex items-center justify-between p-2 pl-5 rounded-xl border-2 border-black font-black text-sm uppercase tracking-wider transition-all duration-150 mt-4
          ${isSubmitting || !amount || !category
            ? 'bg-slate-200 dark:bg-surface-800 text-slate-400 dark:text-surface-600 border-dashed cursor-not-allowed'
            : 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
          }`}
      >
        <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Transaksi'}</span>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 border-black
          ${isSubmitting || !amount || !category ? 'bg-slate-300 dark:bg-surface-700 text-slate-500' : 'bg-black text-white'}`}>
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </div>
      </button>
    </form>
  );
}
