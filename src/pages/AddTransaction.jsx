import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/transaction/TransactionForm';
import { useTransactions } from '../hooks/useTransactions';

export default function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6 px-1">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-2xl bg-surface-800/80 border border-surface-700/50 
                     flex items-center justify-center text-surface-300 hover:text-white hover:bg-surface-700/80 
                     transition-colors shadow-sm"
          title="Kembali"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
        </button>
        <div>
          <h1 className="text-base font-extrabold text-surface-50 tracking-tight">Catat Transaksi Baru</h1>
          <p className="text-[11px] text-surface-400 font-medium">Input pemasukan atau pengeluaran harian</p>
        </div>
      </div>

      {/* Form */}
      <TransactionForm onSubmit={addTransaction} />
    </div>
  );
}
