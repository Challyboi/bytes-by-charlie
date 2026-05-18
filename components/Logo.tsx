export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
  );
}
