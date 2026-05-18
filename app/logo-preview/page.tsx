export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-2 text-center">Logo Concepts</h1>
        <p className="text-slate-500 text-center mb-16 text-sm">Four creative directions — tell Charlie which one feels right</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ══ OPTION 1: PIXEL BYTE ══════════════════════════════ */}
          <div className="rounded-3xl overflow-hidden border border-slate-800">
            <div className="bg-slate-900 px-6 pt-6 pb-3">
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-5 text-center">Option 1 — Pixel Byte</p>
              <p className="text-slate-500 text-xs text-center mb-6">"Bytes" = data bits. Each square is a bit. Together they make a B.</p>

              {/* Large preview */}
              <div className="flex items-center justify-center gap-5 mb-6 bg-slate-950 rounded-2xl py-8">
                <svg width="64" height="64" viewBox="0 0 52 52" fill="none">
                  {/* Row 0 */}
                  <rect x="7"  y="2"  width="8" height="8" rx="2" fill="#6366f1"/>
                  <rect x="17" y="2"  width="8" height="8" rx="2" fill="#7c3aed"/>
                  <rect x="27" y="2"  width="8" height="8" rx="2" fill="#8b5cf6"/>
                  {/* Row 1 */}
                  <rect x="7"  y="12" width="8" height="8" rx="2" fill="#6366f1"/>
                  <rect x="37" y="12" width="8" height="8" rx="2" fill="#a78bfa"/>
                  {/* Row 2 */}
                  <rect x="7"  y="22" width="8" height="8" rx="2" fill="#4f46e5"/>
                  <rect x="17" y="22" width="8" height="8" rx="2" fill="#7c3aed"/>
                  <rect x="27" y="22" width="8" height="8" rx="2" fill="#9333ea"/>
                  {/* Row 3 */}
                  <rect x="7"  y="32" width="8" height="8" rx="2" fill="#4338ca"/>
                  <rect x="37" y="32" width="8" height="8" rx="2" fill="#a855f7"/>
                  {/* Row 4 */}
                  <rect x="7"  y="42" width="8" height="8" rx="2" fill="#3730a3"/>
                  <rect x="17" y="42" width="8" height="8" rx="2" fill="#7e22ce"/>
                  <rect x="27" y="42" width="8" height="8" rx="2" fill="#a855f7"/>
                </svg>
                <div>
                  <p className="text-white font-extrabold text-2xl tracking-tight leading-none">Bytes by Charlie</p>
                  <p className="text-indigo-400 text-xs tracking-[0.25em] uppercase font-semibold mt-1.5">Tech · AI · Automation</p>
                </div>
              </div>

              {/* Small / navbar size */}
              <div className="flex items-center justify-center gap-3 bg-white rounded-2xl py-5 mb-2">
                <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
                  <rect x="7"  y="2"  width="8" height="8" rx="2" fill="#6366f1"/>
                  <rect x="17" y="2"  width="8" height="8" rx="2" fill="#7c3aed"/>
                  <rect x="27" y="2"  width="8" height="8" rx="2" fill="#8b5cf6"/>
                  <rect x="7"  y="12" width="8" height="8" rx="2" fill="#6366f1"/>
                  <rect x="37" y="12" width="8" height="8" rx="2" fill="#a78bfa"/>
                  <rect x="7"  y="22" width="8" height="8" rx="2" fill="#4f46e5"/>
                  <rect x="17" y="22" width="8" height="8" rx="2" fill="#7c3aed"/>
                  <rect x="27" y="22" width="8" height="8" rx="2" fill="#9333ea"/>
                  <rect x="7"  y="32" width="8" height="8" rx="2" fill="#4338ca"/>
                  <rect x="37" y="32" width="8" height="8" rx="2" fill="#a855f7"/>
                  <rect x="7"  y="42" width="8" height="8" rx="2" fill="#3730a3"/>
                  <rect x="17" y="42" width="8" height="8" rx="2" fill="#7e22ce"/>
                  <rect x="27" y="42" width="8" height="8" rx="2" fill="#a855f7"/>
                </svg>
                <div>
                  <p className="text-slate-900 font-extrabold text-base tracking-tight">Bytes by Charlie</p>
                  <p className="text-slate-400 text-[9px] tracking-widest uppercase">Tech · AI · Automation</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs text-center pb-4">As it looks in the navbar (light mode)</p>
            </div>
          </div>

          {/* ══ OPTION 2: SIGNAL WAVE ════════════════════════════ */}
          <div className="rounded-3xl overflow-hidden border border-slate-800">
            <div className="bg-slate-900 px-6 pt-6 pb-3">
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-5 text-center">Option 2 — Signal</p>
              <p className="text-slate-500 text-xs text-center mb-6">Data as a waveform. Bytes are signals — this logo makes that literal.</p>

              <div className="flex items-center justify-center gap-5 mb-6 bg-slate-950 rounded-2xl py-8">
                <svg width="64" height="64" viewBox="0 0 52 52" fill="none">
                  <defs>
                    <linearGradient id="wave-g" x1="0" y1="52" x2="52" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#10b981"/>
                      <stop offset="50%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#a855f7"/>
                    </linearGradient>
                  </defs>
                  {/* Equalizer bars — different heights */}
                  <rect x="3"  y="28" width="7" height="20" rx="3.5" fill="url(#wave-g)" opacity="0.6"/>
                  <rect x="13" y="18" width="7" height="30" rx="3.5" fill="url(#wave-g)" opacity="0.75"/>
                  <rect x="23" y="8"  width="7" height="40" rx="3.5" fill="url(#wave-g)"/>
                  <rect x="33" y="14" width="7" height="34" rx="3.5" fill="url(#wave-g)" opacity="0.85"/>
                  <rect x="43" y="24" width="7" height="24" rx="3.5" fill="url(#wave-g)" opacity="0.65"/>
                </svg>
                <div>
                  <p className="text-white font-extrabold text-2xl tracking-tight leading-none">Bytes by Charlie</p>
                  <p className="text-emerald-400 text-xs tracking-[0.25em] uppercase font-semibold mt-1.5">Tech · AI · Automation</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 bg-white rounded-2xl py-5 mb-2">
                <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
                  <defs>
                    <linearGradient id="wave-g2" x1="0" y1="52" x2="52" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#10b981"/>
                      <stop offset="50%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#a855f7"/>
                    </linearGradient>
                  </defs>
                  <rect x="3"  y="28" width="7" height="20" rx="3.5" fill="url(#wave-g2)" opacity="0.6"/>
                  <rect x="13" y="18" width="7" height="30" rx="3.5" fill="url(#wave-g2)" opacity="0.75"/>
                  <rect x="23" y="8"  width="7" height="40" rx="3.5" fill="url(#wave-g2)"/>
                  <rect x="33" y="14" width="7" height="34" rx="3.5" fill="url(#wave-g2)" opacity="0.85"/>
                  <rect x="43" y="24" width="7" height="24" rx="3.5" fill="url(#wave-g2)" opacity="0.65"/>
                </svg>
                <div>
                  <p className="text-slate-900 font-extrabold text-base tracking-tight">Bytes by Charlie</p>
                  <p className="text-slate-400 text-[9px] tracking-widest uppercase">Tech · AI · Automation</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs text-center pb-4">As it looks in the navbar (light mode)</p>
            </div>
          </div>

          {/* ══ OPTION 3: NODE FLOW ══════════════════════════════ */}
          <div className="rounded-3xl overflow-hidden border border-slate-800">
            <div className="bg-slate-900 px-6 pt-6 pb-3">
              <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-5 text-center">Option 3 — Node Flow</p>
              <p className="text-slate-500 text-xs text-center mb-6">Three nodes. Three connections. Looks like an n8n workflow — the blog's core topic.</p>

              <div className="flex items-center justify-center gap-5 mb-6 bg-slate-950 rounded-2xl py-8">
                <svg width="64" height="64" viewBox="0 0 52 52" fill="none">
                  <defs>
                    <linearGradient id="node-g" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#f59e0b"/>
                      <stop offset="100%" stopColor="#ef4444"/>
                    </linearGradient>
                  </defs>
                  {/* Connection lines */}
                  <line x1="12" y1="14" x2="40" y2="14" stroke="url(#node-g)" strokeWidth="2" strokeDasharray="3 2" opacity="0.5"/>
                  <line x1="12" y1="14" x2="26" y2="40" stroke="url(#node-g)" strokeWidth="2" strokeDasharray="3 2" opacity="0.5"/>
                  <line x1="40" y1="14" x2="26" y2="40" stroke="url(#node-g)" strokeWidth="2" strokeDasharray="3 2" opacity="0.5"/>
                  {/* Nodes */}
                  <circle cx="12" cy="14" r="8" fill="url(#node-g)"/>
                  <circle cx="40" cy="14" r="8" fill="url(#node-g)" opacity="0.8"/>
                  <circle cx="26" cy="40" r="8" fill="url(#node-g)" opacity="0.9"/>
                  {/* Node dots */}
                  <circle cx="12" cy="14" r="2.5" fill="white"/>
                  <circle cx="40" cy="14" r="2.5" fill="white"/>
                  <circle cx="26" cy="40" r="2.5" fill="white"/>
                </svg>
                <div>
                  <p className="text-white font-extrabold text-2xl tracking-tight leading-none">Bytes by Charlie</p>
                  <p className="text-orange-400 text-xs tracking-[0.25em] uppercase font-semibold mt-1.5">Tech · AI · Automation</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 bg-white rounded-2xl py-5 mb-2">
                <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
                  <defs>
                    <linearGradient id="node-g2" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#f59e0b"/>
                      <stop offset="100%" stopColor="#ef4444"/>
                    </linearGradient>
                  </defs>
                  <line x1="12" y1="14" x2="40" y2="14" stroke="url(#node-g2)" strokeWidth="2" strokeDasharray="3 2" opacity="0.5"/>
                  <line x1="12" y1="14" x2="26" y2="40" stroke="url(#node-g2)" strokeWidth="2" strokeDasharray="3 2" opacity="0.5"/>
                  <line x1="40" y1="14" x2="26" y2="40" stroke="url(#node-g2)" strokeWidth="2" strokeDasharray="3 2" opacity="0.5"/>
                  <circle cx="12" cy="14" r="8" fill="url(#node-g2)"/>
                  <circle cx="40" cy="14" r="8" fill="url(#node-g2)" opacity="0.8"/>
                  <circle cx="26" cy="40" r="8" fill="url(#node-g2)" opacity="0.9"/>
                  <circle cx="12" cy="14" r="2.5" fill="white"/>
                  <circle cx="40" cy="14" r="2.5" fill="white"/>
                  <circle cx="26" cy="40" r="2.5" fill="white"/>
                </svg>
                <div>
                  <p className="text-slate-900 font-extrabold text-base tracking-tight">Bytes by Charlie</p>
                  <p className="text-slate-400 text-[9px] tracking-widest uppercase">Tech · AI · Automation</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs text-center pb-4">As it looks in the navbar (light mode)</p>
            </div>
          </div>

          {/* ══ OPTION 4: PRISM ══════════════════════════════════ */}
          <div className="rounded-3xl overflow-hidden border border-slate-800">
            <div className="bg-slate-900 px-6 pt-6 pb-3">
              <p className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-5 text-center">Option 4 — Prism</p>
              <p className="text-slate-500 text-xs text-center mb-6">A prism breaks light into its components. Charlie breaks down complex tech — same idea.</p>

              <div className="flex items-center justify-center gap-5 mb-6 bg-slate-950 rounded-2xl py-8">
                <svg width="64" height="64" viewBox="0 0 52 52" fill="none">
                  <defs>
                    <linearGradient id="prism-left" x1="26" y1="3" x2="3" y2="49" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#818cf8"/>
                      <stop offset="100%" stopColor="#6366f1"/>
                    </linearGradient>
                    <linearGradient id="prism-right" x1="26" y1="3" x2="49" y2="49" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#c084fc"/>
                      <stop offset="100%" stopColor="#ec4899"/>
                    </linearGradient>
                    <linearGradient id="prism-beam1" x1="3" y1="49" x2="0" y2="44" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#10b981"/>
                    </linearGradient>
                    <linearGradient id="prism-beam2" x1="3" y1="49" x2="0" y2="52" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#f59e0b"/>
                    </linearGradient>
                    <linearGradient id="prism-beam3" x1="49" y1="49" x2="52" y2="44" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ec4899"/>
                      <stop offset="100%" stopColor="#f97316"/>
                    </linearGradient>
                    <linearGradient id="prism-beam4" x1="49" y1="49" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ec4899"/>
                      <stop offset="100%" stopColor="#ef4444"/>
                    </linearGradient>
                  </defs>
                  {/* Main triangle */}
                  <polygon points="26,3 3,49 49,49" fill="none" stroke="none"/>
                  <polygon points="26,3 3,49 26,49" fill="url(#prism-left)" opacity="0.9"/>
                  <polygon points="26,3 26,49 49,49" fill="url(#prism-right)" opacity="0.9"/>
                  {/* Spectrum beams coming out bottom left */}
                  <line x1="3" y1="49" x2="0" y2="40" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="3" y1="49" x2="-1" y2="47" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="3" y1="49" x2="0" y2="54" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* Spectrum beams coming out bottom right */}
                  <line x1="49" y1="49" x2="52" y2="40" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="49" y1="49" x2="53" y2="47" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="49" y1="49" x2="52" y2="54" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* Stroke */}
                  <polygon points="26,3 3,49 49,49" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  {/* Input beam at top */}
                  <line x1="26" y1="0" x2="26" y2="3" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
                </svg>
                <div>
                  <p className="text-white font-extrabold text-2xl tracking-tight leading-none">Bytes by Charlie</p>
                  <p className="text-pink-400 text-xs tracking-[0.25em] uppercase font-semibold mt-1.5">Tech · AI · Automation</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 bg-white rounded-2xl py-5 mb-2">
                <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
                  <defs>
                    <linearGradient id="prism-left2" x1="26" y1="3" x2="3" y2="49" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#818cf8"/>
                      <stop offset="100%" stopColor="#6366f1"/>
                    </linearGradient>
                    <linearGradient id="prism-right2" x1="26" y1="3" x2="49" y2="49" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#c084fc"/>
                      <stop offset="100%" stopColor="#ec4899"/>
                    </linearGradient>
                  </defs>
                  <polygon points="26,3 3,49 26,49" fill="url(#prism-left2)" opacity="0.9"/>
                  <polygon points="26,3 26,49 49,49" fill="url(#prism-right2)" opacity="0.9"/>
                  <line x1="3" y1="49" x2="0" y2="40" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="3" y1="49" x2="-1" y2="47" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="3" y1="49" x2="0" y2="54" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="49" y1="49" x2="52" y2="40" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="49" y1="49" x2="53" y2="47" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="49" y1="49" x2="52" y2="54" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                  <polygon points="26,3 3,49 49,49" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                  <line x1="26" y1="0" x2="26" y2="3" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
                </svg>
                <div>
                  <p className="text-slate-900 font-extrabold text-base tracking-tight">Bytes by Charlie</p>
                  <p className="text-slate-400 text-[9px] tracking-widest uppercase">Tech · AI · Automation</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs text-center pb-4">As it looks in the navbar (light mode)</p>
            </div>
          </div>

        </div>

        <p className="text-center text-slate-600 text-sm mt-14">
          Reply with the number (1, 2, 3 or 4) and it goes live on the site immediately.
        </p>
      </div>
    </div>
  );
}
