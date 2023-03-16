import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../../theme';
import StatusBarTSD from '../../components/StatusBarTSD';
import AppHeader from '../../components/AppHeader';
import Back from '../../image/svg/Back.svg';
import {Actions} from 'react-native-router-flux';
import {I18n} from '@constant';
import List from '../../image/svg/List.svg';
import soildList from '../../image/svg/soildList.svg';
import Table from '../../image/svg/Table.svg';
import soildTable from '../../image/svg/soildTable.svg';
import Edit from '../../image/svg/Edit_1.svg';
import soildEdit from '../../image/svg/soildEdit.svg';
import ImageSVG from '../../image/svg/Image.svg';
import soildImage from '../../image/svg/soildImage.svg';
import Check from '../../image/svg/Check.svg';
import InvoiceLetter from '../../image/temp/InvoiceLetter.png';
import Bg1 from '../../image/svg/Logo/Bg1.svg';
import Bg2 from '../../image/svg/Logo/Bg2.svg';
import Bg3 from '../../image/svg/Logo/Bg3.svg';
import Bg4 from '../../image/svg/Logo/Bg4.svg';
import Bg5 from '../../image/svg/Logo/Bg5.svg';
import Bg6 from '../../image/svg/Logo/Bg6.svg';
import SignNon from '../../image/svg/SignNon.svg';
import Sign from '../../image/svg/Sign.svg';
import {animate} from '../../ultil/AnimateHelper';

import TableEdit from '../../image/svg/TableEdit.svg';
import NoCorner from '../../image/svg/NoCorner.svg';
import Corner from '../../image/svg/Corner.svg';
import TableLine from '../../image/svg/TableLine.svg';
import Dialog from '../lightbox/Dialog';
const {width, height} = Dimensions.get('window');

// Khởi tại "nameType" các tuỳ chọn sửa hoá đơn
const TypeMenu = {
  Color: 'color',
  Edit: 'edit',
  Background: 'background',
  Colum: 'colum',
};

// Khởi tạo danh sách các tuỳ chọn chỉnh sửa
const ListMenu = [
  {
    Title: 'Chỉnh màu',
    Icon: Edit,
    IconSelect: soildEdit,
    Type: TypeMenu.Color,
  },
  {
    Title: 'Tuỷ chỉnh',
    Icon: List,
    IconSelect: soildList,
    Type: TypeMenu.Edit,
  },
  {
    Title: 'Ảnh nền',
    Icon: ImageSVG,
    IconSelect: soildImage,
    Type: TypeMenu.Background,
  },
  {
    Title: 'Bảng hàng',
    Icon: Table,
    IconSelect: soildTable,
    Type: TypeMenu.Colum,
  },
];

// Khởi tạo danh sách các màu sắc chỉnh sửa mẫu hoá đơn
const Colors = [
  {
    type: 'black',
    value: '#0C0C0C',
  },
  {
    type: 'grey',
    value: '#525252',
  },
  {
    type: 'red',
    value: '#C00000',
  },
  {
    type: 'orange',
    value: '#FF6600',
  },
  {
    type: 'sky',
    value: '#0070C0',
  },
  {
    type: 'green',
    value: '#00B050',
  },
  {
    type: 'darkblue',
    value: '#002060',
  },
];

// Khởi tạo danh sách các ảnh nền mẫu hoá đơn
const Logos = [
  {
    Type: '01',
    Src: Bg1,
  },
  {
    Type: '02',
    Src: Bg2,
  },
  {
    Type: '03',
    Src: Bg3,
  },
  {
    Type: '04',
    Src: Bg4,
  },
  {
    Type: '05',
    Src: Bg5,
  },
  {
    Type: '06',
    Src: Bg6,
  },
];

