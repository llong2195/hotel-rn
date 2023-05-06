import React, {useEffect, useState} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';

import BaseList from '../../../components/BaseList';
import HeaderView from '../../../components/HeaderView';
import PostSumaryCard from '../../../components/PostSumaryCard';
import {verticalScale} from '../../../components/Scales';
import {Posts} from '../../../entities/Post';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import {useAppDispatch, useAppSelector} from '../../../stores';
import * as PostActions from '../../../stores/Post/Actions';
import {convertPostDataFromServerToPostCard} from '../../../utils/PostUtils';

interface Props {
  route?: any;
}
const ListPostScreen = (props: Props) => {
  const {route} = props;
  const {posts} = useAppSelector(state => state);
  const [data, setData] = useState<Posts[]>([]);
  const {type} = route?.params;
  useEffect(() => {
    switch (type) {
      case 0:
        setData(posts.posteds || []);
        break;
      case 1:
        setData(posts.search || []);
        break;

      default:
        break;
    }
  }, [posts]);
  const dispatch = useAppDispatch();

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
  return (
    <View style={styles.container}>
      <HeaderView title="Danh sách" iconLeft="Backward-arrow-small" />
      <ScrollView style={styles.scrollView}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingVertical: verticalScale(16),
  },
});

export default ListPostScreen;
