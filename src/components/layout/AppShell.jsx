import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA] dark:bg-[#0B0F19] text-slate-900 dark:text-surface-50 transition-colors duration-200 relative selection:bg-emerald-400 selection:text-black">
      {/* Subtle architectural grid pattern characteristic of brutalism */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
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
