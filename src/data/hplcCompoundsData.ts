export interface HplcPeakSpec {
  id: string;
  name: string;
  formula: string;
  kwLog: number; // log10(k_w) retention factor extrapolated to 0% organic
  sParam: number; // Solvent strength slope S in log10(k) = log10(k_w) - S * phiB
  areaWeight: number; // Relative detector absorbance sensitivity
  lambdaUvMax: number; // Optimal UV detection wavelength (nm)
  colorHex: string; // Band color on visual C18 column animation
  description: string;
}

export interface HplcMixtureSample {
  id: string;
  name: string;
  matrixContext: string;
  recommendedPhiB: number; // Optimal % Acetonitrile (0.10 to 0.90)
  recommendedTempC: number; // °C
  description: string;
  peaks: HplcPeakSpec[];
}

export interface HplcGroupCategory {
  id: string;
  name: string;
  stationaryPhase: string;
  separationMechanism: string;
  compounds: HplcMixtureSample[];
}

const COLORS = {
  rosewood: '#8E3742',
  sage: '#7C957D',
  misty: '#76A5C4',
  blush: '#EFC4BF',
};

// Helper to build calibrated chromatographic mixtures cleanly
function mkSample(
  id: string,
  name: string,
  matrixContext: string,
  recommendedPhiB: number,
  description: string,
  peaks: HplcPeakSpec[]
): HplcMixtureSample {
  return {
    id,
    name,
    matrixContext,
    recommendedPhiB,
    recommendedTempC: 35,
    description,
    peaks,
  };
}

