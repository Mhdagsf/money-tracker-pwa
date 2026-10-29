import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faWallet, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import TransactionItem from '../transaction/TransactionItem';

export default function RecentList({ transactions, onDelete }) {
  const navigate = useNavigate();

  if (transactions.length === 0) {
    return (
      <div className="glass-card p-5 rounded-3xl border border-surface-700/40 bg-surface-900/60 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-xs" />
          </div>
          <h3 className="text-sm font-bold text-surface-200">Transaksi Terakhir</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-800/80 border border-surface-700/50 flex items-center justify-center text-emerald-400/70 mb-3 shadow-inner">
            <FontAwesomeIcon icon={faWallet} className="text-xl" />
          </div>
          <p className="text-surface-200 text-sm font-semibold">Belum Ada Transaksi</p>
          <p className="text-surface-500 text-xs mt-1 max-w-[200px]">
            Ketuk tombol tambah untuk mencatat pengeluaran atau pemasukan pertama Anda
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-3xl border border-surface-700/40 bg-surface-900/60 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-xs" />
          </div>
          <h3 className="text-sm font-bold text-surface-200">Transaksi Terakhir</h3>
        </div>
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors px-2 py-1 rounded-lg hover:bg-emerald-500/10"
        >
          <span>Lihat Semua</span>
          <FontAwesomeIcon icon={faAngleRight} className="text-[10px]" />
        </button>
      </div>

      <div className="space-y-1">
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
