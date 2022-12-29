import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { SignInScreen } from './SignInScreen';
import { SignUpScreen } from './SignUpScreen';
import { VerifyCodeScreen } from './VerifyCodeScreen';

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  VerifyCodeScreen: undefined;
};
export type AuthStackSForm = {
  email: string;
  name: string;
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
export const AuthStackScreen = () => {
  const methods = useForm({});
  return (
    <FormProvider {...methods}>
      <AuthStack.Navigator initialRouteName="SignUpScreen" screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
        <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <AuthStack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
      </AuthStack.Navigator>
    </FormProvider>
  );
};
