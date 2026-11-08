import { FunctionalGroupCategory } from './functionalGroupsData';

export const FUNCTIONAL_GROUPS_PART3: FunctionalGroupCategory[] = [
  // 9. ÉSTERES (20 ejemplos)
  {
    id: 'esters',
    name: 'Ésteres',
    iconName: 'Sparkles',
    generalFormula: 'R-COO-R\'',
    spectralSignature: 'Doble ruptura alfa: pérdida del radical alcoxi (–OR\') formando catión acilio [R-C≡O]⁺ (ej. m/z 43 [CH₃CO]⁺ en acetatos) o pérdida del radical acilo; reordenamiento de McLafferty cuando la cadena del ácido o del alcohol contiene hidrógenos gamma (picos característicos en m/z 74 [CH₂=C(OH)OCH₃]⁺• en ésteres metílicos, m/z 88 en etílicos); benzoatos rinden catión benzoílo m/z 105.',
    compounds: [
      {
        id: 'methyl_formate',
        name: 'Formiato de Metilo',
        formula: 'C₂H₄O₂',
        molarMass: 60,
        description: 'Éster fórmico elemental; pérdida del radical metoxi rinde el catión formilo m/z 29 y el pico base es m/z 31 [CH3O]+ o m/z 60.',
        basePeakMz: 31,
        molecularIonMz: 60,
        peaks: [
          { mz: 15, relativeAbundance: 25, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 29, relativeAbundance: 78, fragmentFormula: '[HCO]⁺', description: 'Catión formilo por pérdida de metoxi.' },
          { mz: 31, relativeAbundance: 100, fragmentFormula: '[CH₃O]⁺', description: 'Pico base: catión metoxi por escisión heterolítica del enlace acilo-oxígeno.', isBasePeak: true },
          { mz: 59, relativeAbundance: 35, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón formilo.' },
          { mz: 60, relativeAbundance: 68, fragmentFormula: '[C₂H₄O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethyl_formate',
        name: 'Formiato de Etilo',
        formula: 'C₃H₆O₂',
        molarMass: 74,
        description: 'Aroma de ron; reordenamiento de McLafferty en el grupo etilo con pérdida de etileno formando ácido fórmico ionizado m/z 46.',
        basePeakMz: 31,
        molecularIonMz: 74,
        peaks: [
          { mz: 29, relativeAbundance: 68, fragmentFormula: '[C₂H₅]⁺ / [HCO]⁺', description: 'Etilo / formilo.' },
          { mz: 31, relativeAbundance: 100, fragmentFormula: '[CH₂=OH]⁺', description: 'Pico base oxonio.', isBasePeak: true },
          { mz: 46, relativeAbundance: 48, fragmentFormula: '[HCOOH]⁺•', description: 'Pérdida de etileno (C₂H₄, 28 Da) desde el grupo etoxi.' },
          { mz: 74, relativeAbundance: 35, fragmentFormula: '[C₃H₆O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'methyl_acetate',
        name: 'Acetato de Metilo',
        formula: 'C₃H₆O₂',
        molarMass: 74,
        description: 'Éster metílico simple; pérdida de metoxi (–31 Da) rindiendo el catión acetilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 74,
        peaks: [
          { mz: 15, relativeAbundance: 32, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 31, relativeAbundance: 28, fragmentFormula: '[CH₃O]⁺', description: 'Metoxi.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo por pérdida del radical metoxi CH₃O•.', isBasePeak: true },
          { mz: 59, relativeAbundance: 42, fragmentFormula: '[COOCH₃]⁺', description: 'Catión carboximetilo por pérdida de metilo C2.' },
          { mz: 74, relativeAbundance: 58, fragmentFormula: '[C₃H₆O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethyl_acetate',
        name: 'Acetato de Etilo',
        formula: 'C₄H₈O₂',
        molarMass: 88,
        description: 'Solvente industrial y aroma frutal; pérdida de etoxi formando catión acetilo m/z 43 como pico base y reordenamiento a ácido acético m/z 61.',
        basePeakMz: 43,
        molecularIonMz: 88,
        peaks: [
          { mz: 29, relativeAbundance: 38, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo por expulsión de radical etoxi (C₂H₅O•, 45 Da).', isBasePeak: true },
          { mz: 45, relativeAbundance: 22, fragmentFormula: '[C₂H₅O]⁺', description: 'Catión etoxi.' },
          { mz: 61, relativeAbundance: 55, fragmentFormula: '[CH₃COOH₂]⁺', description: 'Ácido acético protonado por transferencia de hidrógeno de etilo con pérdida de etileno.' },
          { mz: 73, relativeAbundance: 18, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 88, relativeAbundance: 8, fragmentFormula: '[C₄H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'propyl_acetate',
        name: 'Acetato de Propilo',
        formula: 'C₅H₁₀O₂',
        molarMass: 102,
        description: 'Aroma de peras; catión acetilo m/z 43 como pico base y McLafferty en el grupo propilo rindiendo m/z 61.',
        basePeakMz: 43,
        molecularIonMz: 102,
        peaks: [
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo.', isBasePeak: true },
          { mz: 61, relativeAbundance: 82, fragmentFormula: '[CH₃COOH₂]⁺', description: 'Pérdida de propileno (C₃H₆, 42 Da) por reordenamiento.' },
          { mz: 73, relativeAbundance: 22, fragmentFormula: '[C₃H₅O₂]⁺', description: 'Pérdida de etilo.' },
          { mz: 102, relativeAbundance: 2, fragmentFormula: '[C₅H₁₀O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isopropyl_acetate',
        name: 'Acetato de Isopropilo',
        formula: 'C₅H₁₀O₂',
        molarMass: 102,
        description: 'Éster ramificado; pico base acetilo m/z 43 y carbocatión isopropilo m/z 43 con ácido acético m/z 61.',
        basePeakMz: 43,
        molecularIonMz: 102,
        peaks: [
          { mz: 41, relativeAbundance: 35, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺ / [C₃H₇]⁺', description: 'Pico base doble: acetilo y carbocatión isopropilo terciario.', isBasePeak: true },
          { mz: 61, relativeAbundance: 65, fragmentFormula: '[CH₃COOH₂]⁺', description: 'Pérdida de propeno.' },
          { mz: 87, relativeAbundance: 18, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 102, relativeAbundance: 1, fragmentFormula: '[C₅H₁₀O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'butyl_acetate',
        name: 'Acetato de Butilo',
        formula: 'C₆H₁₂O₂',
        molarMass: 116,
        description: 'Solvente para lacas y fragancia de manzana; pico base en m/z 43 y m/z 56 (catión buteno).',
        basePeakMz: 43,
        molecularIonMz: 116,
        peaks: [
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo.', isBasePeak: true },
          { mz: 56, relativeAbundance: 68, fragmentFormula: '[C₄H₈]⁺•', description: 'Catión buteno por pérdida de ácido acético.' },
          { mz: 61, relativeAbundance: 78, fragmentFormula: '[CH₃COOH₂]⁺', description: 'Ácido acético protonado por reordenamiento.' },
          { mz: 73, relativeAbundance: 25, fragmentFormula: '[C₃H₅O₂]⁺', description: 'Fragmento carboxilo.' },
          { mz: 116, relativeAbundance: 0.5, fragmentFormula: '[C₆H₁₂O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isobutyl_acetate',
        name: 'Acetato de Isobutilo',
        formula: 'C₆H₁₂O₂',
        molarMass: 116,
        description: 'Aroma de plátano/fresa; acetilo m/z 43 como pico base y catión isobutilo m/z 57.',
        basePeakMz: 43,
        molecularIonMz: 116,
        peaks: [
          { mz: 41, relativeAbundance: 42, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo.', isBasePeak: true },
          { mz: 57, relativeAbundance: 65, fragmentFormula: '[C₄H₉]⁺', description: 'Carbocatión isobutilo.' },
          { mz: 61, relativeAbundance: 58, fragmentFormula: '[CH₃COOH₂]⁺', description: 'Ácido acético protonado.' },
          { mz: 116, relativeAbundance: 0.3, fragmentFormula: '[C₆H₁₂O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isoamyl_acetate',
        name: 'Acetato de Isoamilo',
        formula: 'C₇H₁₄O₂',
        molarMass: 130,
        description: 'Aceite de plátano y feromona de alarma de abejas; acetilo m/z 43 como pico base y fragmento isoamilo m/z 70.',
        basePeakMz: 43,
        molecularIonMz: 130,
        peaks: [
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo.', isBasePeak: true },
          { mz: 55, relativeAbundance: 48, fragmentFormula: '[C₄H₇]⁺', description: 'Fragmento alifático.' },
          { mz: 70, relativeAbundance: 78, fragmentFormula: '[C₅H₁₀]⁺•', description: 'Pérdida de ácido acético (60 Da).' },
          { mz: 87, relativeAbundance: 18, fragmentFormula: '[C₄H₇O₂]⁺', description: 'Ruptura alfa.' },
          { mz: 130, relativeAbundance: 0.2, fragmentFormula: '[C₇H₁₄O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'methyl_propionate',
        name: 'Propionato de Metilo',
        formula: 'C₄H₈O₂',
        molarMass: 88,
        description: 'Éster metílico de ácido propiónico; catión propionilo m/z 57 como pico base y McLafferty en m/z 74.',
        basePeakMz: 57,
        molecularIonMz: 88,
        peaks: [
          { mz: 29, relativeAbundance: 38, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₂H₅-C≡O]⁺', description: 'Pico base: catión propionilo por pérdida de metoxi (CH₃O•, 31 Da).', isBasePeak: true },
          { mz: 59, relativeAbundance: 35, fragmentFormula: '[COOCH₃]⁺', description: 'Catión carboximetilo.' },
          { mz: 88, relativeAbundance: 28, fragmentFormula: '[C₄H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethyl_propionate',
        name: 'Propionato de Etilo',
        formula: 'C₅H₁₀O₂',
        molarMass: 102,
        description: 'Aroma de piña; catión propionilo m/z 57 como pico base.',
        basePeakMz: 57,
        molecularIonMz: 102,
        peaks: [
          { mz: 29, relativeAbundance: 45, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₂H₅-C≡O]⁺', description: 'Pico base: catión propionilo por pérdida de etoxi (45 Da).', isBasePeak: true },
          { mz: 75, relativeAbundance: 58, fragmentFormula: '[C₂H₅COOH₂]⁺', description: 'Ácido propiónico protonado por reordenamiento.' },
          { mz: 102, relativeAbundance: 12, fragmentFormula: '[C₅H₁₀O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'methyl_butyrate',
        name: 'Butirato de Metilo',
        formula: 'C₅H₁₀O₂',
        molarMass: 102,
        description: 'Éster metílico de ácido butírico con aroma a manzana; el reordenamiento de McLafferty genera el pico base m/z 74 característico.',
        basePeakMz: 74,
        molecularIonMz: 102,
        peaks: [
          { mz: 43, relativeAbundance: 58, fragmentFormula: '[C₃H₇]⁺', description: 'Propilo.' },
          { mz: 71, relativeAbundance: 78, fragmentFormula: '[C₃H₇-C≡O]⁺', description: 'Catión butirilo por pérdida de metoxi.' },
          { mz: 74, relativeAbundance: 100, fragmentFormula: '[CH₂=C(OH)OCH₃]⁺•', description: 'Pico base de McLafferty: transferencia de H gamma perdiendo etileno (C₂H₄, 28 Da).', isBasePeak: true },
          { mz: 87, relativeAbundance: 25, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo terminal.' },
          { mz: 102, relativeAbundance: 15, fragmentFormula: '[C₅H₁₀O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethyl_butyrate',
        name: 'Butirato de Etilo',
        formula: 'C₆H₁₂O₂',
        molarMass: 116,
        description: 'Aroma de piña/naranja; reordenamiento de McLafferty rinde el pico base m/z 88 característico de ésteres etílicos.',
        basePeakMz: 88,
        molecularIonMz: 116,
        peaks: [
          { mz: 43, relativeAbundance: 48, fragmentFormula: '[C₃H₇]⁺', description: 'Propilo.' },
          { mz: 71, relativeAbundance: 72, fragmentFormula: '[C₃H₇-C≡O]⁺', description: 'Catión butirilo.' },
          { mz: 88, relativeAbundance: 100, fragmentFormula: '[CH₂=C(OH)OC₂H₅]⁺•', description: 'Pico base de McLafferty en la cadena del ácido etílico.', isBasePeak: true },
          { mz: 116, relativeAbundance: 8, fragmentFormula: '[C₆H₁₂O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'methyl_benzoate',
        name: 'Benzoato de Metilo',
        formula: 'C₈H₈O₂',
        molarMass: 136,
        description: 'Éster aromático de aroma a nardo; pérdida de metoxi generando el catión benzoílo m/z 105 como pico base y descarbonilación a fenilo m/z 77.',
        basePeakMz: 105,
        molecularIonMz: 136,
        peaks: [
          { mz: 51, relativeAbundance: 42, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 85, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡O]⁺', description: 'Pico base: catión benzoílo por pérdida de metoxi CH₃O• (31 Da).', isBasePeak: true },
          { mz: 135, relativeAbundance: 18, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 136, relativeAbundance: 78, fragmentFormula: '[C₈H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethyl_benzoate',
        name: 'Benzoato de Etilo',
        formula: 'C₉H₁₀O₂',
        molarMass: 150,
        description: 'Éster etílico aromático; pérdida de etoxi formando el catión benzoílo m/z 105 como pico base.',
        basePeakMz: 105,
        molecularIonMz: 150,
        peaks: [
          { mz: 51, relativeAbundance: 35, fragmentFormula: '[C₄H₃]⁺', description: 'Aromático.' },
          { mz: 77, relativeAbundance: 72, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡O]⁺', description: 'Pico base: catión benzoílo por pérdida de etoxi (45 Da).', isBasePeak: true },
          { mz: 122, relativeAbundance: 45, fragmentFormula: '[C₆H₅COOH]⁺•', description: 'Ácido benzoico por pérdida de etileno.' },
          { mz: 150, relativeAbundance: 42, fragmentFormula: '[C₉H₁₀O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'methyl_salicylate',
        name: 'Salicilato de Metilo',
        formula: 'C₈H₈O₃',
        molarMass: 152,
        description: 'Aceite de gaulteria (wintergreen); efecto orto intermolecular; pico base en m/z 120 por pérdida de metanol (32 Da).',
        basePeakMz: 120,
        molecularIonMz: 152,
        peaks: [
          { mz: 65, relativeAbundance: 32, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento aromático.' },
          { mz: 92, relativeAbundance: 48, fragmentFormula: '[C₆H₄O]⁺•', description: 'Pérdida de CO desde m/z 120.' },
          { mz: 120, relativeAbundance: 100, fragmentFormula: '[C₇H₄O₂]⁺•', description: 'Pico base: pérdida orto de metanol (CH₃OH, 32 Da) rindiendo lactona.', isBasePeak: true },
          { mz: 121, relativeAbundance: 42, fragmentFormula: '[C₇H₅O₂]⁺', description: 'Pérdida de metoxi.' },
          { mz: 152, relativeAbundance: 68, fragmentFormula: '[C₈H₈O₃]⁺•', description: 'Ion molecular muy estable.', isMolecularIon: true }
        ]
      },
      {
        id: 'benzyl_acetate',
        name: 'Acetato de Bencilo',
        formula: 'C₉H₁₀O₂',
        molarMass: 150,
        description: 'Aroma de jazmín; ruptura bencílica con formación dominante del catión tropilio m/z 91 y catión acetilo m/z 43.',
        basePeakMz: 108,
        molecularIonMz: 150,
        peaks: [
          { mz: 43, relativeAbundance: 82, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Catión acetilo.' },
          { mz: 65, relativeAbundance: 25, fragmentFormula: '[C₅H₅]⁺', description: 'Tropilio fragmentado.' },
          { mz: 91, relativeAbundance: 78, fragmentFormula: '[C₇H₇]⁺', description: 'Catión tropilio.' },
          { mz: 108, relativeAbundance: 100, fragmentFormula: '[C₇H₈O]⁺•', description: 'Pico base: pérdida de ceteno (CH₂CO, 42 Da) por reordenamiento con hidrógeno bencílico.', isBasePeak: true },
          { mz: 150, relativeAbundance: 18, fragmentFormula: '[C₉H₁₀O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'methyl_acrylate',
        name: 'Acrilato de Metilo',
        formula: 'C₄H₆O₂',
        molarMass: 86,
        description: 'Éster acrílico conjugado; catión acriloílo m/z 55 como pico base e ion molecular m/z 86.',
        basePeakMz: 55,
        molecularIonMz: 86,
        peaks: [
          { mz: 27, relativeAbundance: 45, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 31, relativeAbundance: 25, fragmentFormula: '[CH₃O]⁺', description: 'Metoxi.' },
          { mz: 55, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-C≡O]⁺', description: 'Pico base: catión acriloílo por pérdida de metoxi (31 Da).', isBasePeak: true },
          { mz: 85, relativeAbundance: 38, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 86, relativeAbundance: 68, fragmentFormula: '[C₄H₆O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'methyl_methacrylate',
        name: 'Metacrilato de Metilo (MMA)',
        formula: 'C₅H₈O₂',
        molarMass: 100,
        description: 'Monómero de plexiglás (PMMA); pérdida de metoxi generando el catión metacriloílo m/z 69 como pico base.',
        basePeakMz: 69,
        molecularIonMz: 100,
        peaks: [
          { mz: 39, relativeAbundance: 35, fragmentFormula: '[C₃H₃]⁺', description: 'Propargilo.' },
          { mz: 41, relativeAbundance: 82, fragmentFormula: '[C₃H₅]⁺', description: 'Catión alilo tras descarboxilación.' },
          { mz: 69, relativeAbundance: 100, fragmentFormula: '[CH₂=C(CH₃)-CO]⁺', description: 'Pico base: catión metacriloílo por pérdida de metoxi (31 Da).', isBasePeak: true },
          { mz: 100, relativeAbundance: 48, fragmentFormula: '[C₅H₈O₂]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'gamma_butyrolactone',
        name: 'gamma-Butirolactona (GBL)',
        formula: 'C₄H₆O₂',
        molarMass: 86,
        description: 'Éster cíclico (lactona) de 5 miembros; pérdida de formaldehído (CH2O) rindiendo el pico base m/z 42 y m/z 86.',
        basePeakMz: 42,
        molecularIonMz: 86,
        peaks: [
          { mz: 28, relativeAbundance: 35, fragmentFormula: '[CO]⁺•', description: 'Monóxido de carbono.' },
          { mz: 42, relativeAbundance: 100, fragmentFormula: '[C₃H₆]⁺•', description: 'Pico base: retro-cicloadición con pérdida de CO₂ o CH₂O.', isBasePeak: true },
          { mz: 56, relativeAbundance: 58, fragmentFormula: '[C₃H₄O]⁺•', description: 'Pérdida de formaldehído.' },
          { mz: 86, relativeAbundance: 62, fragmentFormula: '[C₄H₆O₂]⁺•', description: 'Ion molecular cíclico.', isMolecularIon: true }
        ]
      }
    ]
  },

  // 10. AMINAS (20 ejemplos)
  {
    id: 'amines',
    name: 'Aminas',
    iconName: 'Activity',
    generalFormula: 'R-NH₂ / R₂NH / R₃N',
    spectralSignature: 'Regla del Nitrógeno (m/z impar para cationes con un número impar de nitrógenos); ruptura alfa masiva y abrumadora formando iones iminio ([R₂N=CH₂]⁺ m/z 30 en aminas primarias, m/z 44, 58 en secundarias/terciarias); el ion iminio suele ser el pico base (100%) con ion molecular casi indetectable en aminas alifáticas; anilinas muestran ion molecular muy fuerte.',
    compounds: [
      {
        id: 'methylamine',
        name: 'Metilamina',
        formula: 'CH₅N',
        molarMass: 31,
        description: 'Amina primaria elemental; masa molecular impar (31 Da, Regla del Nitrógeno); pérdida de H• rindiendo ion iminio m/z 30 como base.',
        basePeakMz: 30,
        molecularIonMz: 31,
        peaks: [
          { mz: 15, relativeAbundance: 18, fragmentFormula: '[CH₃]⁺', description: 'Pérdida de amino.' },
          { mz: 28, relativeAbundance: 35, fragmentFormula: '[CH₂N]⁺', description: 'Deshidrogenación.' },
          { mz: 30, relativeAbundance: 100, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Pico base: ion iminio por pérdida de un átomo de hidrógeno [M - H]⁺.', isBasePeak: true },
          { mz: 31, relativeAbundance: 82, fragmentFormula: '[CH₅N]⁺•', description: 'Ion molecular impar (Regla del Nitrógeno).', isMolecularIon: true }
        ]
      },
      {
        id: 'dimethylamine',
        name: 'Dimetilamina',
        formula: 'C₂H₇N',
        molarMass: 45,
        description: 'Amina secundaria; pérdida de H• generando el ion iminio estabilizado m/z 44 como pico base.',
        basePeakMz: 44,
        molecularIonMz: 45,
        peaks: [
          { mz: 15, relativeAbundance: 15, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 28, relativeAbundance: 32, fragmentFormula: '[CH₂N]⁺', description: 'Fragmento aziridino.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[CH₃-NH=CH₂]⁺', description: 'Pico base: ion iminio secundario [M - H]⁺.', isBasePeak: true },
          { mz: 45, relativeAbundance: 68, fragmentFormula: '[C₂H₇N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'trimethylamine',
        name: 'Trimetilamina',
        formula: 'C₃H₉N',
        molarMass: 59,
        description: 'Amina terciaria; pérdida de H• rindiendo el ion iminio terciario m/z 58 como pico base.',
        basePeakMz: 58,
        molecularIonMz: 59,
        peaks: [
          { mz: 15, relativeAbundance: 14, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 42, relativeAbundance: 28, fragmentFormula: '[C₂H₄N]⁺', description: 'Pérdida de metano.' },
          { mz: 58, relativeAbundance: 100, fragmentFormula: '[(CH₃)₂N=CH₂]⁺', description: 'Pico base: ion iminio terciario por pérdida de H•.', isBasePeak: true },
          { mz: 59, relativeAbundance: 75, fragmentFormula: '[C₃H₉N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'ethylamine',
        name: 'Etilamina',
        formula: 'C₂H₇N',
        molarMass: 45,
        description: 'Amina primaria alifática; ruptura alfa cuantitativa con pérdida de metilo produciendo el ion iminio base m/z 30.',
        basePeakMz: 30,
        molecularIonMz: 45,
        peaks: [
          { mz: 15, relativeAbundance: 12, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 28, relativeAbundance: 22, fragmentFormula: '[C₂H₄]⁺•', description: 'Etileno.' },
          { mz: 30, relativeAbundance: 100, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Pico base característico de aminas primarias por pérdida de CH₃•.', isBasePeak: true },
          { mz: 44, relativeAbundance: 35, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 45, relativeAbundance: 28, fragmentFormula: '[C₂H₇N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'diethylamine',
        name: 'Dietilamina',
        formula: 'C₄H₁₁N',
        molarMass: 73,
        description: 'Amina secundaria; ruptura alfa expulsando metilo para dar el catión iminio m/z 58 como pico base.',
        basePeakMz: 58,
        molecularIonMz: 73,
        peaks: [
          { mz: 30, relativeAbundance: 42, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Iminio primario.' },
          { mz: 44, relativeAbundance: 35, fragmentFormula: '[C₂H₆N]⁺', description: 'Fragmento imina.' },
          { mz: 58, relativeAbundance: 100, fragmentFormula: '[CH₃CH₂-NH=CH₂]⁺', description: 'Pico base: ruptura alfa perdiendo radical metilo CH₃•.', isBasePeak: true },
          { mz: 72, relativeAbundance: 12, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 73, relativeAbundance: 18, fragmentFormula: '[C₄H₁₁N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'triethylamine',
        name: 'Trietilamina',
        formula: 'C₆H₁₅N',
        molarMass: 101,
        description: 'Base orgánica terciaria; ruptura alfa inmediata perdiendo metilo para generar el ion iminio base m/z 86.',
        basePeakMz: 86,
        molecularIonMz: 101,
        peaks: [
          { mz: 30, relativeAbundance: 18, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Iminio menor.' },
          { mz: 58, relativeAbundance: 42, fragmentFormula: '[C₃H₈N]⁺', description: 'Iminio secundario.' },
          { mz: 86, relativeAbundance: 100, fragmentFormula: '[(C₂H₅)₂N=CH₂]⁺', description: 'Pico base: ruptura alfa perdiendo CH₃•.', isBasePeak: true },
          { mz: 101, relativeAbundance: 15, fragmentFormula: '[C₆H₁₅N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'propylamine',
        name: 'n-Propilamina',
        formula: 'C₃H₉N',
        molarMass: 59,
        description: 'Amina primaria de 3C; ruptura alfa perdiendo etilo rindiendo el ion iminio universal m/z 30 como base.',
        basePeakMz: 30,
        molecularIonMz: 59,
        peaks: [
          { mz: 28, relativeAbundance: 18, fragmentFormula: '[C₂H₄]⁺•', description: 'Etileno.' },
          { mz: 30, relativeAbundance: 100, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Pico base absoluto: ruptura alfa con pérdida de etilo C₂H₅•.', isBasePeak: true },
          { mz: 58, relativeAbundance: 12, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 59, relativeAbundance: 14, fragmentFormula: '[C₃H₉N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isopropylamine',
        name: 'Isopropilamina',
        formula: 'C₃H₉N',
        molarMass: 59,
        description: 'Amina primaria ramificada; la pérdida de un radical metilo produce el ion iminio sustituido m/z 44 como base.',
        basePeakMz: 44,
        molecularIonMz: 59,
        peaks: [
          { mz: 30, relativeAbundance: 25, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Iminio lineal.' },
          { mz: 41, relativeAbundance: 18, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[CH₃-CH=NH₂]⁺', description: 'Pico base: ruptura alfa perdiendo metilo CH₃•.', isBasePeak: true },
          { mz: 58, relativeAbundance: 32, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón terciario.' },
          { mz: 59, relativeAbundance: 16, fragmentFormula: '[C₃H₉N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'butylamine',
        name: 'n-Butilamina',
        formula: 'C₄H₁₁N',
        molarMass: 73,
        description: 'Amina primaria de 4C; ruptura alfa total con pérdida de propilo generando el ion iminio base m/z 30.',
        basePeakMz: 30,
        molecularIonMz: 73,
        peaks: [
          { mz: 30, relativeAbundance: 100, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Pico base: ion iminio por pérdida de propilo C₃H₇•.', isBasePeak: true },
          { mz: 44, relativeAbundance: 18, fragmentFormula: '[C₂H₆N]⁺', description: 'Fragmentación secundaria.' },
          { mz: 72, relativeAbundance: 8, fragmentFormula: '[M - H]⁺', description: 'Pérdida de H•.' },
          { mz: 73, relativeAbundance: 6, fragmentFormula: '[C₄H₁₁N]⁺•', description: 'Ion molecular débil.', isMolecularIon: true }
        ]
      },
      {
        id: 'sec_butylamine',
        name: 'sec-Butilamina',
        formula: 'C₄H₁₁N',
        molarMass: 73,
        description: 'Amina secundaria con carbono quiral; la ruptura alfa expulsa preferentemente el grupo etilo (más grande) rindiendo m/z 44 como base.',
        basePeakMz: 44,
        molecularIonMz: 73,
        peaks: [
          { mz: 30, relativeAbundance: 15, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Iminio menor.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[CH₃-CH=NH₂]⁺', description: 'Pico base: pérdida del radical etilo C₂H₅• por ruptura alfa.', isBasePeak: true },
          { mz: 58, relativeAbundance: 28, fragmentFormula: '[C₂H₅-CH=NH₂]⁺', description: 'Pérdida del radical metilo CH₃•.' },
          { mz: 73, relativeAbundance: 5, fragmentFormula: '[C₄H₁₁N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'tert_butylamine',
        name: 'tert-Butilamina',
        formula: 'C₄H₁₁N',
        molarMass: 73,
        description: 'Amina con carbono terciario; ruptura alfa expulsando metilo rindiendo el ion iminio terciario m/z 58 como base.',
        basePeakMz: 58,
        molecularIonMz: 73,
        peaks: [
          { mz: 41, relativeAbundance: 25, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 58, relativeAbundance: 100, fragmentFormula: '[(CH₃)₂C=NH₂]⁺', description: 'Pico base: ion iminio por pérdida de CH₃•.', isBasePeak: true },
          { mz: 73, relativeAbundance: 2, fragmentFormula: '[C₄H₁₁N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'cyclohexylamine',
        name: 'Ciclohexilamina',
        formula: 'C₆H₁₃N',
        molarMass: 99,
        description: 'Amina alicíclica; apertura de anillo y ruptura alfa rindiendo el ion iminio base m/z 56.',
        basePeakMz: 56,
        molecularIonMz: 99,
        peaks: [
          { mz: 30, relativeAbundance: 35, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Iminio.' },
          { mz: 43, relativeAbundance: 42, fragmentFormula: '[C₃H₇]⁺', description: 'Propilo.' },
          { mz: 56, relativeAbundance: 100, fragmentFormula: '[C₃H₆N]⁺', description: 'Pico base: ion iminio cíclico fragmentado.', isBasePeak: true },
          { mz: 70, relativeAbundance: 48, fragmentFormula: '[C₄H₈N]⁺', description: 'Pérdida de etilo.' },
          { mz: 99, relativeAbundance: 38, fragmentFormula: '[C₆H₁₃N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'aniline',
        name: 'Anilina (Fenilamina)',
        formula: 'C₆H₇N',
        molarMass: 93,
        description: 'Amina aromática primaria; conjugación del par libre de nitrógeno con el anillo que hace al ion molecular el pico base (100%) y pérdida de HCN (–27 Da) para dar m/z 66.',
        basePeakMz: 93,
        molecularIonMz: 93,
        peaks: [
          { mz: 39, relativeAbundance: 28, fragmentFormula: '[C₃H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 65, relativeAbundance: 45, fragmentFormula: '[C₅H₅]⁺', description: 'Catión ciclopentadienilo tras pérdida de HCN y H•.' },
          { mz: 66, relativeAbundance: 52, fragmentFormula: '[C₅H₆]⁺•', description: 'Pérdida característica de ácido cianhídrico (HCN, 27 Da) desde el anillo anilínico.' },
          { mz: 92, relativeAbundance: 42, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 93, relativeAbundance: 100, fragmentFormula: '[C₆H₅-NH₂]⁺•', description: 'Ion molecular y pico base por gran resonancia n-pi.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'n_methylaniline',
        name: 'N-Metilanilina',
        formula: 'C₇H₉N',
        molarMass: 107,
        description: 'Amina aromática secundaria; ion molecular base (100%) y pérdida de H• para dar el catión m/z 106.',
        basePeakMz: 106,
        molecularIonMz: 107,
        peaks: [
          { mz: 77, relativeAbundance: 35, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 79, relativeAbundance: 28, fragmentFormula: '[C₅H₅N]⁺', description: 'Piridina.' },
          { mz: 106, relativeAbundance: 100, fragmentFormula: '[C₆H₅-NH=CH₂]⁺', description: 'Pico base: ion iminio conjugado [M - H]⁺.', isBasePeak: true },
          { mz: 107, relativeAbundance: 95, fragmentFormula: '[C₇H₉N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'nn_dimethylaniline',
        name: 'N,N-Dimetilanilina',
        formula: 'C₈H₁₁N',
        molarMass: 121,
        description: 'Amina aromática terciaria; ion molecular muy intenso y pérdida de H• rindiendo m/z 120 como base.',
        basePeakMz: 120,
        molecularIonMz: 121,
        peaks: [
          { mz: 77, relativeAbundance: 38, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 105, relativeAbundance: 42, fragmentFormula: '[C₇H₇N]⁺', description: 'Pérdida de metilo.' },
          { mz: 120, relativeAbundance: 100, fragmentFormula: '[C₆H₅-N(CH₃)=CH₂]⁺', description: 'Pico base: ion iminio terciario [M - H]⁺.', isBasePeak: true },
          { mz: 121, relativeAbundance: 92, fragmentFormula: '[C₈H₁₁N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'o_toluidine',
        name: 'o-Toluidina (2-Metilanilina)',
        formula: 'C₇H₉N',
        molarMass: 107,
        description: 'Anilina metilada; ion molecular pico base (100%) y pérdida de H• rindiendo el catión aminotropilio m/z 106.',
        basePeakMz: 106,
        molecularIonMz: 107,
        peaks: [
          { mz: 77, relativeAbundance: 32, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 79, relativeAbundance: 38, fragmentFormula: '[C₅H₅N]⁺', description: 'Pérdida de HCN.' },
          { mz: 106, relativeAbundance: 100, fragmentFormula: '[C₇H₈N]⁺', description: 'Pico base: catión aminotropilio aromático [M - H]⁺.', isBasePeak: true },
          { mz: 107, relativeAbundance: 98, fragmentFormula: '[C₇H₉N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'benzylamine',
        name: 'Bencilamina',
        formula: 'C₇H₉N',
        molarMass: 107,
        description: 'Amina bencílica; ruptura heterolítica cuantitativa formando el catión tropilio m/z 91 y el ion iminio m/z 106.',
        basePeakMz: 106,
        molecularIonMz: 107,
        peaks: [
          { mz: 65, relativeAbundance: 25, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento de tropilio.' },
          { mz: 77, relativeAbundance: 28, fragmentFormula: '[C₆H₅]⁺', description: 'Fenilo.' },
          { mz: 91, relativeAbundance: 68, fragmentFormula: '[C₇H₇]⁺', description: 'Catión tropilio por pérdida de NH₂•.' },
          { mz: 106, relativeAbundance: 100, fragmentFormula: '[C₆H₅-CH=NH₂]⁺', description: 'Pico base: catión fenil-iminio por pérdida de H• [M - H]⁺.', isBasePeak: true },
          { mz: 107, relativeAbundance: 78, fragmentFormula: '[C₇H₉N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'two_phenylethylamine',
        name: '2-Feniletilamina (PEA)',
        formula: 'C₈H₁₁N',
        molarMass: 121,
        description: 'Neurotransmisor traza; ruptura bencílica total con pérdida del radical bencilo generando el ion iminio m/z 30 como pico base.',
        basePeakMz: 30,
        molecularIonMz: 121,
        peaks: [
          { mz: 30, relativeAbundance: 100, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Pico base: ion iminio por ruptura homolítica del enlace bencílico C-C.', isBasePeak: true },
          { mz: 65, relativeAbundance: 18, fragmentFormula: '[C₅H₅]⁺', description: 'Tropilio fragmentado.' },
          { mz: 91, relativeAbundance: 75, fragmentFormula: '[C₇H₇]⁺', description: 'Catión tropilio complementario.' },
          { mz: 120, relativeAbundance: 8, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 121, relativeAbundance: 12, fragmentFormula: '[C₈H₁₁N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'pyridine',
        name: 'Piridina',
        formula: 'C₅H₅N',
        molarMass: 79,
        description: 'Heterociclo aromático nitrogenado; masa impar (79 Da); ion molecular pico base dominante y pérdida de ácido cianhídrico (HCN, 27 Da) rindiendo m/z 52.',
        basePeakMz: 79,
        molecularIonMz: 79,
        peaks: [
          { mz: 50, relativeAbundance: 25, fragmentFormula: '[C₄H₂]⁺•', description: 'Fragmento menor.' },
          { mz: 51, relativeAbundance: 38, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 52, relativeAbundance: 68, fragmentFormula: '[C₄H₄]⁺•', description: 'Pérdida neutra de ácido cianhídrico (HCN, 27 Da) formando catión ciclobutadieno.' },
          { mz: 78, relativeAbundance: 22, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 79, relativeAbundance: 100, fragmentFormula: '[C₅H₅N]⁺•', description: 'Ion molecular y pico base por aromaticidad pi.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'piperidine',
        name: 'Piperidina',
        formula: 'C₅H₁₁N',
        molarMass: 85,
        description: 'Amina heterocíclica saturada; masa impar (85 Da); pérdida de H• rindiendo el ion iminio cíclico base m/z 84.',
        basePeakMz: 84,
        molecularIonMz: 85,
        peaks: [
          { mz: 30, relativeAbundance: 32, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Iminio abierto.' },
          { mz: 42, relativeAbundance: 38, fragmentFormula: '[C₂H₄N]⁺', description: 'Fragmento menor.' },
          { mz: 56, relativeAbundance: 65, fragmentFormula: '[C₃H₆N]⁺', description: 'Apertura de anillo.' },
          { mz: 84, relativeAbundance: 100, fragmentFormula: '[C₅H₁₀N]⁺', description: 'Pico base: ion iminio cíclico por pérdida de un hidrógeno alfa [M - H]⁺.', isBasePeak: true },
          { mz: 85, relativeAbundance: 78, fragmentFormula: '[C₅H₁₁N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      }
    ]
  },

  // 11. AMIDAS Y NITRILOS (20 ejemplos)
  {
    id: 'amides_nitriles',
    name: 'Amidas y Nitrilos',
    iconName: 'Layers',
    generalFormula: 'R-CONH₂ / R-C≡N',
    spectralSignature: 'Regla del Nitrógeno activa; amidas primarias muestran ruptura alfa formando el catión carbamoílo m/z 44 [H₂N-C≡O]⁺ y reordenamiento de McLafferty rindiendo m/z 59 [CH₂=C(OH)NH₂]⁺•; nitrilos alifáticos muestran McLafferty rindiendo m/z 41 [CH₂=C=NH]⁺• (cetenoimina) y catión cianuro [C≡N]⁺ m/z 26; benzonitrilos muestran ion molecular pico base m/z 103 con pérdida de HCN.',
    compounds: [
      {
        id: 'formamide',
        name: 'Formamida',
        formula: 'CH₃NO',
        molarMass: 45,
        description: 'La amida más simple; masa impar (45 Da); pico base en m/z 44 por pérdida de H• o catión carbamoílo.',
        basePeakMz: 44,
        molecularIonMz: 45,
        peaks: [
          { mz: 16, relativeAbundance: 15, fragmentFormula: '[NH₂]⁺', description: 'Amino.' },
          { mz: 28, relativeAbundance: 42, fragmentFormula: '[CO]⁺•', description: 'Monóxido de carbono.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[H₂N-C≡O]⁺', description: 'Pico base: catión carbamoílo por pérdida de H• [M - H]⁺.', isBasePeak: true },
          { mz: 45, relativeAbundance: 75, fragmentFormula: '[CH₃NO]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'n_methylformamide',
        name: 'N-Metilformamida',
        formula: 'C₂H₅NO',
        molarMass: 59,
        description: 'Amida secundaria; pérdida de H• rindiendo m/z 58 como pico base.',
        basePeakMz: 58,
        molecularIonMz: 59,
        peaks: [
          { mz: 29, relativeAbundance: 35, fragmentFormula: '[CHO]⁺', description: 'Formilo.' },
          { mz: 30, relativeAbundance: 42, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Iminio.' },
          { mz: 58, relativeAbundance: 100, fragmentFormula: '[CH₃-NH=C=O]⁺', description: 'Pico base: pérdida del hidrógeno formilo [M - H]⁺.', isBasePeak: true },
          { mz: 59, relativeAbundance: 68, fragmentFormula: '[C₂H₅NO]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'dmf',
        name: 'DMF (N,N-Dimetilformamida)',
        formula: 'C₃H₇NO',
        molarMass: 73,
        description: 'Solvente aprótico polar; pérdida de formilo o H•; pico base en m/z 73 (ion molecular) o m/z 44.',
        basePeakMz: 73,
        molecularIonMz: 73,
        peaks: [
          { mz: 28, relativeAbundance: 32, fragmentFormula: '[CO]⁺•', description: 'Monóxido de carbono.' },
          { mz: 42, relativeAbundance: 38, fragmentFormula: '[C₂H₄N]⁺', description: 'Dimetilamino deshidrogenado.' },
          { mz: 44, relativeAbundance: 75, fragmentFormula: '[(CH₃)₂N]⁺', description: 'Catión dimetilamino por pérdida de CHO•.' },
          { mz: 72, relativeAbundance: 58, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 73, relativeAbundance: 100, fragmentFormula: '[C₃H₇NO]⁺•', description: 'Ion molecular y pico base por estabilización del enlace amida.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'acetamide',
        name: 'Acetamida',
        formula: 'C₂H₅NO',
        molarMass: 59,
        description: 'Amida primaria de ácido acético; pérdida de metilo rindiendo el catión carbamoílo m/z 44 como base y catión acetilo m/z 43.',
        basePeakMz: 59,
        molecularIonMz: 59,
        peaks: [
          { mz: 15, relativeAbundance: 22, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 43, relativeAbundance: 65, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Catión acetilo por pérdida de NH₂•.' },
          { mz: 44, relativeAbundance: 92, fragmentFormula: '[H₂N-C≡O]⁺', description: 'Catión carbamoílo por pérdida de CH₃•.' },
          { mz: 58, relativeAbundance: 45, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 59, relativeAbundance: 100, fragmentFormula: '[C₂H₅NO]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'n_methylacetamide',
        name: 'N-Metilacetamida',
        formula: 'C₃H₇NO',
        molarMass: 73,
        description: 'Modelo de enlace peptídico; pérdida de metilo rindiendo el catión N-metilcarbamoílo m/z 58 o m/z 43.',
        basePeakMz: 43,
        molecularIonMz: 73,
        peaks: [
          { mz: 30, relativeAbundance: 35, fragmentFormula: '[CH₂=NH₂]⁺', description: 'Iminio.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Pico base: catión acetilo por pérdida de CH₃NH•.', isBasePeak: true },
          { mz: 58, relativeAbundance: 78, fragmentFormula: '[CH₃NH-CO]⁺', description: 'Pérdida de metilo acílico.' },
          { mz: 73, relativeAbundance: 62, fragmentFormula: '[C₃H₇NO]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'dmac',
        name: 'DMAc (N,N-Dimetilacetamida)',
        formula: 'C₄H₉NO',
        molarMass: 87,
        description: 'Solvente aprótico; pérdida de metilo y catión acetilo m/z 43 o pico base m/z 44.',
        basePeakMz: 44,
        molecularIonMz: 87,
        peaks: [
          { mz: 43, relativeAbundance: 68, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Catión acetilo.' },
          { mz: 44, relativeAbundance: 100, fragmentFormula: '[(CH₃)₂N]⁺', description: 'Pico base: catión dimetilamino.', isBasePeak: true },
          { mz: 72, relativeAbundance: 42, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 87, relativeAbundance: 58, fragmentFormula: '[C₄H₉NO]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'propanamide',
        name: 'Propanamida',
        formula: 'C₃H₇NO',
        molarMass: 73,
        description: 'Amida primaria de 3C; reordenamiento de McLafferty rindiendo el ion m/z 59 característico.',
        basePeakMz: 73,
        molecularIonMz: 73,
        peaks: [
          { mz: 29, relativeAbundance: 42, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 44, relativeAbundance: 68, fragmentFormula: '[H₂N-C≡O]⁺', description: 'Catión carbamoílo por pérdida de etilo.' },
          { mz: 57, relativeAbundance: 58, fragmentFormula: '[C₂H₅-C≡O]⁺', description: 'Catión propionilo.' },
          { mz: 72, relativeAbundance: 38, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 73, relativeAbundance: 100, fragmentFormula: '[C₃H₇NO]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'butanamide',
        name: 'Butanamida',
        formula: 'C₄H₉NO',
        molarMass: 87,
        description: 'Amida con hidrógeno gamma; reordenamiento de McLafferty limpio rindiendo el enol amida m/z 59 como pico base.',
        basePeakMz: 59,
        molecularIonMz: 87,
        peaks: [
          { mz: 44, relativeAbundance: 62, fragmentFormula: '[H₂N-C≡O]⁺', description: 'Catión carbamoílo.' },
          { mz: 59, relativeAbundance: 100, fragmentFormula: '[CH₂=C(OH)NH₂]⁺•', description: 'Pico base: reordenamiento de McLafferty con pérdida de etileno (C₂H₄, 28 Da).', isBasePeak: true },
          { mz: 72, relativeAbundance: 32, fragmentFormula: '[M - CH₃]⁺', description: 'Pérdida de metilo.' },
          { mz: 87, relativeAbundance: 25, fragmentFormula: '[C₄H₉NO]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'benzamide',
        name: 'Benzamida',
        formula: 'C₇H₇NO',
        molarMass: 121,
        description: 'Amida aromática; pérdida del radical amino NH2 rindiendo el catión benzoílo m/z 105 como pico base y fenilo m/z 77.',
        basePeakMz: 105,
        molecularIonMz: 121,
        peaks: [
          { mz: 51, relativeAbundance: 38, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 78, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo.' },
          { mz: 105, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡O]⁺', description: 'Pico base: catión benzoílo por pérdida de radical amino (NH₂•, 16 Da).', isBasePeak: true },
          { mz: 120, relativeAbundance: 42, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 121, relativeAbundance: 82, fragmentFormula: '[C₇H₇NO]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'acetanilide',
        name: 'Acetanilida',
        formula: 'C₈H₉NO',
        molarMass: 135,
        description: 'Anilida analgésica clásica; pérdida de ceteno neutro (CH2CO, 42 Da) rindiendo el catión anilina m/z 93 como pico base.',
        basePeakMz: 93,
        molecularIonMz: 135,
        peaks: [
          { mz: 43, relativeAbundance: 68, fragmentFormula: '[CH₃-C≡O]⁺', description: 'Catión acetilo.' },
          { mz: 65, relativeAbundance: 35, fragmentFormula: '[C₅H₅]⁺', description: 'Ciclopentadienilo.' },
          { mz: 93, relativeAbundance: 100, fragmentFormula: '[C₆H₅NH₂]⁺•', description: 'Pico base: pérdida concertada de ceteno (CH₂=C=O, 42 Da) regenerando anilina ionizada.', isBasePeak: true },
          { mz: 106, relativeAbundance: 22, fragmentFormula: '[C₇H₈N]⁺', description: 'Pérdida de CHO•.' },
          { mz: 135, relativeAbundance: 58, fragmentFormula: '[C₈H₉NO]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'acrylamide',
        name: 'Acrilamida',
        formula: 'C₃H₅NO',
        molarMass: 71,
        description: 'Amida insaturada; ion molecular m/z 71 muy intenso y catión acriloílo m/z 55 como pico base.',
        basePeakMz: 55,
        molecularIonMz: 71,
        peaks: [
          { mz: 27, relativeAbundance: 48, fragmentFormula: '[C₂H₃]⁺', description: 'Catión vinilo.' },
          { mz: 44, relativeAbundance: 32, fragmentFormula: '[H₂N-C≡O]⁺', description: 'Carbamoílo.' },
          { mz: 55, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-C≡O]⁺', description: 'Pico base: catión acriloílo por pérdida de amino (NH₂•).', isBasePeak: true },
          { mz: 70, relativeAbundance: 38, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 71, relativeAbundance: 85, fragmentFormula: '[C₃H₅NO]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'pyrrolidone',
        name: '2-Pirrolidona',
        formula: 'C₄H₇NO',
        molarMass: 85,
        description: 'Lactama cíclica de 5 miembros; masa impar (85 Da); pérdida de CO o etileno rindiendo m/z 85 como pico base.',
        basePeakMz: 85,
        molecularIonMz: 85,
        peaks: [
          { mz: 28, relativeAbundance: 35, fragmentFormula: '[CO]⁺•', description: 'Monóxido de carbono.' },
          { mz: 42, relativeAbundance: 48, fragmentFormula: '[C₂H₄N]⁺', description: 'Fragmento del anillo.' },
          { mz: 56, relativeAbundance: 68, fragmentFormula: '[C₃H₆N]⁺', description: 'Pérdida de CO.' },
          { mz: 84, relativeAbundance: 78, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 85, relativeAbundance: 100, fragmentFormula: '[C₄H₇NO]⁺•', description: 'Ion molecular y pico base por estabilidad del anillo de lactama.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'nmp',
        name: 'NMP (N-Metil-2-pirrolidona)',
        formula: 'C₅H₉NO',
        molarMass: 99,
        description: 'Lactama terciaria; ion molecular muy intenso (pico base m/z 99) y pérdida de H• rindiendo m/z 98.',
        basePeakMz: 99,
        molecularIonMz: 99,
        peaks: [
          { mz: 42, relativeAbundance: 45, fragmentFormula: '[C₂H₄N]⁺', description: 'Fragmento cíclico.' },
          { mz: 44, relativeAbundance: 38, fragmentFormula: '[CH₂=N=CH₂]⁺', description: 'Iminio.' },
          { mz: 70, relativeAbundance: 48, fragmentFormula: '[M - CHO]⁺', description: 'Pérdida de CO y H•.' },
          { mz: 98, relativeAbundance: 75, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 99, relativeAbundance: 100, fragmentFormula: '[C₅H₉NO]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'acetonitrile',
        name: 'Acetonitrilo',
        formula: 'C₂H₃N',
        molarMass: 41,
        description: 'El nitrilo orgánico más simple; masa impar (41 Da); ion molecular base m/z 41 y pérdida de H• para dar el catión cianometilo m/z 40.',
        basePeakMz: 41,
        molecularIonMz: 41,
        peaks: [
          { mz: 14, relativeAbundance: 15, fragmentFormula: '[CH₂]⁺•', description: 'Metileno.' },
          { mz: 15, relativeAbundance: 22, fragmentFormula: '[CH₃]⁺', description: 'Metilo.' },
          { mz: 26, relativeAbundance: 28, fragmentFormula: '[CN]⁺', description: 'Catión cianuro.' },
          { mz: 40, relativeAbundance: 82, fragmentFormula: '[CH₂-C≡N]⁺', description: 'Catión cianometilo [M - H]⁺.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[C₂H₃N]⁺•', description: 'Ion molecular y pico base.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'propionitrile',
        name: 'Propionitrilo',
        formula: 'C₃H₅N',
        molarMass: 55,
        description: 'Nitrilo de tres carbonos; pérdida de H• rindiendo m/z 54 como pico base y catión etilo m/z 29.',
        basePeakMz: 54,
        molecularIonMz: 55,
        peaks: [
          { mz: 26, relativeAbundance: 35, fragmentFormula: '[CN]⁺', description: 'Cianuro.' },
          { mz: 28, relativeAbundance: 48, fragmentFormula: '[C₂H₄]⁺•', description: 'Etileno.' },
          { mz: 29, relativeAbundance: 38, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 54, relativeAbundance: 100, fragmentFormula: '[CH₃-CH-C≡N]⁺', description: 'Pico base: catión cianoetilo por pérdida de H• [M - H]⁺.', isBasePeak: true },
          { mz: 55, relativeAbundance: 78, fragmentFormula: '[C₃H₅N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'butyronitrile',
        name: 'Butironitrilo',
        formula: 'C₄H₇N',
        molarMass: 69,
        description: 'Nitrilo con hidrógeno gamma; reordenamiento de McLafferty que expulsa etileno generando el catión cetenoimina m/z 41 como pico base.',
        basePeakMz: 41,
        molecularIonMz: 69,
        peaks: [
          { mz: 27, relativeAbundance: 35, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 28, relativeAbundance: 22, fragmentFormula: '[C₂H₄]⁺•', description: 'Etileno.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[CH₂=C=NH]⁺•', description: 'Pico base: reordenamiento de McLafferty con pérdida de etileno (C₂H₄, 28 Da).', isBasePeak: true },
          { mz: 68, relativeAbundance: 32, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 69, relativeAbundance: 18, fragmentFormula: '[C₄H₇N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'isobutyronitrile',
        name: 'Isobutilnitrilo (2-Metilpropanonitrilo)',
        formula: 'C₄H₇N',
        molarMass: 69,
        description: 'Nitrilo ramificado sin hidrógenos gamma; no puede dar McLafferty; el pico base es el carbocatión isopropilo m/z 43 o m/z 41.',
        basePeakMz: 41,
        molecularIonMz: 69,
        peaks: [
          { mz: 27, relativeAbundance: 28, fragmentFormula: '[C₂H₃]⁺', description: 'Alifático.' },
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[C₃H₅]⁺', description: 'Pico base: catión isopropenilo por pérdida de HCN.', isBasePeak: true },
          { mz: 43, relativeAbundance: 85, fragmentFormula: '[C₃H₇]⁺', description: 'Carbocatión isopropilo por pérdida de CN•.' },
          { mz: 68, relativeAbundance: 42, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 69, relativeAbundance: 15, fragmentFormula: '[C₄H₇N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'valeronitrile',
        name: 'Valeronitrilo (Pentanenitrilo)',
        formula: 'C₅H₉N',
        molarMass: 83,
        description: 'Nitrilo alifático de 5 carbonos; McLafferty limpio rindiendo m/z 41 como pico base con pérdida de propileno.',
        basePeakMz: 41,
        molecularIonMz: 83,
        peaks: [
          { mz: 41, relativeAbundance: 100, fragmentFormula: '[CH₂=C=NH]⁺•', description: 'Pico base: McLafferty expulsando propileno (C₃H₆, 42 Da).', isBasePeak: true },
          { mz: 54, relativeAbundance: 48, fragmentFormula: '[C₃H₄N]⁺', description: 'Fragmento cianoalquilo.' },
          { mz: 82, relativeAbundance: 28, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 83, relativeAbundance: 8, fragmentFormula: '[C₅H₉N]⁺•', description: 'Ion molecular.', isMolecularIon: true }
        ]
      },
      {
        id: 'acrylonitrile',
        name: 'Acrilonitrilo (Cianuro de vinilo)',
        formula: 'C₃H₃N',
        molarMass: 53,
        description: 'Monómero de fibras acrílicas; conjugación de triple enlace con doble enlace que hace al ion molecular el pico base m/z 53.',
        basePeakMz: 53,
        molecularIonMz: 53,
        peaks: [
          { mz: 26, relativeAbundance: 58, fragmentFormula: '[C₂H₂]⁺• / [CN]⁺', description: 'Acetileno / cianuro.' },
          { mz: 27, relativeAbundance: 48, fragmentFormula: '[C₂H₃]⁺', description: 'Catión vinilo.' },
          { mz: 52, relativeAbundance: 68, fragmentFormula: '[C₃H₂N]⁺', description: 'Pérdida de protón [M - H]⁺.' },
          { mz: 53, relativeAbundance: 100, fragmentFormula: '[CH₂=CH-C≡N]⁺•', description: 'Ion molecular y pico base por resonancia conjugada.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'benzonitrile',
        name: 'Benzonitrilo',
        formula: 'C₇H₅N',
        molarMass: 103,
        description: 'Nitrilo aromático; masa impar (103 Da); ion molecular base (100%) y pérdida característica de ácido cianhídrico (HCN, 27 Da) para dar bencino m/z 76.',
        basePeakMz: 103,
        molecularIonMz: 103,
        peaks: [
          { mz: 50, relativeAbundance: 32, fragmentFormula: '[C₄H₂]⁺•', description: 'Fragmento aromático.' },
          { mz: 76, relativeAbundance: 65, fragmentFormula: '[C₆H₄]⁺•', description: 'Ion bencino por pérdida neutra de ácido cianhídrico (HCN, 27 Da).' },
          { mz: 102, relativeAbundance: 22, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 103, relativeAbundance: 100, fragmentFormula: '[C₆H₅-C≡N]⁺•', description: 'Ion molecular y pico base indiscutible.', isBasePeak: true, isMolecularIon: true }
        ]
      }
    ]
  },

  // 12. HALOGENUROS DE ALQUILO Y ARILO (20 ejemplos)
  {
    id: 'halides',
    name: 'Halogenuros de Alquilo y Arilo',
    iconName: 'Shield',
    generalFormula: 'R-X / Ar-X (X = Cl, Br, I, F)',
    spectralSignature: 'Firmas isotópicas inconfundibles: Cloro muestra doblete M y M+2 en proporción 3:1 (³⁵Cl : ³⁷Cl = 75.8% : 24.2%); Bromo muestra doblete M y M+2 de alturas casi idénticas 1:1 (⁷⁹Br : ⁸¹Br = 50.7% : 49.3%); dos átomos de Cloro producen triplete 9:6:1; dos de Bromo producen 1:2:1; pérdida fácil de radical halógeno (–Cl 35/37 Da, –Br 79/81 Da, –I 127 Da con ion m/z 127 [I]⁺ intenso).',
    compounds: [
      {
        id: 'chloromethane',
        name: 'Clorometano',
        formula: 'CH₃Cl',
        molarMass: 50,
        description: 'Halogenuro simple con doblete isotópico natural de cloro en m/z 50 (100%) y m/z 52 (33%).',
        basePeakMz: 50,
        molecularIonMz: 50,
        peaks: [
          { mz: 15, relativeAbundance: 68, fragmentFormula: '[CH₃]⁺', description: 'Pérdida de halógeno radicalario Cl•.' },
          { mz: 49, relativeAbundance: 45, fragmentFormula: '[CH₂³⁵Cl]⁺', description: 'Pérdida de H•.' },
          { mz: 50, relativeAbundance: 100, fragmentFormula: '[CH₃³⁵Cl]⁺•', description: 'Ion molecular y pico base con isótopo ³⁵Cl.', isBasePeak: true, isMolecularIon: true },
          { mz: 51, relativeAbundance: 15, fragmentFormula: '[CH₂³⁷Cl]⁺', description: 'Pérdida de H• en especie con ³⁷Cl.' },
          { mz: 52, relativeAbundance: 33, fragmentFormula: '[CH₃³⁷Cl]⁺•', description: 'Pico isotópico M+2 con isótopo ³⁷Cl (proporción natural 3:1 exacta).', isIsotopic: true }
        ]
      },
      {
        id: 'dichloromethane',
        name: 'Diclorometano (DCM)',
        formula: 'CH₂Cl₂',
        molarMass: 84,
        description: 'Dos átomos de cloro; produce el triplete característico M (84), M+2 (86) y M+4 (88) en proporción binomial 9:6:1.',
        basePeakMz: 49,
        molecularIonMz: 84,
        peaks: [
          { mz: 49, relativeAbundance: 100, fragmentFormula: '[CH₂³⁵Cl]⁺', description: 'Pico base: pérdida de un radical cloro ³⁵Cl•.', isBasePeak: true },
          { mz: 51, relativeAbundance: 32, fragmentFormula: '[CH₂³⁷Cl]⁺', description: 'Catión clorometilo con ³⁷Cl (ratio 3:1 con m/z 49).' },
          { mz: 84, relativeAbundance: 58, fragmentFormula: '[CH₂³⁵Cl₂]⁺•', description: 'Ion molecular (isótopos ³⁵Cl/³⁵Cl, 9 partes).', isMolecularIon: true },
          { mz: 86, relativeAbundance: 38, fragmentFormula: '[CH₂³⁵Cl³⁷Cl]⁺•', description: 'Ion molecular M+2 (isótopos ³⁵Cl/³⁷Cl, 6 partes).', isIsotopic: true },
          { mz: 88, relativeAbundance: 6.5, fragmentFormula: '[CH₂³⁷Cl₂]⁺•', description: 'Ion molecular M+4 (isótopos ³⁷Cl/³⁷Cl, 1 parte).', isIsotopic: true }
        ]
      },
      {
        id: 'chloroform',
        name: 'Cloroformo (Triclorometano)',
        formula: 'CHCl₃',
        molarMass: 118,
        description: 'Tres átomos de cloro; el pico base es el catión diclorometilo m/z 83 que muestra triplete 9:6:1 (m/z 83, 85, 87).',
        basePeakMz: 83,
        molecularIonMz: 118,
        peaks: [
          { mz: 47, relativeAbundance: 35, fragmentFormula: '[C³⁵Cl]⁺', description: 'Fragmento carbeno monoclorado.' },
          { mz: 83, relativeAbundance: 100, fragmentFormula: '[CH³⁵Cl₂]⁺', description: 'Pico base: catión diclorometilo por pérdida de Cl• (9 partes).', isBasePeak: true },
          { mz: 85, relativeAbundance: 65, fragmentFormula: '[CH³⁵Cl³⁷Cl]⁺', description: 'Catión diclorometilo con un ³⁷Cl (6 partes).', isIsotopic: true },
          { mz: 87, relativeAbundance: 11, fragmentFormula: '[CH³⁷Cl₂]⁺', description: 'Catión diclorometilo con dos ³⁷Cl (1 parte).', isIsotopic: true },
          { mz: 118, relativeAbundance: 4, fragmentFormula: '[CH³⁵Cl₃]⁺•', description: 'Ion molecular tenue (27:27:9:1).', isMolecularIon: true }
        ]
      },
      {
        id: 'carbon_tetrachloride',
        name: 'Tetracloruro de Carbono',
        formula: 'CCl₄',
        molarMass: 152,
        description: 'Cuatro átomos de cloro; ion molecular ausente; pico base cuantitativo en catión triclorometilo m/z 117.',
        basePeakMz: 117,
        molecularIonMz: 152,
        peaks: [
          { mz: 47, relativeAbundance: 32, fragmentFormula: '[C³⁵Cl]⁺', description: 'Catión monoclorocarbono.' },
          { mz: 82, relativeAbundance: 45, fragmentFormula: '[C³⁵Cl₂]⁺•', description: 'Fragmento diclorocarbono.' },
          { mz: 117, relativeAbundance: 100, fragmentFormula: '[C³⁵Cl₃]⁺', description: 'Pico base: carbocatión triclorometilo por pérdida de Cl•.', isBasePeak: true },
          { mz: 119, relativeAbundance: 96, fragmentFormula: '[C³⁵Cl₂³⁷Cl]⁺', description: 'Isótopo triclorometilo con un ³⁷Cl.', isIsotopic: true },
          { mz: 121, relativeAbundance: 31, fragmentFormula: '[C³⁵Cl³⁷Cl₂]⁺', description: 'Isótopo triclorometilo con dos ³⁷Cl.', isIsotopic: true },
          { mz: 152, relativeAbundance: 0.1, fragmentFormula: '[C³⁵Cl₄]⁺•', description: 'Ion molecular casi indetectable.', isMolecularIon: true }
        ]
      },
      {
        id: 'bromomethane',
        name: 'Bromometano',
        formula: 'CH₃Br',
        molarMass: 94,
        description: 'Monobromado; doblete isotópico casi gemelo 1:1 en m/z 94 (100%) y m/z 96 (98%) por los isótopos ⁷⁹Br y ⁸¹Br.',
        basePeakMz: 94,
        molecularIonMz: 94,
        peaks: [
          { mz: 15, relativeAbundance: 78, fragmentFormula: '[CH₃]⁺', description: 'Pérdida del radical bromo Br•.' },
          { mz: 79, relativeAbundance: 32, fragmentFormula: '[⁷⁹Br]⁺', description: 'Catión bromo-79 atómico.' },
          { mz: 81, relativeAbundance: 31, fragmentFormula: '[⁸¹Br]⁺', description: 'Catión bromo-81 atómico.' },
          { mz: 94, relativeAbundance: 100, fragmentFormula: '[CH₃⁷⁹Br]⁺•', description: 'Ion molecular con bromo-79 (pico base).', isBasePeak: true, isMolecularIon: true },
          { mz: 96, relativeAbundance: 98, fragmentFormula: '[CH₃⁸¹Br]⁺•', description: 'Pico isotópico M+2 con bromo-81 (ratio 1:1 característico de bromo).', isIsotopic: true }
        ]
      },
      {
        id: 'dibromomethane',
        name: 'Dibromometano',
        formula: 'CH₂Br₂',
        molarMass: 172,
        description: 'Dos átomos de bromo; triplete de ion molecular en proporción 1:2:1 en m/z 172, 174 y 176.',
        basePeakMz: 93,
        molecularIonMz: 172,
        peaks: [
          { mz: 93, relativeAbundance: 100, fragmentFormula: '[CH₂⁷⁹Br]⁺', description: 'Pico base: catión bromometilo con ⁷⁹Br tras perder Br•.', isBasePeak: true },
          { mz: 95, relativeAbundance: 98, fragmentFormula: '[CH₂⁸¹Br]⁺', description: 'Catión bromometilo con ⁸¹Br (ratio 1:1).', isIsotopic: true },
          { mz: 172, relativeAbundance: 48, fragmentFormula: '[CH₂⁷⁹Br₂]⁺•', description: 'Ion molecular con dos ⁷⁹Br (1 parte).', isMolecularIon: true },
          { mz: 174, relativeAbundance: 96, fragmentFormula: '[CH₂⁷⁹Br⁸¹Br]⁺•', description: 'Ion molecular M+2 con un ⁷⁹Br y un ⁸¹Br (2 partes, doble altura).', isIsotopic: true },
          { mz: 176, relativeAbundance: 47, fragmentFormula: '[CH₂⁸¹Br₂]⁺•', description: 'Ion molecular M+4 con dos ⁸¹Br (1 parte).', isIsotopic: true }
        ]
      },
      {
        id: 'iodomethane',
        name: 'Yodometano (Yoduro de metilo)',
        formula: 'CH₃I',
        molarMass: 142,
        description: 'Compuesto yodado monoisotópico (¹²⁷I); ion molecular pico base m/z 142 y pico conspicuo del catión yodo m/z 127.',
        basePeakMz: 142,
        molecularIonMz: 142,
        peaks: [
          { mz: 15, relativeAbundance: 65, fragmentFormula: '[CH₃]⁺', description: 'Pérdida de yodo.' },
          { mz: 127, relativeAbundance: 82, fragmentFormula: '[I]⁺', description: 'Catión yodo atómico libre característico.' },
          { mz: 141, relativeAbundance: 18, fragmentFormula: '[M - H]⁺', description: 'Pérdida de protón.' },
          { mz: 142, relativeAbundance: 100, fragmentFormula: '[CH₃I]⁺•', description: 'Ion molecular y pico base por polarizabilidad del yodo.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'chloroethane',
        name: 'Cloroetano',
        formula: 'C₂H₅Cl',
        molarMass: 64,
        description: 'Halogenuro alifático con doblete de cloro 3:1 en m/z 64 y 66; pico base catión etilo m/z 29.',
        basePeakMz: 29,
        molecularIonMz: 64,
        peaks: [
          { mz: 27, relativeAbundance: 45, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 29, relativeAbundance: 100, fragmentFormula: '[C₂H₅]⁺', description: 'Pico base: catión etilo por pérdida de radical cloro Cl•.', isBasePeak: true },
          { mz: 49, relativeAbundance: 35, fragmentFormula: '[CH₂Cl]⁺', description: 'Pérdida de metilo.' },
          { mz: 64, relativeAbundance: 58, fragmentFormula: '[C₂H₅³⁵Cl]⁺•', description: 'Ion molecular con ³⁵Cl.', isMolecularIon: true },
          { mz: 66, relativeAbundance: 19, fragmentFormula: '[C₂H₅³⁷Cl]⁺•', description: 'Pico isotópico M+2 con ³⁷Cl (ratio 3:1).', isIsotopic: true }
        ]
      },
      {
        id: 'bromoethane',
        name: 'Bromoetano',
        formula: 'C₂H₅Br',
        molarMass: 108,
        description: 'Halogenuro de bromo con doblete gemelo 1:1 en m/z 108 y 110; pico base catión etilo m/z 29.',
        basePeakMz: 29,
        molecularIonMz: 108,
        peaks: [
          { mz: 27, relativeAbundance: 42, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 29, relativeAbundance: 100, fragmentFormula: '[C₂H₅]⁺', description: 'Pico base: catión etilo por pérdida del radical bromo Br•.', isBasePeak: true },
          { mz: 79, relativeAbundance: 28, fragmentFormula: '[⁷⁹Br]⁺', description: 'Catión bromo-79.' },
          { mz: 108, relativeAbundance: 68, fragmentFormula: '[C₂H₅⁷⁹Br]⁺•', description: 'Ion molecular con ⁷⁹Br.', isMolecularIon: true },
          { mz: 110, relativeAbundance: 66, fragmentFormula: '[C₂H₅⁸¹Br]⁺•', description: 'Pico isotópico M+2 con ⁸¹Br (ratio 1:1 exacto).', isIsotopic: true }
        ]
      },
      {
        id: 'iodoethane',
        name: 'Yodoetano',
        formula: 'C₂H₅I',
        molarMass: 156,
        description: 'Compuesto yodado; pico base catión etilo m/z 29 y catión yodo m/z 127.',
        basePeakMz: 29,
        molecularIonMz: 156,
        peaks: [
          { mz: 29, relativeAbundance: 100, fragmentFormula: '[C₂H₅]⁺', description: 'Pico base: carbocatión etilo por pérdida de yodo.', isBasePeak: true },
          { mz: 127, relativeAbundance: 68, fragmentFormula: '[I]⁺', description: 'Catión yodo atómico.' },
          { mz: 156, relativeAbundance: 78, fragmentFormula: '[C₂H₅I]⁺•', description: 'Ion molecular muy intenso.', isMolecularIon: true }
        ]
      },
      {
        id: 'one_chloropropane',
        name: '1-Cloropropano',
        formula: 'C₃H₇Cl',
        molarMass: 78,
        description: 'Cloruro primario; pérdida de cloro rindiendo el carbocatión propilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 78,
        peaks: [
          { mz: 27, relativeAbundance: 38, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 41, relativeAbundance: 58, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: carbocatión propilo por expulsión de Cl•.', isBasePeak: true },
          { mz: 78, relativeAbundance: 25, fragmentFormula: '[C₃H₇³⁵Cl]⁺•', description: 'Ion molecular con ³⁵Cl.', isMolecularIon: true },
          { mz: 80, relativeAbundance: 8, fragmentFormula: '[C₃H₇³⁷Cl]⁺•', description: 'Pico M+2 con ³⁷Cl.', isIsotopic: true }
        ]
      },
      {
        id: 'two_chloropropane',
        name: '2-Cloropropano (Cloruro de isopropilo)',
        formula: 'C₃H₇Cl',
        molarMass: 78,
        description: 'Cloruro secundario; formación cuantitativa del carbocatión isopropilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 78,
        peaks: [
          { mz: 27, relativeAbundance: 28, fragmentFormula: '[C₂H₃]⁺', description: 'Alifático.' },
          { mz: 41, relativeAbundance: 55, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH(CH₃)₂]⁺', description: 'Pico base: carbocatión isopropilo hiperconjugado secundario.', isBasePeak: true },
          { mz: 63, relativeAbundance: 32, fragmentFormula: '[CH₃CH³⁵Cl]⁺', description: 'Pérdida de metilo.' },
          { mz: 78, relativeAbundance: 18, fragmentFormula: '[C₃H₇³⁵Cl]⁺•', description: 'Ion molecular con ³⁵Cl.', isMolecularIon: true },
          { mz: 80, relativeAbundance: 6, fragmentFormula: '[C₃H₇³⁷Cl]⁺•', description: 'Isótopo M+2 con ³⁷Cl.', isIsotopic: true }
        ]
      },
      {
        id: 'one_bromopropane',
        name: '1-Bromopropano',
        formula: 'C₃H₇Br',
        molarMass: 122,
        description: 'Bromuro primario con doblete 1:1 en m/z 122 y 124; carbocatión propilo m/z 43 como pico base.',
        basePeakMz: 43,
        molecularIonMz: 122,
        peaks: [
          { mz: 27, relativeAbundance: 32, fragmentFormula: '[C₂H₃]⁺', description: 'Vinilo.' },
          { mz: 41, relativeAbundance: 65, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[C₃H₇]⁺', description: 'Pico base: carbocatión propilo por pérdida de Br•.', isBasePeak: true },
          { mz: 122, relativeAbundance: 35, fragmentFormula: '[C₃H₇⁷⁹Br]⁺•', description: 'Ion molecular con ⁷⁹Br.', isMolecularIon: true },
          { mz: 124, relativeAbundance: 34, fragmentFormula: '[C₃H₇⁸¹Br]⁺•', description: 'Pico M+2 con ⁸¹Br (ratio 1:1).', isIsotopic: true }
        ]
      },
      {
        id: 'two_bromopropane',
        name: '2-Bromopropano (Bromuro de isopropilo)',
        formula: 'C₃H₇Br',
        molarMass: 122,
        description: 'Bromuro secundario; pico base cuantitativo en carbocatión isopropilo m/z 43 y doblete 1:1 en m/z 122 y 124.',
        basePeakMz: 43,
        molecularIonMz: 122,
        peaks: [
          { mz: 41, relativeAbundance: 48, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 43, relativeAbundance: 100, fragmentFormula: '[CH(CH₃)₂]⁺', description: 'Pico base: carbocatión isopropilo.', isBasePeak: true },
          { mz: 79, relativeAbundance: 25, fragmentFormula: '[⁷⁹Br]⁺', description: 'Catión bromo.' },
          { mz: 122, relativeAbundance: 28, fragmentFormula: '[C₃H₇⁷⁹Br]⁺•', description: 'Ion molecular con ⁷⁹Br.', isMolecularIon: true },
          { mz: 124, relativeAbundance: 27, fragmentFormula: '[C₃H₇⁸¹Br]⁺•', description: 'Pico M+2 con ⁸¹Br (ratio 1:1).', isIsotopic: true }
        ]
      },
      {
        id: 'one_chlorobutane',
        name: '1-Clorobutano',
        formula: 'C₄H₉Cl',
        molarMass: 92,
        description: 'Cloruro primario de 4C; el pico base es el carbocatión butilo m/z 57 con doblete 3:1 en m/z 92 y 94.',
        basePeakMz: 57,
        molecularIonMz: 92,
        peaks: [
          { mz: 29, relativeAbundance: 42, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 41, relativeAbundance: 58, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C₄H₉]⁺', description: 'Pico base: carbocatión butilo por pérdida de Cl•.', isBasePeak: true },
          { mz: 92, relativeAbundance: 12, fragmentFormula: '[C₄H₉³⁵Cl]⁺•', description: 'Ion molecular con ³⁵Cl.', isMolecularIon: true },
          { mz: 94, relativeAbundance: 4, fragmentFormula: '[C₄H₉³⁷Cl]⁺•', description: 'Pico M+2 con ³⁷Cl.', isIsotopic: true }
        ]
      },
      {
        id: 'tert_butyl_chloride',
        name: 'Cloruro de tert-Butilo',
        formula: 'C₄H₉Cl',
        molarMass: 92,
        description: 'Cloruro terciario; pérdida heterolítica inmediata del ion cloruro formando carbocatión t-butilo m/z 57 como base absoluta.',
        basePeakMz: 57,
        molecularIonMz: 92,
        peaks: [
          { mz: 29, relativeAbundance: 22, fragmentFormula: '[C₂H₅]⁺', description: 'Etilo.' },
          { mz: 41, relativeAbundance: 48, fragmentFormula: '[C₃H₅]⁺', description: 'Alilo.' },
          { mz: 57, relativeAbundance: 100, fragmentFormula: '[C(CH₃)₃]⁺', description: 'Pico base total: carbocatión t-butilo terciario de extrema estabilidad.', isBasePeak: true },
          { mz: 77, relativeAbundance: 28, fragmentFormula: '[C₃H₆³⁵Cl]⁺', description: 'Pérdida de metilo.' },
          { mz: 92, relativeAbundance: 0.1, fragmentFormula: '[C₄H₉³⁵Cl]⁺•', description: 'Ion molecular prácticamente inexistente.', isMolecularIon: true }
        ]
      },
      {
        id: 'chlorobenzene_hal',
        name: 'Clorobenceno',
        formula: 'C₆H₅Cl',
        molarMass: 112,
        description: 'Halobenceno aromático; ion molecular muy intenso que exhibe el clásico doblete 3:1 en m/z 112 y 114; pico base fenilo m/z 77.',
        basePeakMz: 77,
        molecularIonMz: 112,
        peaks: [
          { mz: 50, relativeAbundance: 22, fragmentFormula: '[C₄H₂]⁺•', description: 'Fragmento aromático.' },
          { mz: 51, relativeAbundance: 28, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento cíclico.' },
          { mz: 77, relativeAbundance: 100, fragmentFormula: '[C₆H₅]⁺', description: 'Pico base: catión fenilo tras perder radical cloro Cl•.', isBasePeak: true },
          { mz: 112, relativeAbundance: 68, fragmentFormula: '[C₆H₅³⁵Cl]⁺•', description: 'Ion molecular con ³⁵Cl (75.8% abundancia natural).', isMolecularIon: true },
          { mz: 114, relativeAbundance: 22, fragmentFormula: '[C₆H₅³⁷Cl]⁺•', description: 'Ion molecular M+2 con ³⁷Cl (ratio 3:1 perfecto).', isIsotopic: true }
        ]
      },
      {
        id: 'bromobenzene',
        name: 'Bromobenceno',
        formula: 'C₆H₅Br',
        molarMass: 156,
        description: 'Aromático bromado; doblete gemelo de alturas idénticas 1:1 en m/z 156 y 158; pico base fenilo m/z 77.',
        basePeakMz: 77,
        molecularIonMz: 156,
        peaks: [
          { mz: 50, relativeAbundance: 25, fragmentFormula: '[C₄H₂]⁺•', description: 'Fragmento aromático.' },
          { mz: 51, relativeAbundance: 32, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento cíclico.' },
          { mz: 77, relativeAbundance: 100, fragmentFormula: '[C₆H₅]⁺', description: 'Pico base: catión fenilo por pérdida del radical bromo Br•.', isBasePeak: true },
          { mz: 156, relativeAbundance: 78, fragmentFormula: '[C₆H₅⁷⁹Br]⁺•', description: 'Ion molecular con ⁷⁹Br.', isMolecularIon: true },
          { mz: 158, relativeAbundance: 76, fragmentFormula: '[C₆H₅⁸¹Br]⁺•', description: 'Pico isotópico M+2 con ⁸¹Br (ratio 1:1 exacto).', isIsotopic: true }
        ]
      },
      {
        id: 'iodobenzene',
        name: 'Yodobenceno',
        formula: 'C₆H₅I',
        molarMass: 204,
        description: 'Aromático yodado; ion molecular base m/z 204 y picos intensos en fenilo m/z 77 y catión yodo libre m/z 127.',
        basePeakMz: 204,
        molecularIonMz: 204,
        peaks: [
          { mz: 51, relativeAbundance: 35, fragmentFormula: '[C₄H₃]⁺', description: 'Fragmento aromático.' },
          { mz: 77, relativeAbundance: 92, fragmentFormula: '[C₆H₅]⁺', description: 'Catión fenilo por pérdida de yodo.' },
          { mz: 127, relativeAbundance: 45, fragmentFormula: '[I]⁺', description: 'Catión yodo atómico libre.' },
          { mz: 204, relativeAbundance: 100, fragmentFormula: '[C₆H₅I]⁺•', description: 'Ion molecular y pico base por alta polarizabilidad aromática-yodo.', isBasePeak: true, isMolecularIon: true }
        ]
      },
      {
        id: 'benzyl_chloride',
        name: 'Cloruro de Bencilo',
        formula: 'C₇H₇Cl',
        molarMass: 126,
        description: 'Halogenuro bencílico reactivo; pérdida cuantitativa del radical cloro Cl• formando el catión tropilio m/z 91 como pico base absoluto.',
        basePeakMz: 91,
        molecularIonMz: 126,
        peaks: [
          { mz: 65, relativeAbundance: 28, fragmentFormula: '[C₅H₅]⁺', description: 'Fragmento de tropilio por pérdida de acetileno.' },
          { mz: 89, relativeAbundance: 20, fragmentFormula: '[C₇H₅]⁺', description: 'Deshidrogenación aromática.' },
          { mz: 91, relativeAbundance: 100, fragmentFormula: '[C₇H₇]⁺', description: 'Pico base absoluto: catión tropilio aromático de 7 miembros tras expulsar Cl•.', isBasePeak: true },
          { mz: 126, relativeAbundance: 35, fragmentFormula: '[C₇H₇³⁵Cl]⁺•', description: 'Ion molecular con ³⁵Cl.', isMolecularIon: true },
          { mz: 128, relativeAbundance: 11, fragmentFormula: '[C₇H₇³⁷Cl]⁺•', description: 'Pico isotópico M+2 con ³⁷Cl (ratio 3:1).', isIsotopic: true }
        ]
      }
    ]
  }
];
