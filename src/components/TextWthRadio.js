import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import radio_active from '../image/temp/radio_active.png';
import radio from '../image/temp/radio.png';
import {AppStyles, AppColors, AppSizes} from '../theme';

// Cách khai báo
//  <TextWthRadio
//   ischecked={false}
//   title={'Nộp hồ sơ đăng ký sử dụng hóa đơn điện tử bằng văn bản điện tử'}
// />

const TextWthRadio = props => {
  const isCheck = props.ischecked;
  return (
    <TouchableOpacity
      onPress={() => props.onPress && props.onPress()}
      style={styles.wrapRadio}>
      <Image source={isCheck ? radio_active : radio} style={styles.imgRadio} />
      <View style={AppStyles.flex1}>
        <Text
          numberOfLines={2}
          style={{...styles.desStyle, ...props.titleStyle}}>
          {props.title && props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapRadio: {width: '100%', flexDirection: 'row', alignItems: 'center'},
  imgRadio: {width: 21, height: 21, margin: AppSizes.marginSml},
  desStyle: {...AppStyles.baseText, color: AppColors.black},
});

export default React.memo(TextWthRadio);
