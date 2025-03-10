import { useState } from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import { useAuthContext } from '@/context/Auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/routes';
import Button from '@/components/Button';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useUpdateUserName from '@/hooks/useUpdateUserName';

import Styled from './styled'

const Account = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { logout, user } = useAuthContext();

  const { updateName } = useUpdateUserName();
  
  const [name, setName] = useState(user?.displayName || '');
  const [password, setPassword] = useState('');

  const onLogoutPress = () => {
    logout();
    navigation.navigate('Start');
  };

  const onSavePress = async () => {
    const success = await updateName(name);
    if (success) {
      Alert.alert('Tudo certo!', 'Nome alterado com sucesso.');
    } else {
      Alert.alert('Oops!', 'Não foi possível alterar o nome.');
    }
  };

  const enableSaveButton = name !== user?.displayName && password.length > 0;

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>Minha conta</Styled.Title>
        <TouchableOpacity onPress={onLogoutPress}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </Styled.Header>

      <Input
        label="Nome"
        value={name}
        onChangeText={setName}
      />

      <Input
        label="E-mail"
        editable={false}
        defaultValue={user?.email || ''}
      />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Salvar alterações"
        color="primary"
        disabled={!enableSaveButton}
        onPress={onSavePress}
      />

      <Styled.ImageBox>
        <Image source={require('@/assets/images/edit_account.png')} />
      </Styled.ImageBox>
    </Styled.Container>
  );
};

export default Account;
