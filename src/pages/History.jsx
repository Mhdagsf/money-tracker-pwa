import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faInbox, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
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
        <div className="w-9 h-9 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-5 px-1">
        <h1 className="text-base font-extrabold text-surface-50 tracking-tight">Riwayat Transaksi</h1>
        <p className="text-[11px] text-surface-400 font-medium">Laporan dan arsip keuangan berkala</p>
      </div>

      {/* Month Selector */}
      <div className="glass-card p-2 px-3 flex items-center justify-between mb-4 border border-surface-700/50 bg-surface-900/60 rounded-2xl animate-fade-in shadow-lg">
        <button
          onClick={() => setMonthOffset((p) => p - 1)}
          className="w-9 h-9 rounded-xl bg-surface-800/80 border border-surface-700/50 flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700/80 transition-colors"
          title="Bulan sebelumnya"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-sm" />
        </button>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarDays} className="text-emerald-400 text-xs" />
          <span className="text-sm font-bold text-surface-100">{monthLabel}</span>
        </div>
        <button
          onClick={() => setMonthOffset((p) => Math.min(p + 1, 0))}
          disabled={monthOffset >= 0}
          className="w-9 h-9 rounded-xl bg-surface-800/80 border border-surface-700/50 flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700/80 transition-colors disabled:opacity-30 disabled:hover:bg-surface-800/80"
          title="Bulan berikutnya"
        >
          <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
        </button>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-2 gap-3 mb-5 animate-slide-up">
        <div className="glass-card p-3.5 rounded-2xl border border-emerald-500/20 bg-surface-900/60 text-center">
          <p className="text-[10px] text-emerald-400/80 font-semibold uppercase tracking-wider mb-1">Total Pemasukan</p>
          <p className="text-sm sm:text-base font-extrabold text-emerald-400 tracking-tight">{formatCurrency(monthIncome)}</p>
        </div>
        <div className="glass-card p-3.5 rounded-2xl border border-rose-500/20 bg-surface-900/60 text-center">
          <p className="text-[10px] text-rose-400/80 font-semibold uppercase tracking-wider mb-1">Total Pengeluaran</p>
          <p className="text-sm sm:text-base font-extrabold text-rose-400 tracking-tight">{formatCurrency(monthExpense)}</p>
        </div>
      </div>

      {/* Transaction Groups */}
      {filteredGroups.length === 0 ? (
        <div className="glass-card p-8 rounded-3xl border border-surface-700/40 bg-surface-900/60 flex flex-col items-center justify-center py-16 text-center animate-fade-in shadow-md">
          <div className="w-16 h-16 rounded-3xl bg-surface-800/80 border border-surface-700/50 flex items-center justify-center text-surface-400 mb-3 shadow-inner">
            <FontAwesomeIcon icon={faInbox} className="text-2xl text-surface-400" />
          </div>
          <p className="text-surface-200 text-sm font-bold">Tidak Ada Transaksi</p>
          <p className="text-surface-500 text-xs mt-1">Belum ada catatan pada {monthLabel}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div key={group.date} className="glass-card p-3.5 rounded-3xl border border-surface-700/40 bg-surface-900/60 animate-slide-up shadow-md">
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">
                  {formatDateFull(group.date)}
                </p>
              </div>
              <div className="space-y-1">
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
