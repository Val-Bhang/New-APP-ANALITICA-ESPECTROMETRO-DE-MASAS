export interface GcCompound {
  id: string;
  name: string;
  formula: string;
  bpC: number;
  kovatsDb5: number;
  polarityIndex: number; // 0 (apolar alkane) to 1 (highly polar acid/alcohol)
  fidResponse: number; // relative carbon response (0.05 to 1.0)
  tcdResponse: number; // universal thermal conductivity response (0.3 to 1.0)
  companionName: string;
  companionBpC: number;
  companionPolarity: number;
  description: string;
  keyFeatureNote: string;
}

export interface GcGroup {
  id: string;
  name: string;
  badge: string;
  description: string;
  compounds: GcCompound[];
}

export type CarrierGasType = 'He' | 'H2' | 'N2';
export type OvenProgramMode = 'ramp' | 'isothermal';
export type ColumnPhaseType = 'DB-5ms' | 'DB-Wax';
export type InjectionModeType = 'split' | 'splitless' | 'septum_leak';
export type GcDetectorType = 'FID' | 'TCD';

export interface GcSimulationResult {
  points: { timeMin: number; signalMv: number; ovenTempC: number }[];
  tM: number; // dead time in min
  tRAnalyte: number;
  tRCompanion: number;
  elutionTempC: number;
  kPrime: number;
  platesN: number;
  resolutionRs: number;
  kovatsRiEffective: number;
  linearVelocityCms: number;
  optimumVelocityCms: number;
  snrEstimate: number;
  peakHeightAnalyte: number;
  peakWidthHalfMin: number;
  systemError: string | null;
  diagnosticMessage: string;
}

const mk = (
  id: string,
  name: string,
  formula: string,
  bpC: number,
  kovatsDb5: number,
  polarityIndex: number,
  fidResponse: number,
  tcdResponse: number,
  companionName: string,
  companionBpC: number,
  companionPolarity: number,
  description: string,
  keyFeatureNote: string
): GcCompound => ({
  id,
  name,
  formula,
  bpC,
  kovatsDb5,
  polarityIndex,
  fidResponse,
  tcdResponse,
  companionName,
  companionBpC,
  companionPolarity,
  description,
  keyFeatureNote
});

