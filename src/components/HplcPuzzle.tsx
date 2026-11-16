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
  Droplets,
  Sliders,
  Gauge,
  GitCommitHorizontal,
  Layers,
  Activity,
  Cpu,
  XCircle,
  Award,
  Eye,
  Lightbulb
} from 'lucide-react';

interface HplcPuzzleSlot {
  index: number;
  title: string;
  expectedPartId: string;
  clueLabel: string;
  clue: string;
}

interface HplcComponentItem {
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

const ALL_HPLC_PUZZLE_PIECES: HplcComponentItem[] = [
  {
    id: 'mobile_phase',
    name: 'Reservorios de Fase Móvil y Desgasificador al Vacío',
    category: 'Fase Móvil',
    manufacturerRef: 'Teflon AF Shimadzu Nexera & Frascos Agilent LC',
    description: 'Suministra solventes filtrados (Agua / Acetonitrilo) y extrae gases disueltos por Ley de Henry para evitar cavitación.',
    imageSrc: IMAGES.hplcBinaryPumpDegasser,
    icon: Droplets,
  },
  {
    id: 'gradient_controller',
    name: 'Válvulas Proporcionadoras y Mezclador Microfluídico',
    category: 'Gradiente',
    manufacturerRef: 'Jet Weaver Agilent 1290 & Válvulas Shimadzu LC-40',
    description: 'Combina con precisión %A (acuoso) y %B (orgánico) en modo isocrático o gradiente sin deriva en línea base.',
    imageSrc: IMAGES.hplcBinaryPumpDegasser,
    icon: Sliders,
  },
  {
    id: 'pump',
    name: 'Bomba Binaria de Pistones de Zafiro (1,300 bar)',
    category: 'Bombeo',
    manufacturerRef: 'Infinity II Binary Pump & Bruker Elute Sapphire',
    description: 'Impulsa la fase móvil a caudal constante venciendo la alta resistencia hidráulica de partículas micrométricas.',
    imageSrc: IMAGES.hplcBinaryPumpDegasser,
    icon: Gauge,
  },
  {
    id: 'injector',
    name: 'Automuestreador y Válvula Rotatoria de 6 Vías',
    category: 'Inyección',
    manufacturerRef: 'Multisampler Agilent & SIL-40 Shimadzu',
    description: 'Inserta un tapón exacto de microlitros (1–20 µL) dentro del flujo presurizado sin detener la bomba ni abrir la línea.',
    imageSrc: IMAGES.hplcAutosamplerValve,
    icon: GitCommitHorizontal,
  },
  {
    id: 'column',
    name: 'Columna Analítica C18 Empacada en Horno Peltier',
    category: 'Separación',
    manufacturerRef: 'ZORBAX Eclipse C18 & Horno CTO-40 Termostatizado',
    description: 'Lecho de sílice sub-2 µm con cadenas octadecilo C18 que separa las moléculas según su hidrofobicidad y afinidad.',
    imageSrc: IMAGES.hplcC18ColumnOven,
    icon: Layers,
  },
  {
    id: 'detector',
    name: 'Detector UV-Vis DAD (Arreglo de Diodos) Celda Z',
    category: 'Detección',
    manufacturerRef: 'Max-Light Agilent / Matriz PDA SPD-M40 Shimadzu',
    description: 'Mide continuamente la absorbancia UV en una microcelda tubular de microlitros sin remezclar los picos separados.',
    imageSrc: IMAGES.hplcDadDetector,
    icon: Activity,
  },
  {
    id: 'datasystem',
    name: 'Estación Cromatográfica e Integración t_R vs mAU',
    category: 'Datos',
    manufacturerRef: 'OpenLab CDS · LabSolutions · Bruker HyStar',
    description: 'Adquiere la señal a 160 Hz, calcula tiempo de retención t_R, platos teóricos N, resolución R_s e integra áreas.',
    imageSrc: IMAGES.hplcCutawayUltra3d,
    icon: Cpu,
  },
  // Alternativa válida para separación en columna
  {
    id: 'column_coreshell',
    name: 'Columna C18 Core-Shell Termostatizada (2.6 µm)',
    category: 'Separación',
    manufacturerRef: 'Partículas de Núcleo Sólido UHPLC / HPLC',
    description: 'Alternativa de lecho empacado de núcleo sólido y corteza porosa que reduce el término C de Van Deemter a menor presión.',
    imageSrc: IMAGES.hplcC18ColumnOven,
    icon: Layers,
  },
  // Distractor hidráulico (mismo estilo e insignia uniforme para no delatarlo)
  {
    id: 'hplc_distractor_gravity_funnel',
    name: 'Columna de Vidrio por Gravedad y Pera de Goma',
    category: 'Bombeo',
    manufacturerRef: 'Vidriería clásica atmosférica de ~1 bar',
    description: 'Tubo ancho de borosilicato abierto superiormente donde el solvente cae únicamente por gravedad o presión manual.',
    imageSrc: IMAGES.hplcDistractorGravityFunnel,
    isDistractor: true,
    distractorReason: 'Una columna de vidrio por gravedad opera a ~1 bar y estallaría de inmediato; según la Ley de Darcy (ΔP ∝ 1/d_p²), las micropartículas C18 requieren cientos de bares de presión mecánica.',
    icon: Gauge,
  },
];

const HPLC_PUZZLE_SLOTS: HplcPuzzleSlot[] = [
  {
    index: 0,
    title: 'Ranura 1',
    expectedPartId: 'mobile_phase',
    clueLabel: 'Pista 1',
    clue: 'Almacena el agua y el acetonitrilo filtrados y extrae oxígeno disuelto al vacío por Ley de Henry para prevenir burbujas.',
  },
  {
    index: 1,
    title: 'Ranura 2',
    expectedPartId: 'gradient_controller',
    clueLabel: 'Pista 2',
    clue: 'Proporciona e integra exactamente las fracciones %A y %B en modo isocrático o de gradiente creciente.',
  },
  {
    index: 2,
    title: 'Ranura 3',
    expectedPartId: 'pump',
    clueLabel: 'Pista 3',
    clue: 'Genera flujo constante sin pulsaciones hasta 1,300 bar usando pistones cerámicos para vencer la contrapresión del lecho.',
  },
  {
    index: 3,
    title: 'Ranura 4',
    expectedPartId: 'injector',
    clueLabel: 'Pista 4',
    clue: 'Conmuta un bucle calibrado de 6 puertos entre LOAD e INJECT para introducir microlitros en el flujo de alta presión.',
  },
  {
    index: 4,
    title: 'Ranura 5',
    expectedPartId: 'column',
    clueLabel: 'Pista 5',
    clue: 'Mantiene temperatura constante mientras sus micropartículas octadecilo separan los analitos por retención diferencial.',
  },
  {
    index: 5,
    title: 'Ranura 6',
    expectedPartId: 'detector',
    clueLabel: 'Pista 6',
    clue: 'Registra la absorbancia UV continua del efluente dentro de una microcelda óptica en Z sin remezclar las bandas.',
  },
  {
    index: 6,
    title: 'Ranura 7 (Salida)',
    expectedPartId: 'datasystem',
    clueLabel: 'Pista 7 · Salida',
    clue: 'Traza la intensidad (mAU) frente al tiempo t_R, integra las áreas bajo cada pico y calcula R_s y platos teóricos N.',
  },
];

interface HplcPuzzleProps {
  onOpenSimulator: () => void;
}

export const HplcPuzzle: React.FC<HplcPuzzleProps> = ({ onOpenSimulator }) => {
  const [placedParts, setPlacedParts] = useState<{ [slotIndex: number]: string }>({});
  const [activeSelectedPiece, setActiveSelectedPiece] = useState<string | null>(null);
  const [previewModalPiece, setPreviewModalPiece] = useState<HplcComponentItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    isCorrect: boolean;
    stars: number;
    errors: { slotIndex: number; title: string; message: string }[];
  } | null>(null);

