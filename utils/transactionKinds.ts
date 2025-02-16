export const KIND_LABEL:{ [key: string]: string } = {
  DEPOSIT: 'Depósito',
  DOC_TED: 'Transferência',
  CURRENCY_EXCHANGE: 'Câmbio de Moeda',
  INVESTMENT_FOUND: 'Fundo de Investimento',
  PUBLIC_CONTRACTS: 'Tesouro Direto',
  PRIVATE_RETIREMENT: 'Previdência Privada',
  STOCK_EXCHANGE: 'Bolsa de Valores',
};

export const KIND_LIST = Object.keys(KIND_LABEL).map((key) => ({ label: KIND_LABEL[key], value: key }));
