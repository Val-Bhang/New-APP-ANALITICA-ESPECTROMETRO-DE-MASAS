import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CompoundSample } from '../data/spectrometryData';
import { ALL_FUNCTIONAL_GROUPS, ALL_COMPOUNDS, FunctionalGroupCategory } from '../data/functionalGroupsData';
import { SimulatorOnboardingGuide } from './SimulatorOnboardingGuide';
import { clampNumber } from '../utils/safeNumber';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Flame, 
  Sliders, 
  Info, 
  Gauge, 
  Sparkles, 
  Activity, 
  Layers, 
  Wind,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Search,
  Shuffle,
  ChevronDown,
  ChevronUp,
  Tag,
  Dna,
  Shield,
  Atom
} from 'lucide-react';

export const MassSimulator: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('alkanes');
  const [selectedCompound, setSelectedCompound] = useState<CompoundSample>(ALL_FUNCTIONAL_GROUPS[0].compounds[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchGlobal, setSearchGlobal] = useState<boolean>(false);
  const [bField, setBField] = useState<number>(0.55); // Tesla
  const [accVoltage, setAccVoltage] = useState<number>(3500); // Volts
  const [electronEnergy, setElectronEnergy] = useState<number>(70); // eV
  const [vacuumLevel, setVacuumLevel] = useState<'high' | 'medium' | 'poor'>('high');
  const [isAutoSweeping, setIsAutoSweeping] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [detectedCounts, setDetectedCounts] = useState<{ [mz: number]: number }>({});
  const [selectedPeakDetails, setSelectedPeakDetails] = useState<any | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const countsRef = useRef<{ [mz: number]: number }>({});

  const activeGroup = useMemo(() => {
    return ALL_FUNCTIONAL_GROUPS.find((g) => g.id === selectedGroupId) || ALL_FUNCTIONAL_GROUPS[0];
  }, [selectedGroupId]);

  // Filtered compounds based on active group or global search
  const visibleCompounds = useMemo(() => {
    const list = searchGlobal ? ALL_COMPOUNDS : activeGroup.compounds;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.formula.toLowerCase().includes(q) ||
        c.molarMass.toString() === q ||
        c.basePeakMz.toString() === q ||
        c.description.toLowerCase().includes(q)
    );
  }, [activeGroup, searchGlobal, searchQuery]);

  // Reset counts when compound changes
  const handleResetSpectrum = () => {
    countsRef.current = {};
    setDetectedCounts({});
    setSelectedPeakDetails(null);
  };

  const handleSelectCompound = (c: CompoundSample) => {
    setSelectedCompound(c);
    handleResetSpectrum();
  };

  // Pick a random compound from the 240 library
  const handlePickRandomCompound = () => {
    const randomIndex = Math.floor(Math.random() * ALL_COMPOUNDS.length);
    const chosen = ALL_COMPOUNDS[randomIndex];
    // Find its group
    const parentGroup = ALL_FUNCTIONAL_GROUPS.find((g) => g.compounds.some((c) => c.id === chosen.id));
    if (parentGroup) {
      setSelectedGroupId(parentGroup.id);
    }
    setSelectedCompound(chosen);
    handleResetSpectrum();
  };

  // Physics simulation engine calibrated across 240 compounds
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sweepDirection = 1;
    let currentB = bField;

    interface SimParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      mz: number;
      formula: string;
      color: string;
      scattered: boolean;
      detected: boolean;
    }

    const particles: SimParticle[] = [];

    const getColorForMz = (mz: number, isBase?: boolean, isMolecular?: boolean) => {
      if (isBase) return '#8E3742'; // Rosewood for base peak
      if (isMolecular) return '#7C957D'; // Sage leaf for molecular ion
      return '#A9C2D2'; // Misty sky for fragments
    };

    // Calculate dynamic scaling constant so all ions across any mass range can resonate with detector slit
    const maxMass = Math.max(selectedCompound.molarMass, ...selectedCompound.peaks.map((p) => p.mz));
    const targetMidB = 0.60;
    const refConstant = Math.sqrt(maxMass * (accVoltage / 3500)) / (targetMidB * 1.05);

    let frame = 0;
    const loop = () => {
      if (isPlaying) {
        frame++;

        // Auto sweep logic
        if (isAutoSweeping) {
          currentB += 0.0022 * sweepDirection;
          if (currentB >= 1.05) {
            sweepDirection = -1;
          } else if (currentB <= 0.22) {
            sweepDirection = 1;
          }
          setBField(Number(currentB.toFixed(3)));
        } else {
          currentB = bField;
        }

        // Spawn particles based on compound's peaks
        if (frame % 4 === 0) {
          const totalAbundance = selectedCompound.peaks.reduce((acc, p) => {
            if (electronEnergy < 25 && !p.isMolecularIon) return acc + p.relativeAbundance * 0.1;
            return acc + p.relativeAbundance;
          }, 0);

          let r = Math.random() * totalAbundance;
          let chosen = selectedCompound.peaks[0];

          for (const peak of selectedCompound.peaks) {
            const weight =
              electronEnergy < 25 && !peak.isMolecularIon
                ? peak.relativeAbundance * 0.1
                : peak.relativeAbundance;
            r -= weight;
            if (r <= 0) {
              chosen = peak;
              break;
            }
          }

          particles.push({
            x: 50,
            y: 160 + (Math.random() - 0.5) * 6,
            vx: 2.5 * Math.sqrt(accVoltage / 3500),
            vy: (Math.random() - 0.5) * 0.25,
            mz: chosen.mz,
            formula: chosen.fragmentFormula,
            color: getColorForMz(chosen.mz, chosen.isBasePeak, chosen.isMolecularIon),
            scattered: false,
            detected: false,
          });
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Machine Schematic Outline
      // Ionizer chamber
      ctx.fillStyle = '#0C1A22';
      ctx.fillRect(20, 130, 140, 60);
      ctx.strokeStyle = '#1C3947';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 130, 140, 60);

      // Ionizer filament glow
      ctx.strokeStyle = '#EFC4BF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(85, 130);
      ctx.lineTo(95, 145);
      ctx.lineTo(105, 130);
      ctx.stroke();

      // Acceleration slits
      ctx.strokeStyle = '#8E3742';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(150, 132);
      ctx.lineTo(150, 153);
      ctx.moveTo(150, 167);
      ctx.lineTo(150, 188);
      ctx.stroke();

      ctx.strokeStyle = '#7C957D';
      ctx.beginPath();
      ctx.moveTo(180, 132);
      ctx.lineTo(180, 155);
      ctx.moveTo(180, 165);
      ctx.lineTo(180, 188);
      ctx.stroke();

      // Curved Magnetic Flight Tube (Radius R_target = 150)
      ctx.strokeStyle = '#162E3B';
      ctx.lineWidth = 52;
      ctx.beginPath();
      ctx.arc(320, 160, 150, Math.PI, 0.5 * Math.PI, true);
      ctx.stroke();

      ctx.strokeStyle = '#274B5C';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(320, 160, 124, Math.PI, 0.5 * Math.PI, true);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(320, 160, 176, Math.PI, 0.5 * Math.PI, true);
      ctx.stroke();

      // Magnetic Sector Pole Area
      ctx.fillStyle = 'rgba(142, 55, 66, 0.16)';
      ctx.strokeStyle = '#8E3742';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(230, 40);
      ctx.lineTo(440, 40);
      ctx.lineTo(440, 240);
      ctx.lineTo(230, 240);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // B-field info in magnetic sector
      ctx.fillStyle = '#EFC4BF';
      ctx.font = '11px monospace';
      ctx.fillText(`CAMPO B = ${currentB.toFixed(3)} T`, 245, 60);

      // Detector Exit Slit at 90 degrees: around (320, 310)
      ctx.fillStyle = '#7C957D';
      ctx.fillRect(302, 305, 14, 8);
      ctx.fillRect(324, 305, 14, 8);
      ctx.fillText('Rendija Colectora', 345, 312);

      // Dynode Detector Horn
      ctx.fillStyle = '#1C3947';
      ctx.beginPath();
      ctx.moveTo(310, 313);
      ctx.quadraticCurveTo(320, 350, 345, 360);
      ctx.lineTo(315, 360);
      ctx.closePath();
      ctx.fill();

      // 2. Physics Particle Trajectory Integration
      const R_TARGET = 150;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Vacuum collision check
        if (vacuumLevel !== 'high' && !p.scattered) {
          const collProb = vacuumLevel === 'poor' ? 0.05 : 0.015;
          if (Math.random() < collProb && p.x > 140) {
            p.scattered = true;
            p.vx = (Math.random() - 0.5) * 3;
            p.vy = (Math.random() - 0.5) * 3;
          }
        }

        if (!p.scattered) {
          if (p.x < 220) {
            p.x += p.vx;
            p.y += p.vy;
          } else if (p.x >= 220 && p.y < 310) {
            // Curvature by Lorentz force
            const rPhys = (Math.sqrt(p.mz * (accVoltage / 3500)) / (currentB * refConstant)) * R_TARGET;
            const curvature = 1 / Math.max(20, rPhys);

            const vMag = Math.hypot(p.vx, p.vy);
            const angle = Math.atan2(p.vy, p.vx) + curvature * (p.vx > 0 ? 1.9 : 1.2);

            p.vx = Math.cos(angle) * vMag;
            p.vy = Math.sin(angle) * vMag;

            p.x += p.vx;
            p.y += p.vy;
          } else {
            p.x += p.vx;
            p.y += p.vy;
          }

          // Check if hitting detector slit
          if (p.y >= 305 && p.y <= 316 && p.x >= 314 && p.x <= 324 && !p.detected) {
            p.detected = true;
            ctx.fillStyle = '#FAF7EE';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
            ctx.fill();

            countsRef.current[p.mz] = (countsRef.current[p.mz] || 0) + 1;
            setDetectedCounts({ ...countsRef.current });
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        ctx.fillStyle = p.scattered ? '#8E3742' : p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animId);
  }, [selectedCompound, bField, accVoltage, electronEnergy, vacuumLevel, isAutoSweeping, isPlaying]);

  const maxDetectedCount = Math.max(1, ...Object.values(detectedCounts));

  return (
    <div className="w-full space-y-6">
      {/* Header and overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E2D7BB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#8E3742] uppercase tracking-wider mb-1">
            <span>Laboratorio Virtual de Espectrometría de Masas</span>
            <span aria-hidden="true">·</span>
            <span>240 Compuestos Químicos</span>
            <span aria-hidden="true">·</span>
            <span>12 Grupos Funcionales (20 Muestras c/u)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#122630] tracking-tight">
            Simulador de Haz &amp; Espectrograma en Tiempo Real
          </h2>
          <p className="text-sm text-[#1C3947]/80 max-w-3xl mt-1">
            Explora la fragmentación y deflexión balística de 20 compuestos reales para cada uno de los 12 grupos funcionales. Modifica el campo magnético (B), voltaje (V) y vacío para observar cómo cada masa impacta el detector.
          </p>
        </div>

        {/* Action Button Cluster */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePickRandomCompound}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF7EE] text-[#8E3742] border border-[#E2D7BB] hover:bg-[#FAEEEE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Seleccionar un compuesto al azar de los 240 disponibles"
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
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* Step by Step Onboarding Guide */}
      {showGuide && (
        <SimulatorOnboardingGuide
          onClose={() => setShowGuide(false)}
          onStartSimulation={() => setShowGuide(false)}
        />
      )}

      {/* SECTION: 12 Functional Groups & 20 Compound Library Selector */}
      <div className="bg-[#FAF7EE] rounded-2xl p-5 border border-[#E2D7BB] shadow-sm space-y-4">
        {/* Top Control Bar of the Library */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D7BB] pb-3">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-[#8E3742]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#122630]">
              Biblioteca Espectral: 12 Grupos Funcionales (20 Muestras c/u = 240 Compuestos)
            </h3>
          </div>

          {/* Search bar & mode */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#1C3947]/50 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={60}
                placeholder={searchGlobal ? 'Buscar en 240 compuestos...' : `Buscar en ${activeGroup.name}...`}
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
              title="Alternar entre buscar solo en el grupo activo o en los 240 compuestos globales"
            >
              {searchGlobal ? 'Todos (240)' : 'Grupo (20)'}
            </button>
          </div>
        </div>

        {/* 12 Functional Groups Tabs Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {ALL_FUNCTIONAL_GROUPS.map((group, idx) => {
            const isGroupActive = selectedGroupId === group.id && !searchGlobal;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setSearchGlobal(false);
                  // Default to first compound of this group
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
                  20
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Group Spectral Signature Banner */}
        <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#E2D7BB] text-xs space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#8E3742] font-mono text-[11px]">
            <span className="font-bold">
              Grupo Seleccionado: {activeGroup.name} ({activeGroup.generalFormula})
            </span>
            <span className="text-[#7C957D]">20 ejemplos químicos calibrados para EI-MS</span>
          </div>
          <p className="text-[11px] text-[#1C3947]/90 leading-relaxed">
            <strong className="text-[#122630]">Firma de Fragmentación Típica: </strong>
            {activeGroup.spectralSignature}
          </p>
        </div>

        {/* Grid of the 20 Compounds of the active group */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#1C3947]/70 px-1">
            <span>
              {searchGlobal ? 'Resultados globales en biblioteca:' : `Muestras en ${activeGroup.name} (${visibleCompounds.length} de 20):`}
            </span>
            <span className="font-mono text-[11px] text-[#8E3742]">
              Activa: <strong>{selectedCompound.name}</strong> ({selectedCompound.formula}) · M = {selectedCompound.molarMass} Da
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
                  <div className="flex justify-between items-baseline gap-1">
                    <span className="font-bold text-xs truncate">{compound.name}</span>
                    <span className="font-mono text-[11px] opacity-85 shrink-0">{compound.formula}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80 mt-1.5 pt-1 border-t border-current/10">
                    <span>M = {compound.molarMass}</span>
                    <span className="text-[#EFC4BF]">Base: {compound.basePeakMz}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Interactive Particle Canvas */}
        <div className="lg:col-span-7 bg-[#0C1A22] rounded-2xl border border-[#1C3947] p-3 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#A9C2D2] px-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7C957D] animate-ping" />
              TÚNEL DE VUELO ALTO VACÍO
            </span>
            <span>
              Muestra: <strong className="text-[#EFC4BF]">{selectedCompound.name} ({selectedCompound.formula})</strong> · M={selectedCompound.molarMass} Da
            </span>
          </div>

          <div className="relative w-full aspect-[16/10] bg-[#071116] rounded-xl overflow-hidden border border-[#162E3B]">
            <canvas ref={canvasRef} width={500} height={380} className="w-full h-full" />

            {/* Real-time Legend Overlay */}
            <div className="absolute top-2 left-2 bg-[#122630]/90 backdrop-blur-md p-2 rounded-lg border border-[#1C3947] text-[10px] font-mono space-y-1 max-w-[170px]">
              <div className="text-[#A9C2D2] font-bold border-b border-[#1C3947] pb-0.5">Iones en Haz:</div>
              {selectedCompound.peaks.map((p) => (
                <div key={p.mz} className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: p.isBasePeak ? '#8E3742' : p.isMolecularIon ? '#7C957D' : '#A9C2D2',
                    }}
                  />
                  <span className="text-[#FAF7EE] truncate">{p.fragmentFormula}</span>
                  <span className="text-[#A9C2D2] ml-auto shrink-0 font-bold">m/z {p.mz}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Canvas Bottom Telemetry */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono p-2 bg-[#122630] rounded-xl border border-[#1C3947] text-[#FAF7EE]">
            <div>
              <div className="text-[#A9C2D2] text-[10px]">CAMPO B (LORENTZ)</div>
              <div className="text-[#EFC4BF] font-bold">{bField.toFixed(3)} Tesla</div>
            </div>
            <div>
              <div className="text-[#A9C2D2] text-[10px]">VOLTAJE V (ACELERADOR)</div>
              <div className="text-[#7C957D] font-bold">{accVoltage} V</div>
            </div>
            <div>
              <div className="text-[#A9C2D2] text-[10px]">PRESIÓN CÁMARA</div>
              <div className={vacuumLevel === 'high' ? 'text-[#7C957D]' : 'text-[#8E3742]'}>
                {vacuumLevel === 'high' ? '10⁻⁶ Torr' : vacuumLevel === 'medium' ? '10⁻³ Torr' : '1 Torr (Fuga)'}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Live Parameters Deck & Spectrum Display */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controls Card */}
          <div className="bg-[#FAF7EE] rounded-2xl border border-[#E2D7BB] p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2D7BB] pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8E3742] flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Parámetros Operativos del Equipo
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

            {/* Slider 1: Magnetic Field B */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Intensidad Electroimán (B):</span>
                <span className="font-mono text-[#8E3742] font-bold">{bField.toFixed(3)} Tesla</span>
              </div>
              <input
                type="range"
                min={0.20}
                max={1.15}
                step={0.005}
                value={bField}
                disabled={isAutoSweeping}
                onChange={(e) => setBField(clampNumber(e.target.value, 0.20, 1.15))}
                className="w-full accent-[#8E3742] cursor-pointer disabled:opacity-50"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                Fuerza centrípeta de Lorentz: Curva iones según m/z = (e·B²·r²) / (2·V).
              </span>
            </div>

            {/* Slider 2: Accelerating Voltage V */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Voltaje de Aceleración (V):</span>
                <span className="font-mono text-[#7C957D] font-bold">{accVoltage} V</span>
              </div>
              <input
                type="range"
                min={1500}
                max={6000}
                step={100}
                value={accVoltage}
                onChange={(e) => setAccVoltage(clampNumber(e.target.value, 1500, 6000))}
                className="w-full accent-[#7C957D] cursor-pointer"
              />
            </div>

            {/* Radio: Vacuum Level */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-[#122630] block">Calidad del Alto Vacío:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setVacuumLevel('high')}
                  className={`py-1.5 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                    vacuumLevel === 'high'
                      ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB]'
                  }`}
                >
                  Óptimo (10⁻⁶)
                </button>
                <button
                  onClick={() => setVacuumLevel('medium')}
                  className={`py-1.5 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                    vacuumLevel === 'medium'
                      ? 'bg-[#A9C2D2] text-[#122630] border-[#A9C2D2]'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB]'
                  }`}
                >
                  Medio (10⁻³)
                </button>
                <button
                  onClick={() => setVacuumLevel('poor')}
                  className={`py-1.5 text-xs rounded-lg font-medium cursor-pointer transition-colors border ${
                    vacuumLevel === 'poor'
                      ? 'bg-[#8E3742] text-[#FAF7EE] border-[#8E3742]'
                      : 'bg-[#FFFDF9] text-[#122630] border-[#E2D7BB]'
                  }`}
                >
                  Fuga (1 Torr)
                </button>
              </div>
              {vacuumLevel === 'poor' && (
                <div className="text-[11px] text-[#8E3742] font-semibold flex items-center gap-1 mt-1 bg-[#FAEEEE] p-2 rounded">
                  <Wind className="w-3.5 h-3.5" />
                  Dispersión colisional activa: Las moléculas de aire dispersan el haz e impiden la llegada de iones al detector.
                </div>
              )}
            </div>

            {/* Slider 3: Electron Energy eV */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#122630]">Energía del Filamento (eV):</span>
                <span className="font-mono text-[#122630] font-bold">{electronEnergy} eV</span>
              </div>
              <input
                type="range"
                min={15}
                max={100}
                step={5}
                value={electronEnergy}
                onChange={(e) => setElectronEnergy(clampNumber(e.target.value, 15, 100))}
                className="w-full accent-[#8E3742] cursor-pointer"
              />
              <span className="text-[10px] text-[#1C3947]/70 block">
                {electronEnergy < 25
                  ? 'Ionización Suave: Predomina el catión molecular intacto [M]+.'
                  : electronEnergy === 70
                  ? 'Estándar 70 eV NIST: Patrón de fragmentación cuantificado reproducible.'
                  : 'Alta Energía: Fragmentación profunda del analito.'}
              </span>
            </div>
          </div>

          {/* Live Real-Time Mass Spectrum Card */}
          <div className="bg-[#122630] rounded-2xl border border-[#1C3947] p-5 text-[#FAF7EE] space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-[#1C3947] pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#EFC4BF]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7EE]">
                  Espectro de Masas en Tiempo Real
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#A9C2D2]">
                Normalizado al Pico Base (100%)
              </span>
            </div>

            {/* Spectrum Histogram Bars Viewport */}
            <div className="h-44 w-full bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] relative flex items-end justify-between gap-1 overflow-x-auto">
              <div className="absolute inset-x-3 top-3 border-b border-[#1C3947]/60 flex justify-between text-[9px] font-mono text-[#A9C2D2]/60">
                <span>100%</span>
                <span>Abundancia Relativa</span>
              </div>
              <div className="absolute inset-x-3 top-1/2 border-b border-[#1C3947]/40 flex justify-between text-[9px] font-mono text-[#A9C2D2]/40">
                <span>50%</span>
              </div>

              {selectedCompound.peaks.map((p) => {
                const count = detectedCounts[p.mz] || 0;
                const relativePct = maxDetectedCount > 0 ? (count / maxDetectedCount) * 100 : 0;
                const displayHeight = Math.max(3, relativePct);

                return (
                  <div
                    key={p.mz}
                    onClick={() => setSelectedPeakDetails(p)}
                    className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer z-10 min-w-[22px]"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 bg-[#FAF7EE] text-[#122630] text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap border border-[#E2D7BB]">
                      <strong>{p.fragmentFormula}</strong> (m/z {p.mz}) · {relativePct.toFixed(1)}%
                    </div>

                    <div
                      style={{ height: `${displayHeight}%` }}
                      className={`w-full max-w-[22px] rounded-t transition-all duration-300 ${
                        p.isBasePeak
                          ? 'bg-[#8E3742] group-hover:bg-[#EFC4BF]'
                          : p.isMolecularIon
                          ? 'bg-[#7C957D] group-hover:bg-[#9BB09C]'
                          : 'bg-[#A9C2D2] group-hover:bg-[#FFFDF9]'
                      }`}
                    />
                    <span className="text-[9px] font-mono text-[#A9C2D2] mt-1 group-hover:text-[#FAF7EE]">
                      {p.mz}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Peak Inspector Detail Box */}
            {selectedPeakDetails ? (
              <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-between text-[#EFC4BF] font-mono">
                  <span className="font-bold">
                    Pico: {selectedPeakDetails.fragmentFormula} (m/z {selectedPeakDetails.mz})
                  </span>
                  <span className="text-[10px] text-[#7C957D]">
                    {selectedPeakDetails.isBasePeak ? '★ PICO BASE' : selectedPeakDetails.isMolecularIon ? '● ION MOLECULAR' : 'FRAGMENTO'}
                  </span>
                </div>
                <p className="text-[11px] text-[#FAF7EE]/90 leading-relaxed">
                  {selectedPeakDetails.description}
                </p>
              </div>
            ) : (
              <div className="text-[11px] text-[#A9C2D2] text-center italic py-1">
                Haz clic en cualquier barra del espectrograma para examinar su mecanismo de ruptura.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
