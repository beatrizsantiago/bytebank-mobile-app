import { useState } from 'react';
import { Alert, Image } from 'react-native';
import { useAuthContext } from '@/context/Auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/routes';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import Button from '@/components/Button';

import Styled from './styled';

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const { login } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const disableButton = !email || !password;

  const onLoginPress = async () => {
    setLoading(true);
    const success = await login({ email, password });
    if (success) {
      navigation.navigate('Tabs');
    } else {
      Alert.alert('Oops!', 'Usuário ou senha inválidos');
    }
    setLoading(false);
  }

  return (
    <Styled.Scroll>
      <Styled.ImageBox>
        <Image
          source={require('@/assets/images/login.png')}
          style={{ width: 220, height: 200 }}
        />
      </Styled.ImageBox>

      <Styled.Title>
        Login
      </Styled.Title>

      <Input
        label="E-mail"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
      />

      <Styled.ButtonBox>
        <Button
          title="Entrar"
          color="secondary"
          onPress={onLoginPress}
          disabled={disableButton}
          loading={loading}
        />
      </Styled.ButtonBox>
    </Styled.Scroll>
  );
};

export default Login;
