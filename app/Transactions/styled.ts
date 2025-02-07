import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';

const Header = styled.View`
  padding: 16px 16px 0px 16px;
`;

const Scroll = styled.ScrollView`
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

const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const SearchInput = styled.TextInput`
  background-color: ${({ theme }) => theme.high.main};
  padding: 16px;
  padding-right: 48px;
  border-radius: 8px;
  width: 100%;
  height: 50px;
`;

const SearchIcon = styled(Feather)`
  position: absolute;
  right: 16px;
  color: ${({ theme }) => theme.primary.main};
`;

export default {
  Header,
  Scroll,
  TopRow,
  IconsRow,
  IconButton,
  ExtractLabel,
  SearchInput,
  SearchRow,
  SearchIcon,
};
