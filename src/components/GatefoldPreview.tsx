import React from 'react';
import { X, Disc, Check, Volume2 } from 'lucide-react';
import { CollectorBox, formatCurrencyBRL } from '../utils/catalog';

interface GatefoldPreviewProps {
  box: CollectorBox | null;
  onClose: () => void;
  onReserve: (boxId: string) => void;
  isReserved: boolean;
  onPlaySample: () => void;
}

export const GatefoldPreview: React.FC<GatefoldPreviewProps> = ({
  box,
  onClose,
  onReserve,
  isReserved,
  onPlaySample,
}) => {
  if (!box) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gatefold-modal-title"
    >
      <div className="relative w-full max-w-5xl rounded-2xl border border-[#FFB800]/30 bg-[#0F0F12] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden my-auto">
        {/* Top Archival Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08080A]">
          <div className="flex items-center gap-3 text-xs font-mono text-[#FFB800]">
            <span>INSPEÇÃO DE ENCARTE DUPLO (GATEFOLD)</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E4E4E7]/80">{box.catalogCode}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar inspeção do encarte"
            className="p-2 rounded-lg text-[#E4E4E7]/70 hover:text-[#F4F4F5] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Open Double-Sleeve Gatefold Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Wing of Gatefold: Archival Photography & Master Specs */}
          <div className="lg:col-span-6 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#13110E] flex flex-col justify-between">
            <div>
              <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-white/15 mb-6 ringwear-texture bg-[#18181B]">
                <img
                  src={box.imagePath}
                  alt={box.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-[#F4F4F5]">
                  <span>{box.era}</span>
                  <span className="text-[#FFB800]">{box.conditionGrade}</span>
                </div>
              </div>

              <div className="text-xs font-mono text-[#FF6B00] mb-1">
                {box.labelOrigin}
              </div>
              <h2
                id="gatefold-modal-title"
                className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5] mb-2"
              >
                {box.title}
              </h2>
              <p className="text-sm text-[#E4E4E7]/90 font-semibold mb-3">
                {box.focusArtists}
              </p>
              <p className="text-sm text-[#E4E4E7]/75 leading-relaxed mb-6">
                {box.gatefoldNotes}
              </p>
            </div>

            {/* Technical Master Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="block text-[#E4E4E7]/50 text-[10px]">FAIXA DINÂMICA</span>
                <span className="text-[#FFB800] font-semibold tabular-nums">
                  {box.sonicProfile.dynamicRangeDb} dB (DR15)
                </span>
              </div>
              <div>
                <span className="block text-[#E4E4E7]/50 text-[10px]">GRAMATURA</span>
                <span className="text-[#F4F4F5] font-semibold tabular-nums">
                  {box.sonicProfile.pressingWeightGrams}g Virgem
                </span>
              </div>
              <div>
                <span className="block text-[#E4E4E7]/50 text-[10px]">ROTAÇÃO</span>
                <span className="text-[#F4F4F5] font-semibold">
                  {box.sonicProfile.speedRpm}
                </span>
              </div>
              <div>
                <span className="block text-[#E4E4E7]/50 text-[10px]">CALOR HARMÔNICO</span>
                <span className="text-[#FF6B00] font-semibold tabular-nums">
                  {box.sonicProfile.warmthIndex}/100
                </span>
              </div>
            </div>
          </div>

          {/* Right Wing of Gatefold: Audited Tracklist & Matrix Numbers */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#0F0F12] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#F4F4F5]">
                    Faixas Auditadas &amp; Números de Matriz
                  </h3>
                  <p className="text-xs text-[#E4E4E7]/65">
                    Inspeção com lupa óptica de 40x e audição integral em cápsula Ortofon MC
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onPlaySample}
                  className="px-3 py-1.5 rounded-md border border-[#FFB800]/30 text-xs font-mono text-[#FFB800] hover:bg-[#FFB800]/10 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Ouvir Sulco</span>
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {box.tracks.map((track) => (
                  <div
                    key={track.matrixCode}
                    className="p-3 rounded-lg border border-white/10 bg-[#08080A]/70 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#FFB800]">
                        <span>{track.position}</span>
                        <span aria-hidden="true">·</span>
                        <span>{track.artist}</span>
                        <span aria-hidden="true">·</span>
                        <span>{track.year}</span>
                      </div>
                      <div className="text-sm font-semibold text-[#F4F4F5] mt-0.5">
                        {track.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#E4E4E7]/55 mt-0.5">
                        Matriz Gravada no Sulco: {track.matrixCode}
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs text-[#E4E4E7]/75 tabular-nums shrink-0">
                      {track.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contiguous Purchase Action Footer */}
            <div className="pt-5 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-[#E4E4E7]/70">
                    Exemplar único auditado · {box.availableCopies} de {box.totalLotCopies} em cofre
                  </div>
                  <div className="text-2xl font-mono font-bold text-[#F4F4F5] tabular-nums">
                    {formatCurrencyBRL(box.priceBRL)}
                  </div>
                  <div className="text-xs text-[#FFB800] font-mono tabular-nums">
                    ou 12x de {formatCurrencyBRL(box.priceBRL / 12)} sem juros
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onReserve(box.id);
                    onClose();
                  }}
                  className={`px-6 py-3.5 rounded-lg font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    isReserved
                      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                      : 'bg-[#FF6B00] text-[#08080A] hover:bg-[#FFB800]'
                  }`}
                >
                  {isReserved ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Já no Cofre · Abrir Reserva</span>
                    </>
                  ) : (
                    <>
                      <Disc className="w-4 h-4" />
                      <span>Reservar Este Box de Época</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
