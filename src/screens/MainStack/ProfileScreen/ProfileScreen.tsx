import React from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import HeaderView from '../../../components/HeaderView';
import Icon from '../../../components/Icon';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import {useAppDispatch, useAppSelector} from '../../../stores';
import * as AuthActions from '../../../stores/Auth/Actions';
import * as UserActions from '../../../stores/UserInfo/Actions';

interface Props {
  isUser?: boolean;
}
const ProfileScreen = (props: Props) => {
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state);
  // console.log('userInfo',userInfo);

  const {isUser = true} = props;
  const options = [
    {
      id: 0,
      title: 'Quản lý tài khoản',
      icon: 'account_fill',
      color: 'green',
      onPress: () => {
        NavigationService.navigate(routes.USER_MANAGED_SCREEN);
      },
    },
    // {
    //     id: 1,
    //     title: 'Quản lý bài đăng',
    //     icon: 'Group-12855',
    //     color: '#4A1DFC',
    //     onPress: () => { NavigationService.navigate(routes.POSTED_MANAGED_SCREEN) }
    // },
    // {
    //     id: 1,
    //     title: 'Cài đặt',
    //     icon: 'Settings',
    //     onPress: () => { NavigationService.navigate(routes.SETTINGS_SCREEN) }
    // },
    {
      id: 3,
      title: 'Thông tin',
      icon: 'Information',
      color: '#28F59C',
      onPress: () => {
        NavigationService.navigate(routes.INFOMATION_SCREEN);
      },
    },
    {
      id: 4,
      title: 'Đăng xuất',
      icon: 'logout',
      color: 'red',
      onPress: () => {
        dispatch(AuthActions.logoutCompleted());
      },
    },
  ];
  const userDetail = () => {
    return (
      <View style={styles.userView}>
        {options.map((item: any) => renderButtonList(item))}
      </View>
    );
  };
  const viewDetail = () => {
    return options.map((item: any) => renderButtonList(item));
  };
  const renderButtonList = (item: any) => {
    return (
      <View key={item?.id}>
        {item.id == 3 ? (
          <View
            style={{
              borderWidth: 0.6,
              width: '90%',
              alignSelf: 'center',
              borderColor: '#E5E0E0',
              marginVertical: verticalScale(16),
            }}
          />
        ) : null}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#F7EFEC', '#EAF4E6', '#D9F9F5']}
          style={{
            // flexDirection: 'row',
            marginVertical: verticalScale(8),
            marginHorizontal: verticalScale(12),
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#CBC7C7',
            // alignContent: 'center',
            // justifyContent: 'center',
            height: verticalScale(44),
          }}
        >
          <TouchableOpacity
            key={item.id}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: verticalScale(16),
            }}
            onPress={item.onPress}
          >
            <Icon
              name={item.icon}
              color={item?.color}
              size={verticalScale(18)}
            />
            <TextBase
              title={item.title}
              style={{
                marginLeft: verticalScale(16),
                fontSize: verticalScale(18),
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };
  const renderDetail = () => {
    switch (isUser) {
      case true:
        return userDetail();
      case false:
        return viewDetail();
      default:
        break;
    }
    // return userDetail();
  };
  const onPressReload = () => {
    R.Loading.show();
    console.log('reloadUser', userInfo.code);

    dispatch(UserActions.reloadUser(userInfo.code));
    R.Loading.hide();
  };
  const renderRight = () => {
    return (
      <TouchableOpacity
        onPress={onPressReload}
        style={{
          width: verticalScale(20),
          height: verticalScale(20),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="loop2" size={verticalScale(20)} color="#FF375F" />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderView title="Hồ sơ" renderRight={() => renderRight()} />
      <ScrollView style={styles.view}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#F39671', '#C3F0AF', '#26E8CE']}
          style={styles.avatar}
        >
          <Image
            source={{uri: userInfo.avatar}}
            resizeMode="cover"
            style={{
              width: verticalScale(100),
              height: verticalScale(100),
              borderRadius: verticalScale(50),
              alignSelf: 'center',
            }}
          ></Image>
        </LinearGradient>
        <TextBase title={userInfo.name} style={styles.name} />
        <View
          style={{
            borderWidth: 1,
            width: '80%',
            alignSelf: 'center',
            borderColor: '#F3F4CD',
          }}
        />
        <View style={styles.view2}>
          {/* <View style={styles.follow}>
                        <View style={styles.follow1}>
                            <TextBase title={'Bài Đăng'} style={styles.scores} />
                            <TextBase title={'203'} style={styles.scoresText} />
                        </View>
                        <View style={styles.follow1}>
                            <TextBase title={'Đánh giá'} style={styles.scores} />
                            <TextBase title={'5.0'} style={styles.scoresText} />
                        </View>
                    </View> */}
          {renderDetail()}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    backgroundColor: '#E9E9E9',
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
  name: {
    fontSize: verticalScale(20),
    fontWeight: '700',
    alignSelf: 'center',
    marginVertical: verticalScale(16),
  },
  view2: {
    flex: 1,
    marginVertical: verticalScale(16),
  },
  follow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  scores: {
    fontSize: verticalScale(14),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  scoresText: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    // marginBottom: verticalScale(8)
  },
  follow1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userView: {
    // flex: 1,
    // borderWidth: 1,
    marginTop: verticalScale(16),
    marginHorizontal: verticalScale(16),
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: verticalScale(8),
    paddingVertical: verticalScale(16),
  },
});
