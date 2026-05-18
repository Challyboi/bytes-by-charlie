export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">
          Logo Options
        </h1>
        <p className="text-slate-500 text-center mb-14 text-sm">
          Four concepts for Bytes by Charlie - pick your favourite
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* ── OPTION 1: Hexagon "B" ── */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Option 1 — Hexagon</p>

            {/* Dark bg preview */}
            <div className="bg-slate-900 rounded-2xl p-8 flex items-center justify-center gap-4 mb-4">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <polygon points="26,2 48,14 48,38 26,50 4,38 4,14" fill="url(#hex-grad)" />
                <defs>
                  <linearGradient id="hex-grad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <text x="26" y="32" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22">B</text>
              </svg>
              <div>
                <p className="text-white font-extrabold text-xl tracking-tight">Bytes by Charlie</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">Tech · AI · Automation</p>
              </div>
            </div>

            {/* Light bg preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center gap-4">
              <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
                <polygon points="26,2 48,14 48,38 26,50 4,38 4,14" fill="url(#hex-grad2)" />
                <defs>
                  <linearGradient id="hex-grad2" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <text x="26" y="32" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22">B</text>
              </svg>
              <div>
                <p className="text-slate-900 font-extrabold text-lg tracking-tight">Bytes by Charlie</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">Tech · AI · Automation</p>
              </div>
            </div>
          </div>

          {/* ── OPTION 2: Rounded Square with Lightning ── */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Option 2 — Bolt</p>

            <div className="bg-slate-900 rounded-2xl p-8 flex items-center justify-center gap-4 mb-4">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <rect width="52" height="52" rx="14" fill="url(#bolt-grad)" />
                <defs>
                  <linearGradient id="bolt-grad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                {/* Lightning bolt */}
                <path d="M30 8L18 28h10l-6 16L38 24H28L30 8z" fill="white" />
              </svg>
              <div>
                <p className="text-white font-extrabold text-xl tracking-tight">Bytes by Charlie</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">Tech · AI · Automation</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center gap-4">
              <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
                <rect width="52" height="52" rx="14" fill="url(#bolt-grad2)" />
                <defs>
                  <linearGradient id="bolt-grad2" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <path d="M30 8L18 28h10l-6 16L38 24H28L30 8z" fill="white" />
              </svg>
              <div>
                <p className="text-slate-900 font-extrabold text-lg tracking-tight">Bytes by Charlie</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">Tech · AI · Automation</p>
              </div>
            </div>
          </div>

          {/* ── OPTION 3: Circle Gradient Monogram ── */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Option 3 — Monogram Circle</p>

            <div className="bg-slate-900 rounded-2xl p-8 flex items-center justify-center gap-4 mb-4">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill="url(#circle-grad)" />
                <defs>
                  <linearGradient id="circle-grad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                {/* BC initials */}
                <text x="15" y="32" fill="white" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18">BC</text>
              </svg>
              <div>
                <p className="text-white font-extrabold text-xl tracking-tight">Bytes by Charlie</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">Tech · AI · Automation</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center gap-4">
              <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill="url(#circle-grad2)" />
                <defs>
                  <linearGradient id="circle-grad2" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <text x="15" y="32" fill="white" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18">BC</text>
              </svg>
              <div>
                <p className="text-slate-900 font-extrabold text-lg tracking-tight">Bytes by Charlie</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">Tech · AI · Automation</p>
              </div>
            </div>
          </div>

          {/* ── OPTION 4: Terminal Chip (refined current) ── */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Option 4 — Terminal Chip</p>

            <div className="bg-slate-900 rounded-2xl p-8 flex items-center justify-center gap-4 mb-4">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <defs>
                  <linearGradient id="chip-grad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>
                <rect width="52" height="52" rx="12" fill="url(#chip-grad)" />
                {/* Circuit pins left */}
                <rect x="0" y="14" width="6" height="3" rx="1.5" fill="#6366f1" />
                <rect x="0" y="22" width="6" height="3" rx="1.5" fill="#6366f1" />
                <rect x="0" y="30" width="6" height="3" rx="1.5" fill="#6366f1" />
                {/* Circuit pins right */}
                <rect x="46" y="14" width="6" height="3" rx="1.5" fill="#a855f7" />
                <rect x="46" y="22" width="6" height="3" rx="1.5" fill="#a855f7" />
                <rect x="46" y="30" width="6" height="3" rx="1.5" fill="#a855f7" />
                {/* Inner chip */}
                <rect x="10" y="10" width="32" height="32" rx="6" fill="url(#chip-inner)" />
                <defs>
                  <linearGradient id="chip-inner" x1="10" y1="10" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                {/* >_ symbol */}
                <path d="M16 22l5 4-5 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 30h12" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div>
                <p className="text-white font-extrabold text-xl tracking-tight">Bytes by Charlie</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">Tech · AI · Automation</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center gap-4">
              <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
                <defs>
                  <linearGradient id="chip-grad3" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>
                <rect width="52" height="52" rx="12" fill="url(#chip-grad3)" />
                <rect x="0" y="14" width="6" height="3" rx="1.5" fill="#6366f1" />
                <rect x="0" y="22" width="6" height="3" rx="1.5" fill="#6366f1" />
                <rect x="0" y="30" width="6" height="3" rx="1.5" fill="#6366f1" />
                <rect x="46" y="14" width="6" height="3" rx="1.5" fill="#a855f7" />
                <rect x="46" y="22" width="6" height="3" rx="1.5" fill="#a855f7" />
                <rect x="46" y="30" width="6" height="3" rx="1.5" fill="#a855f7" />
                <rect x="10" y="10" width="32" height="32" rx="6" fill="url(#chip-inner3)" />
                <defs>
                  <linearGradient id="chip-inner3" x1="10" y1="10" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <path d="M16 22l5 4-5 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 30h12" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div>
                <p className="text-slate-900 font-extrabold text-lg tracking-tight">Bytes by Charlie</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">Tech · AI · Automation</p>
              </div>
            </div>
          </div>

        </div>

        <p className="text-center text-slate-400 text-sm mt-12">
          Tell Charlie which number you prefer and it will be applied to the site immediately.
        </p>
      </div>
    </div>
  );
}
