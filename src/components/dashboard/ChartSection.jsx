import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../../utils/formatters';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white dark:bg-[#1E293B] border-2 border-black dark:border-surface-600 shadow-brutal-sm px-3 py-2 text-xs rounded-xl">
      <p className="text-slate-900 dark:text-white font-black mb-1 uppercase tracking-wider">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-extrabold">
          {entry.name === 'income' ? 'Masuk' : 'Keluar'}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function ChartSection({ chartData }) {
  const hasData = chartData.some((d) => d.income > 0 || d.expense > 0);

  if (!hasData) {
    return (
      <div className="bg-white dark:bg-[#131B2E] p-4 rounded-2xl border-2 border-black dark:border-surface-700 shadow-brutal animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 border-2 border-black shadow-brutal-sm flex items-center justify-center text-black">
            <FontAwesomeIcon icon={faChartSimple} className="text-xs" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">Tren 7 Hari</h3>
        </div>
        <div className="flex items-center justify-center h-28 text-slate-500 dark:text-surface-400 text-xs font-bold uppercase bg-slate-50 dark:bg-surface-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-surface-700">
          Belum Ada Data Transaksi
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#131B2E] p-4 rounded-2xl border-2 border-black dark:border-surface-700 shadow-brutal animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 border-2 border-black shadow-brutal-sm flex items-center justify-center text-black">
            <FontAwesomeIcon icon={faChartSimple} className="text-xs" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">Tren 7 Hari</h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-black">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Masuk</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-black">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Keluar</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v >= 1000000 ? `${v / 1000000}jt` : v >= 1000 ? `${v / 1000}rb` : v)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#34d399"
            strokeWidth={2}
            fill="url(#incomeGrad)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#fb7185"
            strokeWidth={2}
            fill="url(#expenseGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
