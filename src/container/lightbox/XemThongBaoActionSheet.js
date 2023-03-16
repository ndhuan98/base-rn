import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Share,
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { AppStyles, AppSizes, AppColors } from '../../theme';
import Dlog from '../../components/Dlog';
import { baseImage64 } from '../invoiceCreate/DataFake';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
const { width, height } = Dimensions.get('window');
import Share_icon from '../../image/svg/Share.svg'
class XemThongBaoActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageHoaDon: props?.imageHoaDon,
      key_encrypt: '',
      code_encrypt: '',
      Loading: false,
    };
  }
  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.xemThongBaoPreview({ ...props });
  }

  closeModal = () => {
    this.refs.body.fadeOutDownBig(300).then(() => Actions.pop());
  };

  onShare = async () => {

    try {
      const result = await Share.share({
        message: `Chia sẻ thông báo sai sót`,
        type: 'image/png',
        url: this.state.imageHoaDon,
        message: "Chia sẻ thông báo"
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


  componentDidMount() { }

  render() {
    const { title } = this.props;
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
              <Share_icon style={styles.Share_icon} fill={AppColors.darkblue} />
            </TouchableOpacity>
            <Text style={styles.title}>{title && title}</Text>
            <TouchableOpacity
              onPress={() => this.closeModal()}
              style={styles.leftDistance}>
              <Text style={styles.ignore}>{'Đóng'}</Text>
            </TouchableOpacity>
          </View>
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
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: AppSizes.paddingMedium,
    borderColor: AppColors.border,
  },
  leftDistance: {
    backgroundColor: '#4D5EAB',
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: AppSizes.margin,
  },
  title: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize: 17,
    marginLeft: 35,
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
  Share_icon: {
    width: 25,
    height: 25,
  },
  leftDistance_1: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    marginLeft: AppSizes.marginSml,
    paddingVertical: AppSizes.paddingXXSml,
  }
});

export default XemThongBaoActionSheet;
