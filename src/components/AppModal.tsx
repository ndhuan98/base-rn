import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNModal from 'react-native-modal';
import { AppText } from './AppText';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const AppModal = ({ isVisible = false, children, ...props }: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <AppText fontSize="large" style={styles.text}>
      {title}
    </AppText>
  </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => <View style={styles.body}>{children}</View>;

const ModalFooter = ({ children }: { children?: React.ReactNode }) => <View style={styles.footer}>{children}</View>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  text: {
    paddingTop: 17,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
  },
  body: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    minHeight: 50,
  },
  footer: {
    padding: 16,
  },
});

AppModal.Header = ModalHeader;
AppModal.Container = ModalContainer;
AppModal.Body = ModalBody;
AppModal.Footer = ModalFooter;
