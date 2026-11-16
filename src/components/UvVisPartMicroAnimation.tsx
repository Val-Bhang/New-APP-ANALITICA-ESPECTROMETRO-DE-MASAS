import React, { useState, useEffect, useRef } from 'react';
import { clampNumber } from '../utils/safeNumber';
import { wavelengthToColor } from '../data/uvVisCompoundsData';

interface UvVisPartMicroAnimationProps {
  type: 'lamps' | 'entrance_slit' | 'monochromator' | 'chopper' | 'cuvettes' | 'detector' | 'datasystem';
}

export const UvVisPartMicroAnimation: React.FC<UvVisPartMicroAnimationProps> = ({ type }) => {
  return (
    <div className="w-full bg-[#122630] rounded-xl p-4 border border-[#1C3947] text-[#FAF7EE] shadow-inner">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1C3947]">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-mono text-[#A9C2D2]">
            Micro-Simulación Óptica en Tiempo Real
          </span>
        </div>
        <span className="text-xs text-[#EFC4BF] font-mono">Fotónica UV-Vis</span>
      </div>

      {type === 'lamps' && <LampsMicroSim />}
      {type === 'entrance_slit' && <SlitMicroSim />}
      {type === 'monochromator' && <MonochromatorMicroSim />}
      {type === 'chopper' && <ChopperMicroSim />}
      {type === 'cuvettes' && <CuvettesMicroSim />}
      {type === 'detector' && <DetectorMicroSim />}
      {type === 'datasystem' && <DataSystemMicroSim />}
    </div>
  );
};

