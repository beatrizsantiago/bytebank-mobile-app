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

export default {
  Container,
  Title,
  MoneyBox,
  BoxLabel,
  MoneyLabel,
  PixelBottomImage,
  PixelTopImage,
};
