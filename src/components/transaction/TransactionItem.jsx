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
      className="flex items-center gap-3.5 px-3 py-3 rounded-2xl 
                 hover:bg-surface-800/60 active:bg-surface-800/80 transition-all duration-200 group border border-transparent hover:border-surface-700/40"
    >
      {/* Category Icon */}
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105
                    ${isIncome 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}
      >
        <FontAwesomeIcon icon={categoryInfo.icon} className="text-base" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-surface-100 truncate tracking-tight">
          {categoryInfo.label}
        </p>
        <p className="text-[11px] text-surface-400 truncate mt-0.5">
          {note || formatDate(date)}
        </p>
      </div>

      {/* Amount & Action */}
      <div className="text-right flex items-center gap-2.5">
        <div>
          <p className={`text-sm font-bold tracking-tight ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isIncome ? '+' : '-'}{formatCurrency(amount)}
          </p>
          {note && (
            <p className="text-[10px] text-surface-500 mt-0.5">{formatDate(date)}</p>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className={`p-2 rounded-xl transition-all duration-200
                     ${showConfirm
                       ? 'bg-rose-500/20 text-rose-400 scale-105 ring-1 ring-rose-500/40'
                       : 'opacity-40 sm:opacity-0 sm:group-hover:opacity-100 text-surface-400 hover:text-rose-400 hover:bg-rose-500/10'
                     }`}
          title={showConfirm ? 'Klik lagi untuk konfirmasi hapus' : 'Hapus transaksi'}
        >
          <FontAwesomeIcon icon={faTrash} className="text-xs" />
        </button>
      </div>
    </div>
  );
}