// 1. LAMPS MICRO-SIM
const LampsMicroSim: React.FC = () => {
  const [targetNm, setTargetNm] = useState<number>(280);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isUvActive = targetNm < 340;
  const photonEv = 1240 / targetNm;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      phase += 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#0C1A22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Deuterium lamp (top left)
      ctx.fillStyle = isUvActive ? 'rgba(138, 92, 246, 0.28)' : 'rgba(138, 92, 246, 0.06)';
      ctx.beginPath();
      ctx.arc(62, 46, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isUvActive ? '#C4B5FD' : '#334E5E';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = isUvActive ? '#FAF7EE' : '#7696AA';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('D₂ (UV)', 41, 49);

      // Tungsten lamp (bottom left)
      ctx.fillStyle = !isUvActive ? 'rgba(245, 180, 65, 0.28)' : 'rgba(245, 180, 65, 0.06)';
      ctx.beginPath();
      ctx.arc(62, 112, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = !isUvActive ? '#FCD34D' : '#334E5E';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = !isUvActive ? '#FAF7EE' : '#7696AA';
      ctx.fillText('W (Vis)', 41, 115);

      // Motorized switching mirror at (155, 79)
      const angle = isUvActive ? -0.55 : 0.55;
      ctx.save();
      ctx.translate(155, 79);
      ctx.rotate(angle);
      ctx.fillStyle = '#A9C2D2';
      ctx.fillRect(-3, -24, 6, 48);
      ctx.restore();
      ctx.fillStyle = '#A9C2D2';
      ctx.font = '9px monospace';
      ctx.fillText('Espejo 340nm', 124, 138);

      // Active incoming beam
      const beamColor = wavelengthToColor(targetNm);
      ctx.strokeStyle = beamColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      if (isUvActive) {
        ctx.moveTo(90, 46);
        ctx.lineTo(155, 79);
      } else {
        ctx.moveTo(90, 112);
        ctx.lineTo(155, 79);
      }
      ctx.lineTo(325, 79);
      ctx.stroke();

      // Animated photon wave crests along outgoing beam
      ctx.strokeStyle = '#FAF7EE';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const freq = 0.25 + (800 - targetNm) / 1400;
      for (let x = 165; x < 322; x += 2) {
        const y = 79 + Math.sin(x * freq - phase * 2) * 8;
        if (x === 165) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Readout on canvas
      ctx.fillStyle = '#EFC4BF';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`${targetNm} nm · ${photonEv.toFixed(2)} eV`, 205, 32);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [targetNm, isUvActive, photonEv]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Longitud de Onda (Conmutación a 340 nm):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">
            {targetNm} nm ({isUvActive ? 'Deuterio D₂' : 'Tungsteno W'})
          </span>
        </label>
        <input
          type="range"
          min={200}
          max={750}
          step={5}
          value={targetNm}
          onChange={(e) => setTargetNm(clampNumber(e.target.value, 200, 750))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Por debajo de 340 nm se requiere la lámpara de arco D₂ (alta energía ultravioleta, {photonEv.toFixed(2)} eV); desde 340 nm opera el filamento de tungsteno-halógeno.
      </p>
    </div>
  );
};

// 2. ENTRANCE SLIT MICRO-SIM
const SlitMicroSim: React.FC = () => {
  const [sbw, setSbw] = useState<number>(1.0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0C1A22';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw entrance slit gap proportional to sbw
    const gap = Math.max(4, sbw * 7);
    ctx.fillStyle = '#7696AA';
    ctx.fillRect(45, 18, 8, 75 - gap / 2 - 18);
    ctx.fillRect(45, 75 + gap / 2, 8, 132 - (75 + gap / 2));

    // Incoming diverging light
    ctx.fillStyle = 'rgba(239, 196, 191, 0.25)';
    ctx.beginPath();
    ctx.moveTo(10, 40);
    ctx.lineTo(45, 75 - gap / 2);
    ctx.lineTo(45, 75 + gap / 2);
    ctx.lineTo(10, 110);
    ctx.closePath();
    ctx.fill();

    // Collimated beam after slit
    ctx.fillStyle = 'rgba(169, 194, 210, 0.35)';
    ctx.fillRect(53, 75 - gap / 2, 110, gap);

    // Simulated vibronic benzene-like spectrum on right half (resolution vs SNR)
    const blur = sbw * 4.5;
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 180; x <= 325; x++) {
      const p1 = Math.exp(-Math.pow(x - 220, 2) / (2 * (12 + blur * 2.2)));
      const p2 = 1.15 * Math.exp(-Math.pow(x - 250, 2) / (2 * (12 + blur * 2.2)));
      const p3 = 0.85 * Math.exp(-Math.pow(x - 280, 2) / (2 * (12 + blur * 2.2)));
      const noise = (sbw < 0.8 ? (Math.sin(x * 1.9) * 2.5) : 0);
      const y = 122 - (p1 + p2 + p3) * 58 + noise;
      if (x === 180) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#A9C2D2';
    ctx.font = '10px monospace';
    ctx.fillText(`SBW = ${sbw.toFixed(1)} nm`, 185, 25);
    ctx.fillStyle = sbw <= 1.2 ? '#7C957D' : '#8E3742';
    ctx.fillText(sbw <= 1.2 ? 'Alta Resolución (picos separados)' : 'Baja Resolución (picos fusionados)', 170, 140);
  }, [sbw]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Anchura Espectral de Rendija (SBW):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{sbw.toFixed(1)} nm</span>
        </label>
        <input
          type="range"
          min={0.5}
          max={5.0}
          step={0.5}
          value={sbw}
          onChange={(e) => setSbw(clampNumber(e.target.value, 0.5, 5.0))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Rendijas estrechas (0.5–1.0 nm) separan bandas vibrónicas finas, mientras rendijas anchas dejan pasar más luz pero ensanchan y fusionan los picos.
      </p>
    </div>
  );
};

// 3. MONOCHROMATOR MICRO-SIM
const MonochromatorMicroSim: React.FC = () => {
  const [selectedNm, setSelectedNm] = useState<number>(520);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0C1A22';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Incoming white beam
    ctx.strokeStyle = '#FAF7EE';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(18, 75);
    ctx.lineTo(135, 75);
    ctx.stroke();

    // Diffraction grating rotated by wavelength
    const norm = (selectedNm - 200) / 550;
    const tilt = -0.35 + norm * 0.7;
    ctx.save();
    ctx.translate(135, 75);
    ctx.rotate(tilt);
    ctx.fillStyle = '#7696AA';
    ctx.fillRect(-5, -26, 10, 52);
    ctx.strokeStyle = '#EFC4BF';
    ctx.lineWidth = 1.5;
    for (let g = -22; g <= 22; g += 4) {
      ctx.beginPath();
      ctx.moveTo(5, g);
      ctx.lineTo(8, g);
      ctx.stroke();
    }
    ctx.restore();

    // Rainbow dispersed fan exiting grating
    const fanBands = [
      { nm: 320, dy: -42 },
      { nm: 430, dy: -22 },
      { nm: 520, dy: 0 },
      { nm: 600, dy: 22 },
      { nm: 700, dy: 42 },
    ];

    fanBands.forEach((b) => {
      const shiftedY = 75 + b.dy - (norm - 0.55) * 70;
      ctx.strokeStyle = wavelengthToColor(b.nm);
      ctx.lineWidth = 5;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(140, 75);
      ctx.lineTo(270, shiftedY);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // Highlighted target ray exiting slit at y=75
    ctx.strokeStyle = wavelengthToColor(selectedNm);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(140, 75);
    ctx.lineTo(325, 75);
    ctx.stroke();

    // Exit slit mask at x=270
    ctx.fillStyle = '#1C3947';
    ctx.fillRect(268, 10, 8, 56);
    ctx.fillRect(268, 84, 8, 56);
    ctx.strokeStyle = '#A9C2D2';
    ctx.lineWidth = 1;
    ctx.strokeRect(268, 10, 8, 56);
    ctx.strokeRect(268, 84, 8, 56);

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`nλ = d(sin α + sin β) → ${selectedNm} nm`, 75, 22);
  }, [selectedNm]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Ángulo de Rejilla / Longitud Seleccionada:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{selectedNm} nm</span>
        </label>
        <input
          type="range"
          min={200}
          max={750}
          step={5}
          value={selectedNm}
          onChange={(e) => setSelectedNm(clampNumber(e.target.value, 200, 750))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Al girar la rejilla holográfica, el espectro dispersado se desliza sobre la rendija de salida aislando una sola longitud de onda monocromática.
      </p>
    </div>
  );
};

// 4. CHOPPER MICRO-SIM
const ChopperMicroSim: React.FC = () => {
  const [freqHz, setFreqHz] = useState<number>(50);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick += freqHz / 600;
      const modeRef = Math.sin(tick) >= 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0C1A22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Incoming beam
      ctx.strokeStyle = '#A9C2D2';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(15, 75);
      ctx.lineTo(105, 75);
      ctx.stroke();

      // Rotating chopper wheel
      ctx.save();
      ctx.translate(105, 75);
      ctx.rotate(tick);
      ctx.strokeStyle = '#EFC4BF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#8E3742';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 20, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Reference cuvette top (y=42), Sample cuvette bottom (y=112)
      ctx.strokeStyle = '#7C957D';
      ctx.lineWidth = 2;
      ctx.strokeRect(195, 28, 26, 28);
      ctx.fillStyle = 'rgba(169, 194, 210, 0.2)';
      ctx.fillRect(195, 28, 26, 28);

      ctx.strokeStyle = '#EFC4BF';
      ctx.strokeRect(195, 98, 26, 28);
      ctx.fillStyle = 'rgba(142, 55, 66, 0.6)';
      ctx.fillRect(195, 98, 26, 28);

      // Active path highlight
      if (modeRef) {
        ctx.strokeStyle = '#7C957D';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(105, 75);
        ctx.lineTo(145, 42);
        ctx.lineTo(295, 42);
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#EFC4BF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(105, 75);
        ctx.lineTo(145, 112);
        ctx.lineTo(295, 112);
        ctx.stroke();
      }

      // Detector block on right
      ctx.fillStyle = '#1C3947';
      ctx.fillRect(295, 30, 26, 95);
      ctx.fillStyle = '#FAF7EE';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('PMT', 299, 80);

      ctx.fillStyle = '#A9C2D2';
      ctx.font = '10px monospace';
      ctx.fillText('I₀ (Blanco)', 228, 36);
      ctx.fillText('I (Muestra)', 228, 122);
      ctx.fillStyle = modeRef ? '#7C957D' : '#EFC4BF';
      ctx.fillText(modeRef ? 'Midiendo Referencia I₀' : 'Midiendo Muestra I', 15, 22);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [freqHz]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Frecuencia de Alternancia del Chopper:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{freqHz} Hz</span>
        </label>
        <input
          type="range"
          min={20}
          max={80}
          step={5}
          value={freqHz}
          onChange={(e) => setFreqHz(clampNumber(e.target.value, 20, 80))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El chopper divide alternadamente el haz para medir I₀ e I {freqHz} veces por segundo, anulando fluctuaciones de la lámpara.
      </p>
    </div>
  );
};

// 5. CUVETTES & BEER-LAMBERT MICRO-SIM
const CuvettesMicroSim: React.FC = () => {
  const [conc, setConc] = useState<number>(0.5);
  const [pathCm, setPathCm] = useState<number>(1.0);
  const epsilonSample = 2.0; // normalized so A = 2 * b * c (range 0.1 - 3.0)
  const absorbance = Math.min(3.5, epsilonSample * pathCm * conc);
  const transmittancePct = Math.pow(10, -absorbance) * 100;

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3 flex items-center justify-between gap-3">
        {/* Visual beam + cuvette */}
        <div className="flex items-center flex-1">
          <div className="h-2.5 flex-1 bg-[#EFC4BF] rounded-l shadow-[0_0_8px_#EFC4BF]" />
          <div
            className="h-16 border-2 border-[#A9C2D2] rounded flex items-center justify-center transition-all"
            style={{
              width: `${Math.round(pathCm * 44)}px`,
              backgroundColor: `rgba(142, 55, 66, ${Math.min(0.95, 0.18 + conc * 0.72)})`,
            }}
          >
            <span className="text-[10px] font-mono text-[#FAF7EE] font-bold">{pathCm.toFixed(1)}cm</span>
          </div>
          <div
            className="h-2.5 flex-1 bg-[#EFC4BF] rounded-r transition-opacity"
            style={{ opacity: Math.max(0.08, transmittancePct / 100) }}
          />
        </div>

        {/* Live Beer-Lambert Readout */}
        <div className="text-right font-mono text-xs shrink-0 space-y-0.5">
          <div className="text-[#EFC4BF] font-bold tabular-nums">A = {absorbance.toFixed(2)} UA</div>
          <div className="text-[#7C957D] text-[11px] tabular-nums">T = {transmittancePct.toFixed(1)}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label className="text-[#FAF7EE] flex justify-between">
            <span>Concentración (c):</span>
            <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{conc.toFixed(2)} mM</span>
          </label>
          <input
            type="range"
            min={0.1}
            max={1.2}
            step={0.05}
            value={conc}
            onChange={(e) => setConc(clampNumber(e.target.value, 0.1, 1.2))}
            className="w-full accent-[#8E3742] cursor-pointer mt-1"
          />
        </div>
        <div>
          <label className="text-[#FAF7EE] flex justify-between">
            <span>Paso Óptico (b):</span>
            <span className="font-mono text-[#7C957D] font-semibold tabular-nums">{pathCm.toFixed(1)} cm</span>
          </label>
          <input
            type="range"
            min={0.5}
            max={2.0}
            step={0.5}
            value={pathCm}
            onChange={(e) => setPathCm(clampNumber(e.target.value, 0.5, 2.0))}
            className="w-full accent-[#7C957D] cursor-pointer mt-1"
          />
        </div>
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Al duplicar la concentración o el paso óptico de cuarzo, la absorbancia se duplica linealmente (A = ε·b·c) y la transmitancia cae exponencialmente.
      </p>
    </div>
  );
};

// 6. DETECTOR PMT / PDA MICRO-SIM
const DetectorMicroSim: React.FC = () => {
  const [pmtGain, setPmtGain] = useState<number>(600);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0C1A22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Incoming photon pulse
      const px = (t * 25) % 95;
      ctx.fillStyle = '#A9C2D2';
      ctx.beginPath();
      ctx.arc(15 + px, 75, 4, 0, Math.PI * 2);
      ctx.fill();

      // Photocathode plate
      ctx.fillStyle = '#8E3742';
      ctx.fillRect(110, 35, 6, 80);

      // Dynode cascade chain (4 stages shown)
      const dynodes = [
        { x: 155, y: 50 },
        { x: 200, y: 100 },
        { x: 245, y: 50 },
        { x: 290, y: 100 },
      ];
      dynodes.forEach((d) => {
        ctx.fillStyle = '#EFC4BF';
        ctx.fillRect(d.x - 10, d.y - 3, 20, 6);
      });

      // Electron avalanche trace
      const count = Math.round((pmtGain - 300) / 100) + 1;
      ctx.strokeStyle = '#7C957D';
      ctx.lineWidth = Math.min(4, 1 + count * 0.35);
      ctx.beginPath();
      ctx.moveTo(116, 75);
      dynodes.forEach((d) => ctx.lineTo(d.x, d.y));
      ctx.lineTo(325, 75);
      ctx.stroke();

      ctx.fillStyle = '#FAF7EE';
      ctx.font = '10px monospace';
      ctx.fillText('Fotón hν', 20, 58);
      ctx.fillText(`Ganancia PMT: 10^${(4 + (pmtGain - 300) / 300).toFixed(1)}`, 160, 22);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [pmtGain]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Voltaje de Dínodos PMT:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">{pmtGain} V</span>
        </label>
        <input
          type="range"
          min={300}
          max={1000}
          step={50}
          value={pmtGain}
          onChange={(e) => setPmtGain(clampNumber(e.target.value, 300, 1000))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Cada fotón que arranca un fotoelectrón en el fotocátodo desencadena una avalancha exponencial de millones de electrones en los dínodos.
      </p>
    </div>
  );
};

// 7. DATA SYSTEM / CALIBRATION CURVE MICRO-SIM
const DataSystemMicroSim: React.FC = () => {
  const [unknownAbs, setUnknownAbs] = useState<number>(0.72);
  const slope = 1.2; // ε·b = 1.2 UA/mM
  const calcConc = unknownAbs / slope;

  return (
    <div className="space-y-3">
      <div className="bg-[#0C1A22] rounded-lg border border-[#1C3947] p-3">
        <svg viewBox="0 0 300 115" className="w-full h-28">
          {/* Axes */}
          <line x1="35" y1="95" x2="285" y2="95" stroke="#7696AA" strokeWidth="1.5" />
          <line x1="35" y1="15" x2="35" y2="95" stroke="#7696AA" strokeWidth="1.5" />
          {/* Calibration Line */}
          <line x1="35" y1="95" x2="255" y2="20" stroke="#7C957D" strokeWidth="2.5" />
          {/* Standard Points */}
          <circle cx="80" cy="80" r="3" fill="#FAF7EE" />
          <circle cx="135" cy="61" r="3" fill="#FAF7EE" />
          <circle cx="195" cy="40" r="3" fill="#FAF7EE" />
          <circle cx="245" cy="23" r="3" fill="#FAF7EE" />
          {/* Unknown Sample Crosshair */}
          {(() => {
            const x = 35 + (calcConc / 1.5) * 220;
            const y = 95 - (unknownAbs / 1.8) * 75;
            return (
              <g>
                <line x1="35" y1={y} x2={x} y2={y} stroke="#EFC4BF" strokeDasharray="3,3" strokeWidth="1.2" />
                <line x1={x} y1={y} x2={x} y2="95" stroke="#EFC4BF" strokeDasharray="3,3" strokeWidth="1.2" />
                <circle cx={x} cy={y} r="4.5" fill="#8E3742" stroke="#FAF7EE" strokeWidth="1.5" />
              </g>
            );
          })()}
          <text x="140" y="110" fill="#A9C2D2" fontSize="9" fontFamily="monospace">Concentración (mM)</text>
          <text x="8" y="55" fill="#A9C2D2" fontSize="9" fontFamily="monospace">Abs</text>
        </svg>
      </div>
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Absorbancia Medida en λ_max:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold tabular-nums">
            {unknownAbs.toFixed(2)} UA → {calcConc.toFixed(2)} mM
          </span>
        </label>
        <input
          type="range"
          min={0.15}
          max={1.65}
          step={0.05}
          value={unknownAbs}
          onChange={(e) => setUnknownAbs(clampNumber(e.target.value, 0.15, 1.65))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El sistema interpola la absorbancia medida sobre la recta de calibración Beer-Lambert para cuantificar la concentración desconocida.
      </p>
    </div>
  );
};
