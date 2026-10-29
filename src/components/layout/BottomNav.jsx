import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

export default function BottomNav() {
  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 px-4 pointer-events-none">
      <nav
        id="bottom-nav"
        className="max-w-md mx-auto pointer-events-auto bg-white dark:bg-[#131B2E] border-2 border-black dark:border-surface-700 shadow-brutal-lg rounded-2xl px-3 py-2.5 transition-colors duration-200"
      >
        <div className="flex items-center justify-around">
          {/* Dashboard */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150
               ${isActive 
                 ? 'text-emerald-600 dark:text-emerald-400 font-black' 
                 : 'text-slate-600 dark:text-surface-400 hover:text-black dark:hover:text-white font-bold'}`
            }
          >
            <FontAwesomeIcon icon={faHouse} className="text-lg mb-1" />
            <span className="text-[10px] uppercase font-black tracking-wider">Dashboard</span>
          </NavLink>

          {/* Center Catat Button - Precision Pill */}
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center gap-2 py-2.5 px-5 rounded-xl border-2 border-black transition-all duration-150
               ${isActive 
                 ? 'bg-emerald-300 text-black shadow-brutal-sm translate-x-[1px] translate-y-[1px]' 
                 : 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'}`
            }
          >
            <FontAwesomeIcon icon={faPlus} className="text-sm font-black" />
            <span className="text-xs font-black uppercase tracking-wider">Catat</span>
          </NavLink>

          {/* Riwayat */}
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150
               ${isActive 
                 ? 'text-emerald-600 dark:text-emerald-400 font-black' 
                 : 'text-slate-600 dark:text-surface-400 hover:text-black dark:hover:text-white font-bold'}`
            }
          >
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-lg mb-1" />
            <span className="text-[10px] uppercase font-black tracking-wider">Riwayat</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
