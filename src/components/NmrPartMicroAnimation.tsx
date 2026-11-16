import React, { useState, useEffect, useRef } from 'react';
import { clampNumber } from '../utils/safeNumber';

interface NmrPartMicroAnimationProps {
  type:
    | 'sample_spinner_tube'
    | 'cryostat_dewar'
    | 'superconducting_magnet'
    | 'shim_coils'
    | 'rf_probe_coil'
    | 'rf_console_adc'
    | 'fft_nmr_processor';
}

export const NmrPartMicroAnimation: React.FC<NmrPartMicroAnimationProps> = ({ type }) => {
  return (
    <div className="w-full bg-[#122630] rounded-xl p-4 border border-[#1C3947] text-[#FAF7EE] shadow-inner">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1C3947]">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-mono text-[#A9C2D2]">
            Micro-Simulación Cuántica RMN en Tiempo Real
          </span>
        </div>
        <span className="text-xs text-[#EFC4BF] font-mono">Física de Espín I=½</span>
      </div>

      {type === 'sample_spinner_tube' && <SampleSpinnerMicroSim />}
      {type === 'cryostat_dewar' && <CryostatMicroSim />}
      {type === 'superconducting_magnet' && <MagnetB0MicroSim />}
      {type === 'shim_coils' && <ShimCoilsMicroSim />}
      {type === 'rf_probe_coil' && <RfPulseMicroSim />}
      {type === 'rf_console_adc' && <ConsoleFidMicroSim />}
      {type === 'fft_nmr_processor' && <PascalMultipletMicroSim />}
    </div>
  );
};

