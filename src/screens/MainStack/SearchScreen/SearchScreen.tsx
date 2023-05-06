import React, {useEffect, useState} from 'react';

import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';

import BaseList from '../../../components/BaseList';
import HeaderView from '../../../components/HeaderView';
import PostSumaryCard from '../../../components/PostSumaryCard';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import {Posts} from '../../../entities/Post';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import postServices from '../../../services/PostServices';
import {convertPostDataFromServerToPostCard} from '../../../utils/PostUtils';

interface Props {
  route?: any;
}
const SearchScreen = (props: Props) => {
  const {params} = props.route;
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState<Posts[]>([]);
  useEffect(() => {
    onRefresh();
  }, [params]);
  const searchPost = async (params: any) => {
    R.Loading.show();
    const res = await postServices.searchPost({...params, status: 0});
    if (!res.errorCode) {
      setData(res.posteds);
      R.Loading.hide();
    } else {
      R.Loading.hide();
      R.showMessage({
        message: res.errorMsg,
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
    }
  };
  const onSavePress = async (id: number, status: number) => {
    setData(data.map((i: any) => (i.id === id ? {...i, isSave: status} : i)));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log('refreshing');
    void searchPost(params);
    setRefreshing(false);
  }, []);
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
  return (
    <View style={styles.container}>
      <HeaderView title="Tìm kiếm" iconLeft="Backward-arrow-small" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <View style={{
                    flexDirection: 'row',
                    margin: verticalScale(16),
                    alignItems: 'center'
                }}>
                    <TextBase title={'Bạn muốn tìm kiếm chi tiết?  '} style={{ fontSize: verticalScale(16), }} />
                    <TouchableOpacity style={{}} onPress={searchAdvance}>
                        <TextBase title={'Bấm vào đây!'} style={{
                            fontSize: verticalScale(18),
                            fontWeight: '700'
                        }} />
                    </TouchableOpacity>
                </View> */}
        <BaseList
          data={data}
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
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginVertical: verticalScale(16),
  },
  inputStyle: {
    marginHorizontal: 0,
    marginBottom: verticalScale(20),
    marginTop: verticalScale(16),
    backgroundColor: '#EFEFEF',
  },
});
