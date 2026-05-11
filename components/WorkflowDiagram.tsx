"use client";

import { useEffect, useState } from "react";

const nodes = [
  {
    id: 1,
    label: "Webhook",
    sublabel: "Trigger",
    icon: "⚡",
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    id: 2,
    label: "HTTP",
    sublabel: "Fetch Data",
    icon: "🌐",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.3)",
  },
  {
    id: 3,
    label: "Claude AI",
    sublabel: "Analyze",
    icon: "🤖",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    id: 4,
    label: "Format",
    sublabel: "Transform",
    icon: "✨",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    id: 5,
    label: "Slack",
    sublabel: "Notify",
    icon: "📨",
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.3)",
  },
];

export default function WorkflowDiagram() {
  const [activeNode, setActiveNode] = useState(0);
  const [packets, setPackets] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const id = Math.random();
    setPackets((p) => [...p, id]);
    const t = setTimeout(() => {
      setPackets((p) => p.filter((x) => x !== id));
    }, 4500);
    return () => clearTimeout(t);
  }, [activeNode]);

  return (
    <div className="my-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
      {/* Header bar */}
      <div className="bg-slate-800 px-5 py-3 flex items-center gap-3 border-b border-slate-700">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 text-slate-400 text-xs font-mono flex-1">
          n8n Workflow - AI Content Automation Pipeline
        </span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Running
        </span>
      </div>

      {/* Diagram */}
      <div className="bg-slate-900 p-8 overflow-x-auto">
        <div className="flex items-center justify-start gap-0 min-w-max mx-auto">
          {nodes.map((node, i) => (
            <div key={node.id} className="flex items-center">
              {/* Node */}
              <div className="flex flex-col items-center">
                <div
                  className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
                  style={{
                    background:
                      activeNode === i
                        ? `${node.color}25`
                        : "rgba(255,255,255,0.04)",
                    border: `2px solid ${activeNode === i ? node.color : node.color + "40"}`,
                    boxShadow:
                      activeNode === i ? `0 0 20px ${node.glow}` : "none",
                    transform: activeNode === i ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <span className="text-2xl">{node.icon}</span>
                  <span
                    className="text-[10px] font-extrabold text-center"
                    style={{ color: node.color }}
                  >
                    {node.label}
                  </span>
                  <span className="text-[9px] text-slate-500 text-center">
                    {node.sublabel}
                  </span>
                </div>

                {/* Status dot */}
                <div className="mt-2 flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        activeNode >= i ? node.color : "rgba(255,255,255,0.1)",
                      boxShadow:
                        activeNode === i ? `0 0 6px ${node.color}` : "none",
                    }}
                  />
                  {activeNode === i && (
                    <span
                      className="text-[9px] font-semibold"
                      style={{ color: node.color }}
                    >
                      Processing...
                    </span>
                  )}
                </div>
              </div>

              {/* Connector */}
              {i < nodes.length - 1 && (
                <div className="relative w-14 h-1 mx-1 flex-shrink-0">
                  {/* Track */}
                  <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{ background: node.color }}
                  />
                  {/* Active fill */}
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-700"
                    style={{
                      background: node.color,
                      opacity: activeNode > i ? 0.6 : 0.1,
                    }}
                  />
                  {/* Animated packet */}
                  {activeNode === i + 1 && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                      style={{
                        background: node.color,
                        boxShadow: `0 0 8px ${node.glow}`,
                        animation: "slidePacket 0.8s ease-in-out forwards",
                      }}
                    />
                  )}
                  {/* Arrow */}
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    style={{ color: node.color, opacity: 0.6, fontSize: 10 }}
                  >
                    ▶
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-5 border-t border-slate-800 grid grid-cols-5 gap-2 text-center">
          {nodes.map((node) => (
            <div key={node.id}>
              <p className="text-[10px] font-bold" style={{ color: node.color }}>
                {node.label}
              </p>
              <p className="text-[9px] text-slate-500 mt-0.5">{node.sublabel}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slidePacket {
          from { left: 0%; }
          to { left: 85%; }
        }
      `}</style>
    </div>
  );
}
