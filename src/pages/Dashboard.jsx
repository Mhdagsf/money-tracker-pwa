import { useTransactions } from '../hooks/useTransactions';
import { useTheme } from '../context/ThemeContext';
import BalanceCard from '../components/dashboard/BalanceCard';
import ChartSection from '../components/dashboard/ChartSection';
import RecentList from '../components/dashboard/RecentList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faWallet } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const { summary, chartData, recentTransactions, deleteTransaction, isLoading } = useTransactions();
  const { theme, toggleTheme } = useTheme();

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-black border-t-emerald-400 rounded-full animate-spin" />
          <p className="text-slate-600 dark:text-surface-400 text-xs font-black uppercase tracking-wider">Memuat Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header Neo-Brutalism */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-400 border-2 border-black shadow-brutal-sm flex items-center justify-center text-black overflow-hidden">
            <img src="/icons/icon-192x192.png" alt="Keuangan Logo" className="w-8 h-8 rounded-lg object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">
                Keuangan
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-emerald-400 text-black border-2 border-black text-[9px] font-black uppercase shadow-brutal-sm">
                Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-surface-400 font-bold">Pencatatan Keuangan Pribadi</p>
          </div>
        </div>

        {/* Theme Toggle Button (Siang / Malam) */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-white dark:bg-surface-800 text-slate-900 dark:text-amber-400 border-2 border-black dark:border-surface-600 shadow-brutal-sm flex items-center justify-center transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-slate-100 dark:hover:bg-surface-700"
          title={theme === 'dark' ? 'Beralih ke Mode Siang' : 'Beralih ke Mode Malam'}
        >
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-sm" />
        </button>
      </div>

      {/* Balance Card */}
      <BalanceCard
        balance={summary.balance}
        totalIncome={summary.totalIncome}
        totalExpense={summary.totalExpense}
      />

      {/* Chart */}
      <div className="mt-4">
        <ChartSection chartData={chartData} />
      </div>

      {/* Recent Transactions */}
      <div className="mt-4">
        <RecentList
          transactions={recentTransactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
}
