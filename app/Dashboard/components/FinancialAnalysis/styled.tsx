import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.gray.medium};
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  overflow: hidden;
  width: ${width - 32}px;
  height: ${height - 175}px;
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
  margin-bottom: 32px;
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

const EmptyLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: 16px;
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
  EmptyLabel,
};
