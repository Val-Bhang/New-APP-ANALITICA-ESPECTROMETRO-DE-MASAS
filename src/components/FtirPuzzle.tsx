import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { IMAGES } from '../assets/images';
import {
  Puzzle,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Star,
  Sparkles,
  Flame,
  Focus,
  Split,
  Ruler,
  Gem,
  Activity,
  Cpu,
  XCircle,
  Award,
  Eye,
  Lightbulb
} from 'lucide-react';

interface FtirPuzzleSlot {
  index: number;
  title: string;
  expectedPartId: string;
  clueLabel: string;
  clue: string;
}

interface FtirComponentItem {
  id: string;
  name: string;
  category: string;
  manufacturerRef: string;
  description: string;
  imageSrc: string;
  isDistractor?: boolean;
  distractorReason?: string;
  icon: any;
}

const ALL_FTIR_PUZZLE_PIECES: FtirComponentItem[] = [
  {
    id: 'globar_source',
    name: 'Emisor Cerámico Globar de Carburo de Silicio (1,250 K)',
    category: 'Fuente IR',
    manufacturerRef: 'CenterGlow™ Bruker & Fuente SiC Shimadzu / Agilent',
    description: 'Varilla cerámica incandescente sin cristal envolvente que emite radiación IR continua entre 4,000 y 400 cm⁻¹.',
    imageSrc: IMAGES.ftirGlobarSource,
    icon: Flame,
  },
  {
    id: 'collimator_jstop',
    name: 'Espejo Colimador de Oro y Rueda de Apertura J-Stop',
    category: 'Colimación',
    manufacturerRef: 'Óptica Dorada Reflexiva Bruker / Shimadzu',
    description: 'Colima los rayos divergentes del Globar en un haz paralelo sin aberración cromática y regula la divergencia.',
    imageSrc: IMAGES.ftirGlobarSource,
    icon: Focus,
  },
  {
    id: 'beamsplitter_michelson',
    name: 'Interferómetro de Michelson y Divisor KBr / Germanio',
    category: 'Interferómetro',
    manufacturerRef: 'RockSolid™ Cube-Corner & Divisor KBr/Ge',
    description: 'Divide al 50% el haz IR hacia dos brazos perpendiculares y los recombina para codificar todas las frecuencias.',
    imageSrc: IMAGES.ftirMichelsonInterferometer,
    icon: Split,
  },
  {
    id: 'hene_moving_mirror',
    name: 'Espejo Móvil Retroreflector y Láser He-Ne (632.8 nm)',
    category: 'Metrología',
    manufacturerRef: 'Láser Estabilizado Connes & Flexión Sin Fricción',
    description: 'Varía la diferencia de camino óptico δ según la resolución deseada mientras el láser rojo dispara el muestreo.',
    imageSrc: IMAGES.ftirMichelsonInterferometer,
    icon: Ruler,
  },
  {
    id: 'sample_atr_kbr',
    name: 'Prensa Micrométrica y Cristal ATR de Diamante Monolítico',
    category: 'Muestreo',
    manufacturerRef: 'Platinum Diamond ATR Bruker / Cary 630 DialPath™',
    description: 'Genera una onda evanescente de 0.5–2 µm por reflexión interna total para medir sólidos y líquidos puros.',
    imageSrc: IMAGES.ftirAtrSampleChamber,
    icon: Gem,
  },
  {
    id: 'detector_dtgs',
    name: 'Detector Piroeléctrico DLATGS tras Ventana de KBr',
    category: 'Detección',
    manufacturerRef: 'Sensor DLATGS Termostatizado (SNR 60,000:1)',
    description: 'Transduce modulaciones térmicas rápidas del interferograma en señal eléctrica proporcional a dT/dt a temperatura ambiente.',
    imageSrc: IMAGES.ftirDtgsDetector,
    icon: Activity,
  },
  {
    id: 'fft_processor',
    name: 'Procesador DSP y Transformada Rápida de Fourier (FFT)',
    category: 'Procesamiento',
    manufacturerRef: 'Bruker OPUS · Shimadzu LabSolutions · Agilent MicroLab',
    description: 'Apodiza I(δ), calcula la integral de Fourier y divide entre el fondo para graficar %T o Abs de 4000 a 400 cm⁻¹.',
    imageSrc: IMAGES.ftirCutawayUltra3d,
    icon: Cpu,
  },
  // Alternativa válida para detección
  {
    id: 'detector_mct',
    name: 'Detector Cuántico MCT (HgCdTe) Enfriado a 77 K',
    category: 'Detección',
    manufacturerRef: 'Fotoconductor Criogénico de Alta Velocidad LN₂',
    description: 'Alternativa criogénica de detección infrarroja ultrarrápida para microespectroscopía FTIR y cinéticas de milisegundos.',
    imageSrc: IMAGES.ftirDtgsDetector,
    icon: Activity,
  },
  // Distractor óptico (mismo estilo e insignia uniforme para no delatarlo)
  {
    id: 'ftir_distractor_tungsten_glass',
    name: 'Bombilla de Vidrio Común y Lámina Sódico-Cálcica',
    category: 'Fuente IR',
    manufacturerRef: 'Iluminación Incandescente Visible / Vidrio Estándar',
    description: 'Filamento metálico encerrado en bulbo de vidrio sódico-cálcico de silicato junto con placas ópticas de vidrio común.',
    imageSrc: IMAGES.ftirDistractorTungstenGlass,
    isDistractor: true,
    distractorReason: 'El vidrio de sílice (SiO₂) absorbe completamente toda la radiación infrarroja media por debajo de 3,550 cm⁻¹; un espectrómetro FTIR jamás usa bombillas o ventanas de vidrio.',
    icon: Flame,
  },
];

