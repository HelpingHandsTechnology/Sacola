import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { TextInput } from 'design';
import { MainStackNavigationP } from '../../../App';
import { AppButton } from '../../shared/components/AppButton';
import { AppLayout } from '../../shared/components/AppLayout';
import { SpaceY } from '../../shared/components/SpaceY';

const navigateFactory = (n: NavigationProp<MainStackNavigationP>) => ({
  toSignUpScreen: () => n.navigate('SignUpScreen'),
  toConfirmCodeScreen: () => n.navigate('ConfirmCodeScreen'),
});
export const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigateFactory(navigation);
  return (
    <AppLayout>
      <SpaceY y={32}>
        <View>
          <Text className="text-3xl font-light">Welcome</Text>
          <Text className="text-xl font-light">Sign in to continue</Text>
        </View>
        <SpaceY xClassName="bg-gray-300 rounded-lg p-8" y={24}>
          <TextInput
            placeholder="abcd@xyz.com"
            placeholderTextColor={'#333'}
            keyboardType="email-address"
          ></TextInput>
          <AppButton onPress={navigator.toConfirmCodeScreen}>Send code</AppButton>
          <SignUpText onPress={navigator.toSignUpScreen} />
        </SpaceY>
      </SpaceY>
    </AppLayout>
  );
};

type SignUpText = TouchableOpacityProps;
const SignUpText = (p: SignUpText) => {
  return (
    <TouchableOpacity className="align-baseline items-center content-center" onPress={p.onPress}>
      <Text className="text-sm font-light">
        Don't have an account?
        <Text className="text-sm font-bold text-blue-500"> Sign up</Text>
      </Text>
    </TouchableOpacity>
  );
};
