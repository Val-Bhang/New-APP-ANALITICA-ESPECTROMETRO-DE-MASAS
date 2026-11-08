import { CompoundSample } from './spectrometryData';

export interface FunctionalGroupCategory {
  id: string;
  name: string;
  iconName: string;
  generalFormula: string;
  spectralSignature: string;
  compounds: CompoundSample[];
}

export const FUNCTIONAL_GROUPS_DATA: FunctionalGroupCategory[] = [
  // 1. ALCANOS Y CICLOALCANOS (20 ejemplos)
  {
    id: 'alkanes',
    name: 'Alcanos y Cicloalcanos',
    iconName: 'Flame',
    generalFormula: 'C_n H_{2n+2} / C_n H_{2n}',
    spectralSignature: 'Patrón en cascada espaciado por 14 Da (–CH₂–): picos intensos en m/z 43 [C₃H₇]⁺, 57 [C₄H₉]⁺, 71 [C₅H₁₁]⁺; ion molecular débil en cadenas largas.',
    compounds: [
      {
        id: 'methane',
        name: 'Metano',
        formula: 'CH₄',
        molarMass: 16,
        description: 'El alcano más simple; ion molecular base con pérdida secuencial de hidrógenos.',
        basePeakMz: 16,
        molecularIonMz: 16,
        peaks: [
          { mz: 12, relativeAbundance: 4, fragmentFormula: '[C]⁺•', description: 'Átomo de carbono completamente deshidrogenado.' },
          { mz: 13, relativeAbundance: 8, fragmentFormula: '[CH]⁺', description: 'Fragmento metino.' },
          { mz: 14, relativeAbundance: 16, fragmentFormula: '[CH₂]⁺•', description: 'Fragmento metileno.' },
          { mz: 15, relativeAbundance: 85, fragmentFormula: '[CH₃]⁺', description: 'Pérdida de un átomo de hidrógeno [M - H]⁺.' },
          { mz: 16, relativeAbundance: 100, fragmentFormula: '[CH₄]⁺•', description: 'Ion molecular y pico base a 70 eV.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'ethane',
        name: 'Etano',
        formula: 'C₂H₆',
        molarMass: 30,
        description: 'Alcano de dos carbonos; el pico base corresponde a la pérdida de hidrógeno formando el ion etilo [C2H5]+.',
        basePeakMz: 28,
        molecularIonMz: 30,
        peaks: [
          { mz: 15, relativeAbundance: 15, fragmentFormula: '[CH₃]⁺', description: 'Ruptura heterolítica simétrica C-C.' },
          { mz: 26, relativeAbundance: 22, fragmentFormula: '[C₂H₂]⁺•', description: 'Ion acetileno por deshidrogenación múltiple.' },
          { mz: 27, relativeAbundance: 33, fragmentFormula: '[C₂H₃]⁺', description: 'Ion vinilo.' },
          { mz: 28, relativeAbundance: 100, fragmentFormula: '[C₂H₄]⁺•', description: 'Pico base: eliminación de H₂ formando catión etileno.', isBasePeak: true },
          { mz: 29, relativeAbundance: 45, fragmentFormula: '[C₂H₅]⁺', description: 'Pérdida de un radical hidrógeno [M - H]⁺.' },
          { mz: 30, relativeAbundance: 25, fragmentFormula: '[C₂H₆]⁺•', description: 'Ion molecular intacto.', isMolecularIon: true }
        ]
      },
      {
        id: 'propane',
        name: 'Propano',
        formula: 'C₃H₈',
        molarMass: 44,
        description: 'Alcano de tres carbonos; pico base en m/z 29 por pérdida de metilo.',
        basePeakMz: 29,
        molecularIonMz: 44,
        peaks: [
          { mz: 15, relativeAbundance: 12, fragmentFormula: '[CH₃]⁺', description: 'Catión metilo.' },
          { mz: 27, relativeAbundance: 42, fragmentFormula: '[C₂H₃]⁺', description: 'Ion alilo/vinilo.' },
          { mz: 29, relativeAbundance: 100, fragmentFormula: '[C₂H₅]⁺', description: 'Pico base: catión etilo por pérdida de CH₃•.', isBasePeak: true },
          { mz: 43, relativeAbundance: 22, fragmentFormula: '[C₃H₇]⁺', description: 'Catión isopropilo [M - H]⁺.' },
          { mz: 44, relativeAbundance: 28, fragmentFormula: '[C₃H₈]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'n_butane',
        name: 'n-Butano',
        formula: 'C₄H₁₀',
        molarMass: 58,
        description: 'Cadena lineal de cuatro carbonos; predominio del catión etilo y propilo.',
        basePeakMz: 43,
        molecularIonMz: 58,
        peaks: [
          { mz: 15, relativeAbundance: 8, fragmentFormula: '[CH₃]⁺', description: 'Catión metilo.' },
          { mz: 27, relativeAbundance: 38, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 29, relativeAbundance: 44, fragmentFormula: '[C₂H₅]⁺', description: 'Catión etilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: catión propilo secundario estable.', isBasePeak: true },
          { mz: 58, relativeAbundance: 14, fragmentFormula: '[C₄H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isobutane',
        name: 'Isobutano (2-Metilpropano)',
        formula: 'C₄H₁₀',
        molarMass: 58,
        description: 'Alcano ramificado; genera con extrema facilidad el carbocatión terciario t-butilo.',
        basePeakMz: 43,
        molecularIonMz: 58,
        peaks: [
          { mz: 15, relativeAbundance: 6, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 27, relativeAbundance: 20, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: catión isopropilo por pérdida de CH₃•.', isBasePeak: true },
          { mz: 57, relativeAbundance: 4, fragmentFormula: '[C₄H₉]⁺', description: 'Pérdida de H• terciario.', isMolecularIon: false },
          { mz: 58, relativeAbundance: 2.5, fragmentFormula: '[C₄H₁₀]⁺•', description: 'Ion molecular muy tenue debido a rápida ramificación.', isMolecularIon: true }
        ]
      },
      {
        id: 'n_pentane',
        name: 'n-Pentano',
        formula: 'C₅H₁₂',
        molarMass: 72,
        description: 'Alcano lineal de 5 carbonos con cascada clásica de fragmentación de alcanos.',
        basePeakMz: 43,
        molecularIonMz: 72,
        peaks: [
          { mz: 27, relativeAbundance: 24, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmentación alifática.' },
          { mz: 29, relativeAbundance: 58, fragmentFormula: '[C₂H₅]⁺', description: 'Catión etilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: catión propilo por ruptura central C-C.', isBasePeak: true },
          { mz: 57, relativeAbundance: 21, fragmentFormula: '[C₄H₉]⁺', description: 'Catión butilo por pérdida de metilo.' },
          { mz: 72, relativeAbundance: 8, fragmentFormula: '[C₅H₁₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isopentane',
        name: 'Isopentano (2-Metilbutano)',
        formula: 'C₅H₁₂',
        molarMass: 72,
        description: 'Alcano ramificado; ruptura preferencial en el carbono terciario generando catión sec-butilo m/z 57 o propilo m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 72,
        peaks: [
          { mz: 29, relativeAbundance: 42, fragmentFormula: '[C₂H₅]⁺', description: 'Catión etilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: catión isopropilo.', isBasePeak: true },
          { mz: 57, relativeAbundance: 68, fragmentFormula: '[C₄H₉]⁺', description: 'Catión sec-butilo por pérdida de metilo terminal.' },
          { mz: 72, relativeAbundance: 3, fragmentFormula: '[C₅H₁₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'neopentane',
        name: 'Neopentano (2,2-Dimetilpropano)',
        formula: 'C₅H₁₂',
        molarMass: 72,
        description: 'Carbono cuaternario central; ion molecular prácticamente ausente a 70 eV, pico base inmediato en m/z 57.',
        basePeakMz: 57,
        molecularIonMz: 72,
        peaks: [
          { mz: 29, relativeAbundance: 22, fragmentFormula: '[C₂H₅]⁺', description: 'Reordenamiento de etilo.' },
          { mz: 41, relativeAbundance: 45, fragmentFormula: '[C₃H₅]⁺', description: 'Ion alilo por deshidrogenación.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C(CH₃)₃]⁺', description: 'Pico base total: carbocatión t-butilo hiperconjugado.', isBasePeak: true },
          { mz: 72, relativeAbundance: 0.1, fragmentFormula: '[C₅H₁₂]⁺•', description: 'Ion molecular casi indetectable por extrema facilidad de ruptura.', isMolecularIon: true }
        ]
      },
      {
        id: 'n_hexane',
        name: 'n-Hexano',
        formula: 'C₆H₁₄',
        molarMass: 86,
        description: 'Solvente clásico con el patrón típico de hidrocarburo alifático lineal con saltos de 14 unidades.',
        basePeakMz: 57,
        molecularIonMz: 86,
        peaks: [
          { mz: 29, relativeAbundance: 46, fragmentFormula: '[C₂H₅]⁺', description: 'Catión etilo.' },
          { mz: 41, relativeAbundance: 58, fragmentFormula: '[C₃H₅]⁺', description: 'Catión alilo.' },
          { mz: 43, relativeAbundance: 78, fragmentFormula: '[C₃H₇]⁺', description: 'Catión propilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₄H₉]⁺', description: 'Pico base: catión butilo por pérdida de etilo.', isBasePeak: true },
          { mz: 71, relativeAbundance: 12, fragmentFormula: '[C₅H₁₁]⁺', description: 'Pérdida de metilo.' },
          { mz: 86, relativeAbundance: 6, fragmentFormula: '[C₆H₁₄]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_methylpentane',
        name: '2-Metilpentano',
        formula: 'C₆H₁₄',
        molarMass: 86,
        description: 'Isómero ramificado de hexano; pico base en m/z 43 por pérdida del grupo propilo.',
        basePeakMz: 43,
        molecularIonMz: 86,
        peaks: [
          { mz: 29, relativeAbundance: 28, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 42, relativeAbundance: 35, fragmentFormula: '[C₃H₆]⁺•', description: 'Fragmento de propileno.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: catión isopropilo ramificado.', isBasePeak: true },
          { mz: 71, relativeAbundance: 48, fragmentFormula: '[C₅H₁₁]⁺', description: 'Catión por pérdida de metilo C2.' },
          { mz: 86, relativeAbundance: 4, fragmentFormula: '[C₆H₁₄]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'three_methylpentane',
        name: '3-Metilpentano',
        formula: 'C₆H₁₄',
        molarMass: 86,
        description: 'Ramificación simétrica en C3 que favorece la pérdida de un radical etilo m/z 57.',
        basePeakMz: 57,
        molecularIonMz: 86,
        peaks: [
          { mz: 29, relativeAbundance: 34, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 41, relativeAbundance: 42, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 22, fragmentFormula: '[C₃H₇]⁺', description: 'Propilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₄H₉]⁺', description: 'Pico base: catión sec-butilo tras perder etilo.', isBasePeak: true },
          { mz: 86, relativeAbundance: 5, fragmentFormula: '[C₆H₁₄]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_three_dimethylbutane',
        name: '2,3-Dimetilbutano',
        formula: 'C₆H₁₄',
        molarMass: 86,
        description: 'Doble ramificación terciaria; escisión del enlace C2-C3 generando dos cationes isopropilo m/z 43 idénticos.',
        basePeakMz: 43,
        molecularIonMz: 86,
        peaks: [
          { mz: 27, relativeAbundance: 18, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento menor.' },
          { mz: 41, relativeAbundance: 52, fragmentFormula: '[C₃H₅]⁺', description: 'Catión alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[(CH₃)₂CH]⁺', description: 'Pico base cuantitativo: ruptura simétrica del enlace central.', isBasePeak: true },
          { mz: 71, relativeAbundance: 6, fragmentFormula: '[C₅H₁₁]⁺', description: 'Pérdida de metilo.' },
          { mz: 86, relativeAbundance: 2, fragmentFormula: '[C₆H₁₄]⁺•', description: 'Ion molecular tenue.', isMolecularIon: true }
        ]
      },
      {
        id: 'n_heptane',
        name: 'n-Heptano',
        formula: 'C₇H₁₆',
        molarMass: 100,
        description: 'Estándar para índice de octanaje; serie homóloga alifática con base en m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 100,
        peaks: [
          { mz: 29, relativeAbundance: 42, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: catión propilo.', isBasePeak: true },
          { mz: 57, relativeAbundance: 78, fragmentFormula: '[C₄H₉]⁺', description: 'Catión butilo.' },
          { mz: 71, relativeAbundance: 32, fragmentFormula: '[C₅H₁₁]⁺', description: 'Catión pentilo.' },
          { mz: 100, relativeAbundance: 6, fragmentFormula: '[C₇H₁₆]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'n_octane',
        name: 'n-Octano',
        formula: 'C₈H₁₈',
        molarMass: 114,
        description: 'Cadena lineal de 8 carbonos con fragmentos principales en 43, 57 y 71 Da.',
        basePeakMz: 43,
        molecularIonMz: 114,
        peaks: [
          { mz: 29, relativeAbundance: 36, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base.', isBasePeak: true },
          { mz: 57, relativeAbundance: 82, fragmentFormula: '[C₄H₉]⁺', description: 'Catión butilo.' },
          { mz: 71, relativeAbundance: 38, fragmentFormula: '[C₅H₁₁]⁺', description: 'Catión pentilo.' },
          { mz: 85, relativeAbundance: 12, fragmentFormula: '[C₆H₁₃]⁺', description: 'Catión hexilo.' },
          { mz: 114, relativeAbundance: 4, fragmentFormula: '[C₈H₁₈]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isooctane',
        name: 'Isooctano (2,2,4-Trimetilpentano)',
        formula: 'C₈H₁₈',
        molarMass: 114,
        description: 'Referencia de 100 octanos; la escisión entre el carbono cuaternario y terciario genera el pico base m/z 57.',
        basePeakMz: 57,
        molecularIonMz: 114,
        peaks: [
          { mz: 29, relativeAbundance: 18, fragmentFormula: '[C₂H₅]⁺', description: 'Fragmento etilo.' },
          { mz: 41, relativeAbundance: 46, fragmentFormula: '[C₃H₅]⁺', description: 'Catión alilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C(CH₃)₃]⁺', description: 'Pico base: carbocatión t-butilo de altísima estabilidad.', isBasePeak: true },
          { mz: 99, relativeAbundance: 4, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 114, relativeAbundance: 0.2, fragmentFormula: '[C₈H₁₈]⁺•', description: 'Ion molecular casi indetectable.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclopropane',
        name: 'Ciclopropano',
        formula: 'C₃H₆',
        molarMass: 42,
        description: 'Anillo de tres miembros con alta tensión angular; ion molecular fuerte y apertura rápida.',
        basePeakMz: 42,
        molecularIonMz: 42,
        peaks: [
          { mz: 26, relativeAbundance: 15, fragmentFormula: '[C₂H₂]⁺•', description: 'Eliminación de metileno.' },
          { mz: 27, relativeAbundance: 38, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmentación secundaria.' },
          { mz: 39, relativeAbundance: 44, fragmentFormula: '[C₃H₃]⁺', description: 'Catión ciclopropenilo por pérdida de H• y H₂.' },
          { mz: 41, relativeAbundance: 78, fragmentFormula: '[C₃H₅]⁺', description: 'Catión alilo tras apertura del anillo [M - H]⁺.' },
          { mz: 42, relativeAbundance: 100, fragmentFormula: '[C₃H₆]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'cyclobutane',
        name: 'Ciclobutano',
        formula: 'C₄H₈',
        molarMass: 56,
        description: 'Cicloalcano que experimenta retro-[2+2] unimolecular formando dos moléculas de etileno.',
        basePeakMz: 28,
        molecularIonMz: 56,
        peaks: [
          { mz: 27, relativeAbundance: 42, fragmentFormula: '[C₂H₃]⁺', description: 'Ion vinilo.' },
          { mz: 28, relativeAbundance: 100, fragmentFormula: '[C₂H₄]⁺•', description: 'Pico base: fragmentación simétrica en dos fragmentos de etileno.', isBasePeak: true },
          { mz: 41, relativeAbundance: 68, fragmentFormula: '[C₃H₅]⁺', description: 'Pérdida de radical metilo.' },
          { mz: 55, relativeAbundance: 32, fragmentFormula: '[C₄H₇]⁺', description: 'Pérdida de un hidrógeno [M - H]⁺.' },
          { mz: 56, relativeAbundance: 28, fragmentFormula: '[C₄H₈]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclopentane',
        name: 'Ciclopentano',
        formula: 'C₅H₁₀',
        molarMass: 70,
        description: 'Cicloalcano con ion molecular prominente y pico base en m/z 42 por pérdida de etileno.',
        basePeakMz: 42,
        molecularIonMz: 70,
        peaks: [
          { mz: 27, relativeAbundance: 26, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 41, relativeAbundance: 62, fragmentFormula: '[C₃H₅]⁺', description: 'Catión alilo.' },
          { mz: 42, relativeAbundance: 100, fragmentFormula: '[C₃H₆]⁺•', description: 'Pico base: pérdida neutra concertada de etileno C₂H₄.', isBasePeak: true },
          { mz: 55, relativeAbundance: 38, fragmentFormula: '[C₄H₇]⁺', description: 'Pérdida de metilo.' },
          { mz: 70, relativeAbundance: 34, fragmentFormula: '[C₅H₁₀]⁺•', description: 'Ion molecular estable.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclohexane',
        name: 'Ciclohexano',
        formula: 'C₆H₁₂',
        molarMass: 84,
        description: 'Cicloalcano libre de tensión angular; pico base m/z 56 por retro-cicloadición con pérdida de etileno.',
        basePeakMz: 56,
        molecularIonMz: 84,
        peaks: [
          { mz: 41, relativeAbundance: 55, fragmentFormula: '[C₃H₅]⁺', description: 'Catión alilo.' },
          { mz: 56, relativeAbundance: 100, fragmentFormula: '[C₄H₈]⁺•', description: 'Pico base: pérdida concertada de etileno (C₂H₄).', isBasePeak: true },
          { mz: 69, relativeAbundance: 32, fragmentFormula: '[C₅H₉]⁺', description: 'Pérdida de metilo.' },
          { mz: 84, relativeAbundance: 72, fragmentFormula: '[C₆H₁₂]⁺•', description: 'Ion molecular de gran intensidad por estructura cíclica.', isMolecularIon: true }
        ]
      },
      {
        id: 'methylcyclohexane',
        name: 'Metilciclohexano',
        formula: 'C₇H₁₄',
        molarMass: 98,
        description: 'Cicloalcano sustituido; la pérdida del grupo metilo en el carbono terciario genera el catión ciclohexilo m/z 83.',
        basePeakMz: 83,
        molecularIonMz: 98,
        peaks: [
          { mz: 41, relativeAbundance: 38, fragmentFormula: '[C₃H₅]⁺', description: 'Fragmento alifático.' },
          { mz: 55, relativeAbundance: 65, fragmentFormula: '[C₄H₇]⁺', description: 'Ruptura del anillo.' },
          { mz: 69, relativeAbundance: 42, fragmentFormula: '[C₅H₉]⁺', description: 'Fragmento alicíclico.' },
          { mz: 83, relativeAbundance: 100, fragmentFormula: '[C₆H₁₁]⁺', description: 'Pico base: carbocatión ciclohexilo por pérdida de CH₃•.', isBasePeak: true },
          { mz: 98, relativeAbundance: 48, fragmentFormula: '[C₇H₁₄]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      }
    ]
  },

  // 2. ALQUENOS Y ALQUINOS (20 ejemplos)
  {
    id: 'alkenes_alkynes',
    name: 'Alquenos y Alquinos',
    iconName: 'Zap',
    generalFormula: 'C_n H_{2n} / C_n H_{2n-2}',
    spectralSignature: 'Ion molecular moderado a fuerte por electrones pi; ruptura alílica predominante generando cationes estabilizados por resonancia (m/z 41 [C₃H₅]⁺, m/z 55, m/z 67). Reordenamiento de McLafferty en alquenos de cadena larga.',
    compounds: [
      {
        id: 'ethylene',
        name: 'Eteno (Etileno)',
        formula: 'C₂H₄',
        molarMass: 28,
        description: 'El alqueno más simple; ion molecular extremadamente resistente que constituye el pico base.',
        basePeakMz: 28,
        molecularIonMz: 28,
        peaks: [
          { mz: 25, relativeAbundance: 10, fragmentFormula: '[C₂H]⁺', description: 'Deshidrogenación triple.' },
          { mz: 26, relativeAbundance: 62, fragmentFormula: '[C₂H₂]⁺•', description: 'Pérdida de H₂ formando ion acetileno.' },
          { mz: 27, relativeAbundance: 65, fragmentFormula: '[C₂H₃]⁺', description: 'Pérdida de un átomo de hidrógeno [M - H]⁺.' },
          { mz: 28, relativeAbundance: 100, fragmentFormula: '[C₂H₄]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'propene',
        name: 'Propeno (Propileno)',
        formula: 'C₃H₆',
        molarMass: 42,
        description: 'Alqueno de tres carbonos con formación inmediata del catión alilo m/z 41.',
        basePeakMz: 41,
        molecularIonMz: 42,
        peaks: [
          { mz: 26, relativeAbundance: 18, fragmentFormula: '[C₂H₂]⁺•', description: 'Pérdida de CH₄.' },
          { mz: 27, relativeAbundance: 35, fragmentFormula: '[C₂H₃]⁺', description: 'Ion vinilo.' },
          { mz: 39, relativeAbundance: 58, fragmentFormula: '[C₃H₃]⁺', description: 'Catión ciclopropenilo.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-CH₂]⁺', description: 'Pico base: catión alilo resonante [M - H]⁺.', isBasePeak: true },
          { mz: 42, relativeAbundance: 70, fragmentFormula: '[C₃H₆]⁺•', description: 'Ion molecular intacto.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_butene',
        name: '1-Buteno',
        formula: 'C₄H₈',
        molarMass: 56,
        description: 'Alqueno terminal; la ruptura alílica del enlace C3-C4 produce el catión alilo m/z 41.',
        basePeakMz: 41,
        molecularIonMz: 56,
        peaks: [
          { mz: 27, relativeAbundance: 44, fragmentFormula: '[C₂H₃]⁺', description: 'Ion vinilo.' },
          { mz: 39, relativeAbundance: 32, fragmentFormula: '[C₃H₃]⁺', description: 'Catión ciclopropenilo.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[C₃H₅]⁺', description: 'Pico base: escisión alílica con pérdida de metilo.', isBasePeak: true },
          { mz: 55, relativeAbundance: 24, fragmentFormula: '[C₄H₇]⁺', description: 'Pérdida de H•.' },
          { mz: 56, relativeAbundance: 38, fragmentFormula: '[C₄H₈]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'trans_two_butene',
        name: 'trans-2-Buteno',
        formula: 'C₄H₈',
        molarMass: 56,
        description: 'Alqueno interno simétrico con ion molecular más estable que el isómero 1-buteno.',
        basePeakMz: 41,
        molecularIonMz: 56,
        peaks: [
          { mz: 27, relativeAbundance: 36, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 39, relativeAbundance: 30, fragmentFormula: '[C₃H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[C₃H₅]⁺', description: 'Pico base: catión alilo.', isBasePeak: true },
          { mz: 55, relativeAbundance: 28, fragmentFormula: '[C₄H₇]⁺', description: 'Pérdida de H•.' },
          { mz: 56, relativeAbundance: 55, fragmentFormula: '[C₄H₈]⁺•', description: 'Ion molecular de gran abundancia.', isMolecularIon: true }
        ]
      },
      {
        id: 'isobutene',
        name: 'Isobuteno (2-Metilpropeno)',
        formula: 'C₄H₈',
        molarMass: 56,
        description: 'Alqueno ramificado; pico base en m/z 41 por pérdida de metilo con carga deslocalizada.',
        basePeakMz: 41,
        molecularIonMz: 56,
        peaks: [
          { mz: 27, relativeAbundance: 25, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 39, relativeAbundance: 48, fragmentFormula: '[C₃H₃]⁺', description: 'Ion aromático elemental de 3C.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[C₃H₅]⁺', description: 'Pico base: catión 2-metilvinilo/alilo.', isBasePeak: true },
          { mz: 56, relativeAbundance: 62, fragmentFormula: '[C₄H₈]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'butadiene',
        name: '1,3-Butadieno',
        formula: 'C₄H₆',
        molarMass: 54,
        description: 'Dieno conjugado con resonancia pi que estabiliza intensamente el ion molecular como pico base.',
        basePeakMz: 54,
        molecularIonMz: 54,
        peaks: [
          { mz: 26, relativeAbundance: 18, fragmentFormula: '[C₂H₂]⁺•', description: 'Acetileno.' },
          { mz: 27, relativeAbundance: 32, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 39, relativeAbundance: 78, fragmentFormula: '[C₃H₃]⁺', description: 'Catión ciclopropenilo por pérdida de metilo.' },
          { mz: 53, relativeAbundance: 46, fragmentFormula: '[C₄H₅]⁺', description: 'Pérdida de H•.' },
          { mz: 54, relativeAbundance: 100, fragmentFormula: '[C₄H₆]⁺•', description: 'Ion molecular y pico base por gran conjugación.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'one_pentene',
        name: '1-Penteno',
        formula: 'C₅H₁₀',
        molarMass: 70,
        description: 'Alqueno terminal de 5 carbonos; ruptura alílica dominante en m/z 41 y 42.',
        basePeakMz: 42,
        molecularIonMz: 70,
        peaks: [
          { mz: 27, relativeAbundance: 38, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 41, relativeAbundance: 82, fragmentFormula: '[C₃H₅]⁺', description: 'Catión alilo.' },
          { mz: 42, relativeAbundance: 100, fragmentFormula: '[C₃H₆]⁺•', description: 'Pico base: reordenamiento alílico con pérdida de etileno.', isBasePeak: true },
          { mz: 55, relativeAbundance: 45, fragmentFormula: '[C₄H₇]⁺', description: 'Pérdida de metilo.' },
          { mz: 70, relativeAbundance: 22, fragmentFormula: '[C₅H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_methyl_two_butene',
        name: '2-Metil-2-buteno',
        formula: 'C₅H₁₀',
        molarMass: 70,
        description: 'Alqueno trisustituido; la pérdida de un radical metilo produce el catión alilo sustituido m/z 55.',
        basePeakMz: 55,
        molecularIonMz: 70,
        peaks: [
          { mz: 27, relativeAbundance: 20, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento vinilo.' },
          { mz: 39, relativeAbundance: 35, fragmentFormula: '[C₃H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 41, relativeAbundance: 48, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 55, relativeAbundance: 100, fragmentFormula: '[C₄H₇]⁺', description: 'Pico base: catión dimetilalilo estabilizado.', isBasePeak: true },
          { mz: 70, relativeAbundance: 68, fragmentFormula: '[C₅H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclopentene',
        name: 'Ciclopenteno',
        formula: 'C₅H₈',
        molarMass: 68,
        description: 'Cicloalqueno; ion molecular muy intenso y pérdida de H2 formando el catión ciclopentadienilo.',
        basePeakMz: 67,
        molecularIonMz: 68,
        peaks: [
          { mz: 39, relativeAbundance: 65, fragmentFormula: '[C₃H₃]⁺', description: 'Catión ciclopropenilo.' },
          { mz: 41, relativeAbundance: 38, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 67, relativeAbundance: 100, fragmentFormula: '[C₅H₇]⁺', description: 'Pico base: pérdida alílica de un átomo de hidrógeno [M - H]⁺.', isBasePeak: true },
          { mz: 68, relativeAbundance: 85, fragmentFormula: '[C₅H₈]⁺•', description: 'Ion molecular muy estable.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_hexene',
        name: '1-Hexeno',
        formula: 'C₆H₁₂',
        molarMass: 84,
        description: 'Alqueno terminal de 6 carbonos con reordenamiento de McLafferty que rinde m/z 56.',
        basePeakMz: 41,
        molecularIonMz: 84,
        peaks: [
          { mz: 27, relativeAbundance: 35, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[C₃H₅]⁺', description: 'Pico base: catión alilo elemental.', isBasePeak: true },
          { mz: 42, relativeAbundance: 58, fragmentFormula: '[C₃H₆]⁺•', description: 'Fragmento alifático.' },
          { mz: 56, relativeAbundance: 78, fragmentFormula: '[C₄H₈]⁺•', description: 'Reordenamiento tipo McLafferty con pérdida de etileno.' },
          { mz: 84, relativeAbundance: 18, fragmentFormula: '[C₆H₁₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclohexene',
        name: 'Ciclohexeno',
        formula: 'C₆H₁₀',
        molarMass: 82,
        description: 'Cicloalqueno modelo de retro-Diels-Alder; retro-cicloadición con pérdida de etileno para dar m/z 54 (butadieno).',
        basePeakMz: 67,
        molecularIonMz: 82,
        peaks: [
          { mz: 39, relativeAbundance: 46, fragmentFormula: '[C₃H₃]⁺', description: 'Ciclopropenilo.' },
          { mz: 54, relativeAbundance: 74, fragmentFormula: '[C₄H₆]⁺•', description: 'Retro-Diels-Alder: catión radical butadieno.' },
          { mz: 67, relativeAbundance: 100, fragmentFormula: '[C₅H₇]⁺', description: 'Pico base: pérdida de metilo tras transposición.', isBasePeak: true },
          { mz: 82, relativeAbundance: 82, fragmentFormula: '[C₆H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'limonene',
        name: 'D-Limoneno',
        formula: 'C₁₀H₁₆',
        molarMass: 136,
        description: 'Terpeno monocíclico común en cítricos; retro-Diels-Alder genera el catión isopropenilo y m/z 68.',
        basePeakMz: 68,
        molecularIonMz: 136,
        peaks: [
          { mz: 39, relativeAbundance: 38, fragmentFormula: '[C₃H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 68, relativeAbundance: 100, fragmentFormula: '[C₅H₈]⁺•', description: 'Pico base: fragmento de isopreno por retro-Diels-Alder.', isBasePeak: true },
          { mz: 93, relativeAbundance: 65, fragmentFormula: '[C₇H₉]⁺', description: 'Pérdida de C₃H₇.' },
          { mz: 121, relativeAbundance: 25, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 136, relativeAbundance: 32, fragmentFormula: '[C₁₀H₁₆]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'myrcene',
        name: 'Mirceno',
        formula: 'C₁₀H₁₆',
        molarMass: 136,
        description: 'Monoterpeno acíclico de lúpulo y cannabis; pico base en m/z 41 y 93.',
        basePeakMz: 93,
        molecularIonMz: 136,
        peaks: [
          { mz: 41, relativeAbundance: 88, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 69, relativeAbundance: 72, fragmentFormula: '[C₅H₉]⁺', description: 'Fragmento isoprenoide.' },
          { mz: 93, relativeAbundance: 100, fragmentFormula: '[C₇H₉]⁺', description: 'Pico base: fragmento ciclohexenilo estabilizado.', isBasePeak: true },
          { mz: 136, relativeAbundance: 8, fragmentFormula: '[C₁₀H₁₆]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'acetylene',
        name: 'Acetileno (Etino)',
        formula: 'C₂H₂',
        molarMass: 26,
        description: 'El alquino más simple con triple enlace C≡C; ion molecular extremadamente estable y pico base.',
        basePeakMz: 26,
        molecularIonMz: 26,
        peaks: [
          { mz: 12, relativeAbundance: 6, fragmentFormula: '[C]⁺•', description: 'Carbono atómico.' },
          { mz: 13, relativeAbundance: 8, fragmentFormula: '[CH]⁺', description: 'Metino.' },
          { mz: 24, relativeAbundance: 5, fragmentFormula: '[C₂]⁺•', description: 'Dicarbono.' },
          { mz: 25, relativeAbundance: 22, fragmentFormula: '[C₂H]⁺', description: 'Ion etinilo [M - H]⁺.' },
          { mz: 26, relativeAbundance: 100, fragmentFormula: '[C₂H₂]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'propyne',
        name: 'Propino (Metilacetileno)',
        formula: 'C₃H₄',
        molarMass: 40,
        description: 'Alquino de tres carbonos; ion molecular muy intenso y pérdida de H• para dar el catión propargilo.',
        basePeakMz: 39,
        molecularIonMz: 40,
        peaks: [
          { mz: 26, relativeAbundance: 12, fragmentFormula: '[C₂H₂]⁺•', description: 'Acetileno.' },
          { mz: 37, relativeAbundance: 15, fragmentFormula: '[C₃H]⁺', description: 'Fragmento poli-insaturado.' },
          { mz: 38, relativeAbundance: 32, fragmentFormula: '[C₃H₂]⁺•', description: 'Deshidrogenación.' },
          { mz: 39, relativeAbundance: 100, fragmentFormula: '[HC≡C-CH₂]⁺', description: 'Pico base: catión propargilo aromático/resonante.', isBasePeak: true },
          { mz: 40, relativeAbundance: 75, fragmentFormula: '[C₃H₄]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_butyne',
        name: '1-Butino',
        formula: 'C₄H₆',
        molarMass: 54,
        description: 'Alquino terminal de 4 carbonos; pérdida propargílica de metilo para generar el catión propargilo m/z 39.',
        basePeakMz: 39,
        molecularIonMz: 54,
        peaks: [
          { mz: 27, relativeAbundance: 28, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 39, relativeAbundance: 100, fragmentFormula: '[C₃H₃]⁺', description: 'Pico base: catión propargilo por pérdida de CH₃•.', isBasePeak: true },
          { mz: 53, relativeAbundance: 44, fragmentFormula: '[C₄H₅]⁺', description: 'Pérdida de protón [M - H]⁺.' },
          { mz: 54, relativeAbundance: 58, fragmentFormula: '[C₄H₆]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_butyne',
        name: '2-Butino (Dimetilacetileno)',
        formula: 'C₄H₆',
        molarMass: 54,
        description: 'Alquino interno simétrico; ion molecular y pico base en m/z 53 y 39.',
        basePeakMz: 39,
        molecularIonMz: 54,
        peaks: [
          { mz: 27, relativeAbundance: 20, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 39, relativeAbundance: 100, fragmentFormula: '[C₃H₃]⁺', description: 'Pico base: catión propargilo.', isBasePeak: true },
          { mz: 53, relativeAbundance: 68, fragmentFormula: '[C₄H₅]⁺', description: 'Pérdida propargílica de H•.', isMolecularIon: false },
          { mz: 54, relativeAbundance: 82, fragmentFormula: '[C₄H₆]⁺•', description: 'Ion molecular muy intenso.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_pentyne',
        name: '1-Pentino',
        formula: 'C₅H₈',
        molarMass: 68,
        description: 'Alquino terminal de 5 carbonos; escisión propargílica dominante en m/z 39 y 67.',
        basePeakMz: 67,
        molecularIonMz: 68,
        peaks: [
          { mz: 27, relativeAbundance: 32, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento menor.' },
          { mz: 39, relativeAbundance: 92, fragmentFormula: '[C₃H₃]⁺', description: 'Catión propargilo.' },
          { mz: 53, relativeAbundance: 55, fragmentFormula: '[C₄H₅]⁺', description: 'Pérdida de metilo.' },
          { mz: 67, relativeAbundance: 100, fragmentFormula: '[C₅H₇]⁺', description: 'Pico base: pérdida de H• propargílico [M - H]⁺.', isBasePeak: true },
          { mz: 68, relativeAbundance: 45, fragmentFormula: '[C₅H₈]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_hexyne',
        name: '1-Hexino',
        formula: 'C₆H₁₀',
        molarMass: 82,
        description: 'Alquino terminal de 6 carbonos con pico base en m/z 67 por pérdida de metilo.',
        basePeakMz: 67,
        molecularIonMz: 82,
        peaks: [
          { mz: 39, relativeAbundance: 78, fragmentFormula: '[C₃H₃]⁺', description: 'Catión propargilo.' },
          { mz: 41, relativeAbundance: 52, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 53, relativeAbundance: 48, fragmentFormula: '[C₄H₅]⁺', description: 'Fragmento alquino.' },
          { mz: 67, relativeAbundance: 100, fragmentFormula: '[C₅H₇]⁺', description: 'Pico base: pérdida propargílica de metilo.', isBasePeak: true },
          { mz: 82, relativeAbundance: 25, fragmentFormula: '[C₆H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'phenylacetylene',
        name: 'Fenilacetileno',
        formula: 'C₈H₆',
        molarMass: 102,
        description: 'Aromático conjugado con triple enlace etinilo; ion molecular extremadamente resistente que constituye el pico base.',
        basePeakMz: 102,
        molecularIonMz: 102,
        peaks: [
          { mz: 50, relativeAbundance: 22, fragmentFormula: '[C₄H₂]⁺•', description: 'Fragmentación profunda del anillo.' },
          { mz: 51, relativeAbundance: 28, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento cíclico.' },
          { mz: 74, relativeAbundance: 18, fragmentFormula: '[C₆H₂]⁺•', description: 'Pérdida de acetileno.' },
          { mz: 76, relativeAbundance: 35, fragmentFormula: '[C₆H₄]⁺•', description: 'Ion bencino.' },
          { mz: 102, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡CH]⁺•', description: 'Ion molecular y pico base por deslocalización pi extendida.', isBasePeak: true, isMolecularIon: true }
        ]
      }
    ]
  },

  // 3. HIDROCARBUROS AROMÁTICOS (20 ejemplos)
  {
    id: 'aromatics',
    name: 'Hidrocarburos Aromáticos',
    iconName: 'Compass',
    generalFormula: 'Ar-R / C_n H_{2n-6}',
    spectralSignature: 'Ion molecular [M]⁺• muy intenso (a menudo pico base); ion tropilio m/z 91 [C₇H₇]⁺ cuasi-universal en alquilbencenos; pérdida de acetileno neutro (–26 Da, C₂H₂) desde el anillo produciendo picos en m/z 77 [C₆H₅]⁺, 51 [C₄H₃]⁺ y 39 [C₃H₃]⁺.',
    compounds: [
      {
        id: 'benzene_arom',
        name: 'Benceno',
        formula: 'C₆H₆',
        molarMass: 78,
        description: 'Prototipo aromático; sexteto electrónico deslocalizado que resiste la fragmentación; ion molecular base.',
        basePeakMz: 78,
        molecularIonMz: 78,
        peaks: [
          { mz: 39, relativeAbundance: 18, fragmentFormula: '[C₃H₃]⁺', description: 'Catión ciclopropenilo.' },
          { mz: 50, relativeAbundance: 20, fragmentFormula: '[C₄H₂]⁺•', description: 'Pérdida de acetileno C₂H₂.' },
          { mz: 51, relativeAbundance: 22, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento cíclico menor.' },
          { mz: 52, relativeAbundance: 24, fragmentFormula: '[C₄H₄]⁺•', description: 'Eliminación típica de C₂H₂.' },
          { mz: 77, relativeAbundance: 25, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo [M - H]⁺.' },
          { mz: 78, relativeAbundance: 100, fragmentFormula: '[C₆H₆]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'toluene',
        name: 'Tolueno',
        formula: 'C₇H₈',
        molarMass: 92,
        description: 'Alquilbenceno clásico; reordenamiento del catión bencilo al catión tropilio heptagonal aromático m/z 91.',
        basePeakMz: 91,
        molecularIonMz: 92,
        peaks: [
          { mz: 39, relativeAbundance: 16, fragmentFormula: '[C₃H₃]⁺', description: 'Fragmentación alifática aromática.' },
          { mz: 45, relativeAbundance: 12, fragmentFormula: '[C₇H₈]²⁺', description: 'Ion doblemente cargado característico de aromáticos.' },
          { mz: 65, relativeAbundance: 18, fragmentFormula: '[C₅H₅]⁺', description: 'Pérdida de acetileno desde el ion tropilio.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: catión tropilio (anillo de 7 miembros, 6 electrones pi aromático).', isBasePeak: true },
          { mz: 92, relativeAbundance: 75, fragmentFormula: '[C₇H₈]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethylbenzene',
        name: 'Etilbenceno',
        formula: 'C₈H₁₀',
        molarMass: 106,
        description: 'La ruptura bencílica con pérdida de un radical metilo genera cuantitativamente el catión tropilio m/z 91.',
        basePeakMz: 91,
        molecularIonMz: 106,
        peaks: [
          { mz: 51, relativeAbundance: 14, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento del anillo.' },
          { mz: 65, relativeAbundance: 15, fragmentFormula: '[C₅H₅]⁺', description: 'Pérdida de C₂H₂ desde el tropilio.' },
          { mz: 77, relativeAbundance: 12, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: catión tropilio por pérdida de metilo.', isBasePeak: true },
          { mz: 106, relativeAbundance: 35, fragmentFormula: '[C₈H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'o_xylene',
        name: 'o-Xileno (1,2-Dimetilbenceno)',
        formula: 'C₈H₁₀',
        molarMass: 106,
        description: 'Dimetilbenceno en orto; pérdida de metilo rinde el catión metiltropilio m/z 91.',
        basePeakMz: 91,
        molecularIonMz: 106,
        peaks: [
          { mz: 65, relativeAbundance: 18, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 15, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: catión tropilio por pérdida de CH₃•.', isBasePeak: true },
          { mz: 105, relativeAbundance: 32, fragmentFormula: '[C₈H₉]⁺', description: 'Pérdida de H•.' },
          { mz: 106, relativeAbundance: 68, fragmentFormula: '[C₈H₁₀]⁺•', description: 'Ion molecular intenso.', isMolecularIon: true }
        ]
      },
      {
        id: 'm_xylene',
        name: 'm-Xileno (1,3-Dimetilbenceno)',
        formula: 'C₈H₁₀',
        molarMass: 106,
        description: 'Isómero meta; pico base m/z 91 por reordenamiento a tropilio.',
        basePeakMz: 91,
        molecularIonMz: 106,
        peaks: [
          { mz: 65, relativeAbundance: 16, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento cíclico.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: tropilio.', isBasePeak: true },
          { mz: 105, relativeAbundance: 30, fragmentFormula: '[C₈H₉]⁺', description: 'Pérdida de H•.' },
          { mz: 106, relativeAbundance: 70, fragmentFormula: '[C₈H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'p_xylene',
        name: 'p-Xileno (1,4-Dimetilbenceno)',
        formula: 'C₈H₁₀',
        molarMass: 106,
        description: 'Isómero para; simetría molecular que incrementa la estabilidad del ion molecular frente al tropilio.',
        basePeakMz: 91,
        molecularIonMz: 106,
        peaks: [
          { mz: 65, relativeAbundance: 15, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento aromático.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: tropilio.', isBasePeak: true },
          { mz: 105, relativeAbundance: 35, fragmentFormula: '[C₈H₉]⁺', description: 'Pérdida de H•.' },
          { mz: 106, relativeAbundance: 74, fragmentFormula: '[C₈H₁₀]⁺•', description: 'Ion molecular muy alto.', isMolecularIon: true }
        ]
      },
      {
        id: 'cumene',
        name: 'Cumeno (Isopropilbenceno)',
        formula: 'C₉H₁₂',
        molarMass: 120,
        description: 'Pérdida preferencial de un radical metilo en la posición bencílica secundaria formando el catión m/z 105.',
        basePeakMz: 105,
        molecularIonMz: 120,
        peaks: [
          { mz: 41, relativeAbundance: 18, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 77, relativeAbundance: 20, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 91, relativeAbundance: 15, fragmentFormula: '[C₇H₇]⁺', description: 'Tropilio.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-CH-CH₃]⁺', description: 'Pico base: catión feniletilo secundario por pérdida de CH₃•.', isBasePeak: true },
          { mz: 120, relativeAbundance: 26, fragmentFormula: '[C₉H₁₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'propylbenzene',
        name: 'Propilbenceno',
        formula: 'C₉H₁₂',
        molarMass: 120,
        description: 'Alquilbenceno lineal; ruptura bencílica con pérdida de radical etilo generando el catión tropilio m/z 91.',
        basePeakMz: 91,
        molecularIonMz: 120,
        peaks: [
          { mz: 65, relativeAbundance: 14, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento de tropilio.' },
          { mz: 77, relativeAbundance: 12, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: tropilio por pérdida de C₂H₅•.', isBasePeak: true },
          { mz: 92, relativeAbundance: 68, fragmentFormula: '[C₇H₈]⁺•', description: 'Reordenamiento de McLafferty aromático.' },
          { mz: 120, relativeAbundance: 24, fragmentFormula: '[C₉H₁₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'mesitylene',
        name: 'Mesitileno (1,3,5-Trimetilbenceno)',
        formula: 'C₉H₁₂',
        molarMass: 120,
        description: 'Simetría D3h; pico base en m/z 105 por pérdida de un metilo para dar el catión dimetiltropilio.',
        basePeakMz: 105,
        molecularIonMz: 120,
        peaks: [
          { mz: 77, relativeAbundance: 16, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 91, relativeAbundance: 22, fragmentFormula: '[C₇H₇]⁺', description: 'Tropilio.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₈H₉]⁺', description: 'Pico base: catión dimetiltropilio.', isBasePeak: true },
          { mz: 119, relativeAbundance: 45, fragmentFormula: '[C₉H₁₁]⁺', description: 'Pérdida de H•.' },
          { mz: 120, relativeAbundance: 78, fragmentFormula: '[C₉H₁₂]⁺•', description: 'Ion molecular muy intenso.', isMolecularIon: true }
        ]
      },
      {
        id: 'styrene',
        name: 'Estireno (Vinilbenceno)',
        formula: 'C₈H₈',
        molarMass: 104,
        description: 'Aromático conjugado con doble enlace vinílico; ion molecular base con pérdida de acetileno.',
        basePeakMz: 104,
        molecularIonMz: 104,
        peaks: [
          { mz: 51, relativeAbundance: 22, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 38, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 78, relativeAbundance: 45, fragmentFormula: '[C₆H₆]⁺•', description: 'Pérdida de acetileno desde el ion molecular.' },
          { mz: 103, relativeAbundance: 42, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 104, relativeAbundance: 100, fragmentFormula: '[C₆H₅-CH=CH₂]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'naphthalene',
        name: 'Naftaleno',
        formula: 'C₁₀H₈',
        molarMass: 128,
        description: 'Hidrocarburo aromático policíclico (HAP) bicíclico; ion molecular extraordinariamente dominante (100%).',
        basePeakMz: 128,
        molecularIonMz: 128,
        peaks: [
          { mz: 51, relativeAbundance: 18, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento menor.' },
          { mz: 64, relativeAbundance: 12, fragmentFormula: '[C₁₀H₈]²⁺', description: 'Ion doblemente cargado m/2z = 64 Da típico de HAP.' },
          { mz: 102, relativeAbundance: 15, fragmentFormula: '[C₈H₆]⁺•', description: 'Pérdida de acetileno C₂H₂.' },
          { mz: 127, relativeAbundance: 16, fragmentFormula: '[C₁₀H₇]⁺', description: 'Pérdida de H•.' },
          { mz: 128, relativeAbundance: 100, fragmentFormula: '[C₁₀H₈]⁺•', description: 'Ion molecular y pico base indiscutible.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'one_methylnaphthalene',
        name: '1-Metilnaftaleno',
        formula: 'C₁₁H₁₀',
        molarMass: 142,
        description: 'Derivado metilado de naftaleno; pérdida de H• para dar el catión benzotropilio m/z 141.',
        basePeakMz: 141,
        molecularIonMz: 142,
        peaks: [
          { mz: 115, relativeAbundance: 48, fragmentFormula: '[C₉H₇]⁺', description: 'Catión indenilo por pérdida de acetileno.' },
          { mz: 141, relativeAbundance: 100, fragmentFormula: '[C₁₁H₉]⁺', description: 'Pico base: catión benzotropilio aromático.', isBasePeak: true },
          { mz: 142, relativeAbundance: 92, fragmentFormula: '[C₁₁H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_methylnaphthalene',
        name: '2-Metilnaftaleno',
        formula: 'C₁₁H₁₀',
        molarMass: 142,
        description: 'Isómero beta de metilnaftaleno con pico base en m/z 141.',
        basePeakMz: 141,
        molecularIonMz: 142,
        peaks: [
          { mz: 115, relativeAbundance: 46, fragmentFormula: '[C₉H₇]⁺', description: 'Catión indenilo.' },
          { mz: 141, relativeAbundance: 100, fragmentFormula: '[C₁₁H₉]⁺', description: 'Pico base: catión benzotropilio.', isBasePeak: true },
          { mz: 142, relativeAbundance: 95, fragmentFormula: '[C₁₁H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'biphenyl',
        name: 'Bifenilo',
        formula: 'C₁₂H₁₀',
        molarMass: 154,
        description: 'Dos anillos de benceno unidos por enlace C-C sencillo; ion molecular como pico base indiscutible.',
        basePeakMz: 154,
        molecularIonMz: 154,
        peaks: [
          { mz: 76, relativeAbundance: 18, fragmentFormula: '[C₆H₄]⁺•', description: 'Bencino.' },
          { mz: 77, relativeAbundance: 12, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 152, relativeAbundance: 28, fragmentFormula: '[C₁₂H₈]⁺•', description: 'Ion bifenileno por pérdida de H₂.' },
          { mz: 153, relativeAbundance: 42, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 154, relativeAbundance: 100, fragmentFormula: '[C₁₂H₁₀]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'anthracene',
        name: 'Antraceno',
        formula: 'C₁₄H₁₀',
        molarMass: 178,
        description: 'HAP tricíclico lineal; ion molecular masivo que representa casi la totalidad del espectro.',
        basePeakMz: 178,
        molecularIonMz: 178,
        peaks: [
          { mz: 76, relativeAbundance: 10, fragmentFormula: '[C₆H₄]⁺•', description: 'Fragmento aromático.' },
          { mz: 89, relativeAbundance: 14, fragmentFormula: '[C₁₄H₁₀]²⁺', description: 'Ion doblemente cargado m/z = 89.' },
          { mz: 152, relativeAbundance: 16, fragmentFormula: '[C₁₂H₈]⁺•', description: 'Pérdida de acetileno C₂H₂.' },
          { mz: 176, relativeAbundance: 18, fragmentFormula: '[C₁₄H₈]⁺•', description: 'Pérdida de H₂.' },
          { mz: 178, relativeAbundance: 100, fragmentFormula: '[C₁₄H₁₀]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'phenanthrene',
        name: 'Fenantreno',
        formula: 'C₁₄H₁₀',
        molarMass: 178,
        description: 'Isómero angular del antraceno; mayor energía de resonancia e ion molecular como pico base (100%).',
        basePeakMz: 178,
        molecularIonMz: 178,
        peaks: [
          { mz: 89, relativeAbundance: 15, fragmentFormula: '[C₁₄H₁₀]²⁺', description: 'Ion doblemente cargado.' },
          { mz: 152, relativeAbundance: 14, fragmentFormula: '[C₁₂H₈]⁺•', description: 'Pérdida de acetileno.' },
          { mz: 176, relativeAbundance: 20, fragmentFormula: '[C₁₄H₈]⁺•', description: 'Pérdida de H₂.' },
          { mz: 177, relativeAbundance: 22, fragmentFormula: '[C₁₄H₉]⁺', description: 'Pérdida de H•.' },
          { mz: 178, relativeAbundance: 100, fragmentFormula: '[C₁₄H₁₀]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'pyrene',
        name: 'Pireno',
        formula: 'C₁₆H₁₀',
        molarMass: 202,
        description: 'HAP tetracíclico peri-condensado de altísima estabilidad termodinámica; ion molecular base.',
        basePeakMz: 202,
        molecularIonMz: 202,
        peaks: [
          { mz: 101, relativeAbundance: 20, fragmentFormula: '[C₁₆H₁₀]²⁺', description: 'Ion doblemente cargado m/z = 101.' },
          { mz: 174, relativeAbundance: 8, fragmentFormula: '[C₁₄H₆]⁺•', description: 'Pérdida de C₂H₄.' },
          { mz: 200, relativeAbundance: 15, fragmentFormula: '[C₁₆H₈]⁺•', description: 'Pérdida de H₂.' },
          { mz: 201, relativeAbundance: 22, fragmentFormula: '[C₁₆H₉]⁺', description: 'Pérdida de H•.' },
          { mz: 202, relativeAbundance: 100, fragmentFormula: '[C₁₆H₁₀]⁺•', description: 'Ion molecular y pico base indiscutible.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'indane',
        name: 'Indano',
        formula: 'C₉H₁₀',
        molarMass: 118,
        description: 'Benceno condensado con ciclopentano; pérdida de H• rinde el catión indanilo resonante m/z 117.',
        basePeakMz: 117,
        molecularIonMz: 118,
        peaks: [
          { mz: 65, relativeAbundance: 18, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento aromático.' },
          { mz: 91, relativeAbundance: 45, fragmentFormula: '[C₇H₇]⁺', description: 'Tropilio por pérdida de etileno.' },
          { mz: 115, relativeAbundance: 58, fragmentFormula: '[C₉H₇]⁺', description: 'Catión indenilo.' },
          { mz: 117, relativeAbundance: 100, fragmentFormula: '[C₉H₉]⁺', description: 'Pico base: catión indanilo bencílico [M - H]⁺.', isBasePeak: true },
          { mz: 118, relativeAbundance: 88, fragmentFormula: '[C₉H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'tetralin',
        name: 'Tetralina (1,2,3,4-Tetrahidronaftaleno)',
        formula: 'C₁₀H₁₂',
        molarMass: 132,
        description: 'Anillo aromático condensado con ciclohexano; retro-cicloadición con pérdida de etileno dando m/z 104.',
        basePeakMz: 104,
        molecularIonMz: 132,
        peaks: [
          { mz: 77, relativeAbundance: 22, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 91, relativeAbundance: 48, fragmentFormula: '[C₇H₇]⁺', description: 'Tropilio.' },
          { mz: 104, relativeAbundance: 100, fragmentFormula: '[C₈H₈]⁺•', description: 'Pico base: retro-Diels-Alder con pérdida de etileno C₂H₄.', isBasePeak: true },
          { mz: 131, relativeAbundance: 35, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 132, relativeAbundance: 68, fragmentFormula: '[C₁₀H₁₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'fluorene',
        name: 'Fluoreno',
        formula: 'C₁₃H₁₀',
        molarMass: 166,
        description: 'HAP con puente metileno; pérdida de H• para formar el catión fluorenilo aromático de 165 Da.',
        basePeakMz: 165,
        molecularIonMz: 166,
        peaks: [
          { mz: 82.5, relativeAbundance: 12, fragmentFormula: '[C₁₃H₁₀]²⁺', description: 'Ion doblemente cargado.' },
          { mz: 139, relativeAbundance: 16, fragmentFormula: '[C₁₁H₇]⁺', description: 'Pérdida de acetileno.' },
          { mz: 165, relativeAbundance: 100, fragmentFormula: '[C₁₃H₉]⁺', description: 'Pico base: catión fluorenilo aromático muy deslocalizado.', isBasePeak: true },
          { mz: 166, relativeAbundance: 88, fragmentFormula: '[C₁₃H₁₀]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      }
    ]
  },

  // 4. ALCOHOLES Y FENOLES (20 ejemplos)
  {
    id: 'alcohols_phenols',
    name: 'Alcoholes y Fenoles',
    iconName: 'Droplets',
    generalFormula: 'R-OH / Ar-OH',
    spectralSignature: 'Ion molecular muy débil o ausente en alcoholes alifáticos; ruptura alfa primordial formando iones oxonio estabilizados por resonancia ([CH₂=OH]⁺ m/z 31 en primarios, [R-CH=OH]⁺ m/z 45, 59 en secundarios/terciarios); deshidratación [M – 18]⁺• (pérdida de H₂O); fenoles muestran ion molecular fuerte y pérdida de CO (–28 Da).',
    compounds: [
      {
        id: 'methanol',
        name: 'Metanol',
        formula: 'CH₄O',
        molarMass: 32,
        description: 'Alcohol primario simple; pico base en m/z 31 por pérdida de un átomo de hidrógeno formando el ion hidroximetilo [CH2=OH]+.',
        basePeakMz: 31,
        molecularIonMz: 32,
        peaks: [
          { mz: 15, relativeAbundance: 12, fragmentFormula: '[CH₃]⁺', description: 'Pérdida de hidroxilo.' },
          { mz: 29, relativeAbundance: 38, fragmentFormula: '[CHO]⁺', description: 'Ion formilo por pérdida de H₂.' },
          { mz: 31, relativeAbundance: 100, fragmentFormula: '[CH₂=OH]⁺', description: 'Pico base: ion oxonio por pérdida de H•.', isBasePeak: true },
          { mz: 32, relativeAbundance: 65, fragmentFormula: '[CH₄O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethanol_alc',
        name: 'Etanol',
        formula: 'C₂H₆O',
        molarMass: 46,
        description: 'Alcohol clásico con una ruptura alfa muy representativa que da lugar al oxonio m/z 31.',
        basePeakMz: 31,
        molecularIonMz: 46,
        peaks: [
          { mz: 15, relativeAbundance: 12, fragmentFormula: '[CH₃]⁺', description: 'Ruptura C-C.' },
          { mz: 27, relativeAbundance: 18, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmentación alifática.' },
          { mz: 29, relativeAbundance: 24, fragmentFormula: '[CHO]⁺', description: 'Pérdida de etilo.' },
          { mz: 31, relativeAbundance: 100, fragmentFormula: '[CH₂=OH]⁺', description: 'Pico base: ruptura alfa con pérdida de CH₃•.', isBasePeak: true },
          { mz: 45, relativeAbundance: 42, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 46, relativeAbundance: 28, fragmentFormula: '[C₂H₆O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_propanol',
        name: '1-Propanol',
        formula: 'C₃H₈O',
        molarMass: 60,
        description: 'Alcohol primario lineal; la ruptura alfa expulsa un radical etilo formando el ion oxonio base m/z 31.',
        basePeakMz: 31,
        molecularIonMz: 60,
        peaks: [
          { mz: 27, relativeAbundance: 15, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento menor.' },
          { mz: 29, relativeAbundance: 28, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 31, relativeAbundance: 100, fragmentFormula: '[CH₂=OH]⁺', description: 'Pico base: ruptura alfa expulsando C₂H₅•.', isBasePeak: true },
          { mz: 42, relativeAbundance: 18, fragmentFormula: '[M - H₂O]⁺•', description: 'Pérdida de agua (deshidratación).' },
          { mz: 59, relativeAbundance: 12, fragmentFormula: '[M - H]⁺', description: 'Pérdida de H•.' },
          { mz: 60, relativeAbundance: 8, fragmentFormula: '[C₃H₈O]⁺•', description: 'Ion molecular débil.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_propanol',
        name: '2-Propanol (Isopropanol)',
        formula: 'C₃H₈O',
        molarMass: 60,
        description: 'Alcohol secundario; la pérdida de un radical metilo genera el ion oxonio secundario m/z 45 como pico base.',
        basePeakMz: 45,
        molecularIonMz: 60,
        peaks: [
          { mz: 27, relativeAbundance: 22, fragmentFormula: '[C₂H₃]⁺', description: 'Alifático.' },
          { mz: 43, relativeAbundance: 42, fragmentFormula: '[C₃H₇]⁺', description: 'Pérdida de OH•.' },
          { mz: 45, relativeAbundance: 100, fragmentFormula: '[CH₃-CH=OH]⁺', description: 'Pico base: ruptura alfa con pérdida de CH₃•.', isBasePeak: true },
          { mz: 60, relativeAbundance: 4, fragmentFormula: '[C₃H₈O]⁺•', description: 'Ion molecular muy tenue.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_butanol',
        name: '1-Butanol',
        formula: 'C₄H₁₀O',
        molarMass: 74,
        description: 'Alcohol primario de 4 carbonos; pico base m/z 31 y pico de deshidratación [M-18] en m/z 56.',
        basePeakMz: 31,
        molecularIonMz: 74,
        peaks: [
          { mz: 29, relativeAbundance: 25, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 31, relativeAbundance: 100, fragmentFormula: '[CH₂=OH]⁺', description: 'Pico base: oxonio primario por pérdida de propilo.', isBasePeak: true },
          { mz: 41, relativeAbundance: 42, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 56, relativeAbundance: 85, fragmentFormula: '[C₄H₈]⁺•', description: 'Pérdida concertada de agua [M - H₂O]⁺•.' },
          { mz: 74, relativeAbundance: 1.5, fragmentFormula: '[C₄H₁₀O]⁺•', description: 'Ion molecular casi imperceptible.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_butanol',
        name: '2-Butanol',
        formula: 'C₄H₁₀O',
        molarMass: 74,
        description: 'Alcohol secundario asimétrico; la ruptura alfa preferencial expulsa el grupo etilo (más grande) rindiendo m/z 45.',
        basePeakMz: 45,
        molecularIonMz: 74,
        peaks: [
          { mz: 29, relativeAbundance: 18, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 45, relativeAbundance: 100, fragmentFormula: '[CH₃-CH=OH]⁺', description: 'Pico base: pérdida del radical etilo C₂H₅•.', isBasePeak: true },
          { mz: 59, relativeAbundance: 28, fragmentFormula: '[CH₃CH₂-CH=OH]⁺', description: 'Pérdida del radical metilo CH₃•.' },
          { mz: 74, relativeAbundance: 2, fragmentFormula: '[C₄H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isobutanol',
        name: 'Isobutanol (2-Metil-1-propanol)',
        formula: 'C₄H₁₀O',
        molarMass: 74,
        description: 'Alcohol primario ramificado; ruptura alfa rinde m/z 31 y pérdida de agua rinde m/z 56.',
        basePeakMz: 43,
        molecularIonMz: 74,
        peaks: [
          { mz: 31, relativeAbundance: 78, fragmentFormula: '[CH₂=OH]⁺', description: 'Ruptura alfa.' },
          { mz: 41, relativeAbundance: 58, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: carbocatión isopropilo.', isBasePeak: true },
          { mz: 56, relativeAbundance: 32, fragmentFormula: '[M - H₂O]⁺•', description: 'Deshidratación.' },
          { mz: 74, relativeAbundance: 1, fragmentFormula: '[C₄H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'tert_butanol',
        name: 'tert-Butanol (2-Metil-2-propanol)',
        formula: 'C₄H₁₀O',
        molarMass: 74,
        description: 'Alcohol terciario; ion molecular inexistente a 70 eV; ruptura alfa total perdiendo metilo para dar m/z 59.',
        basePeakMz: 59,
        molecularIonMz: 74,
        peaks: [
          { mz: 31, relativeAbundance: 14, fragmentFormula: '[CH₂=OH]⁺', description: 'Fragmento secundario.' },
          { mz: 41, relativeAbundance: 35, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 45, fragmentFormula: '[C₃H₇]⁺', description: 'Fragmento hidrocarbonado.' },
          { mz: 59, relativeAbundance: 100, fragmentFormula: '[(CH₃)₂C=OH]⁺', description: 'Pico base absoluto: ion oxonio terciario por pérdida de CH₃•.', isBasePeak: true },
          { mz: 74, relativeAbundance: 0.1, fragmentFormula: '[C₄H₁₀O]⁺•', description: 'Ion molecular no detectable.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_pentanol',
        name: '1-Pentanol',
        formula: 'C₅H₁₂O',
        molarMass: 88,
        description: 'Alcohol primario de 5 carbonos; deshidratación [M-18] en m/z 70 y oxonio m/z 31.',
        basePeakMz: 42,
        molecularIonMz: 88,
        peaks: [
          { mz: 31, relativeAbundance: 75, fragmentFormula: '[CH₂=OH]⁺', description: 'Oxonio primario.' },
          { mz: 42, relativeAbundance: 100, fragmentFormula: '[C₃H₆]⁺•', description: 'Pico base: fragmentación del hidrocarburo tras deshidratación.', isBasePeak: true },
          { mz: 55, relativeAbundance: 68, fragmentFormula: '[C₄H₇]⁺', description: 'Fragmento butenilo.' },
          { mz: 70, relativeAbundance: 58, fragmentFormula: '[M - H₂O]⁺•', description: 'Deshidratación concertada m/z 70.' },
          { mz: 88, relativeAbundance: 0.5, fragmentFormula: '[C₅H₁₂O]⁺•', description: 'Ion molecular débil.', isMolecularIon: true }
        ]
      },
      {
        id: 'allyl_alcohol',
        name: 'Alcohol Alílico',
        formula: 'C₃H₆O',
        molarMass: 58,
        description: 'Alcohol insaturado con doble enlace adyacente; pérdida de H• para dar el catión acroleína m/z 57.',
        basePeakMz: 57,
        molecularIonMz: 58,
        peaks: [
          { mz: 29, relativeAbundance: 45, fragmentFormula: '[CHO]⁺', description: 'Ion formilo.' },
          { mz: 31, relativeAbundance: 52, fragmentFormula: '[CH₂=OH]⁺', description: 'Oxonio.' },
          { mz: 39, relativeAbundance: 48, fragmentFormula: '[C₃H₃]⁺', description: 'Propargilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-CH=OH]⁺', description: 'Pico base: pérdida alílica de un hidrógeno [M - H]⁺.', isBasePeak: true },
          { mz: 58, relativeAbundance: 38, fragmentFormula: '[C₃H₆O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclohexanol',
        name: 'Ciclohexanol',
        formula: 'C₆H₁₂O',
        molarMass: 100,
        description: 'Alcohol alicíclico; deshidratación masiva rindiendo el catión radical ciclohexeno m/z 82 y luego m/z 57.',
        basePeakMz: 57,
        molecularIonMz: 100,
        peaks: [
          { mz: 41, relativeAbundance: 44, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₄H₉]⁺', description: 'Pico base: apertura de anillo.', isBasePeak: true },
          { mz: 67, relativeAbundance: 68, fragmentFormula: '[C₅H₇]⁺', description: 'Fragmento alifático.' },
          { mz: 82, relativeAbundance: 82, fragmentFormula: '[M - H₂O]⁺•', description: 'Pérdida de agua (m/z 82 ciclohexeno).' },
          { mz: 100, relativeAbundance: 8, fragmentFormula: '[C₆H₁₂O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'benzyl_alcohol',
        name: 'Alcohol Bencílico',
        formula: 'C₇H₈O',
        molarMass: 108,
        description: 'Alcohol aromático primario; pérdida de hidroxilo o protón rindiendo el ion hidroxitropilio m/z 107 y tropilio m/z 91.',
        basePeakMz: 79,
        molecularIonMz: 108,
        peaks: [
          { mz: 51, relativeAbundance: 28, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 58, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 79, relativeAbundance: 100, fragmentFormula: '[C₆H₇]⁺', description: 'Pico base: pérdida de CO y H•.', isBasePeak: true },
          { mz: 91, relativeAbundance: 42, fragmentFormula: '[C₇H₇]⁺', description: 'Tropilio por pérdida de OH•.' },
          { mz: 107, relativeAbundance: 82, fragmentFormula: '[C₇H₇O]⁺', description: 'Hidroxitropilio [M - H]⁺.' },
          { mz: 108, relativeAbundance: 74, fragmentFormula: '[C₇H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_phenylethanol',
        name: '2-Feniletanol',
        formula: 'C₈H₁₀O',
        molarMass: 122,
        description: 'Fragancia de rosas; ruptura bencílica cuantitativa rindiendo el catión tropilio m/z 91 como pico base.',
        basePeakMz: 91,
        molecularIonMz: 122,
        peaks: [
          { mz: 31, relativeAbundance: 32, fragmentFormula: '[CH₂=OH]⁺', description: 'Oxonio primario.' },
          { mz: 65, relativeAbundance: 20, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento de tropilio.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: catión tropilio por pérdida de CH₂OH•.', isBasePeak: true },
          { mz: 92, relativeAbundance: 65, fragmentFormula: '[C₇H₈]⁺•', description: 'Reordenamiento aromático.' },
          { mz: 122, relativeAbundance: 22, fragmentFormula: '[C₈H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'phenol',
        name: 'Fenol',
        formula: 'C₆H₆O',
        molarMass: 94,
        description: 'Compuesto fenólico básico; ion molecular muy intenso (pico base) y pérdida característica de monóxido de carbono (–28 Da) para dar m/z 66.',
        basePeakMz: 94,
        molecularIonMz: 94,
        peaks: [
          { mz: 39, relativeAbundance: 28, fragmentFormula: '[C₃H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 40, relativeAbundance: 16, fragmentFormula: '[C₃H₄]⁺•', description: 'Fragmento secundario.' },
          { mz: 65, relativeAbundance: 38, fragmentFormula: '[C₅H₅]⁺', description: 'Catión ciclopentadienilo por pérdida de H• adicional.' },
          { mz: 66, relativeAbundance: 45, fragmentFormula: '[C₅H₆]⁺•', description: 'Pérdida neutra característica de CO (–28 Da) desde el anillo fenólico.' },
          { mz: 94, relativeAbundance: 100, fragmentFormula: '[C₆H₅OH]⁺•', description: 'Ion molecular y pico base por deslocalización del par libre de oxígeno.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'o_cresol',
        name: 'o-Cresol (2-Metilfenol)',
        formula: 'C₇H₈O',
        molarMass: 108,
        description: 'Fenol metilado; pérdida de un hidrógeno para dar el catión hidroxitropilio m/z 107 y pérdida de CO en m/z 80.',
        basePeakMz: 108,
        molecularIonMz: 108,
        peaks: [
          { mz: 51, relativeAbundance: 20, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 35, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 79, relativeAbundance: 42, fragmentFormula: '[C₆H₇]⁺', description: 'Pérdida de CO y H•.' },
          { mz: 107, relativeAbundance: 85, fragmentFormula: '[C₇H₇O]⁺', description: 'Catión hidroxitropilio [M - H]⁺.' },
          { mz: 108, relativeAbundance: 100, fragmentFormula: '[C₇H₈O]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'm_cresol',
        name: 'm-Cresol (3-Metilfenol)',
        formula: 'C₇H₈O',
        molarMass: 108,
        description: 'Isómero meta del cresol con pico base en el ion molecular m/z 108.',
        basePeakMz: 108,
        molecularIonMz: 108,
        peaks: [
          { mz: 77, relativeAbundance: 30, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 79, relativeAbundance: 44, fragmentFormula: '[C₆H₇]⁺', description: 'Pérdida de CO y H•.' },
          { mz: 107, relativeAbundance: 82, fragmentFormula: '[C₇H₇O]⁺', description: 'Hidroxitropilio.' },
          { mz: 108, relativeAbundance: 100, fragmentFormula: '[C₇H₈O]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'p_cresol',
        name: 'p-Cresol (4-Metilfenol)',
        formula: 'C₇H₈O',
        molarMass: 108,
        description: 'Isómero para del cresol; pico base m/z 107 correspondiente a la formación del catión hidroxitropilio.',
        basePeakMz: 107,
        molecularIonMz: 108,
        peaks: [
          { mz: 77, relativeAbundance: 28, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 79, relativeAbundance: 38, fragmentFormula: '[C₆H₇]⁺', description: 'Fragmento aromático.' },
          { mz: 107, relativeAbundance: 100, fragmentFormula: '[C₇H₇O]⁺', description: 'Pico base: catión hidroxitropilio por pérdida de H•.', isBasePeak: true },
          { mz: 108, relativeAbundance: 92, fragmentFormula: '[C₇H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_naphthol',
        name: '1-Naftol (alfa-Naftol)',
        formula: 'C₁₀H₈O',
        molarMass: 144,
        description: 'Fenol bicíclico; ion molecular base (100%) y pérdida consecutiva de monóxido de carbono (CO) para dar m/z 115.',
        basePeakMz: 144,
        molecularIonMz: 144,
        peaks: [
          { mz: 89, relativeAbundance: 18, fragmentFormula: '[C₇H₅]⁺', description: 'Fragmentación profunda.' },
          { mz: 115, relativeAbundance: 65, fragmentFormula: '[C₉H₇]⁺', description: 'Pérdida de CO y H• (catión indenilo).' },
          { mz: 116, relativeAbundance: 32, fragmentFormula: '[C₉H₈]⁺•', description: 'Pérdida de CO (–28 Da).' },
          { mz: 144, relativeAbundance: 100, fragmentFormula: '[C₁₀H₈O]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'two_naphthol',
        name: '2-Naftol (beta-Naftol)',
        formula: 'C₁₀H₈O',
        molarMass: 144,
        description: 'Isómero beta de naftol con ion molecular base m/z 144.',
        basePeakMz: 144,
        molecularIonMz: 144,
        peaks: [
          { mz: 115, relativeAbundance: 62, fragmentFormula: '[C₉H₇]⁺', description: 'Catión indenilo.' },
          { mz: 116, relativeAbundance: 30, fragmentFormula: '[C₉H₈]⁺•', description: 'Pérdida de CO.' },
          { mz: 143, relativeAbundance: 20, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 144, relativeAbundance: 100, fragmentFormula: '[C₁₀H₈O]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'guaiacol',
        name: 'Guayacol (2-Metoxifenol)',
        formula: 'C₇H₈O₂',
        molarMass: 124,
        description: 'Fenol con grupo metoxi de humo de madera; pico base en m/z 109 por pérdida de metilo.',
        basePeakMz: 109,
        molecularIonMz: 124,
        peaks: [
          { mz: 53, relativeAbundance: 25, fragmentFormula: '[C₄H₅]⁺', description: 'Fragmento cíclico.' },
          { mz: 81, relativeAbundance: 45, fragmentFormula: '[C₅H₅O]⁺', description: 'Pérdida de CO adicional.' },
          { mz: 109, relativeAbundance: 100, fragmentFormula: '[C₆H₅O₂]⁺', description: 'Pico base: pérdida del radical metilo CH₃•.', isBasePeak: true },
          { mz: 124, relativeAbundance: 82, fragmentFormula: '[C₇H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      }
    ]
  }
];

import { FUNCTIONAL_GROUPS_PART2 } from './functionalGroupsPart2';
import { FUNCTIONAL_GROUPS_PART3 } from './functionalGroupsPart3';

// The complete collection of all 12 Organic Functional Groups (20 compounds each = 240 compounds total)
export const ALL_FUNCTIONAL_GROUPS: FunctionalGroupCategory[] = [
  ...FUNCTIONAL_GROUPS_DATA,
  ...FUNCTIONAL_GROUPS_PART2,
  ...FUNCTIONAL_GROUPS_PART3,
];

// Flat array of all 240 compounds for instant lookup, search and simulation
export const ALL_COMPOUNDS: CompoundSample[] = ALL_FUNCTIONAL_GROUPS.flatMap((group) => group.compounds);

export function getAllFunctionalGroups(): FunctionalGroupCategory[] {
  return ALL_FUNCTIONAL_GROUPS;
}

