export type NmrMultiplicity = 's' | 'd' | 't' | 'q' | 'quint' | 'sept' | 'm';

export interface NmrSignal {
  shiftPpm: number; // chemical shift delta in ppm (-0.2 to 13.0)
  protons: number; // proton integration count (1, 2, 3, 6, 9, ...)
  multiplicity: NmrMultiplicity;
  jHz: number; // coupling constant in Hz (0 for singlets, ~7 Hz for aliphatic, ~8 Hz ortho aromatic)
  assignment: string; // e.g. '–CH₃', '–OCH₂–', 'Ar–H', '–CHO'
  description: string;
  isBroad?: boolean; // exchangeable O–H or N–H protons
  isKeySignal?: boolean;
}

export interface NmrCompound {
  id: string;
  name: string;
  formula: string;
  defaultSolvent: 'CDCl3' | 'DMSO-d6' | 'D2O';
  keyFeatureNote: string;
  description: string;
  signals: NmrSignal[];
}

export interface NmrGroupCategory {
  id: string;
  name: string;
  chemicalShiftZone: string;
  couplingSignature: string;
  compounds: NmrCompound[];
}

function s(
  shiftPpm: number,
  protons: number,
  multiplicity: NmrMultiplicity,
  jHz: number,
  assignment: string,
  description: string,
  opts?: { isBroad?: boolean; isKeySignal?: boolean }
): NmrSignal {
  return {
    shiftPpm,
    protons,
    multiplicity,
    jHz,
    assignment,
    description,
    isBroad: opts?.isBroad,
    isKeySignal: opts?.isKeySignal,
  };
}

function mkNmr(
  id: string,
  name: string,
  formula: string,
  defaultSolvent: 'CDCl3' | 'DMSO-d6' | 'D2O',
  keyFeatureNote: string,
  description: string,
  signals: NmrSignal[]
): NmrCompound {
  return { id, name, formula, defaultSolvent, keyFeatureNote, description, signals };
}