// Hiển thị danh sách các màu của mẫu hoá đơn
// param ={
// data:[ArrayColor],
// typeColorSelected : 'black'
// }
const ColorsList = () => {
  const [typeColorSelected, setTypeColor] = React.useState('black');
  return (
    <View style={styles.containerListOption}>
      {Colors.map(item => {
        const isSelected = typeColorSelected == item.type;
        return (
          <TouchableOpacity
            key={item.type}
            onPress={() => setTypeColor(item.type)}
            style={{
              ...styles.itemColor,
              backgroundColor: item.value,
            }}>
            {isSelected && (
              <Check style={styles.icon24} fill={AppColors.white} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Hiển thì danh sách Logo của mẫu hoá đơn
// param ={
// data:[ArrayLogo],
// logoSelected : '01'
// }
const Logolist = () => {
  const [typeLogoSelected, setTypeLogo] = React.useState('');
  return (
    <View style={styles.containerListOption}>
      {Logos.map(item => {
        const Icon = item.Src;
        const isSelected = item.Type === typeLogoSelected;
        return (
          <TouchableOpacity
            key={item.Type}
            onPress={() => setTypeLogo(item.Type)}
            style={{
              ...styles.itemLogo,
              borderColor: isSelected ? AppColors.darkblue : AppColors.white,
            }}>
            <Icon style={styles.iconColor} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Hàm show danh sách chữ ký thủ trưởng
// param ={
// data:[ArrayChuKy],
// chuKySelected : '01'
// }
const OptionEdit = () => {
  const [typeSelected, setTypeSelected] = React.useState('02');
  return (
    <View style={styles.containerOptionEdit}>
      <TouchableOpacity
        onPress={() => setTypeSelected('01')}
        style={styles.flex1Center}>
        <View style={{padding: AppSizes.paddingXSml}}>
          {typeSelected === '01' && (
            <Check fill={AppColors.white} style={styles.iconCheckSmall} />
          )}
          <Sign style={styles.icon31} fill={AppColors.darkblue} />
        </View>
        <Text
          style={{
            ...AppStyles.boldText,
            color: AppColors.darkblue,
          }}>
          {I18n.t('editTemplateScreen.chuKyThuTruong')}
        </Text>
      </TouchableOpacity>
      <View style={styles.verticalLine} />
      <TouchableOpacity
        onPress={() => setTypeSelected('02')}
        style={styles.flex1Center}>
        <View style={{padding: AppSizes.paddingXSml}}>
          {typeSelected === '02' && (
            <Check fill={AppColors.white} style={styles.iconCheckSmall} />
          )}
          <SignNon style={styles.icon31} fill={AppColors.darkblue} />
        </View>

        <Text
          style={{
            ...AppStyles.boldText,
            color: AppColors.darkblue,
          }}>
          {I18n.t('editTemplateScreen.kyDoiSo')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Hàm hiện thị danh sách bảng hàng
// param ={
// data:[ArrayBangHang],
// bangHangSelected : '01'
// }
const ColumnRow = () => {
  return (
    <View style={styles.containerListOption}>
      <View style={styles.flex1Center}>
        <TouchableOpacity style={AppSizes.paddingXXSml}>
          <NoCorner style={styles.iconBangHang} />
        </TouchableOpacity>
      </View>

      <View style={styles.flex1Center}>
        <TouchableOpacity style={AppSizes.paddingXXSml}>
          <Corner style={styles.iconBangHang} />
        </TouchableOpacity>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.flex1Center}>
        <TouchableOpacity style={AppSizes.paddingXXSml}>
          <TableLine style={styles.iconBangHang} />
        </TouchableOpacity>
      </View>
      <View style={styles.flex1Center}>
        <TouchableOpacity style={AppSizes.paddingXXSml}>
          <TableEdit
            style={{
              ...styles.iconBangHang,
              borderColor: AppColors.darkblue,
              borderWidth: 2,
              borderRadius: 5,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Hàm hiển thị danh sách tuỳ trọn chỉnh sửa mẫu hoá đơn
// param ={
// data:[ArrayMenu],
// menuSelected : '01'
// }
const BottomMenu = () => {
  const [iconSelect, selectedIcon] = React.useState('');
  const isSelectChangeColor = iconSelect === TypeMenu.Color;
  const isSelectChangeBackground = iconSelect == TypeMenu.Background;
  const isSelectOption = iconSelect == TypeMenu.Edit;
  const isSelectedColumnRow = iconSelect == TypeMenu.Colum;

  const onSelectMenu = type => {
    animate();
    selectedIcon(type);
  };
  return (
    <View>
      {isSelectChangeColor && <ColorsList />}
      {isSelectChangeBackground && <Logolist />}
      {isSelectOption && <OptionEdit />}
      {isSelectedColumnRow && <ColumnRow />}
      <View style={styles.containerMenuBottom}>
        {ListMenu.map(item => {
          const Icon = iconSelect == item.Type ? item.IconSelect : item.Icon;
          const textColor =
            iconSelect == item.Type ? AppColors.blue : AppColors.textPrimary;
          return (
            <TouchableOpacity
              key={item.Type}
              onPress={() => onSelectMenu(item.Type)}
              style={styles.flex1Center}>
              <Icon style={styles.icon21} fill={textColor} />
              <Text style={{...AppStyles.baseText, color: textColor}}>
                {item.Title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Hàm render chính màn hình
const EditInvoiceScreen = () => {
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          onPressMenu={() => Actions.pop()}
          Icon={Back}
          iconColor={AppColors.white}
          backgroundColor={AppColors.blue}
          title={I18n.t('editTemplateScreen.titleScreen')}
          titleColor={AppColors.white}
          RightText={I18n.t('common.done')}
          onPressRight={() => {
            const dialog = {
              title: I18n.t('common.notice'),
              message: I18n.t('editTemplateScreen.luuBanThietKe'),
              confirmText: I18n.t('common.yes'),
              cancelText: I18n.t('common.skip'),
              confirmAction: () => {
                Actions.inforForm();
              },
            };
            Dialog.show(dialog);
          }}
        />
        <View style={AppStyles.flex1}>
          <Image
            resizeMode={'contain'}
            source={InvoiceLetter}
            style={styles.bgMau}
          />
        </View>
        <BottomMenu />
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
  containerListOption: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: AppColors.blue,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppSizes.paddingXXSml,
  },
  containerOptionEdit: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(30,62,151,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppSizes.paddingXXSml,
  },
  containerMenuBottom: {
    width: '100%',
    padding: AppSizes.paddingXXSml,
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderTopWidth: 1 / 2,
    borderColor: AppColors.border,
  },
  containerBangHang: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(30,62,151,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppSizes.paddingXXSml,
  },
  iconBangHang: {width: 70, height: 50},
  verticalLine: {
    width: 2,
    height: '100%',
    backgroundColor: AppColors.darkblue,
  },
  itemLogo: {
    flex: 1,
    borderRadius: AppSizes.borderRadius,
    marginHorizontal: AppSizes.marginXXSml,
    backgroundColor: AppColors.white,
    padding: AppSizes.paddingXSml,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  
  iconColor: {width: 48, height: 48},
  icon31: {width: 31, height: 31},
  icon21: {width: 21, height: 21},
  icon24: {width: 24, height: 24},
  iconCheckSmall: {
    width: 12,
    height: 12,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  itemColor: {
    flex: 1,
    width: width * 0.1,
    height: height * 0.0578,
    borderRadius: AppSizes.borderRadius,
    margin: AppSizes.paddingXXSml,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1Center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bgMau: {width: '100%', height: '100%'},
});

export default EditInvoiceScreen;
