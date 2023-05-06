import * as React from 'react';

import {Button, Text, View} from 'react-native';

import {routes} from '../../navigation/Routes';
import {useAppDispatch, useAppSelector} from '../../stores';
import * as AuthActions from '../../stores/Auth/Actions';
import * as SettingsAction from '../../stores/Settings/Actions';

interface Props {
  navigation: any;
}
function HomeScreen(props: Props) {
  const {settings} = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="SET_SETTINGS"
        onPress={() => dispatch(SettingsAction.setSettings({demo: 'molo'}))}
      />
      <Button
        title="CLEAR_SETTINGS"
        onPress={() => dispatch(SettingsAction.clearSettings())}
      />
      <Button
        title="LOG"
        onPress={() => dispatch(SettingsAction.logSettings())}
      />
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate(routes.DETAILS_SCREEN)}
      />
      <Button
        title="Logout"
        onPress={() => dispatch(AuthActions.logoutCompleted())}
      />
    </View>
  );
}
function DetailsScreen(props: Props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => props.navigation.navigate(routes.HOME_SCREEN)}
      />
    </View>
  );
}
export {DetailsScreen, HomeScreen};

// ... other code from the previous section
