import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from '../../../components/Icon';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import {useAppSelector} from '../../../stores';

const PostedManagedScreen = () => {
  const {userInfo} = useAppSelector(state => state);
  console.log('userInfo', userInfo);

  const options = [
    {
      id: 0,
      title: 'Tất cả bài đăng',
      icon: 'file-text2',
      color: 'green',
      backgroundColor: '#ECFFCC',
      onPress: () => {
        NavigationService.navigate(routes.MY_POST_MANAGE_SCREEN);
      },
    },
    {
      id: 1,
      title: 'Đăng tin mới',
      icon: 'upload3',
      color: '#4A1DFC',
      // backgroundColor: '#EBFFBF',
      backgroundColor: '#BFE8FF',
      onPress: () => {
        NavigationService.navigate(routes.POST_FORM_SCREEN);
      },
    },
    // {
    //     id: 2,
    //     title: 'Cài đặt',
    //     icon: 'Settings',
    //     backgroundColor: '#BFE8FF',
    //     onPress: () => {  }
    // },
    // {
    //     id: 3,
    //     title: 'Thông tin',
    //     icon: 'Information',
    //     color: '#28F59C',
    //     backgroundColor: '#EBBFFF',
    //     onPress: () => {}
    // },
  ];
  const renderCard = (title: string, total: number, icon: any, size = 18) => {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: verticalScale(120),
          // borderWidth: 1,
          borderRadius: verticalScale(10),
          backgroundColor: '#6FA5F6',
          padding: verticalScale(16),
          marginHorizontal: verticalScale(16),
        }}
      >
        <TextBase
          title={title}
          style={{
            fontSize: verticalScale(18),
            color: 'white',
            fontWeight: '600',
          }}
        />
        <View style={{flex: 1}} />
        <View style={styles.viewCard}>
          <TextBase
            title={total}
            style={{
              fontSize: verticalScale(20),
              color: '#95FBCA',
              fontWeight: 'bold',
              marginRight: verticalScale(8),
            }}
          />
          <Icon name={icon} size={verticalScale(size)} color="white" />
        </View>
      </View>
    );
  };
  const renderButtonList = (item: any) => {
    return (
      <View
        key={item?.id}
        style={{
          // borderWidth: 1,
          margin: verticalScale(16),
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
          <View
            style={{
              width: verticalScale(50),
              height: verticalScale(50),
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: verticalScale(25),
            }}
          >
            <Icon
              name={item.icon}
              color={item?.color}
              size={verticalScale(20)}
            />
          </View>
          <TextBase
            title={item.title}
            style={{
              marginLeft: verticalScale(16),
              fontSize: verticalScale(18),
              fontWeight: 'bold',
            }}
          />
          <View style={{flex: 1}} />
          <Icon
            name={'chevron-right'}
            color={item?.color}
            size={verticalScale(20)}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextBase title={'Quản lý bài đăng'} style={styles.title} />
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            // borderWidth: 1,
            height: verticalScale(150),
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginBottom: verticalScale(30),
          }}
        >
          {renderCard('Số lượng bài đã đăng', userInfo.totalPost, 'file-text2')}
          {/* {renderCard('Tổng số lượng xem', 5923, 'private')} */}
        </View>
        {options.map((item: any) => renderButtonList(item))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostedManagedScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: verticalScale(24),
    fontWeight: 'bold',
    marginHorizontal: verticalScale(16),
    marginVertical: verticalScale(30),
  },
  viewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
