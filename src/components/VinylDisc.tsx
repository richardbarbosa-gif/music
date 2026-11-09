import React, { useState } from 'react';
import { Disc, Volume2, VolumeX } from 'lucide-react';
import { VUMeter } from './VUMeter';

interface VinylDiscProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onInspectBox: () => void;
}

export const VinylDisc: React.FC<VinylDiscProps> = ({
  isPlaying,
  onTogglePlay,
  onInspectBox,
}) => {
  const [extracted, setExtracted] = useState(false);
  const [grooveAngle, setGrooveAngle] = useState(35);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const deg = Math.round((Math.atan2(y, x) * 180) / Math.PI);
    setGrooveAngle(deg);
  };

  const isDiscOut = extracted || isPlaying;

  return (
    <div
      className="relative w-full select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setExtracted(true)}
      onMouseLeave={() => setExtracted(false)}
    >
      {/* Ambient Halogen Stage Spotlight */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-3xl opacity-75 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 58% 40%, rgba(255, 140, 26, 0.22) 0%, rgba(212, 175, 55, 0.09) 45%, transparent 72%)',
        }}
      />

      {/* Main 3D Collector Console Deck */}
      <div className="relative rounded-2xl border border-[#FFB800]/30 luxury-panel p-5 sm:p-6">
        {/* Corner Brushed Brass Chassis Screws */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-[#FFB800]/40 bg-[#1F1912]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-[#FFB800]/40 bg-[#1F1912]"
        />

        {/* Top Engraved Brass Deck Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#FFB800]/20 text-[11px] font-mono">
          <span className="text-[#FFB800] tracking-wider font-semibold">
            MATRIZ CHANTECLER · 1986 · 33 1/3 RPM
          </span>
          <span className="text-[#E4E4E7]/80">LAUDO: MINT (LACRADO DE ÉPOCA)</span>
        </div>

        {/* 3D Physical Sleeve + Sliding Vinyl Record + Precision Tonearm Stage */}
        <div className="relative flex items-center justify-start py-3 sm:py-4 min-h-[256px] sm:min-h-[282px] overflow-hidden px-1 rounded-xl bg-[#070709]/80 border border-white/5 shadow-inner">
          {/* Stacked 5-LP Luxury Leather/Wood Box Spine Indicator on Left */}
          <div
            className="hidden sm:flex flex-col items-center justify-between w-7 h-[232px] rounded-l-md border-y border-l border-[#FFB800]/35 bg-gradient-to-b from-[#241911] via-[#17100B] to-[#0E0A07] py-3 px-1 mr-1 shadow-xl shrink-0"
            title="Estojo de Luxo com os 5 Discos Clássicos"
          >
            <span className="text-[9px] font-mono text-[#FFB800] [writing-mode:vertical-rl] rotate-180 tracking-widest whitespace-nowrap">
              COFRE · 5 LPs
            </span>
            <span className="text-[9px] font-mono text-[#E4E4E7]/65 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
              #01/01
            </span>
          </div>

          {/* Physical Gatefold Jacket (Layer 2 with realistic ringwear & gold foil frame) */}
          <div
            onClick={onInspectBox}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onInspectBox();
            }}
            aria-label="Inspecionar capa física de Chrystian e Ralf 1986"
            className="relative z-20 w-[186px] h-[186px] sm:w-[232px] sm:h-[232px] rounded-md bg-[#161311] border border-[#FFB800]/25 ringwear-texture cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 flex flex-col justify-between p-4 overflow-hidden shrink-0"
          >
            <img
              src="/src/assets/images/box_vozes_cristal_1794263353458.jpg"
              alt="Capa de Época Chrystian & Ralf 1986"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent pointer-events-none" />

            {/* Top Stamp */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#FFB800]/35 pb-1.5">
              <span className="font-mono text-[9px] tracking-wider text-[#FFB800] whitespace-nowrap font-semibold">
                CHANTECLER · 2.11.405
              </span>
              <span className="font-mono text-[9px] text-[#F4F4F5]/85 whitespace-nowrap">
                ESTÉREO
              </span>
            </div>

            {/* Center Cover Typography */}
            <div className="relative z-10 my-auto py-1">
              <p className="font-mono text-[9px] tracking-widest text-[#FFB800] mb-1">
                1ª TIRAGEM ORIGINAL · 1986
              </p>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4F4F5] leading-tight">
                Chrystian &amp; Ralf
              </h3>
              <p className="text-xs text-[#E4E4E7]/85 mt-1 italic font-display">
                &ldquo;Chora Peito&rdquo; &amp; &ldquo;Ausência&rdquo;
              </p>
            </div>

            {/* Bottom Goldmine Seal */}
            <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/15 text-[10px] font-mono text-[#E4E4E7]/80">
              <span>GOLDMINE: NM / MINT</span>
              <span className="text-[#FFB800] underline underline-offset-2 whitespace-nowrap">
                Abrir Encarte
              </span>
            </div>
          </div>

          {/* Layer 3: The 180g Black Vinyl Record sliding out of the sleeve */}
          <div
            style={
              {
                '--groove-angle': `${grooveAngle}deg`,
                transform: isDiscOut
                  ? 'translateX(24%) rotate(14deg)'
                  : 'translateX(10%) rotate(0deg)',
                transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              } as React.CSSProperties
            }
            className="relative z-10 -ml-20 sm:-ml-24 w-[178px] h-[178px] sm:w-[222px] sm:h-[222px] rounded-full shadow-[0_24px_55px_rgba(0,0,0,0.98)] flex items-center justify-center shrink-0"
          >
            {/* Spinning disc surface */}
            <div
              className={`w-full h-full rounded-full vinyl-grooves border border-[#FFB800]/20 flex items-center justify-center ${
                isPlaying ? 'animate-vinyl-spin' : ''
              }`}
            >
              {/* Outer lead-in groove rings */}
              <div className="w-[90%] h-[90%] rounded-full border border-white/[0.06] flex items-center justify-center">
                <div className="w-[74%] h-[74%] rounded-full border border-white/[0.06] flex items-center justify-center">
                  {/* Classic Ruby-Red Chantecler / Continental Center Label (#DC2626) */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] border-2 border-[#FFB800]/80 shadow-inner flex flex-col items-center justify-center text-center p-1.5">
                    <div className="w-full border-b border-[#FFB800]/60 pb-0.5 mb-0.5">
                      <span className="block font-mono text-[7px] tracking-widest text-[#FFB800] font-semibold">
                        CHANTECLER
                      </span>
                    </div>
                    <span className="font-display text-[8px] text-[#F4F4F5] font-semibold leading-none">
                      Chrystian &amp; Ralf
                    </span>
                    <span className="font-mono text-[6.5px] text-[#F4F4F5]/90 mt-0.5">
                      1986 · LADO A
                    </span>
                    {/* Center Spindle Hole */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#070709] border border-[#FFB800]/60 mt-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Precision Audiophile Tonearm SVG (Top-Right of Platter Stage) */}
          <svg
            viewBox="0 0 80 220"
            aria-hidden="true"
            className="pointer-events-none hidden sm:block absolute right-2 top-3 h-[210px] w-[68px] z-30"
            style={{
              transform: isPlaying ? 'rotate(14deg)' : 'rotate(0deg)',
              transformOrigin: '52px 28px',
              transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Gimbal Base */}
            <circle cx="52" cy="28" r="16" fill="#181410" stroke="rgba(255,184,0,0.45)" strokeWidth="1.5" />
            <circle cx="52" cy="28" r="7" fill="#FFB800" fillOpacity="0.8" />
            {/* Counterweight */}
            <rect x="44" y="4" width="16" height="10" rx="2" fill="#27272A" stroke="rgba(255,184,0,0.5)" strokeWidth="1" />
            {/* S-Shaped Brushed Brass Arm Tube */}
            <path
              d="M 52 28 C 52 85, 36 125, 32 175"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Ortofon Moving Coil Headshell */}
            <rect
              x="25"
              y="172"
              width="12"
              height="20"
              rx="2"
              transform="rotate(8 31 182)"
              fill="#12100E"
              stroke="#FFB800"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Instruction hint for 3D sleeve interaction */}
        <div className="flex items-center justify-between gap-4 text-[11px] font-mono text-[#E4E4E7]/70 mt-2.5 mb-3.5">
          <span className="truncate">
            Passe o cursor sobre o disco para extrair a matriz e ver o reflexo nos sulcos
          </span>
          <span className="text-[#FFB800] hidden sm:inline whitespace-nowrap shrink-0">
            5 LPs no Cofre
          </span>
        </div>

        {/* Layer 4: Analog Receiver HUD + VU Meters + Interactive Needle-Drop Player */}
        <div className="rounded-xl border border-[#FFB800]/20 bg-[#070709]/95 p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <VUMeter channelLabel="CANAL ESQ (L)" isActive={isPlaying} compact />
            <VUMeter channelLabel="CANAL DIR (R)" isActive={isPlaying} compact />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/35 flex items-center justify-center text-[#FFB800] shrink-0">
                <Disc className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#F4F4F5]">
                  {isPlaying
                    ? 'Agulha no Sulco: Chrystian & Ralf (1986)'
                    : 'Audição da Matriz: Chrystian & Ralf (1986)'}
                </div>
                <div className="text-[11px] font-mono text-[#E4E4E7]/70">
                  {isPlaying
                    ? 'Chiado orgânico de vinil virgem + Viola Caipira'
                    : 'Simulação real do estalo da agulha no primeiro sulco'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onTogglePlay}
              className={`px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                isPlaying
                  ? 'bg-[#DC2626] text-[#F4F4F5] hover:bg-[#B91C1C] shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                  : 'luxury-cta text-[#08080A]'
              }`}
            >
              {isPlaying ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Levantar Agulha</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Ouvir o Ruído da Agulha</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
