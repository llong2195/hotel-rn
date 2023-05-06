import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
