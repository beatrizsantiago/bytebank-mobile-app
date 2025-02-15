export const money = (value?:number | null):string => (value
  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  : 'R$ 0,00');

export const filename = (name:string) => (name.length > 16
    ? `${name.substring(0, 16)}...${name.substring(name.length - 4)}`
    : name);

export const formatCurrency = (input:string) => {
  let numericValue = input.replace(/\D/g, "");

  let formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(numericValue) / 100);

  return formattedValue;
};

export const currencyToFloat = (value:string) => {
  if (!value) return 0;
  
  const numericValue = value.replace(/[R$\s.]/g, '').replace(',', '.');
  
  return parseFloat(numericValue);
};

export const floatToCurrency = (value:number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
