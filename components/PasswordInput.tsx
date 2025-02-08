import { useState } from 'react';
import { TextInputProps, View } from 'react-native';
import styled from 'styled-components/native';
import Input from '@/components/Input';
import Entypo from '@expo/vector-icons/Entypo';
import theme from '@/theme';

const PasswordInput = ({ ...rest }:TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Field
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry={!showPassword}
        {...rest}
      />
      <IconButton onPress={() => setShowPassword((current) => !current)}>
        {showPassword ? (
          <Entypo name="eye-with-line" size={24} color={theme.gray.dark} />
        ) : (
          <Entypo name="eye" size={24} color={theme.gray.dark} />
        )}
      </IconButton>
    </View>
  );
};

const Field = styled(Input)`
  padding-right: 48px;
`;

const IconButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 24px;
  padding: 12px;
`;

export default PasswordInput;
