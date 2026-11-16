import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  HPLC_GROUPS_DATA,
  ALL_HPLC_SAMPLES,
  HplcMixtureSample,
  ComputedPeakMetric,
  computeHplcSimulation
} from '../data/hplcCompoundsData';
import { HplcOnboardingGuide } from './HplcOnboardingGuide';
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
  Sparkles,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const HplcSimulator: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(HPLC_GROUPS_DATA[0].id);
  const [selectedSample, setSelectedSample] = useState<HplcMixtureSample>(
    HPLC_GROUPS_DATA[0].compounds[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchGlobal, setSearchGlobal] = useState<boolean>(false);

  // Chromatographic Operational Parameters
  const [phiBPct, setPhiBPct] = useState<number>(
    Math.round(HPLC_GROUPS_DATA[0].compounds[0].recommendedPhiB * 100)
  );
  const [flowMlMin, setFlowMlMin] = useState<number>(1.2);
  const [tempC, setTempC] = useState<number>(35);
  const [particleUm, setParticleUm] = useState<number>(3.5);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [runTimeMin, setRunTimeMin] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [selectedPeakMetric, setSelectedPeakMetric] = useState<ComputedPeakMetric | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeGroup = useMemo(() => {
    return HPLC_GROUPS_DATA.find((g) => g.id === selectedGroupId) || HPLC_GROUPS_DATA[0];
  }, [selectedGroupId]);

  const sim = useMemo(() => {
    return computeHplcSimulation(
      selectedSample,
      phiBPct / 100,
      flowMlMin,
      tempC,
      particleUm
    );
  }, [selectedSample, phiBPct, flowMlMin, tempC, particleUm]);

  // Keep selectedPeakMetric synchronized with current sim run
  const activePeakMetric = useMemo(() => {
    if (!selectedPeakMetric) return sim.peakMetrics[sim.peakMetrics.length - 1] || null;
    return (
      sim.peakMetrics.find((pm) => pm.spec.id === selectedPeakMetric.spec.id) ||
      sim.peakMetrics[0] ||
      null
    );
  }, [sim, selectedPeakMetric]);

  const visibleSamples = useMemo(() => {
    const list = searchGlobal ? ALL_HPLC_SAMPLES : activeGroup.compounds;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.matrixContext.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.peaks.some(
          (p) => p.name.toLowerCase().includes(q) || p.formula.toLowerCase().includes(q)
        )
    );
  }, [activeGroup, searchGlobal, searchQuery]);

  const handleSelectSample = (sample: HplcMixtureSample) => {
    setSelectedSample(sample);
    setPhiBPct(Math.round(sample.recommendedPhiB * 100));
    setTempC(sample.recommendedTempC || 35);
    setRunTimeMin(0);
    setSelectedPeakMetric(null);
  };

  const handlePickRandomSample = () => {
    const idx = Math.floor(Math.random() * ALL_HPLC_SAMPLES.length);
    const chosen = ALL_HPLC_SAMPLES[idx];
    const parentGroup = HPLC_GROUPS_DATA.find((g) =>
      g.compounds.some((c) => c.id === chosen.id)
    );
    if (parentGroup) setSelectedGroupId(parentGroup.id);
    handleSelectSample(chosen);
  };

  const handleResetRun = () => {
    setRunTimeMin(0);
    setIsPlaying(true);
  };

  // Real-time playback timer advancing runTimeMin smoothly
  useEffect(() => {
    if (!isPlaying) return;
    let lastTs = performance.now();
    let frameId: number;

    const step = (now: number) => {
      const dtSec = Math.min(0.1, (now - lastTs) / 1000);
      lastTs = now;
      // Run speed ~1.35 sim-minutes per real second so a 6-12 min run finishes in ~5-9s
      setRunTimeMin((prev) => {
        const next = prev + dtSec * 1.45;
        if (next > sim.maxTimeMin) return 0;
        return next;
      });
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, sim.maxTimeMin]);

  // Real-time HPLC Fluidic & C18 Column Band Separation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark Analytical Instrument Backdrop
    ctx.fillStyle = '#071116';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid
    ctx.strokeStyle = 'rgba(28, 57, 71, 0.35)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // 1. MOBILE PHASE BOTTLES A (Water) & B (ACN) at left
    const fracB = phiBPct / 100;
    const fracA = 1 - fracB;
    ctx.fillStyle = 'rgba(169, 194, 210, 0.25)';
    ctx.fillRect(16, 75, 28, 55);
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(16, 75, 28, 55);
    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9px monospace';
    ctx.fillText(`A ${100 - phiBPct}%`, 14, 68);

    ctx.fillStyle = 'rgba(142, 55, 66, 0.35)';
    ctx.fillRect(52, 75, 28, 55);
    ctx.strokeStyle = '#EFC4BF';
    ctx.strokeRect(52, 75, 28, 55);
    ctx.fillStyle = '#EFC4BF';
    ctx.fillText(`B ${phiBPct}%`, 52, 68);

    // Flow lines into Binary Pump (x=95..155)
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = Math.max(1.5, fracA * 4);
    ctx.beginPath();
    ctx.moveTo(30, 130);
    ctx.lineTo(30, 165);
    ctx.lineTo(95, 165);
    ctx.stroke();

    ctx.strokeStyle = '#8E3742';
    ctx.lineWidth = Math.max(1.5, fracB * 4);
    ctx.beginPath();
    ctx.moveTo(66, 130);
    ctx.lineTo(66, 175);
    ctx.lineTo(95, 175);
    ctx.stroke();

    // 2. BINARY PUMP & PRESSURE MODULE (x=95..160)
    const pistonPulse = isPlaying ? Math.sin(runTimeMin * flowMlMin * 12) * 5 : 0;
    ctx.fillStyle = '#122630';
    ctx.fillRect(95, 135, 65, 68);
    ctx.strokeStyle = sim.pressureBar > 950 ? '#8E3742' : '#7C957D';
    ctx.lineWidth = 2;
    ctx.strokeRect(95, 135, 65, 68);

    // Dual Pistons
    ctx.fillStyle = '#EFC4BF';
    ctx.fillRect(106 + pistonPulse, 148, 22, 10);
    ctx.fillStyle = '#7C957D';
    ctx.fillRect(106 - pistonPulse, 166, 22, 10);
    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9px monospace';
    ctx.fillText(`${sim.pressureBar} bar`, 102, 195);
    ctx.fillStyle = '#A9C2D2';
    ctx.fillText('Bomba Zafiro', 94, 128);

    // 3. 6-PORT INJECTOR VALVE (cx=195, cy=169)
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(160, 169);
    ctx.lineTo(230, 169);
    ctx.stroke();

    const isInjectingFlash = runTimeMin < 0.35;
    ctx.fillStyle = isInjectingFlash ? '#8E3742' : '#122630';
    ctx.beginPath();
    ctx.arc(195, 169, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 8px monospace';
    ctx.fillText('6-VÍAS', 180, 172);
    ctx.fillStyle = '#A9C2D2';
    ctx.fillText(isInjectingFlash ? 'INJECT!' : 'LOAD', 182, 145);

    // 4. HEATED C18 PACKED COLUMN (x=232..442, y=136..202)
    const colX = 232;
    const colW = 210;
    const colY = 138;
    const colH = 62;

    // Peltier Oven outer thermal halo
    const heatAlpha = 0.08 + ((tempC - 20) / 50) * 0.22;
    ctx.fillStyle = `rgba(142, 55, 66, ${heatAlpha})`;
    ctx.fillRect(colX - 6, colY - 10, colW + 12, colH + 20);
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 1;
    ctx.strokeRect(colX - 6, colY - 10, colW + 12, colH + 20);

    // Stainless steel column housing
    ctx.fillStyle = '#0C1A22';
    ctx.fillRect(colX, colY, colW, colH);
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = 2;
    ctx.strokeRect(colX, colY, colW, colH);

    // Silica C18 packing dots
    const beadGap = particleUm <= 2.0 ? 8 : particleUm <= 3.6 ? 11 : 14;
    ctx.fillStyle = 'rgba(169, 194, 210, 0.22)';
    for (let bx = colX + 6; bx < colX + colW - 4; bx += beadGap) {
      for (let by = colY + 6; by < colY + colH - 4; by += beadGap) {
        ctx.beginPath();
        ctx.arc(bx, by, particleUm <= 2.0 ? 1.8 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Solvent Front t0 dashed line
    const t0Frac = runTimeMin / Math.max(0.1, sim.t0Min);
    if (t0Frac >= 0 && t0Frac <= 1.05) {
      const fx = colX + Math.min(1, t0Frac) * colW;
      ctx.strokeStyle = 'rgba(250, 247, 238, 0.65)';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(fx, colY + 2);
      ctx.lineTo(fx, colY + colH - 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#FAF7EE';
      ctx.font = '8px monospace';
      ctx.fillText('t₀', fx - 5, colY + colH - 5);
    }

    // Eluting Colored Analyte Bands migrating inside Column C18!
    let detectorFlashColor: string | null = null;
    sim.peakMetrics.forEach((pm) => {
      const frac = runTimeMin / Math.max(0.05, pm.tR);
      if (frac >= 0 && frac <= 1.08) {
        const bandX = colX + Math.min(1.02, frac) * colW;
        const bandW = Math.max(6, Math.min(26, (pm.widthBaseMin / pm.tR) * colW * 0.75));
        const clampedLeft = Math.max(colX + 2, bandX - bandW / 2);
        const clampedRight = Math.min(colX + colW - 2, bandX + bandW / 2);
        if (clampedRight > clampedLeft) {
          ctx.fillStyle = pm.spec.colorHex;
          ctx.globalAlpha = 0.78;
          ctx.fillRect(clampedLeft, colY + 3, clampedRight - clampedLeft, colH - 6);
          ctx.globalAlpha = 1;
        }
      }
      if (Math.abs(runTimeMin - pm.tR) <= 1.9 * pm.sigmaMin) {
        detectorFlashColor = pm.spec.colorHex;
      }
    });

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(
      `Columna C18 (${particleUm.toFixed(1)} µm) · Horno ${tempC} °C · N = ${sim.platesN.toLocaleString()} platos`,
      colX - 4,
      colY - 16
    );

    // 5. DAD UV-VIS Z-FLOW CELL DETECTOR (x=456..518)
    ctx.strokeStyle = '#7C957D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(colX + colW, 169);
    ctx.lineTo(462, 169);
    ctx.stroke();

    ctx.fillStyle = detectorFlashColor ? detectorFlashColor : '#122630';
    ctx.globalAlpha = detectorFlashColor ? 0.5 : 1;
    ctx.fillRect(462, 138, 56, 62);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = detectorFlashColor ? '#EFC4BF' : '#7C957D';
    ctx.lineWidth = 2;
    ctx.strokeRect(462, 138, 56, 62);

    // Z channel + optical beam
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(468, 185);
    ctx.lineTo(480, 169);
    ctx.lineTo(500, 169);
    ctx.lineTo(512, 152);
    ctx.stroke();

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('DAD', 480, 150);
    ctx.fillStyle = '#A9C2D2';
    ctx.font = '8px monospace';
    ctx.fillText('Celda Z', 472, 195);

    // Top telemetry banner
    ctx.fillStyle = '#EFC4BF';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(
      `t = ${runTimeMin.toFixed(2)} min  |  t₀ = ${sim.t0Min.toFixed(2)} min  |  F = ${flowMlMin.toFixed(1)} mL/min  |  ΔP = ${sim.pressureBar} bar`,
      16,
      28
    );

    // Footer legend for active peaks
    ctx.fillStyle = '#A9C2D2';
    ctx.font = '9px monospace';
    ctx.fillText(
      `Analitos (${sim.peakMetrics.length}): ` +
        sim.peakMetrics.map((pm) => `${pm.spec.name.split(' ')[0]} (${pm.tR.toFixed(1)}m)`).join(' · '),
      16,
      258
    );
  }, [phiBPct, flowMlMin, tempC, particleUm, sim, runTimeMin, isPlaying]);

  const optimalPhiPct = Math.round(selectedSample.recommendedPhiB * 100);
  const pressureWarning = sim.pressureBar > 1050;
  const rsStatus =
    sim.minResolutionRs === null
      ? { label: 'Pico Único', ok: true }
      : sim.minResolutionRs >= 1.5
      ? { label: `R_s = ${sim.minResolutionRs.toFixed(2)} (Resolución Basal ✓)`, ok: true }
      : { label: `R_s = ${sim.minResolutionRs.toFixed(2)} (Coelución < 1.5)`, ok: false };

  return (
    <div className="w-full space-y-6">
      {/* Header and overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Laboratorio Virtual HPLC / UHPLC</span>
            <span aria-hidden="true">·</span>
            <span>{ALL_HPLC_SAMPLES.length} Corridas Cromatográficas Calibradas</span>
            <span aria-hidden="true">·</span>
            <span>{HPLC_GROUPS_DATA.length} Familias Analíticas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Simulador de Flujo HPLC &amp; Cromatograma C18
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Controla la fase móvil (%B Acetonitrilo), caudal F, temperatura del horno y diámetro de partícula d_p para observar la separación en tiempo real, presión de Darcy y platos teóricos de Van Deemter.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePickRandomSample}
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
            <span>{isPlaying ? 'Pausar' : 'Reanudar'}</span>
          </button>
          <button
            onClick={handleResetRun}
            className="px-3 py-1.5 text-xs font-medium text-[#8E3742] bg-[#FAF7EE] hover:bg-[#FAEEEE] border border-[#E2D7BB] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Corrida</span>
          </button>
        </div>
      </div>

      {/* Onboarding Guide */}
      {showGuide && (
        <HplcOnboardingGuide
          onClose={() => setShowGuide(false)}
          onStartSimulation={() => setShowGuide(false)}
        />
      )}

      {/* 12 Chromatographic Families Library */}
      <div className="bg-[#FAF7EE] rounded-2xl p-5 border border-[#E2D7BB] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-3">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-[#8E3742]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#122630]">
              Biblioteca HPLC: {HPLC_GROUPS_DATA.length} Familias Analíticas ({ALL_HPLC_SAMPLES.length} Mezclas)
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
                    ? `Buscar en ${ALL_HPLC_SAMPLES.length} mezclas...`
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
                ? `Todos (${ALL_HPLC_SAMPLES.length})`
                : `Grupo (${activeGroup.compounds.length})`}
            </button>
          </div>
        </div>

        {/* 12 Groups Tabs Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5">
          {HPLC_GROUPS_DATA.map((group, idx) => {
            const isGroupActive = selectedGroupId === group.id && !searchGlobal;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setSearchGlobal(false);
                  handleSelectSample(group.compounds[0]);
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

        {/* Active Group Mechanism Banner */}
        <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] text-xs space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#8E3742] font-mono text-[11px]">
            <span className="font-bold">
              Familia: {activeGroup.name} · Columna: {activeGroup.stationaryPhase}
            </span>
            <span className="text-[#7C957D]">Isocrático / Fase Reversa C18</span>
          </div>
          <p className="text-[11px] text-[#1C3947]/90 leading-relaxed">
            <strong className="text-[#122630]">Mecanismo de Separación: </strong>
            {activeGroup.separationMechanism}
          </p>
        </div>

        {/* Sample Cards Grid */}
        <div className="space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#1C3947]/70 px-1 gap-1">
            <span>
              {searchGlobal
                ? `Resultados globales (${visibleSamples.length}):`
                : `Mezclas en ${activeGroup.name} (${visibleSamples.length} de ${activeGroup.compounds.length}):`}
            </span>
            <span className="font-mono text-[11px] text-[#8E3742]">
              Activa: <strong>{selectedSample.name}</strong> ({selectedSample.matrixContext}) · %B Óptimo = {optimalPhiPct}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
            {visibleSamples.map((sample) => {
              const isSelected = selectedSample.id === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] shadow-md ring-2 ring-[#8E3742]/40'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:bg-[#F7F3E7] hover:border-[#8E3742]/60'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs line-clamp-1">{sample.name}</div>
                    <div className="text-[10px] opacity-75 truncate mt-0.5">
                      {sample.matrixContext}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-85 mt-1.5 pt-1 border-t border-current/10">
                    <span>{sample.peaks.length} picos</span>
                    <span className={isSelected ? 'text-[#EFC4BF]' : 'text-[#8E3742]'}>
                      {Math.round(sample.recommendedPhiB * 100)}% ACN
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Column Animation + Live Chromatogram + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Fluidic Column Canvas + Live Chromatogram */}
        <div className="lg:col-span-7 space-y-5">
          {/* Fluidic Canvas Card */}
          <div className="bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-3 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A9C2D2] px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7C957D] animate-ping" />
                CIRCUITO DE ALTA PRESIÓN Y REPARTO EN COLUMNA C18
              </span>
              <span className="truncate ml-2">
                <strong className="text-[#EFC4BF]">{selectedSample.name}</strong>
              </span>
            </div>

            <div className="relative w-full aspect-[16/9] bg-[#071116] rounded-xl overflow-hidden border border-[#162E3B]">
              <canvas ref={canvasRef} width={540} height={280} className="w-full h-full" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono p-2 bg-[#122630] rounded-xl border border-[#1C3947] text-[#FAF7EE]">
              <div>
                <div className="text-[#A9C2D2] text-[10px]">CONTRAPRESIÓN ΔP</div>
                <div className={`font-bold tabular-nums ${pressureWarning ? 'text-[#EFC4BF]' : 'text-[#FAF7EE]'}`}>
                  {sim.pressureBar} bar
                </div>
              </div>
              <div>
                <div className="text-[#A9C2D2] text-[10px]">EFICIENCIA VAN DEEMTER</div>
                <div className="text-[#7C957D] font-bold tabular-nums">
                  {sim.platesN.toLocaleString()} platos (H={sim.plateHeightUm.toFixed(1)}µm)
                </div>
              </div>
              <div>
                <div className="text-[#A9C2D2] text-[10px]">TIEMPO MUERTO t₀</div>
                <div className="text-[#A9C2D2] font-bold tabular-nums">
                  {sim.t0Min.toFixed(2)} min ({sim.linearVelocityMmS.toFixed(1)} mm/s)
                </div>
              </div>
            </div>
          </div>

          {/* Live SVG Chromatogram */}
          <div className="bg-[#122630] rounded-2xl border border-[#1C3947] p-5 text-[#FAF7EE] space-y-3 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C3947] pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#EFC4BF]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7EE]">
                  Cromatograma en Tiempo Real (mAU vs Tiempo de Retención t_R)
                </h4>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 self-start sm:self-auto ${
                  rsStatus.ok
                    ? 'bg-[#7C957D]/20 text-[#7C957D] border border-[#7C957D]/40'
                    : 'bg-[#8E3742]/30 text-[#EFC4BF] border border-[#8E3742]'
                }`}
              >
                {rsStatus.ok ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {rsStatus.label}
              </span>
            </div>

            <div className="bg-[#0C1A22] rounded-xl p-2.5 border border-[#1C3947]">
              <svg viewBox="0 0 460 195" className="w-full h-52 overflow-visible">
                {/* Y Grid Lines (mAU) */}
                {[0, 0.25, 0.5, 0.75, 1].map((frac, idx) => {
                  const y = 16 + frac * 138;
                  const maxMau = Math.max(250, ...sim.peakMetrics.map((p) => p.heightMau * 1.15));
                  const valLabel = Math.round((1 - frac) * maxMau);
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
                        {valLabel}
                      </text>
                    </g>
                  );
                })}

                {/* Solvent front t0 dashed marker */}
                {(() => {
                  const x0 = 38 + (sim.t0Min / sim.maxTimeMin) * 404;
                  return (
                    <g>
                      <line x1={x0} y1="16" x2={x0} y2="154" stroke="#7696AA" strokeDasharray="2,3" strokeWidth="1" />
                      <text x={x0 + 3} y="25" fill="#7696AA" fontSize="7.5" fontFamily="monospace">
                        t₀={sim.t0Min.toFixed(1)}m
                      </text>
                    </g>
                  );
                })()}

                {/* Full Reference Dashed Chromatogram */}
                {(() => {
                  const maxMau = Math.max(250, ...sim.peakMetrics.map((p) => p.heightMau * 1.15));
                  return (
                    <>
                      <path
                        d={sim.chromatogramPoints
                          .map((pt, i) => {
                            const x = 38 + (pt.timeMin / sim.maxTimeMin) * 404;
                            const y = 154 - Math.min(1, pt.signalMau / maxMau) * 138;
                            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                          })
                          .join(' ')}
                        fill="none"
                        stroke="#A9C2D2"
                        strokeOpacity="0.3"
                        strokeDasharray="4,3"
                        strokeWidth="1.5"
                      />

                      {/* Live Eluted Bright Chromatogram up to runTimeMin */}
                      <path
                        d={sim.chromatogramPoints
                          .filter((pt) => pt.timeMin <= runTimeMin + 0.08)
                          .map((pt, i) => {
                            const x = 38 + (pt.timeMin / sim.maxTimeMin) * 404;
                            const y = 154 - Math.min(1, pt.signalMau / maxMau) * 138;
                            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                          })
                          .join(' ')}
                        fill="none"
                        stroke="#7C957D"
                        strokeWidth="2.5"
                      />

                      {/* Active Time Cursor */}
                      {(() => {
                        const cx = 38 + (runTimeMin / sim.maxTimeMin) * 404;
                        return (
                          <line
                            x1={cx}
                            y1="16"
                            x2={cx}
                            y2="154"
                            stroke="#EFC4BF"
                            strokeWidth="1.5"
                            strokeOpacity="0.85"
                          />
                        );
                      })()}

                      {/* Clickable Analyte Peak Markers */}
                      {sim.peakMetrics.map((pm, idx) => {
                        const x = 38 + (pm.tR / sim.maxTimeMin) * 404;
                        const y = 154 - Math.min(1, pm.heightMau / maxMau) * 138;
                        const isSelected = activePeakMetric?.spec.id === pm.spec.id;
                        return (
                          <g
                            key={pm.spec.id}
                            onClick={() => setSelectedPeakMetric(pm)}
                            className="cursor-pointer"
                          >
                            <circle
                              cx={x}
                              cy={y}
                              r={isSelected ? 5.5 : 4}
                              fill={pm.spec.colorHex}
                              stroke="#FAF7EE"
                              strokeWidth="1.5"
                            />
                            <text
                              x={x}
                              y={Math.max(12, y - 8)}
                              textAnchor="middle"
                              fill="#EFC4BF"
                              fontSize="8"
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              {idx + 1}. {pm.tR.toFixed(2)}m
                            </text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}

                {/* X-Axis Time Labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((frac, idx) => {
                  const tVal = frac * sim.maxTimeMin;
                  const x = 38 + frac * 404;
                  return (
                    <text
                      key={idx}
                      x={x}
                      y="172"
                      textAnchor="middle"
                      fill="#A9C2D2"
                      fontSize="8.5"
                      fontFamily="monospace"
                    >
                      {tVal.toFixed(1)}
                    </text>
                  );
                })}
                <text x="240" y="188" textAnchor="middle" fill="#A9C2D2" fontSize="8.5" fontFamily="monospace">
                  Tiempo de Elución (min) · Haz clic en cualquier pico para inspeccionar k&apos;, N y λ_max
                </text>
              </svg>
            </div>

            {/* Selected Peak Inspector Box */}
            {activePeakMetric && (
              <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] text-xs space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[#EFC4BF] font-mono">
                  <span className="font-bold flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: activePeakMetric.spec.colorHex }}
                    />
                    {activePeakMetric.spec.name} ({activePeakMetric.spec.formula})
                  </span>
                  <span className="text-[10px] text-[#7C957D]">
                    λ_UV = {activePeakMetric.spec.lambdaUvMax} nm
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-[#A9C2D2] pt-1">
                  <div>t_R = <strong className="text-[#FAF7EE]">{activePeakMetric.tR.toFixed(2)} min</strong></div>
                  <div>k&apos; = <strong className="text-[#FAF7EE]">{activePeakMetric.kPrime.toFixed(2)}</strong></div>
                  <div>w_b = <strong className="text-[#FAF7EE]">{activePeakMetric.widthBaseMin.toFixed(2)} min</strong></div>
                  <div>N = <strong className="text-[#7C957D]">{activePeakMetric.platesN.toLocaleString()}</strong></div>
                </div>
                <p className="text-[11px] text-[#FAF7EE]/85 leading-relaxed">
                  {activePeakMetric.spec.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 cols: Chromatographic Controls Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8E3742] flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Método Cromatográfico (C18)
              </h3>
              <button
                onClick={() => setPhiBPct(optimalPhiPct)}
                className="px-2.5 py-1 text-[11px] font-mono rounded-lg cursor-pointer transition-colors bg-[#8E3742] hover:bg-[#742B34] text-[#FAF7EE] flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Usar %B Óptimo ({optimalPhiPct}%)</span>
              </button>
            </div>

            {/* Slider 1: %B Acetonitrile */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Fase Móvil Orgánica (%B ACN):</span>
                <span className="font-mono text-[#8E3742] font-bold tabular-nums">
                  {100 - phiBPct}% Agua / {phiBPct}% ACN
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={95}
                step={1}
                value={phiBPct}
                onChange={(e) => setPhiBPct(clampNumber(e.target.value, 5, 95))}
                className="w-full accent-[#8E3742] cursor-pointer"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                Controla k&apos; según log k&apos; = log k_w − S·φ_B. Demasiado %B fusiona los picos en t₀.
              </span>
            </div>

            {/* Slider 2: Flow Rate F */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Caudal Volumétrico (F):</span>
                <span className="font-mono text-[#8E3742] font-bold tabular-nums">
                  {flowMlMin.toFixed(1)} mL/min
                </span>
              </div>
              <input
                type="range"
                min={0.3}
                max={2.5}
                step={0.1}
                value={flowMlMin}
                onChange={(e) => setFlowMlMin(clampNumber(e.target.value, 0.3, 2.5))}
                className="w-full accent-[#8E3742] cursor-pointer"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                Aumentar el caudal reduce t_R pero eleva ΔP linealmente y afecta el término C·u de Van Deemter.
              </span>
            </div>

            {/* Slider 3: Column Oven Temp */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Temperatura del Horno Peltier:</span>
                <span className="font-mono text-[#7C957D] font-bold tabular-nums">
                  {tempC} °C
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={70}
                step={5}
                value={tempC}
                onChange={(e) => setTempC(clampNumber(e.target.value, 20, 70))}
                className="w-full accent-[#7C957D] cursor-pointer"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                Calentar reduce la viscosidad η (menor contrapresión ΔP) y acelera la transferencia de masa.
              </span>
            </div>

            {/* Particle Size d_p selector */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-medium text-[#122630] block">
                Tamaño de Partícula Sílice C18 (d_p):
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { dp: 1.8, label: '1.8 µm UHPLC' },
                  { dp: 3.5, label: '3.5 µm Analítica' },
                  { dp: 5.0, label: '5.0 µm Clásica' },
                ].map((opt) => (
                  <button
                    key={opt.dp}
                    onClick={() => setParticleUm(opt.dp)}
                    className={`py-1.5 px-2 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                      particleUm === opt.dp
                        ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                        : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {pressureWarning && (
              <div className="p-2.5 bg-[#FBF0EF] border border-[#8E3742] rounded-xl text-[11px] text-[#8E3742] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Alta Contrapresión UHPLC ({sim.pressureBar} bar):</strong> Combinar partículas de 1.8 µm con alto caudal exige bombas de 1,300 bar. Subir la temperatura reduce ΔP.
                </span>
              </div>
            )}

            {/* Peak Retention Summary Table */}
            <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] space-y-2 text-xs">
              <div className="font-bold text-[#122630] border-b border-[#E2D7BB]/70 pb-1 flex justify-between">
                <span>Picos Calculados ({sim.peakMetrics.length})</span>
                <span className="font-mono text-[#7C957D]">{rsStatus.ok ? 'Separación Limpia' : 'Ajusta %B'}</span>
              </div>
              <div className="space-y-1.5">
                {sim.peakMetrics.map((pm, i) => (
                  <button
                    key={pm.spec.id}
                    onClick={() => setSelectedPeakMetric(pm)}
                    className="w-full flex items-center justify-between text-left px-2 py-1 rounded-lg hover:bg-[#FAF7EE] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5 truncate pr-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: pm.spec.colorHex }}
                      />
                      <span className="font-medium text-[#122630] truncate">
                        {i + 1}. {pm.spec.name}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-[#8E3742] shrink-0 tabular-nums">
                      t_R={pm.tR.toFixed(2)}m (k&apos;={pm.kPrime.toFixed(1)})
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
