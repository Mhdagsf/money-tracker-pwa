import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faWallet, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TransactionItem from '../transaction/TransactionItem';

export default function RecentList({ transactions, onDelete }) {
  const navigate = useNavigate();

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border-2 border-black dark:border-surface-700 shadow-brutal animate-slide-up" style={{ animationDelay: '0.15s' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 border-2 border-black shadow-brutal-sm flex items-center justify-center text-black">
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-xs" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
            Transaksi Terakhir
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50 dark:bg-surface-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-surface-700">
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-surface-800 border-2 border-black shadow-brutal-sm flex items-center justify-center text-emerald-500 mb-3">
            <FontAwesomeIcon icon={faWallet} className="text-lg" />
          </div>
          <p className="text-slate-900 dark:text-white text-sm font-black uppercase">Belum Ada Transaksi</p>
          <p className="text-slate-500 dark:text-surface-400 text-xs mt-1 font-bold max-w-[220px]">
            Ketuk tombol tambah (+) di bawah untuk mencatat transaksi pertamamu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#131B2E] p-4 rounded-2xl border-2 border-black dark:border-surface-700 shadow-brutal animate-slide-up" style={{ animationDelay: '0.15s' }}>
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 border-2 border-black shadow-brutal-sm flex items-center justify-center text-black">
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-xs" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
            Transaksi Terakhir
          </h3>
        </div>
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-white dark:bg-surface-800 text-slate-900 dark:text-white border-2 border-black dark:border-surface-600 px-3 py-1.5 rounded-lg shadow-brutal-sm transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-emerald-400 hover:text-black"
        >
          <span>Semua</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
        </button>
      </div>

      <div className="space-y-2">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
