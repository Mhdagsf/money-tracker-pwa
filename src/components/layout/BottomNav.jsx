import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ClockArrowUp } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/add', icon: PlusCircle, label: 'Tambah' },
  { to: '/history', icon: ClockArrowUp, label: 'Riwayat' },
];

export default function BottomNav() {
  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 
                 bg-surface-900/80 backdrop-blur-2xl border-t border-surface-700/40"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around py-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full" />
                  )}
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
