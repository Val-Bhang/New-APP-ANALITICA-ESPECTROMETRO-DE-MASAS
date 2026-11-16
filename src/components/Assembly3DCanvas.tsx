import React, { useEffect, useRef } from 'react';
import { AssemblyStep, InstrumentId } from '../data/assemblyStepsData';

interface Assembly3DCanvasProps {
  instrumentId: InstrumentId;
  steps: AssemblyStep[];
  currentStepIndex: number; // 0-based active step (0..9)
  stepTransitionProgress: number; // 0 -> 1 drop-in progress of active step
  explodedView: boolean;
  yawRad: number;
  pitchRad: number;
  zoom: number;
  onDragRotate: (dYaw: number, dPitch: number) => void;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface RenderFace {
  points: { sx: number; sy: number }[];
  depth: number;
  fill: string;
  stroke: string;
  lineWidth: number;
  alpha: number;
  isLine?: boolean;
  dash?: number[];
  isDot?: boolean;
  dotRadius?: number;
}

function shadeHex(hex: string, factor: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const r = Math.min(255, Math.max(0, Math.round(parseInt(clean.slice(0, 2), 16) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(parseInt(clean.slice(2, 4), 16) * factor)));
  const b = Math.min(255, Math.max(0, Math.round(parseInt(clean.slice(4, 6), 16) * factor)));
  return `rgb(${r}, ${g}, ${b})`;
}

export const Assembly3DCanvas: React.FC<Assembly3DCanvasProps> = ({
  instrumentId,
  steps,
  currentStepIndex,
  stepTransitionProgress,
  explodedView,
  yawRad,
  pitchRad,
  zoom,
  onDragRotate
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragStateRef = useRef<{ dragging: boolean; lastX: number; lastY: number }>({
    dragging: false,
    lastX: 0,
    lastY: 0
  });
  const clockRef = useRef<number>(0);

  // Continuous operational micro-animation clock (ions, fans, beams, spins)
  useEffect(() => {
    let rafId: number;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clockRef.current += dt;
      drawScene();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [
    instrumentId,
    steps,
    currentStepIndex,
    stepTransitionProgress,
    explodedView,
    yawRad,
    pitchRad,
    zoom
  ]);

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Studio dark midnight background matching Easy Spectroscopy
    const bgGrad = ctx.createRadialGradient(W * 0.5, H * 0.45, 30, W * 0.5, H * 0.5, W * 0.72);
    bgGrad.addColorStop(0, '#132B38');
    bgGrad.addColorStop(1, '#071116');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    const cx = W * 0.5;
    const cy = H * 0.64;
    const scale = 1.68 * zoom;
    const cosY = Math.cos(yawRad);
    const sinY = Math.sin(yawRad);
    const sinP = Math.sin(pitchRad);
    const cosP = Math.cos(pitchRad);

    const project = (p: Vec3) => {
      const rx = p.x * cosY - p.y * sinY;
      const ry = p.x * sinY + p.y * cosY;
      const rz = p.z;
      const sx = cx + rx * scale;
      const sy = cy - (ry * sinP + rz * cosP) * scale;
      // Larger depth = further away from viewer -> drawn earlier
      const depth = ry * cosP - rz * sinP;
      return { sx, sy, depth };
    };

    const faces: RenderFace[] = [];

    // Helper: Optical Lab Table Grid on z = -2
    const drawBenchGrid = () => {
      for (let gx = -160; gx <= 160; gx += 40) {
        const a = project({ x: gx, y: -100, z: -2 });
        const b = project({ x: gx, y: 100, z: -2 });
        faces.push({
          points: [a, b],
          depth: (a.depth + b.depth) / 2 + 500,
          fill: 'none',
          stroke: 'rgba(169, 194, 210, 0.14)',
          lineWidth: 1,
          alpha: 1,
          isLine: true
        });
      }
      for (let gy = -100; gy <= 100; gy += 40) {
        const a = project({ x: -160, y: gy, z: -2 });
        const b = project({ x: 160, y: gy, z: -2 });
        faces.push({
          points: [a, b],
          depth: (a.depth + b.depth) / 2 + 500,
          fill: 'none',
          stroke: 'rgba(169, 194, 210, 0.14)',
          lineWidth: 1,
          alpha: 1,
          isLine: true
        });
      }
    };
    drawBenchGrid();

    // Helper: Queue 3D Oriented Box centered at (bx, by) resting on zBase up to zBase + h
    const addBox = (
      bx: number,
      by: number,
      zBase: number,
      w: number,
      d: number,
      h: number,
      baseHex: string,
      strokeHex = '#0C1A22',
      alpha = 1
    ) => {
      const hw = w / 2;
      const hd = d / 2;
      const v = [
        { x: bx - hw, y: by - hd, z: zBase }, // 0: L-F-B
        { x: bx + hw, y: by - hd, z: zBase }, // 1: R-F-B
        { x: bx + hw, y: by + hd, z: zBase }, // 2: R-B-B
        { x: bx - hw, y: by + hd, z: zBase }, // 3: L-B-B
        { x: bx - hw, y: by - hd, z: zBase + h }, // 4: L-F-T
        { x: bx + hw, y: by - hd, z: zBase + h }, // 5: R-F-T
        { x: bx + hw, y: by + hd, z: zBase + h }, // 6: R-B-T
        { x: bx - hw, y: by + hd, z: zBase + h } // 7: L-B-T
      ];
      const pv = v.map(project);

      const quads: { idx: [number, number, number, number]; shade: number }[] = [
        { idx: [4, 5, 6, 7], shade: 1.18 }, // Top (+Z)
        { idx: [3, 2, 1, 0], shade: 0.65 }, // Bottom (-Z)
        { idx: [0, 1, 5, 4], shade: 0.96 }, // Front (-Y)
        { idx: [2, 3, 7, 6], shade: 0.78 }, // Back (+Y)
        { idx: [1, 2, 6, 5], shade: 0.88 }, // Right (+X)
        { idx: [3, 0, 4, 7], shade: 1.04 }  // Left (-X)
      ];

      quads.forEach(({ idx, shade }) => {
        const p0 = pv[idx[0]];
        const p1 = pv[idx[1]];
        const p2 = pv[idx[2]];
        const p3 = pv[idx[3]];
        const cross =
          (p1.sx - p0.sx) * (p2.sy - p0.sy) - (p1.sy - p0.sy) * (p2.sx - p0.sx);
        if (cross < -0.5) {
          faces.push({
            points: [p0, p1, p2, p3],
            depth: (p0.depth + p1.depth + p2.depth + p3.depth) / 4,
            fill: shadeHex(baseHex, shade),
            stroke: strokeHex,
            lineWidth: 1.1,
            alpha
          });
        }
      });
    };

    // Helper: Queue 3D Cylinder along axis 'z', 'x', or 'y'
    const addCylinder = (
      cx3: number,
      cy3: number,
      cz3: number,
      r: number,
      length: number,
      axis: 'z' | 'x' | 'y',
      baseHex: string,
      strokeHex = '#0C1A22',
      alpha = 1,
      segs = 12
    ) => {
      const ringA: { sx: number; sy: number; depth: number }[] = [];
      const ringB: { sx: number; sy: number; depth: number }[] = [];

      for (let i = 0; i < segs; i++) {
        const th = (i / segs) * Math.PI * 2;
        const c = Math.cos(th) * r;
        const s = Math.sin(th) * r;
        if (axis === 'z') {
          ringA.push(project({ x: cx3 + c, y: cy3 + s, z: cz3 }));
          ringB.push(project({ x: cx3 + c, y: cy3 + s, z: cz3 + length }));
        } else if (axis === 'x') {
          ringA.push(project({ x: cx3, y: cy3 + c, z: cz3 + s }));
          ringB.push(project({ x: cx3 + length, y: cy3 + c, z: cz3 + s }));
        } else {
          ringA.push(project({ x: cx3 + c, y: cy3, z: cz3 + s }));
          ringB.push(project({ x: cx3 + c, y: cy3 + length, z: cz3 + s }));
        }
      }

      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        const p0 = ringA[i];
        const p1 = ringA[next];
        const p2 = ringB[next];
        const p3 = ringB[i];
        const cross =
          (p1.sx - p0.sx) * (p2.sy - p0.sy) - (p1.sy - p0.sy) * (p2.sx - p0.sx);
        const lighting = 0.78 + 0.35 * ((Math.cos((i / segs) * Math.PI * 2) + 1) / 2);
        if (cross < -0.2) {
          faces.push({
            points: [p0, p1, p2, p3],
            depth: (p0.depth + p1.depth + p2.depth + p3.depth) / 4,
            fill: shadeHex(baseHex, lighting),
            stroke: strokeHex,
            lineWidth: 0.7,
            alpha
          });
        }
      }

      const capBAvgDepth = ringB.reduce((acc, p) => acc + p.depth, 0) / segs;
      const capBCheck =
        (ringB[1].sx - ringB[0].sx) * (ringB[2].sy - ringB[0].sy) -
        (ringB[1].sy - ringB[0].sy) * (ringB[2].sx - ringB[0].sx);
      if (capBCheck < 0) {
        faces.push({
          points: ringB,
          depth: capBAvgDepth,
          fill: shadeHex(baseHex, 1.15),
          stroke: strokeHex,
          lineWidth: 1.0,
          alpha
        });
      } else {
        const capAAvgDepth = ringA.reduce((acc, p) => acc + p.depth, 0) / segs;
        faces.push({
          points: [...ringA].reverse(),
          depth: capAAvgDepth,
          fill: shadeHex(baseHex, 0.9),
          stroke: strokeHex,
          lineWidth: 1.0,
          alpha
        });
      }
    };

    const addLine3D = (
      p1: Vec3,
      p2: Vec3,
      color: string,
      width = 1.6,
      dash: number[] = [],
      alpha = 1
    ) => {
      const a = project(p1);
      const b = project(p2);
      faces.push({
        points: [a, b],
        depth: (a.depth + b.depth) / 2,
        fill: 'none',
        stroke: color,
        lineWidth: width,
        alpha,
        isLine: true,
        dash
      });
    };

    const addDot3D = (p: Vec3, radius: number, color: string, alpha = 1) => {
      const pr = project(p);
      faces.push({
        points: [pr],
        depth: pr.depth - 0.5,
        fill: color,
        stroke: '#FAF7EE',
        lineWidth: 1,
        alpha,
        isDot: true,
        dotRadius: radius * zoom
      });
    };

    // Helper: Metallic corner fastener bolt head
    const addBolt = (bx: number, by: number, zSurface: number, edgeHex: string, alpha: number) => {
      addCylinder(bx, by, zSurface, 2.8, 3.2, 'z', '#D6E4EC', edgeHex, alpha, 8);
    };

    // Helper: Recessed instrument touchscreen with live operational waveform when Step 10 locks in
    const addScreenModule = (
      sx: number,
      sy: number,
      sz: number,
      w: number,
      d: number,
      h: number,
      faceAxis: 'front' | 'right',
      traceHex: string,
      edgeHex: string,
      alpha: number,
      isLive: boolean,
      tClock: number
    ) => {
      // Bezel housing + dark glass screen
      addBox(sx, sy, sz, w, d, h, '#0B171E', edgeHex, alpha);
      if (faceAxis === 'front') {
        addBox(sx, sy - d / 2 - 1, sz + 3, w - 6, 2, h - 6, '#060E13', '#A9C2D2', alpha);
        const pts: Vec3[] = [];
        const samples = 9;
        for (let i = 0; i < samples; i++) {
          const u = i / (samples - 1);
          const wx = sx - (w - 12) / 2 + u * (w - 12);
          const peak =
            isLive
              ? Math.exp(-Math.pow((u - 0.35) * 7, 2)) * (h * 0.36) +
                Math.exp(-Math.pow((u - 0.72) * 8, 2)) * (h * 0.28) +
                Math.sin(tClock * 5 + i) * 1.2
              : 1;
          pts.push({ x: wx, y: sy - d / 2 - 2.6, z: sz + 8 + peak });
        }
        for (let i = 0; i < pts.length - 1; i++) {
          addLine3D(pts[i], pts[i + 1], isLive ? traceHex : '#325263', 1.7, [], alpha);
        }
      } else {
        addBox(sx + w / 2 + 1, sy, sz + 3, 2, d - 6, h - 6, '#060E13', '#A9C2D2', alpha);
        const pts: Vec3[] = [];
        const samples = 9;
        for (let i = 0; i < samples; i++) {
          const u = i / (samples - 1);
          const wy = sy - (d - 12) / 2 + u * (d - 12);
          const peak =
            isLive
              ? Math.exp(-Math.pow((u - 0.32) * 7, 2)) * (h * 0.35) +
                Math.exp(-Math.pow((u - 0.68) * 8, 2)) * (h * 0.26) +
                Math.sin(tClock * 5 + i) * 1.2
              : 1;
          pts.push({ x: sx + w / 2 + 2.6, y: wy, z: sz + 8 + peak });
        }
        for (let i = 0; i < pts.length - 1; i++) {
          addLine3D(pts[i], pts[i + 1], isLive ? traceHex : '#325263', 1.7, [], alpha);
        }
      }
    };

    // Ease-out drop curve for currently assembling step
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);
    const tClock = clockRef.current;

    const getStepTransform = (idx: number, step: AssemblyStep) => {
      const isActive = idx === currentStepIndex;
      const isInstalled = idx <= currentStepIndex;
      if (!isInstalled) return null;

      let ox = 0;
      let oy = 0;
      let oz = 0;
      let alpha = 1;

      if (explodedView) {
        ox += step.explodedOffset.dx;
        oy += step.explodedOffset.dy;
        oz += step.explodedOffset.dz;
      }

      if (isActive) {
        const eased = easeOutCubic(stepTransitionProgress);
        const dropStartZ = step.partKey === 'nmr_rf_probe' ? -85 : 105;
        oz += dropStartZ * (1 - eased);
        alpha = 0.35 + 0.65 * eased;
      }

      return { ox, oy, oz, alpha, isActive };
    };

    const drawDropGuide = (tx: number, ty: number, zTarget: number, oz: number, color: string) => {
      if (Math.abs(oz) < 6) return;
      addLine3D(
        { x: tx, y: ty, z: zTarget },
        { x: tx, y: ty, z: zTarget + oz },
        color,
        1.5,
        [4, 4],
        0.75
      );
      addDot3D({ x: tx, y: ty, z: zTarget }, 3.2, color, 0.9);
    };

    // =========================================================================
    // INSTRUMENT-SPECIFIC 3D CAD SUB-ASSEMBLIES (ALL 6 SPECTROMETERS · 10 STEPS)
    // =========================================================================
    const activeReadyForFlow = currentStepIndex === steps.length - 1 && stepTransitionProgress > 0.75;

    steps.forEach((step, idx) => {
      const tr = getStepTransform(idx, step);
      if (!tr) return;
      const { ox, oy, oz, alpha, isActive } = tr;
      const edge = isActive ? '#EFC4BF' : '#09151C';

      if (instrumentId === 'ms') {
        switch (step.partKey) {
          case 'ms_chassis_pump': {
            // 4 Elastomeric corner dampers + base frame + rotary roughing pump
            [
              { x: -110, y: -52 },
              { x: 110, y: -52 },
              { x: -110, y: 52 },
              { x: 110, y: 52 }
            ].forEach((ft) => addCylinder(ft.x + ox, ft.y + oy, -4 + oz, 7, 5, 'z', '#0F1E27', edge, alpha));
            addBox(ox, oy, oz, 240, 122, 14, '#1C3947', edge, alpha);
            addBox(-78 + ox, -25 + oy, 14 + oz, 42, 34, 24, '#7C957D', edge, alpha);
            addCylinder(-54 + ox, -25 + oy, 22 + oz, 8, 22, 'z', '#A9C2D2', edge, alpha);
            break;
          }
          case 'ms_vacuum_manifold': {
            drawDropGuide(12 + ox, oy, 14, oz, '#A9C2D2');
            addBox(12 + ox, oy, 14 + oz, 174, 90, 56, '#284554', edge, alpha * 0.82);
            addCylinder(12 + ox, oy, 0 + oz, 24, 16, 'z', '#A9C2D2', edge, alpha);
            addBolt(-66 + ox, -38 + oy, 70 + oz, edge, alpha);
            addBolt(90 + ox, -38 + oy, 70 + oz, edge, alpha);
            break;
          }
          case 'ms_inlet_capillary': {
            drawDropGuide(-98 + ox, oy, 42, oz, '#EFC4BF');
            addCylinder(-114 + ox, oy, 42 + oz, 5, 38, 'x', '#EFC4BF', edge, alpha);
            addBox(-96 + ox, oy, 33 + oz, 18, 24, 18, '#8E3742', edge, alpha);
            break;
          }
          case 'ms_ion_source': {
            drawDropGuide(-62 + ox, oy, 34, oz, '#8E3742');
            addBox(-62 + ox, oy, 32 + oz, 26, 26, 24, '#8E3742', edge, alpha);
            addBox(-62 + ox, -20 + oy, 34 + oz, 14, 10, 18, '#EFC4BF', edge, alpha);
            addBox(-62 + ox, 20 + oy, 34 + oz, 14, 10, 18, '#EFC4BF', edge, alpha);
            break;
          }
          case 'ms_lenses': {
            drawDropGuide(-26 + ox, oy, 44, oz, '#EFC4BF');
            [-36, -26, -16].forEach((lx) => {
              addCylinder(lx + ox, oy, 44 + oz, 12, 4, 'x', '#EFC4BF', edge, alpha);
            });
            break;
          }
          case 'ms_quadrupole': {
            drawDropGuide(24 + ox, oy, 44, oz, '#A9C2D2');
            [
              { dy: -9, dz: 9 },
              { dy: 9, dz: 9 },
              { dy: -9, dz: -9 },
              { dy: 9, dz: -9 }
            ].forEach((ro) => {
              addCylinder(-4 + ox, oy + ro.dy, 44 + ro.dz + oz, 4.5, 62, 'x', '#D6E4EC', edge, alpha);
            });
            break;
          }
          case 'ms_detector': {
            drawDropGuide(80 + ox, oy, 40, oz, '#7C957D');
            addBox(78 + ox, oy, 32 + oz, 24, 24, 24, '#7C957D', edge, alpha);
            addCylinder(70 + ox, oy, 44 + oz, 10, 14, 'x', '#EFC4BF', edge, alpha);
            break;
          }
          case 'ms_wiring_cooling': {
            drawDropGuide(ox, 48 + oy, 35, oz, '#EFC4BF');
            // Back RF FPGA board + cooling fan + coaxial cables to quadrupole
            addBox(12 + ox, 52 + oy, 16 + oz, 164, 10, 56, '#7C957D', edge, alpha);
            addCylinder(74 + ox, 56 + oy, 44 + oz, 16, 6, 'y', '#1C3947', '#EFC4BF', alpha);
            addLine3D({ x: 20 + ox, y: 46 + oy, z: 48 + oz }, { x: 20 + ox, y: 12 + oy, z: 54 + oz }, '#EFC4BF', 2.4, [], alpha);
            addLine3D({ x: 35 + ox, y: 46 + oy, z: 48 + oz }, { x: 35 + ox, y: 12 + oy, z: 36 + oz }, '#A9C2D2', 2.4, [], alpha);
            break;
          }
          case 'ms_cabinet_panels': {
            drawDropGuide(ox, -56 + oy, 45, oz, '#A9C2D2');
            // Side walls + front frame with transparent glass inspection window
            addBox(-114 + ox, oy, 14 + oz, 12, 122, 68, '#1E3C4C', edge, alpha);
            addBox(114 + ox, oy, 14 + oz, 12, 122, 68, '#1E3C4C', edge, alpha);
            addBox(ox, -58 + oy, 14 + oz, 224, 6, 14, '#1C3947', edge, alpha);
            addBox(ox, -58 + oy, 70 + oz, 224, 6, 12, '#1C3947', edge, alpha);
            addBox(-4 + ox, -58 + oy, 28 + oz, 198, 4, 42, '#A9C2D2', '#FAF7EE', alpha * 0.25);
            break;
          }
          case 'ms_housing_data': {
            drawDropGuide(ox, oy, 82, oz, '#7C957D');
            // Top lid with 4 corner M5 bolts + front-right touchscreen display
            addBox(ox, oy, 82 + oz, 240, 122, 10, '#122630', edge, alpha * 0.88);
            [
              { x: -108, y: -50 },
              { x: 108, y: -50 },
              { x: -108, y: 50 },
              { x: 108, y: 50 }
            ].forEach((b) => addBolt(b.x + ox, b.y + oy, 92 + oz, '#A9C2D2', alpha));
            addScreenModule(96 + ox, -38 + oy, 24 + oz, 32, 14, 46, 'front', '#EFC4BF', '#A9C2D2', alpha, activeReadyForFlow, tClock);
            break;
          }
        }
      } else if (instrumentId === 'uvvis') {
        switch (step.partKey) {
          case 'uv_optical_bench':
            [
              { x: -102, y: -48 },
              { x: 102, y: -48 },
              { x: 0, y: 50 }
            ].forEach((ft) => addCylinder(ft.x + ox, ft.y + oy, -4 + oz, 8, 5, 'z', '#7C957D', edge, alpha));
            addBox(ox, oy, oz, 236, 128, 14, '#122630', edge, alpha);
            break;
          case 'uv_lamps':
            drawDropGuide(-88 + ox, oy, 18, oz, '#EFC4BF');
            addCylinder(-88 + ox, -26 + oy, 18 + oz, 9, 28, 'z', '#A9C2D2', edge, alpha);
            addCylinder(-88 + ox, 18 + oy, 18 + oz, 9, 28, 'z', '#EFC4BF', edge, alpha);
            break;
          case 'uv_slits_mirrors':
            drawDropGuide(-42 + ox, 25 + oy, 16, oz, '#A9C2D2');
            addBox(-52 + ox, 10 + oy, 16 + oz, 6, 28, 32, '#7C957D', edge, alpha);
            addBox(-34 + ox, 32 + oy, 18 + oz, 18, 8, 34, '#D6E4EC', edge, alpha);
            break;
          case 'uv_grating':
            drawDropGuide(0 + ox, -32 + oy, 20, oz, '#8E3742');
            addCylinder(0 + ox, -32 + oy, 14 + oz, 16, 12, 'z', '#8E3742', edge, alpha);
            addBox(0 + ox, -32 + oy, 26 + oz, 22, 6, 28, '#EFC4BF', edge, alpha);
            break;
          case 'uv_beam_splitter':
            drawDropGuide(24 + ox, oy, 20, oz, '#EFC4BF');
            addCylinder(24 + ox, oy, 16 + oz, 15, 24, 'z', '#A9C2D2', edge, alpha);
            break;
          case 'uv_cuvette_holder':
            drawDropGuide(58 + ox, oy, 14, oz, '#7C957D');
            addBox(58 + ox, oy, 14 + oz, 40, 74, 24, '#244150', edge, alpha);
            addBox(58 + ox, -18 + oy, 24 + oz, 12, 12, 26, '#EFC4BF', '#FAF7EE', alpha * 0.85);
            addBox(58 + ox, 18 + oy, 24 + oz, 12, 12, 26, '#A9C2D2', '#FAF7EE', alpha * 0.85);
            break;
          case 'uv_detector':
            drawDropGuide(96 + ox, oy, 18, oz, '#A9C2D2');
            addBox(96 + ox, -18 + oy, 22 + oz, 14, 18, 28, '#8E3742', edge, alpha);
            addBox(96 + ox, 18 + oy, 22 + oz, 14, 18, 28, '#7C957D', edge, alpha);
            break;
          case 'uv_pcb_power':
            drawDropGuide(ox, 54 + oy, 24, oz, '#EFC4BF');
            addBox(-20 + ox, 54 + oy, 14 + oz, 140, 12, 42, '#7C957D', edge, alpha);
            addCylinder(-80 + ox, 58 + oy, 36 + oz, 15, 6, 'y', '#1C3947', '#EFC4BF', alpha);
            addLine3D({ x: 96 + ox, y: 18 + oy, z: 36 + oz }, { x: 30 + ox, y: 48 + oy, z: 36 + oz }, '#A9C2D2', 2, [], alpha);
            break;
          case 'uv_enclosure_walls':
            drawDropGuide(ox, -58 + oy, 36, oz, '#1C3947');
            addBox(-114 + ox, oy, 14 + oz, 8, 128, 56, '#1E3C4C', edge, alpha);
            addBox(114 + ox, oy, 14 + oz, 8, 128, 56, '#1E3C4C', edge, alpha);
            addBox(ox, -60 + oy, 14 + oz, 228, 8, 16, '#1C3947', edge, alpha);
            addBox(ox, -60 + oy, 30 + oz, 220, 4, 38, '#A9C2D2', '#FAF7EE', alpha * 0.24);
            break;
          case 'uv_cover_readout':
            drawDropGuide(ox, oy, 70, oz, '#7C957D');
            addBox(ox, oy, 70 + oz, 236, 128, 10, '#1C3947', edge, alpha * 0.88);
            [
              { x: -104, y: -52 },
              { x: 104, y: -52 },
              { x: -104, y: 52 },
              { x: 104, y: 52 }
            ].forEach((b) => addBolt(b.x + ox, b.y + oy, 80 + oz, '#EFC4BF', alpha));
            addScreenModule(76 + ox, -52 + oy, 22 + oz, 52, 12, 36, 'front', '#A9C2D2', '#EFC4BF', alpha, activeReadyForFlow, tClock);
            break;
        }
      } else if (instrumentId === 'hplc') {
        switch (step.partKey) {
          case 'hplc_tray_degasser':
            addBox(ox, oy, oz, 232, 114, 14, '#1C3947', edge, alpha);
            addCylinder(-92 + ox, -22 + oy, 14 + oz, 14, 46, 'z', '#A9C2D2', edge, alpha);
            addCylinder(-92 + ox, 22 + oy, 14 + oz, 14, 46, 'z', '#EFC4BF', edge, alpha);
            addBox(-54 + ox, oy, 14 + oz, 34, 80, 26, '#7C957D', edge, alpha);
            break;
          case 'hplc_gradient_mixer':
            drawDropGuide(-24 + ox, oy, 42, oz, '#EFC4BF');
            addBox(-24 + ox, oy, 16 + oz, 26, 68, 24, '#2C4957', edge, alpha);
            addCylinder(-24 + ox, oy, 40 + oz, 10, 14, 'z', '#EFC4BF', edge, alpha);
            break;
          case 'hplc_binary_pump':
            drawDropGuide(6 + ox, oy, 14, oz, '#8E3742');
            addBox(6 + ox, oy, 14 + oz, 42, 82, 46, '#8E3742', edge, alpha);
            addCylinder(24 + ox, -18 + oy, 36 + oz, 6, 14, 'x', '#EFC4BF', edge, alpha);
            addCylinder(24 + ox, 18 + oy, 36 + oz, 6, 14, 'x', '#A9C2D2', edge, alpha);
            break;
          case 'hplc_autosampler':
            drawDropGuide(6 + ox, oy, 62, oz, '#EFC4BF');
            addBox(6 + ox, oy, 62 + oz, 46, 84, 34, '#122630', edge, alpha);
            addCylinder(10 + ox, -14 + oy, 74 + oz, 12, 12, 'z', '#EFC4BF', edge, alpha);
            break;
          case 'hplc_oven_preheater':
            drawDropGuide(56 + ox, oy, 14, oz, '#7C957D');
            addBox(56 + ox, oy, 14 + oz, 44, 82, 76, '#223B48', edge, alpha * 0.85);
            break;
          case 'hplc_c18_column':
            drawDropGuide(56 + ox, oy, 24, oz, '#EFC4BF');
            addCylinder(56 + ox, 0 + oy, 24 + oz, 7, 56, 'z', '#EFC4BF', '#8E3742', alpha);
            break;
          case 'hplc_dad_detector':
            drawDropGuide(98 + ox, oy, 14, oz, '#A9C2D2');
            addBox(98 + ox, oy, 14 + oz, 36, 78, 54, '#A9C2D2', edge, alpha);
            addBox(98 + ox, oy, 36 + oz, 18, 26, 18, '#8E3742', edge, alpha);
            break;
          case 'hplc_capillary_plumbing':
            drawDropGuide(30 + ox, oy, 55, oz, '#EFC4BF');
            addLine3D({ x: -92 + ox, y: -22 + oy, z: 60 + oz }, { x: -54 + ox, y: -12 + oy, z: 36 + oz }, '#A9C2D2', 2, [], alpha);
            addLine3D({ x: -54 + ox, y: 0 + oy, z: 34 + oz }, { x: 6 + ox, y: 0 + oy, z: 38 + oz }, '#EFC4BF', 2.4, [], alpha);
            addLine3D({ x: 26 + ox, y: 0 + oy, z: 78 + oz }, { x: 56 + ox, y: 0 + oy, z: 80 + oz }, '#EFC4BF', 2.4, [], alpha);
            addLine3D({ x: 56 + ox, y: 0 + oy, z: 24 + oz }, { x: 98 + ox, y: 0 + oy, z: 40 + oz }, '#7C957D', 2.4, [], alpha);
            break;
          case 'hplc_cabinet_doors':
            drawDropGuide(28 + ox, -48 + oy, 45, oz, '#1C3947');
            addBox(-56 + ox, 52 + oy, 14 + oz, 6, 8, 84, '#1C3947', edge, alpha);
            addBox(114 + ox, oy, 14 + oz, 8, 102, 84, '#1C3947', edge, alpha);
            addBox(28 + ox, 48 + oy, 14 + oz, 172, 6, 84, '#18303D', edge, alpha);
            addBox(28 + ox, -46 + oy, 14 + oz, 172, 4, 84, '#A9C2D2', '#FAF7EE', alpha * 0.22);
            break;
          case 'hplc_stack_enclosure':
            drawDropGuide(28 + ox, oy, 98, oz, '#7C957D');
            addBox(28 + ox, oy, 98 + oz, 176, 102, 10, '#122630', edge, alpha * 0.9);
            addBolt(-48 + ox, -40 + oy, 108 + oz, '#EFC4BF', alpha);
            addBolt(106 + ox, -40 + oy, 108 + oz, '#EFC4BF', alpha);
            addScreenModule(98 + ox, -38 + oy, 68 + oz, 38, 12, 28, 'front', '#7C957D', '#EFC4BF', alpha, activeReadyForFlow, tClock);
            break;
        }
      } else if (instrumentId === 'ftir') {
        switch (step.partKey) {
          case 'ftir_sealed_chassis':
            addBox(ox, oy, oz, 228, 128, 16, '#1C3947', edge, alpha);
            addCylinder(-96 + ox, 44 + oy, 16 + oz, 10, 26, 'z', '#7C957D', edge, alpha);
            break;
          case 'ftir_globar_source':
            drawDropGuide(-82 + ox, -20 + oy, 18, oz, '#8E3742');
            addBox(-84 + ox, -22 + oy, 16 + oz, 26, 30, 32, '#8E3742', edge, alpha);
            addCylinder(-70 + ox, -22 + oy, 32 + oz, 5, 16, 'x', '#EFC4BF', edge, alpha);
            break;
          case 'ftir_hene_laser':
            drawDropGuide(-42 + ox, 32 + oy, 20, oz, '#EFC4BF');
            addCylinder(-68 + ox, 34 + oy, 28 + oz, 6, 48, 'x', '#8E3742', '#EFC4BF', alpha);
            break;
          case 'ftir_beamsplitter':
            drawDropGuide(ox, oy, 24, oz, '#A9C2D2');
            addBox(ox, oy, 18 + oz, 6, 36, 38, '#A9C2D2', '#FAF7EE', alpha * 0.78);
            break;
          case 'ftir_mirrors': {
            const osc = activeReadyForFlow ? Math.sin(tClock * 5) * 8 : 0;
            drawDropGuide(0 + ox, -42 + oy, 20, oz, '#EFC4BF');
            addBox(0 + ox, -44 + oy + osc, 18 + oz, 28, 10, 32, '#EFC4BF', edge, alpha);
            addBox(-40 + ox, oy, 18 + oz, 10, 28, 32, '#EFC4BF', edge, alpha);
            break;
          }
          case 'ftir_atr_module':
            drawDropGuide(48 + ox, oy, 16, oz, '#7C957D');
            addBox(48 + ox, oy, 16 + oz, 38, 44, 24, '#7C957D', edge, alpha);
            addBox(48 + ox, oy, 40 + oz, 12, 12, 8, '#FAF7EE', '#A9C2D2', alpha);
            addCylinder(48 + ox, oy, 48 + oz, 4, 24, 'z', '#A9C2D2', edge, alpha);
            break;
          case 'ftir_detector':
            drawDropGuide(92 + ox, oy, 18, oz, '#8E3742');
            addBox(92 + ox, oy, 16 + oz, 24, 34, 34, '#8E3742', edge, alpha);
            break;
          case 'ftir_dsp_cabling':
            drawDropGuide(-10 + ox, 54 + oy, 24, oz, '#EFC4BF');
            addBox(-10 + ox, 54 + oy, 16 + oz, 148, 10, 42, '#7C957D', edge, alpha);
            addLine3D({ x: 92 + ox, y: 18 + oy, z: 34 + oz }, { x: 54 + ox, y: 48 + oy, z: 34 + oz }, '#EFC4BF', 2.2, [], alpha);
            break;
          case 'ftir_enclosure_shell':
            drawDropGuide(ox, -56 + oy, 36, oz, '#1C3947');
            addBox(-110 + ox, oy, 16 + oz, 8, 128, 48, '#1E3C4C', edge, alpha);
            addBox(110 + ox, oy, 16 + oz, 8, 128, 48, '#1E3C4C', edge, alpha);
            addBox(ox, -58 + oy, 16 + oz, 220, 6, 48, '#A9C2D2', '#FAF7EE', alpha * 0.24);
            break;
          case 'ftir_cover_fft':
            drawDropGuide(ox, oy, 64, oz, '#7C957D');
            addBox(-24 + ox, oy, 64 + oz, 172, 128, 10, '#122630', edge, alpha * 0.88);
            addBox(86 + ox, oy, 64 + oz, 48, 128, 10, '#1C3947', edge, alpha * 0.65);
            [
              { x: -102, y: -52 },
              { x: 102, y: -52 },
              { x: -102, y: 52 },
              { x: 102, y: 52 }
            ].forEach((b) => addBolt(b.x + ox, b.y + oy, 74 + oz, '#EFC4BF', alpha));
            addScreenModule(82 + ox, -46 + oy, 20 + oz, 44, 12, 34, 'front', '#EFC4BF', '#A9C2D2', alpha, activeReadyForFlow, tClock);
            break;
        }
      } else if (instrumentId === 'nmr') {
        switch (step.partKey) {
          case 'nmr_anti_vibration':
            [
              { x: -46, y: -30 },
              { x: 46, y: -30 },
              { x: 0, y: 42 }
            ].forEach((leg) => {
              addCylinder(leg.x + ox, leg.y + oy, oz, 9, 32, 'z', '#7C957D', edge, alpha);
            });
            addCylinder(ox, oy, 28 + oz, 56, 8, 'z', '#1C3947', edge, alpha);
            break;
          case 'nmr_supercond_coil':
            drawDropGuide(ox, oy, 40, oz, '#EFC4BF');
            [40, 56, 72].forEach((zLayer) => {
              addCylinder(ox, oy, zLayer + oz, 34, 12, 'z', '#EFC4BF', '#8E3742', alpha);
            });
            break;
          case 'nmr_cryostat_dewar':
            drawDropGuide(ox, oy, 36, oz, '#A9C2D2');
            addCylinder(ox, oy, 36 + oz, 50, 74, 'z', '#A9C2D2', edge, alpha * 0.55);
            break;
          case 'nmr_shim_tube':
            drawDropGuide(ox, oy, 40, oz, '#7C957D');
            addCylinder(ox, oy, 34 + oz, 15, 82, 'z', '#7C957D', edge, alpha);
            break;
          case 'nmr_rf_probe':
            drawDropGuide(ox, oy, 20, oz, '#8E3742');
            addCylinder(ox, oy, 2 + oz, 9, 64, 'z', '#8E3742', '#EFC4BF', alpha);
            break;
          case 'nmr_spinner_tube': {
            const spinRot = activeReadyForFlow ? Math.sin(tClock * 12) * 2 : 0;
            drawDropGuide(ox, oy, 114, oz, '#EFC4BF');
            addCylinder(ox, oy, 62 + oz, 3.5, 62, 'z', '#FAF7EE', '#A9C2D2', alpha);
            addCylinder(ox + spinRot * 0.3, oy, 112 + oz, 8, 8, 'z', '#EFC4BF', edge, alpha);
            break;
          }
          case 'nmr_console':
            drawDropGuide(92 + ox, oy, 0, oz, '#A9C2D2');
            addBox(92 + ox, oy, oz, 44, 64, 86, '#122630', '#A9C2D2', alpha);
            addLine3D({ x: ox, y: oy, z: 16 + oz }, { x: 70 + ox, y: oy, z: 16 + oz }, '#EFC4BF', 2.4);
            break;
          case 'nmr_cryo_turrets':
            drawDropGuide(ox, oy, 110, oz, '#A9C2D2');
            addCylinder(-24 + ox, 16 + oy, 110 + oz, 7, 26, 'z', '#A9C2D2', edge, alpha);
            addCylinder(24 + ox, -16 + oy, 110 + oz, 7, 26, 'z', '#EFC4BF', edge, alpha);
            break;
          case 'nmr_outer_jacket':
            drawDropGuide(ox, oy, 36, oz, '#1C3947');
            addCylinder(ox, oy, 34 + oz, 58, 78, 'z', '#1C3947', '#A9C2D2', alpha * 0.32);
            addCylinder(ox, oy, 110 + oz, 12, 22, 'z', '#7C957D', edge, alpha);
            break;
          case 'nmr_shield_fft':
            addBolt(-40 + ox, -20 + oy, 112 + oz, '#EFC4BF', alpha);
            addBolt(40 + ox, 20 + oy, 112 + oz, '#EFC4BF', alpha);
            addScreenModule(92 + ox, -24 + oy, 46 + oz, 36, 14, 34, 'front', '#A9C2D2', '#EFC4BF', alpha, activeReadyForFlow, tClock);
            break;
        }
      } else if (instrumentId === 'gc') {
        switch (step.partKey) {
          case 'gc_chassis':
            addBox(ox, oy, oz, 232, 122, 16, '#1C3947', edge, alpha);
            addBox(-65 + ox, oy, 16 + oz, 86, 112, 82, '#122630', edge, alpha * 0.55);
            break;
          case 'gc_gas_epc':
            drawDropGuide(-85 + ox, oy, 18, oz, '#A9C2D2');
            addCylinder(-96 + ox, -25 + oy, 18 + oz, 9, 46, 'z', '#A9C2D2', edge, alpha);
            addCylinder(-96 + ox, 12 + oy, 18 + oz, 9, 46, 'z', '#EFC4BF', edge, alpha);
            addBox(-64 + ox, oy, 26 + oz, 28, 62, 34, '#7C957D', edge, alpha);
            break;
          case 'gc_oven_fan':
            drawDropGuide(18 + ox, oy, 16, oz, '#8E3742');
            addBox(20 + ox, oy, 16 + oz, 96, 106, 84, '#243F4E', edge, alpha * 0.85);
            addCylinder(20 + ox, 36 + oy, 58 + oz, 22, 10, 'y', '#8E3742', '#EFC4BF', alpha);
            break;
          case 'gc_inlet_port':
            drawDropGuide(-12 + ox, oy, 100, oz, '#EFC4BF');
            addCylinder(-12 + ox, -10 + oy, 86 + oz, 9, 28, 'z', '#EFC4BF', '#8E3742', alpha);
            break;
          case 'gc_capillary_col':
            drawDropGuide(20 + ox, oy, 58, oz, '#EFC4BF');
            addCylinder(20 + ox, 8 + oy, 58 + oz, 26, 14, 'y', '#EFC4BF', '#8E3742', alpha);
            break;
          case 'gc_fid_detector':
            drawDropGuide(46 + ox, oy, 100, oz, '#8E3742');
            addCylinder(46 + ox, -10 + oy, 98 + oz, 11, 32, 'z', '#A9C2D2', edge, alpha);
            break;
          case 'gc_autosampler':
            drawDropGuide(-12 + ox, -10 + oy, 114, oz, '#A9C2D2');
            addBox(-12 + ox, -10 + oy, 114 + oz, 24, 24, 54, '#122630', '#A9C2D2', alpha);
            addCylinder(-12 + ox, -10 + oy, 102 + oz, 2.5, 20, 'z', '#EFC4BF', '#FAF7EE', alpha);
            break;
          case 'gc_gas_lines_panels':
            drawDropGuide(-40 + ox, 54 + oy, 48, oz, '#1C3947');
            addBox(-114 + ox, oy, 16 + oz, 8, 120, 82, '#1E3C4C', edge, alpha);
            addBox(112 + ox, oy, 16 + oz, 8, 120, 82, '#1E3C4C', edge, alpha);
            addLine3D({ x: -64 + ox, y: 0 + oy, z: 54 + oz }, { x: 46 + ox, y: -10 + oy, z: 108 + oz }, '#EFC4BF', 2.2, [], alpha);
            break;
          case 'gc_top_bezel':
            drawDropGuide(ox, oy, 100, oz, '#A9C2D2');
            addBox(-65 + ox, oy, 98 + oz, 92, 116, 10, '#1C3947', edge, alpha);
            addBox(78 + ox, oy, 98 + oz, 72, 116, 10, '#1C3947', edge, alpha);
            addBolt(-104 + ox, -46 + oy, 108 + oz, '#EFC4BF', alpha);
            addBolt(104 + ox, -46 + oy, 108 + oz, '#EFC4BF', alpha);
            break;
          case 'gc_door_chromatogram':
            addBox(20 + ox, -52 + oy, 16 + oz, 96, 6, 84, '#A9C2D2', '#FAF7EE', alpha * 0.25);
            addScreenModule(96 + ox, -20 + oy, 32 + oz, 34, 48, 52, 'front', '#7C957D', '#EFC4BF', alpha, activeReadyForFlow, tClock);
            break;
        }
      }
    });

    // =========================================================================
    // LIVE OPERATIONAL FLOW / BEAMS WHEN FINAL ASSEMBLY COMPLETE (STEP 10)
    // =========================================================================
    if (activeReadyForFlow && !explodedView) {
      const pulse = (tClock * 1.4) % 1;
      if (instrumentId === 'ms') {
        const ionX = -62 + pulse * 140;
        addLine3D({ x: -62, y: 0, z: 44 }, { x: 78, y: 0, z: 44 }, '#EFC4BF', 2, [5, 3], 0.85);
        addDot3D({ x: ionX, y: Math.sin(pulse * 18) * 3, z: 44 }, 4.5, '#EFC4BF', 1);
      } else if (instrumentId === 'uvvis') {
        addLine3D({ x: -86, y: -15, z: 36 }, { x: 0, y: -32, z: 36 }, '#EFC4BF', 2, [], 0.85);
        addLine3D({ x: 0, y: -32, z: 36 }, { x: 96, y: -18, z: 36 }, '#7C957D', 2, [], 0.85);
        addLine3D({ x: 0, y: -32, z: 36 }, { x: 96, y: 18, z: 36 }, '#A9C2D2', 2, [], 0.85);
        addDot3D({ x: -86 + pulse * 182, y: -18, z: 36 }, 4, '#EFC4BF', 1);
      } else if (instrumentId === 'hplc') {
        addLine3D({ x: -54, y: 0, z: 32 }, { x: 6, y: 0, z: 32 }, '#A9C2D2', 2.2, [], 0.9);
        addLine3D({ x: 6, y: 0, z: 70 }, { x: 56, y: 0, z: 70 }, '#EFC4BF', 2.2, [], 0.9);
        addDot3D({ x: 56, y: 0, z: 76 - pulse * 52 }, 4.2, '#8E3742', 1);
        addDot3D({ x: 56, y: 0, z: 76 - ((pulse + 0.35) % 1) * 52 }, 4, '#7C957D', 1);
      } else if (instrumentId === 'ftir') {
        addLine3D({ x: -70, y: -18, z: 32 }, { x: 0, y: 0, z: 32 }, '#8E3742', 2.4, [], 0.9);
        addLine3D({ x: 0, y: 0, z: 32 }, { x: 0, y: -44, z: 32 }, '#EFC4BF', 2, [], 0.85);
        addLine3D({ x: 0, y: 0, z: 32 }, { x: 92, y: 0, z: 32 }, '#EFC4BF', 2.4, [], 0.9);
        addLine3D({ x: -42, y: 34, z: 28 }, { x: 0, y: 0, z: 28 }, '#ff5a5f', 1.5, [], 0.9);
        addDot3D({ x: -70 + pulse * 162, y: 0, z: 32 }, 4, '#8E3742', 1);
      } else if (instrumentId === 'nmr') {
        const ang = tClock * 4.5;
        addDot3D({ x: Math.cos(ang) * 14, y: Math.sin(ang) * 14, z: 74 }, 4.2, '#EFC4BF', 1);
        addLine3D({ x: 0, y: 0, z: 62 }, { x: Math.cos(ang) * 14, y: Math.sin(ang) * 14, z: 74 }, '#EFC4BF', 2.5, [], 0.95);
      } else if (instrumentId === 'gc') {
        const ang = tClock * 5;
        addDot3D({ x: 20 + Math.cos(ang) * 24, y: 8, z: 58 + Math.sin(ang) * 24 }, 4, '#EFC4BF', 1);
        addDot3D({ x: 46, y: -10, z: 134 + Math.sin(tClock * 15) * 3 }, 5, '#A9C2D2', 0.95);
      }
    }

    // Painter's Sort back-to-front
    faces.sort((a, b) => b.depth - a.depth);

    faces.forEach((f) => {
      ctx.save();
      ctx.globalAlpha = f.alpha;
      if (f.isLine && f.points.length >= 2) {
        ctx.strokeStyle = f.stroke;
        ctx.lineWidth = f.lineWidth;
        if (f.dash && f.dash.length) ctx.setLineDash(f.dash);
        ctx.beginPath();
        ctx.moveTo(f.points[0].sx, f.points[0].sy);
        ctx.lineTo(f.points[1].sx, f.points[1].sy);
        ctx.stroke();
      } else if (f.isDot && f.points.length >= 1) {
        ctx.fillStyle = f.fill;
        ctx.strokeStyle = f.stroke;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(f.points[0].sx, f.points[0].sy, f.dotRadius || 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (f.points.length >= 3) {
        ctx.fillStyle = f.fill;
        ctx.strokeStyle = f.stroke;
        ctx.lineWidth = f.lineWidth;
        ctx.beginPath();
        ctx.moveTo(f.points[0].sx, f.points[0].sy);
        for (let i = 1; i < f.points.length; i++) {
          ctx.lineTo(f.points[i].sx, f.points[i].sy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    });

    // Subtle HUD Axis Indicator on Bottom-Left
    ctx.fillStyle = '#A9C2D2';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(
      `3D CAD ENSAMBLE · PASO ${currentStepIndex + 1}/${steps.length} · ARRASTRA PARA ROTAR`,
      16,
      H - 14
    );
  };

  return (
    <canvas
      ref={canvasRef}
      width={860}
      height={470}
      onPointerDown={(e) => {
        dragStateRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragStateRef.current.dragging) return;
        const dx = e.clientX - dragStateRef.current.lastX;
        const dy = e.clientY - dragStateRef.current.lastY;
        dragStateRef.current.lastX = e.clientX;
        dragStateRef.current.lastY = e.clientY;
        onDragRotate(-dx * 0.008, dy * 0.006);
      }}
      onPointerUp={(e) => {
        dragStateRef.current.dragging = false;
        try {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
          // ignore if pointer already released
        }
      }}
      className="w-full h-[360px] sm:h-[440px] lg:h-[470px] rounded-xl border border-[#1C3947] cursor-grab active:cursor-grabbing touch-none select-none"
    />
  );
};
