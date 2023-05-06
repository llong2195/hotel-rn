import React, {useEffect, useRef, useState} from 'react';

import AnimatedLottieView, {default as Lottie} from 'lottie-react-native';
import {
  Alert,
  Animated,
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Easing} from 'react-native-reanimated';

import BaseButton from '../../../components/BaseButton';
import CarouselImage from '../../../components/CarouselImage';
import HeaderView from '../../../components/HeaderView';
import Icon from '../../../components/Icon';
import R from '../../../components/R';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';
import TextInputBase from '../../../components/TextInputBase';
import {colors, OtherReason, reasonReport} from '../../../constants';
import {images} from '../../../constants/images';
import {ReasonReport} from '../../../entities/DataType';
import {Posts} from '../../../entities/Post';
import {Report} from '../../../entities/Report';
import NavigationService from '../../../navigation/NavigationService';
import {routes} from '../../../navigation/Routes';
import postServices from '../../../services/PostServices';
import {useAppSelector} from '../../../stores';
import {getMoneyFormat, getTimeUnit} from '../../../utils/UtilsMoney';

interface Props {
  route?: any;
}
export default function PostDetailScreen(props: Props) {
  const [reportList, setReportList] = useState<Report[]>([]);
  const [imagesList, setImagesList] = useState<string[]>([]);
  const {data, callBack}: {data: Posts; callBack: Function} =
    props.route?.params;
  const {userInfo} = useAppSelector(state => state);
  const {author} = data;
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleReport, setVisibleReport] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [save, setSave] = useState<number>(data?.isSave ?? 0);
  const [report, setReport] = useState<ReasonReport>();
  const [noteReport, setNoteReport] = useState<string>('');
  const [pickerValue, setPickerValue] = useState();
  let animation = React.createRef<AnimatedLottieView>();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  useEffect(() => {
    if (data?.image) {
      setImagesList(data?.image.split(','));
    }
    if (data.authorId == userInfo.id) setIsAuthor(true);
    // setReportList(reportListMD.slice(0,7))
    void getReport();
  }, []);
  const getReport = async () => {
    const res = await postServices.getReport({reportedPost: data.id});
    if (!res.errorCode) {
      setReportList(res.report);
    }
  };
  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setImageIndex(index);
          setVisible(true);
        }}
        style={{flex: 1, alignSelf: 'center'}}
      >
        <Image
          source={{uri: item}}
          style={{width: 380, height: 240}}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
    );
  };
  const renderReportList = ({item}: {item: Report}) => {
    return (
      <View
        key={item.id}
        style={{
          // marginHorizontal: verticalScale(16),
          // marginVertical: verticalScale(5),
          marginRight: verticalScale(8),
          padding: verticalScale(8),
          // borderWidth: 1,
          borderRadius: 10,
          backgroundColor: '#FDFDFD',
          width: verticalScale(300),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: verticalScale(4),
            // borderWidth:1
          }}
        >
          <TextBase
            title={item.username}
            style={{
              fontSize: verticalScale(16),
              fontWeight: '700',
              width: '70%',
              // flex:1
            }}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          />
          <TextBase
            title={item.createdAt.slice(0, 10)}
            style={{
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
  const Title = ({
    detail,
    style,
    textStyle,
    icon,
    iconSize = verticalScale(20),
    iconStyle,
    iconColor = '#000000',
  }: any) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '100%',
          },
          style,
        ]}
      >
        {/* <TextBase title={title + ':   '} style={{ fontSize: verticalScale(18), fontWeight: 'bold' }} /> */}
        {icon ? (
          <Icon
            name={icon}
            size={iconSize}
            style={[
              {
                marginHorizontal: verticalScale(16),
              },
              iconStyle,
            ]}
            color={iconColor}
          />
        ) : null}
        <TextBase
          title={detail}
          style={[
            {
              flex: 1,
              fontSize: verticalScale(14),
              fontWeight: '400',
              textAlign: 'left',
            },
            textStyle,
          ]}
        />
      </View>
    );
  };

  const renderDetailPost = () => {
    return (
      <>
        <Title
          detail={data?.title}
          textStyle={{
            fontSize: verticalScale(26),
            fontWeight: '500',
            marginVertical: verticalScale(16),
          }}
        />
        {data.postType == 0 ? (
          <Title
            detail={
              getMoneyFormat(data?.price) +
              ' VND' +
              `/${getTimeUnit(data.timeUnit)}`
            }
            textStyle={{
              fontSize: verticalScale(14),
              fontWeight: '500',
              marginBottom: verticalScale(16),
            }}
            icon={'money'}
            iconColor="#F39671"
          />
        ) : (
          <Title
            detail={
              `${getMoneyFormat(
                data?.minPrice?.toString(),
              )} -> ${getMoneyFormat(data?.maxPrice?.toString())}` + ' VND'
            }
            textStyle={{
              fontSize: verticalScale(14),
              fontWeight: '500',
              marginBottom: verticalScale(16),
            }}
            icon={'money'}
            iconColor="#F39671"
          />
        )}
        <Title
          detail={data?.address}
          textStyle={{
            fontSize: verticalScale(14),
            fontWeight: '500',
            marginBottom: verticalScale(16),
          }}
          icon={'khoangcachphuhop'}
          iconColor="#F39671"
        />
        {imagesList && imagesList.length > 0 ? (
          <CarouselImage
            data={imagesList}
            renderItem={renderItem}
            viewCount={imagesList.length}
          />
        ) : (
          <Image
            source={images.defaultImage}
            style={{
              width: verticalScale(300),
              height: verticalScale(250),
              marginVertical: verticalScale(16),
              alignSelf: 'center',
            }}
          />
        )}
        <Title
          detail={data?.detail}
          textStyle={{
            fontSize: verticalScale(14),
            fontWeight: '500',
            marginBottom: verticalScale(16),
          }}
          icon={'file-text2'}
          iconColor="#F39671"
        />
        {/* <ScrollView style={{flex:1,borderWidth:1}} horizontal={true} scrollEnabled>
                {reportList.map(item=>renderReportList(item))}
            </ScrollView> */}
        <TextBase
          title={'Phản hồi bài viết'}
          style={{
            fontSize: verticalScale(16),
            fontWeight: 'bold',
            marginBottom: verticalScale(16),
          }}
        />
        {reportList && reportList.length > 0 ? (
          <FlatList
            data={reportList}
            renderItem={renderReportList}
            horizontal
            scrollEnabled
            style={{
              // padding:verticalScale(8),
              width: '100%',
              // borderWidth:1
            }}
          />
        ) : (
          <View
            style={{
              width: '90%',
              height: verticalScale(100),
              marginVertical: verticalScale(16),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={images.no_data} resizeMode="stretch" />
          </View>
        )}
        {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: verticalScale(16),
                width: '100%'
            }}>
                <TextBase title={'Đánh giá:   '} style={{ fontSize: verticalScale(18), fontWeight: 'bold' }} />
                <Star star={4} />
            </View> */}
      </>
    );
  };
  const renderAuthor = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: verticalScale(16),
          backgroundColor: '#ffffff',
          padding: verticalScale(16),
          borderRadius: verticalScale(16),
        }}
        onPress={() =>
          NavigationService.navigate(routes.USER_DETAIL_SCREEN, {
            author: data.author,
          })
        }
      >
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#F39671', '#C3F0AF', '#26E8CE']}
          style={styles.avatar}
        >
          <Image
            source={{uri: author?.avatar}}
            resizeMode="cover"
            style={{
              width: verticalScale(60),
              height: verticalScale(60),
              borderRadius: verticalScale(50),
              alignSelf: 'center',
            }}
          ></Image>
        </LinearGradient>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: verticalScale(8),
            }}
          >
            <Icon
              name="account_fill"
              size={verticalScale(20)}
              color="#F47878"
            />
            <TextBase
              title={author?.name}
              style={{
                fontSize: verticalScale(18),
                fontWeight: '600',
                marginLeft: verticalScale(8),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: verticalScale(4),
            }}
          >
            <Icon
              name="themsodienthoai"
              size={verticalScale(20)}
              color="#166D05"
            />

            <TextBase
              title={author?.phoneNumber}
              style={{
                fontSize: verticalScale(16),
                marginLeft: verticalScale(8),
              }}
            />
          </View>
          {/* <TextBase title={author.} style={{ fontSize: verticalScale(18), }} /> */}
        </View>

        {/* <DonutCircle percentage={author?.score || 0} max={5} color='#F4D10C' radius={verticalScale(24)} /> */}
      </TouchableOpacity>
    );
  };
  const onContactPress = async () => {
    console.log('onContactPress');
    await Linking.openURL(`tel:${author?.phoneNumber}`);
  };
  const onUpdatePress = () => {
    NavigationService.navigate(routes.POST_FORM_SCREEN, {data});
  };
  const animationProgress = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: save,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [save]);
  const onSavePress = async () => {
    if (save == 0) {
      await postServices.savePost(data.id).then(res => {
        if (!res.errorCode) {
          setSave(1);
          Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
          // dispatch(PostActions.setChangeSavePost(data?.id,1))
          callBack(data?.id, 1);
        } else {
          R.showMessage({
            message: res.errorMsg,
            type: 'danger',
            icon: 'danger',
            autoHide: true,
          });
        }
      });
    } else {
      await postServices.deletePost(data.id).then(res => {
        if (!res.errorCode) {
          setSave(0);
          Animated.timing(animationProgress.current, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
          callBack(data?.id, 0);
        } else {
          R.showMessage({
            message: res.errorMsg,
            type: 'danger',
            icon: 'danger',
            autoHide: true,
          });
        }
      });
    }
  };
  const onReportPress = () => {
    setVisibleReport(true);
  };
  const onChangeTitleText = (text: string) => {
    setNoteReport(text);
  };
  const onReportPressFinal = async () => {
    if (!report) {
      R.showMessage({
        message: 'Vui lòng lựa chọn vấn đề',
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
      return;
    }
    setVisibleReport(false);
    R.Loading.show();
    let reportData = {
      userReport: userInfo.id,
      reportedPost: data.id,
      reportedUser: data.authorId,
      note: report?.id != OtherReason ? report?.reason : noteReport,
    };
    const res = await postServices.createReport(reportData);
    R.Loading.hide();
    if (!res.errorCode) {
      R.showMessage({
        message: 'Phản hồi bài viết thành công',
        type: 'success',
        icon: 'success',
        autoHide: true,
      });
      void getReport();
    } else {
      R.showMessage({
        message: res.errorMsg,
        type: 'danger',
        icon: 'danger',
        autoHide: true,
      });
    }
  };

  const renderReportModal = () => {
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
          <View
            // onTouchEnd={()=>setVisibleReport(false)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              opacity: 0.2,
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              height: verticalScale(400),
              width: verticalScale(343),
              position: 'absolute',
              alignSelf: 'center',
              marginVertical: (R.DEVICE_HEIGHT - verticalScale(400)) / 2,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: verticalScale(10),
                right: verticalScale(10),
              }}
              onPress={() => setVisibleReport(false)}
            >
              <Icon name="times" size={verticalScale(30)} />
            </TouchableOpacity>
            <TextBase
              title={'Báo cáo/Phản hồi'}
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: verticalScale(18),
                margin: verticalScale(16),
              }}
            />
            <TextBase
              title={
                'Vui lòng lựa chọn, phản hồi vấn đề xảy ra đối với bài viết này để chúng tôi có cách khắc phục sớm nhất!'
              }
              style={{
                fontSize: verticalScale(14),
                margin: verticalScale(16),
              }}
            />
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
              }}
            >
              <DropDownPicker
                open={openReport}
                setOpen={setOpenReport}
                schema={{
                  label: 'reason',
                  value: 'id',
                }}
                items={reasonReport}
                onSelectItem={item => setReport(item)}
                value={pickerValue}
                setValue={setPickerValue}
                textStyle={{
                  fontSize: verticalScale(14),
                }}
                placeholder={'Lựa chọn lý do'}
              />
            </View>
            {report?.id == OtherReason ? (
              <View
                style={{
                  margin: verticalScale(16),
                }}
              >
                <TextBase
                  title={'Vấn đề xảy ra'}
                  style={{
                    fontSize: verticalScale(16),
                    fontWeight: 'bold',
                    marginBottom: verticalScale(8),
                  }}
                />
                <TextInputBase
                  style={styles.inputStyle}
                  // type='numeric'
                  onChangeText={onChangeTitleText}
                  placeholder="Nhập vấn đề"
                  initValue={noteReport}
                  // textStyle={{
                  //     fontSize:verticalScale(14)
                  // }}
                />
              </View>
            ) : null}
            <BaseButton
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onPress={onReportPressFinal}
              title="Gửi"
              style={{
                width: verticalScale(200),
                height: verticalScale(50),
                marginVertical: verticalScale(16),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
        </>
      </Modal>
    );
  };
  const renderSave = () => {
    if (userInfo.id != data.authorId)
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
          <TouchableOpacity
            onPress={onSavePress}
            style={{
              width: verticalScale(30),
              height: verticalScale(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lottie
              ref={anim => {
                animation = anim;
              }}
              source={require('../../../../assets/lotties/save.json')}
              progress={animationProgress.current}
              //   autoPlay
              //   loop
            />
          </TouchableOpacity>
        </View>
      );
    else
      return (
        <View>
          <TouchableOpacity
            onPress={onClosePress}
            style={{
              width: verticalScale(30),
              height: verticalScale(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="times" size={verticalScale(30)} color="#FF375F" />
          </TouchableOpacity>
        </View>
      );
  };
  const onClosePress = () => {
    // R.Popup.show({
    //     data:[2],
    //     renderItem: () => {
    //         <View style={{width:200,height:200,borderWidth:1,backgroundColor:'black',borderColor:'black'}}>

    //         </View>
    //     }
    //   })
    Alert.alert(
      data.status == 0 ? 'Ẩn bài đăng với mọi người' : 'Mở lại bài đăng',
      data.status == 0
        ? 'Bài đăng sẽ bị ẩn với tất cả người dùng khác'
        : 'Hiển thị lại bài đăng này',
      [
        {
          text: 'Huỷ',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        {text: 'Đồng ý', onPress: () => closePost()},
      ],
    );
  };
  const closePost = async () => {
    let status = data.status == 0 ? 1 : 0;
    const res = await postServices.updatePost(props.route.params.data.id, {
      status,
    });
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
    return;
  };
  return (
    <View style={styles.container}>
      <HeaderView
        title="Chi tiết bài đăng"
        iconLeft="Backward-arrow-small"
        renderRight={() => renderSave()}
      />
      <ScrollView
        style={{width: R.DEVICE_WIDTH, paddingHorizontal: verticalScale(16)}}
      >
        {/* {renderSave()} */}
        {renderAuthor()}
        {renderDetailPost()}
      </ScrollView>
      {/* {imagesList&&imagesList.length>0?<ImageView
                images={imagesList.map(image => ({ uri: image }))}
                imageIndex={imageIndex}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            /> :
                <Image
                    source={images.defaultImage}
                    style={{
                        width: verticalScale(300),
                        height: verticalScale(250),
                        alignSelf: 'center',
                    }}
                />
        } */}
      {!isAuthor ? (
        <BaseButton
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onPress={onContactPress}
          title="Liên hệ"
          style={{
            width: verticalScale(200),
            height: verticalScale(50),
            marginVertical: verticalScale(16),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <BaseButton
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onPress={onUpdatePress}
          title="Cập nhật"
          style={{
            width: verticalScale(200),
            height: verticalScale(50),
            marginVertical: verticalScale(16),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
      {renderReportModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'white'
  },
  avatar: {
    width: verticalScale(65),
    height: verticalScale(65),
    alignSelf: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(60),
    marginRight: verticalScale(20),
  },
  inputStyle: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    marginBottom: verticalScale(20),
    // margin: verticalScale(16),
    // width:'90%'
  },
});
