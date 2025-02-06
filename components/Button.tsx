import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

const Button = styled.TouchableOpacity`
  background-color: ${({ theme, outlined }) => outlined ? 'transparent' : theme.low.main};
  border: ${({ theme, outlined }) => outlined ? `2px solid ${theme.low.main}` : 'none'};
  width: 47%;
  height: 48px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextButton = styled.Text`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme, outlined }) => outlined ? theme.low.main : theme.high.main};
`;

type Props = TouchableOpacityProps & {
  title: string,
  outlined?: boolean,
};

const ButtonComponent = ({
  title, outlined = false, ...rest
}:Props) => (
  <Button outlined={outlined} {...rest}>
    <TextButton outlined={outlined}>
      {title}
    </TextButton>
  </Button>
);

export default ButtonComponent;
