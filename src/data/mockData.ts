import type { TranslationHistoryItem, LibrasSignSample } from '../types';

export const INITIAL_HISTORY: TranslationHistoryItem[] = [
  {
    id: '1',
    timestamp: '2026-09-04T10:30:00Z',
    timeDisplay: 'Ontem: 10:30am',
    title: 'Diálogo Mercado',
    text: 'Olá! Bom Dia! Onde fica a seção de frutas e legumes frescos?',
    confidence: 94,
  },
  {
    id: '2',
    timestamp: '2026-09-04T09:15:00Z',
    timeDisplay: 'Ontem: 09:15am',
    title: 'Frase Saudações',
    text: 'Olá! Bom Dia! Como posso ajudar você hoje?',
    confidence: 88,
  },
  {
    id: '3',
    timestamp: '2026-05-23T16:45:00Z',
    timeDisplay: '23 Mai: 04:45pm',
    title: 'Consulta Médica',
    text: 'Estou sentindo dores na cabeça desde ontem à noite. Pode me examinar?',
    confidence: 91,
  },
  {
    id: '4',
    timestamp: '2026-05-20T14:10:00Z',
    timeDisplay: '20 Mai: 02:10pm',
    title: 'Apresentação Projeto',
    text: 'Sejam todos bem-vindos ao projeto BRASLIBRAS de acessibilidade universal.',
    confidence: 96,
  },
  {
    id: '5',
    timestamp: '2026-05-18T11:20:00Z',
    timeDisplay: '18 Mai: 11:20am',
    title: 'Informações de Rota',
    text: 'Onde fica a estação de metrô mais próxima daqui?',
    confidence: 90,
  },
  {
    id: '6',
    timestamp: '2026-05-15T08:30:00Z',
    timeDisplay: '15 Mai: 08:30am',
    title: 'Agradecimento Atendimento',
    text: 'Muito obrigado pela sua atenção, paciência e apoio!',
    confidence: 95,
  }
];


export const SAMPLE_SIGNS: LibrasSignSample[] = [
  {
    id: 'saudacao',
    title: 'Saudação Padrão',
    portugueseText: 'Olá! Bom Dia! Como posso ajudar você hoje?',
    description: 'Movimento de mão aberta espalmada seguido do sinal de bom dia com polegar.',
    tags: ['Básico', 'Atendimento', 'Cotidiano'],
    confidence: 95,
  },
  {
    id: 'agradecimento',
    title: 'Agradecimento',
    portugueseText: 'Muito obrigado pela sua atenção e paciência!',
    description: 'Mão tocando o queixo e se projetando para a frente com sorriso.',
    tags: ['Cortesia', 'Básico'],
    confidence: 92,
  },
  {
    id: 'nome',
    title: 'Apresentação Pessoal',
    portugueseText: 'Meu nome é Mariana e sou intérprete e pesquisadora de acessibilidade.',
    description: 'Sinal de letra "N" no peito seguido de datilologia.',
    tags: ['Apresentação', 'Pessoal'],
    confidence: 89,
  },
  {
    id: 'duvida',
    title: 'Pedido de Ajuda',
    portugueseText: 'Por favor, você poderia me explicar novamente com calma?',
    description: 'Mãos espalmadas subindo em arco expressando dúvida e pedido.',
    tags: ['Dúvida', 'Auxílio'],
    confidence: 87,
  },
  {
    id: 'emergencia',
    title: 'Apoio Médico',
    portugueseText: 'Preciso de orientação médica urgente para este paciente.',
    description: 'Sinais combinados de cruz médica e urgência.',
    tags: ['Saúde', 'Urgente'],
    confidence: 93,
  },
];

export const DICTIONARY_ITEMS = [
  { term: 'Olá / Oi', category: 'Saudações', desc: 'Mão em configuração "O" ou aberta acenando suavemente.' },
  { term: 'Bom Dia', category: 'Saudações', desc: 'Mão toca os lábios e abre em "D" ou espalmada em direção ao sol nascente.' },
  { term: 'Boa Tarde', category: 'Saudações', desc: 'Mão toca os lábios e braço desce na horizontal indicando o sol se pondo.' },
  { term: 'Boa Noite', category: 'Saudações', desc: 'Mão toca os lábios e a outra mão cobre suavemente a primeira, simulando a noite caindo.' },
  { term: 'Por Favor', category: 'Cortesia', desc: 'Mãos espalmadas unidas em frente ao peito com leve movimento circular.' },
  { term: 'Obrigado(a)', category: 'Cortesia', desc: 'Mão toca a testa e o queixo ou vai da boca em direção ao interlocutor.' },
  { term: 'Desculpe', category: 'Cortesia', desc: 'Mão em punho com o polegar tocando o queixo com expressão de remorso.' },
  { term: 'Aprender', category: 'Educação', desc: 'Mão aberta na testa fechando em punho, absorvendo o conhecimento.' },
  { term: 'Ajudar', category: 'Ações', desc: 'Uma mão espalmada apoia a outra fechada ou com polegar erguido impulsionando para a frente.' },
];
