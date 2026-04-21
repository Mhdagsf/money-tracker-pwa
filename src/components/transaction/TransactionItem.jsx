import { Trash2 } from 'lucide-react';
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
      className="flex items-center gap-3 px-2 py-2.5 rounded-xl 
                 hover:bg-surface-700/30 transition-colors group"
    >
      {/* Category Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
                    ${isIncome ? 'bg-emerald-500/15' : 'bg-rose-500/15'}`}
      >
        {categoryInfo.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-surface-100 truncate">
          {categoryInfo.label}
        </p>
        <p className="text-[11px] text-surface-500 truncate">
          {note || formatDate(date)}
        </p>
      </div>

      {/* Amount */}
      <div className="text-right flex items-center gap-2">
        <div>
          <p className={`text-sm font-semibold ${isIncome ? 'amount-income' : 'amount-expense'}`}>
            {isIncome ? '+' : '-'}{formatCurrency(amount)}
          </p>
          {note && (
            <p className="text-[10px] text-surface-500">{formatDate(date)}</p>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className={`p-1.5 rounded-lg transition-all duration-200
                     ${showConfirm
                       ? 'bg-rose-500/20 text-rose-400'
                       : 'opacity-0 group-hover:opacity-100 text-surface-500 hover:text-rose-400 hover:bg-rose-500/10'
                     }`}
          title={showConfirm ? 'Klik lagi untuk hapus' : 'Hapus'}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
