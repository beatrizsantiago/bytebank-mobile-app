import { Image, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/routes';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/Button';

import Styled from './styled';
import Footer from './component/Footer';
import Features from './component/Features';

const Start = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={['#004D61', '#FFFFFF']}
      style={{ flex: 1 }}
    >
      <Styled.Header>
        <Image
          source={require('@/assets/images/icons/green_logo.png')}
          style={{
            width: 145,
            height: 32,
          }}
        />
      </Styled.Header>

      <ScrollView>
        <Styled.Container>

          <Styled.Title>
            Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
          </Styled.Title>

          <Styled.CenterContainer>
            <Image
              source={require('@/assets/images/banner.png')}
              style={{
                width: '100%',
                height: 240,
              }}
            />
          </Styled.CenterContainer>

          <Styled.ButtonsRow>
            <Button
              title="Criar conta"
              onPress={() => navigation.navigate('Registration')}
            />

            <Button
              title="Já tenho conta"
              onPress={() => navigation.navigate('Login')}
              outlined
            />
          </Styled.ButtonsRow>

          <Features />
        </Styled.Container>
        <Footer />
      </ScrollView>
    </LinearGradient>
)};

export default Start;
