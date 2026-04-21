import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="min-h-[100dvh] bg-surface-950 relative">
      {/* Gradient background accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-72 h-72 bg-indigo-500/6 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
