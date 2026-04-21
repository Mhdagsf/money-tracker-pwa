import { useNavigate } from 'react-router-dom';
import TransactionItem from '../transaction/TransactionItem';
import { ChevronRight } from 'lucide-react';

export default function RecentList({ transactions, onDelete }) {
  const navigate = useNavigate();

  if (transactions.length === 0) {
    return (
      <div className="glass-card p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-sm font-semibold text-surface-300 mb-3">🕐 Transaksi Terakhir</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="text-4xl mb-3">💰</div>
          <p className="text-surface-400 text-sm font-medium">Belum ada transaksi</p>
          <p className="text-surface-500 text-xs mt-1">
            Tekan tombol + untuk menambah transaksi pertama
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-surface-300">🕐 Transaksi Terakhir</h3>
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-0.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Lihat Semua
          <ChevronRight size={14} />
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
