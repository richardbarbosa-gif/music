import React, { useState, useEffect } from 'react';
import {
  Disc,
  Volume2,
  VolumeX,
  ChevronDown,
  Eye,
  Check,
  ArrowRight,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  COLLECTOR_BOXES,
  HISTORICAL_LABELS,
  PRESERVATION_STEPS,
  COLLECTOR_TESTIMONIALS,
  FAQ_ITEMS,
  CollectorBox,
  formatCurrencyBRL,
  getAcousticComparisonProfile,
} from './utils/catalog';
import { analogAudio } from './utils/analogAudio';
import { VinylDisc } from './components/VinylDisc';
import { VUMeter } from './components/VUMeter';
import { GatefoldPreview } from './components/GatefoldPreview';
import { VaultDrawer } from './components/VaultDrawer';

export default function App() {
  const [isPlayingNeedle, setIsPlayingNeedle] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<'vinyl' | 'mp3'>('vinyl');
  const [inspectedBox, setInspectedBox] = useState<CollectorBox | null>(null);
  const [selectedBoxIds, setSelectedBoxIds] = useState<string[]>(['box-vozes-cristal']);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [activePreservationStep, setActivePreservationStep] = useState<number>(0);
  const [activeUnboxingHotspot, setActiveUnboxingHotspot] = useState<'wood' | 'wax' | 'glove'>('wood');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [lotTimerSeconds, setLotTimerSeconds] = useState<number>(14295);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLotTimerSeconds((prev) => (prev > 0 ? prev - 1 : 14295));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    return `${hrs}h : ${mins}m : ${secs}s`;
  };

  const handleToggleNeedlePlay = (forcedMode?: 'vinyl' | 'mp3') => {
    const targetMode = forcedMode || comparisonMode;
    if (isPlayingNeedle && !forcedMode) {
      analogAudio.stop();
      setIsPlayingNeedle(false);
    } else {
      setComparisonMode(targetMode);
      setIsPlayingNeedle(true);
      analogAudio.startNeedleDrop(targetMode, () => {
        setIsPlayingNeedle(false);
      });
    }
  };

  const handleReserveBox = (boxId: string) => {
    setSelectedBoxIds((prev) => (prev.includes(boxId) ? prev : [...prev, boxId]));
    setIsVaultOpen(true);
  };

  const handleToggleBoxInVault = (boxId: string) => {
    setSelectedBoxIds((prev) =>
      prev.includes(boxId) ? prev.filter((id) => id !== boxId) : [...prev, boxId]
    );
  };

  const handleSelectAllTrilogy = () => {
    setSelectedBoxIds(COLLECTOR_BOXES.map((b) => b.id));
    setIsVaultOpen(true);
  };

  const acousticProfile = getAcousticComparisonProfile(comparisonMode);

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#F4F4F5] selection:bg-[#FF6B00]/30 selection:text-[#FFB800]">
      {/* Layer 0: Subtle Analog Film & Studio Dust SVG Noise Overlay (3% Opacity) */}
      <svg
        className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.03]"
        aria-hidden="true"
      >
        <filter id="analog-studio-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#analog-studio-noise)" />
      </svg>

      {/* Top Navigation Bar — Strictly following the 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 border-b border-[#FFB800]/20 bg-[#070709]/90 backdrop-blur-xl">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#topo"
          className="font-display text-xl font-bold tracking-tight text-[#F4F4F5] whitespace-nowrap shrink-0"
        >
          O Sulco Sagrado
        </a>

        {/* Zone 2: 4–5 concise single-line navigation links */}
        <nav
          aria-label="Navegação Principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#E4E4E7]/85"
        >
          <a
            href="#colecoes"
            className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Coleções
          </a>
          <a
            href="#comparacao"
            className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Acústica
          </a>
          <a
            href="#preservacao"
            className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Preservação
          </a>
          <a
            href="#unboxing"
            className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Estojo
          </a>
          <a
            href="#garantia"
            className="hover:text-[#FFB800] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Garantia
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setIsVaultOpen(true)}
            className="px-4 py-2 text-xs font-mono font-bold text-[#070709] bg-gradient-to-b from-[#FFD25A] to-[#FFB800] rounded-lg hover:from-[#FFB800] hover:to-[#FF6B00] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cofre Reservado ({selectedBoxIds.length})
          </button>
        </div>
      </header>

      <main id="topo">
        {/* 1. Rarity HUD Strip (Below Header) */}
        <div className="border-b border-[#FFB800]/25 bg-[#0C0A08] px-6 lg:px-12 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#E4E4E7]/85">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="text-[#FFB800] font-semibold tracking-wide">
                Lote Gravadora 1978–1994
              </span>
              <span aria-hidden="true">·</span>
              <span>Apenas 1 cópia por matriz encontrada</span>
            </div>
            <div className="flex items-center gap-3 tabular-nums">
              <span className="text-[#E4E4E7]/65">Custódia do Lote #04/2026 encerra em:</span>
              <span className="text-[#FF6B00] font-semibold">{formatCountdown(lotTimerSeconds)}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#FFB800]">3 Matrizes Disponíveis</span>
            </div>
          </div>
        </div>

        {/* 2. Cinematic Hero Section with 1986 Analog Studio Background */}
        <section className="relative overflow-hidden py-10 lg:py-14 px-6 lg:px-12 border-b border-[#FFB800]/20">
          {/* Layer 1: Archival 1986 Recording Studio Background Image */}
          <img
            src="/src/assets/images/bg_hero_studio_1986_1794264338725.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity scale-105"
          />
          {/* Measured Scrim & Halogen Spotlights */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(7,7,9,0.90) 0%, rgba(7,7,9,0.68) 55%, rgba(7,7,9,0.84) 100%), radial-gradient(circle at 22% 28%, rgba(255, 107, 0, 0.20) 0%, transparent 55%), radial-gradient(circle at 80% 55%, rgba(255, 184, 0, 0.16) 0%, transparent 58%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: High-Impact Visceral Copywriting */}
            <div className="lg:col-span-7 space-y-5">
              {/* Tactile Archival Stamp */}
              <div className="inline-block font-mono text-xs tracking-widest text-[#FFB800]">
                [ Matriz Analógica Certificada ]
              </div>

              {/* Hero Headline */}
              <h1
                className="font-display font-bold text-[#F4F4F5] tracking-tight leading-[1.08] max-w-2xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                style={{
                  fontSize: 'clamp(2.25rem, 3.85vw, 3.65rem)',
                  textWrap: 'balance',
                }}
              >
                &ldquo;Você ainda lembra do barulho exato da{' '}
                <span className="italic text-[#FFB800]">agulha descendo</span> antes do primeiro
                acorde?&rdquo;
              </h1>

              {/* Hero Sub-headline */}
              <p className="text-base sm:text-lg text-[#E4E4E7]/90 leading-relaxed max-w-[65ch]">
                O streaming achatou as vozes mais monumentais do Brasil em arquivos frios de
                celular. Nós passamos 11 anos resgatando prensagens originais dos anos 70 a 90 —
                guardadas a vácuo, sem arranhões, com o mesmo calor analógico que fez a sala da
                sua infância parar para ouvir.
              </p>

              {/* Micro-Copy of Authority */}
              <div className="py-3.5 px-4 rounded-xl border border-[#FFB800]/25 brass-badge text-xs sm:text-sm text-[#E4E4E7]/85 leading-relaxed max-w-[64ch]">
                <strong className="text-[#FFB800] font-mono tracking-wide">
                  LAUDO GOLDMINE (NM / MINT):
                </strong>{' '}
                Prensagens raras de época avaliadas rigorosamente na Escala Internacional Goldmine
                (NM / Mint). Não são reedições digitais modernas. São os discos exatos que saíram
                das fábricas da Continental, RCA e Chantecler há 40 anos.
              </div>

              {/* Primary Tactile CTA */}
              <div className="pt-1 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href="#colecoes"
                    className="px-7 py-4 rounded-xl luxury-cta text-[#070709] font-mono text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 flex items-center justify-center gap-3 whitespace-nowrap shrink-0"
                  >
                    <span>RESGATAR MINHA COLEÇÃO DE ÉPOCA</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setInspectedBox(COLLECTOR_BOXES[0])}
                    className="px-5 py-4 rounded-xl border border-[#FFB800]/35 bg-[#0F0D0A]/90 hover:border-[#FFB800] hover:bg-[#FFB800]/10 text-[#F4F4F5] font-mono text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Inspecionar Matriz 1986
                  </button>
                </div>

                <p className="text-xs font-mono text-[#E4E4E7]/70">
                  Envio blindado em embalagem anti-impacto japonesa · Suporta até 40kg de pressão
                  lateral
                </p>
              </div>
            </div>

            {/* Right Column: 3D Multi-Layered Vinyl Showcase & Interactive Needle Player */}
            <div className="lg:col-span-5">
              <VinylDisc
                isPlaying={isPlayingNeedle}
                onTogglePlay={() => handleToggleNeedlePlay('vinyl')}
                onInspectBox={() => setInspectedBox(COLLECTOR_BOXES[0])}
              />
            </div>
          </div>
        </section>

        {/* 3. Historical Authenticity Ribbon (Engraved Archival Pressing Plaques) */}
        <section
          aria-label="Fita de Autenticidade Histórica das Gravadoras"
          className="relative overflow-hidden border-b border-[#FFB800]/20 bg-[#0B0908] py-9 px-6 lg:px-12"
        >
          <img
            src="/src/assets/images/bg_hero_studio_1986_1794264338725.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-bottom opacity-35 mix-blend-luminosity"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.75) 50%, rgba(7,7,9,0.92) 100%)',
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <p className="text-center font-mono text-[11px] tracking-[0.2em] text-[#FFB800]/80 mb-6">
              MATRIZES ORIGINAIS DE FÁBRICA · PRENSAGENS HISTÓRICAS BRASILEIRAS (1975–1994)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
              {HISTORICAL_LABELS.map((label) => (
                <div
                  key={label.name}
                  className="text-center py-3.5 px-3 rounded-xl border border-[#FFB800]/20 luxury-panel hover:border-[#FFB800]/50 transition-colors"
                >
                  <div className="font-display text-lg font-bold text-[#F4F4F5] tracking-tight">
                    {label.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#FFB800]/75 mt-1">
                    {label.era}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Sensory Comparison Section: Ouvido vs. Alma (Listening Room Background) */}
        <section
          id="comparacao"
          className="relative overflow-hidden py-20 lg:py-28 px-6 lg:px-12 border-b border-[#FFB800]/20"
        >
          {/* Section Background Image: Collector Listening Room */}
          <img
            src="/src/assets/images/bg_collector_listening_room_1794264341793.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.62) 50%, rgba(7,7,9,0.92) 100%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <div className="font-mono text-xs text-[#FFB800] tracking-widest mb-2">
                01. COMPARAÇÃO SENSORIAL · OUVIDO VS. ALMA
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F5] leading-tight mb-4">
                &ldquo;O MP3 comprime 80% das frequências da viola caipira. No vinil original, a
                respiração do cantor e a madeira do violão estão vivas dentro da sua sala.&rdquo;
              </h2>
              <p className="text-base text-[#E4E4E7]/85 leading-relaxed">
                Alterne abaixo entre a resposta acústica da fita master analógica prensada em PVC
                virgem e a compressão perceptual dos aplicativos de streaming. Ouça no seu próprio
                equipamento a diferença de corpo harmônico.
              </p>
            </div>

            <div className="rounded-2xl border border-[#FFB800]/30 luxury-panel p-6 sm:p-10">
              {/* Interactive Segmented Control */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#FFB800]/15">
                <div className="inline-flex p-1.5 rounded-xl bg-[#070709] border border-[#FFB800]/25">
                  <button
                    type="button"
                    onClick={() => {
                      setComparisonMode('vinyl');
                      if (isPlayingNeedle) handleToggleNeedlePlay('vinyl');
                    }}
                    className={`px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      comparisonMode === 'vinyl'
                        ? 'luxury-cta text-[#070709]'
                        : 'text-[#E4E4E7]/70 hover:text-white'
                    }`}
                  >
                    Matriz Analógica Original (Vinil 1986)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setComparisonMode('mp3');
                      if (isPlayingNeedle) handleToggleNeedlePlay('mp3');
                    }}
                    className={`px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      comparisonMode === 'mp3'
                        ? 'bg-[#DC2626] text-white shadow-sm'
                        : 'text-[#E4E4E7]/70 hover:text-white'
                    }`}
                  >
                    Streaming Comprimido (MP3 128kbps)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleNeedlePlay(comparisonMode)}
                  className="px-5 py-2.5 rounded-xl border border-[#FFB800]/45 bg-[#FFB800]/10 hover:bg-[#FFB800] hover:text-[#070709] text-[#FFB800] font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isPlayingNeedle ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Pausar Teste de Frequência</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Escutar Amostra Comparativa Agora</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Harmonic Spectrum Visualizer */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FFB800] font-semibold">{acousticProfile.label}</span>
                    <span className="text-[#F4F4F5] font-bold tabular-nums">
                      {acousticProfile.preservedViolaFrequenciesPct}% Harmônicos Preservados
                    </span>
                  </div>

                  {/* 12-Band Analog Harmonic Analyzer */}
                  <div className="grid grid-cols-12 gap-2 h-44 items-end p-4 rounded-xl bg-[#070709]/95 border border-[#FFB800]/20 shadow-inner">
                    {acousticProfile.bands.map((heightPct, idx) => {
                      const freqLabels = [
                        '40Hz',
                        '80Hz',
                        '160Hz',
                        '315Hz',
                        '630Hz',
                        '1.2k',
                        '2.5k',
                        '5k',
                        '8k',
                        '12k',
                        '16k',
                        '20k',
                      ];
                      return (
                        <div
                          key={freqLabels[idx]}
                          className="flex flex-col items-center justify-end h-full gap-2"
                        >
                          <div className="w-full h-32 bg-white/5 rounded-sm flex items-end overflow-hidden">
                            <div
                              style={{
                                height: `${heightPct}%`,
                                transition: 'height 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                              }}
                              className={`w-full rounded-t-sm ${
                                comparisonMode === 'vinyl'
                                  ? 'bg-gradient-to-t from-[#C84B00] via-[#FF6B00] to-[#FFD25A]'
                                  : 'bg-gradient-to-t from-zinc-800 to-red-600/80'
                              }`}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-[#E4E4E7]/65 tabular-nums">
                            {freqLabels[idx]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
                    <div className="p-3.5 rounded-lg bg-[#070709]/90 border border-[#FFB800]/20">
                      <span className="block text-[#E4E4E7]/55 text-[10px]">ALCANCE DINÂMICO</span>
                      <span className="text-base font-bold text-[#FFB800] tabular-nums">
                        {acousticProfile.dynamicRangeDb} dB
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#070709]/90 border border-[#FFB800]/20">
                      <span className="block text-[#E4E4E7]/55 text-[10px]">ESPECTRO HARMÔNICO</span>
                      <span className="text-xs font-semibold text-[#F4F4F5]">
                        {acousticProfile.harmonicRichness}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#070709]/90 border border-[#FFB800]/20">
                      <span className="block text-[#E4E4E7]/55 text-[10px]">PALCO SONORO</span>
                      <span className="text-xs font-semibold text-[#F4F4F5]">
                        {acousticProfile.stereoStage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dual Studio VU Meters */}
                <div className="lg:col-span-5 space-y-4">
                  <VUMeter
                    channelLabel="VIOLA CAIPIRA & HARMÔNICOS AGUDOS (CH 1)"
                    isActive={isPlayingNeedle}
                    mode={comparisonMode}
                  />
                  <VUMeter
                    channelLabel="ACORDEOM & GRAVES DE MADEIRA (CH 2)"
                    isActive={isPlayingNeedle}
                    mode={comparisonMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Featured Collector Boxes (Climate-Controlled Vault Background) */}
        <section
          id="colecoes"
          className="relative overflow-hidden py-20 lg:py-28 px-6 lg:px-12 border-b border-[#FFB800]/20"
        >
          {/* Section Background Image: Climate-Controlled Walnut Record Vault */}
          <img
            src="/src/assets/images/bg_ultrasonic_vinyl_vault_1794264341317.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.62) 50%, rgba(7,7,9,0.92) 100%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="font-mono text-xs text-[#FFB800] tracking-widest mb-2">
                  02. ACERVO CATALOGADO · PRENSAGENS ORIGINAIS DE ÉPOCA
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F5] leading-tight">
                  Três Caixas Históricas. Apenas Uma Matriz por Lote.
                </h2>
              </div>
              <div className="text-xs font-mono text-[#E4E4E7]/80">
                Clique em <span className="text-[#FFB800]">Abrir Gatefold</span> para inspecionar o
                encarte duplo e a numeração de matriz gravada no sulco.
              </div>
            </div>

            {/* 3-Column Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {COLLECTOR_BOXES.map((box, index) => {
                const isReserved = selectedBoxIds.includes(box.id);
                return (
                  <article
                    key={box.id}
                    className="group rounded-2xl border border-[#FFB800]/25 luxury-panel hover:border-[#FFB800]/65 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Top Engraved Lot Bar */}
                      <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#FFB800]/20 bg-[#070709]/80 text-[11px] font-mono">
                        <span className="text-[#FFB800] font-semibold">
                          LOTE 0{index + 1} · {box.catalogCode}
                        </span>
                        <span className="text-[#E4E4E7]/75">1 EXEMPLAR</span>
                      </div>

                      {/* 4:3 Product Image Slot */}
                      <div
                        onClick={() => setInspectedBox(box)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') setInspectedBox(box);
                        }}
                        className="relative aspect-4/3 w-full bg-[#18181B] overflow-hidden cursor-pointer border-b border-[#FFB800]/20"
                      >
                        <img
                          src={box.imagePath}
                          alt={box.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0D] via-black/30 to-transparent" />

                        {/* Single clean unboxed metadata line at bottom of image */}
                        <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-xs font-mono text-[#F4F4F5]">
                          <span>{box.era}</span>
                          <span className="text-[#FFB800] font-semibold">{box.conditionGrade}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-3">
                        {/* Unboxed Metadata with middot separator */}
                        <div className="flex items-center gap-2 text-xs font-mono text-[#FFB800]/80">
                          <span>{box.labelOrigin}</span>
                          <span aria-hidden="true">·</span>
                          <span>5 LPs Originais</span>
                        </div>

                        <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                          {box.title}
                        </h3>

                        <p className="text-sm font-semibold text-[#FFB800]">
                          Foco: {box.focusArtists}
                        </p>

                        <p className="text-sm text-[#E4E4E7]/85 leading-relaxed">
                          {box.highlightCopy}
                        </p>

                        <p className="text-xs text-[#E4E4E7]/65 pt-1">
                          {box.visualNote}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer with Tabular Price & Actions */}
                    <div className="p-6 pt-4 border-t border-[#FFB800]/20 bg-[#070709]/80 space-y-4">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="block text-[10px] font-mono text-[#E4E4E7]/60">
                            INVESTIMENTO DE CUSTÓDIA
                          </span>
                          <span className="font-mono text-2xl font-bold text-[#F4F4F5] tabular-nums">
                            {formatCurrencyBRL(box.priceBRL)}
                          </span>
                        </div>
                        <div className="text-right font-mono text-xs text-[#FFB800] tabular-nums">
                          12x {formatCurrencyBRL(box.priceBRL / 12)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setInspectedBox(box)}
                          className="px-3 py-2.5 rounded-lg border border-[#FFB800]/30 bg-[#0F0D0A] hover:border-[#FFB800] text-xs font-mono font-semibold text-[#F4F4F5] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#FFB800]" />
                          <span>Abrir Gatefold</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReserveBox(box.id)}
                          className={`px-3 py-2.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                            isReserved
                              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                              : 'luxury-cta text-[#070709]'
                          }`}
                        >
                          {isReserved ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Reservado</span>
                            </>
                          ) : (
                            <>
                              <Disc className="w-3.5 h-3.5" />
                              <span>Reservar Box</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Complete Collector Trilogy Vault Callout */}
            <div className="mt-12 rounded-2xl border border-[#FFB800]/45 luxury-panel p-7 sm:p-9 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="font-mono text-xs text-[#FFB800] tracking-wider">
                  ACERVO COMPLETO · OS 15 DISCOS HISTÓRICOS (1975–1991)
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
                  Deseja Arrematar a Trilogia Completa d&rsquo;O Sulco Sagrado?
                </h3>
                <p className="text-sm text-[#E4E4E7]/85 leading-relaxed">
                  Ao reservar as 3 caixas simultaneamente, você recebe{' '}
                  <strong className="text-[#FFB800]">12% de bonificação de colecionador</strong>{' '}
                  (economia imediata de R$ 736,00) e o Certificado Mestre #01/01 assinado pelo
                  curador-chefe.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSelectAllTrilogy}
                className="px-7 py-4 rounded-xl luxury-cta text-[#070709] font-mono text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                RESERVAR TRILOGIA COMPLETA (R$ 5.394,00)
              </button>
            </div>
          </div>
        </section>

        {/* 6. The 4-Stage Ultrasonic Hygiene & Preservation Standard (Vacuum Tube & Vinyl Backdrop) */}
        <section
          id="preservacao"
          className="relative overflow-hidden py-20 lg:py-28 px-6 lg:px-12 border-b border-[#FFB800]/20"
        >
          {/* Section Background Image */}
          <img
            src="/src/assets/images/box_sertao_madrugada_1794263355057.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.65) 50%, rgba(7,7,9,0.92) 100%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <div className="font-mono text-xs text-[#FFB800] tracking-widest mb-2">
                03. PROTOCOLO DE PRESERVAÇÃO · ENGENHARIA DE RESTAURO FONOGRÁFICO
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F5] leading-tight mb-4">
                Quatro Etapas de Descontaminação Antes de Entrar no Cofre.
              </h2>
              <p className="text-base text-[#E4E4E7]/85">
                Cada exemplar passa por 6 horas de tratamento laboratorial para que você receba um
                disco de 40 anos com o silêncio de fundo de uma laca recém-prensada.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Step Selector List */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                {PRESERVATION_STEPS.map((item, idx) => {
                  const isActive = activePreservationStep === idx;
                  return (
                    <button
                      key={item.stepNumber}
                      type="button"
                      onClick={() => setActivePreservationStep(idx)}
                      className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#FFB800] luxury-panel shadow-xl'
                          : 'border-[#FFB800]/20 bg-[#0B0A0E]/80 hover:border-[#FFB800]/45'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                        <span className="text-[#FFB800] font-semibold">
                          ETAPA {item.stepNumber}
                        </span>
                        <span className="text-[#E4E4E7]/75 tabular-nums">{item.metricValue}</span>
                      </div>
                      <div className="font-display text-lg font-bold text-[#F4F4F5]">
                        {item.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Technical Inspection Viewport */}
              <div className="lg:col-span-7 rounded-2xl border border-[#FFB800]/35 luxury-panel p-7 sm:p-10 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-[#FFB800]/20 font-mono text-xs text-[#FFB800]">
                    <span>
                      ETAPA {PRESERVATION_STEPS[activePreservationStep].stepNumber} DE 04 · LAUDO
                      LABORATORIAL
                    </span>
                    <span>APROVADO GOLDMINE NM/MINT</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
                    {PRESERVATION_STEPS[activePreservationStep].title}
                  </h3>

                  <p className="text-base text-[#E4E4E7]/90 leading-relaxed">
                    {PRESERVATION_STEPS[activePreservationStep].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 mt-8 border-t border-[#FFB800]/20 font-mono">
                  <div className="p-4 rounded-xl bg-[#070709]/90 border border-[#FFB800]/25">
                    <span className="block text-[10px] text-[#E4E4E7]/60">
                      {PRESERVATION_STEPS[activePreservationStep].metricLabel}
                    </span>
                    <span className="text-xl font-bold text-[#FFB800] tabular-nums mt-1 block">
                      {PRESERVATION_STEPS[activePreservationStep].metricValue}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#070709]/90 border border-[#FFB800]/25">
                    <span className="block text-[10px] text-[#E4E4E7]/60">
                      ESPECIFICAÇÃO DE BANCADA
                    </span>
                    <span className="text-xs font-semibold text-[#F4F4F5] mt-1.5 block">
                      {PRESERVATION_STEPS[activePreservationStep].technicalSpec}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. The Unboxing Experience (Editorial Macro Showcase with Atmospheric Backdrop) */}
        <section
          id="unboxing"
          className="relative overflow-hidden py-20 lg:py-28 px-6 lg:px-12 border-b border-[#FFB800]/20"
        >
          {/* Section Background Image */}
          <img
            src="/src/assets/images/unboxing_wood_case_1794263356041.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity scale-110 blur-[1px]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.68) 50%, rgba(7,7,9,0.92) 100%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <div className="font-mono text-xs text-[#FFB800] tracking-widest mb-2">
                04. A EXPERIÊNCIA DO UNBOXING · ARTEFATOS DE CUSTÓDIA
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F5] leading-tight mb-4">
                Madeira Nobre Envernizada à Mão, Lacre de Cera Quente e Luva de Veludo.
              </h2>
              <p className="text-base text-[#E4E4E7]/85">
                Abrir um cofre d&rsquo;O Sulco Sagrado é um ritual solene. Cada pedido é entregue em
                estojo de marcenaria artesanal projetado para atravessar gerações.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* 16:9 Macro Photography Showcase */}
              <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#FFB800]/35 bg-[#18181B] shadow-2xl">
                <img
                  src="/src/assets/images/unboxing_wood_case_1794263356041.jpg"
                  alt="Caixa de madeira envernizada artesanalmente com discos de vinil, certificado numerado com lacre de cera vermelha e luva de veludo preta"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/25 to-transparent" />

                {/* Interactive Inspection Tabs over Macro Shot */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveUnboxingHotspot('wood')}
                      className={`px-3.5 py-2 rounded-lg font-mono text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeUnboxingHotspot === 'wood'
                          ? 'bg-[#FFB800] text-[#070709]'
                          : 'bg-[#070709]/90 text-[#F4F4F5] border border-[#FFB800]/35 hover:border-[#FFB800]'
                      }`}
                    >
                      01. Estojo em Madeira Envernizada
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveUnboxingHotspot('wax')}
                      className={`px-3.5 py-2 rounded-lg font-mono text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeUnboxingHotspot === 'wax'
                          ? 'bg-[#FFB800] text-[#070709]'
                          : 'bg-[#070709]/90 text-[#F4F4F5] border border-[#FFB800]/35 hover:border-[#FFB800]'
                      }`}
                    >
                      02. Certificado &amp; Cera Quente
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveUnboxingHotspot('glove')}
                      className={`px-3.5 py-2 rounded-lg font-mono text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeUnboxingHotspot === 'glove'
                          ? 'bg-[#FFB800] text-[#070709]'
                          : 'bg-[#070709]/90 text-[#F4F4F5] border border-[#FFB800]/35 hover:border-[#FFB800]'
                      }`}
                    >
                      03. Luva de Veludo de Luthier
                    </button>
                  </div>
                </div>
              </div>

              {/* Detail Panel for Selected Artifact */}
              <div className="lg:col-span-4 rounded-2xl border border-[#FFB800]/30 luxury-panel p-7 flex flex-col justify-between">
                {activeUnboxingHotspot === 'wood' && (
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-[#FFB800]">
                      DETALHE MACRO 01 · MARCENARIA ACÚSTICA
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                      Caixa de Madeira Envernizada Artesanalmente
                    </h3>
                    <p className="text-sm text-[#E4E4E7]/85 leading-relaxed">
                      Construída em nogueira e imbuia seca em estufa, com dobradiças em latão
                      escovado e berço interno revestido em veludo antracite que mantém a umidade
                      relativa controlada em 45%.
                    </p>
                  </div>
                )}

                {activeUnboxingHotspot === 'wax' && (
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-[#FFB800]">
                      DETALHE MACRO 02 · CUSTÓDIA DOCUMENTADA
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                      Certificado de Procedência com Lacre em Cera Quente
                    </h3>
                    <p className="text-sm text-[#E4E4E7]/85 leading-relaxed">
                      Impresso em papel algodão 300g/m², numerado à mão com tinta ferrogálica e
                      selado individualmente com cera carmim. Documenta o código da matriz, o ano da
                      prensagem e o gráfico do teste auditivo.
                    </p>
                  </div>
                )}

                {activeUnboxingHotspot === 'glove' && (
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-[#FFB800]">
                      DETALHE MACRO 03 · MANUSEIO ZERO GORDURA
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                      Luva de Veludo Antiestático Inclusa
                    </h3>
                    <p className="text-sm text-[#E4E4E7]/85 leading-relaxed">
                      Para que o ácido natural das mãos nunca toque nos sulcos descontaminados no
                      banho ultrassônico, cada caixa inclui um par de luvas de veludo de luthier e
                      escova de fibra de carbono.
                    </p>
                  </div>
                )}

                <div className="pt-6 border-t border-[#FFB800]/20 space-y-3">
                  <div className="text-xs font-mono text-[#E4E4E7]/70">
                    Incluso sem custo adicional em todas as reservas deste lote.
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVaultOpen(true)}
                    className="w-full py-3.5 rounded-xl luxury-cta text-[#070709] font-mono text-xs font-bold transition-all cursor-pointer"
                  >
                    ABRIR MEU COFRE DE RESERVA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Authentic Collector & Musician Testimonials (Listening Room Background) */}
        <section className="relative overflow-hidden py-20 lg:py-28 px-6 lg:px-12 border-b border-[#FFB800]/20">
          <img
            src="/src/assets/images/bg_collector_listening_room_1794264341793.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.68) 50%, rgba(7,7,9,0.92) 100%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <div className="font-mono text-xs text-[#FFB800] tracking-widest mb-2">
                05. RELATOS DE CUSTÓDIA · COLECIONADORES E MÚSICOS
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F5] leading-tight">
                Quem Já Desceu a Agulha Nestas Matrizes.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {COLLECTOR_TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#FFB800]/25 luxury-panel p-7 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="text-xs font-mono text-[#FFB800]">
                      {item.verifiedCode}
                    </div>
                    <p className="text-sm sm:text-base text-[#F4F4F5]/95 leading-relaxed italic font-display">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#FFB800]/20 space-y-1">
                    <div className="font-display text-lg font-bold text-[#F4F4F5]">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#E4E4E7]/80">
                      {item.role} · {item.location}
                    </div>
                    <div className="text-[11px] font-mono text-[#FFB800] pt-1">
                      Setup: {item.equipment}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Ironclad Acoustic Satisfaction Guarantee + Surgical Collector FAQ */}
        <section
          id="garantia"
          className="relative overflow-hidden py-20 lg:py-28 px-6 lg:px-12 border-b border-[#FFB800]/20"
        >
          <img
            src="/src/assets/images/bg_ultrasonic_vinyl_vault_1794264341317.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.68) 50%, rgba(7,7,9,0.92) 100%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto space-y-20">
            {/* Guarantee Banner */}
            <div className="rounded-2xl border border-[#FFB800]/45 luxury-panel p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="font-mono text-xs text-[#FFB800] tracking-widest">
                    GARANTIA BLINDADA DE SATISFAÇÃO ACÚSTICA
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F5] leading-tight">
                    Selo &ldquo;Ouvido de Ouro ou 100% Reembolsado&rdquo; — 30 Dias de Audição.
                  </h2>
                  <p className="text-base text-[#E4E4E7]/85 leading-relaxed max-w-2xl">
                    Você tem 30 dias para ouvir os discos no seu equipamento. Se houver qualquer
                    ruído estrutural não documentado ou você não sentir a emoção esperada ao ouvir a
                    primeira faixa na sua sala, a devolução é gratuita com coleta segurada na sua
                    porta e reembolso integral imediato.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl border border-[#FFB800]/35 bg-[#070709]/95 text-center">
                  <Award className="w-12 h-12 text-[#FFB800] mb-3" />
                  <div className="font-display text-xl font-bold text-[#F4F4F5]">
                    30 Dias de Custódia em Casa
                  </div>
                  <div className="font-mono text-xs text-[#E4E4E7]/75 mt-1 mb-4">
                    Risco Zero · Coleta Reversa Gratuita
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVaultOpen(true)}
                    className="w-full py-3.5 rounded-lg luxury-cta text-[#070709] font-mono text-xs font-bold transition-all cursor-pointer"
                  >
                    GARANTIR MINHA MATRIZ AGORA
                  </button>
                </div>
              </div>
            </div>

            {/* Surgical Collector FAQ Accordion */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="font-mono text-xs text-[#FFB800] tracking-widest mb-2">
                  06. PERGUNTAS FREQUENTES · ESPECIFICAÇÕES DE COLECIONADOR
                </div>
                <h2 className="font-display text-3xl font-bold text-[#F4F4F5]">
                  FAQ Cirúrgico para Colecionadores Exigentes
                </h2>
              </div>

              <div className="space-y-3">
                {FAQ_ITEMS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-xl border border-[#FFB800]/25 luxury-panel overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                        aria-expanded={isOpen}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                      >
                        <span className="font-display text-lg font-semibold text-[#F4F4F5]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#FFB800] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 text-sm text-[#E4E4E7]/85 leading-relaxed border-t border-[#FFB800]/15">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Archival Record Label Technical Sheet Footer */}
      <footer className="bg-[#070709] py-16 px-6 lg:px-12 text-xs font-mono text-[#E4E4E7]/65">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#FFB800]/20">
            <div className="space-y-2">
              <div className="font-display text-xl font-bold text-[#F4F4F5]">
                O Sulco Sagrado
              </div>
              <p className="font-sans text-xs text-[#E4E4E7]/70 leading-relaxed">
                Instituto Privado de Curadoria e Restauro de Prensagens Originais da Música Sertaneja
                e Raiz Brasileira (Décadas de 1970, 1980 e 1990).
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-[#FFB800] font-semibold">FICHA TÉCNICA DE PRESERVAÇÃO</div>
              <div>Padrão de Avaliação: Goldmine Grading (NM / Mint)</div>
              <div>Descontaminação: Cavitação Ultrassônica 40 kHz</div>
              <div>Climatização do Cofre: 19°C · 45% Umidade Relativa</div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[#FFB800] font-semibold">CURADORIA &amp; ATENDIMENTO</div>
              <div>Curador-Chefe: Mestre Alcides Vasconcelos</div>
              <div>Laboratório Acústico: Pinheiros · São Paulo / SP</div>
              <div>Contato Direto: curadoria@osulcosagrado.com.br</div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[#FFB800] font-semibold">REGISTRO PATRIMONIAL SONORO</div>
              <div>Carimbo de Matriz: #BR-ANALOG-1975-1994</div>
              <div>Embalagem: Polionda Alveolar Japonesa (40kg)</div>
              <div>Garantia: 30 Dias Ouvido de Ouro</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E4E4E7]/50">
            <div>
              © 2026 O Sulco Sagrado · Todos os direitos reservados · Prensagens físicas originais de
              época adquiridas em acervo privado.
            </div>
            <div className="flex items-center gap-6">
              <a href="#colecoes" className="hover:text-[#FFB800] transition-colors">
                Acervo
              </a>
              <a href="#preservacao" className="hover:text-[#FFB800] transition-colors">
                Laudo Ultrassônico
              </a>
              <button
                type="button"
                onClick={() => setIsVaultOpen(true)}
                className="hover:text-[#FFB800] transition-colors cursor-pointer"
              >
                Abrir Cofre ({selectedBoxIds.length})
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Gatefold Double-Sleeve Inspection Modal */}
      <GatefoldPreview
        box={inspectedBox}
        onClose={() => setInspectedBox(null)}
        onReserve={handleReserveBox}
        isReserved={inspectedBox ? selectedBoxIds.includes(inspectedBox.id) : false}
        onPlaySample={() => handleToggleNeedlePlay('vinyl')}
      />

      {/* Collector's Vault Reservation & Certificate Checkout Drawer */}
      <VaultDrawer
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        selectedBoxIds={selectedBoxIds}
        onToggleBox={handleToggleBoxInVault}
        onSelectAllTrilogy={handleSelectAllTrilogy}
      />
    </div>
  );
}
