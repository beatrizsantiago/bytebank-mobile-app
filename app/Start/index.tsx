import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import Button from '@/components/Button';

import styled from './styled';

const Start = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#004D61','rgba(0, 78, 97, 0.8)', '#FFFFFF']}
      style={{ flex: 1 }}
    >
      <styled.Header>
        <Image
          source={require('@/assets/images/icons/green_logo.png')}
          style={{
            width: 145,
            height: 32,
          }}
        />
      </styled.Header>

      <styled.Scroll>
        <styled.Title>
          Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
        </styled.Title>

        <styled.CenterContainer>
          <Image
            source={require('@/assets/images/banner.png')}
            style={{
              width: '100%',
              height: 240,
            }}
          />
        </styled.CenterContainer>

        <styled.ButtonsRow>
          <Button
            title="Criar conta"
            onPress={() => navigation.navigate('Register')}
          />

          <Button
            title="Já tenho conta"
            onPress={() => navigation.navigate('Register')}
            outlined
          />
        </styled.ButtonsRow>

        <styled.Subtitle>
          Vantagens do nosso banco:
        </styled.Subtitle>
      </styled.Scroll>
    </LinearGradient>
)};

export default Start;
