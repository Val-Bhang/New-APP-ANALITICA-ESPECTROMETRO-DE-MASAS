import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  UVVIS_GROUPS_DATA,
  ALL_UVVIS_COMPOUNDS,
  UvVisCompound,
  UvVisBand,
  computeUvVisAbsorbance,
  wavelengthToColor
} from '../data/uvVisCompoundsData';
import { UvVisOnboardingGuide } from './UvVisOnboardingGuide';
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

export const UvVisSimulator: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(UVVIS_GROUPS_DATA[0].id);
  const [selectedCompound, setSelectedCompound] = useState<UvVisCompound>(
    UVVIS_GROUPS_DATA[0].compounds[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchGlobal, setSearchGlobal] = useState<boolean>(false);

  // Optical & Beer-Lambert operational parameters
  const [lambdaNm, setLambdaNm] = useState<number>(254);
  const [concMultiplier, setConcMultiplier] = useState<number>(1.0);
  const [pathLengthCm, setPathLengthCm] = useState<number>(1.0);
  const [slitWidthNm, setSlitWidthNm] = useState<number>(1.0);
  const [cuvetteMaterial, setCuvetteMaterial] = useState<'quartz' | 'glass' | 'plastic'>('quartz');
  const [displayMetric, setDisplayMetric] = useState<'abs' | 'trans'>('abs');

  const [isAutoSweeping, setIsAutoSweeping] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [sweepProgressNm, setSweepProgressNm] = useState<number>(254);
  const [selectedBandDetails, setSelectedBandDetails] = useState<UvVisBand | null>(
    UVVIS_GROUPS_DATA[0].compounds[0].bands.find((b) => b.isPrimaryPeak) ||
      UVVIS_GROUPS_DATA[0].compounds[0].bands[0]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lambdaRef = useRef<number>(lambdaNm);
  lambdaRef.current = lambdaNm;

  const activeGroup = useMemo(() => {
    return UVVIS_GROUPS_DATA.find((g) => g.id === selectedGroupId) || UVVIS_GROUPS_DATA[0];
  }, [selectedGroupId]);

  const effectiveConcMm = selectedCompound.defaultConcMm * concMultiplier;

  const currentAbsorbance = useMemo(() => {
    return computeUvVisAbsorbance(
      selectedCompound,
      lambdaNm,
      effectiveConcMm,
      pathLengthCm,
      slitWidthNm,
      cuvetteMaterial
    );
  }, [selectedCompound, lambdaNm, effectiveConcMm, pathLengthCm, slitWidthNm, cuvetteMaterial]);

  const currentTransmittancePct = Math.pow(10, -currentAbsorbance) * 100;
  const photonEnergyEv = 1240 / lambdaNm;
  const isUvLamp = lambdaNm < 340;

  const visibleCompounds = useMemo(() => {
    const list = searchGlobal ? ALL_UVVIS_COMPOUNDS : activeGroup.compounds;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.formula.toLowerCase().includes(q) ||
        c.solvent.toLowerCase().includes(q) ||
        c.lambdaMain.toString().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [activeGroup, searchGlobal, searchQuery]);

  const handleResetSpectrum = () => {
    setLambdaNm(200);
    setSweepProgressNm(200);
  };

  const handleSelectCompound = (c: UvVisCompound) => {
    setSelectedCompound(c);
    const primary = c.bands.find((b) => b.isPrimaryPeak) || c.bands[0] || null;
    setSelectedBandDetails(primary);
    setSweepProgressNm(200);
    if (!isAutoSweeping) {
      setLambdaNm(c.lambdaMain);
    } else {
      setLambdaNm(200);
    }
  };

  const handlePickRandomCompound = () => {
    const randomIndex = Math.floor(Math.random() * ALL_UVVIS_COMPOUNDS.length);
    const chosen = ALL_UVVIS_COMPOUNDS[randomIndex];
    const parentGroup = UVVIS_GROUPS_DATA.find((g) =>
      g.compounds.some((c) => c.id === chosen.id)
    );
    if (parentGroup) {
      setSelectedGroupId(parentGroup.id);
    }
    handleSelectCompound(chosen);
  };

  // Precompute spectrum points across 200..800 nm (step 4 nm)
  const spectrumPoints = useMemo(() => {
    const pts: { nm: number; abs: number; trans: number }[] = [];
    for (let nm = 200; nm <= 800; nm += 4) {
      const abs = computeUvVisAbsorbance(
        selectedCompound,
        nm,
        effectiveConcMm,
        pathLengthCm,
        slitWidthNm,
        cuvetteMaterial
      );
      pts.push({ nm, abs, trans: Math.pow(10, -abs) * 100 });
    }
    return pts;
  }, [selectedCompound, effectiveConcMm, pathLengthCm, slitWidthNm, cuvetteMaterial]);

  // Real-time double-beam optical canvas animation + auto-sweep loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;
    let localLambda = lambdaRef.current;

    const render = () => {
      if (isPlaying) {
        tick += 0.14;
        if (isAutoSweeping) {
          localLambda += 1.5;
          if (localLambda > 800) {
            localLambda = 200;
          }
          const rounded = Math.round(localLambda);
          setLambdaNm(rounded);
          setSweepProgressNm((prev) => Math.max(prev, rounded));
        } else {
          localLambda = lambdaRef.current;
        }
      } else {
        localLambda = lambdaRef.current;
      }

      const activeAbs = computeUvVisAbsorbance(
        selectedCompound,
        localLambda,
        effectiveConcMm,
        pathLengthCm,
        slitWidthNm,
        cuvetteMaterial
      );
      const transFrac = Math.pow(10, -activeAbs);
      const beamColor = wavelengthToColor(localLambda);
      const uvActive = localLambda < 340;
      const chopperPhaseRef = Math.sin(tick) >= 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#071116';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. LAMPS (D2 top-left, W bottom-left)
      // D2 Lamp
      ctx.fillStyle = uvActive ? 'rgba(139, 92, 246, 0.35)' : 'rgba(139, 92, 246, 0.08)';
      ctx.beginPath();
      ctx.arc(46, 118, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = uvActive ? '#C4B5FD' : '#274B5C';
      ctx.lineWidth = uvActive ? 2.5 : 1.5;
      ctx.stroke();
      ctx.fillStyle = uvActive ? '#FAF7EE' : '#7696AA';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('D₂', 39, 122);

      // W Lamp
      ctx.fillStyle = !uvActive ? 'rgba(245, 158, 11, 0.35)' : 'rgba(245, 158, 11, 0.08)';
      ctx.beginPath();
      ctx.arc(46, 222, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = !uvActive ? '#FCD34D' : '#274B5C';
      ctx.lineWidth = !uvActive ? 2.5 : 1.5;
      ctx.stroke();
      ctx.fillStyle = !uvActive ? '#FAF7EE' : '#7696AA';
      ctx.fillText('W', 42, 226);

      // Incoming wideband ray from active lamp to motorized mirror at (105, 170)
      ctx.strokeStyle = uvActive ? '#C4B5FD' : '#FCD34D';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(68, uvActive ? 118 : 222);
      ctx.lineTo(105, 170);
      ctx.lineTo(148, 170);
      ctx.stroke();

      // Motorized mirror
      ctx.save();
      ctx.translate(105, 170);
      ctx.rotate(uvActive ? -0.52 : 0.52);
      ctx.fillStyle = '#A9C2D2';
      ctx.fillRect(-3, -20, 6, 40);
      ctx.restore();

      // 2. ENTRANCE SLIT SBW at x=148
      const slitGap = Math.max(4, slitWidthNm * 3.5);
      ctx.fillStyle = '#7696AA';
      ctx.fillRect(145, 120, 6, 50 - slitGap / 2 - 120 + 120);
      ctx.fillRect(145, 120, 6, 50 - slitGap / 2);
      ctx.fillRect(145, 170 + slitGap / 2, 6, 50 - slitGap / 2);

      // Beam to Grating at (215, 170)
      ctx.strokeStyle = '#FAF7EE';
      ctx.lineWidth = Math.max(2, slitGap * 0.45);
      ctx.beginPath();
      ctx.moveTo(151, 170);
      ctx.lineTo(212, 170);
      ctx.stroke();

      // 3. DIFFRACTION GRATING + RAINBOW DISPERSION
      const norm = (localLambda - 200) / 600;
      ctx.save();
      ctx.translate(215, 170);
      ctx.rotate(-0.28 + norm * 0.56);
      ctx.fillStyle = '#8E3742';
      ctx.fillRect(-5, -24, 10, 48);
      ctx.strokeStyle = '#EFC4BF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-5, -24, 10, 48);
      ctx.restore();

      // Subtle dispersed spectrum fan
      const fanWavelengths = [280, 430, 520, 600, 700];
      fanWavelengths.forEach((w, i) => {
        const spreadY = 170 + (i - 2) * 16 - (norm - 0.45) * 32;
        ctx.strokeStyle = wavelengthToColor(w);
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(220, 170);
        ctx.lineTo(272, spreadY);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Exit slit mask at x=272
      ctx.fillStyle = '#1C3947';
      ctx.fillRect(270, 118, 6, 46);
      ctx.fillRect(270, 176, 6, 46);

      // Pure Monochromatic beam from exit slit to Chopper at (315, 170)
      ctx.strokeStyle = beamColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(220, 170);
      ctx.lineTo(315, 170);
      ctx.stroke();

      // 4. OPTICAL CHOPPER WHEEL at (315, 170)
      ctx.save();
      ctx.translate(315, 170);
      ctx.rotate(tick * 0.9);
      ctx.strokeStyle = '#EFC4BF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#8E3742';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 17, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 5. DOUBLE BEAM PATHS -> REFERENCE CUVETTE (TOP) & SAMPLE CUVETTE (BOTTOM)
      const cuvetteW = Math.round(28 + pathLengthCm * 18);
      const cuvetteX = 398 - cuvetteW / 2;
      const cuvetteStroke =
        cuvetteMaterial === 'quartz'
          ? '#A9C2D2'
          : cuvetteMaterial === 'glass'
          ? '#7C957D'
          : '#EFC4BF';

      // Top Reference Cuvette (I0) at y=108
      ctx.strokeStyle = beamColor;
      ctx.globalAlpha = chopperPhaseRef ? 0.95 : 0.25;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(315, 170);
      ctx.lineTo(352, 108);
      ctx.lineTo(482, 108);
      ctx.lineTo(498, 170);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = 'rgba(169, 194, 210, 0.16)';
      ctx.fillRect(cuvetteX, 86, cuvetteW, 44);
      ctx.strokeStyle = cuvetteStroke;
      ctx.lineWidth = 2;
      ctx.strokeRect(cuvetteX, 86, cuvetteW, 44);
      ctx.fillStyle = '#7C957D';
      ctx.font = '9px monospace';
      ctx.fillText('Blanco I₀', cuvetteX, 78);

      // Bottom Sample Cuvette (I) at y=232
      // Incoming beam to sample cuvette
      ctx.strokeStyle = beamColor;
      ctx.globalAlpha = !chopperPhaseRef ? 0.95 : 0.25;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(315, 170);
      ctx.lineTo(352, 232);
      ctx.lineTo(cuvetteX, 232);
      ctx.stroke();

      // Sample cuvette box colored by solutionColorHex
      ctx.globalAlpha = 1;
      ctx.fillStyle = selectedCompound.solutionColorHex;
      ctx.fillRect(cuvetteX, 210, cuvetteW, 44);
      ctx.fillStyle = `rgba(12, 26, 34, ${Math.min(0.6, activeAbs * 0.16)})`;
      ctx.fillRect(cuvetteX, 210, cuvetteW, 44);
      ctx.strokeStyle = cuvetteStroke;
      ctx.lineWidth = 2;
      ctx.strokeRect(cuvetteX, 210, cuvetteW, 44);

      // Attenuated emerging beam I after sample cuvette
      ctx.strokeStyle = beamColor;
      ctx.globalAlpha = Math.max(0.08, (!chopperPhaseRef ? 1.0 : 0.3) * transFrac);
      ctx.lineWidth = Math.max(1.2, 3.8 * Math.sqrt(transFrac));
      ctx.beginPath();
      ctx.moveTo(cuvetteX + cuvetteW, 232);
      ctx.lineTo(482, 232);
      ctx.lineTo(498, 170);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#EFC4BF';
      ctx.font = '9px monospace';
      ctx.fillText(`Muestra I (${pathLengthCm.toFixed(1)} cm)`, cuvetteX - 8, 270);

      // 6. PMT DETECTOR at right
      ctx.fillStyle = '#122630';
      ctx.fillRect(496, 128, 34, 84);
      ctx.strokeStyle = '#EFC4BF';
      ctx.lineWidth = 2;
      ctx.strokeRect(496, 128, 34, 84);
      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('PMT', 503, 174);

      // Canvas Top & Bottom Labels
      ctx.fillStyle = '#A9C2D2';
      ctx.font = '10px monospace';
      ctx.fillText('Monocromador', 180, 125);
      ctx.fillText('Chopper', 294, 210);
      ctx.fillStyle = '#EFC4BF';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(
        `λ = ${Math.round(localLambda)} nm  |  ${(1240 / localLambda).toFixed(2)} eV  |  T = ${(transFrac * 100).toFixed(1)}%  |  A = ${activeAbs.toFixed(2)}`,
        16,
        32
      );

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [
    selectedCompound,
    effectiveConcMm,
    pathLengthCm,
    slitWidthNm,
    cuvetteMaterial,
    isAutoSweeping,
    isPlaying,
  ]);

  const cutoffWarning =
    (cuvetteMaterial === 'glass' && lambdaNm < 330) ||
    (cuvetteMaterial === 'plastic' && lambdaNm < 300);

  return (
    <div className="w-full space-y-6">
      {/* Header and overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Laboratorio Virtual UV-Vis</span>
            <span aria-hidden="true">·</span>
            <span>{ALL_UVVIS_COMPOUNDS.length} Cromóforos &amp; Analitos Calibrados</span>
            <span aria-hidden="true">·</span>
            <span>{UVVIS_GROUPS_DATA.length} Familias Espectrales</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Simulador de Haz UV-Vis &amp; Espectro Beer-Lambert
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Barre longitudes de onda de 200 a 800 nm sobre 12 familias de cromóforos reales. Ajusta concentración, paso óptico, rendija SBW y material de cubeta para observar transiciones π→π*, n→π*, d→d y transferencia de carga.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePickRandomCompound}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF7EE] text-[#8E3742] border border-[#E2D7BB] hover:bg-[#FAEEEE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Seleccionar un compuesto al azar"
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
            onClick={handleResetSpectrum}
            className="px-3 py-1.5 text-xs font-medium text-[#8E3742] bg-[#FAF7EE] hover:bg-[#FAEEEE] border border-[#E2D7BB] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Barrido</span>
          </button>
        </div>
      </div>

      {/* Onboarding Guide */}
      {showGuide && (
        <UvVisOnboardingGuide
          onClose={() => setShowGuide(false)}
          onStartSimulation={() => setShowGuide(false)}
        />
      )}

      {/* 12 Chromophore Groups Library Selector */}
      <div className="bg-[#FAF7EE] rounded-2xl p-5 border border-[#E2D7BB] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-3">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-[#8E3742]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#122630]">
              Biblioteca UV-Vis: {UVVIS_GROUPS_DATA.length} Familias Cromofóricas ({ALL_UVVIS_COMPOUNDS.length} Compuestos)
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
                    ? `Buscar en ${ALL_UVVIS_COMPOUNDS.length} compuestos...`
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
                ? `Todos (${ALL_UVVIS_COMPOUNDS.length})`
                : `Grupo (${activeGroup.compounds.length})`}
            </button>
          </div>
        </div>

        {/* 12 Groups Tabs Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5">
          {UVVIS_GROUPS_DATA.map((group, idx) => {
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

        {/* Active Group Spectral Signature Banner */}
        <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] text-xs space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#8E3742] font-mono text-[11px]">
            <span className="font-bold">
              Familia: {activeGroup.name} · {activeGroup.chromophoreType}
            </span>
            <span className="text-[#7C957D]">Calibración Beer-Lambert (200–800 nm)</span>
          </div>
          <p className="text-[11px] text-[#1C3947]/90 leading-relaxed">
            <strong className="text-[#122630]">Firma Espectral Típica: </strong>
            {activeGroup.spectralSignature}
          </p>
        </div>

        {/* Compound Grid */}
        <div className="space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#1C3947]/70 px-1 gap-1">
            <span>
              {searchGlobal
                ? `Resultados globales (${visibleCompounds.length}):`
                : `Muestras en ${activeGroup.name} (${visibleCompounds.length} de ${activeGroup.compounds.length}):`}
            </span>
            <span className="font-mono text-[11px] text-[#8E3742]">
              Activa: <strong>{selectedCompound.name}</strong> ({selectedCompound.formula}) · Solvente: {selectedCompound.solvent} · λ_max = {selectedCompound.lambdaMain} nm
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
            {visibleCompounds.map((compound) => {
              const isSelected = selectedCompound.id === compound.id;
              return (
                <button
                  key={compound.id}
                  onClick={() => handleSelectCompound(compound)}
                  className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742] shadow-md ring-2 ring-[#8E3742]/40'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:bg-[#F7F3E7] hover:border-[#8E3742]/60'
                  }`}
                >
                  <div className="flex justify-between items-center gap-1.5">
                    <span className="font-bold text-xs truncate">{compound.name}</span>
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border border-black/20"
                      style={{ backgroundColor: compound.solutionColorHex }}
                      title={`Color aparente de la solución (${compound.solvent})`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80 mt-1.5 pt-1 border-t border-current/10">
                    <span className="truncate">{compound.formula}</span>
                    <span className={isSelected ? 'text-[#EFC4BF]' : 'text-[#8E3742]'}>
                      {compound.lambdaMain} nm
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Optical Bench + Parameters + Live UV-Vis Spectrum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Optical Beam Canvas + Live UV-Vis Spectrum */}
        <div className="lg:col-span-7 space-y-5">
          {/* Optical Bench Canvas */}
          <div className="bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-3 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A9C2D2] px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7C957D] animate-ping" />
                TREN ÓPTICO DOBLE HAZ (I₀ vs I)
              </span>
              <span className="truncate ml-2">
                <strong className="text-[#EFC4BF]">{selectedCompound.name}</strong> en {selectedCompound.solvent}
              </span>
            </div>

            <div className="relative w-full aspect-[16/10] bg-[#071116] rounded-xl overflow-hidden border border-[#162E3B]">
              <canvas ref={canvasRef} width={540} height={310} className="w-full h-full" />

              {/* Band overlay quick box */}
              <div className="hidden sm:block absolute bottom-2 left-2 bg-[#122630]/90 backdrop-blur-md p-2 rounded-lg border border-[#1C3947] text-[10px] font-mono text-[#A9C2D2] max-w-[230px]">
                <span className="text-[#FAF7EE] font-bold block">Descripción Analito:</span>
                <span className="line-clamp-2">{selectedCompound.description}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono p-2 bg-[#122630] rounded-xl border border-[#1C3947] text-[#FAF7EE]">
              <div>
                <div className="text-[#A9C2D2] text-[10px]">
                  {isUvLamp ? 'FUENTE DEUTERIO (D₂)' : 'FUENTE TUNGSTENO (W)'}
                </div>
                <div className="text-[#EFC4BF] font-bold tabular-nums">
                  {lambdaNm} nm · {photonEnergyEv.toFixed(2)} eV
                </div>
              </div>
              <div>
                <div className="text-[#A9C2D2] text-[10px]">ABSORBANCIA A = ε·b·c</div>
                <div className="text-[#FAF7EE] font-bold tabular-nums">
                  {currentAbsorbance.toFixed(3)} UA
                </div>
              </div>
              <div>
                <div className="text-[#A9C2D2] text-[10px]">TRANSMITANCIA (%T)</div>
                <div className="text-[#7C957D] font-bold tabular-nums">
                  {currentTransmittancePct.toFixed(1)}% (I/I₀)
                </div>
              </div>
            </div>
          </div>

          {/* Live Real-Time UV-Vis Spectrum Card */}
          <div className="bg-[#122630] rounded-2xl border border-[#1C3947] p-5 text-[#FAF7EE] space-y-3 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C3947] pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#EFC4BF]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7EE]">
                  Espectro Electrónico UV-Vis (200–800 nm)
                </h4>
              </div>

              <div className="flex items-center gap-1 bg-[#0C1A22] p-0.5 rounded-lg border border-[#1C3947] self-start sm:self-auto">
                <button
                  onClick={() => setDisplayMetric('abs')}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-colors ${
                    displayMetric === 'abs'
                      ? 'bg-[#8E3742] text-[#FAF7EE] font-bold'
                      : 'text-[#A9C2D2] hover:text-[#FAF7EE]'
                  }`}
                >
                  Absorbancia (A)
                </button>
                <button
                  onClick={() => setDisplayMetric('trans')}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-colors ${
                    displayMetric === 'trans'
                      ? 'bg-[#7C957D] text-[#FAF7EE] font-bold'
                      : 'text-[#A9C2D2] hover:text-[#FAF7EE]'
                  }`}
                >
                  Transmitancia (%T)
                </button>
              </div>
            </div>

            {/* Interactive SVG Spectrum Chart */}
            <div className="bg-[#0C1A22] rounded-xl p-2.5 border border-[#1C3947]">
              <svg viewBox="0 0 460 195" className="w-full h-52 overflow-visible">
                <defs>
                  <linearGradient id="uvVisAxisGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4C1D95" />
                    <stop offset="30%" stopColor="#7C3AED" />
                    <stop offset="38%" stopColor="#3B82F6" />
                    <stop offset="52%" stopColor="#10B981" />
                    <stop offset="65%" stopColor="#EAB308" />
                    <stop offset="78%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#7F1D1D" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((frac, idx) => {
                  const y = 16 + frac * 138;
                  const label =
                    displayMetric === 'abs'
                      ? ((1 - frac) * 3.0).toFixed(1)
                      : `${Math.round((1 - frac) * 100)}%`;
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
                      <text x="32" y={y + 3} textAnchor="end" fill="#A9C2D2" fontSize="8" fontFamily="monospace">
                        {label}
                      </text>
                    </g>
                  );
                })}

                {/* Visible light soft background band (380-750 nm) */}
                {(() => {
                  const x380 = 38 + ((380 - 200) / 600) * 404;
                  const x750 = 38 + ((750 - 200) / 600) * 404;
                  return (
                    <rect
                      x={x380}
                      y="16"
                      width={x750 - x380}
                      height="138"
                      fill="#1C3947"
                      opacity="0.22"
                    />
                  );
                })()}

                {/* 340 nm Lamp Switch Line */}
                {(() => {
                  const x340 = 38 + ((340 - 200) / 600) * 404;
                  return (
                    <g>
                      <line x1={x340} y1="16" x2={x340} y2="154" stroke="#7696AA" strokeDasharray="2,3" strokeWidth="1" />
                      <text x={x340 + 3} y="25" fill="#7696AA" fontSize="7" fontFamily="monospace">
                        340nm D₂↔W
                      </text>
                    </g>
                  );
                })()}

                {/* Reference Dashed Full Curve */}
                <path
                  d={spectrumPoints
                    .map((pt, i) => {
                      const x = 38 + ((pt.nm - 200) / 600) * 404;
                      const valNorm =
                        displayMetric === 'abs'
                          ? Math.min(1, pt.abs / 3.0)
                          : pt.trans / 100;
                      const y = 154 - valNorm * 138;
                      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#A9C2D2"
                  strokeOpacity="0.35"
                  strokeDasharray="4,3"
                  strokeWidth="1.5"
                />

                {/* Active Swept Bright Curve */}
                <path
                  d={spectrumPoints
                    .filter((pt) => !isAutoSweeping || pt.nm <= sweepProgressNm + 4)
                    .map((pt, i) => {
                      const x = 38 + ((pt.nm - 200) / 600) * 404;
                      const valNorm =
                        displayMetric === 'abs'
                          ? Math.min(1, pt.abs / 3.0)
                          : pt.trans / 100;
                      const y = 154 - valNorm * 138;
                      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={displayMetric === 'abs' ? '#EFC4BF' : '#7C957D'}
                  strokeWidth="2.5"
                />

                {/* Clickable Band Peaks Markers */}
                {selectedCompound.bands.map((band, idx) => {
                  const x = 38 + ((band.lambdaMax - 200) / 600) * 404;
                  const bandAbs = computeUvVisAbsorbance(
                    selectedCompound,
                    band.lambdaMax,
                    effectiveConcMm,
                    pathLengthCm,
                    slitWidthNm,
                    cuvetteMaterial
                  );
                  const valNorm =
                    displayMetric === 'abs'
                      ? Math.min(1, bandAbs / 3.0)
                      : Math.pow(10, -bandAbs);
                  const y = 154 - valNorm * 138;
                  const isBandSelected = selectedBandDetails?.lambdaMax === band.lambdaMax;
                  return (
                    <g
                      key={idx}
                      onClick={() => {
                        setSelectedBandDetails(band);
                        if (!isAutoSweeping) setLambdaNm(band.lambdaMax);
                      }}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isBandSelected ? 5.5 : 4}
                        fill={band.isPrimaryPeak ? '#8E3742' : '#7C957D'}
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
                        {band.lambdaMax}
                      </text>
                    </g>
                  );
                })}

                {/* Active Wavelength Cursor */}
                {(() => {
                  const cx = 38 + ((lambdaNm - 200) / 600) * 404;
                  const valNorm =
                    displayMetric === 'abs'
                      ? Math.min(1, currentAbsorbance / 3.0)
                      : currentTransmittancePct / 100;
                  const cy = 154 - valNorm * 138;
                  return (
                    <g>
                      <line
                        x1={cx}
                        y1="16"
                        x2={cx}
                        y2="154"
                        stroke={wavelengthToColor(lambdaNm)}
                        strokeWidth="1.5"
                        strokeOpacity="0.85"
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r="4.5"
                        fill={wavelengthToColor(lambdaNm)}
                        stroke="#FAF7EE"
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })()}

                {/* Spectrum Color Strip along X Axis */}
                <rect x="38" y="157" width="404" height="5" rx="2" fill="url(#uvVisAxisGrad)" />

                {/* X-Axis Wavelength Labels */}
                {[200, 300, 400, 500, 600, 700, 800].map((tickNm) => {
                  const x = 38 + ((tickNm - 200) / 600) * 404;
                  return (
                    <text
                      key={tickNm}
                      x={x}
                      y="174"
                      textAnchor="middle"
                      fill="#A9C2D2"
                      fontSize="8.5"
                      fontFamily="monospace"
                    >
                      {tickNm}
                    </text>
                  );
                })}
                <text x="240" y="188" textAnchor="middle" fill="#A9C2D2" fontSize="8.5" fontFamily="monospace">
                  Longitud de Onda λ (nm) · UV (200–380) | Visible (380–750)
                </text>
              </svg>
            </div>

            {/* Electronic Transition Inspector Box */}
            {selectedBandDetails ? (
              <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] text-xs space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[#EFC4BF] font-mono">
                  <span className="font-bold">
                    Banda λ_max = {selectedBandDetails.lambdaMax} nm ({selectedBandDetails.transition})
                  </span>
                  <span className="text-[10px] text-[#7C957D]">
                    ε = {selectedBandDetails.epsilon.toLocaleString()} L·mol⁻¹·cm⁻¹
                  </span>
                </div>
                <p className="text-[11px] text-[#FAF7EE]/90 leading-relaxed">
                  {selectedBandDetails.description}
                </p>
              </div>
            ) : (
              <div className="text-[11px] text-[#A9C2D2] text-center italic py-1">
                Haz clic en cualquier punto marcado λ_max sobre el espectro para inspeccionar su transición electrónica.
              </div>
            )}
          </div>
        </div>

        {/* Right 5 cols: Operational Controls Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8E3742] flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Parámetros Ópticos &amp; Beer-Lambert
              </h3>
              <button
                onClick={() => setIsAutoSweeping(!isAutoSweeping)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg cursor-pointer transition-colors ${
                  isAutoSweeping
                    ? 'bg-[#8E3742] text-[#FAF7EE]'
                    : 'bg-[#EFE8D3] text-[#122630]'
                }`}
              >
                {isAutoSweeping ? '● Barrido Auto ON' : '○ Barrido Manual'}
              </button>
            </div>

            {/* Slider 1: Wavelength */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Longitud de Onda (λ):</span>
                <span className="font-mono text-[#8E3742] font-bold tabular-nums">
                  {lambdaNm} nm ({isUvLamp ? 'UV · D₂' : 'Vis · W'})
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={800}
                step={2}
                value={lambdaNm}
                disabled={isAutoSweeping}
                onChange={(e) => setLambdaNm(clampNumber(e.target.value, 200, 800))}
                className="w-full accent-[#8E3742] cursor-pointer disabled:opacity-50"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                Energía del fotón: E = hc/λ = {photonEnergyEv.toFixed(2)} eV.
              </span>
            </div>

            {/* Slider 2: Concentration Factor */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Concentración de Muestra (c):</span>
                <span className="font-mono text-[#8E3742] font-bold tabular-nums">
                  {effectiveConcMm.toFixed(3)} mM ({concMultiplier.toFixed(2)}×)
                </span>
              </div>
              <input
                type="range"
                min={0.1}
                max={2.5}
                step={0.05}
                value={concMultiplier}
                onChange={(e) => setConcMultiplier(clampNumber(e.target.value, 0.1, 2.5))}
                className="w-full accent-[#8E3742] cursor-pointer"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                Escala linealmente la altura del espectro conforme a A = ε · b · c.
              </span>
            </div>

            {/* Slider 3: Optical Path Length b */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Paso Óptico de Cubeta (b):</span>
                <span className="font-mono text-[#7C957D] font-bold tabular-nums">
                  {pathLengthCm.toFixed(1)} cm
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2.0}
                step={0.5}
                value={pathLengthCm}
                onChange={(e) => setPathLengthCm(clampNumber(e.target.value, 0.5, 2.0))}
                className="w-full accent-[#7C957D] cursor-pointer"
              />
            </div>

            {/* Slider 4: Slit Width SBW */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Rendija Espectral (SBW):</span>
                <span className="font-mono text-[#122630] font-bold tabular-nums">
                  {slitWidthNm.toFixed(1)} nm
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5.0}
                step={0.5}
                value={slitWidthNm}
                onChange={(e) => setSlitWidthNm(clampNumber(e.target.value, 0.5, 5.0))}
                className="w-full accent-[#122630] cursor-pointer"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                {slitWidthNm <= 1.0
                  ? 'Alta resolución: conserva dedos vibrónicos finos (ej. Benceno, Antraceno).'
                  : 'Rendija ancha: aumenta el flujo fotónico pero ensancha y achata los picos estrechos.'}
              </span>
            </div>

            {/* Cuvette Material Selector */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-medium text-[#122630] block">
                Material de la Cubeta (Transparencia UV):
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCuvetteMaterial('quartz')}
                  className={`py-1.5 px-2 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                    cuvetteMaterial === 'quartz'
                      ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB]'
                  }`}
                >
                  Cuarzo (&gt;190nm)
                </button>
                <button
                  onClick={() => setCuvetteMaterial('plastic')}
                  className={`py-1.5 px-2 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                    cuvetteMaterial === 'plastic'
                      ? 'bg-[#A9C2D2] text-[#122630] border-[#A9C2D2]'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB]'
                  }`}
                >
                  PMMA (&gt;300nm)
                </button>
                <button
                  onClick={() => setCuvetteMaterial('glass')}
                  className={`py-1.5 px-2 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                    cuvetteMaterial === 'glass'
                      ? 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742]'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB]'
                  }`}
                >
                  Vidrio (&gt;330nm)
                </button>
              </div>
              {cutoffWarning && (
                <div className="text-[11px] text-[#8E3742] font-semibold flex items-start gap-1.5 mt-1 bg-[#FAEEEE] p-2.5 rounded-lg border border-[#F3D4D6]">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Corte óptico de cubeta: a {lambdaNm} nm el {cuvetteMaterial === 'glass' ? 'vidrio' : 'plástico PMMA'} absorbe la luz UV y satura el detector. Cambia a Cuarzo Suprasil.
                  </span>
                </div>
              )}
            </div>

            {/* Band List for Selected Compound */}
            <div className="pt-2 border-t border-[#E2D7BB] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#122630] block">
                Bandas Electrónicas de {selectedCompound.name}:
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {selectedCompound.bands.map((band, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedBandDetails(band);
                      setIsAutoSweeping(false);
                      setLambdaNm(band.lambdaMax);
                    }}
                    className={`w-full text-left p-2 rounded-lg border text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      selectedBandDetails?.lambdaMax === band.lambdaMax
                        ? 'bg-[#122630] text-[#FAF7EE] border-[#8E3742]'
                        : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB] hover:bg-[#F7F3E7]'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-mono font-bold block truncate">
                        {band.lambdaMax} nm · {band.transition}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] shrink-0 text-[#EFC4BF] bg-[#8E3742]/90 px-1.5 py-0.5 rounded">
                      ε={band.epsilon.toLocaleString()}
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
