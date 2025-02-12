import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { money } from '@/utils/format';
import { Timestamp } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native';
import { KIND_LABEL } from '@/utils/transactionKinds';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import theme from '@/theme';

type StatementItemProps = {
  kind: 'DEPOSIT' | 'DOC_TED' | 'CURRENCY_EXCHANGE' | 'LEASING',
  value: number,
  attach: string,
  date: Timestamp,
};

const StatementItem = ({
  kind, value, attach, date,
}:StatementItemProps) => {
  const formattedMonth = format(date.toDate(), 'MMMM', { locale: ptBR });
  const month = formattedMonth[0].toUpperCase() + formattedMonth.substring(1);

  return (
    <Box>
      <MonthLabel>
        {month}
      </MonthLabel>

      <Content>
        <KindLabel>{KIND_LABEL[kind]}</KindLabel>
        <DateLabel>
          {format(date.toDate(), 'dd/MM/yyyy')}
        </DateLabel>
      </Content>

      <Row>
        <MoneyLabel>
          {money(value)}
        </MoneyLabel>
        <IconsRow>
          <TouchableOpacity>
            <Ionicons name="document-attach-outline" size={24} color={theme.primary.main} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="trash" size={24} color={theme.error.main} />
          </TouchableOpacity>
        </IconsRow>
      </Row>
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

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export default StatementItem;