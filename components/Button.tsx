import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import theme from '@/theme';

type Props = TouchableOpacityProps & {
  title: string,
  outlined?: boolean,
  color?: 'primary' | 'secondary';
};

const COLORS = {
  primary: theme.primary.main,
  secondary: theme.secondary.main,
}

const ButtonComponent = ({
  title, color, outlined = false, ...rest
}:Props) => (
  <Button outlined={outlined} color={color ? COLORS[color] : theme.low.main} {...rest}>
    <TextButton outlined={outlined} color={color ? COLORS[color] : theme.low.main}>
      {title}
    </TextButton>
  </Button>
);

const Button = styled.TouchableOpacity`
  background-color: ${({ theme, outlined, color }) => outlined ? 'transparent' : color};
  border: ${({ theme, outlined, color }) => outlined ? `2px solid ${color}` : 'none'};
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
  color: ${({ theme, outlined, color }) => outlined ? color : theme.high.main};
`;

export default ButtonComponent;
