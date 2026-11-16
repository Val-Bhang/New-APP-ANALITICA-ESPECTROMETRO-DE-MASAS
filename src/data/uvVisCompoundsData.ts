export interface UvVisBand {
  lambdaMax: number; // nm (190 - 800)
  epsilon: number; // L·mol⁻¹·cm⁻¹
  widthNm: number; // Gaussian sigma in nm
  transition: string; // e.g., 'π → π*', 'n → π*', 'd → d', 'TCML', 'σ → σ*'
  description: string;
  isPrimaryPeak?: boolean;
}

export interface UvVisCompound {
  id: string;
  name: string;
  formula: string;
  solvent: string;
  defaultConcMm: number; // mM for clean ~0.8 - 1.3 Abs display at 1 cm
  solutionColorHex: string; // Visual color of solution inside quartz cuvette
  description: string;
  lambdaMain: number;
  maxEpsilon: number;
  bands: UvVisBand[];
}

export interface UvVisGroupCategory {
  id: string;
  name: string;
  chromophoreType: string;
  spectralSignature: string;
  compounds: UvVisCompound[];
}

export const UVVIS_GROUPS_DATA: UvVisGroupCategory[] = [
  // 1. HIDROCARBUROS AROMÁTICOS Y POLINUCLEARES
  {
    id: 'aromatics',
    name: 'Aromáticos y Polinucleares (PAH)',
    chromophoreType: 'Anillos π conjugados (π → π*)',
    spectralSignature:
      'Bandas E₁/E₂ intensas en UV lejano (200–230 nm, ε > 10⁴) y banda B fina vibrónica alrededor de 254–380 nm que se desplaza al rojo conforme crecen los anillos fusionados.',
    compounds: [
      {
        id: 'uv_benzene',
        name: 'Benceno',
        formula: 'C₆H₆',
        solvent: 'Hexano',
        defaultConcMm: 0.5,
        solutionColorHex: '#F2F6F9',
        description: 'Presenta estructura fina vibrónica clásica ("dedos del benceno") alrededor de 254 nm (prohibida por simetría, ε ≈ 200) y banda intensa E₂ a 204 nm.',
        lambdaMain: 254,
        maxEpsilon: 7400,
        bands: [
          { lambdaMax: 204, epsilon: 7400, widthNm: 10, transition: 'π → π* (Banda E₂)', description: 'Transición permitida de alta intensidad del anillo bencénico.', isPrimaryPeak: false },
          { lambdaMax: 248, epsilon: 185, widthNm: 4, transition: 'π → π* (Vibrónico 1)', description: 'Sub-banda vibracional prohibida por simetría D₆h.' },
          { lambdaMax: 254, epsilon: 215, widthNm: 4, transition: 'π → π* (Banda B)', description: 'Máximo diagnóstico vibrónico característico a 254 nm.', isPrimaryPeak: true },
          { lambdaMax: 260, epsilon: 145, widthNm: 4, transition: 'π → π* (Vibrónico 3)', description: 'Acoplamiento vibracional anillo-respiración.' }
        ]
      },
      {
        id: 'uv_toluene',
        name: 'Tolueno',
        formula: 'C₇H₈',
        solvent: 'Hexano',
        defaultConcMm: 0.4,
        solutionColorHex: '#F2F6F9',
        description: 'El sustituyente metilo por hiperconjugación produce un ligero desplazamiento batocrómico (~7 nm) y rompe parcialmente la simetría.',
        lambdaMain: 261,
        maxEpsilon: 8000,
        bands: [
          { lambdaMax: 208, epsilon: 8000, widthNm: 11, transition: 'π → π* (Banda E₂)', description: 'Banda primaria desplazada por hiperconjugación del metilo.' },
          { lambdaMax: 261, epsilon: 280, widthNm: 7, transition: 'π → π* (Banda B)', description: 'Absorción bencenoide con estructura fina atenuada.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_naphthalene',
        name: 'Naftaleno',
        formula: 'C₁₀H₈',
        solvent: 'Etanol',
        defaultConcMm: 0.08,
        solutionColorHex: '#EFF5F8',
        description: 'Dos anillos aromáticos fusionados reducen la brecha HOMO-LUMO, desplazando las bandas hacia 275 y 312 nm.',
        lambdaMain: 275,
        maxEpsilon: 95000,
        bands: [
          { lambdaMax: 221, epsilon: 95000, widthNm: 10, transition: 'π → π* (Banda ¹Bb)', description: 'Transición polarizada a lo largo del eje largo muy intensa.' },
          { lambdaMax: 275, epsilon: 5600, widthNm: 12, transition: 'π → π* (Banda ¹La)', description: 'Banda media característica del sistema bicíclico.', isPrimaryPeak: true },
          { lambdaMax: 312, epsilon: 280, widthNm: 8, transition: 'π → π* (Banda ¹Lb)', description: 'Banda débil al inicio del UV cercano.' }
        ]
      },
      {
        id: 'uv_anthracene',
        name: 'Antraceno',
        formula: 'C₁₄H₁₀',
        solvent: 'Ciclohexano',
        defaultConcMm: 0.04,
        solutionColorHex: '#EEF6F8',
        description: 'Tres anillos lineales fusionados presentan progresión vibrónica nítida entre 320 y 376 nm justo al borde del visible.',
        lambdaMain: 375,
        maxEpsilon: 180000,
        bands: [
          { lambdaMax: 252, epsilon: 180000, widthNm: 9, transition: 'π → π* (Banda E)', description: 'Absorción UV extrema con ε = 1.8×10⁵.' },
          { lambdaMax: 338, epsilon: 5200, widthNm: 6, transition: 'π → π* (v=2)', description: 'Tercer dedo vibracional del antraceno.' },
          { lambdaMax: 356, epsilon: 7800, widthNm: 6, transition: 'π → π* (v=1)', description: 'Segundo dedo vibracional.' },
          { lambdaMax: 375, epsilon: 8500, widthNm: 6, transition: 'π → π* (v=0)', description: 'Transición 0→0 de menor energía cerca del violeta.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_phenanthrene',
        name: 'Fenantreno',
        formula: 'C₁₄H₁₀',
        solvent: 'Etanol',
        defaultConcMm: 0.05,
        solutionColorHex: '#F0F5F8',
        description: 'Isómero angular del antraceno; su menor longitud de conjugación lineal mantiene el pico principal más azul (293 nm).',
        lambdaMain: 293,
        maxEpsilon: 65000,
        bands: [
          { lambdaMax: 251, epsilon: 65000, widthNm: 10, transition: 'π → π* (Intensa)', description: 'Banda de alta absortividad del núcleo fenantrénico.' },
          { lambdaMax: 293, epsilon: 14500, widthNm: 9, transition: 'π → π* (Diagnóstica)', description: 'Banda característica usada para diferenciar del antraceno.', isPrimaryPeak: true },
          { lambdaMax: 330, epsilon: 310, widthNm: 7, transition: 'π → π* (Prohibida)', description: 'Banda débil de simetría restringida.' }
        ]
      },
      {
        id: 'uv_pyrene',
        name: 'Pireno',
        formula: 'C₁₆H₁₀',
        solvent: 'Etanol',
        defaultConcMm: 0.025,
        solutionColorHex: '#F3F7FA',
        description: 'Cuatro anillos condensados con absorción intensa en 241, 272 y 334 nm; empleado como sonda fluorescente de polaridad.',
        lambdaMain: 334,
        maxEpsilon: 72000,
        bands: [
          { lambdaMax: 241, epsilon: 72000, widthNm: 8, transition: 'π → π* (S₀ → S₃)', description: 'Banda de transición electrónica superior.' },
          { lambdaMax: 272, epsilon: 48000, widthNm: 8, transition: 'π → π* (S₀ → S₂)', description: 'Banda intermedia intensa.' },
          { lambdaMax: 334, epsilon: 51000, widthNm: 8, transition: 'π → π* (S₀ → S₁)', description: 'Banda principal de excitación del pireno.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_styrene',
        name: 'Estireno',
        formula: 'C₈H₈',
        solvent: 'Etanol',
        defaultConcMm: 0.08,
        solutionColorHex: '#F4F7F9',
        description: 'El doble enlace vinílico conjugado con el anillo fenilo eleva ε hasta 15,000 a 248 nm.',
        lambdaMain: 248,
        maxEpsilon: 15200,
        bands: [
          { lambdaMax: 248, epsilon: 15200, widthNm: 14, transition: 'π → π* (Conjugación vinil-arilo)', description: 'Banda K muy intensa por conjugación extendida.', isPrimaryPeak: true },
          { lambdaMax: 282, epsilon: 750, widthNm: 9, transition: 'π → π* (Banda B)', description: 'Hombro aromático secundario.' }
        ]
      },
      {
        id: 'uv_biphenyl',
        name: 'Bifenilo',
        formula: 'C₁₂H₁₀',
        solvent: 'Hexano',
        defaultConcMm: 0.06,
        solutionColorHex: '#F4F7F9',
        description: 'Dos anillos fenilo unidos por enlace sencillo con conjugación parcial y banda intensa ancha en 248 nm.',
        lambdaMain: 248,
        maxEpsilon: 16800,
        bands: [
          { lambdaMax: 207, epsilon: 41000, widthNm: 10, transition: 'π → π* (Banda E)', description: 'Absorción de alta energía en UV lejano.' },
          { lambdaMax: 248, epsilon: 16800, widthNm: 16, transition: 'π → π* (Conjugación inter-anular)', description: 'Banda ancha característica de sistemas bifenilo.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_phenol',
        name: 'Fenol',
        formula: 'C₆H₅OH',
        solvent: 'Agua (pH 7)',
        defaultConcMm: 0.45,
        solutionColorHex: '#F6F7FA',
        description: 'El auxocromo –OH dona pares electrónicos al anillo aumentando λ_max a 270 nm (y a 287 nm al desprotonarse a fenolato en medio básico).',
        lambdaMain: 270,
        maxEpsilon: 6200,
        bands: [
          { lambdaMax: 210, epsilon: 6200, widthNm: 11, transition: 'π → π* (Banda E₂)', description: 'Desplazada respecto al benceno por efecto auxocrómico.' },
          { lambdaMax: 270, epsilon: 1450, widthNm: 11, transition: 'π → π* (Banda B)', description: 'Pico cuantitativo estándar para cuantificación fenólica.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_aniline',
        name: 'Anilina',
        formula: 'C₆H₅NH₂',
        solvent: 'Agua (pH 7)',
        defaultConcMm: 0.35,
        solutionColorHex: '#F8F5EE',
        description: 'El grupo amino –NH₂ produce un fuerte efecto batocrómico e hipercrómico (230 y 280 nm) que desaparece en medio ácido al protonarse.',
        lambdaMain: 280,
        maxEpsilon: 8600,
        bands: [
          { lambdaMax: 230, epsilon: 8600, widthNm: 13, transition: 'π → π* (Transferencia n→π anillo)', description: 'Deslocalización del par libre del nitrógeno en el anillo.' },
          { lambdaMax: 280, epsilon: 1430, widthNm: 12, transition: 'π → π* (Banda B desplazada)', description: 'Banda sensible al pH (colapsa a 254 nm como anilinio).', isPrimaryPeak: true }
        ]
      }
    ]
  },

  // 2. CARBONILOS, ENONAS Y CETONAS (n -> pi* y pi -> pi*)
  {
    id: 'carbonyls',
    name: 'Carbonilos, Enonas y Cetonas',
    chromophoreType: 'Transiciones n → π* y π → π*',
    spectralSignature:
      'Doble firma clásica: banda intensa π → π* (210–255 nm, ε ~ 10⁴ en enonas conjugadas) más una banda débil n → π* prohibida por simetría a λ mayor (275–330 nm, ε ~ 15–100) con desplazamiento hipsocrómico en solventes polares.',
    compounds: [
      {
        id: 'uv_acetone',
        name: 'Acetona',
        formula: 'C₃H₆O',
        solvent: 'Hexano',
        defaultConcMm: 35,
        solutionColorHex: '#F5F7F9',
        description: 'Ejemplo didáctico clásico de transición prohibida n → π* a 279 nm (ε = 15) y π → π* por debajo de 195 nm.',
        lambdaMain: 279,
        maxEpsilon: 900,
        bands: [
          { lambdaMax: 195, epsilon: 900, widthNm: 8, transition: 'n → σ* / π → π*', description: 'Banda de borde en el límite del ultravioleta de cuarzo.' },
          { lambdaMax: 279, epsilon: 15, widthNm: 18, transition: 'n → π* (Carbonilo aislado)', description: 'Promoción de un electrón no enlazante del oxígeno al orbital π*.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_acrolein',
        name: 'Acroleína (Propenal)',
        formula: 'C₃H₄O',
        solvent: 'Etanol',
        defaultConcMm: 0.08,
        solutionColorHex: '#F5F8F9',
        description: 'La conjugación C=C–C=O reduce drásticamente la brecha HOMO-LUMO elevando la banda π → π* a 210 nm (ε = 11,500) y la n → π* a 315 nm.',
        lambdaMain: 210,
        maxEpsilon: 11500,
        bands: [
          { lambdaMax: 210, epsilon: 11500, widthNm: 13, transition: 'π → π* (Banda K conjugada)', description: 'Transición permitida intensa del sistema enona.', isPrimaryPeak: true },
          { lambdaMax: 315, epsilon: 26, widthNm: 18, transition: 'n → π* (Desplazada al rojo)', description: 'Banda débil desplazada por conjugación del carbonilo.' }
        ]
      },
      {
        id: 'uv_mesityl_oxide',
        name: 'Óxido de Mesitilo',
        formula: 'C₆H₁₀O',
        solvent: 'Etanol',
        defaultConcMm: 0.08,
        solutionColorHex: '#F7F8F5',
        description: 'Cetona α,β-insaturada empleada para demostrar desplazamiento solvatocrómico opuesto entre bandas π → π* (237 nm) y n → π* (312 nm).',
        lambdaMain: 237,
        maxEpsilon: 12600,
        bands: [
          { lambdaMax: 237, epsilon: 12600, widthNm: 14, transition: 'π → π* (Enona sustituida)', description: 'Se desplaza al rojo en solventes polares próticos.', isPrimaryPeak: true },
          { lambdaMax: 312, epsilon: 58, widthNm: 18, transition: 'n → π* (Par libre O)', description: 'Se desplaza al azul en solventes polares por puentes de hidrógeno.' }
        ]
      },
      {
        id: 'uv_benzophenone',
        name: 'Benzofenona',
        formula: 'C₁₃H₁₀O',
        solvent: 'Etanol',
        defaultConcMm: 0.05,
        solutionColorHex: '#FAF9F4',
        description: 'Dos anillos fenilo conjugados a un carbonilo central generan fuerte absorción a 253 nm y banda n → π* a 333 nm usada en filtros solares UV.',
        lambdaMain: 253,
        maxEpsilon: 18500,
        bands: [
          { lambdaMax: 253, epsilon: 18500, widthNm: 15, transition: 'π → π* (Diaril carbonilo)', description: 'Absorción principal protectora contra radiación UVB/UVA.', isPrimaryPeak: true },
          { lambdaMax: 333, epsilon: 160, widthNm: 19, transition: 'n → π* (Estado triplete eficiente)', description: 'Facilita cruce intersistema en fotoquímica orgánica.' }
        ]
      },
      {
        id: 'uv_acetophenone',
        name: 'Acetofenona',
        formula: 'C₈H₈O',
        solvent: 'Etanol',
        defaultConcMm: 0.07,
        solutionColorHex: '#F7F8F9',
        description: 'Carbonilo aromático conjugado con banda K intensa a 243 nm y banda R débil a 320 nm.',
        lambdaMain: 243,
        maxEpsilon: 12600,
        bands: [
          { lambdaMax: 243, epsilon: 12600, widthNm: 14, transition: 'π → π* (Transferencia anillo-C=O)', description: 'Banda principal de conjugación fenil-carbonilo.', isPrimaryPeak: true },
          { lambdaMax: 279, epsilon: 1050, widthNm: 11, transition: 'π → π* (Banda B aromática)', description: 'Banda bencenoide secundaria.' },
          { lambdaMax: 320, epsilon: 50, widthNm: 18, transition: 'n → π* (Carbonilo)', description: 'Transición prohibida de baja intensidad.' }
        ]
      },
      {
        id: 'uv_benzoquinone',
        name: 'p-Benzoquinona',
        formula: 'C₆H₄O₂',
        solvent: 'Hexano',
        defaultConcMm: 0.05,
        solutionColorHex: '#F5E79E',
        description: 'Sistema dicetónico conjugado cruzado con banda intensa a 242 nm y absorción n → π* extendida hasta 435 nm que le da color amarillo.',
        lambdaMain: 242,
        maxEpsilon: 24500,
        bands: [
          { lambdaMax: 242, epsilon: 24500, widthNm: 13, transition: 'π → π* (Quinonoide intensa)', description: 'Transición permitida de alta intensidad.', isPrimaryPeak: true },
          { lambdaMax: 285, epsilon: 400, widthNm: 15, transition: 'π → π* (Media)', description: 'Banda electrónica secundaria.' },
          { lambdaMax: 435, epsilon: 22, widthNm: 26, transition: 'n → π* (Visible azul)', description: 'Cola en el azul responsable del color amarillo brillante.' }
        ]
      },
      {
        id: 'uv_cyclohexanone',
        name: 'Ciclohexanona',
        formula: 'C₆H₁₀O',
        solvent: 'Hexano',
        defaultConcMm: 30,
        solutionColorHex: '#F6F7F9',
        description: 'Cetona cíclica saturada de seis miembros con transición n → π* pura centrada en 285 nm.',
        lambdaMain: 285,
        maxEpsilon: 20,
        bands: [
          { lambdaMax: 285, epsilon: 20, widthNm: 18, transition: 'n → π* (C=O cíclico)', description: 'Banda simétrica gaussiana de cetona saturada.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_sorbic_acid',
        name: 'Ácido Sórbico',
        formula: 'C₆H₈O₂',
        solvent: 'Agua (pH 4)',
        defaultConcMm: 0.04,
        solutionColorHex: '#F7F8FA',
        description: 'Ácido dienoico conjugado empleado como conservante alimentario; cuantificado directamente por su intensa banda a 254 nm.',
        lambdaMain: 254,
        maxEpsilon: 24800,
        bands: [
          { lambdaMax: 254, epsilon: 24800, widthNm: 16, transition: 'π → π* (Dieno-carboxilo)', description: 'Sistema conjugado C=C–C=C–C=O con ε ~ 25,000.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_coumarin',
        name: 'Cumarina',
        formula: 'C₉H₆O₂',
        solvent: 'Etanol',
        defaultConcMm: 0.08,
        solutionColorHex: '#F6F8F5',
        description: 'Benzopirona natural aromática con doble absorción UV diagnóstica en 274 nm y 311 nm.',
        lambdaMain: 274,
        maxEpsilon: 11200,
        bands: [
          { lambdaMax: 212, epsilon: 22000, widthNm: 12, transition: 'π → π* (Aromática)', description: 'Banda de alta energía.' },
          { lambdaMax: 274, epsilon: 11200, widthNm: 14, transition: 'π → π* (Banda B lactona)', description: 'Pico principal de cuantificación.', isPrimaryPeak: true },
          { lambdaMax: 311, epsilon: 5600, widthNm: 15, transition: 'π → π* (Conjugación pirona)', description: 'Banda de excitación cercana al visible.' }
        ]
      },
      {
        id: 'uv_camphor',
        name: 'Alcanfor',
        formula: 'C₁₀H₁₆O',
        solvent: 'Etanol',
        defaultConcMm: 22,
        solutionColorHex: '#F6F7F8',
        description: 'Cetona bicíclica terpénica con banda n → π* en 289 nm ligeramente incrementada por tensión anular.',
        lambdaMain: 289,
        maxEpsilon: 32,
        bands: [
          { lambdaMax: 289, epsilon: 32, widthNm: 17, transition: 'n → π* (Carbonilo bicíclico)', description: 'Absorción débil característica de cetonas quirales.', isPrimaryPeak: true }
        ]
      }
    ]
  },

  // 3. POLIENOS CONJUGADOS Y CAROTENOIDES
  {
    id: 'polyenes',
    name: 'Polienos y Carotenoides',
    chromophoreType: 'Conjugación extendida π → π* (Efecto Batocrómico)',
    spectralSignature:
      'Cada doble enlace conjugado adicional suma ~25–30 nm al λ_max y dispara ε por encima de 10⁵ L·mol⁻¹·cm⁻¹, empujando la absorción desde el UV (217 nm) hasta el azul-verde visible (450–505 nm).',
    compounds: [
      {
        id: 'uv_butadiene',
        name: '1,3-Butadieno',
        formula: 'C₄H₆',
        solvent: 'Hexano',
        defaultConcMm: 0.04,
        solutionColorHex: '#F4F7F9',
        description: 'El dieno conjugado más elemental (2 dobles enlaces); su transición HOMO → LUMO ocurre a 217 nm con ε = 21,000.',
        lambdaMain: 217,
        maxEpsilon: 21000,
        bands: [
          { lambdaMax: 217, epsilon: 21000, widthNm: 12, transition: 'π₂ → π₃* (Dieno s-trans)', description: 'Transición permitida fundamental de dos dobles enlaces conjugados.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_hexatriene',
        name: '1,3,5-Hexatrieno',
        formula: 'C₆H₈',
        solvent: 'Isooctano',
        defaultConcMm: 0.025,
        solutionColorHex: '#F4F7F9',
        description: 'Tres dobles enlaces conjugados desplazan el máximo hasta 258 nm con estructura fina de trieno.',
        lambdaMain: 258,
        maxEpsilon: 42000,
        bands: [
          { lambdaMax: 247, epsilon: 34000, widthNm: 7, transition: 'π → π* (Vibrónico v=1)', description: 'Hombro vibracional de alta energía.' },
          { lambdaMax: 258, epsilon: 42000, widthNm: 7, transition: 'π₃ → π₄* (Trieno)', description: 'Máximo principal con ε > 40,000.', isPrimaryPeak: true },
          { lambdaMax: 268, epsilon: 36000, widthNm: 6, transition: 'π → π* (Vibrónico v=0)', description: 'Banda 0→0 característica de polienos rígidos.' }
        ]
      },
      {
        id: 'uv_beta_carotene',
        name: 'β-Caroteno',
        formula: 'C₄₀H₅₆',
        solvent: 'Hexano',
        defaultConcMm: 0.008,
        solutionColorHex: '#F28B30',
        description: '11 dobles enlaces conjugados comprimen la brecha HOMO-LUMO al azul-violeta (450 nm, ε = 139,000), produciendo color naranja intenso.',
        lambdaMain: 450,
        maxEpsilon: 139000,
        bands: [
          { lambdaMax: 425, epsilon: 98000, widthNm: 13, transition: 'π → π* (Hombro v=2)', description: 'Transición vibrónica en el violeta.' },
          { lambdaMax: 450, epsilon: 139000, widthNm: 14, transition: 'π → π* (Banda principal azul)', description: 'Absorbe luz azul dando color naranja complementario.', isPrimaryPeak: true },
          { lambdaMax: 478, epsilon: 121000, widthNm: 13, transition: 'π → π* (Banda 0→0)', description: 'Tercer pico de la tríada carotenoide.' }
        ]
      },
      {
        id: 'uv_lycopene',
        name: 'Licopeno',
        formula: 'C₄₀H₅₆',
        solvent: 'Hexano',
        defaultConcMm: 0.006,
        solutionColorHex: '#D84339',
        description: 'Los 11 dobles enlaces son totalmente coplanares (cadena acíclica), desplazando la absorción a 472 y 502 nm y generando el rojo tomate.',
        lambdaMain: 472,
        maxEpsilon: 185000,
        bands: [
          { lambdaMax: 446, epsilon: 125000, widthNm: 12, transition: 'π → π* (v=2)', description: 'Absorción azul.' },
          { lambdaMax: 472, epsilon: 185000, widthNm: 12, transition: 'π → π* (v=1 Principal)', description: 'Mayor absortividad molar por coplanaridad total.', isPrimaryPeak: true },
          { lambdaMax: 502, epsilon: 162000, widthNm: 12, transition: 'π → π* (v=0 Verde)', description: 'Absorbe verde-cian produciendo color rojo intenso.' }
        ]
      },
      {
        id: 'uv_retinol',
        name: 'Vitamina A (todo-trans-Retinol)',
        formula: 'C₂₀H₃₀O',
        solvent: 'Etanol',
        defaultConcMm: 0.02,
        solutionColorHex: '#FAF3D4',
        description: 'Pentaeno conjugado (5 enlaces dobles) con máximo característico en el UVA a 325 nm (ε = 52,000).',
        lambdaMain: 325,
        maxEpsilon: 52000,
        bands: [
          { lambdaMax: 325, epsilon: 52000, widthNm: 22, transition: 'π → π* (Pentaeno conjugado)', description: 'Banda estándar de cuantificación farmacopeica de vitamina A.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_retinal',
        name: 'todo-trans-Retinal',
        formula: 'C₂₀H₂₈O',
        solvent: 'Etanol',
        defaultConcMm: 0.022,
        solutionColorHex: '#F3C94D',
        description: 'Cromóforo visual de la rodopsina; la adición de un grupo aldehído conjugado corre el máximo a 381 nm (amarillo pálido).',
        lambdaMain: 381,
        maxEpsilon: 43400,
        bands: [
          { lambdaMax: 250, epsilon: 8500, widthNm: 15, transition: 'π → π* (Secundaria)', description: 'Banda UV corta.' },
          { lambdaMax: 381, epsilon: 43400, widthNm: 26, transition: 'π → π* (Polienal conjugado)', description: 'Base fotoquímica de la visión humana.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_astaxanthin',
        name: 'Astaxantina',
        formula: 'C₄₀H₅₂O₄',
        solvent: 'Acetona',
        defaultConcMm: 0.008,
        solutionColorHex: '#D9513E',
        description: 'Cetocarotenoide con 13 centros conjugados que fusiona los tres dedos vibracionales en una banda ancha simétrica a 478 nm.',
        lambdaMain: 478,
        maxEpsilon: 125000,
        bands: [
          { lambdaMax: 478, epsilon: 125000, widthNm: 34, transition: 'π → π* (Cetopolieno)', description: 'Banda ancha sin estructura fina por interacción carbonilo.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_curcumin',
        name: 'Curcumina',
        formula: 'C₂₁H₂₀O₆',
        solvent: 'Etanol',
        defaultConcMm: 0.018,
        solutionColorHex: '#EBBD34',
        description: 'Diarilheptanoide enólico conjugado con intensa banda en 425 nm responsable de su color amarillo cúrcuma.',
        lambdaMain: 425,
        maxEpsilon: 55000,
        bands: [
          { lambdaMax: 263, epsilon: 11200, widthNm: 15, transition: 'π → π* (Anillos fenólicos)', description: 'Banda UV de los restos guayacol.' },
          { lambdaMax: 425, epsilon: 55000, widthNm: 28, transition: 'π → π* (Cromóforo ceto-enol)', description: 'Absorbe en el violeta produciendo amarillo brillante.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_lutein',
        name: 'Luteína (Xantofila)',
        formula: 'C₄₀H₅₆O₂',
        solvent: 'Etanol',
        defaultConcMm: 0.007,
        solutionColorHex: '#F3BD33',
        description: 'Pigmento macular con 10 dobles enlaces conjugados; absorbe luz azul nociva entre 422 y 474 nm.',
        lambdaMain: 445,
        maxEpsilon: 145000,
        bands: [
          { lambdaMax: 422, epsilon: 98000, widthNm: 12, transition: 'π → π* (v=2)', description: 'Hombro violeta.' },
          { lambdaMax: 445, epsilon: 145000, widthNm: 13, transition: 'π → π* (v=1 Máximo)', description: 'Pico principal del pigmento macular.', isPrimaryPeak: true },
          { lambdaMax: 474, epsilon: 130000, widthNm: 12, transition: 'π → π* (v=0)', description: 'Banda de menor energía en el azul.' }
        ]
      },
      {
        id: 'uv_crocin',
        name: 'Crocina (Azafrán)',
        formula: 'C₄₄H₆₄O₂₄',
        solvent: 'Agua',
        defaultConcMm: 0.01,
        solutionColorHex: '#ECA427',
        description: 'Carotenoide hidrosoluble glucosilado con doblete intenso en 440 y 464 nm.',
        lambdaMain: 440,
        maxEpsilon: 89000,
        bands: [
          { lambdaMax: 257, epsilon: 9800, widthNm: 14, transition: 'π → π* (Ésteres)', description: 'Banda UV menor.' },
          { lambdaMax: 440, epsilon: 89000, widthNm: 15, transition: 'π → π* (v=1 Principal)', description: 'Pico diagnóstico de calidad ISO 3632 del azafrán.', isPrimaryPeak: true },
          { lambdaMax: 464, epsilon: 81000, widthNm: 13, transition: 'π → π* (v=0)', description: 'Hombro batocrómico característico.' }
        ]
      }
    ]
  },

  // 4. COLORANTES AZO E INDICADORES ACIDO-BASE
  {
    id: 'dyes',
    name: 'Colorantes e Indicadores Ácido-Base',
    chromophoreType: 'Sistemas Azo (–N=N–) y Triarilmetanos',
    spectralSignature:
      'Bandas de transferencia de carga intramoleculares extremadamente intensas en el rango visible (420–665 nm, ε = 20,000–95,000) que cambian abruptamente de λ_max con el pH (equilibrio ácido/base).',
    compounds: [
      {
        id: 'uv_methyl_orange_acid',
        name: 'Naranja de Metilo (Medio Ácido pH 2)',
        formula: 'C₁₄H₁₅N₃O₃S',
        solvent: 'Agua pH 2',
        defaultConcMm: 0.025,
        solutionColorHex: '#D83B48',
        description: 'Forma zwitteriónica protonada con estructura quinonoide extendida que absorbe a 506 nm (verde) y luce rojo intenso.',
        lambdaMain: 506,
        maxEpsilon: 38500,
        bands: [
          { lambdaMax: 274, epsilon: 9200, widthNm: 16, transition: 'π → π* (Aromática)', description: 'Anillos bencénicos sustituidos.' },
          { lambdaMax: 506, epsilon: 38500, widthNm: 32, transition: 'π → π* (Quinonoide protonado)', description: 'Banda visible que produce color rojo en pH < 3.1.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_methyl_orange_base',
        name: 'Naranja de Metilo (Medio Básico pH 7)',
        formula: 'C₁₄H₁₄N₃NaO₃S',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.035,
        solutionColorHex: '#F3B43F',
        description: 'Forma azo desprotonada con menor deslocalización quinonoide; el máximo salta hipsocrómicamente de 506 nm a 464 nm (amarillo-naranja).',
        lambdaMain: 464,
        maxEpsilon: 26800,
        bands: [
          { lambdaMax: 272, epsilon: 11000, widthNm: 16, transition: 'π → π* (Aromática)', description: 'Banda UV de anillos.' },
          { lambdaMax: 464, epsilon: 26800, widthNm: 34, transition: 'π → π* (Sistema azo neutro)', description: 'Absorbe en el azul produciendo color amarillo-naranja.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_bromothymol_blue',
        name: 'Azul de Bromotimol (pH 8.5)',
        formula: 'C₂₇H₂₇Br₂NaO₅S',
        solvent: 'Tampón pH 8.5',
        defaultConcMm: 0.025,
        solutionColorHex: '#256EA8',
        description: 'Forma dianiónica sulfonftaleína; absorbe fuertemente en rojo-naranja a 616 nm apareciendo azul profundo.',
        lambdaMain: 616,
        maxEpsilon: 38000,
        bands: [
          { lambdaMax: 308, epsilon: 11200, widthNm: 18, transition: 'π → π* (Fenólico)', description: 'Banda UV secundaria.' },
          { lambdaMax: 432, epsilon: 4200, widthNm: 22, transition: 'π → π* (Equilibrio residual)', description: 'Traza de forma neutra amarilla.' },
          { lambdaMax: 616, epsilon: 38000, widthNm: 28, transition: 'π → π* (Dianión conjugado)', description: 'Banda en el rojo-naranja que genera el color azul intenso.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_phenolphthalein',
        name: 'Fenolftaleína (Forma Dianión pH 10)',
        formula: 'C₂₀H₁₂O₄²⁻',
        solvent: 'NaOH 0.01 M',
        defaultConcMm: 0.03,
        solutionColorHex: '#D84B84',
        description: 'La apertura del anillo lactónico genera un sistema triarilmetano plano con banda en verde a 553 nm (color magenta/fucsia).',
        lambdaMain: 553,
        maxEpsilon: 33000,
        bands: [
          { lambdaMax: 295, epsilon: 10500, widthNm: 18, transition: 'π → π* (Aromática)', description: 'Anillos fenólicos.' },
          { lambdaMax: 375, epsilon: 6800, widthNm: 24, transition: 'π → π* (Intermedia)', description: 'Transición secundaria del sistema quinonoide.' },
          { lambdaMax: 553, epsilon: 33000, widthNm: 25, transition: 'π → π* (Triarilmetano)', description: 'Absorbe verde produciendo color fucsia clásico de valoración.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_methylene_blue',
        name: 'Azul de Metileno',
        formula: 'C₁₆H₁₈ClN₃S',
        solvent: 'Agua',
        defaultConcMm: 0.012,
        solutionColorHex: '#1B65A7',
        description: 'Colorante tiazínico catiónico con absorción extraordinariamente intensa en el rojo a 664 nm (ε = 85,000) y hombro dímero en 612 nm.',
        lambdaMain: 664,
        maxEpsilon: 85000,
        bands: [
          { lambdaMax: 292, epsilon: 41000, widthNm: 15, transition: 'π → π* (Fenotiazina UV)', description: 'Banda ultravioleta aromática.' },
          { lambdaMax: 612, epsilon: 39000, widthNm: 18, transition: 'π → π* (Hombro vibrónico/dímero)', description: 'Hombro característico sensible a agregación.' },
          { lambdaMax: 664, epsilon: 85000, widthNm: 20, transition: 'π → π* (Monómero rojo)', description: 'Pico principal en el rojo que da azul cian intenso.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_rhodamine_b',
        name: 'Rodamina B',
        formula: 'C₂₈H₃₁ClN₂O₃',
        solvent: 'Etanol',
        defaultConcMm: 0.01,
        solutionColorHex: '#DF3C6D',
        description: 'Colorante xanténico fluorescente con ε > 106,000 a 543 nm usado como patrón fotométrico y trazador hidrológico.',
        lambdaMain: 543,
        maxEpsilon: 106000,
        bands: [
          { lambdaMax: 258, epsilon: 28000, widthNm: 15, transition: 'π → π* (UV)', description: 'Banda UV de anillos xanteno.' },
          { lambdaMax: 354, epsilon: 11000, widthNm: 16, transition: 'π → π* (S₀ → S₂)', description: 'Transición al segundo estado excitado.' },
          { lambdaMax: 543, epsilon: 106000, widthNm: 19, transition: 'π → π* (S₀ → S₁ Xanteno)', description: 'Banda agudísima en el verde (rosa neón brillante).', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_fluorescein',
        name: 'Fluoresceína (Dianión pH 9)',
        formula: 'C₂₀H₁₀O₅²⁻',
        solvent: 'Tampón pH 9',
        defaultConcMm: 0.012,
        solutionColorHex: '#92D04E',
        description: 'Absorbe intensamente en azul-cian a 490 nm (ε = 78,000) y reemite luz verde altamente eficiente.',
        lambdaMain: 490,
        maxEpsilon: 78000,
        bands: [
          { lambdaMax: 238, epsilon: 42000, widthNm: 16, transition: 'π → π* (UV)', description: 'Banda UV de alta energía.' },
          { lambdaMax: 490, epsilon: 78000, widthNm: 17, transition: 'π → π* (Dianión xanteno)', description: 'Máximo diagnóstico a 490 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_congo_red',
        name: 'Rojo Congo',
        formula: 'C₃₂H₂₂N₆Na₂O₆S₂',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.02,
        solutionColorHex: '#C83737',
        description: 'Colorante bis-azo simétrico usado en tinción amiloide; absorbe a 498 nm en el azul-verde apareciendo rojo.',
        lambdaMain: 498,
        maxEpsilon: 45000,
        bands: [
          { lambdaMax: 342, epsilon: 21000, widthNm: 22, transition: 'π → π* (Bifenilo central)', description: 'Banda ultravioleta cercana.' },
          { lambdaMax: 498, epsilon: 45000, widthNm: 36, transition: 'π → π* (Sistema bis-azo)', description: 'Banda ancha centrada en 498 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_tartrazine',
        name: 'Tartrazina (Amarillo #5)',
        formula: 'C₁₆H₉N₄Na₃O₉S₂',
        solvent: 'Agua',
        defaultConcMm: 0.035,
        solutionColorHex: '#F3D02E',
        description: 'Colorante pirazolona-azo alimentario cuantificado exactamente a 426 nm (ε = 28,000).',
        lambdaMain: 426,
        maxEpsilon: 28000,
        bands: [
          { lambdaMax: 257, epsilon: 18500, widthNm: 16, transition: 'π → π* (Aromática)', description: 'Anillos sulfonados.' },
          { lambdaMax: 426, epsilon: 28000, widthNm: 28, transition: 'π → π* (Cromóforo azo-pirazolona)', description: 'Absorbe en el violeta generando amarillo limón puro.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_methyl_red',
        name: 'Rojo de Metilo (Forma Ácida pH 3)',
        formula: 'C₁₅H₁₅N₃O₂',
        solvent: 'Etanol-Agua pH 3',
        defaultConcMm: 0.025,
        solutionColorHex: '#CC3344',
        description: 'Indicador azo orto-carboxilado con pico en 524 nm en medio ácido y desplazamiento a 430 nm en medio básico.',
        lambdaMain: 524,
        maxEpsilon: 37000,
        bands: [
          { lambdaMax: 280, epsilon: 9500, widthNm: 16, transition: 'π → π* (Arilo)', description: 'Absorción UV.' },
          { lambdaMax: 524, epsilon: 37000, widthNm: 30, transition: 'π → π* (Quinonoide ácido)', description: 'Absorbe en la banda verde produciendo rojo rubí.', isPrimaryPeak: true }
        ]
      }
    ]
  },

  // 5. COMPLEJOS DE METALES DE TRANSICIÓN (d-d y TCML)
  {
    id: 'metals',
    name: 'Complejos de Metales de Transición',
    chromophoreType: 'Transiciones d → d y Transferencia de Carga',
    spectralSignature:
      'Dos regímenes opuestos: transiciones d→d prohibidas por Laporte son anchas y débiles (ε = 5–200, colores pastel como Cu²⁺ o Co²⁺), mientras que las Transferencias de Carga (TC) como MnO₄⁻ o Ferroína son ultra intensas (ε = 2,000–25,000).',
    compounds: [
      {
        id: 'uv_kmno4',
        name: 'Permanganato de Potasio (KMnO₄)',
        formula: 'KMnO₄',
        solvent: 'Agua',
        defaultConcMm: 0.4,
        solutionColorHex: '#8E2578',
        description: 'Mn(VII) d⁰ sin electrones d: su color violeta intensísimo proviene de Transferencia de Carga Ligando→Metal (O→Mn) con 5 sub-picos vibrónicos entre 505 y 568 nm.',
        lambdaMain: 525,
        maxEpsilon: 2450,
        bands: [
          { lambdaMax: 310, epsilon: 1850, widthNm: 22, transition: 'TCLM (O 2p → Mn 3d)', description: 'Banda de transferencia de carga de alta energía.' },
          { lambdaMax: 506, epsilon: 1750, widthNm: 8, transition: 'TCLM (v=2)', description: 'Dedo vibracional verde-azul.' },
          { lambdaMax: 525, epsilon: 2450, widthNm: 8, transition: 'TCLM (v=1 Máximo)', description: 'Pico principal en 525 nm que produce violeta profundo.', isPrimaryPeak: true },
          { lambdaMax: 545, epsilon: 2300, widthNm: 8, transition: 'TCLM (v=0)', description: 'Tercer dedo vibracional característico en 545 nm.' }
        ]
      },
      {
        id: 'uv_k2cr2o7',
        name: 'Dicromato de Potasio (Patrón NIST)',
        formula: 'K₂Cr₂O₇',
        solvent: 'H₂SO₄ 0.005 M',
        defaultConcMm: 0.25,
        solutionColorHex: '#EB8128',
        description: 'Estándar internacional de calibración fotométrica NIST 935a con máximos reproducibles a 257 nm y 350 nm y banda visible hasta 440 nm.',
        lambdaMain: 350,
        maxEpsilon: 4200,
        bands: [
          { lambdaMax: 257, epsilon: 4200, widthNm: 18, transition: 'TCLM (O → Cr VI)', description: 'Pico estándar UV de calibración fotométrica.' },
          { lambdaMax: 350, epsilon: 3150, widthNm: 22, transition: 'TCLM (O → Cr VI)', description: 'Segundo pico estándar NIST en UVA.', isPrimaryPeak: true },
          { lambdaMax: 440, epsilon: 780, widthNm: 24, transition: 'TCLM (Cola azul)', description: 'Banda en violeta-azul que da el color naranja intenso.' }
        ]
      },
      {
        id: 'uv_cu_aqua',
        name: 'Sulfato de Cobre [Cu(H₂O)₆]²⁺',
        formula: 'CuSO₄·5H₂O',
        solvent: 'Agua',
        defaultConcMm: 80,
        solutionColorHex: '#3AA6DC',
        description: 'Complejo d⁹ octaédrico distorsionado por Jahn-Teller: banda d → d ancha y asimétrica centrada en 810 nm con cola en el rojo (650–790 nm), dando azul celeste.',
        lambdaMain: 785,
        maxEpsilon: 12,
        bands: [
          { lambdaMax: 785, epsilon: 12, widthNm: 72, transition: 'd → d (²Eg → ²T₂g)', description: 'Transición prohibida por Laporte con baja absortividad (ε ≈ 12).', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_cu_ammine',
        name: 'Tetraamincobre(II) [Cu(NH₃)₄(H₂O)₂]²⁺',
        formula: '[Cu(NH₃)₄]²⁺',
        solvent: 'NH₃ acuoso',
        defaultConcMm: 18,
        solutionColorHex: '#1D3396',
        description: 'El ligando NH₃ (campo más fuerte que H₂O en la serie espectroquímica) aumenta Δo y desplaza la banda d → d de 785 nm a 610 nm, generando azul real intenso.',
        lambdaMain: 610,
        maxEpsilon: 55,
        bands: [
          { lambdaMax: 610, epsilon: 55, widthNm: 58, transition: 'd → d (Campo fuerte NH₃)', description: 'Efecto de la serie espectroquímica: mayor Δo = menor λ.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_ferroin',
        name: 'Ferroína [Fe(o-fenantrolina)₃]²⁺',
        formula: '[Fe(C₁₂H₈N₂)₃]²⁺',
        solvent: 'Agua pH 4',
        defaultConcMm: 0.08,
        solutionColorHex: '#D8412C',
        description: 'Método estándar dorado para determinar hierro total: transferencia de carga Metal→Ligando (TCML Fe²⁺ → π* fenantrolina) a 510 nm (ε = 11,100).',
        lambdaMain: 510,
        maxEpsilon: 11100,
        bands: [
          { lambdaMax: 266, epsilon: 85000, widthNm: 14, transition: 'π → π* (Ligando fenantrolina)', description: 'Absorción intensa de los ligandos aromáticos.' },
          { lambdaMax: 510, epsilon: 11100, widthNm: 28, transition: 'TCML (Fe t₂g → π* ligando)', description: 'Pico analítico de cuantificación de Fe(II) en aguas.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_fe_scn',
        name: 'Tiocianato de Hierro(III) [Fe(SCN)]²⁺',
        formula: '[Fe(SCN)(H₂O)₅]²⁺',
        solvent: 'HCl 0.1 M',
        defaultConcMm: 0.14,
        solutionColorHex: '#A62323',
        description: 'Complejo rojo sangre clásico formado por transferencia de carga ligando→metal en 460 nm.',
        lambdaMain: 460,
        maxEpsilon: 7200,
        bands: [
          { lambdaMax: 460, epsilon: 7200, widthNm: 38, transition: 'TCLM (SCN⁻ → Fe³⁺)', description: 'Banda de color rojo sangre usada en cuantificación clásica de hierro.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_co_aqua',
        name: 'Hexaacuocobalto(II) [Co(H₂O)₆]²⁺',
        formula: 'Co(NO₃)₂',
        solvent: 'Agua',
        defaultConcMm: 150,
        solutionColorHex: '#E57A93',
        description: 'Complejo d⁷ rosa pálido con transición d → d en el verde a 512 nm (ε ≈ 5).',
        lambdaMain: 512,
        maxEpsilon: 5.2,
        bands: [
          { lambdaMax: 512, epsilon: 5.2, widthNm: 34, transition: '⁴T₁g(F) → ⁴T₁g(P) (d→d)', description: 'Banda débil en el verde responsable del color rosa.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_ni_aqua',
        name: 'Hexaacuoníquel(II) [Ni(H₂O)₆]²⁺',
        formula: 'NiSO₄',
        solvent: 'Agua',
        defaultConcMm: 140,
        solutionColorHex: '#6DB68B',
        description: 'Complejo d⁸ octaédrico que exhibe dos bandas características: a 394 nm (violeta) y 720 nm (rojo), transmitiendo verde esmeralda.',
        lambdaMain: 394,
        maxEpsilon: 5.1,
        bands: [
          { lambdaMax: 394, epsilon: 5.1, widthNm: 24, transition: '³A₂g → ³T₁g(P) (d→d)', description: 'Absorbe en el violeta.', isPrimaryPeak: true },
          { lambdaMax: 655, epsilon: 2.1, widthNm: 30, transition: '³A₂g → ¹Eg', description: 'Hombro débil por acoplamiento espín-órbita.' },
          { lambdaMax: 720, epsilon: 2.3, widthNm: 34, transition: '³A₂g → ³T₁g(F)', description: 'Absorbe en el rojo profundo dejando ventana verde a 500 nm.' }
        ]
      },
      {
        id: 'uv_chromate',
        name: 'Cromato de Potasio (CrO₄²⁻)',
        formula: 'K₂CrO₄',
        solvent: 'KOH 0.05 M',
        defaultConcMm: 0.2,
        solutionColorHex: '#F2DB38',
        description: 'Anión tetraédrico básico amarillo brillante con pico patrón calibrado a 372 nm (ε = 4,830).',
        lambdaMain: 372,
        maxEpsilon: 4830,
        bands: [
          { lambdaMax: 273, epsilon: 3680, widthNm: 18, transition: 'TCLM (O → Cr)', description: 'Banda UV de calibración alcalina.' },
          { lambdaMax: 372, epsilon: 4830, widthNm: 22, transition: 'TCLM (O → Cr tetraédrico)', description: 'Banda principal en el límite UV-violeta.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_prussian_blue',
        name: 'Azul de Prusia (Dispersión Coloidal)',
        formula: 'Fe₄[Fe(CN)₆]₃',
        solvent: 'Agua',
        defaultConcMm: 0.08,
        solutionColorHex: '#183C7B',
        description: 'Transferencia de carga de valencia mixta intervalencia (Fe²⁺ → Fe³⁺ a través de puente cianuro) a 690 nm.',
        lambdaMain: 690,
        maxEpsilon: 11500,
        bands: [
          { lambdaMax: 690, epsilon: 11500, widthNm: 62, transition: 'Intervalencia Fe(II) → Fe(III)', description: 'Banda ancha muy intensa en el rojo produciendo azul ultramarino.', isPrimaryPeak: true }
        ]
      }
    ]
  },

  // 6. ÁCIDOS NUCLEICOS Y BIOMOLÉCULAS (260 / 280 nm)
  {
    id: 'biomolecules',
    name: 'Ácidos Nucleicos y Biomoléculas',
    chromophoreType: 'Bases Nitrogenadas (260 nm) y Residuos Aromáticos (280 nm)',
    spectralSignature:
      'Los ácidos nucleicos ADN/ARN absorben máximamente a 260 nm por transiciones π→π* de purinas y pirimidinas; las proteínas absorben a 280 nm por triptófano y tirosina (relación de pureza A₂₆₀/A₂₈₀ ≈ 1.8–2.0).',
    compounds: [
      {
        id: 'uv_dna_ds',
        name: 'ADN Bicatenario (dsDNA)',
        formula: 'Polímero desoxirribonucleico',
        solvent: 'Tampón TE pH 8',
        defaultConcMm: 0.1,
        solutionColorHex: '#F3F6FA',
        description: 'Pico agudo a 260 nm (1 UA ≈ 50 μg/mL); la desnaturalización térmica eleva la absorbancia un ~35% (efecto hipercrómico).',
        lambdaMain: 260,
        maxEpsilon: 13200,
        bands: [
          { lambdaMax: 205, epsilon: 21000, widthNm: 14, transition: 'π → π* (Esqueleto fosfodiéster/bases)', description: 'Banda intensa en UV profundo.' },
          { lambdaMax: 260, epsilon: 13200, widthNm: 18, transition: 'π → π* (Purinas + Pirimidinas)', description: 'Máximo universal de cuantificación de ADN.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_rna',
        name: 'ARN Monocatenario (ssRNA)',
        formula: 'Polímero ribonucleico',
        solvent: 'Agua libre de RNasa',
        defaultConcMm: 0.08,
        solutionColorHex: '#F3F6FA',
        description: 'Al tener menos apilamiento de bases en doble hélice, presenta mayor absortividad por nucleótido a 260 nm (1 UA ≈ 40 μg/mL).',
        lambdaMain: 260,
        maxEpsilon: 15800,
        bands: [
          { lambdaMax: 260, epsilon: 15800, widthNm: 19, transition: 'π → π* (Bases A, U, G, C)', description: 'Relación óptima A₂₆₀/A₂₈₀ ≈ 2.0.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_adenine',
        name: 'Adenina',
        formula: 'C₅H₅N₅',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.07,
        solutionColorHex: '#F4F7F9',
        description: 'Base púrica aromática de 10 electrones π con máximo característico en 260.5 nm (ε = 13,400).',
        lambdaMain: 261,
        maxEpsilon: 13400,
        bands: [
          { lambdaMax: 207, epsilon: 22500, widthNm: 11, transition: 'π → π* (Purina UV corto)', description: 'Banda energética alta.' },
          { lambdaMax: 261, epsilon: 13400, widthNm: 14, transition: 'π → π* (Anillo purínico)', description: 'Principal contribuyente a la banda de 260 nm del ADN.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_guanine',
        name: 'Guanina',
        formula: 'C₅H₅N₅O',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.08,
        solutionColorHex: '#F4F7F9',
        description: 'Base púrica oxigenada con banda doble caracterizada por un pico en 246 nm y hombro en 275 nm.',
        lambdaMain: 246,
        maxEpsilon: 10700,
        bands: [
          { lambdaMax: 246, epsilon: 10700, widthNm: 13, transition: 'π → π* (Banda principal)', description: 'Máximo primario de la guanina.', isPrimaryPeak: true },
          { lambdaMax: 275, epsilon: 8100, widthNm: 14, transition: 'π → π* (Hombro batocrómico)', description: 'Contribuye a elevar la absorción hacia 280 nm.' }
        ]
      },
      {
        id: 'uv_cytosine',
        name: 'Citosina',
        formula: 'C₄H₅N₃O',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.14,
        solutionColorHex: '#F4F7F9',
        description: 'Base pirimidínica con máximo desplazado a 267 nm (ε = 6,100) y pico en 197 nm.',
        lambdaMain: 267,
        maxEpsilon: 6100,
        bands: [
          { lambdaMax: 197, epsilon: 21500, widthNm: 10, transition: 'π → π*', description: 'Banda en UV lejano.' },
          { lambdaMax: 267, epsilon: 6100, widthNm: 15, transition: 'π → π* (Anillo pirimidina)', description: 'Máximo diagnóstico a pH neutro.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_thymine',
        name: 'Timina',
        formula: 'C₅H₆N₂O₂',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.12,
        solutionColorHex: '#F4F7F9',
        description: 'Base exclusiva del ADN con pico en 264.5 nm (ε = 7,900) y banda en 205 nm.',
        lambdaMain: 265,
        maxEpsilon: 7900,
        bands: [
          { lambdaMax: 205, epsilon: 9500, widthNm: 11, transition: 'π → π*', description: 'Banda de borde UV.' },
          { lambdaMax: 265, epsilon: 7900, widthNm: 15, transition: 'π → π* (Pirimidindiona)', description: 'Absorción responsable de fotodímeros UV-B.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_tryptophan',
        name: 'L-Triptófano',
        formula: 'C₁₁H₁₂N₂O₂',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.16,
        solutionColorHex: '#F5F6FA',
        description: 'Aminoácido con anillo indol: domina ampliamente la absorbancia de proteínas a 280 nm (ε = 5,500) con hombro a 288 nm.',
        lambdaMain: 280,
        maxEpsilon: 5500,
        bands: [
          { lambdaMax: 219, epsilon: 34500, widthNm: 10, transition: 'π → π* (Indol intensa)', description: 'Transición permitida de gran magnitud.' },
          { lambdaMax: 280, epsilon: 5500, widthNm: 12, transition: 'π → π* (¹La + ¹Lb Indol)', description: 'Base universal del método de cuantificación proteica A₂₈₀.', isPrimaryPeak: true },
          { lambdaMax: 288, epsilon: 4550, widthNm: 6, transition: 'π → π* (Hombro vibrónico)', description: 'Hombro fino característico del residuo indol.' }
        ]
      },
      {
        id: 'uv_tyrosine',
        name: 'L-Tirosina',
        formula: 'C₉H₁₁NO₃',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.5,
        solutionColorHex: '#F6F7FA',
        description: 'Aminoácido fenólico con pico a 275 nm (ε = 1,400); en medio básico pH 13 el fenolato desplaza el pico a 293 nm.',
        lambdaMain: 275,
        maxEpsilon: 1420,
        bands: [
          { lambdaMax: 223, epsilon: 8400, widthNm: 10, transition: 'π → π* (Banda E₂)', description: 'Absorción fenólica intensa.' },
          { lambdaMax: 275, epsilon: 1420, widthNm: 11, transition: 'π → π* (Banda B fenol)', description: 'Segunda contribución más importante a A₂₈₀ en proteínas.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_phenylalanine',
        name: 'L-Fenilalanina',
        formula: 'C₉H₁₁NO₂',
        solvent: 'Agua pH 7',
        defaultConcMm: 3.5,
        solutionColorHex: '#F4F7F9',
        description: 'Anillo bencénico sin sustituyentes polares: absorción muy débil (ε = 195) a 257 nm con dedos vibracionales.',
        lambdaMain: 257,
        maxEpsilon: 195,
        bands: [
          { lambdaMax: 206, epsilon: 9300, widthNm: 10, transition: 'π → π* (Banda E₂)', description: 'Banda de enlace peptídico/anillo.' },
          { lambdaMax: 252, epsilon: 155, widthNm: 4, transition: 'π → π* (Vibrónico)', description: 'Dedo menor.' },
          { lambdaMax: 257, epsilon: 195, widthNm: 4, transition: 'π → π* (Banda B)', description: 'Huella de fenilalanina a 257 nm.', isPrimaryPeak: true },
          { lambdaMax: 264, epsilon: 145, widthNm: 4, transition: 'π → π* (Vibrónico)', description: 'Dedo lateral.' }
        ]
      },
      {
        id: 'uv_nadh',
        name: 'NADH (Coenzima Reducida)',
        formula: 'C₂₁H₂₉N₇O₁₄P₂',
        solvent: 'Tampón Tris pH 7.5',
        defaultConcMm: 0.14,
        solutionColorHex: '#F8F9F0',
        description: 'Cofactor metabólico universal: al reducirse de NAD⁺ a NADH aparece una banda nueva exacta a 340 nm (ε = 6,220) usada en miles de ensayos enzimáticos.',
        lambdaMain: 340,
        maxEpsilon: 14400,
        bands: [
          { lambdaMax: 259, epsilon: 14400, widthNm: 16, transition: 'π → π* (Anillo adenina)', description: 'Presente tanto en NAD⁺ como en NADH.' },
          { lambdaMax: 340, epsilon: 6220, widthNm: 22, transition: 'π → π* (Dihidronicotinamida)', description: 'Banda diagnóstica exclusiva del NADH reducido a 340 nm.', isPrimaryPeak: true }
        ]
      }
    ]
  },

  // 7. PORFIRINAS, HEMO Y PIGMENTOS FOTOSINTÉTICOS
  {
    id: 'porphyrins',
    name: 'Porfirinas, Hemo y Clorofilas',
    chromophoreType: 'Macrociclos Tetrapirrólicos (Banda Soret y Bandas Q)',
    spectralSignature:
      'Firma espectroscópica inconfundible: una banda Soret colosal entre 395 y 440 nm (ε = 10⁵–4×10⁵ L·mol⁻¹·cm⁻¹) acompañada de bandas Q más débiles en la región rojo-verde (530–670 nm).',
    compounds: [
      {
        id: 'uv_chlorophyll_a',
        name: 'Clorofila a',
        formula: 'C₅₅H₇₂MgN₄O₅',
        solvent: 'Acetona / Éter',
        defaultConcMm: 0.008,
        solutionColorHex: '#2B8E5C',
        description: 'Pigmento fotosintético primario: absorbe intensamente en el azul-violeta (430 nm, banda Soret) y en el rojo (662 nm), dejando intacta la ventana verde.',
        lambdaMain: 430,
        maxEpsilon: 112000,
        bands: [
          { lambdaMax: 430, epsilon: 112000, widthNm: 18, transition: 'π → π* (Banda Soret B)', description: 'Absorción azul de máxima eficiencia energética.', isPrimaryPeak: true },
          { lambdaMax: 616, epsilon: 16000, widthNm: 14, transition: 'π → π* (Banda Qx)', description: 'Banda menor en naranja-rojo.' },
          { lambdaMax: 662, epsilon: 88000, widthNm: 13, transition: 'π → π* (Banda Qy Roja)', description: 'Transición roja impulsora del Fotosistema II y I.' }
        ]
      },
      {
        id: 'uv_chlorophyll_b',
        name: 'Clorofila b',
        formula: 'C₅₅H₇₀MgN₄O₆',
        solvent: 'Acetona',
        defaultConcMm: 0.007,
        solutionColorHex: '#639E3C',
        description: 'Un grupo formilo (–CHO) en lugar de metilo desplaza la banda Soret a 453 nm y contrae la banda Q roja a 642 nm, ampliando la captura solar.',
        lambdaMain: 453,
        maxEpsilon: 134000,
        bands: [
          { lambdaMax: 453, epsilon: 134000, widthNm: 17, transition: 'π → π* (Banda Soret desplazada)', description: 'Captura fotones azules que la clorofila a deja pasar.', isPrimaryPeak: true },
          { lambdaMax: 642, epsilon: 56000, widthNm: 14, transition: 'π → π* (Banda Qy)', description: 'Banda roja desplazada hipsocrómicamente.' }
        ]
      },
      {
        id: 'uv_oxyhemoglobin',
        name: 'Oxihemoglobina (HbO₂)',
        formula: 'Proteína Fe(II)–O₂',
        solvent: 'Tampón Fosfato pH 7.4',
        defaultConcMm: 0.008,
        solutionColorHex: '#C92B36',
        description: 'Banda Soret a 415 nm más el famoso doblete Q agudo en 542 nm y 577 nm (base de la oximetría de pulso clínica).',
        lambdaMain: 415,
        maxEpsilon: 125000,
        bands: [
          { lambdaMax: 276, epsilon: 32000, widthNm: 16, transition: 'π → π* (Globina Trp/Tyr)', description: 'Banda proteica de la cadena polipeptídica.' },
          { lambdaMax: 415, epsilon: 125000, widthNm: 14, transition: 'π → π* (Banda Soret Hemo)', description: 'Pico gigante característico del anillo porfirínico.', isPrimaryPeak: true },
          { lambdaMax: 542, epsilon: 13800, widthNm: 10, transition: 'π → π* (Banda Qβ)', description: 'Primer pico del doblete verde de oxigenación.' },
          { lambdaMax: 577, epsilon: 14600, widthNm: 10, transition: 'π → π* (Banda Qα)', description: 'Segundo pico del doblete; desaparece al perder O₂.' }
        ]
      },
      {
        id: 'uv_deoxyhemoglobin',
        name: 'Desoxihemoglobina (Hb)',
        formula: 'Proteína Fe(II) desoxigenada',
        solvent: 'Tampón Fosfato pH 7.4',
        defaultConcMm: 0.008,
        solutionColorHex: '#7A233A',
        description: 'Al liberar el O₂, el hierro sale del plano del hemo: la banda Soret pasa a 430 nm y el doblete Q colapsa en una única banda ancha a 555 nm.',
        lambdaMain: 430,
        maxEpsilon: 133000,
        bands: [
          { lambdaMax: 430, epsilon: 133000, widthNm: 16, transition: 'π → π* (Soret Fe espín alto)', description: 'Desplazamiento de +15 nm respecto a HbO₂.', isPrimaryPeak: true },
          { lambdaMax: 555, epsilon: 12500, widthNm: 22, transition: 'π → π* (Banda Q única)', description: 'Un solo máximo en 555 nm (sangre venosa púrpura).' }
        ]
      },
      {
        id: 'uv_cytochrome_c',
        name: 'Citocromo c (Estado Reducido Fe²⁺)',
        formula: 'Hemo c Fe(II)',
        solvent: 'Tampón pH 7',
        defaultConcMm: 0.008,
        solutionColorHex: '#D85858',
        description: 'Transportador mitocondrial de electrones con banda Soret a 415 nm y pico α afiladísimo a 550 nm usado en bioenergética.',
        lambdaMain: 415,
        maxEpsilon: 129000,
        bands: [
          { lambdaMax: 415, epsilon: 129000, widthNm: 13, transition: 'π → π* (Banda Soret)', description: 'Absorción azul violeta.', isPrimaryPeak: true },
          { lambdaMax: 520, epsilon: 15900, widthNm: 10, transition: 'π → π* (Banda β)', description: 'Pico beta mitocondrial.' },
          { lambdaMax: 550, epsilon: 27700, widthNm: 7, transition: 'π → π* (Banda α aguda)', description: 'Indicador cuantitativo de reducción a Fe²⁺.' }
        ]
      },
      {
        id: 'uv_myoglobin',
        name: 'Oximioglobina',
        formula: 'Mb-O₂',
        solvent: 'Tampón pH 7.2',
        defaultConcMm: 0.008,
        solutionColorHex: '#C9383E',
        description: 'Monómero muscular con Soret a 418 nm y doblete Q en 544 y 581 nm responsable del rojo fresco de la carne.',
        lambdaMain: 418,
        maxEpsilon: 128000,
        bands: [
          { lambdaMax: 418, epsilon: 128000, widthNm: 14, transition: 'π → π* (Soret MbO₂)', description: 'Banda Soret principal.', isPrimaryPeak: true },
          { lambdaMax: 544, epsilon: 13900, widthNm: 10, transition: 'π → π* (Qβ)', description: 'Banda verde.' },
          { lambdaMax: 581, epsilon: 14500, widthNm: 10, transition: 'π → π* (Qα)', description: 'Banda amarilla.' }
        ]
      },
      {
        id: 'uv_bilirubin',
        name: 'Bilirrubina',
        formula: 'C₃₃H₃₆N₄O₆',
        solvent: 'Cloroformo / Albúmina',
        defaultConcMm: 0.015,
        solutionColorHex: '#DDA222',
        description: 'Tetrapirrol lineal producto de degradación del hemo; su banda a 453 nm permite el diagnóstico óptico neonatal no invasivo.',
        lambdaMain: 453,
        maxEpsilon: 60000,
        bands: [
          { lambdaMax: 453, epsilon: 60000, widthNm: 28, transition: 'π → π* (Bilirrubinato conjugado)', description: 'Absorbe luz azul produciendo pigmentación amarilla.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_vitamin_b12',
        name: 'Vitamina B₁₂ (Cianocobalamina)',
        formula: 'C₆₃H₈₈CoN₁₄O₁₄P',
        solvent: 'Agua',
        defaultConcMm: 0.03,
        solutionColorHex: '#D83B5E',
        description: 'Macrociclo corrina con Cobalto(III) central; exhibe una banda intensa característica a 361 nm y banda visible en 550 nm (color rojo rubí).',
        lambdaMain: 361,
        maxEpsilon: 28100,
        bands: [
          { lambdaMax: 278, epsilon: 15500, widthNm: 14, transition: 'π → π* (Dimetilbencimidazol)', description: 'Banda UV de base nucleotídica.' },
          { lambdaMax: 361, epsilon: 28100, widthNm: 15, transition: 'π → π* (Banda γ Corrina)', description: 'Pico diagnóstico primario de Vitamina B₁₂.', isPrimaryPeak: true },
          { lambdaMax: 550, epsilon: 8700, widthNm: 28, transition: 'π → π* (Bandas α/β)', description: 'Absorbe verde produciendo rojo cereza característico.' }
        ]
      },
      {
        id: 'uv_protoporphyrin',
        name: 'Protoporfirina IX (Base libre)',
        formula: 'C₃₄H₃₄N₄O₄',
        solvent: 'DMSO / Ácido acético',
        defaultConcMm: 0.005,
        solutionColorHex: '#7B253A',
        description: 'Porfirina sin metal central: exhibe la Soret en 407 nm y cuatro bandas Q distintas (etio-espectro) entre 505 y 633 nm.',
        lambdaMain: 407,
        maxEpsilon: 165000,
        bands: [
          { lambdaMax: 407, epsilon: 165000, widthNm: 14, transition: 'π → π* (Soret base libre)', description: 'Máximo ultravioleta-violeta colosal.', isPrimaryPeak: true },
          { lambdaMax: 505, epsilon: 14000, widthNm: 10, transition: 'Q IV', description: 'Primera banda Q por simetría D₂h reducida.' },
          { lambdaMax: 540, epsilon: 11000, widthNm: 10, transition: 'Q III', description: 'Segunda banda Q.' },
          { lambdaMax: 576, epsilon: 6800, widthNm: 10, transition: 'Q II', description: 'Tercera banda Q.' },
          { lambdaMax: 632, epsilon: 5200, widthNm: 10, transition: 'Q I', description: 'Cuarta banda Q roja.' }
        ]
      },
      {
        id: 'uv_phycocyanin',
        name: 'C-Ficocianina (Espirulina)',
        formula: 'Ficobiliproteína',
        solvent: 'Tampón pH 7',
        defaultConcMm: 0.01,
        solutionColorHex: '#1C85B8',
        description: 'Pigmento proteico azul brillante con máximo agudo a 620 nm utilizado como colorante azul natural y biomarcador.',
        lambdaMain: 620,
        maxEpsilon: 95000,
        bands: [
          { lambdaMax: 280, epsilon: 24000, widthNm: 16, transition: 'π → π* (Proteína)', description: 'Aromáticos de la apoproteína.' },
          { lambdaMax: 360, epsilon: 16000, widthNm: 20, transition: 'π → π* (Ficocianobilina UV)', description: 'Banda secundaria del tetrapirrol abierto.' },
          { lambdaMax: 620, epsilon: 95000, widthNm: 24, transition: 'π → π* (Cromóforo abierto)', description: 'Absorbe naranja-rojo dando azul turquesa intenso.', isPrimaryPeak: true }
        ]
      }
    ]
  },

  // 8. FÁRMACOS Y HETEROCICLOS BIOACTIVOS
  {
    id: 'pharma',
    name: 'Fármacos y Heterociclos Bioactivos',
    chromophoreType: 'Control de Calidad Farmacopeico UV (USP/EP)',
    spectralSignature:
      'Bandas π→π* en la ventana de 225 a 360 nm altamente reproducibles usadas diariamente en control de calidad de tabletas, cápsulas y análisis de disolución.',
    compounds: [
      {
        id: 'uv_paracetamol',
        name: 'Paracetamol (Acetaminofén)',
        formula: 'C₈H₉NO₂',
        solvent: 'Agua / Metanol',
        defaultConcMm: 0.08,
        solutionColorHex: '#F5F7FA',
        description: 'Analgesico universal con banda limpia y estable a 243 nm (ε = 13,500) empleada para valoración directa USP.',
        lambdaMain: 243,
        maxEpsilon: 13500,
        bands: [
          { lambdaMax: 243, epsilon: 13500, widthNm: 15, transition: 'π → π* (p-Acilaminofenol)', description: 'Pico principal cuantitativo en medio neutro/ácido.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_aspirin',
        name: 'Ácido Acetilsalicílico (Aspirina)',
        formula: 'C₉H₈O₄',
        solvent: 'Etanol / CHCl₃',
        defaultConcMm: 0.12,
        solutionColorHex: '#F5F7F9',
        description: 'Exhibe banda primaria a 228 nm y banda secundaria a 276 nm; la aparición de un pico a 298 nm delata hidrólisis a ácido salicílico.',
        lambdaMain: 228,
        maxEpsilon: 8600,
        bands: [
          { lambdaMax: 228, epsilon: 8600, widthNm: 12, transition: 'π → π* (Éster benzoato)', description: 'Máximo primario de alta sensibilidad.', isPrimaryPeak: true },
          { lambdaMax: 276, epsilon: 1200, widthNm: 12, transition: 'π → π* (Banda B aromática)', description: 'Banda diagnóstica de pureza sin ácido salicílico libre.' }
        ]
      },
      {
        id: 'uv_caffeine',
        name: 'Cafeína',
        formula: 'C₈H₁₀N₄O₂',
        solvent: 'Agua',
        defaultConcMm: 0.09,
        solutionColorHex: '#F5F7FA',
        description: 'Alcaloide xantínico cuantificado a exactamente 273 nm (ε = 9,700) en bebidas, café y tabletas farmacéuticas.',
        lambdaMain: 273,
        maxEpsilon: 9700,
        bands: [
          { lambdaMax: 205, epsilon: 25000, widthNm: 10, transition: 'π → π* (Xantina UV corta)', description: 'Absorción de alta energía.' },
          { lambdaMax: 273, epsilon: 9700, widthNm: 14, transition: 'π → π* (Anillo purinadiona)', description: 'Pico estándar AOAC para determinación de cafeína.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_ibuprofen',
        name: 'Ibuprofeno',
        formula: 'C₁₃H₁₈O₂',
        solvent: 'NaOH 0.1 M',
        defaultConcMm: 0.1,
        solutionColorHex: '#F5F7F9',
        description: 'Anillo fenilo aislado con banda intensa a 222 nm (ε = 9,800) y banda bencenoide débil a 264 nm.',
        lambdaMain: 222,
        maxEpsilon: 9800,
        bands: [
          { lambdaMax: 222, epsilon: 9800, widthNm: 12, transition: 'π → π* (Banda E₂ para-alquilarilo)', description: 'Pico de disolución farmacéutica USP.', isPrimaryPeak: true },
          { lambdaMax: 264, epsilon: 320, widthNm: 9, transition: 'π → π* (Banda B)', description: 'Hombro aromático débil.' }
        ]
      },
      {
        id: 'uv_ascorbic_acid',
        name: 'Vitamina C (Ácido Ascórbico)',
        formula: 'C₆H₈O₆',
        solvent: 'Agua pH 5 (Ascorbato)',
        defaultConcMm: 0.07,
        solutionColorHex: '#F8F9F4',
        description: 'Enol-lactona con fuerte banda a 265 nm en pH neutro (se desplaza a 244 nm en medio ácido fuerte pH 2).',
        lambdaMain: 265,
        maxEpsilon: 14500,
        bands: [
          { lambdaMax: 265, epsilon: 14500, widthNm: 16, transition: 'π → π* (Cromóforo enodiol-lactona)', description: 'Decae rápidamente si se oxida a ácido dehidroascórbico.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_riboflavin',
        name: 'Vitamina B₂ (Riboflavina)',
        formula: 'C₁₇H₂₀N₄O₆',
        solvent: 'Agua pH 7',
        defaultConcMm: 0.03,
        solutionColorHex: '#ECE646',
        description: 'Anillo isoaloxazina tricíclico con cuatro picos característicos (223, 267, 373 y 445 nm), produciendo soluciones amarillo verdoso fluorescentes.',
        lambdaMain: 445,
        maxEpsilon: 32500,
        bands: [
          { lambdaMax: 223, epsilon: 30000, widthNm: 12, transition: 'π → π* (UV corto)', description: 'Banda de alta energía.' },
          { lambdaMax: 267, epsilon: 32500, widthNm: 13, transition: 'π → π* (S₀ → S₃)', description: 'Pico UV de máxima absortividad.' },
          { lambdaMax: 373, epsilon: 10600, widthNm: 18, transition: 'π → π* (S₀ → S₂)', description: 'Banda UVA intermedia.' },
          { lambdaMax: 445, epsilon: 12500, widthNm: 20, transition: 'π → π* (S₀ → S₁ Flavinica)', description: 'Absorción azul responsable del color amarillo neón.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_tetracycline',
        name: 'Tetraciclina',
        formula: 'C₂₂H₂₄N₂O₈',
        solvent: 'HCl 0.1 M',
        defaultConcMm: 0.06,
        solutionColorHex: '#F3DF72',
        description: 'Antibiótico policíclico con dos cromóforos independientes que generan picos a 268 nm y 355 nm.',
        lambdaMain: 355,
        maxEpsilon: 18500,
        bands: [
          { lambdaMax: 268, epsilon: 18500, widthNm: 16, transition: 'π → π* (Cromóforo A)', description: 'Sistema tricarbonilmetano del anillo A.' },
          { lambdaMax: 355, epsilon: 14200, widthNm: 22, transition: 'π → π* (Cromóforo BCD)', description: 'Sistema fenólico-dicetona conjugado amarillo.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_quinine',
        name: 'Sulfato de Quinina',
        formula: 'C₂₀H₂₄N₂O₂',
        solvent: 'H₂SO₄ 0.05 M',
        defaultConcMm: 0.03,
        solutionColorHex: '#EDF6FA',
        description: 'Alcaloide quinolínico protonado: absorbe intensamente a 250 nm y 347 nm (de donde excita fluorescencia azul cielo clásica a 450 nm).',
        lambdaMain: 347,
        maxEpsilon: 28000,
        bands: [
          { lambdaMax: 250, epsilon: 28000, widthNm: 12, transition: 'π → π* (Quinolina protonada)', description: 'Banda UV principal.' },
          { lambdaMax: 317, epsilon: 4200, widthNm: 12, transition: 'π → π* (Hombro)', description: 'Transición intermedia.' },
          { lambdaMax: 347, epsilon: 5600, widthNm: 16, transition: 'π → π* (Excitación fluorescencia)', description: 'Banda estándar NIST de calibración de fluorescencia.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_amoxicillin',
        name: 'Amoxicilina',
        formula: 'C₁₆H₁₉N₃O₅S',
        solvent: 'Agua pH 6',
        defaultConcMm: 0.12,
        solutionColorHex: '#F6F7FA',
        description: 'Penicilina semisintética cuyo grupo p-hidroxifenilglicina produce un máximo analítico definido a 229 nm y banda en 272 nm.',
        lambdaMain: 229,
        maxEpsilon: 9600,
        bands: [
          { lambdaMax: 229, epsilon: 9600, widthNm: 11, transition: 'π → π* (Para-hidroxifenil)', description: 'Pico principal farmacopeico.', isPrimaryPeak: true },
          { lambdaMax: 272, epsilon: 1150, widthNm: 11, transition: 'π → π* (Banda B fenólica)', description: 'Banda secundaria diagnóstica.' }
        ]
      },
      {
        id: 'uv_morphine',
        name: 'Clorhidrato de Morfina',
        formula: 'C₁₇H₁₉NO₃',
        solvent: 'Agua pH 5',
        defaultConcMm: 0.45,
        solutionColorHex: '#F6F7FA',
        description: 'Alcaloide opiáceo fenólico con absorción aromática diagnóstica a 285 nm (desplazada a 298 nm en NaOH).',
        lambdaMain: 285,
        maxEpsilon: 1550,
        bands: [
          { lambdaMax: 210, epsilon: 24000, widthNm: 12, transition: 'π → π* (Aromática)', description: 'Banda UV profunda.' },
          { lambdaMax: 285, epsilon: 1550, widthNm: 11, transition: 'π → π* (Fenol morfinano)', description: 'Pico forense cuantitativo estándar.', isPrimaryPeak: true }
        ]
      }
    ]
  },

  // 9. DERIVADOS BENCÉNICOS SUSTITUIDOS (Efecto Batocrómico)
  {
    id: 'substituted_benzenes',
    name: 'Derivados Bencénicos y Auxocromos',
    chromophoreType: 'Donador–Aceptor Intramolecular (Push-Pull)',
    spectralSignature:
      'Cuando un grupo donador (–OH, –NH₂) y un grupo aceptor (–NO₂, –CHO) coexisten en posiciones para, la transferencia de carga intramolecular dispara λ_max de 254 nm hasta 380–405 nm.',
    compounds: [
      {
        id: 'uv_nitrobenzene',
        name: 'Nitrobenceno',
        formula: 'C₆H₅NO₂',
        solvent: 'Hexano',
        defaultConcMm: 0.1,
        solutionColorHex: '#F9F3C9',
        description: 'El grupo nitro atrayente de electrones crea una fuerte banda de transferencia de carga anillo→nitro a 252 nm.',
        lambdaMain: 252,
        maxEpsilon: 9800,
        bands: [
          { lambdaMax: 252, epsilon: 9800, widthNm: 15, transition: 'π → π* (Anillo → NO₂)', description: 'Banda intensa de transferencia electrónica.', isPrimaryPeak: true },
          { lambdaMax: 330, epsilon: 125, widthNm: 22, transition: 'n → π* (Grupo nitro)', description: 'Cola débil hacia el violeta (color amarillo muy pálido).' }
        ]
      },
      {
        id: 'uv_pnitrophenol_acid',
        name: 'p-Nitrofenol (Forma Neutra pH 3)',
        formula: 'C₆H₅NO₃',
        solvent: 'HCl 0.01 M',
        defaultConcMm: 0.08,
        solutionColorHex: '#F7F8F5',
        description: 'Incoloro en medio ácido con banda principal en el UV a 317 nm (ε = 10,000).',
        lambdaMain: 317,
        maxEpsilon: 10000,
        bands: [
          { lambdaMax: 226, epsilon: 7200, widthNm: 13, transition: 'π → π* (UV corto)', description: 'Banda secundaria.' },
          { lambdaMax: 317, epsilon: 10000, widthNm: 20, transition: 'π → π* (Push-Pull débil)', description: 'Absorción UV completamente incolora al ojo.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_pnitrophenol_base',
        name: 'p-Nitrofenolato (Base pH 10)',
        formula: 'C₆H₄NO₃⁻',
        solvent: 'NaOH 0.05 M',
        defaultConcMm: 0.045,
        solutionColorHex: '#F5E436',
        description: 'Al perder el protón, –O⁻ dona electrones masivamente al –NO₂ saltando +83 nm hasta 400 nm (ε = 18,300), patrón clásico de cinéticas de fosfatasa alcalina.',
        lambdaMain: 400,
        maxEpsilon: 18300,
        bands: [
          { lambdaMax: 228, epsilon: 6800, widthNm: 14, transition: 'π → π* (Secundaria)', description: 'Banda UV.' },
          { lambdaMax: 400, epsilon: 18300, widthNm: 24, transition: 'TC Intramolecular (⁻O → NO₂)', description: 'Salto batocrómico gigante que vuelve la solución amarillo vivo.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_pnitroaniline',
        name: 'p-Nitroanilina',
        formula: 'C₆H₆N₂O₂',
        solvent: 'Etanol',
        defaultConcMm: 0.05,
        solutionColorHex: '#F3D24B',
        description: 'Ejemplo paradigmático de cromóforo Push-Pull (–NH₂ en para respecto a –NO₂): absorbe en 375 nm (ε = 15,800).',
        lambdaMain: 375,
        maxEpsilon: 15800,
        bands: [
          { lambdaMax: 228, epsilon: 6500, widthNm: 14, transition: 'π → π* (Aromática)', description: 'Banda de anillos.' },
          { lambdaMax: 375, epsilon: 15800, widthNm: 25, transition: 'TC Intramolecular (NH₂ → NO₂)', description: 'Transferencia de carga dipolar gigante.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_benzoic_acid',
        name: 'Ácido Benzoico',
        formula: 'C₇H₆O₂',
        solvent: 'Agua / Etanol',
        defaultConcMm: 0.07,
        solutionColorHex: '#F5F7FA',
        description: 'El grupo carboxilo desplaza la banda primaria del benceno hasta 228 nm (ε = 11,600) con banda B a 272 nm.',
        lambdaMain: 228,
        maxEpsilon: 11600,
        bands: [
          { lambdaMax: 228, epsilon: 11600, widthNm: 12, transition: 'π → π* (Banda K carboxiarilo)', description: 'Pico principal usado como conservante (E210).', isPrimaryPeak: true },
          { lambdaMax: 272, epsilon: 890, widthNm: 10, transition: 'π → π* (Banda B)', description: 'Banda aromática secundaria.' }
        ]
      },
      {
        id: 'uv_salicylic_acid',
        name: 'Ácido Salicílico',
        formula: 'C₇H₆O₃',
        solvent: 'Etanol',
        defaultConcMm: 0.08,
        solutionColorHex: '#F6F7FA',
        description: 'Orto-hidroxiácido con puente de hidrógeno interno que lleva la absorción hasta 302 nm.',
        lambdaMain: 302,
        maxEpsilon: 11200,
        bands: [
          { lambdaMax: 236, epsilon: 8400, widthNm: 13, transition: 'π → π* (Benzoato)', description: 'Primera banda UV.' },
          { lambdaMax: 302, epsilon: 3600, widthNm: 15, transition: 'π → π* (Puente o-OH···C=O)', description: 'Máximo diagnóstico para detectar degradación de aspirina.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_benzaldehyde',
        name: 'Benzaldehído',
        formula: 'C₇H₆O',
        solvent: 'Etanol',
        defaultConcMm: 0.06,
        solutionColorHex: '#F6F7F8',
        description: 'Aldehído aromático con banda conjugada en 248 nm (ε = 13,200) y banda débil n→π* a 328 nm.',
        lambdaMain: 248,
        maxEpsilon: 13200,
        bands: [
          { lambdaMax: 248, epsilon: 13200, widthNm: 13, transition: 'π → π* (Fenil-formilo)', description: 'Máximo principal intenso.', isPrimaryPeak: true },
          { lambdaMax: 280, epsilon: 1450, widthNm: 10, transition: 'π → π* (Banda B)', description: 'Absorción aromática.' },
          { lambdaMax: 328, epsilon: 45, widthNm: 16, transition: 'n → π*', description: 'Transición prohibida del aldehído.' }
        ]
      },
      {
        id: 'uv_vanillin',
        name: 'Vainillina',
        formula: 'C₈H₈O₃',
        solvent: 'Etanol / Agua',
        defaultConcMm: 0.07,
        solutionColorHex: '#FAF7EB',
        description: 'Aldehído fenólico metoxilado aromático con picos definidos en 231, 279 y 309 nm.',
        lambdaMain: 309,
        maxEpsilon: 14800,
        bands: [
          { lambdaMax: 231, epsilon: 14800, widthNm: 12, transition: 'π → π* (E₂)', description: 'Pico corto.' },
          { lambdaMax: 279, epsilon: 10500, widthNm: 13, transition: 'π → π* (Banda B)', description: 'Absorción aromática intermedia.' },
          { lambdaMax: 309, epsilon: 10200, widthNm: 15, transition: 'π → π* (Push-Pull p-OH/CHO)', description: 'Pico principal en el UVA (salta a 348 nm en medio básico).', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_hydroquinone',
        name: 'Hidroquinona',
        formula: 'C₆H₆O₂',
        solvent: 'Agua pH 5',
        defaultConcMm: 0.25,
        solutionColorHex: '#F6F7F9',
        description: '1,4-dihidroxibenceno con banda desplazada hasta 289 nm por efecto combinado de ambos grupos hidroxilo.',
        lambdaMain: 289,
        maxEpsilon: 5100,
        bands: [
          { lambdaMax: 222, epsilon: 5100, widthNm: 11, transition: 'π → π* (Banda E₂)', description: 'Banda de alta energía.' },
          { lambdaMax: 289, epsilon: 2900, widthNm: 13, transition: 'π → π* (Banda B para-diol)', description: 'Máximo cuantitativo en análisis cosmético y redox.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_tnt',
        name: '2,4,6-Trinitrotolueno (TNT)',
        formula: 'C₇H₅N₃O₆',
        solvent: 'Acetonitrilo',
        defaultConcMm: 0.05,
        solutionColorHex: '#F9F2C6',
        description: 'Tres grupos nitro electrón-aceptores generan fuerte banda en 232 nm y hombro característico a 260 nm (explosivos EPA 8330).',
        lambdaMain: 232,
        maxEpsilon: 20500,
        bands: [
          { lambdaMax: 232, epsilon: 20500, widthNm: 14, transition: 'π → π* (Trinitroarilo)', description: 'Pico de alta sensibilidad para detección ambiental de trazas.', isPrimaryPeak: true },
          { lambdaMax: 262, epsilon: 8400, widthNm: 18, transition: 'π → π* (Hombro nitro)', description: 'Hombro diagnóstico para diferenciación en HPLC-DAD.' }
        ]
      }
    ]
  },

  // 10. HALÓGENOS Y ESPECIES INORGÁNICAS UV
  {
    id: 'inorganic_uv',
    name: 'Halógenos y Especies Inorgánicas UV',
    chromophoreType: 'Bandas σ→σ*, n→σ*, Iones y Gases Atmosféricos',
    spectralSignature:
      'Incluye moléculas diatómicas halógenas (I₂ violeta en solvente no polar vs I₃⁻ marrón), aniones ambientales (nitrato NO₃⁻ a 202 nm y nitrito NO₂⁻ a 355 nm) y absorción UV estratosférica del ozono.',
    compounds: [
      {
        id: 'uv_iodine_hexane',
        name: 'Yodo Molecular (I₂ en Hexano)',
        formula: 'I₂',
        solvent: 'Hexano',
        defaultConcMm: 0.8,
        solutionColorHex: '#8E388E',
        description: 'En solventes inertes no coordinantes el I₂ presenta su transición electrónica pura π* → σ* a 522 nm (absorbe verde → solución violeta brillante).',
        lambdaMain: 522,
        maxEpsilon: 910,
        bands: [
          { lambdaMax: 522, epsilon: 910, widthNm: 36, transition: 'π* → σ* (I₂ libre)', description: 'Banda verde responsable del color violeta típico del yodo.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_triiodide',
        name: 'Ion Triyoduro (I₃⁻ Acuoso)',
        formula: 'KI + I₂ (I₃⁻)',
        solvent: 'Agua',
        defaultConcMm: 0.03,
        solutionColorHex: '#9A4D18',
        description: 'Al formar el complejo I₃⁻, aparecen dos bandas enormes de transferencia en UV (288 y 351 nm) cuya cola azul tiñe la solución de ámbar-marrón.',
        lambdaMain: 351,
        maxEpsilon: 40000,
        bands: [
          { lambdaMax: 288, epsilon: 40000, widthNm: 18, transition: 'σ → σ* (I₃⁻ simétrico)', description: 'Banda de máxima intensidad en UV.' },
          { lambdaMax: 351, epsilon: 26400, widthNm: 22, transition: 'π → σ* (I₃⁻)', description: 'Pico estándar para cuantificación yodométrica de alta sensibilidad.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_nitrate',
        name: 'Ion Nitrato (NO₃⁻)',
        formula: 'NaNO₃',
        solvent: 'Agua Ultrapura',
        defaultConcMm: 0.1,
        solutionColorHex: '#F3F7FA',
        description: 'Estándar mundial para análisis de aguas residuales y potables (APHA 4500-NO₃⁻): banda π → π* muy intensa en 202 nm y débil n → π* en 302 nm.',
        lambdaMain: 202,
        maxEpsilon: 9900,
        bands: [
          { lambdaMax: 202, epsilon: 9900, widthNm: 11, transition: 'π → π* (NO₃⁻)', description: 'Pico cuantitativo a 220/202 nm en control ambiental de aguas.', isPrimaryPeak: true },
          { lambdaMax: 302, epsilon: 7.2, widthNm: 18, transition: 'n → π* (Prohibida)', description: 'Banda débil detectable únicamente en altas concentraciones.' }
        ]
      },
      {
        id: 'uv_nitrite',
        name: 'Ion Nitrito (NO₂⁻)',
        formula: 'NaNO₂',
        solvent: 'Agua',
        defaultConcMm: 0.15,
        solutionColorHex: '#F3F7FA',
        description: 'Exhibe banda intensa a 210 nm y banda n → π* diagnóstica bien definida a 355 nm.',
        lambdaMain: 210,
        maxEpsilon: 5400,
        bands: [
          { lambdaMax: 210, epsilon: 5400, widthNm: 12, transition: 'π → π* (NO₂⁻)', description: 'Banda principal en UV lejano.', isPrimaryPeak: true },
          { lambdaMax: 355, epsilon: 23, widthNm: 20, transition: 'n → π* (Par libre N)', description: 'Banda de diagnóstico específica frente al nitrato.' }
        ]
      },
      {
        id: 'uv_ozone',
        name: 'Ozono (Banda de Hartley)',
        formula: 'O₃',
        solvent: 'Fase Gas / Agua',
        defaultConcMm: 0.25,
        solutionColorHex: '#EBF5FC',
        description: 'Absorción vital de la capa de ozono estratosférica entre 210 y 300 nm (máximo a 255 nm) que bloquea la radiación UVC/UVB letal solar.',
        lambdaMain: 255,
        maxEpsilon: 3000,
        bands: [
          { lambdaMax: 255, epsilon: 3000, widthNm: 24, transition: 'π → π* (Banda Hartley)', description: 'Escudo fotoquímico planetario contra radiación solar UVC.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_iodide',
        name: 'Ion Yoduro (I⁻)',
        formula: 'KI',
        solvent: 'Agua',
        defaultConcMm: 0.08,
        solutionColorHex: '#F3F7FA',
        description: 'Transición de Transferencia de Carga al Solvente (CTTS) muy nítida a 226 nm empleada en monitoreo óptico de salinidad.',
        lambdaMain: 226,
        maxEpsilon: 13500,
        bands: [
          { lambdaMax: 194, epsilon: 13500, widthNm: 9, transition: 'CTTS (²P₁/₂)', description: 'Primer pico de transferencia electrónica al agua.' },
          { lambdaMax: 226, epsilon: 12800, widthNm: 10, transition: 'CTTS (²P₃/₂)', description: 'Banda nítida usada en calibración UV profunda.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_bromine',
        name: 'Bromo Molecular (Br₂)',
        formula: 'Br₂',
        solvent: 'Tetracloruro de Carbono',
        defaultConcMm: 4.0,
        solutionColorHex: '#B64622',
        description: 'Absorbe en el violeta-azul a 415 nm produciendo líquido y solución marrón rojizo característico.',
        lambdaMain: 415,
        maxEpsilon: 210,
        bands: [
          { lambdaMax: 415, epsilon: 210, widthNm: 38, transition: 'π* → σ* (Br₂)', description: 'Banda azul-violeta que genera el color pardo rojizo.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_hypochlorite',
        name: 'Ion Hipoclorito (ClO⁻)',
        formula: 'NaClO',
        solvent: 'Agua pH 10',
        defaultConcMm: 2.2,
        solutionColorHex: '#F7F9E8',
        description: 'Agente blanqueador activo cuantificado directamente por su banda a 292 nm (ε = 350).',
        lambdaMain: 292,
        maxEpsilon: 350,
        bands: [
          { lambdaMax: 292, epsilon: 350, widthNm: 22, transition: 'n → σ* / π → π*', description: 'Pico estándar para titular cloro activo por UV-Vis.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_h2o2',
        name: 'Peróxido de Hidrógeno (H₂O₂)',
        formula: 'H₂O₂',
        solvent: 'Agua',
        defaultConcMm: 4.0,
        solutionColorHex: '#F3F7FA',
        description: 'Sin cromóforos π: solo absorbe débilmente por transiciones n → σ* en el límite UV profundo por debajo de 240 nm.',
        lambdaMain: 200,
        maxEpsilon: 190,
        bands: [
          { lambdaMax: 200, epsilon: 190, widthNm: 18, transition: 'n → σ* (Enlace O–O)', description: 'Cola exponencial en el ultravioleta profundo.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_uranyl',
        name: 'Ion Uranilo [UO₂(H₂O)₅]²⁺',
        formula: 'UO₂²⁺',
        solvent: 'HNO₃ diluido',
        defaultConcMm: 100,
        solutionColorHex: '#DCE94E',
        description: 'Complejo de actínido con progresión vibrónica O=U=O de 6 dedos entre 390 y 450 nm que da fluorescencia verde-amarilla intensa.',
        lambdaMain: 415,
        maxEpsilon: 8.5,
        bands: [
          { lambdaMax: 403, epsilon: 6.2, widthNm: 7, transition: 'TCLM (O → U 5f) v=2', description: 'Dedo vibracional.' },
          { lambdaMax: 415, epsilon: 8.5, widthNm: 7, transition: 'TCLM (O → U 5f) v=1', description: 'Pico vibracional máximo característico.', isPrimaryPeak: true },
          { lambdaMax: 428, epsilon: 7.4, widthNm: 7, transition: 'TCLM (O → U 5f) v=0', description: 'Acoplamiento vibracional uranilo.' }
        ]
      }
    ]
  },

  // 11. POLIFENOLES, ANTOCIANINAS Y PRODUCTOS NATURALES
  {
    id: 'polyphenols',
    name: 'Polifenoles, Flavonoides y Antocianinas',
    chromophoreType: 'Banda II (Anillo A, ~270 nm) y Banda I (Cinamoílo, 330–520 nm)',
    spectralSignature:
      'Los flavonoides muestran invariablemente dos bandas: Banda II (240–285 nm, anillo benzoílo A) y Banda I (300–400 nm en flavonoles, o 510–535 nm en antocianinas catiónicas como los frutos rojos).',
    compounds: [
      {
        id: 'uv_quercetin',
        name: 'Quercetina',
        formula: 'C₁₅H₁₀O₇',
        solvent: 'Metanol',
        defaultConcMm: 0.04,
        solutionColorHex: '#ECE04E',
        description: 'Flavonol antioxidante por excelencia: presenta Banda II en 255 nm y Banda I muy intensa desplazada a 371 nm (ε = 21,000).',
        lambdaMain: 371,
        maxEpsilon: 21000,
        bands: [
          { lambdaMax: 255, epsilon: 19500, widthNm: 15, transition: 'π → π* (Banda II Benzoílo)', description: 'Anillo A del esqueleto flavonoide.' },
          { lambdaMax: 371, epsilon: 21000, widthNm: 22, transition: 'π → π* (Banda I Cinamoílo)', description: 'Conjugación extendida con el anillo B catecol.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_cyanidin',
        name: 'Cianidina-3-glucósido (Antocianina)',
        formula: 'C₂₁H₂₁ClO₁₁',
        solvent: 'Agua pH 1 (HCl)',
        defaultConcMm: 0.03,
        solutionColorHex: '#BD2446',
        description: 'Catión flavilio responsable del color rojo de arándanos, fresas y uvas; su absorción pH-dependiente a 516 nm se usa en el método diferencial.',
        lambdaMain: 516,
        maxEpsilon: 26900,
        bands: [
          { lambdaMax: 280, epsilon: 16500, widthNm: 15, transition: 'π → π* (Aromática UV)', description: 'Banda fenólica común.' },
          { lambdaMax: 516, epsilon: 26900, widthNm: 30, transition: 'π → π* (Catión flavilio)', description: 'Absorbe verde-azul generando rojo carmesí a pH ácido.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_resveratrol',
        name: 'trans-Resveratrol',
        formula: 'C₁₄H₁₂O₃',
        solvent: 'Etanol',
        defaultConcMm: 0.03,
        solutionColorHex: '#F7F8FA',
        description: 'Estilbeno conjugado de la uva con máxima absorción característica en 306 nm (ε = 31,000).',
        lambdaMain: 306,
        maxEpsilon: 31000,
        bands: [
          { lambdaMax: 216, epsilon: 22000, widthNm: 12, transition: 'π → π* (Fenólica)', description: 'Banda corta.' },
          { lambdaMax: 306, epsilon: 31000, widthNm: 18, transition: 'π → π* (Puente estilbeno trans)', description: 'Pico intenso en UVA empleado en análisis de vinos.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_gallic_acid',
        name: 'Ácido Gálico',
        formula: 'C₇H₆O₅',
        solvent: 'Agua / Etanol',
        defaultConcMm: 0.09,
        solutionColorHex: '#F6F7F8',
        description: 'Patrón estándar de calibración en ensayos de polifenoles totales (Folin-Ciocalteu) y UV directo a 271 nm.',
        lambdaMain: 271,
        maxEpsilon: 10200,
        bands: [
          { lambdaMax: 215, epsilon: 24000, widthNm: 11, transition: 'π → π* (Trihidroxibenzoato)', description: 'Banda corta intensa.' },
          { lambdaMax: 271, epsilon: 10200, widthNm: 14, transition: 'π → π* (Anillo galoílo)', description: 'Pico estándar de equivalentes de ácido gálico.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_catechin',
        name: '(+)-Catequina',
        formula: 'C₁₅H₁₄O₆',
        solvent: 'Metanol',
        defaultConcMm: 0.22,
        solutionColorHex: '#F7F6F2',
        description: 'Flavan-3-ol sin doble enlace en C2–C3; por carecer de conjugación entre A y B solo absorbe a 279 nm.',
        lambdaMain: 279,
        maxEpsilon: 4050,
        bands: [
          { lambdaMax: 210, epsilon: 32000, widthNm: 12, transition: 'π → π* (Catecol)', description: 'Banda intensa en 210 nm.' },
          { lambdaMax: 279, epsilon: 4050, widthNm: 12, transition: 'π → π* (Banda B no conjugada)', description: 'Ausencia de Banda I visible por saturación en anillo C.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_caffeic_acid',
        name: 'Ácido Caféico',
        formula: 'C₉H₈O₄',
        solvent: 'Etanol',
        defaultConcMm: 0.05,
        solutionColorHex: '#FAF7EB',
        description: 'Ácido hidroxicinámico con banda doble característica de conjugación acrílica en 298 y 325 nm.',
        lambdaMain: 325,
        maxEpsilon: 18500,
        bands: [
          { lambdaMax: 242, epsilon: 10500, widthNm: 13, transition: 'π → π* (Catecol)', description: 'Banda corta.' },
          { lambdaMax: 298, epsilon: 14200, widthNm: 14, transition: 'π → π* (Hombro)', description: 'Hombro conjugado.' },
          { lambdaMax: 325, epsilon: 18500, widthNm: 16, transition: 'π → π* (Cinamoílo)', description: 'Pico diagnóstico principal.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_chlorogenic_acid',
        name: 'Ácido Clorogénico (Café Verde)',
        formula: 'C₁₆H₁₈O₉',
        solvent: 'Agua / Metanol',
        defaultConcMm: 0.05,
        solutionColorHex: '#FAF8F0',
        description: 'Éster del ácido caféico con ácido quínico; presenta máximo inconfundible a 328 nm en extractos de café.',
        lambdaMain: 328,
        maxEpsilon: 18900,
        bands: [
          { lambdaMax: 244, epsilon: 9800, widthNm: 13, transition: 'π → π*', description: 'Banda UV corta.' },
          { lambdaMax: 328, epsilon: 18900, widthNm: 17, transition: 'π → π* (Éster hidroxicinámico)', description: 'Marcador cuantitativo del café verde.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_rutin',
        name: 'Rutina (Quercetina-3-rutinósido)',
        formula: 'C₂₇H₃₀O₁₆',
        solvent: 'Metanol',
        defaultConcMm: 0.04,
        solutionColorHex: '#F3EB6C',
        description: 'Glucósido flavonoide que desplaza ligeramente la Banda I de la quercetina a 358 nm por glucosilación en C3.',
        lambdaMain: 358,
        maxEpsilon: 19500,
        bands: [
          { lambdaMax: 257, epsilon: 21500, widthNm: 15, transition: 'π → π* (Banda II)', description: 'Banda benzoílo.' },
          { lambdaMax: 358, epsilon: 19500, widthNm: 20, transition: 'π → π* (Banda I)', description: 'Banda I desplazada 13 nm al azul respecto a quercetina libre.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_hesperidin',
        name: 'Hesperidina (Cítricos)',
        formula: 'C₂₈H₃₄O₁₅',
        solvent: 'Metanol',
        defaultConcMm: 0.05,
        solutionColorHex: '#FAF7ED',
        description: 'Flavanona abundante en cáscara de naranja con Banda II predominante a 284 nm y hombro débil en 328 nm.',
        lambdaMain: 284,
        maxEpsilon: 18400,
        bands: [
          { lambdaMax: 284, epsilon: 18400, widthNm: 14, transition: 'π → π* (Flavanona Banda II)', description: 'Pico principal de cuantificación cítrica.', isPrimaryPeak: true },
          { lambdaMax: 328, epsilon: 3400, widthNm: 18, transition: 'n → π* / π → π* (Banda I débil)', description: 'Banda débil por ausencia de doble enlace C2=C3.' }
        ]
      },
      {
        id: 'uv_egcg',
        name: 'Galato de Epigalocatequina (EGCG)',
        formula: 'C₂₂H₁₈O₁₁',
        solvent: 'Agua',
        defaultConcMm: 0.08,
        solutionColorHex: '#FAF7F0',
        description: 'Polifenol principal del té verde; la presencia del grupo galoato incrementa notablemente la absorción a 274 nm.',
        lambdaMain: 274,
        maxEpsilon: 11500,
        bands: [
          { lambdaMax: 212, epsilon: 48000, widthNm: 12, transition: 'π → π*', description: 'Absorción de alta energía.' },
          { lambdaMax: 274, epsilon: 11500, widthNm: 15, transition: 'π → π* (Éster galoílo)', description: 'Pico estándar para contenido antioxidante de té verde.', isPrimaryPeak: true }
        ]
      }
    ]
  },

  // 12. SOLVENTES DE REFERENCIA Y CORTE UV (UV CUT-OFF)
  {
    id: 'solvents',
    name: 'Solventes y Límite de Corte UV (Cut-Off)',
    chromophoreType: 'Transparencia Espectral del Blanco (I₀)',
    spectralSignature:
      '¡Lección práctica crítica! Todo solvente absorbe intensamente por debajo de su longitud de onda de corte (Cut-off): agua y acetonitrilo transmiten hasta 190 nm, mientras que acetona (330 nm) y tolueno (285 nm) bloquean todo el UV medio.',
    compounds: [
      {
        id: 'uv_water_solvent',
        name: 'Agua Ultrapura (HPLC / Milli-Q)',
        formula: 'H₂O',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#EBF4F9',
        description: 'El mejor blanco universal hasta 190 nm (cut-off < 190 nm); solo muestra absorción fuerte en el UV de vacío por debajo de 185 nm.',
        lambdaMain: 192,
        maxEpsilon: 0.35,
        bands: [
          { lambdaMax: 190, epsilon: 0.35, widthNm: 6, transition: 'n → σ* (Borde H₂O)', description: 'Transparente prácticamente en todo el rango 195–800 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_acetonitrile',
        name: 'Acetonitrilo Grado UV',
        formula: 'CH₃CN',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#EFF5F9',
        description: 'Solvente estrella en HPLC-DAD: su corte UV de 190 nm permite detectar enlaces amida, ésteres y alquenos sin interferencia del blanco.',
        lambdaMain: 194,
        maxEpsilon: 0.9,
        bands: [
          { lambdaMax: 192, epsilon: 0.9, widthNm: 7, transition: 'π → π* (Nitrilo)', description: 'Corte UV excelente en 190 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_hexane_solvent',
        name: 'n-Hexano Espectroscópico',
        formula: 'C₆H₁₄',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#F2F6FA',
        description: 'Solo posee enlaces σ simples C–C y C–H: transparente hasta 195 nm y respeta la estructura fina vibrónica de los analitos no polares.',
        lambdaMain: 196,
        maxEpsilon: 1.1,
        bands: [
          { lambdaMax: 195, epsilon: 1.1, widthNm: 8, transition: 'σ → σ* (Alcano)', description: 'Sin transiciones por encima de 195 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_methanol',
        name: 'Metanol Grado UV',
        formula: 'CH₃OH',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#EFF5F8',
        description: 'Corte UV en 205 nm por las transiciones n → σ* del átomo de oxígeno; excelente para cromóforos orgánicos > 210 nm.',
        lambdaMain: 205,
        maxEpsilon: 1.4,
        bands: [
          { lambdaMax: 202, epsilon: 1.4, widthNm: 10, transition: 'n → σ* (Oxígeno –OH)', description: 'Bloqueo completo por debajo de 205 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_ethanol_solvent',
        name: 'Etanol Absoluto',
        formula: 'C₂H₅OH',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#EFF5F8',
        description: 'Corte UV en 210 nm (ligeramente mayor al metanol); ideal para vitaminas liposolubles, flavonoides y aromáticos.',
        lambdaMain: 210,
        maxEpsilon: 1.5,
        bands: [
          { lambdaMax: 206, epsilon: 1.5, widthNm: 11, transition: 'n → σ* (Alcohólico)', description: 'Cut-off práctico a 210 nm en cubeta de 1 cm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_dichloromethane',
        name: 'Diclorometano (CH₂Cl₂)',
        formula: 'CH₂Cl₂',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#EEF4F7',
        description: 'Los pares libres de ambos cloros generan corte UV a 233 nm: útil para carotenoides y colorantes, pero ciego debajo de 235 nm.',
        lambdaMain: 230,
        maxEpsilon: 1.7,
        bands: [
          { lambdaMax: 222, epsilon: 1.7, widthNm: 14, transition: 'n → σ* (C–Cl)', description: 'Pared opaca de absorción debajo de 233 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_chloroform',
        name: 'Cloroformo (CHCl₃)',
        formula: 'CHCl₃',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#EEF4F7',
        description: 'Tres átomos de cloro elevan el límite de corte UV hasta 245 nm (además suele estabilizarse con etanol o amileno).',
        lambdaMain: 245,
        maxEpsilon: 1.8,
        bands: [
          { lambdaMax: 235, epsilon: 1.8, widthNm: 16, transition: 'n → σ* (C–Cl₃)', description: 'Satura al detector por debajo de 245 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_dmso',
        name: 'Dimetilsulfóxido (DMSO)',
        formula: '(CH₃)₂SO',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#EFF4F8',
        description: 'El enlace sulfóxido S=O absorbe intensamente debajo de 268 nm; si disuelves una muestra proteica en DMSO puro, bloqueará la lectura a 260 nm.',
        lambdaMain: 268,
        maxEpsilon: 1.9,
        bands: [
          { lambdaMax: 252, epsilon: 1.9, widthNm: 19, transition: 'n → π* / π → π* (S=O)', description: 'Pared espectral total por debajo de 268 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_toluene_solvent',
        name: 'Tolueno (Solvente Aromático)',
        formula: 'C₇H₈',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#EEF3F7',
        description: 'Al ser aromático, absorbe toda la luz hasta 285 nm; solo utilizable como blanco en espectrofotometría visible (> 300 nm).',
        lambdaMain: 284,
        maxEpsilon: 2.1,
        bands: [
          { lambdaMax: 262, epsilon: 2.1, widthNm: 22, transition: 'π → π* (Saturación aromática)', description: 'Opacidad absoluta bajo 285 nm.', isPrimaryPeak: true }
        ]
      },
      {
        id: 'uv_acetone_solvent',
        name: 'Acetona (Solvente)',
        formula: 'C₃H₆O',
        solvent: 'Puro (100%)',
        defaultConcMm: 1.0,
        solutionColorHex: '#F3F6F9',
        description: '¡Trampa clásica de laboratorio! La banda n → π* de acetona pura satura el blanco hasta 330 nm, volviendo imposible medir ADN (260 nm) o proteínas (280 nm) en acetona.',
        lambdaMain: 325,
        maxEpsilon: 2.1,
        bands: [
          { lambdaMax: 292, epsilon: 2.1, widthNm: 32, transition: 'n → π* saturada (C=O puro)', description: 'Corte UV alto a 330 nm: solo usable en región visible (>340 nm).', isPrimaryPeak: true }
        ]
      }
    ]
  }
];

export const ALL_UVVIS_COMPOUNDS: UvVisCompound[] = UVVIS_GROUPS_DATA.flatMap((g) => g.compounds);

/**
 * Evaluates theoretical Absorbance A(λ) for a given UV-Vis compound, concentration (mM),
 * path length b (cm), spectral bandwidth SBW (nm), and cuvette material at wavelength λ (nm).
 */
export function computeUvVisAbsorbance(
  compound: UvVisCompound,
  lambdaNm: number,
  concMm: number,
  pathLengthCm: number,
  slitWidthNm: number,
  cuvetteMaterial: 'quartz' | 'glass' | 'plastic'
): number {
  let absorbance = 0;

  // Spectral bandwidth broadening factor (wider slit blurs sharp bands slightly)
  const slitBroaden = Math.max(0, (slitWidthNm - 1.0) * 0.8);

  const isSolventCutoffDemo = UVVIS_GROUPS_DATA[11].compounds.some((c) => c.id === compound.id);

  if (isSolventCutoffDemo) {
    // Solvent cut-off curve: rises steeply below lambdaMain
    for (const band of compound.bands) {
      const sigma = band.widthNm + slitBroaden;
      if (lambdaNm <= band.lambdaMax) {
        absorbance += 2.5 * concMm * pathLengthCm;
      } else {
        const diff = lambdaNm - band.lambdaMax;
        absorbance += band.epsilon * concMm * pathLengthCm * Math.exp(-(diff * diff) / (2 * sigma * sigma));
      }
    }
  } else {
    // Beer-Lambert sum of Gaussian electronic transitions: A = Σ ε_i(λ) · b · c
    const concM = concMm / 1000;
    for (const band of compound.bands) {
      const sigma = band.widthNm + slitBroaden;
      // Peak broadening slightly lowers peak height when SBW >> band.widthNm
      const peakRetention = band.widthNm / sigma;
      const diff = lambdaNm - band.lambdaMax;
      const epsAtLambda = band.epsilon * peakRetention * Math.exp(-(diff * diff) / (2 * sigma * sigma));
      absorbance += epsAtLambda * pathLengthCm * concM;
    }
  }

  // Cuvette material UV cutoff artifact
  if (cuvetteMaterial === 'glass' && lambdaNm < 330) {
    const wall = Math.exp((330 - lambdaNm) / 14) - 1;
    absorbance += Math.min(3.2, wall * 0.45);
  } else if (cuvetteMaterial === 'plastic' && lambdaNm < 300) {
    const wall = Math.exp((300 - lambdaNm) / 11) - 1;
    absorbance += Math.min(3.2, wall * 0.5);
  }

  return Math.min(3.5, Math.max(0, absorbance));
}

/**
 * Maps a wavelength (nm) in 200-800 nm to an accurate display RGB hex color for canvas beam rendering.
 */
export function wavelengthToColor(nm: number): string {
  if (nm < 380) {
    // Ultraviolet depicted as luminous deep violet-indigo
    const t = Math.max(0, (nm - 200) / 180);
    const r = Math.round(110 + t * 40);
    const g = Math.round(70 + t * 20);
    const b = Math.round(210 + t * 45);
    return `rgb(${r}, ${g}, ${b})`;
  }
  if (nm >= 380 && nm < 440) {
    const t = (440 - nm) / (440 - 380);
    return `rgb(${Math.round(t * 255)}, 40, 255)`;
  }
  if (nm >= 440 && nm < 490) {
    const t = (nm - 440) / (490 - 440);
    return `rgb(20, ${Math.round(t * 245)}, 255)`;
  }
  if (nm >= 490 && nm < 510) {
    const t = (510 - nm) / (510 - 490);
    return `rgb(20, 245, ${Math.round(t * 255)})`;
  }
  if (nm >= 510 && nm < 580) {
    const t = (nm - 510) / (580 - 510);
    return `rgb(${Math.round(t * 255)}, 240, 40)`;
  }
  if (nm >= 580 && nm < 645) {
    const t = (645 - nm) / (645 - 580);
    return `rgb(255, ${Math.round(t * 235)}, 30)`;
  }
  if (nm >= 645 && nm <= 750) {
    return `rgb(238, 52, 48)`;
  }
  // Near-IR (>750 nm) depicted as deep crimson-rosewood
  return `rgb(155, 42, 58)`;
}
