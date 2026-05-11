"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-1 bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-75"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
        }}
      />
    </div>
  );
}