  const [availablePieces, setAvailablePieces] = useState<HplcComponentItem[]>(() => {
    return [...ALL_HPLC_PUZZLE_PIECES].sort(() => Math.random() - 0.5);
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
    setAvailablePieces([...ALL_HPLC_PUZZLE_PIECES].sort(() => Math.random() - 0.5));
  };

  const handleValidateAssembly = () => {
    const errors: { slotIndex: number; title: string; message: string }[] = [];
    let correctCount = 0;

    HPLC_PUZZLE_SLOTS.forEach((slot) => {
      const placedId = placedParts[slot.index];
      if (!placedId) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: 'Ranura vacía: debes conectar un módulo fluídico para cerrar el circuito hidráulico.',
        });
        return;
      }

      const item = ALL_HPLC_PUZZLE_PIECES.find((p) => p.id === placedId);
      if (item?.isDistractor) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: item.distractorReason || 'Componente incompatible con presiones UHPLC.',
        });
        return;
      }

      const isColumnValid =
        slot.expectedPartId === 'column' && (placedId === 'column' || placedId === 'column_coreshell');

      if (placedId === slot.expectedPartId || isColumnValid) {
        correctCount++;
      } else {
        let reason = 'El orden de este módulo interrumpe la línea de alta presión del cromatógrafo.';
        if (slot.expectedPartId === 'mobile_phase') {
          reason = '¡Falla de suministro! Los reservorios y el desgasificador al vacío deben ir al inicio antes de la mezcla.';
        } else if (slot.expectedPartId === 'gradient_controller') {
          reason = '¡Falla de gradiente! Las válvulas proporcionadoras deben dosificar %A/%B justo antes o dentro de la bomba.';
        } else if (slot.expectedPartId === 'pump') {
          reason = '¡Falla de bombeo! Sin la bomba de pistones de zafiro antes del inyector no hay presión para mover el líquido.';
        } else if (slot.expectedPartId === 'injector') {
          reason = '¡Falla de inyección! La válvula rotatoria de 6 vías debe introducir la muestra justo antes de entrar a la columna.';
        } else if (slot.expectedPartId === 'column') {
          reason = '¡Falla de separación! La columna C18 termostatizada va después del inyector y antes del detector óptico.';
        } else if (slot.expectedPartId === 'detector') {
          reason = '¡Falla de detección! El detector DAD de celda Z debe ubicarse inmediatamente a la salida de la columna C18.';
        } else if (slot.expectedPartId === 'datasystem') {
          reason = '¡Falla de adquisición! La estación cromatográfica recibe al final la señal del detector para trazar t_R vs mAU.';
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
            <span>Desafío de Ensamble Fluídico HPLC</span>
            <span aria-hidden="true">·</span>
            <span>Piezas con Fotografía Industrial Agilent / Shimadzu / Bruker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Rompecabezas: Ensambla el Cromatógrafo HPLC
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-2xl mt-1">
            Lee las pistas físicas e hidráulicas de cada ranura y conecta los 7 módulos en el orden exacto del flujo de alta presión. ¡Cuidado con el material no apto para presiones UHPLC!
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
            CIRCUITO HIDRÁULICO UHPLC (7 RANURAS EN SERIE)
          </span>
          <span>
            {Object.keys(placedParts).length} de 7 Instalados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {HPLC_PUZZLE_SLOTS.map((slot) => {
            const placedId = placedParts[slot.index];
            const placedItem = ALL_HPLC_PUZZLE_PIECES.find((p) => p.id === placedId);
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
                        <AlertCircle className="w-3 h-3" /> Falla Fluídica
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
              Bandeja de Módulos HPLC Disponibles (Con Fotografía Industrial)
            </h3>
            <p className="text-xs text-[#1C3947]/70">
              Selecciona un componente y haz clic en la ranura correspondiente de la línea cromatográfica.
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
                  ¡Sistema UHPLC Presurizado y Calibrado al 100%!
                </h3>
                <p className="text-sm text-[#1C3947]/80 leading-relaxed">
                  Has ensamblado la arquitectura cromatográfica exacta: Reservorios &amp; Vacío ➔ Mezclador de Gradiente ➔ Bomba de Zafiro ➔ Válvula de 6 Vías ➔ Columna C18 ➔ Detector DAD Celda Z ➔ Estación de Cromatograma.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#7C957D] shadow-xl aspect-[16/9] bg-[#0C1A22]">
                <img
                  src={IMAGES.hplcCutawayUltra3d}
                  alt="Sistema UHPLC Ensamble Completo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-left text-[#FAF7EE]">
                    <span className="text-xs font-mono text-[#EFC4BF] font-bold uppercase tracking-wider">
                      Línea Cromatográfica Certificada
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold">
                      Sistema UHPLC Agilent · Shimadzu · Bruker
                    </h4>
                    <p className="text-xs text-[#FAF7EE]/80">
                      Estanqueidad probada hasta 1,300 bar sin fugas y con resolución basal R_s &ge; 1.5.
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
                      Distinción: Ingeniero de Cromatografía Líquida HPLC
                    </h4>
                    <p className="text-xs text-[#1C3947]">
                      Dominio de la Ley de Darcy, Van Deemter, válvula 6 vías y detección DAD.
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
                    Diagnóstico Hidráulico: Se detectaron fallas de flujo o presión
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
                El sistema no puede presurizarse a cientos de bares ni separar analitos porque alguna etapa está fuera de secuencia o usa vidriería atmosférica. Revisa los detalles:
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
