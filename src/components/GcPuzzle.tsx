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
  Wind,
  Gauge,
  Syringe,
  Thermometer,
  Disc,
  Flame,
  Activity,
  XCircle,
  Award,
  Eye,
  Lightbulb
} from 'lucide-react';

interface GcPuzzleSlot {
  index: number;
  title: string;
  expectedPartId: string;
  clueLabel: string;
  clue: string;
}

interface GcComponentItem {
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

const ALL_GC_PUZZLE_PIECES: GcComponentItem[] = [
  {
    id: 'carrier_gas',
    name: 'Cilindro de Helio / Hidrógeno UHP y Trampas O₂/H₂O',
    category: 'Gas Portador',
    manufacturerRef: 'Suministro Grado 6.0 & Filtros Agilent / Shimadzu',
    description: 'Provee fase móvil gaseosa inerte purificada libre de humedad y oxígeno para impedir oxidación térmica.',
    imageSrc: IMAGES.gcCarrierEpcSupply,
    icon: Wind,
  },
  {
    id: 'epc_control',
    name: 'Control Neumático Electrónico (EPC / AFC)',
    category: 'Neumática',
    manufacturerRef: 'EPC Agilent 8890 (±0.001 psi) & AFC Shimadzu',
    description: 'Eleva automáticamente la presión P_i mientras sube la temperatura del horno para compensar el alza de viscosidad del gas.',
    imageSrc: IMAGES.gcCarrierEpcSupply,
    icon: Gauge,
  },
  {
    id: 'inlet_injector',
    name: 'Puerto Inyector Split/Splitless con Liner de Borosilicato',
    category: 'Inyector',
    manufacturerRef: 'Inyector Ultra-Inerte 280 °C & Septum Silicona',
    description: 'Vaporiza instantáneamente microlitros líquidos y dosifica hacia la columna mediante división Split o transferencia Splitless.',
    imageSrc: IMAGES.gcSplitlessAutosamplerInlet,
    icon: Syringe,
  },
  {
    id: 'oven_ramp',
    name: 'Horno Térmico Programable de Convección Forzada',
    category: 'Horno Térmico',
    manufacturerRef: 'Horno de Doble Turbina hasta 450 °C (120 °C/min)',
    description: 'Ejecuta rampas de temperatura precisas (±0.1 °C) para modular la presión de vapor de compuestos volátiles y semivolátiles.',
    imageSrc: IMAGES.gcCapillaryColumnOven,
    icon: Thermometer,
  },
  {
    id: 'capillary_column',
    name: 'Columna Capilar WCOT de Sílice Fundida (30 m × 0.25 mm)',
    category: 'Separación',
    manufacturerRef: 'Columna J&W DB-5ms / DB-Wax con Poliimida Externa',
    description: 'Capilar abierto con película estacionaria interna (0.25 µm) que alcanza >120,000 platos teóricos según Golay.',
    imageSrc: IMAGES.gcCapillaryColumnOven,
    icon: Disc,
  },
  {
    id: 'detector_fid',
    name: 'Detector de Ionización de Llama (FID) con Boquilla de Cuarzo',
    category: 'Detección',
    manufacturerRef: 'Torre FID Llama H₂/Aire · Rango Lineal 10⁷',
    description: 'Quimio-ioniza enlaces C–H reducidos generando radicales CHO⁺ y electrones con sensibilidad sub-picogramo.',
    imageSrc: IMAGES.gcFidTcdDetector,
    icon: Flame,
  },
  {
    id: 'chromatogram_kovats',
    name: 'Estación Cromatográfica e Índices de Retención Kováts (RI)',
    category: 'Datos & RI',
    manufacturerRef: 'OpenLab CDS · LabSolutions GC · Bruker Compass',
    description: 'Digitaliza picos pA/mV a alta velocidad e interpola frente a n-alcanos para obtener constantes universales de Kováts.',
    imageSrc: IMAGES.gcCutawayUltra3d,
    icon: Activity,
  },
  // Alternativa válida para detección GC
  {
    id: 'detector_tcd',
    name: 'Detector de Conductividad Térmica (TCD / BID Universal)',
    category: 'Detección',
    manufacturerRef: 'Puente de Filamento Caliente & Plasma BID Shimadzu',
    description: 'Alternativa universal no destructiva que detecta incluso gases permanentes, H₂O, CO₂ y haluros perclorados como CCl₄.',
    imageSrc: IMAGES.gcFidTcdDetector,
    icon: Flame,
  },
  // Distractor hidráulico incompatible (apariencia uniforme para no delatarse)
  {
    id: 'gc_distractor_peristaltic_tubing',
    name: 'Manguera Peristáltica de PVC/Silicona y Empalmes Abiertos',
    category: 'Neumática',
    manufacturerRef: 'Tubería Polimérica Flexible de Transferencia Atmosférica',
    description: 'Conducto flexible transparente de alto diámetro interior con uniones plásticas en T sin sello de presión ni resistencia térmica.',
    imageSrc: IMAGES.gcDistractorPeristalticTubing,
    isDistractor: true,
    distractorReason: 'Las mangueras blandas de PVC/silicona se derriten dentro del horno GC a >150 °C, liberan plastificantes masivos y permiten entrada instantánea de oxígeno atmosférico que destruye las columnas capilares.',
    icon: Wind,
  },
];

const GC_PUZZLE_SLOTS: GcPuzzleSlot[] = [
  {
    index: 0,
    title: 'Ranura 1',
    expectedPartId: 'carrier_gas',
    clueLabel: 'Pista 1',
    clue: 'Aporta la fase móvil gaseosa inerte ultrapura (He, H₂ o N₂) filtrada mediante trampas para impedir oxidación a alta temperatura.',
  },
  {
    index: 1,
    title: 'Ranura 2',
    expectedPartId: 'epc_control',
    clueLabel: 'Pista 2',
    clue: 'Compensa con válvulas proporcionales el aumento de viscosidad del gas caliente para mantener velocidad lineal y presión constantes.',
  },
  {
    index: 2,
    title: 'Ranura 3',
    expectedPartId: 'inlet_injector',
    clueLabel: 'Pista 3',
    clue: 'Vaporiza al instante 1 µL líquido dentro de un tubo de vidrio desactivado a 280 °C y descarta el exceso o transfiere trazas.',
  },
  {
    index: 3,
    title: 'Ranura 4',
    expectedPartId: 'oven_ramp',
    clueLabel: 'Pista 4',
    clue: 'Cámara de convección con rampa programada que duplica la velocidad de salida cada ~30 °C según Clausius–Clapeyron.',
  },
  {
    index: 4,
    title: 'Ranura 5',
    expectedPartId: 'capillary_column',
    clueLabel: 'Pista 5',
    clue: 'Capilar abierto de 30 m recubierto de poliimida donde el término Eddy A = 0 logra más de 100,000 platos teóricos.',
  },
  {
    index: 5,
    title: 'Ranura 6',
    expectedPartId: 'detector_fid',
    clueLabel: 'Pista 6',
    clue: 'Convierte la salida gaseosa en corriente eléctrica medible, ya sea quimio-ionizando en llama H₂/aire o midiendo conductividad térmica.',
  },
  {
    index: 6,
    title: 'Ranura 7 (Salida)',
    expectedPartId: 'chromatogram_kovats',
    clueLabel: 'Pista 7 · Salida',
    clue: 'Muestrea a alta frecuencia (Hz), integra áreas de picos y calcula índices universales interpolando contra n-alcanos.',
  },
];

interface GcPuzzleProps {
  onOpenSimulator: () => void;
}

export const GcPuzzle: React.FC<GcPuzzleProps> = ({ onOpenSimulator }) => {
  const [placedParts, setPlacedParts] = useState<{ [slotIndex: number]: string }>({});
  const [activeSelectedPiece, setActiveSelectedPiece] = useState<string | null>(null);
  const [previewModalPiece, setPreviewModalPiece] = useState<GcComponentItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    isCorrect: boolean;
    stars: number;
    errors: { slotIndex: number; title: string; message: string }[];
  } | null>(null);

