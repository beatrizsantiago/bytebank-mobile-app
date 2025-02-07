import FontAwesome from '@expo/vector-icons/FontAwesome';
import styled from 'styled-components/native';
import theme from '@/theme';

const Footer = () => (
  <Container>
    <BoldLabel>Serviços</BoldLabel>
    <Label>Conta corrente</Label>
    <Label>Conta PJ</Label>
    <Label>Cartão de crédito</Label>

    <BoldLabel>Contato</BoldLabel>
    <Label>0800 004 250 08</Label>
    <Label>meajuda@bytebank.com.br</Label>
    <Label>ouvidoria@bytebank.com.br</Label>

    <BoldLabel>Desenvolvido por Alura</BoldLabel>

    <Logo source={require('@/assets/images/icons/white_logo.png')} />

    <SocialMediaRow>
      <Icon name="whatsapp" size={32} color={theme.high.main} />
      <Icon name="instagram" size={32} color={theme.high.main} />
      <Icon name="youtube-play" size={32} color={theme.high.main} />
    </SocialMediaRow>
  </Container>
);

const Container = styled.View`
  padding: 16px 40px 16px 48px;
  background-color: ${props => props.theme.low.main};
`;

const BoldLabel = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.theme.high.main};
  margin-bottom: 8px;
  margin-top: 16px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.high.main};
  margin-bottom: 8px;
`;

const Logo = styled.Image`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const SocialMediaRow = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const Icon = styled(FontAwesome)`
  margin-right: 24px;
`;

export default Footer;
