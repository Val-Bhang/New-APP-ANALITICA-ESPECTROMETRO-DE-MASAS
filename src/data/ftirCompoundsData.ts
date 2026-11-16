export interface FtirBand {
  wavenumber: number; // cm^-1 (400 to 3900)
  intensity: number; // 0.1 to 0.98 (absorption strength)
  fwhm: number; // Full width at half maximum in cm^-1 (15 to 260)
  mode: string; // Vibrational mode e.g. 'ν(O–H)', 'ν(C=O)', 'δ(CH₂)', 'γ(=C–H)'
  description: string;
  isKeyBand?: boolean;
}

export interface FtirCompound {
  id: string;
  name: string;
  formula: string;
  physicalState: string;
  keyRegionNote: string;
  description: string;
  bands: FtirBand[];
}

export interface FtirGroupCategory {
  id: string;
  name: string;
  functionalSignature: string;
  diagnosticBands: string;
  compounds: FtirCompound[];
}

function b(
  wavenumber: number,
  intensity: number,
  fwhm: number,
  mode: string,
  description: string,
  isKeyBand = false
): FtirBand {
  return { wavenumber, intensity, fwhm, mode, description, isKeyBand };
}

function mkFtir(
  id: string,
  name: string,
  formula: string,
  physicalState: string,
  keyRegionNote: string,
  description: string,
  bands: FtirBand[]
): FtirCompound {
  return { id, name, formula, physicalState, keyRegionNote, description, bands };
}

