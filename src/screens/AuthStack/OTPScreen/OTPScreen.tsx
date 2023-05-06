import React, {useState} from 'react';

import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import {LogoSvg} from '../../../../assets/svg/LogoSvg';
import BaseButton from '../../../components/BaseButton';
import Icon from '../../../components/Icon';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import SvgImage from '../../../components/SvgImage';
import TextBase from '../../../components/TextBase';
import TextInputBase from '../../../components/TextInputBase';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import {normalizePhonenumber} from '../../../utils/Utils';

const OTPScreen = () => {
  // const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;
  const [sdt, setSdt] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const onChangeText = (value: string, type: number) => {
    switch (type) {
      case 0:
        setSdt(value);
        break;
      case 1:
        setOtp(value);
        break;
      default:
        break;
    }
  };
  const loginPress = () => {
    console.log('loginPress');
    NavigationService.popUpToTop();
  };
  const nextPress = async () => {
    if (otp.length < 6) {
      // this.firstTextInput.focus();
      R.Loading.hide();
      R.showMessage({
        message: 'OTP không đúng. OTP phải đủ 6 kí tự',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }
    R.Loading.show();
    let confirmResult = null;
    let credential = null;

    credential = auth.PhoneAuthProvider.credential(confirm.verificationId, otp);
    // console.log('next', credential);
    confirmResult = await auth()
      .signInWithCredential(credential)
      .then(res => {
        // console.log('res', res)
        NavigationService.navigate(routes.RESET_PASSWORD_SCREEN, {
          phoneNumber: sdt,
        });
      })
      .catch(ex => {
        R.Loading.hide();
        R.showMessage({
          message: ex.message,
          type: 'danger',
          icon: 'danger',
          autoHide: true,
        });
        return null;
      });
    // console.log(confirmResult);

    //{"additionalUserInfo": {"isNewUser": false, "profile": null, "providerId": "phone", "username": null},
    //"user": {"displayName": null, "email": null, "emailVerified": false, "isAnonymous": false, "metadata": [Object],
    //"phoneNumber": "+84912726129", "photoURL": null, "providerData": [Array], "providerId": "firebase",
    //"refreshToken": "ACzBnChx2X0fiwyG3FxkM7kOLiQ8F6UEoGz4FfDpplX_dkb36k7C2GYShM1rMaZUBATG_jHtcRCqRF9tvawNn5VhMj-idc0Rb4bUcmLGSShch61lhAS-EqrdUP0s9vnX8ZU7xlT-Jt61JKc527OXr4lNLXx-7bHhUJbc3RZxd1J9ZbDQJ6t_FT3tECPvgajyCc9ywznO0oae",
    //"tenantId": null, "uid": "O6oocDH7swe3C6FdNiui2c4Q2YI3"}}
    if (!confirmResult) {
      //result.errorCode
      R.Loading.hide();
      return;
    }
    // NavigationService.navigate(routes.RESET_PASSWORD_SCREEN)
  };
  const sendPress = async (forced = true) => {
    console.log('send');
    auth()
      .verifyPhoneNumber(normalizePhonenumber(sdt), forced)
      .on('state_changed', phoneAuthSnapshot => {
        console.log('Snapshot state: ', phoneAuthSnapshot);
        switch (phoneAuthSnapshot.state) {
          case 'error':
            console.log('verification error', phoneAuthSnapshot);
            break;
          case 'timeout':
            console.log('verification timeout', phoneAuthSnapshot);
            setConfirm(phoneAuthSnapshot);
            break;
          default:
            console.log('phoneAuthSnapshot.state', phoneAuthSnapshot);
            setConfirm(phoneAuthSnapshot);
            break;
        }
      })
      .then(confirmation => {
        console.log('confirmation', confirmation);
      })
      .catch(ex => {
        console.log('ex', ex.message);
        R.showMessage({
          message: ex.message,
          type: 'danger',
          icon: 'danger',
          autoHide: true,
        });
      });
    // console.log('confirmation', confirmation);

    // setConfirm(confirmation);
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{flex: 1}}>
          <View style={{height: DEVICE_HEIGHT}}>
            <View style={styles.logo}>
              <SvgImage xml={LogoSvg} width={300} height={150} />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inputView}>
                {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                <TextBase style={styles.inputText}>Số điện thoại</TextBase>
                <TextInputBase
                  style={styles.inputStyle}
                  type="default"
                  onChangeText={value => onChangeText(value, 0)}
                  placeholder="Nhập số điện thoại"
                  initValue={sdt}
                  iconLeft={
                    <Icon
                      name="themsodienthoai1"
                      size={verticalScale(24)}
                      color={'rgba(1,1,1,0.4)'}
                    />
                  }
                />
                <TextBase style={styles.inputText}>OTP</TextBase>
                <View style={styles.view2}>
                  <TextInputBase
                    style={styles.otp}
                    type="default"
                    onChangeText={value => onChangeText(value, 1)}
                    placeholder="Nhập OTP"
                    initValue={otp}
                  />
                  <BaseButton
                    title="Gửi OTP"
                    style={styles.send}
                    titleStyle={styles.titleStyle}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onPress={sendPress}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.actionView}>
              <BaseButton
                title="Tiếp Tục"
                style={styles.login}
                titleStyle={styles.titleStyle}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress={nextPress}
              />
              <View style={styles.view3}>
                <TextBase
                  title={'Đã có tài khoản? '}
                  style={styles.textStyle}
                />
                <TouchableOpacity style={styles.ggPress} onPress={loginPress}>
                  {/* <Icon name='Google-plus' color='blue' size={verticalScale(30)} /> */}
                  <TextBase title="Đăng nhập" style={styles.signin} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default OTPScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  logo: {
    flex: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    // marginTop: verticalScale(100)
  },
  inputView: {
    flex: 4,
    marginHorizontal: verticalScale(16),
  },
  actionView: {
    flex: 3,
    alignItems: 'center',
  },
  inputText: {
    fontSize: verticalScale(20),
    // fontWeight: '100',
    fontFamily: 'Pattaya-Regular',
  },
  inputStyle: {
    marginHorizontal: 0,
    marginBottom: verticalScale(20),
    marginTop: verticalScale(16),
    backgroundColor: '#EFEFEF',
  },
  forgot: {
    // marginTop: verticalScale(20),
    fontSize: verticalScale(16),
    fontWeight: 'bold',
    color: '#85DAFF',
  },
  touchableOpacity: {
    alignSelf: 'flex-end',
  },
  login: {
    width: verticalScale(315),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  send: {
    width: verticalScale(80),
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    // borderWidth: 1,
  },
  ggPress: {
    marginLeft: verticalScale(16),
  },
  signin: {
    fontSize: verticalScale(16),
    fontWeight: 'bold',
    color: '#FF7DC3',
  },
  textStyle: {
    fontSize: verticalScale(16),
    color: '#9A9999',
  },
  view2: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  otp: {
    marginHorizontal: 0,
    marginBottom: verticalScale(20),
    marginTop: verticalScale(16),
    backgroundColor: '#EFEFEF',
    width: verticalScale(150),
    borderWidth: 3,
  },
});
