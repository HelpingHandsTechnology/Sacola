import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { MainStackNavigationP } from '../../../App';
import { AppButton } from '../../shared/components/AppButton';
import { AppLayout } from '../../shared/components/AppLayout';
import { SpaceY } from '../../shared/components/SpaceY';
import * as Burnt from 'burnt';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { throttle } from '../../utils';

const toastThrottle = throttle(() => {
  Burnt.toast({
    title: 'Code resent',
    preset: 'done', // or "error", "heart"
    message: 'Take a look on span bucket',
    duration: 2, // duration in seconds
  });
}, 5000);
const navigateFactory = (n: NavigationProp<MainStackNavigationP>) => ({
  toSignUpScreen: () => n.navigate('SignUpScreen'),
  toConfirmCodeScreen: () => n.navigate('ConfirmCodeScreen'),
});
export const ConfirmCodeScreen = () => {
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigateFactory(navigation);
  return (
    <AppLayout>
      <SpaceY y={32}>
        <Text className="text-3xl font-light text-center">Enter the 6 digit code sent to you at __email__</Text>
        <SpaceY xClassName="bg-gray-300 rounded-lg p-8" y={24}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <TouchableOpacity>
            <Text>
              Didn't receive the code? try{' '}
              <Text
                className="text-blue-700"
                onPress={() => {
                  toastThrottle();
                }}
              >
                resending
              </Text>
            </Text>
          </TouchableOpacity>
          <AppButton onPress={navigator.toConfirmCodeScreen}>Send code</AppButton>
        </SpaceY>
      </SpaceY>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
