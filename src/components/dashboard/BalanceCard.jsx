import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceCard({ balance, totalIncome, totalExpense }) {
  return (
    <div
      id="balance-card"
      className="relative overflow-hidden rounded-2xl bg-emerald-400 border-2 border-black shadow-brutal-lg p-5 animate-slide-up text-black"
    >
      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black text-white text-[10px] font-black uppercase tracking-wider shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Total Saldo Aktif</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white border-2 border-black shadow-brutal-sm flex items-center justify-center text-black">
          <FontAwesomeIcon icon={faWallet} className="text-xs" />
        </div>
      </div>

      {/* Main Balance Display */}
      <div className="my-3">
        <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight animate-count-up">
          {formatCurrency(balance)}
        </h2>
      </div>

      {/* Income & Expense Split Cards */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* Pemasukan */}
        <div className="bg-white rounded-xl border-2 border-black shadow-brutal-sm p-3 transition-transform duration-150">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-emerald-100 border border-black flex items-center justify-center text-emerald-700">
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-[10px]" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-700">
              Pemasukan
            </p>
          </div>
          <p className="text-xs sm:text-sm font-black text-emerald-600 truncate">
            {formatCurrency(totalIncome)}
          </p>
        </div>

        {/* Pengeluaran */}
        <div className="bg-white rounded-xl border-2 border-black shadow-brutal-sm p-3 transition-transform duration-150">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-rose-100 border border-black flex items-center justify-center text-rose-700">
              <FontAwesomeIcon icon={faArrowTrendDown} className="text-[10px]" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-700">
              Pengeluaran
            </p>
          </div>
          <p className="text-xs sm:text-sm font-black text-rose-600 truncate">
            {formatCurrency(totalExpense)}
          </p>
        </div>
      </div>
    </div>
  );
}
