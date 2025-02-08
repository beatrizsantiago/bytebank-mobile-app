import { TextInput, TextInputProps, View } from 'react-native';
import styled from 'styled-components/native';

type Props = TextInputProps & {
  label: string,
  type?: string,
};

const Input = ({ label, ...rest }:Props) => {
  return (
    <View>
      <Label>{label}</Label>
      <Field {...rest} />
    </View>
  );
};

const Field = styled(TextInput)`
  border: 1px solid ${({ theme }) => theme.gray['200']};
  background-color: ${({ theme }) => theme.high.main};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 24px;
  height: 48px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 700;
`;

export default Input;