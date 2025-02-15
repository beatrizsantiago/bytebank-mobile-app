import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTransactionContext, KindType } from '@/context/Transactions';
import { KIND_LIST } from '@/utils/transactionKinds';
import { currencyToFloat, filename, formatCurrency } from '@/utils/format';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '@/components/Button';
import Input from '@/components/Input';
import theme from '@/theme';
import * as DocumentPicker from 'expo-document-picker';

import Styled from './styled';

const TransactionForm = () => {
  const navigation = useNavigation();

  const [attach, setAttach] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [kind, setKind] = useState<KindType>('DEPOSIT');
  const [value, setValue] = useState('');

  const { addTransaction } = useTransactionContext();

  const balance = 0;

  const onSavePress = async () => {
    if (!kind) {
      Alert.alert('Oops!', 'Selecione o tipo da transação');
      return;
    }

    if (!value) {
      Alert.alert('Oops!', 'Informe o valor da transação');
      return;
    }

    if (!attach) {
      Alert.alert('Oops!', 'Anexe um recibo para a transação');
      return;
    }

    const absValue = Math.abs(currencyToFloat(value));

    if (absValue > balance && kind !== 'DEPOSIT') {
      Alert.alert('Oops!', 'Saldo insuficiente para realizar essa transação!');
      return;
    };

    const formattedValue = absValue * (kind === 'DEPOSIT' ? 1 : -1);

    const success = await addTransaction({
      value: formattedValue,
      kind,
      attach,
    });

    if (success) {
      navigation.goBack();
    } else {
      Alert.alert('Oops!', 'Erro ao salvar a transação!');
    }
  };

  const onAttachDocumentPress = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });

    if (!result.canceled && result.assets) {
      setAttach(result.assets[0]);
    }
  };

  return (
    <Styled.Scroll>
      <Styled.Title>
        Adicionar transação
      </Styled.Title>

      <Styled.BackButton onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} />
      </Styled.BackButton>

      <Styled.GrayContainer>
        <Styled.PickerBox>
          <Picker
            selectedValue={kind}
            onValueChange={(itemValue) => setKind(itemValue)}
          >
            {KIND_LIST.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </Styled.PickerBox>

        <Input
          label="Valor"
          placeholder="0,00"
          keyboardType="numeric"
          value={value}
          onChangeText={(text) => setValue(formatCurrency(text))}
        />

        <Styled.DocumentButton onPress={onAttachDocumentPress}>
          <MaterialIcons name="attach-file" size={20} color={theme.high.main} />
          <Styled.TitleButton>
            Anexar recibo
          </Styled.TitleButton>
        </Styled.DocumentButton>

        {attach && (
          <Styled.AttachLabel>
            {filename(attach.name)}
          </Styled.AttachLabel>
        )}

        <Styled.ButtonBox>
          <Button
            title="Salvar"
            color="primary"
            onPress={onSavePress}
          />
        </Styled.ButtonBox>

        <Image
          source={require('@/assets/images/woman_with_credit_card.png')}
          style={{ width: 250, height: 200 }}
        />
      </Styled.GrayContainer>
    </Styled.Scroll>
  );
};

export default TransactionForm;
