import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { money } from '@/utils/format';
import styled from 'styled-components/native';

interface StatementItemProps {
  kind: 'DEPOSIT' | 'DOC_TED' | 'CURRENCY_EXCHANGE' | 'LEASING';
  value: number;
  date: string;
};

const KIND_LABEL = {
  DEPOSIT: 'Depósito',
  DOC_TED: 'Transferência',
  CURRENCY_EXCHANGE: 'Câmbio de Moeda',
  LEASING: 'Empréstimo e Financiamento',
};

const StatementItem = ({
  kind, value, date,
}:StatementItemProps) => {
  const formattedMonth = format(parseISO(date), 'MMMM', { locale: ptBR });
  const month = formattedMonth[0].toUpperCase() + formattedMonth.substring(1);

  return (
    <Box>
      <MonthLabel>
        {month}
      </MonthLabel>

      <Content>
        <KindLabel>{KIND_LABEL[kind]}</KindLabel>
        <DateLabel>
          {format(parseISO(date), 'dd/MM/yyyy')}
        </DateLabel>
      </Content>

      <MoneyLabel>
        {money(value)}
      </MoneyLabel>
    </Box>
  );
};

const Box = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.high.main};
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  margin: 8px 0px;
`;

const MonthLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.secondary.main};
`;

const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0px;
`;

const KindLabel = styled.Text`
  font-size: 16px;
  margin-right: 4px;
  font-weight: 400;
  color: ${({ theme }) => theme.low.main};
`;

const DateLabel = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.gray.main};
`;

const MoneyLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export default StatementItem;