import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import theme from '@/theme';

type Props = TouchableOpacityProps & {
  title: string,
  outlined?: boolean,
  color?: 'primary' | 'secondary';
  loading?: boolean;
};

const COLORS = {
  primary: theme.primary.main,
  secondary: theme.secondary.main,
}

const ButtonComponent = ({
  title, color, outlined = false, loading = false, ...rest
}:Props) => {
  const currentBgColor = (() => {
    if (rest.disabled) return theme.gray.medium;
    if (outlined) return 'transparent';
    if (color) return COLORS[color];
    return theme.low.main;
  })();

  const currentColor = color ? COLORS[color] : theme.low.main;

  return (
    <Button
      outlined={outlined}
      bgColor={currentBgColor}
      color={currentColor}
      {...rest}
    >
      <TextButton outlined={outlined} color={currentColor}>
        {title}
      </TextButton>
      {loading && (
        <ActivityIndicator
          size="small"
          color={outlined ? currentColor : theme.high.main}
          style={{ marginLeft: 8 }}
        />
      )}
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ outlined, color }) => outlined ? `2px solid ${color}` : 'none'};
  flex: 1;
  width: 100%;
  height: 48px;
  min-height: 48px;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const TextButton = styled.Text`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme, outlined, color }) => outlined ? color : theme.high.main};
`;

export default ButtonComponent;
