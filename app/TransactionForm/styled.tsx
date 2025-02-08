import styled from 'styled-components/native';

const Scroll = styled.ScrollView`
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 4px;
  left: 0px;
`;

const GrayContainer = styled.View`
  background-color: ${({ theme }) => theme.gray.medium};
  padding: 16px;
  border-radius: 8px;
`;

const PickerBox = styled.View`
  background-color: ${({ theme }) => theme.high.main};
  border: ${({ outlined, color }) => outlined ? `2px solid ${color}` : 'none'};
  border-radius: 8px;
  margin-bottom: 16px;
  height: 48px;
`;

const DocumentButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.low.main};
  padding: 8px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 48px;
`;

const TitleButton = styled.Text`
  color: ${({ theme }) => theme.high.main};
  font-size: 16px;
  margin-left: 8px;
  font-weight: 500;
`;

const ButtonBox = styled.View`
  margin: 48px 0px 24px 0px;
  align-items: center;
`;

export default {
  Scroll,
  Title,
  BackButton,
  GrayContainer,
  PickerBox,
  DocumentButton,
  TitleButton,
  ButtonBox,
};