const FTIR_PUZZLE_SLOTS: FtirPuzzleSlot[] = [
  {
    index: 0,
    title: 'Ranura 1',
    expectedPartId: 'globar_source',
    clueLabel: 'Pista 1',
    clue: 'Radia continuamente todo el infrarrojo medio (~1,250 K) al aire libre sin envoltura de vidrio que bloquee los fotones.',
  },
  {
    index: 1,
    title: 'Ranura 2',
    expectedPartId: 'collimator_jstop',
    clueLabel: 'Pista 2',
    clue: 'Espejo parabólico bañado en oro y diafragma circular que alinean el haz paralelo regulando su divergencia angular.',
  },
  {
    index: 2,
    title: 'Ranura 3',
    expectedPartId: 'beamsplitter_michelson',
    clueLabel: 'Pista 3',
    clue: 'Lámina de bromuro de potasio con germanio a 45° que separa al 50% y recombina ambos brazos ópticos.',
  },
  {
    index: 3,
    title: 'Ranura 4',
    expectedPartId: 'hene_moving_mirror',
    clueLabel: 'Pista 4',
    clue: 'Desplaza un retroreflector cúbico Δx mientras un haz rojo de 632.8 nm sincroniza cada cruce por cero de δ.',
  },
  {
    index: 4,
    title: 'Ranura 5',
    expectedPartId: 'sample_atr_kbr',
    clueLabel: 'Pista 5',
    clue: 'Alberga un cristal de alto índice (n=2.4) cuya onda evanescente penetra ~1–2 µm en el analito presionado encima.',
  },
  {
    index: 5,
    title: 'Ranura 6',
    expectedPartId: 'detector_dtgs',
    clueLabel: 'Pista 6',
    clue: 'Mide fluctuaciones térmicas moduladas (dT/dt) o fotocorriente IR tras atravesar la muestra para formar I(δ).',
  },
  {
    index: 6,
    title: 'Ranura 7 (Salida)',
    expectedPartId: 'fft_processor',
    clueLabel: 'Pista 7 · Salida',
    clue: 'Aplica apodización y convierte el interferograma I(δ) al espectro químico normalizado de 4000 a 400 cm⁻¹.',
  },
];