export const GC_GROUPS_DATA: GcGroup[] = [
  {
    id: 'alkanes',
    name: '1. n-Alcanos y Referencias de Kováts',
    badge: 'C₅–C₁₆',
    description: 'Patrones primarios apolares (RI = 100·n) para calibrar Índices de Retención de Kováts.',
    compounds: [
      mk('gc_pentane', 'n-Pentano', 'C₅H₁₂', 36, 500, 0.02, 0.92, 0.85, '2-Metilbutano', 28, 0.02, 'Alcano muy volátil cerca del frente del disolvente.', 'RI = 500 exacto en DB-5ms'),
      mk('gc_hexane', 'n-Hexano', 'C₆H₁₄', 69, 600, 0.02, 0.95, 0.86, 'Ciclohexano', 81, 0.04, 'Solvente apolar de extracción rápida.', 'RI = 600; separa claramente de ciclohexano'),
      mk('gc_heptane', 'n-Heptano', 'C₇H₁₆', 98, 700, 0.02, 0.97, 0.87, 'Isooctano', 99, 0.03, 'Referencia clásica de octanaje en gasolinas.', 'RI = 700; coeluye en bp con isooctano en fases muy rápidas'),
      mk('gc_octane', 'n-Octano', 'C₈H₁₈', 126, 800, 0.02, 0.98, 0.88, 'Etilciclohexano', 132, 0.05, 'Estándar medio de destilados ligeros.', 'RI = 800; pico gaussiano simétrico ideal'),
      mk('gc_nonane', 'n-Nonano', 'C₉H₂₀', 151, 900, 0.02, 0.99, 0.89, 'Cumeno', 152, 0.14, 'Componente alifático de queroseno.', 'RI = 900; en DB-Wax el cumeno se retrasa por polaridad π'),
      mk('gc_decane', 'n-Decano', 'C₁₀H₂₂', 174, 1000, 0.02, 1.00, 0.90, 'p-Cimeno', 177, 0.15, 'Alcano estándar para pruebas de inyector Split/Splitless.', 'RI = 1000; evalúa discriminación de masa térmica'),
      mk('gc_undecane', 'n-Undecano', 'C₁₁H₂₄', 196, 1100, 0.02, 1.00, 0.90, 'n-Dodecano', 216, 0.02, 'Hidrocarburo medio de fracciones diésel.', 'RI = 1100; referencia para terpenos monoterpénicos'),
      mk('gc_dodecane', 'n-Dodecano', 'C₁₂H₂₆', 216, 1200, 0.02, 1.00, 0.91, 'n-Tridecano', 235, 0.02, 'Patrón para verificar linealidad de rampa de horno.', 'RI = 1200; respuesta unitaria FID'),
      mk('gc_tetradecane', 'n-Tetradecano', 'C₁₄H₃₀', 254, 1400, 0.02, 1.00, 0.91, 'n-Pentadecano', 271, 0.02, 'Alcano pesado que exige rampa hasta 260–280 °C.', 'RI = 1400; en modo isotérmico 120 °C sale sumamente ancho'),
      mk('gc_hexadecane', 'n-Hexadecano (Cetano)', 'C₁₆H₃₄', 287, 1600, 0.02, 1.00, 0.92, 'n-Heptadecano', 302, 0.02, 'Estándar de ignición diésel y prueba Grob de columna.', 'RI = 1600; requiere rampa térmica para pico agudo')
    ]
  },
  {
    id: 'aromatics',
    name: '2. Aromáticos BTEX y PAH Volátiles',
    badge: 'Ar-H',
    description: 'Benceno, tolueno, xilenos y aromáticos policíclicos de control ambiental.',
    compounds: [
      mk('gc_benzene', 'Benceno', 'C₆H₆', 80, 653, 0.14, 0.96, 0.85, 'Ciclohexano', 81, 0.04, 'Aromático plano altamente tóxico.', 'En DB-Wax se retiene mucho más que ciclohexano por anillos π'),
      mk('gc_toluene', 'Tolueno', 'C₇H₈', 111, 762, 0.15, 0.98, 0.86, 'Heptano', 98, 0.02, 'Solvente aromático industrial BTEX.', 'Alta respuesta FID (7 carbonos C–H)'),
      mk('gc_ethylbenzene', 'Etilbenceno', 'C₈H₁₀', 136, 855, 0.16, 0.99, 0.87, 'p-Xileno', 138, 0.17, 'Precursor del estireno.', 'Par crítico: requiere fase adecuada para separar p-xileno'),
      mk('gc_pxylene', 'p-Xileno', 'C₈H₁₀', 138, 865, 0.17, 0.99, 0.87, 'o-Xileno', 144, 0.19, 'Isómero para-dimetilbenceno.', 'En DB-Wax resuelve bien respecto a o-xileno'),
      mk('gc_oxylene', 'o-Xileno', 'C₈H₁₀', 144, 888, 0.19, 0.99, 0.87, 'Estireno', 145, 0.22, 'Isómero orto de xilenos.', 'Mayor dipolo y ebullición que p-xileno'),
      mk('gc_styrene', 'Estireno', 'C₈H₈', 145, 891, 0.22, 0.98, 0.86, 'o-Xileno', 144, 0.19, 'Monómero vinilaromático.', 'Interactúa fuertemente en columna polar Wax'),
      mk('gc_cumene', 'Cumeno (Isopropilbenceno)', 'C₉H₁₂', 152, 922, 0.15, 1.00, 0.88, 'Mesitileno', 165, 0.16, 'Intermediario industrial fenol-acetona.', 'Pico estrecho a ~150 °C en rampa'),
      mk('gc_naphthalene', 'Naftaleno', 'C₁₀H₈', 218, 1182, 0.24, 1.00, 0.88, '2-Metilnaftaleno', 241, 0.25, 'PAH bicíclico más ligero.', 'Alta respuesta FID; ideal para prueba de liner limpio'),
      mk('gc_phenanthrene', 'Fenantreno', 'C₁₄H₁₀', 340, 1775, 0.28, 1.00, 0.90, 'Antraceno', 342, 0.28, 'PAH tricíclico angular semivolátil.', 'Exige temperatura alta de inyector (280–300 °C) y rampa'),
      mk('gc_pyrene', 'Pireno', 'C₁₆H₁₀', 404, 2102, 0.30, 1.00, 0.91, 'Fluoranteno', 384, 0.29, 'PAH tetracíclico ambiental pesado.', 'Eluye al final de la rampa; muy lento en modo isotérmico')
    ]
  },
  {
    id: 'alcohols',
    name: '3. Alcoholes Volátiles y Fermentación',
    badge: 'R-OH',
    description: 'Etanol, metanol, fusel alcohols y glicoles analizados en fase polar DB-Wax.',
    compounds: [
      mk('gc_methanol', 'Metanol', 'CH₃OH', 65, 381, 0.78, 0.45, 0.80, 'Etanol', 78, 0.72, 'Alcohol más simple; tóxico en bebidas.', 'FID responde menos por estar parcialmente oxidado (C–OH)'),
      mk('gc_ethanol', 'Etanol', 'C₂H₅OH', 78, 445, 0.72, 0.65, 0.82, '1-Propanol', 97, 0.68, 'Estándar de fermentación y alcoholimetría GC-FID.', 'En DB-Wax sale muy separado del frente apolar'),
      mk('gc_isopropanol', '2-Propanol (Isopropanol)', 'C₃H₇OH', 83, 495, 0.66, 0.74, 0.83, 'tert-Butanol', 82, 0.60, 'Solvente desinfectante y cromatográfico.', 'Eluye antes que 1-propanol por menor puente de H'),
      mk('gc_1propanol', '1-Propanol', 'C₃H₇OH', 97, 558, 0.68, 0.76, 0.83, '2-Butanol', 100, 0.61, 'Estándar interno típico en análisis de etanol.', 'Excelente resolución frente a metanol/etanol en DB-Wax'),
      mk('gc_1butanol', '1-Butanol', 'C₄H₉OH', 118, 661, 0.64, 0.82, 0.85, 'Isobutanol', 108, 0.62, 'Alcohol de fusel en destilados.', 'Interacción fuerte con polietilenglicol (Wax)'),
      mk('gc_isoamyl_alcohol', 'Alcohol Isoamílico', 'C₅H₁₁OH', 131, 736, 0.60, 0.86, 0.86, '1-Pentanol', 138, 0.61, 'Principal congénere aromático del vino/whisky.', 'Muy bien separado en capilar de 30 m'),
      mk('gc_hexanol', '1-Hexanol', 'C₆H₁₃OH', 157, 868, 0.56, 0.89, 0.87, 'Ciclohexanol', 161, 0.58, 'Aroma verde herbal en aceites vegetales.', 'Simetría depende de inyector desactivado sin silanoles'),
      mk('gc_linalool', 'Linalool', 'C₁₀H₁₈O', 198, 1098, 0.45, 0.94, 0.88, 'Geraniol', 230, 0.48, 'Alcohol monoterpénico floral (lavanda/cítricos).', 'RI ≈ 1098 en DB-5ms; se desplaza fuerte en Wax'),
      mk('gc_benzyl_alcohol', 'Alcohol Bencílico', 'C₇H₈O', 205, 1036, 0.62, 0.90, 0.87, '2-Feniletanol', 219, 0.60, 'Conservante farmacéutico aromático.', 'Alta polaridad y excelente sensibilidad FID'),
      mk('gc_menthol', '(-)-Mentol', 'C₁₀H₂₀O', 212, 1173, 0.44, 0.95, 0.89, 'Borneol', 213, 0.46, 'Alcohol terpénico cíclico de menta.', 'En DB-Wax logra separar claramente isómeros de ebullición idéntica')
    ]
  },
  {
    id: 'aldehydes_terpenes',
    name: '4. Aldehídos y Terpenos Aromáticos',
    badge: 'R-CHO / C₁₀',
    description: 'Fragancias naturales, aceites esenciales y marcadores de oxidación lipídica.',
    compounds: [
      mk('gc_acetaldehyde', 'Acetaldehído', 'C₂H₄O', 21, 365, 0.55, 0.52, 0.78, 'Propanal', 49, 0.50, 'Aldehído muy volátil indicador de fermentación.', 'Requiere horno frío inicial (35–40 °C) para resolverlo'),
      mk('gc_hexanal', 'Hexanal', 'C₆H₁₂O', 131, 801, 0.42, 0.85, 0.85, 'Heptanal', 153, 0.40, 'Marcador clave de rancidez oxidativa en aceites.', 'RI ≈ 801 en DB-5ms'),
      mk('gc_benzaldehyde', 'Benzaldehído', 'C₇H₆O', 178, 961, 0.48, 0.88, 0.86, 'Furfural', 162, 0.58, 'Aroma de almendra amarga.', 'Retención incrementada en columna polar DB-Wax'),
      mk('gc_pinene', 'α-Pineno', 'C₁₀H₁₆', 156, 934, 0.06, 0.99, 0.88, 'β-Pineno', 166, 0.07, 'Monoterpeno mayoritario de trementina y pino.', 'Apolar; eluye temprano en DB-Wax frente a alcoholes'),
      mk('gc_limonene', 'D-Limoneno', 'C₁₀H₁₆', 176, 1029, 0.08, 0.99, 0.88, '1,8-Cineol', 176, 0.24, 'Terpeno cítrico; mismo bp que eucaliptol (176 °C).', 'DB-Wax separa D-limoneno de 1,8-cineol por polaridad'),
      mk('gc_citral', 'Citral (Geranial)', 'C₁₀H₁₆O', 229, 1270, 0.40, 0.93, 0.88, 'Neral', 226, 0.40, 'Aldehído terpénico de limón; lábil al calor excesivo.', 'Requiere liner desactivado para evitar ciclización'),
      mk('gc_cinnamaldehyde', 'Cinamaldehído', 'C₉H₈O', 248, 1272, 0.52, 0.92, 0.88, 'Eugenol', 254, 0.50, 'Componente principal de la canela.', 'Pico agudo en rampa térmica programada'),
      mk('gc_vanillin', 'Vainillina', 'C₈H₈O₃', 285, 1398, 0.68, 0.78, 0.86, 'Etilvainillina', 295, 0.65, 'Aldehído fenólico principal de la vainilla.', 'Muy polar y alto bp: se retiene fuertemente en DB-Wax'),
      mk('gc_myrcene', 'β-Mirceno', 'C₁₀H₁₆', 167, 991, 0.07, 0.99, 0.88, 'Sabineno', 164, 0.08, 'Monoterpeno acíclico del lúpulo y cannabis.', 'RI = 991; cuantificado habitualmente por GC-FID'),
      mk('gc_caryophyllene', 'β-Cariofileno', 'C₁₅H₂₄', 262, 1419, 0.09, 1.00, 0.90, 'α-Humuleno', 274, 0.09, 'Sesquiterpeno bicíclico de pimienta y clavo.', 'RI = 1419; excelente señal en ambos detectores')
    ]
  },
  {
    id: 'ketones_ethers',
    name: '5. Cetonas y Éteres Volátiles',
    badge: 'R₂C=O / R-O-R',
    description: 'Disolventes industriales, aditivos MTBE/ETBE de gasolina y alcanfor.',
    compounds: [
      mk('gc_acetone', 'Acetona', 'C₃H₆O', 56, 475, 0.52, 0.66, 0.82, 'Metil etil cetona', 80, 0.48, 'Cetona más volátil; solvente universal.', 'Sale inmediatamente tras el frente de aire/metano'),
      mk('gc_mek', 'Butanona (MEK)', 'C₄H₈O', 80, 588, 0.48, 0.76, 0.83, 'Acetato de etilo', 77, 0.42, 'Solvente industrial de resinas y barnices.', 'Se separa del acetato de etilo mejor en fase Wax'),
      mk('gc_mibk', 'Metil Isobutil Cetona (MIBK)', 'C₆H₁₂O', 117, 735, 0.42, 0.86, 0.85, 'Tolueno', 111, 0.15, 'Disolvente de extracción farmacéutica.', 'Fuerte desplazamiento en columna polar respecto a tolueno'),
      mk('gc_cyclohexanone', 'Ciclohexanona', 'C₆H₁₀O', 156, 893, 0.46, 0.88, 0.86, '2-Heptanona', 151, 0.40, 'Precursor del nailon; disolvente de PVC.', 'Alta respuesta FID por sus 5 metilenos'),
      mk('gc_diethyl_ether', 'Éter Dietílico', '(C₂H₅)₂O', 35, 498, 0.28, 0.78, 0.84, 'n-Pentano', 36, 0.02, 'Solvente volátil de extracción líquida.', 'Idéntico bp que n-pentano (35 °C); DB-Wax los separa al instante'),
      mk('gc_mtbe', 'MTBE (Metil tert-Butil Éter)', 'C₅H₁₂O', 55, 568, 0.25, 0.82, 0.85, 'Benceno', 80, 0.14, 'Aditivo oxigenado en análisis de gasolinas.', 'Cuantificado con alta precisión por GC-FID'),
      mk('gc_thf', 'Tetrahidrofurano (THF)', 'C₄H₈O', 66, 622, 0.38, 0.79, 0.84, 'Hexano', 69, 0.02, 'Éter cíclico miscible con agua.', 'Mismo bp que hexano; separado fácilmente en DB-Wax'),
      mk('gc_acetophenone', 'Acetofenona', 'C₈H₈O', 202, 1066, 0.47, 0.90, 0.87, 'Propiofenona', 218, 0.45, 'Cetona aromática estándar de fragancias.', 'RI = 1066 en DB-5ms'),
      mk('gc_camphor', 'Alcanfor', 'C₁₀H₁₆O', 204, 1144, 0.36, 0.93, 0.88, 'Isoborneol', 212, 0.45, 'Cetona bicíclica terpénica.', 'Sublima limpio en el inyector a 250 °C'),
      mk('gc_benzophenone', 'Benzofenona', 'C₁₃H₁₀O', 305, 1626, 0.46, 0.94, 0.89, 'Fluorenona', 341, 0.48, 'Fotoiniciador UV semivolátil de empaques.', 'Requiere rampa hasta 280 °C para evitar ensanchamiento')
    ]
  },
  {
    id: 'esters_fames',
    name: '6. Ésteres Frutales y FAMEs (Biodiésel)',
    badge: 'R-COOR\'',
    description: 'Ésteres volátiles de frutas y ésteres metílicos de ácidos grasos (FAME C₈–C₁₈).',
    compounds: [
      mk('gc_ethyl_acetate', 'Acetato de Etilo', 'C₄H₈O₂', 77, 610, 0.42, 0.65, 0.83, 'Etanol', 78, 0.72, 'Éster más abundante en vinos y solventes.', 'En DB-Wax el etanol queda retenido detrás del acetato'),
      mk('gc_butyl_acetate', 'Acetato de Butilo', 'C₆H₁₂O₂', 126, 811, 0.38, 0.78, 0.85, 'n-Octano', 126, 0.02, 'Aroma característico de manzana/pera.', 'Mismo bp que octano; separados nítidamente en fase polar'),
      mk('gc_isoamyl_acetate', 'Acetato de Isoamilo', 'C₇H₁₄O₂', 142, 876, 0.35, 0.82, 0.86, 'Hexanoato de metilo', 151, 0.34, 'Éster aromático intenso de plátano.', 'RI = 876; respuesta FID limpia'),
      mk('gc_ethyl_butyrate', 'Butirato de Etilo', 'C₆H₁₂O₂', 121, 802, 0.37, 0.78, 0.85, 'Butirato de metilo', 102, 0.39, 'Aroma frutal de piña y fresa.', 'Pico estrecho de alta eficiencia capilar'),
      mk('gc_methyl_octanoate', 'Octanoato de Metilo (C8:0 FAME)', 'C₉H₁₈O₂', 193, 1126, 0.30, 0.88, 0.87, 'Decanoato de metilo', 224, 0.28, 'FAME ligero estándar de biodiésel y aceite de coco.', 'Base para calibrar cadena corta FAME'),
      mk('gc_methyl_decanoate', 'Decanoato de Metilo (C10:0 FAME)', 'C₁₁H₂₂O₂', 224, 1326, 0.28, 0.91, 0.88, 'Laurato de metilo', 262, 0.26, 'Éster metílico caprílico estándar.', 'Incremento constante de ~200 RI cada CH₂CH₂'),
      mk('gc_methyl_laurate', 'Laurato de Metilo (C12:0 FAME)', 'C₁₃H₂₆O₂', 262, 1525, 0.25, 0.93, 0.89, 'Miristato de metilo', 295, 0.23, 'Componente mayoritario del biodiésel de coco/palma.', 'Requiere rampa > 220 °C para eluir rápido'),
      mk('gc_methyl_myristate', 'Miristato de Metilo (C14:0 FAME)', 'C₁₅H₃₀O₂', 295, 1724, 0.23, 0.95, 0.90, 'Palmitato de metilo', 330, 0.21, 'FAME C14:0 de grasas lácteas y aceites.', 'Eluye a ~225 °C en rampa programada'),
      mk('gc_methyl_palmitate', 'Palmitato de Metilo (C16:0 FAME)', 'C₁₇H₃₄O₂', 330, 1926, 0.21, 0.97, 0.90, 'Estearato de metilo', 355, 0.20, 'Éster metílico C16 saturado universal en alimentos.', 'Pico robusto y reproducible en Split 50:1'),
      mk('gc_methyl_oleate', 'Oleato de Metilo (C18:1 FAME)', 'C₁₉H₃₆O₂', 349, 2104, 0.24, 0.98, 0.91, 'Estearato de metilo', 355, 0.20, 'Principal FAME monoinsaturado de oliva y biodiésel.', 'En DB-Wax el doble enlace retiene más que C18:0')
    ]
  },
  {
    id: 'volatile_acids',
    name: '7. Ácidos Grasos Volátiles (VFA)',
    badge: 'R-COOH',
    description: 'Ácidos acético a octanoico analizados en columnas polares estabilizadas (FFAP/Wax).',
    compounds: [
      mk('gc_formic_acid', 'Ácido Fórmico', 'HCOOH', 101, 510, 0.95, 0.08, 0.78, 'Ácido Acético', 118, 0.90, 'Ácido más simple sin enlace C–H reducido.', 'Casi invisible en FID (usa TCD); muy polar'),
      mk('gc_acetic_acid', 'Ácido Acético', 'CH₃COOH', 118, 600, 0.90, 0.35, 0.80, 'Ácido Propiónico', 141, 0.84, 'Acidez volátil en vinos y fermentadores.', 'Baja respuesta FID; cola severa si hay sitios activos'),
      mk('gc_propionic_acid', 'Ácido Propiónico', 'C₃H₆O₂', 141, 695, 0.84, 0.56, 0.82, 'Ácido Isobutírico', 155, 0.79, 'Conservante panificador y marcador ruminal.', 'Altamente retenido en fase polar PEG'),
      mk('gc_isobutyric_acid', 'Ácido Isobutírico', 'C₄H₈O₂', 155, 765, 0.79, 0.68, 0.83, 'Ácido Butírico', 164, 0.80, 'VFA ramificado de fermentación proteica.', 'Resuelve limpio antes del ácido n-butírico'),
      mk('gc_butyric_acid', 'Ácido Butírico', 'C₄H₈O₂', 164, 795, 0.80, 0.69, 0.83, 'Ácido Isovalérico', 177, 0.76, 'Ácido carboxílico de mantequilla y digestores.', 'Requiere liner desactivado y fase ácida'),
      mk('gc_isovaleric_acid', 'Ácido Isovalérico', 'C₅H₁₀O₂', 177, 845, 0.76, 0.76, 0.84, 'Ácido Valérico', 186, 0.77, 'VFA ramificado característico de quesos.', 'Buena respuesta en FID al crecer la cadena alquílica'),
      mk('gc_valeric_acid', 'Ácido Valérico', 'C₅H₁₀O₂', 186, 882, 0.77, 0.77, 0.85, 'Ácido Hexanoico', 205, 0.74, 'Estándar C5 de ácidos grasos volátiles.', 'Retención muy sensible al recubrimiento polar'),
      mk('gc_hexanoic_acid', 'Ácido Hexanoico (Caproico)', 'C₆H₁₂O₂', 205, 978, 0.74, 0.82, 0.86, 'Ácido Heptanoico', 223, 0.71, 'Ácido graso de leche de cabra.', 'Eluye limpio en programa hasta 240 °C'),
      mk('gc_heptanoic_acid', 'Ácido Heptanoico', 'C₇H₁₄O₂', 223, 1074, 0.71, 0.86, 0.87, 'Ácido Octanoico', 239, 0.69, 'Ácido graso impar C7 usado como estándar interno VFA.', 'Excelente simetría térmica en rampa'),
      mk('gc_octanoic_acid', 'Ácido Octanoico (Caprílico)', 'C₈H₁₆O₂', 239, 1170, 0.69, 0.89, 0.88, 'Ácido Decanoico', 269, 0.65, 'Ácido graso antimicrobiano de cadena media.', 'Separado claramente de su homólogo C7')
    ]
  },
  {
    id: 'halides',
    name: '8. Haluros Orgánicos y Disolventes Clorados',
    badge: 'R-Cl / R-Br',
    description: 'Trihalometanos en agua potable y disolventes halogenados (FID vs TCD).',
    compounds: [
      mk('gc_dichloromethane', 'Diclorometano (DCM)', 'CH₂Cl₂', 40, 524, 0.30, 0.25, 0.82, 'Cloroformo', 61, 0.26, 'Disolvente de extracción volátil; baja respuesta FID.', 'Los cloros reducen la señal FID; mejor relación en TCD'),
      mk('gc_chloroform', 'Cloroformo', 'CHCl₃', 61, 615, 0.26, 0.14, 0.84, 'Tetraclorometano', 77, 0.08, 'Trihalometano regulado en agua potable (EPA 551).', 'Baja quimio-ionización FID por tener 3 átomos Cl'),
      mk('gc_ccl4', 'Tetracloruro de Carbono', 'CCl₄', 77, 661, 0.08, 0.05, 0.88, 'Tricloroetileno', 87, 0.22, 'Compuesto totalmente clorocarbonado sin enlaces C–H.', '¡Casi ciego en FID! Cambia a TCD para observar el pico completo'),
      mk('gc_tce', 'Tricloroetileno (TCE)', 'C₂HCl₃', 87, 696, 0.22, 0.30, 0.85, '1,2-Dicloroetano', 84, 0.32, 'Desengrasante industrial contaminante de acuíferos.', 'Separación clara de 1,2-dicloroetano en DB-Wax'),
      mk('gc_pce', 'Tetracloroetileno (PCE)', 'C₂Cl₄', 121, 808, 0.12, 0.12, 0.87, 'Bromoformo', 149, 0.28, 'Solvente perclorado de tintorería sin enlaces C–H.', 'Respuesta FID mínima; señal robusta en TCD'),
      mk('gc_chlorobenzene', 'Clorobenceno', 'C₆H₅Cl', 132, 845, 0.24, 0.84, 0.86, 'Etilbenceno', 136, 0.16, 'Solvente aromático clorado de referencia MS/FID.', 'El anillo aromático conserva excelente señal FID'),
      mk('gc_bromoform', 'Bromoformo', 'CHBr₃', 149, 892, 0.28, 0.16, 0.85, 'Dibromoclorometano', 120, 0.27, 'Trihalometano bromado pesado.', 'Eluye significativamente después del cloroformo'),
      mk('gc_12dcb', '1,2-Diclorobenceno', 'C₆H₄Cl₂', 180, 1034, 0.29, 0.78, 0.87, '1,4-Diclorobenceno', 174, 0.23, 'Isómero orto de alto momento dipolar.', 'Fuerte retención en fase Wax frente a 1,4-DCB'),
      mk('gc_freon113', '1,1,2-Triclorotrifluoroetano', 'C₂Cl₃F₃', 48, 455, 0.10, 0.06, 0.86, 'Hexafluorobenceno', 80, 0.12, 'Halocarbono perhalogenado inerte.', 'Detector FID casi ciego; TCD lo detecta universalmente'),
      mk('gc_benzyl_chloride', 'Cloruro de Bencilo', 'C₇H₇Cl', 179, 1012, 0.34, 0.82, 0.86, 'Benzaldehído', 178, 0.48, 'Intermediario reactivo de síntesis.', 'Evitar humedad en trampa para impedir hidrólisis en el inyector')
    ]
  },
  {
    id: 'amines_nitriles',
    name: '9. Compuestos Nitrogenados, Aminas y Nitrilos',
    badge: 'R-NH₂ / R-CN',
    description: 'Piridinas, anilinas, nitrilos y amidas sensibles a sitios ácidos del inyector.',
    compounds: [
      mk('gc_acetonitrile', 'Acetonitrilo', 'CH₃CN', 82, 468, 0.68, 0.46, 0.81, 'Propionitrilo', 97, 0.62, 'Nitrilo polar muy usado en extracción QuEChERS.', 'Retención mucho mayor en DB-Wax que por punto de ebullición'),
      mk('gc_triethylamine', 'Trietilamina', 'N(C₂H₅)₃', 89, 692, 0.36, 0.84, 0.85, 'Piridina', 115, 0.56, 'Amina terciaria básica de prueba.', 'Amina sensible a adsorción; exige inyector desactivado'),
      mk('gc_pyridine', 'Piridina', 'C₅H₅N', 115, 748, 0.56, 0.78, 0.85, '2-Metilpiridina', 129, 0.52, 'Base heterocíclica aromática.', 'Muy polar en fase Wax respecto a benceno/tolueno'),
      mk('gc_dmf', 'N,N-Dimetilformamida (DMF)', 'C₃H₇NO', 153, 785, 0.76, 0.58, 0.84, 'Dimetilacetamida', 165, 0.74, 'Solvente aprótico dipolar de espacio de cabeza.', 'Gran desplazamiento por puente dipolar en DB-Wax'),
      mk('gc_benzonitrile', 'Benzonitrilo', 'C₇H₅N', 191, 986, 0.50, 0.86, 0.87, 'Nitrobenceno', 211, 0.54, 'Nitrilo aromático estándar.', 'Pico agudo simétrico en rampa hasta 240 °C'),
      mk('gc_aniline', 'Anilina', 'C₆H₇N', 184, 976, 0.58, 0.85, 0.86, 'N-Metilanilina', 196, 0.52, 'Amina aromática primaria usada en colorantes.', 'Reactiva con liner sucio; muy retenida en polietilenglicol'),
      mk('gc_nitrobenzene', 'Nitrobenceno', 'C₆H₅NO₂', 211, 1087, 0.54, 0.74, 0.86, '2-Nitrotolueno', 222, 0.52, 'Compuesto nitroaromático explosivo/industrial.', 'Alta polaridad con eluyente de ebullición moderada'),
      mk('gc_indole', 'Indol', 'C₈H₇N', 254, 1294, 0.55, 0.90, 0.88, 'Escatol (3-Metilindol)', 266, 0.53, 'Heterociclo nitrogenado de fragancias florales (jazmín).', 'Fuerte retención en Wax; requiere horno > 240 °C'),
      mk('gc_quinoline', 'Quinolina', 'C₉H₇N', 238, 1244, 0.52, 0.91, 0.88, 'Isoquinolina', 243, 0.53, 'Aza-areno heterocíclico de alquitranes.', 'Excelente prueba de neutralidad básica del sistema'),
      mk('gc_caffeine', 'Cafeína', 'C₈H₁₀N₄O₂', 310, 1845, 0.70, 0.68, 0.87, 'Teofilina', 330, 0.76, 'Alcaloide purínico semivolátil térmicamente estable.', 'Inyección Splitless 280 °C + rampa alta')
    ]
  },
  {
    id: 'pesticides',
    name: '10. Pesticidas Organofosforados y Clorados',
    badge: 'Agro-Trazas',
    description: 'Contaminantes agrícolas sub-ppm que requieren modo Splitless e inertización total.',
    compounds: [
      mk('gc_dichlorvos', 'Diclorvos (DDVP)', 'C₄H₇Cl₂O₄P', 234, 1265, 0.48, 0.55, 0.84, 'Mevinfós', 255, 0.50, 'Insecticida organofosforado volátil.', 'Termolábil: sensibilidad crítica a liner limpio sin lana activa'),
      mk('gc_lindane', 'Lindano (γ-HCH)', 'C₆H₆Cl₆', 323, 1745, 0.34, 0.36, 0.86, 'α-HCH', 288, 0.32, 'Organoclorado hexaclorociclohexano.', 'El modo Splitless eleva enormemente su altura para trazas'),
      mk('gc_diazinon', 'Diazinón', 'C₁₂H₂₁N₂O₃PS', 306, 1780, 0.42, 0.84, 0.88, 'Malatión', 325, 0.46, 'Organofosforado de uso agrícola frecuente.', 'RI ≈ 1780; análisis clásico de residuos QuEChERS'),
      mk('gc_chlorpyrifos', 'Clorpirifós', 'C₉H₁₁Cl₃NO₃PS', 335, 1985, 0.39, 0.72, 0.87, 'Paratión etílico', 375, 0.45, 'Insecticida fosforotioato regulado en alimentos.', 'Pico tardío en rampa; inyectar en Splitless para trazas'),
      mk('gc_aldrin', 'Aldrina', 'C₁₂H₈Cl₆', 330, 1945, 0.22, 0.58, 0.87, 'Dieldrina', 385, 0.34, 'Organoclorado persistente (COP).', 'Alta masa molecular; imposible de eluir en isotérmico frío'),
      mk('gc_malathion', 'Malatión', 'C₁₀H₁₉O₆PS₂', 325, 1940, 0.46, 0.76, 0.87, 'Fentión', 340, 0.41, 'Pesticida ditiolofosfato ampliamente vigilado.', 'Rampa hasta 290 °C evita colas por baja volatilidad'),
      mk('gc_endosulfan', 'α-Endosulfán', 'C₉H₆Cl₆O₃S', 370, 2115, 0.36, 0.52, 0.88, 'β-Endosulfán', 390, 0.40, 'Isómero ciclodieno sulfito clorado.', 'Exige temperatura de inyector controlada sin puntos metálicos'),
      mk('gc_ppdde', 'p,p\'-DDE', 'C₁₄H₈Cl₄', 360, 2180, 0.24, 0.74, 0.89, 'p,p\'-DDT', 395, 0.29, 'Metabolito estable del DDT en matrices biológicas.', 'Prueba clásica de degradación térmica del liner DDT → DDE'),
      mk('gc_ppddt', 'p,p\'-DDT', 'C₁₄H₉Cl₅', 395, 2320, 0.29, 0.72, 0.89, 'Metoxicloro', 415, 0.33, 'Estándar de validación ambiental EPA 8081.', 'Exige desactivación absoluta del inyector'),
      mk('gc_permethrin', 'Permetrina (cis/trans)', 'C₂₁H₂₀Cl₂O₃', 425, 2580, 0.31, 0.88, 0.91, 'Cipermetrina', 445, 0.33, 'Piretroide sintético de altísimo punto de ebullición.', 'Solo eluye correctamente con rampa hasta 300–320 °C')
    ]
  },
  {
    id: 'phenols_tms',
    name: '11. Fenoles y Derivados Sililados (TMS)',
    badge: 'Ar-OH / SiMe₃',
    description: 'Fenoles clorados, antioxidantes BHT/BHA y éteres trimetilsililo derivados.',
    compounds: [
      mk('gc_phenol', 'Fenol', 'C₆H₅OH', 182, 980, 0.62, 0.84, 0.86, 'o-Cresol', 191, 0.56, 'Estándar ácido débil de prueba Grob.', 'Fuerte puente H en DB-Wax; retención prolongada'),
      mk('gc_ocresol', 'o-Cresol', 'C₇H₈O', 191, 1054, 0.56, 0.87, 0.87, 'p-Cresol', 202, 0.59, 'Metilfenol en alquitranes y aguas residuales.', 'o-Cresol eluye antes que p-cresol en DB-Wax por impedimento estérico'),
      mk('gc_guaiacol', 'Guayacol (2-Metoxifenol)', 'C₇H₈O₂', 205, 1089, 0.54, 0.82, 0.86, 'Siringol', 261, 0.58, 'Aroma ahumado de lignina y barrica de roble.', 'RI = 1089; excelente detección FID'),
      mk('gc_thymol', 'Timol', 'C₁₀H₁₄O', 232, 1290, 0.44, 0.93, 0.88, 'Carvacrol', 237, 0.46, 'Fenol monoterpénico de tomillo y orégano.', 'Isómeros timol/carvacrol requieren alta eficiencia N'),
      mk('gc_eugenol', 'Eugenol', 'C₁₀H₁₂O₂', 254, 1359, 0.50, 0.90, 0.88, 'Isoeugenol', 266, 0.51, 'Aroma característico de aceite de clavo.', 'Alta linealidad FID en aceites esenciales'),
      mk('gc_bht', 'BHT (Butilhidroxitolueno)', 'C₁₅H₂₄O', 265, 1513, 0.19, 0.97, 0.89, 'BHA', 268, 0.35, 'Antioxidante fenólico estéricamente impedido.', 'Menos polar que fenol libre por los grupos tert-butilo'),
      mk('gc_pentachlorophenol', 'Pentaclorofenol (PCP)', 'C₆HCl₅O', 310, 1768, 0.50, 0.35, 0.86, '2,4,6-Triclorofenol', 246, 0.48, 'Preservante de madera fuertemente clorado.', 'Baja señal FID por 5 cloros; requiere derivatización TMS o Splitless'),
      mk('gc_glucose_tms', 'Glucosa Penta-TMS (Derivatizada)', 'C₂₁H₅₂O₆Si₅', 345, 1920, 0.18, 0.95, 0.90, 'Fructosa Penta-TMS', 332, 0.19, 'Azúcar hecho volátil mediante sililación con BSTFA.', '¡Sin sililación se carboniza en el inyector! Con TMS eluye nítida'),
      mk('gc_glycerol_tms', 'Glicerol Tri-TMS (Biodiésel Libre)', 'C₁₂H₃₂O₃Si₃', 225, 1278, 0.14, 0.92, 0.88, '1,2,4-Butanotriol TMS', 240, 0.15, 'Cuantificación ASTM D6584 de glicerina libre en biodiésel.', 'La derivatización TMS elimina puentes de H y da picos gaussianos'),
      mk('gc_cholesterol_tms', 'Colesterol TMS', 'C₃₀H₅₄OSi', 430, 3150, 0.12, 0.99, 0.92, 'β-Sitosterol TMS', 450, 0.12, 'Esterol sililado de alto peso molecular.', 'Exige rampa hasta 310 °C y columna de alta temperatura DB-5ms')
    ]
  },
  {
    id: 'sulfur_volatiles',
    name: '12. Compuestos Azufrados y Tioéteres',
    badge: 'R-SH / R-S-R',
    description: 'Odorantes del gas natural, compuestos de ajo/cebolla y trazas en combustibles.',
    compounds: [
      mk('gc_ethanethiol', 'Etanotiol (Mercaptano)', 'C₂H₅SH', 35, 515, 0.24, 0.72, 0.84, 'Dimetilsulfuro', 37, 0.22, 'Odorante estándar añadido al gas LP y gas natural.', 'Altamente volátil; eluye apenas pasa el tiempo muerto'),
      mk('gc_dms', 'Dimetilsulfuro (DMS)', '(CH₃)₂S', 37, 528, 0.22, 0.74, 0.84, 'Disulfuro de carbono', 46, 0.10, 'Compuesto azufrado oceánico y cervecero.', 'En TCD/MS responde sin problemas; buena separación en capilar frío'),
      mk('gc_cs2', 'Disulfuro de Carbono (CS₂)', 'CS₂', 46, 540, 0.10, 0.04, 0.86, 'Tiofeno', 84, 0.24, 'Solvente apolar sin hidrógeno/enlaces C–H.', '¡Solvente ideal para GC-FID porque casi no da pico de solvente!'),
      mk('gc_thiophene', 'Tiofeno', 'C₄H₄S', 84, 668, 0.24, 0.82, 0.85, 'Benceno', 80, 0.14, 'Impureza azufrada aromática clásica en benceno.', 'Retención mayor que benceno en fase DB-Wax'),
      mk('gc_dmso', 'Dimetilsulfóxido (DMSO)', 'C₂H₆OS', 189, 855, 0.82, 0.56, 0.84, 'Dimetilsulfona', 238, 0.85, 'Solvente polar aprótico de alto punto de ebullición.', 'Muy retenido en columna polar por grupo S=O'),
      mk('gc_dmds', 'Dimetildisulfuro (DMDS)', 'C₂H₆S₂', 109, 742, 0.25, 0.76, 0.85, 'Dietildisulfuro', 154, 0.24, 'Volátil característico de fermentación y brassicas.', 'Pico estrecho con respuesta FID estable'),
      mk('gc_diallyl_sulfide', 'Sulfuro de Dialilo', 'C₆H₁₀S', 139, 858, 0.26, 0.88, 0.86, 'Disulfuro de dialilo', 182, 0.28, 'Aroma característico del ajo fresco.', 'Excelente estabilidad en inyector a 220 °C'),
      mk('gc_benzothiophene', 'Benzotiofeno', 'C₈H₆S', 221, 1188, 0.26, 0.94, 0.88, 'Naftaleno', 218, 0.24, 'Contaminante sulfurado refractario en diésel ULSD.', 'Muy próximo al naftaleno (218 °C); requiere alta resolución R_s'),
      mk('gc_dibenzothiophene', 'Dibenzotiofeno (DBT)', 'C₁₂H₈S', 332, 1742, 0.29, 0.96, 0.90, 'Fenantreno', 340, 0.28, 'Marcador clave de desulfuración profunda de combustibles.', 'Eluye a alta temperatura en rampa junto al fenantreno'),
      mk('gc_sulfolane', 'Sulfolano', 'C₄H₈O₂S', 285, 1345, 0.78, 0.72, 0.87, 'DMSO', 189, 0.82, 'Solvente industrial de extracción de aromáticos.', 'Polaridad extrema y alto bp; salida tardía en DB-Wax')
    ]
  }
];

