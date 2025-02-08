import styled from 'styled-components/native';
import Checkbox from 'expo-checkbox';

const Scroll = styled.ScrollView`
  padding: 24px;
`;

const ImageBox = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`;

const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const CheckboxLabel = styled.Text`
  margin-left: 8px;
`;

const ButtonBox = styled.View`
  align-items: center;
`;

export default {
  Scroll,
  ImageBox,
  Title,
  CheckBoxContainer,
  CheckboxLabel,
  ButtonBox,
};