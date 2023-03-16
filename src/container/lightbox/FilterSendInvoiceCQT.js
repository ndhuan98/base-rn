import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import {I18n} from '@constant';
import PickerInput from '../../components/PickerInput';
import ButtonText from '../../components/ButtonText';
import EnvoiceButtonTextDrop from '../../components/EnvoiceButtonTextDrop';
import TextWthRadio from '../../components/TextWthRadio';
import {DeviceUtil} from '@util';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import DropUpSoild from '../../image/svg/DropUpSoild.svg';
import DropDownLine from '../../image/svg/DropDownLine.svg';
import {
  ListTime,
  ListTimeQuarter,
  ListTimeYear,
  ListTimeWeeds,
  ListTimeMounth,
} from '../../ultil/TimeUtil';

const {height} = Dimensions.get('window');
const endDateDefauld = moment().format('DD/MM/YYYY');
const startDateDefaul = moment()
  .subtract(1, 'months')
  .format('DD/MM/YYYY');

const TypeSelected = {
  weeks: 'weeks',
  months: 'months',
  quarters: 'quarters',
  years: 'years',
};

const mockAll = {
  text: 'Tất cả',
  value: '',
};
const RowInfor = props => {
  const selected = props.selected;
  const IconLeft = selected ? DropUpSoild : DropDownLine;
  const numberBorderTop = props.hasBorderTop ? 0.5 : 0;
  return (
    <TouchableOpacity
      onPress={() => props.onPressRow && props.onPressRow()}
      style={{
        width: '100%',
        flexDirection: 'row',
        borderTopWidth: numberBorderTop,
        backgroundColor: selected ? AppColors.white : AppColors.white,
        paddingVertical: AppSizes.paddingXSml,
      }}>
      <IconLeft style={{width: 20, height: 20}} fill={AppColors.blue} />
      <View style={AppStyles.flex1}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text
            style={{
              ...AppStyles.baseText,
              color: selected ? AppColors.blue : AppColors.black,
              marginLeft: AppSizes.paddingXSml,
            }}>
            {props.title}
          </Text>
          <View style={AppStyles.flex1} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

class FilterSendInvoiceCQT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDatePicker: false,
      fromDate: startDateDefaul,
      toDate: endDateDefauld,
      timeSelected: {},
      statusSelected: mockAll,
      typeSelected: mockAll,
      isShowListWeek: false,
      isShowListMounth: false,
      isShowListQuanter: false,
      isShowListYear: false,
      isShowListStatus: false,
      isShowListType: false,
      titleTime: '',
      openType: '',
      dataLoaiTruyenNhan: [],
      dataTrangThaiTruyenNhan: [],
    };
  }

  // Gọi API lần đầu mở compnent
  async componentDidMount() {
    const {
      filterSelecled,
      dataLoaiTruyenNhan,
      dataTrangThaiTruyenNhan,
    } = this.props;

    if (dataLoaiTruyenNhan && dataTrangThaiTruyenNhan) {
      const mixTrangThaiTruyenNhan = [...dataTrangThaiTruyenNhan, mockAll];
      const mixLoaiTruyenNhan = [...dataLoaiTruyenNhan, mockAll];
      this.setState({
        dataTrangThaiTruyenNhan: mixTrangThaiTruyenNhan,
        dataLoaiTruyenNhan: mixLoaiTruyenNhan,
      });
    }

    if (!_.isEmpty(filterSelecled)) {
      const data = {
        title: filterSelecled.titleTime,
        startTime: filterSelecled.fromDate,
        endTime: filterSelecled.toDate,
      };
      const isShowListWeek = _.some(ListTimeWeeds, data);
      const isShowListMounth = _.some(ListTimeMounth, data);
      const isShowListQuanter = _.some(ListTimeQuarter, data);
      const isShowListYear = _.some(ListTimeYear, data);

      this.setState({
        fromDate: filterSelecled.fromDate,
        toDate: filterSelecled.toDate,
        isShowListWeek,
        isShowListMounth,
        isShowListQuanter,
        isShowListYear,
        timeSelected: data,
        statusSelected: filterSelecled.statusSelected,
        typeSelected: filterSelecled.typeSelected,
      });
    }
  }

  // hàm thực hiện đóng drawer action
  static hide() {
    Actions.pop();
  }

  // hàm thực hiện show drawer action
  static show(props) {
    Actions.filterSendInvoiceCQT({...props});
  }

  // hàm đóng drawer action kèm theo animation
  closeModal = () => {
    this.refs.body.fadeOutRight(300).then(() => Actions.pop());
  };

  // hàm apply change filter
  onApply = () => {
    const {
      fromDate,
      toDate,
      nameCustomer,
      openType,
      titleTime,
      statusSelected,
      typeSelected,
    } = this.state;
    if (!fromDate) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('filterReport.validateFormDateToDate'),
      );
    }
    if (!toDate) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('filterReport.validateFormDateToDate'),
      );
    }
    if (this.props.onFilter && fromDate && toDate) {
      const dataFilter = {
        fromDate,
        toDate,
        nameCustomer,
        openType: openType,
        titleTime,
        statusSelected,
        typeSelected,
      };
      this.props.onFilter(dataFilter);
      Actions.pop();
    }
  };

  renderStatusItem = (item, index) => {
    const {statusSelected} = this.state;
    const ischecked = statusSelected.value == item.value;
    return (
      <TextWthRadio
        key={index.toString()}
        onPress={() =>
          this.setState({statusSelected: item, isShowListStatus: false})
        }
        ischecked={ischecked}
        title={item.text}
      />
    );
  };

  renderTypeItem = (item, index) => {
    const {typeSelected} = this.state;
    const ischecked = typeSelected.value == item.value;
    return (
      <TextWthRadio
        key={index.toString()}
        onPress={() =>
          this.setState({typeSelected: item, isShowListType: false})
        }
        ischecked={ischecked}
        title={item.text}
      />
    );
  };

  renderTimeItem = (item = ListTime[0], index) => {
    const {timeSelected} = this.state;
    const ischecked = timeSelected.title == item.title;
    return (
      <TextWthRadio
        key={index}
        onPress={() =>
          this.setState({
            timeSelected: item,
            fromDate: item.startTime,
            toDate: item.endTime,
            titleTime: item.title,
          })
        }
        ischecked={ischecked}
        title={item.title}
      />
    );
  };

  // hàm render chính
  render() {
    const {
      fromDate,
      toDate,
      isShowListWeek,
      isShowListMounth,
      isShowListQuanter,
      isShowListYear,
      isShowListType,
      isShowListStatus,
      dataLoaiTruyenNhan,
      dataTrangThaiTruyenNhan,
      statusSelected,
      typeSelected,
    } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={AppStyles.flex1}
          onPress={() => this.closeModal()}
        />
        <Animatable.View
          ref={'body'}
          animation="slideInRight"
          duration={300}
          style={styles.draw}>
          <View style={styles.header}>
            <Text style={styles.textLoc}>{I18n.t('filterReport.filter')}</Text>
            <TouchableOpacity
              style={styles.box}
              onPress={() => this.closeModal()}>
              <Text style={styles.Skip}>{I18n.t('common.skip')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView style={{flex: 1, width: '100%', marginBottom: 70}}>
              <View style={styles.body}>
                <PickerInput
                  require
                  title={I18n.t('filterReport.since')}
                  value={fromDate}
                  placeholder={'dd/mm/yyyy'}
                  onChangeText={text => this.setState({fromDate: text})}
                />
                <PickerInput
                  require
                  title={I18n.t('filterReport.toDate')}
                  placeholder={'dd/mm/yyyy'}
                  value={toDate}
                  onChangeText={text => this.setState({toDate: text})}
                />

                <RowInfor
                  onPressRow={() =>
                    this.setState({
                      openType: TypeSelected.weeks,
                      isShowListWeek: !isShowListWeek,
                      isShowListMounth: false,
                      isShowListQuanter: false,
                      isShowListYear: false,
                    })
                  }
                  selected={isShowListWeek}
                  title={'Theo tuần '}
                />
                {isShowListWeek &&
                  ListTimeWeeds.map((item, index) => {
                    return this.renderTimeItem(item, index);
                  })}

                <RowInfor
                  onPressRow={() =>
                    this.setState({
                      openType: TypeSelected.months,
                      isShowListWeek: false,
                      isShowListMounth: !isShowListMounth,
                      isShowListQuanter: false,
                      isShowListYear: false,
                    })
                  }
                  selected={isShowListMounth}
                  title={'Theo tháng '}
                />

                {isShowListMounth &&
                  ListTimeMounth.map((item, index) => {
                    return this.renderTimeItem(item, index);
                  })}

                <RowInfor
                  onPressRow={() =>
                    this.setState({
                      openType: TypeSelected.quarters,
                      isShowListWeek: false,
                      isShowListMounth: false,
                      isShowListQuanter: !isShowListQuanter,
                      isShowListYear: false,
                    })
                  }
                  selected={isShowListQuanter}
                  title={'Theo quý '}
                />

                {isShowListQuanter &&
                  ListTimeQuarter.map((item, index) => {
                    return this.renderTimeItem(item, index);
                  })}

                <RowInfor
                  onPressRow={() =>
                    this.setState({
                      openType: TypeSelected.years,
                      isShowListWeek: false,
                      isShowListMounth: false,
                      isShowListQuanter: false,
                      isShowListYear: !isShowListYear,
                    })
                  }
                  selected={isShowListYear}
                  title={'Theo năm '}
                />

                {isShowListYear &&
                  ListTimeYear.map((item, index) => {
                    return this.renderTimeItem(item, index);
                  })}
              </View>
              <View style={{paddingHorizontal: AppSizes.paddingSml}}>
                <EnvoiceButtonTextDrop
                  drop
                  disabled
                  title={'Trạng thái truyền nhận'}
                  value={statusSelected.text}
                  onPress={() =>
                    this.setState({isShowListStatus: !isShowListStatus})
                  }
                />

                {isShowListStatus &&
                  dataTrangThaiTruyenNhan.map((item, index) => {
                    return this.renderStatusItem(item, index);
                  })}

                <EnvoiceButtonTextDrop
                  drop
                  disabled
                  title={'Loại thông báo'}
                  value={typeSelected.text}
                  onPress={() => {
                    this.setState({isShowListType: !isShowListType});
                  }}
                />
                {isShowListType &&
                  dataLoaiTruyenNhan.map((item, index) => {
                    return this.renderTypeItem(item, index);
                  })}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
          <View style={styles.btnApple}>
            <ButtonText
              onCick={() => this.onApply()}
              title={I18n.t('filterReport.apply')}
            />
          </View>
        </Animatable.View>
      </View>
    );
  }
}

// styles của drawer
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    backgroundColor: AppColors.backgroundDialog,
  },

  draw: {
    backgroundColor: 'white',
    width: '70%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingVertical: DeviceUtil.isIPhoneX() ? height * 0.04 : 0,
      },
    }),
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: AppSizes.marginXSml,
    backgroundColor: '#E7E7E9',
    height: 63,
  },
  Skip: {
    ...AppStyles.baseText,
    lineHeight: 18,
    fontSize: 15,
    color: AppColors.white,
    textAlign: 'center',
    padding: 3,
  },
  box: {
    width: 73,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#4D5EAB',
  },
  textLoc: {
    ...AppStyles.boldText,
    color: AppColors.darkblue,
    fontSize: 17,
    lineHeight: 21,
  },
  body: {
    marginHorizontal: AppSizes.paddingSml,
    flex: 1,
  },
  btnApple: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        bottom: DeviceUtil.isIPhoneX() ? 25 : 5,
      },
      android: {
        bottom: 20,
      },
    }),
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
  },
});

export default FilterSendInvoiceCQT;
