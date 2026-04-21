import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownCircle, ArrowUpCircle, Calendar, StickyNote, Check } from 'lucide-react';
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
      }, 800);
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
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <Check size={40} className="text-emerald-400" />
        </div>
        <p className="text-lg font-semibold text-surface-100">Berhasil Disimpan!</p>
        <p className="text-sm text-surface-400 mt-1">Transaksi telah ditambahkan</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      {/* Type Toggle */}
      <div className="glass-card p-1.5 flex gap-1.5">
        <button
          type="button"
          onClick={() => { setType('expense'); setCategory(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300
            ${type === 'expense'
              ? 'bg-rose-500/20 text-rose-400 shadow-lg shadow-rose-500/10'
              : 'text-surface-400 hover:text-surface-300'
            }`}
        >
          <ArrowUpCircle size={18} />
          Uang Keluar
        </button>
        <button
          type="button"
          onClick={() => { setType('income'); setCategory(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300
            ${type === 'income'
              ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10'
              : 'text-surface-400 hover:text-surface-300'
            }`}
        >
          <ArrowDownCircle size={18} />
          Uang Masuk
        </button>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-xs font-medium text-surface-400 mb-2 uppercase tracking-wider">
          Jumlah (Rp)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500 font-medium">
            Rp
          </span>
          <input
            id="input-amount"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={formattedAmount}
            onChange={handleAmountChange}
            className="input-field pl-11 text-xl font-bold"
            required
          />
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-medium text-surface-400 mb-2 uppercase tracking-wider">
          Kategori
        </label>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-medium transition-all duration-200
                ${category === cat.id
                  ? type === 'income'
                    ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40'
                  : 'bg-surface-800/60 text-surface-400 hover:bg-surface-700/60'
                }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="truncate w-full text-center">{cat.label}</span>
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
        <label className="block text-xs font-medium text-surface-400 mb-2 uppercase tracking-wider">
          <Calendar size={12} className="inline mr-1" />
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
        <label className="block text-xs font-medium text-surface-400 mb-2 uppercase tracking-wider">
          <StickyNote size={12} className="inline mr-1" />
          Catatan (Opsional)
        </label>
        <input
          id="input-note"
          type="text"
          placeholder="Contoh: Makan siang di kantin"
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
        className={`w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 
          ${isSubmitting || !amount || !category
            ? 'bg-surface-700 text-surface-500 cursor-not-allowed'
            : type === 'income'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-[0.98] shadow-lg shadow-emerald-500/20'
              : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 active:scale-[0.98] shadow-lg shadow-rose-500/20'
          }`}
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan Transaksi'}
      </button>
    </form>
  );
}
