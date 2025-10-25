export enum Category {
  Matematica = "Matemática",
  Historia = "História",
  Biologia = "Biologia",
}

export type Question = {
  id: string;
  category: Category;
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export const categoryList = [
  Category.Matematica,
  Category.Historia,
  Category.Biologia,
];

export const questions: Question[] = [
  {
    id: "m1",
    category: Category.Matematica,
    q: "Qual é o valor de 7 × 8?",
    options: ["54", "56", "63", "49"],
    answer: 1,
    explain: "7 × 8 = 56.",
  },
  {
    id: "m2",
    category: Category.Matematica,
    q: "Se um triângulo tem lados 3, 4 e 5, ele é:",
    options: ["Equilátero", "Isósceles", "Retângulo", "Escaleno"],
    answer: 2,
    explain: "3-4-5 é um triplo pitagórico — portanto, triângulo retângulo.",
  },
  {
    id: "m3",
    category: Category.Matematica,
    q: "Qual é a média aritmética de 4, 8 e 10?",
    options: ["6", "7,33", "22", "8"],
    answer: 1,
    explain: "(4+8+10)/3 = 22/3 ≈ 7,33.",
  },
  {
    id: "m4",
    category: Category.Matematica,
    q: "Resolva: 12 ÷ 3 + 4 = ?",
    options: ["8", "12", "0", "-"],
    answer: 0,
    explain: "12 ÷ 3 + 4 = 4 + 4 = 8.",
  },
  {
    id: "m5",
    category: Category.Matematica,
    q: "Qual o próximo número na sequência: 2, 4, 8, 16, ... ?",
    options: ["24", "32", "20", "18"],
    answer: 1,
    explain: "É a sequência de potências de 2. Próximo: 32.",
  },

  {
    id: "h1",
    category: Category.Historia,
    q: "Em que ano ocorreu a Independência do Brasil?",
    options: ["1822", "1889", "1808", "1815"],
    answer: 0,
    explain: "Foi proclamada em 7 de setembro de 1822.",
  },
  {
    id: "h2",
    category: Category.Historia,
    q: "Quem foi figura central do Período do Terror na Revolução Francesa?",
    options: [
      "Napoleão Bonaparte",
      "Maximilien Robespierre",
      "Luís XVI",
      "Voltaire",
    ],
    answer: 1,
    explain: "Robespierre teve papel central no período do Terror.",
  },
  {
    id: "h3",
    category: Category.Historia,
    q: "Qual civilização construiu as pirâmides de Gizé?",
    options: ["Maias", "Egípcios", "Espanhóis", "Sumérios"],
    answer: 1,
    explain: "As pirâmides de Gizé foram construídas no Egito Antigo.",
  },
  {
    id: "h4",
    category: Category.Historia,
    q: "A Primeira Guerra Mundial começou em que ano?",
    options: ["1914", "1939", "1905", "1918"],
    answer: 0,
    explain: "A Primeira Guerra Mundial começou em 1914.",
  },
  {
    id: "h5",
    category: Category.Historia,
    q: "Quem proclamou a República no Brasil em 1889?",
    options: [
      "Deodoro da Fonseca",
      "Dom Pedro II",
      "Getúlio Vargas",
      "Floriano Peixoto",
    ],
    answer: 0,
    explain: "Marechal Deodoro da Fonseca, em 15/11/1889.",
  },
  {
    id: "b1",
    category: Category.Biologia,
    q: "Qual é o maior órgão do corpo humano?",
    options: ["Coração", "Fígado", "Pele", "Pulmão"],
    answer: 2,
    explain:
      "A pele é o maior órgão do corpo humano, com uma área média de 2 metros quadrados em um adulto.",
  },
  {
    id: "b2",
    category: Category.Biologia,
    q: "O que é a fotossíntese?",
    options: [
      "Processo de respiração celular",
      "Transformação de luz em energia",
      "Processo de digestão de alimentos",
      "Conversão de oxigênio em dióxido de carbono",
    ],
    answer: 1,
    explain:
      "A fotossíntese é o processo pelo qual as plantas convertem a luz solar em energia, usando dióxido de carbono e água.",
  },
  {
    id: "b3",
    category: Category.Biologia,
    q: "O que são os cromossomos?",
    options: [
      "Células do sangue",
      "Estruturas que carregam o material genético",
      "Órgãos do sistema respiratório",
      "Partes do sistema nervoso",
    ],
    answer: 1,
    explain:
      "Cromossomos são estruturas localizadas no núcleo das células que contêm o material genético (DNA).",
  },
  {
    id: "b4",
    category: Category.Biologia,
    q: "Qual é a função dos ribossomos?",
    options: [
      "Produção de energia",
      "Síntese de proteínas",
      "Armazenamento de DNA",
      "Transporte de nutrientes",
    ],
    answer: 1,
    explain:
      "Os ribossomos são responsáveis pela síntese de proteínas, traduzindo o RNA mensageiro em sequências de aminoácidos.",
  },
  {
    id: "b5",
    category: Category.Biologia,
    q: "Qual é a principal função do sistema circulatório?",
    options: [
      "Filtrar toxinas",
      "Transportar oxigênio e nutrientes",
      "Armazenar energia",
      "Regular a temperatura do corpo",
    ],
    answer: 1,
    explain:
      "O sistema circulatório transporta oxigênio, nutrientes, hormônios e resíduos metabólicos por todo o corpo.",
  },
];
