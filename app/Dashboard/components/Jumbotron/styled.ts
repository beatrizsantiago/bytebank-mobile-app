import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Container = styled.View`
  background-color: ${({ theme }) => theme.primary.main};
  padding: 40px;
  border-radius: 8px;
  margin: 16px;
  align-items: center;
  overflow: hidden;
  width: ${width - 32}px;
  height: 600px;
`;

const UserName = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${({ theme }) => theme.high.main};
  text-align: center;
  margin-bottom: 16px;
`;

const DateLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.high.main};
  text-align: center;
`;

const BalanceBox = styled.View`
  margin-top: 32px;
  margin-bottom: 32px;
  min-width: 80%;
`;

const BalanceLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BalanceLabel = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.high.main};
  margin-right: 16px;
`;

const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.high.main};
  margin: 16px 0px;
`;

const AccountLabel = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.high.main};
`;

const BalanceValue = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) => theme.high.main};
`;

const PixelBottomImage = styled.Image`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotate(90deg);
  width: 130px;
  height: 130px;
`;

const PixelTopImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(270deg);
  width: 130px;
  height: 130px;
`;

export default {
  Container,
  UserName,
  DateLabel,
  BalanceBox,
  BalanceLabelRow,
  BalanceLabel,
  Line,
  AccountLabel,
  BalanceValue,
  PixelBottomImage,
  PixelTopImage,
};
