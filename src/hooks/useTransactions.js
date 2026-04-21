import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo, useCallback } from 'react';
import db from '../db/database';

/**
 * Custom hook untuk mengelola transaksi keuangan.
 * Menggunakan Dexie useLiveQuery untuk real-time reactivity.
 *
 * Logika Saldo:
 *   Total = Σ Pemasukan - Σ Pengeluaran
 */
export function useTransactions() {
  // Live query — otomatis re-render ketika data berubah
  const transactions = useLiveQuery(
    () => db.transactions.orderBy('date').reverse().toArray(),
    []
  );

  // Hitung total pemasukan, pengeluaran, dan saldo
  const summary = useMemo(() => {
    if (!transactions) return { totalIncome: 0, totalExpense: 0, balance: 0 };

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // Total = Σ Pemasukan - Σ Pengeluaran
    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  // Data untuk chart — 7 hari terakhir
  const chartData = useMemo(() => {
    if (!transactions) return [];

    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayIncome = transactions
        .filter((t) => t.type === 'income' && t.date === dateStr)
        .reduce((sum, t) => sum + t.amount, 0);

      const dayExpense = transactions
        .filter((t) => t.type === 'expense' && t.date === dateStr)
        .reduce((sum, t) => sum + t.amount, 0);

      days.push({
        date: dateStr,
        label: new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(date),
        income: dayIncome,
        expense: dayExpense,
      });
    }

    return days;
  }, [transactions]);

  // 5 transaksi terakhir
  const recentTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions.slice(0, 5);
  }, [transactions]);

  // Semua transaksi grouped by date
  const groupedTransactions = useMemo(() => {
    if (!transactions) return [];

    const groups = {};
    transactions.forEach((t) => {
      if (!groups[t.date]) {
        groups[t.date] = [];
      }
      groups[t.date].push(t);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, items]) => ({ date, items }));
  }, [transactions]);

  // Tambah transaksi baru
  const addTransaction = useCallback(async (transaction) => {
    const id = await db.transactions.add({
      ...transaction,
      createdAt: new Date().toISOString(),
    });
    return id;
  }, []);

  // Hapus transaksi
  const deleteTransaction = useCallback(async (id) => {
    await db.transactions.delete(id);
  }, []);

  return {
    transactions: transactions || [],
    summary,
    chartData,
    recentTransactions,
    groupedTransactions,
    addTransaction,
    deleteTransaction,
    isLoading: transactions === undefined,
  };
}
