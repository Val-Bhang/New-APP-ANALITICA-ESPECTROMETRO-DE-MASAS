import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  FTIR_GROUPS_DATA,
  ALL_FTIR_COMPOUNDS,
  FtirCompound,
  FtirBand,
  computeFtirSimulation
} from '../data/ftirCompoundsData';
import { FtirOnboardingGuide } from './FtirOnboardingGuide';
import { clampNumber } from '../utils/safeNumber';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Activity,
  BookOpen,
  Search,
  Shuffle,
  Atom,
  AlertTriangle
} from 'lucide-react';

export const FtirSimulator: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(FTIR_GROUPS_DATA[0].id);
  const [selectedCompound, setSelectedCompound] = useState<FtirCompound>(
    FTIR_GROUPS_DATA[0].compounds[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchGlobal, setSearchGlobal] = useState<boolean>(false);

  // Operational FTIR Interferometric Parameters
  const [resolutionCm, setResolutionCm] = useState<number>(4);
  const [scans, setScans] = useState<number>(16);
  const [samplingMode, setSamplingMode] = useState<'atr_diamond' | 'kbr_pellet' | 'glass_window'>('atr_diamond');
  const [displayMetric, setDisplayMetric] = useState<'transmittance' | 'absorbance'>('transmittance');

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mirrorPhase, setMirrorPhase] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [selectedBand, setSelectedBand] = useState<FtirBand | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeGroup = useMemo(() => {
    return FTIR_GROUPS_DATA.find((g) => g.id === selectedGroupId) || FTIR_GROUPS_DATA[0];
  }, [selectedGroupId]);

  const sim = useMemo(() => {
    return computeFtirSimulation(
      selectedCompound,
      resolutionCm,
      scans,
      samplingMode,
      displayMetric
    );
  }, [selectedCompound, resolutionCm, scans, samplingMode, displayMetric]);

  const activeBand = useMemo(() => {
    if (selectedBand && selectedCompound.bands.some((b) => b.wavenumber === selectedBand.wavenumber)) {
      return selectedBand;
    }
    return selectedCompound.bands.find((b) => b.isKeyBand) || selectedCompound.bands[0] || null;
  }, [selectedCompound, selectedBand]);

  const visibleCompounds = useMemo(() => {
    const list = searchGlobal ? ALL_FTIR_COMPOUNDS : activeGroup.compounds;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.formula.toLowerCase().includes(q) ||
        c.keyRegionNote.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [activeGroup, searchGlobal, searchQuery]);

  const handleSelectCompound = (comp: FtirCompound) => {
    setSelectedCompound(comp);
    setSelectedBand(null);
  };

  const handlePickRandomCompound = () => {
    const idx = Math.floor(Math.random() * ALL_FTIR_COMPOUNDS.length);
    const chosen = ALL_FTIR_COMPOUNDS[idx];
    const parentGroup = FTIR_GROUPS_DATA.find((g) =>
      g.compounds.some((c) => c.id === chosen.id)
    );
    if (parentGroup) setSelectedGroupId(parentGroup.id);
    handleSelectCompound(chosen);
  };

  const handleResetMirror = () => {
    setMirrorPhase(0);
    setIsPlaying(true);
  };

  // Real-time Michelson moving-mirror animation clock
  useEffect(() => {
    if (!isPlaying) return;
    let lastTs = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTs) / 1000);
      lastTs = now;
      setMirrorPhase((prev) => (prev + dt * 2.1) % (Math.PI * 2));
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  // Real-time Michelson Interferometer + He-Ne + ATR + DTGS Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Optical bench backdrop
    ctx.fillStyle = '#071116';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle bench grid
    ctx.strokeStyle = 'rgba(28, 57, 71, 0.35)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // 1. SiC GLOBAR CERAMIC SOURCE (x=22..72)
    ctx.fillStyle = '#122630';
    ctx.fillRect(18, 125, 58, 76);
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(18, 125, 58, 76);

    // Glowing U-coil
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(47, 163, 14, Math.PI * 0.5, Math.PI * 1.5);
    ctx.stroke();
    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('Globar SiC', 18, 118);
    ctx.fillStyle = '#A9C2D2';
    ctx.font = '8px monospace';
    ctx.fillText('1,250 K', 28, 215);

    // 2. GOLD PARABOLIC COLLIMATOR & J-STOP (x=96..136)
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(105, 163, 24, -Math.PI * 0.4, Math.PI * 0.4);
    ctx.stroke();

    // Diverging beam Globar -> Collimator
    ctx.strokeStyle = 'rgba(239, 196, 191, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(47, 163);
    ctx.lineTo(106, 145);
    ctx.moveTo(47, 163);
    ctx.lineTo(106, 181);
    ctx.stroke();

    // J-stop jaws scaling with resolution
    const jawOpening = Math.max(4, Math.min(18, sim.jStopMm * 1.4));
    ctx.fillStyle = '#A9C2D2';
    ctx.fillRect(132, 132, 7, 31 - jawOpening);
    ctx.fillRect(132, 163 + jawOpening, 7, 31 - jawOpening);
    ctx.fillStyle = '#A9C2D2';
    ctx.font = '8px monospace';
    ctx.fillText(`J=${sim.jStopMm.toFixed(1)}mm`, 116, 208);

    // 3. MICHELSON INTERFEROMETER (cx=220, cy=163)
    const bsX = 220;
    const bsY = 163;

    // Collimated beam entering Michelson
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = Math.max(2, jawOpening * 0.35);
    ctx.beginPath();
    ctx.moveTo(106, bsY);
    ctx.lineTo(bsX, bsY);
    ctx.stroke();

    // KBr/Ge 45-degree Beamsplitter
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(bsX - 24, bsY + 24);
    ctx.lineTo(bsX + 24, bsY - 24);
    ctx.stroke();

    // Fixed Mirror (bottom of Michelson at y=236)
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(bsX - 24, 236);
    ctx.lineTo(bsX + 24, 236);
    ctx.stroke();
    ctx.fillStyle = '#A9C2D2';
    ctx.fillText('Espejo Fijo', bsX - 25, 250);

    // Moving Cube-Corner Mirror (top of Michelson, oscillating with resolution travel)
    const travelAmp = Math.min(26, 7 + (16 / Math.max(0.5, resolutionCm)) * 0.8);
    const mirrorOffset = Math.sin(mirrorPhase) * travelAmp;
    const moveY = 82 - mirrorOffset;

    ctx.strokeStyle = '#7C957D';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(bsX - 24, moveY + 12);
    ctx.lineTo(bsX, moveY);
    ctx.lineTo(bsX + 24, moveY + 12);
    ctx.stroke();

    // Beams inside both arms
    ctx.strokeStyle = 'rgba(239, 196, 191, 0.75)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(bsX, bsY);
    ctx.lineTo(bsX, 236);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(124, 149, 125, 0.85)';
    ctx.beginPath();
    ctx.moveTo(bsX, bsY);
    ctx.lineTo(bsX, moveY + 4);
    ctx.stroke();

    // Red He-Ne reference laser line parallel
    ctx.strokeStyle = '#8E3742';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(bsX + 12, bsY);
    ctx.lineTo(bsX + 12, moveY + 8);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#EFC4BF';
    ctx.font = 'bold 8px monospace';
    ctx.fillText(`He-Ne 632.8nm`, bsX + 30, 74);
    ctx.fillStyle = '#7C957D';
    ctx.fillText(`Espejo Móvil (±${(sim.opdMaxCm * 5).toFixed(1)} mm)`, bsX - 50, 48);

    // 4. RECOMBINED MODULATED BEAM -> SAMPLE ATR / KBR / GLASS (x=315..410)
    const opdSignal = 0.55 + 0.45 * Math.cos(mirrorPhase * 3);
    ctx.strokeStyle = `rgba(239, 196, 191, ${0.4 + opdSignal * 0.6})`;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(bsX, bsY);
    ctx.lineTo(328, bsY);
    ctx.stroke();

    // Sample compartment box
    ctx.fillStyle = '#122630';
    ctx.fillRect(328, 124, 96, 78);
    ctx.strokeStyle = samplingMode === 'glass_window' ? '#8E3742' : '#7C957D';
    ctx.lineWidth = 2;
    ctx.strokeRect(328, 124, 96, 78);

    if (samplingMode === 'atr_diamond') {
      // Diamond crystal trapezoid + evanescent bounce
      ctx.fillStyle = 'rgba(169, 194, 210, 0.35)';
      ctx.beginPath();
      ctx.moveTo(352, 182);
      ctx.lineTo(400, 182);
      ctx.lineTo(390, 160);
      ctx.lineTo(362, 160);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#FAF7EE';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Anvil press
      ctx.fillStyle = '#EFC4BF';
      ctx.fillRect(368, 134, 16, 24);
      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('ATR Diamante', 344, 196);
    } else if (samplingMode === 'kbr_pellet') {
      // KBr translucent disc pellet
      ctx.fillStyle = 'rgba(250, 247, 238, 0.25)';
      ctx.fillRect(368, 138, 14, 50);
      ctx.strokeStyle = '#A9C2D2';
      ctx.strokeRect(368, 138, 14, 50);
      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('Pastilla KBr', 344, 196);
    } else {
      // Glass window blocking beam!
      ctx.fillStyle = 'rgba(142, 55, 66, 0.55)';
      ctx.fillRect(368, 136, 16, 54);
      ctx.strokeStyle = '#EFC4BF';
      ctx.strokeRect(368, 136, 16, 54);
      ctx.fillStyle = '#EFC4BF';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('¡VIDRIO BLOQUEA!', 333, 196);
    }

    // Beam after sample -> Detector
    const postSampleAlpha = samplingMode === 'glass_window' ? 0.12 : 0.4 + opdSignal * 0.55;
    ctx.strokeStyle =
      samplingMode === 'glass_window'
        ? `rgba(142, 55, 66, ${postSampleAlpha})`
        : `rgba(124, 149, 125, ${postSampleAlpha})`;
    ctx.lineWidth = samplingMode === 'glass_window' ? 1.5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(424, bsY);
    ctx.lineTo(468, bsY);
    ctx.stroke();

    // 5. DLATGS PYROELECTRIC DETECTOR (x=468..522)
    ctx.fillStyle = samplingMode === 'glass_window' ? '#2A1216' : '#122630';
    ctx.fillRect(468, 132, 54, 62);
    ctx.strokeStyle = samplingMode === 'glass_window' ? '#8E3742' : '#EFC4BF';
    ctx.lineWidth = 2;
    ctx.strokeRect(468, 132, 54, 62);
    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('DLATGS', 476, 166);
    ctx.fillStyle = '#A9C2D2';
    ctx.font = '8px monospace';
    ctx.fillText('Detector', 474, 206);

    // Telemetry header banner
    ctx.fillStyle = '#EFC4BF';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(
      `Δν̃ = ${resolutionCm} cm⁻¹  |  N = ${scans} barridos  |  SNR ≈ ${sim.snrEstimate.toLocaleString()}:1  |  OPD = ${sim.opdMaxCm.toFixed(2)} cm`,
      16,
      26
    );
  }, [mirrorPhase, resolutionCm, scans, samplingMode, sim]);

  const isGlassBlocked = samplingMode === 'glass_window';

  return (
    <div className="w-full space-y-6">
      {/* Header and overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Laboratorio Virtual FTIR (Infrarrojo Medio)</span>
            <span aria-hidden="true">·</span>
            <span>{ALL_FTIR_COMPOUNDS.length} Espectros Vibracionales Calibrados</span>
            <span aria-hidden="true">·</span>
            <span>{FTIR_GROUPS_DATA.length} Grupos Funcionales</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Simulador de Haz FTIR &amp; Espectro 4,000 → 400 cm⁻¹
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Explora el interferograma I(δ), ajusta la resolución Δν̃, el número de barridos co-añadidos y el modo de muestreo (ATR Diamante vs KBr vs Vidrio) para observar vibraciones moleculares y huella dactilar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePickRandomCompound}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF7EE] text-[#8E3742] border border-[#E2D7BB] hover:bg-[#FAEEEE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Muestra Aleatoria</span>
          </button>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm ${
              showGuide
                ? 'bg-[#8E3742] text-[#FAF7EE]'
                : 'bg-[#FFFDF9] text-[#8E3742] border border-[#E2D7BB] hover:bg-[#FAEEEE]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showGuide ? 'Ocultar Guía' : 'Paso a Paso Inicial'}</span>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isPlaying
                ? 'bg-[#122630] text-[#FAF7EE] hover:bg-[#1C3947]'
                : 'bg-[#7C957D] text-[#FAF7EE] hover:bg-[#657D66]'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pausar Espejo' : 'Reanudar'}</span>
          </button>
          <button
            onClick={handleResetMirror}
            className="px-3 py-1.5 text-xs font-medium text-[#8E3742] bg-[#FAF7EE] hover:bg-[#FAEEEE] border border-[#E2D7BB] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar ZPD</span>
          </button>
        </div>
      </div>

      {/* Onboarding Guide */}
      {showGuide && (
        <FtirOnboardingGuide
          onClose={() => setShowGuide(false)}
          onStartSimulation={() => setShowGuide(false)}
        />
      )}

      {/* 12 Functional Groups Library (120 Compounds) */}
      <div className="bg-[#FAF7EE] rounded-2xl p-5 border border-[#E2D7BB] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-3">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-[#8E3742]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#122630]">
              Biblioteca FTIR: {FTIR_GROUPS_DATA.length} Familias Vibracionales ({ALL_FTIR_COMPOUNDS.length} Compuestos)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#1C3947]/50 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={60}
                placeholder={
                  searchGlobal
                    ? `Buscar en ${ALL_FTIR_COMPOUNDS.length} compuestos...`
                    : `Buscar en ${activeGroup.name}...`
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs rounded-lg border border-[#E2D7BB] bg-[#FFFDF9] text-[#122630] focus:outline-none focus:border-[#8E3742] w-48 sm:w-60"
              />
            </div>
            <button
              onClick={() => setSearchGlobal(!searchGlobal)}
              className={`px-2.5 py-1 text-[11px] rounded-lg font-mono transition-colors cursor-pointer border ${
                searchGlobal
                  ? 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742]'
                  : 'bg-[#FFFDF9] text-[#1C3947] border-[#E2D7BB] hover:bg-[#EFE8D3]'
              }`}
            >
              {searchGlobal
                ? `Todos (${ALL_FTIR_COMPOUNDS.length})`
                : `Grupo (${activeGroup.compounds.length})`}
            </button>
          </div>
        </div>

        {/* 12 Groups Tabs Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5">
          {FTIR_GROUPS_DATA.map((group, idx) => {
            const isGroupActive = selectedGroupId === group.id && !searchGlobal;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setSearchGlobal(false);
                  handleSelectCompound(group.compounds[0]);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 border ${
                  isGroupActive
                    ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] shadow-sm'
                    : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:bg-[#F7F3E7]'
                }`}
              >
                <span className="font-mono text-[10px] text-[#EFC4BF] font-bold">{idx + 1}.</span>
                <span>{group.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isGroupActive ? 'bg-[#8E3742] text-[#FAF7EE]' : 'bg-[#EFE8D3] text-[#1C3947]'
                  }`}
                >
                  {group.compounds.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Group Signature Banner */}
        <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] text-xs space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#8E3742] font-mono text-[11px]">
            <span className="font-bold">
              Grupo: {activeGroup.name} · {activeGroup.functionalSignature}
            </span>
            <span className="text-[#7C957D]">4,000 – 400 cm⁻¹</span>
          </div>
          <p className="text-[11px] text-[#1C3947]/90 leading-relaxed font-mono">
            <strong className="text-[#122630] font-sans">Bandas Diagnósticas Clave: </strong>
            {activeGroup.diagnosticBands}
          </p>
        </div>

        {/* Compound Cards Grid */}
        <div className="space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#1C3947]/70 px-1 gap-1">
            <span>
              {searchGlobal
                ? `Resultados globales (${visibleCompounds.length}):`
                : `Compuestos en ${activeGroup.name} (${visibleCompounds.length} de ${activeGroup.compounds.length}):`}
            </span>
            <span className="font-mono text-[11px] text-[#8E3742]">
              Activa: <strong>{selectedCompound.name}</strong> ({selectedCompound.formula}) · {selectedCompound.physicalState}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
            {visibleCompounds.map((comp) => {
              const isSelected = selectedCompound.id === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelectCompound(comp)}
                  className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] shadow-md ring-2 ring-[#8E3742]/40'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:bg-[#F7F3E7] hover:border-[#8E3742]/60'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs line-clamp-1">{comp.name}</div>
                    <div className="text-[10px] opacity-75 truncate mt-0.5 font-mono">
                      {comp.formula} · {comp.physicalState}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-85 mt-1.5 pt-1 border-t border-current/10">
                    <span>{comp.bands.length} bandas</span>
                    <span className={`truncate max-w-[95px] ${isSelected ? 'text-[#EFC4BF]' : 'text-[#8E3742]'}`}>
                      {comp.bands.find((b) => b.isKeyBand)?.wavenumber || comp.bands[0]?.wavenumber} cm⁻¹
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Optical Bench + Interferogram + Reversed Spectrum + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Optical Canvas + Interferogram + FTIR Spectrum */}
        <div className="lg:col-span-7 space-y-5">
          {/* Michelson Optical Bench Canvas */}
          <div className="bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-3 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A9C2D2] px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7C957D] animate-ping" />
                INTERFERÓMETRO DE MICHELSON Y CRISTAL ATR EN VIVO
              </span>
              <span className="truncate ml-2">
                <strong className="text-[#EFC4BF]">{selectedCompound.name}</strong>
              </span>
            </div>

            <div className="relative w-full aspect-[16/9] bg-[#071116] rounded-xl overflow-hidden border border-[#162E3B]">
              <canvas ref={canvasRef} width={540} height={270} className="w-full h-full" />
            </div>

            {/* Compact Interferogram I(delta) Sub-Strip */}
            <div className="bg-[#122630] rounded-xl p-2.5 border border-[#1C3947] space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A9C2D2]">
                <span>INTERFEROGRAMA CODIFICADO I(δ) (Dominio del Retardo Óptico)</span>
                <span className="text-[#EFC4BF]">ZPD Centerburst (δ = 0 cm)</span>
              </div>
              <svg viewBox="0 0 460 54" className="w-full h-12">
                <line x1="15" y1="38" x2="445" y2="38" stroke="#1C3947" strokeWidth="1" />
                <line x1="230" y1="6" x2="230" y2="50" stroke="#7696AA" strokeDasharray="2,2" strokeWidth="1" />
                <path
                  d={sim.interferogram
                    .map((pt, idx) => {
                      const x = 15 + (idx / Math.max(1, sim.interferogram.length - 1)) * 430;
                      const y = 38 - Math.max(-0.4, Math.min(1.2, pt.intensity)) * 28;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#A9C2D2"
                  strokeWidth="1.6"
                />
              </svg>
            </div>
          </div>

          {/* Interactive Reversed-Axis FTIR Spectrum (4000 -> 400 cm^-1) */}
          <div className="bg-[#122630] rounded-2xl border border-[#1C3947] p-5 text-[#FAF7EE] space-y-3 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C3947] pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#EFC4BF]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7EE]">
                  Espectro FTIR ({displayMetric === 'transmittance' ? '% Transmitancia ↓' : 'Absorbancia ↑'}) · 4000 → 400 cm⁻¹
                </h4>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  onClick={() => setDisplayMetric('transmittance')}
                  className={`px-2.5 py-0.5 text-[10px] font-mono rounded cursor-pointer border ${
                    displayMetric === 'transmittance'
                      ? 'bg-[#8E3742] text-[#FAF7EE] border-[#EFC4BF]'
                      : 'bg-[#0C1A22] text-[#A9C2D2] border-[#1C3947]'
                  }`}
                >
                  % Transmitancia
                </button>
                <button
                  onClick={() => setDisplayMetric('absorbance')}
                  className={`px-2.5 py-0.5 text-[10px] font-mono rounded cursor-pointer border ${
                    displayMetric === 'absorbance'
                      ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                      : 'bg-[#0C1A22] text-[#A9C2D2] border-[#1C3947]'
                  }`}
                >
                  Absorbancia
                </button>
              </div>
            </div>

            <div className="bg-[#0C1A22] rounded-xl p-2.5 border border-[#1C3947]">
              <svg viewBox="0 0 460 205" className="w-full h-56 overflow-visible">
                {/* Functional Group vs Fingerprint Region Shading */}
                {(() => {
                  const splitX = 38 + ((4000 - 1500) / 3600) * 404; // 1500 cm^-1 divider
                  return (
                    <>
                      <rect
                        x={splitX}
                        y="18"
                        width={442 - splitX}
                        height="140"
                        fill="rgba(169, 194, 210, 0.06)"
                      />
                      <line
                        x1={splitX}
                        y1="18"
                        x2={splitX}
                        y2="158"
                        stroke="#7696AA"
                        strokeDasharray="3,3"
                        strokeWidth="1"
                      />
                      <text x={(38 + splitX) / 2} y="12" textAnchor="middle" fill="#A9C2D2" fontSize="7.5" fontFamily="monospace">
                        Grupos Funcionales (4000–1500)
                      </text>
                      <text x={(splitX + 442) / 2} y="12" textAnchor="middle" fill="#EFC4BF" fontSize="7.5" fontFamily="monospace">
                        Huella Dactilar (1500–400)
                      </text>
                    </>
                  );
                })()}

                {/* Horizontal Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((frac, idx) => {
                  const y = 18 + frac * 140;
                  const labelVal =
                    displayMetric === 'transmittance'
                      ? `${Math.round((1 - frac) * 100)}%`
                      : ((1 - frac) * 2.4).toFixed(1);
                  return (
                    <g key={idx}>
                      <line
                        x1="38"
                        y1={y}
                        x2="442"
                        y2={y}
                        stroke="#1C3947"
                        strokeDasharray={frac === 1 ? undefined : '3,3'}
                        strokeWidth="1"
                      />
                      <text x="33" y={y + 3} textAnchor="end" fill="#A9C2D2" fontSize="8" fontFamily="monospace">
                        {labelVal}
                      </text>
                    </g>
                  );
                })}

                {/* FTIR Spectral Curve */}
                <path
                  d={sim.points
                    .map((pt, idx) => {
                      const x = 38 + ((4000 - pt.wavenumber) / 3600) * 404;
                      const y =
                        displayMetric === 'transmittance'
                          ? 18 + (1 - pt.transmittancePct / 100) * 140
                          : 158 - Math.min(1, pt.absorbance / 2.4) * 140;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={isGlassBlocked ? '#8E3742' : '#7C957D'}
                  strokeWidth="2.3"
                />

                {/* Clickable Vibrational Band Markers */}
                {!isGlassBlocked &&
                  selectedCompound.bands.map((band, idx) => {
                    const x = 38 + ((4000 - band.wavenumber) / 3600) * 404;
                    // Find closest sampled point for exact vertical tip placement
                    const nearest = sim.points.reduce((best, p) =>
                      Math.abs(p.wavenumber - band.wavenumber) < Math.abs(best.wavenumber - band.wavenumber)
                        ? p
                        : best
                    );
                    const y =
                      displayMetric === 'transmittance'
                        ? 18 + (1 - nearest.transmittancePct / 100) * 140
                        : 158 - Math.min(1, nearest.absorbance / 2.4) * 140;
                    const isSelected = activeBand?.wavenumber === band.wavenumber;

                    return (
                      <g
                        key={`${band.wavenumber}-${idx}`}
                        onClick={() => setSelectedBand(band)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 5.5 : band.isKeyBand ? 4 : 3}
                          fill={isSelected ? '#8E3742' : band.isKeyBand ? '#EFC4BF' : '#A9C2D2'}
                          stroke="#FAF7EE"
                          strokeWidth="1.2"
                        />
                        {(band.isKeyBand || isSelected) && (
                          <text
                            x={x}
                            y={displayMetric === 'transmittance' ? Math.min(168, y + 12) : Math.max(14, y - 8)}
                            textAnchor="middle"
                            fill="#EFC4BF"
                            fontSize="7.5"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {band.wavenumber}
                          </text>
                        )}
                      </g>
                    );
                  })}

                {/* Reversed X-Axis Labels (4000 -> 400 cm^-1) */}
                {[4000, 3500, 3000, 2500, 2000, 1500, 1000, 400].map((wn) => {
                  const x = 38 + ((4000 - wn) / 3600) * 404;
                  return (
                    <text
                      key={wn}
                      x={x}
                      y="176"
                      textAnchor="middle"
                      fill="#A9C2D2"
                      fontSize="8.5"
                      fontFamily="monospace"
                    >
                      {wn}
                    </text>
                  );
                })}

                <text x="240" y="194" textAnchor="middle" fill="#A9C2D2" fontSize="8.5" fontFamily="monospace">
                  Número de Onda ν̃ (cm⁻¹) · Eje Descendente Estándar · Haz clic en cualquier pico
                </text>
              </svg>
            </div>

            {/* Active Vibrational Band Inspector */}
            {activeBand && !isGlassBlocked && (
              <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] text-xs space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[#EFC4BF] font-mono">
                  <span className="font-bold">
                    {activeBand.mode} · {activeBand.wavenumber} cm⁻¹
                  </span>
                  <span className="text-[10px] text-[#7C957D]">
                    FWHM ≈ {activeBand.fwhm} cm⁻¹ · Intensidad {Math.round(activeBand.intensity * 100)}%
                  </span>
                </div>
                <p className="text-[11px] text-[#FAF7EE]/85 leading-relaxed">
                  {activeBand.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 cols: FTIR Interferometric & Sampling Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8E3742] flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Control Interferométrico y Muestreo
              </h3>
              <span className="text-[11px] font-mono text-[#7C957D] font-bold">
                SNR {sim.snrEstimate.toLocaleString()}:1
              </span>
            </div>

            {/* Resolution Δν̃ Selector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Resolución Espectral (Δν̃):</span>
                <span className="font-mono text-[#8E3742] font-bold tabular-nums">
                  {resolutionCm} cm⁻¹ (δ = {sim.opdMaxCm.toFixed(2)} cm)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[0.5, 2, 4, 8, 16].map((r) => (
                  <button
                    key={r}
                    onClick={() => setResolutionCm(r)}
                    className={`py-1.5 text-xs rounded-lg font-mono font-bold cursor-pointer transition-colors border ${
                      resolutionCm === r
                        ? 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742]'
                        : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:bg-[#EFE8D3]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-[#1C3947]/70 block">
                0.5 cm⁻¹ resuelve bandas finas (ej. gases rotovibracionales), mientras 4 cm⁻¹ optimiza tiempo y luz J-Stop.
              </span>
            </div>

            {/* Co-added Scans N_scans */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Barridos Co-añadidos (N_scans):</span>
                <span className="font-mono text-[#7C957D] font-bold tabular-nums">
                  {scans} barridos (SNR × {Math.sqrt(scans).toFixed(1)})
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={64}
                step={1}
                value={scans}
                onChange={(e) => setScans(clampNumber(e.target.value, 1, 64))}
                className="w-full accent-[#7C957D] cursor-pointer"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                Acumular más barridos elimina el ruido térmico aleatorio según SNR ∝ √N_scans.
              </span>
            </div>

            {/* Sampling Accessory Mode */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-medium text-[#122630] block">
                Óptica / Accesorio de Muestreo Infrarrojo:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'atr_diamond' as const, label: 'ATR Diamante' },
                  { id: 'kbr_pellet' as const, label: 'Pastilla KBr' },
                  { id: 'glass_window' as const, label: 'Vidrio (Error)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSamplingMode(opt.id)}
                    className={`py-1.5 px-2 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                      samplingMode === opt.id
                        ? opt.id === 'glass_window'
                          ? 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742]'
                          : 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                        : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {isGlassBlocked && (
              <div className="p-3 bg-[#FBF0EF] border border-[#8E3742] rounded-xl text-xs text-[#8E3742] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>¡Error de Material Óptico! Ventana de Vidrio (SiO₂):</strong> El vidrio sódico-cálcico absorbe casi el 100% del IR medio debajo de 3,550 cm⁻¹. Cambia a <strong>ATR Diamante</strong> o <strong>Pastilla KBr</strong> para recuperar el espectro.
                </div>
              </div>
            )}

            {/* Compound Vibrational Summary */}
            <div className="p-3.5 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] space-y-2 text-xs">
              <div className="font-bold text-[#122630] border-b border-[#E2D7BB]/70 pb-1 flex justify-between">
                <span>Asignación de Bandas ({selectedCompound.formula})</span>
                <span className="font-mono text-[#7C957D]">
                  {samplingMode === 'atr_diamond' ? `d_p≈${sim.penetrationUmAt1000} µm` : samplingMode === 'kbr_pellet' ? 'Transmisión KBr' : 'Bloqueado'}
                </span>
              </div>
              <p className="text-[11px] text-[#1C3947]/90 leading-relaxed">
                {selectedCompound.description}
              </p>
              <div className="space-y-1 max-h-44 overflow-y-auto pr-1 pt-1">
                {selectedCompound.bands.map((band, idx) => (
                  <button
                    key={`${band.wavenumber}-${idx}`}
                    onClick={() => setSelectedBand(band)}
                    className={`w-full flex items-center justify-between text-left px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeBand?.wavenumber === band.wavenumber
                        ? 'bg-[#FAEEEE] border border-[#F3D4D6]'
                        : 'hover:bg-[#FAF7EE]'
                    }`}
                  >
                    <span className="font-mono text-[11px] text-[#8E3742] font-bold">
                      {band.wavenumber} cm⁻¹ · {band.mode}
                    </span>
                    <span className="text-[10px] text-[#1C3947]/80 truncate ml-2 max-w-[165px]">
                      {band.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
