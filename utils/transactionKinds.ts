export const KIND_LABEL:{ [key: string]: string } = {
  DEPOSIT: 'Depósito',
  DOC_TED: 'Transferência',
  CURRENCY_EXCHANGE: 'Câmbio de Moeda',
  LEASING: 'Empréstimo e Financiamento',
};

export const KIND_LIST = Object.keys(KIND_LABEL).map((key) => ({ label: KIND_LABEL[key], value: key }));
