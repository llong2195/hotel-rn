import React, {useEffect, useState} from 'react';

import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import BaseList from '../../../components/BaseList';
import Icon from '../../../components/Icon';
import PostSumaryCard from '../../../components/PostSumaryCard';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';
import {PostType} from '../../../constants';
import {Posts} from '../../../entities/Post';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import {useAppDispatch, useAppSelector} from '../../../stores';
import * as PostActions from '../../../stores/Post/Actions';
import {convertPostDataFromServerToPostCard} from '../../../utils/PostUtils';

const HomeScreen = () => {
  const state = useAppSelector(state => state);
  const [postList, setPostList] = useState<Posts[]>([]);
  const [postSearch, setPostSearch] = useState<Posts[]>([]);
  const {userInfo, posts} = useAppSelector(state => state);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setPostList(posts.posteds);
    setPostSearch(posts.search);
  }, [posts]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    onRefresh();
  }, []);
  const onSavePress = async (id: number, status: number) => {
    dispatch(PostActions.updatePostJob({id, status}));
  };
  const renderPosted = ({item}: {item: Posts}) => {
    let newItem = convertPostDataFromServerToPostCard(item);

    return (
      <PostSumaryCard
        data={newItem}
        onPress={() =>
          NavigationService.navigate(routes.POST_DETAIL_SCREEN, {
            data: item,
            callBack: (id: number, status: number) => onSavePress(id, status),
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setSavePost={(id: number, status: number) => onSavePress(id, status)}
        id={newItem.id}
        author={newItem.author}
        title={newItem.title}
        detail={newItem.detail}
        postTime={newItem.postTime}
        price={newItem.price}
        address={newItem.address}
        postType={newItem.postType}
        status={newItem.status}
        image={newItem.image}
        isSave={newItem.isSave}
      />
    );
  };
  const renderTilte = (title: string, icon: any, color: any, type = 1) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: verticalScale(16),
          marginHorizontal: verticalScale(16),
          // borderWidth: 1,
          padding: 8,
          backgroundColor: '#D7F4F4',
          alignItems: 'center',
          // flex:1
        }}
      >
        <Icon
          name={icon}
          color={color}
          size={verticalScale(20)}
          style={{marginRight: verticalScale(16)}}
        />
        <TextBase title={title} style={styles.title} />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate(routes.LISTS_POST_SCREEN, {type})
          }
        >
          <TextBase
            title={'Xem tất cả'}
            style={{textDecorationLine: 'underline'}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const onAvatarPress = () => {
    NavigationService.navigate(routes.USER_MANAGED_SCREEN);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log('refreshing');

    dispatch(PostActions.getPosted());
    dispatch(PostActions.getSearch());
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            // borderWidth: 1
          }}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#DFF2BD', '#8EE0F5', '#7AB2F4']}
          >
            <TextBase title={'Motel Room'} style={styles.appname} />
          </LinearGradient>
        </View>
        {/* <TouchableOpacity onPress={() => { }}>
                    <Icon name='bell' size={verticalScale(23)} color='white' />
                </TouchableOpacity> */}
        <TouchableOpacity style={{}} onPress={onAvatarPress}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#F39671', '#C3F0AF', '#26E8CE']}
            style={styles.avatar}
          >
            <Image
              source={{
                uri: userInfo
                  ? userInfo.avatar
                  : 'https://i.pinimg.com/564x/9b/11/af/9b11af38ad8ae732de626cbb1e953ffc.jpg',
              }}
              resizeMode="cover"
              style={{
                width: verticalScale(45),
                height: verticalScale(45),
                borderRadius: verticalScale(50),
                alignSelf: 'center',
              }}
            ></Image>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          marginVertical: verticalScale(10),
          width: R.DEVICE_WIDTH,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <View style={{ marginHorizontal: verticalScale(16) }}>
                    {[0, 1, 2, 3].map(item => renderPosted(item))}
                </View> */}
        <TouchableOpacity
          style={{
            width: verticalScale(343),
            height: verticalScale(40),
            borderWidth: 1,
            // marginHorizontal:verticalScale(32)
            alignSelf: 'center',
            borderRadius: verticalScale(10),
            marginVertical: verticalScale(16),
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: verticalScale(16),
            borderColor: '#B5B5B5',
            flexDirection: 'row',
          }}
          onPress={() =>
            NavigationService.navigate(routes.SEARCH_ADVANCE_SCREEN)
          }
        >
          <TextBase title={'Tìm kiếm nâng cao'} style={{color: '#B5B5B5'}} />
          <View style={{flex: 1}} />
          <Icon name="Search" size={verticalScale(20)} color="#B5B5B5" />
        </TouchableOpacity>
        {renderTilte('Cho thuê', 'home', 'green', PostType.POST)}
        <BaseList
          data={postList.slice(0, 5)}
          renderItem={renderPosted}
          onRefreshProp={() => {}}
          isRefresh={false}
          horizontal={undefined}
          scrollIndex={undefined}
          renderHeaderComponent={undefined}
          keyExtractor={undefined}
          renderEmptyComponent={undefined}
        />
        {renderTilte('Tìm phòng', 'Group-12855', 'green', PostType.SEARCH)}
        <BaseList
          data={postSearch.slice(0, 5)}
          renderItem={renderPosted}
          onRefreshProp={() => {}}
          isRefresh={false}
          horizontal={undefined}
          scrollIndex={undefined}
          renderHeaderComponent={undefined}
          keyExtractor={undefined}
          renderEmptyComponent={undefined}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // borderWidth:1
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: verticalScale(100),
    flexDirection: 'row',
    // marginHorizontal: verticalScale(16)
    paddingHorizontal: verticalScale(32),
    backgroundColor: '#C1BCF5',
    borderBottomLeftRadius: verticalScale(50),
    borderBottomRightRadius: verticalScale(50),
  },
  appname: {
    fontSize: verticalScale(30),
    // fontWeight: 'bold',
    fontFamily: 'Pattaya-Regular',
    margin: verticalScale(16),
    marginVertical: verticalScale(4),
  },
  districtSelected: {
    width: verticalScale(60),
    height: verticalScale(60),
    marginHorizontal: verticalScale(8),
    borderWidth: 1,
  },
  posted: {
    width: verticalScale(364),
    height: verticalScale(160),
    borderWidth: 1,
    borderColor: '#E0DFDF',
    marginBottom: verticalScale(16),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: verticalScale(10),
    backgroundColor: '#F7F6D7',
    // paddingTop: verticalScale(16),
  },
  title: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
  },
  avatar: {
    width: verticalScale(50),
    height: verticalScale(50),
    alignSelf: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(60),
  },
});
