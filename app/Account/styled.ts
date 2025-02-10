import styled from 'styled-components/native';

const Container = styled.View`
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const ImageBox = styled.View`
  align-items: center;
  margin-Top: 32px;
`;

export default {
  Container,
  Header,
  Title,
  ImageBox,
};
