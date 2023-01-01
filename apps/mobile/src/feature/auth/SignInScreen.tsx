import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as Burnt from 'burnt';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import * as z from 'zod';
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
  toVerifyCodeScreen: () => n.navigate('AuthStackScreen', { screen: 'VerifyCodeScreen' }),
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
export const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigateFactory(navigation);
  const { handleSubmit } = useFormContext<AuthStackSForm>();
  const { mutate } = trpc.auth.signIn.useMutation();

  const submit = (form: AuthStackSForm) => {
    if (!form.email) {
      return emptyEmailThrottle({
        message: 'Please enter your email',
        title: 'Empty email',
      });
    }
    mutate(
      {
        email: form.email,
      },
      {
        onSuccess: () => {
          return navigator.toVerifyCodeScreen();
        },
        onError: (err) => {
          console.log(err);
          Burnt.toast({
            title: 'Error',
            message: err.message,
            preset: 'error',
            duration: 1.5,
          });
        },
      },
    );
  };
  return (
    <AppLayout>
      <SpaceY y={32}>
        <View>
          <Text className="text-3xl font-light">Welcome</Text>
          <Text className="text-xl font-light">Sign in to continue</Text>
        </View>
        <SpaceY xClassName="bg-gray-300 rounded-lg p-8" y={24}>
          <ControlledInput<AuthStackSForm>
            placeholder="jhondoe@hotmail.com"
            name="email"
            autoComplete="email"
            validate={(v: unknown) => z.string().email().safeParse(v).success}
            validateMessage="Please enter a valid email"
            keyboardType="email-address"
            label="Email"
          />
          <AppButton onPress={handleSubmit(submit)}>Send code</AppButton>
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
