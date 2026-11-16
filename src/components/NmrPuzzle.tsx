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
  FlaskConical,
  Snowflake,
  Magnet,
  SlidersHorizontal,
  Radio,
  Cpu,
  Activity,
  XCircle,
  Award,
  Eye,
  Lightbulb
} from 'lucide-react';

interface NmrPuzzleSlot {
  index: number;
  title: string;
  expectedPartId: string;
  clueLabel: string;
  clue: string;
}

interface NmrComponentItem {
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

const ALL_NMR_PUZZLE_PIECES: NmrComponentItem[] = [
  {
    id: 'sample_spinner_tube',
    name: 'Tubo Borosilicato (5 mm), Solvente Deuterado y Turbina de Aire',
    category: 'Muestra & Lock',
    manufacturerRef: 'SampleJet™ Bruker & Automuestreador Agilent RMN',
    description: 'Contiene ~600 µL en CDCl₃/DMSO-d₆ y rota a 20 Hz sobre aire comprimido dentro del diámetro central del imán.',
    imageSrc: IMAGES.nmrAutosamplerShim,
    icon: FlaskConical,
  },
  {
    id: 'cryostat_dewar',
    name: 'Criostato Dewar Anidado (N₂ Líquido 77 K y Helio 4.2 K)',
    category: 'Criostato',
    manufacturerRef: 'Aislamiento Criogénico Ascend™ & PremiumCOMPACT™',
    description: 'Termo de alto vacío en acero austenítico que conserva el helio líquido a 4.2 K para sostener la superconductividad.',
    imageSrc: IMAGES.nmrSuperconductingMagnet,
    icon: Snowflake,
  },
  {
    id: 'superconducting_magnet',
    name: 'Solenoide Superconductor Nb₃Sn / NbTi (Campo B₀)',
    category: 'Imán B₀',
    manufacturerRef: 'Imán Superconductor 9.4–28.2 T Bruker / Varian',
    description: 'Genera el campo magnético estático ultra-intenso B₀ en circuito cerrado sin resistencia eléctrica ni deriva.',
    imageSrc: IMAGES.nmrSuperconductingMagnet,
    icon: Magnet,
  },
  {
    id: 'shim_coils',
    name: 'Bobinas de Homogeneidad (Shims X, Y, Z, Z²) y Canal Lock ²H',
    category: 'Homogeneidad',
    manufacturerRef: '3D Autoshim & Bloqueo Digital de Deuterio',
    description: 'Ajusta el campo B₀ por debajo de 1 parte por billón (1 ppb) y bloquea la resonancia ²H para picos agudos <0.5 Hz.',
    imageSrc: IMAGES.nmrAutosamplerShim,
    icon: SlidersHorizontal,
  },
  {
    id: 'rf_probe_coil',
    name: 'Sonda Criogénica CryoProbe™ y Bobina RF en Silla (20 K)',
    category: 'Sonda RF',
    manufacturerRef: 'CryoProbe™ Prodigy Bruker / Sonda RF Silla',
    description: 'Emite pulsos cortos de 90° en B₁ y capta las microseñales precesantes de Faraday con mínimo ruido térmico.',
    imageSrc: IMAGES.nmrCryoprobeRfCoil,
    icon: Radio,
  },
  {
    id: 'rf_console_adc',
    name: 'Consola Transceptora RF en Cuadratura y Adquisición FID',
    category: 'Consola FID',
    manufacturerRef: 'Avance™ Neo Bruker & DirectDrive™ 2 Agilent',
    description: 'Mezcla heterodina a frecuencia intermedia y digitaliza el Decaimiento Libre de Inducción S(t) tras N pulsos.',
    imageSrc: IMAGES.nmrRfConsoleSpectrometer,
    icon: Cpu,
  },
  {
    id: 'fft_nmr_processor',
    name: 'Procesador FFT, Calibración TMS (0.00 ppm) e Integración qNMR',
    category: 'Espectro FFT',
    manufacturerRef: 'Bruker TopSpin® · Agilent VnmrJ · Shimadzu Q-NMR',
    description: 'Transforma el FID temporal en el espectro ¹H (12→0 ppm) midiendo δ, área cuantitativa e índices J (n+1).',
    imageSrc: IMAGES.nmrCutawayUltra3d,
    icon: Activity,
  },
  // Alternativa válida para sonda RF
  {
    id: 'rf_probe_roomtemp',
    name: 'Sonda Multinuclear OneNMR™ a Temperatura Ambiente',
    category: 'Sonda RF',
    manufacturerRef: 'Agilent ProTune™ Multinuclear (¹H / ¹³C / ¹⁹F / ³¹P)',
    description: 'Alternativa de sonda RF de sintonización automática motorizada a temperatura ambiente para rutina multinuclear.',
    imageSrc: IMAGES.nmrCryoprobeRfCoil,
    icon: Radio,
  },
  // Distractor ferromagnético (mismo estilo e insignia uniforme para no delatarlo)
  {
    id: 'nmr_distractor_steel_vial',
    name: 'Cilindro de Acero al Carbono y Balines Ferromagnéticos',
    category: 'Muestra & Lock',
    manufacturerRef: 'Ferroaleación Industrial Magnética de Uso Mecánico',
    description: 'Recipiente metálico grueso de hierro-carbono con alta permeabilidad magnética junto a balines ferromagnéticos.',
    imageSrc: IMAGES.nmrDistractorSteelVial,
    isDistractor: true,
    distractorReason: 'El acero ferromagnético colapsa la homogeneidad ppb de B₀, bloquea los pulsos de radiofrecuencia por efecto jaula de Faraday y resulta violentamente atraído como proyectil por el imán superconductor.',
    icon: FlaskConical,
  },
];

const NMR_PUZZLE_SLOTS: NmrPuzzleSlot[] = [
  {
    index: 0,
    title: 'Ranura 1',
    expectedPartId: 'sample_spinner_tube',
    clueLabel: 'Pista 1',
    clue: 'Contiene la disolución en solvente sin ¹H (CDCl₃ / DMSO-d₆) y gira neumáticamente a 20 Hz para promediar errores radiales.',
  },
  {
    index: 1,
    title: 'Ranura 2',
    expectedPartId: 'cryostat_dewar',
    clueLabel: 'Pista 2',
    clue: 'Termo de alto vacío con escudos de N₂ (77 K) y He líquido (4.2 K) indispensable para evitar resistencia y quench térmico.',
  },
  {
    index: 2,
    title: 'Ranura 3',
    expectedPartId: 'superconducting_magnet',
    clueLabel: 'Pista 3',
    clue: 'Solenoide en circuito cerrado sin fuente externa que fija B₀ (9.4–28.2 T) y la frecuencia de Larmor ν₀ = (γ/2π)·B₀.',
  },
  {
    index: 3,
    title: 'Ranura 4',
    expectedPartId: 'shim_coils',
    clueLabel: 'Pista 4',
    clue: 'Hasta 36 bobinas ortogonales acopladas al canal ²H que afinan el campo a 1 parte por billón prolongando el tiempo T₂*.',
  },
  {
    index: 4,
    title: 'Ranura 5',
    expectedPartId: 'rf_probe_coil',
    clueLabel: 'Pista 5',
    clue: 'Antena en silla de montar perpendicular a B₀ que aplica pulsos de 90° en B₁ y recoge el débil eco magnético nuclear.',
  },
  {
    index: 5,
    title: 'Ranura 6',
    expectedPartId: 'rf_console_adc',
    clueLabel: 'Pista 6',
    clue: 'Amplifica y digitaliza en cuadratura el Decaimiento Libre de Inducción S(t) acumulando N barridos para subir la SNR.',
  },
  {
    index: 6,
    title: 'Ranura 7 (Salida)',
    expectedPartId: 'fft_nmr_processor',
    clueLabel: 'Pista 7 · Salida',
    clue: 'Ejecuta la Transformada de Fourier y grafica δ (12→0 ppm) respecto al TMS mostrando multiplicidad (n+1) e integrales.',
  },
];

interface NmrPuzzleProps {
  onOpenSimulator: () => void;
}

export const NmrPuzzle: React.FC<NmrPuzzleProps> = ({ onOpenSimulator }) => {
  const [placedParts, setPlacedParts] = useState<{ [slotIndex: number]: string }>({});
  const [activeSelectedPiece, setActiveSelectedPiece] = useState<string | null>(null);
  const [previewModalPiece, setPreviewModalPiece] = useState<NmrComponentItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    isCorrect: boolean;
    stars: number;
    errors: { slotIndex: number; title: string; message: string }[];
  } | null>(null);

