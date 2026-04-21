import { useTransactions } from '../hooks/useTransactions';
import BalanceCard from '../components/dashboard/BalanceCard';
import ChartSection from '../components/dashboard/ChartSection';
import RecentList from '../components/dashboard/RecentList';

export default function Dashboard() {
  const { summary, chartData, recentTransactions, deleteTransaction, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-surface-400 text-sm">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold text-surface-50">Keuangan</h1>
          <p className="text-xs text-surface-500">Pantau keuanganmu</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
          K
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