  const [availablePieces, setAvailablePieces] = useState<GcComponentItem[]>(() => {
    return [...ALL_GC_PUZZLE_PIECES].sort(() => Math.random() - 0.5);
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
    setAvailablePieces([...ALL_GC_PUZZLE_PIECES].sort(() => Math.random() - 0.5));
  };

  const handleValidateAssembly = () => {
    const errors: { slotIndex: number; title: string; message: string }[] = [];
    let correctCount = 0;

    GC_PUZZLE_SLOTS.forEach((slot) => {
      const placedId = placedParts[slot.index];
      if (!placedId) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: 'Ranura vacía: debes instalar este módulo neumático, térmico o detector.',
        });
        return;
      }

      const pieceObj = ALL_GC_PUZZLE_PIECES.find((p) => p.id === placedId);
      if (pieceObj?.isDistractor) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: `¡Fallo de Diseño GC! Instalaste "${pieceObj.name}". ${pieceObj.distractorReason}`,
        });
        return;
      }

      // Accept alternative universal TCD/BID detector in slot 5
      const isValidDetectorAlt =
        slot.expectedPartId === 'detector_fid' && placedId === 'detector_tcd';

      if (placedId === slot.expectedPartId || isValidDetectorAlt) {
        correctCount++;
      } else {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: `Componente en posición incorrecta: "${pieceObj?.name}" no cumple la función indicada por esta pista.`,
        });
      }
    });

    const isAllGood = errors.length === 0 && correctCount === 7;
    const stars = Math.max(0, Math.min(5, Math.round((correctCount / 7) * 5)));

    setValidationResult({
      tested: true,
      isCorrect: isAllGood,
      stars,
      errors,
    });

    if (isAllGood) {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8E3742', '#7C957D', '#EFC4BF', '#A9C2D2'],
      });
    }
  };

  const placedPieceIds = Object.values(placedParts);
  const completedCount = placedPieceIds.length;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Desafío de Ensamble GC</span>
            <span aria-hidden="true">·</span>
            <span>Deducción por Pistas Neumáticas &amp; Térmicas</span>
            <span aria-hidden="true">·</span>
            <span>¡Cuidado con 1 componente incompatible!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Rompecabezas Visual del Cromatógrafo de Gases (GC)
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-2xl mt-1">
            Lee la pista física de cada ranura de izquierda a derecha, inspecciona las fotografías reales en el banco y ensambla el tren cromatográfico desde el gas portador hasta los Índices de Kováts.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleResetPuzzle}
            className="px-3.5 py-2 text-xs font-medium text-[#122630] bg-[#FAF7EE] hover:bg-[#EFE8D3] border border-[#E2D7BB] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8E3742]" />
            Reiniciar Ensamble
          </button>

          <button
            onClick={handleValidateAssembly}
            className="px-5 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            Encender Horno y Verificar ({completedCount}/7)
          </button>
        </div>
      </div>

      {/* Instructions Banner */}
      <div className="bg-[#122630] text-[#FAF7EE] rounded-2xl p-4 border border-[#1C3947] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8E3742] flex items-center justify-center text-[#FAF7EE] shrink-0">
            <Puzzle className="w-5 h-5" />
          </div>
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-[#EFC4BF]">
              Reto sin spoilers: Solo verás pistas neumáticas y térmicas en las ranuras
            </p>
            <p className="text-[#A9C2D2]">
              Selecciona una pieza real del banco lateral (puedes ampliarla con el icono <Eye className="w-3.5 h-3.5 inline mx-0.5 text-[#EFC4BF]" />) y haz clic en la ranura cuya pista corresponda.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono bg-[#0C1A22] px-3 py-1.5 rounded-lg border border-[#1C3947] shrink-0 text-[#7C957D]">
          {activeSelectedPiece ? (
            <span className="text-[#EFC4BF] font-bold animate-pulse">
              ✓ Seleccionado: {ALL_GC_PUZZLE_PIECES.find((p) => p.id === activeSelectedPiece)?.name}
            </span>
          ) : (
            <span>Elige una pieza real del panel derecho</span>
          )}
        </div>
      </div>

      {/* Main Assembly Board and Pieces Tray */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Top: 7 Assembly Slots (Clue-Only Labels) */}
        <div className="lg:col-span-8 bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-5 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1C3947] pb-3 text-xs font-mono text-[#A9C2D2]">
            <span className="font-bold text-[#FAF7EE]">
              TABLERO DE ENSAMBLE GC CAPILAR (SECUENCIA POR PISTAS)
            </span>
            <span className="text-[#7C957D]">Flujo: Cilindro Gas ➔ Capilar ➔ Kováts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GC_PUZZLE_SLOTS.map((slot) => {
              const placedId = placedParts[slot.index];
              const placedObj = ALL_GC_PUZZLE_PIECES.find((p) => p.id === placedId);
              const slotError = validationResult?.errors.find((e) => e.slotIndex === slot.index);
              const isSlotValid =
                validationResult?.tested &&
                !slotError &&
                placedId &&
                !placedObj?.isDistractor;

              return (
                <div
                  key={slot.index}
                  onClick={() => handlePlaceInSlot(slot.index)}
                  className={`relative p-3 rounded-xl border-2 transition-all min-h-[195px] flex flex-col justify-between cursor-pointer overflow-hidden ${
                    activeSelectedPiece && !placedId
                      ? 'border-dashed border-[#EFC4BF] bg-[#1C3947]/60 hover:bg-[#1C3947]'
                      : placedId
                      ? isSlotValid
                        ? 'border-[#7C957D] bg-[#122630]'
                        : slotError
                        ? 'border-[#8E3742] bg-[#361116]/60'
                        : 'border-[#A9C2D2] bg-[#122630]'
                      : 'border-dashed border-[#1C3947] bg-[#081218] hover:border-[#A9C2D2]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono z-10">
                    <span className="font-bold text-[#EFC4BF] bg-[#0C1A22] px-2 py-0.5 rounded border border-[#1C3947] flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-[#7C957D]" />
                      {slot.clueLabel}
                    </span>
                    {placedId && (
                      <button
                        onClick={(e) => handleRemoveFromSlot(slot.index, e)}
                        className="text-[#A9C2D2] hover:text-[#EFC4BF] p-0.5 cursor-pointer bg-[#0C1A22] rounded-full"
                        title="Retirar pieza"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {placedObj ? (
                    <div className="my-2 space-y-1.5 z-10">
                      <div className="w-full h-24 rounded-lg overflow-hidden border border-[#1C3947] bg-[#071116] relative">
                        <img
                          src={placedObj.imageSrc}
                          alt={placedObj.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-1 left-2 text-[9px] font-mono text-[#EFC4BF] font-bold">
                          {placedObj.category}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#FAF7EE] leading-tight">
                        {placedObj.name}
                      </div>
                      <div className="text-[10px] text-[#A9C2D2] leading-tight line-clamp-2">
                        {placedObj.manufacturerRef}
                      </div>
                    </div>
                  ) : (
                    <div className="my-auto py-3 px-2 text-center space-y-2 z-10">
                      <p className="text-[11px] text-[#FAF7EE]/90 font-medium leading-relaxed">
                        {slot.clue}
                      </p>
                      <div className="text-[10px] font-mono text-[#7C957D] pt-1">
                        {activeSelectedPiece ? '▶ Clic para instalar aquí' : 'Lee la pista y coloca la imagen'}
                      </div>
                    </div>
                  )}

                  {validationResult?.tested && (
                    <div className="pt-1 border-t border-[#1C3947]/80 flex items-center gap-1 text-[10px] font-mono z-10">
                      {isSlotValid ? (
                        <span className="text-[#7C957D] flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Posición Exacta
                        </span>
                      ) : slotError ? (
                        <span className="text-[#EFC4BF] flex items-center gap-1 font-bold">
                          <AlertCircle className="w-3.5 h-3.5 text-[#8E3742]" /> Error de Etapa
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Validation Results */}
          {validationResult?.tested && (
            <div
              className={`p-4 rounded-xl border space-y-3 ${
                validationResult.isCorrect
                  ? 'bg-[#7C957D]/20 border-[#7C957D] text-[#FAF7EE]'
                  : 'bg-[#8E3742]/20 border-[#8E3742] text-[#FAF7EE]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Award
                    className={`w-8 h-8 ${
                      validationResult.isCorrect ? 'text-[#7C957D]' : 'text-[#EFC4BF]'
                    }`}
                  />
                  <div>
                    <h4 className="font-bold text-base">
                      {validationResult.isCorrect
                        ? '¡Cromatógrafo de Gases Capilar Ensamblado y Calibrado!'
                        : 'Fuga Neumática o Error en Secuencia GC'}
                    </h4>
                    <p className="text-xs text-[#A9C2D2]">
                      {validationResult.isCorrect
                        ? 'Tu tren neumático y térmico separa mezclas volátiles con más de 100,000 platos teóricos.'
                        : `Se detectaron ${validationResult.errors.length} problemas en la arquitectura. Revisa las pistas abajo.`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${
                        s <= validationResult.stars
                          ? 'text-[#EFC4BF] fill-[#EFC4BF]'
                          : 'text-[#1C3947]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {validationResult.errors.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                  {validationResult.errors.map((err, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-[#0C1A22]/80 p-2 rounded-lg text-[#EFC4BF]"
                    >
                      <AlertCircle className="w-4 h-4 text-[#8E3742] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#FAF7EE]">{err.title}: </strong>
                        <span>{err.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {validationResult.isCorrect && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onOpenSimulator}
                    className="px-4 py-2 bg-[#7C957D] hover:bg-[#6A826B] text-[#FAF7EE] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Inyectar en Simulador GC Ahora
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Separate Tray of Visual Component Cards */}
        <div className="lg:col-span-4 bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-md">
          <div className="border-b border-[#E2D7BB] pb-3">
            <h3 className="text-sm font-bold text-[#122630]">
              Banco de Piezas Reales GC ({availablePieces.length} opciones)
            </h3>
            <p className="text-xs text-[#1C3947]/70 mt-0.5">
              Todas incluyen fotografía real. Una pieza es incompatible con las temperaturas y gases de GC: descártala.
            </p>
          </div>

          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {availablePieces.map((piece) => {
              const isPlaced = placedPieceIds.includes(piece.id);
              const isSelected = activeSelectedPiece === piece.id;
              const IconComp = piece.icon;

              return (
                <div
                  key={piece.id}
                  onClick={() => !isPlaced && handleSelectPiece(piece.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isPlaced
                      ? 'bg-[#EFE8D3]/50 border-[#E2D7BB] opacity-45 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#122630] border-[#8E3742] text-[#FAF7EE] shadow-md ring-2 ring-[#8E3742]/40 cursor-pointer'
                      : 'bg-[#FFFDF9] border-[#E2D7BB] hover:border-[#8E3742] text-[#122630] cursor-pointer'
                  }`}
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 border border-[#E2D7BB] bg-[#0C1A22] relative group">
                    <img
                      src={piece.imageSrc}
                      alt={piece.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewModalPiece(piece);
                      }}
                      title="Ampliar fotografía"
                      className="absolute bottom-1 right-1 p-1 bg-[#122630]/85 hover:bg-[#8E3742] text-[#FAF7EE] rounded-md opacity-90 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase flex items-center gap-1 ${
                          isSelected ? 'text-[#EFC4BF]' : 'text-[#8E3742]'
                        }`}
                      >
                        <IconComp className="w-3 h-3" />
                        {piece.category}
                      </span>
                      {isPlaced && (
                        <span className="text-[10px] font-mono text-[#7C957D] font-bold">
                          Instalada
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold leading-snug">{piece.name}</h4>
                    <p
                      className={`text-[10px] leading-tight line-clamp-2 ${
                        isSelected ? 'text-[#A9C2D2]' : 'text-[#1C3947]/80'
                      }`}
                    >
                      {piece.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Inspection Modal */}
      {previewModalPiece && (
        <div
          onClick={() => setPreviewModalPiece(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-[#122630] rounded-2xl border border-[#1C3947] overflow-hidden shadow-2xl text-[#FAF7EE]"
          >
            <div className="relative h-64 bg-[#0C1A22]">
              <img
                src={previewModalPiece.imageSrc}
                alt={previewModalPiece.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setPreviewModalPiece(null)}
                className="absolute top-3 right-3 px-2.5 py-1 bg-[#8E3742] hover:bg-[#742B34] rounded-lg text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
            <div className="p-5 space-y-2">
              <div className="text-xs font-mono text-[#EFC4BF] font-bold uppercase">
                {previewModalPiece.category} · {previewModalPiece.manufacturerRef}
              </div>
              <h4 className="text-lg font-bold">{previewModalPiece.name}</h4>
              <p className="text-xs text-[#A9C2D2] leading-relaxed">
                {previewModalPiece.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
