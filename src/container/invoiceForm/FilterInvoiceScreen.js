import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AppSizes, AppStyles, AppColors} from '../../theme';
import StatusBarTSD from '../../components/StatusBarTSD';
import AppHeader from '../../components/AppHeader';
import Back from '../../image/svg/Back';
import {Actions} from 'react-native-router-flux';
import EnvoiceText from '../../components/EnvoiceText';
import TextWthRadio from '../../components/TextWthRadio';
import {I18n} from '@constant';
import ic_upload from '../../image/temp/ic_upload.png';
import ic_default_upload from '../../image/temp/ic_default_upload.png';
import ButtonText from '../../components/ButtonText';
const {width, height} = Dimensions.get('window');

// hàm render chính
const FilterInvoice = () => {
  const [isHadLogo, setLogo] = React.useState(false);

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Back}
          title={I18n.t('filterInvoiceScreen.titleScreen')}
          iconColor={AppColors.white}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          onPressMenu={() => Actions.pop()}
        />
        <View style={styles.content}>
          <EnvoiceText
            title={I18n.t('filterInvoiceScreen.loaiHoaDon')}
            value={''}
            onPress={() => {}}
            drop
          />
          <EnvoiceText
            title={I18n.t('filterInvoiceScreen.ngonNgu')}
            value={''}
            onPress={() => {}}
            drop
          />

          <View style={styles.rowContent}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={I18n.t('filterInvoiceScreen.khoGiay')}
                value={''}
                onPress={() => {}}
                drop
              />
            </View>
            <View style={styles.speak5} />
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={I18n.t('filterInvoiceScreen.loaiTrang')}
                value={''}
                onPress={() => {}}
                drop
              />
            </View>
          </View>
          <Text style={AppStyles.boldText}>
            {I18n.t('filterInvoiceScreen.logo')}
          </Text>
          <View style={styles.rowContent}>
            <View style={AppStyles.flex1}>
              <TextWthRadio
                titleStyle={styles.txtRadio}
                ischecked={isHadLogo}
                title={I18n.t('filterInvoiceScreen.coLogo')}
                onPress={() => setLogo(true)}
              />
            </View>
            <View style={AppStyles.flex1}>
              <TextWthRadio
                ischecked={!isHadLogo}
                titleStyle={styles.txtRadio}
                title={I18n.t('filterInvoiceScreen.khongLogo')}
                onPress={() => setLogo(false)}
              />
            </View>
          </View>
          {/* hiển thị update logo hoá đơn */}
          {isHadLogo && (
            <View>
              <Text style={AppStyles.smallText}>
                {'Tải logo cho mẫu hóa đơn'}
              </Text>
              <View style={styles.containerUpload}>
                <Image
                  source={ic_default_upload}
                  resizeMode={'contain'}
                  style={styles.imgUpload}
                />
                <Text style={AppSizes.boldText}>
                  {I18n.t('filterInvoiceScreen.hayTaiLogoCongTyBanLen')}
                </Text>
                <Text style={AppStyles.smallText}>
                  {I18n.t('filterInvoiceScreen.moTaLogo')}
                </Text>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{padding: AppSizes.paddingSml}}>
                  <Image
                    source={ic_upload}
                    resizeMode={'contain'}
                    style={styles.iconUpload}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={styles.wrapButton}>
          <ButtonText
            onCick={() => Actions.pop()}
            title={I18n.t('common.done')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  speak5: {
    width: '5%',
  },
  content: {
    flex: 1,
    paddingHorizontal: AppSizes.paddingXXSml,
    paddingTop: AppSizes.padding,
  },
  rowContent: {flexDirection: 'row', width: '100%'},
  txtRadio: {
    color: AppColors.textSecondary,
  },
  iconUpload: {
    width: height * 0.06,
    height: height * 0.06,
  },
  imgUpload: {
    width: width * 0.5,
    height: height * 0.16,
  },
  containerUpload: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: AppSizes.paddingSml,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: AppSizes.borderRadius,
    borderStyle: 'dotted',
    paddingVertical: AppSizes.padding,
  },
  wrapButton: {
    backgroundColor: AppColors.white,
    padding: AppSizes.paddingSml,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});

export default FilterInvoice;
