import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

export default function BottomNav() {
  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 
                 bg-white dark:bg-[#131B2E] border-t-2 border-black dark:border-surface-700 transition-colors duration-200"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around px-4 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all duration-150
             ${isActive 
               ? 'text-emerald-600 dark:text-emerald-400 font-black scale-105' 
               : 'text-slate-500 dark:text-surface-400 hover:text-black dark:hover:text-surface-200 font-bold'}`
          }
        >
          {({ isActive }) => (
            <>
              <FontAwesomeIcon icon={faHouse} className={`text-xl ${isActive ? 'text-emerald-500' : ''}`} />
              <span className="text-[11px] tracking-tight">Dashboard</span>
            </>
          )}
        </NavLink>

        {/* Center Tambah Button */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 group -mt-5 transition-transform duration-150 active:scale-95`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-black border-2 border-black shadow-brutal transition-all duration-150
                  ${isActive 
                    ? 'bg-emerald-300 translate-x-[1px] translate-y-[1px] shadow-brutal-sm' 
                    : 'bg-emerald-400 hover:bg-emerald-300'}`}
              >
                <FontAwesomeIcon icon={faPlus} className="text-lg font-black" />
              </div>
              <span className={`text-[10px] tracking-tight font-extrabold ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-surface-400'}`}>
                Catat
              </span>
            </>
          )}
        </NavLink>

        {/* Riwayat */}
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all duration-150
             ${isActive 
               ? 'text-emerald-600 dark:text-emerald-400 font-black scale-105' 
               : 'text-slate-500 dark:text-surface-400 hover:text-black dark:hover:text-surface-200 font-bold'}`
          }
        >
          {({ isActive }) => (
            <>
              <FontAwesomeIcon icon={faClockRotateLeft} className={`text-xl ${isActive ? 'text-emerald-500' : ''}`} />
              <span className="text-[11px] tracking-tight">Riwayat</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
