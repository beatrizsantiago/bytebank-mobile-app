import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTransactionContext, KindType, TransactionType } from '@/context/Transactions';
import { KIND_LIST } from '@/utils/transactionKinds';
import { currencyToFloat, filename, floatToCurrency, formatCurrency } from '@/utils/format';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import theme from '@/theme';
import * as DocumentPicker from 'expo-document-picker';

import Styled from './styled';

const TransactionForm = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const transactionData:TransactionType | undefined = route.params?.transaction;

  const [attach, setAttach] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [kind, setKind] = useState<KindType>('DEPOSIT');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAttach, setShowAttach] = useState(false);

  const { addTransaction, updateTransaction, refetchData } = useTransactionContext();

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

    if (!attach && !transactionData) {
      Alert.alert('Oops!', 'Anexe um recibo para a transação');
      return;
    }

    const absValue = Math.abs(currencyToFloat(value));

    if (absValue > balance && kind !== 'DEPOSIT') {
      Alert.alert('Oops!', 'Saldo insuficiente para realizar essa transação!');
      return;
    };

    setLoading(true);

    const formattedValue = absValue * (kind === 'DEPOSIT' ? 1 : -1);

    let success = null;

    if (transactionData) {
      success = await updateTransaction(transactionData.id, {
        value: formattedValue,
        kind,
        attach,
        attachUrl: transactionData.attachUrl,
      });
    } else if (attach) {
      success = await addTransaction({
        value: formattedValue,
        kind,
        attach,
      });
    }
    
    if (success) {
      await refetchData();
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Oops!', 'Erro ao salvar a transação!');
      setLoading(false);
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

  useEffect(() => {
    if (transactionData) {
      setKind(transactionData.kind);
      setValue(floatToCurrency(transactionData.value));
    }
  }, [])

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

        {transactionData?.attachUrl && (
          <Styled.PreviousAttachBox>
            <Styled.PreviousAttachLabel>
              Anexo anterior:
            </Styled.PreviousAttachLabel>
            <TouchableOpacity onPress={() => setShowAttach(true)}>
              <Styled.AttachViewLabel>
                visualizar
              </Styled.AttachViewLabel>
            </TouchableOpacity>
          </Styled.PreviousAttachBox>
        )}

        <Styled.ButtonBox>
          <Button
            title="Salvar"
            color="primary"
            onPress={onSavePress}
            loading={loading}
            disabled={loading}
          />
        </Styled.ButtonBox>

        <Image
          source={require('@/assets/images/woman_with_credit_card.png')}
          style={{ width: 250, height: 200 }}
        />
      </Styled.GrayContainer>

      {transactionData && (
        <Modal
          open={showAttach}
          onClose={() => setShowAttach(false)}
        >
          <Image
            source={{ uri: transactionData.attachUrl }}
            style={{ width: '100%', aspectRatio: 2 / 1 }}
            resizeMode="cover"
          />
        </Modal>
      )}
    </Styled.Scroll>
  );
};

export default TransactionForm;
