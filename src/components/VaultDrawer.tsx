import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, CheckCircle2, Sparkles, Plus } from 'lucide-react';
import {
  COLLECTOR_BOXES,
  calculateVaultSummary,
  formatCurrencyBRL,
  validateReservationForm,
} from '../utils/catalog';

interface VaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBoxIds: string[];
  onToggleBox: (boxId: string) => void;
  onSelectAllTrilogy: () => void;
}

export const VaultDrawer: React.FC<VaultDrawerProps> = ({
  isOpen,
  onClose,
  selectedBoxIds,
  onToggleBox,
  onSelectAllTrilogy,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [documentCpf, setDocumentCpf] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [cityState, setCityState] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedProtocol, setConfirmedProtocol] = useState<string | null>(null);

  if (!isOpen) return null;

  const summary = calculateVaultSummary(selectedBoxIds, COLLECTOR_BOXES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateReservationForm({
      fullName,
      email,
      documentCpf,
      postalCode,
      addressLine,
      cityState,
      selectedBoxIds,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const protocolNum = `SS-1986-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedProtocol(protocolNum);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vault-drawer-title"
    >
      <div className="relative w-full max-w-xl bg-[#0F0F12] border-l border-[#FFB800]/25 h-full flex flex-col justify-between overflow-y-auto shadow-2xl">
        {/* Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-[#08080A]/95 border-b border-white/10 backdrop-blur-md">
          <div>
            <span className="block font-mono text-[11px] text-[#FFB800] tracking-wider">
              COFRE CLIMATIZADO · RESERVA DE MATRIZES
            </span>
            <h2 id="vault-drawer-title" className="font-display text-xl font-bold text-[#F4F4F5]">
              Seu Acervo Reservado ({summary.itemCount} {summary.itemCount === 1 ? 'Box' : 'Boxes'})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar cofre de reserva"
            className="p-2 rounded-lg text-[#E4E4E7]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 flex-1">
          {confirmedProtocol ? (
            <div className="rounded-xl border border-[#FFB800]/40 bg-[#14110D] p-6 space-y-5">
              <div className="flex items-center gap-3 text-[#FFB800]">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
                <div>
                  <div className="font-mono text-xs">PROTOCOLO DE RESERVA #{confirmedProtocol}</div>
                  <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                    Matriz Reservada em Seu Nome
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#E4E4E7]/85 leading-relaxed">
                O curador-chefe iniciou a caligrafia nominal do seu{' '}
                <strong className="text-[#F4F4F5]">Certificado de Procedência</strong> com lacre em
                cera quente para <strong className="text-[#FFB800]">{fullName}</strong>.
              </p>

              <div className="rounded-lg border border-white/10 bg-[#08080A] p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#E4E4E7]/60">TITULAR DO ACERVO:</span>
                  <span className="text-[#F4F4F5]">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E4E4E7]/60">DISCOS DE ÉPOCA INCLUSOS:</span>
                  <span className="text-[#FFB800]">{summary.totalDiscsCount} LPs Originais (NM/Mint)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E4E4E7]/60">DESTINO BLINDADO:</span>
                  <span className="text-[#F4F4F5]">{cityState} · CEP {postalCode}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold">
                  <span className="text-[#E4E4E7]">TOTAL REGISTRADO:</span>
                  <span className="text-[#FF6B00]">{formatCurrencyBRL(summary.finalTotalBRL)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedProtocol(null);
                  onClose();
                }}
                className="w-full py-3 rounded-lg bg-[#FFB800] text-[#08080A] font-mono text-xs font-bold hover:bg-[#FF6B00] transition-colors cursor-pointer"
              >
                Concluir e Voltar ao Acervo
              </button>
            </div>
          ) : (
            <>
              {/* Selected Boxes List */}
              <div className="space-y-3">
                {COLLECTOR_BOXES.map((box) => {
                  const isSelected = selectedBoxIds.includes(box.id);
                  return (
                    <div
                      key={box.id}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#FFB800]/50 bg-[#16130E]'
                          : 'border-white/10 bg-[#08080A]/60 opacity-75'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={box.imagePath}
                          alt={box.title}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-md object-cover border border-white/15 shrink-0"
                        />
                        <div>
                          <div className="text-xs font-mono text-[#FFB800]">
                            {box.era} · {box.catalogCode}
                          </div>
                          <div className="font-display font-bold text-sm text-[#F4F4F5]">
                            {box.title}
                          </div>
                          <div className="font-mono text-xs text-[#E4E4E7]/80 tabular-nums mt-0.5">
                            {formatCurrencyBRL(box.priceBRL)} · 5 LPs Originais
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleBox(box.id)}
                        aria-label={
                          isSelected ? `Remover ${box.title}` : `Adicionar ${box.title}`
                        }
                        className={`px-3 py-2 rounded-lg font-mono text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-white/10 text-[#F4F4F5] hover:bg-[#DC2626]/20 hover:text-[#DC2626]'
                            : 'bg-[#FF6B00] text-[#08080A] hover:bg-[#FFB800]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remover</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Incluir Box</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Complete Trilogy Privilege Banner */}
              {!summary.isCompleteTrilogy && (
                <div className="rounded-xl border border-[#FFB800]/30 bg-[#17120B] p-4 flex items-center justify-between gap-4">
                  <div className="text-xs text-[#E4E4E7]/90">
                    <span className="font-semibold text-[#FFB800] block mb-0.5">
                      Privilégio Trilogia Completa (15 LPs de Época)
                    </span>
                    Reserve as 3 coleções históricas juntas e receba <strong>12% de desconto de curadoria</strong> + Caixa Mestre em Imbuia.
                  </div>
                  <button
                    type="button"
                    onClick={onSelectAllTrilogy}
                    className="px-3.5 py-2 rounded-lg bg-[#FFB800] text-[#08080A] font-mono text-xs font-bold hover:bg-[#FF6B00] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Completar Trilogia
                  </button>
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="rounded-xl border border-white/10 bg-[#08080A] p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[#E4E4E7]/75">
                  <span>Subtotal ({summary.totalDiscsCount} Discos Originais NM/Mint)</span>
                  <span className="tabular-nums">{formatCurrencyBRL(summary.subtotalBRL)}</span>
                </div>
                {summary.discountBRL > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Bonificação Trilogia Completa (12%)</span>
                    <span className="tabular-nums">- {formatCurrencyBRL(summary.discountBRL)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#E4E4E7]/75">
                  <span>Embalagem Blindada Japonesa (40kg) + Seguro</span>
                  <span className="text-[#FFB800]">INCLUSO</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#F4F4F5]">Investimento Total</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#FF6B00] tabular-nums">
                      {formatCurrencyBRL(summary.finalTotalBRL)}
                    </div>
                    <div className="text-[11px] text-[#FFB800] tabular-nums">
                      ou 12x de {formatCurrencyBRL(summary.monthlyInstallmentBRL)} sem juros
                    </div>
                  </div>
                </div>
              </div>

              {/* Collector Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2" noValidate>
                <h3 className="font-display text-lg font-semibold text-[#F4F4F5]">
                  Dados para o Certificado Nominal &amp; Envio Blindado
                </h3>

                {errors.selectedBoxIds && (
                  <p className="text-xs font-mono text-[#DC2626]">{errors.selectedBoxIds}</p>
                )}

                <div>
                  <label
                    htmlFor="collector-name"
                    className="block text-xs font-mono text-[#E4E4E7]/80 mb-1"
                  >
                    Nome Completo (será caligrafado à mão no Certificado)
                  </label>
                  <input
                    id="collector-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Dr. Renato Alencar Silva"
                    className="w-full rounded-lg border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#F4F4F5] focus:border-[#FFB800] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-xs font-mono text-[#DC2626] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="collector-email"
                      className="block text-xs font-mono text-[#E4E4E7]/80 mb-1"
                    >
                      E-mail para Laudo Goldmine
                    </label>
                    <input
                      id="collector-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com.br"
                      className="w-full rounded-lg border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#F4F4F5] focus:border-[#FFB800] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-xs font-mono text-[#DC2626] mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="collector-cpf"
                      className="block text-xs font-mono text-[#E4E4E7]/80 mb-1"
                    >
                      CPF (Registro de Custódia)
                    </label>
                    <input
                      id="collector-cpf"
                      type="text"
                      value={documentCpf}
                      onChange={(e) => setDocumentCpf(e.target.value)}
                      placeholder="000.000.000-00"
                      className="w-full rounded-lg border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm font-mono text-[#F4F4F5] focus:border-[#FFB800] focus:outline-none"
                    />
                    {errors.documentCpf && (
                      <p className="text-xs font-mono text-[#DC2626] mt-1">{errors.documentCpf}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="collector-cep"
                      className="block text-xs font-mono text-[#E4E4E7]/80 mb-1"
                    >
                      CEP
                    </label>
                    <input
                      id="collector-cep"
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="01414-001"
                      className="w-full rounded-lg border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm font-mono text-[#F4F4F5] focus:border-[#FFB800] focus:outline-none"
                    />
                    {errors.postalCode && (
                      <p className="text-xs font-mono text-[#DC2626] mt-1">{errors.postalCode}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="collector-city"
                      className="block text-xs font-mono text-[#E4E4E7]/80 mb-1"
                    >
                      Cidade / UF
                    </label>
                    <input
                      id="collector-city"
                      type="text"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      placeholder="São Paulo / SP"
                      className="w-full rounded-lg border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#F4F4F5] focus:border-[#FFB800] focus:outline-none"
                    />
                    {errors.cityState && (
                      <p className="text-xs font-mono text-[#DC2626] mt-1">{errors.cityState}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="collector-address"
                    className="block text-xs font-mono text-[#E4E4E7]/80 mb-1"
                  >
                    Endereço Completo para Entrega Segurada
                  </label>
                  <input
                    id="collector-address"
                    type="text"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="Rua, Número, Complemento"
                    className="w-full rounded-lg border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#F4F4F5] focus:border-[#FFB800] focus:outline-none"
                  />
                  {errors.addressLine && (
                    <p className="text-xs font-mono text-[#DC2626] mt-1">{errors.addressLine}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#FF6B00] hover:bg-[#FFB800] text-[#08080A] font-mono text-xs sm:text-sm font-bold tracking-wide transition-all shadow-[0_10px_30px_rgba(255,107,0,0.3)] cursor-pointer"
                >
                  EMITIR CERTIFICADO &amp; FINALIZAR RESERVA DE ÉPOCA
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#E4E4E7]/65 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                  <span>Garantia Ouvido de Ouro: 30 dias para audição ou 100% reembolsado</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
