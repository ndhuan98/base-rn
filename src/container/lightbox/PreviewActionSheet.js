import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Share,
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {I18n} from '@constant';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import API from '../../network/API';
import Dlog from '../../components/Dlog';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import {baseImage64} from '../invoiceCreate/DataFake';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
const {width, height} = Dimensions.get('window');
import Spinner from 'react-native-spinkit';
import Share_icon from '../../image/svg/Share.svg'
const URLWebViewInvoice = 'https://einvoice.vn/xem-hoa-don/';
class PreviewActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageHoaDon: '',
      key_encrypt: '',
      code_encrypt: '',
      Loading: true,
    };
  }
  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.actionPreview({...props});
  }

  closeModal = () => {
    this.refs.body.fadeOutDownBig(300).then(() => Actions.pop());
  };

  onShare = async () => {
    let code_encrypt = this.state.code_encrypt;
    let key_encrypt = this.state.key_encrypt;
    try {
      const result = await Share.share({
        message: `${URLWebViewInvoice}${key_encrypt}/${code_encrypt}`,
      });
      if (result.action == Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          Dlog('shared with activity type of result.activityType')
        } else {
          // shared 
          Dlog('Share')
        }
      } else if (result.action == Share.dismissedAction) {
        // dismissed
        Dlog('Share dismis')
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  viewInvoice = param =>{
    API.viewInvoice(param).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          this.setState({imageHoaDon: res.data.data, loading: false});
        } else {
          Alert.alert('Thông báo', res.data.desc);
        }
      },
      err => {
        Dlog('viewInvoice', err);
      },
    );
  }
  keyEncryptInvoice = param =>{
    API.keyEncryptInvoice(param).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          this.setState({
            code_encrypt: res.data.data.code_encrypt,
            key_encrypt: res.data.data.key_encrypt,
            Loading: false,
          });
        } else {
          Alert.alert('Thông báo', res.data.desc);
        }
      },
      err => {
        Dlog('viewInvoice', err);
      },
    );
  }

  componentDidMount() {
    if (this.props.hoaDonId) {
      const param = {
        idHoaDon: this.props.hoaDonId,
      };
      this.viewInvoice(param);
      this.keyEncryptInvoice(param);
    }
  }

  render() {
    const {title, confirmText, confirmAction} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={AppStyles.flex1}
          onPress={() => this.closeModal()}
        />
        <Animatable.View
          ref={'body'}
          animation="fadeInUp"
          duration={300}
          style={styles.sheet}>
          <View style={styles.wrapHeader}>
            <TouchableOpacity
              onPress={() => this.onShare()}
              style={styles.leftDistance_1}>
              <Share_icon style={styles.Share_icon} fill={AppColors.darkblue}/>
            </TouchableOpacity>
            <Text style={styles.title}>{title && title}</Text>
            <TouchableOpacity
              onPress={() => this.closeModal()}
              style={styles.leftDistance}>
              <Text style={styles.ignore}>{'Đóng'}</Text>
            </TouchableOpacity>
          </View>
         <Spinner
            isVisible={this.state.loading}
            style={{margin: AppSizes.marginSml}}
            size={30}
            type={'Circle'}
            color={AppColors.blue}
          />
          <ImageZoom
            cropWidth={width * 0.95}
            cropHeight={height}
            imageWidth={width * 0.95}
            imageHeight={height * 1}>
            <FastImage
              style={{
                width: '100%',
                height: height * 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={{
                uri: this.state.imageHoaDon,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ImageZoom>
        </Animatable.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...AppStyles.baseDialog,
  },
  sheet: {
    backgroundColor: 'white',
    width: '100%',
    height: '95%',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: AppSizes.paddingSml * 1.5,
    paddingVertical: AppSizes.paddingSml * 1.5,
  },
  topTouch: {
    backgroundColor: '#A1A9D2',
    height: 4,
    width: '20%',
    borderRadius: 2,
  },
  wrapHeader: {
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: AppSizes.paddingMedium,
    borderColor: AppColors.border,
  },
  leftDistance: {
    backgroundColor: '#4D5EAB',
    borderRadius: 20,
    justifyContent:'center',
    paddingHorizontal: AppSizes.margin,
  },
  title: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize: 17,
    marginLeft:35,
    alignSelf: 'flex-end',
  },
  ignore: {
    ...AppStyles.baseText,
    fontSize: 15,
    
    color: AppColors.white,
  },
  box: {
    width: 50,
  },
  Share_icon:{
    width:25,
    height:25,
  },
  leftDistance_1:{
    backgroundColor: AppColors.white,
    borderRadius: 20,
    marginLeft:AppSizes.marginSml,
    paddingVertical: AppSizes.paddingXXSml,
  }
});

export default PreviewActionSheet;
