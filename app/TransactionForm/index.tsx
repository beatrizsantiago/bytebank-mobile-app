import { Picker } from '@react-native-picker/picker';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '@/components/Button';
import Input from '@/components/Input';
import theme from '@/theme';
import * as DocumentPicker from 'expo-document-picker';

import Styled from './styled';

const TransactionForm = () => {
  const navigation = useNavigation();

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
          <Picker>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </Styled.PickerBox>

        <Input
          label="Valor"
          placeholder="0,00"
          keyboardType="numeric"
        />

        <Styled.DocumentButton>
          <MaterialIcons name="attach-file" size={20} color={theme.high.main} />
          <Styled.TitleButton>
            Anexar recibo
          </Styled.TitleButton>
        </Styled.DocumentButton>

        <Styled.ButtonBox>
          <Button
            title="Salvar"
            color="primary"
            onPress={() => console.log('Pay button pressed')}
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
