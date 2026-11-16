import React, { useState, useEffect, useRef } from 'react';
import { clampNumber } from '../utils/safeNumber';

interface HplcPartMicroAnimationProps {
  type: 'mobile_phase' | 'gradient_controller' | 'pump' | 'injector' | 'column' | 'detector' | 'datasystem';
}

export const HplcPartMicroAnimation: React.FC<HplcPartMicroAnimationProps> = ({ type }) => {
  return (
    <div className="w-full bg-[#122630] rounded-xl p-4 border border-[#1C3947] text-[#FAF7EE] shadow-inner">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1C3947]">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-mono text-[#A9C2D2]">
            Micro-Simulación Cromatográfica en Tiempo Real
          </span>
        </div>
        <span className="text-xs text-[#EFC4BF] font-mono">Fluídica UHPLC</span>
      </div>

      {type === 'mobile_phase' && <MobilePhaseMicroSim />}
      {type === 'gradient_controller' && <GradientMicroSim />}
      {type === 'pump' && <PumpMicroSim />}
      {type === 'injector' && <InjectorMicroSim />}
      {type === 'column' && <ColumnMicroSim />}
      {type === 'detector' && <DetectorMicroSim />}
      {type === 'datasystem' && <DataSystemMicroSim />}
    </div>
  );
};

