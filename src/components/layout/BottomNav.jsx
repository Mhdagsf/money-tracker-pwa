import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

export default function BottomNav() {
  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 
                 bg-surface-950/85 backdrop-blur-2xl border-t border-surface-800/80 shadow-2xl"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around px-4 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-4 rounded-2xl transition-all duration-200
             ${isActive ? 'text-emerald-400 font-bold' : 'text-surface-400 hover:text-surface-200 font-medium'}`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <FontAwesomeIcon icon={faHouse} className="text-lg" />
                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">Dashboard</span>
            </>
          )}
        </NavLink>

        {/* Center Tambah Button */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 group -mt-5 transition-transform duration-200 active:scale-95`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-emerald-500/40 ring-4 ring-surface-950 scale-105' 
                    : 'bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-600/30 ring-4 ring-surface-950'}`}
              >
                <FontAwesomeIcon icon={faPlus} className="text-base" />
              </div>
              <span className={`text-[10px] tracking-tight ${isActive ? 'text-emerald-400 font-bold' : 'text-surface-400 font-medium'}`}>
                Catat
              </span>
            </>
          )}
        </NavLink>

        {/* Riwayat */}
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-4 rounded-2xl transition-all duration-200
             ${isActive ? 'text-emerald-400 font-bold' : 'text-surface-400 hover:text-surface-200 font-medium'}`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <FontAwesomeIcon icon={faClockRotateLeft} className="text-lg" />
                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">Riwayat</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