export const FTIR_GROUPS_DATA: FtirGroupCategory[] = [
  // 1. ALCANOS Y CICLOALCANOS
  {
    id: 'alkanes',
    name: 'Alcanos y Cicloalcanos',
    functionalSignature: 'Enlaces simples C–H (sp³) y esqueleto C–C',
    diagnosticBands: 'ν(C–H sp³) 2960–2850 cm⁻¹ · δ(CH₂) ~1465 cm⁻¹ · δs(CH₃) ~1375 cm⁻¹',
    compounds: [
      mkFtir('ir_hexane', 'n-Hexano', 'C₆H₁₄', 'Líquido volátil', '2960 / 2925 / 1465 / 1378 cm⁻¹', 'Espectro clásico puramente alifático sin instauraciones ni heteroátomos.', [
        b(2958, 0.78, 36, 'νₐₛ(CH₃)', 'Estiramiento asimétrico metilo sp³', true),
        b(2925, 0.88, 38, 'νₐₛ(CH₂)', 'Estiramiento asimétrico metileno C–H sp³', true),
        b(2872, 0.58, 32, 'νₛ(CH₃)', 'Estiramiento simétrico metilo'),
        b(2856, 0.65, 32, 'νₛ(CH₂)', 'Estiramiento simétrico metileno'),
        b(1466, 0.55, 28, 'δ(CH₂)/δₐₛ(CH₃)', 'Flexión tipo tijera C–H', true),
        b(1378, 0.38, 22, 'δₛ(CH₃)', 'Flexión paraguas simétrica de –CH₃'),
        b(724, 0.28, 24, 'ρ(CH₂)n≥4', 'Balanceo en fase de cadena metilénica')
      ]),
      mkFtir('ir_cyclohexane', 'Ciclohexano', 'C₆H₁₂', 'Líquido', '2928 / 2853 / 1452 cm⁻¹ (sin pico 1375)', 'Alcano cíclico sin grupos metilo, por lo que desaparece la banda paraguas en 1375 cm⁻¹.', [
        b(2928, 0.92, 42, 'νₐₛ(CH₂)', 'Estiramiento C–H metileno anular muy intenso', true),
        b(2853, 0.74, 34, 'νₛ(CH₂)', 'Estiramiento simétrico C–H del anillo', true),
        b(1452, 0.62, 26, 'δ(CH₂)', 'Flexión tijera única de cicloalcano', true),
        b(1260, 0.18, 24, 'τ(CH₂)', 'Torsión del esqueleto ciclohexánico'),
        b(904, 0.34, 24, 'ν(C–C)', 'Respiración asimétrica del anillo'),
        b(862, 0.38, 22, 'ν(C–C)', 'Vibración anular silla característica')
      ]),
      mkFtir('ir_isooctane', 'Isooctano (2,2,4-Trimetilpentano)', 'C₈H₁₈', 'Líquido', 'Doblete 1390 / 1366 cm⁻¹ (terc-butilo)', 'Presenta el doblete dividido típico del grupo terc-butilo alrededor de 1375 cm⁻¹.', [
        b(2955, 0.90, 42, 'νₐₛ(CH₃)', 'Abundantes grupos metilo terminales', true),
        b(2872, 0.62, 34, 'νₛ(CH₃)', 'Estiramiento simétrico CH₃'),
        b(1468, 0.56, 26, 'δ(CH₂/CH₃)', 'Deformación asimétrica C–H'),
        b(1392, 0.36, 20, 'δₛ(C(CH₃)₃)', 'Rama alta del doblete terc-butilo', true),
        b(1366, 0.52, 20, 'δₛ(C(CH₃)₃)', 'Rama baja intensa del doblete terc-butilo', true),
        b(1248, 0.30, 22, 'ν(C–C)', 'Esqueleto ramificado cuaternario')
      ]),
      mkFtir('ir_octane', 'n-Octano', 'C₈H₁₈', 'Líquido', '2924 / 2854 / 722 cm⁻¹', 'Mayor proporción de CH₂ respecto a CH₃ aumenta la intensidad en 2924 y 722 cm⁻¹.', [
        b(2956, 0.68, 34, 'νₐₛ(CH₃)', 'Metilos terminales'),
        b(2924, 0.92, 38, 'νₐₛ(CH₂)', 'Cadena de 6 metilenos dominando C–H', true),
        b(2854, 0.72, 32, 'νₛ(CH₂)', 'Estiramiento simétrico metilenos'),
        b(1466, 0.56, 26, 'δ(CH₂)', 'Tijera metilénica', true),
        b(1378, 0.32, 20, 'δₛ(CH₃)', 'Paraguas metilo'),
        b(722, 0.35, 22, 'ρ(CH₂)', 'Rocking de cadena larga', true)
      ]),
      mkFtir('ir_paraffin_oil', 'Aceite Mineral (Nujol / Parafina)', 'CₙH₂ₙ₊₂', 'Líquido viscoso', '2922 / 2853 / 1460 / 1377 cm⁻¹', 'Estándar clásico de suspensión en IR; ventana totalmente limpia fuera de sus 4 bandas C–H.', [
        b(2922, 0.94, 44, 'νₐₛ(CH₂)', 'Estiramiento C–H saturado muy fuerte', true),
        b(2853, 0.80, 34, 'νₛ(CH₂)', 'Estiramiento simétrico C–H', true),
        b(1460, 0.65, 28, 'δ(CH₂)', 'Deformación tijera C–H', true),
        b(1377, 0.42, 22, 'δₛ(CH₃)', 'Flexión simétrica metilo'),
        b(721, 0.32, 24, 'ρ(CH₂)', 'Balanceo de cadenas parafínicas')
      ]),
      mkFtir('ir_cyclopentane', 'Ciclopentano', 'C₅H₁₀', 'Líquido', '2952 / 2870 / 1455 / 895 cm⁻¹', 'Anillo de 5 miembros con tensión ligera elevando ligeramente ν(CH₂).', [
        b(2952, 0.90, 40, 'νₐₛ(CH₂)', 'Estiramiento asimétrico en anillo C5', true),
        b(2870, 0.68, 34, 'νₛ(CH₂)', 'Estiramiento simétrico CH₂'),
        b(1455, 0.58, 26, 'δ(CH₂)', 'Flexión tijera anular', true),
        b(895, 0.42, 24, 'ν(C–C)', 'Modo de respiración del pentágono', true)
      ]),
      mkFtir('ir_dodecane', 'n-Dodecano', 'C₁₂H₂₆', 'Líquido', '2923 / 2853 / 1467 / 721 cm⁻¹', 'Hidrocarburo de cadena C12 usado como patrón de keroseno.', [
        b(2956, 0.62, 32, 'νₐₛ(CH₃)', 'Extremos metilo'),
        b(2923, 0.95, 38, 'νₐₛ(CH₂)', 'Diez metilenos dominando fuertemente', true),
        b(2853, 0.78, 32, 'νₛ(CH₂)', 'Simétrico CH₂'),
        b(1467, 0.58, 26, 'δ(CH₂)', 'Tijera metileno', true),
        b(1378, 0.28, 20, 'δₛ(CH₃)', 'Banda débil de metilo terminal'),
        b(721, 0.42, 22, 'ρ(CH₂)', 'Rocking pronunciado por cadena larga', true)
      ]),
      mkFtir('ir_decalin', 'Decalina (Decahidronaftaleno)', 'C₁₀H₁₈', 'Líquido', '2920 / 2850 / 1448 / 970 cm⁻¹', 'Sistema bicíclico saturado sin metilos.', [
        b(2920, 0.93, 42, 'νₐₛ(CH₂)', 'Metilenos bicíclicos', true),
        b(2850, 0.75, 34, 'νₛ(CH₂)', 'Simétrico C–H'),
        b(1448, 0.62, 26, 'δ(CH₂)', 'Tijera anular', true),
        b(970, 0.34, 24, 'ν(C–C)', 'Esqueleto bicíclico fusionado'),
        b(848, 0.26, 22, 'ν(C–C)', 'Modo anular característico')
      ]),
      mkFtir('ir_heptane', 'n-Heptano', 'C₇H₁₆', 'Líquido', '2958 / 2925 / 1465 / 1378 cm⁻¹', 'Solvente estándar libre de cromóforos para calibración espectral.', [
        b(2958, 0.75, 35, 'νₐₛ(CH₃)', 'Metilo terminal'),
        b(2925, 0.89, 38, 'νₐₛ(CH₂)', 'Metilenos internos', true),
        b(2856, 0.68, 32, 'νₛ(CH₂)', 'Simétrico CH₂'),
        b(1465, 0.55, 26, 'δ(CH₂)', 'Tijera CH₂', true),
        b(1378, 0.36, 22, 'δₛ(CH₃)', 'Flexión paraguas CH₃'),
        b(724, 0.30, 22, 'ρ(CH₂)', 'Balanceo en fase C₇')
      ]),
      mkFtir('ir_adamantane', 'Adamantano', 'C₁₀H₁₆', 'Sólido cristalino', '2904 / 2850 / 1450 / 1102 cm⁻¹', 'Hidrocarburo policíclico en jaula tipo diamante con bandas estrechas.', [
        b(2904, 0.91, 34, 'νₐₛ(CH₂)', 'Jaula simétrica adamantano', true),
        b(2850, 0.72, 28, 'νₛ(CH₂)', 'C–H puente y metileno'),
        b(1450, 0.58, 22, 'δ(CH₂)', 'Tijera rígida de jaula', true),
        b(1354, 0.30, 20, 'δ(CH)', 'Flexión C–H cabeza de puente'),
        b(1102, 0.44, 20, 'ν(C–C)', 'Vibración de respiración de jaula', true),
        b(970, 0.28, 20, 'ν(C–C)', 'Modo esquelético rígido')
      ])
    ]
  },

  // 2. ALQUENOS Y ALQUINOS
  {
    id: 'alkenes_alkynes',
    name: 'Alquenos y Alquinos',
    functionalSignature: 'Dobles enlaces C=C (sp²) y triples enlaces C≡C (sp)',
    diagnosticBands: 'ν(≡C–H) ~3300 cm⁻¹ · ν(=C–H) ~3080 cm⁻¹ · ν(C≡C) ~2120 cm⁻¹ · ν(C=C) ~1645 cm⁻¹',
    compounds: [
      mkFtir('ir_1_octene', '1-Octeno', 'C₈H₁₆', 'Líquido', '3078 / 1642 / 992 & 910 cm⁻¹ (vinilo)', 'Alqueno terminal con el par diagnóstico intenso en 992 y 910 cm⁻¹.', [
        b(3078, 0.42, 24, 'ν(=CH₂)', 'Estiramiento C–H sp² arriba de 3000 cm⁻¹', true),
        b(2926, 0.88, 38, 'ν(C–H sp³)', 'Cadena hexilo saturada'),
        b(2856, 0.68, 32, 'νₛ(CH₂)', 'Simétrico metilenos'),
        b(1642, 0.48, 22, 'ν(C=C)', 'Estiramiento doble enlace vinílico', true),
        b(1466, 0.46, 26, 'δ(CH₂)', 'Tijera alifática'),
        b(992, 0.54, 22, 'γ(=C–H)', 'Flexión fuera del plano vinilo', true),
        b(910, 0.78, 22, 'γ(=CH₂)', 'Aleteo intenso =CH₂ terminal', true)
      ]),
      mkFtir('ir_1_hexyne', '1-Hexino', 'C₆H₁₀', 'Líquido', '3312 / 2118 / 632 cm⁻¹ (alquino terminal)', 'Picos agudos inconfundibles de triple enlace terminal a 3312 y 2118 cm⁻¹.', [
        b(3312, 0.78, 28, 'ν(≡C–H)', 'Estiramiento sp muy agudo y alto', true),
        b(2960, 0.72, 36, 'ν(C–H sp³)', 'Cadena butilo'),
        b(2934, 0.76, 36, 'νₐₛ(CH₂)', 'Metilenos alifáticos'),
        b(2118, 0.46, 20, 'ν(C≡C)', 'Banda característica en ventana limpia ~2120', true),
        b(1466, 0.42, 26, 'δ(CH₂)', 'Tijera saturada'),
        b(632, 0.72, 34, 'δ(≡C–H)', 'Flexión ancha intensa de H acetilénico', true)
      ]),
      mkFtir('ir_phenylacetylene', 'Fenilacetileno', 'C₈H₆', 'Líquido', '3292 / 2110 / 756 & 690 cm⁻¹', 'Combina triple enlace terminal con anillo bencénico monosustituido.', [
        b(3292, 0.84, 28, 'ν(≡C–H)', 'Hidrógeno acetilénico conjugado', true),
        b(3062, 0.34, 24, 'ν(Ar–H)', 'Estiramiento aromático sp²'),
        b(2110, 0.48, 20, 'ν(C≡C)', 'Triple enlace conjugado al fenilo', true),
        b(1596, 0.38, 22, 'ν(C=C Ar)', 'Esqueleto aromático'),
        b(1488, 0.64, 22, 'ν(C=C Ar)', 'Anillo fenilo'),
        b(756, 0.88, 24, 'γ(Ar–H)', 'Flexión 5H adyacentes monosustituido', true),
        b(690, 0.82, 24, 'φ(Ar)', 'Torsión de anillo monosustituido')
      ]),
      mkFtir('ir_cyclohexene', 'Ciclohexeno', 'C₆H₁₀', 'Líquido', '3024 / 1653 / 720 / 642 cm⁻¹', 'Alqueno endocíclico cis; ausente banda 910 cm⁻¹.', [
        b(3024, 0.56, 26, 'ν(=C–H)', 'Estiramiento olefínico > 3000 cm⁻¹', true),
        b(2928, 0.86, 38, 'ν(CH₂)', 'Metilenos anulares'),
        b(2858, 0.64, 32, 'νₛ(CH₂)', 'Simétrico CH₂'),
        b(1653, 0.44, 22, 'ν(C=C)', 'Doble enlace cis endocíclico', true),
        b(1438, 0.48, 24, 'δ(CH₂)', 'Deformación alílica'),
        b(720, 0.70, 26, 'γ(cis =CH)', 'Flexión cis-alqueno fuera de plano', true)
      ]),
      mkFtir('ir_styrene', 'Estireno (Vinilbenceno)', 'C₈H₈', 'Líquido', '3082 / 1630 / 991 / 908 / 775 / 696 cm⁻¹', 'Vinilo conjugado con anillo bencénico.', [
        b(3082, 0.45, 24, 'ν(=CH₂)', 'CH₂ vinílico terminal'),
        b(3028, 0.44, 24, 'ν(Ar–H)', 'C–H aromáticos'),
        b(1630, 0.52, 22, 'ν(C=C vinilo)', 'Doble enlace conjugado desplazado abajo', true),
        b(1495, 0.62, 22, 'ν(C=C Ar)', 'Anillo aromático'),
        b(991, 0.58, 20, 'γ(=C–H)', 'Torsión trans-CH vinílico', true),
        b(908, 0.82, 22, 'γ(=CH₂)', 'Banda vinilo intensa', true),
        b(775, 0.84, 24, 'γ(Ar–H)', 'Fenilo monosustituido'),
        b(696, 0.88, 24, 'φ(Ar)', 'Flexión fuera de plano')
      ]),
      mkFtir('ir_trans_stilbene', 'trans-Estilbeno', 'C₁₄H₁₂', 'Sólido cristalino', '3024 / 1598 / 962 / 763 / 690 cm⁻¹', 'Banda intensa en 962 cm⁻¹ diagnóstica de doble enlace trans disustituido.', [
        b(3024, 0.46, 26, 'ν(Ar/olef C–H)', 'C–H sp²'),
        b(1598, 0.42, 22, 'ν(C=C Ar)', 'Sistema conjugado'),
        b(1495, 0.62, 22, 'ν(C=C Ar)', 'Vibración aromática'),
        b(962, 0.88, 24, 'γ(trans =CH)', 'Banda maestra de alqueno trans en 965 cm⁻¹', true),
        b(763, 0.84, 24, 'γ(Ar–H)', 'Monosustitución'),
        b(690, 0.86, 24, 'φ(Ar)', 'Anillo fenilo')
      ]),
      mkFtir('ir_isoprene', 'Isopreno (2-Metil-1,3-butadieno)', 'C₅H₈', 'Líquido', '3088 / 1603 / 990 / 892 cm⁻¹', 'Dieno conjugado monómero del caucho natural.', [
        b(3088, 0.50, 26, 'ν(=CH₂)', 'Doble extremo =CH₂'),
        b(2975, 0.52, 32, 'ν(CH₃)', 'Metilo sp³'),
        b(1603, 0.72, 24, 'νₐₛ(C=C–C=C)', 'Estiramiento dieno conjugado intenso', true),
        b(990, 0.64, 22, 'γ(=CH)', 'Flexión vinilo'),
        b(892, 0.90, 24, 'γ(=CH₂)', 'Aleteo fuerte =CH₂ vinilideno + vinilo', true)
      ]),
      mkFtir('ir_limonene', '(R)-(+)-Limoneno', 'C₁₀H₁₆', 'Líquido aromático', '3074 / 2920 / 1645 / 886 cm⁻¹', 'Terpeno cíclico con un alqueno exocíclico =CH₂ que da banda aguda en 886 cm⁻¹.', [
        b(3074, 0.34, 24, 'ν(=CH₂)', 'Grupo isopropenilo terminal'),
        b(2920, 0.88, 38, 'ν(CH₂/CH₃)', 'Esqueleto terpénico'),
        b(1645, 0.52, 22, 'ν(C=C)', 'Doble enlace exocíclico', true),
        b(1438, 0.56, 24, 'δ(CH₂)', 'Tijera anular'),
        b(886, 0.86, 22, 'γ(=CH₂ gem)', 'Banda diagnóstica C=CH₂ a 886 cm⁻¹', true)
      ]),
      mkFtir('ir_3_hexyne', '3-Hexino (Alquino Interno)', 'C₆H₁₀', 'Líquido', '2974 / 2938 / 1456 cm⁻¹ (sin 3300)', 'Alquino simétrico interno: carece de banda ≡C–H (3300) y ν(C≡C) es casi inactiva por Δμ ≈ 0.', [
        b(2974, 0.85, 36, 'νₐₛ(CH₃)', 'Estiramiento metilos'),
        b(2938, 0.78, 34, 'νₐₛ(CH₂)', 'Metilenos propargílicos'),
        b(2878, 0.62, 32, 'νₛ(CH₃)', 'Metilo simétrico'),
        b(1456, 0.56, 26, 'δ(CH₂/CH₃)', 'Deformación alifática'),
        b(1320, 0.34, 24, 'ω(CH₂)', 'Flexión adyacente al triple enlace', true)
      ]),
      mkFtir('ir_allyl_alcohol', 'Alcohol Alílico', 'C₃H₆O', 'Líquido', '3340 / 3082 / 1646 / 1028 / 920 cm⁻¹', 'Doble enlace vinílico unido a grupo hidroxilo primario.', [
        b(3340, 0.88, 175, 'ν(O–H)', 'Banda ancha puente hidrógeno', true),
        b(3082, 0.32, 24, 'ν(=CH₂)', 'Estiramiento vinílico'),
        b(2875, 0.44, 34, 'ν(CH₂)', 'Metileno carbinólico'),
        b(1646, 0.44, 22, 'ν(C=C)', 'Doble enlace alílico', true),
        b(1028, 0.78, 32, 'ν(C–O)', 'Estiramiento alcohol primario', true),
        b(920, 0.72, 24, 'γ(=CH₂)', 'Flexión vinilo terminal')
      ])
    ]
  },

  // 3. HIDROCARBUROS AROMATICOS
  {
    id: 'aromatics',
    name: 'Hidrocarburos Aromáticos',
    functionalSignature: 'Anillos bencénicos sustituidos y patrones out-of-plane',
    diagnosticBands: 'ν(Ar–H) ~3030 cm⁻¹ · ν(C=C anillo) 1600/1500 cm⁻¹ · Patrón 750–690 / 820 cm⁻¹',
    compounds: [
      mkFtir('ir_toluene', 'Tolueno', 'C₇H₈', 'Líquido', '3028 / 2920 / 1496 / 728 & 694 cm⁻¹', 'Estándar aromático monosustituido con las dos fuertes bandas a 728 y 694 cm⁻¹.', [
        b(3028, 0.52, 28, 'ν(Ar–H)', 'Estiramiento C–H aromático > 3000', true),
        b(2920, 0.48, 34, 'ν(CH₃)', 'Metilo bencílico < 3000'),
        b(1605, 0.44, 20, 'ν(C=C Ar)', 'Vibración cuadrante anillo'),
        b(1496, 0.72, 22, 'ν(C=C Ar)', 'Semicírculo del anillo bencénico', true),
        b(1030, 0.38, 20, 'β(Ar–H)', 'Flexión en el plano'),
        b(728, 0.90, 22, 'γ(Ar–H)', '5 H adyacentes (monosustituido)', true),
        b(694, 0.86, 22, 'φ(Ar)', 'Deformación fuera de plano del anillo', true)
      ]),
      mkFtir('ir_benzene', 'Benceno', 'C₆H₆', 'Líquido', '3038 / 1478 / 673 cm⁻¹ (simetría D₆h)', 'Solo 4 modos fundamentales activos en IR por altísima simetría D₆h.', [
        b(3038, 0.72, 26, 'ν(Ar–H)', 'Banda aromática única C–H', true),
        b(1960, 0.22, 32, 'sobretonos', 'Dedos de combinación aromática'),
        b(1815, 0.22, 32, 'sobretonos', 'Combinación out-of-plane'),
        b(1478, 0.76, 22, 'ν(C=C Ar)', 'Estiramiento semicircular activo', true),
        b(1036, 0.46, 20, 'β(Ar–H)', 'Flexión en plano'),
        b(673, 0.96, 24, 'γ(Ar–H)', 'Vibración tipo paraguas fuera de plano muy intensa', true)
      ]),
      mkFtir('ir_p_xylene', 'p-Xileno (1,4-Dimetilbenceno)', 'C₈H₁₀', 'Líquido', '3020 / 2922 / 1516 / 795 cm⁻¹', 'Un solo pico intenso alrededor de 795 cm⁻¹ identifica la sustitución 1,4 (para).', [
        b(3020, 0.44, 24, 'ν(Ar–H)', 'C–H aromático'),
        b(2922, 0.62, 32, 'ν(CH₃)', 'Dos grupos metilo'),
        b(1516, 0.68, 22, 'ν(C=C Ar)', 'Banda característica 1,4-disustituido', true),
        b(1378, 0.36, 22, 'δₛ(CH₃)', 'Metilos simétricos'),
        b(795, 0.92, 22, 'γ(Ar–H para)', '2 H adyacentes: pico único en ~800 cm⁻¹', true)
      ]),
      mkFtir('ir_o_xylene', 'o-Xileno (1,2-Dimetilbenceno)', 'C₈H₁₀', 'Líquido', '3018 / 2920 / 1468 / 742 cm⁻¹', 'Sustitución orto (4 H adyacentes) produce un único pico agudo intenso en 742 cm⁻¹.', [
        b(3018, 0.45, 24, 'ν(Ar–H)', 'C–H anillo'),
        b(2920, 0.58, 32, 'ν(CH₃)', 'Metilos adyacentes'),
        b(1494, 0.52, 22, 'ν(C=C Ar)', 'Estiramiento anular'),
        b(1468, 0.58, 24, 'δ(CH₃)', 'Flexión metilos'),
        b(742, 0.94, 22, 'γ(Ar–H orto)', '4 H adyacentes: banda única en 742 cm⁻¹', true)
      ]),
      mkFtir('ir_m_xylene', 'm-Xileno (1,3-Dimetilbenceno)', 'C₈H₁₀', 'Líquido', '3018 / 2920 / 1612 / 768 & 690 cm⁻¹', 'Sustitución meta produce pico en 768 (3H) + anillo en 690 cm⁻¹.', [
        b(3018, 0.45, 24, 'ν(Ar–H)', 'C–H aromático'),
        b(2920, 0.60, 32, 'ν(CH₃)', 'Metilos en 1,3'),
        b(1612, 0.56, 22, 'ν(C=C Ar)', 'Doble enlace anular'),
        b(768, 0.88, 22, 'γ(Ar–H meta)', '3 H adyacentes en 1,3-disustituido', true),
        b(690, 0.80, 22, 'φ(Ar)', 'Torsión fuera de plano', true)
      ]),
      mkFtir('ir_naphthalene', 'Naftaleno', 'C₁₀H₈', 'Sólido sublimable', '3052 / 1592 / 782 cm⁻¹', 'Hidrocarburo aromático policíclico bicíclico plano.', [
        b(3052, 0.56, 24, 'ν(Ar–H)', 'Estiramiento C–H aromático', true),
        b(1592, 0.44, 20, 'ν(C=C Ar)', 'Esqueleto naftalénico'),
        b(1506, 0.48, 20, 'ν(C=C Ar)', 'Acoplamiento anular'),
        b(1126, 0.40, 20, 'β(Ar–H)', 'Flexión en plano'),
        b(958, 0.46, 20, 'γ(Ar–H)', 'Flexión fuera de plano'),
        b(782, 0.96, 22, 'γ(Ar–H 4H)', 'Banda intensa α/β naftalénica', true)
      ]),
      mkFtir('ir_anthracene', 'Antraceno', 'C₁₄H₁₀', 'Sólido cristalino', '3052 / 1620 / 884 / 728 cm⁻¹', 'Tres anillos fusionados lineales con pico característico de C–H meso en 884 cm⁻¹.', [
        b(3052, 0.48, 24, 'ν(Ar–H)', 'Estiramiento aromático'),
        b(1620, 0.42, 20, 'ν(C=C Ar)', 'Anillos conjugados'),
        b(884, 0.88, 20, 'γ(C₉/C₁₀ H)', 'Hidrógenos solitarios del anillo central', true),
        b(728, 0.94, 22, 'γ(4H anillos)', 'Cuatro H adyacentes laterales', true)
      ]),
      mkFtir('ir_cumene', 'Cumeno (Isopropilbenceno)', 'C₉H₁₂', 'Líquido', '3028 / 2962 / 1384 & 1364 / 760 / 698 cm⁻¹', 'Anillo monosustituido con grupo isopropilo (doblete en 1384/1364 cm⁻¹).', [
        b(3028, 0.44, 24, 'ν(Ar–H)', 'Aromático'),
        b(2962, 0.78, 34, 'ν(CH₃)', 'Metilos del isopropilo'),
        b(1494, 0.62, 22, 'ν(C=C Ar)', 'Anillo fenilo'),
        b(1384, 0.36, 18, 'δₛ(i-Pr)', 'Rama alta doblete isopropilo', true),
        b(1364, 0.36, 18, 'δₛ(i-Pr)', 'Rama baja doblete isopropilo'),
        b(760, 0.84, 22, 'γ(Ar–H)', '5 H adyacentes', true),
        b(698, 0.86, 22, 'φ(Ar)', 'Torsión monosustituida')
      ]),
      mkFtir('ir_biphenyl', 'Bifenilo', 'C₁₂H₁₀', 'Sólido cristalino', '3035 / 1480 / 730 & 696 cm⁻¹', 'Dos anillos fenilo unidos directamente sin espaciador saturado.', [
        b(3035, 0.50, 24, 'ν(Ar–H)', 'Solo C–H sp² presente'),
        b(1596, 0.42, 20, 'ν(C=C Ar)', 'Anillos acoplados'),
        b(1480, 0.74, 22, 'ν(C=C Ar)', 'Estiramiento anular intenso', true),
        b(730, 0.92, 22, 'γ(Ar–H)', 'Monosustitución simétrica', true),
        b(696, 0.86, 22, 'φ(Ar)', 'Flexión fuera de plano')
      ]),
      mkFtir('ir_mesitylene', 'Mesitileno (1,3,5-Trimetilbenceno)', 'C₉H₁₂', 'Líquido', '2918 / 1608 / 836 / 688 cm⁻¹', 'Sustitución simétrica 1,3,5 deja hidrógenos solitarios que vibran en 836 cm⁻¹.', [
        b(3018, 0.38, 24, 'ν(Ar–H)', 'Tres C–H aromáticos'),
        b(2918, 0.66, 32, 'ν(CH₃)', 'Tres metilos simétricos'),
        b(1608, 0.72, 22, 'ν(C=C Ar)', 'Anillo simétrico', true),
        b(836, 0.88, 22, 'γ(H solitario)', 'Flexión fuera de plano de H aislados 1,3,5', true),
        b(688, 0.70, 20, 'φ(Ar)', 'Torsión anular')
      ])
    ]
  },

  // 4. ALCOHOLES Y FENOLES
  {
    id: 'alcohols',
    name: 'Alcoholes y Fenoles',
    functionalSignature: 'Hidroxilo O–H asociado por puente de hidrógeno + enlace C–O',
    diagnosticBands: 'ν(O–H) ancha 3400–3200 cm⁻¹ · ν(C–O) 1260–1000 cm⁻¹ (1°/2°/3°/fenol)',
    compounds: [
      mkFtir('ir_isopropanol', '2-Propanol (Alcohol Isopropílico)', 'C₃H₈O', 'Líquido', '3340 (ancha) / 2970 / 1128 & 952 cm⁻¹', 'Alcohol secundario modelo con banda O–H redondeada y C–O en 1128 cm⁻¹.', [
        b(3340, 0.92, 210, 'ν(O–H asociado)', 'Banda ancha parabólica por puentes de hidrógeno', true),
        b(2970, 0.76, 36, 'ν(C–H sp³)', 'Metilos isopropílicos'),
        b(1380, 0.56, 26, 'δ(CH₃) + δ(OH)', 'Acoplamiento C–H / O–H'),
        b(1128, 0.82, 28, 'ν(C–O 2°)', 'Estiramiento característico de alcohol secundario', true),
        b(952, 0.70, 24, 'ν(C–C–O)', 'Vibración simétrica esquelética')
      ]),
      mkFtir('ir_ethanol', 'Etanol Absoluto', 'C₂H₆O', 'Líquido', '3335 (ancha) / 2974 / 1048 & 880 cm⁻¹', 'Alcohol primario con estiramiento C–O intenso a 1048 cm⁻¹.', [
        b(3335, 0.94, 220, 'ν(O–H)', 'Puentes de hidrógeno intermoleculares', true),
        b(2974, 0.72, 34, 'νₐₛ(CH₃)', 'Grupo etilo'),
        b(2888, 0.54, 34, 'ν(CH₂)', 'Metileno α al oxígeno'),
        b(1382, 0.44, 28, 'δ(O–H)', 'Flexión en el plano'),
        b(1048, 0.88, 28, 'ν(C–O 1°)', 'Alcohol primario ~1050 cm⁻¹', true),
        b(880, 0.56, 24, 'ν(C–C–O)', 'Estiramiento asimétrico esquelético')
      ]),
      mkFtir('ir_tert_butanol', 'terc-Butanol', 'C₄H₁₀O', 'Líquido / Sólido 25°C', '3365 (ancha) / 2974 / 1196 cm⁻¹', 'Alcohol terciario: mayor impedimento estérico desplaza C–O a 1196 cm⁻¹.', [
        b(3365, 0.86, 195, 'ν(O–H)', 'Hidroxilo ligeramente menos asociado', true),
        b(2974, 0.82, 36, 'ν(CH₃)', 'Tres metilos equivalentes'),
        b(1366, 0.68, 24, 'δₛ(C(CH₃)₃)', 'Banda terc-butilo intensa'),
        b(1196, 0.86, 26, 'ν(C–O 3°)', 'Alcohol terciario desplazado cerca de 1200 cm⁻¹', true),
        b(914, 0.58, 22, 'ν(C–C)', 'Esqueleto C₄')
      ]),
      mkFtir('ir_phenol', 'Fenol', 'C₆H₅OH', 'Sólido cristalino', '3330 / 1596 / 1226 / 750 & 690 cm⁻¹', 'Enlace C_Ar–O con carácter de doble enlace parcial sube ν(C–O) a 1226 cm⁻¹.', [
        b(3330, 0.90, 200, 'ν(O–H fenólico)', 'Fuerte asociación intermolecular', true),
        b(3045, 0.34, 24, 'ν(Ar–H)', 'C–H aromáticos'),
        b(1596, 0.68, 22, 'ν(C=C Ar)', 'Anillo activado por –OH'),
        b(1498, 0.72, 22, 'ν(C=C Ar)', 'Esqueleto aromático'),
        b(1226, 0.86, 32, 'ν(C_Ar–O)', 'Desplazado arriba (~1230 cm⁻¹) por resonancia', true),
        b(750, 0.84, 24, 'γ(Ar–H)', 'Anillo monosustituido'),
        b(690, 0.74, 22, 'φ(Ar)', 'Torsión anular')
      ]),
      mkFtir('ir_benzyl_alcohol', 'Alcohol Bencílico', 'C₇H₈O', 'Líquido', '3330 / 1454 / 1018 / 734 & 696 cm⁻¹', 'Alcohol primario bencílico: C–O permanece en ~1018 cm⁻¹ (sin resonancia con Ar).', [
        b(3330, 0.90, 210, 'ν(O–H)', 'Puente de hidrógeno fuerte', true),
        b(3032, 0.38, 24, 'ν(Ar–H)', 'Anillo fenilo'),
        b(2875, 0.42, 34, 'ν(CH₂)', 'Metileno bencílico'),
        b(1454, 0.56, 24, 'δ(CH₂)/Ar', 'Vibración mixta'),
        b(1018, 0.84, 28, 'ν(C–O 1°)', 'Alcohol primario ~1020 cm⁻¹', true),
        b(734, 0.84, 24, 'γ(Ar–H)', 'Monosustitución'),
        b(696, 0.82, 22, 'φ(Ar)', 'Anillo fenilo')
      ]),
      mkFtir('ir_1_butanol', '1-Butanol', 'C₄H₁₀O', 'Líquido', '3330 / 2958 / 1072 & 1030 cm⁻¹', 'Alcohol primario con cadena butilo.', [
        b(3330, 0.90, 210, 'ν(O–H)', 'Hidroxilo asociado', true),
        b(2958, 0.82, 36, 'ν(C–H sp³)', 'Cadena butílica'),
        b(2874, 0.65, 32, 'νₛ(C–H)', 'Simétrico alifático'),
        b(1466, 0.46, 26, 'δ(CH₂)', 'Tijera metileno'),
        b(1072, 0.82, 26, 'ν(C–O 1°)', 'Estiramiento principal C–O', true)
      ]),
      mkFtir('ir_cyclohexanol', 'Ciclohexanol', 'C₆H₁₂O', 'Líquido viscoso', '3340 / 2930 / 1066 cm⁻¹', 'Alcohol secundario alicíclico.', [
        b(3340, 0.90, 210, 'ν(O–H)', 'Hidroxilo asociado', true),
        b(2930, 0.88, 38, 'νₐₛ(CH₂)', 'Anillo ciclohexilo'),
        b(2856, 0.70, 32, 'νₛ(CH₂)', 'Simétrico anular'),
        b(1450, 0.52, 24, 'δ(CH₂)', 'Tijera CH₂'),
        b(1066, 0.84, 26, 'ν(C–O 2°)', 'Estiramiento C–O ecuatorial/axial', true)
      ]),
      mkFtir('ir_ethylene_glycol', 'Etilenglicol', 'C₂H₆O₂', 'Líquido viscoso', '3300 (muy ancha) / 1084 & 1038 cm⁻¹', 'Diol vicinal con red tridimensional extrema de puentes de hidrógeno.', [
        b(3300, 0.96, 250, 'ν(O–H diol)', 'Banda anchísima dominante en alta frecuencia', true),
        b(2938, 0.56, 36, 'ν(CH₂)', 'Metilenos'),
        b(2878, 0.52, 34, 'νₛ(CH₂)', 'Simétrico CH₂'),
        b(1084, 0.84, 28, 'νₐₛ(C–O)', 'Estiramiento C–O doble', true),
        b(1038, 0.86, 28, 'νₛ(C–O)', 'Segundo pico C–O intenso', true),
        b(882, 0.64, 26, 'ν(C–C)', 'Esqueleto etileno')
      ]),
      mkFtir('ir_hydroquinone', 'Hidroquinona (1,4-Dihidroxibenceno)', 'C₆H₆O₂', 'Sólido', '3240 / 1515 / 1205 / 824 cm⁻¹', 'Fenol para-disustituido con banda única out-of-plane en 824 cm⁻¹.', [
        b(3240, 0.92, 165, 'ν(O–H cristal)', 'Puentes de hidrógeno cristalinos fuertes', true),
        b(1515, 0.82, 22, 'ν(C=C Ar)', 'Anillo 1,4-disustituido'),
        b(1205, 0.88, 28, 'ν(C_Ar–O)', 'Dos enlaces fenólicos C–O', true),
        b(824, 0.78, 22, 'γ(Ar–H para)', 'Dos H adyacentes en anillo 1,4', true)
      ]),
      mkFtir('ir_glycerol', 'Glicerol (1,2,3-Propanotriol)', 'C₃H₈O₃', 'Líquido denso', '3290 / 1110 / 1035 cm⁻¹', 'Triol muy polar con picos diferenciados de alcohol primario (1035) y secundario (1110).', [
        b(3290, 0.96, 260, 'ν(O–H triol)', 'Absorción hidroxílica masiva', true),
        b(2936, 0.52, 36, 'ν(CH₂/CH)', 'Esqueleto propano'),
        b(1414, 0.48, 30, 'δ(O–H)', 'Deformación en el plano'),
        b(1110, 0.76, 28, 'ν(C–O 2°)', 'Alcohol secundario central', true),
        b(1035, 0.88, 30, 'ν(C–O 1°)', 'Dos alcoholes primarios terminales', true)
      ])
    ]
  },

  // 5. ALDEHIDOS Y CETONAS
  {
    id: 'aldehydes_ketones',
    name: 'Aldehídos y Cetonas',
    functionalSignature: 'Grupo carbonilo C=O intenso y doblete de Fermi aldehídico',
    diagnosticBands: 'ν(C=O) 1740–1680 cm⁻¹ · Doblete Fermi ν(C–H ald) 2820 & 2720 cm⁻¹',
    compounds: [
      mkFtir('ir_acetone', 'Acetona (Propanona)', 'C₃H₆O', 'Líquido', '1715 (C=O) / 1362 / 1222 cm⁻¹', 'Cetona alifática estándar con carbonilo muy agudo e intenso a 1715 cm⁻¹.', [
        b(3004, 0.28, 28, 'νₐₛ(CH₃)', 'Metilos α al carbonilo'),
        b(1715, 0.96, 24, 'ν(C=O cetona)', 'Banda carbonílica intensa y aguda', true),
        b(1422, 0.48, 24, 'δₐₛ(CH₃CO)', 'Metilo adyacente al C=O'),
        b(1362, 0.68, 22, 'δₛ(CH₃CO)', 'Banda fuerte de metilcetona a 1362 cm⁻¹', true),
        b(1222, 0.76, 24, 'ν(C–C(=O)–C)', 'Estiramiento esquelético de cetona', true)
      ]),
      mkFtir('ir_benzaldehyde', 'Benzaldehído', 'C₇H₆O', 'Líquido aromático', '2818 & 2736 / 1702 / 1204 / 745 & 688 cm⁻¹', 'Conjugación con el anillo baja ν(C=O) a 1702 cm⁻¹ mientras muestra el doblete aldehídico 2818/2736.', [
        b(3062, 0.30, 24, 'ν(Ar–H)', 'Anillo aromático'),
        b(2818, 0.44, 24, 'ν(C–H ald)', 'Componente alto del doblete de Fermi', true),
        b(2736, 0.46, 22, '2·δ(C–H ald)', 'Componente bajo diagnóstico exclusivo de aldehído', true),
        b(1702, 0.96, 22, 'ν(C=O conj)', 'Carbonilo conjugado al anillo fenilo', true),
        b(1596, 0.56, 20, 'ν(C=C Ar)', 'Esqueleto aromático'),
        b(1204, 0.62, 22, 'ν(Ar–CO)', 'Estiramiento Ar–C'),
        b(745, 0.78, 22, 'γ(Ar–H)', 'Fenilo monosustituido'),
        b(688, 0.72, 20, 'φ(Ar)', 'Anillo')
      ]),
      mkFtir('ir_butanal', 'Butanal (Butiraldehído)', 'C₄H₈O', 'Líquido', '2816 & 2718 / 1726 cm⁻¹', 'Aldehído saturado: C=O en 1726 cm⁻¹ más par clásico de Fermi en 2816/2718 cm⁻¹.', [
        b(2964, 0.70, 34, 'ν(C–H sp³)', 'Cadena propilo'),
        b(2816, 0.45, 22, 'ν(C–H ald)', 'Rama alta doblete de Fermi', true),
        b(2718, 0.48, 20, '2·δ(C–H ald)', 'Pico solitario en 2718 cm⁻¹ confirma aldehído', true),
        b(1726, 0.94, 22, 'ν(C=O ald)', 'Carbonilo de aldehído alifático', true),
        b(1410, 0.42, 22, 'δ(CH₂ α)', 'Metileno α-carbonilo')
      ]),
      mkFtir('ir_cyclohexanone', 'Ciclohexanona', 'C₆H₁₀O', 'Líquido', '2938 / 1712 / 1222 / 1118 cm⁻¹', 'Cetona cíclica de 6 miembros libre de tensión anular (1712 cm⁻¹).', [
        b(2938, 0.76, 36, 'ν(CH₂)', 'Metilenos del anillo'),
        b(2862, 0.56, 30, 'νₛ(CH₂)', 'Simétrico CH₂'),
        b(1712, 0.96, 22, 'ν(C=O 6-anillo)', 'Cetona anular sin tensión', true),
        b(1448, 0.46, 24, 'δ(CH₂)', 'Tijera anular'),
        b(1222, 0.48, 22, 'ν(C–CO–C)', 'Esqueleto cetónico')
      ]),
      mkFtir('ir_cyclopentanone', 'Ciclopentanona', 'C₅H₈O', 'Líquido', '2965 / 1744 / 1152 cm⁻¹', 'La tensión angular del anillo de 5 miembros eleva el carácter s y sube ν(C=O) a 1744 cm⁻¹.', [
        b(2965, 0.66, 34, 'ν(CH₂)', 'Metilenos C5'),
        b(1744, 0.96, 22, 'ν(C=O 5-anillo)', 'Efecto de tensión anular desplaza C=O a 1744 cm⁻¹', true),
        b(1408, 0.44, 22, 'δ(CH₂ α)', 'Metilenos α'),
        b(1152, 0.64, 22, 'ν(C–CO–C)', 'Estiramiento esquelético')
      ]),
      mkFtir('ir_acetophenone', 'Acetofenona', 'C₈H₈O', 'Líquido', '1685 / 1598 / 1266 / 760 & 690 cm⁻¹', 'Cetona aromática conjugada: resonancia reduce la fuerza del enlace C=O a 1685 cm⁻¹.', [
        b(3062, 0.30, 24, 'ν(Ar–H)', 'Aromático'),
        b(1685, 0.95, 22, 'ν(C=O Ar-CO-Me)', 'Carbonilo conjugado por debajo de 1700 cm⁻¹', true),
        b(1598, 0.56, 20, 'ν(C=C Ar)', 'Esqueleto aromático'),
        b(1360, 0.54, 20, 'δₛ(CH₃CO)', 'Metilcetona'),
        b(1266, 0.80, 22, 'ν(Ar–C(=O))', 'Enlace aril-carbonilo intenso', true),
        b(760, 0.82, 22, 'γ(Ar–H)', 'Monosustituido'),
        b(690, 0.78, 22, 'φ(Ar)', 'Anillo fenilo')
      ]),
      mkFtir('ir_benzophenone', 'Benzofenona', 'C₁₃H₁₀O', 'Sólido cristalino', '1658 / 1598 / 1278 / 702 cm⁻¹', 'Doble conjugación aromática baja aún más el carbonilo hasta 1658 cm⁻¹.', [
        b(3058, 0.30, 24, 'ν(Ar–H)', 'Dos anillos fenilo'),
        b(1658, 0.94, 22, 'ν(C=O Ar₂CO)', 'Carbonilo doblemente conjugado a 1658 cm⁻¹', true),
        b(1598, 0.62, 20, 'ν(C=C Ar)', 'Anillos aromáticos'),
        b(1278, 0.84, 22, 'ν(C_Ar–CO)', 'Estiramiento asimétrico Ar–C–Ar', true),
        b(702, 0.86, 22, 'φ(Ar)', 'Monosustitución simétrica')
      ]),
      mkFtir('ir_butanone', '2-Butanona (MEK)', 'C₄H₈O', 'Líquido', '2980 / 1716 / 1366 / 1174 cm⁻¹', 'Solvente cetónico industrial.', [
        b(2980, 0.56, 34, 'ν(C–H)', 'Metilo y etilo'),
        b(1716, 0.96, 22, 'ν(C=O)', 'Carbonilo cetónico saturado', true),
        b(1366, 0.62, 22, 'δₛ(CH₃CO)', 'Banda característica metilcetona'),
        b(1174, 0.66, 22, 'ν(C–CO–C)', 'Estiramiento esquelético')
      ]),
      mkFtir('ir_cinnamaldehyde', 'Cinamaldehído', 'C₉H₈O', 'Líquido canela', '2812 & 2742 / 1676 / 1626 / 974 cm⁻¹', 'Aldehído α,β-insaturado con C=O a 1676 cm⁻¹ y C=C conjugado intenso a 1626 cm⁻¹.', [
        b(2812, 0.36, 22, 'ν(C–H ald)', 'Aldehído Fermi alto'),
        b(2742, 0.36, 22, '2·δ(C–H ald)', 'Aldehído Fermi bajo', true),
        b(1676, 0.96, 22, 'ν(C=O conj)', 'Carbonilo doblemente conjugado (Ar + C=C)', true),
        b(1626, 0.78, 20, 'ν(C=C trans)', 'Doble enlace conjugado intenso', true),
        b(1122, 0.66, 22, 'δ(C–H)', 'Vibración en plano'),
        b(974, 0.58, 22, 'γ(trans =CH)', 'Estereoquímica trans'),
        b(748, 0.74, 22, 'γ(Ar–H)', 'Fenilo monosustituido')
      ]),
      mkFtir('ir_camphor', 'Alcanfor', 'C₁₀H₁₆O', 'Sólido sublimable', '2960 / 1742 / 1450 / 1046 cm⁻¹', 'Cetona bicíclica puenteada con tensión anular elevando ν(C=O) a 1742 cm⁻¹.', [
        b(2960, 0.80, 34, 'ν(C–H sp³)', 'Metilos y puente'),
        b(1742, 0.96, 22, 'ν(C=O bicíclica)', 'Tensión del puente eleva ν(C=O) a 1742 cm⁻¹', true),
        b(1450, 0.46, 22, 'δ(CH₂/CH₃)', 'Deformación alifática'),
        b(1046, 0.52, 22, 'ν(C–C)', 'Esqueleto bornano')
      ])
    ]
  },

  // 6. ACIDOS CARBOXILICOS
  {
    id: 'carboxylic_acids',
    name: 'Ácidos Carboxílicos',
    functionalSignature: 'Dímeros por doble puente de hidrógeno (O–H ultra ancho + C=O)',
    diagnosticBands: 'ν(O–H) ultra ancho 3300–2500 cm⁻¹ · ν(C=O) ~1710 cm⁻¹ · ν(C–O) ~1280 cm⁻¹ · γ(O–H) ~930 cm⁻¹',
    compounds: [
      mkFtir('ir_acetic_acid', 'Ácido Acético Glacial', 'CH₃COOH', 'Líquido', '3150 (2500–3400) / 1712 / 1292 / 938 cm⁻¹', 'Prototipo alifático: banda O–H anchísima centrada en 3050 superpuesta sobre C–H.', [
        b(3080, 0.86, 480, 'ν(O–H dímero)', 'Banda en "U" anchísima de 3400 a 2500 cm⁻¹', true),
        b(2940, 0.34, 42, 'ν(CH₃)', 'Pequeño hombro C–H sobre el O–H'),
        b(1712, 0.96, 28, 'ν(C=O dímero)', 'Carbonilo ácido sumamente intenso', true),
        b(1414, 0.64, 28, 'δ(O–H)/CH₃', 'Deformación acoplada'),
        b(1292, 0.84, 30, 'ν(C–O) + δ(OH)', 'Banda característica C–O ácida', true),
        b(938, 0.58, 38, 'γ(O–H fuera plano)', 'Banda ancha de dímero en ~935 cm⁻¹', true)
      ]),
      mkFtir('ir_benzoic_acid', 'Ácido Benzoico', 'C₇H₆O₂', 'Sólido cristalino', '2980 (2500–3300) / 1688 / 1290 / 935 / 708 cm⁻¹', 'Ácido aromático cristalino: C=O conjugado baja a 1688 cm⁻¹ manteniendo O–H en barba.', [
        b(2950, 0.78, 420, 'ν(O–H dímero)', 'Envoltura ancha característica 3300–2500 cm⁻¹', true),
        b(1688, 0.96, 26, 'ν(C=O Ar-COOH)', 'Carbonilo conjugado de ácido aromático', true),
        b(1424, 0.62, 24, 'δ(O–H)', 'Acoplamiento en plano'),
        b(1290, 0.86, 26, 'ν(C–O)', 'Estiramiento C–O fenólico/ácido', true),
        b(935, 0.62, 34, 'γ(O–H)', 'Flexión fuera de plano del dímero', true),
        b(708, 0.84, 24, 'φ(Ar)', 'Anillo monosustituido')
      ]),
      mkFtir('ir_propanoic_acid', 'Ácido Propiónico', 'C₃H₆O₂', 'Líquido', '3080 (ancha) / 1714 / 1242 / 934 cm⁻¹', 'Homólogo C3 saturado con olor penetrante.', [
        b(3070, 0.84, 460, 'ν(O–H dímero)', 'Banda ultra ancha 3400–2500 cm⁻¹', true),
        b(2945, 0.42, 42, 'ν(CH₂/CH₃)', 'Etilo saturado'),
        b(1714, 0.96, 26, 'ν(C=O)', 'Carbonilo carboxílico', true),
        b(1418, 0.58, 26, 'δ(CH₂ α)', 'Metileno α al ácido'),
        b(1242, 0.82, 28, 'ν(C–O)', 'Estiramiento C–O', true),
        b(934, 0.54, 36, 'γ(O–H)', 'Torsión dímero')
      ]),
      mkFtir('ir_oleic_acid', 'Ácido Oleico (ω-9)', 'C₁₈H₃₄O₂', 'Líquido aceitoso', '3006 / 2925 (fuerte) / 1711 / 1285 / 938 cm⁻¹', 'Ácido graso insaturado: larga cadena alifática intensifica 2925 cm⁻¹ por encima del O–H dímero.', [
        b(3090, 0.58, 420, 'ν(O–H dímero)', 'Ancha envolvente subyacente', true),
        b(2925, 0.94, 38, 'νₐₛ(CH₂)', 'Dieciséis metilenos intensos sobre el O–H', true),
        b(2854, 0.78, 32, 'νₛ(CH₂)', 'Simétrico CH₂'),
        b(1711, 0.95, 26, 'ν(C=O)', 'Carbonilo ácido graso', true),
        b(1285, 0.64, 26, 'ν(C–O)', 'Estiramiento carboxilo'),
        b(938, 0.48, 34, 'γ(O–H)', 'Dímero carboxílico'),
        b(722, 0.42, 24, 'ρ(CH₂)', 'Cadena larga')
      ]),
      mkFtir('ir_salicylic_acid', 'Ácido Salicílico (2-Hidroxibenzoico)', 'C₇H₆O₃', 'Sólido', '3236 / 2860 / 1658 / 1295 / 760 cm⁻¹', 'Puente de hidrógeno intramolecular con –OH orto desplaza C=O hasta 1658 cm⁻¹ y muestra –OH fenólico agudo en 3236.', [
        b(3236, 0.84, 65, 'ν(O–H fenol)', 'Hidroxilo fenólico quelado más estrecho', true),
        b(2860, 0.66, 360, 'ν(O–H ácido)', 'Cola ácida de dímero'),
        b(1658, 0.96, 26, 'ν(C=O quelado)', 'Puente intramolecular reduce C=O a 1658 cm⁻¹', true),
        b(1446, 0.68, 24, 'ν(C=C Ar)', 'Anillo 1,2-disustituido'),
        b(1295, 0.82, 26, 'ν(C–O)', 'Estiramientos C–O'),
        b(760, 0.86, 24, 'γ(Ar–H orto)', '4 H adyacentes en anillo orto', true)
      ]),
      mkFtir('ir_citric_acid', 'Ácido Cítrico Anhidro', 'C₆H₈O₇', 'Sólido', '3495 & 3285 / 1744 & 1705 / 1218 cm⁻¹', 'Ácido tricarboxílico con hidroxilo terciario en 3495 cm⁻¹ y dos picos C=O.', [
        b(3495, 0.72, 48, 'ν(O–H alcohólico)', 'Hidroxilo terciario relativamente libre', true),
        b(3285, 0.84, 180, 'ν(O–H ácidos)', 'Tres grupos carboxilo asociados'),
        b(1744, 0.92, 26, 'ν(C=O libre/débil)', 'Carboxilo menos asociado', true),
        b(1705, 0.96, 28, 'ν(C=O dímero)', 'Carboxilo dimérico fuerte', true),
        b(1218, 0.84, 30, 'ν(C–O)', 'Bandas acopladas C–O')
      ]),
      mkFtir('ir_oxalic_acid', 'Ácido Oxálico', 'C₂H₂O₄', 'Sólido cristalino', '3420 / 1688 / 1255 / 722 cm⁻¹', 'Ácido dicarboxílico más simple sin enlaces C–H.', [
        b(3420, 0.88, 175, 'ν(O–H)', 'Hidroxilos ácidos en red cristalina', true),
        b(1688, 0.96, 34, 'ν(C=O)', 'Dos carbonilos conjugados muy fuertes', true),
        b(1255, 0.84, 32, 'ν(C–O)', 'Estiramiento C–O carboxílico', true),
        b(722, 0.62, 28, 'δ(O=C–O)', 'Deformación carboxilo')
      ]),
      mkFtir('ir_butyric_acid', 'Ácido Butírico', 'C₄H₈O₂', 'Líquido', '3080 (ancha) / 1712 / 1282 / 936 cm⁻¹', 'Ácido graso corto C4.', [
        b(3075, 0.82, 440, 'ν(O–H dímero)', 'Envolvente ancha dímero', true),
        b(2965, 0.62, 36, 'ν(C–H sp³)', 'Propilo'),
        b(1712, 0.96, 26, 'ν(C=O)', 'Carbonilo ácido', true),
        b(1282, 0.80, 28, 'ν(C–O)', 'C–O ácido'),
        b(936, 0.56, 34, 'γ(O–H)', 'Flexión dímero')
      ]),
      mkFtir('ir_cinnamic_acid', 'Ácido trans-Cinámico', 'C₉H₈O₂', 'Sólido', '2980 (ancha) / 1682 / 1628 / 978 / 768 cm⁻¹', 'Ácido α,β-insaturado con C=C conjugado agudo en 1628 cm⁻¹.', [
        b(2980, 0.72, 400, 'ν(O–H dímero)', 'Barba ácida 3300–2500 cm⁻¹', true),
        b(1682, 0.96, 26, 'ν(C=O conj)', 'Carbonilo ácido conjugado', true),
        b(1628, 0.84, 22, 'ν(C=C trans)', 'Doble enlace conjugado sumamente intenso', true),
        b(1284, 0.80, 26, 'ν(C–O)', 'Estiramiento C–O'),
        b(978, 0.68, 22, 'γ(trans =CH)', 'Alqueno trans'),
        b(768, 0.76, 22, 'γ(Ar–H)', 'Fenilo')
      ]),
      mkFtir('ir_stearic_acid', 'Ácido Esteárico', 'C₁₈H₃₆O₂', 'Sólido ceroso', '2918 / 2850 / 1702 / 1472 / 940 / 720 cm⁻¹', 'Ácido graso saturado de 18 carbonos; bandas agudas en sólido cristalino.', [
        b(3040, 0.44, 360, 'ν(O–H dímero)', 'Ancha envolvente ácida'),
        b(2918, 0.96, 34, 'νₐₛ(CH₂)', 'Dieciséis CH₂ cristalinos', true),
        b(2850, 0.84, 28, 'νₛ(CH₂)', 'Simétrico CH₂'),
        b(1702, 0.94, 24, 'ν(C=O)', 'Carbonilo cristalino', true),
        b(1472, 0.62, 22, 'δ(CH₂)', 'Tijera cristalina'),
        b(1296, 0.56, 26, 'ν(C–O) + progresión', 'Bandas en escalera de cadena sólida'),
        b(940, 0.52, 32, 'γ(O–H)', 'Dímero ácido'),
        b(720, 0.56, 20, 'ρ(CH₂)', 'Balanceo cristalino')
      ])
    ]
  },

  // 7. ESTERES, LACTONAS Y ANHIDRIDOS
  {
    id: 'esters',
    name: 'Ésteres, Lactonas y Anhídridos',
    functionalSignature: 'Carbonilo a 1735 cm⁻¹ + doble banda intensa C–O ("Regla del Éster")',
    diagnosticBands: 'ν(C=O) ~1735 cm⁻¹ · ν(C–C(=O)–O) ~1240 cm⁻¹ · ν(O–C–C) ~1050 cm⁻¹ · Anhídrido doblete 1820/1750 cm⁻¹',
    compounds: [
      mkFtir('ir_ethyl_acetate', 'Acetato de Etilo', 'C₄H₈O₂', 'Líquido frutal', '1740 / 1374 / 1242 (fuerte) / 1048 cm⁻¹', 'Estándar clásico de la regla del éster: 1740 + banda muy fuerte de acetato en 1242 cm⁻¹.', [
        b(2984, 0.48, 34, 'ν(C–H sp³)', 'Metilo y etilo'),
        b(1740, 0.96, 22, 'ν(C=O éster)', 'Carbonilo alifático en ~1740 cm⁻¹', true),
        b(1374, 0.58, 22, 'δₛ(CH₃CO)', 'Metilo del acetato'),
        b(1242, 0.94, 26, 'ν(C–C(=O)–O)', 'Banda característica fortísima de acetatos a 1240 cm⁻¹', true),
        b(1048, 0.78, 24, 'ν(O–CH₂–C)', 'Segunda banda C–O del éster etílico', true)
      ]),
      mkFtir('ir_methyl_benzoate', 'Benzoato de Metilo', 'C₈H₈O₂', 'Líquido', '1722 / 1278 (muy fuerte) / 1110 / 710 cm⁻¹', 'Éster conjugado al fenilo: C=O baja a 1722 cm⁻¹ y Ar–C(=O)–O domina a 1278 cm⁻¹.', [
        b(2954, 0.34, 30, 'ν(OCH₃)', 'Metoxilo'),
        b(1722, 0.96, 22, 'ν(C=O conj)', 'Benzoato conjugado ~1722 cm⁻¹', true),
        b(1452, 0.54, 22, 'ν(Ar)/δ(CH₃)', 'Anillo y metilo'),
        b(1278, 0.96, 26, 'ν(Ar–C(=O)–O)', 'Banda C–O intensa de benzoatos a ~1280 cm⁻¹', true),
        b(1110, 0.78, 22, 'ν(O–CH₃)', 'Segunda banda C–O de éster metílico', true),
        b(710, 0.88, 22, 'φ(Ar)', 'Monosustituido')
      ]),
      mkFtir('ir_acetic_anhydride', 'Anhídrido Acético', 'C₄H₆O₃', 'Líquido reactivo', '1824 & 1752 (doblete C=O) / 1126 cm⁻¹', 'Dos bandas carbonílicas acopladas simétrica/asimétrica separadas por ~70 cm⁻¹ diagnósticas de anhídrido.', [
        b(1824, 0.94, 22, 'νₛ(C=O anhídrido)', 'Rama alta del doblete carbonílico (~1825 cm⁻¹)', true),
        b(1752, 0.92, 24, 'νₐₛ(C=O anhídrido)', 'Rama baja del doblete carbonílico (~1750 cm⁻¹)', true),
        b(1372, 0.54, 22, 'δₛ(CH₃)', 'Metilos'),
        b(1126, 0.90, 26, 'ν(C–O–C anh)', 'Estiramiento intenso del puente oxígeno', true),
        b(996, 0.74, 22, 'ν(C–C)', 'Modo acoplado')
      ]),
      mkFtir('ir_gamma_butyrolactone', 'γ-Butirolactona', 'C₄H₆O₂', 'Líquido', '1772 / 1168 / 1036 / 990 cm⁻¹', 'Lactona de 5 miembros: la tensión anular sube C=O a 1772 cm⁻¹.', [
        b(2918, 0.40, 32, 'ν(CH₂)', 'Metilenos anulares'),
        b(1772, 0.98, 24, 'ν(C=O γ-lactona)', 'Tensión del anillo 5 eleva C=O a ~1770 cm⁻¹', true),
        b(1168, 0.86, 26, 'ν(C(=O)–O)', 'Primera banda C–O', true),
        b(1036, 0.78, 24, 'ν(O–CH₂)', 'Segunda banda C–O')
      ]),
      mkFtir('ir_isoamyl_acetate', 'Acetato de Isoamilo (Aceite de Banana)', 'C₇H₁₄O₂', 'Líquido', '2960 / 1742 / 1240 / 1054 cm⁻¹', 'Éster frutal clásico.', [
        b(2960, 0.76, 36, 'ν(C–H sp³)', 'Cadena isoamilo'),
        b(1742, 0.95, 22, 'ν(C=O éster)', 'Carbonilo saturado', true),
        b(1368, 0.56, 22, 'δₛ(CH₃)', 'Isopropilo + acetilo'),
        b(1240, 0.94, 26, 'ν(C–CO–O)', 'Banda intensa acetato', true),
        b(1054, 0.72, 24, 'ν(O–C–C)', 'Éster alcohol primario')
      ]),
      mkFtir('ir_methyl_salicylate', 'Salicilato de Metilo (Aceite de Gaulteria)', 'C₈H₈O₃', 'Líquido aromático', '3185 / 1678 / 1304 / 1212 / 758 cm⁻¹', 'Puente intramolecular OH···O=C baja C=O del éster hasta 1678 cm⁻¹.', [
        b(3185, 0.72, 85, 'ν(O–H quelado)', 'Hidroxilo en anillo quelado de 6 miembros', true),
        b(2956, 0.34, 28, 'ν(OCH₃)', 'Éster metílico'),
        b(1678, 0.96, 24, 'ν(C=O quelado)', 'Desplazado a 1678 cm⁻¹ por puente de hidrógeno', true),
        b(1614, 0.64, 20, 'ν(C=C Ar)', 'Anillo orto'),
        b(1304, 0.86, 24, 'ν(C–O éster)', 'Estiramiento éster', true),
        b(1212, 0.82, 24, 'ν(C_Ar–O)', 'Enlace fenólico'),
        b(758, 0.84, 22, 'γ(Ar–H orto)', 'Sustitución 1,2')
      ]),
      mkFtir('ir_diethyl_phthalate', 'Ftalato de Dietilo', 'C₁₂H₁₄O₄', 'Líquido plastificante', '1726 / 1280 / 1122 / 1072 / 744 cm⁻¹', 'Diéster orto-aromático usado como plastificante.', [
        b(2982, 0.52, 34, 'ν(C–H sp³)', 'Grupos etilo'),
        b(1726, 0.96, 24, 'ν(C=O ftalato)', 'Dos carbonilos aromáticos', true),
        b(1280, 0.94, 26, 'ν(Ar–CO–O)', 'Fuerte banda éster', true),
        b(1122, 0.78, 22, 'ν(O–CH₂)', 'Éster etílico'),
        b(1072, 0.72, 22, 'β(Ar)', 'Anillo orto'),
        b(744, 0.76, 22, 'γ(Ar–H orto)', '4 H adyacentes')
      ]),
      mkFtir('ir_phthalic_anhydride', 'Anhídrido Ftálico', 'C₈H₄O₃', 'Sólido cristalino', '1852 & 1776 / 1256 / 906 / 712 cm⁻¹', 'Anhídrido cíclico de 5 miembros conjugado eleva el doblete C=O hasta 1852 / 1776 cm⁻¹.', [
        b(1852, 0.78, 22, 'νₛ(C=O anh 5)', 'Rama alta elevada por tensión + conjugación', true),
        b(1776, 0.96, 24, 'νₐₛ(C=O anh 5)', 'Rama baja sumamente intensa', true),
        b(1256, 0.86, 24, 'ν(C–O–C)', 'Puente cíclico'),
        b(906, 0.82, 22, 'ν(anillo anh)', 'Respiración heterociclo'),
        b(712, 0.84, 22, 'γ(Ar–H orto)', 'Anillo bencénico')
      ]),
      mkFtir('ir_vinyl_acetate', 'Acetato de Vinilo', 'C₄H₆O₂', 'Líquido', '1762 / 1648 / 1218 / 1140 cm⁻¹', 'Éster con grupo vinilo unido al oxígeno sube C=O a 1762 cm⁻¹.', [
        b(3095, 0.28, 24, 'ν(=CH₂)', 'Vinilo'),
        b(1762, 0.95, 22, 'ν(C=O vinil-éster)', 'Efecto inductivo eleva C=O a 1762 cm⁻¹', true),
        b(1648, 0.76, 20, 'ν(C=C vinilo)', 'Doble enlace activado por oxígeno', true),
        b(1218, 0.92, 26, 'ν(C–O)', 'Banda acetato'),
        b(1140, 0.80, 22, 'ν(O–C=)', 'Enlace vinil-oxígeno')
      ]),
      mkFtir('ir_tributyrin', 'Tributirina (Triglicérido Modelo)', 'C₁₅H₂₆O₆', 'Líquido aceitoso', '2965 / 1744 / 1252 / 1178 / 1098 cm⁻¹', 'Modelo de lípido triglicérido con tres funciones éster glicerídicas.', [
        b(2965, 0.72, 36, 'ν(C–H)', 'Cadenas propilo'),
        b(1744, 0.98, 24, 'ν(C=O triglicérido)', 'Tres carbonilos éster', true),
        b(1252, 0.76, 24, 'ν(C–O)', 'Éster glicerol'),
        b(1178, 0.88, 26, 'ν(C–CO–O)', 'Banda lipídica intensa en 1175 cm⁻¹', true),
        b(1098, 0.68, 24, 'ν(O–CH₂)', 'Esqueleto glicerilo')
      ])
    ]
  },

  // 8. AMINAS, AMIDAS Y NITRILOS
  {
    id: 'amines_amides_nitriles',
    name: 'Aminas, Amidas y Nitrilos',
    functionalSignature: 'Vibraciones N–H (1 o 2 picos), Amida I/II y triple enlace C≡N',
    diagnosticBands: 'ν(N–H) 3500–3200 cm⁻¹ · ν(C≡N) agudo ~2250 cm⁻¹ · Amida I ~1650 · Amida II ~1550 cm⁻¹',
    compounds: [
      mkFtir('ir_acetonitrile', 'Acetonitrilo', 'CH₃CN', 'Líquido grado HPLC', '2254 (agudo en ventana vacía) / 1444 / 1376 cm⁻¹', 'Banda estrecha y aguda característica de nitrilo alifático a 2254 cm⁻¹.', [
        b(3002, 0.36, 26, 'νₐₛ(CH₃)', 'Metilo α al nitrilo'),
        b(2944, 0.32, 24, 'νₛ(CH₃)', 'Metilo simétrico'),
        b(2254, 0.76, 18, 'ν(C≡N)', 'Pico agudo inconfundible en ventana 2200–2260 cm⁻¹', true),
        b(1444, 0.56, 22, 'δₐₛ(CH₃)', 'Deformación'),
        b(1376, 0.54, 20, 'δₛ(CH₃)', 'Flexión simétrica')
      ]),
      mkFtir('ir_aniline', 'Anilina', 'C₆H₅NH₂', 'Líquido oleoso', '3436 & 3356 (doblete NH₂) / 1620 / 1276 / 752 & 692 cm⁻¹', 'Amina primaria: exactamente DOS picos bien resueltos en 3436 y 3356 cm⁻¹ (νₐₛ y νₛ NH₂).', [
        b(3436, 0.72, 36, 'νₐₛ(N–H₂)', 'Rama alta del doblete de amina primaria', true),
        b(3356, 0.78, 36, 'νₛ(N–H₂)', 'Rama baja del doblete de amina primaria', true),
        b(1620, 0.80, 24, 'δ(NH₂)', 'Flexión tijera NH₂', true),
        b(1498, 0.78, 22, 'ν(C=C Ar)', 'Anillo fenilo'),
        b(1276, 0.74, 24, 'ν(C_Ar–N)', 'Estiramiento Ar–N conjugado', true),
        b(752, 0.82, 22, 'γ(Ar–H)', 'Monosustituido'),
        b(692, 0.76, 22, 'φ(Ar)', 'Anillo')
      ]),
      mkFtir('ir_diethylamide_nma', 'N-Metilacetamida (Amida 2° Modelo)', 'C₃H₇NO', 'Líquido', '3298 (1 pico N–H) / 1652 (Amida I) / 1564 (Amida II)', 'Prototipo de enlace peptídico secundario: 1 pico N–H + Amida I (C=O) + Amida II (N–H/C–N).', [
        b(3298, 0.82, 75, 'ν(N–H)', 'Un solo pico confirma amida/amina secundaria', true),
        b(3095, 0.40, 38, 'sobretono Amida II', 'Banda B de amida secundaria'),
        b(1652, 0.96, 28, 'Amida I ν(C=O)', 'Carbonilo amídico muy fuerte a 1652 cm⁻¹', true),
        b(1564, 0.86, 28, 'Amida II δ(N–H)+ν(C–N)', 'Segunda banda clave de amidas secundarias', true),
        b(1372, 0.48, 22, 'δ(CH₃)', 'Metilo'),
        b(1302, 0.52, 24, 'Amida III', 'Acoplamiento C–N')
      ]),
      mkFtir('ir_benzamide', 'Benzamida (Amida Primaria)', 'C₇H₇NO', 'Sólido cristalino', '3366 & 3172 (2 picos NH₂) / 1658 / 1624 / 1400 cm⁻¹', 'Amida primaria cristalina: dos bandas N–H más el doblete Amida I/II en 1658 y 1624 cm⁻¹.', [
        b(3366, 0.82, 48, 'νₐₛ(NH₂)', 'Rama alta amida primaria', true),
        b(3172, 0.80, 56, 'νₛ(NH₂)', 'Rama baja amida primaria', true),
        b(1658, 0.94, 24, 'Amida I ν(C=O)', 'Carbonilo conjugado', true),
        b(1624, 0.82, 24, 'Amida II δ(NH₂)', 'Flexión NH₂', true),
        b(1400, 0.68, 22, 'ν(C–N)', 'Estiramiento amídico'),
        b(702, 0.72, 24, 'φ(Ar)', 'Fenilo')
      ]),
      mkFtir('ir_benzonitrile', 'Benzonitrilo', 'C₇H₅N', 'Líquido', '3064 / 2229 (agudo) / 1490 / 758 & 688 cm⁻¹', 'Conjugación con el anillo reduce ν(C≡N) de 2254 a 2229 cm⁻¹ intensificándolo.', [
        b(3064, 0.30, 24, 'ν(Ar–H)', 'Aromático'),
        b(2229, 0.86, 18, 'ν(C≡N conj)', 'Nitrilo conjugado intenso a 2229 cm⁻¹', true),
        b(1598, 0.42, 20, 'ν(C=C Ar)', 'Esqueleto'),
        b(1490, 0.64, 20, 'ν(C=C Ar)', 'Anillo fenilo'),
        b(758, 0.88, 22, 'γ(Ar–H)', 'Monosustituido', true),
        b(688, 0.82, 22, 'φ(Ar)', 'Anillo')
      ]),
      mkFtir('ir_dmf', 'N,N-Dimetilformamida (DMF)', 'C₃H₇NO', 'Líquido dipolar', '2930 / 1676 (Amida I) / 1388 / 1094 cm⁻¹ (sin N–H)', 'Amida terciaria: carece totalmente de bandas entre 3500–3100 cm⁻¹ pero conserva Amida I intensa en 1676 cm⁻¹.', [
        b(2930, 0.54, 34, 'ν(CH₃)', 'Dos metilos en nitrógeno'),
        b(2860, 0.44, 32, 'ν(C–H formilo)', 'Hidrógeno del formilo'),
        b(1676, 0.98, 24, 'ν(C=O Amida 3°)', 'Carbonilo amídico terciario sin N–H ni Amida II', true),
        b(1388, 0.78, 22, 'δ(N(CH₃)₂)', 'Metilos en nitrógeno'),
        b(1094, 0.68, 24, 'ν(C–N)', 'Enlace amida')
      ]),
      mkFtir('ir_triethylamine', 'Trietilamina (Amina Terciaria)', 'C₆H₁₅N', 'Líquido amoniacal', '2970 / 2936 / 2796 (Bohlmann) / 1208 cm⁻¹', 'Sin señal alguna de N–H; presenta bandas C–H de Bohlmann en 2796 cm⁻¹ por par solitario trans-antiperiplanar.', [
        b(2970, 0.84, 36, 'νₐₛ(CH₃)', 'Grupos etilo'),
        b(2936, 0.74, 34, 'ν(CH₂)', 'Metilenos'),
        b(2796, 0.62, 28, 'ν(C–H Bohlmann)', 'Estiramiento α al par libre del nitrógeno', true),
        b(1456, 0.48, 24, 'δ(CH₂/CH₃)', 'Deformación'),
        b(1208, 0.66, 24, 'ν(C–N)', 'Estiramiento amina terciaria', true)
      ]),
      mkFtir('ir_diethylamine', 'Dietilamina (Amina Secundaria)', 'C₄H₁₁N', 'Líquido', '3282 (1 pico débil) / 2968 / 1136 / 728 cm⁻¹', 'Un solo pico N–H de intensidad moderada + flexión fuera de plano ancha en 728 cm⁻¹.', [
        b(3282, 0.38, 42, 'ν(N–H 2°)', 'Único pico N–H agudo/moderado', true),
        b(2968, 0.84, 36, 'ν(C–H)', 'Grupos etilo'),
        b(2815, 0.50, 28, 'ν(CH₂ α-N)', 'C–H adyacente a N'),
        b(1454, 0.46, 24, 'δ(CH₂)', 'Tijera'),
        b(1136, 0.68, 24, 'ν(C–N)', 'Amina secundaria', true),
        b(728, 0.56, 48, 'γ(N–H)', 'Flexión N–H ancha')
      ]),
      mkFtir('ir_butylamine', 'n-Butilamina (Amina Primaria)', 'C₄H₁₁N', 'Líquido', '3370 & 3290 (doblete) / 1602 / 810 cm⁻¹', 'Doble pico débil-moderado 3370/3290 + banda ancha de flexión NH₂ a 810 cm⁻¹.', [
        b(3370, 0.42, 42, 'νₐₛ(NH₂)', 'Rama alta NH₂', true),
        b(3290, 0.40, 44, 'νₛ(NH₂)', 'Rama baja NH₂', true),
        b(2958, 0.86, 36, 'ν(C–H)', 'Cadena butilo'),
        b(2872, 0.68, 32, 'νₛ(C–H)', 'Simétrico'),
        b(1602, 0.46, 28, 'δ(NH₂)', 'Tijera amina'),
        b(810, 0.62, 55, 'ω(NH₂)', 'Aleteo ancho clásico de amina primaria', true)
      ]),
      mkFtir('ir_acrylonitrile', 'Acrilonitrilo', 'C₃H₃N', 'Líquido monómero', '2230 / 1610 / 966 / 950 cm⁻¹', 'Monómero vinílico nitrílico con C≡N conjugado en 2230 cm⁻¹.', [
        b(3075, 0.34, 24, 'ν(=CH₂)', 'Vinilo'),
        b(2230, 0.78, 18, 'ν(C≡N conj)', 'Nitrilo α,β-insaturado a 2230 cm⁻¹', true),
        b(1610, 0.48, 22, 'ν(C=C)', 'Doble enlace conjugado'),
        b(966, 0.88, 24, 'γ(=CH)', 'Flexión vinilo intensa', true)
      ])
    ]
  },

  // 9. NITRO, HALUROS Y AZUFRADOS
  {
    id: 'nitro_halides_sulfur',
    name: 'Nitro, Haluros y Azufrados',
    functionalSignature: 'Doblete nitro 1550/1350 cm⁻¹, enlaces C–X bajos y S=O/S=O₂',
    diagnosticBands: 'ν(NO₂) 1550 & 1350 cm⁻¹ · ν(S=O) ~1050 cm⁻¹ · ν(C–Cl) 800–600 cm⁻¹',
    compounds: [
      mkFtir('ir_nitrobenzene', 'Nitrobenceno', 'C₆H₅NO₂', 'Líquido amarillo', '1526 & 1348 (doblete NO₂) / 852 / 704 cm⁻¹', 'Dos bandas fortísimas a 1526 y 1348 cm⁻¹ definen inequívocamente el grupo nitro conjugado.', [
        b(3082, 0.24, 24, 'ν(Ar–H)', 'Anillo aromático'),
        b(1526, 0.96, 24, 'νₐₛ(N=O)', 'Estiramiento asimétrico nitro fortísimo', true),
        b(1348, 0.94, 24, 'νₛ(N=O)', 'Estiramiento simétrico nitro fortísimo', true),
        b(852, 0.68, 20, 'ν(C–N)', 'Estiramiento C–NO₂', true),
        b(792, 0.64, 20, 'γ(Ar–H)', 'Flexión aromática'),
        b(704, 0.82, 22, 'δ(NO₂) + φ(Ar)', 'Torsión anular')
      ]),
      mkFtir('ir_nitromethane', 'Nitrometano', 'CH₃NO₂', 'Líquido', '1562 & 1378 (NO₂ alifático) / 918 / 656 cm⁻¹', 'Sin conjugación aromática, el doblete nitro sube a 1562 y 1378 cm⁻¹.', [
        b(3045, 0.24, 28, 'ν(CH₃)', 'Metilo α al nitro'),
        b(1562, 0.96, 26, 'νₐₛ(NO₂)', 'Nitro alifático asimétrico a ~1560', true),
        b(1378, 0.88, 24, 'νₛ(NO₂)', 'Nitro alifático simétrico a ~1380', true),
        b(918, 0.56, 22, 'ν(C–N)', 'Enlace C–NO₂'),
        b(656, 0.74, 24, 'δ(NO₂)', 'Tijera nitro')
      ]),
      mkFtir('ir_dmso', 'Dimetilsulfóxido (DMSO)', 'C₂H₆OS', 'Líquido polar', '2996 & 2914 / 1054 (ν S=O fortísima) / 954 / 698 cm⁻¹', 'Banda intensa y aguda de sulfóxido ν(S=O) en 1054 cm⁻¹.', [
        b(2996, 0.42, 28, 'νₐₛ(CH₃)', 'Metilos en azufre'),
        b(2914, 0.38, 28, 'νₛ(CH₃)', 'Simétrico'),
        b(1436, 0.58, 24, 'δₐₛ(CH₃)', 'Deformación metilo'),
        b(1308, 0.46, 22, 'δₛ(CH₃)', 'Simétrico'),
        b(1054, 0.96, 28, 'ν(S=O)', 'Estiramiento sulfóxido muy intenso y diagnóstico', true),
        b(954, 0.62, 24, 'ρ(CH₃)', 'Balanceo metilo'),
        b(698, 0.56, 22, 'νₐₛ(C–S)', 'Enlace C–S')
      ]),
      mkFtir('ir_dichloromethane', 'Diclorometano (CH₂Cl₂)', 'CH₂Cl₂', 'Líquido denso', '3054 / 1265 / 738 (νₐₛ C–Cl dominante)', 'Ventana casi totalmente limpia arriba de 1400 cm⁻¹ con absorción masiva C–Cl a 738 cm⁻¹.', [
        b(3054, 0.28, 24, 'νₐₛ(CH₂)', 'Desplazado arriba por dos cloros'),
        b(1265, 0.72, 22, 'ω(CH₂)', 'Aleteo metileno clorado', true),
        b(738, 0.98, 32, 'νₐₛ(C–Cl₂)', 'Estiramiento C–Cl extremadamente fuerte', true),
        b(704, 0.64, 24, 'νₛ(C–Cl₂)', 'Rama simétrica')
      ]),
      mkFtir('ir_chloroform', 'Cloroformo', 'CHCl₃', 'Líquido', '3019 / 1216 / 758 (muy fuerte) / 668 cm⁻¹', 'Un solo pico C–H agudo en 3019 + fortísimo triplete/banda CCl₃ en 758 cm⁻¹.', [
        b(3019, 0.34, 20, 'ν(C–H)', 'Único C–H clorado > 3000 cm⁻¹', true),
        b(1216, 0.74, 20, 'δ(C–H)', 'Flexión en plano H–CCl₃', true),
        b(758, 0.98, 32, 'νₐₛ(C–Cl₃)', 'Absorción tricloro saturante', true),
        b(668, 0.68, 22, 'νₛ(C–Cl₃)', 'Simétrico C–Cl')
      ]),
      mkFtir('ir_ccl4', 'Tetracloruro de Carbono (CCl₄)', 'CCl₄', 'Líquido', '786 (única banda masiva C–Cl) · Ventana 4000–900 limpia', 'Sin átomos de hidrógeno; transparente en toda la región de grupos funcionales (4000–950 cm⁻¹).', [
        b(1548, 0.14, 22, '2ν₃ combinación', 'Sobretono débil'),
        b(786, 0.98, 36, 'νₐₛ(C–Cl₄)', 'Banda única fundamental muy intensa por simetría Td', true)
      ]),
      mkFtir('ir_chlorobenzene', 'Clorobenceno', 'C₆H₅Cl', 'Líquido', '3070 / 1584 / 1478 / 1084 / 740 & 686 cm⁻¹', 'Haluro de arilo con banda sensible a sustituyentes Ar–Cl en 1084 cm⁻¹.', [
        b(3070, 0.30, 24, 'ν(Ar–H)', 'Aromático'),
        b(1584, 0.56, 20, 'ν(C=C Ar)', 'Anillo'),
        b(1478, 0.82, 20, 'ν(C=C Ar)', 'Esqueleto anular'),
        b(1084, 0.72, 20, 'ν(Ar–Cl)', 'Banda característica aril-cloro', true),
        b(740, 0.92, 22, 'γ(Ar–H)', 'Monosustituido', true),
        b(686, 0.82, 22, 'φ(Ar)', 'Anillo')
      ]),
      mkFtir('ir_dmso_sulfone', 'Dimetilsulfona (DMSO₂)', 'C₂H₆O₂S', 'Sólido cristalino', '1316 & 1142 (doblete SO₂) / 762 cm⁻¹', 'Las sulfonas exhiben un doblete muy intenso separado (~1316 y 1142 cm⁻¹).', [
        b(3018, 0.34, 26, 'ν(CH₃)', 'Metilos'),
        b(1316, 0.95, 24, 'νₐₛ(O=S=O)', 'Rama alta sulfona ~1320 cm⁻¹', true),
        b(1142, 0.94, 24, 'νₛ(O=S=O)', 'Rama baja sulfona ~1140 cm⁻¹', true),
        b(938, 0.52, 22, 'ρ(CH₃)', 'Balanceo'),
        b(762, 0.62, 22, 'ν(C–S)', 'Enlace carbono-azufre')
      ]),
      mkFtir('ir_ethanethiol', 'Etanotiol (Mercaptano)', 'C₂H₅SH', 'Líquido volátil', '2968 / 2566 (pico débil S–H diagnóstico) / 658 cm⁻¹', 'El enlace S–H produce un pico débil pero inconfundible en la zona vacía de 2566 cm⁻¹.', [
        b(2968, 0.76, 34, 'ν(C–H sp³)', 'Grupo etilo'),
        b(2566, 0.34, 28, 'ν(S–H)', 'Estiramiento tiol diagnóstico en ventana 2600–2550 cm⁻¹', true),
        b(1450, 0.48, 24, 'δ(CH₂/CH₃)', 'Alifático'),
        b(1268, 0.56, 22, 'ω(CH₂S)', 'Aleteo adyacente a S'),
        b(658, 0.52, 24, 'ν(C–S)', 'Enlace simple C–S', true)
      ]),
      mkFtir('ir_bromoform', '1-Bromobutano', 'C₄H₉Br', 'Líquido', '2960 / 2932 / 1462 / 646 & 564 cm⁻¹', 'Haluro de alquilo con estiramiento C–Br en baja frecuencia (< 650 cm⁻¹).', [
        b(2960, 0.78, 34, 'ν(CH₃)', 'Cadena butilo'),
        b(2932, 0.74, 34, 'ν(CH₂)', 'Metilenos'),
        b(1462, 0.48, 24, 'δ(CH₂)', 'Tijera'),
        b(1228, 0.52, 22, 'ω(CH₂Br)', 'Aleteo típico adyacente a bromo', true),
        b(646, 0.76, 24, 'ν(C–Br anti)', 'Confórmero anti C–Br', true),
        b(564, 0.62, 22, 'ν(C–Br gauche)', 'Confórmero gauche C–Br')
      ])
    ]
  },

  // 10. POLIMEROS INDUSTRIALES
  {
    id: 'polymers',
    name: 'Polímeros Industriales (ATR)',
    functionalSignature: 'Huellas maestras de reciclaje, empaques y plásticos técnicos',
    diagnosticBands: 'PE 2915/720 · PS 3026/698 · PET 1715/1240 · PMMA 1726/1145 · Nylon 3300/1635/1540 · PTFE 1205/1150',
    compounds: [
      mkFtir('ir_polystyrene', 'Poliestireno (PS - Estándar Calibración)', '-[CH₂–CH(Ph)]ₙ-', 'Película / Resina', '3026 / 2922 / 1601 / 1492 / 1452 / 756 / 698 cm⁻¹', 'Estándar mundial USP/NIST para verificar resolución y escala de número de onda (1601.4 cm⁻¹).', [
        b(3026, 0.46, 26, 'ν(Ar–H)', 'Hidrógenos del fenilo'),
        b(2922, 0.64, 34, 'ν(CH₂/CH)', 'Cadena principal'),
        b(1601, 0.52, 16, 'ν(C=C Ar ref)', 'Pico patrón NIST 1601.4 cm⁻¹', true),
        b(1492, 0.68, 20, 'ν(C=C Ar)', 'Banda aromática'),
        b(1452, 0.72, 22, 'δ(CH₂) + Ar', 'Banda intensa PS'),
        b(756, 0.84, 22, 'γ(Ar–H)', '5 H adyacentes', true),
        b(698, 0.94, 22, 'φ(Ar)', 'Banda más profunda del PS', true)
      ]),
      mkFtir('ir_hdpe', 'Polietileno de Alta Densidad (HDPE)', '-[CH₂–CH₂]ₙ-', 'Polímero rígido', '2915 / 2848 / 1472 & 1462 / 730 & 720 cm⁻¹', 'Cristalinidad ortorrómbica desdobla tanto la tijera (1472/1462) como el balanceo (730/720 cm⁻¹).', [
        b(2915, 0.96, 26, 'νₐₛ(CH₂)', 'Estiramiento metileno sumamente intenso', true),
        b(2848, 0.90, 22, 'νₛ(CH₂)', 'Estiramiento simétrico agudo', true),
        b(1472, 0.68, 16, 'δ(CH₂) cristal A', 'Rama cristalina 1472', true),
        b(1462, 0.56, 16, 'δ(CH₂) cristal B', 'Rama desdoblada 1462'),
        b(730, 0.62, 16, 'ρ(CH₂) cristal A', 'Desdoblamiento de fase cristalina'),
        b(720, 0.74, 16, 'ρ(CH₂) cristal B', 'Balanceo característico PE', true)
      ]),
      mkFtir('ir_polypropylene', 'Polipropileno Isotáctico (PP)', '-[CH₂–CH(CH₃)]ₙ-', 'Polímero', '2950 / 2918 / 1456 / 1376 (fuerte) / 1166 / 998 / 972 cm⁻¹', 'Un grupo metilo cada dos carbonos vuelve fortísima la banda en 1376 cm⁻¹ más dedos de isotacticidad.', [
        b(2950, 0.88, 30, 'νₐₛ(CH₃)', 'Abundantes metilos isotácticos', true),
        b(2918, 0.84, 28, 'νₐₛ(CH₂)', 'Metilenos de cadena'),
        b(2838, 0.62, 24, 'νₛ(CH₂)', 'Simétrico'),
        b(1456, 0.74, 22, 'δₐₛ(CH₃)', 'Flexión metilo'),
        b(1376, 0.86, 20, 'δₛ(CH₃)', 'Banda diagnóstica fortísima frente a PE', true),
        b(1166, 0.44, 18, 'γ(CH) isotáctico', 'Hélice isotáctica'),
        b(998, 0.46, 16, 'ρ(CH₃)', 'Banda de cristalinidad isotáctica', true),
        b(972, 0.44, 16, 'ν(C–C)', 'Hélice PP')
      ]),
      mkFtir('ir_pet', 'Polietileno Tereftalato (PET - Botellas)', '-[O–CH₂CH₂–O–CO–C₆H₄–CO]ₙ-', 'Poliéster termoplástico', '1714 / 1242 / 1096 / 872 / 723 cm⁻¹', 'Poliéster aromático: C=O en 1714 + enorme banda C–O en 1242 + 872/723 cm⁻¹ del tereftalato para.', [
        b(2968, 0.24, 30, 'ν(CH₂)', 'Puente etilenglicol débil'),
        b(1714, 0.96, 26, 'ν(C=O tereftalato)', 'Éster aromático muy intenso', true),
        b(1408, 0.52, 20, 'ν(Ar)', 'Anillo 1,4'),
        b(1242, 0.96, 30, 'ν(C–CO–O)', 'Estiramiento C–O tereftalato fortísimo', true),
        b(1096, 0.88, 28, 'ν(O–CH₂)', 'Éter/éster alifático', true),
        b(872, 0.52, 20, 'γ(Ar–H)', 'Anillo para'),
        b(723, 0.84, 22, 'γ(Ar–H + C=O)', 'Banda aguda definitiva del PET a 723 cm⁻¹', true)
      ]),
      mkFtir('ir_pvc', 'Policloruro de Vinilo (PVC)', '-[CH₂–CHCl]ₙ-', 'Polímero clorado', '2912 / 1426 / 1254 / 960 / 692 & 615 cm⁻¹', 'El metileno adyacente al cloro se desplaza a 1426 cm⁻¹ y C–Cl domina entre 690–610 cm⁻¹.', [
        b(2912, 0.62, 34, 'ν(C–H)', 'Cadena polivinílica'),
        b(1426, 0.72, 22, 'δ(CH₂–CHCl)', 'Tijera desplazada por cloro electronegativo', true),
        b(1254, 0.78, 24, 'δ(CH–Cl)', 'Flexión metino clorado', true),
        b(960, 0.56, 22, 'ρ(CH₂)', 'Balanceo de cadena'),
        b(692, 0.76, 26, 'ν(C–Cl)', 'Modo estiramiento C–Cl', true),
        b(615, 0.84, 28, 'ν(C–Cl sindio)', 'Estiramiento principal C–Cl en PVC', true)
      ]),
      mkFtir('ir_pmma', 'Polimetilmetacrilato (PMMA - Acrílico)', '-[CH₂–C(CH₃)(COOCH₃)]ₙ-', 'Plástico acrílico', '2952 / 1724 / 1240 / 1144 / 988 cm⁻¹', 'Poliéster metacrílico sin anillos aromáticos: C=O en 1724 y banda dupla 1240/1144 cm⁻¹.', [
        b(2952, 0.48, 34, 'ν(OCH₃/CH₃)', 'Metilos acrílicos'),
        b(1724, 0.96, 24, 'ν(C=O metacrilato)', 'Carbonilo éster saturado intenso', true),
        b(1448, 0.58, 24, 'δ(OCH₃)', 'Éster metílico'),
        b(1240, 0.78, 26, 'ν(C–CO–O)', 'Estiramiento acoplado'),
        b(1144, 0.94, 30, 'ν(C–O–C)', 'Banda C–O dominante del PMMA a 1144 cm⁻¹', true),
        b(988, 0.48, 22, 'ρ(OCH₃)', 'Balanceo éster')
      ]),
      mkFtir('ir_nylon66', 'Nylon 6,6 (Poliamida)', '-[NH–(CH₂)₆–NH–CO–(CH₂)₄–CO]ₙ-', 'Poliamida técnica', '3298 / 2932 / 1634 (Amida I) / 1536 (Amida II)', 'Espectro icónico de poliamida sintética con pico único N–H y bandas gemelas Amida I y II.', [
        b(3298, 0.84, 58, 'ν(N–H amida)', 'Banda N–H asociada en hoja β cristalina', true),
        b(2932, 0.68, 32, 'νₐₛ(CH₂)', 'Cadenas hexametileno'),
        b(2858, 0.52, 28, 'νₛ(CH₂)', 'Simétrico CH₂'),
        b(1634, 0.96, 26, 'Amida I ν(C=O)', 'Carbonilo amida cristalina', true),
        b(1536, 0.92, 26, 'Amida II δ(N–H)', 'Acoplamiento N–H / C–N', true),
        b(1276, 0.44, 22, 'Amida III', 'Flexión en plano'),
        b(688, 0.54, 38, 'Amida V γ(N–H)', 'Torsión fuera de plano')
      ]),
      mkFtir('ir_ptfe', 'Teflón (PTFE - Politetrafluoroetileno)', '-[CF₂–CF₂]ₙ-', 'Fluoropolímero', 'Ventana 4000–1300 limpia · Doblete C–F masivo 1205 & 1150 / 638 cm⁻¹', 'Completamente libre de C–H: línea base plana hasta 1300 cm⁻¹ donde estalla el doblete CF₂.', [
        b(1205, 0.98, 32, 'νₐₛ(CF₂)', 'Estiramiento C–F asimétrico saturante', true),
        b(1150, 0.96, 30, 'νₛ(CF₂)', 'Estiramiento C–F simétrico muy agudo', true),
        b(638, 0.72, 22, 'ω(CF₂)', 'Aleteo de cadena helicoidal fluorada', true),
        b(554, 0.56, 20, 'δ(CF₂)', 'Deformación tijera CF₂'),
        b(503, 0.64, 20, 'ρ(CF₂)', 'Balanceo CF₂')
      ]),
      mkFtir('ir_polycarbonate', 'Policarbonato (Bisfenol-A PC)', '-[O–Ph–C(CH₃)₂–Ph–O–CO]ₙ-', 'Plástico óptico', '1770 (carbonato) / 1504 / 1222 / 1162 / 828 cm⁻¹', 'El enlace carbonato aromático (–O–CO–O–) eleva ν(C=O) hasta 1770 cm⁻¹ junto a 828 cm⁻¹ (para).', [
        b(2968, 0.24, 30, 'ν(CH₃)', 'Grupo isopropilideno'),
        b(1770, 0.94, 24, 'ν(C=O carbonato)', 'Carbonato diarílico característico a ~1770 cm⁻¹', true),
        b(1504, 0.80, 20, 'ν(C=C Ar para)', 'Anillos bisfenol-A'),
        b(1222, 0.94, 30, 'ν(C–O carbonato)', 'Estiramiento asimétrico O–C–O', true),
        b(1162, 0.88, 26, 'ν(Ar–O)', 'Enlace fenoxilo'),
        b(828, 0.76, 20, 'γ(Ar–H para)', 'Sustitución 1,4 del bisfenol', true)
      ]),
      mkFtir('ir_pdms', 'Polidimetilsiloxano (PDMS Silicona)', '-[Si(CH₃)₂–O]ₙ-', 'Elastómero silicona', '2962 / 1258 (pico Si–CH₃) / 1080 & 1012 (Si–O–Si) / 792 cm⁻¹', 'Pico agudo tipo cuchilla en 1258 cm⁻¹ (Si–CH₃) y doblete siloxano ancho 1080/1012 cm⁻¹.', [
        b(2962, 0.56, 28, 'νₐₛ(CH₃–Si)', 'Metilos en silicio'),
        b(1258, 0.88, 16, 'δₛ(Si–CH₃)', 'Banda agudísima diagnóstica de siliconas a 1258 cm⁻¹', true),
        b(1080, 0.94, 38, 'νₐₛ(Si–O–Si A)', 'Primer componente banda siloxano', true),
        b(1012, 0.96, 36, 'νₐₛ(Si–O–Si B)', 'Segundo componente siloxano muy intenso', true),
        b(792, 0.92, 26, 'ρ(CH₃) + ν(Si–C)', 'Banda intensa en ~800 cm⁻¹', true)
      ])
    ]
  },

  // 11. FARMACOS Y BIOMOLECULAS
  {
    id: 'pharma_bio',
    name: 'Fármacos y Biomoléculas',
    functionalSignature: 'Identificación farmacopeica USP/EP de principios activos y proteínas',
    diagnosticBands: 'Aspirina 1752/1685 · Paracetamol 3322/1652 · Proteínas Amida I 1650/II 1545 · Carbohidratos 3350/1030',
    compounds: [
      mkFtir('ir_aspirin', 'Ácido Acetilsalicílico (Aspirina)', 'C₉H₈O₄', 'Tableta USP', '1752 (C=O éster) / 1685 (C=O ácido) / 1184 / 754 cm⁻¹', 'Dos picos carbonílicos resueltos: éster fenólico en 1752 y ácido carboxílico en 1685 cm⁻¹.', [
        b(2850, 0.58, 380, 'ν(O–H ácido)', 'Cola dimérica del carboxilo'),
        b(1752, 0.90, 22, 'ν(C=O acetil-éster)', 'Carbonilo del grupo acetilo en ~1752 cm⁻¹', true),
        b(1685, 0.94, 24, 'ν(C=O carboxilo)', 'Carbonilo ácido orto-sustituido a 1685 cm⁻¹', true),
        b(1605, 0.68, 20, 'ν(C=C Ar)', 'Anillo bencénico'),
        b(1304, 0.82, 24, 'ν(C–O ácido)', 'Carboxilo'),
        b(1184, 0.90, 24, 'ν(C–O éster)', 'Acetato fenólico', true),
        b(754, 0.78, 22, 'γ(Ar–H orto)', '4 H adyacentes')
      ]),
      mkFtir('ir_paracetamol', 'Paracetamol (Acetaminofén)', 'C₈H₉NO₂', 'Polvo cristalino', '3322 (N–H) / 3160 (O–H) / 1652 (Amida I) / 1562 (Amida II) / 1506 / 836 cm⁻¹', 'Combina hidroxilo fenólico, amida secundaria y sustitución para-aromática en 836 cm⁻¹.', [
        b(3322, 0.82, 34, 'ν(N–H amida)', 'Pico estrecho de amida secundaria cristalina', true),
        b(3160, 0.74, 95, 'ν(O–H fenol)', 'Hidroxilo fenólico asociado'),
        b(1652, 0.96, 22, 'Amida I ν(C=O)', 'Carbonilo acetanilida', true),
        b(1562, 0.88, 22, 'Amida II', 'Flexión N–H / C–N', true),
        b(1506, 0.84, 20, 'ν(C=C Ar)', 'Anillo para-sustituido'),
        b(1226, 0.82, 24, 'ν(C_Ar–O)', 'Fenol'),
        b(836, 0.78, 20, 'γ(Ar–H para)', '2 H adyacentes en posición 1,4', true)
      ]),
      mkFtir('ir_ibuprofen', 'Ibuprofeno', 'C₁₃H₁₈O₂', 'Polvo cristalino', '2954 / 1716 (C=O ácido) / 1230 / 935 / 778 cm⁻¹', 'Ácido propiónico para-isobutilfenilo: C=O en 1716 cm⁻¹ y fuertes bandas C–H alifáticas.', [
        b(2954, 0.86, 38, 'ν(C–H) + O–H', 'Isobutilo + sobreposición dímero ácido', true),
        b(1716, 0.98, 24, 'ν(C=O carboxilo)', 'Banda maestra del ibuprofeno en 1716 cm⁻¹', true),
        b(1508, 0.54, 20, 'ν(C=C Ar para)', 'Anillo 1,4'),
        b(1230, 0.76, 24, 'ν(C–O)', 'Carboxilo'),
        b(935, 0.48, 30, 'γ(O–H dímero)', 'Flexión ácido'),
        b(778, 0.74, 20, 'γ(Ar–H)', 'Sustitución para', true)
      ]),
      mkFtir('ir_caffeine', 'Cafeína Anhidra', 'C₈H₁₀N₄O₂', 'Sólido alcaloide', '2954 / 1698 & 1656 (dos C=O xantina) / 1548 / 744 cm⁻¹', 'Doble banda carbonílica en 1698 y 1656 cm⁻¹ sin grupos O–H ni N–H.', [
        b(2954, 0.36, 30, 'ν(N–CH₃)', 'Tres metilos en nitrógeno'),
        b(1698, 0.94, 22, 'ν(C₂=O xantina)', 'Carbonilo en C2 del anillo purínico', true),
        b(1656, 0.96, 22, 'ν(C₆=O xantina)', 'Carbonilo conjugado en C6', true),
        b(1548, 0.74, 22, 'ν(C=N / C=C)', 'Esqueleto imidazol-pirimidina'),
        b(1238, 0.58, 22, 'ν(C–N)', 'Anillo xantina'),
        b(744, 0.76, 20, 'γ(O=C–N)', 'Deformación fuera de plano')
      ]),
      mkFtir('ir_glucose', 'D-Glucosa (α-D-Glucopiranosa)', 'C₆H₁₂O₆', 'Sólido azúcar', '3340 (O–H múltiple) / 2918 / 1148 / 1078 / 1020 / 994 cm⁻¹', 'Bandas finas cristalinas en el bloque C–O–C / C–OH entre 1150 y 990 cm⁻¹ típicas de monosacáridos.', [
        b(3340, 0.94, 210, 'ν(O–H sacárido)', 'Cinco hidroxilos en red de puentes de H', true),
        b(2918, 0.50, 34, 'ν(C–H)', 'Anillo piranosa'),
        b(1366, 0.52, 26, 'δ(CH₂/O–H)', 'Deformaciones acopladas'),
        b(1148, 0.72, 24, 'ν(C–O)', 'Enlace glicosídico/anillo'),
        b(1078, 0.84, 24, 'ν(C–O)', 'Alcoholes secundarios', true),
        b(1020, 0.94, 24, 'ν(C–O–C / C–OH)', 'Banda más intensa de carbohidratos ~1025 cm⁻¹', true),
        b(994, 0.78, 20, 'δ(C₁–H α)', 'Vibración anomérica α')
      ]),
      mkFtir('ir_albumin_protein', 'Proteína Modelo (Albúmina BSA - Hélice α)', 'Polipéptido', 'Liofilizado biológico', '3290 (Amida A) / 1652 (Amida I hélice α) / 1542 (Amida II)', 'Espectro universal de proteínas cuya posición Amida I (1652 cm⁻¹) revela estructura secundaria hélice α.', [
        b(3290, 0.84, 95, 'Amida A ν(N–H)', 'Estiramiento peptídico N–H', true),
        b(2960, 0.46, 38, 'ν(C–H cadenas R)', 'Residuos aminoacídicos'),
        b(1652, 0.96, 36, 'Amida I (Hélice α)', 'Frecuencia 1652 cm⁻¹ indica predominio α-hélice', true),
        b(1542, 0.82, 34, 'Amida II', 'Flexión N–H acoplada a C–N', true),
        b(1396, 0.44, 28, 'νₛ(COO⁻)', 'Carboxilatos Asp/Glu'),
        b(1240, 0.40, 32, 'Amida III', 'Vibración peptídica')
      ]),
      mkFtir('ir_urea', 'Urea', 'CO(NH₂)₂', 'Sólido cristalino', '3436 & 3340 / 1678 (C=O) / 1624 / 1462 (ν C–N)', 'Diamida del ácido carbónico con bandas NH₂ muy intensas y C–N elevado a 1462 cm⁻¹.', [
        b(3436, 0.90, 44, 'νₐₛ(NH₂)', 'Dos grupos NH₂ simétricos', true),
        b(3340, 0.92, 48, 'νₛ(NH₂)', 'Rama simétrica NH₂', true),
        b(1678, 0.94, 26, 'ν(C=O)', 'Carbonilo ureado', true),
        b(1624, 0.88, 26, 'δ(NH₂)', 'Tijera NH₂'),
        b(1462, 0.86, 26, 'νₐₛ(N–C–N)', 'Estiramiento C–N con alto orden de enlace', true),
        b(1152, 0.48, 24, 'ρ(NH₂)', 'Balanceo')
      ]),
      mkFtir('ir_cholesterol', 'Colesterol', 'C₂₇H₄₆O', 'Sólido lipídico', '3420 / 2932 / 2866 / 1466 / 1376 / 1054 cm⁻¹', 'Esterol tetráciclico con un único hidroxilo C3 (3420 + C–O 1054) dominado por la cadena hidrocarbonada.', [
        b(3420, 0.62, 95, 'ν(O–H en C3)', 'Único hidroxilo secundario', true),
        b(2932, 0.96, 38, 'νₐₛ(CH₂/CH₃)', 'Esqueleto esteroidal C₂₇ intenso', true),
        b(2866, 0.82, 32, 'νₛ(CH₂)', 'Simétrico alifático'),
        b(1466, 0.68, 24, 'δ(CH₂/CH₃)', 'Tijera esteroidal'),
        b(1376, 0.56, 22, 'δₛ(CH₃)', 'Metilos angulares C18/C19'),
        b(1054, 0.64, 22, 'ν(C₃–OH)', 'Alcohol secundario ecuatorial', true)
      ]),
      mkFtir('ir_ascorbic_acid', 'Ácido Ascórbico (Vitamina C)', 'C₆H₈O₆', 'Polvo cristalino', '3524 & 3408 & 3312 (OH finos) / 1754 (lactona) / 1672 (enediol)', 'Múltiples bandas finas O–H más carbonilo de γ-lactona en 1754 y doble enlace enediol en 1672 cm⁻¹.', [
        b(3524, 0.72, 26, 'ν(O–H₁)', 'Hidroxilo cristalino específico', true),
        b(3408, 0.76, 28, 'ν(O–H₂)', 'Segundo hidroxilo'),
        b(3312, 0.82, 36, 'ν(O–H enediol)', 'Enediol conjugado'),
        b(1754, 0.90, 24, 'ν(C=O γ-lactona)', 'Lactona insaturada 5 miembros', true),
        b(1672, 0.96, 26, 'ν(C=C enediol)', 'Doble enlace polarizado muy intenso', true),
        b(1318, 0.78, 24, 'δ(C–OH)', 'Enol'),
        b(1024, 0.84, 24, 'ν(C–O)', 'Alcoholes laterales')
      ]),
      mkFtir('ir_naproxen_ir', 'Naproxeno', 'C₁₄H₁₄O₃', 'Polvo farmacéutico', '3180 (OH) / 1726 (C=O) / 1604 / 1264 / 1028 / 856 cm⁻¹', 'AINE naftalénico con éter metoxílico (1264/1028 cm⁻¹) y ácido propiónico (1726 cm⁻¹).', [
        b(3180, 0.64, 160, 'ν(O–H ácido)', 'Carboxilo asociado'),
        b(2938, 0.44, 34, 'ν(OCH₃/CH₃)', 'Metoxilo y α-metilo'),
        b(1726, 0.96, 24, 'ν(C=O ácido)', 'Carbonilo carboxílico', true),
        b(1604, 0.72, 22, 'ν(C=C naftaleno)', 'Esqueleto aromático'),
        b(1264, 0.84, 24, 'νₐₛ(Ar–O–CH₃)', 'Aril-éter asimétrico', true),
        b(1028, 0.76, 22, 'νₛ(Ar–O–CH₃)', 'Aril-éter simétrico'),
        b(856, 0.74, 22, 'γ(Ar–H)', 'Naftaleno 2,6-disustituido')
      ])
    ]
  },

  // 12. SOLVENTES, GASES Y MINERALES INORGANICOS
  {
    id: 'inorganics_solvents',
    name: 'Gases, Agua y Minerales',
    functionalSignature: 'Especies atmosféricas (H₂O, CO₂) e iones poliátomicos inorgánicos',
    diagnosticBands: 'CO₂ 2349 & 667 cm⁻¹ · CaCO₃ 1420/875 cm⁻¹ · SiO₂ 1080 cm⁻¹ · BaSO₄ 1120 cm⁻¹ · NO₃⁻ 1385 cm⁻¹',
    compounds: [
      mkFtir('ir_water_liquid', 'Agua Líquida (H₂O)', 'H₂O', 'Líquido universal', '3400 (masiva) / 2125 (comb) / 1644 (δ H–O–H)', 'Fuerte absorción en 3400 y 1644 cm⁻¹ que explica por qué debe secarse cualquier muestra acuosa o usar ATR/CaF₂.', [
        b(3400, 0.98, 290, 'νₐₛ/νₛ(O–H)', 'Banda inmensa saturante de red tetraédrica H₂O', true),
        b(2125, 0.34, 95, 'δ + libración', 'Banda de combinación característica del agua líquida'),
        b(1644, 0.82, 52, 'δ(H–O–H tijera)', 'Flexión en el plano del agua a 1644 cm⁻¹', true),
        b(680, 0.84, 180, 'libración H₂O', 'Rotación restringida muy ancha')
      ]),
      mkFtir('ir_co2_gas', 'Dióxido de Carbono Atmosférico (CO₂)', 'CO₂', 'Gas (Background)', '2360 & 2338 (doblete P-R ν₃) / 668 cm⁻¹ (δ₂)', 'Molécula lineal simétrica: estiramiento simétrico inactivo (Δμ=0); el asimétrico produce el famoso doblete en 2349 cm⁻¹.', [
        b(2361, 0.86, 16, 'ν₃ rama R (CO₂)', 'Rama rotovibracional alta del CO₂', true),
        b(2337, 0.82, 16, 'ν₃ rama P (CO₂)', 'Rama rotovibracional baja (hueco Q en 2349)', true),
        b(668, 0.78, 16, 'ν₂ δ(O=C=O)', 'Flexión degenerada aguda del CO₂', true)
      ]),
      mkFtir('ir_calcium_carbonate', 'Carbonato de Calcio (Calcita)', 'CaCO₃', 'Mineral sólido', '1422 (ancha CO₃²⁻) / 875 (aguda) / 712 cm⁻¹', 'Triángulo plano CO₃²⁻ genera banda ancha en 1422 más dos picos agudos en 875 y 712 cm⁻¹.', [
        b(1422, 0.96, 68, 'ν₃(CO₃²⁻ asim)', 'Estiramiento asimétrico muy ancho de carbonato', true),
        b(875, 0.86, 18, 'ν₂(CO₃²⁻ fuera plano)', 'Banda aguda característica de calcita en 875 cm⁻¹', true),
        b(712, 0.56, 16, 'ν₄(CO₃²⁻ plano)', 'Distingue calcita (712) de aragonito (700/713)')
      ]),
      mkFtir('ir_silica_quartz', 'Sílice Amorfa / Cuarzo (SiO₂)', 'SiO₂', 'Sólido mineral', '1085 (muy ancha Si–O–Si) / 798 / 468 cm⁻¹', 'Explica por qué los tubos o ventanas de vidrio/cuarzo son opacos al IR medio por debajo de 2000 cm⁻¹.', [
        b(1085, 0.98, 72, 'νₐₛ(Si–O–Si)', 'Banda silicato sumamente ancha e intensa a ~1085 cm⁻¹', true),
        b(798, 0.64, 28, 'νₛ(Si–O–Si)', 'Estiramiento simétrico del tetraedro SiO₄', true),
        b(468, 0.88, 36, 'δ(O–Si–O)', 'Flexión puente de sílice', true)
      ]),
      mkFtir('ir_barium_sulfate', 'Sulfato de Bario (Barita)', 'BaSO₄', 'Polvo mineral', '1188 & 1120 & 1080 (triplete SO₄²⁻) / 983 / 638 & 610 cm⁻¹', 'El ion tetraédrico sulfato se desdobla en múltiples picos agudos alrededor de 1120 y 620 cm⁻¹.', [
        b(1188, 0.88, 28, 'ν₃ₐ(SO₄²⁻)', 'Rama alta sulfato cristalino'),
        b(1120, 0.96, 30, 'ν₃b(SO₄²⁻)', 'Banda central muy fuerte del sulfato', true),
        b(1080, 0.90, 26, 'ν₃c(SO₄²⁻)', 'Tercera rama ν₃'),
        b(983, 0.56, 16, 'ν₁(SO₄²⁻)', 'Estiramiento simétrico activado en cristal'),
        b(638, 0.78, 18, 'ν₄ₐ(SO₄²⁻)', 'Doblete de deformación sulfato', true),
        b(610, 0.82, 18, 'ν₄b(SO₄²⁻)', 'Segunda rama en ~610 cm⁻¹')
      ]),
      mkFtir('ir_potassium_nitrate', 'Nitrato de Potasio (Salitre)', 'KNO₃', 'Sal cristalina', '1384 (muy fuerte NO₃⁻) / 825 cm⁻¹', 'Ion nitrato plano D₃h dominado por una banda intensísima y única en 1384 cm⁻¹.', [
        b(1764, 0.24, 22, 'ν₁ + ν₄', 'Sobretono diagnóstico de nitrato'),
        b(1384, 0.98, 42, 'ν₃(NO₃⁻)', 'Banda maestra intensísima de nitratos en 1384 cm⁻¹', true),
        b(825, 0.64, 18, 'ν₂(NO₃⁻)', 'Flexión fuera de plano del triángulo NO₃⁻', true)
      ]),
      mkFtir('ir_calcium_phosphate', 'Fosfato de Calcio (Hidroxiapatita)', 'Ca₁₀(PO₄)₆(OH)₂', 'Biocerámica ósea', '3570 (O–H fino) / 1090 & 1032 (PO₄³⁻) / 602 & 564 cm⁻¹', 'Componente mineral de huesos y dientes con doblete PO₄³⁻ en 602/564 y O–H libre en 3570 cm⁻¹.', [
        b(3570, 0.44, 20, 'ν(O–H canal)', 'Hidroxilo estructural agudo en 3570 cm⁻¹', true),
        b(1090, 0.84, 26, 'ν₃ₐ(PO₄³⁻)', 'Estiramiento fosfato'),
        b(1032, 0.98, 38, 'ν₃b(PO₄³⁻)', 'Banda fosfato más intensa a 1032 cm⁻¹', true),
        b(962, 0.42, 18, 'ν₁(PO₄³⁻)', 'Estiramiento simétrico'),
        b(602, 0.78, 20, 'ν₄ₐ(PO₄³⁻)', 'Doblete óseo característico', true),
        b(564, 0.84, 20, 'ν₄b(PO₄³⁻)', 'Rama baja del doblete fosfato')
      ]),
      mkFtir('ir_kaolin_clay', 'Caolinita (Arcilla Aluminosilicato)', 'Al₂Si₂O₅(OH)₄', 'Mineral arcilla', '3695 & 3620 (OH cristal) / 1032 / 914 (Al–OH) / 538 cm⁻¹', 'Cuatro bandas finas en 3695–3620 cm⁻¹ corresponden a grupos –OH superficiales sin puente de H en láminas de arcilla.', [
        b(3695, 0.78, 18, 'ν(O–H interno sup)', 'Hidroxilo laminar sin asociación a 3695', true),
        b(3652, 0.56, 18, 'ν(O–H inter)', 'Segundo pico O–H'),
        b(3620, 0.76, 18, 'ν(O–H interno)', 'Hidroxilo octaedro Al–OH interno', true),
        b(1032, 0.96, 36, 'ν(Si–O)', 'Lámina silicato'),
        b(914, 0.72, 22, 'δ(Al–Al–OH)', 'Flexión Al–OH diagnóstica', true),
        b(538, 0.78, 24, 'δ(Si–O–Al)', 'Enlace aluminosilicato')
      ]),
      mkFtir('ir_ammonium_sulfate', 'Sulfato de Amonio', '(NH₄)₂SO₄', 'Sal fertilizante', '3220 (ancha NH₄⁺) / 1418 (δ NH₄⁺) / 1098 (SO₄²⁻) / 618 cm⁻¹', 'Muestra simultáneamente bandas del catión amonio (3220, 1418) y del anión sulfato (1098, 618).', [
        b(3220, 0.90, 155, 'ν(N–H₄⁺)', 'Banda ancha de ion amonio', true),
        b(1418, 0.88, 34, 'ν₄(NH₄⁺)', 'Flexión triplemente degenerada del amonio a ~1420 cm⁻¹', true),
        b(1098, 0.96, 48, 'ν₃(SO₄²⁻)', 'Banda sulfato dominante', true),
        b(618, 0.78, 24, 'ν₄(SO₄²⁻)', 'Deformación sulfato')
      ]),
      mkFtir('ir_co_gas', 'Monóxido de Carbono (CO Gas Rotovibracional)', 'CO', 'Gas patrón', '2172 (R) & 2116 (P) cm⁻¹ (centro 2143 cm⁻¹)', 'Estructura rotovibracional P y R centrada en 2143 cm⁻¹ de molécula diatómica polar.', [
        b(2172, 0.84, 22, 'Rama R (ΔJ = +1)', 'Ala de alta energía rotovibracional del CO', true),
        b(2116, 0.80, 22, 'Rama P (ΔJ = -1)', 'Ala de baja energía (ausente Q en 2143 cm⁻¹)', true)
      ])
    ]
  }
];