// 1. MOBILE PHASE & VACUUM DEGASSER (Henry's Law)
const MobilePhaseMicroSim: React.FC = () => {
  const [vacuumOn, setVacuumOn] = useState<boolean>(true);
  const [vacuumMbar, setVacuumMbar] = useState<number>(50);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dissolvedO2 = vacuumOn ? ((vacuumMbar / 1013) * 8.4).toFixed(2) : '8.40';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick += 0.06;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0C1A22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vacuum chamber shell
      ctx.strokeStyle = vacuumOn ? '#7C957D' : '#8E3742';
      ctx.lineWidth = 2;
      ctx.strokeRect(85, 24, 170, 98);
      ctx.fillStyle = vacuumOn ? 'rgba(124, 149, 125, 0.08)' : 'rgba(142, 55, 66, 0.1)';
      ctx.fillRect(85, 24, 170, 98);

      // Teflon AF porous tube carrying mobile phase left -> right
      ctx.strokeStyle = '#A9C2D2';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(15, 73);
      ctx.lineTo(325, 73);
      ctx.stroke();

      ctx.strokeStyle = '#122630';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(15, 73);
      ctx.lineTo(325, 73);
      ctx.stroke();

      // Incoming bubbles before chamber
      for (let i = 0; i < 6; i++) {
        const bx = 20 + ((tick * 35 + i * 28) % 68);
        ctx.fillStyle = '#EFC4BF';
        ctx.beginPath();
        ctx.arc(bx, 73 + Math.sin(i * 2) * 1.5, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Permeating gas escaping radially if vacuumOn, or passing straight into pump if OFF
      if (vacuumOn) {
        const escapeRate = Math.max(0.25, 1 - vacuumMbar / 400);
        for (let i = 0; i < 8; i++) {
          const prog = (tick * 0.9 + i * 0.35) % 1;
          const gx = 105 + i * 19;
          const dir = i % 2 === 0 ? -1 : 1;
          const gy = 73 + dir * (6 + prog * 34 * escapeRate);
          ctx.fillStyle = `rgba(169, 194, 210, ${1 - prog})`;
          ctx.beginPath();
          ctx.arc(gx, gy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Big problematic bubbles heading into pump!
        for (let i = 0; i < 6; i++) {
          const bx = 95 + ((tick * 45 + i * 38) % 225);
          ctx.fillStyle = '#EFC4BF';
          ctx.beginPath();
          ctx.arc(bx, 73, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = '#FAF7EE';
      ctx.font = '10px monospace';
      ctx.fillText('A/B Entrada', 14, 52);
      ctx.fillText(vacuumOn ? 'Sin burbujas → Bomba' : '¡Cavitación → Bomba!', 205, 52);
      ctx.fillStyle = vacuumOn ? '#7C957D' : '#EFC4BF';
      ctx.fillText(
        vacuumOn ? `Vacío: ${vacuumMbar} mbar (Teflon AF)` : 'Desgasificador APAGADO (1013 mbar)',
        90,
        140
      );

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [vacuumOn, vacuumMbar]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setVacuumOn(!vacuumOn)}
          className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors ${
            vacuumOn ? 'bg-[#7C957D] text-[#FAF7EE]' : 'bg-[#8E3742] text-[#FAF7EE]'
          }`}
        >
          {vacuumOn ? '● Vacío Desgasificador ON' : '○ Desgasificador OFF'}
        </button>
        <span className="text-xs font-mono text-[#EFC4BF] tabular-nums">
          O₂ disuelto: {dissolvedO2} ppm
        </span>
      </div>
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Presión Cámara de Vacío (Ley de Henry):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{vacuumMbar} mbar</span>
        </label>
        <input
          type="range"
          min={30}
          max={350}
          step={10}
          disabled={!vacuumOn}
          value={vacuumMbar}
          onChange={(e) => setVacuumMbar(clampNumber(e.target.value, 30, 350))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1 disabled:opacity-40"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        La membrana de Teflon AF permite escapar gases hacia la cámara de vacío sin perder solvente líquido, evitando cavitación en los pistones.
      </p>
    </div>
  );
};

// 2. GRADIENT CONTROLLER MICRO-SIM
const GradientMicroSim: React.FC = () => {
  const [phiB, setPhiB] = useState<number>(45);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick += 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0C1A22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fracB = phiB / 100;
      const fracA = 1 - fracB;

      // Channel A (Water - Misty) top
      ctx.strokeStyle = '#A9C2D2';
      ctx.lineWidth = Math.max(2, fracA * 10);
      ctx.beginPath();
      ctx.moveTo(20, 42);
      ctx.lineTo(145, 75);
      ctx.stroke();

      // Channel B (ACN - Rosewood) bottom
      ctx.strokeStyle = '#8E3742';
      ctx.lineWidth = Math.max(2, fracB * 10);
      ctx.beginPath();
      ctx.moveTo(20, 108);
      ctx.lineTo(145, 75);
      ctx.stroke();

      // Microfluidic Spiral Mixer
      ctx.fillStyle = '#122630';
      ctx.strokeStyle = '#EFC4BF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(170, 75, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Animated vortex arcs inside mixer
      ctx.save();
      ctx.translate(170, 75);
      ctx.rotate(tick * 1.4);
      ctx.strokeStyle = '#7C957D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI);
      ctx.stroke();
      ctx.restore();

      // Mixed stream color blended A -> B
      const r = Math.round(169 * fracA + 142 * fracB);
      const g = Math.round(194 * fracA + 55 * fracB);
      const b = Math.round(210 * fracA + 66 * fracB);
      ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(194, 75);
      ctx.lineTo(320, 75);
      ctx.stroke();

      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`A Agua: ${100 - phiB}%`, 18, 25);
      ctx.fillStyle = '#EFC4BF';
      ctx.fillText(`B ACN: ${phiB}%`, 18, 132);
      ctx.fillStyle = '#7C957D';
      ctx.fillText(`Fuerza Eluyente φ_B=${(phiB / 100).toFixed(2)}`, 188, 30);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phiB]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Proporción de Modificador Orgánico (%B ACN):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">
            {100 - phiB}% A / {phiB}% B
          </span>
        </label>
        <input
          type="range"
          min={5}
          max={95}
          step={5}
          value={phiB}
          onChange={(e) => setPhiB(clampNumber(e.target.value, 5, 95))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Incrementar %B aumenta la fuerza eluyente de la fase móvil en fase reversa, acortando exponencialmente la retención de solutos apolares (log k = log k_w − S·φ_B).
      </p>
    </div>
  );
};

// 3. HIGH-PRESSURE BINARY PUMP MICRO-SIM (Darcy Law)
const PumpMicroSim: React.FC = () => {
  const [flow, setFlow] = useState<number>(1.0);
  const [dpUm, setDpUm] = useState<number>(3.5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const estPressureBar = Math.min(1300, Math.round(145 * flow * Math.pow(3.5 / dpUm, 2)));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.05 * flow;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0C1A22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dual sapphire pistons alternating 180 deg out of phase
      const p1Offset = Math.sin(t * 3) * 18;
      const p2Offset = -Math.sin(t * 3) * 18;

      // Primary cylinder
      ctx.strokeStyle = '#A9C2D2';
      ctx.lineWidth = 2;
      ctx.strokeRect(55, 32, 70, 28);
      ctx.fillStyle = '#8E3742';
      ctx.fillRect(62 + p1Offset + 18, 37, 26, 18);

      // Secondary compensating cylinder
      ctx.strokeStyle = '#7C957D';
      ctx.strokeRect(55, 88, 70, 28);
      ctx.fillStyle = '#7C957D';
      ctx.fillRect(62 + p2Offset + 18, 93, 26, 18);

      // Check valves & outlet manifold
      ctx.strokeStyle = '#EFC4BF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(125, 46);
      ctx.lineTo(165, 74);
      ctx.moveTo(125, 102);
      ctx.lineTo(165, 74);
      ctx.lineTo(315, 74);
      ctx.stroke();

      // Pressure bar gauge on right
      const barFrac = Math.min(1, estPressureBar / 1300);
      ctx.fillStyle = '#122630';
      ctx.fillRect(210, 28, 110, 32);
      ctx.strokeStyle = estPressureBar > 950 ? '#8E3742' : '#7C957D';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(210, 28, 110, 32);
      ctx.fillStyle = estPressureBar > 950 ? '#8E3742' : '#7C957D';
      ctx.fillRect(214, 48, 102 * barFrac, 8);

      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`ΔP = ${estPressureBar} bar`, 218, 42);
      ctx.fillStyle = '#A9C2D2';
      ctx.font = '9px monospace';
      ctx.fillText('Pistón 1 (Zafiro)', 35, 24);
      ctx.fillText('Pistón 2 (Comp.)', 35, 132);
      ctx.fillText(`Ley de Darcy: ΔP ∝ F / d_p²`, 190, 108);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [flow, dpUm, estPressureBar]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label className="text-[#FAF7EE] flex justify-between">
            <span>Caudal (F):</span>
            <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{flow.toFixed(1)} mL/min</span>
          </label>
          <input
            type="range"
            min={0.4}
            max={2.4}
            step={0.2}
            value={flow}
            onChange={(e) => setFlow(clampNumber(e.target.value, 0.4, 2.4))}
            className="w-full accent-[#8E3742] cursor-pointer mt-1"
          />
        </div>
        <div>
          <label className="text-[#FAF7EE] flex justify-between">
            <span>Partícula d_p:</span>
            <span className="font-mono text-[#7C957D] font-semibold tabular-nums">{dpUm.toFixed(1)} µm</span>
          </label>
          <input
            type="range"
            min={1.8}
            max={5.0}
            step={0.1}
            value={dpUm}
            onChange={(e) => setDpUm(clampNumber(e.target.value, 1.8, 5.0))}
            className="w-full accent-[#7C957D] cursor-pointer mt-1"
          />
        </div>
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Reducir el diámetro de partícula d_p a 1.8 µm multiplica la presión necesaria como 1/d_p², exigiendo tecnología UHPLC sobre 600–1,000 bar.
      </p>
    </div>
  );
};

// 4. 6-PORT ROTARY INJECTOR VALVE MICRO-SIM
const InjectorMicroSim: React.FC = () => {
  const [valvePos, setValvePos] = useState<'LOAD' | 'INJECT'>('LOAD');

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 320 128" className="w-full h-32">
          {/* 6-port stator circle */}
          <circle cx="155" cy="64" r="38" fill="#122630" stroke="#A9C2D2" strokeWidth="2" />
          {/* 6 ports around circle */}
          {[
            { label: '1 Bomba', x: 155, y: 26 },
            { label: '2 Columna', x: 188, y: 45 },
            { label: '3 Loop', x: 188, y: 83 },
            { label: '4 Desecho', x: 155, y: 102 },
            { label: '5 Jeringa', x: 122, y: 83 },
            { label: '6 Loop', x: 122, y: 45 },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="4.5" fill="#EFC4BF" stroke="#0C1A22" strokeWidth="1" />
            </g>
          ))}

          {/* External Sample Loop (ports 3 <-> 6) */}
          <path
            d="M 188 83 C 250 112, 60 112, 122 45"
            fill="none"
            stroke={valvePos === 'LOAD' ? '#EFC4BF' : '#8E3742'}
            strokeWidth="4"
            strokeDasharray={valvePos === 'INJECT' ? '4,3' : undefined}
          />

          {/* Rotor internal grooves */}
          {valvePos === 'LOAD' ? (
            <g stroke="#7C957D" strokeWidth="3.5" strokeLinecap="round">
              {/* 1-2 pump straight to column */}
              <line x1="155" y1="26" x2="188" y2="45" />
              {/* 5-6 syringe fills loop */}
              <line x1="122" y1="83" x2="122" y2="45" />
              {/* 3-4 excess to waste */}
              <line x1="188" y1="83" x2="155" y2="102" />
            </g>
          ) : (
            <g stroke="#8E3742" strokeWidth="3.5" strokeLinecap="round">
              {/* 1-6 pump pushes through loop */}
              <line x1="155" y1="26" x2="122" y2="45" />
              {/* 3-2 loop enters column! */}
              <line x1="188" y1="83" x2="188" y2="45" />
              {/* 5-4 needle isolated */}
              <line x1="122" y1="83" x2="155" y2="102" />
            </g>
          )}

          {/* Labels */}
          <text x="16" y="34" fill="#A9C2D2" fontSize="9" fontFamily="monospace">Bomba (Alta P)</text>
          <line x1="92" y1="30" x2="150" y2="26" stroke="#7C957D" strokeWidth="2" />

          <text x="218" y="40" fill="#7C957D" fontSize="9" fontFamily="monospace">→ Hacia Columna</text>
          <line x1="192" y1="45" x2="225" y2="45" stroke="#7C957D" strokeWidth="2" />

          <text x="15" y="92" fill="#EFC4BF" fontSize="9" fontFamily="monospace">Vial / Aguja</text>
          <line x1="88" y1="87" x2="117" y2="83" stroke="#EFC4BF" strokeWidth="2" />

          <text x="108" y="122" fill="#FAF7EE" fontSize="9" fontFamily="monospace">
            Bucle de Muestra (10 µL)
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setValvePos('LOAD')}
          className={`py-1.5 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors border ${
            valvePos === 'LOAD'
              ? 'bg-[#7C957D] text-[#FAF7EE] border-[#7C957D]'
              : 'bg-[#0C1A22] text-[#A9C2D2] border-[#1C3947]'
          }`}
        >
          1. Posición LOAD (Cargar)
        </button>
        <button
          onClick={() => setValvePos('INJECT')}
          className={`py-1.5 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors border ${
            valvePos === 'INJECT'
              ? 'bg-[#8E3742] text-[#FAF7EE] border-[#EFC4BF]'
              : 'bg-[#0C1A22] text-[#A9C2D2] border-[#1C3947]'
          }`}
        >
          2. Girar 60° INJECT (Inyectar)
        </button>
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        {valvePos === 'LOAD'
          ? 'En LOAD, el flujo de alta presión va directo a la columna mientras la aguja llena el bucle a presión atmosférica sin riesgo ni fugas.'
          : 'En INJECT, el rotor gira 60° e intercala el bucle dentro del flujo de alta presión, enviando un tapón exacto de 10 µL hacia la columna C18.'}
      </p>
    </div>
  );
};

// 5. C18 COLUMN & VAN DEEMTER MICRO-SIM
const ColumnMicroSim: React.FC = () => {
  const [flowU, setFlowU] = useState<number>(1.8);
  const [dpUm, setDpUm] = useState<number>(3.5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const hetp = 1.6 * dpUm + 2.8 / flowU + 0.045 * Math.pow(dpUm, 1.4) * flowU;
  const platesN = Math.round(150000 / Math.max(3.5, hetp));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0C1A22';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Axes for Van Deemter curve H vs u
    ctx.strokeStyle = '#7696AA';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(35, 18);
    ctx.lineTo(35, 118);
    ctx.lineTo(320, 118);
    ctx.stroke();

    // Draw Van Deemter Curve for active dpUm
    ctx.strokeStyle = '#7C957D';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let u = 0.4; u <= 6.0; u += 0.1) {
      const h = 1.6 * dpUm + 2.8 / u + 0.045 * Math.pow(dpUm, 1.4) * u;
      const x = 35 + ((u - 0.4) / 5.6) * 280;
      const y = Math.max(16, Math.min(116, 118 - (h / 18) * 98));
      if (u === 0.4) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Current operating dot
    const cx = 35 + ((flowU - 0.4) / 5.6) * 280;
    const cy = Math.max(16, Math.min(116, 118 - (hetp / 18) * 98));
    ctx.fillStyle = '#8E3742';
    ctx.strokeStyle = '#FAF7EE';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`H = ${hetp.toFixed(1)} µm   |   N = ${platesN.toLocaleString()} platos`, 85, 26);
    ctx.fillStyle = '#A9C2D2';
    ctx.font = '9px monospace';
    ctx.fillText('Velocidad lineal u (mm/s)', 120, 138);
    ctx.fillText('H', 16, 30);
  }, [flowU, dpUm, hetp, platesN]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label className="text-[#FAF7EE] flex justify-between">
            <span>Velocidad u:</span>
            <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{flowU.toFixed(1)} mm/s</span>
          </label>
          <input
            type="range"
            min={0.5}
            max={5.5}
            step={0.2}
            value={flowU}
            onChange={(e) => setFlowU(clampNumber(e.target.value, 0.5, 5.5))}
            className="w-full accent-[#8E3742] cursor-pointer mt-1"
          />
        </div>
        <div>
          <label className="text-[#FAF7EE] flex justify-between">
            <span>Partícula C18:</span>
            <span className="font-mono text-[#7C957D] font-semibold tabular-nums">{dpUm.toFixed(1)} µm</span>
          </label>
          <input
            type="range"
            min={1.8}
            max={5.0}
            step={0.1}
            value={dpUm}
            onChange={(e) => setDpUm(clampNumber(e.target.value, 1.8, 5.0))}
            className="w-full accent-[#7C957D] cursor-pointer mt-1"
          />
        </div>
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Las columnas sub-2 µm (1.8 µm) aplanan el término C·u de Van Deemter, manteniendo altísima eficiencia N incluso a flujos rápidos.
      </p>
    </div>
  );
};

// 6. DAD Z-FLOW CELL DETECTOR MICRO-SIM
const DetectorMicroSim: React.FC = () => {
  const [pathMm, setPathMm] = useState<number>(10);
  const absRel = ((pathMm / 10) * 0.42).toFixed(2);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3 flex items-center justify-between gap-3">
        <svg viewBox="0 0 210 80" className="w-48 h-20">
          {/* Z-cell channel */}
          <polyline
            points="20,62 60,40 150,40 190,18"
            fill="none"
            stroke="#8E3742"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* UV optical light passing along horizontal Z section */}
          <line x1="12" y1="40" x2="198" y2="40" stroke="#EFC4BF" strokeWidth="2.5" strokeDasharray="3,2" />
          <rect x="6" y="28" width="10" height="24" rx="2" fill="#A9C2D2" />
          <rect x="194" y="28" width="10" height="24" rx="2" fill="#7C957D" />
          <text x="15" y="16" fill="#A9C2D2" fontSize="8" fontFamily="monospace">Lámpara D₂</text>
          <text x="150" y="72" fill="#7C957D" fontSize="8" fontFamily="monospace">Matriz PDA (1024 px)</text>
        </svg>

        <div className="text-right font-mono text-xs shrink-0 space-y-1">
          <div className="text-[#EFC4BF] font-bold tabular-nums">{pathMm} mm</div>
          <div className="text-[#7C957D] text-[11px] tabular-nums">Señal: {absRel} UA</div>
        </div>
      </div>

      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Paso Óptico Celda Z de Flujo:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{pathMm} mm</span>
        </label>
        <input
          type="range"
          min={5}
          max={60}
          step={5}
          value={pathMm}
          onChange={(e) => setPathMm(clampNumber(e.target.value, 5, 60))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Las celdas de guía óptica de 60 mm (Agilent Max-Light) sextuplican la sensibilidad Beer-Lambert (A = ε·b·c) con apenas ~1–3 µL de volumen muerto.
      </p>
    </div>
  );
};

// 7. CHROMATOGRAPHIC DATA SYSTEM MICRO-SIM (k' & Rs)
const DataSystemMicroSim: React.FC = () => {
  const [phiB, setPhiB] = useState<number>(35);
  const t0 = 1.6;
  const k1 = Math.pow(10, 1.75 - 2.6 * (phiB / 100));
  const k2 = Math.pow(10, 2.35 - 3.1 * (phiB / 100));
  const tr1 = t0 * (1 + k1);
  const tr2 = t0 * (1 + k2);
  const rs = Math.abs(tr2 - tr1) / (0.18 * (tr1 + tr2) * 0.25);

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 300 105" className="w-full h-24">
          <line x1="25" y1="88" x2="285" y2="88" stroke="#7696AA" strokeWidth="1.5" />
          {/* t0 solvent front */}
          <line x1="55" y1="20" x2="55" y2="88" stroke="#A9C2D2" strokeDasharray="3,3" strokeWidth="1" />
          <text x="58" y="28" fill="#A9C2D2" fontSize="8" fontFamily="monospace">t₀={t0.toFixed(1)}</text>

          {/* Peak 1 & Peak 2 */}
          {(() => {
            const x1 = Math.min(265, 25 + (tr1 / 12) * 245);
            const x2 = Math.min(275, 25 + (tr2 / 12) * 245);
            return (
              <g>
                <path
                  d={`M ${x1 - 14} 88 Q ${x1} 22, ${x1 + 14} 88`}
                  fill="rgba(124, 149, 125, 0.35)"
                  stroke="#7C957D"
                  strokeWidth="2"
                />
                <path
                  d={`M ${x2 - 16} 88 Q ${x2} 14, ${x2 + 16} 88`}
                  fill="rgba(239, 196, 191, 0.35)"
                  stroke="#EFC4BF"
                  strokeWidth="2"
                />
                <text x={x1} y="18" textAnchor="middle" fill="#7C957D" fontSize="8" fontFamily="monospace">
                  t_R1={tr1.toFixed(1)}
                </text>
                <text x={x2} y="12" textAnchor="middle" fill="#EFC4BF" fontSize="8" fontFamily="monospace">
                  t_R2={tr2.toFixed(1)}
                </text>
              </g>
            );
          })()}
          <text x="180" y="101" fill="#A9C2D2" fontSize="8" fontFamily="monospace">Tiempo (min)</text>
        </svg>
      </div>
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Fuerza Orgánica (%B) vs Resolución R_s:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">
            %B = {phiB}% · R_s = {rs.toFixed(2)}
          </span>
        </label>
        <input
          type="range"
          min={15}
          max={70}
          step={5}
          value={phiB}
          onChange={(e) => setPhiB(clampNumber(e.target.value, 15, 70))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Si %B es muy alto, ambos picos eluyen pegados al tiempo muerto t₀ (R_s &lt; 1.5); reducir %B aumenta k&apos; y separa limpiamente las bandas.
      </p>
    </div>
  );
};
