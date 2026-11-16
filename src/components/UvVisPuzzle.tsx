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
  Sun,
  SlidersHorizontal,
  Split,
  FlaskConical,
  Activity,
  Cpu,
  XCircle,
  Award,
  Layers,
  Eye,
  Lightbulb
} from 'lucide-react';

interface UvPuzzleSlot {
  index: number;
  title: string;
  expectedPartId: string;
  clueLabel: string;
  clue: string;
}

interface UvComponentItem {
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

const ALL_UVVIS_PUZZLE_PIECES: UvComponentItem[] = [
  {
    id: 'lamps',
    name: 'Lámparas Duales Deuterio (D₂) y Tungsteno',
    category: 'Fuentes',
    manufacturerRef: 'Shimadzu UV-1900i & Agilent Cary Xenon/D₂',
    description: 'Emite un continuo electromagnético continuo desde UV profundo (190 nm) hasta Visible/NIR (1100 nm) con conmutación a 340 nm.',
    imageSrc: IMAGES.uvvisLampsSource,
    icon: Sun,
  },
  {
    id: 'entrance_slit',
    name: 'Rendija Micrométrica y Espejo Colimador',
    category: 'Colimación',
    manufacturerRef: 'Óptica reflectiva SiO₂ Bruker & Shimadzu',
    description: 'Define el ancho espectral de banda (SBW) y convierte la luz divergente en rayos paralelos sin aberración cromática.',
    imageSrc: IMAGES.uvvisMonochromatorGrating,
    icon: SlidersHorizontal,
  },
  {
    id: 'monochromator',
    name: 'Monocromador Czerny-Turner Holográfico',
    category: 'Dispersión',
    manufacturerRef: 'Rejilla Lo-Ray-Ligh® Shimadzu & Agilent Cary',
    description: 'Descompone la luz blanca por difracción constructiva (nλ = d(sin α + sin β)) aislando una única longitud de onda pura.',
    imageSrc: IMAGES.uvvisMonochromatorGrating,
    icon: Sparkles,
  },
  {
    id: 'chopper',
    name: 'Divisor Óptico Rotatorio (Chopper Doble Haz)',
    category: 'Doble Haz',
    manufacturerRef: 'Arquitectura Double-Beam Shimadzu & Agilent',
    description: 'Alterna rápidamente el haz monocromático entre dos rutas ópticas idénticas: blanco de referencia (I₀) y muestra (I).',
    imageSrc: IMAGES.uvvisCutawayUltra3d,
    icon: Split,
  },
  {
    id: 'cuvettes',
    name: 'Compartimento y Cubetas de Cuarzo (1 cm)',
    category: 'Muestra',
    manufacturerRef: 'Celdas Suprasil® 10 mm & Multicelda Peltier',
    description: 'Contiene la solución en sílice fundida transparente hasta 190 nm donde ocurre la atenuación exponencial Beer-Lambert.',
    imageSrc: IMAGES.uvvisCuvetteCompartment,
    icon: FlaskConical,
  },
  {
    id: 'detector',
    name: 'Tubo Fotomultiplicador de Cascada (PMT)',
    category: 'Detección',
    manufacturerRef: 'Fotomultiplicador R928 Shimadzu & Agilent',
    description: 'Convierte los fotones emergentes en fotoelectrones y los amplifica mediante una cadena de dínodos al vacío.',
    imageSrc: IMAGES.uvvisDetectorPhotodiode,
    icon: Activity,
  },
  {
    id: 'datasystem',
    name: 'Consola Fotométrica y Espectro A(λ)',
    category: 'Datos',
    manufacturerRef: 'Agilent WinUV · Shimadzu LabSolutions · Bruker OPUS',
    description: 'Calcula el logaritmo -log₁₀(I/I₀), identifica picos λ_max y resuelve curvas de calibración de concentración.',
    imageSrc: IMAGES.uvvisCutawayUltra3d,
    icon: Cpu,
  },
  // Alternativa válida para detector
  {
    id: 'detector_pda',
    name: 'Arreglo Lineal de Fotodiodos (PDA)',
    category: 'Detección',
    manufacturerRef: 'Matriz de Silicio Termostatizada Bruker / Agilent',
    description: 'Alternativa de detección semiconductora simultánea de 1,024 canales capaz de capturar el espectro completo en milisegundos.',
    imageSrc: IMAGES.uvvisDetectorPhotodiode,
    icon: Layers,
  },
  // Distractor óptico (con insignia uniforme para no delatarlo)
  {
    id: 'uvvis_distractor_bulb',
    name: 'Bombilla Doméstica y Frasco de Vidrio Común',
    category: 'Fuentes',
    manufacturerRef: 'Iluminación y envase sódico-cálcico de 1 atm',
    description: 'Foco incandescente doméstico y botella de vidrio grueso ordinario transparente a simple vista.',
    imageSrc: IMAGES.uvvisDistractorGlassware,
    isDistractor: true,
    distractorReason: 'Una bombilla doméstica carece de emisión ultravioleta (<350 nm) y el vidrio común absorbe completamente la radiación UV debajo de 330 nm, bloqueando cualquier lectura UV.',
    icon: Sun,
  },
];

const UVVIS_PUZZLE_SLOTS: UvPuzzleSlot[] = [
  {
    index: 0,
    title: 'Ranura 1',
    expectedPartId: 'lamps',
    clueLabel: 'Pista 1',
    clue: 'Emite radiación continua tanto en el ultravioleta profundo (<340 nm) como en el espectro visible (>340 nm).',
  },
  {
    index: 1,
    title: 'Ranura 2',
    expectedPartId: 'entrance_slit',
    clueLabel: 'Pista 2',
    clue: 'Recorta el haz divergente de la lámpara fijando el ancho de banda espectral (SBW) y vuelve paralelos los rayos.',
  },
  {
    index: 2,
    title: 'Ranura 3',
    expectedPartId: 'monochromator',
    clueLabel: 'Pista 3',
    clue: 'Separa la luz blanca mediante surcos holográficos e interferencia constructiva para aislar un solo λ.',
  },
  {
    index: 3,
    title: 'Ranura 4',
    expectedPartId: 'chopper',
    clueLabel: 'Pista 4',
    clue: 'Alterna el haz monocromático decenas de veces por segundo entre la trayectoria del blanco (I₀) y la muestra (I).',
  },
  {
    index: 4,
    title: 'Ranura 5',
    expectedPartId: 'cuvettes',
    clueLabel: 'Pista 5',
    clue: 'Mantiene la solución en recipientes de sílice fundida transparentes al UV (b = 1 cm) para que ocurra A = ε·b·c.',
  },
  {
    index: 5,
    title: 'Ranura 6',
    expectedPartId: 'detector',
    clueLabel: 'Pista 6',
    clue: 'Transforma los fotones transmitidos en corriente eléctrica amplificada mediante efecto fotoeléctrico.',
  },
  {
    index: 6,
    title: 'Ranura 7 (Salida)',
    expectedPartId: 'datasystem',
    clueLabel: 'Pista 7 · Salida',
    clue: 'Calcula -log₁₀(I/I₀) para construir el espectro de Absorbancia frente a longitud de onda y cuantificar concentración.',
  },
];

interface UvVisPuzzleProps {
  onOpenSimulator: () => void;
}

export const UvVisPuzzle: React.FC<UvVisPuzzleProps> = ({ onOpenSimulator }) => {
  const [placedParts, setPlacedParts] = useState<{ [slotIndex: number]: string }>({});
  const [activeSelectedPiece, setActiveSelectedPiece] = useState<string | null>(null);
  const [previewModalPiece, setPreviewModalPiece] = useState<UvComponentItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    isCorrect: boolean;
    stars: number;
    errors: { slotIndex: number; title: string; message: string }[];
  } | null>(null);

