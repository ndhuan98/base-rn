import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppSizes, AppColors} from '../../theme';
const {height} = Dimensions.get('window');
import Spinner from 'react-native-spinkit';

class DialogLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.dialogLoading({...props});
  }
  closeModal = () => {
    this.refs.body.fadeOutDownBig(300).then(() => Actions.pop());
  };
  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          ref={'body'}
          animation="fadeInUp"
          duration={300}
          style={styles.sheet}>
          <Spinner size={50} type={'FadingCircleAlt'} color={AppColors.blue} />
        </Animatable.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...AppStyles.baseDialog,
    backgroundColor:'rgba(0, 0, 0, 0.2)'
  },
  sheet: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapHeader: {
    flexDirection: 'row',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: AppSizes.paddingMedium,
  },
});

export default DialogLoading;
