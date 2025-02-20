import { ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { money } from '@/utils/format';
import { useTransactionContext } from '@/context/Transactions'

import Styled from './styled';

const FinancialAnalysis = () => {
  const { analysisData } = useTransactionContext();

  if (!analysisData) return <ActivityIndicator />;

  if (!analysisData.fixedIncome && !analysisData.variableIncome) return null;

  return (
    <Styled.Container>
      <Styled.PixelBottomImage source={require('@/assets/images/icons/pixels.png')} />
      <Styled.PixelTopImage source={require('@/assets/images/icons/pixels.png')} />

      <Styled.Title>Investimentos</Styled.Title>

      <Styled.MoneyBox>
        <Styled.BoxLabel>Renda Fixa</Styled.BoxLabel>
        <Styled.MoneyLabel>{money(analysisData.fixedIncome)}</Styled.MoneyLabel>
      </Styled.MoneyBox>

      <Styled.MoneyBox>
        <Styled.BoxLabel>Renda Variável</Styled.BoxLabel>
        <Styled.MoneyLabel>{money(analysisData.variableIncome)}</Styled.MoneyLabel>
      </Styled.MoneyBox>

      <Styled.ChartTitle>
        Estatísticas
      </Styled.ChartTitle>

      <Styled.ChartContainer>
        <Styled.ChartBox>
          <PieChart data={analysisData.chartData} />
        </Styled.ChartBox>

        {analysisData.chartData.map((slice, index) => (
          <Styled.Line key={index}>
            <Styled.Dot color={slice.color} />
            <Styled.LineLabel>{slice.text}</Styled.LineLabel>
          </Styled.Line>
        ))}
      </Styled.ChartContainer>
    </Styled.Container>
  );
};

export default FinancialAnalysis;
