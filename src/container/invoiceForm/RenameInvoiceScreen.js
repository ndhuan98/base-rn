import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '../../theme';
import AppHeader from '../../components/AppHeader';
import {Actions} from 'react-native-router-flux';
import Back from '../../image/svg/Back.svg';
import EnvoiceInput from '../../components/EnvoiceInput';
import StatusBarTSD from '../../components/StatusBarTSD';
import ButtonText from '../../components/ButtonText';
import EnvoiceText from '../../components/EnvoiceText';
import EnvoiceMenuText from '../../components/EnvoiceMenuText';
import DrawerAction from '../lightbox/DrawerAction';
import {I18n} from '@constant';

// Hàm render chính màn hình
const RenameInvoiceScreen = () => {
  const [nameInvoice, setNameInvoice] = React.useState('');

  // hàm hiển thì danh sách ký hiệu
  const onPressMenuAction = () => {
    const dialog = {
      title: 'Danh sách ký hiệu',
    };
    return DrawerAction.show(dialog);
  };

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          onPressMenu={() => Actions.pop()}
          Icon={Back}
          iconColor={AppColors.white}
          backgroundColor={AppColors.blue}
          title={I18n.t('renameScreen.titleScreen')}
          titleColor={AppColors.white}
        />
        <View style={styles.flexInput}>
          <EnvoiceInput
            titleInput={I18n.t('renameScreen.nameTemplate')}
            value={nameInvoice}
            placeholder={I18n.t('renameScreen.nhapTenMauHoaDon')}
            onChangeText={text => setNameInvoice(text)}
          />
          <View style={styles.wrapRow}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={I18n.t('renameScreen.stt')}
                value={'001'}
                disabled
                require
              />
            </View>
            <View style={styles.speakView} />
            <View style={AppStyles.flex1}>
              <EnvoiceMenuText
                title={I18n.t('renameScreen.signal')}
                value={''}
                require
                onPress={onPressMenuAction}
              />
            </View>
            <View style={styles.speakView} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={' '} value={''} />
            </View>
          </View>
          <EnvoiceText
            title={I18n.t('renameScreen.mauSo')}
            value={'01GTKT0/001 '}
            disabled
            require
          />
        </View>
        <View style={styles.wrapButton}>
          <ButtonText
            onCick={() => Actions.editForm()}
            title={I18n.t('common.continue')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Khởi tạo style css màn hình

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  wrapButton: {
    padding: AppSizes.paddingSml,
    width: '100%',
    backgroundColor: AppColors.white,
  },
  speakView: {
    width: '5%',
  },
  flexInput: {flex: 1, padding: AppSizes.paddingXSml},
  wrapRow: {width: '100%', flexDirection: 'row'},
});

export default RenameInvoiceScreen;
