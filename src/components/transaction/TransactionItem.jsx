import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency, formatDate, getCategoryInfo } from '../../utils/formatters';
import { useState } from 'react';

export default function TransactionItem({ transaction, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { type, amount, category, date, note } = transaction;
  const categoryInfo = getCategoryInfo(category);
  const isIncome = type === 'income';

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(transaction.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E293B]
                 border-2 border-black dark:border-surface-700 shadow-brutal-sm transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px] group"
    >
      {/* Category Icon */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border-2 border-black shadow-brutal-sm text-black
                    ${isIncome ? 'bg-emerald-300' : 'bg-rose-300'}`}
      >
        <FontAwesomeIcon icon={categoryInfo.icon} className="text-sm" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate uppercase tracking-tight">
          {categoryInfo.label}
        </p>
        <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-surface-400 font-bold truncate">
          {note || formatDate(date)}
        </p>
      </div>

      {/* Amount & Action */}
      <div className="text-right flex items-center gap-2">
        <div>
          <p className={`text-xs sm:text-sm font-black tracking-tight ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {isIncome ? '+' : '-'}{formatCurrency(amount)}
          </p>
          {note && (
            <p className="text-[9px] text-slate-400 dark:text-surface-500 font-bold">{formatDate(date)}</p>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black transition-all duration-150
                     ${showConfirm
                       ? 'bg-rose-500 text-white shadow-brutal-sm scale-105'
                       : 'bg-white dark:bg-surface-800 text-slate-700 dark:text-surface-300 hover:bg-rose-400 hover:text-black shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                     }`}
          title={showConfirm ? 'Klik lagi untuk hapus' : 'Hapus transaksi'}
        >
          <FontAwesomeIcon icon={faTrash} className="text-[11px]" />
        </button>
      </div>
    </div>
  );
}
