import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TextInput } from 'design';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { z } from 'zod';
import { MainStackNavigationP } from '../../../App';
import { trpc } from '../../lib/trpc';
import { errorToast } from '../../shared/animations/toasts';
import { AppButton } from '../../shared/components/AppButton';
import { AppLayout } from '../../shared/components/AppLayout';
import { SpaceY } from '../../shared/components/SpaceY';
import { throttle } from '../../utils';
import { AuthStackScreen, AuthStackSForm } from './AuthStack';
import { ControlledInput } from './ControlledInput';

const navigateFactory = (n: NavigationProp<MainStackNavigationP>) => ({
  toSignInScreen: () => n.navigate('AuthStackScreen', { screen: 'SignInScreen' }),
});

export const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigateFactory(navigation);
  const { handleSubmit, reset } = useFormContext<AuthStackSForm>();
  const { mutate } = trpc.user.signUp.useMutation();

  const onSubmit = async (data: AuthStackSForm) => {
    mutate(data, {
      onSuccess: () => {
        navigator.toSignInScreen();
      },
      onError: (err) => {
        errorToast({
          title: err.message,
          message: 'Please try again',
        });
      },
    });
  };

  return (
    <AppLayout>
      <SpaceY y={32}>
        <View>
          <Text className="text-3xl font-light">Create an account</Text>
          <Text className="text-md font-light">Create an Account and Start Saving with Sacola</Text>
        </View>
        <SpaceY xClassName="bg-gray-300 rounded-lg p-8" y={24}>
          <SpaceY y={8}>
            <ControlledInput<AuthStackSForm>
              placeholder="How should we call you?"
              name="name"
              label="Name"
              validate={(v: unknown) => z.string().safeParse(v).success}
              validateMessage="Please enter a valid name"
            />
            <ControlledInput<AuthStackSForm>
              placeholder="jhondoe@hotmail.com"
              name="email"
              autoComplete="email"
              validate={(v: unknown) => z.string().email().safeParse(v).success}
              validateMessage="Please enter a valid email"
              keyboardType="email-address"
              label="Email"
            />
          </SpaceY>
          <AppButton onPress={handleSubmit(onSubmit)}>Sign up</AppButton>
          <Text className="text-xs font-light">
            We value your privacy and security. That's why we only ask for the necessary information when you create an
            account. Rest assured that your data will be kept safe and secure with us.
          </Text>
        </SpaceY>
      </SpaceY>
    </AppLayout>
  );
};
