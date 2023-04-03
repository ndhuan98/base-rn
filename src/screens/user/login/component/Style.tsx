import { Dimensions ,StyleSheet} from "react-native";
import { appColors, appSizes, appStyles } from "src/utils/theme";
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    txtLogin: {
      ...appStyles.baseText,
      color: appColors.white,
      fontSize: 15,
    },
    content: {
      flex: 1,
      backgroundColor: appColors.blue,
    },
    wrapInputForm: {
      width: width * 0.93,
      alignContent: 'center',
      backgroundColor: appColors.white,
      borderRadius: 10,
      elevation: 5,
      padding: 10,
      paddingTop: height * 0.032,
      paddingHorizontal: 20,
    },
    contentContainer: {
      flexGrow: 1,
      backgroundColor: appColors.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgLogo: {
      width: width * 0.54,
      height: height * 0.073,
      marginBottom: height * 0.043,
      marginTop: height * 0.1,
    },
    wrapContent: {
      flex: 1,
      alignItems: 'center',
    },
    bgContainer: { flex: 1, width: '100%', height: '100%' },
  
    buttonLogin: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: height * 0.025,
      flexDirection: 'row',
    },
    txtQuenMatKhau: {
      ...appStyles.baseText,
      color: '#8C9498',
      marginTop: height * 0.017,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    wrapTxtQuenMatKhau: { width: '100%', flexDirection: 'row' },
    icon:{ width: 50, height: 50 },
    buttonGroup:{
        fontSize: appSizes.fontXSmall,
        color: appColors.gray1,
      },
      txSelected:{ color: appColors.white },
      btnGrContainer: {
        width: '90%',
        height: 35,
        backgroundColor: 'white',
        borderColor: appColors.gray1,
        borderRadius: 5,
        alignSelf: 'center',
      },
      innerBorder: { width: 1, color: appColors.gray1 }
  });
  export default styles