import React, {useEffect, useState} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';

import BaseButton from '../../../components/BaseButton';
import BaseUploadImage from '../../../components/BaseUploadImage';
import HeaderView from '../../../components/HeaderView';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';
import TextInputBase from '../../../components/TextInputBase';
import {GenderType} from '../../../constants';
import userService from '../../../services/UserService';
import {useAppDispatch, useAppSelector} from '../../../stores';
import * as UserActions from '../../../stores/UserInfo/Actions';

interface Props {
  route?: any;
}
const UserManagedScreen = (props: Props) => {
  const {userInfo} = useAppSelector(state => state);
  const state = useAppSelector(state => state);
  console.log('userInfo', userInfo, state);
  const dispatch = useAppDispatch();
  const modalOptionImgAvatar = React.createRef();
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(userInfo.name);
  const [phoneNumber, setPhoneNumber] = useState<string>(userInfo.phoneNumber);
  const [email, setEmail] = useState<string | null>(userInfo.email || null);
  const [address, setAddress] = useState<string | null>(
    userInfo.address || null,
  );
  const [gender, setGender] = useState<number>(userInfo.gender || 0);
  const [avatar, setAvatar] = useState<string>(userInfo.avatar || '');
  const [avatarLocal, setAvatarLocal] = useState<string>(userInfo.avatar || '');
  useEffect(() => {}, []);

  const renderWhenIsUser = () => {
    return (
      <ScrollView style={styles.view1}>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => modalOptionImgAvatar?.current?.onOpenModal()}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#F39671', '#C3F0AF', '#26E8CE']}
            style={[
              styles.avatar,
              {backgroundColor: 'transparent', marginTop: 0},
            ]}
          >
            <Image
              source={{uri: avatar || avatarLocal}}
              resizeMode="cover"
              style={{
                width: verticalScale(100),
                height: verticalScale(100),
                borderRadius: verticalScale(50),
                alignSelf: 'center',
              }}
            ></Image>
            {/* <Icon name='camera' size={verticalScale(30)} color='black' /> */}
          </LinearGradient>
        </TouchableOpacity>
        <View style={{flex: 1, margin: verticalScale(16)}}>
          <>
            <TextBase title={'Họ tên'} style={styles.title} />
            <TextInputBase
              style={styles.inputStyle}
              // type='numeric'
              onChangeText={setName}
              placeholder={'Nhập họ tên'}
              initValue={name} // initValue={value}
            />
          </>
          <>
            <TextBase title={'Số điện thoại'} style={styles.title} />
            <TextInputBase
              style={styles.inputStyle}
              // type='numeric'
              onChangeText={setPhoneNumber}
              placeholder={'Nhập số điện thoại'}
              initValue={phoneNumber}
              disabled // initValue={value}
            />
          </>
          <>
            <TextBase title={'Email'} style={styles.title} />
            <TextInputBase
              style={styles.inputStyle}
              // type='numeric'
              onChangeText={setEmail}
              placeholder={'Nhập email'}
              initValue={email || ''}
            />
          </>
          <>
            <TextBase title={'Địa chỉ'} style={styles.title} />
            <TextInputBase
              style={styles.inputStyle}
              // type='numeric'
              onChangeText={setAddress}
              placeholder={'Nhập địa chỉ'}
              initValue={address || ''}
            />
          </>
          <>
            <TextBase title={'Giới tính'} style={styles.title} />
            {/* <View style={{
                        flex: 1,
                        }}> */}
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              schema={{
                label: 'name',
                value: 'id',
              }}
              items={GenderType}
              value={gender}
              setValue={setGender}
              textStyle={{
                fontSize: verticalScale(14),
              }}
              style={{
                height: verticalScale(45),
              }}
            />
            {/* </View> */}
          </>
        </View>
        {checkUpdateData() ? (
          <BaseButton
            title="Cập nhật"
            style={styles.update}
            titleStyle={styles.updateText}
            onPress={onUpdatePress}
          />
        ) : null}
      </ScrollView>
    );
  };
  const checkUpdateData = () => {
    if (name != userInfo.name) return true;
    if (phoneNumber != userInfo.phoneNumber) return true;
    if (email != userInfo.email) return true;
    if (gender != userInfo.gender) return true;
    if (address != userInfo.address) return true;
    return false;
  };
  const onUpdatePress = async () => {
    R.Loading.show();
    let dataUpdate = {
      // ...userInfo,
      id: userInfo.id,
      name,
      email,
      gender,
      address,
    };
    console.log('user', dataUpdate);
    const user = await userService.updateUserInfo(userInfo.id, dataUpdate);
    if (user.errorCode) {
      R.Loading.hide();
      R.showMessage({
        message: user.errorMsg,
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
    } else {
      dispatch(UserActions.reloadUser(userInfo.code));
      R.Loading.hide();
      R.showMessage({
        message: 'Cập nhật thông tin thành công',
        type: 'success',
        icon: 'success',
        autoHide: true,
      });
    }
    R.Loading.hide();
  };
  const updateAvatar = async (imge: string) => {
    await userService
      .updateUserInfo(userInfo.id, {id: userInfo.id, avatar: imge})
      .then(res => dispatch(UserActions.reloadUser(userInfo.code)));
  };
  return (
    <View style={styles.container}>
      <HeaderView title="Thay đổi thông tin" iconLeft="Backward-arrow-small" />

      {renderWhenIsUser()}

      <BaseUploadImage
        ref={modalOptionImgAvatar}
        imgUri={(imgUri: string, imgLocal: string) => {
          console.log('image', imgUri, imgLocal);
          setAvatar(imgUri);
          setAvatarLocal(imgLocal);
          void updateAvatar(imgUri);
        }}
        buttonText={'Huỷ bỏ'}
        buttonStyle={{}}
        // multiSelect={true}
      />
    </View>
  );
};

export default UserManagedScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    flex: 1,
  },
  avatar: {
    width: verticalScale(110),
    height: verticalScale(110),
    alignSelf: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(60),
    marginTop: verticalScale(30),
  },
  inputStyle: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    marginBottom: verticalScale(20),
    // margin: verticalScale(16),
    // width:'90%'
  },
  title: {
    fontSize: verticalScale(16),
    fontWeight: '700',
    marginBottom: verticalScale(16),
  },
  update: {
    width: verticalScale(343),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  updateText: {
    fontSize: verticalScale(16),
    fontWeight: 'bold',
  },
});
