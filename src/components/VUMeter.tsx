import React, { useEffect, useState } from 'react';

interface VUMeterProps {
  channelLabel: string;
  isActive: boolean;
  mode?: 'vinyl' | 'mp3';
  compact?: boolean;
}

export const VUMeter: React.FC<VUMeterProps> = ({
  channelLabel,
  isActive,
  mode = 'vinyl',
  compact = false,
}) => {
  const [angle, setAngle] = useState<number>(-32);
  const [dbValue, setDbValue] = useState<string>('-18.4 dB');

  useEffect(() => {
    if (!isActive) {
      const idleInterval = window.setInterval(() => {
        const jitter = (Math.random() - 0.5) * 3.2;
        setAngle(-34 + jitter);
        setDbValue('-24.0 dB');
      }, 900);
      return () => clearInterval(idleInterval);
    }

    const activeInterval = window.setInterval(() => {
      if (mode === 'vinyl') {
        const swing = -4 + Math.sin(Date.now() / 190) * 16 + (Math.random() - 0.45) * 14;
        const clamped = Math.max(-35, Math.min(28, swing));
        setAngle(clamped);
        const computedDb = ((clamped - 10) * 0.22).toFixed(1);
        setDbValue(`${Number(computedDb) >= 0 ? '+' : ''}${computedDb} dB`);
      } else {
        const pinned = 16 + (Math.random() - 0.5) * 2.5;
        setAngle(pinned);
        setDbValue('-0.2 dB');
      }
    }, 140);

    return () => clearInterval(activeInterval);
  }, [isActive, mode]);

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[#FFB800]/30 bg-[#100C08] ${
        compact ? 'p-3' : 'p-4'
      } shadow-[inset_0_2px_12px_rgba(0,0,0,0.95)]`}
      style={{
        background:
          'radial-gradient(circle at 50% 92%, rgba(255, 148, 25, 0.28) 0%, rgba(28, 19, 11, 0.96) 62%, rgba(9, 8, 10, 1) 100%)',
      }}
    >
      {/* Subtle diagonal glass lens reflection */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            'linear-gradient(125deg, transparent 30%, rgba(255, 245, 220, 0.18) 48%, transparent 54%)',
        }}
      />

      {/* Top engraved brass scale header */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#E4E4E7]/85 mb-1 pb-1 border-b border-[#FFB800]/15">
        <span className="tracking-widest text-[#FFB800] font-semibold">{channelLabel}</span>
        <span className="tabular-nums text-[#F4F4F5]/80">{dbValue}</span>
      </div>

      {/* Analog Dial SVG */}
      <div className={`relative z-10 w-full ${compact ? 'h-14' : 'h-20'} flex items-end justify-center`}>
        <svg
          viewBox="0 0 200 100"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          {/* Outer Fine Calibration Arc */}
          <path
            d="M 18 88 A 87 87 0 0 1 182 88"
            fill="none"
            stroke="rgba(255, 184, 0, 0.14)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          {/* Main dB Arc (-20 to 0 dB) */}
          <path
            d="M 22 88 A 83 83 0 0 1 141 23"
            fill="none"
            stroke="rgba(244, 244, 245, 0.48)"
            strokeWidth="2"
          />
          {/* Red overload zone (0 to +3 dB) */}
          <path
            d="M 141 23 A 83 83 0 0 1 178 88"
            fill="none"
            stroke="#DC2626"
            strokeWidth="3.5"
          />

          {/* Scale Markings */}
          <text x="22" y="72" fill="#A1A1AA" fontSize="7.5" fontFamily="JetBrains Mono">
            -20
          </text>
          <text x="52" y="42" fill="#D4D4D8" fontSize="7.5" fontFamily="JetBrains Mono">
            -10
          </text>
          <text x="92" y="25" fill="#F4F4F5" fontSize="8" fontFamily="JetBrains Mono">
            -3
          </text>
          <text x="128" y="27" fill="#FFB800" fontSize="8.5" fontWeight="bold" fontFamily="JetBrains Mono">
            0
          </text>
          <text x="160" y="54" fill="#DC2626" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
            +3
          </text>

          {/* Center VU Heritage Stamp */}
          <text
            x="100"
            y="62"
            textAnchor="middle"
            fill="rgba(255, 184, 0, 0.55)"
            fontSize="8.5"
            letterSpacing="2.5"
            fontFamily="JetBrains Mono"
          >
            VU · LAB RIAA
          </text>
          <text
            x="100"
            y="73"
            textAnchor="middle"
            fill="rgba(244, 244, 245, 0.28)"
            fontSize="6.5"
            letterSpacing="1.5"
            fontFamily="JetBrains Mono"
          >
            SÉRIE OURO
          </text>

          {/* Hardware-accelerated Needle */}
          <g
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: '100px 92px',
              transition: 'transform 130ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <line
              x1="100"
              y1="92"
              x2="100"
              y2="13"
              stroke={angle > 14 ? '#DC2626' : '#FFB800'}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* Machined Brass Pivot Cap */}
          <circle cx="100" cy="92" r="6.5" fill="#181410" stroke="#FFB800" strokeWidth="1.4" />
          <circle cx="100" cy="92" r="2.2" fill="#FFB800" />
        </svg>
      </div>
    </div>
  );
};
