import React from 'react';
import {Modal} from 'react-native';
import {ModalComponentProps} from '../types/types';

const ModalComponent: React.FC<ModalComponentProps> = ({
  modalVisible,
  setModalVisible,
  children,
}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