interface FtirPuzzleProps {
  onOpenSimulator: () => void;
}

export const FtirPuzzle: React.FC<FtirPuzzleProps> = ({ onOpenSimulator }) => {
  const [placedParts, setPlacedParts] = useState<{ [slotIndex: number]: string }>({});
  const [activeSelectedPiece, setActiveSelectedPiece] = useState<string | null>(null);
  const [previewModalPiece, setPreviewModalPiece] = useState<FtirComponentItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    isCorrect: boolean;
    stars: number;
    errors: { slotIndex: number; title: string; message: string }[];
  } | null>(null);

  const [availablePieces, setAvailablePieces] = useState<FtirComponentItem[]>(() => {
    return [...ALL_FTIR_PUZZLE_PIECES].sort(() => Math.random() - 0.5);
  });

  const handleSelectPiece = (pieceId: string) => {
    setActiveSelectedPiece(pieceId);
  };

  const handlePlaceInSlot = (slotIndex: number) => {
    if (!activeSelectedPiece) return;

    const updated = { ...placedParts };
    Object.keys(updated).forEach((key) => {
      if (updated[Number(key)] === activeSelectedPiece) {
        delete updated[Number(key)];
      }
    });

    updated[slotIndex] = activeSelectedPiece;
    setPlacedParts(updated);
    setActiveSelectedPiece(null);
    setValidationResult(null);
  };

  const handleRemoveFromSlot = (slotIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...placedParts };
    delete updated[slotIndex];
    setPlacedParts(updated);
    setValidationResult(null);
  };

  const handleResetPuzzle = () => {
    setPlacedParts({});
    setActiveSelectedPiece(null);
    setValidationResult(null);
    setAvailablePieces([...ALL_FTIR_PUZZLE_PIECES].sort(() => Math.random() - 0.5));
  };

  const handleValidateAssembly = () => {
    const errors: { slotIndex: number; title: string; message: string }[] = [];
    let correctCount = 0;

    FTIR_PUZZLE_SLOTS.forEach((slot) => {
      const placedId = placedParts[slot.index];
      if (!placedId) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: 'Ranura vacía: falta este componente óptico para cerrar el tren infrarrojo.',
        });
        return;
      }

      const item = ALL_FTIR_PUZZLE_PIECES.find((p) => p.id === placedId);
      if (item?.isDistractor) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: item.distractorReason || 'Material opaco al infrarrojo medio.',
        });
        return;
      }

      const isDetectorValid =
        slot.expectedPartId === 'detector_dtgs' &&
        (placedId === 'detector_dtgs' || placedId === 'detector_mct');

      if (placedId === slot.expectedPartId || isDetectorValid) {
        correctCount++;
      } else {
        let reason = 'El orden óptico de esta pieza impide modular o detectar correctamente el haz infrarrojo.';
        if (slot.expectedPartId === 'globar_source') {
          reason = '¡Falla en la fuente! El emisor cerámico Globar (SiC) debe iniciar el tren óptico.';
        } else if (slot.expectedPartId === 'collimator_jstop') {
          reason = '¡Falla de colimación! El espejo parabólico de oro y J-Stop deben alinear el haz antes del interferómetro.';
        } else if (slot.expectedPartId === 'beamsplitter_michelson') {
          reason = '¡Falla interferométrica! El divisor de KBr/Ge va justo después del colimador para dividir el haz en dos brazos.';
        } else if (slot.expectedPartId === 'hene_moving_mirror') {
          reason = '¡Falla metrológica! El espejo móvil y el láser He-Ne operan dentro del brazo móvil de Michelson antes de la muestra.';
        } else if (slot.expectedPartId === 'sample_atr_kbr') {
          reason = '¡Falla en la muestra! El cristal ATR de diamante recibe el haz ya modulado antes del detector.';
        } else if (slot.expectedPartId === 'detector_dtgs') {
          reason = '¡Falla de detección! El sensor piroeléctrico DLATGS o MCT recoge la energía tras la muestra para generar I(δ).';
        } else if (slot.expectedPartId === 'fft_processor') {
          reason = '¡Falla de decodificación! La Transformada de Fourier procesa al final la señal del detector.';
        }

        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: reason,
        });
      }
    });

    const isFullyCorrect = correctCount === 7;
    const stars = isFullyCorrect ? 5 : Math.max(1, Math.round((correctCount / 7) * 4));

    setValidationResult({
      tested: true,
      isCorrect: isFullyCorrect,
      stars,
      errors,
    });

    if (isFullyCorrect) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FAF7EE', '#EFC4BF', '#8E3742', '#7C957D', '#A9C2D2'],
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Desafío de Ensamble Interferométrico FTIR</span>
            <span aria-hidden="true">·</span>
            <span>Piezas con Fotografía Industrial Bruker / Shimadzu / Agilent</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Rompecabezas: Ensambla el Espectrómetro IR Medio (FTIR)
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-2xl mt-1">
            Lee las pistas físicas de cada ranura y conecta los 7 componentes ópticos en secuencia exacta. ¡Cuidado con los materiales de vidrio que bloquean el infrarrojo medio!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetPuzzle}
            className="px-3.5 py-1.5 text-xs font-medium text-[#122630] bg-[#FAF7EE] hover:bg-[#EFE8D3] border border-[#E2D7BB] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8E3742]" />
            Reiniciar Piezas
          </button>
          <button
            onClick={handleValidateAssembly}
            className="px-4 py-1.5 text-xs font-medium text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            Probar y Validar Ensamble
          </button>
        </div>
      </div>

      {/* Assembly Slots */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#8E3742] px-1">
          <span className="font-bold flex items-center gap-1.5">
            <Puzzle className="w-4 h-4" />
            TREN ÓPTICO REFLECTIVO FTIR (7 RANURAS EN SERIE)
          </span>
          <span>
            {Object.keys(placedParts).length} de 7 Instalados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {FTIR_PUZZLE_SLOTS.map((slot) => {
            const placedId = placedParts[slot.index];
            const placedItem = ALL_FTIR_PUZZLE_PIECES.find((p) => p.id === placedId);
            const isTargeted = activeSelectedPiece !== null;
            const hasError = validationResult?.errors.some((e) => e.slotIndex === slot.index);
            const isCorrect = validationResult?.isCorrect || (validationResult?.tested && !hasError);

            return (
              <div
                key={slot.index}
                onClick={() => handlePlaceInSlot(slot.index)}
                className={`min-h-[200px] rounded-2xl p-2.5 border-2 transition-all flex flex-col justify-between cursor-pointer relative group overflow-hidden ${
                  placedItem
                    ? isCorrect
                      ? 'bg-[#F2F6F2] border-[#7C957D] shadow-sm'
                      : hasError
                      ? 'bg-[#FBF0EF] border-[#8E3742] shadow-sm'
                      : 'bg-[#FAF7EE] border-[#8E3742] shadow-sm'
                    : isTargeted
                    ? 'border-dashed border-[#8E3742] bg-[#FAF7EE]/80 hover:bg-[#FAEEEE]'
                    : 'border-dashed border-[#E2D7BB] bg-[#FAF7EE]/40 hover:border-[#8E3742]'
                }`}
              >
                <div className="flex items-center justify-between pb-1 z-10">
                  <span className="text-[10px] font-mono text-[#8E3742] font-bold">
                    {slot.title}
                  </span>
                  {placedItem && (
                    <button
                      onClick={(e) => handleRemoveFromSlot(slot.index, e)}
                      className="text-[#8E3742] hover:text-[#571F26] p-0.5 rounded cursor-pointer bg-white/80"
                      title="Quitar pieza"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="my-auto py-1 z-10" title={slot.clue}>
                  {placedItem ? (
                    <div className="space-y-1.5 text-center">
                      <div className="relative w-full h-20 rounded-lg overflow-hidden border border-[#E2D7BB] shadow-inner bg-[#0C1A22]">
                        <img
                          src={placedItem.imageSrc}
                          alt={placedItem.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-[#122630] leading-tight line-clamp-1">
                        {placedItem.name}
                      </h4>
                      <p className="text-[10px] text-[#7C957D] font-mono leading-tight truncate">
                        {placedItem.manufacturerRef}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center space-y-1.5 text-[#1C3947]/75 py-2">
                      <div className="text-[11px] font-bold text-[#8E3742] flex items-center justify-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                        <span>{slot.clueLabel}</span>
                      </div>
                      <p className="text-[10.5px] leading-snug px-1 text-[#122630]/80">{slot.clue}</p>
                      {isTargeted && (
                        <div className="text-[9px] font-mono text-[#8E3742] animate-pulse font-bold mt-2">
                          Clic para colocar aquí
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {validationResult?.tested && placedItem && (
                  <div className="pt-1.5 border-t border-[#E2D7BB]/60 text-center z-10">
                    {hasError ? (
                      <span className="text-[10px] font-mono text-[#8E3742] font-bold flex items-center justify-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Falla Óptica
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#7C957D] font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Correcto
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Separate Hardware Pieces Tray */}
      <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-2">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E3742]">
              Bandeja de Módulos FTIR Disponibles (Con Fotografía Industrial)
            </h3>
            <p className="text-xs text-[#1C3947]/70">
              Selecciona una pieza y haz clic en la ranura correspondiente de la arquitectura infrarroja.
            </p>
          </div>
          {activeSelectedPiece && (
            <span className="text-xs font-mono text-[#8E3742] font-semibold bg-[#FAEEEE] px-2.5 py-1 rounded-md animate-pulse">
              ● Pieza activa seleccionada
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {availablePieces.map((piece) => {
            const isPlaced = Object.values(placedParts).includes(piece.id);
            const isSelected = activeSelectedPiece === piece.id;

            return (
              <div
                key={piece.id}
                onClick={() => {
                  if (isPlaced) return;
                  handleSelectPiece(piece.id);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 relative group overflow-hidden ${
                  isPlaced
                    ? 'opacity-40 bg-[#EFE8D3] border-[#E2D7BB] cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] shadow-md scale-[1.02]'
                    : 'bg-[#FFFDF9] hover:bg-[#F7F3E7] border-[#E2D7BB] text-[#122630]'
                }`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-black/15 bg-[#0C1A22] relative">
                  <img
                    src={piece.imageSrc}
                    alt={piece.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewModalPiece(piece);
                    }}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                    title="Ver imagen en grande"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold leading-tight truncate">{piece.name}</h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 bg-[#F2F6F2] text-[#7C957D]">
                      {piece.category}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#8E3742] font-mono truncate">
                    {piece.manufacturerRef}
                  </div>
                  <p className="text-[11px] leading-snug opacity-80 line-clamp-2">
                    {piece.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Validation Result Celebration / Diagnostics */}
      {validationResult?.tested && (
        <div
          className={`rounded-2xl p-6 border shadow-lg space-y-4 ${
            validationResult.isCorrect
              ? 'bg-[#FAF7EE] border-[#7C957D]'
              : 'bg-[#FAF7EE] border-[#8E3742]'
          }`}
        >
          {validationResult.isCorrect ? (
            <div className="space-y-6 text-center max-w-3xl mx-auto py-4">
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-9 h-9 fill-[#8E3742] text-[#8E3742] drop-shadow-md animate-bounce"
                    style={{ animationDelay: `${s * 100}ms` }}
                  />
                ))}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#7C957D] uppercase tracking-widest">
                  ¡CALIFICACIÓN PERFECTA DE 5 ESTRELLAS!
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#122630]">
                  ¡Espectrómetro FTIR Alineado con Precisión Láser He-Ne!
                </h3>
                <p className="text-sm text-[#1C3947]/80 leading-relaxed">
                  Has ensamblado la arquitectura FTIR exacta: Globar SiC ➔ Colimador &amp; J-Stop ➔ Divisor KBr/Ge ➔ Espejo Móvil &amp; Láser He-Ne ➔ Cristal ATR Diamante ➔ Detector Piroeléctrico ➔ Transformada FFT.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#7C957D] shadow-xl aspect-[16/9] bg-[#0C1A22]">
                <img
                  src={IMAGES.ftirCutawayUltra3d}
                  alt="Espectrómetro FTIR Ensamble Completo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-left text-[#FAF7EE]">
                    <span className="text-xs font-mono text-[#EFC4BF] font-bold uppercase tracking-wider">
                      Banco Óptico Certificado
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold">
                      Sistema FTIR Bruker · Shimadzu · Agilent
                    </h4>
                    <p className="text-xs text-[#FAF7EE]/80">
                      Calibración interferométrica estable desde 4,000 hasta 400 cm⁻¹ con relación señal-ruido óptima.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F2F6F2] rounded-xl border border-[#DFE8DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#7C957D] flex items-center justify-center text-[#FAF7EE] shrink-0 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#122630]">
                      Distinción: Ingeniero de Espectroscopía Infrarroja FTIR
                    </h4>
                    <p className="text-xs text-[#1C3947]">
                      Dominio del interferómetro de Michelson, Ventaja de Connes, ATR Diamante y FFT.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenSimulator}
                  className="px-5 py-2.5 bg-[#8E3742] hover:bg-[#742B34] text-[#FAF7EE] text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                >
                  Probar tu Equipo en el Simulador ➔
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#8E3742]" />
                  <h3 className="text-lg font-bold text-[#122630]">
                    Diagnóstico Óptico: Se detectaron errores en la trayectoria infrarroja
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[#8E3742]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= validationResult.stars
                          ? 'fill-[#8E3742] text-[#8E3742]'
                          : 'text-[#E2D7BB]'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-mono ml-1">
                    ({validationResult.stars}/5 estrellas)
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#1C3947] leading-relaxed">
                El haz infrarrojo no logra modularse o alcanzar el detector debido a piezas desordenadas o materiales que absorben la radiación IR media. Revisa los detalles:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {validationResult.errors.map((err, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAEEEE] rounded-xl border border-[#F3D4D6] space-y-1"
                  >
                    <span className="text-[11px] font-bold text-[#8E3742] font-mono">
                      {err.title}
                    </span>
                    <p className="text-xs text-[#122630] leading-snug">
                      {err.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setValidationResult(null)}
                  className="px-4 py-2 bg-[#122630] hover:bg-[#1C3947] text-[#FAF7EE] text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Ajustar Piezas y Reintentar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Piece Image Zoom Modal */}
      {previewModalPiece && (
        <div
          onClick={() => setPreviewModalPiece(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden border border-[#E2D7BB] bg-[#0C1A22]">
              <img
                src={previewModalPiece.imageSrc}
                alt={previewModalPiece.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#8E3742]">
                {previewModalPiece.manufacturerRef}
              </span>
              <h4 className="text-lg font-bold text-[#122630]">{previewModalPiece.name}</h4>
              <p className="text-xs text-[#1C3947] leading-relaxed">
                {previewModalPiece.description}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewModalPiece(null)}
                className="px-4 py-2 bg-[#122630] text-[#FAF7EE] text-xs font-medium rounded-lg cursor-pointer hover:bg-[#1C3947]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
