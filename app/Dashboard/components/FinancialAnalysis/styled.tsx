import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({ theme }) => theme.gray.medium};
  padding: 16px;
  border-radius: 8px;
  margin: 8px 0px;
  align-items: center;
  overflow: hidden;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
`;

const MoneyBox = styled.View`
  background-color: ${({ theme }) => theme.primary.main};
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
`;

const BoxLabel = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.high.main};
  margin-bottom: 8px;
`;

const MoneyLabel = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.high.main};
`;

const PixelBottomImage = styled.Image`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotate(360deg);
  width: 130px;
  height: 130px;
`;

const PixelTopImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(180deg);
  width: 130px;
  height: 130px;
`;

const ChartContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.primary.main};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
`;

const ChartTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  margin-top: 32px;
`;

const ChartBox = styled.View`
  margin-top: 32px;
  margin-bottom: 16px;
`;

const Line = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 8px;
`;

const Dot = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ color }) => color};
  margin-right: 8px;
`;

const LineLabel = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.high.main};
`;

export default {
  Container,
  Title,
  MoneyBox,
  BoxLabel,
  MoneyLabel,
  PixelBottomImage,
  PixelTopImage,
  ChartContainer,
  ChartTitle,
  ChartBox,
  Line,
  Dot,
  LineLabel,
};
