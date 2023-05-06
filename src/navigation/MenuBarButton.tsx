import React from 'react';

import {StyleSheet, View} from 'react-native';

import Icon from '../components/Icon';
import R from '../components/R';

interface Props {
  focused?: any;
  type?: any;
  icon?: any;
  bottom?: any;
  style?: any;
  indicator?: any;
}
class MenuBarButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render = () => {
    const {focused, type, icon, bottom, indicator = false} = this.props;
    let icon_inactive;
    let icon_active;
    switch (type) {
      case 0:
        icon_active = 'home_inactive';
        icon_inactive = 'home_inactive';
        break;
      case 1:
        icon_active = 'Group-12855';
        icon_inactive = 'Group-12855';
        break;
      case 2:
        icon_active = 'thongtintaikhoan';
        icon_inactive = 'thongtintaikhoan';
        break;
    }
    return (
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: R.TABBAR_HEIGHT + bottom,
          alignItems: 'center',
          borderTopWidth: 0.5,
          borderTopColor: '#DDDDDD',
          backgroundColor: 'black',
        }}
      >
        <View
          pointerEvents="box-none"
          style={{
            height: R.TABBAR_HEIGHT + bottom,
            alignItems: 'flex-start',
            backgroundColor: 'transparent',
          }}
        >
          <View style={[styles.subsviewViewEE]}>
            <Icon
              name={focused ? icon_active : icon_inactive}
              color={focused ? 'white' : 'gray'}
              size={25}
              style={{}}
            />
            {focused && indicator && type != 2 ? (
              <View
                style={[
                  styles.menuindicator2View,
                  {backgroundColor: '#8218D1'},
                ]}
              />
            ) : (
              <View />
            )}
            {icon ? (
              <View
                style={[styles.iconewmessageView, {backgroundColor: '#E6161A'}]}
              />
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    );
  };
}
export default MenuBarButton;

const styles = StyleSheet.create({
  mnusubbarView: {
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: 6,
    top: 0,
    // height: "100%",
  },
  mnusubbarViewLinearGradient: {
    // height: 6,
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: 6,
    top: -6,
    // height: "100%",
  },
  subsviewViewEE: {
    backgroundColor: 'transparent',
    top: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subsviewViewER: {
    backgroundColor: 'green',
    top: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mnusubsImage: {
    resizeMode: 'stretch',
    width: 22,
    height: 22,
  },
  menuindicator2View: {
    backgroundColor: 'rgb(131, 131, 131)',
    borderRadius: 2.5,
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    top: 0,
    height: 6,
  },

  iconewmessageView: {
    backgroundColor: 'rgb(0, 160, 36)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 239)',
    borderStyle: 'solid',
    position: 'absolute',
    alignSelf: 'center',
    right: -4,
    width: 12,
    top: 10,
    height: 12,
  },
});
