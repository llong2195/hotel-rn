import React, {useEffect, useState} from 'react';

import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import BaseList from '../../../components/BaseList';
import HeaderView from '../../../components/HeaderView';
import PostSumaryCard from '../../../components/PostSumaryCard';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import {colors} from '../../../constants';
import {Posts} from '../../../entities/Post';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import postServices from '../../../services/PostServices';
import {useAppSelector} from '../../../stores';
import {convertPostDataFromServerToPostCard} from '../../../utils/PostUtils';

enum Tabs {
  DaDang = 'Dadang',
  DaLuu = 'Daluu',
  DaHuy = 'Dahuy',
}
const routesTab = [
  {key: Tabs.DaDang, title: 'Đã Đăng'},
  {key: Tabs.DaLuu, title: 'Đã Lưu'},
  // { key: Tabs.DaHuy, title: 'Đã hủy' },
];
const MyPostManageScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [posted, setPosted] = useState<Posts[]>([]);
  const [saved, setSaved] = useState<Posts[]>([]);
  const layout = useWindowDimensions();
  const {userInfo} = useAppSelector(state => state);
  useEffect(() => {
    R.Loading.show();
    void getPosted();
    void getSaved();
    // R.Loading.hide()
  }, []);
  const getPosted = async () => {
    const res = await postServices.searchPost({
      authorId: userInfo.id,
    });
    if (!res.errorCode) {
      setPosted(res.posteds);
    }
    R.Loading.hide();
  };
  const getSaved = async () => {
    const res = await postServices.getUserSave();
    console.log('res', res.save);

    if (!res.errorCode) {
      setSaved(res.save);
    }
  };
  const onSavePress = async (id: number, status: number) => {
    setSaved(saved.filter(i => i.id != id));
  };
  const renderPostedView = ({item}: {item: Posts}) => {
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

  const renderPosted = () => {
    return (
      <View style={styles.tabView}>
        <BaseList
          data={posted}
          renderItem={renderPostedView}
          onRefreshProp={() => {}}
          isRefresh={false}
          horizontal={undefined}
          scrollIndex={undefined}
          renderHeaderComponent={undefined}
          keyExtractor={undefined}
          renderEmptyComponent={undefined}
        />
      </View>
    );
  };
  const renderSaved = () => {
    return (
      <View style={styles.tabView}>
        <BaseList
          data={saved}
          renderItem={renderPostedView}
          onRefreshProp={() => {}}
          isRefresh={false}
          horizontal={undefined}
          scrollIndex={undefined}
          renderHeaderComponent={undefined}
          keyExtractor={undefined}
          renderEmptyComponent={undefined}
        />
      </View>
    );
  };
  // const renderDelete = () => {
  //     return <View style={styles.tabView}>
  //         <BaseList
  //                 data={delPost}
  //                 renderItem={renderPostedView}
  //                 onRefreshProp={() => { }}
  //                 isRefresh={false}
  //                 horizontal={undefined}
  //                 scrollIndex={undefined}
  //                 renderHeaderComponent={undefined}
  //                 keyExtractor={undefined}
  //                 renderEmptyComponent={undefined}
  //             />
  //     </View>
  // }
  const renderScene = SceneMap({
    Dadang: renderPosted,
    Daluu: renderSaved,
    // Dahuy: renderDelete,
  });
  const _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        activeColor={'black'}
        inactiveColor={colors.grayColor}
        style={{
          backgroundColor: 'white',
        }}
        labelStyle={{
          fontSize: verticalScale(12),
          fontWeight: '600',
        }}
        indicatorStyle={{
          backgroundColor: colors.greenColor,
        }}
        bounces={true}
        pressColor={'white'}
        pressOpacity={0}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <HeaderView title="Bài đăng của tôi" iconLeft="Backward-arrow-small" />
      <TabView
        navigationState={{index, routes: routesTab}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={_renderTabBar}
      />
    </View>
  );
};

export default MyPostManageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabView: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: verticalScale(8),
  },
});
