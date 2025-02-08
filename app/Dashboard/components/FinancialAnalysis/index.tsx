import { PieChart } from 'react-native-gifted-charts';
import { money } from '@/utils/format';
import Styled from './styled';

const FinancialAnalysis = () => {
  const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

  return (
    <Styled.Container>
      <Styled.PixelBottomImage source={require('@/assets/images/icons/pixels.png')} />
      <Styled.PixelTopImage source={require('@/assets/images/icons/pixels.png')} />

      <Styled.Title>Análise Financeira</Styled.Title>

      <Styled.MoneyBox>
        <Styled.BoxLabel>Total depositado</Styled.BoxLabel>
        <Styled.MoneyLabel>{money(1000)}</Styled.MoneyLabel>
      </Styled.MoneyBox>

      <Styled.MoneyBox>
        <Styled.BoxLabel>Total movimentado</Styled.BoxLabel>
        <Styled.BoxLabel>Total movimentado</Styled.BoxLabel>
        <Styled.MoneyLabel>{money(800)}</Styled.MoneyLabel>
      </Styled.MoneyBox>

      <PieChart data={data}/>
    </Styled.Container>
  );
};

export default FinancialAnalysis;
