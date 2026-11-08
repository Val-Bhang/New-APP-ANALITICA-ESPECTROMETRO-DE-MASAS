import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { clampNumber } from '../utils/safeNumber';

interface PartMicroAnimationProps {
  type: 'inlet' | 'vacuum' | 'ionizer' | 'accelerator' | 'analyzer' | 'detector' | 'datasystem';
}

export const PartMicroAnimation: React.FC<PartMicroAnimationProps> = ({ type }) => {
  return (
    <div className="w-full bg-[#122630] rounded-xl p-4 border border-[#1C3947] text-[#FAF7EE] shadow-inner">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1C3947]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFC4BF]" />
          <span className="text-xs uppercase tracking-wider font-mono text-[#A9C2D2]">
            Micro-Simulación en Tiempo Real
          </span>
        </div>
        <span className="text-xs text-[#EFC4BF] font-mono">Dinámica de Partículas</span>
      </div>

      {type === 'inlet' && <InletMicroSim />}
      {type === 'ionizer' && <IonizerMicroSim />}
      {type === 'accelerator' && <AcceleratorMicroSim />}
      {type === 'analyzer' && <AnalyzerMicroSim />}
      {type === 'detector' && <DetectorMicroSim />}
      {type === 'vacuum' && <VacuumMicroSim />}
      {type === 'datasystem' && <DataSystemMicroSim />}
    </div>
  );
};

// 1. INLET SIMULATION
const InletMicroSim: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(220); // °C
  const [injectionRate, setInjectionRate] = useState<number>(5); // uL/min
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    interface VaporParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      isVaporized: boolean;
    }

    const particles: VaporParticle[] = [];

    const spawnLiquidDrop = () => {
      particles.push({
        x: 40,
        y: 80,
        vx: 1.2 + (injectionRate / 10),
        vy: (Math.random() - 0.5) * 0.4,
        radius: 4.5,
        opacity: 0.9,
        isVaporized: false,
      });
    };

    let frame = 0;
    const render = () => {
      frame++;
      if (frame % Math.max(10, 30 - injectionRate * 2) === 0) {
        spawnLiquidDrop();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw inlet needle / capillary
      ctx.fillStyle = '#7696AA';
      ctx.fillRect(10, 75, 45, 10);
      ctx.fillStyle = '#E2D7BB';
      ctx.fillRect(55, 77, 20, 6);

      // Vaporization expansion chamber (heated block)
      ctx.fillStyle = 'rgba(239, 196, 191, 0.12)';
      ctx.strokeStyle = '#8E3742';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(75, 30, 160, 100, 8);
      ctx.fill();
      ctx.stroke();

      // Heating coils visual
      ctx.strokeStyle = `rgba(220, 80, 80, ${Math.min(1, temperature / 280)})`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(85 + i * 26, 36, 6, 0, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(85 + i * 26, 124, 6, Math.PI, 0);
        ctx.stroke();
      }

      // Exit nozzle to vacuum
      ctx.fillStyle = '#A9C2D2';
      ctx.fillRect(235, 70, 30, 20);
      ctx.fillStyle = '#122630';
      ctx.fillRect(265, 75, 50, 10);

      // Chamber labels
      ctx.fillStyle = '#EFC4BF';
      ctx.font = '10px monospace';
      ctx.fillText(`CÁMARA TÉRMICA (${temperature} °C)`, 95, 24);
      ctx.fillStyle = '#A9C2D2';
      ctx.fillText('Hacia Ionizador ➔', 220, 115);

      // Update & render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (!p.isVaporized && p.x > 90) {
          // Vaporize into multiple gas molecules
          p.isVaporized = true;
          const numVapor = Math.floor(4 + (temperature / 50));
          for (let k = 0; k < numVapor; k++) {
            particles.push({
              x: p.x,
              y: p.y + (Math.random() - 0.5) * 6,
              vx: (1.2 + Math.random() * 2) * (temperature / 180),
              vy: (Math.random() - 0.5) * 1.8 * (temperature / 180),
              radius: 1.8,
              opacity: 0.85,
              isVaporized: true,
            });
          }
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce inside chamber walls before exiting
        if (p.x < 235) {
          if (p.y < 35 || p.y > 125) p.vy = -p.vy;
        } else {
          // In exit channel
          if (p.y < 73 || p.y > 87) p.vy = -p.vy;
        }

        ctx.fillStyle = p.isVaporized ? '#FAF7EE' : '#8E3742';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.x > canvas.width) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [temperature, injectionRate]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label className="text-[#FAF7EE] flex justify-between">
            <span>Temperatura:</span>
            <span className="font-mono text-[#EFC4BF] font-semibold">{temperature} °C</span>
          </label>
          <input
            type="range"
            min={100}
            max={350}
            value={temperature}
            onChange={(e) => setTemperature(clampNumber(e.target.value, 100, 350))}
            className="w-full accent-[#8E3742] cursor-pointer mt-1"
          />
        </div>
        <div>
          <label className="text-[#FAF7EE] flex justify-between">
            <span>Inyección:</span>
            <span className="font-mono text-[#7C957D] font-semibold">{injectionRate} μL/min</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={injectionRate}
            onChange={(e) => setInjectionRate(clampNumber(e.target.value, 1, 10))}
            className="w-full accent-[#7C957D] cursor-pointer mt-1"
          />
        </div>
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El calor provee la entalpía de vaporización (ΔH_vap). Las moléculas pasan de gotas densas a vapor monomolecular libre con alta energía térmica.
      </p>
    </div>
  );
};

