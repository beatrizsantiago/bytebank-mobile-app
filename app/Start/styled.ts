import styled from 'styled-components/native'

const Scroll = styled.ScrollView`
  padding: 24px 16px 0px 16px;
`;

const Header = styled.View`
  background-color: ${props => props.theme.low.main};
  padding: 10px;
  height: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.low.main};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
`;

const CenterContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonsRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
`;

const Subtitle = styled.Text`
  color: ${props => props.theme.low.main};
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export default {
  Scroll,
  Header,
  Title,
  CenterContainer,
  ButtonsRow,
  Subtitle,
};
