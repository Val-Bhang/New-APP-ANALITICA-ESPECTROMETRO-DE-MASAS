import { FunctionalGroupCategory } from './functionalGroupsData';

export const FUNCTIONAL_GROUPS_PART2: FunctionalGroupCategory[] = [
  // 5. ÉTERES Y EPÓXIDOS (20 ejemplos)
  {
    id: 'ethers_epoxides',
    name: 'Éteres y Epóxidos',
    iconName: 'Boxes',
    generalFormula: 'R-O-R\' / C_n H_{2n}O',
    spectralSignature: 'Ruptura alfa con pérdida del radical alquilo más grande rindiendo iones oxonio (m/z 45 [CH₃CH₂O]⁺ o [CH₂=OCH₃]⁺, m/z 59 [CH₃CH₂-O=CH₂]⁺); fragmentación C–O heterolítica; epóxidos muestran pérdida de aldehído o reordenamiento concertado.',
    compounds: [
      {
        id: 'dimethyl_ether',
        name: 'Dimetil Éter',
        formula: 'C₂H₆O',
        molarMass: 46,
        description: 'Éter simétrico simple; pico base en m/z 45 por pérdida de un átomo de hidrógeno [M - H]+.',
        basePeakMz: 45,
        molecularIonMz: 46,
        peaks: [
          { mz: 15, relativeAbundance: 28, fragmentFormula: '[CH₃]⁺', description: 'Pérdida de metoxi.' },
          { mz: 29, relativeAbundance: 35, fragmentFormula: '[CHO]⁺', description: 'Ion formilo.' },
          { mz: 31, relativeAbundance: 20, fragmentFormula: '[CH₃O]⁺', description: 'Catión metoxi.' },
          { mz: 45, relativeAbundance: 100, fragmentFormula: '[CH₃-O=CH₂]⁺', description: 'Pico base: ion oxonio por pérdida de H•.', isBasePeak: true },
          { mz: 46, relativeAbundance: 70, fragmentFormula: '[C₂H₆O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'diethyl_ether',
        name: 'Dietil Éter',
        formula: 'C₄H₁₀O',
        molarMass: 74,
        description: 'Éter anestésico clásico; ruptura alfa inmediata perdiendo metilo para dar el oxonio base m/z 59.',
        basePeakMz: 59,
        molecularIonMz: 74,
        peaks: [
          { mz: 29, relativeAbundance: 42, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 31, relativeAbundance: 68, fragmentFormula: '[CH₂=OH]⁺', description: 'Fragmento oxonio tras reordenamiento.' },
          { mz: 45, relativeAbundance: 35, fragmentFormula: '[C₂H₅O]⁺', description: 'Etoxi.' },
          { mz: 59, relativeAbundance: 100, fragmentFormula: '[CH₃CH₂-O=CH₂]⁺', description: 'Pico base: ruptura alfa con pérdida de CH₃•.', isBasePeak: true },
          { mz: 74, relativeAbundance: 28, fragmentFormula: '[C₄H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'mtbe',
        name: 'MTBE (Metil tert-Butil Éter)',
        formula: 'C₅H₁₂O',
        molarMass: 88,
        description: 'Antidetonante oxigenado; ruptura heterolítica cuantitativa del enlace C-O rindiendo el carbocatión t-butilo m/z 57.',
        basePeakMz: 73,
        molecularIonMz: 88,
        peaks: [
          { mz: 41, relativeAbundance: 32, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 25, fragmentFormula: '[C₃H₇]⁺', description: 'Propilo.' },
          { mz: 57, relativeAbundance: 82, fragmentFormula: '[C(CH₃)₃]⁺', description: 'Carbocatión t-butilo terciario.' },
          { mz: 73, relativeAbundance: 100, fragmentFormula: '[(CH₃)₂C=O-CH₃]⁺', description: 'Pico base: ruptura alfa con pérdida de metilo.', isBasePeak: true },
          { mz: 88, relativeAbundance: 5, fragmentFormula: '[C₅H₁₂O]⁺•', description: 'Ion molecular débil.', isMolecularIon: true }
        ]
      },
      {
        id: 'diisopropyl_ether',
        name: 'Diisopropil Éter',
        formula: 'C₆H₁₄O',
        molarMass: 102,
        description: 'Éter ramificado; ruptura alfa expulsando metilo para dar el catión oxonio m/z 87 o carbocatión isopropilo m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 102,
        peaks: [
          { mz: 41, relativeAbundance: 35, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH(CH₃)₂]⁺', description: 'Pico base: carbocatión isopropilo.', isBasePeak: true },
          { mz: 45, relativeAbundance: 48, fragmentFormula: '[C₂H₅O]⁺', description: 'Fragmento oxonio.' },
          { mz: 87, relativeAbundance: 68, fragmentFormula: '[M - CH₃]⁺', description: 'Ruptura alfa perdiendo metilo.' },
          { mz: 102, relativeAbundance: 0.8, fragmentFormula: '[C₆H₁₄O]⁺•', description: 'Ion molecular muy tenue.', isMolecularIon: true }
        ]
      },
      {
        id: 'dibutyl_ether',
        name: 'Di-n-butil Éter',
        formula: 'C₈H₁₈O',
        molarMass: 130,
        description: 'Éter simétrico de cadena media; pérdida de propilo por ruptura alfa formando oxonio m/z 87.',
        basePeakMz: 57,
        molecularIonMz: 130,
        peaks: [
          { mz: 41, relativeAbundance: 55, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₄H₉]⁺', description: 'Pico base: carbocatión butilo.', isBasePeak: true },
          { mz: 87, relativeAbundance: 78, fragmentFormula: '[CH₃(CH₂)₃-O=CH₂]⁺', description: 'Ruptura alfa expulsando C₃H₇•.' },
          { mz: 130, relativeAbundance: 2, fragmentFormula: '[C₈H₁₈O]⁺•', description: 'Ion molecular débil.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethylene_oxide',
        name: 'Óxido de Etileno (Oxirano)',
        formula: 'C₂H₄O',
        molarMass: 44,
        description: 'Epóxido de tres miembros con alta tensión de anillo; ion molecular m/z 44 y pérdida de H• rindiendo m/z 43.',
        basePeakMz: 44,
        molecularIonMz: 44,
        peaks: [
          { mz: 14, relativeAbundance: 22, fragmentFormula: '[CH₂]⁺•', description: 'Metileno.' },
          { mz: 15, relativeAbundance: 32, fragmentFormula: '[CH₃]⁺', description: 'Reordenamiento.' },
          { mz: 29, relativeAbundance: 78, fragmentFormula: '[CHO]⁺', description: 'Ion formilo por pérdida de CH₃•.' },
          { mz: 43, relativeAbundance: 42, fragmentFormula: '[C₂H₃O]⁺', description: 'Pérdida de un hidrógeno [M - H]⁺.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[C₂H₄O]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'propylene_oxide',
        name: 'Óxido de Propileno (Metiloxirano)',
        formula: 'C₃H₆O',
        molarMass: 58,
        description: 'Epóxido asimétrico; la pérdida de metilo produce el ion oxonio cíclico m/z 43 o pérdida de H• rindiendo m/z 57.',
        basePeakMz: 58,
        molecularIonMz: 58,
        peaks: [
          { mz: 27, relativeAbundance: 38, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento vinilo.' },
          { mz: 29, relativeAbundance: 68, fragmentFormula: '[CHO]⁺', description: 'Formilo.' },
          { mz: 43, relativeAbundance: 75, fragmentFormula: '[C₂H₃O]⁺', description: 'Pérdida de metilo.' },
          { mz: 57, relativeAbundance: 45, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 58, relativeAbundance: 100, fragmentFormula: '[C₃H₆O]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'thf',
        name: 'Tetrahidrofurano (THF)',
        formula: 'C₄H₈O',
        molarMass: 72,
        description: 'Éter cíclico de cinco miembros; retro-[2+2] rindiendo ion molecular m/z 72 y pico base m/z 42 por pérdida de formaldehído.',
        basePeakMz: 42,
        molecularIonMz: 72,
        peaks: [
          { mz: 27, relativeAbundance: 32, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 41, relativeAbundance: 65, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 42, relativeAbundance: 100, fragmentFormula: '[C₃H₆]⁺•', description: 'Pico base: pérdida neutra concertada de formaldehído (CH₂O, 30 Da).', isBasePeak: true },
          { mz: 71, relativeAbundance: 58, fragmentFormula: '[M - H]⁺', description: 'Pérdida de H•.' },
          { mz: 72, relativeAbundance: 75, fragmentFormula: '[C₄H₈O]⁺•', description: 'Ion molecular muy estable.', isMolecularIon: true }
        ]
      },
      {
        id: 'dioxane',
        name: '1,4-Dioxano',
        formula: 'C₄H₈O₂',
        molarMass: 88,
        description: 'Diéter cíclico simétrico; fragmentación por doble escisión retro-Diels-Alder rindiendo m/z 58 y 88.',
        basePeakMz: 88,
        molecularIonMz: 88,
        peaks: [
          { mz: 28, relativeAbundance: 45, fragmentFormula: '[C₂H₄]⁺•', description: 'Etileno.' },
          { mz: 31, relativeAbundance: 52, fragmentFormula: '[CH₂=OH]⁺', description: 'Oxonio.' },
          { mz: 58, relativeAbundance: 68, fragmentFormula: '[C₂H₂O₂]⁺•', description: 'Pérdida de etileno.' },
          { mz: 87, relativeAbundance: 35, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 88, relativeAbundance: 100, fragmentFormula: '[C₄H₈O₂]⁺•', description: 'Ion molecular y pico base por simetría.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'thp',
        name: 'Tetrahidropirano (THP)',
        formula: 'C₅H₁₀O',
        molarMass: 86,
        description: 'Éter cíclico de seis miembros; fragmentación típica con pérdida de etileno rindiendo m/z 56.',
        basePeakMz: 56,
        molecularIonMz: 86,
        peaks: [
          { mz: 41, relativeAbundance: 48, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 56, relativeAbundance: 100, fragmentFormula: '[C₃H₄O]⁺•', description: 'Pico base: retro-cicloadición con pérdida de etileno (C₂H₄).', isBasePeak: true },
          { mz: 85, relativeAbundance: 44, fragmentFormula: '[M - H]⁺', description: 'Pérdida de H•.' },
          { mz: 86, relativeAbundance: 68, fragmentFormula: '[C₅H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'anisole',
        name: 'Anisol (Metoxibenceno)',
        formula: 'C₇H₈O',
        molarMass: 108,
        description: 'Éter aril-alquílico; ion molecular pico base (100%) y pérdida sucesiva de formaldehído (CH2O, 30 Da) para dar catión benceno m/z 78.',
        basePeakMz: 108,
        molecularIonMz: 108,
        peaks: [
          { mz: 51, relativeAbundance: 25, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 65, relativeAbundance: 45, fragmentFormula: '[C₅H₅]⁺', description: 'Catión ciclopentadienilo por pérdida de CO desde m/z 93.' },
          { mz: 78, relativeAbundance: 68, fragmentFormula: '[C₆H₆]⁺•', description: 'Pérdida de formaldehído (CH₂O, 30 Da) rindiendo catión benceno.' },
          { mz: 93, relativeAbundance: 35, fragmentFormula: '[C₆H₅O]⁺', description: 'Ion fenoxi por pérdida de metilo CH₃•.' },
          { mz: 108, relativeAbundance: 100, fragmentFormula: '[C₆H₅-O-CH₃]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'phenetole',
        name: 'Fenetol (Etoxibenceno)',
        formula: 'C₈H₁₀O',
        molarMass: 122,
        description: 'Éter etil-fenílico; reordenamiento con pérdida de etileno rindiendo el ion fenol m/z 94 como pico base.',
        basePeakMz: 94,
        molecularIonMz: 122,
        peaks: [
          { mz: 65, relativeAbundance: 32, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento de ciclopentadienilo.' },
          { mz: 66, relativeAbundance: 28, fragmentFormula: '[C₅H₆]⁺•', description: 'Pérdida de CO desde el fenol.' },
          { mz: 94, relativeAbundance: 100, fragmentFormula: '[C₆H₅OH]⁺•', description: 'Pico base: reordenamiento de cuatro miembros con pérdida de etileno (C₂H₄, 28 Da).', isBasePeak: true },
          { mz: 122, relativeAbundance: 48, fragmentFormula: '[C₈H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'diphenyl_ether',
        name: 'Difenil Éter',
        formula: 'C₁₂H₁₀O',
        molarMass: 170,
        description: 'Éter diarílico muy estable; ion molecular pico base dominante y pérdida de CO.',
        basePeakMz: 170,
        molecularIonMz: 170,
        peaks: [
          { mz: 77, relativeAbundance: 35, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 141, relativeAbundance: 32, fragmentFormula: '[C₁₁H₉]⁺', description: 'Pérdida de CO y H•.' },
          { mz: 142, relativeAbundance: 28, fragmentFormula: '[C₁₁H₁₀]⁺•', description: 'Pérdida de monóxido de carbono (CO).' },
          { mz: 169, relativeAbundance: 42, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 170, relativeAbundance: 100, fragmentFormula: '[C₆H₅-O-C₆H₅]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'dibenzyl_ether',
        name: 'Dibencil Éter',
        formula: 'C₁₄H₁₄O',
        molarMass: 198,
        description: 'Éter dibencílico; ruptura de enlace bencílico cuantitativa formando el catión tropilio m/z 91 como pico base.',
        basePeakMz: 91,
        molecularIonMz: 198,
        peaks: [
          { mz: 65, relativeAbundance: 22, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento de tropilio.' },
          { mz: 77, relativeAbundance: 18, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: catión tropilio por escisión heterolítica del enlace bencílico.', isBasePeak: true },
          { mz: 92, relativeAbundance: 68, fragmentFormula: '[C₇H₈]⁺•', description: 'Fragmento de tolueno.' },
          { mz: 107, relativeAbundance: 45, fragmentFormula: '[C₇H₇O]⁺', description: 'Catión hidroxitropilio/benciloxi.' },
          { mz: 198, relativeAbundance: 4, fragmentFormula: '[C₁₄H₁₄O]⁺•', description: 'Ion molecular tenue.', isMolecularIon: true }
        ]
      },
      {
        id: 'dme_glyme',
        name: '1,2-Dimetoxietano (Monoglima)',
        formula: 'C₄H₁₀O₂',
        molarMass: 90,
        description: 'Solvente quelante diéter; ruptura alfa masiva rindiendo el ion oxonio base m/z 45.',
        basePeakMz: 45,
        molecularIonMz: 90,
        peaks: [
          { mz: 15, relativeAbundance: 20, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 29, relativeAbundance: 32, fragmentFormula: '[CHO]⁺', description: 'Formilo.' },
          { mz: 45, relativeAbundance: 100, fragmentFormula: '[CH₃-O=CH₂]⁺', description: 'Pico base simétrico: escisión central del enlace C-C.', isBasePeak: true },
          { mz: 59, relativeAbundance: 48, fragmentFormula: '[CH₃OCH₂CH₂]⁺', description: 'Pérdida de metoxi.' },
          { mz: 90, relativeAbundance: 2, fragmentFormula: '[C₄H₁₀O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'diglyme',
        name: 'Diglima (Bis(2-metoxietil)éter)',
        formula: 'C₆H₁₄O₃',
        molarMass: 134,
        description: 'Triéter; pico base en m/z 45 [CH₃OCH₂]+ o m/z 59.',
        basePeakMz: 59,
        molecularIonMz: 134,
        peaks: [
          { mz: 31, relativeAbundance: 25, fragmentFormula: '[CH₂=OH]⁺', description: 'Oxonio.' },
          { mz: 45, relativeAbundance: 92, fragmentFormula: '[CH₃-O=CH₂]⁺', description: 'Oxonio terminal.' },
          { mz: 59, relativeAbundance: 100, fragmentFormula: '[CH₃OCH₂CH₂]⁺', description: 'Pico base: escisión del enlace C-O.', isBasePeak: true },
          { mz: 89, relativeAbundance: 42, fragmentFormula: '[C₄H₉O₂]⁺', description: 'Pérdida de etoxi.' },
          { mz: 134, relativeAbundance: 0.5, fragmentFormula: '[C₆H₁₄O₃]⁺•', description: 'Ion molecular débil.', isMolecularIon: true }
        ]
      },
      {
        id: 'furan',
        name: 'Furano',
        formula: 'C₄H₄O',
        molarMass: 68,
        description: 'Heterociclo aromático oxigenado; ion molecular base (100%) y pérdida de monóxido de carbono (CO) rindiendo m/z 40 (ciclopropeno).',
        basePeakMz: 68,
        molecularIonMz: 68,
        peaks: [
          { mz: 38, relativeAbundance: 35, fragmentFormula: '[C₃H₂]⁺•', description: 'Pérdida de formaldehído.' },
          { mz: 39, relativeAbundance: 78, fragmentFormula: '[C₃H₃]⁺', description: 'Catión ciclopropenilo.' },
          { mz: 40, relativeAbundance: 48, fragmentFormula: '[C₃H₄]⁺•', description: 'Pérdida de CO (–28 Da) del furano.' },
          { mz: 68, relativeAbundance: 100, fragmentFormula: '[C₄H₄O]⁺•', description: 'Ion molecular y pico base por aromaticidad pi.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'two_methylfuran',
        name: '2-Metilfurano',
        formula: 'C₅H₆O',
        molarMass: 82,
        description: 'Furano metilado; pérdida de H• rindiendo el catión piranilio/furanilo m/z 81 o pérdida de CO en m/z 53.',
        basePeakMz: 82,
        molecularIonMz: 82,
        peaks: [
          { mz: 39, relativeAbundance: 48, fragmentFormula: '[C₃H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 53, relativeAbundance: 68, fragmentFormula: '[C₄H₅]⁺', description: 'Pérdida de CO desde el ion molecular.' },
          { mz: 81, relativeAbundance: 72, fragmentFormula: '[C₅H₅O]⁺', description: 'Pérdida de un hidrógeno [M - H]⁺.' },
          { mz: 82, relativeAbundance: 100, fragmentFormula: '[C₅H₆O]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'dioxolane',
        name: '1,3-Dioxolano',
        formula: 'C₃H₆O₂',
        molarMass: 74,
        description: 'Acetál cíclico de cinco miembros; pérdida de H• rindiendo el catión 1,3-dioxolanilo estabilizado por dos oxígenos m/z 73.',
        basePeakMz: 73,
        molecularIonMz: 74,
        peaks: [
          { mz: 28, relativeAbundance: 32, fragmentFormula: '[CO]⁺•', description: 'Monóxido de carbono.' },
          { mz: 43, relativeAbundance: 42, fragmentFormula: '[C₂H₃O]⁺', description: 'Ruptura del anillo.' },
          { mz: 45, relativeAbundance: 58, fragmentFormula: '[CHO₂]⁺', description: 'Fragmento formiloxi.' },
          { mz: 73, relativeAbundance: 100, fragmentFormula: '[C₃H₅O₂]⁺', description: 'Pico base: pérdida del protón C2 estabilizado por dos oxígenos [M - H]⁺.', isBasePeak: true },
          { mz: 74, relativeAbundance: 65, fragmentFormula: '[C₃H₆O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'styrene_oxide',
        name: 'Óxido de Estireno',
        formula: 'C₈H₈O',
        molarMass: 120,
        description: 'Epóxido aromático; reordenamiento a fenilacetaldehído con pérdida de CO y generación del tropilio m/z 91.',
        basePeakMz: 91,
        molecularIonMz: 120,
        peaks: [
          { mz: 65, relativeAbundance: 25, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 42, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 89, relativeAbundance: 38, fragmentFormula: '[C₇H₅]⁺', description: 'Pérdida de CH₂O.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: catión tropilio por reordenamiento con pérdida de CHO•.', isBasePeak: true },
          { mz: 119, relativeAbundance: 45, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 120, relativeAbundance: 62, fragmentFormula: '[C₈H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      }
    ]
  },

  // 6. ALDEHÍDOS (20 ejemplos)
  {
    id: 'aldehydes',
    name: 'Aldehídos',
    iconName: 'Sparkles',
    generalFormula: 'R-CHO',
    spectralSignature: 'Ruptura alfa perdiendo el átomo de hidrógeno carbonílico [M – 1]⁺ o el radical alquilo rindiendo el catión formilo m/z 29 [CHO]⁺; reordenamiento de McLafferty indispensable en aldehídos con hidrógeno gamma (pico característico en m/z 44 [CH₂=CH-OH]⁺•); benzaldehídos muestran pérdida de H• (m/z 105 [C₆H₅CO]⁺) y luego CO (m/z 77).',
    compounds: [
      {
        id: 'formaldehyde',
        name: 'Formaldehído (Metanal)',
        formula: 'CH₂O',
        molarMass: 30,
        description: 'El aldehído más elemental; ion molecular base m/z 30 y pérdida de H• para dar el catión formilo m/z 29.',
        basePeakMz: 29,
        molecularIonMz: 30,
        peaks: [
          { mz: 28, relativeAbundance: 25, fragmentFormula: '[CO]⁺•', description: 'Pérdida de H₂ molecular.' },
          { mz: 29, relativeAbundance: 100, fragmentFormula: '[H-C≡O]⁺', description: 'Pico base: catión formilo por pérdida de H•.', isBasePeak: true },
          { mz: 30, relativeAbundance: 85, fragmentFormula: '[CH₂O]⁺•', description: 'Ion molecular intacto.', isMolecularIon: true }
        ]
      },
      {
        id: 'acetaldehyde',
        name: 'Acetaldehído (Etanal)',
        formula: 'C₂H₄O',
        molarMass: 44,
        description: 'Aldehído de dos carbonos; pérdida de H• rinde el catión acetilo m/z 43 y pérdida de metilo rinde el ion formilo m/z 29.',
        basePeakMz: 29,
        molecularIonMz: 44,
        peaks: [
          { mz: 15, relativeAbundance: 28, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 29, relativeAbundance: 100, fragmentFormula: '[H-C≡O]⁺', description: 'Pico base: pérdida del radical metilo CH₃•.', isBasePeak: true },
          { mz: 43, relativeAbundance: 78, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Catión acetilo por pérdida del hidrógeno aldehídico [M - H]⁺.' },
          { mz: 44, relativeAbundance: 68, fragmentFormula: '[C₂H₄O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'propanal',
        name: 'Propanal (Propionaldehído)',
        formula: 'C₃H₆O',
        molarMass: 58,
        description: 'Aldehído alifático; pérdida de etilo rinde el catión formilo m/z 29 y pérdida de H• rinde m/z 57.',
        basePeakMz: 29,
        molecularIonMz: 58,
        peaks: [
          { mz: 27, relativeAbundance: 32, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 29, relativeAbundance: 100, fragmentFormula: '[CHO]⁺', description: 'Pico base: catión formilo por pérdida de etilo C₂H₅•.', isBasePeak: true },
          { mz: 57, relativeAbundance: 65, fragmentFormula: '[C₂H₅-C≡O]⁺', description: 'Catión propionilo [M - H]⁺.' },
          { mz: 58, relativeAbundance: 58, fragmentFormula: '[C₃H₆O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'butanal',
        name: 'Butanal (Butiraldehído)',
        formula: 'C₄H₈O',
        molarMass: 72,
        description: 'Primer aldehído con hidrógeno gamma; reordenamiento de McLafferty total formando el enol del etanal m/z 44 como pico base.',
        basePeakMz: 44,
        molecularIonMz: 72,
        peaks: [
          { mz: 27, relativeAbundance: 38, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento vinilo.' },
          { mz: 29, relativeAbundance: 75, fragmentFormula: '[CHO]⁺', description: 'Ion formilo.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-OH]⁺•', description: 'Pico base: reordenamiento de McLafferty tras transferir hidrógeno gamma y perder etileno.', isBasePeak: true },
          { mz: 57, relativeAbundance: 42, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 72, relativeAbundance: 18, fragmentFormula: '[C₄H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isobutanal',
        name: 'Isobutanal (2-Metilpropanal)',
        formula: 'C₄H₈O',
        molarMass: 72,
        description: 'Aldehído ramificado sin hidrógenos gamma; no puede dar McLafferty; el pico base es el carbocatión isopropilo m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 72,
        peaks: [
          { mz: 27, relativeAbundance: 28, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 29, relativeAbundance: 48, fragmentFormula: '[CHO]⁺', description: 'Formilo.' },
          { mz: 41, relativeAbundance: 52, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH(CH₃)₂]⁺', description: 'Pico base: carbocatión isopropilo tras expulsar formilo.', isBasePeak: true },
          { mz: 71, relativeAbundance: 32, fragmentFormula: '[M - H]⁺', description: 'Catión isobutirilo.' },
          { mz: 72, relativeAbundance: 22, fragmentFormula: '[C₄H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'pentanal',
        name: 'Pentanal (Valeraldehído)',
        formula: 'C₅H₁₀O',
        molarMass: 86,
        description: 'Cadena lineal de 5 carbonos; el reordenamiento de McLafferty genera el pico base m/z 44 con pérdida de propileno.',
        basePeakMz: 44,
        molecularIonMz: 86,
        peaks: [
          { mz: 29, relativeAbundance: 55, fragmentFormula: '[CHO]⁺', description: 'Formilo.' },
          { mz: 41, relativeAbundance: 48, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-OH]⁺•', description: 'Pico base: reordenamiento de McLafferty.', isBasePeak: true },
          { mz: 58, relativeAbundance: 42, fragmentFormula: '[C₃H₆O]⁺•', description: 'Ruptura beta.' },
          { mz: 86, relativeAbundance: 12, fragmentFormula: '[C₅H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'hexanal',
        name: 'Hexanal',
        formula: 'C₆H₁₂O',
        molarMass: 100,
        description: 'Aldehído alifático de 6C; McLafferty dominante en m/z 44 y m/z 56.',
        basePeakMz: 44,
        molecularIonMz: 100,
        peaks: [
          { mz: 41, relativeAbundance: 52, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-OH]⁺•', description: 'Pico base: McLafferty con pérdida de 1-buteno (56 Da).', isBasePeak: true },
          { mz: 56, relativeAbundance: 72, fragmentFormula: '[C₄H₈]⁺•', description: 'Catión alqueno complementario.' },
          { mz: 82, relativeAbundance: 28, fragmentFormula: '[M - H₂O]⁺•', description: 'Pérdida de agua.' },
          { mz: 100, relativeAbundance: 4, fragmentFormula: '[C₆H₁₂O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'heptanal',
        name: 'Heptanal',
        formula: 'C₇H₁₄O',
        molarMass: 114,
        description: 'Aldehído lineal de 7C; McLafferty clásico en m/z 44.',
        basePeakMz: 44,
        molecularIonMz: 114,
        peaks: [
          { mz: 41, relativeAbundance: 48, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-OH]⁺•', description: 'Pico base: McLafferty.', isBasePeak: true },
          { mz: 55, relativeAbundance: 62, fragmentFormula: '[C₄H₇]⁺', description: 'Fragmento alifático.' },
          { mz: 70, relativeAbundance: 58, fragmentFormula: '[C₅H₁₀]⁺•', description: 'Fragmento alqueno.' },
          { mz: 114, relativeAbundance: 2, fragmentFormula: '[C₇H₁₄O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'octanal',
        name: 'Octanal',
        formula: 'C₈H₁₆O',
        molarMass: 128,
        description: 'Componente aromático cítrico; McLafferty persistente en m/z 44.',
        basePeakMz: 44,
        molecularIonMz: 128,
        peaks: [
          { mz: 41, relativeAbundance: 45, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-OH]⁺•', description: 'Pico base McLafferty.', isBasePeak: true },
          { mz: 57, relativeAbundance: 55, fragmentFormula: '[C₄H₉]⁺', description: 'Butilo.' },
          { mz: 84, relativeAbundance: 48, fragmentFormula: '[C₆H₁₂]⁺•', description: 'Fragmento alqueno.' },
          { mz: 128, relativeAbundance: 1, fragmentFormula: '[C₈H₁₆O]⁺•', description: 'Ion molecular débil.', isMolecularIon: true }
        ]
      },
      {
        id: 'nonanal',
        name: 'Nonanal',
        formula: 'C₉H₁₈O',
        molarMass: 142,
        description: 'Aldehído graso de 9 carbonos; McLafferty m/z 44 y picos alifáticos m/z 57.',
        basePeakMz: 57,
        molecularIonMz: 142,
        peaks: [
          { mz: 44, relativeAbundance: 85, fragmentFormula: '[CH₂=CH-OH]⁺•', description: 'McLafferty.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₄H₉]⁺', description: 'Pico base: fragmentación de cadena hidrocarbonada.', isBasePeak: true },
          { mz: 71, relativeAbundance: 45, fragmentFormula: '[C₅H₁₁]⁺', description: 'Pentilo.' },
          { mz: 98, relativeAbundance: 38, fragmentFormula: '[C₇H₁₄]⁺•', description: 'Pérdida de acetaldehído.' },
          { mz: 142, relativeAbundance: 0.8, fragmentFormula: '[C₉H₁₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'decanal',
        name: 'Decanal',
        formula: 'C₁₀H₂₀O',
        molarMass: 156,
        description: 'Aldehído graso de cáscara de naranja; McLafferty en m/z 44 y pico base en m/z 57 o 41.',
        basePeakMz: 41,
        molecularIonMz: 156,
        peaks: [
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[C₃H₅]⁺', description: 'Pico base: catión alilo.', isBasePeak: true },
          { mz: 44, relativeAbundance: 78, fragmentFormula: '[CH₂=CH-OH]⁺•', description: 'McLafferty.' },
          { mz: 57, relativeAbundance: 82, fragmentFormula: '[C₄H₉]⁺', description: 'Butilo.' },
          { mz: 71, relativeAbundance: 38, fragmentFormula: '[C₅H₁₁]⁺', description: 'Pentilo.' },
          { mz: 156, relativeAbundance: 0.5, fragmentFormula: '[C₁₀H₂₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'acrolein',
        name: 'Acroleína (Propenal)',
        formula: 'C₃H₄O',
        molarMass: 56,
        description: 'Aldehído alfa,beta-insaturado; conjugación pi que estabiliza el ion molecular base m/z 56.',
        basePeakMz: 56,
        molecularIonMz: 56,
        peaks: [
          { mz: 27, relativeAbundance: 68, fragmentFormula: '[C₂H₃]⁺', description: 'Ion vinilo por pérdida de formilo.' },
          { mz: 28, relativeAbundance: 32, fragmentFormula: '[CO]⁺•', description: 'Monóxido de carbono.' },
          { mz: 55, relativeAbundance: 85, fragmentFormula: '[CH₂=CH-C≡O]⁺', description: 'Catión acriloílo por pérdida de H• [M - H]⁺.' },
          { mz: 56, relativeAbundance: 100, fragmentFormula: '[C₃H₄O]⁺•', description: 'Ion molecular y pico base por resonancia conjugada.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'crotonaldehyde',
        name: 'Crotonaldehído',
        formula: 'C₄H₆O',
        molarMass: 70,
        description: 'Aldehído insaturado metilado; pico base m/z 70 (ion molecular) y pérdida de metilo m/z 55.',
        basePeakMz: 70,
        molecularIonMz: 70,
        peaks: [
          { mz: 27, relativeAbundance: 42, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 39, relativeAbundance: 58, fragmentFormula: '[C₃H₃]⁺', description: 'Ciclopropenilo.' },
          { mz: 41, relativeAbundance: 68, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 55, relativeAbundance: 75, fragmentFormula: '[C₃H₃O]⁺', description: 'Pérdida de metilo.' },
          { mz: 69, relativeAbundance: 62, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 70, relativeAbundance: 100, fragmentFormula: '[C₄H₆O]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'benzaldehyde',
        name: 'Benzaldehído',
        formula: 'C₇H₆O',
        molarMass: 106,
        description: 'Aldehído aromático de almendras amargas; pérdida del hidrógeno carbonílico rindiendo el catión benzoílo m/z 105 como pico base.',
        basePeakMz: 105,
        molecularIonMz: 106,
        peaks: [
          { mz: 51, relativeAbundance: 42, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 85, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo tras perder CO desde el catión benzoílo.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡O]⁺', description: 'Pico base: catión benzoílo resonante [M - H]⁺.', isBasePeak: true },
          { mz: 106, relativeAbundance: 92, fragmentFormula: '[C₇H₆O]⁺•', description: 'Ion molecular muy intenso.', isMolecularIon: true }
        ]
      },
      {
        id: 'phenylacetaldehyde',
        name: 'Fenilacetaldehído',
        formula: 'C₈H₈O',
        molarMass: 120,
        description: 'Aldehído bencílico; escisión cuantitativa formando el catión tropilio m/z 91 como pico base.',
        basePeakMz: 91,
        molecularIonMz: 120,
        peaks: [
          { mz: 65, relativeAbundance: 28, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento de tropilio.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: catión tropilio por pérdida de CHO•.', isBasePeak: true },
          { mz: 92, relativeAbundance: 48, fragmentFormula: '[C₇H₈]⁺•', description: 'Reordenamiento aromático.' },
          { mz: 119, relativeAbundance: 20, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 120, relativeAbundance: 35, fragmentFormula: '[C₈H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cinnamaldehyde',
        name: 'Cinamaldehído',
        formula: 'C₉H₈O',
        molarMass: 132,
        description: 'Principio activo de la canela; conjugación extendida estireno-carbonilo con ion molecular y pico base en m/z 131.',
        basePeakMz: 131,
        molecularIonMz: 132,
        peaks: [
          { mz: 77, relativeAbundance: 42, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 103, relativeAbundance: 58, fragmentFormula: '[C₈H₇]⁺', description: 'Pérdida de CO desde el catión cinamoílo.' },
          { mz: 131, relativeAbundance: 100, fragmentFormula: '[C₆H₅-CH=CH-C≡O]⁺', description: 'Pico base: catión cinamoílo hiper-deslocalizado [M - H]⁺.', isBasePeak: true },
          { mz: 132, relativeAbundance: 88, fragmentFormula: '[C₉H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'salicylaldehyde',
        name: 'Salicilaldehído (2-Hidroxibenzaldehído)',
        formula: 'C₇H₆O₂',
        molarMass: 122,
        description: 'Aldehído fenólico con puente de hidrógeno intramolecular; ion molecular m/z 122 muy intenso y pico base.',
        basePeakMz: 122,
        molecularIonMz: 122,
        peaks: [
          { mz: 65, relativeAbundance: 38, fragmentFormula: '[C₅H₅]⁺', description: 'Ciclopentadienilo.' },
          { mz: 93, relativeAbundance: 45, fragmentFormula: '[C₆H₅O]⁺', description: 'Pérdida de CHO•.' },
          { mz: 121, relativeAbundance: 85, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 122, relativeAbundance: 100, fragmentFormula: '[C₇H₆O₂]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'vanillin',
        name: 'Vainillina',
        formula: 'C₈H₈O₃',
        molarMass: 152,
        description: 'Aroma natural de vainilla con grupos aldehído, metoxi y fenol; ion molecular pico base.',
        basePeakMz: 151,
        molecularIonMz: 152,
        peaks: [
          { mz: 81, relativeAbundance: 28, fragmentFormula: '[C₅H₅O]⁺', description: 'Fragmento aromático oxigenado.' },
          { mz: 109, relativeAbundance: 42, fragmentFormula: '[C₆H₅O₂]⁺', description: 'Pérdida de acetilo.' },
          { mz: 123, relativeAbundance: 35, fragmentFormula: '[M - CHO]⁺', description: 'Pérdida del grupo formilo.' },
          { mz: 151, relativeAbundance: 100, fragmentFormula: '[M - H]⁺', description: 'Pico base: catión vanilloílo estabilizado por resonancia.', isBasePeak: true },
          { mz: 152, relativeAbundance: 95, fragmentFormula: '[C₈H₈O₃]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'anisaldehyde',
        name: 'Anisaldehído (4-Metoxibenzaldehído)',
        formula: 'C₈H₈O₂',
        molarMass: 136,
        description: 'Aldehído para-metoxilado; ion molecular base (100%) y pico [M-1] m/z 135.',
        basePeakMz: 135,
        molecularIonMz: 136,
        peaks: [
          { mz: 77, relativeAbundance: 32, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 92, relativeAbundance: 38, fragmentFormula: '[C₆H₄O]⁺•', description: 'Pérdida de CO desde el catión.' },
          { mz: 107, relativeAbundance: 42, fragmentFormula: '[CH₃OC₆H₄]⁺', description: 'Pérdida de CHO•.' },
          { mz: 135, relativeAbundance: 100, fragmentFormula: '[CH₃O-C₆H₄-CO]⁺', description: 'Pico base: catión anisoílo [M - H]⁺.', isBasePeak: true },
          { mz: 136, relativeAbundance: 92, fragmentFormula: '[C₈H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'furfural',
        name: 'Furfural (2-Furaldehído)',
        formula: 'C₅H₄O₂',
        molarMass: 96,
        description: 'Aldehído heterocíclico derivado de biomasa; ion molecular pico base (100%) y pérdida de CO en m/z 67 y 39.',
        basePeakMz: 96,
        molecularIonMz: 96,
        peaks: [
          { mz: 39, relativeAbundance: 78, fragmentFormula: '[C₃H₃]⁺', description: 'Catión ciclopropenilo.' },
          { mz: 67, relativeAbundance: 45, fragmentFormula: '[C₄H₃O]⁺', description: 'Pérdida de formilo [M - CHO]⁺.' },
          { mz: 95, relativeAbundance: 82, fragmentFormula: '[C₅H₃O₂]⁺', description: 'Catión furoílo por pérdida de H• [M - H]⁺.' },
          { mz: 96, relativeAbundance: 100, fragmentFormula: '[C₅H₄O₂]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      }
    ]
  },

  // 7. CETONAS (20 ejemplos)
  {
    id: 'ketones',
    name: 'Cetonas',
    iconName: 'Flame',
    generalFormula: 'R-CO-R\'',
    spectralSignature: 'Ruptura alfa en ambos lados del carbonilo con pérdida preferencial del radical más largo, formando cationes acilio resonantes (m/z 43 [CH₃C≡O]⁺ en metilcetonas, m/z 57 [C₂H₅C≡O]⁺ en etilcetonas); reordenamiento de McLafferty en cadenas con hidrógeno gamma rindiendo picos característicos en m/z 58, 72, 86; fenonas rinden catión benzoílo m/z 105.',
    compounds: [
      {
        id: 'acetone_ket',
        name: 'Acetona (Propanona)',
        formula: 'C₃H₆O',
        molarMass: 58,
        description: 'La cetona más simple; ruptura alfa simétrica que genera el catión acetilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 58,
        peaks: [
          { mz: 15, relativeAbundance: 35, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 27, relativeAbundance: 14, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 42, relativeAbundance: 9, fragmentFormula: '[CH₂CO]⁺•', description: 'Ceteno por pérdida de CH₄.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo estabilizado por resonancia.', isBasePeak: true },
          { mz: 58, relativeAbundance: 26, fragmentFormula: '[C₃H₆O]⁺•', description: 'Ion molecular intacto.', isMolecularIon: true }
        ]
      },
      {
        id: 'butanone',
        name: 'Butanona (MEK - Metil Etil Cetona)',
        formula: 'C₄H₈O',
        molarMass: 72,
        description: 'Cetona asimétrica; la pérdida preferencial del grupo etilo (más voluminoso) genera el catión acetilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 72,
        peaks: [
          { mz: 15, relativeAbundance: 12, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 29, relativeAbundance: 38, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: pérdida del radical etilo C₂H₅•.', isBasePeak: true },
          { mz: 57, relativeAbundance: 18, fragmentFormula: '[C₂H₅-C≡O]⁺', description: 'Catión propionilo por pérdida de metilo.' },
          { mz: 72, relativeAbundance: 22, fragmentFormula: '[C₄H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_pentanone',
        name: '2-Pentanona',
        formula: 'C₅H₁₀O',
        molarMass: 86,
        description: 'Metilcetona con hidrógeno gamma; McLafferty rinde m/z 58 y la ruptura alfa rinde el pico base m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 86,
        peaks: [
          { mz: 27, relativeAbundance: 20, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: pérdida del grupo propilo C₃H₇•.', isBasePeak: true },
          { mz: 58, relativeAbundance: 68, fragmentFormula: '[CH₂=C(OH)CH₃]⁺•', description: 'Reordenamiento de McLafferty con pérdida de etileno (C₂H₄, 28 Da).' },
          { mz: 71, relativeAbundance: 15, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 86, relativeAbundance: 24, fragmentFormula: '[C₅H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'three_pentanone',
        name: '3-Pentanona (Dietil Cetona)',
        formula: 'C₅H₁₀O',
        molarMass: 86,
        description: 'Cetona simétrica de 5 carbonos; ruptura alfa expulsando etilo para generar el catión propionilo m/z 57 como pico base.',
        basePeakMz: 57,
        molecularIonMz: 86,
        peaks: [
          { mz: 29, relativeAbundance: 45, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[CH₃CH₂-C≡O]⁺', description: 'Pico base: catión propionilo por pérdida de C₂H₅•.', isBasePeak: true },
          { mz: 86, relativeAbundance: 32, fragmentFormula: '[C₅H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'three_methyl_two_butanone',
        name: '3-Metil-2-butanona',
        formula: 'C₅H₁₀O',
        molarMass: 86,
        description: 'Metilcetona ramificada; la pérdida del grupo isopropilo genera el catión acetilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 86,
        peaks: [
          { mz: 27, relativeAbundance: 18, fragmentFormula: '[C₂H₃]⁺', description: 'Alifático.' },
          { mz: 41, relativeAbundance: 35, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺ / [C₃H₇]⁺', description: 'Pico base doble: acetilo y carbocatión isopropilo.', isBasePeak: true },
          { mz: 71, relativeAbundance: 28, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 86, relativeAbundance: 18, fragmentFormula: '[C₅H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_hexanone',
        name: '2-Hexanona',
        formula: 'C₆H₁₂O',
        molarMass: 100,
        description: 'Metilcetona lineal de 6C; reordenamiento de McLafferty muy intenso en m/z 58 y pico base acetilo m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 100,
        peaks: [
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo.', isBasePeak: true },
          { mz: 58, relativeAbundance: 82, fragmentFormula: '[CH₂=C(OH)CH₃]⁺•', description: 'Reordenamiento de McLafferty con pérdida de propileno (C₃H₆, 42 Da).' },
          { mz: 85, relativeAbundance: 18, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 100, relativeAbundance: 12, fragmentFormula: '[C₆H₁₂O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'three_hexanone',
        name: '3-Hexanona',
        formula: 'C₆H₁₂O',
        molarMass: 100,
        description: 'Etilcetona asimétrica; reordenamiento de McLafferty en m/z 72 y pico base propionilo m/z 57.',
        basePeakMz: 57,
        molecularIonMz: 100,
        peaks: [
          { mz: 29, relativeAbundance: 38, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₂H₅-C≡O]⁺', description: 'Pico base: catión propionilo por pérdida de propilo.', isBasePeak: true },
          { mz: 72, relativeAbundance: 68, fragmentFormula: '[CH₂=C(OH)C₂H₅]⁺•', description: 'Reordenamiento de McLafferty con pérdida de etileno.' },
          { mz: 100, relativeAbundance: 15, fragmentFormula: '[C₆H₁₂O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'mibk',
        name: 'MIBK (4-Metil-2-pentanona)',
        formula: 'C₆H₁₂O',
        molarMass: 100,
        description: 'Solvente industrial; ruptura alfa perdiendo el radical isobutilo rindiendo el catión acetilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 100,
        peaks: [
          { mz: 41, relativeAbundance: 32, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo.', isBasePeak: true },
          { mz: 58, relativeAbundance: 45, fragmentFormula: '[CH₂=C(OH)CH₃]⁺•', description: 'McLafferty con pérdida de propeno.' },
          { mz: 85, relativeAbundance: 58, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 100, relativeAbundance: 14, fragmentFormula: '[C₆H₁₂O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'pinacolone',
        name: 'Pinacolona (3,3-Dimetil-2-butanona)',
        formula: 'C₆H₁₂O',
        molarMass: 100,
        description: 'Metilcetona estéricamente impedida; la ruptura del enlace central expulsa t-butilo rindiendo m/z 57 como base.',
        basePeakMz: 57,
        molecularIonMz: 100,
        peaks: [
          { mz: 41, relativeAbundance: 42, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 75, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Catión acetilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C(CH₃)₃]⁺', description: 'Pico base: carbocatión t-butilo de gran estabilidad.', isBasePeak: true },
          { mz: 85, relativeAbundance: 12, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 100, relativeAbundance: 8, fragmentFormula: '[C₆H₁₂O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_heptanone',
        name: '2-Heptanona',
        formula: 'C₇H₁₄O',
        molarMass: 114,
        description: 'Metilcetona lineal de 7C; acetilo en m/z 43 como pico base y McLafferty en m/z 58.',
        basePeakMz: 43,
        molecularIonMz: 114,
        peaks: [
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: acetilo.', isBasePeak: true },
          { mz: 58, relativeAbundance: 78, fragmentFormula: '[CH₂=C(OH)CH₃]⁺•', description: 'McLafferty con pérdida de 1-buteno.' },
          { mz: 71, relativeAbundance: 35, fragmentFormula: '[C₅H₁₁]⁺', description: 'Pentilo.' },
          { mz: 99, relativeAbundance: 18, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 114, relativeAbundance: 6, fragmentFormula: '[C₇H₁₄O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'four_heptanone',
        name: '4-Heptanona (Dipropil Cetona)',
        formula: 'C₇H₁₄O',
        molarMass: 114,
        description: 'Cetona simétrica de 7C; pérdida de propilo rindiendo el catión butirilo m/z 71 como pico base.',
        basePeakMz: 71,
        molecularIonMz: 114,
        peaks: [
          { mz: 43, relativeAbundance: 75, fragmentFormula: '[C₃H₇]⁺', description: 'Propilo.' },
          { mz: 71, relativeAbundance: 100, fragmentFormula: '[C₃H₇-C≡O]⁺', description: 'Pico base: catión butirilo.', isBasePeak: true },
          { mz: 86, relativeAbundance: 45, fragmentFormula: '[CH₂=C(OH)C₃H₇]⁺•', description: 'McLafferty con pérdida de etileno.' },
          { mz: 114, relativeAbundance: 16, fragmentFormula: '[C₇H₁₄O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclopentanone',
        name: 'Ciclopentanona',
        formula: 'C₅H₈O',
        molarMass: 84,
        description: 'Cetona cíclica; descarbonilación y retro-cicloadición con pérdida de monóxido de carbono (CO) o etileno.',
        basePeakMz: 55,
        molecularIonMz: 84,
        peaks: [
          { mz: 28, relativeAbundance: 38, fragmentFormula: '[CO]⁺•', description: 'Monóxido de carbono.' },
          { mz: 55, relativeAbundance: 100, fragmentFormula: '[C₄H₇]⁺', description: 'Pico base: pérdida de CO y H• tras apertura de anillo.', isBasePeak: true },
          { mz: 56, relativeAbundance: 72, fragmentFormula: '[C₃H₄O]⁺•', description: 'Pérdida de etileno (C₂H₄).' },
          { mz: 84, relativeAbundance: 85, fragmentFormula: '[C₅H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclohexanone',
        name: 'Ciclohexanona',
        formula: 'C₆H₁₀O',
        molarMass: 98,
        description: 'Cetona cíclica de 6 miembros; pico base en m/z 55 y pérdida de etileno en m/z 70.',
        basePeakMz: 55,
        molecularIonMz: 98,
        peaks: [
          { mz: 42, relativeAbundance: 48, fragmentFormula: '[C₃H₆]⁺•', description: 'Alifático.' },
          { mz: 55, relativeAbundance: 100, fragmentFormula: '[C₄H₇]⁺', description: 'Pico base: escisión del anillo con pérdida de acetilo radicalario.', isBasePeak: true },
          { mz: 69, relativeAbundance: 52, fragmentFormula: '[C₅H₉]⁺', description: 'Pérdida de formilo.' },
          { mz: 70, relativeAbundance: 42, fragmentFormula: '[C₄H₆O]⁺•', description: 'Pérdida de etileno (C₂H₄).' },
          { mz: 98, relativeAbundance: 78, fragmentFormula: '[C₆H₁₀O]⁺•', description: 'Ion molecular muy intenso.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_methylcyclohexanone',
        name: '2-Metilciclohexanona',
        formula: 'C₇H₁₂O',
        molarMass: 112,
        description: 'Ciclohexanona metilada; fragmentación asimétrica rindiendo pico base en m/z 55 o 69.',
        basePeakMz: 55,
        molecularIonMz: 112,
        peaks: [
          { mz: 41, relativeAbundance: 42, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 55, relativeAbundance: 100, fragmentFormula: '[C₄H₇]⁺', description: 'Pico base alifático.', isBasePeak: true },
          { mz: 69, relativeAbundance: 68, fragmentFormula: '[C₅H₉]⁺', description: 'Fragmentación del anillo.' },
          { mz: 97, relativeAbundance: 35, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 112, relativeAbundance: 65, fragmentFormula: '[C₇H₁₂O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'acetophenone',
        name: 'Acetofenona',
        formula: 'C₈H₈O',
        molarMass: 120,
        description: 'Fenilmetilcetona; pérdida del grupo metilo rindiendo el catión benzoílo m/z 105 como pico base y descarbonilación a fenilo m/z 77.',
        basePeakMz: 105,
        molecularIonMz: 120,
        peaks: [
          { mz: 51, relativeAbundance: 45, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 88, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo por pérdida de monóxido de carbono (CO, 28 Da).' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡O]⁺', description: 'Pico base: catión benzoílo resonante por pérdida de metilo CH₃•.', isBasePeak: true },
          { mz: 120, relativeAbundance: 38, fragmentFormula: '[C₈H₈O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'propiophenone',
        name: 'Propiofenona',
        formula: 'C₉H₁₀O',
        molarMass: 134,
        description: 'Feniletilcetona; la pérdida del grupo etilo produce cuantitativamente el catión benzoílo m/z 105 como pico base.',
        basePeakMz: 105,
        molecularIonMz: 134,
        peaks: [
          { mz: 51, relativeAbundance: 32, fragmentFormula: '[C₄H₃]⁺', description: 'Aromático.' },
          { mz: 77, relativeAbundance: 68, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡O]⁺', description: 'Pico base: catión benzoílo por pérdida de etilo C₂H₅•.', isBasePeak: true },
          { mz: 134, relativeAbundance: 25, fragmentFormula: '[C₉H₁₀O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'benzophenone',
        name: 'Benzofenona',
        formula: 'C₁₃H₁₀O',
        molarMass: 182,
        description: 'Diarilcetona simétrica; ion molecular muy intenso y pico base en catión benzoílo m/z 105 tras perder fenilo.',
        basePeakMz: 105,
        molecularIonMz: 182,
        peaks: [
          { mz: 51, relativeAbundance: 28, fragmentFormula: '[C₄H₃]⁺', description: 'Aromático.' },
          { mz: 77, relativeAbundance: 78, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡O]⁺', description: 'Pico base: catión benzoílo por pérdida del radical fenilo C₆H₅•.', isBasePeak: true },
          { mz: 181, relativeAbundance: 35, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 182, relativeAbundance: 82, fragmentFormula: '[C₁₃H₁₀O]⁺•', description: 'Ion molecular muy estable.', isMolecularIon: true }
        ]
      },
      {
        id: 'camphor',
        name: 'Alcanfor',
        formula: 'C₁₀H₁₆O',
        molarMass: 152,
        description: 'Cetona monoterpénica bicíclica; pico base en m/z 95 por pérdida de metilo y CO con reordenamiento del puente.',
        basePeakMz: 95,
        molecularIonMz: 152,
        peaks: [
          { mz: 41, relativeAbundance: 45, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 69, relativeAbundance: 58, fragmentFormula: '[C₅H₉]⁺', description: 'Fragmento terpénico.' },
          { mz: 81, relativeAbundance: 75, fragmentFormula: '[C₆H₉]⁺', description: 'Fragmento alifático bicíclico.' },
          { mz: 95, relativeAbundance: 100, fragmentFormula: '[C₇H₁₁]⁺', description: 'Pico base: pérdida de puente carbonilo y metilos.', isBasePeak: true },
          { mz: 108, relativeAbundance: 42, fragmentFormula: '[C₇H₈O]⁺•', description: 'Pérdida de propeno.' },
          { mz: 152, relativeAbundance: 38, fragmentFormula: '[C₁₀H₁₆O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'carvone',
        name: 'Carvona',
        formula: 'C₁₀H₁₄O',
        molarMass: 150,
        description: 'Monoterpeno cetona de hierbabuena/alcaravea; pico base en m/z 82 por retro-Diels-Alder.',
        basePeakMz: 82,
        molecularIonMz: 150,
        peaks: [
          { mz: 54, relativeAbundance: 48, fragmentFormula: '[C₄H₆]⁺•', description: 'Fragmento de dieno.' },
          { mz: 82, relativeAbundance: 100, fragmentFormula: '[C₅H₆O]⁺•', description: 'Pico base: retro-Diels-Alder perdiendo isopreno.', isBasePeak: true },
          { mz: 108, relativeAbundance: 55, fragmentFormula: '[C₇H₈O]⁺•', description: 'Pérdida de propileno.' },
          { mz: 135, relativeAbundance: 32, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 150, relativeAbundance: 25, fragmentFormula: '[C₁₀H₁₄O]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'diacetyl',
        name: 'Diacetilo (2,3-Butanodiona)',
        formula: 'C₄H₆O₂',
        molarMass: 86,
        description: 'alfa-Dicetona de aroma a mantequilla; escisión central simétrica que rinde cuantitativamente el catión acetilo m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 86,
        peaks: [
          { mz: 15, relativeAbundance: 25, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 42, relativeAbundance: 15, fragmentFormula: '[CH₂CO]⁺•', description: 'Ceteno.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base simétrico: ruptura del enlace central C-C entre carbonilos.', isBasePeak: true },
          { mz: 86, relativeAbundance: 18, fragmentFormula: '[C₄H₆O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      }
    ]
  },

  // 8. ÁCIDOS CARBOXÍLICOS (20 ejemplos)
  {
    id: 'carboxylic_acids',
    name: 'Ácidos Carboxílicos',
    iconName: 'Activity',
    generalFormula: 'R-COOH',
    spectralSignature: 'Ruptura alfa perdiendo el radical hidroxilo [M – 17]⁺ (catión acilio [R-C≡O]⁺) o perdiendo el radical carboxilo [M – 45]⁺; reordenamiento de McLafferty indispensable en ácidos con hidrógeno gamma produciendo el ion base m/z 60 [CH₂=C(OH)₂]⁺• (ácido acético ionizado); ácidos aromáticos pierden OH (m/z 105) y luego CO (m/z 77).',
    compounds: [
      {
        id: 'formic_acid',
        name: 'Ácido Fórmico (Metanoico)',
        formula: 'CH₂O₂',
        molarMass: 46,
        description: 'El ácido carboxílico más elemental; ion molecular m/z 46 y pérdida de OH• rindiendo el catión formilo m/z 29.',
        basePeakMz: 46,
        molecularIonMz: 46,
        peaks: [
          { mz: 17, relativeAbundance: 20, fragmentFormula: '[OH]⁺', description: 'Hidroxilo.' },
          { mz: 28, relativeAbundance: 35, fragmentFormula: '[CO]⁺•', description: 'Pérdida de agua.' },
          { mz: 29, relativeAbundance: 78, fragmentFormula: '[HCO]⁺', description: 'Catión formilo por pérdida de OH•.' },
          { mz: 45, relativeAbundance: 82, fragmentFormula: '[HCOO]⁺', description: 'Pérdida de protón [M - H]⁺.' },
          { mz: 46, relativeAbundance: 100, fragmentFormula: '[CH₂O₂]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'acetic_acid',
        name: 'Ácido Acético (Etanoico)',
        formula: 'C₂H₄O₂',
        molarMass: 60,
        description: 'Ácido acético de vinagre; pérdida de hidroxilo OH• formando el catión acetilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 60,
        peaks: [
          { mz: 15, relativeAbundance: 32, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo por pérdida de radical hidroxilo OH•.', isBasePeak: true },
          { mz: 45, relativeAbundance: 88, fragmentFormula: '[COOH]⁺', description: 'Catión carboxilo por pérdida de metilo.' },
          { mz: 60, relativeAbundance: 75, fragmentFormula: '[C₂H₄O₂]⁺•', description: 'Ion molecular muy estable.', isMolecularIon: true }
        ]
      },
      {
        id: 'propionic_acid',
        name: 'Ácido Propiónico',
        formula: 'C₃H₆O₂',
        molarMass: 74,
        description: 'Ácido de tres carbonos; pico base m/z 73 [M-H]+ o catión propionilo m/z 57 y carboxilo m/z 45.',
        basePeakMz: 73,
        molecularIonMz: 74,
        peaks: [
          { mz: 28, relativeAbundance: 35, fragmentFormula: '[C₂H₄]⁺•', description: 'Etileno.' },
          { mz: 29, relativeAbundance: 42, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 45, relativeAbundance: 58, fragmentFormula: '[COOH]⁺', description: 'Catión carboxilo.' },
          { mz: 57, relativeAbundance: 78, fragmentFormula: '[C₂H₅-C≡O]⁺', description: 'Catión propionilo por pérdida de OH•.' },
          { mz: 73, relativeAbundance: 100, fragmentFormula: '[C₃H₅O₂]⁺', description: 'Pico base: pérdida de protón [M - H]⁺.', isBasePeak: true },
          { mz: 74, relativeAbundance: 82, fragmentFormula: '[C₃H₆O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'butyric_acid',
        name: 'Ácido Butírico (Butanoico)',
        formula: 'C₄H₈O₂',
        molarMass: 88,
        description: 'Ácido carboxílico con hidrógeno gamma; reordenamiento de McLafferty total formando el ion m/z 60 como pico base.',
        basePeakMz: 60,
        molecularIonMz: 88,
        peaks: [
          { mz: 27, relativeAbundance: 25, fragmentFormula: '[C₂H₃]⁺', description: 'Fragmento alifático.' },
          { mz: 41, relativeAbundance: 32, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 28, fragmentFormula: '[C₃H₇]⁺', description: 'Propilo.' },
          { mz: 60, relativeAbundance: 100, fragmentFormula: '[CH₂=C(OH)₂]⁺•', description: 'Pico base: reordenamiento de McLafferty con pérdida de etileno (C₂H₄, 28 Da).', isBasePeak: true },
          { mz: 73, relativeAbundance: 35, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 88, relativeAbundance: 8, fragmentFormula: '[C₄H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isobutyric_acid',
        name: 'Ácido Isobutírico',
        formula: 'C₄H₈O₂',
        molarMass: 88,
        description: 'Ácido ramificado sin hidrógeno gamma; el pico base es el carbocatión isopropilo m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 88,
        peaks: [
          { mz: 27, relativeAbundance: 28, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 41, relativeAbundance: 45, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH(CH₃)₂]⁺', description: 'Pico base: carbocatión isopropilo por pérdida de COOH•.', isBasePeak: true },
          { mz: 71, relativeAbundance: 42, fragmentFormula: '[M - OH]⁺', description: 'Catión isobutirilo.' },
          { mz: 88, relativeAbundance: 24, fragmentFormula: '[C₄H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'valeric_acid',
        name: 'Ácido Valérico (Pentanoico)',
        formula: 'C₅H₁₀O₂',
        molarMass: 102,
        description: 'Cadena lineal de 5 carbonos; reordenamiento de McLafferty generando el pico base m/z 60 con pérdida de propeno.',
        basePeakMz: 60,
        molecularIonMz: 102,
        peaks: [
          { mz: 41, relativeAbundance: 35, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 45, relativeAbundance: 22, fragmentFormula: '[COOH]⁺', description: 'Carboxilo.' },
          { mz: 60, relativeAbundance: 100, fragmentFormula: '[CH₂=C(OH)₂]⁺•', description: 'Pico base: McLafferty con pérdida de propeno (C₃H₆, 42 Da).', isBasePeak: true },
          { mz: 73, relativeAbundance: 48, fragmentFormula: '[C₃H₅O₂]⁺', description: 'Ruptura beta.' },
          { mz: 85, relativeAbundance: 28, fragmentFormula: '[M - OH]⁺', description: 'Catión valerilo.' },
          { mz: 102, relativeAbundance: 4, fragmentFormula: '[C₅H₁₀O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'pivalic_acid',
        name: 'Ácido Piválico (Trimetilacético)',
        formula: 'C₅H₁₀O₂',
        molarMass: 102,
        description: 'Carbono terciario adyacente al carboxilo; ruptura heterolítica total generando carbocatión t-butilo m/z 57 como base.',
        basePeakMz: 57,
        molecularIonMz: 102,
        peaks: [
          { mz: 29, relativeAbundance: 18, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 41, relativeAbundance: 42, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C(CH₃)₃]⁺', description: 'Pico base absoluto: carbocatión t-butilo por pérdida de COOH•.', isBasePeak: true },
          { mz: 85, relativeAbundance: 14, fragmentFormula: '[M - OH]⁺', description: 'Catión pivaloílo.' },
          { mz: 102, relativeAbundance: 0.1, fragmentFormula: '[C₅H₁₀O₂]⁺•', description: 'Ion molecular casi indetectable.', isMolecularIon: true }
        ]
      },
      {
        id: 'hexanoic_acid',
        name: 'Ácido Hexanoico (Caproico)',
        formula: 'C₆H₁₂O₂',
        molarMass: 116,
        description: 'Ácido carboxílico graso de 6C; reordenamiento de McLafferty rinde m/z 60 como pico base.',
        basePeakMz: 60,
        molecularIonMz: 116,
        peaks: [
          { mz: 41, relativeAbundance: 38, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 60, relativeAbundance: 100, fragmentFormula: '[CH₂=C(OH)₂]⁺•', description: 'Pico base: McLafferty con pérdida de 1-buteno (56 Da).', isBasePeak: true },
          { mz: 73, relativeAbundance: 55, fragmentFormula: '[C₃H₅O₂]⁺', description: 'Ruptura beta.' },
          { mz: 99, relativeAbundance: 18, fragmentFormula: '[M - OH]⁺', description: 'Catión hexanoílo.' },
          { mz: 116, relativeAbundance: 2, fragmentFormula: '[C₆H₁₂O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'octanoic_acid',
        name: 'Ácido Octanoico (Caprílico)',
        formula: 'C₈H₁₆O₂',
        molarMass: 144,
        description: 'Ácido graso de 8C con pico base persistente de McLafferty en m/z 60.',
        basePeakMz: 60,
        molecularIonMz: 144,
        peaks: [
          { mz: 43, relativeAbundance: 42, fragmentFormula: '[C₃H₇]⁺', description: 'Propilo.' },
          { mz: 57, relativeAbundance: 58, fragmentFormula: '[C₄H₉]⁺', description: 'Butilo.' },
          { mz: 60, relativeAbundance: 100, fragmentFormula: '[CH₂=C(OH)₂]⁺•', description: 'Pico base de McLafferty.', isBasePeak: true },
          { mz: 73, relativeAbundance: 62, fragmentFormula: '[C₃H₅O₂]⁺', description: 'Ruptura beta.' },
          { mz: 144, relativeAbundance: 1, fragmentFormula: '[C₈H₁₆O₂]⁺•', description: 'Ion molecular débil.', isMolecularIon: true }
        ]
      },
      {
        id: 'acrylic_acid',
        name: 'Ácido Acrílico (Propenoico)',
        formula: 'C₃H₄O₂',
        molarMass: 72,
        description: 'Ácido carboxílico insaturado conjugado; ion molecular muy intenso y pérdida de OH• rindiendo catión acriloílo m/z 55.',
        basePeakMz: 72,
        molecularIonMz: 72,
        peaks: [
          { mz: 27, relativeAbundance: 48, fragmentFormula: '[C₂H₃]⁺', description: 'Catión vinilo.' },
          { mz: 45, relativeAbundance: 35, fragmentFormula: '[COOH]⁺', description: 'Carboxilo.' },
          { mz: 55, relativeAbundance: 78, fragmentFormula: '[CH₂=CH-C≡O]⁺', description: 'Catión acriloílo por pérdida de OH•.' },
          { mz: 71, relativeAbundance: 32, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 72, relativeAbundance: 100, fragmentFormula: '[C₃H₄O₂]⁺•', description: 'Ion molecular y pico base por resonancia.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'methacrylic_acid',
        name: 'Ácido Metacrílico',
        formula: 'C₄H₆O₂',
        molarMass: 86,
        description: 'Monómero de polímeros acrílicos; pico base en catión metacriloílo m/z 41 e ion molecular m/z 86.',
        basePeakMz: 41,
        molecularIonMz: 86,
        peaks: [
          { mz: 39, relativeAbundance: 42, fragmentFormula: '[C₃H₃]⁺', description: 'Propargilo.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[C₃H₅]⁺', description: 'Pico base: catión isopropenilo/alilo tras descarboxilación.', isBasePeak: true },
          { mz: 69, relativeAbundance: 75, fragmentFormula: '[CH₂=C(CH₃)CO]⁺', description: 'Catión metacriloílo por pérdida de OH•.' },
          { mz: 86, relativeAbundance: 68, fragmentFormula: '[C₄H₆O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'benzoic_acid',
        name: 'Ácido Benzoico',
        formula: 'C₇H₆O₂',
        molarMass: 122,
        description: 'Ácido carboxílico aromático clásico; pérdida de OH• rinde el catión benzoílo m/z 105 como pico base y pérdida de CO rinde fenilo m/z 77.',
        basePeakMz: 105,
        molecularIonMz: 122,
        peaks: [
          { mz: 51, relativeAbundance: 45, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 82, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo tras descarbonilación del benzoílo.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡O]⁺', description: 'Pico base: catión benzoílo por pérdida de radical OH•.', isBasePeak: true },
          { mz: 121, relativeAbundance: 48, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 122, relativeAbundance: 85, fragmentFormula: '[C₇H₆O₂]⁺•', description: 'Ion molecular muy estable.', isMolecularIon: true }
        ]
      },
      {
        id: 'o_toluic_acid',
        name: 'Ácido o-Toluico (2-Metilbenzoico)',
        formula: 'C₈H₈O₂',
        molarMass: 136,
        description: 'Efecto orto en espectrometría: pérdida masiva de agua intramolecular formando la lactona ionizada m/z 118.',
        basePeakMz: 119,
        molecularIonMz: 136,
        peaks: [
          { mz: 91, relativeAbundance: 78, fragmentFormula: '[C₇H₇]⁺', description: 'Tropilio.' },
          { mz: 118, relativeAbundance: 88, fragmentFormula: '[C₈H₆O]⁺•', description: 'Pérdida de agua por efecto orto intramolecular.' },
          { mz: 119, relativeAbundance: 100, fragmentFormula: '[CH₃-C₆H₄-CO]⁺', description: 'Pico base: catión toluoílo por pérdida de OH•.', isBasePeak: true },
          { mz: 136, relativeAbundance: 72, fragmentFormula: '[C₈H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'phenylacetic_acid',
        name: 'Ácido Fenilacético',
        formula: 'C₈H₈O₂',
        molarMass: 136,
        description: 'Ácido aromático bencílico; descarboxilación cuantitativa generando el catión tropilio m/z 91 como pico base.',
        basePeakMz: 91,
        molecularIonMz: 136,
        peaks: [
          { mz: 65, relativeAbundance: 28, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento de tropilio.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base: catión tropilio por pérdida de COOH•.', isBasePeak: true },
          { mz: 92, relativeAbundance: 65, fragmentFormula: '[C₇H₈]⁺•', description: 'Reordenamiento de McLafferty aromático.' },
          { mz: 136, relativeAbundance: 38, fragmentFormula: '[C₈H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'salicylic_acid',
        name: 'Ácido Salicílico (2-Hidroxibenzoico)',
        formula: 'C₇H₆O₃',
        molarMass: 138,
        description: 'Precursor de aspirina; efecto orto con pérdida de agua (m/z 120) y pico base en m/z 120 o ion molecular.',
        basePeakMz: 120,
        molecularIonMz: 138,
        peaks: [
          { mz: 65, relativeAbundance: 35, fragmentFormula: '[C₅H₅]⁺', description: 'Ciclopentadienilo.' },
          { mz: 92, relativeAbundance: 58, fragmentFormula: '[C₆H₄O]⁺•', description: 'Pérdida de CO desde el ion salicilo.' },
          { mz: 120, relativeAbundance: 100, fragmentFormula: '[C₇H₄O₂]⁺•', description: 'Pico base: pérdida orto concertada de H₂O (18 Da).', isBasePeak: true },
          { mz: 138, relativeAbundance: 82, fragmentFormula: '[C₇H₆O₃]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cinnamic_acid',
        name: 'Ácido Cinámico',
        formula: 'C₉H₈O₂',
        molarMass: 148,
        description: 'Ácido alfa,beta-insaturado aromático; ion molecular base (100%) y pérdida de OH• rindiendo m/z 131.',
        basePeakMz: 147,
        molecularIonMz: 148,
        peaks: [
          { mz: 77, relativeAbundance: 38, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 103, relativeAbundance: 58, fragmentFormula: '[C₈H₇]⁺', description: 'Descarboxilación con pérdida de CO₂.' },
          { mz: 131, relativeAbundance: 82, fragmentFormula: '[C₆H₅-CH=CH-CO]⁺', description: 'Catión cinamoílo por pérdida de OH•.' },
          { mz: 147, relativeAbundance: 100, fragmentFormula: '[M - H]⁺', description: 'Pico base: desprotonación del ácido conjugado.', isBasePeak: true },
          { mz: 148, relativeAbundance: 95, fragmentFormula: '[C₉H₈O₂]⁺•', description: 'Ion molecular muy intenso.', isMolecularIon: true }
        ]
      },
      {
        id: 'oxalic_acid',
        name: 'Ácido Oxálico',
        formula: 'C₂H₂O₄',
        molarMass: 90,
        description: 'Ácido dicarboxílico simétrico; descarboxilación y pérdida de agua rindiendo m/z 45 [COOH]+ como pico base.',
        basePeakMz: 45,
        molecularIonMz: 90,
        peaks: [
          { mz: 17, relativeAbundance: 25, fragmentFormula: '[OH]⁺', description: 'Hidroxilo.' },
          { mz: 28, relativeAbundance: 48, fragmentFormula: '[CO]⁺•', description: 'Monóxido de carbono.' },
          { mz: 44, relativeAbundance: 68, fragmentFormula: '[CO₂]⁺•', description: 'Dióxido de carbono.' },
          { mz: 45, relativeAbundance: 100, fragmentFormula: '[COOH]⁺', description: 'Pico base simétrico: escisión del enlace C-C central.', isBasePeak: true },
          { mz: 90, relativeAbundance: 2, fragmentFormula: '[C₂H₂O₄]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'succinic_acid',
        name: 'Ácido Succínico (Butanodioico)',
        formula: 'C₄H₆O₄',
        molarMass: 118,
        description: 'Ácido dicarboxílico de 4C; deshidratación cíclica rápida formando el anhídrido succínico m/z 100.',
        basePeakMz: 28,
        molecularIonMz: 118,
        peaks: [
          { mz: 28, relativeAbundance: 100, fragmentFormula: '[CO]⁺•', description: 'Pico base: descarbonilación.', isBasePeak: true },
          { mz: 42, relativeAbundance: 45, fragmentFormula: '[CH₂CO]⁺•', description: 'Ceteno.' },
          { mz: 55, relativeAbundance: 65, fragmentFormula: '[C₃H₃O]⁺', description: 'Fragmento acíclico.' },
          { mz: 100, relativeAbundance: 82, fragmentFormula: '[C₄H₄O₃]⁺•', description: 'Pérdida de agua formando anhídrido succínico ionizado [M - H₂O]⁺•.' },
          { mz: 118, relativeAbundance: 1, fragmentFormula: '[C₄H₆O₄]⁺•', description: 'Ion molecular tenue.', isMolecularIon: true }
        ]
      },
      {
        id: 'lactic_acid',
        name: 'Ácido Láctico (2-Hidroxipropanoico)',
        formula: 'C₃H₆O₃',
        molarMass: 90,
        description: 'alfa-Hidroxiácido; ruptura alfa entre C1 y C2 formando el ion oxonio hidroximetilo m/z 45 como pico base.',
        basePeakMz: 45,
        molecularIonMz: 90,
        peaks: [
          { mz: 15, relativeAbundance: 20, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 43, relativeAbundance: 38, fragmentFormula: '[C₂H₃O]⁺', description: 'Acetilo.' },
          { mz: 45, relativeAbundance: 100, fragmentFormula: '[CH₃-CH=OH]⁺', description: 'Pico base: ruptura alfa perdiendo carboxilo COOH•.', isBasePeak: true },
          { mz: 72, relativeAbundance: 22, fragmentFormula: '[M - H₂O]⁺•', description: 'Pérdida de agua.' },
          { mz: 90, relativeAbundance: 3, fragmentFormula: '[C₃H₆O₃]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'levulinic_acid',
        name: 'Ácido Levulínico (4-Oxopentanoico)',
        formula: 'C₅H₈O₃',
        molarMass: 116,
        description: 'Cetoácido; ruptura alfa carbonílica rindiendo el catión acetilo m/z 43 como pico base y McLafferty en m/z 56.',
        basePeakMz: 43,
        molecularIonMz: 116,
        peaks: [
          { mz: 27, relativeAbundance: 22, fragmentFormula: '[C₂H₃]⁺', description: 'Alifático.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo.', isBasePeak: true },
          { mz: 56, relativeAbundance: 68, fragmentFormula: '[C₃H₄O]⁺•', description: 'Fragmento de ceteno.' },
          { mz: 98, relativeAbundance: 42, fragmentFormula: '[M - H₂O]⁺•', description: 'Deshidratación concertada.' },
          { mz: 116, relativeAbundance: 8, fragmentFormula: '[C₅H₈O₃]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      }
    ]
  }
];
