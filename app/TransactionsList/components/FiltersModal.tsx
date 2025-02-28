import { useState } from 'react';
import { KIND_LIST } from '@/utils/transactionKinds';
import { KindType } from '@/context/Transactions/types';
import { useTransactionContext } from '@/context/Transactions'
import { formatDate } from '@/utils/format';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import theme from '@/theme';
import styled from 'styled-components/native';

type Props = {
  onClose: () => void,
  open: boolean,
};

const FiltersModal = ({ open, onClose }:Props) => {
  const {
    kindsSelected,
    setKindsSelected,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onFilterTransactions,
    hasFilters,
  } = useTransactionContext();

  const [datePickerToShow, setDatePickerToShow] = useState<'start' | 'end' | null>(null);

  const hasKindSelected = (kind:KindType) => kindsSelected.includes(kind);

  const onKindCheckClick = (kind:KindType) => {
    if (hasKindSelected(kind)) {
      const newKindFilters = [...kindsSelected].filter((currentType) => currentType !== kind)
      setKindsSelected(newKindFilters);
    } else {
      setKindsSelected((current) => [...current, kind]);
    }
  };

  const handleClose = () => {
    if (!hasFilters) {
      setKindsSelected([]);
      setStartDate(null);
      setEndDate(null);
    }
    onClose();
  };

  const onFilterPress = () => {
    onFilterTransactions();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Filtrar por:">
      <Container>
        <Label>Tipo da transferência</Label>
        {KIND_LIST.map((kind) => (
          <CheckBoxContainer key={kind.value}>
            <Checkbox
              color={theme.secondary.main}
              value={hasKindSelected(kind.value as KindType)}
              onValueChange={() => onKindCheckClick(kind.value as KindType)}
            />
            <CheckboxLabel>
              {kind.label}
            </CheckboxLabel>
          </CheckBoxContainer>
        ))}

        <Label>Data</Label>
        <DateButtons>
          <Button
            title="Data inicial"
            color="secondary"
            onPress={() => setDatePickerToShow('start')}
          />

          <Button
            title="Data final"
            color="secondary"
            onPress={() => setDatePickerToShow('end')}
          />
        </DateButtons>

        <LabelsRow>
          {startDate && (
            <DateLabel>
              {formatDate(startDate)}
            </DateLabel>
          )}

          {endDate && (
            <DateLabel>
              {' '}
              -
              {' '}
              {formatDate(endDate)}
            </DateLabel>
          )}
        </LabelsRow>

        {datePickerToShow && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                if (datePickerToShow === 'start') {
                  setStartDate(selectedDate);
                } else {
                  setEndDate(selectedDate);
                }
              }

              setDatePickerToShow(null);
            }}
            minimumDate={datePickerToShow === 'end' ? (startDate || undefined) : undefined}
          />
        )}

        <Button
          title="Filtrar"
          color="primary"
          onPress={onFilterPress}
        />
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  width: 100%;
  padding-bottom: 32px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin: 16px 0px;
`;

const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const CheckboxLabel = styled.Text`
  margin-left: 8px;
`;

const DateButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
`;

const DateLabel = styled.Text`
  font-size: 16px;
`;

const LabelsRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 16px;
`;

export default FiltersModal;
