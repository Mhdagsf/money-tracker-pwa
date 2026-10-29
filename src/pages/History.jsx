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
        <div className="w-10 h-10 border-4 border-black border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-5 px-1">
        <h1 className="text-lg font-black uppercase text-slate-900 dark:text-white tracking-tight">Riwayat Transaksi</h1>
        <p className="text-[11px] text-slate-500 dark:text-surface-400 font-bold">Laporan keuangan & histori lengkap</p>
      </div>

      {/* Month Selector Neo-Brutalist */}
      <div className="bg-white dark:bg-[#131B2E] p-2.5 px-3 flex items-center justify-between mb-4 border-2 border-black dark:border-surface-700 rounded-2xl shadow-brutal animate-fade-in">
        <button
          onClick={() => setMonthOffset((p) => p - 1)}
          className="w-9 h-9 rounded-xl bg-white dark:bg-surface-800 border-2 border-black shadow-brutal-sm flex items-center justify-center text-black dark:text-white transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-emerald-400 hover:text-black"
          title="Bulan sebelumnya"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-sm font-black" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-400 border border-black flex items-center justify-center text-black text-xs">
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>
          <span className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">{monthLabel}</span>
        </div>
        <button
          onClick={() => setMonthOffset((p) => Math.min(p + 1, 0))}
          disabled={monthOffset >= 0}
          className="w-9 h-9 rounded-xl bg-white dark:bg-surface-800 border-2 border-black shadow-brutal-sm flex items-center justify-center text-black dark:text-white transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-30 disabled:border-dashed hover:bg-emerald-400 hover:text-black"
          title="Bulan berikutnya"
        >
          <FontAwesomeIcon icon={faAngleRight} className="text-sm font-black" />
        </button>
      </div>

      {/* Monthly Summary Neo-Brutalist */}
      <div className="grid grid-cols-2 gap-3 mb-5 animate-slide-up">
        <div className="bg-white dark:bg-[#131B2E] p-3 rounded-2xl border-2 border-black shadow-brutal text-center">
          <p className="text-[10px] text-slate-500 dark:text-surface-400 font-black uppercase tracking-wider mb-1">Pemasukan</p>
          <p className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-tight">{formatCurrency(monthIncome)}</p>
        </div>
        <div className="bg-white dark:bg-[#131B2E] p-3 rounded-2xl border-2 border-black shadow-brutal text-center">
          <p className="text-[10px] text-slate-500 dark:text-surface-400 font-black uppercase tracking-wider mb-1">Pengeluaran</p>
          <p className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 tracking-tight">{formatCurrency(monthExpense)}</p>
        </div>
      </div>

      {/* Transaction Groups */}
      {filteredGroups.length === 0 ? (
        <div className="bg-white dark:bg-[#131B2E] p-8 rounded-2xl border-2 border-black dark:border-surface-700 shadow-brutal flex flex-col items-center justify-center py-14 text-center animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-surface-800 border-2 border-black shadow-brutal-sm flex items-center justify-center text-slate-700 dark:text-surface-300 mb-3">
            <FontAwesomeIcon icon={faInbox} className="text-2xl" />
          </div>
          <p className="text-slate-900 dark:text-white text-sm font-black uppercase">Tidak Ada Transaksi</p>
          <p className="text-slate-500 dark:text-surface-400 text-xs mt-1 font-bold">Belum ada catatan pada {monthLabel}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div key={group.date} className="bg-white dark:bg-[#131B2E] p-3.5 rounded-2xl border-2 border-black dark:border-surface-700 shadow-brutal animate-slide-up">
              <div className="inline-flex items-center gap-2 mb-2 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-surface-800 border border-black">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 dark:text-surface-200">
                  {formatDateFull(group.date)}
                </p>
              </div>
              <div className="space-y-2">
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
