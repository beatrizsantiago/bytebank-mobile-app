import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { money } from '@/utils/format';
import { useTransactionContext } from '@/context/Transactions';
import { TransactionType } from '@/context/Transactions/types';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { KIND_LABEL } from '@/utils/transactionKinds';
import { useNavigation } from '@react-navigation/native';
import Modal from '@/components/Modal';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import theme from '@/theme';

type StatementItemProps = {
  transaction: TransactionType,
};

const StatementItem = ({
  transaction,
}:StatementItemProps) => {
  const navigation = useNavigation();

  const [showAttach, setShowAttach] = useState(false);

  const { deleteTransaction, refetchData } = useTransactionContext();

  const formattedMonth = format(transaction.date.toDate(), 'MMMM', { locale: ptBR });
  const month = formattedMonth[0].toUpperCase() + formattedMonth.substring(1);

  const onDeleteClick = async () => {
    const success = await deleteTransaction(transaction.id);
    if (success) {
      await refetchData();
      Alert.alert('Sucesso!', 'Transação deletada com sucesso!');
    } else {
      Alert.alert('Oops!', 'Erro ao deletar a transação!');
    }
  };

  const showDeleteAlert = () =>
    Alert.alert(
      'Atenção!',
      `Tem certeza que deseja deletar a transação ${KIND_LABEL[transaction.kind]} no valor de ${money(transaction.value)}?`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: onDeleteClick,
        },
      ],
      {
        cancelable: true,
      },
    );

  return (
    <Box onPress={() => navigation.navigate('TransactionForm', { transaction })}>
      <MonthLabel>
        {month}
      </MonthLabel>

      <Content>
        <KindLabel>{KIND_LABEL[transaction.kind]}</KindLabel>
        <DateLabel>
          {format(transaction.date.toDate(), 'dd/MM/yyyy')}
        </DateLabel>
      </Content>

      <Row>
        <MoneyLabel>
          {money(transaction.value)}
        </MoneyLabel>
        <IconsRow>
          <TouchableOpacity onPress={() => setShowAttach(true)}>
            <Ionicons name="document-attach-outline" size={24} color={theme.primary.main} />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDeleteAlert}>
            <Ionicons name="trash" size={24} color={theme.error.main} />
          </TouchableOpacity>
        </IconsRow>
      </Row>
      
      <Modal
        open={showAttach}
        onClose={() => setShowAttach(false)}
      >
        <Image
          source={{ uri: transaction.attachUrl }}
          style={{ width: '100%', aspectRatio: 2 / 1 }}
          resizeMode="cover"
        />
      </Modal>
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