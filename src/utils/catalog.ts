export interface TrackItem {
  side: 'Lado A' | 'Lado B';
  position: string;
  title: string;
  artist: string;
  year: number;
  duration: string;
  matrixCode: string;
}

export interface CollectorBox {
  id: string;
  slug: string;
  title: string;
  era: string;
  focusArtists: string;
  labelOrigin: string;
  conditionGrade: string;
  masterSpec: string;
  highlightCopy: string;
  visualNote: string;
  priceBRL: number;
  installments: number;
  availableCopies: number;
  totalLotCopies: number;
  imagePath: string;
  vinylColorLabel: 'ruby' | 'amber' | 'gold';
  catalogCode: string;
  gatefoldNotes: string;
  sonicProfile: {
    dynamicRangeDb: number;
    warmthIndex: number;
    pressingWeightGrams: number;
    speedRpm: string;
  };
  tracks: TrackItem[];
}

export interface ReservationOrderInput {
  fullName: string;
  email: string;
  documentCpf: string;
  postalCode: string;
  addressLine: string;
  cityState: string;
  selectedBoxIds: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export const COLLECTOR_BOXES: CollectorBox[] = [
  {
    id: 'box-vozes-cristal',
    slug: 'as-vozes-de-cristal',
    title: 'Box "As Vozes de Cristal"',
    era: '1982–1991',
    focusArtists: 'Chrystian & Ralf e Zezé Di Camargo & Luciano',
    labelOrigin: 'Chantecler · Continental · Copacabana',
    conditionGrade: 'Mint (M) / Lacrado de Época',
    masterSpec: 'Fita Master Analógica Original de 24 Canais (Studer A800)',
    highlightCopy:
      'As harmonias vocais mais agudas e perfeitas da história da música nacional em fita master analógica original de 24 canais.',
    visualNote:
      'Encarte gatefold aberto com fotos de arquivo de estúdio e estado de conservação Mint / Lacrado de Época.',
    priceBRL: 1890,
    installments: 12,
    availableCopies: 1,
    totalLotCopies: 1,
    imagePath: '/src/assets/images/box_vozes_cristal_1794263353458.jpg',
    vinylColorLabel: 'ruby',
    catalogCode: 'LP-CH-8604-MINT',
    gatefoldNotes:
      'Capturado nos estúdios Mosh e Gravodisc (São Paulo) entre 1982 e 1991. A separação binaural das terças vocais de Chrystian & Ralf e o ataque explosivo de "É o Amor" (1991) na primeira prensagem Continental preservam os harmônicos pares de 12kHz a 18kHz que qualquer arquivo digital ceifa.',
    sonicProfile: {
      dynamicRangeDb: 14.8,
      warmthIndex: 98,
      pressingWeightGrams: 180,
      speedRpm: '33 1/3 RPM',
    },
    tracks: [
      {
        side: 'Lado A',
        position: 'A1',
        title: 'Chora Peito (1ª Prensagem Chantecler)',
        artist: 'Chrystian & Ralf',
        year: 1986,
        duration: '03:42',
        matrixCode: 'CH-2.11.405.612-A',
      },
      {
        side: 'Lado A',
        position: 'A2',
        title: 'Nova York (Master Analógica 24 Canais)',
        artist: 'Chrystian & Ralf',
        year: 1989,
        duration: '03:58',
        matrixCode: 'CH-2.11.405.889-A',
      },
      {
        side: 'Lado B',
        position: 'B1',
        title: 'É o Amor (Matriz Continental 1ª Tiragem)',
        artist: 'Zezé Di Camargo & Luciano',
        year: 1991,
        duration: '03:24',
        matrixCode: 'CT-1.01.404.911-B',
      },
      {
        side: 'Lado B',
        position: 'B2',
        title: 'Saudade Bandida (Corte Direto em Laca)',
        artist: 'Zezé Di Camargo & Luciano',
        year: 1991,
        duration: '03:36',
        matrixCode: 'CT-1.01.404.912-B',
      },
    ],
  },
  {
    id: 'box-sertao-madrugada',
    slug: 'o-sertao-da-madrugada',
    title: 'Box "O Sertão da Madrugada"',
    era: '1975–1988',
    focusArtists: 'Trio Parada Dura e Milionário & José Rico',
    labelOrigin: 'Copacabana Discos · Chantecler',
    conditionGrade: 'Near Mint (NM) / Auditado Goldmine',
    masterSpec: 'Prensagens Originais da Gravadora Copacabana (São Bernardo do Campo)',
    highlightCopy:
      'Prensagens originais da gravadora Copacabana. O som cru do acordeom e o violão de nylon com graves quentes que o digital nunca conseguiu reproduzir.',
    visualNote:
      'Capas em cartão grosso texturizado de época com ringwear natural mínimo e selo central clássico.',
    priceBRL: 2190,
    installments: 12,
    availableCopies: 1,
    totalLotCopies: 1,
    imagePath: '/src/assets/images/box_sertao_madrugada_1794263355057.jpg',
    vinylColorLabel: 'amber',
    catalogCode: 'LP-CO-7812-NM',
    gatefoldNotes:
      'Prensado na histórica fábrica da Copacabana em São Bernardo do Campo. O pistom dramático da Estrada da Vida e o acordeom chorado de Mangabinha no Trio Parada Dura ressoam com corpo de madeira maciça, reverberação de câmara física e zero compressão de limiter.',
    sonicProfile: {
      dynamicRangeDb: 15.4,
      warmthIndex: 99,
      pressingWeightGrams: 175,
      speedRpm: '33 1/3 RPM',
    },
    tracks: [
      {
        side: 'Lado A',
        position: 'A1',
        title: 'As Andorinhas (Prensagem Original Copacabana)',
        artist: 'Trio Parada Dura',
        year: 1985,
        duration: '03:19',
        matrixCode: 'COELP-41982-A',
      },
      {
        side: 'Lado A',
        position: 'A2',
        title: 'Fuscão Preto (Matriz Original 1981)',
        artist: 'Trio Parada Dura',
        year: 1981,
        duration: '02:57',
        matrixCode: 'COELP-41520-A',
      },
      {
        side: 'Lado B',
        position: 'B1',
        title: 'Estrada da Vida (Selo Chantecler Rubi)',
        artist: 'Milionário & José Rico',
        year: 1977,
        duration: '03:38',
        matrixCode: 'CH-2.08.404.092-B',
      },
      {
        side: 'Lado B',
        position: 'B2',
        title: 'Boate Azul / Telefone Mudo (Medley de Época)',
        artist: 'Trio Parada Dura & Chitãozinho & Xororó',
        year: 1982,
        duration: '04:12',
        matrixCode: 'COELP-41710-B',
      },
    ],
  },
  {
    id: 'box-poeta-agreste',
    slug: 'o-poeta-do-agreste',
    title: 'Box "O Poeta do Agreste"',
    era: '1979–1985',
    focusArtists: 'Zé Ramalho (A Peleja do Diabo com o Dono do Céu, Avôhai original)',
    labelOrigin: 'Epic / CBS · Discos CBS (Rio de Janeiro)',
    conditionGrade: 'Near Mint (NM+) / Encarte Jornal Intacto',
    masterSpec: 'Corte Analógico Original CBS (Rio de Janeiro) com Encarte Xilogravura',
    highlightCopy:
      'Encarte ilustrado original em papel jornal texturizado de época, sem dobras ou marcas de umidade.',
    visualNote:
      'Inclui encarte original em papel jornal de 1979 preservado em atmosfera neutra sem oxidação.',
    priceBRL: 2050,
    installments: 12,
    availableCopies: 1,
    totalLotCopies: 1,
    imagePath: '/src/assets/images/box_poeta_agreste_1794263355645.jpg',
    vinylColorLabel: 'gold',
    catalogCode: 'LP-CBS-7902-NM',
    gatefoldNotes:
      'As violas de 12 cordas, zabumbas e pífanos gravados nos estúdios da CBS no Rio de Janeiro no final da década de 70. O grave telúrico da voz de Zé Ramalho em "Avôhai" e "Admirável Gado Novo" faz vibrar o assoalho com uma presença tridimensional assombrosa.',
    sonicProfile: {
      dynamicRangeDb: 15.1,
      warmthIndex: 97,
      pressingWeightGrams: 180,
      speedRpm: '33 1/3 RPM',
    },
    tracks: [
      {
        side: 'Lado A',
        position: 'A1',
        title: 'Avôhai (1ª Prensagem Epic/CBS)',
        artist: 'Zé Ramalho',
        year: 1978,
        duration: '04:58',
        matrixCode: 'CBS-144.229-A',
      },
      {
        side: 'Lado A',
        position: 'A2',
        title: 'Chão de Giz (Matriz Analógica Original)',
        artist: 'Zé Ramalho',
        year: 1978,
        duration: '04:45',
        matrixCode: 'CBS-144.229-A2',
      },
      {
        side: 'Lado B',
        position: 'B1',
        title: 'Admirável Gado Novo (A Peleja do Diabo...)',
        artist: 'Zé Ramalho',
        year: 1979,
        duration: '04:53',
        matrixCode: 'CBS-144.342-B1',
      },
      {
        side: 'Lado B',
        position: 'B2',
        title: 'Frevo Mulher (Corte em Laca 1979)',
        artist: 'Zé Ramalho',
        year: 1979,
        duration: '04:39',
        matrixCode: 'CBS-144.342-B2',
      },
    ],
  },
];

export const HISTORICAL_LABELS = [
  { name: 'RCA Victor', era: 'Fundada 1901 · Prensagens SP', code: 'MATRIZ RCA-BR' },
  { name: 'Chantecler', era: 'Fundada 1958 · Selo Rubi', code: 'DIVISÃO SERTANEJA' },
  { name: 'Continental', era: 'Fundada 1943 · Gravações Elétricas', code: 'SÉRIE OURO' },
  { name: 'PolyGram', era: 'Barra da Tijuca · Estúdio A', code: 'ALTA FIDELIDADE' },
  { name: 'Som Livre', era: 'Fundada 1969 · Fitas Master', code: 'ACERVO NACIONAL' },
  { name: 'Copacabana Discos', era: 'São Bernardo do Campo · 1948', code: 'PRENSAGEM PESADA' },
];

export const PRESERVATION_STEPS = [
  {
    stepNumber: '01',
    title: 'Auditoria Visual & Auditiva Faixa a Faixa',
    description:
      'Nenhuma faixa com pulo ou chiado além da assinatura natural do vinil. Cada sulco é inspecionado sob lupa óptica de 40x e ouvido integralmente em cápsula Moving Coil antes de receber o laudo Goldmine.',
    metricLabel: 'Tolerância de Pulo',
    metricValue: '0,0% (Zero Skip)',
    technicalSpec: 'Cápsula Ortofon MC · Escala Internacional Goldmine (NM / Mint)',
  },
  {
    stepNumber: '02',
    title: 'Banho Ultrassônico com Água Desmineralizada',
    description:
      'Remoção de 100% dos micro-resíduos acumulados nas últimas quatro décadas. Cavitação controlada a 40kHz que desaloja fungos e poeira microscópica do fundo do sulco sem contato mecânico.',
    metricLabel: 'Pureza Acústica Recuperada',
    metricValue: '+6,4 dB Relação Sinal/Ruído',
    technicalSpec: 'Frequência de Cavitação 40 kHz · Secagem Laminar a Frio',
  },
  {
    stepNumber: '03',
    title: 'Substituição de Luvas Internas',
    description:
      'Plástico interno antiestático japonês de 50 micras (evita atrito com o vinil). As luvas de papel ácido originais são catalogadas à parte, enquanto o disco repousa em polietileno de alta densidade Nagaoka.',
    metricLabel: 'Carga Eletrostática Residual',
    metricValue: '< 0,02 kV (Neutro)',
    technicalSpec: 'Polietileno Japonês 50μm · Fundo Arredondado Antiestático',
  },
  {
    stepNumber: '04',
    title: 'Capa Externa com Filtro UV de 100 Micras',
    description:
      'Protege a arte original contra desbotamento nas próximas gerações. Polipropileno cristal virgem com barreira ultravioleta que preserva as cores da litografia anos 70 e 80.',
    metricLabel: 'Bloqueio de Radiação UV',
    metricValue: '99,2% Proteção Óptica',
    technicalSpec: 'Polipropileno Cristal 100μm · Costura Lateral Termossoldada',
  },
];

export const COLLECTOR_TESTIMONIALS = [
  {
    id: 'renato-alencar',
    name: 'Dr. Renato Alencar',
    role: 'Cardiologista e colecionador há 26 anos',
    location: 'Jaú/SP',
    equipment: 'Toca-discos Marantz TT-15S1 · Amplificador Valvulado McIntosh MC275',
    boxAcquired: 'Box "O Sertão da Madrugada" (1975–1988)',
    quote:
      'Quando desci a agulha do meu Marantz na primeira faixa do Trio Parada Dura, tive que sentar na poltrona. Não era apenas uma música tocando; era o meu avô sentado na sala de estar em 1984, com o cheiro de fumo de corda e café coado. O grave do violão de nylon da prensagem original da Copacabana tem um peso físico no peito que nenhum serviço de streaming jamais chegou perto de reproduzir.',
    verifiedCode: 'Certificado #018/050 · Lote Copacabana 1981',
  },
  {
    id: 'mariana-fagundes',
    name: 'Mariana S. Fagundes',
    role: 'Produtora Musical e Engenheira de Masterização',
    location: 'Goiânia/GO',
    equipment: 'Technics SL-1200G · Monitores Genelec 8351B · Pré-Phono Neve',
    boxAcquired: 'Box "O Poeta do Agreste" (1979–1985)',
    quote:
      'Analisei a resposta harmônica da prensagem original da CBS de 1979 do Zé Ramalho no analisador de espectro do meu estúdio. A região entre 60Hz e 220Hz preserva toda a ressonância da madeira da viola de 12 cordas e a pele da zabumba sem o corte digital abrupto. O encarte em papel jornal veio intacto, sem uma única mancha de oxidação.',
    verifiedCode: 'Certificado #031/050 · Lote Epic/CBS 1979',
  },
  {
    id: 'sebastiao-ribeiro',
    name: "Sebastião 'Tião' Ribeiro",
    role: 'Músico e radialista aposentado (38 anos de AM/FM)',
    location: 'Curitiba/PR',
    equipment: 'Garrard 401 · Receiver Sansui 9090DB · Caixas JBL L100 Classic',
    boxAcquired: 'Box "As Vozes de Cristal" (1982–1991)',
    quote:
      'Trabalhei décadas em cabines de rádio abrindo discos novos da Chantecler e da Continental. Quando abri a caixa de madeira d’O Sulco Sagrado e coloquei Chrystian & Ralf na agulha, o silêncio de fundo entre as faixas me deixou arrepiado. O banho ultrassônico deixou o vinil de 1986 mais silencioso do que quando saía da fábrica. As duas vozes abrem na sala como um coral de cristal.',
    verifiedCode: 'Certificado #009/050 · Lote Chantecler 1986',
  },
];

export const FAQ_ITEMS = [
  {
    id: 'faq-transporte',
    question: 'Como vocês garantem que um disco raro de 40 anos não sofra danos no transporte?',
    answer:
      'Cada pedido é despachado em nossa Embalagem Blindada Anti-Impacto de padrão japonês: o disco de vinil é enviado fora da capa original (para evitar "seam split" ou rasgo na lombada pelo movimento do transporte), protegido por placas duplas de polionda alveolar e acondicionado dentro do estojo de madeira maciça envernizada, que por sua vez viaja em caixa rígida anti-esmagamento testada para suportar até 40kg de pressão lateral.',
  },
  {
    id: 'faq-prensagem-epoca',
    question: 'Qual a diferença técnica entre uma prensagem de época e um vinil moderno de 180g reeditado?',
    answer:
      '95% das reedições modernas em vinil são cortadas a partir de arquivos digitais (CD ou WAV de alta resolução) que já sofreram compressão dinâmica e filtragem. As prensagens de época (anos 70, 80 e 90) da Chantecler, Continental, RCA e CBS foram cortadas em torno mecânico diretamente das fitas magnéticas master analógicas de ¼ ou ½ polegada, usando composto de PVC virgem com chumbo estabilizante — garantindo uma curva harmônica contínua e tridimensional impossível de clonar.',
  },
  {
    id: 'faq-compatibilidade-agulhas',
    question: 'Essas prensagens antigas são compatíveis com toca-discos e agulhas modernas?',
    answer:
      'Perfeitamente. Todas as prensagens deste acervo são microssulco estéreo (33 1/3 RPM, padrão RIAA) e funcionam com excelência tanto em equipamentos vintage (Gradiente, Sansui, Marantz, Garrard, Pioneer) quanto em toca-discos modernos (Audio-Technica, Rega, Pro-Ject, Technics, JBL), seja com agulhas cônicas, elípticas, Shibata ou MicroLine.',
  },
  {
    id: 'faq-escala-goldmine',
    question: 'O que significa a classificação NM / Mint na Escala Internacional Goldmine?',
    answer:
      'A Escala Goldmine é o padrão mundial de avaliação numismática e fonográfica. Um exemplar classificado como Mint (M) ou Near Mint (NM) apresenta superfície lustrosa impecável, sem riscos audíveis, empenamentos ou desgaste de sulco ("groove wear"). Rejeitamos 94% dos discos que inspecionamos nos garimpos pelo Brasil; apenas os 6% que atingem o topo absoluto da escala entram no cofre.',
  },
  {
    id: 'faq-garantia-ouvido',
    question: 'Como funciona a Garantia "Ouvido de Ouro ou 100% Reembolsado"?',
    answer:
      'Você tem 30 dias corridos após o recebimento para ouvir os discos no seu próprio equipamento, no silêncio da sua sala. Se detectar qualquer ruído estrutural não documentado no laudo ou simplesmente sentir que a experiência emocional não superou suas expectativas, agendamos a coleta gratuita na sua porta e estornamos 100% do valor investido em até 24 horas úteis.',
  },
];

/**
 * Calculates total price, bundle discount (if all 3 boxes are reserved together),
 * and monthly installment value.
 */
export function calculateVaultSummary(selectedIds: string[], boxes: CollectorBox[] = COLLECTOR_BOXES) {
  const uniqueIds = Array.from(new Set(selectedIds));
  const selectedBoxes = boxes.filter((b) => uniqueIds.includes(b.id));
  const subtotalBRL = selectedBoxes.reduce((acc, item) => acc + item.priceBRL, 0);

  // Full trilogy vault discount: 12% collector privilege when reserving all 3 boxes
  const isCompleteTrilogy = selectedBoxes.length === 3;
  const discountBRL = isCompleteTrilogy ? Math.round(subtotalBRL * 0.12) : 0;
  const finalTotalBRL = subtotalBRL - discountBRL;
  const monthlyInstallmentBRL = finalTotalBRL > 0 ? Math.round((finalTotalBRL / 12) * 100) / 100 : 0;

  return {
    selectedBoxes,
    itemCount: selectedBoxes.length,
    totalDiscsCount: selectedBoxes.length * 5,
    subtotalBRL,
    discountBRL,
    finalTotalBRL,
    monthlyInstallmentBRL,
    isCompleteTrilogy,
  };
}

/**
 * Formats a number in Brazilian Real currency (R$ X.XXX,XX)
 */
export function formatCurrencyBRL(amount: number): string {
  const fixed = amount.toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${formattedInt},${decPart}`;
}

/**
 * Validates the collector reservation checkout form.
 */
export function validateReservationForm(input: ReservationOrderInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.selectedBoxIds || input.selectedBoxIds.length === 0) {
    errors.selectedBoxIds = 'Selecione ao menos um Box de Colecionador para reservar.';
  }

  const trimmedName = (input.fullName || '').trim();
  if (trimmedName.length < 5 || !trimmedName.includes(' ')) {
    errors.fullName = 'Informe seu nome e sobrenome completos para caligrafia no Certificado.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test((input.email || '').trim())) {
    errors.email = 'Informe um e-mail válido para envio do laudo acústico.';
  }

  const digitsCpf = (input.documentCpf || '').replace(/\D/g, '');
  if (digitsCpf.length !== 11) {
    errors.documentCpf = 'Informe um CPF válido (11 dígitos) para registro de propriedade da matriz.';
  }

  const digitsCep = (input.postalCode || '').replace(/\D/g, '');
  if (digitsCep.length !== 8) {
    errors.postalCode = 'Informe um CEP válido (8 dígitos) para cálculo do envio blindado.';
  }

  if ((input.addressLine || '').trim().length < 6) {
    errors.addressLine = 'Informe o endereço completo para entrega com seguro.';
  }

  if ((input.cityState || '').trim().length < 3) {
    errors.cityState = 'Informe sua Cidade e UF.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Computes acoustic preservation metrics comparing MP3 compressed stream vs Original Analog Vinyl
 */
export function getAcousticComparisonProfile(mode: 'vinyl' | 'mp3') {
  if (mode === 'vinyl') {
    return {
      mode: 'vinyl' as const,
      label: 'Matriz Analógica Original (Vinil 1986 · 33 1/3 RPM)',
      preservedViolaFrequenciesPct: 100,
      dynamicRangeDb: 15.2,
      harmonicRichness: 'Contínua (20Hz – 24kHz · Harmônicos Pares)',
      stereoStage: 'Profundidade Tridimensional Real (Sala de Estar)',
      bands: [92, 96, 98, 95, 94, 97, 93, 91, 89, 86, 84, 82],
    };
  }
  return {
    mode: 'mp3' as const,
    label: 'Streaming Comprimido (MP3 / AAC · Algoritmo Perceptual)',
    preservedViolaFrequenciesPct: 20,
    dynamicRangeDb: 5.4,
    harmonicRichness: 'Ceifada acima de 14kHz · Sem Ressonância de Madeira',
    stereoStage: 'Achatado (Compressão de Limiter Digital)',
    bands: [42, 48, 52, 45, 38, 30, 24, 19, 14, 11, 8, 5],
  };
}
