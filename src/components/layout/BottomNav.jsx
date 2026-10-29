import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

export default function BottomNav() {
  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 px-4 pointer-events-none">
      <nav
        id="bottom-nav"
        className="max-w-md mx-auto pointer-events-auto bg-white dark:bg-[#131B2E] border-2 border-black dark:border-surface-700 shadow-brutal-lg rounded-2xl px-4 py-2 transition-colors duration-200"
      >
        <div className="flex items-end justify-around">
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
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faHouse}
                  className={`text-lg mb-1.5 transition-colors ${
                    isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-surface-400'
                  }`}
                />
                <span className="text-[10px] uppercase font-black tracking-wider">Dashboard</span>
              </>
            )}
          </NavLink>

          {/* Center Catat Button - Prominent + Icon on Top, Text Below */}
          <NavLink
            to="/add"
            aria-label="Catat Transaksi"
            className="flex flex-col items-center justify-center group py-1 px-3 transition-transform duration-150 active:scale-95"
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-black border-2 border-black mb-1 transition-all duration-150
                    ${isActive 
                      ? 'bg-emerald-300 shadow-brutal-sm translate-x-[1px] translate-y-[1px]' 
                      : 'bg-emerald-400 hover:bg-emerald-300 shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'}`
                  }
                >
                  <FontAwesomeIcon icon={faPlus} className="text-xl font-black" />
                </div>
                <span
                  className={`text-[10px] uppercase font-black tracking-wider transition-colors
                    ${isActive 
                      ? 'text-emerald-600 dark:text-emerald-400 font-black' 
                      : 'text-slate-600 dark:text-surface-400 group-hover:text-black dark:group-hover:text-white font-bold'}`
                  }
                >
                  Catat
                </span>
              </>
            )}
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
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faClockRotateLeft}
                  className={`text-lg mb-1.5 transition-colors ${
                    isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-surface-400'
                  }`}
                />
                <span className="text-[10px] uppercase font-black tracking-wider">Riwayat</span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
