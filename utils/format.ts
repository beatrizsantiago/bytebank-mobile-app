export const money = (value?:number | null):string => (value
  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  : 'R$ 0,00');

export const filename = (name:string) => (name.length > 16
    ? `${name.substring(0, 16)}...${name.substring(name.length - 4)}`
    : name);