  const [availablePieces, setAvailablePieces] = useState<UvComponentItem[]>(() => {
    return [...ALL_UVVIS_PUZZLE_PIECES].sort(() => Math.random() - 0.5);
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
    setAvailablePieces([...ALL_UVVIS_PUZZLE_PIECES].sort(() => Math.random() - 0.5));
  };

  const handleValidateAssembly = () => {
    const errors: { slotIndex: number; title: string; message: string }[] = [];
    let correctCount = 0;

    UVVIS_PUZZLE_SLOTS.forEach((slot) => {
      const placedId = placedParts[slot.index];
      if (!placedId) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: 'Ranura vacía: debes instalar un módulo óptico para esta etapa.',
        });
        return;
      }

      const item = ALL_UVVIS_PUZZLE_PIECES.find((p) => p.id === placedId);
      if (item?.isDistractor) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: item.distractorReason || 'Material no apto para espectrofotometría UV-Vis.',
        });
        return;
      }

      const isDetectorValid =
        slot.expectedPartId === 'detector' && (placedId === 'detector' || placedId === 'detector_pda');

      if (placedId === slot.expectedPartId || isDetectorValid) {
        correctCount++;
      } else {
        let reason = 'El orden de este componente rompe el tren óptico del espectrofotómetro.';
        if (slot.expectedPartId === 'lamps') {
          reason = '¡Falla de emisión! Sin las lámparas duales D₂/W al principio, no existe fuente de fotones UV ni Vis.';
        } else if (slot.expectedPartId === 'entrance_slit') {
          reason = '¡Falla de colimación! La luz de la lámpara debe pasar primero por la rendija SBW y colimarse antes de la rejilla.';
        } else if (slot.expectedPartId === 'monochromator') {
          reason = '¡Falla de dispersión! El monocromador debe aislar la longitud de onda antes de dividir el haz hacia las cubetas.';
        } else if (slot.expectedPartId === 'chopper') {
          reason = '¡Falla de doble haz! El chopper debe ubicarse justo antes del compartimento de cubetas para alternar entre I₀ e I.';
        } else if (slot.expectedPartId === 'cuvettes') {
          reason = '¡Falla de absorción! Las cubetas de cuarzo van después del chopper y antes del detector fotométrico.';
        } else if (slot.expectedPartId === 'detector') {
          reason = '¡Falla de detección! El fotomultiplicador (PMT) o arreglo de fotodiodos (PDA) debe capturar la luz que emerge de las cubetas.';
        } else if (slot.expectedPartId === 'datasystem') {
          reason = '¡Falla de lectura! La consola digital va al final para transformar las corrientes I₀ e I en el gráfico A(λ).';
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
            <span>Desafío de Ensamble Óptico UV-Vis</span>
            <span aria-hidden="true">·</span>
            <span>Piezas con Fotografía Industrial Agilent / Shimadzu / Bruker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Rompecabezas: Ensambla el Espectrofotómetro UV-Vis
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-2xl mt-1">
            Lee las pistas físicas de cada ranura del tren óptico y coloca los componentes reales en el orden correcto. Cuidado: hay una pieza no apta para laboratorio UV. Si logras el ensamble al 100%, recibirás 5 estrellas.
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
            BANCADA ÓPTICA DOBLE HAZ (7 RANURAS DE MONTAJE)
          </span>
          <span>
            {Object.keys(placedParts).length} de 7 Instalados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {UVVIS_PUZZLE_SLOTS.map((slot) => {
            const placedId = placedParts[slot.index];
            const placedItem = ALL_UVVIS_PUZZLE_PIECES.find((p) => p.id === placedId);
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
              Bandeja de Módulos Ópticos Disponibles (Con Fotografía Industrial)
            </h3>
            <p className="text-xs text-[#1C3947]/70">
              Selecciona una pieza y haz clic en la ranura correspondiente de la bancada óptica.
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
                  ¡Espectrofotómetro UV-Vis Operativo al 100%!
                </h3>
                <p className="text-sm text-[#1C3947]/80 leading-relaxed">
                  Has ensamblado la secuencia óptica exacta: Lámparas Duales D₂/W ➔ Rendija SBW y Colimador ➔ Monocromador Czerny-Turner ➔ Chopper de Doble Haz ➔ Cubetas de Cuarzo ➔ Detector Fotónico ➔ Espectro Beer-Lambert.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#7C957D] shadow-xl aspect-[16/9] bg-[#0C1A22]">
                <img
                  src={IMAGES.uvvisCutawayUltra3d}
                  alt="Espectrofotómetro UV-Vis Ensamble Completo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-left text-[#FAF7EE]">
                    <span className="text-xs font-mono text-[#EFC4BF] font-bold uppercase tracking-wider">
                      Bancada Óptica Certificada
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold">
                      Sistema UV-Vis Doble Haz Agilent · Shimadzu · Bruker
                    </h4>
                    <p className="text-xs text-[#FAF7EE]/80">
                      Calibrado para barridos de 190 a 900 nm y cuantificación lineal A = ε · b · c.
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
                      Distinción: Especialista en Espectrofotometría UV-Vis
                    </h4>
                    <p className="text-xs text-[#1C3947]">
                      Dominio de la Ley de Beer-Lambert, óptica Czerny-Turner y doble haz.
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
                    Revisión Óptica: Se detectaron fallas de alineación
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
                El haz óptico aún no puede medir absorbancia válida porque alguna etapa está fuera de secuencia o utiliza vidrio no transparente al UV. Revisa los detalles a continuación:
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
