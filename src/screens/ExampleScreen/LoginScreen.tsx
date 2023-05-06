import React from 'react';

import {Button, Text, View} from 'react-native';

import exampleService from '../../services/ExampleService';

const LoginScreen = () => {
  const getTestApi = async () => {
    const res = await exampleService.getExample();
    console.log('res', res);
    return res;
  };
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="API"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPress={getTestApi}
      />
    </View>
  );
};
export default LoginScreen;
