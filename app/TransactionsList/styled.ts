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

const EmptyListLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.primary.main};
  margin-top: 16px;
`;

const SelectedFilters = styled.View`
  padding: 16px;
  margin: 0px 16px 16px 16px;
  background-color: ${({ theme }) => theme.high.main};
  border-radius: 8px;
`;

const FiltersRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BoldLabel = styled.Text`
  font-weight: 700;
  margin-right: 8px;
`;

const FilterLabel = styled.Text`
  margin-right: 8px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.gray.dark};
  margin: 8px 16px 16px 16px;
`;

const ClearFiltersButton = styled.TouchableOpacity`
  padding: 4px 8px;
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.primary.main};
`;

const ClearFiltersLabel = styled.Text`
  color: ${({ theme }) => theme.primary.main};
  font-weight: 700;
  font-size: 12px;
`;

export default {
  Header,
  List,
  TopRow,
  IconsRow,
  IconButton,
  ExtractLabel,
  EmptyListLabel,
  SelectedFilters,
  FiltersRow,
  BoldLabel,
  FilterLabel,
  Divider,
  ClearFiltersButton,
  ClearFiltersLabel,
};
