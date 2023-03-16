import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {I18n} from '@constant';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import Check from '../../image/svg/Check.svg';

//Hướng dẫn gọi DialogSuccess ở các màn hình
// const dialog = {
//     title: 'Thông báo',
//     message: 'Bạn có chắc chắn muốn lưu bản thiết kế mẫu này không?',
//     confirmText: 'Xác nhận',
//     confirmAction: () => {
//       console.log('click confirmAction');
//     },
//   };
//   DialogSuccess.show(dialog);

class DialogSuccess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.dialogSuccess({...props});
  }

  render() {
    const {confirmText, confirmAction, title, message} = this.props;
    return (
      <Animatable.View style={styles.container}>
        <Animatable.View style={styles.dialog}>
          <Check style={{width: 43, height: 43}} fill={AppColors.green} />
          <Text style={styles.title}>{title || I18n.t('common.notice')}</Text>
          <Text style={styles.subTitle}>{message || ''}</Text>
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
              confirmAction && confirmAction();
            }}
            style={{
              width: '100%',
              alignItems: 'center',
              paddingTop: AppSizes.paddingMedium,
              marginHorizontal: -AppSizes.paddingSml * 1.5,
              paddingHorizontal: AppSizes.paddingSml * 1.5,
              borderTopWidth: 1,
              borderTopColor: AppColors.border,
            }}>
            <Text
              style={{
                ...AppStyles.boldText,
                color: AppColors.blue,
                textAlign: 'center',
              }}>
              {confirmText || I18n.t('common.ok')}
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...AppStyles.baseDialog,
  },
  dialog: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: AppSizes.paddingSml * 1.5,
  },
  title: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize:AppSizes.fontLarge
  },
  subTitle: {
    ...AppStyles.baseText,
    marginVertical: AppSizes.paddingXSml,
  },
});

export default DialogSuccess;
