import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionItem from '../components/transaction/TransactionItem';
import { formatDateFull, formatCurrency } from '../utils/formatters';

export default function History() {
  const { groupedTransactions, deleteTransaction, isLoading } = useTransactions();

  // Month filter
  const [monthOffset, setMonthOffset] = useState(0);

  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + monthOffset);
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();

  const monthLabel = new Intl.DateTimeFormat('id-ID', {
    month: 'long',
    year: 'numeric',
  }).format(targetDate);

  // Filter transactions by selected month
  const filteredGroups = groupedTransactions
    .map((group) => {
      const groupDate = new Date(group.date);
      if (groupDate.getFullYear() === targetYear && groupDate.getMonth() === targetMonth) {
        return group;
      }
      return null;
    })
    .filter(Boolean);

  // Monthly summary
  const monthIncome = filteredGroups.reduce(
    (sum, g) => sum + g.items.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    0
  );
  const monthExpense = filteredGroups.reduce(
    (sum, g) => sum + g.items.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    0
  );

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-lg font-bold text-surface-50">Riwayat</h1>
        <p className="text-xs text-surface-500">Semua transaksi kamu</p>
      </div>

      {/* Month Selector */}
      <div className="glass-card p-3 flex items-center justify-between mb-4 animate-fade-in">
        <button
          onClick={() => setMonthOffset((p) => p - 1)}
          className="w-8 h-8 rounded-lg bg-surface-700/60 flex items-center justify-center text-surface-400 hover:text-surface-200 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold text-surface-200">{monthLabel}</span>
        <button
          onClick={() => setMonthOffset((p) => Math.min(p + 1, 0))}
          disabled={monthOffset >= 0}
          className="w-8 h-8 rounded-lg bg-surface-700/60 flex items-center justify-center text-surface-400 hover:text-surface-200 transition-colors disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-2 gap-3 mb-4 animate-slide-up">
        <div className="glass-card p-3 text-center">
          <p className="text-[10px] text-surface-500 uppercase tracking-wider mb-1">Pemasukan</p>
          <p className="text-sm font-bold text-emerald-400">{formatCurrency(monthIncome)}</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-[10px] text-surface-500 uppercase tracking-wider mb-1">Pengeluaran</p>
          <p className="text-sm font-bold text-rose-400">{formatCurrency(monthExpense)}</p>
        </div>
      </div>

      {/* Transaction Groups */}
      {filteredGroups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-surface-400 text-sm font-medium">Tidak ada transaksi</p>
          <p className="text-surface-500 text-xs mt-1">di bulan {monthLabel}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div key={group.date} className="glass-card p-3 animate-slide-up">
              <p className="text-xs font-medium text-surface-400 mb-2 px-1">
                {formatDateFull(group.date)}
              </p>
              <div className="space-y-0.5">
                {group.items.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={deleteTransaction}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
