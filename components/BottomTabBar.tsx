import { useLinkBuilder } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import styled from 'styled-components/native';
import theme from '@/theme';

const LABELS:{ [key: string ]:string } = {
  Dashboard: 'Dashboard',
  Transactions: 'Transações',
  Account: 'Conta',
}

const ICONS:{ [key: string ]:(color:string) => React.ReactNode } = {
  Dashboard: (color) => <MaterialIcons name="dashboard" size={24} color={color} />,
  Transactions: (color) => <Entypo name="list" size={24} color={color} />,
  Account: (color) => <MaterialIcons name="account-circle" size={24} color={color} />,
}

const BottomTabBar = ({ state, navigation }:BottomTabBarProps) => {
  const { buildHref } = useLinkBuilder();

  return (
    <Bar>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Item
            key={route.key}
            href={buildHref(route.name, route.params)}
            onPress={onPress}
          >
            {ICONS[route.name](isFocused ? theme.secondary.main : theme.high.main)}
            <Label isFocused={isFocused}>
              {LABELS[route.name]}
            </Label>
          </Item>
        );
      })}
    </Bar>
  );
};

const Bar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 65px;
  background-color: ${({ theme }) => theme.primary.main};
`;

const Item = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Label = styled.Text`
  color: ${({ theme, isFocused }) => isFocused ? theme.secondary.main : theme.high.main};
  font-weight: 600;
  font-size: 12px;
`;

export default BottomTabBar;
