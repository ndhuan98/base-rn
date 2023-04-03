import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
// import { AppText } from 'src/components/AppText';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppRoutes } from 'src/navigator/types';
import { SplashRootStackParamList } from 'src/navigator/splash-navigator';
import * as Animatable from 'react-native-animatable';
import { RootStackParamList } from 'src/navigator/root';
import { AppButton } from 'src/components/AppButton';
import { AppDateTimePicker } from 'src/components/AppDateTimePicker';
import { AppFilterButton } from 'src/components/AppFilterButton';
import { AppInput } from 'src/components/AppInput';
import { AppFormInputDatePicker } from 'src/components/AppFormInputDatePicker';
import CalendarIcon from 'src/assets/svg-icons/calendar/CalendarIcon';
import { AppFormPasswordInput } from 'src/components/AppFormPasswordInput';
import { AppHotlineText } from 'src/components/AppHotlineText';
import { CircularProgressBar } from 'src/components/CircularProgressBar';
import { LineProgressBar } from 'src/components/LineProgressBar';
import { AppSortButton } from 'src/components/AppSortButton';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GeneralYupValidation, ValidateErrorMessage } from 'src/utils/variables/form-validation';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './style'
// import EnvoiceMenuText from 'src/components/Env/EnvoiceMenuText';
// import  AppText from 'react-native-ts-components';
export type NavigationSplashMainProps = NativeStackNavigationProp<RootStackParamList, AppRoutes.HOME>;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationSplashMainProps>();
  const method = useForm({
    resolver: yupResolver(
      yup.object().shape({
        birthday: GeneralYupValidation.birthday,
      }),
    ),
  });

  useEffect(() => {
    method.setValue('birthday', '');

    console.log(method, 'method')
  }, []);

  return (
    <FormProvider {...method}>
      <ScrollView>
        {/* <AppFilterButton title='filter' options={[1,2,3]}></AppFilterButton> */}
        <AppInput inputStyle={styles.btnStyle} placeHolder='Hi'></AppInput>
        <AppButton onPress={() => Alert.alert('Ciao')
        } buttonStyle={styles.btnStyle} title='I am'></AppButton>
        <AppFormInputDatePicker
          required
          label="Ngày sinh"
          name="birthday"
          placeHolder="Nhập ngày sinh"
          renderIcon={() => <CalendarIcon />}
        />
        <AppSortButton></AppSortButton>
        <CircularProgressBar percentage={50}></CircularProgressBar>
        <LineProgressBar percentage={75}></LineProgressBar>
        {/* <EnvoiceMenuText
          title={'Mẫu số hóa đơn'}
          value={'01GTKT0/001 - AA/19E'}
          // onPress={() => DrawerAction.show(draw)}
        /> */}
        <AppHotlineText></AppHotlineText>
        {/* <AppText></AppText> */}
      </ScrollView>
    </FormProvider>
  );
};
