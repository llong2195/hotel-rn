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

import {LogoSvg} from '../../../../assets/svg/LogoSvg';
import BaseButton from '../../../components/BaseButton';
import Icon from '../../../components/Icon';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import SvgImage from '../../../components/SvgImage';
import TextBase from '../../../components/TextBase';
import TextInputBase from '../../../components/TextInputBase';
import NavigationService from '../../../navigation/NavigationService';
import authServices from '../../../services/AuthServices';
import {useAppDispatch} from '../../../stores';
import * as AuthActions from '../../../stores/Auth/Actions';

const SigninScreen = () => {
  // const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;
  const [sdt, setSdt] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);
  const dispatch = useAppDispatch();
  const onChangeText = (value: string, type: number) => {
    switch (type) {
      case 0:
        setSdt(value);
        break;
      case 1:
        setPassword(value);
        break;
      case 2:
        setRePassword(value);
        break;
      default:
        break;
    }
  };

  const loginPress = () => {
    console.log('loginPress');
    NavigationService.popUpToTop();
  };

  const signinPress = async () => {
    console.log('signinPress');
    if (!sdt || sdt.trim().length < 10) {
      R.showMessage({
        message: 'Số điện thoại không đúng',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }
    if (!password || password.trim().length < 8) {
      R.showMessage({
        message: 'Mật khẩu không phù hợp',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }
    if (!rePassword || rePassword.trim().length < 8 || password != rePassword) {
      R.showMessage({
        message: 'Nhập lại mật khẩu không khớp',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }
    R.Loading.show();
    const registerRes = await authServices.register(sdt, password, rePassword);
    if (registerRes.errorCode) {
      R.Loading.hide();
      if (registerRes.errorCode != 2005) {
        R.showMessage({
          message: registerRes.errorMsg,
          type: 'danger',
          icon: 'danger',
          autoHide: true,
        });
      } else {
        R.showMessage({
          message: 'Số điện thoại đã được đăng ký bởi người khác',
          type: 'danger',
          icon: 'danger',
          autoHide: true,
        });
      }
      return;
    } else {
      dispatch(AuthActions.signupCompleted(registerRes.userInfo));
      R.Loading.hide();
    }
    console.log('registerRes', registerRes);
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
                <TextBase style={styles.inputText}>Mật khẩu</TextBase>
                <TextInputBase
                  style={styles.inputStyle}
                  type="default"
                  onChangeText={value => onChangeText(value, 1)}
                  placeholder="Nhập mật khẩu"
                  initValue={password}
                  iconLeft={
                    <Icon
                      name="thaydoimatkhau"
                      size={verticalScale(24)}
                      color={'rgba(1,1,1,0.4)'}
                    />
                  }
                  iconRight={
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                      <Icon
                        name={showPass ? 'private' : 'private-1'}
                        size={verticalScale(24)}
                        color={'rgba(1,1,1,0.4)'}
                      />
                    </TouchableOpacity>
                  }
                  secureTextEntry={showPass}
                />
                <TextBase style={styles.inputText}>Nhập lại mật khẩu</TextBase>
                <TextInputBase
                  style={styles.inputStyle}
                  type="default"
                  onChangeText={value => onChangeText(value, 2)}
                  placeholder="Nhập lại mật khẩu"
                  initValue={rePassword}
                  iconLeft={
                    <Icon
                      name="thaydoimatkhau"
                      size={verticalScale(24)}
                      color={'rgba(1,1,1,0.4)'}
                    />
                  }
                  iconRight={
                    <TouchableOpacity onPress={() => setShowRePass(!showPass)}>
                      <Icon
                        name={showRePass ? 'private' : 'private-1'}
                        size={verticalScale(24)}
                        color={'rgba(1,1,1,0.4)'}
                      />
                    </TouchableOpacity>
                  }
                  secureTextEntry={showRePass}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.actionView}>
              <BaseButton
                title="Đăng Ký"
                style={styles.login}
                titleStyle={styles.titleStyle}
                onPress={signinPress}
              />
              <View style={styles.view3}>
                <TextBase
                  title={'Đã có tài khoản? '}
                  style={styles.textStyle}
                />
                <TouchableOpacity style={styles.ggPress} onPress={loginPress}>
                  {/* <Icon name='Google-plus' color='blue' size={verticalScale(30)} /> */}
                  {/* <TouchableOpacity
                                        style={styles.touchableOpacity}
                                        onPress={signinPress}
                                    > */}
                  <TextBase title="Đăng nhập" style={styles.signin} />
                  {/* </TouchableOpacity> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SigninScreen;

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
    flex: 2,
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
    // width: verticalScale(40),
    // height: verticalScale(40),
    // borderWidth: 1,
    // borderRadius: verticalScale(20),
    // alignItems: 'center',
    // justifyContent: 'center',
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
});
