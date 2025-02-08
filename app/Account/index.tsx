import { Image } from 'react-native';
import Button from '@/components/Button';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';

import Styled from './styled'

const Account = () => {
  return (
    <Styled.Container>
      <Styled.Title>Minha conta</Styled.Title>

      <Input
        label="Nome"
      />

      <Input
        label="E-mail"
        editable={false}
      />

      <PasswordInput />

      <Button
        title="Salvar alterações"
        color="primary"
      />

      <Styled.ImageBox>
        <Image source={require('@/assets/images/edit_account.png')} />
      </Styled.ImageBox>
    </Styled.Container>
  );
};

export default Account;