  const [availablePieces, setAvailablePieces] = useState<NmrComponentItem[]>(() => {
    return [...ALL_NMR_PUZZLE_PIECES].sort(() => Math.random() - 0.5);
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
    setAvailablePieces([...ALL_NMR_PUZZLE_PIECES].sort(() => Math.random() - 0.5));
  };

  const handleValidateAssembly = () => {
    const errors: { slotIndex: number; title: string; message: string }[] = [];
    let correctCount = 0;

    NMR_PUZZLE_SLOTS.forEach((slot) => {
      const placedId = placedParts[slot.index];
      if (!placedId) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: 'Ranura vacía: debes instalar este subsistema magnético o electrónico.',
        });
        return;
      }

      const item = ALL_NMR_PUZZLE_PIECES.find((p) => p.id === placedId);
      if (item?.isDistractor) {
        errors.push({
          slotIndex: slot.index,
          title: slot.title,
          message: item.distractorReason || 'Material ferromagnético incompatible con RMN.',
        });
        return;
      }

      const isProbeValid =
        slot.expectedPartId === 'rf_probe_coil' &&
        (placedId === 'rf_probe_coil' || placedId === 'rf_probe_roomtemp');

      if (placedId === slot.expectedPartId || isProbeValid) {
        correctCount++;
      } else {
        let reason = 'La ubicación de este módulo interrumpe la cadena criogénica o de radiofrecuencia.';
        if (slot.expectedPartId === 'sample_spinner_tube') {
          reason = '¡Falla en la muestra! El tubo de 5 mm deuterado y la turbina deben ir en el ingreso superior al centro del imán.';
        } else if (slot.expectedPartId === 'cryostat_dewar') {
          reason = '¡Falla térmica! El criostato Dewar (LN₂/LHe) envuelve y refrigera el solenoide superconductor.';
        } else if (slot.expectedPartId === 'superconducting_magnet') {
          reason = '¡Falla magnética! El imán superconductor Nb₃Sn genera el campo B₀ estático principal.';
        } else if (slot.expectedPartId === 'shim_coils') {
          reason = '¡Falla de homogeneidad! Las bobinas shim y el Lock ²H afinan B₀ alrededor del diámetro central antes de la sonda.';
        } else if (slot.expectedPartId === 'rf_probe_coil') {
          reason = '¡Falla de excitación RF! La sonda RF (CryoProbe o OneNMR) rodea al tubo para aplicar el pulso B₁ de 90°.';
        } else if (slot.expectedPartId === 'rf_console_adc') {
          reason = '¡Falla de recepción! La consola transceptora digitaliza el eco FID captado por la sonda.';
        } else if (slot.expectedPartId === 'fft_nmr_processor') {
          reason = '¡Falla de procesamiento! La FFT y la escala δ ppm respecto al TMS operan sobre el FID al final de la cadena.';
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
            <span>Desafío de Ensamble Superconductor RMN</span>
            <span aria-hidden="true">·</span>
            <span>Piezas con Fotografía Industrial Bruker / Agilent / Shimadzu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Rompecabezas: Ensambla el Espectrómetro de Resonancia Magnética Nuclear
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-2xl mt-1">
            Lee las pistas cuánticas y criogénicas de cada ranura y conecta los 7 subsistemas del RMN en orden exacto. ¡Evita introducir materiales ferromagnéticos incompatibles!
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
            ARQUITECTURA CRIOGÉNICA Y RF DE RMN (7 RANURAS EN SERIE)
          </span>
          <span>
            {Object.keys(placedParts).length} de 7 Instalados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {NMR_PUZZLE_SLOTS.map((slot) => {
            const placedId = placedParts[slot.index];
            const placedItem = ALL_NMR_PUZZLE_PIECES.find((p) => p.id === placedId);
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
                        <AlertCircle className="w-3 h-3" /> Falla Magnética
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
              Bandeja de Módulos RMN Disponibles (Con Fotografía Industrial)
            </h3>
            <p className="text-xs text-[#1C3947]/70">
              Selecciona un módulo y haz clic en la ranura correspondiente de la arquitectura RMN.
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
                  ¡Espectrómetro RMN Energizado, Bloqueado y Calibrado a &lt;0.5 Hz!
                </h3>
                <p className="text-sm text-[#1C3947]/80 leading-relaxed">
                  Has ensamblado la cadena exacta del RMN: Tubo 5 mm &amp; Lock ➔ Criostato 4.2 K ➔ Imán Superconductor Nb₃Sn ➔ Bobinas Shim ➔ Sonda RF ➔ Consola FID ➔ Procesador FFT.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#7C957D] shadow-xl aspect-[16/9] bg-[#0C1A22]">
                <img
                  src={IMAGES.nmrCutawayUltra3d}
                  alt="Espectrómetro RMN Ensamble Completo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-left text-[#FAF7EE]">
                    <span className="text-xs font-mono text-[#EFC4BF] font-bold uppercase tracking-wider">
                      Sistema Criogénico Certificado
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold">
                      Sistema RMN Bruker · Agilent · Shimadzu
                    </h4>
                    <p className="text-xs text-[#FAF7EE]/80">
                      Homogeneidad magnética verificada a partes por billón (1 ppb) y bloqueo de deuterio ²H estable.
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
                      Distinción: Especialista en Resonancia Magnética Nuclear
                    </h4>
                    <p className="text-xs text-[#1C3947]">
                      Dominio de superconductividad 4.2 K, shimming, pulsos RF B₁, FID y espectroscopía ¹H.
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
                    Diagnóstico Magnético: Se detectaron fallas de campo o RF
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
                El sistema no puede estabilizar el campo superconductor ni registrar un FID limpio porque hay módulos desordenados o piezas ferromagnéticas peligrosas. Revisa los detalles:
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