// 2. IONIZER SIMULATION
const IonizerMicroSim: React.FC = () => {
  const [electronEnergy, setElectronEnergy] = useState<number>(70); // eV
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: 'neutral' | 'molecularIon' | 'fragmentIon' | 'electron';
      radius: number;
      glow: number;
    }

    const particles: Particle[] = [];

    let frame = 0;
    const render = () => {
      frame++;

      // Emit neutrals from left
      if (frame % 20 === 0) {
        particles.push({
          x: 20,
          y: 75 + (Math.random() - 0.5) * 30,
          vx: 1.5,
          vy: (Math.random() - 0.5) * 0.4,
          type: 'neutral',
          radius: 4,
          glow: 0,
        });
      }

      // Emit high speed electrons from top filament downwards
      if (frame % 4 === 0) {
        particles.push({
          x: 170 + (Math.random() - 0.5) * 20,
          y: 15,
          vx: (Math.random() - 0.5) * 0.2,
          vy: 3.5 * (electronEnergy / 50),
          type: 'electron',
          radius: 1.8,
          glow: 0,
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Repeller plate on left (positive potential)
      ctx.fillStyle = 'rgba(239, 196, 191, 0.25)';
      ctx.fillRect(10, 40, 6, 70);
      ctx.fillStyle = '#EFC4BF';
      ctx.font = '9px monospace';
      ctx.fillText('+V Repulsor', 2, 32);

      // Top filament (hot cathode)
      ctx.strokeStyle = '#D89F99';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(150, 10);
      ctx.lineTo(190, 10);
      ctx.stroke();
      ctx.fillStyle = '#D89F99';
      ctx.fillText('Filamento e⁻ (Cátodo)', 135, 8);

      // Bottom electron trap (anode)
      ctx.fillStyle = '#7C957D';
      ctx.fillRect(150, 140, 40, 6);
      ctx.fillText('Trampa Ánodo (+70V)', 130, 148);

      // Exit slit on right
      ctx.fillStyle = '#A9C2D2';
      ctx.fillRect(320, 20, 6, 45);
      ctx.fillRect(320, 85, 6, 45);
      ctx.fillText('Hacia Acelerador ➔', 230, 125);

      // Process collision and movement
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Electric repeller push towards right for cations
        if (p.type === 'molecularIon' || p.type === 'fragmentIon') {
          p.vx += 0.08;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Check electron-neutral collision in the impact zone (around x: 160-180, y: 55-95)
        if (p.type === 'neutral' && p.x > 155 && p.x < 185 && p.y > 50 && p.y < 100) {
          // Probability depends on electron energy
          const ionProb = electronEnergy < 15 ? 0.05 : electronEnergy === 70 ? 0.7 : 0.85;
          if (Math.random() < ionProb) {
            // Ionization event! Flash
            ctx.fillStyle = '#FAF7EE';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
            ctx.fill();

            // Transform into molecular ion or fragment
            if (electronEnergy > 50 && Math.random() < 0.6) {
              p.type = 'fragmentIon';
              p.radius = 3;
            } else {
              p.type = 'molecularIon';
              p.radius = 4;
            }
          }
        }

        // Draw particle
        if (p.type === 'neutral') {
          ctx.fillStyle = '#A9C2D2';
        } else if (p.type === 'molecularIon') {
          ctx.fillStyle = '#7C957D'; // Sage green for intact molecular ion
        } else if (p.type === 'fragmentIon') {
          ctx.fillStyle = '#EFC4BF'; // Blush pink for fragments
        } else {
          ctx.fillStyle = '#FAF7EE'; // White dot for electrons
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Remove out of bounds
        if (p.x > canvas.width || p.x < 0 || p.y > canvas.height || p.y < 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [electronEnergy]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Energía de Electrones:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold">{electronEnergy} eV {electronEnergy === 70 ? '(Estándar NIST)' : ''}</span>
        </label>
        <input
          type="range"
          min={10}
          max={120}
          step={5}
          value={electronEnergy}
          onChange={(e) => setElectronEnergy(clampNumber(e.target.value, 10, 120))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <div className="flex items-center gap-3 text-[11px] font-mono">
        <span className="flex items-center gap-1 text-[#A9C2D2]">
          <span className="w-2 h-2 rounded-full bg-[#A9C2D2]" /> Molécula Neutra M
        </span>
        <span className="flex items-center gap-1 text-[#7C957D]">
          <span className="w-2 h-2 rounded-full bg-[#7C957D]" /> Ion Molecular [M]⁺•
        </span>
        <span className="flex items-center gap-1 text-[#EFC4BF]">
          <span className="w-2 h-2 rounded-full bg-[#EFC4BF]" /> Fragmentos
        </span>
      </div>
    </div>
  );
};

// 3. ACCELERATOR SIMULATION
const AcceleratorMicroSim: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(4000); // Volts
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    interface Ion {
      x: number;
      y: number;
      vx: number;
      mass: 'light' | 'heavy';
    }

    const ions: Ion[] = [];
    let frame = 0;

    const render = () => {
      frame++;
      if (frame % 8 === 0) {
        ions.push({
          x: 20,
          y: 75 + (Math.random() - 0.5) * 20,
          vx: 0.8,
          mass: Math.random() > 0.5 ? 'light' : 'heavy',
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw 3 accelerating plates with slits
      const plates = [
        { x: 90, v: voltage, color: '#8E3742', label: `+${voltage}V` },
        { x: 180, v: voltage * 0.5, color: '#A9C2D2', label: `+${Math.round(voltage * 0.5)}V` },
        { x: 270, v: 0, color: '#7C957D', label: '0V (Tierra)' },
      ];

      plates.forEach((p) => {
        ctx.fillStyle = p.color;
        // Upper slit plate
        ctx.fillRect(p.x, 20, 6, 45);
        // Lower slit plate
        ctx.fillRect(p.x, 85, 6, 45);
        ctx.font = '9px monospace';
        ctx.fillText(p.label, p.x - 14, 18);
      });

      // Field lines between plates
      ctx.strokeStyle = 'rgba(239, 196, 191, 0.15)';
      ctx.setLineDash([4, 4]);
      for (let y = 35; y <= 115; y += 20) {
        ctx.beginPath();
        ctx.moveTo(96, y);
        ctx.lineTo(270, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Update ions
      const accRate = (voltage / 4000) * 0.15;

      for (let i = ions.length - 1; i >= 0; i--) {
        const ion = ions[i];

        // Accelerate when between plate 1 and 3
        if (ion.x >= 90 && ion.x <= 270) {
          const factor = ion.mass === 'light' ? 1.8 : 0.8;
          ion.vx += accRate * factor;
        }

        ion.x += ion.vx;

        // Draw ion
        ctx.fillStyle = ion.mass === 'light' ? '#EFC4BF' : '#7C957D';
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, ion.mass === 'light' ? 3 : 4.5, 0, Math.PI * 2);
        ctx.fill();

        if (ion.x > canvas.width) {
          ions.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [voltage]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Diferencia de Potencial Acelerador (V):</span>
          <span className="font-mono text-[#EFC4BF] font-semibold">{voltage} V</span>
        </label>
        <input
          type="range"
          min={1000}
          max={8000}
          step={200}
          value={voltage}
          onChange={(e) => setVoltage(clampNumber(e.target.value, 1000, 8000))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Conservación de la energía: <span className="font-mono text-[#FAF7EE]">Ek = q·V = ½·m·v²</span>. Los iones livianos (<span className="text-[#EFC4BF]">rosa</span>) adquieren una velocidad de salida mucho mayor que los pesados (<span className="text-[#7C957D]">verde</span>).
      </p>
    </div>
  );
};

// 4. ANALYZER SIMULATION
const AnalyzerMicroSim: React.FC = () => {
  const [bField, setBField] = useState<number>(0.65); // Tesla
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    interface TrajectoryIon {
      x: number;
      y: number;
      vx: number;
      vy: number;
      mz: number;
      color: string;
      label: string;
    }

    const ions: TrajectoryIon[] = [];
    let frame = 0;

    const render = () => {
      frame++;
      if (frame % 10 === 0) {
        // Emit 3 ion masses: light (m/z=15), medium (m/z=46), heavy (m/z=100)
        const types = [
          { mz: 15, color: '#EFC4BF', label: 'Ligero (15)' },
          { mz: 46, color: '#7C957D', label: 'Medio (46)' },
          { mz: 100, color: '#A9C2D2', label: 'Pesado (100)' },
        ];
        const chosen = types[frame % 3];
        ions.push({
          x: 20,
          y: 110,
          vx: 2.8,
          vy: 0,
          mz: chosen.mz,
          color: chosen.color,
          label: chosen.label,
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw curved flight tube outline
      ctx.strokeStyle = '#1C3947';
      ctx.lineWidth = 36;
      ctx.beginPath();
      ctx.arc(170, 110, 90, Math.PI, 0.5 * Math.PI, true);
      ctx.stroke();

      // Magnetic Pole boundaries
      ctx.strokeStyle = '#8E3742';
      ctx.lineWidth = 2;
      ctx.strokeRect(90, 20, 150, 100);
      ctx.fillStyle = 'rgba(142, 55, 66, 0.12)';
      ctx.fillRect(90, 20, 150, 100);

      // Magnetic field icons (circles with crosses indicating field into page)
      ctx.fillStyle = '#D89F99';
      ctx.font = '10px monospace';
      ctx.fillText(`CAMPO MAGNÉTICO B = ${bField.toFixed(2)} T`, 100, 36);

      // Collector slit at 90 degrees
      ctx.fillStyle = '#FAF7EE';
      ctx.fillRect(160, 20, 6, 8);
      ctx.fillRect(174, 20, 6, 8);
      ctx.fillStyle = '#EFC4BF';
      ctx.fillText('Rendija Colectora', 186, 26);

      // Update trajectories using Lorentz curvature
      for (let i = ions.length - 1; i >= 0; i--) {
        const ion = ions[i];

        // Magnetic deflection when inside magnetic sector
        if (ion.x > 85 && ion.x < 240 && ion.y > 20 && ion.y < 125) {
          // Radius: r = mv / (qB) => acceleration perpendicular
          const curvature = (bField / (ion.mz * 0.04)) * 0.08;
          ion.vy -= curvature * ion.vx;
          ion.vx -= curvature * -ion.vy * 0.5;
        }

        ion.x += ion.vx;
        ion.y += ion.vy;

        ctx.fillStyle = ion.color;
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Check if reaches collector slit
        if (ion.y <= 24 && ion.x >= 163 && ion.x <= 173) {
          // Success hit!
          ctx.fillStyle = '#FAF7EE';
          ctx.beginPath();
          ctx.arc(ion.x, ion.y, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        if (ion.x > canvas.width || ion.y < 0 || ion.y > canvas.height) {
          ions.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [bField]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div>
        <label className="text-[#FAF7EE] text-xs flex justify-between">
          <span>Intensidad de Campo Magnético B:</span>
          <span className="font-mono text-[#EFC4BF] font-semibold">{bField.toFixed(2)} Tesla</span>
        </label>
        <input
          type="range"
          min={0.2}
          max={1.2}
          step={0.02}
          value={bField}
          onChange={(e) => setBField(clampNumber(e.target.value, 0.2, 1.2))}
          className="w-full accent-[#8E3742] cursor-pointer mt-1"
        />
      </div>
      <div className="flex justify-between text-[11px] font-mono">
        <span className="text-[#EFC4BF]">● m/z 15 (curva cerrada)</span>
        <span className="text-[#7C957D]">● m/z 46 (calibrado)</span>
        <span className="text-[#A9C2D2]">● m/z 100 (curva abierta)</span>
      </div>
    </div>
  );
};

// 5. DETECTOR SIMULATION
const DetectorMicroSim: React.FC = () => {
  const [pulseCount, setPulseCount] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const triggerSingleIon = () => {
    setPulseCount((c) => c + 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    interface ElectronPulse {
      x: number;
      y: number;
      vx: number;
      vy: number;
      stage: number;
      color: string;
    }

    const electrons: ElectronPulse[] = [];

    // Trigger ion when pulseCount increments
    const launchCascade = () => {
      electrons.push({
        x: 20,
        y: 75,
        vx: 3,
        vy: 0,
        stage: 0,
        color: '#EFC4BF', // Incoming positive ion
      });
    };

    launchCascade();

    let autoTimer = 0;
    const render = () => {
      autoTimer++;
      if (autoTimer % 45 === 0) {
        launchCascade();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dynodes in zig-zag
      const dynodes = [
        { x: 70, y: 55, angle: 0.3, label: '+1.2kV' },
        { x: 120, y: 95, angle: -0.3, label: '+1.5kV' },
        { x: 170, y: 55, angle: 0.3, label: '+1.8kV' },
        { x: 220, y: 95, angle: -0.3, label: '+2.1kV' },
        { x: 270, y: 55, angle: 0.3, label: '+2.4kV' },
      ];

      dynodes.forEach((d) => {
        ctx.fillStyle = '#8E3742';
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.angle);
        ctx.fillRect(-12, -4, 24, 8);
        ctx.restore();
        ctx.fillStyle = '#A9C2D2';
        ctx.font = '8px monospace';
        ctx.fillText(d.label, d.x - 14, d.y + (d.y > 75 ? 20 : -12));
      });

      // Anode collector at right
      ctx.fillStyle = '#7C957D';
      ctx.fillRect(310, 60, 10, 30);
      ctx.font = '9px monospace';
      ctx.fillText('Ánodo Colector', 260, 110);

      // Process cascade particles
      for (let i = electrons.length - 1; i >= 0; i--) {
        const p = electrons[i];
        p.x += p.vx;
        p.y += p.vy;

        // Check collision with next dynode
        if (p.stage < dynodes.length) {
          const target = dynodes[p.stage];
          const dist = Math.hypot(p.x - target.x, p.y - target.y);
          if (dist < 12) {
            // Dynode hit! Multiply by 3
            p.stage++;
            const nextTarget = p.stage < dynodes.length ? dynodes[p.stage] : { x: 310, y: 75 };
            const angle = Math.atan2(nextTarget.y - p.y, nextTarget.x - p.x);

            // Spawn secondary electrons
            for (let k = 0; k < 3; k++) {
              electrons.push({
                x: target.x,
                y: target.y,
                vx: Math.cos(angle + (Math.random() - 0.5) * 0.4) * 3.2,
                vy: Math.sin(angle + (Math.random() - 0.5) * 0.4) * 3.2,
                stage: p.stage,
                color: '#FAF7EE',
              });
            }
            electrons.splice(i, 1);
            continue;
          }
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.color === '#EFC4BF' ? 4 : 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.x > 320 || p.x < 0 || p.y < 0 || p.y > canvas.height) {
          electrons.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [pulseCount]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div className="flex items-center justify-between">
        <button
          onClick={triggerSingleIon}
          className="px-3 py-1.5 bg-[#8E3742] hover:bg-[#742B34] text-[#FAF7EE] text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Play className="w-3.5 h-3.5" />
          Disparar Ion Catiónico
        </button>
        <span className="text-xs font-mono text-[#A9C2D2]">
          Ganancia: <strong className="text-[#EFC4BF]">G = δ^N ≈ 10⁶</strong>
        </span>
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        Cada impacto iónico libera 3 electrones secundarios por dínodo. Tras 16 etapas consecutivas, un solo ion produce una corriente medible en el ánodo.
      </p>
    </div>
  );
};

// 6. VACUUM SIMULATION
const VacuumMicroSim: React.FC = () => {
  const [vacuumActive, setVacuumActive] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    interface GasParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    interface BeamIon {
      x: number;
      y: number;
      vx: number;
      vy: number;
      scattered: boolean;
    }

    const airMolecules: GasParticle[] = [];
    const ions: BeamIon[] = [];

    // Pre-populate air
    for (let i = 0; i < 80; i++) {
      airMolecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      });
    }

    let frame = 0;
    const render = () => {
      frame++;

      // Beam ion injected continuously
      if (frame % 8 === 0) {
        ions.push({
          x: 10,
          y: 75 + (Math.random() - 0.5) * 4,
          vx: 3.5,
          vy: 0,
          scattered: false,
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Vacuum chamber walls
      ctx.strokeStyle = '#1C3947';
      ctx.lineWidth = 4;
      ctx.strokeRect(4, 30, canvas.width - 8, 90);

      // Turbo pump port below
      ctx.fillStyle = '#8E3742';
      ctx.fillRect(150, 120, 40, 20);
      ctx.fillStyle = '#FAF7EE';
      ctx.font = '8px monospace';
      ctx.fillText('BOMBA TURBO', 142, 134);

      // If vacuum is active, air count drops drastically
      const activeAirCount = vacuumActive ? 4 : 70;

      // Render air background molecules (N2 / O2)
      for (let i = 0; i < activeAirCount; i++) {
        const gas = airMolecules[i];
        gas.x += gas.vx;
        gas.y += gas.vy;

        if (gas.x < 10 || gas.x > canvas.width - 10) gas.vx = -gas.vx;
        if (gas.y < 35 || gas.y > 115) gas.vy = -gas.vy;

        ctx.fillStyle = 'rgba(169, 194, 210, 0.4)';
        ctx.beginPath();
        ctx.arc(gas.x, gas.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render ions and handle collisions
      for (let i = ions.length - 1; i >= 0; i--) {
        const ion = ions[i];

        if (!vacuumActive && !ion.scattered) {
          // Check collision with air
          for (let k = 0; k < activeAirCount; k++) {
            const gas = airMolecules[k];
            if (Math.hypot(ion.x - gas.x, ion.y - gas.y) < 6) {
              ion.scattered = true;
              ion.vx = (Math.random() - 0.5) * 2;
              ion.vy = (Math.random() - 0.5) * 2.5;
              break;
            }
          }
        }

        ion.x += ion.vx;
        ion.y += ion.vy;

        ctx.fillStyle = ion.scattered ? '#EFC4BF' : '#7C957D';
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if (ion.x > canvas.width - 10 || ion.x < 0 || ion.y < 0 || ion.y > canvas.height) {
          ions.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [vacuumActive]);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div className="flex items-center justify-between">
        <button
          onClick={() => setVacuumActive(!vacuumActive)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm ${
            vacuumActive ? 'bg-[#7C957D] text-[#FAF7EE]' : 'bg-[#8E3742] text-[#FAF7EE]'
          }`}
        >
          {vacuumActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
          {vacuumActive ? 'Alto Vacío (10⁻⁶ Torr) - ON' : 'Pérdida de Vacío (Fuga) - OFF'}
        </button>
        <span className="text-xs font-mono text-[#EFC4BF]">
          λ: {vacuumActive ? '> 50 m' : '68 nm'}
        </span>
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        {vacuumActive
          ? 'En alto vacío el libre camino medio (λ) es mayor que el tubo. El haz iónico viaja sin obstáculos balísticos.'
          : '¡Alerta de Colisión! Sin vacío, los iones chocan inmediatamente con el nitrógeno/oxígeno del aire y se dispersan.'}
      </p>
    </div>
  );
};

// 7. DATA SYSTEM SIMULATION
const DataSystemMicroSim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sweepMz = 10;
    const recordedPeaks: { mz: number; height: number; formula: string }[] = [];

    const targetPeaks = [
      { mz: 15, height: 20, formula: 'CH3+' },
      { mz: 31, height: 100, formula: 'CH2OH+ (Base)' },
      { mz: 45, height: 45, formula: 'C2H5O+' },
      { mz: 46, height: 30, formula: 'M+ (Etanol)' },
    ];

    const render = () => {
      sweepMz += 0.4;
      if (sweepMz > 60) {
        sweepMz = 10;
        recordedPeaks.length = 0;
      }

      // Check if sweep reaches peak
      targetPeaks.forEach((tp) => {
        if (Math.abs(sweepMz - tp.mz) < 0.4 && !recordedPeaks.some((rp) => rp.mz === tp.mz)) {
          recordedPeaks.push(tp);
        }
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Coordinate axes
      ctx.strokeStyle = '#1C3947';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(35, 125);
      ctx.lineTo(320, 125); // X-axis (m/z)
      ctx.moveTo(35, 20);
      ctx.lineTo(35, 125); // Y-axis (Abundancia)
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#A9C2D2';
      ctx.font = '9px monospace';
      ctx.fillText('100%', 8, 26);
      ctx.fillText('0%', 18, 125);
      ctx.fillText('m/z ➔', 290, 138);

      // Current sweep laser line
      const sweepX = 35 + ((sweepMz - 10) / 50) * 260;
      ctx.strokeStyle = '#EFC4BF';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(sweepX, 20);
      ctx.lineTo(sweepX, 125);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw accumulated spectral peaks
      recordedPeaks.forEach((p) => {
        const x = 35 + ((p.mz - 10) / 50) * 260;
        const barH = (p.height / 100) * 95;
        const y = 125 - barH;

        ctx.strokeStyle = p.height === 100 ? '#8E3742' : '#7C957D';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, 125);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = '#FAF7EE';
        ctx.font = '8px monospace';
        ctx.fillText(p.mz.toString(), x - 6, 136);

        if (p.height === 100) {
          ctx.fillStyle = '#EFC4BF';
          ctx.fillText('100% Base', x - 18, y - 4);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={340} height={150} className="w-full bg-[#0C1A22] rounded-lg border border-[#1C3947]" />
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-[#A9C2D2]">Escaneo continuo de campo magnético</span>
        <span className="text-[#7C957D]">ADC: 24-bit 100kHz</span>
      </div>
      <p className="text-[11px] text-[#A9C2D2] leading-relaxed">
        El conversor digitaliza la corriente en sincronicidad con el barrido del electroimán para generar el espectro normalizado al Pico Base (100%).
      </p>
    </div>
  );
};