// 1. SAMPLE TUBE, DEUTERIUM LOCK & PNEUMATIC SPINNER
const SampleSpinnerMicroSim: React.FC = () => {
  const [spinHz, setSpinHz] = useState<number>(20);
  const [deuterated, setDeuterated] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      angle += spinHz * 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0C1A22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 5 mm vertical NMR tube in center-left
      const cx = 75;
      ctx.strokeStyle = '#A9C2D2';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 12, 20, 24, 108);
      // Sample meniscus inside tube
      ctx.fillStyle = deuterated ? 'rgba(124, 149, 125, 0.35)' : 'rgba(142, 55, 66, 0.45)';
      ctx.fillRect(cx - 10, 58, 20, 68);
      // Spinner turbine collar
      ctx.fillStyle = '#EFC4BF';
      ctx.fillRect(cx - 18, 28, 36, 12);

      // Rotating dot on turbine collar
      const dotX = cx + Math.cos(angle) * 14;
      ctx.fillStyle = '#8E3742';
      ctx.beginPath();
      ctx.arc(dotX, 34, 3, 0, Math.PI * 2);
      ctx.fill();

      // Radial linewidth preview on right
      const fwhmScale = spinHz >= 15 ? 6 : 22 - spinHz * 0.9;
      ctx.strokeStyle = deuterated ? '#7C957D' : '#8E3742';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let x = 140; x <= 320; x += 2) {
        const diff = x - 230;
        const peak = deuterated
          ? Math.exp(-(diff * diff) / (2 * fwhmScale * fwhmScale)) * 75
          : Math.exp(-Math.pow((x - 190) / 28, 2)) * 92; // giant H2O overwhelm
        const y = 115 - peak;
        if (x === 140) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(`Giro: ${spinHz} Hz`, 22, 140);
      ctx.fillStyle = deuterated ? '#7C957D' : '#EFC4BF';
      ctx.fillText(
        deuterated ? 'Lock ²H (CDCl₃): ACTIVO ✓' : '¡Sin Deuterio! H₂O Satura ADC',
        142,
        28
      );

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [spinHz, deuterated]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setDeuterated(!deuterated)}
          className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors ${
            deuterated ? 'bg-[#7C957D] text-[#FAF7EE]' : 'bg-[#8E3742] text-[#FAF7EE]'
          }`}
        >
          {deuterated ? '● Solvente Deuterado (CDCl₃)' : '⚠ Solvente Normal (H₂O / CHCl₃)'}
        </button>
        <span className="text-xs font-mono text-[#EFC4BF] tabular-nums">{spinHz} Hz</span>
      </div>
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Velocidad Turbina Neumática (Promediado X–Y):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{spinHz} Hz</span>
        </label>
        <input
          type="range"
          min={0}
          max={25}
          step={1}
          value={spinHz}
          onChange={(e) => setSpinHz(clampNumber(e.target.value, 0, 25))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El solvente deuterado aporta la señal ²H para el Lock y evita que la señal protónica gigante del solvente tape al analito.
      </p>
    </div>
  );
};

// 2. CRYOSTAT DEWAR (4.2 K vs QUENCH THRESHOLD)
const CryostatMicroSim: React.FC = () => {
  const [tempK, setTempK] = useState<number>(4.2);
  const isSuperconducting = tempK < 9.2;

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#FAF7EE]">Estado del Solenoide NbTi / Nb₃Sn</span>
          <span className={`font-bold tabular-nums ${isSuperconducting ? 'text-[#7C957D]' : 'text-[#EFC4BF]'}`}>
            {isSuperconducting ? 'R = 0 Ω (SUPERCONDUCTOR)' : '⚠ ¡QUENCH RESISTIVO!'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
          <div className="bg-[#122630] p-2 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">Temp. Bobina</div>
            <div className="text-[#EFC4BF] font-bold tabular-nums">{tempK.toFixed(1)} K</div>
          </div>
          <div className="bg-[#122630] p-2 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">Resistencia</div>
            <div className={`font-bold tabular-nums ${isSuperconducting ? 'text-[#7C957D]' : 'text-[#8E3742]'}`}>
              {isSuperconducting ? '0.000 Ω' : `${((tempK - 9.2) * 1.4).toFixed(1)} Ω`}
            </div>
          </div>
          <div className="bg-[#122630] p-2 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">Corriente</div>
            <div className="text-[#FAF7EE] font-bold tabular-nums">
              {isSuperconducting ? '240 A (Perpetua)' : '0 A (Colapsó)'}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Temperatura Criogénica Interna (T_c NbTi = 9.2 K):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{tempK.toFixed(1)} K</span>
        </label>
        <input
          type="range"
          min={4.2}
          max={20.0}
          step={0.4}
          value={tempK}
          onChange={(e) => setTempK(clampNumber(e.target.value, 4.2, 20.0))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El helio líquido mantiene las bobinas a 4.2 K (−269 °C) con resistencia nula; superar 9.2 K destruye la superconductividad liberando el helio en forma de gas (quench).
      </p>
    </div>
  );
};

// 3. SUPERCONDUCTING MAGNET B0 & LARMOR FREQUENCY DISPERSION
const MagnetB0MicroSim: React.FC = () => {
  const [freqMhz, setFreqMhz] = useState<number>(400);
  const b0Tesla = freqMhz / 42.577;
  // Two peaks separated by 0.08 ppm with J = 7 Hz doublet
  const sepHz = Math.round(0.08 * freqMhz);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 300 92" className="w-full h-24">
          <line x1="15" y1="76" x2="285" y2="76" stroke="#7696AA" strokeWidth="1" />
          <path
            d={(() => {
              const pts: string[] = [];
              const jPpm = 7 / freqMhz;
              const fwhm = 2.2 / freqMhz;
              const g = fwhm / 2;
              for (let ppm = 3.2; ppm >= 2.8; ppm -= 0.002) {
                // Signal A at 3.04 ppm (doublet), Signal B at 2.96 ppm (doublet)
                const sigA =
                  0.5 * (g * g) / (Math.pow(ppm - (3.04 + jPpm / 2), 2) + g * g) +
                  0.5 * (g * g) / (Math.pow(ppm - (3.04 - jPpm / 2), 2) + g * g);
                const sigB =
                  0.5 * (g * g) / (Math.pow(ppm - (2.96 + jPpm / 2), 2) + g * g) +
                  0.5 * (g * g) / (Math.pow(ppm - (2.96 - jPpm / 2), 2) + g * g);
                const x = 15 + ((3.2 - ppm) / 0.4) * 270;
                const y = 76 - Math.min(1, sigA + sigB) * 56;
                pts.push(`${ppm === 3.2 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
              }
              return pts.join(' ');
            })()}
            fill="none"
            stroke="#7C957D"
            strokeWidth="2"
          />
          <text x="16" y="16" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">
            B₀ = {b0Tesla.toFixed(1)} T · ν₀(¹H) = {freqMhz} MHz · Δν = {sepHz} Hz
          </text>
        </svg>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Frecuencia de Larmor ν₀ (¹H) del Imán:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">
            {freqMhz} MHz ({b0Tesla.toFixed(1)} T)
          </span>
        </label>
        <input
          type="range"
          min={60}
          max={800}
          step={20}
          value={freqMhz}
          onChange={(e) => setFreqMhz(clampNumber(e.target.value, 60, 800))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El acoplamiento J (7 Hz) es constante, pero aumentar B₀ estira su separación relativa respecto al desplazamiento químico δ, resolviendo dobletes que a 60 MHz se solapan.
      </p>
    </div>
  );
};

