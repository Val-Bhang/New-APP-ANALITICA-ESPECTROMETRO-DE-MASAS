import React, { useState, useEffect, useRef } from 'react';
import { clampNumber } from '../utils/safeNumber';

interface FtirPartMicroAnimationProps {
  type:
    | 'globar_source'
    | 'collimator_jstop'
    | 'beamsplitter_michelson'
    | 'hene_moving_mirror'
    | 'sample_atr_kbr'
    | 'detector_dtgs'
    | 'fft_processor';
}

export const FtirPartMicroAnimation: React.FC<FtirPartMicroAnimationProps> = ({ type }) => {
  return (
    <div className="w-full bg-[#122630] rounded-xl p-4 border border-[#1C3947] text-[#FAF7EE] shadow-inner">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1C3947]">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-mono text-[#A9C2D2]">
            Micro-Simulación Infrarroja en Tiempo Real
          </span>
        </div>
        <span className="text-xs text-[#EFC4BF] font-mono">Óptica FTIR</span>
      </div>

      {type === 'globar_source' && <GlobarMicroSim />}
      {type === 'collimator_jstop' && <CollimatorJStopMicroSim />}
      {type === 'beamsplitter_michelson' && <MichelsonBeamsplitterMicroSim />}
      {type === 'hene_moving_mirror' && <HeNeMirrorMicroSim />}
      {type === 'sample_atr_kbr' && <AtrOscillatorMicroSim />}
      {type === 'detector_dtgs' && <DtgsDetectorMicroSim />}
      {type === 'fft_processor' && <FftTransformMicroSim />}
    </div>
  );
};

