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
    <div className="glass-card-elevated px-3 py-2 text-xs border border-surface-700/60 shadow-xl">
      <p className="text-surface-400 font-semibold mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-bold">
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
      <div className="glass-card p-4 rounded-3xl border border-surface-700/40 bg-surface-900/60 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <FontAwesomeIcon icon={faChartSimple} className="text-xs" />
          </div>
          <h3 className="text-sm font-bold text-surface-200">Tren 7 Hari Terakhir</h3>
        </div>
        <div className="flex items-center justify-center h-28 text-surface-500 text-xs font-medium">
          Belum ada aktivitas transaksi minggu ini
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-3xl border border-surface-700/40 bg-surface-900/60 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <FontAwesomeIcon icon={faChartSimple} className="text-xs" />
          </div>
          <h3 className="text-sm font-bold text-surface-200">Tren 7 Hari</h3>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Masuk</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
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
