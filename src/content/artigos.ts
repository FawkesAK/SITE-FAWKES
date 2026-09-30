export type Artigo = {
  slug: string;
  titulo: string;
  categoria: string;
  resumo: string;
  imagem: string;
  secoes: { titulo: string; paragrafos: string[] }[];
};

export const artigos: Artigo[] = [
  {
    slug: "quando-operar-catarata",
    titulo: "Quando a catarata realmente precisa ser operada?",
    categoria: "Catarata",
    resumo:
      "A decisão de operar considera os achados dos exames e o quanto a catarata interfere na qualidade da visão e na rotina.",
    imagem: "explica_01_quando_operar_catarata.jpg",
    secoes: [
      {
        titulo: "A catarata avança em ritmos diferentes",
        paragrafos: [
          "A catarata é a perda progressiva da transparência do cristalino, a lente natural que ajuda a focalizar a luz dentro do olho. Esse processo costuma ser gradual e pode se desenvolver em velocidades distintas em cada pessoa.",
          "Por isso, não existe um único momento válido para todos. Duas pessoas com achados semelhantes no exame podem ter impactos muito diferentes no dia a dia.",
        ],
      },
      {
        titulo: "O que entra na avaliação",
        paragrafos: [
          "A consulta considera a acuidade visual, o exame do cristalino, a saúde da córnea, da retina e do nervo óptico, além do grau atual e das medidas necessárias para o planejamento cirúrgico.",
          "Ao lado dos exames, entra a conversa sobre rotina: dirigir à noite, ler, trabalhar em telas, praticar atividades específicas. É esse conjunto que ajuda a definir o momento adequado.",
        ],
      },
      {
        titulo: "Adiar sempre é seguro?",
        paragrafos: [
          "Em parte dos casos é possível acompanhar por um período. Em outros, a evolução da catarata pode dificultar o procedimento ou interferir na avaliação de outras estruturas do olho.",
          "A conduta é definida individualmente, com base no exame e na avaliação médica.",
        ],
      },
    ],
  },
  {
    slug: "lentes-intraoculares-na-catarata",
    titulo: "Qual é a diferença entre as lentes usadas na cirurgia de catarata?",
    categoria: "Lentes",
    resumo:
      "Monofocais, tóricas, multifocais e de foco estendido têm características próprias. A escolha depende do olho, da rotina e das expectativas.",
    imagem: "explica_02_lentes_catarata.jpg",
    secoes: [
      {
        titulo: "Por que existe mais de um tipo de lente",
        paragrafos: [
          "Na cirurgia de catarata, o cristalino que perdeu transparência é substituído por uma lente intraocular. Como essa lente passa a exercer parte da função óptica do olho, o planejamento pode considerar também o grau existente.",
          "Diferentes tecnologias distribuem o foco de maneiras distintas, com vantagens e limitações próprias.",
        ],
      },
      {
        titulo: "Monofocal",
        paragrafos: [
          "Projetada para privilegiar uma faixa principal de visão. É comum que óculos continuem sendo utilizados para outras distâncias.",
        ],
      },
      {
        titulo: "Tórica",
        paragrafos: [
          "Pode ser indicada quando também existe astigmatismo elegível para correção. A avaliação da córnea é parte central dessa decisão.",
        ],
      },
      {
        titulo: "Multifocal e foco estendido (EDOF)",
        paragrafos: [
          "As multifocais distribuem foco para mais de uma distância e podem reduzir a dependência dos óculos em pacientes selecionados. As lentes de foco estendido ampliam a faixa de visão com um perfil próprio de desempenho.",
          "Ambas exigem análise cuidadosa da córnea, da retina, do nervo óptico, da rotina e das expectativas. Não são indicadas para todos os casos.",
        ],
      },
    ],
  },
  {
    slug: "ceratocone-e-transplante",
    titulo: "Ceratocone sempre evolui para transplante?",
    categoria: "Ceratocone",
    resumo:
      "Nem todo ceratocone chega ao transplante. O acompanhamento e o momento do diagnóstico influenciam bastante a conduta.",
    imagem: "explica_03_ceratocone_transplante.jpg",
    secoes: [
      {
        titulo: "O que é o ceratocone",
        paragrafos: [
          "O ceratocone é uma alteração da córnea em que ocorre afinamento e mudança progressiva da sua curvatura, o que pode modificar a forma como a luz entra no olho e afetar a qualidade da visão.",
        ],
      },
      {
        titulo: "Diagnóstico e acompanhamento",
        paragrafos: [
          "Exames de imagem da córnea permitem acompanhar a evolução ao longo do tempo. Esse acompanhamento é o que orienta a conduta em cada fase.",
          "Existem abordagens voltadas à estabilização e à reabilitação visual, e sua indicação depende das características de cada caso.",
        ],
      },
      {
        titulo: "Quando o transplante entra na conversa",
        paragrafos: [
          "O transplante é considerado em situações específicas, geralmente quando a córnea apresenta comprometimento importante da transparência ou da estrutura.",
          "Além disso, a córnea tem camadas diferentes, e nem todo transplante substitui a espessura total do tecido. Técnicas lamelares permitem substituir apenas camadas específicas, conforme o diagnóstico.",
        ],
      },
    ],
  },
];

export function getArtigo(slug: string) {
  return artigos.find((a) => a.slug === slug);
}

export const categoriasExplica = [
  "Catarata",
  "Córnea",
  "Ceratocone",
  "Cirurgia refrativa",
  "Superfície ocular",
  "Lentes",
  "Transplantes",
];
