import { Image } from 'react-native';
import Styled from './styled';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import Checkbox from 'expo-checkbox';
import theme from '@/theme';
import Button from '@/components/Button';

const Registration = () => (
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
    />
    <Input
      label="E-mail"
      placeholder="Digite seu email"
    />
    <PasswordInput />

    <Styled.CheckBoxContainer>
      <Checkbox color={theme.secondary.main} />
      <Styled.CheckboxLabel>
        Li e estou ciente quanto às condições de tratamento dos meus dados
        conforme descrito na Política de Privacidade do banco.
      </Styled.CheckboxLabel>
    </Styled.CheckBoxContainer>

    <Styled.ButtonBox>
      <Button
        title="Criar conta"
        color="secondary"
      />
    </Styled.ButtonBox>
  </Styled.Scroll>
);

export default Registration;
