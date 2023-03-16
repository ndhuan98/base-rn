import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {AppColors, AppStyles, AppSizes, AppFonts} from '../theme';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import Menu from '../image/svg/menu1.svg';
import {Actions} from 'react-native-router-flux';
import Refresh from '../image/svg/Refresh.svg';
import Trash from '../image/svg/Trash.svg';
import Clock from '../image/svg/Clock.svg';
import Setting_cle from '../image/svg/Setting_cle.svg';
import _ from 'lodash';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';
import API from '../network/API';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Dlog from '../components/Dlog';
import {I18n} from '@constant';
import ActionSheet from './lightbox/ActionSheet';
import moment from 'moment';
import * as Progress from 'react-native-progress';
const {width, height} = Dimensions.get('window');
import PhatHanhHD from '../image/svg/PhatHanhHD.svg';
import TongThue from '../image/svg/TongThue.svg';
import GiaTriHD from '../image/svg/GiaTriHD.svg';
import SuDungHD from '../image/svg/SuDungHD.svg';

const colorDaSuDung = '#3778E8';
const colorChuaSuDung = '#FF9F5E';

// Hiển thị thông tin hoá đơn phát hành
// param :{
// Tổng giá trị:'560.667.310.263',
// Số hóa đơn::'1.100 hóa đơn'
// }

function formatNumber(n) {
  if (_.isNumber(n)) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
    });
  } else {
    return 0;
  }
}

