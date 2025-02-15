import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTransactionContext } from '@/context/Transactions';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import theme from '@/theme';

import StatementItem from './components/StatementItem';
import Styled from './styled';

const TransactionsList = () => {
  const navigation = useNavigation();

  const { list, listLoading } = useTransactionContext();

  return (
    <View>
      <Styled.Header>
        <Styled.TopRow>
          <Styled.ExtractLabel>Extrato</Styled.ExtractLabel>

          <Styled.IconsRow>
            <Styled.IconButton>
              <FontAwesome name="filter" size={32} color={theme.primary.main} />
            </Styled.IconButton>
            <Styled.IconButton onPress={() => navigation.navigate('TransactionForm')}>
              <Ionicons name="add-circle" size={32} color={theme.primary.main} />
            </Styled.IconButton>
          </Styled.IconsRow>
        </Styled.TopRow>

        <Styled.SearchRow>
          <Styled.SearchInput placeholder="Pesquisar" />
          <Styled.SearchIcon name="search" size={24} />
        </Styled.SearchRow>
      </Styled.Header>

      {listLoading ? (
        <ActivityIndicator />
      ) : (
        <Styled.Scroll>
          {list.map((item) => (
            <StatementItem
              key={item.id}
              transaction={item}
            />
          ))}
        </Styled.Scroll>
      )}
    </View>
  );
};

export default TransactionsList;
