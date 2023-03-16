import React from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '../theme';
const {width, height} = Dimensions.get('window');

//Cách khai báo

/* <EnvoiceInput
titleInput={'Mã số thuế'}
value={mst}
placeholder={'Nhập mã số thuế'}
onChangeText={text => onChangeMST(text)}
/> */

const EnvoiceInput = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.titleInput && props.titleInput}</Text>
      <TextInput {...props} style={styles.inputStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    ...AppStyles.baseText,
    width: '100%',
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#F1F3F6',
    paddingHorizontal: AppSizes.marginSml,
    marginTop:AppSizes.marginXSml,
    marginBottom:AppSizes.marginSml,
    height: height * 0.063,
  },
  title: {
    ...AppStyles.baseText,
    color: AppColors.textGray,
    lineHeight: 18,
    textAlignVertical: 'center',
  },
  container: {
    width: '100%',
    marginBottom: AppSizes.marginXXSml,
  },
});

export default React.memo(EnvoiceInput);
