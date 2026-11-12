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
  Zap, 
  FastForward, 
  Compass, 
  Activity, 
  Wind, 
  Cpu, 
  XCircle,
  Award,
  Layers,
  Eye,
  Info,
  Lightbulb
} from 'lucide-react';

interface PuzzleSlot {
  index: number;
  title: string;
  expectedPartId: string;
  clueLabel: string;
  clue: string;
}

interface ComponentItem {
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

const ALL_PUZZLE_PIECES: ComponentItem[] = [
  {
    id: 'inlet',
    name: 'Inyector Capilar & Vaporizador',
    category: 'Muestra',
    manufacturerRef: 'Agilent 8890 GC Inlet & Shimadzu AOC',
    description: 'Vaporiza la muestra líquida/sólida e inyecta un flujo constante de gas neutro en régimen molecular libre.',
    imageSrc: IMAGES.puzzleInletInjector,
    icon: Droplets,
  },
  {
    id: 'ionizer',
    name: 'Cámara de Ionización HES (70 eV)',
    category: 'Fuente',
    manufacturerRef: 'Agilent High Efficiency Source & Shimadzu DUIS',
    description: 'Bombardea moléculas con electrones de 70 eV para crear cationes manipulables [M]+.',
    imageSrc: IMAGES.ionsourceAgilentHesDetail,
    icon: Zap,
  },
  {
    id: 'accelerator',
    name: 'Acelerador y Colimador de Haz',
    category: 'Óptica',
    manufacturerRef: 'Óptica Einzel de Bruker & Overdrive Shimadzu',
    description: 'Aplica alta tensión electrostática (kV) para dar energía cinética uniforme a los iones.',
    imageSrc: IMAGES.puzzleAcceleratorPlates,
    icon: FastForward,
  },
  {
    id: 'analyzer',
    name: 'Analizador de Sector Magnético',
    category: 'Separación',
    manufacturerRef: 'Electroimán de precisión Bruker & Cuadrupolo Agilent',
    description: 'Aplica fuerza de Lorentz transversal para separar físicamente los iones según m/z.',
    imageSrc: IMAGES.puzzleMagneticSector,
    icon: Compass,
  },
  {
    id: 'detector',
    name: 'Multiplicador de Electrones Secundario',
    category: 'Registro',
    manufacturerRef: 'Detector Triple-Axis TAD Agilent & Shimadzu',
    description: 'Convierte el impacto iónico individual en una cascada de 10⁶ electrones amplificados.',
    imageSrc: IMAGES.turbopumpDetectorAssembly,
    icon: Activity,
  },
  {
    id: 'vacuum',
    name: 'Bombas Turbomoleculares de Ultra Vacío',
    category: 'Fluídica',
    manufacturerRef: 'Rotores de titanio Pfeiffer 60,000 RPM & Shimadzu',
    description: 'Mantiene presiones de 10⁻⁶ Torr para garantizar libre camino medio superior al tubo.',
    imageSrc: IMAGES.turbopumpDetectorAssembly,
    icon: Wind,
  },
  {
    id: 'datasystem',
    name: 'Estación de Cómputo & Espectro',
    category: 'Datos',
    manufacturerRef: 'Agilent MassHunter & Shimadzu LabSolutions',
    description: 'Digitaliza pulsos en tiempo real y genera el gráfico normalizado de m/z vs Abundancia.',
    imageSrc: IMAGES.spectrometerCutawayUltra3d,
    icon: Cpu,
  },
  // Distractores
  {
    id: 'peristaltic_pump',
    name: 'Bomba Peristáltica de Acuario',
    category: 'Fluídica',
    manufacturerRef: 'Equipo no analítico para agua a 1 atm',
    description: 'Bomba ordinaria para líquidos a presión atmosférica.',
    imageSrc: IMAGES.puzzlePeristalticPump,
    isDistractor: true,
    distractorReason: 'Una bomba peristáltica solo mueve fluidos a presión ambiente. Un espectrómetro requiere bombas turbomoleculares de ultra alto vacío (10⁻⁶ Torr).',
    icon: Wind,
  },
  {
    id: 'quadrupole_alt',
    name: 'Filtro Cuadrupolar Hiperbólico en Oro',
    category: 'Separación',
    manufacturerRef: 'Tecnología Agilent / Shimadzu UFms',
    description: 'Alternativa de filtrado de masas por radiofrecuencia RF/DC sin imán curvo.',
    imageSrc: IMAGES.quadrupoleRodsShimadzuBruker,
    icon: Layers,
  },
];

const PUZZLE_SLOTS: PuzzleSlot[] = [
  {
    index: 0,
    title: 'Ranura 1',
    expectedPartId: 'inlet',
    clueLabel: 'Pista 1',
    clue: 'Recibe la sustancia externa y la pasa a fase gaseosa sin romper sus enlaces.',
  },
  {
    index: 1,
    title: 'Ranura 2',
    expectedPartId: 'ionizer',
    clueLabel: 'Pista 2',
    clue: 'Las moléculas neutras no sienten campos eléctricos; aquí pierden un electrón para adquirir carga.',
  },
  {
    index: 2,
    title: 'Ranura 3',
    expectedPartId: 'accelerator',
    clueLabel: 'Pista 3',
    clue: 'Iguala la energía cinética de todas las especies cargadas mediante alto voltaje antes de separarlas.',
  },
  {
    index: 3,
    title: 'Ranura 4',
    expectedPartId: 'analyzer',
    clueLabel: 'Pista 4',
    clue: 'Desvía o filtra las trayectorias en vuelo para distinguir los fragmentos según su relación m/z.',
  },
  {
    index: 4,
    title: 'Ranura 5',
    expectedPartId: 'detector',
    clueLabel: 'Pista 5',
    clue: 'Cada impacto al final del recorrido genera una carga diminuta que debe amplificarse en cascada.',
  },
  {
    index: 5,
    title: 'Ranura 6 (Soporte)',
    expectedPartId: 'vacuum',
    clueLabel: 'Pista 6 · Soporte',
    clue: 'Evita que las partículas del haz choquen contra moléculas de aire durante todo el trayecto interno.',
  },
  {
    index: 6,
    title: 'Ranura 7 (Salida)',
    expectedPartId: 'datasystem',
    clueLabel: 'Pista 7 · Salida',
    clue: 'Traduce los pulsos eléctricos registrados en el gráfico final de abundancia frente a m/z.',
  },
];

interface AssemblyPuzzleProps {
  onOpenSimulator: () => void;
}

export const AssemblyPuzzle: React.FC<AssemblyPuzzleProps> = ({ onOpenSimulator }) => {
  const [placedParts, setPlacedParts] = useState<{ [slotIndex: number]: string }>({});
  const [activeSelectedPiece, setActiveSelectedPiece] = useState<string | null>(null);
  const [previewModalPiece, setPreviewModalPiece] = useState<ComponentItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    isCorrect: boolean;
    stars: number;
    errors: { slotIndex: number; title: string; message: string }[];
  } | null>(null);

