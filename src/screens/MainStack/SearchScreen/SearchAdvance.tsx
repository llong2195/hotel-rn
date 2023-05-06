import React, {useState} from 'react';

import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';

import BaseButton from '../../../components/BaseButton';
import DropdownList from '../../../components/DropdownList';
import HeaderView from '../../../components/HeaderView';
import Icon from '../../../components/Icon';
import InputBase from '../../../components/InputBase';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';
import TextInputBase from '../../../components/TextInputBase';
import {colors, PostTypes} from '../../../constants';
import {PostType} from '../../../entities/DataType';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import {getMoneyFormat} from '../../../utils/UtilsMoney';

const SearchAdvanceScreen = () => {
  // const [province, setProvince] = useState<Province>();
  // const [district, setDistrict] = useState<District>();
  // const [commune, setCommune] = useState<Commune>();
  // const [districtList, setDistrictList] = useState<District[]>([]);
  // const [communeList, setCommunetList] = useState<Commune[]>([]);
  const [minPrice, setMinPrice] = useState<string | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<string | undefined>(undefined);
  const [postType, setPostType] = useState<PostType>();
  const [shortTitle, setShortTitle] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  // useEffect(() => {
  //   let district = Districts.filter((dis: District) => dis.provinceId == province?.id)
  //   setDistrictList(district)
  // }, [province])
  // useEffect(() => {
  //   let commune = Communes.filter((dis: Commune) => dis.districtId == district?.id)
  //   setCommunetList(commune)
  // }, [district])
  const nextPress = () => {
    const searchParams = {
      postType: postType?.id,
      // provinceId: province?.id,
      // districtId: district?.id,
      // communeId: commune?.id,
      address: address || undefined,
      title: shortTitle || undefined,
      minPrice: minPrice?.split(/[,.\s]/).join('') || undefined,
      maxPrice: maxPrice?.split(/[,.\s]/).join('') || undefined,
    };
    NavigationService.navigate(routes.SEARCH_SCREEN, searchParams);
  };
  const onChangeText = (text: string, type = 0) => {
    switch (type) {
      case 0:
        setMinPrice(text);
        break;
      case 1:
        setMaxPrice(text);
        break;
      default:
        break;
    }
  };
  const onChangeTitle = (text: string) => {
    setShortTitle(text);
  };
  const onChangeAddress = (text: string) => {
    setAddress(text);
  };
  return (
    <View>
      <HeaderView iconLeft="Backward-arrow-small" title="Tìm kiếm chi tiết" />
      {/* /////////////////////////////////////////////////////////// */}

      <ScrollView style={styles.scrollview}>
        <KeyboardAvoidingView style={{}} behavior="position">
          {/* Chọn type */}
          <DropdownList
            data={PostTypes}
            onSelect={(index: number, item: PostType) => {
              setPostType(item);
            }}
            touchStyle={{width: '100%', alignSelf: 'center'}}
            viewStyle={{
              width: '100%',
              height: verticalScale(375),
            }}
            title={'Loại bài đăng'}
          >
            <InputBase
              titleInput={'Loại bài đăng'}
              style={{
                alignSelf: 'center',
                width: '90%',
                marginTop: verticalScale(30),
              }}
              initValue={''}
              onFocus={() => {}}
              placeholder={'Tất cả'}
              type={'NORMAL'}
              iconRight={() => {
                return <Icon name="times" size={18} />;
              }}
              iconRightStyle={{
                width: verticalScale(14),
                height: verticalScale(10),
              }}
              viewInsert
              viewInsertContent={
                postType ? (
                  <TextBase
                    title={postType?.name}
                    style={{color: colors.textColor}}
                  />
                ) : (
                  <TextBase
                    title={'Tất cả'}
                    style={{color: colors.borderColor}}
                  />
                )
              }
              pressIconRight={() => {}}
            />
          </DropdownList>
          {/* Chọn tỉnh thành */}

          {/* Từ khoá */}
          <View
            style={{
              // borderWidth: 1,
              marginHorizontal: verticalScale(20),
              marginTop: verticalScale(30),
            }}
          >
            <TextBase
              title={'Từ khoá tiêu đề'}
              style={{
                marginBottom: verticalScale(10),
                marginLeft: verticalScale(20),
                fontWeight: 'bold',
              }}
            />
            <TextInputBase
              style={[styles.inputStyle, {width: '100%'}]}
              // type='numeric'
              onChangeText={value => onChangeTitle(value)}
              placeholder="Nhập từ khoá tiêu đề"
              initValue={shortTitle || ''}
            />
          </View>
          {/* Địa chỉ */}
          <View
            style={{
              // borderWidth: 1,
              marginHorizontal: verticalScale(20),
              marginTop: verticalScale(30),
            }}
          >
            <TextBase
              title={'Địa chỉ'}
              style={{
                marginBottom: verticalScale(10),
                marginLeft: verticalScale(20),
                fontWeight: 'bold',
              }}
            />
            <TextInputBase
              style={[styles.inputStyle, {width: '100%'}]}
              // type='numeric'
              onChangeText={value => onChangeAddress(value)}
              placeholder="Nhập khu vực cần tìm"
              initValue={address || ''}
            />
          </View>
          {/* Khoảng giá */}
          <View
            style={{
              // borderWidth: 1,
              marginHorizontal: verticalScale(20),
              marginTop: verticalScale(30),
            }}
          >
            <TextBase
              title={'Khoảng giá'}
              style={{
                marginBottom: verticalScale(10),
                marginLeft: verticalScale(20),
                fontWeight: 'bold',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                // borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TextInputBase
                style={styles.inputStyle}
                // type='numeric'
                onChangeText={value => onChangeText(value, 0)}
                placeholder="Số tiền thấp nhất"
                initValue={getMoneyFormat(minPrice || '')}
              />
              <Icon name="arrow-right-thick" size={verticalScale(18)} />
              <TextInputBase
                style={styles.inputStyle}
                // type='numeric'
                onChangeText={value => onChangeText(value, 1)}
                placeholder="Số tiền cao nhất"
                initValue={getMoneyFormat(maxPrice || '')}
              />
            </View>
          </View>
          <BaseButton
            title="Tìm kiếm"
            style={styles.login}
            titleStyle={styles.titleStyle}
            onPress={nextPress}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default SearchAdvanceScreen;

const styles = StyleSheet.create({
  scrollview: {
    width: R.DEVICE_WIDTH,
  },
  inputStyle: {
    width: '45%',
    backgroundColor: 'white',
    marginHorizontal: 0,
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
});