export const NMR_GROUPS_DATA: NmrGroupCategory[] = [
  // 1. ALCANOS Y HALOALCANOS
  {
    id: 'alkanes_halides',
    name: 'Alcanos y Haloalcanos',
    chemicalShiftZone: '0.8 – 4.3 ppm',
    couplingSignature: 'Regla n+1 clásica (³J ≈ 7 Hz) y desapantallamiento inductivo por Cl/Br/I',
    compounds: [
      mkNmr('nmr_bromoethane', 'Bromoetano', 'CH₃CH₂Br', 'CDCl3', 'Cuartete 3.43 ppm (2H) + Triplete 1.66 ppm (3H)', 'Patrón etilo de libro de texto: el bromo desapantalla al CH₂ hasta 3.43 ppm mientras CH₃ queda a 1.66 ppm.', [
        s(3.43, 2, 'q', 7.3, '–CH₂Br', 'Cuartete por 3 vecinos del metilo (n+1 = 4)', { isKeySignal: true }),
        s(1.66, 3, 't', 7.3, '–CH₃', 'Triplete por 2 vecinos del metileno (n+1 = 3)', { isKeySignal: true })
      ]),
      mkNmr('nmr_1_bromopropane', '1-Bromopropano', 'CH₃CH₂CH₂Br', 'CDCl3', '3.39 (t, 2H) / 1.88 (sext, 2H) / 1.03 (t, 3H)', 'Cadena propilo lineal mostrando efecto inductivo decreciente con la distancia al bromo.', [
        s(3.39, 2, 't', 6.8, '–CH₂Br', 'Triplete desapantallado unido al bromo', { isKeySignal: true }),
        s(1.88, 2, 'm', 7.0, '–CH₂–', 'Multiplete central acoplado a 5 protones vecinos'),
        s(1.03, 3, 't', 7.3, '–CH₃', 'Metilo terminal alifático')
      ]),
      mkNmr('nmr_2_bromopropane', '2-Bromopropano', '(CH₃)₂CHBr', 'CDCl3', 'Septete 4.28 ppm (1H) + Doblete 1.71 ppm (6H)', 'Firma diagnóstica de grupo isopropilo unido a halógeno: relación de áreas 1:6.', [
        s(4.28, 1, 'sept', 6.7, '–CH(Br)–', 'Septete clásico acoplado a los 6 H equivalentes', { isKeySignal: true }),
        s(1.71, 6, 'd', 6.7, '–(CH₃)₂', 'Doblete intenso equivalente a 6 protones', { isKeySignal: true })
      ]),
      mkNmr('nmr_tert_butyl_chloride', 'Cloruro de terc-Butilo', '(CH₃)₃CCl', 'CDCl3', 'Singulete único a 1.60 ppm (9H)', 'Sin protones vecinos en el carbono cuaternario: 9 protones equivalentes producen un solo pico.', [
        s(1.60, 9, 's', 0, '–C(CH₃)₃', 'Singulete intenso de 9H sin desdoblamiento J', { isKeySignal: true })
      ]),
      mkNmr('nmr_dichloromethane', 'Diclorometano (CH₂Cl₂)', 'CH₂Cl₂', 'CDCl3', 'Singulete a 5.30 ppm (2H)', 'Dos cloros arrastran fuertemente la densidad electrónica empujando al metileno hasta 5.30 ppm.', [
        s(5.30, 2, 's', 0, '–CH₂Cl₂', 'Singulete único muy desapantallado por 2 átomos Cl', { isKeySignal: true })
      ]),
      mkNmr('nmr_12_dichloroethane', '1,2-Dicloroetano', 'ClCH₂CH₂Cl', 'CDCl3', 'Singulete a 3.73 ppm (4H)', 'Por simetría molecular perfecta ambos CH₂Cl son químicamente equivalentes y no se desdoblan entre sí.', [
        s(3.73, 4, 's', 0, 'ClCH₂–CH₂Cl', 'Singulete simétrico de 4H equivalentes', { isKeySignal: true })
      ]),
      mkNmr('nmr_112_trichloroethane', '1,1,2-Tricloroetano', 'Cl₂CH–CH₂Cl', 'CDCl3', 'Triplete 5.77 ppm (1H) + Doblete 3.95 ppm (2H)', 'Ejemplo puro de acoplamiento AX₂ con dos cloros en un carbono y uno en el vecino.', [
        s(5.77, 1, 't', 6.1, '–CHCl₂', 'Triplete a campo muy bajo por efecto de 2 cloros', { isKeySignal: true }),
        s(3.95, 2, 'd', 6.1, '–CH₂Cl', 'Doblete intenso acoplado al único protón vecino', { isKeySignal: true })
      ]),
      mkNmr('nmr_cyclohexane', 'Ciclohexano', 'C₆H₁₂', 'CDCl3', 'Singulete agudo a 1.43 ppm (12H)', 'Inversión rápida de silla a temperatura ambiente hace equivalentes a los 12 protones.', [
        s(1.43, 12, 's', 0, '(CH₂)₆', 'Singulete único alifático de referencia secundaria', { isKeySignal: true })
      ]),
      mkNmr('nmr_iodomethane', 'Yodometano', 'CH₃I', 'CDCl3', 'Singulete a 2.16 ppm (3H)', 'Menor electronegatividad del yodo respecto al bromo/cloro mantiene al metilo a 2.16 ppm.', [
        s(2.16, 3, 's', 0, 'CH₃–I', 'Singulete agudo de grupo metilo halogenado', { isKeySignal: true })
      ]),
      mkNmr('nmr_1_chlorobutane', '1-Clorobutano', 'CH₃CH₂CH₂CH₂Cl', 'CDCl3', '3.52 (t, 2H) / 1.75 (m, 2H) / 1.47 (m, 2H) / 0.94 (t, 3H)', 'Cadena C4 que muestra cómo los campos B₀ altos separan mejor los multipletes internos.', [
        s(3.52, 2, 't', 6.7, '–CH₂Cl', 'Triplete unido al cloro', { isKeySignal: true }),
        s(1.75, 2, 'quint', 7.0, '–CH₂– (β)', 'Quintete en posición beta'),
        s(1.47, 2, 'm', 7.2, '–CH₂– (γ)', 'Multiplete gamma que se separa mejor a ≥400 MHz'),
        s(0.94, 3, 't', 7.3, '–CH₃', 'Triplete metilo terminal')
      ])
    ]
  },

  // 2. ALQUENOS Y ALQUINOS
  {
    id: 'alkenes_alkynes',
    name: 'Alquenos y Alquinos',
    chemicalShiftZone: '2.0 – 6.8 ppm',
    couplingSignature: 'Anisotropía diamagnética π: =C–H en 4.8–6.6 ppm (J_trans > J_cis) y ≡C–H en ~2.0–3.1 ppm',
    compounds: [
      mkNmr('nmr_styrene', 'Estireno', 'C₆H₅CH=CH₂', 'CDCl3', '6.72 (dd, 1H) / 5.76 (d, 1H) / 5.25 (d, 1H) + Ar 7.35', 'Sistema vinílico AMX completo: acoplamiento trans (17.6 Hz) claramente mayor que cis (10.9 Hz).', [
        s(7.38, 5, 'm', 7.5, 'C₆H₅–', 'Anillo fenilo aromático'),
        s(6.72, 1, 'q', 14.0, 'Ar–CH=', 'Doble doblete vinílico acoplado a ambos =CH₂', { isKeySignal: true }),
        s(5.76, 1, 'd', 17.6, '=CH (trans)', 'Rama trans con J grande (17.6 Hz)', { isKeySignal: true }),
        s(5.25, 1, 'd', 10.9, '=CH (cis)', 'Rama cis con J mediana (10.9 Hz)', { isKeySignal: true })
      ]),
      mkNmr('nmr_1_hexene', '1-Hexeno', 'CH₂=CH–(CH₂)₃CH₃', 'CDCl3', '5.81 (m, 1H) / 4.96 (m, 2H) / 2.04 (q, 2H) / 0.90 (t, 3H)', 'Alqueno terminal clásico con protones olefínicos cerca de 5.8 y 4.96 ppm.', [
        s(5.81, 1, 'm', 10.2, '–CH=', 'Protón olefínico interno a 5.81 ppm', { isKeySignal: true }),
        s(4.96, 2, 'd', 13.5, '=CH₂', 'Dos protones terminales =CH₂ cerca de 5.0 ppm', { isKeySignal: true }),
        s(2.04, 2, 'q', 7.0, '=CH–CH₂–', 'Metileno alílico a 2.04 ppm'),
        s(1.34, 4, 'm', 7.0, '–CH₂CH₂–', 'Metilenos alifáticos internos'),
        s(0.90, 3, 't', 7.2, '–CH₃', 'Metilo terminal')
      ]),
      mkNmr('nmr_phenylacetylene', 'Fenilacetileno', 'C₆H₅C≡CH', 'CDCl3', 'Ar 7.48 & 7.32 (5H) + Singulete ≡C–H a 3.07 ppm (1H)', 'El cono de apantallamiento cilíndrico del triple enlace sitúa el protón ≡C–H en 3.07 ppm.', [
        s(7.49, 2, 'd', 7.8, 'Ar–H (orto)', 'Protones orto aromáticos'),
        s(7.32, 3, 'm', 7.4, 'Ar–H (m,p)', 'Protones meta y para'),
        s(3.07, 1, 's', 0, '–C≡CH', 'Singulete agudo acetilénico apantallado por cono π', { isKeySignal: true })
      ]),
      mkNmr('nmr_1_hexyne', '1-Hexino', 'HC≡C–(CH₂)₃CH₃', 'CDCl3', '1.94 (t, 1H, J=2.6 Hz) / 2.18 (m, 2H) / 0.91 (t, 3H)', 'Presenta acoplamiento de largo alcance (⁴J ≈ 2.6 Hz) entre ≡C–H y el metileno propargílico.', [
        s(2.18, 2, 't', 6.9, '≡C–CH₂–', 'Metileno propargílico acoplado en largo alcance'),
        s(1.94, 1, 't', 2.6, 'HC≡C–', 'Triplete fino acetilénico a 1.94 ppm (⁴J=2.6 Hz)', { isKeySignal: true }),
        s(1.45, 4, 'm', 7.0, '–CH₂CH₂–', 'Cadena butilo interna'),
        s(0.91, 3, 't', 7.2, '–CH₃', 'Metilo terminal')
      ]),
      mkNmr('nmr_cyclohexene', 'Ciclohexeno', 'C₆H₁₀', 'CDCl3', '5.68 (s ancho, 2H) / 2.00 (m, 4H) / 1.61 (m, 4H)', 'Tres señales limpias por simetría anular del doble enlace cis endocíclico.', [
        s(5.68, 2, 't', 2.2, '–CH=CH–', 'Protones vinílicos anulares simétricos', { isKeySignal: true }),
        s(2.00, 4, 'm', 4.5, '–CH₂– (alílico)', 'Cuatro protones alílicos adyacentes al C=C'),
        s(1.61, 4, 'm', 4.5, '–CH₂– (homoalílico)', 'Cuatro metilenos alejados del doble enlace')
      ]),
      mkNmr('nmr_isoprene', 'Isopreno', 'CH₂=C(CH₃)–CH=CH₂', 'CDCl3', '6.45 (dd, 1H) / 5.19 & 5.02 (4H) / 1.86 (s, 3H)', 'Dieno conjugado con cuatro señales olefínicas bien resueltas y metilo alílico a 1.86 ppm.', [
        s(6.45, 1, 'q', 14.0, '–CH=CH₂', 'Protón olefínico interno conjugado', { isKeySignal: true }),
        s(5.19, 2, 'd', 16.5, '=CH₂ (trans)', 'Protones terminales en cis/trans'),
        s(5.02, 2, 'd', 10.5, '=CH₂ (cis)', 'Segundo par olefínico terminal'),
        s(1.86, 3, 's', 0, '–CH₃ alílico', 'Metilo sobre carbono sp²', { isKeySignal: true })
      ]),
      mkNmr('nmr_trans_stilbene', 'trans-Estilbeno', 'C₆H₅–CH=CH–C₆H₅', 'CDCl3', 'Ar 7.51–7.25 (10H) + Singulete olefínico a 7.11 ppm (2H)', 'La alta simetría convierte ambos protones trans =CH– en un singulete intenso a 7.11 ppm.', [
        s(7.51, 4, 'd', 7.6, 'Ar–H (orto)', 'Protones orto aromáticos'),
        s(7.36, 4, 't', 7.6, 'Ar–H (meta)', 'Protones meta aromáticos'),
        s(7.26, 2, 't', 7.4, 'Ar–H (para)', 'Protones para'),
        s(7.11, 2, 's', 0, 'trans –CH=CH–', 'Singulete vinílico conjugado en región aromática', { isKeySignal: true })
      ]),
      mkNmr('nmr_vinyl_acetate', 'Acetato de Vinilo', 'CH₃COOCH=CH₂', 'CDCl3', '7.27 (dd, 1H) / 4.88 (d, 1H) / 4.56 (d, 1H) / 2.13 (s, 3H)', 'El oxígeno del éster polariza fuertemente el alqueno separando =CH (7.27) y =CH₂ (4.88/4.56 ppm).', [
        s(7.27, 1, 'q', 10.5, '–O–CH=', 'Protón α-oxigenado fuertemente desapantallado', { isKeySignal: true }),
        s(4.88, 1, 'd', 14.0, '=CH (trans)', 'Protón terminal trans'),
        s(4.56, 1, 'd', 6.3, '=CH (cis)', 'Protón terminal cis'),
        s(2.13, 3, 's', 0, 'CH₃COO–', 'Metilo del grupo acetilo')
      ]),
      mkNmr('nmr_allyl_bromide', 'Bromuro de Alilo', 'CH₂=CH–CH₂Br', 'CDCl3', '5.98 (m, 1H) / 5.30 & 5.17 (2H) / 3.94 (d, 2H)', 'Grupo alilo clásico con metileno bromado en doblete a 3.94 ppm.', [
        s(5.98, 1, 'm', 10.2, '–CH=', 'Protón vinílico central'),
        s(5.30, 1, 'd', 16.9, '=CH₂ (trans)', 'Olefina terminal trans'),
        s(5.17, 1, 'd', 10.0, '=CH₂ (cis)', 'Olefina terminal cis'),
        s(3.94, 2, 'd', 7.4, '–CH₂Br', 'Doblete alílico bromado a 3.94 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_2_methyl_2_butene', '2-Metil-2-buteno', '(CH₃)₂C=CHCH₃', 'CDCl3', '5.19 (q, 1H) / 1.69 (s, 3H) / 1.60 (s, 3H) / 1.56 (d, 3H)', 'Alqueno trisustituido con un solo protón vinílico en cuartete y tres metilos alílicos (~1.6 ppm).', [
        s(5.19, 1, 'q', 6.7, '=CH–', 'Cuartete único de protón olefínico trisustituido', { isKeySignal: true }),
        s(1.69, 3, 's', 0, '–CH₃ (trans)', 'Metilo vinílico'),
        s(1.60, 3, 's', 0, '–CH₃ (cis)', 'Segundo metilo vinílico'),
        s(1.56, 3, 'd', 6.7, '=CH–CH₃', 'Doblete del metilo acoplado al =CH–')
      ])
    ]
  },

  // 3. HIDROCARBUROS AROMATICOS
  {
    id: 'aromatics',
    name: 'Compuestos Aromáticos',
    chemicalShiftZone: '6.8 – 8.3 ppm',
    couplingSignature: 'Corriente de anillo aromática y patrones diagnóstico orto/meta/para (J ≈ 8 Hz)',
    compounds: [
      mkNmr('nmr_toluene', 'Tolueno', 'C₆H₅CH₃', 'CDCl3', 'Ar–H 7.25–7.14 (5H) + Metilo Ar–CH₃ a 2.34 ppm (3H)', 'El desplazamiento del metilo hasta 2.34 ppm confirma unión directa al anillo bencénico.', [
        s(7.24, 2, 't', 7.5, 'Ar–H (meta)', 'Protones meta del anillo'),
        s(7.15, 3, 'm', 7.4, 'Ar–H (o,p)', 'Protones orto y para traslapados'),
        s(2.34, 3, 's', 0, 'Ar–CH₃', 'Singulete diagnóstico metilo bencílico (2.34 ppm)', { isKeySignal: true })
      ]),
      mkNmr('nmr_p_xylene', 'p-Xileno', '1,4-C₆H₄(CH₃)₂', 'CDCl3', 'Singulete Ar–H a 7.05 ppm (4H) + Singulete CH₃ a 2.30 ppm (6H)', 'Alta simetría D₂h: los 4 protones aromáticos aparecen como un singulete limpio.', [
        s(7.05, 4, 's', 0, 'Ar–H (4H)', 'Singulete único de 4H aromáticos equivalentes', { isKeySignal: true }),
        s(2.30, 6, 's', 0, '2 × Ar–CH₃', 'Dos metilos bencílicos simétricos', { isKeySignal: true })
      ]),
      mkNmr('nmr_14_dichlorobenzene', '1,4-Diclorobenceno', '1,4-C₆H₄Cl₂', 'CDCl3', 'Singulete único aromático a 7.25 ppm (4H)', 'Sin protones alifáticos: los 4 H aromáticos equivalentes forman una sola línea en 7.25 ppm.', [
        s(7.25, 4, 's', 0, 'Ar–H (C₆H₄Cl₂)', 'Singulete aromático puro por simetría 1,4', { isKeySignal: true })
      ]),
      mkNmr('nmr_ethylbenzene', 'Etilbenceno', 'C₆H₅CH₂CH₃', 'CDCl3', 'Ar 7.28–7.16 (5H) / 2.65 (q, 2H) / 1.24 (t, 3H)', 'Cuartete bencílico en 2.65 ppm unido al triplete en 1.24 ppm.', [
        s(7.28, 2, 't', 7.5, 'Ar–H (m)', 'Protones meta'),
        s(7.19, 3, 'd', 7.3, 'Ar–H (o,p)', 'Protones orto/para'),
        s(2.65, 2, 'q', 7.6, 'Ar–CH₂–', 'Cuartete bencílico a 2.65 ppm', { isKeySignal: true }),
        s(1.24, 3, 't', 7.6, '–CH₃', 'Triplete metilo')
      ]),
      mkNmr('nmr_cumene', 'Cumeno (Isopropilbenceno)', 'C₆H₅CH(CH₃)₂', 'CDCl3', 'Ar 7.25 (5H) / Septete 2.89 (1H) / Doblete 1.25 (6H)', 'Grupo isopropilo sobre benceno generando un septete limpio en 2.89 ppm.', [
        s(7.24, 5, 'm', 7.4, 'C₆H₅–', 'Anillo fenilo'),
        s(2.89, 1, 'sept', 6.9, 'Ar–CH(CH₃)₂', 'Septete bencílico característico (1H)', { isKeySignal: true }),
        s(1.25, 6, 'd', 6.9, '–(CH₃)₂', 'Doblete intenso de 6 protones', { isKeySignal: true })
      ]),
      mkNmr('nmr_mesitylene', 'Mesitileno (1,3,5-Trimetilbenceno)', 'C₉H₁₂', 'CDCl3', 'Singulete Ar 6.78 ppm (3H) + Singulete CH₃ 2.27 ppm (9H)', 'Simetría C₃ perfecta produciendo únicamente 2 singuletes en relación 1:3.', [
        s(6.78, 3, 's', 0, 'Ar–H (2,4,6)', 'Tres protones aromáticos apantallados por 3 metilos', { isKeySignal: true }),
        s(2.27, 9, 's', 0, '3 × Ar–CH₃', 'Nueve protones bencílicos equivalentes', { isKeySignal: true })
      ]),
      mkNmr('nmr_4_chlorotoluene', '4-Clorotolueno', 'ClC₆H₄CH₃', 'CDCl3', 'Sistema AA′BB′ (7.22 d, 2H y 7.09 d, 2H) + 2.31 (s, 3H)', 'Patrón característico de anillo 1,4-disustituido asimétrico ("dos dobletes aromáticos").', [
        s(7.22, 2, 'd', 8.3, 'Ar–H (junto a Cl)', 'Doblete aromático campo bajo (J=8.3 Hz)', { isKeySignal: true }),
        s(7.09, 2, 'd', 8.3, 'Ar–H (junto a CH₃)', 'Doblete aromático campo alto (J=8.3 Hz)', { isKeySignal: true }),
        s(2.31, 3, 's', 0, 'Ar–CH₃', 'Metilo bencílico')
      ]),
      mkNmr('nmr_naphthalene', 'Naftaleno', 'C₁₀H₈', 'CDCl3', 'Múltiplete α a 7.84 ppm (4H) + Múltiplete β a 7.47 ppm (4H)', 'Sistema aromático bicíclico simétrico con dos grupos de 4 protones equivalentes.', [
        s(7.84, 4, 'q', 4.5, 'H-α (1,4,5,8)', 'Protones α más desapantallados por corriente bicíclica', { isKeySignal: true }),
        s(7.47, 4, 'q', 4.5, 'H-β (2,3,6,7)', 'Protones β internos a 7.47 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_anisole', 'Anisol (Metoxibenceno)', 'C₆H₅OCH₃', 'CDCl3', '7.28 (t, 2H) / 6.92 (m, 3H) + Singulete OCH₃ a 3.79 ppm (3H)', 'El grupo donador –OCH₃ empuja los protones orto y para debajo de 7.0 ppm.', [
        s(7.28, 2, 't', 7.8, 'Ar–H (meta)', 'Protones meta'),
        s(6.92, 3, 'd', 8.0, 'Ar–H (o,p)', 'Protones orto/para apantallados por resonancia π'),
        s(3.79, 3, 's', 0, 'Ar–OCH₃', 'Singulete intenso del grupo metoxilo en 3.79 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_nitrobenzene', 'Nitrobenceno', 'C₆H₅NO₂', 'CDCl3', '8.22 (d, 2H) / 7.69 (t, 1H) / 7.54 (t, 2H)', 'Grupo –NO₂ atractor por resonancia empuja fuertemente los protones orto hasta 8.22 ppm.', [
        s(8.22, 2, 'd', 8.1, 'Ar–H (orto a NO₂)', 'Fuerte desapantallamiento hasta 8.22 ppm', { isKeySignal: true }),
        s(7.69, 1, 't', 7.5, 'Ar–H (para)', 'Triplete en posición para'),
        s(7.54, 2, 't', 7.8, 'Ar–H (meta)', 'Triplete meta')
      ])
    ]
  },

  // 4. ALCOHOLES Y FENOLES
  {
    id: 'alcohols_phenols',
    name: 'Alcoholes y Fenoles',
    chemicalShiftZone: '0.9 – 5.5 ppm (O–H variable; fenol ~5–9 ppm)',
    couplingSignature: 'Pico ancho intercambiable O–H (desaparece con D₂O) + α-CH–O entre 3.3 y 4.2 ppm',
    compounds: [
      mkNmr('nmr_ethanol', 'Etanol', 'CH₃CH₂OH', 'CDCl3', '3.71 (q, 2H) / 2.40 (s ancho, 1H O–H) / 1.24 (t, 3H)', 'Molécula emblemática de la RMN: cuartete –CH₂O– en 3.71, OH intercambiable y triplete –CH₃.', [
        s(3.71, 2, 'q', 7.0, '–CH₂OH', 'Cuartete desapantallado por el oxígeno', { isKeySignal: true }),
        s(2.40, 1, 's', 0, '–OH', 'Protón hidroxilo intercambiable (ensanchado)', { isBroad: true, isKeySignal: true }),
        s(1.24, 3, 't', 7.0, '–CH₃', 'Triplete metilo a 1.24 ppm')
      ]),
      mkNmr('nmr_methanol', 'Metanol', 'CH₃OH', 'DMSO-d6', '4.10 (q, 1H O–H en DMSO) + 3.17 (d, 3H)', 'En DMSO seco el intercambio se frena permitiendo observar acoplamiento entre –CH₃ y –OH.', [
        s(4.10, 1, 'q', 5.2, '–OH', 'Cuartete lento en DMSO-d₆', { isBroad: true }),
        s(3.17, 3, 'd', 5.2, 'CH₃–O–', 'Singulete/doblete metoxilo a 3.17 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_isopropanol', 'Isopropanol (2-Propanol)', '(CH₃)₂CHOH', 'CDCl3', 'Septete 4.02 ppm (1H) / OH 2.15 (1H) / Doblete 1.20 (6H)', 'Septete característico sobre oxígeno a 4.02 ppm y doblete intenso de 6H.', [
        s(4.02, 1, 'sept', 6.2, '–CH(OH)–', 'Septete α-hidroxilo', { isKeySignal: true }),
        s(2.15, 1, 's', 0, '–OH', 'Hidroxilo intercambiable', { isBroad: true }),
        s(1.20, 6, 'd', 6.2, '–(CH₃)₂', 'Doblete simétrico de 6 protones', { isKeySignal: true })
      ]),
      mkNmr('nmr_tert_butanol', 'terc-Butanol', '(CH₃)₃COH', 'CDCl3', 'Singulete 1.26 ppm (9H) + O–H 1.95 (1H)', 'Los 9 protones metilo sin vecinos forman un único pico gigante a 1.26 ppm.', [
        s(1.95, 1, 's', 0, '–OH', 'Señal hidroxilo variable', { isBroad: true }),
        s(1.26, 9, 's', 0, '–C(CH₃)₃', 'Singulete intenso de 9 protones a 1.26 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_benzyl_alcohol', 'Alcohol Bencílico', 'C₆H₅CH₂OH', 'CDCl3', 'Ar 7.34 (5H) / Singulete CH₂OH 4.65 (2H) / O–H 2.25 (1H)', 'Doble desapantallamiento por anillo aromático y oxígeno ubica el –CH₂– en 4.65 ppm.', [
        s(7.34, 5, 'm', 7.4, 'C₆H₅–', 'Cinco protones aromáticos'),
        s(4.65, 2, 's', 0, 'Ar–CH₂–O', 'Singulete bencílico-oxigenado a 4.65 ppm', { isKeySignal: true }),
        s(2.25, 1, 's', 0, '–OH', 'Protón hidroxilo ancho', { isBroad: true })
      ]),
      mkNmr('nmr_phenol', 'Fenol', 'C₆H₅OH', 'DMSO-d6', 'O–H fenólico a 9.32 ppm (1H) + Ar 7.15 & 6.77 (5H)', 'En DMSO-d₆ el puente de hidrógeno sitúa el O–H fenólico muy arriba, en 9.32 ppm.', [
        s(9.32, 1, 's', 0, 'Ar–OH', 'Singulete fenólico desapantallado a 9.32 ppm', { isBroad: true, isKeySignal: true }),
        s(7.15, 2, 't', 7.8, 'Ar–H (meta)', 'Protones meta'),
        s(6.77, 3, 'd', 7.9, 'Ar–H (o,p)', 'Protones orto y para apantallados por el –OH')
      ]),
      mkNmr('nmr_1_butanol', '1-Butanol', 'CH₃CH₂CH₂CH₂OH', 'CDCl3', '3.63 (t, 2H) / 2.20 (1H) / 1.54 (quint, 2H) / 0.93 (t, 3H)', 'Alcohol lineal primario donde el –CH₂OH aparece como triplete a 3.63 ppm.', [
        s(3.63, 2, 't', 6.6, '–CH₂OH', 'Triplete α-oxigenado a 3.63 ppm', { isKeySignal: true }),
        s(2.20, 1, 's', 0, '–OH', 'Hidroxilo intercambiable', { isBroad: true }),
        s(1.54, 2, 'quint', 6.8, '–CH₂–', 'Quintete beta'),
        s(1.38, 2, 'm', 7.2, '–CH₂–', 'Sextete gamma'),
        s(0.93, 3, 't', 7.3, '–CH₃', 'Metilo terminal')
      ]),
      mkNmr('nmr_cyclohexanol', 'Ciclohexanol', 'C₆H₁₁OH', 'CDCl3', 'CH–OH 3.60 (m, 1H) / 2.08 (1H OH) / Anillo 1.9–1.2 (10H)', 'El protón carbinólico axial/ecuatorial promedia alrededor de 3.60 ppm.', [
        s(3.60, 1, 'm', 4.5, '–CH(OH)–', 'Multiplete ancho de 1H sobre el hidroxilo', { isKeySignal: true }),
        s(2.08, 1, 's', 0, '–OH', 'Protón hidroxilo', { isBroad: true }),
        s(1.88, 2, 'm', 6.0, 'CH₂ (eq)', 'Protones anulares ecuatoriales'),
        s(1.52, 3, 'm', 6.0, 'CH₂ (anillo)', 'Metilenos anulares'),
        s(1.24, 5, 'm', 6.0, 'CH₂ (ax)', 'Protones axiales alifáticos')
      ]),
      mkNmr('nmr_4_methoxyphenol', '4-Metoxifenol', 'CH₃OC₆H₄OH', 'DMSO-d6', 'OH 8.85 (1H) / Ar AA′BB′ 6.75 & 6.66 (4H) / OCH₃ 3.66 (3H)', 'Dos donadores fuertes desplazan todo el anillo bencénico por debajo de 6.8 ppm.', [
        s(8.85, 1, 's', 0, 'Ar–OH', 'Hidroxilo fenólico en DMSO', { isBroad: true, isKeySignal: true }),
        s(6.75, 2, 'd', 8.9, 'Ar–H', 'Doblete aromático (J=8.9 Hz)'),
        s(6.66, 2, 'd', 8.9, 'Ar–H', 'Segundo doblete aromático muy apantallado'),
        s(3.66, 3, 's', 0, '–OCH₃', 'Singulete metoxilo en 3.66 ppm')
      ]),
      mkNmr('nmr_2_phenylethanol', '2-Feniletanol', 'C₆H₅CH₂CH₂OH', 'CDCl3', 'Ar 7.26 (5H) / 3.84 (t, 2H) / 2.86 (t, 2H) / OH 1.90', 'Dos tripletes acoplados entre sí (J = 6.6 Hz): uno junto al oxígeno (3.84) y otro al fenilo (2.86).', [
        s(7.27, 5, 'm', 7.4, 'C₆H₅–', 'Anillo fenilo'),
        s(3.84, 2, 't', 6.6, '–CH₂OH', 'Triplete sobre oxígeno', { isKeySignal: true }),
        s(2.86, 2, 't', 6.6, 'Ar–CH₂–', 'Triplete bencílico', { isKeySignal: true }),
        s(1.90, 1, 's', 0, '–OH', 'Hidroxilo libre', { isBroad: true })
      ])
    ]
  },

  // 5. ETERES Y EPOXIDOS
  {
    id: 'ethers_epoxides',
    name: 'Éteres y Epóxidos',
    chemicalShiftZone: '2.5 – 4.1 ppm',
    couplingSignature: 'Sin señal O–H intercambiable; C–H unidos a oxígeno en 3.2–4.0 ppm (epóxidos en 2.5–3.1 ppm)',
    compounds: [
      mkNmr('nmr_diethyl_ether', 'Éter Dietílico', '(CH₃CH₂)₂O', 'CDCl3', 'Cuartete 3.48 ppm (4H) + Triplete 1.21 ppm (6H)', 'Dos grupos etilo equivalentes producen un cuartete (4H) y un triplete (6H) muy limpios.', [
        s(3.48, 4, 'q', 7.0, '–CH₂–O–CH₂–', 'Cuartete simétrico de 4 protones a 3.48 ppm', { isKeySignal: true }),
        s(1.21, 6, 't', 7.0, '2 × –CH₃', 'Triplete simétrico de 6 protones a 1.21 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_mtbe', 'MTBE (Metil terc-Butil Éter)', '(CH₃)₃COCH₃', 'CDCl3', '3.22 (s, 3H) + 1.19 (s, 9H)', 'Dos singuletes puros en proporción 1:3 sin ningún acoplamiento.', [
        s(3.22, 3, 's', 0, '–OCH₃', 'Singulete metoxilo en 3.22 ppm', { isKeySignal: true }),
        s(1.19, 9, 's', 0, '–C(CH₃)₃', 'Singulete terc-butilo en 1.19 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_thf', 'Tetrahidrofurano (THF)', 'C₄H₈O', 'CDCl3', '3.74 (t, 4H) + 1.85 (t, 4H)', 'Éter cíclico de 5 miembros con solo dos señales de 4H simétricas.', [
        s(3.74, 4, 'm', 6.5, '–CH₂–O–CH₂–', 'Cuatro protones α-oxígeno a 3.74 ppm', { isKeySignal: true }),
        s(1.85, 4, 'm', 6.5, '–CH₂–CH₂–', 'Cuatro protones β internos a 1.85 ppm')
      ]),
      mkNmr('nmr_14_dioxane', '1,4-Dioxano', 'C₄H₈O₂', 'CDCl3', 'Singulete único a 3.71 ppm (8H)', 'Ocho protones equivalentes por simetría producen una sola línea aguda en 3.71 ppm.', [
        s(3.71, 8, 's', 0, '4 × –CH₂O–', 'Singulete único estándar de 8H', { isKeySignal: true })
      ]),
      mkNmr('nmr_diisopropyl_ether', 'Éter Diisopropílico', '[(CH₃)₂CH]₂O', 'CDCl3', 'Septete 3.65 ppm (2H) + Doblete 1.13 ppm (12H)', 'Dos isopropilos simétricos en proporción 2:12 (1:6).', [
        s(3.65, 2, 'sept', 6.1, '2 × –CH(O)–', 'Septete simétrico (2H) en 3.65 ppm', { isKeySignal: true }),
        s(1.13, 12, 'd', 6.1, '4 × –CH₃', 'Doblete intenso equivalente a 12 protones', { isKeySignal: true })
      ]),
      mkNmr('nmr_dimethoxyethane', '1,2-Dimetoxietano (DME)', 'CH₃OCH₂CH₂OCH₃', 'CDCl3', '3.54 (s, 4H) + 3.39 (s, 6H)', 'Dos singuletes muy próximos por simetría en cadena poliéter.', [
        s(3.54, 4, 's', 0, '–OCH₂CH₂O–', 'Singulete de 4 protones metilénicos centrales', { isKeySignal: true }),
        s(3.39, 6, 's', 0, '2 × –OCH₃', 'Singulete de 6 protones terminales')
      ]),
      mkNmr('nmr_styrene_oxide', 'Óxido de Estireno (Epóxido)', 'C₆H₅CH(O)CH₂', 'CDCl3', 'Ar 7.34 (5H) / 3.86 (t, 1H) / 3.14 & 2.80 (2H diastereotópicos)', 'El anillo tenso de oxirano hace diastereotópicos a los 2 protones del –CH₂– (3.14 y 2.80 ppm).', [
        s(7.34, 5, 'm', 7.4, 'C₆H₅–', 'Anillo fenilo'),
        s(3.86, 1, 't', 3.4, '–CH(O)–', 'Protón metino del epóxido a 3.86 ppm', { isKeySignal: true }),
        s(3.14, 1, 't', 4.8, '–CH₂ (trans)', 'Uno de los H diastereotópicos del epóxido', { isKeySignal: true }),
        s(2.80, 1, 't', 3.9, '–CH₂ (cis)', 'Segundo H diastereotópico del oxirano a campo alto')
      ]),
      mkNmr('nmr_propylene_oxide', 'Óxido de Propileno', 'CH₃CH(O)CH₂', 'CDCl3', '2.98 (m, 1H) / 2.75 & 2.43 (2H epóxido) / 1.32 (d, 3H)', 'Protones epoxídicos apantallados entre 2.4 y 3.0 ppm por geometría cíclica tensa.', [
        s(2.98, 1, 'm', 5.1, '–CH(O)–', 'Metino del anillo de tres miembros', { isKeySignal: true }),
        s(2.75, 1, 't', 4.4, '–CH₂– (a)', 'Protón epoxídico diastereotópico'),
        s(2.43, 1, 't', 3.8, '–CH₂– (b)', 'Segundo H epoxídico en 2.43 ppm', { isKeySignal: true }),
        s(1.32, 3, 'd', 5.2, '–CH₃', 'Doblete metilo unido al epóxido')
      ]),
      mkNmr('nmr_dibenzyl_ether', 'Éter Dibencílico', '(C₆H₅CH₂)₂O', 'CDCl3', 'Ar 7.35 (10H) + Singulete –CH₂O– a 4.55 ppm (4H)', 'Cuatro protones bencílico-etéreos equivalentes forman una sola línea a 4.55 ppm.', [
        s(7.35, 10, 'm', 7.4, '2 × C₆H₅–', 'Diez protones aromáticos'),
        s(4.55, 4, 's', 0, 'Ar–CH₂–O–CH₂–Ar', 'Singulete agudo de 4H a 4.55 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_tetrahydropyran', 'Tetrahidropirano (THP)', 'C₅H₁₀O', 'CDCl3', '3.66 (t, 4H) / 1.62 (m, 4H) / 1.54 (m, 2H)', 'Éter cíclico de 6 miembros con dos metilenos junto al oxígeno en 3.66 ppm.', [
        s(3.66, 4, 't', 5.3, '–CH₂–O–CH₂–', 'Protones α-oxígeno', { isKeySignal: true }),
        s(1.62, 4, 'm', 5.5, '–CH₂– (β)', 'Protones en C3/C5'),
        s(1.54, 2, 'm', 5.5, '–CH₂– (γ)', 'Metileno en C4')
      ])
    ]
  },

  // 6. ALDEHIDOS Y CETONAS
  {
    id: 'aldehydes_ketones',
    name: 'Aldehídos y Cetonas',
    chemicalShiftZone: '2.0 – 2.6 ppm (α-C=O) · 9.4 – 10.2 ppm (–CHO)',
    couplingSignature: 'Protón aldehídico –CHO inconfundible en 9.5–10.1 ppm; metilos/metilenos α-carbonilo en 2.1–2.5 ppm',
    compounds: [
      mkNmr('nmr_acetone', 'Acetona', 'CH₃COCH₃', 'CDCl3', 'Singulete único a 2.17 ppm (6H)', 'Estándar universal de cetona simétrica: 6 protones α-carbonilo en un solo pico a 2.17 ppm.', [
        s(2.17, 6, 's', 0, 'CH₃–C(=O)–CH₃', 'Singulete único α-carbonilo (6H)', { isKeySignal: true })
      ]),
      mkNmr('nmr_butanone', '2-Butanona (MEK)', 'CH₃COCH₂CH₃', 'CDCl3', '2.45 (q, 2H) / 2.14 (s, 3H) / 1.06 (t, 3H)', 'Combina el singulete α-metilo en 2.14 ppm con un etilo α-carbonilo en 2.45 y 1.06 ppm.', [
        s(2.45, 2, 'q', 7.3, '–C(=O)CH₂–', 'Cuartete α-carbonilo a 2.45 ppm', { isKeySignal: true }),
        s(2.14, 3, 's', 0, 'CH₃C(=O)–', 'Singulete acetilo a 2.14 ppm', { isKeySignal: true }),
        s(1.06, 3, 't', 7.3, '–CH₂CH₃', 'Triplete metilo terminal')
      ]),
      mkNmr('nmr_benzaldehyde', 'Benzaldehído', 'C₆H₅CHO', 'CDCl3', 'Singulete –CHO a 10.02 ppm (1H) + Ar 7.89 (2H) & 7.58 (3H)', 'Protón aldehídico desapantallado hasta 10.02 ppm por anisotropía diamagnética del C=O y del benceno.', [
        s(10.02, 1, 's', 0, '–CHO', 'Singulete aldehídico en 10.02 ppm', { isKeySignal: true }),
        s(7.89, 2, 'd', 7.9, 'Ar–H (orto)', 'Protones orto al carbonilo en 7.89 ppm'),
        s(7.62, 1, 't', 7.4, 'Ar–H (para)', 'Protón para'),
        s(7.53, 2, 't', 7.6, 'Ar–H (meta)', 'Protones meta')
      ]),
      mkNmr('nmr_acetaldehyde', 'Acetaldehído', 'CH₃CHO', 'CDCl3', 'Cuartete –CHO a 9.80 ppm (1H, J=2.9 Hz) + Doblete 2.20 ppm (3H)', 'Acoplamiento vicinal pequeño (³J = 2.9 Hz) entre el –CHO y el grupo metilo.', [
        s(9.80, 1, 'q', 2.9, '–CHO', 'Cuartete aldehídico fino en 9.80 ppm (J=2.9 Hz)', { isKeySignal: true }),
        s(2.20, 3, 'd', 2.9, 'CH₃–CHO', 'Doblete agudo de 3H en 2.20 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_acetophenone', 'Acetofenona', 'C₆H₅COCH₃', 'CDCl3', 'Ar 7.96 (2H) & 7.50 (3H) + Singulete COCH₃ a 2.61 ppm (3H)', 'El anillo fenilo desplaza al metilo acetilo hasta 2.61 ppm y empuja los protones orto a 7.96 ppm.', [
        s(7.96, 2, 'd', 7.9, 'Ar–H (orto)', 'Protones orto desapantallados por el carbonilo'),
        s(7.56, 1, 't', 7.4, 'Ar–H (para)', 'Protón para'),
        s(7.46, 2, 't', 7.6, 'Ar–H (meta)', 'Protones meta'),
        s(2.61, 3, 's', 0, '–C(=O)CH₃', 'Singulete metil-cetona aromática a 2.61 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_cyclohexanone', 'Ciclohexanona', 'C₆H₁₀O', 'CDCl3', '2.34 (t, 4H) / 1.87 (quint, 4H) / 1.72 (m, 2H)', 'Los cuatro protones α al grupo C=O forman un triplete limpio a 2.34 ppm.', [
        s(2.34, 4, 't', 6.7, '–CH₂–C(=O)–CH₂–', 'Cuatro protones α-carbonilo', { isKeySignal: true }),
        s(1.87, 4, 'quint', 6.3, '–CH₂– (β)', 'Cuatro metilenos beta'),
        s(1.72, 2, 'm', 6.2, '–CH₂– (γ)', 'Metileno en C4')
      ]),
      mkNmr('nmr_propanal', 'Propanal', 'CH₃CH₂CHO', 'CDCl3', '9.79 (t, 1H) / 2.47 (q, 2H) / 1.11 (t, 3H)', 'Triplete fino aldehídico (J = 1.4 Hz) acoplado al CH₂ en 2.47 ppm.', [
        s(9.79, 1, 't', 1.4, '–CHO', 'Triplete aldehídico característico a 9.79 ppm', { isKeySignal: true }),
        s(2.47, 2, 'q', 7.3, '–CH₂CHO', 'Cuartete α-aldehído', { isKeySignal: true }),
        s(1.11, 3, 't', 7.3, '–CH₃', 'Triplete metilo')
      ]),
      mkNmr('nmr_3_pentanone', '3-Pentanona', '(CH₃CH₂)₂C=O', 'CDCl3', 'Cuartete 2.43 ppm (4H) + Triplete 1.06 ppm (6H)', 'Dos etilos simétricos unidos al mismo carbonilo.', [
        s(2.43, 4, 'q', 7.3, '2 × –CH₂C(=O)–', 'Cuartete simétrico de 4H a 2.43 ppm', { isKeySignal: true }),
        s(1.06, 6, 't', 7.3, '2 × –CH₃', 'Triplete simétrico de 6H a 1.06 ppm')
      ]),
      mkNmr('nmr_cinnamaldehyde', 'trans-Cinamaldehído', 'C₆H₅CH=CHCHO', 'CDCl3', '9.70 (d, 1H, J=7.7 Hz) / 7.50 (m, 6H) / 6.72 (dd, 1H)', 'El acoplamiento trans de 7.7 Hz entre el =CH– y el –CHO genera un doblete claro en 9.70 ppm.', [
        s(9.70, 1, 'd', 7.7, '–CHO', 'Doblete aldehídico acoplado al H-α (J=7.7 Hz)', { isKeySignal: true }),
        s(7.50, 6, 'm', 8.0, 'C₆H₅ + β-CH=', 'Cinco aromáticos + protón β-olefínico'),
        s(6.72, 1, 'q', 11.8, '=CH–CHO', 'Protón α-olefínico a 6.72 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_isobutyraldehyde', 'Isobutiraldehído', '(CH₃)₂CHCHO', 'CDCl3', '9.63 (d, 1H) / 2.43 (m, 1H) / 1.12 (d, 6H)', 'Acoplamiento del protón metino α al aldehído (9.63 ppm) y a los dos metilos.', [
        s(9.63, 1, 'd', 1.3, '–CHO', 'Doblete aldehídico en 9.63 ppm', { isKeySignal: true }),
        s(2.43, 1, 'sept', 7.0, '–CH(CHO)–', 'Metino α-aldehído'),
        s(1.12, 6, 'd', 7.0, '–(CH₃)₂', 'Doblete intenso de 6 protones')
      ])
    ]
  },

  // 7. ACIDOS CARBOXILICOS
  {
    id: 'carboxylic_acids',
    name: 'Ácidos Carboxílicos',
    chemicalShiftZone: '10.5 – 12.8 ppm (–COOH) · 2.1 – 2.5 ppm (α-CH₂)',
    couplingSignature: 'Señal extrema campo abajo (11–12.5 ppm) de –COOH que desaparece al agitar con D₂O',
    compounds: [
      mkNmr('nmr_acetic_acid', 'Ácido Acético', 'CH₃COOH', 'CDCl3', 'COOH 11.42 ppm (1H) + Singulete CH₃ a 2.10 ppm (3H)', 'Dos únicos singuletes separados casi 10 ppm entre el protón ácido y el metilo.', [
        s(11.42, 1, 's', 0, '–COOH', 'Singulete ácido muy desapantallado a 11.42 ppm', { isBroad: true, isKeySignal: true }),
        s(2.10, 3, 's', 0, 'CH₃–COOH', 'Singulete agudo de metilo α-carboxílico a 2.10 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_propionic_acid', 'Ácido Propiónico', 'CH₃CH₂COOH', 'CDCl3', '11.58 (s, 1H) / 2.38 (q, 2H) / 1.15 (t, 3H)', 'Grupo etilo unido a ácido carboxílico: cuartete en 2.38 y triplete en 1.15 ppm.', [
        s(11.58, 1, 's', 0, '–COOH', 'Protón ácido en 11.58 ppm', { isBroad: true, isKeySignal: true }),
        s(2.38, 2, 'q', 7.5, '–CH₂COOH', 'Cuartete α-ácido', { isKeySignal: true }),
        s(1.15, 3, 't', 7.5, '–CH₃', 'Triplete beta')
      ]),
      mkNmr('nmr_benzoic_acid', 'Ácido Benzoico', 'C₆H₅COOH', 'CDCl3', 'COOH 12.10 (1H) / 8.12 (d, 2H) / 7.62 (t, 1H) / 7.48 (t, 2H)', 'Anillo monosustituido con fuerte grupo atractor empujando H-orto a 8.12 ppm.', [
        s(12.10, 1, 's', 0, '–COOH', 'Protón ácido benzoico a 12.10 ppm', { isBroad: true, isKeySignal: true }),
        s(8.12, 2, 'd', 8.0, 'Ar–H (orto)', 'Protones orto a 8.12 ppm', { isKeySignal: true }),
        s(7.62, 1, 't', 7.5, 'Ar–H (para)', 'Protón para'),
        s(7.48, 2, 't', 7.7, 'Ar–H (meta)', 'Protones meta')
      ]),
      mkNmr('nmr_isobutyric_acid', 'Ácido Isobutírico', '(CH₃)₂CHCOOH', 'CDCl3', '11.65 (1H) / Septete 2.58 (1H) / Doblete 1.19 (6H)', 'Grupo isopropilo unido directamente al carboxilo.', [
        s(11.65, 1, 's', 0, '–COOH', 'Protón carboxílico a 11.65 ppm', { isBroad: true, isKeySignal: true }),
        s(2.58, 1, 'sept', 7.0, '–CH(COOH)–', 'Septete α-ácido'),
        s(1.19, 6, 'd', 7.0, '–(CH₃)₂', 'Doblete simétrico 6H')
      ]),
      mkNmr('nmr_pivalic_acid', 'Ácido Piválico', '(CH₃)₃CCOOH', 'CDCl3', '11.50 (s, 1H) + 1.24 (s, 9H)', 'Dos singuletes limpios en relación 1:9 sin acoplamientos.', [
        s(11.50, 1, 's', 0, '–COOH', 'Protón carboxílico', { isBroad: true, isKeySignal: true }),
        s(1.24, 9, 's', 0, '–C(CH₃)₃', 'Singulete intenso 9H a 1.24 ppm')
      ]),
      mkNmr('nmr_phenylacetic_acid', 'Ácido Fenilacético', 'C₆H₅CH₂COOH', 'CDCl3', '11.20 (1H) / Ar 7.31 (5H) / Singulete CH₂ 3.64 (2H)', 'El metileno puente –CH₂– queda en 3.64 ppm entre el fenilo y el carboxilo.', [
        s(11.20, 1, 's', 0, '–COOH', 'Protón ácido', { isBroad: true, isKeySignal: true }),
        s(7.31, 5, 'm', 7.4, 'C₆H₅–', 'Anillo bencénico'),
        s(3.64, 2, 's', 0, 'Ar–CH₂–COOH', 'Singulete diagnóstico a 3.64 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_formic_acid', 'Ácido Fórmico', 'HCOOH', 'D2O', 'Singulete H–C=O muy alto a 8.20 ppm (1H)', 'En D₂O el protón unido al C=O forma un singulete aislado a 8.20 ppm mientras el ácido intercambia.', [
        s(8.20, 1, 's', 0, 'H–C(=O)O–', 'Protón fórmico único a 8.20 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_salicylic_acid', 'Ácido Salicílico', '2-HOC₆H₄COOH', 'DMSO-d6', 'COOH ~12.4 (1H) / OH 11.30 (1H) / Ar 7.80–6.92 (4H)', 'Puente de hidrógeno intramolecular desplaza ambos protones ácidos sobre 11 ppm.', [
        s(12.45, 1, 's', 0, '–COOH', 'Protón carboxílico extremo', { isBroad: true, isKeySignal: true }),
        s(11.30, 1, 's', 0, 'Ar–OH (quelado)', 'Hidroxilo fenólico quelado en puente H', { isBroad: true }),
        s(7.80, 1, 'd', 7.9, 'Ar H-6', 'Protón orto al carboxilo'),
        s(7.49, 1, 't', 7.8, 'Ar H-4', 'Triplete aromático'),
        s(6.93, 2, 'm', 8.0, 'Ar H-3,5', 'Protones orto/para al –OH')
      ]),
      mkNmr('nmr_butanoic_acid', 'Ácido Butírico', 'CH₃CH₂CH₂COOH', 'CDCl3', '11.62 (1H) / 2.34 (t, 2H) / 1.67 (m, 2H) / 0.97 (t, 3H)', 'Triplete α-carboxílico a 2.34 ppm acoplado a la cadena propilo.', [
        s(11.62, 1, 's', 0, '–COOH', 'Protón ácido a 11.62 ppm', { isBroad: true, isKeySignal: true }),
        s(2.34, 2, 't', 7.4, '–CH₂COOH', 'Triplete α-ácido'),
        s(1.67, 2, 'm', 7.4, '–CH₂–', 'Sextete central'),
        s(0.97, 3, 't', 7.4, '–CH₃', 'Triplete metilo')
      ]),
      mkNmr('nmr_ibuprofen', 'Ibuprofeno (Fármaco AINE)', 'C₁₃H₁₈O₂', 'CDCl3', 'COOH 11.2 / Ar AA′BB′ 7.22 & 7.10 / 3.71 (q, 1H) / 1.50 (d, 3H) / 0.90 (d, 6H)', 'Fármaco clásico para elucidación estructural combinando isobutilo, anillo 1,4 y ácido α-metilacético.', [
        s(11.20, 1, 's', 0, '–COOH', 'Carboxilo terminal', { isBroad: true, isKeySignal: true }),
        s(7.22, 2, 'd', 8.1, 'Ar–H', 'Anillo para-disustituido'),
        s(7.10, 2, 'd', 8.1, 'Ar–H', 'Segunda mitad AA′BB′'),
        s(3.71, 1, 'q', 7.2, '–CH(CH₃)COOH', 'Cuartete quiral α-ácido', { isKeySignal: true }),
        s(2.45, 2, 'd', 7.2, 'Ar–CH₂–', 'Doblete bencílico del isobutilo'),
        s(1.85, 1, 'sept', 6.8, '–CH(CH₃)₂', 'Septete isobutilo'),
        s(1.50, 3, 'd', 7.2, '–CH(CH₃)–', 'Doblete α-ácido'),
        s(0.90, 6, 'd', 6.6, '–(CH₃)₂', 'Doblete de 6 protones isobutilo')
      ])
    ]
  },

  // 8. ESTERES Y ANHIDRIDOS
  {
    id: 'esters_anhydrides',
    name: 'Ésteres y Anhídridos',
    chemicalShiftZone: '3.6 – 4.4 ppm (–OCH₂– / –OCH₃) · 2.0 – 2.5 ppm (–CH₂C=O)',
    couplingSignature: 'C–H sobre el oxígeno alcoxílico aparece 2 ppm más a la izquierda que C–H α al carbonilo',
    compounds: [
      mkNmr('nmr_ethyl_acetate', 'Acetato de Etilo', 'CH₃COOCH₂CH₃', 'CDCl3', '4.12 (q, 2H) / 2.05 (s, 3H) / 1.26 (t, 3H)', 'Permite distinguir al instante cuál lado está pegado al oxígeno (4.12 q) vs al carbonilo (2.05 s).', [
        s(4.12, 2, 'q', 7.1, '–O–CH₂–CH₃', 'Cuartete unido al oxígeno en 4.12 ppm', { isKeySignal: true }),
        s(2.05, 3, 's', 0, 'CH₃–C(=O)O–', 'Singulete acetilo a 2.05 ppm', { isKeySignal: true }),
        s(1.26, 3, 't', 7.1, '–OCH₂–CH₃', 'Triplete metilo a 1.26 ppm')
      ]),
      mkNmr('nmr_methyl_propionate', 'Propionato de Metilo', 'CH₃CH₂COOCH₃', 'CDCl3', '3.67 (s, 3H) / 2.34 (q, 2H) / 1.15 (t, 3H)', 'Isómero constitucional del acetato de etilo: el singulete queda ahora en 3.67 ppm (–OCH₃).', [
        s(3.67, 3, 's', 0, '–C(=O)OCH₃', 'Singulete éster metílico a 3.67 ppm', { isKeySignal: true }),
        s(2.34, 2, 'q', 7.5, '–CH₂C(=O)–', 'Cuartete unido al carbonilo a 2.34 ppm', { isKeySignal: true }),
        s(1.15, 3, 't', 7.5, '–CH₃', 'Triplete metilo')
      ]),
      mkNmr('nmr_methyl_benzoate', 'Benzoato de Metilo', 'C₆H₅COOCH₃', 'CDCl3', '8.04 (d, 2H) / 7.55 (t, 1H) / 7.44 (t, 2H) / 3.92 (s, 3H)', 'Singulete del éster metílico a 3.92 ppm y protones orto al carbonilo en 8.04 ppm.', [
        s(8.04, 2, 'd', 7.9, 'Ar–H (orto)', 'Protones orto al éster', { isKeySignal: true }),
        s(7.55, 1, 't', 7.4, 'Ar–H (para)', 'Protón para'),
        s(7.44, 2, 't', 7.7, 'Ar–H (meta)', 'Protones meta'),
        s(3.92, 3, 's', 0, '–COOCH₃', 'Singulete éster en 3.92 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_isopropyl_acetate', 'Acetato de Isopropilo', 'CH₃COOCH(CH₃)₂', 'CDCl3', 'Septete 4.99 (1H) / Singulete 2.02 (3H) / Doblete 1.23 (6H)', 'El oxígeno del éster empuja al septete CH hasta ~5.00 ppm.', [
        s(4.99, 1, 'sept', 6.3, '–OCH(CH₃)₂', 'Septete desapantallado hasta 4.99 ppm', { isKeySignal: true }),
        s(2.02, 3, 's', 0, 'CH₃COO–', 'Singulete acetilo'),
        s(1.23, 6, 'd', 6.3, '–(CH₃)₂', 'Doblete simétrico 6H')
      ]),
      mkNmr('nmr_aspirin', 'Aspirina (Ácido Acetilsalicílico)', 'C₉H₈O₄', 'CDCl3', '11.40 (1H) / Ar 8.12–7.14 (4H) / Singulete OCOCH₃ 2.34 (3H)', 'Éster fenólico cuyo metilo acetilo aparece más alto (2.34 ppm) junto a cuatro señales aromáticas.', [
        s(11.40, 1, 's', 0, '–COOH', 'Ácido carboxílico', { isBroad: true }),
        s(8.12, 1, 'd', 7.9, 'Ar H-6', 'Protón orto al –COOH', { isKeySignal: true }),
        s(7.61, 1, 't', 7.8, 'Ar H-4', 'Triplete aromático'),
        s(7.35, 1, 't', 7.7, 'Ar H-5', 'Segundo triplete aromático'),
        s(7.14, 1, 'd', 8.1, 'Ar H-3', 'Doblete orto al acetato'),
        s(2.34, 3, 's', 0, '–OCOCH₃', 'Singulete acetilo fenólico a 2.34 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_diethyl_malonate', 'Malonato de Dietilo', 'CH₂(COOCH₂CH₃)₂', 'CDCl3', '4.21 (q, 4H) / Singulete CH₂ central 3.37 (2H) / 1.28 (t, 6H)', 'Metileno flanqueado por dos ésteres en singulete único a 3.37 ppm.', [
        s(4.21, 4, 'q', 7.1, '2 × –OCH₂–', 'Cuartete etoxilo simétrico'),
        s(3.37, 2, 's', 0, '–OC–CH₂–CO–', 'Singulete metilénico doblemente activado en 3.37 ppm', { isKeySignal: true }),
        s(1.28, 6, 't', 7.1, '2 × –CH₃', 'Triplete simétrico 6H')
      ]),
      mkNmr('nmr_acetic_anhydride', 'Anhídrido Acético', '(CH₃CO)₂O', 'CDCl3', 'Singulete único a 2.23 ppm (6H)', 'Mayor carácter atractor del anhídrido mueve el metilo desde 2.05 (acetato) hasta 2.23 ppm.', [
        s(2.23, 6, 's', 0, 'CH₃CO–O–COCH₃', 'Singulete simétrico de 6 protones a 2.23 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_methyl_salicylate', 'Salicilato de Metilo', '2-HOC₆H₄COOCH₃', 'CDCl3', 'OH quelado 10.74 (1H) / Ar 7.83–6.87 (4H) / OCH₃ 3.94 (3H)', 'Éster con puente de hidrógeno interno que fija el fenol como pico agudo en 10.74 ppm.', [
        s(10.74, 1, 's', 0, 'Ar–OH (quelado)', 'Fenol agudo por quelación intramolecular a 10.74 ppm', { isKeySignal: true }),
        s(7.83, 1, 'd', 8.0, 'Ar H-6', 'Protón orto al éster'),
        s(7.45, 1, 't', 7.8, 'Ar H-4', 'Triplete aromático'),
        s(6.98, 1, 'd', 8.3, 'Ar H-3', 'Doblete junto al –OH'),
        s(6.88, 1, 't', 7.6, 'Ar H-5', 'Triplete aromático'),
        s(3.94, 3, 's', 0, '–COOCH₃', 'Singulete metoxilo a 3.94 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_gamma_butyrolactone', 'γ-Butirolactona (Éster Cíclico)', 'C₄H₆O₂', 'CDCl3', '4.36 (t, 2H) / 2.51 (t, 2H) / 2.28 (quint, 2H)', 'Tres señales ordenadas de izquierda a derecha: junto a –O– (4.36), junto a C=O (2.51) y central (2.28).', [
        s(4.36, 2, 't', 7.1, '–CH₂–O–', 'Triplete lactónico junto al oxígeno', { isKeySignal: true }),
        s(2.51, 2, 't', 8.0, '–CH₂–C(=O)–', 'Triplete α-carbonilo'),
        s(2.28, 2, 'quint', 7.5, '–CH₂– (β)', 'Quintete central del anillo de 5')
      ]),
      mkNmr('nmr_benzyl_acetate', 'Acetato de Bencilo', 'C₆H₅CH₂OCOCH₃', 'CDCl3', 'Ar 7.35 (5H) / 5.10 (s, 2H) / 2.09 (s, 3H)', 'Aroma clásico a jazmín con –CH₂O– bencílico muy arriba en 5.10 ppm.', [
        s(7.35, 5, 'm', 7.4, 'C₆H₅–', 'Anillo fenilo'),
        s(5.10, 2, 's', 0, 'Ar–CH₂–O–', 'Singulete muy desapantallado a 5.10 ppm', { isKeySignal: true }),
        s(2.09, 3, 's', 0, '–OCOCH₃', 'Singulete acetilo')
      ])
    ]
  },

  // 9. AMINAS
  {
    id: 'amines',
    name: 'Aminas (1ª, 2ª y 3ª)',
    chemicalShiftZone: '2.2 – 3.0 ppm (α-N) · 0.6 – 5.0 ppm (N–H intercambiable)',
    couplingSignature: 'Menor electronegatividad que O sitúa α-CH–N en 2.2–2.9 ppm; anilinas apantallan al anillo < 6.8 ppm',
    compounds: [
      mkNmr('nmr_triethylamine', 'Trietilamina', '(CH₃CH₂)₃N', 'CDCl3', 'Cuartete 2.51 ppm (6H) + Triplete 1.02 ppm (9H)', 'Tres etilos equivalentes sobre nitrógeno terciario sin señal N–H.', [
        s(2.51, 6, 'q', 7.2, '3 × –NCH₂–', 'Cuartete simétrico de 6 protones a 2.51 ppm', { isKeySignal: true }),
        s(1.02, 9, 't', 7.2, '3 × –CH₃', 'Triplete simétrico de 9 protones a 1.02 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_diethylamine', 'Diisopropilamina / Dietilamina', '(CH₃CH₂)₂NH', 'CDCl3', '2.65 (q, 4H) / 1.11 (t, 6H) / N–H ancho 0.90 (1H)', 'Amina secundaria alifática con el protón N–H a campo alto (~0.9 ppm).', [
        s(2.65, 4, 'q', 7.2, '2 × –NHCH₂–', 'Cuartete α-nitrógeno', { isKeySignal: true }),
        s(1.11, 6, 't', 7.2, '2 × –CH₃', 'Triplete metilo'),
        s(0.90, 1, 's', 0, '–NH–', 'Protón amínico intercambiable', { isBroad: true })
      ]),
      mkNmr('nmr_aniline', 'Anilina', 'C₆H₅NH₂', 'CDCl3', '7.15 (t, 2H) / 6.75 (t, 1H) / 6.67 (d, 2H) / NH₂ 3.55 (2H)', 'El par libre del –NH₂ dona electrones por resonancia empujando los H orto/para a 6.67 y 6.75 ppm.', [
        s(7.15, 2, 't', 7.8, 'Ar–H (meta)', 'Protones meta'),
        s(6.75, 1, 't', 7.4, 'Ar–H (para)', 'Protón para muy apantallado'),
        s(6.67, 2, 'd', 7.9, 'Ar–H (orto)', 'Protones orto en 6.67 ppm', { isKeySignal: true }),
        s(3.55, 2, 's', 0, 'Ar–NH₂', 'Singulete ancho de 2H intercambiables', { isBroad: true, isKeySignal: true })
      ]),
      mkNmr('nmr_benzylamine', 'Bencilamina', 'C₆H₅CH₂NH₂', 'CDCl3', 'Ar 7.31 (5H) / Singulete CH₂ 3.86 (2H) / NH₂ 1.50 (2H)', 'El metileno bencílico unido al nitrógeno aparece en 3.86 ppm (vs 4.65 en alcohol bencílico).', [
        s(7.31, 5, 'm', 7.4, 'C₆H₅–', 'Anillo fenilo'),
        s(3.86, 2, 's', 0, 'Ar–CH₂–N', 'Singulete bencílico-amínico a 3.86 ppm', { isKeySignal: true }),
        s(1.50, 2, 's', 0, '–NH₂', 'Grupo amino alifático ancho', { isBroad: true })
      ]),
      mkNmr('nmr_piperidine', 'Piperidina', 'C₅H₁₁N', 'CDCl3', '2.79 (t, 4H) / 1.54 (m, 6H) / NH 1.65', 'Amina cíclica saturada con cuatro protones α-N en 2.79 ppm.', [
        s(2.79, 4, 't', 5.4, '–CH₂–NH–CH₂–', 'Cuatro protones α al nitrógeno a 2.79 ppm', { isKeySignal: true }),
        s(1.54, 7, 'm', 5.5, '3×CH₂ + NH', 'Seis protones anulares + señal NH')
      ]),
      mkNmr('nmr_morpholine', 'Morfolina', 'O(CH₂CH₂)₂NH', 'CDCl3', '3.69 (t, 4H junto a O) / 2.86 (t, 4H junto a N) / NH 1.78', 'Contraste perfecto en la misma molécula entre efecto inductivo de O (3.69) vs N (2.86 ppm).', [
        s(3.69, 4, 't', 4.7, '–CH₂–O–CH₂–', 'Protones junto al oxígeno (3.69 ppm)', { isKeySignal: true }),
        s(2.86, 4, 't', 4.7, '–CH₂–NH–CH₂–', 'Protones junto al nitrógeno (2.86 ppm)', { isKeySignal: true }),
        s(1.78, 1, 's', 0, '–NH–', 'Protón NH intercambiable', { isBroad: true })
      ]),
      mkNmr('nmr_4_methylaniline', 'p-Toluidina', 'CH₃C₆H₄NH₂', 'CDCl3', '6.96 (d, 2H) / 6.60 (d, 2H) / NH₂ 3.45 / CH₃ 2.24', 'Dos dobletes aromáticos simétricos fuertemente apantallados debajo de 7.0 ppm.', [
        s(6.96, 2, 'd', 8.1, 'Ar–H (junto a CH₃)', 'Doblete aromático'),
        s(6.60, 2, 'd', 8.1, 'Ar–H (junto a NH₂)', 'Doblete fuertemente apantallado a 6.60 ppm', { isKeySignal: true }),
        s(3.45, 2, 's', 0, '–NH₂', 'Amina aromática', { isBroad: true }),
        s(2.24, 3, 's', 0, 'Ar–CH₃', 'Metilo bencílico')
      ]),
      mkNmr('nmr_n_methylaniline', 'N-Metilanilina', 'C₆H₅NHCH₃', 'CDCl3', '7.18 (t, 2H) / 6.70 (t, 1H) / 6.61 (d, 2H) / NH 3.65 / NCH₃ 2.83 (s, 3H)', 'Singulete característico N–CH₃ en 2.83 ppm.', [
        s(7.18, 2, 't', 7.8, 'Ar–H (meta)', 'Protones meta'),
        s(6.70, 1, 't', 7.4, 'Ar–H (para)', 'Protón para'),
        s(6.61, 2, 'd', 7.9, 'Ar–H (orto)', 'Protones orto a 6.61 ppm'),
        s(3.65, 1, 's', 0, '–NH–', 'Protón N–H único', { isBroad: true }),
        s(2.83, 3, 's', 0, '–N–CH₃', 'Singulete N-metilo a 2.83 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_nn_dimethylaniline', 'N,N-Dimetilanilina', 'C₆H₅N(CH₃)₂', 'CDCl3', '7.23 (t, 2H) / 6.73 (d, 3H) / Singulete N(CH₃)₂ a 2.93 ppm (6H)', 'Amina terciaria con un pico intenso de 6 protones a 2.93 ppm.', [
        s(7.23, 2, 't', 7.8, 'Ar–H (meta)', 'Protones meta'),
        s(6.73, 3, 'd', 8.0, 'Ar–H (o,p)', 'Protones orto y para'),
        s(2.93, 6, 's', 0, '–N(CH₃)₂', 'Singulete de 6 protones N-metilo a 2.93 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_pyridine', 'Piridina', 'C₅H₅N', 'CDCl3', 'H-α 8.60 (d, 2H) / H-γ 7.66 (t, 1H) / H-β 7.26 (t, 2H)', 'Heterociclo aromático donde el nitrógeno imínico empuja H-2,6 hasta 8.60 ppm.', [
        s(8.60, 2, 'd', 4.6, 'H-2,6 (α a N)', 'Muy desapantallado hasta 8.60 ppm', { isKeySignal: true }),
        s(7.66, 1, 't', 7.6, 'H-4 (γ)', 'Triplete en posición 4'),
        s(7.26, 2, 't', 6.2, 'H-3,5 (β)', 'Protones β en 7.26 ppm')
      ])
    ]
  },

  // 10. AMIDAS Y NITRILOS
  {
    id: 'amides_nitriles',
    name: 'Amidas y Nitrilos',
    chemicalShiftZone: '2.0 – 3.0 ppm (–CH₂CN / NCH₃) · 6.5 – 10.0 ppm (N–H amida)',
    couplingSignature: 'Rotación restringida del enlace C–N amídico desdobla dos metilos N(CH₃)₂ diferentes en DMF',
    compounds: [
      mkNmr('nmr_dmf', 'Dimetilformamida (DMF)', 'HCON(CH₃)₂', 'CDCl3', '8.02 (s, 1H H–CO) + Dos singuletes 2.96 & 2.88 ppm (3H + 3H)', 'Prueba clásica RMN del carácter parcial de doble enlace C=N⁺: los dos metilos no son equivalentes.', [
        s(8.02, 1, 's', 0, 'H–C(=O)N', 'Protón formílico de amida a 8.02 ppm', { isKeySignal: true }),
        s(2.96, 3, 's', 0, 'N–CH₃ (trans a O)', 'Metilo 1 distinto por rotación lenta C–N', { isKeySignal: true }),
        s(2.88, 3, 's', 0, 'N–CH₃ (cis a O)', 'Metilo 2 separado 0.08 ppm a temperatura ambiente', { isKeySignal: true })
      ]),
      mkNmr('nmr_acetonitrile', 'Acetonitrilo', 'CH₃C≡N', 'CDCl3', 'Singulete único agudo a 2.00 ppm (3H)', 'Referencia clásica de solvente residual y nitrilo más simple.', [
        s(2.00, 3, 's', 0, 'CH₃–CN', 'Singulete único a 2.00 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_propionitrile', 'Propionitrilo', 'CH₃CH₂CN', 'CDCl3', 'Cuartete 2.36 ppm (2H) + Triplete 1.29 ppm (3H)', 'Grupo etilo unido al ciano en un patrón simple de 2 y 3 protones.', [
        s(2.36, 2, 'q', 7.6, '–CH₂CN', 'Cuartete α-nitrilo en 2.36 ppm', { isKeySignal: true }),
        s(1.29, 3, 't', 7.6, '–CH₃', 'Triplete metilo')
      ]),
      mkNmr('nmr_acetanilide', 'Acetanilida', 'C₆H₅NHCOCH₃', 'DMSO-d6', 'N–H amida 9.91 (1H) / Ar 7.57–7.01 (5H) / CH₃ 2.04 (3H)', 'Amida aromática con protón N–H muy limpio en 9.91 ppm y metilo acetamida en 2.04 ppm.', [
        s(9.91, 1, 's', 0, '–NH–C(=O)–', 'Singulete ancho de N–H amida en 9.91 ppm', { isBroad: true, isKeySignal: true }),
        s(7.57, 2, 'd', 7.9, 'Ar–H (orto)', 'Protones orto al nitrógeno amídico'),
        s(7.28, 2, 't', 7.8, 'Ar–H (meta)', 'Protones meta'),
        s(7.01, 1, 't', 7.4, 'Ar–H (para)', 'Protón para'),
        s(2.04, 3, 's', 0, '–NHCOCH₃', 'Metilo acetamida en 2.04 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_paracetamol', 'Paracetamol (Acetaminofén)', '4-HOC₆H₄NHCOCH₃', 'DMSO-d6', 'NH 9.65 (1H) / OH 9.15 (1H) / Ar AA′BB′ 7.34 & 6.68 / CH₃ 1.98 (3H)', 'Distingue de inmediato sus dos protones intercambiables (NH 9.65 y OH 9.15 ppm) y anillo 1,4.', [
        s(9.65, 1, 's', 0, '–NHCO–', 'Protón amida en 9.65 ppm', { isBroad: true, isKeySignal: true }),
        s(9.15, 1, 's', 0, 'Ar–OH', 'Protón fenólico en 9.15 ppm', { isBroad: true, isKeySignal: true }),
        s(7.34, 2, 'd', 8.8, 'Ar–H (junto a NH)', 'Doblete aromático'),
        s(6.68, 2, 'd', 8.8, 'Ar–H (junto a OH)', 'Doblete apantallado junto al fenol'),
        s(1.98, 3, 's', 0, '–COCH₃', 'Metilo acetilo a 1.98 ppm')
      ]),
      mkNmr('nmr_benzamide', 'Benzamida', 'C₆H₅CONH₂', 'DMSO-d6', 'NH₂ dividido en 7.95 & 7.36 (1H + 1H) / Ar 7.87–7.44 (5H)', 'La rotación lenta del enlace C–N separa los dos protones –NH₂ en dos señales distintas.', [
        s(7.95, 1, 's', 0, '–CONH₂ (Ha)', 'Primer H amídico no equivalente', { isBroad: true, isKeySignal: true }),
        s(7.87, 2, 'd', 7.8, 'Ar–H (orto)', 'Protones orto al carbonilo'),
        s(7.48, 3, 'm', 7.5, 'Ar–H (m,p)', 'Protones meta y para'),
        s(7.36, 1, 's', 0, '–CONH₂ (Hb)', 'Segundo H amídico por rotación restringida', { isBroad: true, isKeySignal: true })
      ]),
      mkNmr('nmr_benzonitrile', 'Benzonitrilo', 'C₆H₅CN', 'CDCl3', '7.65 (d, 2H) / 7.59 (t, 1H) / 7.46 (t, 2H)', 'Grupo –C≡N atractor mueve todos los protones aromáticos arriba de 7.45 ppm.', [
        s(7.65, 2, 'd', 7.8, 'Ar–H (orto)', 'Protones orto al nitrilo', { isKeySignal: true }),
        s(7.59, 1, 't', 7.5, 'Ar–H (para)', 'Protón para'),
        s(7.46, 2, 't', 7.7, 'Ar–H (meta)', 'Protones meta')
      ]),
      mkNmr('nmr_dmac', 'Dimetilacetamida (DMAc)', 'CH₃CON(CH₃)₂', 'CDCl3', '3.01 (s, 3H) / 2.93 (s, 3H) / 2.08 (s, 3H)', 'Tres singuletes iguales de 3H cada uno debido a la barrera rotacional del enlace C–N.', [
        s(3.01, 3, 's', 0, 'N–CH₃ (A)', 'Primer N-metilo a 3.01 ppm', { isKeySignal: true }),
        s(2.93, 3, 's', 0, 'N–CH₃ (B)', 'Segundo N-metilo a 2.93 ppm', { isKeySignal: true }),
        s(2.08, 3, 's', 0, 'CH₃C(=O)–', 'Metilo acetilo en 2.08 ppm')
      ]),
      mkNmr('nmr_urea', 'Urea', 'CO(NH₂)₂', 'DMSO-d6', 'Singulete ancho único a 5.42 ppm (4H)', 'Cuatro protones equivalentes formando un solo pico ancho en DMSO.', [
        s(5.42, 4, 's', 0, '2 × –NH₂', 'Singulete único amídico de 4H a 5.42 ppm', { isBroad: true, isKeySignal: true })
      ]),
      mkNmr('nmr_caffeine', 'Cafeína', 'C₈H₁₀N₄O₂', 'CDCl3', 'H-8 (s, 1H, 7.51 ppm) + Tres singuletes N–CH₃ (3.99 / 3.59 / 3.41 ppm)', 'Espectro icónico con un único H aromático y tres metilos sobre nitrógeno distintos.', [
        s(7.51, 1, 's', 0, 'H-8 (imidazol)', 'Protón heteroaromático único a 7.51 ppm', { isKeySignal: true }),
        s(3.99, 3, 's', 0, 'N7–CH₃', 'Metilo imidazólico a 3.99 ppm', { isKeySignal: true }),
        s(3.59, 3, 's', 0, 'N3–CH₃', 'Segundo N-metilo a 3.59 ppm'),
        s(3.41, 3, 's', 0, 'N1–CH₃', 'Tercer N-metilo a 3.41 ppm')
      ])
    ]
  },

  // 11. AZUCARES Y BIOQUIMICA (RMN EN D2O)
  {
    id: 'biomolecules_sugars',
    name: 'Biomoléculas y Carbohidratos',
    chemicalShiftZone: '3.0 – 5.5 ppm (H-anomérico y esqueleto) · 0.9 – 8.5 ppm',
    couplingSignature: 'Anómeros α (5.2 ppm, J≈3.7 Hz) vs β (4.6 ppm, J≈8.0 Hz) en D₂O; aminoácidos zwitteriónicos',
    compounds: [
      mkNmr('nmr_d_glucose', 'α/β-D-Glucosa (Mutarrotación)', 'C₆H₁₂O₆', 'D2O', 'α-H1 5.22 (d, J=3.7) & β-H1 4.63 (d, J=8.0) + Esqueleto 3.2–3.9', 'La relación de integrales entre 5.22 (α, 36%) y 4.63 ppm (β, 64%) cuantifica el equilibrio anomérico.', [
        s(5.22, 1, 'd', 3.7, 'H-1 (α ecuatorial)', 'Doblete anomérico α (J=3.7 Hz, ~36%)', { isKeySignal: true }),
        s(4.63, 2, 'd', 8.0, 'H-1 (β axial)', 'Doblete anomérico β (J=8.0 Hz, ~64%)', { isKeySignal: true }),
        s(3.82, 4, 'm', 5.5, 'H-6a,b & H-3', 'Protones carbinólicos en D₂O'),
        s(3.45, 8, 'm', 7.5, 'H-2,4,5 (anillo)', 'Múltiples protones del anillo piranosa')
      ]),
      mkNmr('nmr_sucrose', 'Sacarosa', 'C₁₂H₂₂O₁₁', 'D2O', 'Doblete anomérico H-1 5.40 (d, 1H, J=3.8) + 4.21 (d, 1H) + 3.4–4.1 (12H)', 'Azúcar no reductor con una única señal anomérica a 5.40 ppm.', [
        s(5.40, 1, 'd', 3.8, 'H-1 (α-Glc)', 'Doblete único de enlace glucosídico a 5.40 ppm', { isKeySignal: true }),
        s(4.21, 1, 'd', 8.8, 'H-3′ (Fructosa)', 'Doblete aislado de fructofuranosa', { isKeySignal: true }),
        s(4.04, 1, 't', 8.6, 'H-4′ (Fructosa)', 'Triplete de anillo fructosa'),
        s(3.81, 6, 'm', 6.0, 'CH₂OH & anillo', 'Seis protones oxigenados'),
        s(3.66, 3, 's', 0, 'CH₂OH (C1′/C6′)', 'Grupo hidroximetilo'),
        s(3.52, 2, 'm', 7.0, 'H-2,4 Glc', 'Protones del anillo glucosa')
      ]),
      mkNmr('nmr_l_alanine', 'L-Alanina', 'CH₃CH(NH₃⁺)COO⁻', 'D2O', 'Cuartete H-α 3.78 ppm (1H) + Doblete CH₃ 1.47 ppm (3H)', 'Aminoácido más simple quiral: cuartete α a 3.78 ppm y doblete β en 1.47 ppm.', [
        s(3.78, 1, 'q', 7.3, '–CH(NH₃⁺)COO⁻', 'Cuartete de protón quiral α', { isKeySignal: true }),
        s(1.47, 3, 'd', 7.3, '–CH₃ (β)', 'Doblete intenso del metilo β', { isKeySignal: true })
      ]),
      mkNmr('nmr_l_valine', 'L-Valina', '(CH₃)₂CHCH(NH₃⁺)COO⁻', 'D2O', '3.60 (d, 1H) / 2.27 (m, 1H) / Dobletes diastereotópicos 1.03 & 0.98 (3H+3H)', 'Por el centro quiral α, los dos metilos del isopropilo son diastereotópicos (1.03 y 0.98 ppm).', [
        s(3.60, 1, 'd', 4.4, 'H-α', 'Doblete del protón α-aminoácido', { isKeySignal: true }),
        s(2.27, 1, 'm', 6.9, 'H-β', 'Multiplete del metino β'),
        s(1.03, 3, 'd', 7.0, 'γ-CH₃ (pro-R)', 'Primer metilo diastereotópico', { isKeySignal: true }),
        s(0.98, 3, 'd', 7.0, 'γ-CH₃ (pro-S)', 'Segundo metilo diastereotópico', { isKeySignal: true })
      ]),
      mkNmr('nmr_glycine', 'Glicina', '⁺H₃NCH₂COO⁻', 'D2O', 'Singulete único a 3.55 ppm (2H)', 'Único aminoácido aquiral; sus dos protones en D₂O generan una sola línea en 3.55 ppm.', [
        s(3.55, 2, 's', 0, '⁺H₃N–CH₂–COO⁻', 'Singulete único α-metileno en D₂O', { isKeySignal: true })
      ]),
      mkNmr('nmr_l_phenylalanine', 'L-Fenilalanina', 'C₆H₅CH₂CH(NH₃⁺)COO⁻', 'D2O', 'Ar 7.37 (5H) / 3.98 (t, 1H) / 3.28 & 3.12 (CH₂ diastereotópico)', 'Metileno β vecino al carbono quiral muestra dos señales separadas en 3.28 y 3.12 ppm.', [
        s(7.37, 5, 'm', 7.4, 'C₆H₅–', 'Anillo fenilo lateral'),
        s(3.98, 1, 't', 6.4, 'H-α', 'Protón quiral α', { isKeySignal: true }),
        s(3.28, 1, 't', 6.2, 'H-βa', 'Protón bencílico diastereotópico A', { isKeySignal: true }),
        s(3.12, 1, 't', 7.8, 'H-βb', 'Protón bencílico diastereotópico B')
      ]),
      mkNmr('nmr_lactic_acid', 'Ácido L-Láctico', 'CH₃CH(OH)COOH', 'D2O', 'Cuartete 4.35 ppm (1H) + Doblete 1.40 ppm (3H)', 'Espectro clásico limpio de dos multipletes en relación 1:3.', [
        s(4.35, 1, 'q', 7.0, '–CH(OH)–', 'Cuartete α-hidroxilo en 4.35 ppm', { isKeySignal: true }),
        s(1.40, 3, 'd', 7.0, '–CH₃', 'Doblete β a 1.40 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_citric_acid', 'Ácido Cítrico', 'C₆H₈O₇', 'D2O', 'Par de dobletes AB intensos a 2.91 y 2.75 ppm (J = 16.0 Hz)', 'Efecto diastereotópico famoso en una molécula aquiral: cada –CH₂– tiene protones geminales no equivalentes.', [
        s(2.91, 2, 'd', 16.0, 'CH₂ (Ha)', 'Rama baja campo del cuartete AB geminal (²J=16 Hz)', { isKeySignal: true }),
        s(2.75, 2, 'd', 16.0, 'CH₂ (Hb)', 'Rama alta campo del cuartete AB geminal (²J=16 Hz)', { isKeySignal: true })
      ]),
      mkNmr('nmr_ascorbic_acid', 'Ácido Ascórbico (Vitamina C)', 'C₆H₈O₆', 'D2O', '4.96 (d, 1H) / 4.08 (m, 1H) / 3.74 (d, 2H)', 'Protón H-4 en el anillo de lactona insaturada aparece como doblete claro a 4.96 ppm.', [
        s(4.96, 1, 'd', 2.0, 'H-4 (anillo)', 'Doblete diagnóstico del anillo lactona a 4.96 ppm', { isKeySignal: true }),
        s(4.08, 1, 'm', 6.4, 'H-5 (CHOH)', 'Multiplete de cadena lateral'),
        s(3.74, 2, 'd', 6.4, 'H-6 (CH₂OH)', 'Doblete terminal de 2 protones')
      ]),
      mkNmr('nmr_choline_chloride', 'Cloruro de Colina', 'HOCH₂CH₂N⁺(CH₃)₃ Cl⁻', 'D2O', '4.05 (m, 2H) / 3.51 (t, 2H) / Singulete gigante N⁺(CH₃)₃ 3.19 (9H)', 'Ion amonio cuaternario produciendo un pico de 9H muy intenso en 3.19 ppm.', [
        s(4.05, 2, 't', 5.0, '–CH₂OH', 'Metileno hidroxilo'),
        s(3.51, 2, 't', 5.0, '–CH₂N⁺–', 'Metileno junto al amonio cuaternario'),
        s(3.19, 9, 's', 0, '–N⁺(CH₃)₃', 'Singulete intenso de 9H en 3.19 ppm', { isKeySignal: true })
      ])
    ]
  },

  // 12. SOLVENTES RESIDUALES Y REFERENCIAS RMN
  {
    id: 'solvents_standards',
    name: 'Solventes Residuales y Patrones',
    chemicalShiftZone: '0.00 – 8.7 ppm',
    couplingSignature: 'Picos residuales protónicos (CHCl₃ 7.26 s; DMSO-d₅ 2.50 quint; Acetona-d₅ 2.05 quint) y TMS 0.00 ppm',
    compounds: [
      mkNmr('nmr_chcl3_tms', 'Cloroformo Residual (CHCl₃) + TMS', 'CHCl₃ / Si(CH₃)₄', 'CDCl3', 'Singulete agudo CHCl₃ a 7.26 ppm + TMS a 0.00 ppm', 'Las dos referencias universales en CDCl₃: protón residual del cloroformo (7.26) y cero de escala TMS (0.00).', [
        s(7.26, 1, 's', 0, 'CHCl₃ (residual)', 'Referencia universal de CDCl₃ a 7.26 ppm', { isKeySignal: true }),
        s(0.00, 12, 's', 0, 'TMS (Si(CH₃)₄)', 'Cero absoluto de escala IUPAC (0.00 ppm)', { isKeySignal: true })
      ]),
      mkNmr('nmr_dmso_residual', 'DMSO-d₅ Residual en DMSO-d₆', '(CD₃)(CHD₂)SO', 'DMSO-d6', 'Quintete 2.50 ppm (²J_HD = 1.9 Hz) + H₂O residual 3.33 ppm', 'El acoplamiento con un átomo de deuterio (I=1, 2nI+1 = 5) divide el pico residual del DMSO en un quintete.', [
        s(3.33, 2, 's', 0, 'H₂O residual en DMSO', 'Traza de humedad característica a 3.33 ppm', { isBroad: true }),
        s(2.50, 1, 'quint', 1.9, 'DMSO-d₅ (CHD₂)', 'Quintete característico por acoplamiento con ²H (I=1)', { isKeySignal: true })
      ]),
      mkNmr('nmr_hdo_in_d2o', 'Agua Residual (HDO) en D₂O + DSS', 'HDO / DSS', 'D2O', 'Singulete HDO a 4.79 ppm + Referencia DSS a 0.00 ppm', 'Pico residual del agua deuterada en 4.79 ppm calibrado frente al patrón hidrosoluble DSS.', [
        s(4.79, 1, 's', 0, 'HDO (en D₂O)', 'Pico residual de agua en 4.79 ppm', { isKeySignal: true }),
        s(0.00, 9, 's', 0, 'DSS (Si(CH₃)₃)', 'Estándar cero acuoso a 0.00 ppm')
      ]),
      mkNmr('nmr_methanol_d3_res', 'Metanol-d₃ Residual (CHD₂OD)', 'CD₂HOH', 'CDCl3', 'Quintete 3.31 ppm + H₂O 4.87 ppm', 'Quintuplete fino a 3.31 ppm causado por dos deuterios vecinos al protón residual.', [
        s(4.87, 1, 's', 0, '–OH / HDO', 'Intercambio rápido hidroxilo'),
        s(3.31, 1, 'quint', 1.6, 'CHD₂OD', 'Quintete diagnóstico a 3.31 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_acetone_d5_res', 'Acetona-d₅ Residual', 'CD₃COCD₂H', 'CDCl3', 'Quintete 2.05 ppm (²J_HD = 2.2 Hz)', 'Quintete clásico por acoplamiento ¹H–²H sobre el metilo de la acetona deuterada.', [
        s(2.05, 1, 'quint', 2.2, 'CD₃COCHD₂', 'Quintete residual de acetona-d₆ a 2.05 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_benzene_d5_res', 'Benceno-d₅ Residual (C₆D₅H)', 'C₆D₅H', 'CDCl3', 'Singulete ancho a 7.16 ppm', 'El protón residual del benceno deuterado aparece como una señal aguda en 7.16 ppm.', [
        s(7.16, 1, 's', 0, 'C₆D₅H', 'Señal residual diagnóstica de benceno-d₆ a 7.16 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_dichloromethane_d1', 'Diclorometano-d₁ Residual (CHDCl₂)', 'CHDCl₂', 'CDCl3', 'Triplete 1:1:1 a 5.32 ppm (²J_HD = 1.1 Hz)', 'Un átomo de deuterio (I=1) desdobla al protón en un triplete de igual altura 1:1:1.', [
        s(5.32, 1, 't', 1.1, 'CHDCl₂', 'Triplete 1:1:1 a 5.32 ppm por acoplamiento con un ²H', { isKeySignal: true })
      ]),
      mkNmr('nmr_maleic_acid_qnmr', 'Ácido Maleico (Patrón Primario qNMR)', 'cis-HOOCCH=CHCOOH', 'D2O', 'Singulete único agudo a 6.28 ppm (2H)', 'Estándar primario NIST para cuantificación absoluta qNMR gracias a su singulete aislado de 2 protones.', [
        s(6.28, 2, 's', 0, 'cis –CH=CH–', 'Singulete estándar cuantitativo qNMR en D₂O a 6.28 ppm', { isKeySignal: true })
      ]),
      mkNmr('nmr_135_tmb_qnmr', '1,3,5-Trimetoxibenceno (Estándar qNMR)', 'C₆H₃(OCH₃)₃', 'CDCl3', 'Singulete Ar 6.09 ppm (3H) + Singulete OCH₃ 3.77 ppm (9H)', 'Patrón orgánico certificado qNMR para cuantificar fármacos lipofílicos en CDCl₃.', [
        s(6.09, 3, 's', 0, 'Ar–H (2,4,6)', 'Singulete aromático limpio a 6.09 ppm (3H)', { isKeySignal: true }),
        s(3.77, 9, 's', 0, '3 × –OCH₃', 'Singulete metoxilo intenso (9H)', { isKeySignal: true })
      ]),
      mkNmr('nmr_pyridine_d4_res', 'Piridina-d₄ Residual', 'C₅D₄HN', 'CDCl3', '8.74 (1H) / 7.58 (1H) / 7.22 (1H)', 'Tres señales residuales limpias para muestras básicas o poco solubles en cloroformo.', [
        s(8.74, 1, 's', 0, 'H-2,6 residual', 'Protones α a 8.74 ppm', { isKeySignal: true }),
        s(7.58, 1, 's', 0, 'H-4 residual', 'Protón γ a 7.58 ppm'),
        s(7.22, 1, 's', 0, 'H-3,5 residual', 'Protones β a 7.22 ppm')
      ])
    ]
  }
];

export const ALL_NMR_COMPOUNDS: NmrCompound[] = NMR_GROUPS_DATA.flatMap(
  (g) => g.compounds
);

export interface NmrSpectrumPoint {
  ppm: number; // 12.5 down to -0.5
  intensity: number; // 0 to ~1.0+
}

export interface NmrFidPoint {
  timeMs: number; // 0 to 250 ms
  amplitude: number; // -1 to +1
}

export interface NmrSimulationResult {
  points: NmrSpectrumPoint[];
  fid: NmrFidPoint[];
  b0Tesla: number;
  t2StarSec: number;
  linewidthHz: number;
  snrEstimate: number;
  deuteriumLockOk: boolean;
}

// Pascal triangle weights for multiplet splitting
function getPascalLines(mult: NmrMultiplicity): number[] {
  switch (mult) {
    case 's':
      return [1];
    case 'd':
      return [0.5, 0.5];
    case 't':
      return [0.25, 0.5, 0.25];
    case 'q':
      return [0.125, 0.375, 0.375, 0.125];
    case 'quint':
      return [0.0625, 0.25, 0.375, 0.25, 0.0625];
    case 'sept':
      return [1 / 64, 6 / 64, 15 / 64, 20 / 64, 15 / 64, 6 / 64, 1 / 64];
    case 'm':
      return [0.1, 0.22, 0.36, 0.22, 0.1];
  }
}

/**
 * Computes realistic 1H NMR spectrum (12.5 -> -0.5 ppm IUPAC reversed axis) and time-domain FID S(t).
 */
export function computeNmrSimulation(
  compound: NmrCompound,
  freqMhz: number, // 60, 300, 400, 600, 800
  scans: number, // 1 to 64
  shimmedOk: boolean, // true => <0.6 Hz FWHM, false => ~18 Hz poorly shimmed
  solventMode: 'deuterated' | 'non_deuterated_h2o',
  showTms: boolean
): NmrSimulationResult {
  // Larmor constant for 1H: 42.577 MHz / Tesla
  const b0Tesla = freqMhz / 42.577;
  const linewidthHz = shimmedOk ? 0.55 : 18.0;
  const t2StarSec = 1 / (Math.PI * linewidthHz);

  // SNR scales as B0^(3/2) * sqrt(N_scans)
  const snrEstimate = Math.round(140 * Math.pow(freqMhz / 400, 1.5) * Math.sqrt(Math.max(1, scans)) * (shimmedOk ? 1 : 0.35));
  const noiseAmp = 0.025 / (Math.sqrt(Math.max(1, scans)) * Math.pow(freqMhz / 400, 0.8));

  // Effective half-width in ppm scales inversely with MHz!
  // Also scale visually slightly so 0.55 Hz at 600 MHz is crisp on a 13 ppm span.
  const baseFwhmPpm = Math.max(0.032, (linewidthHz * 4.5) / freqMhz);

  const signalsToRender: {
    shiftPpm: number;
    protons: number;
    multiplicity: NmrMultiplicity;
    jHz: number;
    isBroad?: boolean;
  }[] = [...compound.signals];

  if (showTms && !signalsToRender.some((sig) => Math.abs(sig.shiftPpm) < 0.05)) {
    signalsToRender.push({
      shiftPpm: 0.0,
      protons: 2,
      multiplicity: 's',
      jHz: 0,
    });
  }

  // Solvent peak handling
  if (solventMode === 'non_deuterated_h2o') {
    // Huge H2O 110 M proton peak at 4.79 ppm drowning out analyte signals!
    signalsToRender.push({
      shiftPpm: 4.79,
      protons: 45,
      multiplicity: 's',
      jHz: 0,
      isBroad: true,
    });
  } else if (compound.defaultSolvent === 'CDCl3') {
    signalsToRender.push({ shiftPpm: 7.26, protons: 0.45, multiplicity: 's', jHz: 0 });
  } else if (compound.defaultSolvent === 'DMSO-d6') {
    signalsToRender.push({ shiftPpm: 2.50, protons: 0.45, multiplicity: 'quint', jHz: 1.9 });
  } else if (compound.defaultSolvent === 'D2O') {
    signalsToRender.push({ shiftPpm: 4.79, protons: 0.55, multiplicity: 's', jHz: 0 });
  }

  // Sample 521 points from 12.5 down to -0.5 ppm (step 0.025 ppm)
  const points: NmrSpectrumPoint[] = [];
  let maxRaw = 0.01;
  const rawValues: { ppm: number; val: number }[] = [];

  for (let ppm = 12.5; ppm >= -0.5 - 0.001; ppm -= 0.025) {
    let val = 0;

    for (const sig of signalsToRender) {
      const weights = getPascalLines(sig.multiplicity);
      const nSub = weights.length;
      const centerIdx = (nSub - 1) / 2;
      // Coupling J in ppm shrinks with higher magnetic field freqMhz!
      const jPpm = sig.jHz / Math.max(40, freqMhz);
      // Slight visual separation floor at low field vs clean split at high field
      const widthScale = sig.isBroad ? 2.4 : 1.0;
      const gamma = (baseFwhmPpm * widthScale) / 2;

      for (let k = 0; k < nSub; k++) {
        const subCenter = sig.shiftPpm + (k - centerIdx) * jPpm;
        const diff = ppm - subCenter;
        const lorentz = (gamma * gamma) / (diff * diff + gamma * gamma);
        // Scale down peak height if poorly shimmed so integral is conserved
        const shimHeightFactor = shimmedOk ? 1.0 : 0.45;
        val += sig.protons * weights[k] * lorentz * shimHeightFactor;
      }
    }

    const noise = (Math.sin(ppm * 97 + scans) + Math.cos(ppm * 173)) * noiseAmp;
    const total = Math.max(0, val + noise);
    if (total > maxRaw) maxRaw = total;
    rawValues.push({ ppm, val: total });
  }

  // Normalize so tallest peak reaches ~0.94 (leaving room for labels)
  const normDiv = Math.max(0.5, maxRaw / 0.92);
  for (const rv of rawValues) {
    points.push({
      ppm: rv.ppm,
      intensity: rv.val / normDiv,
    });
  }

  // Generate realistic decaying FID S(t) over 0..220 ms
  const fid: NmrFidPoint[] = [];
  const decayRateMs = shimmedOk ? 0.016 : 0.085; // poorly shimmed kills FID fast!
  const nFid = 140;
  const maxTimeMs = 220;
  for (let i = 0; i <= nFid; i++) {
    const timeMs = (i / nFid) * maxTimeMs;
    const env = Math.exp(-timeMs * decayRateMs);
    let beat = 0;
    compound.signals.slice(0, 4).forEach((sig, idx) => {
      const omega = 0.14 + sig.shiftPpm * 0.065 * (freqMhz / 400);
      beat += (sig.protons / 6) * Math.cos(omega * timeMs + idx * 0.4);
    });
    if (solventMode === 'non_deuterated_h2o') {
      beat += 2.2 * Math.cos(0.45 * timeMs);
    }
    const noise = Math.sin(timeMs * 4.7 + scans) * noiseAmp * 1.4;
    fid.push({
      timeMs,
      amplitude: Math.max(-1, Math.min(1, (beat * env) / 1.4 + noise)),
    });
  }

  return {
    points,
    fid,
    b0Tesla,
    t2StarSec,
    linewidthHz,
    snrEstimate,
    deuteriumLockOk: solventMode === 'deuterated',
  };
}
