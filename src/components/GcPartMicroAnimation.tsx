import React, { useState } from 'react';
import { clampNumber } from '../utils/safeNumber';

interface GcPartMicroAnimationProps {
  type:
    | 'carrier_gas'
    | 'epc_control'
    | 'inlet_injector'
    | 'oven_ramp'
    | 'capillary_column'
    | 'detector_fid'
    | 'chromatogram_kovats';
}

export const GcPartMicroAnimation: React.FC<GcPartMicroAnimationProps> = ({ type }) => {
  const [carrierGas, setCarrierGas] = useState<'H2' | 'He' | 'N2'>('He');
  const [ovenTempC, setOvenTempC] = useState<number>(180);
  const [splitRatio, setSplitRatio] = useState<number>(50);
  const [rampRate, setRampRate] = useState<number>(12);
  const [phaseType, setPhaseType] = useState<'DB-5ms' | 'DB-Wax'>('DB-5ms');
  const [detectorMode, setDetectorMode] = useState<'FID' | 'TCD'>('FID');
  const [nAlkane, setNAlkane] = useState<number>(10);

  // 1. Carrier gas & Golay H vs u curve
  if (type === 'carrier_gas') {
    const uOpt = carrierGas === 'H2' ? 48 : carrierGas === 'He' ? 30 : 14;
    const pathD = Array.from({ length: 24 }, (_, idx) => {
      const u = 6 + idx * 3.2; // 6 to 79.6 cm/s
      const B = carrierGas === 'H2' ? 2.5 : carrierGas === 'He' ? 1.8 : 0.85;
      const C = carrierGas === 'H2' ? 0.0011 : carrierGas === 'He' ? 0.0022 : 0.0054;
      const H = B / u + C * u;
      const x = 35 + ((u - 6) / 74) * 265;
      const y = 96 - Math.min(72, H * 135);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');

    return (
      <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-[#FAF7EE] font-mono">
          <span>Curva de Golay H(ū) por Gas Portador:</span>
          <span className="text-[#EFC4BF] font-bold">ū_opt = {uOpt} cm/s ({carrierGas})</span>
        </div>
        <svg viewBox="0 0 320 112" className="w-full h-24 bg-[#071116] rounded-lg border border-[#1C3947]">
          <line x1="32" y1="96" x2="305" y2="96" stroke="#A9C2D2" strokeWidth="1" />
          <line x1="32" y1="16" x2="32" y2="96" stroke="#A9C2D2" strokeWidth="1" />
          <path d={pathD} fill="none" stroke="#EFC4BF" strokeWidth="2.5" />
          <text x="145" y="108" fill="#A9C2D2" fontSize="8" fontFamily="monospace">Velocidad lineal ū (cm/s)</text>
          <text x="38" y="24" fill="#7C957D" fontSize="8" fontFamily="monospace">H mínimo = máxima eficiencia N</text>
        </svg>
        <div className="flex gap-1.5">
          {(['H2', 'He', 'N2'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setCarrierGas(g)}
              className={`flex-1 py-1 rounded text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                carrierGas === g ? 'bg-[#8E3742] text-[#FAF7EE]' : 'bg-[#122630] text-[#A9C2D2]'
              }`}
            >
              {g === 'H2' ? 'H₂ (Más rápido)' : g === 'He' ? 'He (Estándar)' : 'N₂ (Lento)'}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 2. EPC Viscosity Compensation
  if (type === 'epc_control') {
    const viscosityRel = Math.pow((ovenTempC + 273) / 313, 0.7);
    const epcPressurePsi = Number((12.4 * viscosityRel).toFixed(2));
    return (
      <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-[#FAF7EE] font-mono">
          <span>Compensación Térmica EPC:</span>
          <span className="text-[#7C957D] font-bold">P_entrada = {epcPressurePsi} psi</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
          <div className="bg-[#071116] p-2 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">Horno T</div>
            <div className="text-[#EFC4BF] font-bold text-xs">{ovenTempC} °C</div>
          </div>
          <div className="bg-[#071116] p-2 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">Viscosidad η</div>
            <div className="text-[#FAF7EE] font-bold text-xs">×{viscosityRel.toFixed(2)}</div>
          </div>
          <div className="bg-[#071116] p-2 rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">Caudal F_col</div>
            <div className="text-[#7C957D] font-bold text-xs">1.20 mL/min</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#A9C2D2] font-mono text-[11px]">
          <span>T_horno:</span>
          <input
            type="range"
            min={40}
            max={320}
            step={10}
            value={ovenTempC}
            onChange={(e) => setOvenTempC(clampNumber(e.target.value, 40, 320))}
            className="flex-1 accent-[#8E3742]"
          />
          <span className="text-[#FAF7EE] w-12 text-right">{ovenTempC}°C</span>
        </div>
      </div>
    );
  }

  // 3. Split/Splitless Inlet
  if (type === 'inlet_injector') {
    const percentColumn = Number((100 / (1 + splitRatio)).toFixed(1));
    return (
      <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-[#FAF7EE] font-mono">
          <span>Relación Split ({splitRatio}:1):</span>
          <span className="text-[#EFC4BF] font-bold">{percentColumn}% entra a columna</span>
        </div>
        <div className="h-4 w-full bg-[#071116] rounded-full overflow-hidden border border-[#1C3947] flex">
          <div
            className="bg-[#7C957D] h-full transition-all"
            style={{ width: `${Math.max(4, percentColumn)}%` }}
          />
          <div className="bg-[#8E3742]/70 flex-1 h-full" />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[#A9C2D2]">
          <span>■ Columna capilar ({percentColumn}%)</span>
          <span>■ Venteo Split ({(100 - percentColumn).toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2 text-[#A9C2D2] font-mono text-[11px]">
          <span>Split:</span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={splitRatio}
            onChange={(e) => setSplitRatio(clampNumber(e.target.value, 0, 100))}
            className="flex-1 accent-[#8E3742]"
          />
          <span className="text-[#FAF7EE] w-16 text-right">{splitRatio === 0 ? 'Splitless' : `${splitRatio}:1`}</span>
        </div>
      </div>
    );
  }

  // 4. Oven Ramp
  if (type === 'oven_ramp') {
    const eluteMin = Number((215 / rampRate).toFixed(1));
    return (
      <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-[#FAF7EE] font-mono">
          <span>Rampa Térmica ({rampRate} °C/min):</span>
          <span className="text-[#7C957D] font-bold">260 °C en {eluteMin} min</span>
        </div>
        <svg viewBox="0 0 320 90" className="w-full h-20 bg-[#071116] rounded-lg border border-[#1C3947]">
          <line x1="25" y1="74" x2="70" y2="74" stroke="#EFC4BF" strokeWidth="2.5" />
          <line
            x1="70"
            y1="74"
            x2={Math.max(115, 290 - rampRate * 5.2)}
            y2="18"
            stroke="#8E3742"
            strokeWidth="2.5"
          />
          <line
            x1={Math.max(115, 290 - rampRate * 5.2)}
            y1="18"
            x2="305"
            y2="18"
            stroke="#7C957D"
            strokeWidth="2.5"
          />
          <text x="26" y="66" fill="#A9C2D2" fontSize="8" fontFamily="monospace">45°C hold</text>
          <text x="235" y="13" fill="#7C957D" fontSize="8" fontFamily="monospace">300°C final</text>
        </svg>
        <div className="flex items-center gap-2 text-[#A9C2D2] font-mono text-[11px]">
          <span>Rampa:</span>
          <input
            type="range"
            min={4}
            max={25}
            step={1}
            value={rampRate}
            onChange={(e) => setRampRate(clampNumber(e.target.value, 4, 25))}
            className="flex-1 accent-[#8E3742]"
          />
          <span className="text-[#FAF7EE] w-16 text-right">{rampRate}°C/min</span>
        </div>
      </div>
    );
  }

  // 5. Capillary Column Phase Polarity
  if (type === 'capillary_column') {
    return (
      <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-[#FAF7EE] font-mono">
          <span>Selectividad Capilar WCOT:</span>
          <span className="text-[#EFC4BF] font-bold">{phaseType}</span>
        </div>
        <div className="p-2.5 bg-[#071116] rounded-lg border border-[#1C3947] font-mono text-[11px] space-y-1">
          {phaseType === 'DB-5ms' ? (
            <>
              <div className="text-[#7C957D] font-bold">Etanol (pe 78°C) → sale primero vs Benceno (pe 80°C)</div>
              <div className="text-[#A9C2D2]">Fase apolar separa casi estrictamente por punto de ebullición.</div>
            </>
          ) : (
            <>
              <div className="text-[#EFC4BF] font-bold">Benceno sale primero → Etanol retenido fuertemente detrás</div>
              <div className="text-[#A9C2D2]">Polietilenglicol (Wax) retiene enlaces O–H polares por puente H.</div>
            </>
          )}
        </div>
        <div className="flex gap-1.5">
          {(['DB-5ms', 'DB-Wax'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPhaseType(p)}
              className={`flex-1 py-1 rounded text-[11px] font-mono font-bold cursor-pointer ${
                phaseType === p ? 'bg-[#8E3742] text-[#FAF7EE]' : 'bg-[#122630] text-[#A9C2D2]'
              }`}
            >
              {p === 'DB-5ms' ? 'DB-5ms (Apolar)' : 'DB-Wax (Polar PEG)'}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 6. FID vs TCD Detector
  if (type === 'detector_fid') {
    return (
      <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-[#FAF7EE] font-mono">
          <span>Respuesta Selectiva vs Universal:</span>
          <span className="text-[#EFC4BF] font-bold">{detectorMode}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
          <div className="p-2 bg-[#071116] rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">n-Hexano (C₆H₁₄)</div>
            <div className="text-[#7C957D] font-bold text-xs">
              {detectorMode === 'FID' ? '100% (Iones CHO⁺)' : '72% (Conductividad)'}
            </div>
          </div>
          <div className="p-2 bg-[#071116] rounded border border-[#1C3947]">
            <div className="text-[#A9C2D2]">H₂O / CO₂ / CCl₄</div>
            <div className="text-[#EFC4BF] font-bold text-xs">
              {detectorMode === 'FID' ? '~0% (Ciego FID)' : '88% (Universal TCD)'}
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {(['FID', 'TCD'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDetectorMode(d)}
              className={`flex-1 py-1 rounded text-[11px] font-mono font-bold cursor-pointer ${
                detectorMode === d ? 'bg-[#8E3742] text-[#FAF7EE]' : 'bg-[#122630] text-[#A9C2D2]'
              }`}
            >
              {d === 'FID' ? 'FID (Llama C–H)' : 'TCD (Térmico Universal)'}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 7. Kováts Index Calculator
  const riBase = nAlkane * 100;
  return (
    <div className="bg-[#0C1A22] rounded-xl p-3 border border-[#1C3947] space-y-2.5 text-xs">
      <div className="flex items-center justify-between text-[#FAF7EE] font-mono">
        <span>Escala de Kováts (n-Alcano C_{nAlkane}):</span>
        <span className="text-[#EFC4BF] font-bold">RI = {riBase} u.i.</span>
      </div>
      <div className="p-2 bg-[#071116] rounded-lg border border-[#1C3947] font-mono text-[11px] text-[#A9C2D2]">
        Cualquier analito que eluya exactamente a mitad de camino entre C_{nAlkane} y C_{nAlkane + 1} recibe <strong className="text-[#7C957D]">RI ≈ {riBase + 50}</strong> independiente de pequeños recortes de columna.
      </div>
      <div className="flex items-center gap-2 text-[#A9C2D2] font-mono text-[11px]">
        <span>n-Alcano:</span>
        <input
          type="range"
          min={6}
          max={16}
          step={1}
          value={nAlkane}
          onChange={(e) => setNAlkane(clampNumber(e.target.value, 6, 16))}
          className="flex-1 accent-[#8E3742]"
        />
        <span className="text-[#FAF7EE] w-10 text-right">C{nAlkane}</span>
      </div>
    </div>
  );
};