export const HPLC_GROUPS_DATA: HplcGroupCategory[] = [
  // 1. ANALGESICOS Y AINES
  {
    id: 'analgesics',
    name: 'Analgésicos y AINEs',
    stationaryPhase: 'C18 Fase Reversa (pH 3.0 Fosfato / ACN)',
    separationMechanism:
      'Elución secuencial por hidrofobicidad creciente (log P): Paracetamol polar eluye primero, seguido de Cafeína/Aspirina e Ibuprofeno/Diclofenaco muy retenidos en C18.',
    compounds: [
      mkSample('hp_excedrin', 'Mezcla Paracetamol + Cafeína + Aspirina', 'Tableta analgésica combinada', 0.28, 'Separación farmacopeica clásica de tres principios activos en un solo gradiente o isocrático suave.', [
        { id: 'p1', name: 'Paracetamol', formula: 'C₈H₉NO₂', kwLog: 1.05, sParam: 2.3, areaWeight: 1.0, lambdaUvMax: 243, colorHex: COLORS.misty, description: 'Analgésico más polar (log P 0.46), menor afinidad por las cadenas C18.' },
        { id: 'p2', name: 'Cafeína', formula: 'C₈H₁₀N₄O₂', kwLog: 1.48, sParam: 2.6, areaWeight: 0.9, lambdaUvMax: 273, colorHex: COLORS.sage, description: 'Alcaloide xantínico intermedio con absorción UV intensa a 273 nm.' },
        { id: 'p3', name: 'Ácido Acetilsalicílico', formula: 'C₉H₈O₄', kwLog: 1.92, sParam: 2.9, areaWeight: 0.78, lambdaUvMax: 230, colorHex: COLORS.rosewood, description: 'Éster aromático protonado a pH 3.0 con mayor retención hidrofóbica.' }
      ]),
      mkSample('hp_ibuprofen_matrix', 'Ibuprofeno y Ácido Salicílico', 'Cápsula blanda USP', 0.55, 'Separación en fase reversa con ACN al 55% donde el ibuprofeno lipofílico requiere fase móvil fuerte.', [
        { id: 'p1', name: 'Ácido Salicílico (Impureza)', formula: 'C₇H₆O₃', kwLog: 1.75, sParam: 2.7, areaWeight: 0.75, lambdaUvMax: 235, colorHex: COLORS.sage, description: 'Precursor fenólico más polar.' },
        { id: 'p2', name: 'Ibuprofeno', formula: 'C₁₃H₁₈O₂', kwLog: 3.15, sParam: 3.8, areaWeight: 1.0, lambdaUvMax: 220, colorHex: COLORS.rosewood, description: 'Cadena isobutilo muy hidrofóbica (log P 3.97) fuertemente retenida en C18.' }
      ]),
      mkSample('hp_naproxen', 'Naproxeno Sódico + Estándar Interno', 'Comprimido recubierto', 0.48, 'Cuantificación por núcleo naftalénico con detección UV de alta sensibilidad a 232 nm.', [
        { id: 'p1', name: 'Metilparabeno (IS)', formula: 'C₈H₈O₃', kwLog: 1.95, sParam: 2.8, areaWeight: 0.85, lambdaUvMax: 254, colorHex: COLORS.misty, description: 'Estándar interno de calibración.' },
        { id: 'p2', name: 'Naproxeno', formula: 'C₁₄H₁₄O₃', kwLog: 2.85, sParam: 3.5, areaWeight: 1.0, lambdaUvMax: 232, colorHex: COLORS.rosewood, description: 'Derivado naftalénico de alta absortividad.' }
      ]),
      mkSample('hp_diclofenac', 'Diclofenaco + Ketoprofeno', 'Gel tópico analgésico', 0.52, 'Resolución de dos AINEs arilacéticos/propiónicos de polaridad cercana.', [
        { id: 'p1', name: 'Ketoprofeno', formula: 'C₁₆H₁₄O₃', kwLog: 2.68, sParam: 3.3, areaWeight: 0.95, lambdaUvMax: 255, colorHex: COLORS.sage, description: 'Eluye antes que el diclofenaco diclorado.' },
        { id: 'p2', name: 'Diclofenaco', formula: 'C₁₄H₁₁Cl₂NO₂', kwLog: 3.35, sParam: 3.9, areaWeight: 1.0, lambdaUvMax: 276, colorHex: COLORS.rosewood, description: 'Dos átomos de cloro aumentan la hidrofobicidad y retención en C18.' }
      ]),
      mkSample('hp_paracetamol_imp', 'Paracetamol y 4-Aminofenol', 'Control de degradación térmica', 0.16, 'Ensayo límite farmacopeico para detectar hidrólisis tóxica del paracetamol.', [
        { id: 'p1', name: '4-Aminofenol (Impureza)', formula: 'C₆H₇NO', kwLog: 0.62, sParam: 2.1, areaWeight: 0.65, lambdaUvMax: 230, colorHex: COLORS.rosewood, description: 'Amina aromática polar que eluye cerca del tiempo muerto t₀.' },
        { id: 'p2', name: 'Paracetamol (API)', formula: 'C₈H₉NO₂', kwLog: 1.15, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 243, colorHex: COLORS.sage, description: 'Principio activo intacto.' }
      ]),
      mkSample('hp_ketorolac', 'Ketorolaco Trometamina + Estándar', 'Solución inyectable', 0.38, 'Análisis a 313 nm selectivo para el anillo pirrolizínico-benzoílo.', [
        { id: 'p1', name: 'Ácido Benzoico (IS)', formula: 'C₇H₆O₂', kwLog: 1.48, sParam: 2.6, areaWeight: 0.72, lambdaUvMax: 228, colorHex: COLORS.misty, description: 'Referencia cromatográfica.' },
        { id: 'p2', name: 'Ketorolaco', formula: 'C₁₅H₁₃NO₃', kwLog: 2.25, sParam: 3.1, areaWeight: 1.0, lambdaUvMax: 313, colorHex: COLORS.rosewood, description: 'Banda UV característica en 313 nm libre de interferencias.' }
      ]),
      mkSample('hp_meloxicam', 'Meloxicam + Piroxicam (Oxicams)', 'Comprimidos antiinflamatorios', 0.45, 'Comparación homóloga de oxicams con anillo tiazol vs piridina.', [
        { id: 'p1', name: 'Piroxicam', formula: 'C₁₅H₁₃N₃O₄S', kwLog: 2.15, sParam: 3.0, areaWeight: 0.92, lambdaUvMax: 355, colorHex: COLORS.sage, description: 'Anillo piridina ligeramente más polar.' },
        { id: 'p2', name: 'Meloxicam', formula: 'C₁₄H₁₃N₃O₄S₂', kwLog: 2.65, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 362, colorHex: COLORS.rosewood, description: 'Grupo metiltiazol aporta mayor retención apolar.' }
      ]),
      mkSample('hp_indomethacin', 'Indometacina + Ácido Meclofenámico', 'Estándar de validación AINE', 0.56, 'Analitos altamente lipofílicos que exigen >50% ACN para eluir antes de 12 min.', [
        { id: 'p1', name: 'Indometacina', formula: 'C₁₉H₁₆ClNO₄', kwLog: 3.18, sParam: 3.8, areaWeight: 1.0, lambdaUvMax: 254, colorHex: COLORS.sage, description: 'Núcleo indol-clorobenzoílo.' },
        { id: 'p2', name: 'Ácido Meclofenámico', formula: 'C₁₄H₁₁Cl₂NO₂', kwLog: 3.68, sParam: 4.1, areaWeight: 0.88, lambdaUvMax: 278, colorHex: COLORS.rosewood, description: 'Fenamato altamente retenido.' }
      ]),
      mkSample('hp_tramadol_paracetamol', 'Tramadol + Paracetamol', 'Analgésico dual', 0.26, 'Separación de analgésico opioide débil y paracetamol con buffer ácido.', [
        { id: 'p1', name: 'Paracetamol', formula: 'C₈H₉NO₂', kwLog: 1.08, sParam: 2.4, areaWeight: 1.0, lambdaUvMax: 243, colorHex: COLORS.misty, description: 'Eluye en los primeros minutos.' },
        { id: 'p2', name: 'Tramadol', formula: 'C₁₆H₂₅NO₂', kwLog: 1.82, sParam: 2.9, areaWeight: 0.78, lambdaUvMax: 272, colorHex: COLORS.rosewood, description: 'Amina terciaria protonada retenida por interacción mixta.' }
      ]),
      mkSample('hp_celecoxib', 'Celecoxib + Valdecoxib (Coxibs)', 'Inhibidores selectivos COX-2', 0.58, 'Separación de sulfonamidas fluoradas a 254 nm.', [
        { id: 'p1', name: 'Valdecoxib', formula: 'C₁₆H₁₄N₂O₃S', kwLog: 2.62, sParam: 3.3, areaWeight: 0.9, lambdaUvMax: 240, colorHex: COLORS.sage, description: 'Isoxazol bencenosulfonamida.' },
        { id: 'p2', name: 'Celecoxib', formula: 'C₁₇H₁₄F₃N₃O₂S', kwLog: 3.45, sParam: 3.9, areaWeight: 1.0, lambdaUvMax: 252, colorHex: COLORS.rosewood, description: 'El grupo –CF₃ hidrofóbico prolonga notablemente su t_R.' }
      ])
    ]
  },

  // 2. VITAMINAS HIDROSOLUBLES Y LIPOSOLUBLES
  {
    id: 'vitamins',
    name: 'Vitaminas (B, C, A, D, E)',
    stationaryPhase: 'C18 Polar-Endcapped / RP-18',
    separationMechanism:
      'Las vitaminas B y C son muy polares (requieren bajo %B, 5–25%); las liposolubles A, D y E son cadenas hidrofóbicas extremas (requieren 85–95% metanol/ACN).',
    compounds: [
      mkSample('hp_vit_b_complex', 'Complejo B (B₁ + B₆ + B₃ + B₂)', 'Multivitamínico hidrosoluble', 0.14, 'Cuatro vitaminas hidrosolubles separadas mediante fase móvil mayoritariamente acuosa.', [
        { id: 'p1', name: 'Vitamina B₁ (Tiamina)', formula: 'C₁₂H₁₇N₄OS⁺', kwLog: 0.55, sParam: 2.0, areaWeight: 0.82, lambdaUvMax: 246, colorHex: COLORS.misty, description: 'Catión permanente altamente hidrofílico.' },
        { id: 'p2', name: 'Vitamina B₃ (Niacinamida)', formula: 'C₆H₆N₂O', kwLog: 0.86, sParam: 2.2, areaWeight: 0.95, lambdaUvMax: 262, colorHex: COLORS.sage, description: 'Amida piridínica.' },
        { id: 'p3', name: 'Vitamina B₆ (Piridoxina)', formula: 'C₈H₁₁NO₃', kwLog: 1.15, sParam: 2.4, areaWeight: 0.88, lambdaUvMax: 290, colorHex: COLORS.blush, description: 'Piridinol sustituido.' },
        { id: 'p4', name: 'Vitamina B₂ (Riboflavina)', formula: 'C₁₇H₂₀N₄O₆', kwLog: 1.72, sParam: 2.9, areaWeight: 1.0, lambdaUvMax: 267, colorHex: COLORS.rosewood, description: 'Anillo isoaloxazina tricíclico amarillo más retenido.' }
      ]),
      mkSample('hp_vit_c_erythorbic', 'Ácido Ascórbico (Vit. C) + Cítrico', 'Jugo cítrico fortificado', 0.10, 'Separación rápida en medio ácido fosfórico 0.1% evitando ionización.', [
        { id: 'p1', name: 'Ácido Cítrico', formula: 'C₆H₈O₇', kwLog: 0.42, sParam: 1.9, areaWeight: 0.55, lambdaUvMax: 210, colorHex: COLORS.misty, description: 'Ácido tricarboxílico muy polar.' },
        { id: 'p2', name: 'Vitamina C (Ascórbico)', formula: 'C₆H₈O₆', kwLog: 0.78, sParam: 2.1, areaWeight: 1.0, lambdaUvMax: 245, colorHex: COLORS.rosewood, description: 'Enodiol lactónico con fuerte absorción a 245 nm.' }
      ]),
      mkSample('hp_vit_b12', 'Cianocobalamina (B₁₂) + Ácido Fólico (B₉)', 'Suplemento hematínico', 0.22, 'Detección dual a 280 nm y 361 nm específica del anillo corrínico con Co(III).', [
        { id: 'p1', name: 'Ácido Fólico (B₉)', formula: 'C₁₉H₁₉N₇O₆', kwLog: 1.12, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 282, colorHex: COLORS.sage, description: 'Pteridina conjugada.' },
        { id: 'p2', name: 'Cianocobalamina (B₁₂)', formula: 'C₆₃H₈₈CoN₁₄O₁₄P', kwLog: 1.65, sParam: 2.8, areaWeight: 0.88, lambdaUvMax: 361, colorHex: COLORS.rosewood, description: 'Macrociclo rojo de cobalto con banda única a 361 nm.' }
      ]),
      mkSample('hp_vit_a_e', 'Retinol (Vit. A) + α-Tocoferol (Vit. E)', 'Fórmula liposoluble', 0.85, 'Requiere alto contenido orgánico (85–95% ACN/MeOH) para eluir las largas cadenas isoprenoides.', [
        { id: 'p1', name: 'todo-trans-Retinol (Vit. A)', formula: 'C₂₀H₃₀O', kwLog: 4.55, sParam: 4.4, areaWeight: 1.0, lambdaUvMax: 325, colorHex: COLORS.sage, description: 'Pentaeno conjugado de 20 carbonos.' },
        { id: 'p2', name: 'α-Tocoferol (Vit. E)', formula: 'C₂₉H₅₀O₂', kwLog: 5.55, sParam: 4.9, areaWeight: 0.82, lambdaUvMax: 292, colorHex: COLORS.rosewood, description: 'Cadena fitilo extremadamente apolar retenida hasta ~90% orgánico.' }
      ]),
      mkSample('hp_vit_d2_d3', 'Ergocalciferol (D₂) + Colecalciferol (D₃)', 'Control lácteo fortificado', 0.84, 'Separación de alta resolución entre dos secosteroides que solo difieren en un doble enlace y un metilo.', [
        { id: 'p1', name: 'Vitamina D₂ (Ergocalciferol)', formula: 'C₂₈H₄₄O', kwLog: 4.92, sParam: 4.6, areaWeight: 0.95, lambdaUvMax: 265, colorHex: COLORS.sage, description: 'El doble enlace lateral C22=C23 la hace ligeramente menos retenida.' },
        { id: 'p2', name: 'Vitamina D₃ (Colecalciferol)', formula: 'C₂₇H₄₄O', kwLog: 5.18, sParam: 4.7, areaWeight: 1.0, lambdaUvMax: 265, colorHex: COLORS.rosewood, description: 'Saturación lateral aumenta ligeramente su afinidad C18.' }
      ]),
      mkSample('hp_vit_k1', 'Filoquinona (Vit. K₁) + Menadiona (K₃)', 'Suplemento neonatal', 0.80, 'Comparación entre naftoquinona corta (K₃) y fitil-naftoquinona (K₁).', [
        { id: 'p1', name: 'Menadiona (Vit. K₃)', formula: 'C₁₁H₈O₂', kwLog: 2.42, sParam: 3.1, areaWeight: 0.9, lambdaUvMax: 250, colorHex: COLORS.misty, description: 'Carece de cadena lateral fitilo.' },
        { id: 'p2', name: 'Filoquinona (Vit. K₁)', formula: 'C₃₁H₄₆O₂', kwLog: 5.20, sParam: 4.8, areaWeight: 1.0, lambdaUvMax: 248, colorHex: COLORS.rosewood, description: 'Cadena lateral de 20 carbonos fuertemente hidrofóbica.' }
      ]),
      mkSample('hp_retinyl_palmitate', 'Retinol + Acetato de Retinilo', 'Cosmético antiedad', 0.86, 'Diferenciación entre alcohol libre y éster acetato lipofílico.', [
        { id: 'p1', name: 'Retinol libre', formula: 'C₂₀H₃₀O', kwLog: 4.55, sParam: 4.4, areaWeight: 0.95, lambdaUvMax: 325, colorHex: COLORS.sage, description: 'Grupo –OH libre eluye antes.' },
        { id: 'p2', name: 'Acetato de Retinilo', formula: 'C₂₂H₃₂O₂', kwLog: 5.15, sParam: 4.7, areaWeight: 1.0, lambdaUvMax: 326, colorHex: COLORS.rosewood, description: 'Esterificación incrementa hidrofobicidad.' }
      ]),
      mkSample('hp_biotin_pantothenic', 'Ácido Pantoténico (B₅) + Biotina (B₇)', 'Premezcla nutricional', 0.15, 'Detección UV corta a 205–210 nm en fase acuosa desgasificada.', [
        { id: 'p1', name: 'Ácido Pantoténico (B₅)', formula: 'C₉H₁₇NO₅', kwLog: 0.65, sParam: 2.0, areaWeight: 0.85, lambdaUvMax: 205, colorHex: COLORS.misty, description: 'Amida hidroxilada hidrofílica.' },
        { id: 'p2', name: 'D-Biotina (B₇)', formula: 'C₁₀H₁₆N₂O₃S', kwLog: 1.25, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 205, colorHex: COLORS.rosewood, description: 'Biciclo tetrahidrotiofeno-imidazolona.' }
      ]),
      mkSample('hp_niacin_nicotinic', 'Ácido Nicotínico + Niacinamida', 'Control cereal enriquecido', 0.12, 'Separación de formas ácida y amida de la vitamina B₃.', [
        { id: 'p1', name: 'Ácido Nicotínico', formula: 'C₆H₅NO₂', kwLog: 0.58, sParam: 2.1, areaWeight: 0.92, lambdaUvMax: 262, colorHex: COLORS.sage, description: 'Carboxilato piridínico más polar.' },
        { id: 'p2', name: 'Niacinamida', formula: 'C₆H₆N₂O', kwLog: 0.96, sParam: 2.3, areaWeight: 1.0, lambdaUvMax: 262, colorHex: COLORS.rosewood, description: 'Amida neutra con mayor retención.' }
      ]),
      mkSample('hp_coenzyme_q10', 'Ubiquinol + Coenzima Q10 (Ubiquinona)', 'Suplemento mitocondrial', 0.88, 'Quinona isoprenoide de 50 carbonos que requiere altísima fuerza eluyente.', [
        { id: 'p1', name: 'Ubiquinol (Forma reducida)', formula: 'C₅₉H₉₂O₄', kwLog: 5.05, sParam: 4.7, areaWeight: 0.88, lambdaUvMax: 290, colorHex: COLORS.sage, description: 'Dos –OH hidroquinónicos reducen su retención frente a la quinona.' },
        { id: 'p2', name: 'Coenzima Q10 (Oxidada)', formula: 'C₅₉H₉₀O₄', kwLog: 5.60, sParam: 5.0, areaWeight: 1.0, lambdaUvMax: 275, colorHex: COLORS.rosewood, description: 'Forma dicetona más apolar.' }
      ])
    ]
  },

  // 3. CAFEINA, XANTINAS Y BEBIDAS
  {
    id: 'xanthines',
    name: 'Cafeína, Xantinas y Bebidas',
    stationaryPhase: 'C18 (Agua / Acetonitrilo / Ácido Acético)',
    separationMechanism:
      'Metilación progresiva en el núcleo purínico: Teobromina (di-Me) y Teofilina (di-Me isómero) eluyen antes que la Cafeína (tri-Me).',
    compounds: [
      mkSample('hp_three_xanthines', 'Teobromina + Teofilina + Cafeína', 'Cacao, té y café AOAC', 0.18, 'Trío clásico que demuestra cómo la posición y número de metilos regulan la afinidad C18.', [
        { id: 'p1', name: 'Teobromina (3,7-diMe)', formula: 'C₇H₈N₄O₂', kwLog: 0.82, sParam: 2.2, areaWeight: 0.85, lambdaUvMax: 272, colorHex: COLORS.misty, description: 'Alcaloide predominante del cacao; menor retención.' },
        { id: 'p2', name: 'Teofilina (1,3-diMe)', formula: 'C₇H₈N₄O₂', kwLog: 1.08, sParam: 2.4, areaWeight: 0.9, lambdaUvMax: 271, colorHex: COLORS.sage, description: 'Isómero posicional broncodilatador del té.' },
        { id: 'p3', name: 'Cafeína (1,3,7-triMe)', formula: 'C₈H₁₀N₄O₂', kwLog: 1.48, sParam: 2.7, areaWeight: 1.0, lambdaUvMax: 273, colorHex: COLORS.rosewood, description: 'Tres grupos metilo maximizan el contacto hidrofóbico con C18.' }
      ]),
      mkSample('hp_energy_drink', 'Taurina-Nicotinamida + Cafeína + Benzoato', 'Bebida energética', 0.24, 'Cuantificación simultánea de estimulantes y conservante.', [
        { id: 'p1', name: 'Niacinamida (B₃)', formula: 'C₆H₆N₂O', kwLog: 0.72, sParam: 2.2, areaWeight: 0.78, lambdaUvMax: 262, colorHex: COLORS.misty, description: 'Vitamina agregada.' },
        { id: 'p2', name: 'Cafeína', formula: 'C₈H₁₀N₄O₂', kwLog: 1.38, sParam: 2.6, areaWeight: 1.0, lambdaUvMax: 273, colorHex: COLORS.rosewood, description: 'Pico principal a 273 nm.' },
        { id: 'p3', name: 'Ácido Benzoico', formula: 'C₇H₆O₂', kwLog: 1.85, sParam: 2.9, areaWeight: 0.72, lambdaUvMax: 230, colorHex: COLORS.sage, description: 'Conservante antimicrobiano.' }
      ]),
      mkSample('hp_coffee_chlorogenic', 'Ácido Clorogénico + Cafeína', 'Extracto de café verde', 0.22, 'Control de tueste del grano midiendo la razón ácido clorogénico / cafeína.', [
        { id: 'p1', name: 'Ácido 5-Cafeoilquínico', formula: 'C₁₆H₁₈O₉', kwLog: 0.98, sParam: 2.4, areaWeight: 1.0, lambdaUvMax: 325, colorHex: COLORS.sage, description: 'Polifenol antioxidante del café verde.' },
        { id: 'p2', name: 'Cafeína', formula: 'C₈H₁₀N₄O₂', kwLog: 1.42, sParam: 2.6, areaWeight: 0.92, lambdaUvMax: 273, colorHex: COLORS.rosewood, description: 'Xantina termoestable durante el tueste.' }
      ]),
      mkSample('hp_tea_catechins', 'Epicatequina + EGCG + Cafeína', 'Té verde Matcha', 0.22, 'Perfil antioxidante de flavan-3-oles y xantina.', [
        { id: 'p1', name: '(-)-Epicatequina', formula: 'C₁₅H₁₄O₆', kwLog: 0.95, sParam: 2.3, areaWeight: 0.85, lambdaUvMax: 280, colorHex: COLORS.misty, description: 'Catequina monomérica.' },
        { id: 'p2', name: 'Cafeína', formula: 'C₈H₁₀N₄O₂', kwLog: 1.35, sParam: 2.5, areaWeight: 0.92, lambdaUvMax: 273, colorHex: COLORS.sage, description: 'Estimulante natural.' },
        { id: 'p3', name: 'EGCG (Galato de Epigalocatequina)', formula: 'C₂₂H₁₈O₁₁', kwLog: 1.78, sParam: 2.9, areaWeight: 1.0, lambdaUvMax: 275, colorHex: COLORS.rosewood, description: 'Éster gálico de mayor tamaño e hidrofobicidad.' }
      ]),
      mkSample('hp_cola_soda', 'Acesulfame K + Cafeína + Aspartame', 'Refresco de cola sin azúcar', 0.22, 'Cuantificación conjunta de edulcorantes y cafeína.', [
        { id: 'p1', name: 'Acesulfame Potásico', formula: 'C₄H₄KNO₄S', kwLog: 0.72, sParam: 2.1, areaWeight: 0.85, lambdaUvMax: 227, colorHex: COLORS.misty, description: 'Edulcorante sulfónico polar.' },
        { id: 'p2', name: 'Cafeína', formula: 'C₈H₁₀N₄O₂', kwLog: 1.38, sParam: 2.6, areaWeight: 1.0, lambdaUvMax: 273, colorHex: COLORS.rosewood, description: 'Xantina característica.' },
        { id: 'p3', name: 'Aspartame', formula: 'C₁₄H₁₈N₂O₅', kwLog: 1.74, sParam: 2.8, areaWeight: 0.65, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Dipéptido metil éster con grupo fenilo.' }
      ]),
      mkSample('hp_pentoxifylline', 'Teofilina + Pentoxifilina', 'Monitoreo terapéutico', 0.25, 'Análogo hemorreológico con cadena cetónica hexilo.', [
        { id: 'p1', name: 'Teofilina', formula: 'C₇H₈N₄O₂', kwLog: 1.08, sParam: 2.4, areaWeight: 0.9, lambdaUvMax: 272, colorHex: COLORS.sage, description: 'Xantina base.' },
        { id: 'p2', name: 'Pentoxifilina', formula: 'C₁₃H₁₈N₄O₃', kwLog: 1.85, sParam: 2.9, areaWeight: 1.0, lambdaUvMax: 274, colorHex: COLORS.rosewood, description: 'Cadena 5-oxohexilo incrementa retención.' }
      ]),
      mkSample('hp_uric_xanthine', 'Ácido Úrico + Hipoxantina + Xantina', 'Metabolismo de purinas', 0.12, 'Separación en modo acuoso para diagnóstico metabólico.', [
        { id: 'p1', name: 'Ácido Úrico', formula: 'C₅H₄N₄O₃', kwLog: 0.48, sParam: 1.9, areaWeight: 1.0, lambdaUvMax: 290, colorHex: COLORS.misty, description: 'Purina trioxigenada más polar.' },
        { id: 'p2', name: 'Hipoxantina', formula: 'C₅H₄N₄O', kwLog: 0.76, sParam: 2.1, areaWeight: 0.85, lambdaUvMax: 250, colorHex: COLORS.sage, description: 'Monooxopurina intermedia.' },
        { id: 'p3', name: 'Xantina', formula: 'C₅H₄N₄O₂', kwLog: 1.04, sParam: 2.3, areaWeight: 0.9, lambdaUvMax: 267, colorHex: COLORS.rosewood, description: 'Dioxopurina base.' }
      ]),
      mkSample('hp_paraxanthine', 'Paraxantina + Cafeína (Metabolitos CYP1A2)', 'Estudio farmacocinético', 0.19, 'Medición de actividad hepática CYP1A2 mediante la razón metabólica.', [
        { id: 'p1', name: 'Paraxantina (1,7-diMe)', formula: 'C₇H₈N₄O₂', kwLog: 1.06, sParam: 2.4, areaWeight: 0.95, lambdaUvMax: 272, colorHex: COLORS.sage, description: 'Principal metabolito humano de la cafeína.' },
        { id: 'p2', name: 'Cafeína', formula: 'C₈H₁₀N₄O₂', kwLog: 1.48, sParam: 2.7, areaWeight: 1.0, lambdaUvMax: 273, colorHex: COLORS.rosewood, description: 'Fármaco padre.' }
      ]),
      mkSample('hp_guarana', 'Catequina + Teobromina + Cafeína', 'Extracto de Guaraná', 0.20, 'Autenticación botánica de bebidas con extracto de Paullinia cupana.', [
        { id: 'p1', name: 'Teobromina', formula: 'C₇H₈N₄O₂', kwLog: 0.82, sParam: 2.2, areaWeight: 0.82, lambdaUvMax: 272, colorHex: COLORS.misty, description: 'Xantina minoritaria.' },
        { id: 'p2', name: 'D-Catequina', formula: 'C₁₅H₁₄O₆', kwLog: 1.15, sParam: 2.4, areaWeight: 0.78, lambdaUvMax: 280, colorHex: COLORS.sage, description: 'Tanino flavanólico.' },
        { id: 'p3', name: 'Cafeína', formula: 'C₈H₁₀N₄O₂', kwLog: 1.52, sParam: 2.7, areaWeight: 1.0, lambdaUvMax: 273, colorHex: COLORS.rosewood, description: 'Alcaloide mayoritario (>3%).' }
      ]),
      mkSample('hp_dyphylline', 'Difilina + Teofilina', 'Formulación broncodilatadora', 0.18, 'Derivado dihidroxipropilo polar frente a teofilina libre.', [
        { id: 'p1', name: 'Difilina', formula: 'C₁₀H₁₄N₄O₄', kwLog: 0.86, sParam: 2.2, areaWeight: 0.95, lambdaUvMax: 273, colorHex: COLORS.sage, description: 'Dos grupos –OH incrementan polaridad.' },
        { id: 'p2', name: 'Teofilina', formula: 'C₇H₈N₄O₂', kwLog: 1.25, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 272, colorHex: COLORS.rosewood, description: 'Mayor retención relativa.' }
      ])
    ]
  },

  // 4. POLIFENOLES, ANTIOXIDANTES Y FLAVONOIDES
  {
    id: 'polyphenols',
    name: 'Polifenoles y Flavonoides',
    stationaryPhase: 'C18 Endcapped (AcOH 0.5% / MeOH-ACN)',
    separationMechanism:
      'Los glucósidos (rutina) son hidrofílicos por sus azúcares y eluyen rápido; las agliconas libres (quercetina, resveratrol, curcumina) requieren mayor %B.',
    compounds: [
      mkSample('hp_wine_resveratrol', 'Ácido Gálico + Catequina + trans-Resveratrol', 'Vino tinto Cabernet', 0.30, 'Cuantificación de estilbenos y ácidos fenólicos en enología.', [
        { id: 'p1', name: 'Ácido Gálico', formula: 'C₇H₆O₅', kwLog: 0.85, sParam: 2.2, areaWeight: 0.85, lambdaUvMax: 271, colorHex: COLORS.misty, description: 'Ácido trihidroxibenzoico muy polar.' },
        { id: 'p2', name: '(+)-Catequina', formula: 'C₁₅H₁₄O₆', kwLog: 1.32, sParam: 2.6, areaWeight: 0.78, lambdaUvMax: 280, colorHex: COLORS.sage, description: 'Flavan-3-ol de semillas.' },
        { id: 'p3', name: 'trans-Resveratrol', formula: 'C₁₄H₁₂O₃', kwLog: 2.15, sParam: 3.1, areaWeight: 1.0, lambdaUvMax: 306, colorHex: COLORS.rosewood, description: 'Estilbeno conjugado con máxima absorción a 306 nm.' }
      ]),
      mkSample('hp_rutin_quercetin', 'Rutina (Glucósido) + Quercetina (Aglicona)', 'Extracto de Ginkgo / Cebolla', 0.34, 'Demuestra el impacto del disacárido rutinosa sobre la polaridad cromatográfica.', [
        { id: 'p1', name: 'Rutina (Quercetina-3-rutinósido)', formula: 'C₂₇H₃₀O₁₆', kwLog: 1.48, sParam: 2.7, areaWeight: 0.92, lambdaUvMax: 356, colorHex: COLORS.sage, description: 'Los 6 hidroxilos del azúcar reducen drásticamente la retención.' },
        { id: 'p2', name: 'Quercetina libre', formula: 'C₁₅H₁₀O₇', kwLog: 2.38, sParam: 3.3, areaWeight: 1.0, lambdaUvMax: 370, colorHex: COLORS.rosewood, description: 'Aglicona plana más hidrofóbica.' }
      ]),
      mkSample('hp_curcuminoids', 'Bisdemetoxi- + Demetoxi- + Curcumina', 'Raíz de Cúrcuma USP', 0.52, 'Separación de los tres curcuminoides naturales a 425 nm en rango visible.', [
        { id: 'p1', name: 'Bisdemetoxicurcumina', formula: 'C₁₉H₁₆O₄', kwLog: 2.62, sParam: 3.3, areaWeight: 0.78, lambdaUvMax: 418, colorHex: COLORS.misty, description: 'Sin grupos metoxilo.' },
        { id: 'p2', name: 'Demetoxicurcumina', formula: 'C₂₀H₁₈O₅', kwLog: 2.92, sParam: 3.5, areaWeight: 0.88, lambdaUvMax: 421, colorHex: COLORS.sage, description: 'Un grupo –OCH₃.' },
        { id: 'p3', name: 'Curcumina', formula: 'C₂₁H₂₀O₆', kwLog: 3.22, sParam: 3.7, areaWeight: 1.0, lambdaUvMax: 425, colorHex: COLORS.rosewood, description: 'Dos grupos –OCH₃; compuesto mayoritario.' }
      ]),
      mkSample('hp_olive_oleuropein', 'Hidroxitirosol + Oleuropeína', 'Aceite de oliva virgen extra', 0.32, 'Índice de polifenoles bioactivos cardiosaludables (Reglamento UE 432/2012).', [
        { id: 'p1', name: 'Hidroxitirosol', formula: 'C₈H₁₀O₃', kwLog: 1.15, sParam: 2.4, areaWeight: 1.0, lambdaUvMax: 280, colorHex: COLORS.sage, description: 'Alcohol catecólico polar.' },
        { id: 'p2', name: 'Oleuropeína', formula: 'C₂₅H₃₂O₁₃', kwLog: 2.02, sParam: 3.0, areaWeight: 0.9, lambdaUvMax: 280, colorHex: COLORS.rosewood, description: 'Secoiridoide glucosilado amargo.' }
      ]),
      mkSample('hp_citrus_flavanones', 'Naringina + Hesperidina + Nobiletina', 'Cáscara de cítricos', 0.36, 'Comparación de flavanonas polares frente a flavona polimetoxilada lipofílica.', [
        { id: 'p1', name: 'Naringina', formula: 'C₂₇H₃₂O₁₄', kwLog: 1.45, sParam: 2.6, areaWeight: 0.92, lambdaUvMax: 283, colorHex: COLORS.misty, description: 'Glucósido amargo del pomelo.' },
        { id: 'p2', name: 'Hesperidina', formula: 'C₂₈H₃₄O₁₅', kwLog: 1.80, sParam: 2.9, areaWeight: 1.0, lambdaUvMax: 284, colorHex: COLORS.sage, description: 'Flavanona principal de la naranja.' },
        { id: 'p3', name: 'Nobiletina', formula: 'C₂₁H₂₂O₈', kwLog: 2.68, sParam: 3.4, areaWeight: 0.85, lambdaUvMax: 332, colorHex: COLORS.rosewood, description: 'Seis grupos metoxilo sin azúcares libres.' }
      ]),
      mkSample('hp_isoflavones', 'Daidzeína + Genisteína', 'Suplemento de Soya', 0.38, 'Separación de fitoestrógenos isoflavónicos a 260 nm.', [
        { id: 'p1', name: 'Daidzeína', formula: 'C₁₅H₁₀O₄', kwLog: 1.98, sParam: 3.0, areaWeight: 0.9, lambdaUvMax: 250, colorHex: COLORS.sage, description: 'Carece de hidroxilo en C5.' },
        { id: 'p2', name: 'Genisteína', formula: 'C₁₅H₁₀O₅', kwLog: 2.38, sParam: 3.2, areaWeight: 1.0, lambdaUvMax: 262, colorHex: COLORS.rosewood, description: 'Puente de hidrógeno intramolecular C5-OH...C4=O aumenta hidrofobicidad aparente.' }
      ]),
      mkSample('hp_hydroxycinnamic', 'Ácido Cafeico + Ferúlico + p-Cumárico', 'Granos y cereales', 0.25, 'Ácidos hidroxicinámicos estructurales cuantificados a 320 nm.', [
        { id: 'p1', name: 'Ácido Cafeico', formula: 'C₉H₈O₄', kwLog: 1.12, sParam: 2.4, areaWeight: 1.0, lambdaUvMax: 323, colorHex: COLORS.misty, description: 'Orto-difenol polar.' },
        { id: 'p2', name: 'Ácido p-Cumárico', formula: 'C₉H₈O₃', kwLog: 1.44, sParam: 2.6, areaWeight: 0.9, lambdaUvMax: 310, colorHex: COLORS.sage, description: 'Un solo grupo –OH.' },
        { id: 'p3', name: 'Ácido Ferúlico', formula: 'C₁₀H₁₀O₄', kwLog: 1.72, sParam: 2.8, areaWeight: 0.95, lambdaUvMax: 322, colorHex: COLORS.rosewood, description: 'El grupo metoxilo eleva su retención.' }
      ]),
      mkSample('hp_kaempferol_apigenin', 'Luteolina + Apigenina + Kaempferol', 'Infusión de manzanilla', 0.40, 'Tres flavonas/flavonoles diferenciado por un único átomo de oxígeno.', [
        { id: 'p1', name: 'Luteolina', formula: 'C₁₅H₁₀O₆', kwLog: 2.02, sParam: 3.0, areaWeight: 0.95, lambdaUvMax: 350, colorHex: COLORS.misty, description: '4 grupos –OH (más polar).' },
        { id: 'p2', name: 'Apigenina', formula: 'C₁₅H₁₀O₅', kwLog: 2.35, sParam: 3.2, areaWeight: 1.0, lambdaUvMax: 338, colorHex: COLORS.sage, description: '3 grupos –OH.' },
        { id: 'p3', name: 'Kaempferol', formula: 'C₁₅H₁₀O₆', kwLog: 2.68, sParam: 3.4, areaWeight: 0.9, lambdaUvMax: 365, colorHex: COLORS.rosewood, description: 'Flavonol más retenido.' }
      ]),
      mkSample('hp_bht_bha', 'BHA + Galato de Propilo + BHT', 'Antioxidantes sintéticos', 0.68, 'Control de antioxidantes fenólicos lipofílicos en aceites alimentarios.', [
        { id: 'p1', name: 'Galato de Propilo', formula: 'C₁₀H₁₂O₅', kwLog: 1.95, sParam: 2.9, areaWeight: 0.9, lambdaUvMax: 275, colorHex: COLORS.misty, description: 'Éster gálico intermedio.' },
        { id: 'p2', name: 'BHA (Butilhidroxianisol)', formula: 'C₁₁H₁₆O₂', kwLog: 3.25, sParam: 3.8, areaWeight: 1.0, lambdaUvMax: 290, colorHex: COLORS.sage, description: 'Fenol tert-butilado.' },
        { id: 'p3', name: 'BHT (Butilhidroxitolueno)', formula: 'C₁₅H₂₄O', kwLog: 4.55, sParam: 4.5, areaWeight: 0.82, lambdaUvMax: 278, colorHex: COLORS.rosewood, description: 'Dos grupos tert-butilo impedidos muy apolares.' }
      ]),
      mkSample('hp_ellagic_punicalagin', 'Ácido Elágico + Punicalagina', 'Extracto de Granada', 0.25, 'Marcadores de autenticidad de zumo de granada.', [
        { id: 'p1', name: 'Punicalagina', formula: 'C₄₈H₂₈O₃₀', kwLog: 1.05, sParam: 2.4, areaWeight: 0.9, lambdaUvMax: 258, colorHex: COLORS.sage, description: 'Elagitanino hidrosoluble grande.' },
        { id: 'p2', name: 'Ácido Elágico', formula: 'C₁₄H₆O₈', kwLog: 1.72, sParam: 2.8, areaWeight: 1.0, lambdaUvMax: 254, colorHex: COLORS.rosewood, description: 'Dilactona plana del ácido hexahidroxidifénico.' }
      ])
    ]
  },

  // 5. HORMONAS ESTEROIDES Y CORTICOIDES
  {
    id: 'steroids',
    name: 'Hormonas Esteroides y Corticoides',
    stationaryPhase: 'C18 Alta Resolución (1.8 µm UHPLC)',
    separationMechanism:
      'Los esqueletos esteroideos comparten núcleo ciclopentanoperhidrofenantreno; la retención disminuye cuantos más grupos –OH y C=O polares tenga el anillo.',
    compounds: [
      mkSample('hp_cortisol_prednisone', 'Prednisona + Hidrocortisona + Dexametasona', 'Control corticoides', 0.36, 'Separación de corticosteroides fluorados y no fluorados a 242 nm.', [
        { id: 'p1', name: 'Prednisona', formula: 'C₂₁H₂₆O₅', kwLog: 1.68, sParam: 2.8, areaWeight: 0.92, lambdaUvMax: 240, colorHex: COLORS.misty, description: 'Cetona en C11 (más polar).' },
        { id: 'p2', name: 'Hidrocortisona (Cortisol)', formula: 'C₂₁H₃₀O₅', kwLog: 1.98, sParam: 3.0, areaWeight: 1.0, lambdaUvMax: 242, colorHex: COLORS.sage, description: 'Hormona endógena del estrés.' },
        { id: 'p3', name: 'Dexametasona', formula: 'C₂₂H₂₉FO₅', kwLog: 2.38, sParam: 3.2, areaWeight: 0.95, lambdaUvMax: 240, colorHex: COLORS.rosewood, description: 'Metilo C16 y flúor C9 aumentan afinidad C18.' }
      ]),
      mkSample('hp_estradiol_estriol', 'Estriol + Estradiol + Etinilestradiol', 'Hormonas estrogénicas', 0.44, 'Orden de elución gobernado por el número de hidroxilos (3 > 2 > 2+etinilo).', [
        { id: 'p1', name: 'Estriol (E3)', formula: 'C₁₈H₂₄O₃', kwLog: 1.85, sParam: 2.9, areaWeight: 0.85, lambdaUvMax: 280, colorHex: COLORS.misty, description: 'Tres grupos –OH.' },
        { id: 'p2', name: '17β-Estradiol (E2)', formula: 'C₁₈H₂₄O₂', kwLog: 2.58, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 280, colorHex: COLORS.sage, description: 'Dos grupos –OH.' },
        { id: 'p3', name: '17α-Etinilestradiol (EE2)', formula: 'C₂₀H₂₄O₂', kwLog: 2.94, sParam: 3.6, areaWeight: 0.95, lambdaUvMax: 280, colorHex: COLORS.rosewood, description: 'Grupo etinilo aumenta retención.' }
      ]),
      mkSample('hp_testosterone_prog', 'Testosterona + Progesterona', 'Panel endocrinológico', 0.56, 'La ausencia de –OH en C17 de la progesterona dispara su retención respecto a la testosterona.', [
        { id: 'p1', name: 'Testosterona', formula: 'C₁₉H₂₈O₂', kwLog: 2.75, sParam: 3.5, areaWeight: 1.0, lambdaUvMax: 242, colorHex: COLORS.sage, description: 'Enona C3=O y alcohol C17–OH.' },
        { id: 'p2', name: 'Progesterona', formula: 'C₂₁H₃₀O₂', kwLog: 3.55, sParam: 4.0, areaWeight: 0.92, lambdaUvMax: 242, colorHex: COLORS.rosewood, description: 'Dicetona mucho más apolar.' }
      ]),
      mkSample('hp_betamethasone_diprop', 'Betametasona + Dipropionato', 'Crema dermatológica', 0.62, 'Diferenciación entre corticoide libre y su profármaco diéster lipofílico.', [
        { id: 'p1', name: 'Betametasona base', formula: 'C₂₂H₂₉FO₅', kwLog: 2.38, sParam: 3.2, areaWeight: 0.88, lambdaUvMax: 240, colorHex: COLORS.sage, description: 'Alcohol esteroideo libre.' },
        { id: 'p2', name: 'Dipropionato de Betametasona', formula: 'C₂₈H₃₇FO₇', kwLog: 4.10, sParam: 4.2, areaWeight: 1.0, lambdaUvMax: 240, colorHex: COLORS.rosewood, description: 'Dos cadenas propionato muy hidrofóbicas.' }
      ]),
      mkSample('hp_aldosterone_cortisone', 'Aldosterona + Cortisona', 'Esteroides adrenales', 0.34, 'Resolución de mineralocorticoide hemiacetal frente a cortisona.', [
        { id: 'p1', name: 'Aldosterona', formula: 'C₂₁H₂₈O₅', kwLog: 1.48, sParam: 2.7, areaWeight: 0.9, lambdaUvMax: 240, colorHex: COLORS.sage, description: 'Equilibrio aldehído-hemiacetal muy polar.' },
        { id: 'p2', name: 'Cortisona', formula: 'C₂₁H₂₈O₅', kwLog: 1.82, sParam: 2.9, areaWeight: 1.0, lambdaUvMax: 238, colorHex: COLORS.rosewood, description: 'Eluye después de la aldosterona.' }
      ]),
      mkSample('hp_levonorgestrel', 'Etinilestradiol + Levonorgestrel', 'Comprimido anticonceptivo', 0.52, 'Separación combinada de estrógeno y progestágeno sintético.', [
        { id: 'p1', name: 'Etinilestradiol', formula: 'C₂₀H₂₄O₂', kwLog: 2.78, sParam: 3.5, areaWeight: 0.88, lambdaUvMax: 280, colorHex: COLORS.sage, description: 'Detección aromática a 280 nm.' },
        { id: 'p2', name: 'Levonorgestrel', formula: 'C₂₁H₂₈O₂', kwLog: 3.18, sParam: 3.7, areaWeight: 1.0, lambdaUvMax: 242, colorHex: COLORS.rosewood, description: 'Enona conjugada a 242 nm.' }
      ]),
      mkSample('hp_prednisolone_methyl', 'Prednisolona + Metilprednisolona', 'Suspensión oftálmica', 0.36, 'Un único grupo metilo adicional en posición 6α separa ambos picos limpiamente.', [
        { id: 'p1', name: 'Prednisolona', formula: 'C₂₁H₂₈O₅', kwLog: 1.78, sParam: 2.9, areaWeight: 0.95, lambdaUvMax: 242, colorHex: COLORS.sage, description: 'Corticosteroide base.' },
        { id: 'p2', name: 'Metilprednisolona', formula: 'C₂₂H₃₀O₅', kwLog: 2.15, sParam: 3.1, areaWeight: 1.0, lambdaUvMax: 242, colorHex: COLORS.rosewood, description: 'Metilo adicional aporta mayor interacción C18.' }
      ]),
      mkSample('hp_androstenedione', 'Androstenediona + Testosterona', 'Control dopaje deportivo', 0.50, 'Perfil androgénico C19 cuantificado en 242 nm.', [
        { id: 'p1', name: 'Testosterona', formula: 'C₁₉H₂₈O₂', kwLog: 2.65, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 242, colorHex: COLORS.sage, description: 'Hidroxilo en C17.' },
        { id: 'p2', name: '4-Androstenediona', formula: 'C₁₉H₂₆O₂', kwLog: 2.95, sParam: 3.6, areaWeight: 0.92, lambdaUvMax: 240, colorHex: COLORS.rosewood, description: 'Precursor dicetónico más retenido.' }
      ]),
      mkSample('hp_triamcinolone', 'Triamcinolona + Acetónido', 'Aerosol nasal', 0.44, 'Efecto del bloqueo acetónido de dos hidroxilos vecinales.', [
        { id: 'p1', name: 'Triamcinolona', formula: 'C₂₁H₂₇FO₆', kwLog: 1.48, sParam: 2.7, areaWeight: 0.85, lambdaUvMax: 240, colorHex: COLORS.misty, description: 'Cuatro grupos –OH libres (muy polar).' },
        { id: 'p2', name: 'Acetónido de Triamcinolona', formula: 'C₂₄H₃₁FO₆', kwLog: 2.62, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 240, colorHex: COLORS.rosewood, description: 'Cetal cíclico oculta la polaridad aumentando t_R.' }
      ]),
      mkSample('hp_spironolactone', 'Canrenona + Espironolactona', 'Diurético antagonista', 0.50, 'Seguimiento de profármaco tioacetilo y su metabolito activo.', [
        { id: 'p1', name: 'Canrenona', formula: 'C₂₂H₂₈O₃', kwLog: 2.55, sParam: 3.3, areaWeight: 1.0, lambdaUvMax: 283, colorHex: COLORS.sage, description: 'Dieno-cetona metabolito.' },
        { id: 'p2', name: 'Espironolactona', formula: 'C₂₄H₃₂O₄S', kwLog: 2.98, sParam: 3.6, areaWeight: 0.92, lambdaUvMax: 238, colorHex: COLORS.rosewood, description: 'Grupo tioacetilo S–COCH₃ incrementa retención.' }
      ])
    ]
  },

  // 6. ANTIBIOTICOS Y FARMACOS CLINICOS
  {
    id: 'antibiotics',
    name: 'Antibióticos y Fármacos Clínicos',
    stationaryPhase: 'C18 Desactivado Base / Acidez Controlada',
    separationMechanism:
      'Antibióticos betalactámicos, fluoroquinolonas y sulfonamidas separados mediante pH amortiguado para evitar colas por grupos amino.',
    compounds: [
      mkSample('hp_amoxicillin_clav', 'Amoxicilina + Ácido Clavulánico', 'Suspensión pediátrica USP', 0.14, 'Control oficial de formulación betalactámica + inhibidor de betalactamasa.', [
        { id: 'p1', name: 'Ácido Clavulánico', formula: 'C₈H₉NO₅', kwLog: 0.56, sParam: 2.0, areaWeight: 0.72, lambdaUvMax: 220, colorHex: COLORS.misty, description: 'Oxapenam polar de rápida elución.' },
        { id: 'p2', name: 'Amoxicilina', formula: 'C₁₆H₁₉N₃O₅S', kwLog: 1.08, sParam: 2.4, areaWeight: 1.0, lambdaUvMax: 229, colorHex: COLORS.rosewood, description: 'Aminopenicilina fenólica.' }
      ]),
      mkSample('hp_cipro_ofloxacin', 'Ofloxacina + Ciprofloxacina', 'Fluoroquinolonas clínicas', 0.22, 'Detección UV intensa a 278 nm en fase móvil ácida.', [
        { id: 'p1', name: 'Ofloxacina', formula: 'C₁₈H₂₀FN₃O₄', kwLog: 1.24, sParam: 2.5, areaWeight: 0.92, lambdaUvMax: 294, colorHex: COLORS.sage, description: 'Anillo morfolino oxazina.' },
        { id: 'p2', name: 'Ciprofloxacina', formula: 'C₁₇H₁₈FN₃O₃', kwLog: 1.56, sParam: 2.7, areaWeight: 1.0, lambdaUvMax: 278, colorHex: COLORS.rosewood, description: 'Grupo ciclopropilo aporta mayor retención.' }
      ]),
      mkSample('hp_sulfamethoxazole_tmp', 'Trimetoprim + Sulfametoxazol', 'Cotrimoxazol tabletas', 0.26, 'Separación simultánea de sinergistas antibacterianos a 254 nm.', [
        { id: 'p1', name: 'Trimetoprim', formula: 'C₁₄H₁₈N₄O₃', kwLog: 1.22, sParam: 2.5, areaWeight: 0.85, lambdaUvMax: 270, colorHex: COLORS.sage, description: 'Diaminopirimidina parcialmente protonada.' },
        { id: 'p2', name: 'Sulfametoxazol', formula: 'C₁₀H₁₁N₃O₃S', kwLog: 1.72, sParam: 2.8, areaWeight: 1.0, lambdaUvMax: 268, colorHex: COLORS.rosewood, description: 'Sulfonamida neutra a pH 3.5.' }
      ]),
      mkSample('hp_azithromycin_clarithro', 'Claritromicina + Roxitromicina', 'Macrólidos en 205 nm', 0.48, 'Macrólidos lactónicos cuantificados en el ultravioleta lejano.', [
        { id: 'p1', name: 'Claritromicina', formula: 'C₃₈H₆₉NO₁₃', kwLog: 2.52, sParam: 3.3, areaWeight: 1.0, lambdaUvMax: 205, colorHex: COLORS.sage, description: '6-O-metileritromicina.' },
        { id: 'p2', name: 'Roxitromicina', formula: 'C₄₁H₇₆N₂O₁₅', kwLog: 2.90, sParam: 3.5, areaWeight: 0.92, lambdaUvMax: 205, colorHex: COLORS.rosewood, description: 'Cadena oxima-éter alarga t_R.' }
      ]),
      mkSample('hp_tetracycline_doxy', 'Oxitetraciclina + Tetraciclina + Doxiciclina', 'Residuos veterinarios', 0.24, 'Uso de ácido oxálico/TFA en fase móvil para impedir quelación metálica con sílice.', [
        { id: 'p1', name: 'Oxitetraciclina', formula: 'C₂₂H₂₄N₂O₉', kwLog: 1.08, sParam: 2.4, areaWeight: 0.88, lambdaUvMax: 355, colorHex: COLORS.misty, description: 'Un –OH adicional en C5.' },
        { id: 'p2', name: 'Tetraciclina', formula: 'C₂₂H₂₄N₂O₈', kwLog: 1.38, sParam: 2.6, areaWeight: 0.94, lambdaUvMax: 357, colorHex: COLORS.sage, description: 'Estándar base.' },
        { id: 'p3', name: 'Doxiciclina', formula: 'C₂₂H₂₄N₂O₈', kwLog: 1.82, sParam: 2.9, areaWeight: 1.0, lambdaUvMax: 352, colorHex: COLORS.rosewood, description: 'Isómero más lipofílico.' }
      ]),
      mkSample('hp_ceftriaxone_cefotaxime', 'Ceftriaxona + Cefotaxima', 'Cefalosporinas 3ª gen.', 0.20, 'Antibióticos parenterales cuantificados a 254 nm.', [
        { id: 'p1', name: 'Ceftriaxona', formula: 'C₁₈H₁₈N₈O₇S₃', kwLog: 0.95, sParam: 2.3, areaWeight: 1.0, lambdaUvMax: 254, colorHex: COLORS.sage, description: 'Anillo triazinadiona altamente polar.' },
        { id: 'p2', name: 'Cefotaxima', formula: 'C₁₆H₁₇N₅O₇S₂', kwLog: 1.38, sParam: 2.6, areaWeight: 0.92, lambdaUvMax: 254, colorHex: COLORS.rosewood, description: 'Cadena acetoximetilo.' }
      ]),
      mkSample('hp_chloramphenicol', 'Tiamfenicol + Cloranfenicol', 'Seguridad alimentaria', 0.28, 'Detección del grupo p-nitrofenilo del cloranfenicol a 278 nm.', [
        { id: 'p1', name: 'Tiamfenicol', formula: 'C₁₂H₁₅Cl₂NO₅S', kwLog: 1.12, sParam: 2.4, areaWeight: 0.78, lambdaUvMax: 224, colorHex: COLORS.sage, description: 'Grupo metilsulfonilo más polar.' },
        { id: 'p2', name: 'Cloranfenicol', formula: 'C₁₁H₁₂Cl₂N₂O₅', kwLog: 1.68, sParam: 2.8, areaWeight: 1.0, lambdaUvMax: 278, colorHex: COLORS.rosewood, description: 'Grupo nitro aromático absorbe fuertemente a 278 nm.' }
      ]),
      mkSample('hp_metronidazole', 'Metronidazol + Tinidazol', 'Nitroimidazoles', 0.20, 'Antiparasitarios medidos selectivamente en 315 nm.', [
        { id: 'p1', name: 'Metronidazol', formula: 'C₆H₉N₃O₃', kwLog: 0.92, sParam: 2.2, areaWeight: 1.0, lambdaUvMax: 318, colorHex: COLORS.sage, description: 'Cadena hidroxietilo más polar.' },
        { id: 'p2', name: 'Tinidazol', formula: 'C₈H₁₃N₃O₄S', kwLog: 1.36, sParam: 2.6, areaWeight: 0.92, lambdaUvMax: 315, colorHex: COLORS.rosewood, description: 'Cadena etilsulfoniletilo más retenida.' }
      ]),
      mkSample('hp_rifampicin_isoniazid', 'Isoniazida + Pirazinamida + Rifampicina', 'Terapia antituberculosa', 0.35, 'Separación de fármacos desde muy polares hasta macrocíclico naranja.', [
        { id: 'p1', name: 'Isoniazida', formula: 'C₆H₇N₃O', kwLog: 0.72, sParam: 2.1, areaWeight: 0.8, lambdaUvMax: 263, colorHex: COLORS.misty, description: 'Hidrazida isonicotínica.' },
        { id: 'p2', name: 'Pirazinamida', formula: 'C₅H₅N₃O', kwLog: 1.15, sParam: 2.4, areaWeight: 0.85, lambdaUvMax: 268, colorHex: COLORS.sage, description: 'Amida pirazínica.' },
        { id: 'p3', name: 'Rifampicina', formula: 'C₄₃H₅₈N₄O₁₂', kwLog: 2.42, sParam: 3.3, areaWeight: 1.0, lambdaUvMax: 334, colorHex: COLORS.rosewood, description: 'Ansamicina macrocíclica roja muy retenida.' }
      ]),
      mkSample('hp_atorvastatin', 'Simvastatina + Atorvastatina', 'Estatinas hipolipemiantes', 0.56, 'Control farmacéutico de inhibidores HMG-CoA reductasa.', [
        { id: 'p1', name: 'Atorvastatina', formula: 'C₃₃H₃₅FN₂O₅', kwLog: 2.95, sParam: 3.6, areaWeight: 1.0, lambdaUvMax: 246, colorHex: COLORS.sage, description: 'Forma ácida abierta con dos –OH.' },
        { id: 'p2', name: 'Simvastatina', formula: 'C₂₅H₃₈O₅', kwLog: 3.55, sParam: 4.0, areaWeight: 0.88, lambdaUvMax: 238, colorHex: COLORS.rosewood, description: 'Forma lactona cerrada más apolar.' }
      ])
    ]
  },

  // 7. AMINOACIDOS Y PEPTIDOS
  {
    id: 'aminoacids',
    name: 'Aminoácidos y Péptidos',
    stationaryPhase: 'C18 (TFA 0.1% / Acetonitrilo)',
    separationMechanism:
      'Aminoácidos aromáticos y péptidos cortos separados por hidrofobicidad neta (Trp > Phe > Tyr) y detectados a 214 nm (enlace peptídico) o 280 nm.',
    compounds: [
      mkSample('hp_aromatic_aa', 'Tirosina + Fenilalanina + Triptófano', 'Aminoácidos aromáticos libres', 0.14, 'Los tres únicos aminoácidos proteicos con cromóforo UV nativo intenso sin derivatizar.', [
        { id: 'p1', name: 'L-Tirosina (Tyr)', formula: 'C₉H₁₁NO₃', kwLog: 0.56, sParam: 2.0, areaWeight: 0.85, lambdaUvMax: 275, colorHex: COLORS.misty, description: 'El grupo –OH fenólico reduce afinidad por C18.' },
        { id: 'p2', name: 'L-Fenilalanina (Phe)', formula: 'C₉H₁₁NO₂', kwLog: 0.88, sParam: 2.2, areaWeight: 0.65, lambdaUvMax: 258, colorHex: COLORS.sage, description: 'Anillo bencénico hidrofóbico con banda vibrónica a 258 nm.' },
        { id: 'p3', name: 'L-Triptófano (Trp)', formula: 'C₁₁H₁₂N₂O₂', kwLog: 1.24, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 280, colorHex: COLORS.rosewood, description: 'Anillo indol bicíclico más hidrofóbico y mayor ε a 280 nm.' }
      ]),
      mkSample('hp_glutathione', 'Glutatión Reducido (GSH) + Oxidado (GSSG)', 'Estrés oxidativo celular', 0.10, 'El puente disulfuro dimérico dobla la retención de GSSG frente al monómero GSH a 210 nm.', [
        { id: 'p1', name: 'GSH (Reducido)', formula: 'C₁₀H₁₇N₃O₆S', kwLog: 0.52, sParam: 1.9, areaWeight: 0.88, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Tripéptido tiólico monomérico.' },
        { id: 'p2', name: 'GSSG (Disulfuro oxidado)', formula: 'C₂₀H₃₂N₆O₁₂S₂', kwLog: 0.94, sParam: 2.3, areaWeight: 1.0, lambdaUvMax: 210, colorHex: COLORS.rosewood, description: 'Dímero S–S más retenido.' }
      ]),
      mkSample('hp_angiotensins', 'Angiotensina II + Angiotensina I', 'Mapeo peptídico bioactivo', 0.28, 'Péptidos de 8 y 10 aminoácidos resueltos en C18 300 Å con TFA 0.1%.', [
        { id: 'p1', name: 'Angiotensina II (8 aa)', formula: 'C₅₀H₇₁N₁₃O₁₂', kwLog: 1.48, sParam: 2.7, areaWeight: 0.94, lambdaUvMax: 214, colorHex: COLORS.sage, description: 'Octapéptido vasoconstrictor.' },
        { id: 'p2', name: 'Angiotensina I (10 aa)', formula: 'C₆₂H₈₉N₁₇O₁₄', kwLog: 1.88, sParam: 3.0, areaWeight: 1.0, lambdaUvMax: 214, colorHex: COLORS.rosewood, description: 'Dos residuos extra (His-Leu) aportan retención adicional.' }
      ]),
      mkSample('hp_insulin_oxytocin', 'Oxitocina + Insulina Humana', 'Control biofarmacéutico USP', 0.34, 'Resolución de hormona nonapeptídica y proteína recombinante de 5.8 kDa.', [
        { id: 'p1', name: 'Oxitocina', formula: 'C₄₃H₆₆N₁₂O₁₂S₂', kwLog: 1.65, sParam: 2.8, areaWeight: 0.9, lambdaUvMax: 220, colorHex: COLORS.sage, description: 'Péptido cíclico de 9 residuos.' },
        { id: 'p2', name: 'Insulina Humana', formula: 'C₂₅₇H₃₈₃N₆₅O₇₇S₆', kwLog: 2.28, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 214, colorHex: COLORS.rosewood, description: 'Proteína de 51 aminoácidos muy sensible a %B (S elevado).' }
      ]),
      mkSample('hp_dopamine_serotonin', 'Dopamina + Serotonina + Melatonina', 'Neurotransmisores indólicos y catecoles', 0.18, 'Aumento drástico de retención al acetilar e introducir metoxilo en melatonina.', [
        { id: 'p1', name: 'Dopamina', formula: 'C₈H₁₁NO₂', kwLog: 0.52, sParam: 1.9, areaWeight: 0.8, lambdaUvMax: 280, colorHex: COLORS.misty, description: 'Catecolamina protonada muy polar.' },
        { id: 'p2', name: 'Serotonina (5-HT)', formula: 'C₁₀H₁₂N₂O', kwLog: 0.92, sParam: 2.2, areaWeight: 0.9, lambdaUvMax: 278, colorHex: COLORS.sage, description: 'Hidroxiindolamina intermedia.' },
        { id: 'p3', name: 'Melatonina', formula: 'C₁₃H₁₆N₂O₂', kwLog: 1.72, sParam: 2.8, areaWeight: 1.0, lambdaUvMax: 278, colorHex: COLORS.rosewood, description: 'Amida neutra más lipofílica.' }
      ]),
      mkSample('hp_dopa_carbidopa', 'Levodopa + Carbidopa', 'Fármaco anti-Parkinson', 0.14, 'Separación de aminoácido catecol y su inhibidor hidrazínico de descarboxilasa.', [
        { id: 'p1', name: 'Levodopa (L-DOPA)', formula: 'C₉H₁₁NO₄', kwLog: 0.58, sParam: 2.0, areaWeight: 1.0, lambdaUvMax: 280, colorHex: COLORS.sage, description: 'Zwitterión altamente polar.' },
        { id: 'p2', name: 'Carbidopa', formula: 'C₁₀H₁₄N₂O₄', kwLog: 1.05, sParam: 2.3, areaWeight: 0.88, lambdaUvMax: 280, colorHex: COLORS.rosewood, description: 'Metilo α adicional prolonga t_R.' }
      ]),
      mkSample('hp_kynurenine', 'Triptófano + Quinurenina', 'Vía metabólica IDO', 0.15, 'Índice inflamatorio mediante razón Quinurenina/Triptófano a 280/360 nm.', [
        { id: 'p1', name: 'L-Quinurenina', formula: 'C₁₀H₁₂N₂O₃', kwLog: 0.78, sParam: 2.1, areaWeight: 0.92, lambdaUvMax: 360, colorHex: COLORS.sage, description: 'Producto de apertura del anillo indol.' },
        { id: 'p2', name: 'L-Triptófano', formula: 'C₁₁H₁₂N₂O₂', kwLog: 1.24, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 280, colorHex: COLORS.rosewood, description: 'Sustrato aromático intacto.' }
      ]),
      mkSample('hp_thyroid_t3_t4', 'Liotironina (T₃) + Levotiroxina (T₄)', 'Hormonas tiroideas yodadas', 0.45, 'El cuarto átomo de yodo incrementa fuertemente la interacción hidrofóbica de T₄.', [
        { id: 'p1', name: 'T₃ (Triyodotironina)', formula: 'C₁₅H₁₂I₃NO₄', kwLog: 2.28, sParam: 3.1, areaWeight: 0.94, lambdaUvMax: 230, colorHex: COLORS.sage, description: 'Tres átomos de yodo.' },
        { id: 'p2', name: 'T₄ (Tiroxina)', formula: 'C₁₅H₁₁I₄NO₄', kwLog: 2.68, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 225, colorHex: COLORS.rosewood, description: 'Cuatro átomos de yodo elevan log P.' }
      ]),
      mkSample('hp_opa_aa_mix', 'Alanina-OPA + Valina-OPA + Leucina-OPA', 'Aminoácidos derivatizados OPA', 0.42, 'Detección UV a 338 nm tras reacción pre-columna con orto-ftalaldehído.', [
        { id: 'p1', name: 'Alanina-OPA', formula: 'Isoindol-Ala', kwLog: 1.75, sParam: 2.8, areaWeight: 0.92, lambdaUvMax: 338, colorHex: COLORS.misty, description: 'Cadena lateral metilo.' },
        { id: 'p2', name: 'Valina-OPA', formula: 'Isoindol-Val', kwLog: 2.25, sParam: 3.1, areaWeight: 0.96, lambdaUvMax: 338, colorHex: COLORS.sage, description: 'Cadena isopropilo.' },
        { id: 'p3', name: 'Leucina-OPA', formula: 'Isoindol-Leu', kwLog: 2.70, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 338, colorHex: COLORS.rosewood, description: 'Cadena isobutilo más hidrofóbica.' }
      ]),
      mkSample('hp_bradykinin_subp', 'Bradiquinina + Sustancia P', 'Neuropéptidos modelo', 0.30, 'Evaluación de columnas peptídicas de poro ancho 300 Å.', [
        { id: 'p1', name: 'Bradiquinina', formula: 'C₅₀H₇₃N₁₅O₁₁', kwLog: 1.45, sParam: 2.7, areaWeight: 0.92, lambdaUvMax: 214, colorHex: COLORS.sage, description: 'Contiene dos argininas básicas polares.' },
        { id: 'p2', name: 'Sustancia P', formula: 'C₆₃H₉₈N₁₈O₁₃S', kwLog: 1.92, sParam: 3.1, areaWeight: 1.0, lambdaUvMax: 214, colorHex: COLORS.rosewood, description: 'Extremo C-terminal hidrofóbico Leu-Met-NH₂.' }
      ])
    ]
  },

  // 8. PLAGUICIDAS Y CONTAMINANTES AMBIENTALES
  {
    id: 'pesticides',
    name: 'Plaguicidas y Contaminantes (EPA)',
    stationaryPhase: 'C18 Ambiental (Agua / Acetonitrilo)',
    separationMechanism:
      'Monitoreo de herbicidas triazínicos, carbamatos y disruptores fenólicos en aguas potables (métodos EPA 531 / 549 / 8310).',
    compounds: [
      mkSample('hp_triazines', 'Simazina + Atrazina + Propazina', 'Herbicidas en agua potable', 0.44, 'Serie homóloga de cloro-triazinas diferenciadas por longitud de cadenas alquilo.', [
        { id: 'p1', name: 'Simazina (di-Et)', formula: 'C₇H₁₂ClN₅', kwLog: 1.98, sParam: 2.9, areaWeight: 0.95, lambdaUvMax: 222, colorHex: COLORS.misty, description: 'Dos grupos etilo.' },
        { id: 'p2', name: 'Atrazina (Et + iPr)', formula: 'C₈H₁₄ClN₅', kwLog: 2.38, sParam: 3.2, areaWeight: 1.0, lambdaUvMax: 222, colorHex: COLORS.sage, description: 'Herbicida regulado estándar.' },
        { id: 'p3', name: 'Propazina (di-iPr)', formula: 'C₉H₁₆ClN₅', kwLog: 2.78, sParam: 3.5, areaWeight: 0.9, lambdaUvMax: 222, colorHex: COLORS.rosewood, description: 'Dos grupos isopropilo muy retenidos.' }
      ]),
      mkSample('hp_bisphenols', 'Bisfenol F + Bisfenol A + Bisfenol S', 'Lixiviados plásticos', 0.45, 'Separación de disruptores endocrinos en envases alimentarios a 228 nm.', [
        { id: 'p1', name: 'Bisfenol S (BPS)', formula: 'C₁₂H₁₀O₄S', kwLog: 1.68, sParam: 2.8, areaWeight: 0.9, lambdaUvMax: 258, colorHex: COLORS.misty, description: 'Puente sulfona polar.' },
        { id: 'p2', name: 'Bisfenol F (BPF)', formula: 'C₁₃H₁₂O₂', kwLog: 2.15, sParam: 3.1, areaWeight: 0.94, lambdaUvMax: 228, colorHex: COLORS.sage, description: 'Puente metileno.' },
        { id: 'p3', name: 'Bisfenol A (BPA)', formula: 'C₁₅H₁₆O₂', kwLog: 2.65, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 228, colorHex: COLORS.rosewood, description: 'Puente isopropilideno más apolar.' }
      ]),
      mkSample('hp_carbamates', 'Aldicarb + Carbofurano + Carbarilo', 'Residuos frutícolas EPA 531', 0.40, 'Insecticidas N-metilcarbamatos detectados a 220 nm.', [
        { id: 'p1', name: 'Aldicarb', formula: 'C₇H₁₄N₂O₂S', kwLog: 1.52, sParam: 2.6, areaWeight: 0.78, lambdaUvMax: 220, colorHex: COLORS.misty, description: 'Aldoxima alifática más polar.' },
        { id: 'p2', name: 'Carbofurano', formula: 'C₁₂H₁₅NO₃', kwLog: 1.98, sParam: 3.0, areaWeight: 0.9, lambdaUvMax: 276, colorHex: COLORS.sage, description: 'Benzofurano intermedio.' },
        { id: 'p3', name: 'Carbarilo', formula: 'C₁₂H₁₁NO₂', kwLog: 2.38, sParam: 3.2, areaWeight: 1.0, lambdaUvMax: 222, colorHex: COLORS.rosewood, description: 'Éster naftílico altamente hidrofóbico.' }
      ]),
      mkSample('hp_urea_herbicides', 'Monurón + Diurón + Linurón', 'Fenilureas en suelos', 0.48, 'Resolución por número de sustituyentes cloro en el anillo fenilo.', [
        { id: 'p1', name: 'Monurón (1 Cl)', formula: 'C₉H₁₁ClN₂O', kwLog: 1.95, sParam: 2.9, areaWeight: 0.9, lambdaUvMax: 245, colorHex: COLORS.misty, description: 'Monoclorofenilurea.' },
        { id: 'p2', name: 'Diurón (2 Cl)', formula: 'C₉H₁₀Cl₂N₂O', kwLog: 2.48, sParam: 3.3, areaWeight: 1.0, lambdaUvMax: 250, colorHex: COLORS.sage, description: 'Dicloro aumenta retención.' },
        { id: 'p3', name: 'Linurón (2 Cl + OMe)', formula: 'C₉H₁₀Cl₂N₂O₂', kwLog: 2.92, sParam: 3.6, areaWeight: 0.94, lambdaUvMax: 248, colorHex: COLORS.rosewood, description: 'Grupo N-metoxi mayor afinidad.' }
      ]),
      mkSample('hp_phenols_epa', 'Fenol + 2-Clorofenol + 2,4-Diclorofenol', 'Contaminantes EPA 604', 0.42, 'Aumento escalonado de retención al sustituir hidrógenos por átomos de cloro.', [
        { id: 'p1', name: 'Fenol', formula: 'C₆H₆O', kwLog: 1.48, sParam: 2.6, areaWeight: 0.9, lambdaUvMax: 270, colorHex: COLORS.misty, description: 'Sin halógenos.' },
        { id: 'p2', name: '2-Clorofenol', formula: 'C₆H₅ClO', kwLog: 1.95, sParam: 2.9, areaWeight: 0.95, lambdaUvMax: 274, colorHex: COLORS.sage, description: 'Un cloro.' },
        { id: 'p3', name: '2,4-Diclorofenol', formula: 'C₆H₄Cl₂O', kwLog: 2.55, sParam: 3.3, areaWeight: 1.0, lambdaUvMax: 284, colorHex: COLORS.rosewood, description: 'Dos átomos de cloro.' }
      ]),
      mkSample('hp_organophosphates', 'Malatión + Paratión + Clorpirifós', 'Organofosforados agrícolas', 0.68, 'Compuestos hidrofóbicos que eluyen con >65% Acetonitrilo.', [
        { id: 'p1', name: 'Malatión', formula: 'C₁₀H₁₉O₆PS₂', kwLog: 2.85, sParam: 3.5, areaWeight: 0.78, lambdaUvMax: 215, colorHex: COLORS.misty, description: 'Éster succinato polar relativo.' },
        { id: 'p2', name: 'Paratión', formula: 'C₁₀H₁₄NO₅PS', kwLog: 3.48, sParam: 3.9, areaWeight: 1.0, lambdaUvMax: 274, colorHex: COLORS.sage, description: 'Nitrofeniltiofosfato absorbe a 274 nm.' },
        { id: 'p3', name: 'Clorpirifós', formula: 'C₉H₁₁Cl₃NO₃PS', kwLog: 4.35, sParam: 4.4, areaWeight: 0.92, lambdaUvMax: 290, colorHex: COLORS.rosewood, description: 'Tricloropiridina muy hidrofóbica.' }
      ]),
      mkSample('hp_phenoxy_herbicides', '2,4-D + MCPA + Dicamba', 'Herbicidas clorofenoxiacéticos', 0.42, 'Separación con ácido fórmico al 0.1% para mantener los carboxilos protonados.', [
        { id: 'p1', name: 'Dicamba', formula: 'C₈H₆Cl₂O₃', kwLog: 1.72, sParam: 2.8, areaWeight: 0.85, lambdaUvMax: 275, colorHex: COLORS.misty, description: 'Metoxibenzoico más polar.' },
        { id: 'p2', name: '2,4-D', formula: 'C₈H₆Cl₂O₃', kwLog: 2.15, sParam: 3.1, areaWeight: 1.0, lambdaUvMax: 284, colorHex: COLORS.sage, description: 'Ácido diclorofenoxiacético.' },
        { id: 'p3', name: 'MCPA', formula: 'C₉H₉ClO₃', kwLog: 2.48, sParam: 3.3, areaWeight: 0.92, lambdaUvMax: 279, colorHex: COLORS.rosewood, description: 'Metilclorofenoxiacético.' }
      ]),
      mkSample('hp_nitroaromatics', 'RDX + TNT + 2,4-DNT', 'Explosivos EPA 8330', 0.46, 'Análisis ambiental forense de suelos contaminados a 254 nm.', [
        { id: 'p1', name: 'RDX (Ciclonita)', formula: 'C₃H₆N₆O₆', kwLog: 1.55, sParam: 2.7, areaWeight: 0.85, lambdaUvMax: 240, colorHex: COLORS.misty, description: 'Nitramina cíclica polar.' },
        { id: 'p2', name: '2,4,6-TNT', formula: 'C₇H₅N₃O₆', kwLog: 2.25, sParam: 3.1, areaWeight: 1.0, lambdaUvMax: 230, colorHex: COLORS.sage, description: 'Trinitrotolueno.' },
        { id: 'p3', name: '2,4-DNT', formula: 'C₇H₆N₂O₄', kwLog: 2.58, sParam: 3.3, areaWeight: 0.95, lambdaUvMax: 252, colorHex: COLORS.rosewood, description: 'Menor número de grupos nitro polarizantes.' }
      ]),
      mkSample('hp_parabens_water', 'Metil + Etil + Propil + Butilparabeno', 'Contaminantes emergentes', 0.46, 'Serie homóloga perfecta separada por un –CH₂– por cada pico sucesivo.', [
        { id: 'p1', name: 'Metilparabeno', formula: 'C₈H₈O₃', kwLog: 1.65, sParam: 2.7, areaWeight: 1.0, lambdaUvMax: 256, colorHex: COLORS.misty, description: 'Éster C1.' },
        { id: 'p2', name: 'Etilparabeno', formula: 'C₉H₁₀O₃', kwLog: 2.02, sParam: 3.0, areaWeight: 0.95, lambdaUvMax: 256, colorHex: COLORS.sage, description: 'Éster C2.' },
        { id: 'p3', name: 'Propilparabeno', formula: 'C₁₀H₁₂O₃', kwLog: 2.42, sParam: 3.2, areaWeight: 0.9, lambdaUvMax: 256, colorHex: COLORS.blush, description: 'Éster C3.' },
        { id: 'p4', name: 'Butilparabeno', formula: 'C₁₁H₁₄O₃', kwLog: 2.82, sParam: 3.5, areaWeight: 0.88, lambdaUvMax: 256, colorHex: COLORS.rosewood, description: 'Éster C4.' }
      ]),
      mkSample('hp_neonicotinoids', 'Tiametoxam + Imidacloprid + Acetamiprid', 'Neonicotinoides en miel', 0.25, 'Protección apícola mediante cuantificación en polen y miel a 270 nm.', [
        { id: 'p1', name: 'Tiametoxam', formula: 'C₈H₁₀ClN₅O₃S', kwLog: 0.95, sParam: 2.3, areaWeight: 0.9, lambdaUvMax: 252, colorHex: COLORS.misty, description: 'Anillo oxadiazina polar.' },
        { id: 'p2', name: 'Imidacloprid', formula: 'C₉H₁₀ClN₅O₂', kwLog: 1.32, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 270, colorHex: COLORS.sage, description: 'Insecticida de mayor prevalencia.' },
        { id: 'p3', name: 'Acetamiprid', formula: 'C₁₀H₁₁ClN₄', kwLog: 1.68, sParam: 2.8, areaWeight: 0.92, lambdaUvMax: 245, colorHex: COLORS.rosewood, description: 'Grupo cianoamidina más retenido.' }
      ])
    ]
  },

  // 9. COLORANTES ALIMENTARIOS Y CONSERVANTES
  {
    id: 'food_additives',
    name: 'Colorantes y Conservantes',
    stationaryPhase: 'C18 (Acetato Amonio 20 mM / ACN-MeOH)',
    separationMechanism:
      'Conservantes ácidos (sórbico, benzoico) y colorantes sulfonados hidrosolubles separados con gradiente tampón de acetato de amonio.',
    compounds: [
      mkSample('hp_preservatives', 'Ácido Sórbico + Ácido Benzoico + Propilparabeno', 'Conservantes en salsas', 0.36, 'Tres antimicrobianos legales separados a 254 nm.', [
        { id: 'p1', name: 'Ácido Sórbico', formula: 'C₆H₈O₂', kwLog: 1.48, sParam: 2.6, areaWeight: 1.0, lambdaUvMax: 254, colorHex: COLORS.misty, description: 'Dieno conjugado C6 muy intenso a 254 nm.' },
        { id: 'p2', name: 'Ácido Benzoico', formula: 'C₇H₆O₂', kwLog: 1.78, sParam: 2.8, areaWeight: 0.72, lambdaUvMax: 230, colorHex: COLORS.sage, description: 'Ácido aromático estándar.' },
        { id: 'p3', name: 'Propilparabeno', formula: 'C₁₀H₁₂O₃', kwLog: 2.48, sParam: 3.3, areaWeight: 0.92, lambdaUvMax: 256, colorHex: COLORS.rosewood, description: 'Éster hidrofóbico eluye último.' }
      ]),
      mkSample('hp_food_dyes', 'Tartrazina + Amarillo Ocaso + Rojo Allura', 'Colorantes azo certificados', 0.22, 'Control multicanal visible (425–510 nm) en confitería.', [
        { id: 'p1', name: 'Tartrazina (E102)', formula: 'C₁₆H₉N₄Na₃O₉S₂', kwLog: 0.86, sParam: 2.2, areaWeight: 0.95, lambdaUvMax: 426, colorHex: COLORS.misty, description: 'Tres grupos sulfonato la hacen muy polar.' },
        { id: 'p2', name: 'Amarillo Ocaso (E110)', formula: 'C₁₆H₁₀N₂Na₂O₇S₂', kwLog: 1.24, sParam: 2.5, areaWeight: 0.92, lambdaUvMax: 482, colorHex: COLORS.sage, description: 'Colorante disulfonato naranja.' },
        { id: 'p3', name: 'Rojo Allura AC (E129)', formula: 'C₁₈H₁₄N₂Na₂O₈S₂', kwLog: 1.62, sParam: 2.8, areaWeight: 1.0, lambdaUvMax: 504, colorHex: COLORS.rosewood, description: 'Mayor masa aromática e hidrofobicidad.' }
      ]),
      mkSample('hp_sudan_illegal', 'Sudán I + Sudán II + Sudán IV', 'Adulteración prohibida en especias', 0.78, 'Colorantes industriales lipofílicos prohibidos que requieren fase móvil muy orgánica.', [
        { id: 'p1', name: 'Sudán I', formula: 'C₁₆H₁₂N₂O', kwLog: 3.85, sParam: 4.1, areaWeight: 1.0, lambdaUvMax: 478, colorHex: COLORS.misty, description: 'Azonaftol base.' },
        { id: 'p2', name: 'Sudán II', formula: 'C₁₈H₁₆N₂O', kwLog: 4.35, sParam: 4.4, areaWeight: 0.95, lambdaUvMax: 492, colorHex: COLORS.sage, description: 'Dos grupos metilo adicionales.' },
        { id: 'p3', name: 'Sudán IV', formula: 'C₂₄H₂₀N₄O', kwLog: 5.05, sParam: 4.8, areaWeight: 0.9, lambdaUvMax: 520, colorHex: COLORS.rosewood, description: 'Estructura diazo de 4 anillos altamente apolar.' }
      ]),
      mkSample('hp_sweeteners', 'Sacarina + Acesulfame K + Sucralosa', 'Edulcorantes de mesa', 0.16, 'Separación en fase predominantemente acuosa.', [
        { id: 'p1', name: 'Acesulfame K', formula: 'C₄H₄KNO₄S', kwLog: 0.65, sParam: 2.0, areaWeight: 1.0, lambdaUvMax: 227, colorHex: COLORS.misty, description: 'Ionizado altamente soluble.' },
        { id: 'p2', name: 'Sacarina Sódica', formula: 'C₇H₄NNaO₃S', kwLog: 0.96, sParam: 2.2, areaWeight: 0.95, lambdaUvMax: 215, colorHex: COLORS.sage, description: 'Sulfimida benzoica.' },
        { id: 'p3', name: 'Sucralosa', formula: 'C₁₂H₁₉Cl₃O₈', kwLog: 1.48, sParam: 2.6, areaWeight: 0.55, lambdaUvMax: 202, colorHex: COLORS.rosewood, description: 'Triclorosacarosa más retenida.' }
      ]),
      mkSample('hp_rhodamine_illegal', 'Rodamina B + Naranja II', 'Colorantes textiles en alimentos', 0.44, 'Detección forense de colorantes no comestibles a 543 nm.', [
        { id: 'p1', name: 'Naranja II', formula: 'C₁₆H₁₁N₂NaO₄S', kwLog: 1.65, sParam: 2.8, areaWeight: 0.88, lambdaUvMax: 484, colorHex: COLORS.sage, description: 'Monosulfonato azo.' },
        { id: 'p2', name: 'Rodamina B', formula: 'C₂₈H₃₁ClN₂O₃', kwLog: 2.52, sParam: 3.3, areaWeight: 1.0, lambdaUvMax: 543, colorHex: COLORS.rosewood, description: 'Colorante xanténico dietilamino.' }
      ]),
      mkSample('hp_brilliant_blue', 'Índigo Carmín + Azul Brillante FCF', 'Colorantes azules E132/E133', 0.25, 'Resolución en λ = 610–630 nm.', [
        { id: 'p1', name: 'Índigo Carmín (E132)', formula: 'C₁₆H₈N₂Na₂O₈S₂', kwLog: 1.02, sParam: 2.3, areaWeight: 0.9, lambdaUvMax: 610, colorHex: COLORS.sage, description: 'Indigotina disulfonada.' },
        { id: 'p2', name: 'Azul Brillante FCF (E133)', formula: 'C₃₇H₃₄N₂Na₂O₉S₃', kwLog: 1.72, sParam: 2.8, areaWeight: 1.0, lambdaUvMax: 629, colorHex: COLORS.rosewood, description: 'Triarilmetano de alta absortividad.' }
      ]),
      mkSample('hp_vanillin_coumarin', 'Vainillina + Etilvainillina + Cumarina', 'Autenticación de vainilla', 0.30, 'Detecta adulteración ilegal de extracto natural de vainilla con cumarina.', [
        { id: 'p1', name: 'Vainillina', formula: 'C₈H₈O₃', kwLog: 1.32, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 280, colorHex: COLORS.misty, description: 'Aroma natural principal.' },
        { id: 'p2', name: 'Etilvainillina', formula: 'C₉H₁₀O₃', kwLog: 1.75, sParam: 2.8, areaWeight: 0.94, lambdaUvMax: 280, colorHex: COLORS.sage, description: 'Aditivo sintético etoxi.' },
        { id: 'p3', name: 'Cumarina (Adulterante)', formula: 'C₉H₆O₂', kwLog: 2.08, sParam: 3.0, areaWeight: 0.88, lambdaUvMax: 274, colorHex: COLORS.rosewood, description: 'Sin –OH fenólico; mayor retención.' }
      ]),
      mkSample('hp_capsaicinoids', 'Nordihidrocapsaicina + Capsaicina + Dihidrocapsaicina', 'Escala Scoville HPLC en chiles', 0.56, 'Método AOAC 995.03 que sustituye la cata subjetiva por medición de capsaicinoides.', [
        { id: 'p1', name: 'Nordihidrocapsaicina', formula: 'C₁₇H₂₇NO₃', kwLog: 2.52, sParam: 3.3, areaWeight: 0.72, lambdaUvMax: 280, colorHex: COLORS.misty, description: 'Cadena C9.' },
        { id: 'p2', name: 'Capsaicina', formula: 'C₁₈H₂₇NO₃', kwLog: 2.85, sParam: 3.5, areaWeight: 1.0, lambdaUvMax: 280, colorHex: COLORS.sage, description: 'Doble enlace trans reduce retención frente al saturado.' },
        { id: 'p3', name: 'Dihidrocapsaicina', formula: 'C₁₈H₂₉NO₃', kwLog: 3.18, sParam: 3.7, areaWeight: 0.85, lambdaUvMax: 280, colorHex: COLORS.rosewood, description: 'Cadena saturada C10.' }
      ]),
      mkSample('hp_aflatoxins', 'Aflatoxina G₁ + B₁', 'Micotoxinas en maíz y cacahuate', 0.36, 'Detección UV/Fluorescencia de toxinas fúngicas reguladas en ppb.', [
        { id: 'p1', name: 'Aflatoxina G₁', formula: 'C₁₇H₁₂O₇', kwLog: 1.65, sParam: 2.8, areaWeight: 0.9, lambdaUvMax: 362, colorHex: COLORS.sage, description: 'Doble lactona más polar.' },
        { id: 'p2', name: 'Aflatoxina B₁', formula: 'C₁₇H₁₂O₆', kwLog: 2.02, sParam: 3.0, areaWeight: 1.0, lambdaUvMax: 362, colorHex: COLORS.rosewood, description: 'Ciclopentanona más retenida.' }
      ]),
      mkSample('hp_natamycin', 'Ácido Sórbico + Natamicina (Pimaricina)', 'Recubrimiento de quesos', 0.34, 'Antifúngico poliénico tetraeno medido específicamente a 303 nm.', [
        { id: 'p1', name: 'Ácido Sórbico', formula: 'C₆H₈O₂', kwLog: 1.48, sParam: 2.6, areaWeight: 0.85, lambdaUvMax: 254, colorHex: COLORS.sage, description: 'Conservante orgánico pequeño.' },
        { id: 'p2', name: 'Natamicina', formula: 'C₃₃H₄₇NO₁₃', kwLog: 1.98, sParam: 3.1, areaWeight: 1.0, lambdaUvMax: 303, colorHex: COLORS.rosewood, description: 'Macrólido poliénico con pico agudo a 303 nm.' }
      ])
    ]
  },

  // 10. HIDROCARBUROS AROMATICOS POLICICLICOS (PAH)
  {
    id: 'pahs',
    name: 'Aromáticos Policíclicos (PAH EPA 610)',
    stationaryPhase: 'C18 Polimérica Especializada para PAHs',
    separationMechanism:
      'Separación puramente solvofóbica dependiente de la superficie molecular y número de anillos fusionados (2 ➔ 3 ➔ 4 ➔ 5 anillos).',
    compounds: [
      mkSample('hp_pah_light', 'Benceno + Tolueno + Naftaleno (BTX-Naf)', 'Fracción aromática ligera', 0.60, 'Elución secuencial por masa molar y superficie hidrofóbica.', [
        { id: 'p1', name: 'Benceno (1 anillo)', formula: 'C₆H₆', kwLog: 2.15, sParam: 2.9, areaWeight: 0.65, lambdaUvMax: 254, colorHex: COLORS.misty, description: 'Anillo aromático simple.' },
        { id: 'p2', name: 'Tolueno (1 anillo + Me)', formula: 'C₇H₈', kwLog: 2.58, sParam: 3.2, areaWeight: 0.72, lambdaUvMax: 261, colorHex: COLORS.sage, description: 'Metilación incrementa área de contacto C18.' },
        { id: 'p3', name: 'Naftaleno (2 anillos)', formula: 'C₁₀H₈', kwLog: 3.12, sParam: 3.6, areaWeight: 1.0, lambdaUvMax: 275, colorHex: COLORS.rosewood, description: 'Biciclo conjugado muy intenso a 221/275 nm.' }
      ]),
      mkSample('hp_pah_3rings', 'Acenafteno + Fluoreno + Fenantreno + Antraceno', 'PAHs de 3 anillos EPA', 0.66, 'Resolución entre los isómeros Fenantreno (angular) y Antraceno (lineal).', [
        { id: 'p1', name: 'Fluoreno', formula: 'C₁₃H₁₀', kwLog: 3.35, sParam: 3.8, areaWeight: 0.9, lambdaUvMax: 262, colorHex: COLORS.misty, description: 'Bifenilo puenteado.' },
        { id: 'p2', name: 'Fenantreno', formula: 'C₁₄H₁₀', kwLog: 3.68, sParam: 4.0, areaWeight: 0.95, lambdaUvMax: 251, colorHex: COLORS.sage, description: 'Geometría angular ligeramente menos retenida.' },
        { id: 'p3', name: 'Antraceno', formula: 'C₁₄H₁₀', kwLog: 3.92, sParam: 4.1, areaWeight: 1.0, lambdaUvMax: 252, colorHex: COLORS.rosewood, description: 'Forma lineal encaja mejor en ranuras de sílice C18 polimérica.' }
      ]),
      mkSample('hp_pah_4rings', 'Fluoranteno + Pireno + Criseno', 'PAHs de 4 anillos (Humos)', 0.74, 'Compuestos pesados indicadores de combustión incompleta.', [
        { id: 'p1', name: 'Fluoranteno', formula: 'C₁₆H₁₀', kwLog: 4.10, sParam: 4.2, areaWeight: 0.9, lambdaUvMax: 287, colorHex: COLORS.misty, description: 'Anillo de cinco miembros.' },
        { id: 'p2', name: 'Pireno', formula: 'C₁₆H₁₀', kwLog: 4.42, sParam: 4.4, areaWeight: 1.0, lambdaUvMax: 241, colorHex: COLORS.sage, description: 'Pericondensado plano de alta absorción UV.' },
        { id: 'p3', name: 'Criseno', formula: 'C₁₈H₁₂', kwLog: 4.88, sParam: 4.7, areaWeight: 0.95, lambdaUvMax: 268, colorHex: COLORS.rosewood, description: '18 carbonos sp² muy retenidos.' }
      ]),
      mkSample('hp_pah_benzoapyrene', 'Benzo[b]fluoranteno + Benzo[a]pireno', 'Carcinógeno indicador EPA', 0.80, 'Separación crítica de isómeros de 5 anillos (252 Da) en alimentos ahumados.', [
        { id: 'p1', name: 'Benzo[b]fluoranteno', formula: 'C₂₀H₁₂', kwLog: 5.05, sParam: 4.8, areaWeight: 0.94, lambdaUvMax: 256, colorHex: COLORS.sage, description: 'Isómero de 5 anillos no alternante.' },
        { id: 'p2', name: 'Benzo[a]pireno (BaP)', formula: 'C₂₀H₁₂', kwLog: 5.38, sParam: 5.0, areaWeight: 1.0, lambdaUvMax: 296, colorHex: COLORS.rosewood, description: 'Marcador regulatorio primario de carcinogenicidad.' }
      ]),
      mkSample('hp_pah_heavy', 'Indeno[1,2,3-cd]pireno + Benzo[ghi]perileno', 'PAHs pesados 6 anillos', 0.84, 'Exigen alto % de ACN (>80%) o THF para eluir en menos de 12 min.', [
        { id: 'p1', name: 'Indeno[1,2,3-cd]pireno', formula: 'C₂₂H₁₂', kwLog: 5.45, sParam: 5.1, areaWeight: 0.95, lambdaUvMax: 250, colorHex: COLORS.sage, description: '22 carbonos conjugados.' },
        { id: 'p2', name: 'Benzo[ghi]perileno', formula: 'C₂₂H₁₂', kwLog: 5.75, sParam: 5.2, areaWeight: 1.0, lambdaUvMax: 300, colorHex: COLORS.rosewood, description: 'Estructura disco compacto.' }
      ]),
      mkSample('hp_btex', 'Benceno + Tolueno + Etilbenceno + p-Xileno', 'Aguas subterráneas petroquímicas', 0.54, 'Resolución isocrática rápida de hidrocarburos monoaromáticos.', [
        { id: 'p1', name: 'Benceno', formula: 'C₆H₆', kwLog: 2.15, sParam: 2.9, areaWeight: 0.85, lambdaUvMax: 254, colorHex: COLORS.misty, description: 'Sin alquilos.' },
        { id: 'p2', name: 'Tolueno', formula: 'C₇H₈', kwLog: 2.55, sParam: 3.2, areaWeight: 0.92, lambdaUvMax: 261, colorHex: COLORS.sage, description: 'Un metilo.' },
        { id: 'p3', name: 'Etilbenceno / Xileno', formula: 'C₈H₁₀', kwLog: 2.95, sParam: 3.5, areaWeight: 1.0, lambdaUvMax: 262, colorHex: COLORS.rosewood, description: 'Dos carbonos sustituyentes.' }
      ]),
      mkSample('hp_pah_nitro', '1-Nitropireno + 2-Nitrofluoreno', 'Emisiones diésel', 0.65, 'Nitro-PAHs mutagénicos medidos a 280 nm.', [
        { id: 'p1', name: '2-Nitrofluoreno', formula: 'C₁₃H₉NO₂', kwLog: 3.12, sParam: 3.6, areaWeight: 0.92, lambdaUvMax: 332, colorHex: COLORS.sage, description: 'Tres anillos sustituidos.' },
        { id: 'p2', name: '1-Nitropireno', formula: 'C₁₆H₉NO₂', kwLog: 3.85, sParam: 4.1, areaWeight: 1.0, lambdaUvMax: 285, colorHex: COLORS.rosewood, description: 'Núcleo pireno más hidrofóbico.' }
      ]),
      mkSample('hp_biphenyl_terphenyl', 'Bifenilo + p-Terfenilo', 'Oligofenilenos aromáticos', 0.70, 'El tercer anillo fenilo incrementa drásticamente el tiempo de retención.', [
        { id: 'p1', name: 'Bifenilo', formula: 'C₁₂H₁₀', kwLog: 3.25, sParam: 3.7, areaWeight: 0.9, lambdaUvMax: 248, colorHex: COLORS.sage, description: 'Dos anillos fenilo.' },
        { id: 'p2', name: 'p-Terfenilo', formula: 'C₁₈H₁₄', kwLog: 4.35, sParam: 4.4, areaWeight: 1.0, lambdaUvMax: 276, colorHex: COLORS.rosewood, description: 'Tres anillos lineales.' }
      ]),
      mkSample('hp_styrene_alpha_me', 'Estireno + α-Metilestireno', 'Control de monómeros residuales', 0.56, 'Monómeros aromáticos vinílicos en resinas de poliestireno.', [
        { id: 'p1', name: 'Estireno', formula: 'C₈H₈', kwLog: 2.55, sParam: 3.2, areaWeight: 1.0, lambdaUvMax: 248, colorHex: COLORS.sage, description: 'Vinilbenceno.' },
        { id: 'p2', name: 'α-Metilestireno', formula: 'C₉H₁₀', kwLog: 2.95, sParam: 3.5, areaWeight: 0.95, lambdaUvMax: 244, colorHex: COLORS.rosewood, description: 'Metilo α incrementa retención.' }
      ]),
      mkSample('hp_phthalates', 'Ftalato de Dimetilo + Dibutilo + DEHP', 'Plastificantes industriales', 0.72, 'Migración de ésteres ftálicos desde PVC médico.', [
        { id: 'p1', name: 'Ftalato de Dimetilo (DMP)', formula: 'C₁₀H₁₀O₄', kwLog: 2.15, sParam: 3.0, areaWeight: 0.85, lambdaUvMax: 228, colorHex: COLORS.misty, description: 'Cadenas cortas C1.' },
        { id: 'p2', name: 'Ftalato de Dibutilo (DBP)', formula: 'C₁₆H₂₂O₄', kwLog: 3.65, sParam: 4.0, areaWeight: 0.95, lambdaUvMax: 228, colorHex: COLORS.sage, description: 'Cadenas C4.' },
        { id: 'p3', name: 'DEHP', formula: 'C₂₄H₃₈O₄', kwLog: 5.15, sParam: 4.9, areaWeight: 1.0, lambdaUvMax: 228, colorHex: COLORS.rosewood, description: 'Cadenas ramificadas C8 muy apolares.' }
      ])
    ]
  },

  // 11. ACIDOS ORGANICOS Y FERMENTACION
  {
    id: 'organic_acids',
    name: 'Ácidos Orgánicos y Fermentación',
    stationaryPhase: 'C18 Polar-Aqueous (H₃PO₄ pH 2.4)',
    separationMechanism:
      'En pH 2.4 (< pK_a), los ácidos carboxílicos se encuentran protonados (neutros) permitiendo ligera retención hidrofóbica en fase móvil casi 100% acuosa y lectura UV a 210 nm.',
    compounds: [
      mkSample('hp_wine_acids', 'Ácido Tartárico + Málico + Láctico + Succínico', 'Fermentación maloláctica', 0.08, 'Monitoreo del paso de ácido málico verde a ácido láctico suave en bodegas.', [
        { id: 'p1', name: 'Ácido Tartárico', formula: 'C₄H₆O₆', kwLog: 0.42, sParam: 1.8, areaWeight: 0.95, lambdaUvMax: 210, colorHex: COLORS.misty, description: 'Dos –OH y dos –COOH.' },
        { id: 'p2', name: 'Ácido Málico', formula: 'C₄H₆O₅', kwLog: 0.65, sParam: 1.9, areaWeight: 1.0, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Un –OH.' },
        { id: 'p3', name: 'Ácido Láctico', formula: 'C₃H₆O₃', kwLog: 0.88, sParam: 2.1, areaWeight: 0.85, lambdaUvMax: 210, colorHex: COLORS.blush, description: 'Producto de fermentación.' },
        { id: 'p4', name: 'Ácido Succínico', formula: 'C₄H₆O₄', kwLog: 1.15, sParam: 2.3, areaWeight: 0.88, lambdaUvMax: 210, colorHex: COLORS.rosewood, description: 'Sin –OH en cadena C4.' }
      ]),
      mkSample('hp_acetic_propionic', 'Ácido Acético + Propiónico + Butírico', 'Ácidos grasos volátiles (AGV)', 0.12, 'Control de digestión anaerobia y silajes mediante elongación de cadena.', [
        { id: 'p1', name: 'Ácido Acético (C2)', formula: 'C₂H₄O₂', kwLog: 0.68, sParam: 2.0, areaWeight: 0.9, lambdaUvMax: 210, colorHex: COLORS.misty, description: 'Cadena más corta.' },
        { id: 'p2', name: 'Ácido Propiónico (C3)', formula: 'C₃H₆O₂', kwLog: 1.02, sParam: 2.2, areaWeight: 0.95, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Un metileno extra.' },
        { id: 'p3', name: 'Ácido Butírico (C4)', formula: 'C₄H₈O₂', kwLog: 1.38, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 210, colorHex: COLORS.rosewood, description: 'Mayor hidrofobicidad alifática.' }
      ]),
      mkSample('hp_krebs_cycle', 'Ácido Oxálico + Cítrico + Fumárico', 'Ciclo de Krebs celular', 0.09, 'El doble enlace conjugado del ácido fumárico produce una banda UV 20 veces más intensa.', [
        { id: 'p1', name: 'Ácido Oxálico', formula: 'C₂H₂O₄', kwLog: 0.35, sParam: 1.8, areaWeight: 0.72, lambdaUvMax: 210, colorHex: COLORS.misty, description: 'Dicarboxílico sin metilenos.' },
        { id: 'p2', name: 'Ácido Cítrico', formula: 'C₆H₈O₇', kwLog: 0.68, sParam: 2.0, areaWeight: 0.78, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Tricarboxílico polar.' },
        { id: 'p3', name: 'Ácido Fumárico', formula: 'C₄H₄O₄', kwLog: 1.05, sParam: 2.3, areaWeight: 1.0, lambdaUvMax: 210, colorHex: COLORS.rosewood, description: 'Dieno-ácido con altísima absortividad a 210 nm.' }
      ]),
      mkSample('hp_shikimic_quinic', 'Ácido Quínico + Ácido Shikímico', 'Biosíntesis aromática vegetal', 0.08, 'Diferenciación entre ciclohexano tetrahidroxilado y ciclohexeno trihidroxilado.', [
        { id: 'p1', name: 'Ácido Quínico', formula: 'C₇H₁₂O₆', kwLog: 0.48, sParam: 1.9, areaWeight: 0.75, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Más hidroxilado.' },
        { id: 'p2', name: 'Ácido Shikímico', formula: 'C₇H₁₀O₅', kwLog: 0.85, sParam: 2.2, areaWeight: 1.0, lambdaUvMax: 213, colorHex: COLORS.rosewood, description: 'Enlace α,β-insaturado absorbe fuerte a 213 nm.' }
      ]),
      mkSample('hp_hmf_furfural', '5-Hidroximetilfurfural (HMF) + Furfural', 'Calidad y calentamiento en miel', 0.14, 'Norma internacional del Codex Alimentarius para detectar sobrecalentamiento de mieles.', [
        { id: 'p1', name: '5-HMF', formula: 'C₆H₆O₃', kwLog: 0.82, sParam: 2.2, areaWeight: 1.0, lambdaUvMax: 284, colorHex: COLORS.sage, description: 'Grupo hidroximetilo lo hace más polar que furfural.' },
        { id: 'p2', name: 'Furfural', formula: 'C₅H₄O₂', kwLog: 1.24, sParam: 2.5, areaWeight: 0.92, lambdaUvMax: 277, colorHex: COLORS.rosewood, description: 'Aldehído furánico sin grupo –OH.' }
      ]),
      mkSample('hp_benzoic_cinnamic', 'Ácido Fenilacético + Ácido Cinámico', 'Metabolitos aromáticos', 0.34, 'La conjugación estireno-carboxilo del ácido cinámico eleva λ_max a 272 nm.', [
        { id: 'p1', name: 'Ácido Fenilacético', formula: 'C₈H₈O₂', kwLog: 1.65, sParam: 2.7, areaWeight: 0.7, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Sin conjugación directa al anillo.' },
        { id: 'p2', name: 'Ácido trans-Cinámico', formula: 'C₉H₈O₂', kwLog: 2.15, sParam: 3.1, areaWeight: 1.0, lambdaUvMax: 272, colorHex: COLORS.rosewood, description: 'Plana conjugada de alta absorción.' }
      ]),
      mkSample('hp_hippuric_mandelic', 'Ácido Mandélico + Ácido Hipúrico', 'Biomonitoreo ocupacional de solventes', 0.16, 'Biomarcadores urinarios de exposición industrial a estireno y tolueno.', [
        { id: 'p1', name: 'Ácido Mandélico', formula: 'C₈H₈O₃', kwLog: 0.92, sParam: 2.2, areaWeight: 0.82, lambdaUvMax: 220, colorHex: COLORS.sage, description: 'Metabolito de estireno.' },
        { id: 'p2', name: 'Ácido Hipúrico', formula: 'C₉H₉NO₃', kwLog: 1.32, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 228, colorHex: COLORS.rosewood, description: 'Benzoilglicina metabolito de tolueno.' }
      ]),
      mkSample('hp_lactic_pyruvic', 'Ácido Pirúvico + Ácido Láctico', 'Glucólisis y cultivo celular', 0.08, 'Monitoreo de biorreactores midiendo razón piruvato / lactato.', [
        { id: 'p1', name: 'Ácido Pirúvico', formula: 'C₃H₄O₃', kwLog: 0.48, sParam: 1.9, areaWeight: 1.0, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'α-cetoácido polar.' },
        { id: 'p2', name: 'Ácido Láctico', formula: 'C₃H₆O₃', kwLog: 0.82, sParam: 2.1, areaWeight: 0.78, lambdaUvMax: 210, colorHex: COLORS.rosewood, description: 'α-hidroxiácido reducido.' }
      ]),
      mkSample('hp_kombucha_acids', 'Ácido Glucónico + Acético + Láctico', 'Bebida fermentada Kombucha', 0.08, 'Perfil orgánico completo sin interferencias de azúcares.', [
        { id: 'p1', name: 'Ácido Glucónico', formula: 'C₆H₁₂O₇', kwLog: 0.36, sParam: 1.8, areaWeight: 0.8, lambdaUvMax: 210, colorHex: COLORS.misty, description: 'Polihidroxiácido muy polar.' },
        { id: 'p2', name: 'Ácido Acético', formula: 'C₂H₄O₂', kwLog: 0.72, sParam: 2.0, areaWeight: 0.95, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Acidez volátil principal.' },
        { id: 'p3', name: 'Ácido Láctico', formula: 'C₃H₆O₃', kwLog: 1.02, sParam: 2.2, areaWeight: 0.88, lambdaUvMax: 210, colorHex: COLORS.rosewood, description: 'Acidez no volátil.' }
      ]),
      mkSample('hp_azelaic_sebacic', 'Ácido Azelaico (C9) + Sebácico (C10)', 'Ácidos dicarboxílicos dermocosméticos', 0.36, 'Separación por adición de un solo grupo metileno entre ácidos dicarboxílicos.', [
        { id: 'p1', name: 'Ácido Azelaico (C9)', formula: 'C₉H₁₆O₄', kwLog: 1.62, sParam: 2.7, areaWeight: 0.95, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Siete metilenos internos.' },
        { id: 'p2', name: 'Ácido Sebácico (C10)', formula: 'C₁₀H₁₈O₄', kwLog: 2.04, sParam: 3.0, areaWeight: 1.0, lambdaUvMax: 210, colorHex: COLORS.rosewood, description: 'Ocho metilenos internos.' }
      ])
    ]
  },

  // 12. CONTROL DE PUREZA QUIRAL E ISOMEROS
  {
    id: 'isomers_purity',
    name: 'Isómeros, Pureza Quiral y Farmacopea',
    stationaryPhase: 'Columna Quiral Celulosa / C18 Alta Eficiencia',
    separationMechanism:
      'Separación de isómeros geométricos (cis/trans, orto/meta/para) y enantiómeros farmacológicos mediante reconocimiento estérico de tres puntos.',
    compounds: [
      mkSample('hp_thalidomide_chiral', '(R)-Talidomida + (S)-Talidomida', 'Separación quiral crítica', 0.35, 'Reconocimiento quiral donde un enantiómero es sedante y el otro teratogénico.', [
        { id: 'p1', name: '(R)-Talidomida', formula: 'C₁₃H₁₀N₂O₄', kwLog: 1.68, sParam: 2.8, areaWeight: 1.0, lambdaUvMax: 220, colorHex: COLORS.sage, description: 'Menor encaje estérico en selectores de celulosa.' },
        { id: 'p2', name: '(S)-Talidomida', formula: 'C₁₃H₁₀N₂O₄', kwLog: 2.04, sParam: 3.0, areaWeight: 1.0, lambdaUvMax: 220, colorHex: COLORS.rosewood, description: 'Mayor estabilización quiral por puente H y apilamiento π.' }
      ]),
      mkSample('hp_ibuprofen_chiral', '(R)-Ibuprofeno + (S)-Ibuprofeno', 'Pureza enantiomérica (EE)', 0.42, 'Solo el enantiómero (S)-(+) posee actividad antiinflamatoria inhibidora COX.', [
        { id: 'p1', name: '(R)-Ibuprofeno (Inactivo)', formula: 'C₁₃H₁₈O₂', kwLog: 2.15, sParam: 3.0, areaWeight: 0.95, lambdaUvMax: 220, colorHex: COLORS.sage, description: 'Eluye primero en selector quiral.' },
        { id: 'p2', name: '(S)-(+)-Ibuprofeno (Activo)', formula: 'C₁₃H₁₈O₂', kwLog: 2.48, sParam: 3.2, areaWeight: 1.0, lambdaUvMax: 220, colorHex: COLORS.rosewood, description: 'Distómero vs Eutómero.' }
      ]),
      mkSample('hp_omeprazole_es', '(R)-Omeprazol + (S)-Esomeprazol', 'Control quiral bloqueador H⁺/K⁺', 0.34, 'Verificación de exceso enantiomérico (>99.5%) en esomeprazol farmacéutico.', [
        { id: 'p1', name: '(R)-Omeprazol (Impureza)', formula: 'C₁₇H₁₉N₃O₃S', kwLog: 1.72, sParam: 2.8, areaWeight: 0.72, lambdaUvMax: 302, colorHex: COLORS.sage, description: 'Traza enantiomérica tolerada <0.5%.' },
        { id: 'p2', name: '(S)-Esomeprazol', formula: 'C₁₇H₁₉N₃O₃S', kwLog: 2.08, sParam: 3.0, areaWeight: 1.0, lambdaUvMax: 302, colorHex: COLORS.rosewood, description: 'Enantiómero puro comercializado.' }
      ]),
      mkSample('hp_resveratrol_cistrans', 'trans-Resveratrol + cis-Resveratrol', 'Fotoisomerización UV', 0.32, 'La irradiación solar convierte el isómero trans plano en cis menos conjugado.', [
        { id: 'p1', name: 'cis-Resveratrol', formula: 'C₁₄H₁₂O₃', kwLog: 1.55, sParam: 2.7, areaWeight: 0.75, lambdaUvMax: 285, colorHex: COLORS.sage, description: 'Menos coplanar; menor superficie apolar.' },
        { id: 'p2', name: 'trans-Resveratrol', formula: 'C₁₄H₁₂O₃', kwLog: 1.98, sParam: 3.0, areaWeight: 1.0, lambdaUvMax: 306, colorHex: COLORS.rosewood, description: 'Isómero extendido con máxima absorción a 306 nm.' }
      ]),
      mkSample('hp_nitroaniline_isomers', 'p-Nitroanilina + m-Nitroanilina + o-Nitroanilina', 'Isómeros posicionales', 0.38, 'Demuestra el efecto del puente de hidrógeno intramolecular en el isómero orto.', [
        { id: 'p1', name: 'p-Nitroanilina', formula: 'C₆H₆N₂O₂', kwLog: 1.62, sParam: 2.7, areaWeight: 1.0, lambdaUvMax: 380, colorHex: COLORS.misty, description: 'Momento dipolar alto interactúa fuerte con fase móvil polar.' },
        { id: 'p2', name: 'm-Nitroanilina', formula: 'C₆H₆N₂O₂', kwLog: 1.92, sParam: 2.9, areaWeight: 0.88, lambdaUvMax: 358, colorHex: COLORS.sage, description: 'Polaridad intermedia.' },
        { id: 'p3', name: 'o-Nitroanilina', formula: 'C₆H₆N₂O₂', kwLog: 2.25, sParam: 3.1, areaWeight: 0.92, lambdaUvMax: 410, colorHex: COLORS.rosewood, description: 'Puente H interno oculta grupos polares aumentando afinidad por C18.' }
      ]),
      mkSample('hp_maleic_fumaric', 'Ácido Fumárico (trans) + Ácido Maleico (cis)', 'Control de excipientes', 0.12, 'El isómero cis forma puente H intramolecular y posee distinta retención.', [
        { id: 'p1', name: 'Ácido Fumárico (trans)', formula: 'C₄H₄O₄', kwLog: 0.75, sParam: 2.1, areaWeight: 1.0, lambdaUvMax: 210, colorHex: COLORS.sage, description: 'Ácido dicarboxílico abierto.' },
        { id: 'p2', name: 'Ácido Maleico (cis)', formula: 'C₄H₄O₄', kwLog: 1.15, sParam: 2.4, areaWeight: 0.92, lambdaUvMax: 210, colorHex: COLORS.rosewood, description: 'Impureza regulada en sales maleato.' }
      ]),
      mkSample('hp_warfarin_chiral', '(S)-Warfarina + (R)-Warfarina', 'Anticoagulante quiral', 0.44, 'La (S)-warfarina es 5 veces más potente como anticoagulante.', [
        { id: 'p1', name: '(R)-Warfarina', formula: 'C₁₉H₁₆O₄', kwLog: 2.25, sParam: 3.1, areaWeight: 0.95, lambdaUvMax: 308, colorHex: COLORS.sage, description: 'Metabolismo distinto por citocromo P450.' },
        { id: 'p2', name: '(S)-Warfarina', formula: 'C₁₉H₁₆O₄', kwLog: 2.60, sParam: 3.3, areaWeight: 1.0, lambdaUvMax: 308, colorHex: COLORS.rosewood, description: 'Enantiómero de mayor potencia clínica.' }
      ]),
      mkSample('hp_creatinine_uric', 'Creatinina + Ácido Hipúrico (Orina)', 'Normalización de biomarcadores', 0.14, 'Cuantificación estándar de creatinina para normalizar metabolitos urinarios.', [
        { id: 'p1', name: 'Creatinina', formula: 'C₄H₇N₃O', kwLog: 0.52, sParam: 1.9, areaWeight: 1.0, lambdaUvMax: 234, colorHex: COLORS.sage, description: 'Molécula polar de referencia renal.' },
        { id: 'p2', name: 'Ácido Hipúrico', formula: 'C₉H₉NO₃', kwLog: 1.32, sParam: 2.5, areaWeight: 0.94, lambdaUvMax: 228, colorHex: COLORS.rosewood, description: 'Control interno aromático.' }
      ]),
      mkSample('hp_theophylline_isomer', '1,3-Dimetilxantina + 1,7-Dimetilxantina', 'Resolución de isómeros xantínicos', 0.18, 'Prueba de selectividad de columna C18 de alta eficiencia (>12,000 platos).', [
        { id: 'p1', name: 'Paraxantina (1,7-DMX)', formula: 'C₇H₈N₄O₂', kwLog: 1.04, sParam: 2.4, areaWeight: 0.96, lambdaUvMax: 272, colorHex: COLORS.sage, description: 'Isómero 1,7.' },
        { id: 'p2', name: 'Teofilina (1,3-DMX)', formula: 'C₇H₈N₄O₂', kwLog: 1.24, sParam: 2.5, areaWeight: 1.0, lambdaUvMax: 272, colorHex: COLORS.rosewood, description: 'Isómero 1,3 ligeramente más retenido.' }
      ]),
      mkSample('hp_suitability_usp', 'Uracilo (t₀) + Fenol + N,N-Dietiltoluamida', 'Test de Idoneidad USP', 0.45, 'Mezcla estándar universal para evaluar tiempo muerto t₀, asimetría y platos teóricos N.', [
        { id: 'p1', name: 'Uracilo (Marcador t₀)', formula: 'C₄H₄N₂O₂', kwLog: -1.8, sParam: 0.5, areaWeight: 0.85, lambdaUvMax: 254, colorHex: COLORS.misty, description: 'No retenido en C18; marca exactamente el tiempo muerto t₀ de columna.' },
        { id: 'p2', name: 'Fenol', formula: 'C₆H₆O', kwLog: 1.68, sParam: 2.8, areaWeight: 0.9, lambdaUvMax: 254, colorHex: COLORS.sage, description: 'Evalúa actividad residual de silanoles libres.' },
        { id: 'p3', name: 'DEET (Referencia hidrofóbica)', formula: 'C₁₂H₁₇NO', kwLog: 2.68, sParam: 3.4, areaWeight: 1.0, lambdaUvMax: 254, colorHex: COLORS.rosewood, description: 'Calcula eficiencia N = 16(t_R/w)².' }
      ])
    ]
  }
];

export const ALL_HPLC_SAMPLES: HplcMixtureSample[] = HPLC_GROUPS_DATA.flatMap((g) => g.compounds);

export interface ComputedPeakMetric {
  spec: HplcPeakSpec;
  tR: number; // min
  kPrime: number;
  sigmaMin: number; // peak standard deviation in min
  widthBaseMin: number; // 4 * sigma
  platesN: number;
  heightMau: number;
}

export interface HplcSimulationResult {
  t0Min: number;
  pressureBar: number;
  linearVelocityMmS: number;
  plateHeightUm: number;
  platesN: number;
  peakMetrics: ComputedPeakMetric[];
  minResolutionRs: number | null;
  maxTimeMin: number;
  chromatogramPoints: { timeMin: number; signalMau: number }[];
}

/**
 * Computes full Darcy pressure, Van Deemter efficiency, retention time tR,
 * resolution Rs, and continuous Gaussian chromatogram signal A(t).
 */
export function computeHplcSimulation(
  sample: HplcMixtureSample,
  phiB: number, // 0.05 to 0.95 (% organic)
  flowMlMin: number, // 0.3 to 2.5
  tempC: number, // 20 to 70
  particleUm: number // 1.8, 3.5, or 5.0
): HplcSimulationResult {
  // Standard analytical column geometry: L = 150 mm, ID = 4.6 mm (porosity epsilon_t ~ 0.65)
  const L_mm = 150;
  const Vm_mL = 1.62; // Dead volume for 4.6 x 150 mm packed bed
  const t0Min = Vm_mL / Math.max(0.2, flowMlMin);
  const linearVelocityMmS = L_mm / (t0Min * 60); // mm/s

  // Viscosity of Water/ACN mixture drops with temperature & peaks around 25-35% ACN
  const mixVisc25 = 0.89 - 0.52 * phiB + 0.35 * Math.sin(phiB * Math.PI);
  const tempFactor = Math.exp(-0.017 * (tempC - 25));
  const viscosityCp = Math.max(0.28, mixVisc25 * tempFactor);

  // Darcy-Kozeny-Carman pressure drop: ΔP ∝ η * L * u / dp²
  const rawPressure =
    (110 * viscosityCp * (L_mm / 150) * linearVelocityMmS) /
    Math.pow(particleUm / 3.5, 2);
  const pressureBar = Math.min(1350, Math.round(rawPressure));

  // Van Deemter H = A + B/u + C*u (in µm)
  const termA = 1.6 * particleUm;
  const termB = 2.8 * (1 + (tempC - 25) * 0.012);
  const termC = (0.045 * Math.pow(particleUm, 1.4)) / (1 + (tempC - 25) * 0.015);
  const plateHeightUm = termA + termB / Math.max(0.3, linearVelocityMmS) + termC * linearVelocityMmS;
  const platesN = Math.round((L_mm * 1000) / Math.max(3.5, plateHeightUm));

  const tempRetentionShift = (tempC - 35) * -0.008; // higher T lowers k slightly

  const peakMetrics: ComputedPeakMetric[] = sample.peaks
    .map((spec) => {
      const logK = spec.kwLog - spec.sParam * phiB + tempRetentionShift;
      const kPrime = Math.max(0.02, Math.min(35, Math.pow(10, logK)));
      const tR = t0Min * (1 + kPrime);
      const sigmaMin = tR / Math.sqrt(platesN);
      const widthBaseMin = 4 * sigmaMin;
      const heightMau = 180 * spec.areaWeight * (0.28 / Math.max(0.06, widthBaseMin));
      return {
        spec,
        tR,
        kPrime,
        sigmaMin,
        widthBaseMin,
        platesN,
        heightMau: Math.min(950, heightMau),
      };
    })
    .sort((a, b) => a.tR - b.tR);

  // Compute minimum pairwise resolution Rs
  let minResolutionRs: number | null = null;
  if (peakMetrics.length >= 2) {
    minResolutionRs = Infinity;
    for (let i = 1; i < peakMetrics.length; i++) {
      const p1 = peakMetrics[i - 1];
      const p2 = peakMetrics[i];
      const rs = (2 * (p2.tR - p1.tR)) / Math.max(0.001, p1.widthBaseMin + p2.widthBaseMin);
      if (rs < minResolutionRs) minResolutionRs = rs;
    }
  }

  const lastTr = peakMetrics[peakMetrics.length - 1]?.tR || 8;
  const maxTimeMin = Math.max(6, Math.min(20, Math.ceil(lastTr + 1.5)));

  const chromatogramPoints: { timeMin: number; signalMau: number }[] = [];
  const steps = 260;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * maxTimeMin;
    let signal = 1.5 + Math.sin(t * 9) * 0.4; // slight realistic UV baseline
    // Slight negative/positive solvent front ripple at t0
    const diffT0 = t - t0Min;
    signal += 12 * Math.exp(-(diffT0 * diffT0) / 0.005);

    for (const pm of peakMetrics) {
      const diff = t - pm.tR;
      signal += pm.heightMau * Math.exp(-(diff * diff) / (2 * pm.sigmaMin * pm.sigmaMin));
    }
    chromatogramPoints.push({ timeMin: t, signalMau: signal });
  }

  return {
    t0Min,
    pressureBar,
    linearVelocityMmS,
    plateHeightUm,
    platesN,
    peakMetrics,
    minResolutionRs,
    maxTimeMin,
    chromatogramPoints,
  };
}