const CardColor = props => {
  const Icon = props.Icon ? props.Icon : SuDungHD;
  const title = props.title ? props.title : '';
  const value = props.value ? props.value : '';
  const bgColor = props.backgroundColor
    ? props.backgroundColor
    : AppColors.blue;
  return (
    <View style={{...styles.cardContainer, backgroundColor: bgColor}}>
      <View style={{padding: 10}}>
        <Icon style={styles.iconCard} />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{...AppStyles.baseText, color: AppColors.white}}>
          {title}
        </Text>
        <Text
          style={{
            ...AppStyles.boldText,
            color: AppColors.white,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const InforRelease = () => {
  const currentYear = moment().format('YYYY');
  const [TongTienHD, setTongTienHD] = React.useState({});
  const [persent, setPersent] = React.useState({
    persentSuDung: 0.3,
    persentChuaSuDung: 0.7,
  });
  // API BaoCao/TongTienHoaDon
  React.useEffect(() => {
    API.TongTienHoaDon().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setTongTienHD(res.data.data);
        }
      },
      err => {
        Dlog('TongTienHoaDon err', err);
      },
    );
  }, []);

  // Tình hình sử dụng hoá đơn
  const [TinhHinhSD, setTinhHinhSD] = React.useState({});
  const params = {
    namHD: currentYear,
  };

  React.useEffect(() => {
    API.TinhHinhSuDungHoaDon(params).then(
      res => {
        if (res.data.data) {
          setTinhHinhSD(res.data.data);
          setPersent({
            persentSuDung:
              res.data.data.tong_da_su_dung /
              res.data.data.tong_so_hoa_don_duoc_su_dung,
            persentChuaSuDung:
              res.data.data.tong_chua_su_dung /
              res.data.data.tong_so_hoa_don_duoc_su_dung,
          });
        }
      },
      err => {
        Dlog('err TinhHinhSuDungHoaDon', err);
      },
    );
  }, []);

  const phanTramSudung = _.round(persent.persentSuDung, 2) * 100;
  const phanTramChuaDung = 100 - phanTramSudung;
  return (
    <View style={styles.inforRelased}>
      <View style={styles.horizontalItem}>
        <Text style={styles.hoaDonPH}>
          {I18n.t('dashBoardScreen.hoaDonDaPhatHanh')}
        </Text>
        <Text style={AppStyles.hintText}>{`Năm ${currentYear}`}</Text>
      </View>
      <View style={styles.containerMoney}>
        <CardColor
          Icon={PhatHanhHD}
          backgroundColor={'#94C878'}
          title={`Số hóa đơn đã phát hành năm ${currentYear}`}
          value={formatNumber(TongTienHD.tong_so_luong_hoa_don_da_phat_hanh)}
        />
        <CardColor
          Icon={SuDungHD}
          backgroundColor={'#FB91B5'}
          title={`Số hóa đơn còn được sử dụng`}
          value={formatNumber(
            TongTienHD.tong_so_luong_hoa_don_con_duoc_su_dung,
          )}
        />
        <CardColor
          Icon={TongThue}
          backgroundColor={'#8892D6'}
          title={`Tổng tiền thuế năm ${currentYear}`}
          value={formatNumber(TongTienHD.tong_tien_thue)}
        />
        <CardColor
          Icon={GiaTriHD}
          backgroundColor={'#72CAE6'}
          title={`Gía trị hóa đơn phát hành năm ${currentYear}`}
          value={formatNumber(TongTienHD.tong_gia_tri_hoa_don_da_phat_hanh)}
        />
        <View
          style={{
            ...styles.wrapRowMoney,
            marginBottom: AppSizes.marginSml,
          }}>
          <Text style={AppStyles.hintText}>
            {I18n.t('dashBoardScreen.tongSoHoaDonDuocSuDung')}
          </Text>
          <Text style={AppStyles.boldText}>
            {formatNumber(TinhHinhSD.tong_so_hoa_don_duoc_su_dung || 0)}
          </Text>
        </View>

        <View style={styles.horizontalItem}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.vuongDaskBlue} />
            <Text style={styles.titleNote}>
              {I18n.t('dashBoardScreen.daSuDung')}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.titleNote}>
              {I18n.t('dashBoardScreen.chuaSuDung')}
            </Text>
            <View style={styles.vuongBlue} />
          </View>
        </View>
        <View style={{width: '100%', marginVertical: AppSizes.paddingSml}}>
          <Progress.Bar
            color={colorDaSuDung}
            unfilledColor={colorChuaSuDung}
            progress={persent.persentSuDung || 0}
            height={25}
            style={{
              borderWidth: 0,
              borderRadius: 5,
              width: '100%',
            }}
            width={width}
          />
          <View style={styles.horizontalItem}>
            {/* HD đã sử dụng */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.TinhHinhSD1}>
                {`${formatNumber(TinhHinhSD.tong_da_su_dung)}`}
              </Text>
              <Text style={styles.phanTramSD}>{`(${phanTramSudung ||
                0}%)`}</Text>
            </View>
            {/* HD Chưa sử dụng  */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.TinhHinhSD2}>
                {`${formatNumber(TinhHinhSD.tong_chua_su_dung)}`}
              </Text>
              <Text style={styles.PhanTramCD}>{`(${phanTramChuaDung ||
                0}%)`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// Hiển thị biểu đồ tình hình sử dụng
const InforChar = () => {
  const currentYear = moment().format('YYYY');

  // danh sách các lựa chọn filter biểu đồ
  const dataFilter = [
    {title: '6 tháng đầu năm', value: '1'},
    {title: '6 tháng cuối năm', value: '2'},
  ];
  // Thông tin biểu đồ
  // 1 : thống kê 6 tháng đầu năm
  // 2 : thống kê 6 tháng cuối năm
  const [infoChart, setInfoChart] = React.useState(dataFilter[0]);
  const [dataChart, setDataChart] = React.useState([]);
  const [infoValue, setInfoValue] = React.useState({
    absValue: 0,
    maxValue: 0,
    minValue: 0,
  });
  const paramChart = {
    loaiBieuDo: 3,
    valueTime: infoChart.value,
  };

  React.useEffect(() => {
    API.HoaDonMauSoKyHieu(paramChart).then(
      res => {
        // set dữ liệu vào biểu đồ
        if (res.data && res.data.thongKeHoaDon) {
          const rawData = res.data.thongKeHoaDon[0].listMauSo;
          const customerChart = _.forEach(rawData, item => delete item.label);

          setDataChart(customerChart);
          setInfoValue({
            absValue: res.data.absValue,
            maxValue: res.data.maxValue,
            minValue: res.data.minValue,
          });
        }
      },
      err => {
        Dlog('HoaDonMauSoKyHieu error', err);
      },
    );
  }, [infoChart]);

  const sheetDate = {
    dataList: dataFilter,
    title: I18n.t('dashBoardScreen.tinhHinhSuDungHD'),
    onSelected: item => {
      setInfoChart(item);
    },
  };
  const onPressFilter = () => {
    ActionSheet.show(sheetDate);
  };

  return (
    <View style={styles.wrapContainerChart}>
      <View style={styles.wrapTitleChart}>
        <Text style={styles.hoaDonPH}>
          {I18n.t('dashBoardScreen.tinhHinhSuDungHD')}
        </Text>
        <TouchableOpacity onPress={() => onPressFilter()}>
          <Text style={AppStyles.baseText}>{`${infoChart.title}  > `}</Text>
        </TouchableOpacity>
      </View>
      {/* trung binh / cao nhat / thap nhat */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.wrapSub}>
          <Text style={AppStyles.hintText}>{'Trung bình'}</Text>
          <Text style={{...AppStyles.boldText}}>
            {_.round(infoValue.absValue, 2)}
          </Text>
        </View>
        <View style={{...styles.wrapSub}}>
          <Text style={AppStyles.hintText}>{'Cao nhất'}</Text>
          <Text style={{...AppStyles.boldText}}>{infoValue.maxValue}</Text>
        </View>
        <View style={{...styles.wrapSub}}>
          <Text style={AppStyles.hintText}>{'Thấp nhất'}</Text>
          <Text style={{...AppStyles.boldText}}>{infoValue.minValue}</Text>
        </View>
      </View>

      <View style={styles.containerChart}>
        <VictoryChart domainPadding={10} minDomain={{y: 0}}>
          <VictoryAxis
            // y : trục y của biểu đồ
            style={{
              axis: {stroke: AppColors.border},
              tickLabels: {
                fontSize: AppFonts.base,
                padding: 5,
                fill: AppColors.regular,
              },
            }}
            dependentAxis
            tickFormat={t => t.toFixed(0)}
          />
          <VictoryAxis
            // x: trục X của biểu đồ
            tickFormat={t => 'T' + t.toFixed(0)}
            style={{
              axis: {stroke: AppColors.border},
              tickLabels: {
                fontSize: AppFonts.base,
                fill: AppColors.blue,
              },
            }}
          />
          <VictoryLine
            standalone={false}
            animate={{
              duration: 2000,
              onLoad: {duration: 1000},
            }}
            style={{
              data: {stroke: AppColors.blue, strokeWidth: 1},
              labels: {
                fontSize: 15,
                fill: AppColors.blue,
                padding: -6,
              },
            }}
            x={datum => datum.thang}
            y={datum => datum.soLuong}
            data={dataChart}
            labels={({datum}) => '●'}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

// Hiển thị các dòng trạng thái hoá đơn
// parram :{
// Icon : Icon hiển thị
// titleLabel: Tên trạng thái
// value: Giá trị của trạng thái
// }
//

const StatusItem = props => {
  const {Icon, titleLabel, value, valueColor} = props;

  return (
    <View style={styles.horizontalItem}>
      <Icon style={{width: 17, height: 17, marginRight: AppSizes.marginSml}} />
      <Text style={{...AppStyles.baseText, flex: 1}}>{titleLabel}</Text>
      <Text
        style={{
          ...AppStyles.boldText,
          color: valueColor ? valueColor : AppColors.regular,
        }}>
        {value}
      </Text>
    </View>
  );
};

// Hiển thị danh sách các trạng thái của hoá đơn
// parram:{
//  Hoá đơn chưa phát hành: "540",
//  Hóa đơn thay thế:"540",
//  Hóa đơn điều chỉnh:"540",
//  Hóa đơn xóa bỏ:"540"
// }

const StatusChart = () => {
  const [statusHD, setStatusHD] = React.useState({});
  // API BaoCao/TrangThaiHoaDon
  React.useEffect(() => {
    API.TrangThaiHoaDon().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setStatusHD(res.data.data);
        }
      },
      err => {
        Dlog('err TrangThaiHoaDon', err);
      },
    );
  }, []);

  return (
    <View style={styles.wrapContainerChart}>
      <View style={styles.wrapTitleChart}>
        <Text style={{...AppStyles.boldText, color: AppColors.black}}>
          {I18n.t('dashBoardScreen.trangThai')}
        </Text>
      </View>
      <View style={{padding: AppSizes.paddingSml}}>
        <StatusItem
          Icon={Clock}
          titleLabel={I18n.t('dashBoardScreen.hoaDonChuaPhatHanh')}
          value={statusHD.tongHoaDonChoXuat}
          valueColor={'#72CAE6'}
        />
        <StatusItem
          Icon={Refresh}
          titleLabel={I18n.t('dashBoardScreen.hoaDonThayThe')}
          value={statusHD.tongHoaDonThayThe}
          valueColor={'#94C878'}
        />
        <StatusItem
          Icon={Trash}
          titleLabel={I18n.t('dashBoardScreen.hoaDonXoaBo')}
          value={statusHD.tongHoaDonXoaBo}
          valueColor={'#FB91B5'}
        />
        <StatusItem
          Icon={Setting_cle}
          titleLabel={I18n.t('dashBoardScreen.hoaDonDieuChinh')}
          value={statusHD.tongHoaDonDieuChinh}
          valueColor={'#8892D6'}
        />
      </View>
    </View>
  );
};

