import React from 'react';
import styled from 'styled-components/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import theme from '@/theme';
import { Modal, TouchableOpacity } from 'react-native';

type Props = {
  open: boolean,
  onClose: () => void,
  title?: string,
  children: React.ReactNode,
}

const ModalComponent = ({
  open, onClose, title, children,
}:Props) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={open}
    onRequestClose={onClose}
  >
    <CenteredView>
      <ModalView>
        <RowBox>
          {title && <Title>{title}</Title>}
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={32} color={theme.gray.main} />
          </TouchableOpacity>
        </RowBox>

        {children}
      </ModalView>
    </CenteredView>
  </Modal>
);

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 16px;
  align-items: center;
  width: 100%;
  overflow: hidden;
  height: auto;
`;

const RowBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export default ModalComponent;