export const ALL_GC_COMPOUNDS: GcCompound[] = GC_GROUPS_DATA.flatMap((g) => g.compounds);

// Helper to estimate retention time t_R under programmed vs isothermal oven, He/H2/N2 carrier gas, and DB-5ms vs DB-Wax phase
export function computeGcSimulation(
  compound: GcCompound,
  carrierGas: CarrierGasType,
  ovenMode: OvenProgramMode,
  columnPhase: ColumnPhaseType,
  injectionMode: InjectionModeType,
  detectorType: GcDetectorType,
  flowMlMin: number,
  rampRateCMin: number
): GcSimulationResult {
  const safeFlow = Math.max(0.4, Math.min(4.0, flowMlMin));
  const safeRamp = Math.max(2, Math.min(30, rampRateCMin));

  // Column geometry: 30 m x 0.25 mm ID x 0.25 um film
  // Optimum velocity u_opt depends on carrier gas diffusivity
  const optimumVelocityCms = carrierGas === 'H2' ? 46 : carrierGas === 'He' ? 30 : 14;
  // Convert volumetric flow (mL/min) roughly to average linear velocity ū (cm/s) for 0.25 mm capillary
  const linearVelocityCms = Number((safeFlow * 23.5).toFixed(1));
  const tM = Number((3000 / (linearVelocityCms * 60)).toFixed(2)); // L = 3000 cm

  // Phase shift: DB-Wax shifts polar analytes much later relative to apolar hydrocarbons
  const phasePolarShiftAnalyte =
    columnPhase === 'DB-Wax' ? compound.polarityIndex * 92 : compound.polarityIndex * 18;
  const phasePolarShiftCompanion =
    columnPhase === 'DB-Wax' ? compound.companionPolarity * 92 : compound.companionPolarity * 18;

  // Effective volatility temperature threshold
  const effectiveBpAnalyte = compound.bpC + phasePolarShiftAnalyte;
  const effectiveBpCompanion = compound.companionBpC + phasePolarShiftCompanion;

  const computeTimeFromEffectiveBp = (effBp: number): { tR: number; tempElute: number } => {
    if (ovenMode === 'ramp') {
      // Program: 45 °C initial (1 min hold) -> rampRateCMin -> 310 °C max
      // Retention scales cleanly with effectiveBp and flow factor
      const tInit = 1.0;
      const targetTemp = Math.min(315, Math.max(48, effBp * 0.68 + 26));
      const rampTime = Math.max(0.25, (targetTemp - 45) / safeRamp);
      const flowCorrection = 1.2 / Math.max(0.5, safeFlow);
      const tR = Math.min(20.8, Math.max(tM + 0.18, (tInit + rampTime) * Math.pow(flowCorrection, 0.48)));
      const tempElute = Math.min(320, 45 + Math.max(0, tR - 1.0) * safeRamp);
      return { tR, tempElute };
    } else {
      // Isothermal at 120 °C fixed: low bp cramps near tM; high bp takes huge time & broadens!
      const deltaT = effBp - 120;
      const kIso = Math.max(0.06, Math.exp(deltaT * 0.021) * 1.45);
      const tR = Math.min(21.2, tM * (1 + kIso));
      return { tR, tempElute: 120 };
    }
  };

  const resAnalyte = computeTimeFromEffectiveBp(effectiveBpAnalyte);
  const resCompanion = computeTimeFromEffectiveBp(effectiveBpCompanion);

  let tRAnalyte = resAnalyte.tR;
  let tRCompanion = resCompanion.tR;
  const elutionTempC = Number(resAnalyte.tempElute.toFixed(1));

  // If companion happens to overlap identically in base estimate, preserve slight chemical offset
  if (Math.abs(tRAnalyte - tRCompanion) < 0.03) {
    tRCompanion = tRAnalyte + 0.04;
  }

  // Golay efficiency H = B/u + C*u
  const bCoeff = carrierGas === 'H2' ? 2.6 : carrierGas === 'He' ? 1.9 : 0.9;
  const cCoeff = carrierGas === 'H2' ? 0.0012 : carrierGas === 'He' ? 0.0021 : 0.0046;
  const hMm = bCoeff / Math.max(6, linearVelocityCms) + cCoeff * linearVelocityCms;
  let platesN = Math.round(30000 / Math.max(0.16, hMm));
  if (ovenMode === 'isothermal' && effectiveBpAnalyte > 210) {
    platesN = Math.round(platesN * 0.42);
  }
  if (injectionMode === 'splitless') {
    platesN = Math.round(platesN * 0.78);
  }

  let systemError: string | null = null;
  if (injectionMode === 'septum_leak') {
    systemError =
      'Fuga en Septum / Entrada de Aire (O₂): caída de presión EPC, oxidación de la fase estacionaria (sangrado severo de siloxanos) y deriva masiva de línea base.';
    tRAnalyte = Math.min(21.5, tRAnalyte * 1.24);
    tRCompanion = Math.min(21.6, tRCompanion * 1.24);
    platesN = Math.round(platesN * 0.25);
  }

  const kPrime = Number(Math.max(0.05, (tRAnalyte - tM) / tM).toFixed(2));

  // Peak width w_0.5 in min
  const isoBroadeningFactor =
    ovenMode === 'isothermal' && effectiveBpAnalyte > 180
      ? 1 + (effectiveBpAnalyte - 180) * 0.015
      : 1;
  const injBroadeningFactor = injectionMode === 'splitless' ? 1.28 : injectionMode === 'septum_leak' ? 2.3 : 1.0;
  const sigmaMin = Math.max(
    0.038,
    (tRAnalyte / Math.sqrt(Math.max(5000, platesN))) * 2.1 * isoBroadeningFactor * injBroadeningFactor
  );
  const peakWidthHalfMin = Number((2.355 * sigmaMin).toFixed(3));

  // Detector sensitivity multiplier
  const baseDetectorGain =
    detectorType === 'FID' ? compound.fidResponse * 105 : compound.tcdResponse * 42;
  const companionDetectorGain =
    detectorType === 'FID'
      ? Math.max(0.32, compound.fidResponse * 0.85) * 72
      : Math.max(0.45, compound.tcdResponse * 0.88) * 34;

  const injAmountFactor =
    injectionMode === 'splitless' ? 1.85 : injectionMode === 'septum_leak' ? 0.34 : 1.0;

  const peakHeightAnalyte = Number(
    Math.min(185, Math.max(3.5, baseDetectorGain * injAmountFactor / isoBroadeningFactor)).toFixed(1)
  );
  const peakHeightCompanion = Number(
    Math.min(160, Math.max(4.0, companionDetectorGain * injAmountFactor / isoBroadeningFactor)).toFixed(1)
  );

  // Resolution R_s = |tR2 - tR1| / (1.699 * w_0.5)
  const resolutionRs = Number(
    (Math.abs(tRAnalyte - tRCompanion) / Math.max(0.05, 1.699 * peakWidthHalfMin)).toFixed(2)
  );

  // Kováts RI shifts on polar DB-Wax
  const kovatsRiEffective = Math.round(
    compound.kovatsDb5 + (columnPhase === 'DB-Wax' ? compound.polarityIndex * 420 : 0)
  );

  const snrEstimate = Math.round(
    injectionMode === 'septum_leak' ? 8 : Math.max(12, peakHeightAnalyte * (detectorType === 'FID' ? 2.8 : 1.1))
  );

  // Build 320 waveform points across 0..22 min
  const totalMin = 22;
  const numPts = 330;
  const points: { timeMin: number; signalMv: number; ovenTempC: number }[] = [];

  for (let i = 0; i <= numPts; i++) {
    const t = (i / numPts) * totalMin;
    const ovenTempC =
      ovenMode === 'ramp' ? Math.min(320, 45 + Math.max(0, t - 1.0) * safeRamp) : 120;

    // Solvent front peak (Hexane / Pentane / Solvent plug) right after tM
    const solventWidth = injectionMode === 'splitless' ? 0.22 : 0.085;
    const solventCenter = tM + (injectionMode === 'splitless' ? 0.22 : 0.1);
    const solventAmp =
      detectorType === 'FID'
        ? injectionMode === 'splitless'
          ? 145
          : 92
        : injectionMode === 'splitless'
        ? 68
        : 45;
    const solventTail =
      t > solventCenter && injectionMode === 'splitless'
        ? Math.exp(-(t - solventCenter) / 0.35) * 28
        : 0;
    const solventPeak =
      solventAmp * Math.exp(-0.5 * Math.pow((t - solventCenter) / solventWidth, 2)) + solventTail;

    // Analyte Gaussian peak
    const analytePeak =
      peakHeightAnalyte * Math.exp(-0.5 * Math.pow((t - tRAnalyte) / sigmaMin, 2));

    // Companion peak
    const compSigma = sigmaMin * 1.04;
    const companionPeak =
      peakHeightCompanion * Math.exp(-0.5 * Math.pow((t - tRCompanion) / compSigma, 2));

    // Column bleed baseline rise at high temp (> 250 °C) or severe oxidation bleed on septum leak
    const thermalBleed =
      ovenTempC > 240 ? Math.pow((ovenTempC - 240) / 80, 2) * (columnPhase === 'DB-Wax' ? 14 : 6) : 0;
    const leakBleed =
      injectionMode === 'septum_leak'
        ? 18 + Math.pow(t / 12, 1.7) * 28 + Math.sin(t * 9.5) * 4.2
        : 0;

    // Deterministic baseline ripple
    const ripple = Math.sin(t * 27.3) * 0.45 + Math.cos(t * 14.1) * 0.35;

    const signalMv = Math.max(
      0,
      Number((1.2 + thermalBleed + leakBleed + ripple + solventPeak + analytePeak + companionPeak).toFixed(2))
    );

    points.push({ timeMin: Number(t.toFixed(2)), signalMv, ovenTempC: Number(ovenTempC.toFixed(1)) });
  }

  let diagnosticMessage = '';
  if (systemError) {
    diagnosticMessage = systemError;
  } else if (detectorType === 'FID' && compound.fidResponse < 0.18) {
    diagnosticMessage = `Aviso FID: ${compound.name} carece prácticamente de enlaces C–H reducidos (FID casi ciego). Cambia al detector universal TCD para revelar la señal completa.`;
  } else if (ovenMode === 'isothermal' && compound.bpC > 220) {
    diagnosticMessage = `Problema de elución isotérmica: a 120 °C fijos ${compound.name} (pe ${compound.bpC} °C) sufre ensanchamiento extremo y baja altura. Activa la Rampa Térmica Programada.`;
  } else if (resolutionRs < 1.3) {
    diagnosticMessage = `Coelución parcial (Rₛ = ${resolutionRs}) frente a ${compound.companionName}. Prueba cambiar de columna (${columnPhase === 'DB-5ms' ? 'DB-Wax polar' : 'DB-5ms apolar'}) o ajustar la rampa/flujo.`;
  } else {
    diagnosticMessage = `Separación capilar resuelta a línea base (Rₛ = ${resolutionRs} vs ${compound.companionName}) con ${platesN.toLocaleString()} platos teóricos en ${carrierGas} sobre ${columnPhase}.`;
  }

  return {
    points,
    tM,
    tRAnalyte: Number(tRAnalyte.toFixed(2)),
    tRCompanion: Number(tRCompanion.toFixed(2)),
    elutionTempC,
    kPrime,
    platesN,
    resolutionRs,
    kovatsRiEffective,
    linearVelocityCms,
    optimumVelocityCms,
    snrEstimate,
    peakHeightAnalyte,
    peakWidthHalfMin,
    systemError,
    diagnosticMessage
  };
}