// 4. SHIMMING HOMOGENEITY (ΔB0 & T2*)
const ShimCoilsMicroSim: React.FC = () => {
  const [shimErrorHz, setShimErrorHz] = useState<number>(0.5);
  const t2StarMs = Math.round(1000 / (Math.PI * shimErrorHz));

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 300 88" className="w-full h-20">
          <line x1="15" y1="70" x2="285" y2="70" stroke="#7696AA" strokeWidth="1" />
          <path
            d={(() => {
              const pts: string[] = [];
              const j = 11; // 11 px splitting
              const g = Math.max(2.2, shimErrorHz * 1.15);
              for (let x = 20; x <= 280; x += 2) {
                const l1 = (g * g) / (Math.pow(x - (150 - j), 2) + g * g);
                const l2 = (2 * g * g) / (Math.pow(x - 150, 2) + g * g);
                const l3 = (g * g) / (Math.pow(x - (150 + j), 2) + g * g);
                const val = (l1 + l2 + l3) * (3 / (2 + shimErrorHz * 0.28));
                const y = 70 - Math.min(55, val * 18);
                pts.push(`${x === 20 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
              }
              return pts.join(' ');
            })()}
            fill="none"
            stroke={shimErrorHz < 3 ? '#7C957D' : '#8E3742'}
            strokeWidth="2.2"
          />
          <text x="16" y="16" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">
            Ancho FWHM = {shimErrorHz.toFixed(1)} Hz · T₂* = {t2StarMs} ms
          </text>
        </svg>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Desajuste Residual de Shims (ΔB₀):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{shimErrorHz.toFixed(1)} Hz</span>
        </label>
        <input
          type="range"
          min={0.5}
          max={16.0}
          step={0.5}
          value={shimErrorHz}
          onChange={(e) => setShimErrorHz(clampNumber(e.target.value, 0.5, 16.0))}
          className="w-full accent-[#7C957D] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Con las bobinas shim optimizadas (&lt;1 Hz), un triplete 1:2:1 se resuelve perfectamente; al desajustar ΔB₀, T₂* cae y las 3 líneas colapsan en un lomo ancho.
      </p>
    </div>
  );
};

// 5. RF 90-DEGREE PULSE & MAGNETIZATION FLIP ANGLE
const RfPulseMicroSim: React.FC = () => {
  const [pulseDeg, setPulseDeg] = useState<number>(90);
  const rad = (pulseDeg * Math.PI) / 180;
  const xySignalPct = Math.round(Math.abs(Math.sin(rad)) * 100);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3 flex items-center justify-between gap-3">
        <svg viewBox="0 0 180 100" className="w-44 h-24">
          {/* Z axis and XY plane */}
          <line x1="75" y1="10" x2="75" y2="85" stroke="#7696AA" strokeDasharray="3,3" strokeWidth="1" />
          <ellipse cx="75" cy="70" rx="55" ry="14" fill="none" stroke="#1C3947" strokeWidth="1.5" />
          {/* Net magnetization vector tilted by pulseDeg from +Z */}
          {(() => {
            const len = 48;
            const vx = 75 + Math.sin(rad) * len;
            const vy = 70 - Math.cos(rad) * len;
            return (
              <g>
                <line x1="75" y1="70" x2={vx} y2={vy} stroke="#EFC4BF" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx={vx} cy={vy} r="4.5" fill="#8E3742" stroke="#FAF7EE" strokeWidth="1.2" />
              </g>
            );
          })()}
          <text x="68" y="16" fill="#A9C2D2" fontSize="9" fontFamily="monospace">+Z (B₀)</text>
          <text x="122" y="74" fill="#7C957D" fontSize="9" fontFamily="monospace">Plano X–Y</text>
        </svg>

        <div className="text-right font-mono text-xs space-y-1">
          <div className="text-[#EFC4BF] font-bold tabular-nums">θ = {pulseDeg}°</div>
          <div className="text-[#7C957D] text-[11px] tabular-nums">Señal M_xy: {xySignalPct}%</div>
        </div>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Ángulo de Pulso RF (θ = γ·B₁·t_p):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{pulseDeg}°</span>
        </label>
        <input
          type="range"
          min={0}
          max={180}
          step={15}
          value={pulseDeg}
          onChange={(e) => setPulseDeg(clampNumber(e.target.value, 0, 180))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El pulso de 90° abate el 100% de la magnetización al plano X–Y maximizando la señal FID inducida en la bobina; a 180° (inversión) no hay componente transversal.
      </p>
    </div>
  );
};

// 6. QUADRATURE FID ACQUISITION & TRANSIENT CO-ADDITION
const ConsoleFidMicroSim: React.FC = () => {
  const [scans, setScans] = useState<number>(16);
  const snrGain = Math.sqrt(scans);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 300 84" className="w-full h-20">
          <line x1="12" y1="42" x2="288" y2="42" stroke="#1C3947" strokeWidth="1" />
          <path
            d={(() => {
              const pts: string[] = [];
              const noiseAmp = 16 / Math.sqrt(scans);
              for (let x = 12; x <= 288; x += 2) {
                const t = (x - 12) / 276;
                const env = Math.exp(-t * 4.2);
                const sig = Math.cos(t * 58) * 32 * env;
                const noise = (Math.sin(x * 2.7) + Math.cos(x * 4.3)) * noiseAmp * 0.5;
                const y = Math.max(6, Math.min(78, 42 - sig + noise));
                pts.push(`${x === 12 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
              }
              return pts.join(' ');
            })()}
            fill="none"
            stroke="#A9C2D2"
            strokeWidth="1.8"
          />
          <text x="16" y="15" fill="#EFC4BF" fontSize="9" fontFamily="monospace" fontWeight="bold">
            FID S(t) · {scans} pulsos · Mejora SNR = {snrGain.toFixed(1)}×
          </text>
        </svg>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Número de Acumulaciones (N_scans):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{scans} scans</span>
        </label>
        <input
          type="range"
          min={1}
          max={64}
          step={1}
          value={scans}
          onChange={(e) => setScans(clampNumber(e.target.value, 1, 64))}
          className="w-full accent-[#7C957D] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Cada FID coherente se suma linealmente (×N) mientras el ruido electrónico aleatorio crece solo como √N, limpiando señales muy diluidas.
      </p>
    </div>
  );
};

// 7. FFT & PASCAL TRIANGLE (n+1) MULTIPLICITY
const PascalMultipletMicroSim: React.FC = () => {
  const [neighbors, setNeighbors] = useState<number>(3);
  const pascalRows: number[][] = [
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
  ];
  const labels = ['Singulete (1)', 'Doblete (1:1)', 'Triplete (1:2:1)', 'Cuartete (1:3:3:1)', 'Quintete (1:4:6:4:1)'];
  const row = pascalRows[neighbors] || [1];
  const maxW = Math.max(...row);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 300 92" className="w-full h-22">
          <line x1="20" y1="76" x2="280" y2="76" stroke="#7696AA" strokeWidth="1" />
          {(() => {
            const pts: string[] = [];
            const n = row.length;
            const g = 3.2;
            for (let x = 20; x <= 280; x += 2) {
              let v = 0;
              for (let k = 0; k < n; k++) {
                const cx = 150 + (k - (n - 1) / 2) * 18;
                v += (row[k] / maxW) * ((g * g) / (Math.pow(x - cx, 2) + g * g));
              }
              const y = 76 - Math.min(58, v * 52);
              pts.push(`${x === 20 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
            }
            return <path d={pts.join(' ')} fill="none" stroke="#7C957D" strokeWidth="2.2" />;
          })()}
          <text x="150" y="14" textAnchor="middle" fill="#EFC4BF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
            n = {neighbors} vecinos → {labels[neighbors]}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {[0, 1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => setNeighbors(n)}
            className={`py-1.5 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors border ${
              neighbors === n
                ? 'bg-[#8E3742] text-[#FAF7EE] border-[#EFC4BF]'
                : 'bg-[#0C1A22] text-[#A9C2D2] border-[#1C3947]'
            }`}
          >
            n={n}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Según la regla (n + 1), un protón con n vecinos químicamente equivalentes a 3 enlaces se desdobla en n+1 líneas con proporciones del triángulo de Pascal.
      </p>
    </div>
  );
};
