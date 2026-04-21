import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/transaction/TransactionForm';
import { useTransactions } from '../hooks/useTransactions';

export default function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-surface-800/60 border border-surface-700/40 
                     flex items-center justify-center text-surface-400 hover:text-surface-200 
                     transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-surface-50">Tambah Transaksi</h1>
          <p className="text-xs text-surface-500">Catat uang masuk atau keluar</p>
        </div>
      </div>

      {/* Form */}
      <TransactionForm onSubmit={addTransaction} />
    </div>
  );
}
