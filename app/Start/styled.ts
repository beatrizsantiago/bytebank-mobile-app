import styled from 'styled-components/native'

const Container = styled.View`
  padding: 24px 16px 0px 16px;
`;

const Header = styled.View`
  background-color: ${props => props.theme.low.main};
  padding: 10px;
  height: 80px;
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
  gap: 16px;
`;

export default {
  Container,
  Header,
  Title,
  CenterContainer,
  ButtonsRow,
};
