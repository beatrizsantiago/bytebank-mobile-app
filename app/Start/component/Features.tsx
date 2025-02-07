import { View } from 'react-native';
import styled from 'styled-components/native';

import FeatureItem from './FeatureItem';

const Features = () => (
  <View>
    <Subtitle>
      Vantagens do nosso banco:
    </Subtitle>

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
  </View>
);

const Subtitle = styled.Text`
  color: ${props => props.theme.low.main};
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export default Features;
