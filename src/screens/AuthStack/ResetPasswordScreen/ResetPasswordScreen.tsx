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

interface Props {
  route: any;
}
const ResetPasswordScreen = (props: Props) => {
  // const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);
  const onChangeText = (value: string, type: number) => {
    switch (type) {
      case 0:
        // setSdt(value);
        setPassword(value);
        break;
      case 1:
        setRePassword(value);
        break;
      default:
        break;
    }
  };
  // console.log('props',props);

  const loginPress = () => {
    console.log('loginPress');
    NavigationService.popUpToTop();
  };

  const nextPress = async () => {
    const res = await authServices.updatePassword(
      props.route?.params?.phoneNumber,
      password,
      rePassword,
    );
    // console.log('signinPress', res,props.route?.params?.phoneNumber);
    if (!res.errorCode) {
      R.showMessage({
        message: res.errorMsg,
        type: 'success',
        icon: 'success',
        autoHide: true,
      });
      NavigationService.popUpToTop();
    } else {
      R.showMessage({
        message: res.errorMsg,
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
    }
    return;
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

                <TextBase style={styles.inputText}>Mật khẩu</TextBase>
                <TextInputBase
                  style={styles.inputStyle}
                  type="default"
                  onChangeText={value => onChangeText(value, 0)}
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
                  onChangeText={value => onChangeText(value, 1)}
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
                title="Tiếp tục"
                style={styles.login}
                titleStyle={styles.titleStyle}
                onPress={nextPress}
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
export default ResetPasswordScreen;

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
