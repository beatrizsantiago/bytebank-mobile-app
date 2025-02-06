import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/Button';

import styled from './styled';
import FeatureItem from './component/FeatureItem';

const Start = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#004D61', '#FFFFFF']}
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
            onPress={() => navigation.navigate('Tabs')}
          />

          <Button
            title="Já tenho conta"
            onPress={() => navigation.navigate('Tabs')}
            outlined
          />
        </styled.ButtonsRow>

        <styled.Subtitle>
          Vantagens do nosso banco:
        </styled.Subtitle>

        <FeatureItem
          icon={require('@/assets/images/icons/gift.png')}
          title="Conta e cartão gratuitos"
          description="Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."
        />
        <FeatureItem
          icon={require('@/assets/images/icons/withdraw.png')}
          title="Saques sem custo"
          description="Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h."
        />
        <FeatureItem
          icon={require('@/assets/images/icons/star.png')}
          title="Programa de pontos"
          description="Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"
        />
        <FeatureItem
          icon={require('@/assets/images/icons/gift.png')}
          title="Seguro Dispositivos"
          description="Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica."
        />
      </styled.Scroll>
    </LinearGradient>
)};

export default Start;
