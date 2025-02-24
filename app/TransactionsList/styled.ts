import styled from 'styled-components/native';

const Header = styled.View`
  padding: 16px 16px 0px 16px;
`;

const List = styled.FlatList`
  padding: 0px 16px;
`;

const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const IconsRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconButton = styled.TouchableOpacity`
  margin-left: 16px;
`;

const ExtractLabel = styled.Text`
  font-size: 25px;
  font-weight: 700;
`;

export default {
  Header,
  List,
  TopRow,
  IconsRow,
  IconButton,
  ExtractLabel,
};
