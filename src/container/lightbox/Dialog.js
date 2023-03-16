import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {I18n} from '@constant';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import PropTypes from 'prop-types';

// Hướng dẫn gọi Dialog ở các màn hình :

// const dialog = {
//     title: 'Thông báo',
//     message: 'Bạn có chắc chắn muốn lưu bản thiết kế mẫu này không?',
//     confirmText: 'Xác nhận',
//     cancelText: 'Bỏ qua',
//     confirmAction: () => {
//       console.log('click confirmAction');
//     },
//   };
//   Dialog.show(dialog);

class Dialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.dialog({...props});
  }

  render() {
    const {
      confirmText,
      cancelText,
      confirmAction,
      cancelAction,
      title,
      message,
    } = this.props;
    return (
      <Animatable.View
        ref="overlay"
        duration={300}
        animation="fadeIn"
        style={styles.container}>
        <Animatable.View
          ref="body"
          animation="zoomIn"
          duration={300}
          style={styles.dialog}>
          <Text style={styles.title}> {title || I18n.t('common.notice')}</Text>
          <Text style={styles.subTitle}>{message}</Text>
          <View style={styles.containerButton}>
            <TouchableOpacity
              onPress={() => {
                Actions.pop();
                cancelAction && cancelAction();
              }}
              style={styles.btCancelText}>
              <Text style={styles.titleButton}>{cancelText || 'Cance'}</Text>
            </TouchableOpacity>

            <View style={{width: 20, height: '100%'}} />
            <TouchableOpacity
              onPress={() => {
                Actions.pop();
                confirmAction && confirmAction();
              }}
              style={styles.btConfirmText}>
              <Text style={[styles.titleButton, {color: AppColors.white}]}>
                {confirmText || I18n.t('common.close')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </Animatable.View>
    );
  }
}

Dialog.propTypes = {
  confirmText :PropTypes.string,
  cancelText: PropTypes.string,
  confirmAction: PropTypes.func,
  cancelAction: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    ...AppStyles.baseDialog,
  },
  dialog: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: AppSizes.paddingSml * 1.5,
    paddingVertical: AppSizes.paddingSml * 1.5,
  },
  title: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize: AppSizes.fontLarge,
  },
  subTitle: {
    ...AppStyles.baseText,
    marginVertical: AppSizes.paddingMedium,
  },
  titleButton: {
    ...AppStyles.baseText,
    color: AppColors.blue,
  },
  btConfirmText: {
    flex: 1,
    borderColor: AppColors.blue,
    borderWidth: 1,
    borderRadius: AppSizes.borderRadius,
    padding: AppSizes.paddingSml,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.blue,
  },
  btCancelText: {
    flex: 1,
    borderColor: AppColors.blue,
    borderWidth: 1,
    borderRadius: AppSizes.borderRadius,
    padding: AppSizes.paddingSml,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    paddingTop: AppSizes.paddingMedium,
    marginHorizontal: -AppSizes.paddingSml * 1.5,
    paddingHorizontal: AppSizes.paddingSml * 1.5,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
});

export default Dialog;