  const [availablePieces, setAvailablePieces] = useState<ComponentItem[]>(() => {
    return [...ALL_PUZZLE_PIECES].sort(() => Math.random() - 0.5);
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
    setAvailablePieces([...ALL_PUZZLE_PIECES].sort(() => Math.random() - 0.5));
  };

  const handleValidateAssembly = () => {
    const errors: { slotIndex: number; title: string; message: string }[] = [];
    let correctCount = 0;

    PUZZLE_SLOTS.forEach((slot) => {
      const placedId = placedParts[slot.index];
      if (!placedId) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: 'Etapa vacía: debes instalar un componente para esta función.',
        });
        return;
      }

      const item = ALL_PUZZLE_PIECES.find((p) => p.id === placedId);
      if (item?.isDistractor) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: item.distractorReason || 'Componente inadecuado para espectrometría de masas.',
        });
        return;
      }

      // Allow quadrupole_alt as valid analyzer too
      const isAnalyzerValid = slot.expectedPartId === 'analyzer' && (placedId === 'analyzer' || placedId === 'quadrupole_alt');

      if (placedId === slot.expectedPartId || isAnalyzerValid) {
        correctCount++;
      } else {
        let reason = 'El orden físico de este componente no corresponde a la secuencia balística del espectrómetro.';
        if (slot.expectedPartId === 'ionizer') {
          reason = '¡Falla de ionización! Sin cargar las moléculas con electrones de 70 eV, los campos no pueden ejercer fuerza.';
        } else if (slot.expectedPartId === 'accelerator') {
          reason = '¡Falla de aceleración! Los iones deben recibir una energía cinética uniforme (Ek = q·V) antes del analizador.';
        } else if (slot.expectedPartId === 'analyzer') {
          reason = '¡Falla de separación! El analizador de masas debe estar entre el acelerador y el detector para dispersar los iones por m/z.';
        } else if (slot.expectedPartId === 'detector') {
          reason = '¡Falla de detección! El multiplicador debe recibir solo los iones ya separados para contarlos.';
        } else if (slot.expectedPartId === 'vacuum') {
          reason = '¡Falla de vacío! Se requieren bombas turbomoleculares para evitar que los iones colisionen con el aire.';
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
            <span>Desafío de Ensamble Visual</span>
            <span aria-hidden="true">·</span>
            <span>Piezas con Fotografía Industrial Bruker / Shimadzu / Agilent</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Rompecabezas: Ensambla el Espectrómetro
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-2xl mt-1">
            Arrastra o selecciona las piezas reales de hardware para construir el equipo en orden balístico. Si logras el ensamble operativo al 100%, recibirás 5 estrellas.
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

      {/* Assembly Slots (Chassis Rail) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#8E3742] px-1">
          <span className="font-bold flex items-center gap-1.5">
            <Puzzle className="w-4 h-4" />
            LÍNEA DEL HAZ IÓNICO (7 RANURAS DE MONTAJE)
          </span>
          <span>
            {Object.keys(placedParts).length} de 7 Instalados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {PUZZLE_SLOTS.map((slot) => {
            const placedId = placedParts[slot.index];
            const placedItem = ALL_PUZZLE_PIECES.find((p) => p.id === placedId);
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
                {/* Slot index and title */}
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

                {/* Validation badge */}
                {validationResult?.tested && placedItem && (
                  <div className="pt-1.5 border-t border-[#E2D7BB]/60 text-center z-10">
                    {hasError ? (
                      <span className="text-[10px] font-mono text-[#8E3742] font-bold flex items-center justify-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Falla Física
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

      {/* Available Scrambled Pieces Tray with IMAGES */}
      <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-2">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E3742]">
              Bandeja de Hardware Disponible (Con Fotografía Industrial)
            </h3>
            <p className="text-xs text-[#1C3947]/70">
              Haz clic en cualquier pieza para seleccionarla y luego haz clic en su ranura correspondiente en la línea del haz.
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
                {/* Component Image */}
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

      {/* Validation Result Modal / Celebration */}
      {validationResult?.tested && (
        <div
          className={`rounded-2xl p-6 border shadow-lg space-y-4 animate-fadeIn ${
            validationResult.isCorrect
              ? 'bg-[#FAF7EE] border-[#7C957D]'
              : 'bg-[#FAF7EE] border-[#8E3742]'
          }`}
        >
          {validationResult.isCorrect ? (
            /* 5-STAR PERFECT SCORE CELEBRATION */
            <div className="space-y-6 text-center max-w-3xl mx-auto py-4">
              {/* 5 Stars Display */}
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
                  ¡Espectrómetro de Masas Operativo al 100%!
                </h3>
                <p className="text-sm text-[#1C3947]/80 leading-relaxed">
                  Has colocado cada componente en su orden balístico exacto: Inyección ➔ Ionización 70 eV ➔ Aceleración electrostática ➔ Analizador de Masas ➔ Multiplicador de Electrones, soportado por bombas turbomoleculares de ultra alto vacío.
                </p>
              </div>

              {/* Master Assembled Instrument Photo Showcase */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#7C957D] shadow-xl aspect-[16/9] bg-[#0C1A22]">
                <img
                  src={IMAGES.spectrometerCutawayUltra3d}
                  alt="Espectrómetro de Masas Ensamble Completo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-left text-[#FAF7EE]">
                    <span className="text-xs font-mono text-[#EFC4BF] font-bold uppercase tracking-wider">
                      Arquitectura Completa Certificada
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold">
                      Espectrómetro Híbrido Bruker · Shimadzu · Agilent
                    </h4>
                    <p className="text-xs text-[#FAF7EE]/80">
                      Sistema listo para análisis de pureza química, fragmentación e isotopos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificate badge */}
              <div className="p-4 bg-[#F2F6F2] rounded-xl border border-[#DFE8DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#7C957D] flex items-center justify-center text-[#FAF7EE] shrink-0 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#122630]">
                      Distinción: Ingeniero Maestro de Espectrometría
                    </h4>
                    <p className="text-xs text-[#1C3947]">
                      Dominio de la ecuación m/z = (e·B²·r²) / (2·V) y estándares industriales.
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
            /* INCORRECT ATTEMPT FEEDBACK */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#8E3742]" />
                  <h3 className="text-lg font-bold text-[#122630]">
                    Revisión de Ensamble: Se detectaron fallas físicas
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
                Tu máquina aún no puede registrar espectros porque la física de alguna de sus etapas impide el paso del haz. Revisa los detalles de cada error a continuación y continúa intentándolo:
              </p>

              {/* Error list */}
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
