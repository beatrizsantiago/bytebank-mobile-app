import { ActivityIndicator, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTransactionContext } from '@/context/Transactions';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import theme from '@/theme';

import StatementItem from './components/StatementItem';
import Styled from './styled';

const TransactionsList = () => {
  const navigation = useNavigation();

  const {
    list,
    listLoading,
    loadMoreTransactions,
  } = useTransactionContext();

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
      </Styled.Header>
      <Styled.List
        data={list}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => listLoading && <ActivityIndicator size="large" />}
        renderItem={({ item }) => (
          <StatementItem
            key={item.id}
            transaction={item}
          />
        )}
      />
    </View>
  );
};

export default TransactionsList;
