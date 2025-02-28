import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTransactionContext } from '@/context/Transactions';
import { formatDate } from '@/utils/format';
import { KIND_LABEL } from '@/utils/transactionKinds';
import Button from '@/components/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import theme from '@/theme';

import FiltersModal from './components/FiltersModal';
import StatementItem from './components/StatementItem';
import Styled from './styled';

const TransactionsList = () => {
  const navigation = useNavigation();
  const [ShowFiltersModal, setShowFiltersModal] = useState(false);

  const {
    list,
    listLoading,
    loadMoreTransactions,
    kindsSelected,
    startDate,
    endDate,
    hasFilters,
    clearFilters,
  } = useTransactionContext();

  return (
    <View>
      <Styled.Header>
        <Styled.TopRow>
          <Styled.ExtractLabel>Extrato</Styled.ExtractLabel>

          <Styled.IconsRow>
            {hasFilters && (
              <Styled.ClearFiltersButton onPress={clearFilters}>
                <Styled.ClearFiltersLabel>
                  Limpar filtros
                </Styled.ClearFiltersLabel>
              </Styled.ClearFiltersButton>
            )}
            <Styled.IconButton onPress={() => setShowFiltersModal(true)}>
              <FontAwesome name="filter" size={32} color={theme.primary.main} />
            </Styled.IconButton>
            <Styled.IconButton onPress={() => navigation.navigate('TransactionForm')}>
              <Ionicons name="add-circle" size={32} color={theme.primary.main} />
            </Styled.IconButton>
          </Styled.IconsRow>
        </Styled.TopRow>
      </Styled.Header>

      {hasFilters && !ShowFiltersModal && (
        <View>
          <Styled.SelectedFilters>
            {kindsSelected.length > 0 && (
              <Styled.FiltersRow>
                <Styled.BoldLabel>Tipos:</Styled.BoldLabel>
                <Styled.FilterLabel>{kindsSelected.map(kind => KIND_LABEL[kind]).join(', ')}</Styled.FilterLabel>
              </Styled.FiltersRow>
            )}
            {startDate && (
              <Styled.FiltersRow>
                <Styled.BoldLabel>Data inicial:</Styled.BoldLabel>
                <Styled.FilterLabel>
                  {formatDate(startDate)}
                </Styled.FilterLabel>
              </Styled.FiltersRow>
            )}
            {endDate && (
              <Styled.FiltersRow>
                <Styled.BoldLabel>Data final:</Styled.BoldLabel>
                <Styled.FilterLabel>
                  {formatDate(endDate)}
                </Styled.FilterLabel>
              </Styled.FiltersRow>
            )}
          </Styled.SelectedFilters>

          <Styled.Divider />
        </View>
      )}

      {list.length > 0 && (
        <Styled.List
          data={list}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreTransactions}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingBottom: hasFilters ? 160 : 80 }}
          ListFooterComponent={() => listLoading && <ActivityIndicator size="large" />}
          renderItem={({ item }) => (
            <StatementItem
              key={item.id}
              transaction={item}
            />
          )}
        />
      )}

      {list.length === 0 && !listLoading && (
        <Styled.EmptyListLabel>Nenhuma transação encontrada!</Styled.EmptyListLabel>
      )}

      <FiltersModal
        onClose={() => setShowFiltersModal(false)}
        open={ShowFiltersModal}
      />
    </View>
  );
};

export default TransactionsList;
