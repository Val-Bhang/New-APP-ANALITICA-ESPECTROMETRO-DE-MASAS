import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  GC_GROUPS_DATA,
  ALL_GC_COMPOUNDS,
  GcCompound,
  CarrierGasType,
  OvenProgramMode,
  ColumnPhaseType,
  InjectionModeType,
  GcDetectorType,
  computeGcSimulation
} from '../data/gcCompoundsData';
import { GcOnboardingGuide } from './GcOnboardingGuide';
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
  Flame,
  AlertTriangle
} from 'lucide-react';

export const GcSimulator: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(GC_GROUPS_DATA[1].id);
  const [selectedCompound, setSelectedCompound] = useState<GcCompound>(
    GC_GROUPS_DATA[1].compounds[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchGlobal, setSearchGlobal] = useState<boolean>(false);

  // Operational GC Pneumatic, Thermal, Column & Detector Controls
  const [carrierGas, setCarrierGas] = useState<CarrierGasType>('He');
  const [ovenMode, setOvenMode] = useState<OvenProgramMode>('ramp');
  const [columnPhase, setColumnPhase] = useState<ColumnPhaseType>('DB-5ms');
  const [injectionMode, setInjectionMode] = useState<InjectionModeType>('split');
  const [detectorType, setDetectorType] = useState<GcDetectorType>('FID');
  const [flowMlMin, setFlowMlMin] = useState<number>(1.2);
  const [rampRateCMin, setRampRateCMin] = useState<number>(12);
  const [showOvenTempLine, setShowOvenTempLine] = useState<boolean>(true);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [runProgressMin, setRunProgressMin] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeGroup = useMemo(() => {
    return GC_GROUPS_DATA.find((g) => g.id === selectedGroupId) || GC_GROUPS_DATA[0];
  }, [selectedGroupId]);

  const sim = useMemo(() => {
    return computeGcSimulation(
      selectedCompound,
      carrierGas,
      ovenMode,
      columnPhase,
      injectionMode,
      detectorType,
      flowMlMin,
      rampRateCMin
    );
  }, [
    selectedCompound,
    carrierGas,
    ovenMode,
    columnPhase,
    injectionMode,
    detectorType,
    flowMlMin,
    rampRateCMin
  ]);

  const visibleCompounds = useMemo(() => {
    const list = searchGlobal ? ALL_GC_COMPOUNDS : activeGroup.compounds;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.formula.toLowerCase().includes(q) ||
        c.companionName.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [activeGroup, searchGlobal, searchQuery]);

  const handleSelectCompound = (comp: GcCompound) => {
    setSelectedCompound(comp);
    setRunProgressMin(0);
    setIsPlaying(true);
  };

  const handlePickRandomCompound = () => {
    const idx = Math.floor(Math.random() * ALL_GC_COMPOUNDS.length);
    const chosen = ALL_GC_COMPOUNDS[idx];
    const parentGroup = GC_GROUPS_DATA.find((g) => g.compounds.some((c) => c.id === chosen.id));
    if (parentGroup) setSelectedGroupId(parentGroup.id);
    handleSelectCompound(chosen);
  };

  // Real-time chromatogram elution progress timer (0..22 min loop)
  useEffect(() => {
    if (!isPlaying) return;
    let lastTs = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTs) / 1000);
      lastTs = now;
      setRunProgressMin((prev) => {
        const next = prev + dt * 2.1;
        return next > 22 ? 0 : next;
      });
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  // Real-time Gas Chromatograph Animated Schematic Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background chamber
    ctx.fillStyle = '#071116';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(28, 57, 71, 0.35)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    const currentOvenTempC =
      ovenMode === 'ramp'
        ? Math.min(320, 45 + Math.max(0, runProgressMin - 1.0) * rampRateCMin)
        : 120;

    // 1. CARRIER GAS CYLINDER + TRAPS + EPC (x: 18..148)
    ctx.fillStyle = '#122630';
    ctx.fillRect(18, 65, 34, 130);
    ctx.strokeStyle = '#7C957D';
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 65, 34, 130);
    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(carrierGas, 26, 132);

    // EPC Proportional Block
    ctx.fillStyle = '#1C3947';
    ctx.fillRect(72, 92, 66, 48);
    ctx.strokeStyle = injectionMode === 'septum_leak' ? '#8E3742' : '#EFC4BF';
    ctx.strokeRect(72, 92, 66, 48);
    ctx.fillStyle = '#EFC4BF';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('EPC/AFC', 84, 112);
    ctx.fillStyle = '#A9C2D2';
    ctx.fillText(`${flowMlMin.toFixed(1)} mL/m`, 77, 128);

    // Gas line from cylinder -> EPC -> Inlet
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(52, 116);
    ctx.lineTo(72, 116);
    ctx.moveTo(138, 116);
    ctx.lineTo(175, 116);
    ctx.stroke();

    // 2. SPLIT / SPLITLESS HEATED INJECTOR (x: 175..238)
    ctx.fillStyle = '#122630';
    ctx.fillRect(175, 62, 62, 118);
    ctx.strokeStyle = injectionMode === 'septum_leak' ? '#8E3742' : '#EFC4BF';
    ctx.lineWidth = 2;
    ctx.strokeRect(175, 62, 62, 118);

    // Septum & Syringe Plunger Pulse
    ctx.fillStyle = injectionMode === 'septum_leak' ? '#8E3742' : '#7C957D';
    ctx.fillRect(186, 62, 40, 8);
    if (runProgressMin < 1.2) {
      ctx.fillStyle = 'rgba(239, 196, 191, 0.65)';
      ctx.beginPath();
      ctx.arc(206, 115, 10 + Math.sin(runProgressMin * 10) * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Septum Leak O2 sparks
    if (injectionMode === 'septum_leak') {
      ctx.fillStyle = '#8E3742';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('FUGA O₂!', 180, 52);
    } else {
      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(injectionMode === 'split' ? 'SPLIT 50:1' : 'SPLITLESS', 177, 52);
    }
    ctx.fillStyle = '#EFC4BF';
    ctx.fillText('280 °C', 188, 195);

    // 3. CAPILLARY COLUMN IN PROGRAMMABLE OVEN (x: 268..470)
    const heatFrac = Math.min(1, Math.max(0, (currentOvenTempC - 40) / 280));
    const ovenBgR = Math.round(14 + heatFrac * 68);
    const ovenBgG = Math.round(28 + heatFrac * 14);
    const ovenBgB = Math.round(38 - heatFrac * 10);
    ctx.fillStyle = `rgb(${ovenBgR}, ${ovenBgG}, ${ovenBgB})`;
    ctx.fillRect(268, 42, 200, 178);
    ctx.strokeStyle = heatFrac > 0.55 ? '#8E3742' : '#A9C2D2';
    ctx.lineWidth = 2.2;
    ctx.strokeRect(268, 42, 200, 178);

    // Coiled Capillary rings
    const coilX = 368;
    const coilY = 128;
    [54, 48, 42].forEach((r, idx) => {
      ctx.strokeStyle = idx === 1 ? '#EFC4BF' : columnPhase === 'DB-Wax' ? '#A9C2D2' : '#7C957D';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.arc(coilX, coilY, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Gas plug progress along column coil (Analyte & Companion bands)
    const progAnalyte = Math.min(1.05, runProgressMin / Math.max(0.2, sim.tRAnalyte));
    const progComp = Math.min(1.05, runProgressMin / Math.max(0.2, sim.tRCompanion));

    if (progAnalyte > 0.02 && progAnalyte < 1.0) {
      const ang = progAnalyte * Math.PI * 4;
      const px = coilX + Math.cos(ang) * 48;
      const py = coilY + Math.sin(ang) * 48;
      ctx.fillStyle = '#EFC4BF';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    if (progComp > 0.02 && progComp < 1.0) {
      const ang2 = progComp * Math.PI * 4;
      const cx2 = coilX + Math.cos(ang2) * 42;
      const cy2 = coilY + Math.sin(ang2) * 42;
      ctx.fillStyle = '#7C957D';
      ctx.beginPath();
      ctx.arc(cx2, cy2, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Line from Inlet -> Oven -> Detector
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(237, 130);
    ctx.lineTo(314, 130);
    ctx.moveTo(422, 130);
    ctx.lineTo(506, 130);
    ctx.stroke();

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`HORNO: ${currentOvenTempC.toFixed(0)} °C`, 322, 60);
    ctx.fillStyle = '#A9C2D2';
    ctx.fillText(`${columnPhase} · 30 m`, 326, 206);

    // 4. DETECTOR (FID FLAME vs TCD BRIDGE) (x: 506..620)
    ctx.fillStyle = '#122630';
    ctx.fillRect(506, 56, 114, 152);
    ctx.strokeStyle = '#7C957D';
    ctx.lineWidth = 2;
    ctx.strokeRect(506, 56, 114, 152);

    const analyteArriving = Math.abs(runProgressMin - sim.tRAnalyte) < 0.45;
    const compArriving = Math.abs(runProgressMin - sim.tRCompanion) < 0.45;
    const flameBoost = analyteArriving || compArriving ? 14 : 0;

    if (detectorType === 'FID') {
      // Quartz jet + Hydrogen-air Flame
      ctx.fillStyle = '#A9C2D2';
      ctx.fillRect(556, 152, 14, 42);
      ctx.fillStyle = analyteArriving ? '#EFC4BF' : '#A9C2D2';
      ctx.beginPath();
      ctx.moveTo(553, 152);
      ctx.quadraticCurveTo(563, 112 - flameBoost, 573, 152);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('LLAMA FID H₂', 524, 76);
      ctx.fillStyle = '#7C957D';
      ctx.fillText(analyteArriving ? '¡ION CHO⁺!' : 'I_base < 1 pA', 526, 94);
    } else {
      // TCD Wheatstone filament
      ctx.strokeStyle = analyteArriving ? '#8E3742' : '#EFC4BF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(526, 130);
      ctx.lineTo(540, 116);
      ctx.lineTo(555, 144);
      ctx.lineTo(570, 116);
      ctx.lineTo(585, 144);
      ctx.lineTo(600, 130);
      ctx.stroke();
      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('PUENTE TCD', 530, 76);
      ctx.fillStyle = '#A9C2D2';
      ctx.fillText(analyteArriving ? 'Δk TÉRMICO' : 'Flujo Ref. He', 524, 94);
    }

    // Elapsed time bar
    ctx.fillStyle = '#A9C2D2';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`t = ${runProgressMin.toFixed(1)} / 22.0 min`, 510, 232);
    ctx.fillText(`ū = ${sim.linearVelocityCms} cm/s (t_M ${sim.tM} min)`, 18, 232);
  }, [
    carrierGas,
    ovenMode,
    columnPhase,
    injectionMode,
    detectorType,
    flowMlMin,
    rampRateCMin,
    runProgressMin,
    sim
  ]);

  // Build SVG chromatogram geometry (X: 0..22 min)
  const svgWidth = 680;
  const svgHeight = 250;
  const padL = 46;
  const padR = 46;
  const padT = 22;
  const padB = 34;
  const plotW = svgWidth - padL - padR;
  const plotH = svgHeight - padT - padB;

  const maxSignal = useMemo(() => {
    const peakMax = Math.max(100, ...sim.points.map((p) => p.signalMv));
    return Math.ceil(peakMax * 1.12);
  }, [sim.points]);

  const toX = (tMin: number) => padL + (tMin / 22) * plotW;
  const toY = (sig: number) => padT + plotH - (sig / maxSignal) * plotH;
  const toTempY = (tempC: number) => padT + plotH - ((tempC - 30) / 300) * plotH;

  const chromPathD = useMemo(() => {
    return sim.points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.timeMin).toFixed(1)} ${toY(p.signalMv).toFixed(1)}`)
      .join(' ');
  }, [sim.points, maxSignal]);

  const tempPathD = useMemo(() => {
    return sim.points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.timeMin).toFixed(1)} ${toTempY(p.ovenTempC).toFixed(1)}`)
      .join(' ');
  }, [sim.points]);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Simulador de Cromatografía de Gases (GC)</span>
            <span aria-hidden="true">·</span>
            <span>{ALL_GC_COMPOUNDS.length} Volátiles &amp; Semivolátiles</span>
            <span aria-hidden="true">·</span>
            <span>Curvas de Golay, Rampas e Índices Kováts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Simulador de Haz y Cromatografía Capilar GC
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-2xl mt-1">
            Experimenta con Helio, Hidrógeno o Nitrógeno, alterna columnas DB-5ms (apolar) y DB-Wax (polar), compara horno isotérmico vs rampa térmica y detectores FID vs TCD en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border ${
              showGuide
                ? 'bg-[#122630] text-[#FAF7EE] border-[#122630]'
                : 'bg-[#FAF7EE] text-[#122630] hover:bg-[#EFE8D3] border-[#E2D7BB]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8E3742]" />
            <span>{showGuide ? 'Ocultar Paso a Paso' : 'Paso a Paso Inicial'}</span>
          </button>

          <button
            onClick={handlePickRandomCompound}
            className="px-4 py-2 text-xs font-semibold text-[#FAF7EE] bg-[#8E3742] hover:bg-[#742B34] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Analito Aleatorio (120)</span>
          </button>
        </div>
      </div>

      {/* Onboarding Guide */}
      {showGuide && <GcOnboardingGuide onClose={() => setShowGuide(false)} />}

      {/* Main Split Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 12 Chemical Families & 120 Compounds */}
        <div className="lg:col-span-4 bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-4 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-2">
            <h3 className="text-sm font-bold text-[#122630] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#8E3742]" />
              Biblioteca GC (12 Grupos × 10)
            </h3>
            <span className="text-[11px] font-mono text-[#7C957D] font-bold">
              {ALL_GC_COMPOUNDS.length} compuestos
            </span>
          </div>

          {/* Search Bar with maxLength={60} */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#1C3947]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={60}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar analito, fórmula o acompañante..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#FFFDF9] border border-[#E2D7BB] rounded-xl text-xs text-[#122630] focus:outline-none focus:border-[#8E3742]"
              />
            </div>

            <label className="flex items-center gap-2 text-[11px] text-[#1C3947] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={searchGlobal}
                onChange={(e) => setSearchGlobal(e.target.checked)}
                className="accent-[#8E3742]"
              />
              <span>Buscar en los 120 compuestos globales</span>
            </label>
          </div>

          {/* 12 Groups Selector */}
          {!searchGlobal && (
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {GC_GROUPS_DATA.map((grp) => {
                const isActive = grp.id === selectedGroupId;
                return (
                  <button
                    key={grp.id}
                    onClick={() => {
                      setSelectedGroupId(grp.id);
                      handleSelectCompound(grp.compounds[0]);
                    }}
                    className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] shadow-sm'
                        : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:bg-[#EFE8D3]'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[#EFC4BF] font-bold">
                      {isActive ? grp.badge : <span className="text-[#8E3742]">{grp.badge}</span>}
                    </div>
                    <div className="text-[11px] font-semibold leading-tight truncate mt-0.5">
                      {grp.name.split('. ')[1] || grp.name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Compounds List */}
          <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1 border-t border-[#E2D7BB] pt-3">
            <div className="text-[11px] font-mono text-[#1C3947]/70 mb-1">
              {searchGlobal ? 'Resultados Globales' : activeGroup.name}: ({visibleCompounds.length})
            </div>

            {visibleCompounds.map((comp) => {
              const isSelected = selectedCompound.id === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelectCompound(comp)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742] shadow-sm'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:border-[#8E3742]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold truncate">{comp.name}</span>
                    <span
                      className={`text-[10px] font-mono shrink-0 ${
                        isSelected ? 'text-[#EFC4BF]' : 'text-[#8E3742]'
                      }`}
                    >
                      pe {comp.bpC} °C
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between text-[10px] font-mono mt-0.5 ${
                      isSelected ? 'text-[#FAF7EE]/85' : 'text-[#1C3947]/70'
                    }`}
                  >
                    <span>{comp.formula} · RI {comp.kovatsDb5}</span>
                    <span>vs {comp.companionName}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live GC Canvas, Controls, Chrom SVG & Telemetry */}
        <div className="lg:col-span-8 space-y-5">
          {/* Animated GC Train Viewport */}
          <div className="bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-4 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A9C2D2] border-b border-[#1C3947] pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C957D] animate-pulse" />
                <span className="text-[#FAF7EE] font-bold">
                  {selectedCompound.name} ({selectedCompound.formula})
                </span>
                <span className="text-[#EFC4BF]">· + {selectedCompound.companionName}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-2.5 py-1 rounded-lg bg-[#122630] hover:bg-[#1C3947] text-[#FAF7EE] flex items-center gap-1 cursor-pointer border border-[#1C3947]"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pausar' : 'Reanudar'}</span>
                </button>
                <button
                  onClick={() => {
                    setRunProgressMin(0);
                    setIsPlaying(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#8E3742] hover:bg-[#742B34] text-[#FAF7EE] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-inyectar 1 µL</span>
                </button>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={244}
              className="w-full h-56 rounded-xl border border-[#1C3947] bg-[#071116]"
            />

            {/* Method Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 text-xs">
              {/* Carrier Gas */}
              <div className="bg-[#122630] p-2.5 rounded-xl border border-[#1C3947] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#A9C2D2] font-bold block">
                  Gas Portador (Curva Golay)
                </span>
                <div className="flex gap-1">
                  {(['He', 'H2', 'N2'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setCarrierGas(g)}
                      className={`flex-1 py-1 rounded-lg font-mono text-[11px] font-bold cursor-pointer ${
                        carrierGas === g ? 'bg-[#8E3742] text-[#FAF7EE]' : 'bg-[#0C1A22] text-[#A9C2D2]'
                      }`}
                    >
                      {g === 'H2' ? 'H₂' : g === 'N2' ? 'N₂' : 'He'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Column Phase */}
              <div className="bg-[#122630] p-2.5 rounded-xl border border-[#1C3947] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#A9C2D2] font-bold block">
                  Fase Estacionaria Capilar
                </span>
                <div className="flex gap-1">
                  {(['DB-5ms', 'DB-Wax'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setColumnPhase(p)}
                      className={`flex-1 py-1 rounded-lg font-mono text-[11px] font-bold cursor-pointer ${
                        columnPhase === p ? 'bg-[#7C957D] text-[#FAF7EE]' : 'bg-[#0C1A22] text-[#A9C2D2]'
                      }`}
                    >
                      {p === 'DB-5ms' ? 'DB-5ms (Apolar)' : 'DB-Wax (Polar)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Oven Program */}
              <div className="bg-[#122630] p-2.5 rounded-xl border border-[#1C3947] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#A9C2D2] font-bold block">
                  Programa de Horno
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setOvenMode('ramp')}
                    className={`flex-1 py-1 rounded-lg font-mono text-[11px] font-bold cursor-pointer ${
                      ovenMode === 'ramp' ? 'bg-[#8E3742] text-[#FAF7EE]' : 'bg-[#0C1A22] text-[#A9C2D2]'
                    }`}
                  >
                    Rampa 45→315°C
                  </button>
                  <button
                    onClick={() => setOvenMode('isothermal')}
                    className={`flex-1 py-1 rounded-lg font-mono text-[11px] font-bold cursor-pointer ${
                      ovenMode === 'isothermal' ? 'bg-[#EFC4BF] text-[#122630]' : 'bg-[#0C1A22] text-[#A9C2D2]'
                    }`}
                  >
                    Isotérm. 120°C
                  </button>
                </div>
              </div>

              {/* Injection Mode */}
              <div className="bg-[#122630] p-2.5 rounded-xl border border-[#1C3947] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#A9C2D2] font-bold block">
                  Inyector &amp; Estado Septum
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setInjectionMode('split')}
                    className={`flex-1 py-1 rounded-lg font-mono text-[10px] font-bold cursor-pointer ${
                      injectionMode === 'split' ? 'bg-[#7C957D] text-[#FAF7EE]' : 'bg-[#0C1A22] text-[#A9C2D2]'
                    }`}
                  >
                    Split 50:1
                  </button>
                  <button
                    onClick={() => setInjectionMode('splitless')}
                    className={`flex-1 py-1 rounded-lg font-mono text-[10px] font-bold cursor-pointer ${
                      injectionMode === 'splitless' ? 'bg-[#7C957D] text-[#FAF7EE]' : 'bg-[#0C1A22] text-[#A9C2D2]'
                    }`}
                  >
                    Splitless
                  </button>
                  <button
                    onClick={() => setInjectionMode('septum_leak')}
                    className={`flex-1 py-1 rounded-lg font-mono text-[10px] font-bold cursor-pointer ${
                      injectionMode === 'septum_leak' ? 'bg-[#8E3742] text-[#FAF7EE]' : 'bg-[#0C1A22] text-[#A9C2D2]'
                    }`}
                  >
                    Fuga Septum
                  </button>
                </div>
              </div>

              {/* Detector Type */}
              <div className="bg-[#122630] p-2.5 rounded-xl border border-[#1C3947] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#A9C2D2] font-bold block">
                  Detector GC
                </span>
                <div className="flex gap-1">
                  {(['FID', 'TCD'] as const).map((det) => (
                    <button
                      key={det}
                      onClick={() => setDetectorType(det)}
                      className={`flex-1 py-1 rounded-lg font-mono text-[11px] font-bold cursor-pointer ${
                        detectorType === det ? 'bg-[#8E3742] text-[#FAF7EE]' : 'bg-[#0C1A22] text-[#A9C2D2]'
                      }`}
                    >
                      {det === 'FID' ? 'FID (Llama C–H)' : 'TCD (Universal)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clamped Sliders: Flow & Ramp Rate */}
              <div className="bg-[#122630] p-2.5 rounded-xl border border-[#1C3947] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#A9C2D2]">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-[#EFC4BF]" />
                    Flujo ({flowMlMin.toFixed(1)} mL/m)
                  </span>
                  <span>Rampa ({rampRateCMin} °C/m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0.5}
                    max={3.5}
                    step={0.1}
                    value={flowMlMin}
                    onChange={(e) => setFlowMlMin(clampNumber(e.target.value, 0.5, 3.5))}
                    className="w-1/2 accent-[#7C957D]"
                    aria-label="Caudal de gas portador"
                  />
                  <input
                    type="range"
                    min={4}
                    max={25}
                    step={1}
                    disabled={ovenMode === 'isothermal'}
                    value={rampRateCMin}
                    onChange={(e) => setRampRateCMin(clampNumber(e.target.value, 4, 25))}
                    className="w-1/2 accent-[#8E3742] disabled:opacity-40"
                    aria-label="Velocidad de rampa del horno"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive SVG Gas Chromatogram */}
          <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D7BB] pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#8E3742]" />
                <h3 className="text-sm font-bold text-[#122630]">
                  Cromatograma GC en Vivo ({detectorType === 'FID' ? 'pA Electrómetro' : 'mV Puente TCD'}) vs Tiempo (min)
                </h3>
              </div>

              <label className="flex items-center gap-1.5 text-xs font-mono text-[#1C3947] cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOvenTempLine}
                  onChange={(e) => setShowOvenTempLine(e.target.checked)}
                  className="accent-[#8E3742]"
                />
                <span>Superponer Rampa Térmica (°C)</span>
              </label>
            </div>

            <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947]">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-64">
                {/* Grid lines */}
                {[0, 5, 10, 15, 20].map((tick) => {
                  const gx = toX(tick);
                  return (
                    <g key={tick}>
                      <line x1={gx} y1={padT} x2={gx} y2={svgHeight - padB} stroke="#1C3947" strokeDasharray="3,3" />
                      <text x={gx} y={svgHeight - 12} fill="#A9C2D2" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        {tick} min
                      </text>
                    </g>
                  );
                })}

                {/* Axes */}
                <line x1={padL} y1={svgHeight - padB} x2={svgWidth - padR} y2={svgHeight - padB} stroke="#A9C2D2" strokeWidth="1.5" />
                <line x1={padL} y1={padT} x2={padL} y2={svgHeight - padB} stroke="#A9C2D2" strokeWidth="1.5" />

                {/* Oven Temp Dashed Overlay */}
                {showOvenTempLine && (
                  <path d={tempPathD} fill="none" stroke="#A9C2D2" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7" />
                )}

                {/* Chromatogram Signal Curve */}
                <path d={chromPathD} fill="none" stroke="#EFC4BF" strokeWidth="2.4" />

                {/* Live playhead cursor */}
                <line
                  x1={toX(runProgressMin)}
                  y1={padT}
                  x2={toX(runProgressMin)}
                  y2={svgHeight - padB}
                  stroke="#7C957D"
                  strokeWidth="1.2"
                  strokeDasharray="2,2"
                />

                {/* Marker labels for Solvent, Target Analyte, Companion */}
                <text x={toX(sim.tM + 0.12)} y={padT + 14} fill="#A9C2D2" fontSize="9" fontFamily="monospace">
                  Solvente (t_M {sim.tM}m)
                </text>

                <circle cx={toX(sim.tRAnalyte)} cy={toY(sim.peakHeightAnalyte)} r="4" fill="#8E3742" stroke="#FAF7EE" />
                <text
                  x={Math.min(svgWidth - 135, toX(sim.tRAnalyte) + 6)}
                  y={Math.max(padT + 12, toY(sim.peakHeightAnalyte) - 6)}
                  fill="#EFC4BF"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {selectedCompound.name} ({sim.tRAnalyte}m)
                </text>

                <text
                  x={Math.min(svgWidth - 135, toX(sim.tRCompanion) + 6)}
                  y={padT + 26}
                  fill="#7C957D"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  ◆ {selectedCompound.companionName} ({sim.tRCompanion}m)
                </text>
              </svg>
            </div>

            {/* Diagnostic Banner */}
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                sim.systemError
                  ? 'bg-[#FAEEEE] border-[#8E3742] text-[#8E3742]'
                  : sim.resolutionRs < 1.3 || (detectorType === 'FID' && selectedCompound.fidResponse < 0.18)
                  ? 'bg-[#FFFDF9] border-[#E2D7BB] text-[#8E3742]'
                  : 'bg-[#F2F6F2] border-[#DFE8DF] text-[#122630]'
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#8E3742]" />
              <div className="space-y-1">
                <p className="font-semibold">{sim.diagnosticMessage}</p>
                <p className="text-[11px] opacity-85">{selectedCompound.description} · {selectedCompound.keyFeatureNote}</p>
              </div>
            </div>

            {/* Tabular Telemetry Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono">
              <div className="bg-[#FFFDF9] p-2.5 rounded-xl border border-[#E2D7BB] text-center">
                <div className="text-[10px] text-[#1C3947]/70 uppercase">Retención t_R</div>
                <div className="text-sm font-bold text-[#8E3742] tabular-nums">{sim.tRAnalyte} min</div>
              </div>
              <div className="bg-[#FFFDF9] p-2.5 rounded-xl border border-[#E2D7BB] text-center">
                <div className="text-[10px] text-[#1C3947]/70 uppercase">T_elución</div>
                <div className="text-sm font-bold text-[#122630] tabular-nums">{sim.elutionTempC} °C</div>
              </div>
              <div className="bg-[#FFFDF9] p-2.5 rounded-xl border border-[#E2D7BB] text-center">
                <div className="text-[10px] text-[#1C3947]/70 uppercase">Resolución R_s</div>
                <div
                  className={`text-sm font-bold tabular-nums ${
                    sim.resolutionRs >= 1.5 ? 'text-[#7C957D]' : 'text-[#8E3742]'
                  }`}
                >
                  {sim.resolutionRs}
                </div>
              </div>
              <div className="bg-[#FFFDF9] p-2.5 rounded-xl border border-[#E2D7BB] text-center">
                <div className="text-[10px] text-[#1C3947]/70 uppercase">Platos N</div>
                <div className="text-sm font-bold text-[#122630] tabular-nums">
                  {sim.platesN.toLocaleString()}
                </div>
              </div>
              <div className="bg-[#FFFDF9] p-2.5 rounded-xl border border-[#E2D7BB] text-center">
                <div className="text-[10px] text-[#1C3947]/70 uppercase">Índice Kováts</div>
                <div className="text-sm font-bold text-[#8E3742] tabular-nums">{sim.kovatsRiEffective}</div>
              </div>
              <div className="bg-[#FFFDF9] p-2.5 rounded-xl border border-[#E2D7BB] text-center">
                <div className="text-[10px] text-[#1C3947]/70 uppercase">Factor k&apos; / SNR</div>
                <div className="text-sm font-bold text-[#122630] tabular-nums">
                  {sim.kPrime} · {sim.snrEstimate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
