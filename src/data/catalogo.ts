/** Un único catálogo para el árbol, las páginas de ramos y los miniPacks. */
export type Departamento = "DIM" | "DFI";
export interface MiniPack {
  id: string;
  titulo: string;
  enlace: string;
  descripcion?: string;
}
export interface Unidad {
  nombre: string;
  minipacks: MiniPack[];
}
export interface Ramo {
  codigo: string;
  nombre: string;
  departamento: Departamento;
  unidades: Unidad[];
}
interface Semestre {
  nombre: string;
  ramos: Ramo[];
}
interface Anio {
  nombre: string;
  semestres: Semestre[];
}
interface Plan {
  nombre: string;
  anios: Anio[];
}
const ramo = (codigo: string, nombre: string, departamento: Departamento): Ramo =>
  ({ codigo, nombre, departamento, unidades: [] });

export const catalogo: Plan[] = [
  {
    nombre: "Plan Común",
    anios: [
      {
        nombre: "Primer año",
        semestres: [
          {
            nombre: "1er semestre",
            ramos: [
              ramo("MA1001", "Intro. al Cálculo", "DIM"),
              ramo("MA1101", "Intro. al Álgebra", "DIM"),
              ramo("FI1000", "Intro. a la Física Clásica", "DFI")
            ]
          },
          {
            nombre: "2do semestre",
            ramos: [
              ramo("MA1002", "Cálculo Diferencial e Integral", "DIM"),
              ramo("MA1102", "Álgebra Lineal", "DIM"),
              ramo("FI1100", "Intro. a la Física Moderna", "DFI")
            ]
          }
        ]
      },
      {
        nombre: "Segundo año",
        semestres: [
          {
            nombre: "3er semestre",
            ramos: [
              ramo("MA2001", "Cálculo en Varias Variables", "DIM"),
              ramo("MA2601", "Ecuaciones Diferenciales Ordinarias", "DIM"),
              ramo("FI2001", "Mecánica", "DFI"),
              ramo("FI2003", "Métodos Experimentales", "DFI")
            ]
          },
          {
            nombre: "4to semestre",
            ramos: [
              ramo("MA2002", "Cálculo Avanzado y Aplicaciones", "DIM"),
              ramo("FI2002", "Electromagnetismo", "DFI"),
              ramo("FI2004", "Termodinámica", "DFI")
            ]
          }
        ]
      }
    ]
  }
];

export const ramos = catalogo.flatMap(plan =>
  plan.anios.flatMap(anio =>
    anio.semestres.flatMap(semestre => semestre.ramos)
  )
);

export const miniPacks = ramos.flatMap(ramo =>
  ramo.unidades.flatMap(unidad =>
    unidad.minipacks.map(pack => ({ ...pack, ramo, unidad }))
  )
);
