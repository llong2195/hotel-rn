import React from 'react';

import {StyleSheet, View} from 'react-native';

import HeaderView from '../../../components/HeaderView';
import {verticalScale} from '../../../components/Scales';
import TextBase from '../../../components/TextBase';

const InfomationScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderView title="Thông tin ứng dụng" iconLeft="Backward-arrow-small" />
      <View style={styles.view}>
        <TextBase
          title={
            'Motel Room là một ứng dụng hỗ trợ đăng tải thông tin cho thuê, tìm kiếm phòng trọ trực tuyến'
          }
          style={{
            fontWeight: '400',
            fontSize: verticalScale(18),
            textAlign: 'justify',
          }}
        />
        <TextBase
          title={'Đây là sản phầm đồ án thực tập'}
          style={{
            fontWeight: '400',
            fontSize: verticalScale(18),
            textAlign: 'center',
            marginTop: verticalScale(32),
          }}
        />
        <TextBase
          title={'Khoa Công Nghệ Thông Tin'}
          style={{
            fontWeight: '400',
            fontSize: verticalScale(18),
            textAlign: 'center',
          }}
        />
        <TextBase
          title={'Đại học Điện Lực'}
          style={{
            fontWeight: '400',
            fontSize: verticalScale(18),
            textAlign: 'center',
          }}
        />
        <View
          style={{
            marginVertical: verticalScale(32),
            alignSelf: 'center',
          }}
        >
          <TextBase
            title={'Sinh viên: Nguyễn Duy Long'}
            style={{fontWeight: '400', fontSize: verticalScale(16)}}
          />
          <TextBase
            title={'MSV: 19810310054'}
            style={{fontWeight: '400', fontSize: verticalScale(16)}}
          />
          <TextBase
            title={'Lớp: D14CNPM1'}
            style={{fontWeight: '400', fontSize: verticalScale(16)}}
          />
        </View>
      </View>
    </View>
  );
};

export default InfomationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    margin: verticalScale(16),
  },
});