// 1. GLOBAR BLACKBODY EMISSION (Planck / Wien)
const GlobarMicroSim: React.FC = () => {
  const [tempK, setTempK] = useState<number>(1250);
  const lambdaMaxUm = 2898 / tempK;
  const wnPeak = Math.round(10000 / lambdaMaxUm);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 320 110" className="w-full h-28">
          <line x1="30" y1="88" x2="305" y2="88" stroke="#7696AA" strokeWidth="1.5" />
          <line x1="30" y1="15" x2="30" y2="88" stroke="#7696AA" strokeWidth="1.5" />

          {/* Planck emission across 4000 -> 400 cm^-1 */}
          <path
            d={(() => {
              const pts: string[] = [];
              for (let wn = 4000; wn >= 400; wn -= 100) {
                const lambdaCm = 1 / wn;
                const xFactor = (1.4388 / (lambdaCm * tempK));
                const planck = Math.pow(wn / 4000, 3) / (Math.exp(Math.min(18, xFactor)) - 1);
                const norm = Math.min(1, planck * 115 * Math.pow(tempK / 1250, -0.4));
                const x = 30 + ((4000 - wn) / 3600) * 270;
                const y = 88 - norm * 68;
                pts.push(`${wn === 4000 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
              }
              return pts.join(' ');
            })()}
            fill="none"
            stroke="#EFC4BF"
            strokeWidth="2.5"
          />

          {/* Glowing SiC Globar schematic indicator */}
          <circle cx="272" cy="30" r="11" fill={tempK > 1300 ? '#EFC4BF' : '#8E3742'} opacity="0.85" />
          <circle cx="272" cy="30" r="6" fill="#FAF7EE" opacity={Math.min(1, (tempK - 700) / 900)} />
          <text x="42" y="24" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">
            λ_max = {lambdaMaxUm.toFixed(2)} µm (~{wnPeak} cm⁻¹)
          </text>
          <text x="34" y="102" fill="#A9C2D2" fontSize="8" fontFamily="monospace">4000 cm⁻¹</text>
          <text x="262" y="102" fill="#A9C2D2" fontSize="8" fontFamily="monospace">400 cm⁻¹</text>
        </svg>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Temperatura del Emisor Cerámico SiC (Globar):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{tempK} K</span>
        </label>
        <input
          type="range"
          min={800}
          max={1600}
          step={50}
          value={tempK}
          onChange={(e) => setTempK(clampNumber(e.target.value, 800, 1600))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Sin envoltura de vidrio que bloquee el IR medio, elevar T multiplica la radiancia de cuerpo negro hacia 4000 cm⁻¹ según la Ley de Planck.
      </p>
    </div>
  );
};

// 2. JACQUINOT STOP & COLLIMATION (Throughput vs Divergence)
const CollimatorJStopMicroSim: React.FC = () => {
  const [jStopMm, setJStopMm] = useState<number>(6.0);
  const throughputRel = Math.round(Math.pow(jStopMm / 6.0, 2) * 100);
  const bestResCm = (0.35 * Math.pow(jStopMm / 3.0, 2)).toFixed(1);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 320 110" className="w-full h-28">
          {/* Gold parabolic mirror */}
          <path d="M 35 20 Q 15 55 35 90" fill="none" stroke="#EFC4BF" strokeWidth="4" />
          {/* Collimated rays constrained by aperture */}
          {[-1, -0.5, 0, 0.5, 1].map((f, idx) => {
            const halfH = (jStopMm / 12) * 32;
            const y = 55 + f * halfH;
            return (
              <line
                key={idx}
                x1="28"
                y1={y}
                x2="285"
                y2={y}
                stroke="#8E3742"
                strokeWidth="2"
                strokeOpacity="0.85"
              />
            );
          })}
          {/* J-Stop iris jaws */}
          <rect x="135" y="10" width="12" height={45 - (jStopMm / 12) * 34} fill="#1C3947" stroke="#A9C2D2" />
          <rect
            x="135"
            y={55 + (jStopMm / 12) * 34}
            width="12"
            height={45 - (jStopMm / 12) * 34}
            fill="#1C3947"
            stroke="#A9C2D2"
          />
          <text x="155" y="24" fill="#FAF7EE" fontSize="9" fontFamily="monospace" fontWeight="bold">
            Flujo Φ = {throughputRel}% | Δν̃_mín ≈ {bestResCm} cm⁻¹
          </text>
          <text x="155" y="98" fill="#7C957D" fontSize="8" fontFamily="monospace">
            Apertura Circular Jacquinot ({jStopMm.toFixed(1)} mm)
          </text>
        </svg>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Diámetro de Apertura J-Stop:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{jStopMm.toFixed(1)} mm</span>
        </label>
        <input
          type="range"
          min={1.5}
          max={12.0}
          step={0.5}
          value={jStopMm}
          onChange={(e) => setJStopMm(clampNumber(e.target.value, 1.5, 12.0))}
          className="w-full accent-[#7C957D] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El orificio circular J-Stop admite mucha más potencia luminosa que una rendija estrecha; solo se cierra para resoluciones finas (0.5 cm⁻¹).
      </p>
    </div>
  );
};

// 3. MICHELSON BEAMSPLITTER & OPD INTERFERENCE
const MichelsonBeamsplitterMicroSim: React.FC = () => {
  const [opdUm, setOpdUm] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interference factor at 2000 cm^-1 (5.0 um wavelength) -> constructive at OPD = 0, +-5 um
  const interference = Math.cos((2 * Math.PI * opdUm) / 5.0);
  const netIntensityPct = Math.round(((interference + 1) / 2) * 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0C1A22';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Beamsplitter at 45 degrees in center (cx=145, cy=80)
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(118, 107);
    ctx.lineTo(172, 53);
    ctx.stroke();

    // Fixed mirror right
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(235, 62);
    ctx.lineTo(235, 98);
    ctx.stroke();

    // Moving mirror top (shifted vertically by opdUm)
    const mirrorShift = opdUm * 2.4;
    ctx.strokeStyle = '#7C957D';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(125, 22 - mirrorShift);
    ctx.lineTo(165, 22 - mirrorShift);
    ctx.stroke();

    // Incoming IR beam from left
    ctx.strokeStyle = '#8E3742';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, 80);
    ctx.lineTo(145, 80);
    ctx.stroke();

    // Arm 1 -> Fixed mirror
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(145, 80);
    ctx.lineTo(235, 80);
    ctx.stroke();

    // Arm 2 -> Moving mirror
    ctx.strokeStyle = '#7C957D';
    ctx.beginPath();
    ctx.moveTo(145, 80);
    ctx.lineTo(145, 22 - mirrorShift);
    ctx.stroke();

    // Recombined beam downward to sample
    ctx.strokeStyle = `rgba(239, 196, 191, ${0.18 + (netIntensityPct / 100) * 0.82})`;
    ctx.lineWidth = 2 + (netIntensityPct / 100) * 4;
    ctx.beginPath();
    ctx.moveTo(145, 80);
    ctx.lineTo(145, 138);
    ctx.stroke();

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('KBr/Ge 45°', 82, 114);
    ctx.fillText(`OPD δ = ${opdUm.toFixed(1)} µm`, 225, 24);
    ctx.fillStyle = netIntensityPct > 65 ? '#7C957D' : '#EFC4BF';
    ctx.fillText(`Señal 2000 cm⁻¹: ${netIntensityPct}%`, 190, 134);
  }, [opdUm, netIntensityPct]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Diferencia de Camino Óptico δ (respecto a ZPD = 0):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{opdUm.toFixed(1)} µm</span>
        </label>
        <input
          type="range"
          min={-5.0}
          max={5.0}
          step={0.5}
          value={opdUm}
          onChange={(e) => setOpdUm(clampNumber(e.target.value, -5.0, 5.0))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        En δ = 0 (ZPD), todas las frecuencias suman en fase; al mover el espejo (±2.5 µm), una onda de 5 µm (2000 cm⁻¹) oscila entre interferencia constructiva y destructiva.
      </p>
    </div>
  );
};

// 4. HE-NE LASER & RESOLUTION TRAVEL MICRO-SIM
const HeNeMirrorMicroSim: React.FC = () => {
  const [resCm, setResCm] = useState<number>(4.0);
  const opdCm = 1 / resCm;
  const mirrorTravelMm = (opdCm / 2) * 10;
  const heNeCrossings = Math.round((opdCm * 1e7) / 632.8);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#EFC4BF] font-bold">Láser He-Ne 632.8 nm</span>
          <span className="text-[#7C957D] font-bold tabular-nums">Δν̃ = {resCm.toFixed(1)} cm⁻¹</span>
        </div>

        {/* Sinusoidal He-Ne reference wave */}
        <svg viewBox="0 0 300 58" className="w-full h-14">
          <line x1="8" y1="29" x2="292" y2="29" stroke="#1C3947" strokeWidth="1" />
          <path
            d={(() => {
              const pts: string[] = [];
              for (let x = 8; x <= 292; x += 4) {
                const phase = ((x - 8) / 284) * Math.PI * (8 + (16 - resCm) * 1.1);
                const y = 29 - Math.sin(phase) * 18;
                pts.push(`${x === 8 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
              }
              return pts.join(' ');
            })()}
            fill="none"
            stroke="#8E3742"
            strokeWidth="2"
          />
        </svg>

        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
          <div className="bg-[#122630] p-1.5 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">Recorrido Δx</div>
            <div className="text-[#FAF7EE] font-bold tabular-nums">{mirrorTravelMm.toFixed(2)} mm</div>
          </div>
          <div className="bg-[#122630] p-1.5 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">OPD δ_max</div>
            <div className="text-[#EFC4BF] font-bold tabular-nums">{opdCm.toFixed(2)} cm</div>
          </div>
          <div className="bg-[#122630] p-1.5 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">Franjas He-Ne</div>
            <div className="text-[#7C957D] font-bold tabular-nums">{heNeCrossings.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Resolución Espectral Nominal (Δν̃):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{resCm.toFixed(1)} cm⁻¹</span>
        </label>
        <input
          type="range"
          min={0.5}
          max={16.0}
          step={0.5}
          value={resCm}
          onChange={(e) => setResCm(clampNumber(e.target.value, 0.5, 16.0))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Mayor resolución (0.5 cm⁻¹) exige desplazar el espejo móvil un recorrido mayor (Δx = 10 mm) contando decenas de miles de cruces por cero del láser He-Ne.
      </p>
    </div>
  );
};

// 5. HOOKE OSCILLATOR & DIAMOND ATR EVANESCENT WAVE
const AtrOscillatorMicroSim: React.FC = () => {
  const [bondOrder, setBondOrder] = useState<1 | 2 | 3>(2);
  const [massScale, setMassScale] = useState<number>(1.0);

  // Hooke model approximation: k_eff scales with bond order (1x, 2.2x, 3.6x)
  const baseK = bondOrder === 1 ? 500 : bondOrder === 2 ? 1150 : 1850;
  const estWavenumber = Math.round(1150 * Math.sqrt(baseK / 500) / Math.sqrt(massScale));

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#FAF7EE]">Modelo de Resorte Químico (Hooke)</span>
          <span className="text-[#EFC4BF] font-bold tabular-nums">ν̃ ≈ {estWavenumber} cm⁻¹</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { order: 1 as const, label: 'Simple C–O / C–C' },
            { order: 2 as const, label: 'Doble C=O / C=C' },
            { order: 3 as const, label: 'Triple C≡N / C≡C' },
          ].map((opt) => (
            <button
              key={opt.order}
              onClick={() => setBondOrder(opt.order)}
              className={`py-1 px-1.5 text-[10px] font-mono rounded-lg cursor-pointer transition-colors border ${
                bondOrder === opt.order
                  ? 'bg-[#8E3742] text-[#FAF7EE] border-[#EFC4BF]'
                  : 'bg-[#122630] text-[#A9C2D2] border-[#1C3947]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Masa Reducida μ de los Átomos (ej. O–H vs C–Cl):</span>
          <span className="font-mono text-[#7C957D] font-semibold tabular-nums">{massScale.toFixed(1)}×</span>
        </label>
        <input
          type="range"
          min={0.2}
          max={2.4}
          step={0.1}
          value={massScale}
          onChange={(e) => setMassScale(clampNumber(e.target.value, 0.2, 2.4))}
          className="w-full accent-[#7C957D] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Según ν̃ = (1/2πc)·√(k/μ), enlaces triples rígidos y átomos ligeros (como H en O–H a 0.2×) vibran a números de onda altos (~3300 cm⁻¹).
      </p>
    </div>
  );
};

// 6. DTGS PYROELECTRIC DETECTOR & SCAN CO-ADDITION
const DtgsDetectorMicroSim: React.FC = () => {
  const [scans, setScans] = useState<number>(16);
  const snrGain = Math.sqrt(scans);
  const estSnr = Math.round(7500 * snrGain);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 300 86" className="w-full h-20">
          <line x1="15" y1="68" x2="285" y2="68" stroke="#1C3947" strokeWidth="1" />
          <path
            d={(() => {
              const pts: string[] = [];
              const noiseAmp = 14 / Math.sqrt(scans);
              for (let x = 15; x <= 285; x += 3) {
                const peak = Math.exp(-Math.pow((x - 150) / 14, 2)) * 46;
                const noise = (Math.sin(x * 1.9) + Math.cos(x * 3.1)) * noiseAmp;
                const y = Math.max(8, Math.min(76, 68 - peak + noise));
                pts.push(`${x === 15 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
              }
              return pts.join(' ');
            })()}
            fill="none"
            stroke="#7C957D"
            strokeWidth="2"
          />
          <text x="16" y="18" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">
            Ganancia SNR: {snrGain.toFixed(1)}× ({estSnr.toLocaleString()}:1)
          </text>
        </svg>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Barridos Co-añadidos (N_scans):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{scans} barridos</span>
        </label>
        <input
          type="range"
          min={1}
          max={64}
          step={1}
          value={scans}
          onChange={(e) => setScans(clampNumber(e.target.value, 1, 64))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Promediar N barridos consecutivos del sensor DLATGS refuerza las bandas reales como N y cancela el ruido térmico aleatorio mejorando la SNR en √N.
      </p>
    </div>
  );
};

// 7. FFT TRANSFORM (Interferogram -> Spectrum)
const FftTransformMicroSim: React.FC = () => {
  const [apodized, setApodized] = useState<boolean>(true);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 320 96" className="w-full h-24">
          {/* Left: Interferogram I(delta) */}
          <rect x="8" y="10" width="120" height="72" rx="6" fill="#122630" stroke="#1C3947" />
          <path
            d="M 16 46 Q 48 46 58 46 L 64 16 L 68 74 L 72 20 L 76 66 L 82 46 L 120 46"
            fill="none"
            stroke="#A9C2D2"
            strokeWidth="1.8"
          />
          <text x="20" y="23" fill="#A9C2D2" fontSize="8" fontFamily="monospace">I(δ) Tiempo</text>

          {/* Arrow FFT */}
          <text x="148" y="42" textAnchor="middle" fill="#EFC4BF" fontSize="10" fontFamily="monospace" fontWeight="bold">
            FFT
          </text>
          <line x1="133" y1="50" x2="165" y2="50" stroke="#EFC4BF" strokeWidth="2" />

          {/* Right: %T Spectrum */}
          <rect x="172" y="10" width="140" height="72" rx="6" fill="#122630" stroke="#1C3947" />
          <path
            d={
              apodized
                ? 'M 180 22 L 222 22 L 230 68 L 238 22 L 265 22 L 273 56 L 281 22 L 304 22'
                : 'M 180 22 L 214 22 L 218 16 L 222 26 L 230 68 L 238 26 L 242 16 L 246 22 L 265 22 L 273 56 L 281 22 L 304 22'
            }
            fill="none"
            stroke="#7C957D"
            strokeWidth="2"
          />
          <text x="180" y="75" fill="#7C957D" fontSize="8" fontFamily="monospace">%T(ν̃) 4000→400</text>
        </svg>
      </div>

      <button
        onClick={() => setApodized(!apodized)}
        className={`w-full py-1.5 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors border ${
          apodized
            ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
            : 'bg-[#8E3742] text-[#FAF7EE] border-[#EFC4BF]'
        }`}
      >
        {apodized ? '✓ Apodización Happ-Genzel ACTIVA (Sin lóbulos)' : '⚠ Boxcar sin Apodización (Lóbulos laterales)'}
      </button>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        La Transformada Rápida de Fourier decodifica el pico central (centerburst) I(δ) al espectro químico; la apodización elimina oscilaciones artificiales en la base.
      </p>
    </div>
  );
};
