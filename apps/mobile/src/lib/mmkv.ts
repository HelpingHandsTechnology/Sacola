import { MMKV } from 'react-native-mmkv';

const __AuthMMKV = new MMKV({
  id: 'auth',
});

export const authMMKVKeys = {
  authToken: 'AuthToken',
} as const;

type AuthMMKVKeys = typeof authMMKVKeys[keyof typeof authMMKVKeys];

export const setAuthMMKV = (key: AuthMMKVKeys, value: unknown) => {
  const stringifyValue = JSON.stringify(value);
  __AuthMMKV.set(key, stringifyValue);
};
export const getAuthMMKV = <T>(key: AuthMMKVKeys): T | null => {
  return JSON.parse(__AuthMMKV.getString(key) || 'null');
};
export const deleteAuthMMKV = (key: AuthMMKVKeys) => {
  return __AuthMMKV.delete(key);
};
