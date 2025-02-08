import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import theme from '@/theme';

const HEADER_LABELS:{ [key:string]: string } = {
  Registration: 'Cadastre-se',
  Login: 'Seja bem vindo(a)',
};

const Header = ({ navigation, route, options }:StackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  const label = HEADER_LABELS[title] || title;

  return (
    <Container>
      {label && (
        <TitleRow>
          <Title>{label}</Title>
        </TitleRow>
      )}
      <MainRow>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color={theme.high.main} />
        </TouchableOpacity>
        <Image source={require('@/assets/images/favicon.png')} />
      </MainRow>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({ theme }) => theme.low.main};
  height: 80px;
  justify-content: center;
`;

const MainRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.high.main};
`;

export default Header;
