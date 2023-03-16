import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import StatusBarTSD from '../components/StatusBarTSD';
import {AppColors, AppStyles, AppSizes} from '../theme';
import AppHeader from '../components/AppHeader';
import Menu from '../image/svg/menu1.svg';
import {Actions} from 'react-native-router-flux';
import LaberColor from '../components/LaberColor';
import DropUpSoild from '../image/svg/DropUpSoild.svg';
import DropDownLine from '../image/svg/DropDownLine.svg';
import HelpInvoice from '../image/svg/HelpInvoice.svg';
import {DataQuestion} from '../constant';
import {animate} from '../ultil/AnimateHelper';

const title = 'Những câu hỏi thường gặp';
const help =
  'Công ty Thái Sơn đã tổng hợp và biên tập các câu hỏi thường gặp trong quá trình sử dụng và nhận hóa đơn điện tử. Bạn vui lòng chọn câu hỏi cần quan tâm và xem nội dung hướng dẫn, trả lời.';
const lienHe =
  'Nếu không tìm thấy nội dung quan tâm hoặc cần trao đổi thêm, vui lòng liên hệ với chúng tôi theo thông tin dưới đây:';
const TongDai = 'Số tổng đài tư vấn, hỗ trợ 24/7:';
const HelpFilter = [
  {
    title: 'Về hóa đơn điện tử',
    value: '1',
  },
  {
    title: 'Về Einvoice',
    value: '0',
  },
];

const HelpEnvoice = props => {
  const valueSelected = props.itemSelected.value;
  return (
    <View style={styles.wrapItem}>
      <View style={styles.itemHelp}>
        {HelpFilter.map(item => {
          const titleStyle =
            item.value == valueSelected
              ? styles.titleSelected
              : styles.titleNomal;
          return (
            <TouchableOpacity
              onPress={() => props.onPressItem(item)}
              key={item.value}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  item.value == valueSelected
                    ? AppColors.lightgray
                    : AppColors.white,
              }}>
              <Text style={titleStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const Item2 = ({item2}) => {
  const [expand, setExpand] = React.useState({
    isShow: false,
  });
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.main}
        onPress={() => {
          const expandData = {
            isShow: !expand.isShow,
          };
          animate();
          setExpand(expandData);
        }}>
        <HelpInvoice style={styles.icons} />
        <Text style={styles.titleMenu}>{item2.titleMenu}</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      {expand.isShow && <Text style={styles.content}>{item2.content}</Text>}
    </View>
  );
};
const Item = ({item}) => {
  const [expand, setExpand] = React.useState({
    isShow: false,
  });
  const IconRight = expand.isShow ? DropUpSoild : DropDownLine;
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.boxHeader}
        onPress={() => {
          const expandData = {
            isShow: !expand.isShow,
          };
          animate();
          setExpand(expandData);
        }}>
        <Text numberOfLines={1} numberOfLines={1}style={styles.header}>
          {item.title}
        </Text>
        <IconRight style={styles.iconRight} fill={AppColors.blue} />
      </TouchableOpacity>
      {expand.isShow && (
        <FlatList
          data={item.data}
          renderItem={({item: item2}) => <Item2 item2={item2} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const InvoiceHelpScreen = () => {
  const scrollInvoice = React.useRef(null);
  const [filterSelectd, setFilterSelectd] = React.useState(HelpFilter[0]);
  React.useEffect(() => {
    HelpFilter.value = filterSelectd.value;
  });
  const onFilter = item => {
    setFilterSelectd(item);
  };
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <AppHeader
        Icon={Menu}
        backgroundColor={AppColors.blue}
        titleColor={AppColors.white}
        iconColor={AppColors.white}
        title={'Câu hỏi thường gặp'}
        onPressMenu={() => Actions.drawerOpen()}
      />
      <HelpEnvoice
        itemSelected={filterSelectd}
        onPressItem={item => onFilter(item)}
      />
      <ScrollView
        ref={scrollInvoice}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.titleHelp}>{title}</Text>
          <Text style={styles.help}>{help}</Text>
          <Text style={styles.lienHe}>{lienHe}</Text>
          <Text style={styles.titleHelp}>{TongDai}</Text>
          <LaberColor
            title={'Miền Bắc: '}
            value={'1900 4767'}
            valueCall={'19004767'}
            color={styles.laberHelp}
          />
          <LaberColor
            title={'Miền Nam - Miền Trung: '}
            value={'1900 4768'}
            valueCall={'19004768'}
            color={styles.laberHelp}
          />
          <FlatList
            data={
              filterSelectd.value == 1
                ? DataQuestion.DATA
                : DataQuestion.DATAEINVOICE
            }
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: AppColors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6.68,
    elevation: 5,
  },
  header: {
    ...AppStyles.baseText,
    color: AppColors.black,
    lineHeight: 20,
    width:'85%',
    fontSize: AppSizes.fontMedium,
    textTransform: 'uppercase',
  },
  boxHeader: {
    flexDirection: 'row',
    backgroundColor: AppColors.lightgray,
    height: 50,
    width:'100%',
    marginVertical: AppSizes.fontXSmall,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: AppSizes.paddingSml,
    paddingRight: AppSizes.paddingXXSml,
  },
  icons: {
    width: 17,
    height: 17,
    marginVertical: AppSizes.marginSml,
    marginHorizontal: AppSizes.marginSml,
  },
  iconRight: {
    width: 18,
    height: 18,
    width:'10%',
  },
  main: {
    flexDirection: 'row',
  },
  titleMenu: {
    ...AppStyles.baseText,
    color: '#656565',
    marginVertical: AppSizes.marginSml,
    paddingRight: 40,
    textAlign: 'left',
    lineHeight: 22,
    textAlign: 'justify',
  },
  content: {
    ...AppStyles.baseText,
    color: AppColors.black,
    backgroundColor: '#E8F0FE',
    paddingHorizontal: AppSizes.marginSml,
    paddingVertical:AppSizes.marginSml,
    lineHeight: 22,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    textAlign: 'justify',
  },
  iconLeft: {
    width: 15,
    height: 15,
    flex: 1,
    alignItems: 'flex-end',
    marginRight: AppSizes.marginSml,
  },
  titleHelp: {
    ...AppStyles.boldText,
    color: AppColors.black,
    lineHeight: 21,
    fontSize: AppSizes.fontMedium,
    marginBottom: AppSizes.marginXSml,
    marginTop: AppSizes.marginXSml,
  },
  help: {
    ...AppStyles.baseText,
    color: AppColors.black,
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 25,
  },
  lienHe: {
    ...AppStyles.baseText,
    color: AppColors.black,
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: AppSizes.marginXSml,
  },
  tabbar: {
    width: '100%',
    height: 35,
  },
  wrapItem: {
    width: '100%',
    backgroundColor: AppColors.white,
  },
  itemHelp: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: AppColors.white,
    height: 35,
    borderBottomWidth: 0.5,
    borderColor:'#EFEFEF',
  },
  titleNomal: {
    ...AppStyles.baseText,
    lineHeight: 19,
    color: AppColors.black,
  },
  titleSelected: {
    ...AppStyles.boldText,
    lineHeight: 19,
    color: AppColors.blue,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.lightgray,
    marginVertical: AppSizes.marginXSml,
  },
  laberHelp:{
    ...AppStyles.baseText,
    paddingTop:AppSizes.marginXXSml,
    color:AppColors.black,
  }
});
export default InvoiceHelpScreen;
