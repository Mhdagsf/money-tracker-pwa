import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceCard({ balance, totalIncome, totalExpense }) {
  return (
    <div
      id="balance-card"
      className="relative overflow-hidden rounded-3xl p-6 shadow-2xl shadow-emerald-950/40 border border-emerald-500/20 animate-slide-up"
    >
      {/* High-end Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900" />
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-teal-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Geometric Overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Top bar with Badge */}
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider text-emerald-100 uppercase">
              Total Saldo Aktif
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/10">
            <FontAwesomeIcon icon={faWallet} className="text-xs" />
          </div>
        </div>

        {/* Amount */}
        <div className="my-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight animate-count-up drop-shadow-sm">
            {formatCurrency(balance)}
          </h2>
        </div>

        {/* Income & Expense Split Cards */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* Pemasukan */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 transition-transform duration-200 hover:bg-white/15">
            <div className="w-9 h-9 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-xs" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-emerald-200/80 uppercase tracking-wider truncate">
                Pemasukan
              </p>
              <p className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </div>

          {/* Pengeluaran */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 transition-transform duration-200 hover:bg-white/15">
            <div className="w-9 h-9 rounded-xl bg-rose-400/20 text-rose-300 flex items-center justify-center shrink-0 border border-rose-400/30">
              <FontAwesomeIcon icon={faArrowTrendDown} className="text-xs" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-rose-200/80 uppercase tracking-wider truncate">
                Pengeluaran
              </p>
              <p className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                {formatCurrency(totalExpense)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
