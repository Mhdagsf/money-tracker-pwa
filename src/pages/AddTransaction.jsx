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
          className="w-10 h-10 rounded-xl bg-white dark:bg-surface-800 border-2 border-black shadow-brutal-sm 
                     flex items-center justify-center text-black dark:text-white 
                     transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-emerald-400 hover:text-black"
          title="Kembali"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm font-black" />
        </button>
        <div>
          <h1 className="text-lg font-black uppercase text-slate-900 dark:text-white tracking-tight">Catat Transaksi</h1>
          <p className="text-[11px] text-slate-500 dark:text-surface-400 font-bold">Input pemasukan atau pengeluaran baru</p>
        </div>
      </div>

      {/* Form */}
      <TransactionForm onSubmit={addTransaction} />
    </div>
  );
}
