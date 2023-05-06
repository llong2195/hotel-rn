import React, {useEffect, useState} from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import BaseList from '../../../components/BaseList';
import HeaderView from '../../../components/HeaderView';
import Icon from '../../../components/Icon';
import PostSumaryCard from '../../../components/PostSumaryCard';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';
import {colors} from '../../../constants/colors';
import {Author} from '../../../entities/Author';
import {Posts} from '../../../entities/Post';
import {Report} from '../../../entities/Report';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import postServices from '../../../services/PostServices';
import {useAppDispatch} from '../../../stores';
import * as PostActions from '../../../stores/Post/Actions';
import {convertPostDataFromServerToPostCard} from '../../../utils/PostUtils';

interface Props {
  route?: any;
}
enum Tabs {
  Info = 'Info',
  Report = 'Report',
}
const routesTab = [
  {key: Tabs.Info, title: 'Bài đăng khác'},
  {key: Tabs.Report, title: 'Phản hồi'},
];
const UserDetailScreen = (props: Props) => {
  const {author}: {author: Author} = props.route?.params;

  const [index, setIndex] = React.useState(0);
  const [posted, setPosted] = useState<Posts[]>([]);
  const [reportList, setReportList] = useState<Report[]>([]);
  const layout = useWindowDimensions();
  useEffect(() => {
    R.Loading.show();
    void getPosted();
    void getReport();
    // R.Loading.hide()
    // setPosted(postServices.getPosted() || [])
  }, []);
  const getReport = async () => {
    const res = await postServices.getReport({reportedUser: author.id});
    if (!res.errorCode) {
      setReportList(res.report);
    }
    R.Loading.hide();
  };
  const getPosted = async () => {
    const res = await postServices.searchPost({authorId: author.id});
    if (!res.errorCode) {
      setPosted(res.posteds);
    }
    R.Loading.hide();
  };
  const dispatch = useAppDispatch();

  const onSavePress = async (id: number, status: number) => {
    dispatch(PostActions.updatePostJob({id, status}));
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
  const renderReportList = ({item}: {item: Report}) => {
    return (
      <View
        style={{
          marginHorizontal: verticalScale(16),
          marginVertical: verticalScale(5),
          padding: verticalScale(8),
          // borderWidth: 1,
          borderRadius: 10,
          backgroundColor: '#F3F3F3',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            marginBottom: verticalScale(4),
          }}
        >
          <TextBase
            title={item.username}
            style={{
              fontSize: verticalScale(16),
              fontWeight: '700',
            }}
          />
          <TextBase
            title={item.createdAt.slice(0, 10)}
            style={{
              alignSelf: 'flex-end',
              color: colors.grayColor,
            }}
          />
        </View>
        <TextBase
          title={item.note}
          style={{
            fontSize: verticalScale(14),
            fontWeight: '400',
          }}
        />
      </View>
    );
  };
  const renderReport = () => {
    return (
      <View style={styles.tabView}>
        <BaseList
          data={reportList}
          renderItem={renderReportList}
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
  const renderScene = SceneMap({
    Info: renderPosted,
    Report: renderReport,
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
  const onReportPress = () => {};
  const renderSave = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={onReportPress}
          style={{
            width: verticalScale(30),
            height: verticalScale(30),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="report" size={verticalScale(30)} color="#FF375F" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderView
        title="Thông tin người dùng"
        iconLeft="Backward-arrow-small"
        // renderRight={() => renderSave()}
      />
      <View style={styles.view}>
        <View
          style={{
            width: verticalScale(100),
            height: verticalScale(100),
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{uri: author.avatar}}
            style={{
              width: verticalScale(100),
              height: verticalScale(100),
            }}
            resizeMode={'cover'}
          />
        </View>
        <View
          style={{
            marginLeft: verticalScale(16),
          }}
        >
          <TextBase
            title={author.name}
            style={{
              fontSize: verticalScale(16),
              fontWeight: '700',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: verticalScale(4),
            }}
          >
            <Icon name="phone" size={verticalScale(16)} />

            <TextBase
              title={author.phoneNumber}
              style={{
                fontSize: verticalScale(14),
                marginLeft: verticalScale(8),
                fontWeight: '400',
              }}
            />
          </View>
          {author.address ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(4),
              }}
            >
              <Icon name="location2" size={verticalScale(16)} />

              <TextBase
                title={author.address}
                style={{
                  fontSize: verticalScale(14),
                  marginLeft: verticalScale(8),
                  fontWeight: '400',
                }}
              />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              marginTop: verticalScale(4),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(4),
              }}
            >
              <Icon name="file-text2" size={verticalScale(16)} />
              <TextBase
                title={author.totalPost}
                style={{marginLeft: verticalScale(8)}}
              />
            </View>
            {/* <View style={{
                            flexDirection: 'row',
                            marginTop: verticalScale(4),
                             marginLeft: verticalScale(16)
                        }}>
                            <Icon name='star-empty' size={verticalScale(16)} />
                            <TextBase title={user.score} style={{marginLeft: verticalScale(8),}}/>
                        </View> */}
          </View>
        </View>
      </View>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    flexDirection: 'row',
    margin: verticalScale(16),
  },
  tabView: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: verticalScale(8),
  },
});

export default UserDetailScreen;
export default UserDetailScreen;
