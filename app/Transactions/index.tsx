import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import theme from '@/theme';

import StatementItem from './components/StatementItem';
import Styled from './styled';

const DATA = [
  {
    id: '1',
    kind: 'DEPOSIT',
    value: 1000,
    date: '2022-01-01',
  },
  {
    id: '2',
    kind: 'DOC_TED',
    value: 500,
    date: '2022-01-02',
  },
  {
    id: '3',
    kind: 'CURRENCY_EXCHANGE',
    value: 200,
    date: '2022-01-03',
  },
  {
    id: '4',
    kind: 'LEASING',
    value: 800,
    date: '2022-01-04',
  },
  {
    id: '5',
    kind: 'DEPOSIT',
    value: 1000,
    date: '2022-02-02',
  },
  {
    id: '6',
    kind: 'DOC_TED',
    value: 500,
    date: '2022-02-02',
  },
  {
    id: '7',
    kind: 'CURRENCY_EXCHANGE',
    value: 200,
    date: '2022-02-03',
  },
  {
    id: '8',
    kind: 'LEASING',
    value: 800,
    date: '2022-02-04',
  },
];

const Transactions = () => (
  <View>
    <Styled.Header>
      <Styled.TopRow>
        <Styled.ExtractLabel>Extrato</Styled.ExtractLabel>

        <Styled.IconsRow>
          <Styled.IconButton>
            <FontAwesome name="filter" size={32} color={theme.primary.main} />
          </Styled.IconButton>
          <Styled.IconButton>
            <Ionicons name="add-circle" size={32} color={theme.primary.main} />
          </Styled.IconButton>
        </Styled.IconsRow>
      </Styled.TopRow>

      <Styled.SearchRow>
        <Styled.SearchInput placeholder="Pesquisar" />
        <Styled.SearchIcon name="search" size={24} />
      </Styled.SearchRow>
    </Styled.Header>

    <Styled.Scroll>
      {DATA.map((item) => (
        <StatementItem
          key={item.id}
          kind={item.kind}
          value={item.value}
          date={item.date}
        />
      ))}
    </Styled.Scroll>
  </View>
);

export default Transactions;
