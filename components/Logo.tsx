export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#logo-grad)" />
      {/* Terminal prompt: >_ */}
      <path
        d="M8 15l6 5-6 5"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 25h13"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
