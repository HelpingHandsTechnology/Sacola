import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as Burnt from 'burnt';
import { TextInput } from 'design';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { MainStackNavigationP } from '../../../App';
import { trpc } from '../../lib/trpc';
import { AppButton } from '../../shared/components/AppButton';
import { AppLayout } from '../../shared/components/AppLayout';
import { SpaceY } from '../../shared/components/SpaceY';
import { throttle } from '../../utils';
import { AuthStackSForm } from './AuthStack';
import { ControlledInput } from './ControlledInput';

const navigateFactory = (n: NavigationProp<MainStackNavigationP>) => ({
  toSignUpScreen: () => n.navigate('AuthStackScreen', { screen: 'SignUpScreen' }),
  toConfirmCodeScreen: () => n.navigate('AuthStackScreen', { screen: 'ConfirmCodeScreen' }),
});
const emptyEmailThrottle = throttle(
  ({ title, message }: { title: string; message: string }) =>
    Burnt.toast({
      title,
      message,
      preset: 'error',
      duration: 1.5,
    }),
  1500,
);
export const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigateFactory(navigation);
  const [email, setEmail] = React.useState('antoniel2210@gmail.com');
  const [name, setName] = React.useState('antoniel2210@gmail.com');

  const handleSubmit = () => null;
  return (
    <AppLayout>
      <SpaceY y={32}>
        <View>
          <Text className="text-3xl font-light">Welcome</Text>
          <Text className="text-xl font-light">Sign in to continue</Text>
        </View>
        <SpaceY xClassName="bg-gray-300 rounded-lg p-8" y={24}>
          <ControlledInput<AuthStackSForm> placeholder="jhondoe@hotmail.com" name="email" label="Email" />
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="abcd@xyz.com"
            placeholderTextColor={'#222222800'}
            keyboardType="email-address"
          />
          <AppButton onPress={handleSubmit}>Send code</AppButton>
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
