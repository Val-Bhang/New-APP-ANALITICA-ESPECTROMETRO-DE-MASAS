import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  NMR_GROUPS_DATA,
  ALL_NMR_COMPOUNDS,
  NmrCompound,
  NmrSignal,
  computeNmrSimulation
} from '../data/nmrCompoundsData';
import { NmrOnboardingGuide } from './NmrOnboardingGuide';
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

export const NmrSimulator: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(NMR_GROUPS_DATA[0].id);
  const [selectedCompound, setSelectedCompound] = useState<NmrCompound>(
    NMR_GROUPS_DATA[0].compounds[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchGlobal, setSearchGlobal] = useState<boolean>(false);

  // Operational NMR Magnetic & RF Parameters
  const [freqMhz, setFreqMhz] = useState<number>(400);
  const [scans, setScans] = useState<number>(16);
  const [shimmedOk, setShimmedOk] = useState<boolean>(true);
  const [solventMode, setSolventMode] = useState<'deuterated' | 'non_deuterated_h2o'>('deuterated');
  const [showTms, setShowTms] = useState<boolean>(true);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [spinPhase, setSpinPhase] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [selectedSignal, setSelectedSignal] = useState<NmrSignal | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeGroup = useMemo(() => {
    return NMR_GROUPS_DATA.find((g) => g.id === selectedGroupId) || NMR_GROUPS_DATA[0];
  }, [selectedGroupId]);

  const sim = useMemo(() => {
    return computeNmrSimulation(
      selectedCompound,
      freqMhz,
      scans,
      shimmedOk,
      solventMode,
      showTms
    );
  }, [selectedCompound, freqMhz, scans, shimmedOk, solventMode, showTms]);

  const activeSignal = useMemo(() => {
    if (
      selectedSignal &&
      selectedCompound.signals.some(
        (s) => Math.abs(s.shiftPpm - selectedSignal.shiftPpm) < 0.001
      )
    ) {
      return selectedSignal;
    }
    return selectedCompound.signals.find((s) => s.isKeySignal) || selectedCompound.signals[0] || null;
  }, [selectedCompound, selectedSignal]);

  const visibleCompounds = useMemo(() => {
    const list = searchGlobal ? ALL_NMR_COMPOUNDS : activeGroup.compounds;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.formula.toLowerCase().includes(q) ||
        c.keyFeatureNote.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [activeGroup, searchGlobal, searchQuery]);

  const handleSelectCompound = (comp: NmrCompound) => {
    setSelectedCompound(comp);
    setSelectedSignal(null);
  };

  const handlePickRandomCompound = () => {
    const idx = Math.floor(Math.random() * ALL_NMR_COMPOUNDS.length);
    const chosen = ALL_NMR_COMPOUNDS[idx];
    const parentGroup = NMR_GROUPS_DATA.find((g) =>
      g.compounds.some((c) => c.id === chosen.id)
    );
    if (parentGroup) setSelectedGroupId(parentGroup.id);
    handleSelectCompound(chosen);
  };

  const handleTriggerNewPulse = () => {
    setSpinPhase(0);
    setIsPlaying(true);
  };

  // Real-time Larmor Precession & Spin Animation Timer
  useEffect(() => {
    if (!isPlaying) return;
    let lastTs = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTs) / 1000);
      lastTs = now;
      setSpinPhase((prev) => prev + dt * (1.8 + freqMhz / 400));
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, freqMhz]);

  // Real-time Superconducting Magnet, Tube, Shims, CryoProbe & Precessing Magnetization Vector Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark superconducting cryostat chamber background
    ctx.fillStyle = '#071116';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle coordinate grid
    ctx.strokeStyle = 'rgba(28, 57, 71, 0.35)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // 1. CRYOSTAT & SUPERCONDUCTING MAGNET B0 HOUSING (Left-Center: x=22..255)
    ctx.fillStyle = '#122630';
    ctx.fillRect(24, 52, 224, 178);
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(24, 52, 224, 178);

    // LN2 77K & LHe 4.2K Dewar inner jackets
    ctx.fillStyle = 'rgba(169, 194, 210, 0.12)';
    ctx.fillRect(34, 62, 204, 158);
    ctx.strokeStyle = '#7C957D';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(46, 74, 180, 134);

    // Wound Nb3Sn coils left and right of bore
    const drawCoilStack = (xPos: number) => {
      for (let row = 0; row < 6; row++) {
        ctx.fillStyle = '#EFC4BF';
        ctx.fillRect(xPos, 90 + row * 18, 22, 12);
        ctx.strokeStyle = '#8E3742';
        ctx.strokeRect(xPos, 90 + row * 18, 22, 12);
      }
    };
    drawCoilStack(64);
    drawCoilStack(186);

    // Shim Coils flanking the central bore
    ctx.strokeStyle = shimmedOk ? '#7C957D' : '#8E3742';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(98, 86, 10, 112);
    ctx.strokeRect(164, 86, 10, 112);

    // Central room-temperature vertical bore + spinning 5 mm NMR tube
    ctx.fillStyle = '#081218';
    ctx.fillRect(122, 40, 28, 196);
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(122, 40, 28, 196);

    // Liquid inside NMR tube
    ctx.fillStyle =
      solventMode === 'deuterated'
        ? 'rgba(124, 149, 125, 0.42)'
        : 'rgba(142, 55, 66, 0.55)';
    ctx.fillRect(124, 115, 24, 118);

    // Top Turbine Spinner rotating
    ctx.fillStyle = '#EFC4BF';
    ctx.fillRect(116, 44, 40, 12);
    const turbineDotX = 136 + Math.cos(spinPhase * 3.5) * 15;
    ctx.fillStyle = '#8E3742';
    ctx.beginPath();
    ctx.arc(turbineDotX, 50, 3, 0, Math.PI * 2);
    ctx.fill();

    // Saddle RF Coil wrapping the sweet spot (y=145..185)
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(117, 145, 38, 42);

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('LHe 4.2 K · Nb₃Sn', 48, 224);
    ctx.fillStyle = '#A9C2D2';
    ctx.fillText(`B₀↑ ${sim.b0Tesla.toFixed(1)} T`, 154, 224);

    // 2. PRECESSING NET MAGNETIZATION M0 & XY COIL FRAME (Center-Right: cx=330, cy=145)
    const cx = 330;
    const cy = 148;
    // Z-axis
    ctx.strokeStyle = '#7696AA';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, 72);
    ctx.lineTo(cx, 206);
    ctx.stroke();
    ctx.setLineDash([]);

    // Transverse XY precession circle
    ctx.strokeStyle = '#1C3947';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 48, 15, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Decaying precession radius simulating T2* relaxation
    const cycleFrac = (spinPhase % 14) / 14;
    const damp = Math.exp(-cycleFrac * (shimmedOk ? 1.4 : 4.8));
    const tiltRad = (Math.PI / 2) * damp;
    const vecLen = 46;
    const tipX = cx + Math.sin(tiltRad) * Math.cos(spinPhase * 4.2) * vecLen;
    const tipY = cy - Math.cos(tiltRad) * vecLen + Math.sin(tiltRad) * Math.sin(spinPhase * 4.2) * 14;

    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();
    ctx.fillStyle = '#8E3742';
    ctx.beginPath();
    ctx.arc(tipX, tipY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('Marco Rotatorio M₀', 278, 62);
    ctx.fillStyle = '#7C957D';
    ctx.fillText(`T₂* = ${(sim.t2StarSec * 1000).toFixed(0)} ms`, 294, 224);

    // 3. RF TRANSCEIVER & QUADRATURE CONSOLE BOX (Far Right: x=412..516)
    ctx.strokeStyle = '#7C957D';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(378, 148);
    ctx.lineTo(416, 148);
    ctx.stroke();

    ctx.fillStyle = '#122630';
    ctx.fillRect(416, 86, 102, 122);
    ctx.strokeStyle = sim.deuteriumLockOk ? '#7C957D' : '#8E3742';
    ctx.lineWidth = 2;
    ctx.strokeRect(416, 86, 102, 122);

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9.5px monospace';
    ctx.fillText('CONSOLA RF', 432, 108);
    ctx.fillStyle = sim.deuteriumLockOk ? '#7C957D' : '#EFC4BF';
    ctx.font = 'bold 8.5px monospace';
    ctx.fillText(sim.deuteriumLockOk ? 'Lock ²H: OK ✓' : 'Lock ²H: FALLA!', 425, 130);
    ctx.fillStyle = shimmedOk ? '#A9C2D2' : '#EFC4BF';
    ctx.fillText(`Shim: ${sim.linewidthHz.toFixed(1)} Hz`, 425, 150);
    ctx.fillStyle = '#FAF7EE';
    ctx.fillText(`Scans: ${scans}`, 425, 170);
    ctx.fillStyle = '#EFC4BF';
    ctx.fillText(`SNR: ${sim.snrEstimate}:1`, 425, 190);

    // Telemetry header banner
    ctx.fillStyle = '#EFC4BF';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(
      `ν₀(¹H) = ${freqMhz} MHz  |  B₀ = ${sim.b0Tesla.toFixed(2)} T  |  Solvente: ${
        solventMode === 'deuterated' ? selectedCompound.defaultSolvent : 'H₂O (No Deuterado)'
      }`,
      18,
      26
    );
  }, [spinPhase, freqMhz, scans, shimmedOk, solventMode, selectedCompound, sim]);

  const isSolventError = solventMode === 'non_deuterated_h2o';

  return (
    <div className="w-full space-y-6">
      {/* Header and overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Laboratorio Virtual RMN (Resonancia Magnética Nuclear)</span>
            <span aria-hidden="true">·</span>
            <span>{ALL_NMR_COMPOUNDS.length} Espectros ¹H Calibrados</span>
            <span aria-hidden="true">·</span>
            <span>{NMR_GROUPS_DATA.length} Familias Orgánicas y Bioquímicas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Simulador de Haz RF RMN &amp; Espectro ¹H (12.5 → 0.0 ppm)
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Controla el campo del imán superconductor (60–800 MHz), el shimming (T₂*), los barridos acumulados y el solvente deuterado para analizar desplazamientos químicos δ, integrales y acoplamiento J (n+1).
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
            <span>{isPlaying ? 'Pausar Precesión' : 'Reanudar'}</span>
          </button>
          <button
            onClick={handleTriggerNewPulse}
            className="px-3 py-1.5 text-xs font-medium text-[#8E3742] bg-[#FAF7EE] hover:bg-[#FAEEEE] border border-[#E2D7BB] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nuevo Pulso 90°</span>
          </button>
        </div>
      </div>

      {/* Onboarding Guide */}
      {showGuide && (
        <NmrOnboardingGuide
          onClose={() => setShowGuide(false)}
          onStartSimulation={() => setShowGuide(false)}
        />
      )}

      {/* 12 Chemical Families Library (120 Compounds) */}
      <div className="bg-[#FAF7EE] rounded-2xl p-5 border border-[#E2D7BB] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-3">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-[#8E3742]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#122630]">
              Biblioteca ¹H RMN: {NMR_GROUPS_DATA.length} Familias Químicas ({ALL_NMR_COMPOUNDS.length} Compuestos)
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
                    ? `Buscar en ${ALL_NMR_COMPOUNDS.length} compuestos...`
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
                ? `Todos (${ALL_NMR_COMPOUNDS.length})`
                : `Grupo (${activeGroup.compounds.length})`}
            </button>
          </div>
        </div>

        {/* 12 Groups Tabs Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5">
          {NMR_GROUPS_DATA.map((group, idx) => {
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
              Grupo: {activeGroup.name} · Zona δ: {activeGroup.chemicalShiftZone}
            </span>
            <span className="text-[#7C957D]">¹H RMN 1D</span>
          </div>
          <p className="text-[11px] text-[#1C3947]/90 leading-relaxed font-mono">
            <strong className="text-[#122630] font-sans">Firma Espectral Clave: </strong>
            {activeGroup.couplingSignature}
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
              Activa: <strong>{selectedCompound.name}</strong> ({selectedCompound.formula}) · Solvente {selectedCompound.defaultSolvent}
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
                      {comp.formula} · {comp.defaultSolvent}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-85 mt-1.5 pt-1 border-t border-current/10">
                    <span>{comp.signals.length} señales</span>
                    <span className={isSelected ? 'text-[#EFC4BF]' : 'text-[#8E3742]'}>
                      {(comp.signals.find((s) => s.isKeySignal) || comp.signals[0])?.shiftPpm.toFixed(2)} ppm
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Superconducting Probe Canvas + FID + 1H NMR Spectrum + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Magnet/Spin Canvas + FID + Reversed 1H NMR Spectrum */}
        <div className="lg:col-span-7 space-y-5">
          {/* Magnet & Spin Vector Canvas */}
          <div className="bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-3 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A9C2D2] px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7C957D] animate-ping" />
                IMÁN SUPERCONDUCTOR B₀, SONDA RF Y PRECESIÓN DE LARMOR
              </span>
              <span className="truncate ml-2">
                <strong className="text-[#EFC4BF]">{selectedCompound.name}</strong>
              </span>
            </div>

            <div className="relative w-full aspect-[16/9] bg-[#071116] rounded-xl overflow-hidden border border-[#162E3B]">
              <canvas ref={canvasRef} width={540} height={260} className="w-full h-full" />
            </div>

            {/* Compact FID S(t) Time-Domain Decay Sub-Strip */}
            <div className="bg-[#122630] rounded-xl p-2.5 border border-[#1C3947] space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A9C2D2]">
                <span>DECAIMIENTO LIBRE DE INDUCCIÓN — FID S(t) (Dominio del Tiempo)</span>
                <span className="text-[#EFC4BF]">
                  T₂* = {(sim.t2StarSec * 1000).toFixed(0)} ms ({shimmedOk ? 'Largo ✓' : 'Colapso Rápido ⚠'})
                </span>
              </div>
              <svg viewBox="0 0 460 54" className="w-full h-12">
                <line x1="15" y1="27" x2="445" y2="27" stroke="#1C3947" strokeWidth="1" />
                <path
                  d={sim.fid
                    .map((pt, idx) => {
                      const x = 15 + (idx / Math.max(1, sim.fid.length - 1)) * 430;
                      const y = 27 - pt.amplitude * 22;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={isSolventError ? '#8E3742' : '#A9C2D2'}
                  strokeWidth="1.6"
                />
              </svg>
            </div>
          </div>

          {/* Interactive Reversed-Axis 1H NMR Spectrum (12.5 -> -0.5 ppm) */}
          <div className="bg-[#122630] rounded-2xl border border-[#1C3947] p-5 text-[#FAF7EE] space-y-3 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C3947] pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#EFC4BF]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7EE]">
                  Espectro ¹H RMN ({freqMhz} MHz) · Escala IUPAC δ: 12.5 → 0.0 ppm
                </h4>
              </div>

              <button
                onClick={() => setShowTms(!showTms)}
                className={`px-2.5 py-0.5 text-[10px] font-mono rounded cursor-pointer border self-start sm:self-auto ${
                  showTms
                    ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                    : 'bg-[#0C1A22] text-[#A9C2D2] border-[#1C3947]'
                }`}
              >
                {showTms ? '✓ Referencia TMS (0.00 ppm)' : '+ Añadir TMS (0.00 ppm)'}
              </button>
            </div>

            <div className="bg-[#0C1A22] rounded-xl p-2.5 border border-[#1C3947]">
              <svg viewBox="0 0 460 205" className="w-full h-56 overflow-visible">
                {/* Chemical Shift Zone Shading (Aromatic 6.5-8.5 ppm) */}
                {(() => {
                  const xLeftAr = 38 + ((12.5 - 8.5) / 13.0) * 404;
                  const xRightAr = 38 + ((12.5 - 6.5) / 13.0) * 404;
                  return (
                    <>
                      <rect
                        x={xLeftAr}
                        y="18"
                        width={xRightAr - xLeftAr}
                        height="140"
                        fill="rgba(239, 196, 191, 0.07)"
                      />
                      <text x={(xLeftAr + xRightAr) / 2} y="12" textAnchor="middle" fill="#EFC4BF" fontSize="7.5" fontFamily="monospace">
                        Aromáticos (8.5–6.5)
                      </text>
                      <text x={38 + ((12.5 - 10.5) / 13.0) * 404} y="12" textAnchor="middle" fill="#A9C2D2" fontSize="7.5" fontFamily="monospace">
                        COOH / CHO
                      </text>
                      <text x={38 + ((12.5 - 2.5) / 13.0) * 404} y="12" textAnchor="middle" fill="#7C957D" fontSize="7.5" fontFamily="monospace">
                        α-X / Alifáticos (4.5–0)
                      </text>
                    </>
                  );
                })()}

                {/* Baseline & Grid */}
                <line x1="38" y1="158" x2="442" y2="158" stroke="#1C3947" strokeWidth="1.2" />
                {[0.25, 0.5, 0.75, 1].map((frac, idx) => {
                  const y = 158 - frac * 136;
                  return (
                    <line
                      key={idx}
                      x1="38"
                      y1={y}
                      x2="442"
                      y2={y}
                      stroke="#1C3947"
                      strokeDasharray="3,3"
                      strokeWidth="0.8"
                    />
                  );
                })}

                {/* 1H NMR Lorentzian Multiplet Curve */}
                <path
                  d={sim.points
                    .map((pt, idx) => {
                      const x = 38 + ((12.5 - pt.ppm) / 13.0) * 404;
                      const y = 158 - Math.min(1.02, pt.intensity) * 136;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={isSolventError ? '#8E3742' : '#7C957D'}
                  strokeWidth="2"
                />

                {/* Clickable Signal Markers */}
                {!isSolventError &&
                  selectedCompound.signals.map((sig, idx) => {
                    const x = 38 + ((12.5 - sig.shiftPpm) / 13.0) * 404;
                    const nearest = sim.points.reduce((best, p) =>
                      Math.abs(p.ppm - sig.shiftPpm) < Math.abs(best.ppm - sig.shiftPpm) ? p : best
                    );
                    const y = 158 - Math.min(1.02, nearest.intensity) * 136;
                    const isSelected = activeSignal && Math.abs(activeSignal.shiftPpm - sig.shiftPpm) < 0.001;

                    return (
                      <g
                        key={`${sig.shiftPpm}-${idx}`}
                        onClick={() => setSelectedSignal(sig)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 5 : sig.isKeySignal ? 3.8 : 2.8}
                          fill={isSelected ? '#8E3742' : sig.isKeySignal ? '#EFC4BF' : '#A9C2D2'}
                          stroke="#FAF7EE"
                          strokeWidth="1.2"
                        />
                        {(sig.isKeySignal || isSelected) && (
                          <text
                            x={x}
                            y={Math.max(24, y - 8)}
                            textAnchor="middle"
                            fill="#EFC4BF"
                            fontSize="7.5"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {sig.shiftPpm.toFixed(2)} ({sig.multiplicity})
                          </text>
                        )}
                      </g>
                    );
                  })}

                {/* Reversed X-Axis ppm Ticks (12 -> 0 ppm) */}
                {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((ppmTick) => {
                  const x = 38 + ((12.5 - ppmTick) / 13.0) * 404;
                  return (
                    <g key={ppmTick}>
                      <line x1={x} y1="158" x2={x} y2="162" stroke="#A9C2D2" strokeWidth="1" />
                      <text
                        x={x}
                        y="174"
                        textAnchor="middle"
                        fill="#A9C2D2"
                        fontSize="8.5"
                        fontFamily="monospace"
                      >
                        {ppmTick}
                      </text>
                    </g>
                  );
                })}

                <text x="240" y="192" textAnchor="middle" fill="#A9C2D2" fontSize="8.5" fontFamily="monospace">
                  Desplazamiento Químico δ (ppm) · Campo Bajo (Izquierda) → Campo Alto / TMS (Derecha)
                </text>
              </svg>
            </div>

            {/* Active Signal Inspector */}
            {activeSignal && !isSolventError && (
              <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] text-xs space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[#EFC4BF] font-mono">
                  <span className="font-bold">
                    {activeSignal.assignment} · δ = {activeSignal.shiftPpm.toFixed(2)} ppm ({activeSignal.multiplicity}, {activeSignal.protons}H)
                  </span>
                  <span className="text-[10px] text-[#7C957D]">
                    {activeSignal.jHz > 0 ? `J = ${activeSignal.jHz.toFixed(1)} Hz` : 'Singulete sin acoplamiento J'}
                  </span>
                </div>
                <p className="text-[11px] text-[#FAF7EE]/85 leading-relaxed">
                  {activeSignal.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 cols: Magnetic Field, Shimming, Scans & Solvent Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8E3742] flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Control Superconductor y Consola RF
              </h3>
              <span className="text-[11px] font-mono text-[#7C957D] font-bold">
                B₀ = {sim.b0Tesla.toFixed(1)} T
              </span>
            </div>

            {/* Larmor Frequency ν0 Selector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Frecuencia del Espectrómetro (ν₀ ¹H):</span>
                <span className="font-mono text-[#8E3742] font-bold tabular-nums">
                  {freqMhz} MHz ({sim.b0Tesla.toFixed(1)} T)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[60, 300, 400, 600, 800].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFreqMhz(f)}
                    className={`py-1.5 text-xs rounded-lg font-mono font-bold cursor-pointer transition-colors border ${
                      freqMhz === f
                        ? 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742]'
                        : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:bg-[#EFE8D3]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-[#1C3947]/70 block">
                Comparar 60 MHz (sobremesa) vs 600–800 MHz (superconductor) revela cómo campos B₀ altos separan multipletes traslapados.
              </span>
            </div>

            {/* Co-added Scans N_scans */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Barridos Acumulados (N_scans):</span>
                <span className="font-mono text-[#7C957D] font-bold tabular-nums">
                  {scans} pulsos (SNR {sim.snrEstimate}:1)
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
                Sumar FID repetidos incrementa la sensibilidad proporcionalmente a √N_scans.
              </span>
            </div>

            {/* Shimming & Deuterium Solvent Toggles */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-[#122630] block">Homogeneidad (Shims):</span>
                <button
                  onClick={() => setShimmedOk(!shimmedOk)}
                  className={`w-full py-1.5 px-2 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                    shimmedOk
                      ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                      : 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742]'
                  }`}
                >
                  {shimmedOk ? 'Shims Óptimos (0.5 Hz)' : 'Sin Shim (18 Hz) ⚠'}
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-medium text-[#122630] block">Solvente y Lock ²H:</span>
                <button
                  onClick={() =>
                    setSolventMode(solventMode === 'deuterated' ? 'non_deuterated_h2o' : 'deuterated')
                  }
                  className={`w-full py-1.5 px-2 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                    solventMode === 'deuterated'
                      ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                      : 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742]'
                  }`}
                >
                  {solventMode === 'deuterated' ? `${selectedCompound.defaultSolvent} (Lock ✓)` : 'H₂O Normal (Error)'}
                </button>
              </div>
            </div>

            {isSolventError && (
              <div className="p-3 bg-[#FBF0EF] border border-[#8E3742] rounded-xl text-xs text-[#8E3742] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>¡Error de Solvente No Deuterado (H₂O 110 M)!</strong> La señal gigantesca del agua normal en 4.79 ppm satura el receptor ADC, anula el Lock de deuterio (²H) y oculta al analito. Vuelve a <strong>{selectedCompound.defaultSolvent}</strong>.
                </div>
              </div>
            )}

            {/* Proton Signal Integration Table */}
            <div className="p-3.5 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] space-y-2 text-xs">
              <div className="font-bold text-[#122630] border-b border-[#E2D7BB]/70 pb-1 flex justify-between">
                <span>Tabla de Señales ¹H e Integrales ({selectedCompound.formula})</span>
                <span className="font-mono text-[#7C957D]">
                  Total {selectedCompound.signals.reduce((acc, s) => acc + s.protons, 0)}H
                </span>
              </div>
              <p className="text-[11px] text-[#1C3947]/90 leading-relaxed">
                {selectedCompound.description}
              </p>
              <div className="space-y-1 max-h-44 overflow-y-auto pr-1 pt-1">
                {selectedCompound.signals.map((sig, idx) => {
                  const isActive = activeSignal && Math.abs(activeSignal.shiftPpm - sig.shiftPpm) < 0.001;
                  return (
                    <button
                      key={`${sig.shiftPpm}-${idx}`}
                      onClick={() => setSelectedSignal(sig)}
                      className={`w-full flex items-center justify-between text-left px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#FAEEEE] border border-[#F3D4D6]'
                          : 'hover:bg-[#FAF7EE]'
                      }`}
                    >
                      <span className="font-mono text-[11px] text-[#8E3742] font-bold">
                        {sig.shiftPpm.toFixed(2)} ppm · {sig.multiplicity} ({sig.protons}H)
                      </span>
                      <span className="text-[10px] text-[#1C3947]/80 truncate ml-2 max-w-[155px]">
                        {sig.assignment} {sig.jHz > 0 ? `· J=${sig.jHz}Hz` : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