// Hàm render chính của màn hình
const DashboardScreen = () => {
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Menu}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={I18n.t('dashBoardScreen.thongKe')}
          onPressMenu={() => Actions.drawerOpen()}
        />
        <View style={styles.distanceTop} />
        <ScrollView style={styles.scrollview}>
          <InforRelease />
          <InforChar />
          <StatusChart />
        </ScrollView>
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
  distanceTop: {
    height: '20%',
    width: '100%',
    backgroundColor: AppColors.blue,
  },
  scrollview: {
    ...AppStyles.flex1,
    marginTop: '-25%',
    marginHorizontal: AppSizes.paddingXSml,
    borderTopLeftRadius: AppSizes.borderRadius,
    borderTopRightRadius: AppSizes.borderRadius,
  },
  horizontalItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: AppSizes.marginXXSml,
  },
  wrapRowMoney: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  vuongDaskBlue: {
    width: 20,
    height: 20,
    backgroundColor: colorDaSuDung,
    borderRadius: 4,
  },
  vuongBlue: {
    width: 20,
    height: 20,
    backgroundColor: colorChuaSuDung,
    borderRadius: 4,
  },
  titleNote: {
    ...AppStyles.hintText,
    marginHorizontal: AppSizes.paddingXSml,
  },
  inforRelased: {
    width: '100%',
    backgroundColor: AppColors.white,
    padding: AppSizes.paddingXSml,
    borderRadius: AppSizes.borderRadius,
    borderColor: AppColors.border,
    borderWidth: 1,
  },
  containerMoney: {
    width: '100%',
    borderColor: AppColors.border,
    paddingTop: AppSizes.paddingXXSml,
  },
  wrapContainerChart: {
    width: '100%',
    marginVertical: AppSizes.marginSml,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: AppSizes.borderRadius,
    backgroundColor: AppColors.white,
  },
  wrapTitleChart: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: AppSizes.paddingSml,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: AppColors.border,
  },
  containerProgress: {
    width: '100%',
    height: 20,
    backgroundColor: AppColors.blueBackground,
    borderRadius: 4,
  },
  currentProgress: {
    width: '85%',
    flex: 1,
    backgroundColor: AppColors.blue,
    borderRadius: 4,
  },
  wrapSub: {
    width: '100%',
    flex: 1,
    padding: AppSizes.paddingSml,
    alignItems: 'center',
  },
  containerChart: {width: '100%', height: 300},
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: AppSizes.borderRadius,
    marginBottom: AppSizes.marginSml,
  },
  iconCard: {width: 40, height: 40},
  hoaDonPH: {
    ...AppStyles.boldText,
    color: AppColors.black,
  },
  phanTramSD: {
    ...AppStyles.baseText,
    color: colorDaSuDung,
    fontSize: 13,
  },
  PhanTramCD: {
    ...AppStyles.baseText,
    color: colorChuaSuDung,
    fontSize: 13,
  },
  TinhHinhSD1: {
    ...AppStyles.boldText,
    color: colorDaSuDung,
    fontSize: 14,
  },
  TinhHinhSD2: {
    ...AppStyles.boldText,
    color: colorChuaSuDung,
    fontSize: 14,
  },
});

export default DashboardScreen;
