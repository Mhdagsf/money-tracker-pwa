import { useTransactions } from '../hooks/useTransactions';
import BalanceCard from '../components/dashboard/BalanceCard';
import ChartSection from '../components/dashboard/ChartSection';
import RecentList from '../components/dashboard/RecentList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const { summary, chartData, recentTransactions, deleteTransaction, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
          <p className="text-surface-400 text-xs font-semibold">Memuat data keuangan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
            <FontAwesomeIcon icon={faWallet} className="text-sm" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-surface-50 tracking-tight">Keuangan</h1>
            <p className="text-[11px] text-surface-400 font-medium">Catatan finansial pribadi</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-surface-800/80 border border-surface-700/50 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Aktif</span>
        </div>
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