export const ALL_FTIR_COMPOUNDS: FtirCompound[] = FTIR_GROUPS_DATA.flatMap(
  (g) => g.compounds
);

export interface FtirSpectrumPoint {
  wavenumber: number; // 4000 down to 400
  transmittancePct: number; // 0 to 100
  absorbance: number; // 0 to ~2.5
}

export interface FtirInterferogramPoint {
  opdCm: number; // -0.06 to +0.06 cm
  intensity: number; // normalized centered signal
}

export interface FtirSimulationResult {
  points: FtirSpectrumPoint[];
  interferogram: FtirInterferogramPoint[];
  opdMaxCm: number;
  snrEstimate: number;
  jStopMm: number;
  penetrationUmAt1000: number;
}

/**
 * Computes Mid-IR FTIR spectrum (4000 -> 400 cm^-1) and simulated cosine interferogram I(delta).
 */
export function computeFtirSimulation(
  compound: FtirCompound,
  resolutionCm: number, // 0.5, 2, 4, 8, 16
  scans: number, // 1 to 64
  samplingMode: 'atr_diamond' | 'kbr_pellet' | 'glass_window',
  displayMetric: 'transmittance' | 'absorbance'
): FtirSimulationResult {
  const opdMaxCm = 1 / Math.max(0.5, resolutionCm);
  // Jacquinot stop shrinks at finer spectral resolution
  const jStopMm = Math.max(1.5, Math.min(12, Math.sqrt(resolutionCm) * 3.2));
  const snrEstimate = Math.round(7500 * Math.sqrt(Math.max(1, scans)) * (jStopMm / 6.4));
  const noiseAmp = 0.022 / Math.sqrt(Math.max(1, scans));
  const penetrationUmAt1000 = samplingMode === 'atr_diamond' ? 2.01 : 10.0;

  // Compute 181 spectral samples from 4000 down to 400 cm^-1 (step 20 cm^-1 -> smooth & fast)
  const points: FtirSpectrumPoint[] = [];
  for (let wn = 4000; wn >= 400; wn -= 15) {
    let abs = 0.015; // subtle baseline

    if (samplingMode === 'glass_window' && wn < 3550) {
      // Ordinary glass completely absorbs Mid-IR below ~3550 cm^-1 (Si-O network cutoff)!
      abs = 2.6;
    } else {
      for (const band of compound.bands) {
        // Spectral resolution broadens narrow bands by convolution
        const effFwhm = Math.sqrt(band.fwhm * band.fwhm + Math.pow(resolutionCm * 2.1, 2));
        const sigma = effFwhm / 2.355;

        // Beer-Lambert intensity scaled down by resolution convolution & ATR d_p dependence
        const peakAtten = band.fwhm / effFwhm;
        // In Diamond ATR, penetration depth d_p ∝ lambda = 1/wn (relative to 1600 cm^-1)
        const atrWeight =
          samplingMode === 'atr_diamond'
            ? Math.max(0.42, Math.min(1.45, 1600 / Math.max(450, wn)))
            : 1.0;

        // Pseudo-Lorentzian-Gaussian profile (natural IR lineshape)
        const diff = wn - band.wavenumber;
        const lorentz = 1 / (1 + (diff * diff) / (sigma * sigma));
        const gauss = Math.exp(-(diff * diff) / (2 * sigma * sigma));
        const shape = 0.6 * lorentz + 0.4 * gauss;

        // Convert target intensity (0..0.98 dip) -> absorbance units (~0..1.7)
        const peakMaxAbs = -Math.log10(Math.max(0.02, 1 - band.intensity * 0.96));
        abs += peakMaxAbs * peakAtten * atrWeight * shape;
      }
    }

    // Add deterministic pseudo-thermal noise scaled by 1/sqrt(scans)
    const deterministicNoise =
      (Math.sin(wn * 0.47 + scans) * 0.6 + Math.cos(wn * 0.91) * 0.4) * noiseAmp;
    const finalAbs = Math.max(0.005, Math.min(2.6, abs + deterministicNoise));
    const transmittancePct = Math.max(0.2, Math.min(100, Math.pow(10, -finalAbs) * 100));

    points.push({
      wavenumber: wn,
      transmittancePct,
      absorbance: finalAbs,
    });
  }

  // Generate realistic cosine Interferogram I(delta) centered at ZPD (delta = 0)
  // Using key compound bands + broadband Globar envelope
  const interferogram: FtirInterferogramPoint[] = [];
  const halfSpan = Math.min(0.08, Math.max(0.025, 0.045));
  const nPts = 120;
  for (let i = 0; i <= nPts; i++) {
    const opdCm = -halfSpan + (i / nPts) * (2 * halfSpan);
    // Broadband Globar centerburst (sinc-like rapid decay around ZPD=0)
    const globarBurst = Math.exp(-Math.pow(opdCm * 220, 2)) * 1.0;
    // Sample cosine modulation weighted by key absorption bands
    let modulation = 0;
    compound.bands.slice(0, 5).forEach((band) => {
      const scaledWn = band.wavenumber * 0.08; // scaled for visible fringes on compact plot
      modulation += band.intensity * 0.14 * Math.cos(2 * Math.PI * scaledWn * opdCm) * Math.exp(-Math.abs(opdCm) * 28);
    });
    const rawIntensity = globarBurst + modulation + (Math.sin(opdCm * 1500) * noiseAmp * 0.8);
    interferogram.push({
      opdCm,
      intensity: rawIntensity,
    });
  }

  // Keep reference to displayMetric to avoid unused var if needed cleanly
  void displayMetric;

  return {
    points,
    interferogram,
    opdMaxCm,
    snrEstimate,
    jStopMm,
    penetrationUmAt1000,
  };
}
