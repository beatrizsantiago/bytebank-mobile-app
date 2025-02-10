import { useState } from 'react';
import { Image } from 'react-native';
import { useAuthContext } from '@/context/Auth';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import theme from '@/theme';
import Button from '@/components/Button';

import Styled from './styled';

const Registration = () => {
  const navigation = useNavigation();

  const { signUp } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    setLoading(true);
    await signUp({ name, email, password });
    navigation.navigate('Tabs');
    setLoading(false);
  };

  const disableButton = !name || !email || !password || !privacyChecked;

  return (
    <Styled.Scroll>
      <Styled.ImageBox>
        <Image
          source={require('@/assets/images/registration.png')}
          style={{ width: 220, height: 162 }}
        />
      </Styled.ImageBox>

      <Styled.Title>
        Preencha os campos abaixo para criar sua conta corrente!
      </Styled.Title>

      <Input
        label="Nome"
        placeholder="Digite seu nome completo"
        value={name}
        onChangeText={setName}
      />
      <Input
        label="E-mail"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        inputMode="email"
      />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
      />

      <Styled.CheckBoxContainer>
        <Checkbox
          color={theme.secondary.main}
          value={privacyChecked}
          onValueChange={setPrivacyChecked}
        />
        <Styled.CheckboxLabel>
          Li e estou ciente quanto às condições de tratamento dos meus dados
          conforme descrito na Política de Privacidade do banco.
        </Styled.CheckboxLabel>
      </Styled.CheckBoxContainer>

      <Styled.ButtonBox>
        <Button
          title="Criar conta"
          color="secondary"
          onPress={onSignUpPress}
          disabled={disableButton}
          loading={loading}
        />
      </Styled.ButtonBox>
    </Styled.Scroll>
  );
};

export default Registration;
