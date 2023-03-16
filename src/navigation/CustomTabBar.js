import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AppColors, AppSizes } from '../theme';
import Home from '../image/svg/Home.svg';
import ActiveHome from '../image/svg/soildHome.svg';
import Dashboard from '../image/svg/pieChart_Line.svg';
import ActiveDashboard from '../image/svg/soildPieChart.svg';
import Plus from '../image/svg/Plus.svg';
import ActivePlus from '../image/svg/soildPlus.svg';
import List from '../image/svg/List.svg';
import ActiveList from '../image/svg/soildList.svg';
import Account from '../image/svg/Profile.svg';
import ActiveAccount from '../image/svg/soildProfile.svg';
import Report_Line from '../image/svg/Report_Line.svg';
import Report_Soild from '../image/svg/Report_Soild.svg';
import ActionSheet from '../container/lightbox/ActionSheet';
import InvoiceHelper from '../ultil/InvoiceUtil';
import { OptionInvoices } from '../container/invoiceCreate/DataFake';
import { I18n } from '@constant';

// định nghĩa tên các tab menu
const tabIndex = {
  Home: 0,
  ListInvoice: 1,
  Dashboard: 2,
  Account: 3,
};

// style của icon menu
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createIcon: { height: 34, width: 34 },
  containerTab: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
    paddingBottom: AppSizes.paddingXSml,
    borderTopWidth: 1,
    borderColor: AppColors.border,
  },
});


const OptionCreateInvoice = {
  title: 'Lập hoá đơn',
  typeScreen: InvoiceHelper.lapHoaDon,
  dataList: OptionInvoices,
  onSelected: item => {
    switch (item.value) {
      case 'createInvoice':
        return Actions.jump('createInvoice')
      case 'hoaDonGTGTMTT':
        return Actions.jump('hoaDonGTGTMTT')
      case 'hoaDonBHMTT':
        return Actions.jump('hoaDonBHMTT')
      default: return Alert.alert(I18n.t('common.notice'), I18n.t('common.developing'))
    }
  }
};

export default class CustomTabBar extends React.Component {

  render() {
    const { state } = this.props.navigation;
    const activeTabIndex = state.index;
    const IconHome = activeTabIndex == tabIndex.Home ? ActiveHome : Home;
    const IconDashboard =
      activeTabIndex == tabIndex.Dashboard ? ActiveDashboard : Dashboard;
    const IconList = activeTabIndex == tabIndex.ListInvoice ? ActiveList : List;
    const IconReport =
      activeTabIndex == tabIndex.Account ? Report_Soild : Report_Line;

    return (
      <View style={styles.containerTab}>
        <TouchableOpacity
          onPress={() => Actions.Home()}
          style={styles.tabStyle}>
          <IconHome fill={AppColors.blue} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Actions.listInvoice()}
          style={styles.tabStyle}>
          <IconList fill={AppColors.blue} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => Actions.createInvoice()}
          onPress={() => ActionSheet.show(OptionCreateInvoice)}
          style={{ ...styles.tabStyle }}>
          <ActivePlus fill={AppColors.blue} style={styles.createIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Actions.Statistic()}
          style={styles.tabStyle}>
          <IconDashboard fill={AppColors.blue} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Actions.Report()}
          style={styles.tabStyle}>
          <IconReport fill={AppColors.blue} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}
