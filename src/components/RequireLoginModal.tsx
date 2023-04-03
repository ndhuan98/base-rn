import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppRoutes } from 'src/navigator/types';
import { AppButton } from './AppButton';
import { AppModal } from './AppModal';
import { AppText } from './AppText';

interface Props {
  visible: boolean;
  onCloseModal: () => void;
}

export const RequireLoginModal = ({ visible, onCloseModal }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <AppModal isVisible={visible}>
      <AppModal.Container>
        <AppModal.Header title="Yêu cầu đăng nhập" />
        <AppModal.Body>
          <AppText>Bạn cần đăng nhập để thực hiện tính năng này</AppText>
        </AppModal.Body>
        <AppModal.Footer>
          <View style={styles.buttonFooter}>
            <AppButton wrapperStyle={styles.flexLeft} variant="outline" title="Đóng" onPress={onCloseModal} />
            <AppButton
              wrapperStyle={styles.flex1}
              title="Đăng nhập"
              onPress={() => {
                navigation.navigate(AppRoutes.LOGIN);
              }}
            />
          </View>
        </AppModal.Footer>
      </AppModal.Container>
    </AppModal>
  );
};
const styles = StyleSheet.create({
  textInput: {
    marginBottom: 24,
    flex: 1,
  },
  marginTop: { marginTop: 16 },
  marginBottom: { marginBottom: 16 },
  marginBottomBig: { marginBottom: 24 },
  marginLeft: { marginLeft: 16 },
  flexRow: { flexDirection: 'row' },
  buttonFooter: { flexDirection: 'row', marginTop: 10 },
  flexLeft: { flex: 1, marginRight: 20 },
  flex1: { flex: 1 },
});
