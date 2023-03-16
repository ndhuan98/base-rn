import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {I18n} from '@constant';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import {animate} from '../../ultil/AnimateHelper';

class ConfirmPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightKeyboard: 15,
      password: '',
    };
  }
  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.confirmPass({...props});
  }
  closeModal = () => {
    this.refs.body.fadeOutDownBig(300).then(() => Actions.pop());
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      this._keyboardDidShow(e),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this._keyboardDidHide(),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({
      heightKeyboard: Platform.OS === 'ios' ? e.endCoordinates.height + 10 : 15,
    });
    animate();
  }

  _keyboardDidHide(e) {
    this.setState({heightKeyboard: 15});
    animate();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          ref={'body'}
          animation="fadeInUp"
          duration={300}
          style={{...styles.sheet, paddingBottom: this.state.heightKeyboard}}>
          <TouchableOpacity
            onPress={() => this.closeModal()}
            style={styles.topTouch}
          />
          <View style={styles.wrapHeader}>
            <Text
              style={{
                ...AppStyles.boldText,
                color: AppColors.blue,
                fontSize: 15,
                lineHeight: 18,
              }}>
              {this.props.title || I18n.t('confirmPass.title')}
            </Text>
            <TouchableOpacity
              onPress={() => this.closeModal()}
              style={{
                padding: AppSizes.paddingXXSml,
                paddingHorizontal: AppSizes.paddingMedium,
                backgroundColor: AppColors.blueBackground,
                borderRadius: AppSizes.paddingMedium,
              }}>
              <Text style={{...AppStyles.baseText, color: AppColors.white}}>
                {I18n.t('common.skip')}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            onSubmitEditing={Keyboard.dismiss}
            secureTextEntry={true}
            autoFocus={true}
            placeholder={'nhập mật khẩu'}
            returnKeyType="done"
            style={styles.input}
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}
            onSubmitEditing={() => {
              this.props.onSubmit(this.state.password);
              Actions.pop();
            }}
          />
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
    backgroundColor: '#F1F3F6',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: AppSizes.paddingSml * 1.5,
    paddingVertical: AppSizes.paddingSml * 1.5,
    position: 'absolute',
    bottom: 1,
  },
  wrapHeader: {
    flexDirection: 'row',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: AppSizes.paddingMedium,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#C7C6CD',
    borderWidth: 1,
    paddingHorizontal: AppSizes.paddingSml,
    borderRadius: AppSizes.borderRadius,
  },
});

export default ConfirmPass;
