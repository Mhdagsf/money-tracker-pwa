import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceCard({ balance, totalIncome, totalExpense }) {
  return (
    <div
      id="balance-card"
      className="relative overflow-hidden rounded-2xl p-5 animate-slide-up"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Total Saldo */}
        <div className="flex items-center gap-2 mb-1">
          <Wallet size={16} className="text-emerald-200/80" />
          <span className="text-emerald-100/80 text-xs font-medium uppercase tracking-wider">
            Total Saldo
          </span>
        </div>

        <p className="text-2xl sm:text-3xl font-bold text-white mb-4 animate-count-up">
          {formatCurrency(balance)}
        </p>

        {/* Income & Expense Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/20 flex items-center justify-center">
              <TrendingUp size={16} className="text-emerald-300" />
            </div>
            <div>
              <p className="text-[10px] text-emerald-200/70 font-medium">Pemasukan</p>
              <p className="text-sm font-semibold text-white">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-400/20 flex items-center justify-center">
              <TrendingDown size={16} className="text-rose-300" />
            </div>
            <div>
              <p className="text-[10px] text-rose-200/70 font-medium">Pengeluaran</p>
              <p className="text-sm font-semibold text-white">
                {formatCurrency(totalExpense)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
