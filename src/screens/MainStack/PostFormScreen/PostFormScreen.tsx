import React, {useEffect, useState} from 'react';

import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';

import BaseButton from '../../../components/BaseButton';
import BaseUploadImage from '../../../components/BaseUploadImage';
import DropdownList from '../../../components/DropdownList';
import HeaderView from '../../../components/HeaderView';
import Icon from '../../../components/Icon';
import InputBase from '../../../components/InputBase';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';
import {colors, PostType} from '../../../constants';
import {Districts} from '../../../constants/Data/Districts';
import {Provinces} from '../../../constants/Data/Province';
import {WageUnitData} from '../../../constants/Data/WageUnit';
import {Commune} from '../../../entities/Commune';
import {WageUnit} from '../../../entities/DataType';
import {District} from '../../../entities/District';
import {Posts} from '../../../entities/Post';
import {Province} from '../../../entities/Province';
import NavigationService from '../../../navigation/NavigationService';
import postServices from '../../../services/PostServices';
import {useAppDispatch, useAppSelector} from '../../../stores';
import * as UserActions from '../../../stores/UserInfo/Actions';
import {getMoneyFormat} from '../../../utils/UtilsMoney';

interface Props {
  route?: any;
}
const PostFormScreen = (props: Props) => {
  const modalOptionImgAvatar = React.createRef();
  const [title, setTitle] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [postType, setPostType] = useState<number>(PostType.POST);
  const [price, setPrice] = useState<string>('');
  const [wageUnit, setWageUnit] = useState<WageUnit>(WageUnitData[0]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [images, setImages] = useState<any>([]);
  const [imagesLocal, setImagesLocal] = useState<any>([]);
  const {userInfo} = useAppSelector(state => state);
  const [height, setHeight] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [visibleReport, setVisibleReport] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [province, setProvince] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  useEffect(() => {
    setData();
  }, []);

  const setData = () => {
    if (props.route.params?.data) {
      setIsUpdate(true);
      const {data}: {data: Posts} = props.route.params;
      R.Loading.show();
      const addr = data.address.split(',');
      setTitle(data.title);
      setAddress(addr?.[0]);
      setProvince(
        Provinces.find((it: Province) => it.name == addr?.[2]) || {
          id: 0,
          name: addr?.[2],
        },
      );
      setCity(
        Districts.find((it: District) => it.name == addr?.[2]) || {
          id: 0,
          name: addr?.[1],
        },
      );
      setDetail(data.detail);
      setPostType(data.postType);
      setPrice(data.price?.toString() || '');
      setWageUnit(WageUnitData[data.timeUnit]);
      setMinPrice(data.minPrice?.toString() || '');
      setMaxPrice(data.maxPrice?.toString() || '');
      setImages(data.image.split(','));
      setImagesLocal(data.image.split(','));
      R.Loading.hide();
    }
  };
  console.log('pro', province, city);

  const onChangeTitleText = (text: string) => {
    setTitle(text);
  };
  const onChangeAddressText = (text: string) => {
    setAddress(text);
  };
  const onPress = (value: React.SetStateAction<number>) => {
    setPostType(value);
  };
  const onChangePriceText = (text: string) => {
    setPrice(text);
  };
  const onChangeDetailText = (text: string) => {
    setDetail(text);
  };
  const dispatch = useAppDispatch();
  const nextPress = async () => {
    console.log('post');
    if (!title) {
      R.showMessage({
        message: 'Chưa điền tiêu đề tin',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }
    if (!address) {
      R.showMessage({
        message: 'Chưa điền địa chỉ tin',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }
    if (!province || !city) {
      R.showMessage({
        message: 'Chưa điền khu vực',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }

    if (postType == PostType.POST) {
      if (!price) {
        R.showMessage({
          message: 'Chưa điền giá phòng',
          type: 'danger',
          icon: 'danger',
          autoHide: true,
        });
        return;
      }
    } else {
      if (!minPrice) {
        R.showMessage({
          message: 'Chưa điền giá thấp nhất',
          type: 'danger',
          icon: 'danger',
          autoHide: true,
        });
        return;
      }
      if (!maxPrice) {
        R.showMessage({
          message: 'Chưa điền giá cao nhất',
          type: 'danger',
          icon: 'danger',
          autoHide: true,
        });
        return;
      }
    }
    if (!detail) {
      R.showMessage({
        message: 'Chưa điền thông tin chi tiết',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }
    if (postType == 0) {
      R.Loading.show();
      let data = {
        authorId: userInfo.id,
        title,
        detail,
        price: price?.split(/[,.\s]/).join('') || undefined,
        time_unit: wageUnit.id,
        address: `${address},${city.name},${province.name}`,
        postType,
        image: images.toString(),
      };
      if (!isUpdate) {
        const res = await postServices.createPost(data);
        if (!res.errorCode) {
          R.Loading.hide();
          R.showMessage({
            message: 'Đăng bài thành công',
            type: 'success',
            icon: 'success',
            autoHide: true,
          });
          dispatch(
            UserActions.setUserBasicInfo({
              ...userInfo,
              totalPost: ++userInfo.totalPost,
            }),
          );
          NavigationService.back();
        } else {
          R.Loading.hide();
          R.showMessage({
            message: res.errorMsg,
            type: 'danger',
            icon: 'danger',
            autoHide: true,
          });
        }
        return;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const res = await postServices.updatePost(
          props.route.params.data.id,
          data,
        );
        if (!res.errorCode) {
          R.Loading.hide();
          R.showMessage({
            message: 'Cập nhật thành công',
            type: 'success',
            icon: 'success',
            autoHide: true,
          });
          // dispatch(UserActions.setUserBasicInfo({ ...userInfo, totalPost: ++userInfo.totalPost }))
          NavigationService.popUpToTop();
        } else {
          R.Loading.hide();
          R.showMessage({
            message: res.errorMsg,
            type: 'danger',
            icon: 'danger',
            autoHide: true,
          });
        }
      }
      return;
    } else {
      R.Loading.show();
      let data = {
        authorId: userInfo.id,
        title,
        detail,
        minPrice: minPrice?.split(/[,.\s]/).join('') || undefined,
        maxPrice: maxPrice?.split(/[,.\s]/).join('') || undefined,
        address: `${address},${province.name},${city.name}`,
        postType,
        image: images.toString(),
      };
      if (!isUpdate) {
        const res = await postServices.createPost(data);
        if (!res.errorCode) {
          R.Loading.hide();
          R.showMessage({
            message: 'Đăng bài thành công',
            type: 'success',
            icon: 'success',
            autoHide: true,
          });
          NavigationService.back();
        } else {
          R.Loading.hide();
          R.showMessage({
            message: res.errorMsg,
            type: 'danger',
            icon: 'danger',
            autoHide: true,
          });
        }
        return;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const res = await postServices.updatePost(
          props.route.params.data.id,
          data,
        );
        if (!res.errorCode) {
          R.Loading.hide();
          R.showMessage({
            message: 'Cập nhật thành công',
            type: 'success',
            icon: 'success',
            autoHide: true,
          });
          // dispatch(UserActions.setUserBasicInfo({ ...userInfo, totalPost: ++userInfo.totalPost }))
          NavigationService.popUpToTop();
        } else {
          R.Loading.hide();
          R.showMessage({
            message: res.errorMsg,
            type: 'danger',
            icon: 'danger',
            autoHide: true,
          });
        }
      }
    }
  };
  const renderImage = () => {
    return (
      <Modal
        visible={visibleReport}
        presentationStyle={'overFullScreen'}
        // animationType={animationType}
        onRequestClose={() => setVisibleReport(false)}
        supportedOrientations={['portrait']}
        hardwareAccelerated
        transparent
        animationType="fade"
        // style={{width:R.DEVICE_WIDTH,height:R.DEVICE_HEIGHT,borderWidth:1}}
      >
        <>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <TouchableOpacity
              style={{
                width: verticalScale(20),
                height: verticalScale(20),
                borderRadius: verticalScale(15),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                backgroundColor: 'black',
                position: 'absolute',
                top: 20,
                right: 20,
                zIndex: 10000,
              }}
              onPress={() => setVisibleReport(false)}
            >
              <Icon name="times" size={verticalScale(18)} color={'white'} />
            </TouchableOpacity>
            <Image
              style={{width: R.DEVICE_WIDTH, height: R.DEVICE_HEIGHT}}
              source={{uri: currentImage}}
              resizeMode="stretch"
            />
          </View>
        </>
      </Modal>
    );
  };

  const tapImage = (url: string) => {
    setCurrentImage(url);
    setVisibleReport(true);
  };
  console.log('imageState', images, imagesLocal);

  const deleteImage = (i: number) => {
    // console.log('image',images.filter(item=> (images.indexOf(item))!=index),imagesLocal.filter(item=> (imagesLocal.indexOf(item))!=index));
    setImages(images.filter((item: any, index: number) => index != i));
    setImagesLocal(
      imagesLocal.filter((item: any, index: number) => index != i),
    );
  };
  const renderForm = () => {
    const radio_props = [
      {label: 'Cho thuê', value: PostType.POST},
      {label: 'Tìm phòng', value: PostType.SEARCH},
    ];
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

    return (
      <View style={{flex: 1, margin: verticalScale(16)}}>
        {/* <KeyboardAvoidingView style={{ flex: 1, }} behavior='position'> */}
        {/* -------Post Type------------ */}
        <TextBase
          title={'Thể loại'}
          style={{
            fontSize: verticalScale(18),
            fontWeight: 'bold',
            marginBottom: verticalScale(8),
          }}
        />
        <View style={{marginBottom: verticalScale(20)}}>
          <RadioForm formHorizontal={true} animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {radio_props.map((obj, i) => (
              <RadioButton
                labelHorizontal={true}
                key={i}
                style={{justifyContent: 'center', alignItems: 'center'}}
              >
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={postType === obj.value}
                  onPress={onPress}
                  //   borderWidth={1}
                  buttonInnerColor={'#e74c3c'}
                  buttonOuterColor={postType === obj.value ? '#2196f3' : '#000'}
                  buttonSize={verticalScale(12)}
                  buttonOuterSize={verticalScale(24)}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: verticalScale(16)}}
                />
                <TextBase
                  title={obj.label}
                  style={{
                    fontSize: verticalScale(16),
                    fontWeight: '500',
                    marginLeft: verticalScale(8),
                  }}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
        {/* -------Tiêu đề tin---------- */}
        <TextBase
          title={'Tiêu đề tin'}
          style={{
            fontSize: verticalScale(18),
            fontWeight: 'bold',
            marginBottom: verticalScale(8),
          }}
        />
        {/* <TextInputBase
                style={styles.inputStyle}
                // type='numeric'
                onChangeText={text => onChangeTitleText(text)}
                placeholder='Nhập tiêu đề'
                initValue={title}
            /> */}
        <TextInput
          style={styles.inputStyle}
          onChangeText={text => onChangeTitleText(text)}
          value={title}
          placeholder="Nhập tiêu đề"
          placeholderTextColor={colors.grayColor}
        />
        {/* -------Địa chỉ---------- */}
        <>
          {postType == PostType.POST ? (
            <>
              <TextBase
                title={'Địa chỉ'}
                style={{
                  fontSize: verticalScale(18),
                  fontWeight: 'bold',
                  marginBottom: verticalScale(8),
                }}
              />
              {/* <TextInputBase
                            style={styles.inputStyle}
                            // type='numeric'
                            onChangeText={onChangeAddressText}
                            placeholder='Nhập địa chỉ'
                            initValue={address}
                        /> */}
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => onChangeAddressText(text)}
                value={address}
                placeholder="Nhập địa chỉ"
                placeholderTextColor={colors.grayColor}
              />
            </>
          ) : (
            <>
              <TextBase
                title={'Địa chỉ cần tìm kiếm'}
                style={{
                  fontSize: verticalScale(18),
                  fontWeight: 'bold',
                  marginBottom: verticalScale(8),
                }}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => onChangeAddressText(text)}
                value={address}
                placeholder="Nhập địa chỉ"
                placeholderTextColor={colors.grayColor}
              />
            </>
          )}
          <TextBase
            title={'Chọn Khu Vực'}
            style={{
              fontSize: verticalScale(18),
              fontWeight: 'bold',
              marginBottom: verticalScale(8),
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: verticalScale(16),
            }}
          >
            <DropdownList
              data={Provinces}
              onSelect={(index: number, item: Province) => {
                setProvince(item);
                setCity(null);
              }}
              touchStyle={{
                width: '49%',
              }}
              title={'Chọn Tỉnh thành'}
              filter={true}
            >
              <InputBase
                style={{alignSelf: 'center'}}
                initValue={''}
                onFocus={() => {}}
                placeholder={'Chọn Tỉnh '}
                type={'NORMAL'}
                iconRight={() => {
                  return <Icon name="times" size={18} />;
                }}
                iconRightStyle={{
                  width: verticalScale(14),
                  height: verticalScale(10),
                }}
                viewInsert
                viewInsertStyle={{width: verticalScale(150)}}
                viewInsertContent={
                  province ? (
                    <TextBase
                      title={province.name}
                      style={{
                        color: colors.textColor,
                      }}
                    />
                  ) : (
                    <TextBase
                      title={'Chọn Tỉnh thành'}
                      style={{color: colors.borderColor}}
                    />
                  )
                }
                pressIconRight={() => {}}
              />
            </DropdownList>
            <DropdownList
              data={Districts.filter(
                (it: District) => it.provinceId == province?.id,
              )}
              onSelect={(index: number, item: District) => {
                setCity(item);
              }}
              touchStyle={{
                width: '49%',
              }}
              title={'Chọn Quận huyện'}
              filter={true}
            >
              <InputBase
                style={{alignSelf: 'center'}}
                initValue={''}
                onFocus={() => {}}
                placeholder={'Chọn Quận huyện'}
                type={'NORMAL'}
                iconRight={() => {
                  return <Icon name="times" size={18} />;
                }}
                iconRightStyle={{
                  width: verticalScale(14),
                  height: verticalScale(10),
                }}
                viewInsertStyle={{width: verticalScale(150)}}
                viewInsert
                viewInsertContent={
                  city ? (
                    <TextBase
                      title={city.name}
                      style={{color: colors.textColor}}
                    />
                  ) : (
                    <TextBase
                      title={'Chọn Quận huyện'}
                      style={{color: colors.borderColor}}
                    />
                  )
                }
                pressIconRight={() => {}}
              />
            </DropdownList>
          </View>
        </>
        {/* -------Price------------ */}
        {postType == PostType.POST ? (
          <>
            <TextBase
              title={'Giá phòng'}
              style={{
                fontSize: verticalScale(18),
                fontWeight: 'bold',
                marginBottom: verticalScale(8),
              }}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <TextInput
                style={[
                  styles.inputStyle,
                  {width: verticalScale(400), marginBottom: 0, marginRight: 8},
                ]}
                onChangeText={text => onChangePriceText(text)}
                value={getMoneyFormat(price)}
                placeholder="Nhập số tiền"
                placeholderTextColor={colors.grayColor}
              />
              <DropdownList
                data={WageUnitData}
                onSelect={(index: number, item: Commune) => {
                  setWageUnit(item);
                }}
                touchStyle={{
                  width: '49%',
                }}
                title={'Thời gian đóng tiền'}
                filter={true}
              >
                <InputBase
                  style={{alignSelf: 'center'}}
                  initValue={''}
                  onFocus={() => {}}
                  placeholder={'Thời gian đóng tiền'}
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
                    wageUnit ? (
                      <TextBase
                        title={wageUnit.name}
                        style={{color: colors.textColor}}
                      />
                    ) : (
                      <TextBase
                        title={'Chọn thời gian'}
                        style={{color: colors.borderColor}}
                      />
                    )
                  }
                  pressIconRight={() => {}}
                />
              </DropdownList>
            </View>
          </>
        ) : (
          <>
            <TextBase
              title={'khoảng giá tìm kiếm'}
              style={{
                fontSize: verticalScale(18),
                fontWeight: 'bold',
                marginBottom: verticalScale(8),
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                // borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <TextInputBase
                                style={styles.priceInput}
                                // type='numeric'
                                onChangeText={value => onChangeText(value, 0)}
                                placeholder='Số tiền thấp nhấtSố tiền thấp nhất'
                                initValue={getMoneyFormat(minPrice)}
                            /> */}
              <TextInput
                style={[styles.inputStyle, {marginBottom: 0}]}
                onChangeText={text => onChangeText(text, 0)}
                value={getMoneyFormat(minPrice)}
                placeholder="Số tiền thấp nhất"
                placeholderTextColor={colors.grayColor}
              />
              <Icon name="arrow-right-thick" size={verticalScale(18)} />
              {/* <TextInputBase
                                style={styles.priceInput}
                                // type='numeric'
                                onChangeText={value => onChangeText(value, 1)}
                                placeholder='Số tiền cao nhất'
                                initValue={getMoneyFormat(maxPrice)}
                            /> */}
              <TextInput
                style={[styles.inputStyle, {marginBottom: 0}]}
                onChangeText={text => onChangeText(text, 1)}
                value={getMoneyFormat(maxPrice)}
                placeholder="Số tiền cao nhất"
                placeholderTextColor={colors.grayColor}
              />
            </View>
          </>
        )}
        {/* --------------Chi tiết---------------- */}
        <>
          <TextBase
            title={'Chi tiết'}
            style={{
              fontSize: verticalScale(18),
              fontWeight: 'bold',
              marginBottom: verticalScale(8),
              marginTop: verticalScale(20),
            }}
          />
          {/* <AutoExpandingTextInput initValue={detail} placeholder='Nhập chi tiết' onChangeText={text => onChangeDetailText(text)} /> */}
          <TextInput
            multiline
            style={[
              {
                height: height,
                borderWidth: 1,
                backgroundColor: 'white',
                borderRadius: 10,
                borderColor: colors.borderColor,
                paddingHorizontal: verticalScale(16),
                // width: '80%',
                fontSize: verticalScale(16),
                flex: 1,
                marginBottom: verticalScale(20),
              },
            ]}
            onChangeText={text => onChangeDetailText(text)}
            value={detail}
            placeholder={'Nhập chi tiết'}
            placeholderTextColor={colors.grayColor}
            onContentSizeChange={event => {
              if (
                height <= 35 * 6 &&
                event.nativeEvent.contentSize.height > height
              ) {
                setHeight(event.nativeEvent.contentSize.height);
                // viewHeight: event.nativeEvent.contentSize.heigh
              }
            }}
          />
        </>
        {/* --------------Hình ảnh----------------- */}
        {postType == PostType.POST ? (
          <>
            <TextBase
              title={'Hình ảnh'}
              style={{
                fontSize: verticalScale(18),
                fontWeight: 'bold',
                marginBottom: verticalScale(8),
                marginTop: verticalScale(20),
              }}
            />
            <View style={{marginVertical: verticalScale(0)}}>
              <TouchableOpacity
                onPress={() => {
                  modalOptionImgAvatar?.current?.onOpenModal();
                }}
                style={{
                  width: verticalScale(110),
                  height: verticalScale(110),
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: verticalScale(16),
                }}
              >
                <Icon name="upload3" size={verticalScale(50)} />
              </TouchableOpacity>

              {imagesLocal ? (
                <FlatList
                  data={imagesLocal}
                  style={{marginVertical: verticalScale(8)}}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flex: 1 / 3,
                        flexDirection: 'column',
                        marginBottom: verticalScale(8),
                        paddingTop: verticalScale(10),
                        // borderWidth:1
                        // marginRight: verticalScale(8),
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: verticalScale(20),
                          height: verticalScale(20),
                          borderRadius: verticalScale(15),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: 0,
                          right: -10,
                          zIndex: 10000,
                        }}
                        onPress={() => deleteImage(index)}
                      >
                        <Icon name="times" size={verticalScale(18)} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => tapImage(item)}>
                        <Image
                          style={styles.imageThumbnail}
                          source={{uri: item}}
                          resizeMode={'stretch'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  //Setting the number of column
                  numColumns={3}
                  keyExtractor={(item, index) => index}
                />
              ) : (
                <FlatList
                  data={images}
                  style={{marginVertical: verticalScale(8)}}
                  renderItem={({item}) => (
                    <View
                      style={{
                        flex: 1 / 3,
                        flexDirection: 'column',
                        marginBottom: verticalScale(8),
                        // marginRight: verticalScale(8),
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: verticalScale(20),
                          height: verticalScale(20),
                          borderRadius: verticalScale(15),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: 0,
                          right: -10,
                          zIndex: 10000,
                        }}
                        onPress={() => {}}
                      >
                        <Icon name="times" size={verticalScale(18)} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => tapImage(item)}>
                        <Image
                          style={styles.imageThumbnail}
                          source={{uri: item}}
                          resizeMode={'stretch'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  //Setting the number of column
                  numColumns={3}
                  keyExtractor={(item, index) => index}
                />
              )}
              {/* {images?< FlatList
                            data={images}
                            style={{ marginVertical: verticalScale(8) }}
                                renderItem={({ item }) => (
                                <View style={{
                                    flex: 1/3,
                                    flexDirection: 'column',
                                    marginBottom: verticalScale(8),
                                    // marginRight: verticalScale(8),
                                }}>
                                    <Image style={styles.imageThumbnail} source={{uri:item}} />
                                </View>
                            )}
                            //Setting the number of column
                            numColumns={3}
                            keyExtractor={(item, index) => index}
                        />:null
                    } */}
            </View>
          </>
        ) : null}
      </View>
    );
    {
      /* </KeyboardAvoidingView> */
    }
  };
  return (
    <View style={styles.container}>
      <HeaderView title="Đăng tin mới" iconLeft="Backward-arrow-small" />
      <ScrollView style={styles.form} keyboardShouldPersistTaps={'never'}>
        {renderForm()}
      </ScrollView>
      <BaseButton
        title="Đăng tin"
        style={styles.login}
        titleStyle={styles.titleStyle}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPress={nextPress}
      />
      <BaseUploadImage
        ref={modalOptionImgAvatar}
        imgUri={(imgUri: string, imgLocal: string) => {
          console.log('image', imgUri, imgLocal);
          setImages([...images, imgUri]);
          setImagesLocal([...imagesLocal, imgLocal]);
        }}
        buttonText={'Huỷ bỏ'}
        buttonStyle={{}}
        // multiSelect={true}
      />
      {renderImage()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:1
  },
  form: {
    flex: 1,
    width: R.DEVICE_WIDTH,
    // borderWidth: 1,
    // padding: verticalScale(16)
  },
  inputStyle: {
    backgroundColor: 'white',
    marginBottom: verticalScale(20),
    paddingHorizontal: verticalScale(8),
    fontSize: verticalScale(16),
    flex: 1,
    flexDirection: 'row',
    height: verticalScale(46),
    borderColor: colors.mainGreyColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: verticalScale(8),
  },
  textInput: {
    borderWidth: verticalScale(1),
    borderRadius: verticalScale(10),
    borderColor: colors.inputBorderColor,
    textAlign: 'center',
    fontSize: verticalScale(15),
    fontFamily: 'Roboto',
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceInput: {
    width: '45%',
    backgroundColor: 'white',
    marginHorizontal: 0,
  },
  login: {
    width: verticalScale(315),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.greenColor,
    // borderWidth: 1,
    marginVertical: verticalScale(16),
    height: verticalScale(46),
    // position: 'absolute',
    // bottom:0
  },
  titleStyle: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(120),
    // width: verticalScale(110),
    borderRadius: 10,
  },
});
export default PostFormScreen;
