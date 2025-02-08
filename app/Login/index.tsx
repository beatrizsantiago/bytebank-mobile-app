import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styled from './styled';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import Button from '@/components/Button';

const Login = () => {
  const navigation = useNavigation();

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
      />
      <PasswordInput />

      <Styled.ButtonBox>
        <Button
          title="Entrar"
          color="secondary"
          onPress={() => navigation.navigate('Tabs')}
        />
      </Styled.ButtonBox>
    </Styled.Scroll>
  );
};

export default Login;
