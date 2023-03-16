import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppColors} from '../../theme';
import AddProduct from './AddProduct';
import StatusBarTSD from '../../components/StatusBarTSD';
import AppHeader from '../../components/AppHeader';
import Back from '../../image/svg/Back.svg';

const EditProduct = props => {
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <AppHeader
        Icon={Back}
        title={props.data ? 'Chi tiết hàng hoá' : 'Thêm mới hàng hoá'}
        iconColor={AppColors.white}
        titleColor={AppColors.white}
        onPressMenu={() => Actions.pop()}
      />
      <AddProduct
        onCallback={() => Actions.pop()}
        data={props.data ? props.data.data : {}}
      />
    </SafeAreaView>
  );
};

export default EditProduct;
