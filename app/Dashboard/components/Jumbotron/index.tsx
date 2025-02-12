import { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { money } from '@/utils/format';
import { useTransactionContext } from '@/context/Transactions';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '@/theme';

import Styled from './styled';

const Jumbotron = () => {
  const [showBalance, setShowBalance] = useState(false)

  const { balance } = useTransactionContext();

  const today = new Date();

  return (
    <Styled.Container>
      <Styled.UserName>
        Olá, Bia :)
      </Styled.UserName>
      <Styled.DateLabel>
        {formatDate(today, 'EEEE, dd/MM/yyyy', { locale: ptBR })}
      </Styled.DateLabel>

      <Styled.BalanceBox>
        <Styled.BalanceLabelRow>
          <Styled.BalanceLabel>
            Saldo
          </Styled.BalanceLabel>
          {showBalance ? (
            <TouchableOpacity onPress={() => setShowBalance(false)}>
              <Ionicons name="eye-off" size={24} color={theme.high.main} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowBalance(true)}>
              <Ionicons name="eye" size={24} color={theme.high.main} />
            </TouchableOpacity>
          )}
        </Styled.BalanceLabelRow>

        <Styled.Line />

        <Styled.AccountLabel>
          Conta Corrente
        </Styled.AccountLabel>
        <Styled.BalanceValue>
          {showBalance ? money(balance) : 'R$ ********'}
        </Styled.BalanceValue>
      </Styled.BalanceBox>

      <Styled.PixelBottomImage source={require('@/assets/images/icons/pixels.png')} />
      <Styled.PixelTopImage source={require('@/assets/images/icons/pixels.png')} />

      <Image source={require('@/assets/images/account_balance.png')} />
    </Styled.Container>
  );
};

export default Jumbotron;